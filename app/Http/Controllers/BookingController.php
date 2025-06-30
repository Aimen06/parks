<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookingRequest;
use App\Http\Requests\UpdateBookingRequest;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bookings = Booking::all();
        return Inertia::render('Bookings/Index', ['bookings' => $bookings]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Bookings/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Valider les données du formulaire
        $validatedData = $request->validate([
            'customer_id' => 'requiered|numeric',
            'parking_id' => 'requiered|numeric',
            'entry_date' => 'requiered|datetime',
            'entry_time' => 'requiered|datetime',
            'exit_date' => 'requiered|datetime',
            'exit_time' => 'requiered|datetime',
            'duration' => 'requiered|numeric',
            'cost' => 'requiered|numeric',
        ]);

        try {
            // Créer une nouvelle réservation
            $booking = Booking::create([
                'customer_id' => $validatedData['customer_id'],
                'parking_id' => $validatedData['parking_id'],
                'entry_date' => $validatedData['entry_date'],
                'entry_time' => $validatedData['entry_time'],
                'exit_date' => $validatedData['exit_date'],
                'exit_time' => $validatedData['exit_time'],
                'duration' => $validatedData['duration'],
                'cost' => $validatedData['cost'],
            ]);

            // Rediriger vers la liste des utilisateurs avec un message de succès
            return redirect()->route('bookings.index')->with('success', 'Réservation créé avec succès.');

        } catch (\Exception $e) {
            // Gestion des erreurs
            return back()->withInput()->withErrors(['error' => 'Erreur lors de la création de la réservation
            : ' . $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $booking = Booking::findOrFail($id);
        return Inertia::render('Bookings/Show', [
            'booking' => $booking
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $booking = Booking::findOrFail($id);
        return Inertia::render('Bookings/Edit', ['booking' => $booking]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Valider les données du formulaire
        $validatedData = $request->validate([
            'customer_id' => 'nullable|numeric',
            'parking_id' => 'nullable|numeric',
            'entry_date' => 'nullable|datetime',
            'entry_time' => 'nullable|datetime',
            'exit_date' => 'nullable|datetime',
            'exit_time' => 'nullable|datetime',
            'duration' => 'nullable|numeric',
            'cost' => 'nullable|numeric',
        ]);

        try {

            $booking = Booking::findOrFail($id);
            // Update de la  réservation
            $booking->update([
                'customer_id' => $validatedData['customer_id'],
                'parking_id' => $validatedData['parking_id'],
                'entry_date' => $validatedData['entry_date'],
                'entry_time' => $validatedData['entry_time'],
                'exit_date' => $validatedData['exit_date'],
                'exit_time' => $validatedData['exit_time'],
                'duration' => $validatedData['duration'],
                'cost' => $validatedData['cost'],
            ]);

            // Rediriger vers la liste des utilisateurs avec un message de succès
            return redirect()->route('bookings.index')->with('success', 'Réservation créé avec succès.');

        } catch (\Exception $e) {
            // Gestion des erreurs
            return back()->withInput()->withErrors(['error' => 'Erreur lors de la création de la réservation
            : ' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {

            $booking = Booking::findOrFail($id);
            $booking->delete();
            return redirect()->route('booking.index')->with('success', 'Réservation supprimée avec succès.');

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Erreur lors de la suppression de la réservation: ' . $e->getMessage()]);
        }
    }
}
