import React from 'react';

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
    user: User;
}

const Show: React.FC<Props> = ({ user }) => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-white">User Details</h1>
            <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 border-b-2 border-indigo-500 pb-2 mb-4">Basic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <p className="text-gray-600"><span className="font-medium text-gray-800">ID:</span> {user.id}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-600"><span className="font-medium text-gray-800">First Name:</span> {user.firstname}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-600"><span className="font-medium text-gray-800">Last Name:</span> {user.lastname}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-600"><span className="font-medium text-gray-800">Email:</span> {user.email}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-600"><span className="font-medium text-gray-800">Email Verified:</span> {user.email_verified_at ? 'Yes' : 'No'}</p>
                        </div>
                    </div>
                </div>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 border-b-2 border-indigo-500 pb-2 mb-4">Role Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <p className="text-gray-600"><span className="font-medium text-gray-800">Role ID:</span> {user.role_id}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-700 border-b-2 border-indigo-500 pb-2 mb-4">Address Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <p className="text-gray-600"><span className="font-medium text-gray-800">Address:</span> {user.address}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-600"><span className="font-medium text-gray-800">ZIP:</span> {user.zip}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-600"><span className="font-medium text-gray-800">City:</span> {user.city}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-600"><span className="font-medium text-gray-800">RGPD:</span> {user.rgpd ? 'Yes' : 'No'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Show;
