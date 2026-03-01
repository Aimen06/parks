<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Inertia\Inertia;
use Illuminate\Http\Request;


class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $payments = Payment::all();
        return Inertia::render('Payments/Index', [
            'payments' => $payments,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Payments/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'invoice_id'        => 'required|exists:invoices,id',
            'billing_method_id' => 'required|exists:billing_methods,id',
            'amount'            => 'required|numeric',
            'reference'         => 'required|string',
        ]);

        Payment::create(array_merge($validated, [
            'user_id' => Auth::id(),
            'status'  => 'pending'
        ]));

        return redirect()->route('payments.index')->with('success', 'Paiement enregistré.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $payment = Payment::findOrFail($id);
        return Inertia::render('Payments/Show', [
            'payment' => $payment
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $payment = Payment::findOrFail($id);
        return Inertia::render('Payments/Edit', ['payment' => $payment]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'invoice_id' => 'required|numeric',
            'rate' => 'required|numeric',
        ]);
        try {
            $payment = Payment::findOrFail($id);
            $payment->update([
                'invoice_id' => $validatedData['invoice_id'],
                'rate' => $validatedData['rate'],
            ]);
            return redirect()->route('payments.index')->with('success', 'Paiment mise à jour avec succès.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Erreur lors de la mise à jour du payment : ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        try {
            $payment = Payment::findOrFail($id);
            $payment->delete();
            return redirect()->route('payments.index')->with('success', 'Payment supprimée avec succès.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Erreur lors de la suppression du payment : ' . $e->getMessage());
        }
    }
}
