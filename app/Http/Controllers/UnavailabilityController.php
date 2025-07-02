<?php

namespace App\Http\Controllers;

use App\Models\Unavailability;
use Inertia\Inertia;
use Illuminate\Http\Request;


class UnavailabilityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $unavailabilities = Unavailability::all();
        return inertia('Unavailability/Index', ['unavailability' => $unavailabilities]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Unavailability/Create');

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'parking_id' => 'required|integer',
            'start_date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_date' => 'required|date',
            'end_time' => 'required|date_format:H:i',
            'reason' => 'nullable|string|max:255'
        ]);

        try {
            // Create a new unavailability
            $unavailability = Unavailability::create([
                'parking_id' => $validatedData['parking_id'],
                'start_date' => $validatedData['start_date'],
                'start_time' => $validatedData['start_time'],
                'end_date' => $validatedData['end_date'],
                'end_time' => $validatedData['end_time'],
                'reason' => $validatedData['reason'],
            ]);

            return redirect()->route('unavailability.index')->with('success', 'Unavailability created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to create unavailability: ' . $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $unavailability = Unavailability::findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $unavailability = Unavailability::findOrFail($id);
        return Inertia::render('UnAvailability/Edit', ['unavailability' => $unavailability]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'parking_id' => 'requiered|integer',
            'start_date' => 'nullable|date',
            'start_time' => 'nullable|date_format:H:i',
            'end_date' => 'nullable|date',
            'end_time' => 'nullable|date_format:H:i',
            'reason' => 'nullable|string|max:255'
        ]);

        try {
            $unavailability = Unavailability::findOrFail($id);
            // Update the unavailability
            $unavailability->update([
                'parking_id' => $validatedData['parking_id'],
                'start_date' => $validatedData['start_date'],
                'start_time' => $validatedData['start_time'],
                'end_date' => $validatedData['end_date'],
                'end_time' => $validatedData['end_time'],
                'reason' => $validatedData['reason'],
            ]);

            return redirect()->route('unavailability.index')->with('success', 'Unavailability updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to update unavailability: ' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $unavailability = Unavailability::findOrFail($id);
            $unavailability->delete();

            return redirect()->route('unavailability.index')->with('success', 'Unavailability deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to delete unavailability: ' . $e->getMessage()]);
        }
    }
}
