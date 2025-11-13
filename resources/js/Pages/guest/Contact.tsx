import React, { FormEventHandler } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import GuestLayout from '@/layouts/GuestLayout';
import { Button, Label, TextInput, Textarea, Spinner } from 'flowbite-react';
import { HiMail, HiPhone, HiSupport } from 'react-icons/hi';
import InputError from '@/components/input-error';

export default function Contact() {
    const { data, setData, post, processing, errors, reset, recentlySuccessful, clearErrors } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        message: '',
    });


    // Validation et soumission
    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('contact.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                const timer = setTimeout(() => {
                    router.visit('/');
                }, 2000);
            },
            onError: (formErrors) => {
            }
        });
    };

    return (
        <GuestLayout>
            <Head title="Contactez-nous" />

            <section
                className="bg-no-repeat bg-cover bg-center bg-gray-700 bg-blend-multiply dark:bg-gray-900 min-h-screen"
                style={{ backgroundImage: "url('https://flowbite.s3.amazonaws.com/blocks/marketing-ui/contact/laptop-human.jpg')" }}
            >
                {/* Hero Section */}
                <div className="px-4 lg:pt-24 pt-8 pb-72 lg:pb-80 mx-auto max-w-screen-sm text-center lg:px-6">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">
                        Contactez-nous
                    </h2>
                    <p className="mb-16 font-light text-gray-400 sm:text-xl">
                        Une question ? Une opportunité ? N'hésitez pas à nous écrire.
                        Notre équipe vous répondra dans les plus brefs délais.
                    </p>
                </div>

                {/* Formulaire et Infos */}
                <div className="py-16 px-4 mx-auto -mt-96 max-w-screen-xl sm:py-24 lg:px-6">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 p-6 mx-auto mb-16 max-w-screen-md bg-white rounded-lg border border-gray-200 shadow-sm lg:mb-28 dark:bg-gray-800 dark:border-gray-700 sm:grid-cols-2">
                        {/* Prénom */}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="first-name">Prénom *</Label>
                            </div>
                            <TextInput
                                id="first-name"
                                name="first_name"
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                                placeholder="Jean"
                                required
                                maxLength={100}
                                color={errors.first_name ? 'failure' : 'gray'}
                            />
                            <InputError message={errors.first_name} className="mt-2" />
                        </div>

                        {/* Nom */}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="last-name">Nom *</Label>
                            </div>
                            <TextInput
                                id="last-name"
                                name="last_name"
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                placeholder="Dupont"
                                required
                                maxLength={100}
                                color={errors.last_name ? 'failure' : 'gray'}
                            />
                            <InputError message={errors.last_name} className="mt-2" />
                        </div>

                        {/* Email */}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email">Votre email *</Label>
                            </div>
                            <TextInput
                                id="email"
                                name="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="vous@exemple.com"
                                required
                                maxLength={255}
                                color={errors.email ? 'failure' : 'gray'}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        {/* Téléphone */}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="phone-number">Téléphone (Optionnel)</Label>
                            </div>
                            <TextInput
                                id="phone-number"
                                name="phone"
                                type="tel"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="+33 6 12 34 56 78"
                                maxLength={20}
                                color={errors.phone ? 'failure' : 'gray'}
                            />
                            <InputError message={errors.phone} className="mt-2" />
                        </div>

                        {/* Message */}
                        <div className="sm:col-span-2">
                            <div className="mb-2 block">
                                <Label htmlFor="message">Votre message *</Label>
                            </div>
                            <Textarea
                                id="message"
                                name="message"
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                placeholder="Laissez un commentaire..."
                                rows={6}
                                required
                                minLength={10}
                                maxLength={2000}
                                color={errors.message ? 'failure' : 'gray'}
                            />
                            <InputError message={errors.message} className="mt-2" />
                            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                {data.message.length}/2000 caractères (minimum 10)
                            </p>
                            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                                En soumettant ce formulaire, vous acceptez nos{' '}
                                <Link href="#" className="text-primary-600 hover:underline dark:text-primary-500">
                                    termes et conditions
                                </Link>
                                {' '}et notre{' '}
                                <Link href="#" className="text-primary-600 hover:underline dark:text-primary-500">
                                    politique de confidentialité
                                </Link>.
                            </p>
                        </div>

                        {/* Bouton d'envoi */}
                        <div className="sm:col-span-2">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Envoi en cours...
                                        </>
                                    ) : (
                                        'Envoyer le message'
                                    )}
                                </button>
                                {recentlySuccessful && (
                                    <div className="text-sm font-medium text-green-600 dark:text-green-400 flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                        </svg>
                                        Message envoyé avec succès ! Redirection en cours...
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>

                    {/* Infos de contact */}
                    <div className="space-y-8 text-center md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                        <div>
                            <div className="flex justify-center items-center mx-auto mb-4 w-10 h-10 bg-gray-100 rounded-lg dark:bg-gray-800 lg:h-16 lg:w-16">
                                <HiMail className="w-5 h-5 text-gray-600 lg:w-8 lg:h-8 dark:text-gray-500" />
                            </div>
                            <p className="mb-2 text-xl font-bold text-white">Envoyez-nous un email</p>
                            <p className="mb-3 text-gray-300 dark:text-gray-400">Pour toute demande générale, marketing ou partenariat.</p>
                            <a href="mailto:contact@parks.com" className="font-semibold text-blue-300 dark:text-blue-400 hover:text-white hover:underline">
                                contact@parks.com
                            </a>
                        </div>
                        <div>
                            <div className="flex justify-center items-center mx-auto mb-4 w-10 h-10 bg-gray-100 rounded-lg dark:bg-gray-800 lg:h-16 lg:w-16">
                                <HiPhone className="w-5 h-5 text-gray-600 lg:w-8 lg:h-8 dark:text-gray-500" />
                            </div>
                            <p className="mb-2 text-xl font-bold text-white">Appelez-nous</p>
                            <p className="mb-3 text-gray-300 dark:text-gray-400">Parlez à un membre de notre équipe. Nous sommes là pour vous aider.</p>
                            <span className="font-semibold text-blue-300 dark:text-blue-400">+33 1 23 45 67 89</span>
                        </div>
                        <div>
                            <div className="flex justify-center items-center mx-auto mb-4 w-10 h-10 bg-gray-100 rounded-lg dark:bg-gray-800 lg:h-16 lg:w-16">
                                <HiSupport className="w-5 h-5 text-gray-600 lg:w-8 lg:h-8 dark:text-gray-500" />
                            </div>
                            <p className="mb-2 text-xl font-bold text-white">Support</p>
                            <p className="mb-3 text-gray-300 dark:text-gray-400">Une question technique ou un problème avec une réservation ?</p>
                            <Link
                                href="/login"
                                className="inline-flex py-2 px-4 text-sm font-medium text-center rounded-lg border text-white border-white hover:text-gray-900 hover:bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 dark:border-gray-400 dark:text-gray-300 dark:hover:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-800"
                            >
                                Utilisez la messagerie de votre espace client.
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
