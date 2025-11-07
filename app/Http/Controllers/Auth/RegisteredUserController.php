<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'firstname' => 'required|string|min:1|max:255',
            'lastname' => 'required|string|min:1|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'address' => 'required|string|max:255',
            'zipcode' => ['required', 'regex:/^(0[1-9]|[1-8][0-9]|9[0-5]|97[1-6]|98[0-9])\d{3}$/'],
            'city' => 'required|string|min:3|max:255',
            'phone_number' => 'nullable|string|max:10',
            'role_id'   => [
                'nullable',
                'integer',
                Rule::exists(Role::class, 'id'),
            ],
        ], [
            'zipcode.regex' => 'Le code postal doit contenir 5 chiffres valides.',
        ]);

        $roleId = $request->filled('role_id')
            ? $request->integer('role_id')
            : 4;

        $user = User::create([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'address' => $request->address,
            'zipcode' => $request->zipcode,
            'city' => $request->city,
            'phone_number' => $request->phone_number,
            'role_id' => $roleId,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect()->intended(route('dashboard', absolute: false));
    }
}
