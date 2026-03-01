<?php

namespace App\Http\Controllers;

use App\Models\Parking;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ParkingController extends Controller
{
    public function index(Request $request)
    {
        $userId = Auth::id();
        $baseQuery = Parking::where('user_id', $userId); // Changé owner_id -> user_id

        $totalAvailable = (clone $baseQuery)->where('available', true)->count();
        $totalUnavailable = (clone $baseQuery)->where('available', false)->count();

        $query = Parking::where('user_id', $userId)->with('user');

        // ... logique de recherche inchangée ...

        // Filtrage par type mis à jour avec les nouveaux noms de colonnes
        if ($request->has('type') && $request->type) {
            $types = explode(',', $request->type);
            $query->where(function($q) use ($types) {
                foreach ($types as $type) {
                    switch (trim($type)) {
                        case 'box': $q->orWhere('is_box', true); break;
                        case 'exterior': $q->orWhere('is_exterior', true); break;
                        case 'charge': $q->orWhere('has_charge', true); break;
                    }
                }
            });
        }

        $parkings = $query->paginate(12)->withQueryString();

        return Inertia::render('parkings/Index', [
            'parkings' => $parkings,
            'filters' => $request->only(['search', 'available', 'type']),
            'stats' => ['available' => $totalAvailable, 'unavailable' => $totalUnavailable]
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'address' => 'required|string|max:255',
            'zip' => 'required|string|max:5',
            'city' => 'required|string|max:255',
            'height' => 'required|numeric',
            'width' => 'required|numeric',
            'length' => 'required|numeric',
            'price_per_hour' => 'required|integer',
            'has_charge' => 'nullable|boolean', // Nouveau nom
            'is_exterior' => 'nullable|boolean', // Nouveau nom
            'is_box' => 'nullable|boolean',      // Nouveau nom
            'image_url' => 'nullable|string',   // Ajouté
        ]);

        $parking = Parking::create(array_merge($validated, ['user_id' => Auth::id()]));

        return redirect()->route('parkings.index')->with('success', 'Parking créé.');
    }
}
