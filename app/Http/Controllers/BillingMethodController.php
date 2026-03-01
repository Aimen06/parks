<?php

namespace App\Http\Controllers;


use App\Models\BillingMethod;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BillingMethodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $billingMethods = BillingMethod::all();
        return Inertia::render('BillingMethods/Index', [
            'billingMethods' => $billingMethods,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('BillingMethods/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'       => 'required|string|max:50',
            'type'       => 'required|in:cb,rib,paypal',
            'value'      => 'required|string', // Sera encrypté par le modèle
            'is_default' => 'nullable|boolean',
        ]);

        Auth::user()->billingMethods()->create($validated);

        return redirect()->route('billing-methods.index')->with('success', 'Moyen de paiement ajouté.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $billingMethod = BillingMethod::findOrFail($id);
        return Inertia::render('BillingMethods/Show', [
            'billingMethod' => $billingMethod,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BillingMethod $billingMethod)
    {
        $billingMethod = BillingMethod::findOrFail($billingMethod->id);
        return Inertia::render('BillingMethods/Edit', [
            'billingMethod' => $billingMethod,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:50',
            'default' => 'nullable|boolean',
        ]);

        try {
            $billingMethod = BillingMethod::findOrFail($id);
            $billingMethod->update([
                'name' => $validatedData['name'],
                'default' => $validatedData['default'],
            ]);
            return redirect()->route('billing-methods.index')->with('success', 'Moyen de paiement mis à jour avec succès.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Erreur lors de la mise à jour du moyen de paiement : ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
       try {
            $billingMethod = BillingMethod::findOrFail($id);
            $billingMethod->delete();
            return redirect()->route('billing-methods.index')->with('success', 'Moyen de paiement supprimé avec succès.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Erreur lors de la suppression du moyen de paiement : ' . $e->getMessage());
       }
    }
}
