<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Queue\SerializesModels;

class ContactFormMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Les données du formulaire de contact.
     *
     * @var array
     */
    public $data;

    /**
     * Crée une nouvelle instance de message.
     *
     * @param array $data Les données validées du formulaire
     */
    public function __construct(array $data)
    {
        $this->data = $data;
    }

    /**
     * Définit l'enveloppe du message (sujet, expéditeur, etc.).
     */
    public function envelope(): Envelope
    {
        // On utilise l'email de l'utilisateur comme "Reply-To"
        // pour que l'admin puisse répondre directement.
        return new Envelope(
            from: new Address('noreply@parks.com', 'Parks - Formulaire de Contact'),
            replyTo: [
                new Address($this->data['email'], $this->data['first_name'] . ' ' . $this->data['last_name']),
            ],
            subject: 'Nouveau Message de Contact - Parks',
        );
    }

    /**
     * Définit le contenu du message (le template Blade).
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.contact-form',
            with: [
                'formData' => $this->data,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
