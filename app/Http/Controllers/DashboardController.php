<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Parking;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $hasOwnedParkings = $user->parkings()->exists();

        // Données pour les propriétaires
        $ownerStats = null;
        if ($hasOwnedParkings) {
            $ownerStats = $this->getOwnerStats($user);
        }

        // Données pour les clients
        $clientStats = $this->getClientStats($user);

        return Inertia::render('auth/dashboard', [
            'hasOwnedParkings' => $hasOwnedParkings,
            'ownerStats' => $ownerStats,
            'clientStats' => $clientStats,
        ]);
    }

    private function getOwnerStats($user)
    {
        $parkings = $user->parkings;
        $parkingIds = $parkings->pluck('id');

        // Date ranges
        $today = Carbon::today();
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();
        $startOfYear = Carbon::now()->startOfYear();

        // Total bookings ce mois-ci
        $totalBookings = Booking::whereIn('parking_id', $parkingIds)
            ->whereBetween('entry_date', [$startOfMonth, $endOfMonth])
            ->count();

        // Revenus
        $dailyRevenue = Booking::whereIn('parking_id', $parkingIds)
            ->whereDate('entry_date', $today)
            ->sum('cost') / 100; // Convertir centimes en euros

        $weeklyRevenue = Booking::whereIn('parking_id', $parkingIds)
            ->whereBetween('entry_date', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
            ->sum('cost') / 100;

        $monthlyRevenue = Booking::whereIn('parking_id', $parkingIds)
            ->whereBetween('entry_date', [$startOfMonth, $endOfMonth])
            ->sum('cost') / 100;

        $yearlyRevenue = Booking::whereIn('parking_id', $parkingIds)
            ->whereBetween('entry_date', [$startOfYear, Carbon::now()])
            ->sum('cost') / 100;

        // Durée moyenne des réservations
        $avgDuration = Booking::whereIn('parking_id', $parkingIds)
            ->whereBetween('entry_date', [$startOfMonth, $endOfMonth])
            ->avg('duration') ?? 0;

        // Revenus par jour de la semaine (7 derniers jours)
        $revenueByPeriod = [];
        $daysOfWeek = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i);
            $revenue = Booking::whereIn('parking_id', $parkingIds)
                ->whereDate('entry_date', $date)
                ->sum('cost') / 100;

            $revenueByPeriod[] = [
                'period' => $daysOfWeek[$date->dayOfWeek === 0 ? 6 : $date->dayOfWeek - 1],
                'amount' => round($revenue, 2)
            ];
        }

        // Taux d'occupation par heure (dernières 24h)
        $occupationData = [];
        $hours = ['6h', '9h', '12h', '15h', '18h', '21h', '0h'];
        foreach ([6, 9, 12, 15, 18, 21, 0] as $index => $hour) {
            $startHour = Carbon::today()->setHour($hour);
            $endHour = Carbon::today()->setHour($hour)->addHours(3);

            $bookingsCount = Booking::whereIn('parking_id', $parkingIds)
                ->where(function($query) use ($startHour, $endHour) {
                    $query->whereBetween('entry_time', [$startHour, $endHour])
                        ->orWhereBetween('exit_time', [$startHour, $endHour]);
                })
                ->count();

            $totalSpots = $parkings->count();
            $rate = $totalSpots > 0 ? ($bookingsCount / $totalSpots) * 100 : 0;

            $occupationData[] = [
                'hour' => $hours[$index],
                'rate' => round($rate, 0)
            ];
        }

        // Reviews récentes (via parking_id directement)
        $reviews = DB::table('reviews')
            ->join('users', 'reviews.customer_id', '=', 'users.id')
            ->whereIn('reviews.parking_id', $parkingIds)
            ->whereNull('reviews.deleted_at')
            ->orderBy('reviews.created_at', 'desc')
            ->limit(4)
            ->get(['reviews.id', 'users.firstname', 'users.lastname', 'reviews.note as rating', 'reviews.comment', 'reviews.created_at'])
            ->map(function ($review) {
                return [
                    'id' => $review->id,
                    'user' => $review->firstname . ' ' . substr($review->lastname, 0, 1) . '.',
                    'rating' => $review->rating,
                    'comment' => $review->comment,
                    'date' => \Carbon\Carbon::parse($review->created_at)->format('Y-m-d'),
                ];
            });

        // Note moyenne
        $avgRating = DB::table('reviews')
            ->whereIn('parking_id', $parkingIds)
            ->whereNull('deleted_at')
            ->avg('note') ?? 0;

        $totalReviews = DB::table('reviews')
            ->whereIn('parking_id', $parkingIds)
            ->whereNull('deleted_at')
            ->count();

        // Calcul du taux d'occupation
        $totalDaysInMonth = $startOfMonth->diffInDays($endOfMonth);
        $totalPossibleBookings = $parkings->count() * $totalDaysInMonth;
        $occupationRate = $totalPossibleBookings > 0
            ? ($totalBookings / $totalPossibleBookings) * 100
            : 0;

        return [
            'occupationRate' => round($occupationRate, 0),
            'dailyRevenue' => round($dailyRevenue, 2),
            'weeklyRevenue' => round($weeklyRevenue, 2),
            'monthlyRevenue' => round($monthlyRevenue, 2),
            'yearlyRevenue' => round($yearlyRevenue, 2),
            'totalBookings' => $totalBookings,
            'avgDuration' => round($avgDuration, 1),
            'avgRating' => round($avgRating, 1),
            'totalReviews' => $totalReviews,
            'revenueByPeriod' => $revenueByPeriod,
            'occupationData' => $occupationData,
            'reviews' => $reviews,
        ];
    }

    private function getClientStats($user)
    {
        $today = Carbon::today();
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();

        // Réservations actives (en cours ou à venir)
        $activeBookings = Booking::where('customer_id', $user->id)
            ->where('exit_date', '>=', $today)
            ->count();

        // Total réservations ce mois
        $totalBookings = Booking::where('customer_id', $user->id)
            ->whereBetween('entry_date', [$startOfMonth, $endOfMonth])
            ->count();

        // Dépenses totales ce mois
        $totalSpent = Booking::where('customer_id', $user->id)
            ->whereBetween('entry_date', [$startOfMonth, $endOfMonth])
            ->sum('cost') / 100;

        // Prochaines réservations (5 prochaines)
        $upcomingBookings = Booking::where('customer_id', $user->id)
            ->where('entry_date', '>=', $today)
            ->with(['parking'])
            ->orderBy('entry_date')
            ->orderBy('entry_time')
            ->take(5)
            ->get()
            ->map(function ($booking) {
                return [
                    'id' => $booking->id,
                    'parkingName' => $booking->parking->name,
                    'address' => $booking->parking->address . ', ' . $booking->parking->city,
                    'date' => $booking->entry_date->format('Y-m-d'),
                    'time' => $booking->entry_time->format('H:i'),
                    'duration' => $booking->duration . 'h',
                    'price' => $booking->cost / 100,
                    'type' => $booking->parking->box ? 'Box' : ($booking->parking->exterior ? 'Extérieur' : 'Couvert'),
                ];
            });

        // Historique récent (réservations passées)
        $recentBookings = Booking::where('customer_id', $user->id)
            ->where('exit_date', '<', $today)
            ->with(['parking'])
            ->orderBy('entry_date', 'desc')
            ->take(4)
            ->get()
            ->map(function ($booking) {
                return [
                    'id' => $booking->id,
                    'parkingName' => $booking->parking->name,
                    'date' => $booking->entry_date->format('Y-m-d'),
                    'duration' => $booking->duration . 'h',
                    'price' => $booking->cost / 100,
                    'status' => 'Terminé',
                ];
            });

        // Évolution des dépenses (11 derniers mois)
        $spendingData = [];
        $months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
        for ($i = 10; $i >= 0; $i--) {
            $monthStart = Carbon::now()->subMonths($i)->startOfMonth();
            $monthEnd = Carbon::now()->subMonths($i)->endOfMonth();

            $amount = Booking::where('customer_id', $user->id)
                ->whereBetween('entry_date', [$monthStart, $monthEnd])
                ->sum('cost') / 100;

            $spendingData[] = [
                'month' => $months[$monthStart->month - 1],
                'amount' => round($amount, 2)
            ];
        }

        // Note moyenne donnée par le client
        $avgRating = DB::table('reviews')
            ->where('customer_id', $user->id)
            ->whereNull('deleted_at')
            ->avg('note') ?? 0;

        // 5 dernières notes données par le client
        $myReviews = DB::table('reviews')
            ->join('parkings', 'reviews.parking_id', '=', 'parkings.id')
            ->where('reviews.customer_id', $user->id)
            ->whereNull('reviews.deleted_at')
            ->orderBy('reviews.created_at', 'desc')
            ->limit(5)
            ->get(['reviews.id', 'parkings.name as parkingName', 'reviews.note as rating', 'reviews.comment', 'reviews.created_at'])
            ->map(function ($review) {
                return [
                    'id' => $review->id,
                    'parkingName' => $review->parkingName,
                    'rating' => $review->rating,
                    'comment' => $review->comment,
                    'date' => \Carbon\Carbon::parse($review->created_at)->format('Y-m-d'),
                ];
            });

        // Parkings favoris (avec détails)
        $favoriteParkings = $user->favoriteParkings()
            ->limit(5)
            ->get()
            ->map(function ($parking) {
                // Calculer la note moyenne du parking
                $avgRating = DB::table('reviews')
                    ->where('parking_id', $parking->id)
                    ->whereNull('deleted_at')
                    ->avg('note') ?? 0;

                return [
                    'id' => $parking->id,
                    'name' => $parking->name,
                    'address' => $parking->address . ', ' . $parking->city,
                    'price' => $parking->hour_price / 100,
                    'rating' => round($avgRating, 1),
                    'type' => $parking->box ? 'Box' : ($parking->exterior ? 'Extérieur' : 'Couvert'),
                ];
            });

        return [
            'activeBookings' => $activeBookings,
            'totalBookings' => $totalBookings,
            'totalSpent' => round($totalSpent, 2),
            'avgRating' => round($avgRating, 1),
            'upcomingBookings' => $upcomingBookings,
            'recentBookings' => $recentBookings,
            'spendingData' => $spendingData,
            'myReviews' => $myReviews,
            'favoriteParkings' => $favoriteParkings,
        ];
    }
}
