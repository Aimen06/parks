<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $reviews = Review::all();
       return inertia('Reviews/Index', ['reviews' => $reviews]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Reviews/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'customer_id' => 'requiered|numeric',
            'parking_id' => 'requiered|numeric',
            'note' => 'requiered|numeric|min:1|max:5',
            'comment' => 'requiered|text|max:300',
        ]);
        try {
            // Créer une nouvelle réservation
            $review = Review::create([
                'customer_id' => $validatedData['customer_id'],
                'parking_id' => $validatedData['parking_id'],
                'comment' => $validatedData['comment']
            ]);

            // Rediriger vers la liste des utilisateurs avec un message de succès
            return redirect()->route('reviews.index')->with('success', 'Revue créé avec succès.');

        } catch (\Exception $e) {
            // Gestion des erreurs
            return back()->withInput()->withErrors(['error' => 'Erreur lors de la création de la revue
            : ' . $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $review = Review::findOrFail($id);
        return Inertia::render('Reviews/Show', [
            'review' => $review
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $review = Review::findOrFail($id);
        return Inertia::render('Reviews/Edit', [
            'review' => $review
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $review = Review::findOrFail($id);
        $validatedData = $request->validate([
            'customer_id' => 'requiered|numeric',
            'parking_id' => 'requiered|numeric',
            'note' => 'requiered|numeric|min:1|max:5',
            'comment' => 'nullable|text|max:300',
        ]);
        try {
            $review->update(
                [
                    'customer_id' => $validatedData['customer_id'],
                    'parking_id' => $validatedData['parking_id'],
                    'note' => $validatedData['note'],
                    'comment' => $validatedData['comment']
                ]
            );
            return redirect()->route('reviews.index')->with('success', 'Revue mise à jour avec succès.');
        } catch (\Exception $e) {
            return back()->withInput()->withErrors(['error' => 'Erreur lors de la mise à jour de la revue : ' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $review = Review::findOrFail($id);
            $review->delete();
            return redirect()->route('reviews.index')->with('success', 'Revue supprimée avec succès.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Erreur lors de la suppression de la revue : ' . $e->getMessage()]);
        }
    }
}
