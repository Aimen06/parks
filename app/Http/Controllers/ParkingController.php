<?php

namespace App\Http\Controllers;


use App\Models\Parking;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class ParkingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // === DÉBUT DES AJOUTS ===
        $ownerId = Auth::id();

        // 1. Requête de base pour les statistiques (AVANT filtres de recherche)
        $baseQuery = Parking::where('owner_id', $ownerId);

        // 2. Calculer les statistiques globales
        $totalAvailable = (clone $baseQuery)->where('available', true)->count();
        $totalUnavailable = (clone $baseQuery)->where('available', false)->count();
        // === FIN DES AJOUTS ===


        // 3. Requête principale pour la liste (celle-ci SERA filtrée)
        $query = Parking::where('owner_id', $ownerId)
            ->with('owner');

        // Recherche
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('address', 'like', "%{$search}%")
                    ->orWhere('city', 'like', "%{$search}%")
                    ->orWhere('number', 'like', "%{$search}%");
            });
        }

        // Filtrer par disponibilité
        if ($request->has('available') && $request->available !== null) {
            $query->where('available', $request->available);
        }

        // Filtrer par type (supporte plusieurs types séparés par des virgules)
        if ($request->has('type') && $request->type) {
            $types = explode(',', $request->type);
            $query->where(function($q) use ($types) {
                foreach ($types as $type) {
                    switch (trim($type)) {
                        case 'box':
                            $q->orWhere('box', true);
                            break;
                        case 'exterior':
                            $q->orWhere('exterior', true);
                            break;
                        case 'charge':
                            $q->orWhere('charge', true);
                            break;
                    }
                }
            });
        }

        // Tri
        $sortBy = $request->get('sort_by', 'created_at');
        $sortDirection = $request->get('sort_direction', 'desc');

        // Colonnes autorisées pour le tri
        $allowedSortColumns = ['name', 'number', 'city', 'price_per_hour', 'available', 'created_at'];
        if (!in_array($sortBy, $allowedSortColumns)) {
            $sortBy = 'created_at';
        }

        $query->orderBy($sortBy, $sortDirection);

        // === MODIFICATION IMPORTANTE POUR LA PAGINATION FLOWBITE ===
        $parkings = $query->paginate(12)->withQueryString();

        return Inertia::render('parkings/Index', [
            'parkings' => $parkings,
            'filters' => $request->only(['search', 'available', 'type', 'sort_by', 'sort_direction']),

            // === AJOUT DE LA NOUVELLE PROP 'stats' ===
            'stats' => [
                'available' => $totalAvailable,
                'unavailable' => $totalUnavailable
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('parkings/Create');
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
            'address' => 'required|string|max:255',
            'floor' => 'nullable|string|max:5',
            'zip' => 'required|string|max:5',
            'city' => 'required|string|max:255',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'remark' => 'nullable|string|max:500',
            'height' => 'required|numeric|min:0',
            'width' => 'required|numeric|min:0',
            'length' => 'required|numeric|min:0',
            'charge' => 'nullable|boolean',
            'exterior' => 'nullable|boolean',
            'box' => 'nullable|boolean',
            'price_per_hour' => 'required|integer|min:0',
            'available' => 'nullable|boolean'
        ]);

        try {
            // Créer un nouveau parking
            $parking = Parking::create([
                'name' => $validatedData['name'] ?? null,
                'number' => $validatedData['number'] ?? null,
                'address' => $validatedData['address'],
                'floor' => $validatedData['floor'] ?? null,
                'zip' => $validatedData['zip'],
                'city' => $validatedData['city'],
                'latitude' => $validatedData['latitude'] ?? null,
                'longitude' => $validatedData['longitude'] ?? null,
                'remark' => $validatedData['remark'] ?? null,
                'height' => $validatedData['height'],
                'width' => $validatedData['width'],
                'length' => $validatedData['length'],
                'charge' => $validatedData['charge'] ?? false,
                'exterior' => $validatedData['exterior'] ?? false,
                'box' => $validatedData['box'] ?? false,
                'owner_id' => Auth::id(),
                'price_per_hour' => $validatedData['price_per_hour'],
                'available' => $validatedData['available'] ?? true
            ]);

            // Rediriger vers la liste des parkings avec un message de succès
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
        // Récupérer le parking avec l'ID donné
        $parking = Parking::findOrFail($id);

        // Retourner la vue Inertia avec les données du parking
        return Inertia::render('parkings/Show', [
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
        return Inertia::render('parkings/Edit', [
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
            'address' => 'required|string|max:255',
            'floor' => 'nullable|string|max:5',
            'zip' => 'required|string|max:5',
            'city' => 'required|string|max:255',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'remark' => 'nullable|string|max:500',
            'height' => 'required|numeric|min:0',
            'width' => 'required|numeric|min:0',
            'length' => 'required|numeric|min:0',
            'charge' => 'nullable|boolean',
            'exterior' => 'nullable|boolean',
            'box' => 'nullable|boolean',
            'price_per_hour' => 'required|integer|min:0',
            'available' => 'nullable|boolean'
        ]);

        try {
            // Trouver le parking à mettre à jour
            $parking = Parking::findOrFail($id);

            // Vérifier que le parking appartient à l'utilisateur connecté
            if ($parking->owner_id !== Auth::id()) {
                return back()->withErrors(['error' => 'Vous n\'êtes pas autorisé à modifier ce parking.']);
            }

            // Mettre à jour les informations du parking
            $parking->update([
                'name' => $validatedData['name'] ?? null,
                'number' => $validatedData['number'] ?? null,
                'address' => $validatedData['address'],
                'floor' => $validatedData['floor'] ?? null,
                'zip' => $validatedData['zip'],
                'city' => $validatedData['city'],
                'latitude' => $validatedData['latitude'] ?? null,
                'longitude' => $validatedData['longitude'] ?? null,
                'remark' => $validatedData['remark'] ?? null,
                'height' => $validatedData['height'],
                'width' => $validatedData['width'],
                'length' => $validatedData['length'],
                'charge' => $validatedData['charge'] ?? false,
                'exterior' => $validatedData['exterior'] ?? false,
                'box' => $validatedData['box'] ?? false,
                'price_per_hour' => $validatedData['price_per_hour'],
                'available' => $validatedData['available'] ?? true
            ]);

            // Rediriger vers la liste des parkings avec un message de succès
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

            // Vérifier que le parking appartient à l'utilisateur connecté
            if ($parking->owner_id !== Auth::id()) {
                return back()->withErrors(['error' => 'Vous n\'êtes pas autorisé à supprimer ce parking.']);
            }

            $parking->delete();
            return redirect()->route('parkings.index')->with('success', 'Parking supprimé avec succès.');

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Erreur lors de la suppression du parking: ' . $e->getMessage()]);
        }
    }
}
