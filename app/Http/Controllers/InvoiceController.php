<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Inertia\Inertia;
use Illuminate\Http\Request;


class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $invoices = Invoice::all();
        return Inertia::render('Invoice/Index', ['invoices' => $invoices]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Invoices/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'booking_id' => 'required|numeric',
        ]);

        try {
            $invoice = Invoice::create([
                'booking_id' => $validatedData['booking_id']
            ]);
            return redirect()->route('invoices.index')->with('success', 'Facture créée avec succès.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Erreur lors de la création de la facture : ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $invoice = Invoice::findOrFail($id);
        return Inertia::render('Bookings/Show', [
            'invoice' => $invoice
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $invoice = Invoice::findOrFail($id);
        return Inertia::render('Invoices/Edit', ['invoice' => $invoice]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'booking_id' => 'required|numeric',
        ]);

        try {
            $invoice = Invoice::findOrFail($id);
            $invoice->update([
                'booking_id' => $validatedData['booking_id']
            ]);
            return redirect()->route('invoices.index')->with('success', 'Facture mise à jour avec succès.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Erreur lors de la mise à jour de la facture : ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {

            $invoice = Invoice::findOrFail($id);
            $invoice->delete();
            return redirect()->route('invoice.index')->with('success', 'Facture supprimée avec succès.');

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Erreur lors de la suppression de la facture: ' . $e->getMessage()]);
        }
    }
}
