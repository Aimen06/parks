import { type PropsWithChildren } from 'react';

interface AuthFormLayoutProps extends PropsWithChildren {
    title?: string;
    description?: string;
}

export default function AuthFormLayout({
    children,
    title,
    description,
}: AuthFormLayoutProps) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                {(title || description) && (
                    <div className="text-center">
                        {title && (
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                {description}
                            </p>
                        )}
                    </div>
                )}
                <div className="rounded-lg bg-white px-8 py-10 shadow dark:bg-gray-800">
                    {children}
                </div>
            </div>
        </div>
    );
}
