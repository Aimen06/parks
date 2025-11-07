import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthFormLayout from '@/layouts/AuthFormLayout';

type RegisterForm = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    password_confirmation: string;
    address: string;
    zipcode: string;
    city: string;
    phone_number?: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password_confirmation: '',
        address: '',
        zipcode: '',
        city: '',
        phone_number: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthFormLayout title="Créer un compte" description="Saisir vos informations pour créer un compte.">
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="firstname">Nom</Label>
                        <Input
                            id="firstname"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="family-name"
                            value={data.firstname}
                            onChange={(e) => setData('firstname', e.target.value)}
                            disabled={processing}
                            placeholder="Dupont"
                        />
                        <InputError message={errors.firstname} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="lastname">Prénom</Label>
                        <Input
                            id="lastname"
                            type="text"
                            required
                            tabIndex={2}
                            autoComplete="given-name"
                            value={data.lastname}
                            onChange={(e) => setData('lastname', e.target.value)}
                            disabled={processing}
                            placeholder="Tom"
                        />
                        <InputError message={errors.lastname} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="dupont.tom@gmail.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="******"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirmation du passe</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="******"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="address">Adresse</Label>
                        <Input
                            id="address"
                            type="text"
                            required
                            tabIndex={3}
                            autoComplete="street-address"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            disabled={processing}
                            placeholder="2 rue de la Paix"
                        />
                        <InputError message={errors.address} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="zipcode">Code postal</Label>
                        <Input
                            id="zipcode"
                            type="text"
                            required
                            tabIndex={4}
                            inputMode="numeric"
                            autoComplete="postal-code"
                            pattern="[0-9]{5}"         // ou "\\d{5}"
                            maxLength={5}
                            value={data.zipcode}
                            onChange={(e) => setData('zipcode', e.target.value)}
                            disabled={processing}
                            placeholder="06000"
                        />
                        <InputError message={errors.zipcode} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="city">Ville</Label>
                        <Input
                            id="city"
                            type="text"
                            required
                            tabIndex={5}
                            autoComplete="address-level2"
                            value={data.city}
                            onChange={(e) => setData('city', e.target.value)}
                            disabled={processing}
                            placeholder="Nice"
                        />
                        <InputError message={errors.city} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="phone_number">Numéro de téléphone</Label>
                        <Input
                            id="phone_number"
                            type="text"
                            required
                            tabIndex={6}
                            inputMode="numeric"
                            autoComplete="tel"
                            pattern="[0-9]{10}"
                            maxLength={10}
                            value={data.phone_number}
                            onChange={(e) =>
                                setData('phone_number', e.target.value.replace(/\D/g, '').slice(0, 10))
                            }
                            disabled={processing}
                            placeholder="06XXXXXXXX"
                        />
                        <InputError message={errors.phone_number} />
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Créer mon compte
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Vous avez déjà un compte?{' '}
                    <TextLink href={route('login')} tabIndex={6}>
                        Connexion
                    </TextLink>
                </div>
            </form>
        </AuthFormLayout>
    );
}
