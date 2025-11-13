<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;
use App\Mail\ContactFormMail;

class ContactController extends Controller
{
    /**
     * Affiche la page de contact.
     */
    public function create(): Response
    {
        return Inertia::render('guest/Contact');
    }

    public function store(Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'message' => 'required|string|min:10|max:2000',
        ], [
            // Messages personnalisés en français
            'first_name.required' => 'Le prénom est obligatoire.',
            'first_name.max' => 'Le prénom ne peut pas dépasser 100 caractères.',
            'last_name.required' => 'Le nom est obligatoire.',
            'last_name.max' => 'Le nom ne peut pas dépasser 100 caractères.',
            'email.required' => 'L\'adresse email est obligatoire.',
            'email.email' => 'L\'adresse email n\'est pas valide.',
            'email.max' => 'L\'email ne peut pas dépasser 255 caractères.',
            'phone.max' => 'Le téléphone ne peut pas dépasser 20 caractères.',
            'message.required' => 'Le message est obligatoire.',
            'message.min' => 'Le message doit contenir au moins 10 caractères.',
            'message.max' => 'Le message ne peut pas dépasser 2000 caractères.',
        ]);

        try {
            Mail::to('aimen2nice+admin@gmail.com')->send(new ContactFormMail($validatedData));
        } catch (\Exception $e) {
            Log::error('Erreur d\'envoi d\'email de contact: ' . $e->getMessage());
            throw ValidationException::withMessages([
                'email' => 'Impossible d\'envoyer le message pour le moment. Veuillez réessayer plus tard.'
            ]);
        }

        return back();
    }
}
