<?php

namespace App\Http\Controllers;


use App\Models\Parking;
use Inertia\Inertia;
use Illuminate\Http\Request;


class ParkingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $parkings = Parking::all();
        return Inertia::render('Parkings/Index', ['parkings' => $parkings]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Parkings/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Valider les données du formulaire
        $validatedData = $request->validate([
            'name' => 'nullable|string|max:50',
            'number' => 'nullable|string|max:50',
            'address' => 'string|email|max:255',
            'floor' => 'nullable|string|max:5',
            'zip' => 'nullable|string|max:5',
            'city' => 'nullable|string|max:255',
            'latitude' => 'nullable|float',
            'longitude' => 'nullable|float',
            'remark' => 'nullable|string|max:255',
            'height' => 'requiered|numeric',
            'width' => 'required|numeric',
            'length' => 'required|numeric',
            'charge' => 'nullable|boolean',
            'exterior' => 'nullable|boolean',
            'box' => 'nullable|boolean',
            'owner_id' => 'required|integer',
            'price_per_hour' => 'required|numeric',
            'available' => 'nullable|boolean'
        ]);

        try {
            // Créer un nouvel utilisateur
            $user = Parking::create([
                'name' => $validatedData['name'],
                'number' => $validatedData['number'],
                'address' => $validatedData['address'],
                'zip' => $validatedData['zip'],
                'city' => $validatedData['city'],
                'latitude' => $validatedData['latitude'],
                'longitude' => $validatedData['longitude'],
                'remark' => $validatedData['remark'],
                'height' => $validatedData['height'],
                'length' => $validatedData['length'],
                'charge' => $validatedData['charge'],
                'exterior' => $validatedData['exterior'],
                'owner_id' => $validatedData['owner_id'],
                'price_per_hour' => $validatedData['price_per_hour'],
                'available' => $validatedData['available']
            ]);

            // Rediriger vers la liste des utilisateurs avec un message de succès
            return redirect()->route('parkings.index')->with('success', 'Parking créé avec succès.');

        } catch (\Exception $e) {
            // Gestion des erreurs
            return back()->withInput()->withErrors(['error' => 'Erreur lors de la création du parking: ' . $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Récupérer l'utilisateur avec l'ID donné
        $parking = Parking::findOrFail($id);

        // Retourner la vue Inertia avec les données du parking
        return Inertia::render('Parkings/Show', [
            'parking' => $parking
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Récupérer le parking avec l'ID donné
        $parking = Parking::findOrFail($id);

        // Retourner la vue Inertia pour l'édition du parking
        return Inertia::render('Parkings/Edit', [
            'parking' => $parking
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Valider les données du formulaire
        $validatedData = $request->validate([
            'name' => 'nullable|string|max:50',
            'number' => 'nullable|string|max:50',
            'address' => 'string|email|max:255',
            'floor' => 'nullable|string|max:5',
            'zip' => 'nullable|string|max:5',
            'city' => 'nullable|string|max:255',
            'latitude' => 'nullable|float',
            'longitude' => 'nullable|float',
            'remark' => 'nullable|string|max:255',
            'height' => 'requiered|numeric',
            'width' => 'required|numeric',
            'length' => 'required|numeric',
            'charge' => 'nullable|boolean',
            'exterior' => 'nullable|boolean',
            'box' => 'nullable|boolean',
            'owner_id' => 'required|integer',
            'price_per_hour' => 'required|numeric',
            'available' => 'nullable|boolean'
        ]);

        try {
            // Trouver l'utilisateur à mettre à jour
            $parking = Parking::findOrFail($id);

            // Mettre à jour les informations de l'utilisateur
            $parking->update([
                'name' => $validatedData['name'],
                'number' => $validatedData['number'],
                'address' => $validatedData['address'],
                'zip' => $validatedData['zip'],
                'city' => $validatedData['city'],
                'latitude' => $validatedData['latitude'],
                'longitude' => $validatedData['longitude'],
                'remark' => $validatedData['remark'],
                'height' => $validatedData['height'],
                'length' => $validatedData['length'],
                'charge' => $validatedData['charge'],
                'exterior' => $validatedData['exterior'],
                'owner_id' => $validatedData['owner_id'],
                'price_per_hour' => $validatedData['price_per_hour'],
                'available' => $validatedData['available']
            ]);

            // Rediriger vers la liste des utilisateurs avec un message de succès
            return redirect()->route('parkings.index')->with('success', 'Parking mis à jour avec succès.');

        } catch (\Exception $e) {
            // Gestion des erreurs
            return back()->withInput()->withErrors(['error' => 'Erreur lors de la mise à jour du parking: ' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {

            $parking = Parking::findOrFail($id);
            $parking->delete();
            return redirect()->route('parkings.index')->with('success', 'Parking supprimé avec succès.');

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Erreur lors de la suppression du parking: ' . $e->getMessage()]);
        }
    }
}
