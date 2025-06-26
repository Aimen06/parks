<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return Inertia::render('Users/Index', ['users' => $users]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Users/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Valider les données du formulaire
        $validatedData = $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role_id' => 'required|integer|exists:roles,id', // Correction: role_id au lieu de role
            'address' => 'nullable|string|max:255',
            'zip' => 'nullable|string|max:10', // Augmenté à 10 pour les codes postaux internationaux
            'city' => 'nullable|string|max:255',
            'rgpd' => 'nullable|boolean',
        ]);

        try {
            // Créer un nouvel utilisateur
            $user = User::create([
                'firstname' => $validatedData['firstname'], // Correction: firstname -> firstname
                'lastname' => $validatedData['lastname'],   // Correction: lastname -> lastname
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']), // Utilisation de Hash::make()
                'role_id' => $validatedData['role_id'], // Correction: role_id
                'address' => $validatedData['address'],
                'zip' => $validatedData['zip'],
                'city' => $validatedData['city'],
                'rgpd' => $validatedData['rgpd'] ?? false,
                'email_verified_at' => null, // Ajout du champ si nécessaire
            ]);

            // Rediriger vers la liste des utilisateurs avec un message de succès
            return redirect()->route('users.index')->with('success', 'Utilisateur créé avec succès.');

        } catch (\Exception $e) {
            // Gestion des erreurs
            return back()->withInput()->withErrors(['error' => 'Erreur lors de la création de l\'utilisateur: ' . $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Récupérer l'utilisateur avec l'ID donné
        $user = User::findOrFail($id);

        // Retourner la vue Inertia avec les données de l'utilisateur
        return Inertia::render('Users/Show', [
            'user' => $user
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Récupérer l'utilisateur avec l'ID donné
        $user = User::findOrFail($id);

        // Retourner la vue Inertia pour l'édition de l'utilisateur
        return Inertia::render('Users/Edit', [
            'user' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Valider les données du formulaire
        $validatedData = $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'role_id' => 'required|integer|exists:roles,id',
            'address' => 'nullable|string|max:255',
            'zip' => 'nullable|string|max:10',
            'city' => 'nullable|string|max:255',
            'rgpd' => 'nullable|boolean',
        ]);

        try {
            // Trouver l'utilisateur à mettre à jour
            $user = User::findOrFail($id);

            // Mettre à jour les informations de l'utilisateur
            $user->update([
                'firstname' => $validatedData['firstname'],
                'lastname' => $validatedData['lastname'],
                'email' => $validatedData['email'],
                'role_id' => $validatedData['role_id'],
                'address' => $validatedData['address'],
                'zip' => $validatedData['zip'],
                'city' => $validatedData['city'],
                'rgpd' => $validatedData['rgpd'] ?? false,
            ]);

            // Rediriger vers la liste des utilisateurs avec un message de succès
            return redirect()->route('users.index')->with('success', 'Utilisateur mis à jour avec succès.');

        } catch (\Exception $e) {
            // Gestion des erreurs
            return back()->withInput()->withErrors(['error' => 'Erreur lors de la mise à jour de l\'utilisateur: ' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {

            $user = User::findOrFail($id);
            $user->delete();
            return redirect()->route('users.index')->with('success', 'Utilisateur supprimé avec succès.');

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Erreur lors de la suppression de l\'utilisateur: ' . $e->getMessage()]);
        }
    }
    }
}
