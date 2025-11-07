import React from 'react';
import { Inertia } from '@inertiajs/inertia';

interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    email_verified_at: string | null;
    role_id: number;
    address: string;
    zip: string;
    city: string;
    rgpd: boolean;
}

interface Props {
    users: User[];
}

const Index: React.FC<Props> = ({ users }) => {
    const handleDelete = (id: number) => {
        if (confirm('Voulez vous supprimer cet user ?')) {
            Inertia.delete(`/users/${id}`);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-black">Users</h1>
            <a
                href="/users/create"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6 inline-block"
            >
                Create New User
            </a>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-medium text-black">ID</th>
                        <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-medium text-black">First Name</th>
                        <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-medium text-black">Last Name</th>
                        <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-medium text-black">Email</th>
                        <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-medium text-black">Email Verified</th>
                        <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-medium text-black">Role ID</th>
                        <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-medium text-black">Address</th>
                        <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-medium text-black">ZIP</th>
                        <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-medium text-black">City</th>
                        <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-medium text-black">RGPD</th>
                        <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-medium text-black">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4 border-b border-gray-200 text-black">{user.id}</td>
                            <td className="py-3 px-4 border-b border-gray-200 text-black">{user.firstname}</td>
                            <td className="py-3 px-4 border-b border-gray-200 text-black">{user.lastname}</td>
                            <td className="py-3 px-4 border-b border-gray-200 text-black">{user.email}</td>
                            <td className="py-3 px-4 border-b border-gray-200 text-black">{user.email_verified_at ? 'Yes' : 'No'}</td>
                            <td className="py-3 px-4 border-b border-gray-200 text-black">{user.role_id}</td>
                            <td className="py-3 px-4 border-b border-gray-200 text-black">{user.address}</td>
                            <td className="py-3 px-4 border-b border-gray-200 text-black">{user.zip}</td>
                            <td className="py-3 px-4 border-b border-gray-200 text-black">{user.city}</td>
                            <td className="py-3 px-4 border-b border-gray-200 text-black">{user.rgpd ? 'Yes' : 'No'}</td>
                            <td className="py-3 px-4 border-b border-gray-200">
                                <div className="flex space-x-2">
                                    <a
                                        href={`/users/${user.id}`}
                                        className="text-blue-500 hover:text-blue-700"
                                        title="View"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a
                                        href={`/users/${user.id}/edit`}
                                        className="text-green-500 hover:text-green-700"
                                        title="Edit"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                    </a>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-500 hover:text-red-700"
                                        title="Delete"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Index;
