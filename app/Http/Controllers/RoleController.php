<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::all();

        return response()->json([
            'roles' => $roles,
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Roles/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
        ]);

        $role = Role::create([
            'name' => $validated['name'],
        ]);

        return response()->json([
            'message' => 'Role created successfully.',
            'role' => $role,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $role = Role::find($id);

        if (!$role) {
            return response()->json([
                'message' => 'Role not found.'
            ], 404);
        }

        return response()->json([
            'role' => $role,
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Récupérer l'utilisateur avec l'ID donné
        $role = Role::findOrFail($id);

        // Retourner la vue Inertia pour l'édition du role
        return Inertia::render('Roles/Edit', [
            'role' => $role
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Valider les données du formulaire
        $validatedData = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        try {
            // Trouver le rôle à mettre à jour
            $role = Role::findOrFail($id);
            // Mettre à jour les informations du rôle
            $role->update([
                'name' => $validatedData['name'],
            ]);

            // Rediriger vers la liste des utilisateurs avec un message de succès
            return redirect()->route('roles.index')->with('success', 'Role mis à jour avec succès.');

        } catch (\Exception $e) {
            // Gestion des erreurs
            return back()->withInput()->withErrors(['error' => 'Erreur lors de la mise à jour du role : ' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {

            $role = Role::findOrFail($id);
            $role->delete();
            return redirect()->route('roles.index')->with('success', 'Role supprimé avec succès.');

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Erreur lors de la suppression du role: ' . $e->getMessage()]);
        }
    }
}
