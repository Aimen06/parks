import React, { useState } from 'react';
import { router } from '@inertiajs/react'; // Import correct pour Inertia avec React

interface UserData {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    password_confirmation: string;
    email_verified_at: string | null;
    role_id: number;
    address: string;
    zip: string;
    city: string;
    rgpd: boolean;
}

const Create: React.FC = () => {
    const [data, setData] = useState<UserData>({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password_confirmation: '',
        email_verified_at: null,
        role_id: 3, // Valeur par défaut
        address: '',
        zip: '',
        city: '',
        rgpd: false,
    });

    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<any>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let val: any = value;

        if (type === 'checkbox') {
            val = (e.target as HTMLInputElement).checked;
        } else if (name === 'role_id') {
            val = parseInt(value, 10); // Convertir en number
        }

        setData(prev => ({
            ...prev,
            [name]: val,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        // Données à envoyer exactement comme dans le state
        const formData = {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation,
            email_verified_at: data.email_verified_at,
            role_id: data.role_id, // Garder en number
            address: data.address,
            zip: data.zip,
            city: data.city,
            rgpd: data.rgpd, // Garder en boolean
        };

        router.post('/users', formData, {
            onSuccess: () => {
                setProcessing(false);
                // Optionnel : redirection ou message de succès
            },
            onError: (errors) => {
                setProcessing(false);
                setErrors(errors);
            },
        });
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Create New User</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">
                        First Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="firstname"
                        type="text"
                        name="firstname"
                        value={data.firstname}
                        onChange={handleChange}
                        required
                    />
                    {errors.firstname && <p className="text-red-500 text-xs italic mt-2">{errors.firstname}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
                        Last Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="lastname"
                        type="text"
                        name="lastname"
                        value={data.lastname}
                        onChange={handleChange}
                        required
                    />
                    {errors.lastname && <p className="text-red-500 text-xs italic mt-2">{errors.lastname}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p className="text-red-500 text-xs italic mt-2">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <p className="text-red-500 text-xs italic mt-2">{errors.password}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password_confirmation">
                        Confirm Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={handleChange}
                        required
                    />
                    {errors.password_confirmation && <p className="text-red-500 text-xs italic mt-2">{errors.password_confirmation}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role_id">
                        Role
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="role_id"
                        name="role_id"
                        value={data.role_id}
                        onChange={handleChange}
                        required
                    >
                        <option value={1}>Admin</option>
                        <option value={2}>User</option>
                        <option value={3}>Guest</option>
                    </select>
                    {errors.role_id && <p className="text-red-500 text-xs italic mt-2">{errors.role_id}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                        Address
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="address"
                        type="text"
                        name="address"
                        value={data.address}
                        onChange={handleChange}
                        required
                    />
                    {errors.address && <p className="text-red-500 text-xs italic mt-2">{errors.address}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zip">
                        ZIP
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="zip"
                        type="text"
                        name="zip"
                        value={data.zip}
                        onChange={handleChange}
                        required
                    />
                    {errors.zip && <p className="text-red-500 text-xs italic mt-2">{errors.zip}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                        City
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="city"
                        type="text"
                        name="city"
                        value={data.city}
                        onChange={handleChange}
                        required
                    />
                    {errors.city && <p className="text-red-500 text-xs italic mt-2">{errors.city}</p>}
                </div>

                <div className="mb-6">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="rgpd"
                            checked={data.rgpd}
                            onChange={handleChange}
                            className="mr-2 leading-tight"
                        />
                        <span className="text-sm text-gray-700">RGPD Consent</span>
                    </label>
                    {errors.rgpd && <p className="text-red-500 text-xs italic mt-2">{errors.rgpd}</p>}
                </div>

                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                        type="submit"
                        disabled={processing}
                    >
                        {processing ? 'Creating...' : 'Create User'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Create;
