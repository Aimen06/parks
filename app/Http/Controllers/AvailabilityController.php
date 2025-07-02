<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Availability;

class AvailabilityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $availabilities = Availability::all();
        return Inertia::render('Availability/Index', ['availabilities' => $availabilities]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Availability/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'parking_id' => 'required|integer',
            'day_of_week' => 'required|integer|between:1,7',
            'start_time' => 'required|timestamp',
            'end_time' => 'required|timestamp',
            'available' => 'nullable|boolean'
        ]);

        try {
            // Create a new availability
            $availability = Availability::create([
                'parking_id' => $validatedData['parking_id'],
                'start_time' => $validatedData['start_time'],
                'end_time' => $validatedData['end_time'],
                'available' => $validatedData['available'] ?? true,
            ]);

            return redirect()->route('availabilities.index')->with('success', 'Availability created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to create availability: ' . $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $availability = Availability::findOrFail($id);
        return Inertia::render('Availabilities/Show', ['availability' => $availability]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $availability = Availability::findOrFail($id);
        return Inertia::render('Availabilities/Edit', ['availability' => $availability]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'parking_id' => 'required|numeric',
            'day_of_week' => 'required|integer|between:1,7',
            'start_time' => 'required|timestamp',
            'end_time' => 'required|timestamp',
            'available' => 'nullable|boolean'
        ]);
        try {
            $availability = Availability::findOrFail($id);
            $availability->update([
                'parking_id' => $validatedData['parking_id'],
                'start_time' => $validatedData['start_time'],
                'end_time' => $validatedData['end_time'],
                'available' => $validatedData['available'] ?? true,
            ]);

            return redirect()->route('availabilities.index')->with('success', 'Availability updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to update availability: ' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $availability = Availability::findOrFail($id);
            $availability->delete();
            return redirect()->route('availabilities.index')->with('success', 'Availability deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to delete availability: ' . $e->getMessage()]);
        }
    }
}
