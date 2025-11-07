import React, { useState } from 'react';
import { router } from '@inertiajs/react';

interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    role_id: number;
    address: string;
    zip: string;
    city: string;
    rgpd: boolean;
}

interface EditProps {
    user: User;
}

interface UserData {
    firstname: string;
    lastname: string;
    email: string;
    role_id: number;
    address: string;
    zip: string;
    city: string;
    rgpd: boolean;
}

const Edit: React.FC<EditProps> = ({ user }) => {
    const [data, setData] = useState<UserData>({
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        email: user.email || '',
        role_id: user.role_id || 3,
        address: user.address || '',
        zip: user.zip || '',
        city: user.city || '',
        rgpd: user.rgpd || false,
    });

    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<any>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let val: any = value;

        if (type === 'checkbox') {
            val = (e.target as HTMLInputElement).checked;
        } else if (name === 'role_id') {
            val = parseInt(value, 10);
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

        // Préparer les données - ne pas envoyer les mots de passe vides
        const formData: any = {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            role_id: data.role_id,
            address: data.address,
            zip: data.zip,
            city: data.city,
            rgpd: data.rgpd,
        };


        router.put(`/users/${user.id}`, formData, {
            onSuccess: () => {
                setProcessing(false);
            },
            onError: (errors) => {
                setProcessing(false);
                setErrors(errors);
            },
        });
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit User #{user.id}</h1>
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
                        <option value={2}>Staff</option>
                        <option value={3}>Customer</option>
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
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                        type="submit"
                        disabled={processing}
                    >
                        {processing ? 'Updating...' : 'Update User'}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.get('/users')}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
