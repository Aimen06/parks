<?php

namespace App\Http\Controllers;

use App\Models\Payout;
use App\Models\Payouts;
use Illuminate\Http\Request;

class PayoutsController extends Controller
{
    public function index()
    {
        $payouts = Payout::where('user_id', Auth::id())->paginate(10);
        return Inertia::render('Payouts/Index', ['payouts' => $payouts]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'invoice_id'    => 'required|exists:invoices,id',
            'payout_method' => 'required|in:bank_transfer,paypal,stripe',
            'amount'        => 'required|integer',
        ]);

         $commission = (int)($validated['amount'] * 0.10);

        Payout::create([
            'invoice_id'      => $validated['invoice_id'],
            'user_id'         => Auth::id(),
            'payout_method'   => $validated['payout_method'],
            'amount'          => $validated['amount'],
            'commission_rate' => 10,
            'net_amount'      => $validated['amount'] - $commission,
            'status'          => 'pending',
            'reference'       => 'PAY-' . strtoupper(str()->random(8)),
            'scheduled_at'    => now()->addDays(7),
        ]);

        return redirect()->back()->with('success', 'Demande de virement créée.');
    }
}
