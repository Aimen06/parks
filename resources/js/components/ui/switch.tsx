import React from 'react';

interface SwitchProps {
    id: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    label?: string;
    icon?: React.ReactNode;
    color?: 'pink' | 'red' | 'green' | 'blue';
}

export const Switch: React.FC<SwitchProps> = ({
    id,
    checked,
    onChange,
    disabled = false,
    label,
    icon,
    color = 'pink'
}) => {
    const getColorClasses = () => {
        switch (color) {
            case 'red':
                return checked ? 'bg-red-500 dark:bg-red-600' : 'bg-gray-300 dark:bg-gray-600';
            case 'green':
                return checked ? 'bg-green-500 dark:bg-green-600' : 'bg-gray-300 dark:bg-gray-600';
            case 'blue':
                return checked ? 'bg-blue-500 dark:bg-blue-600' : 'bg-gray-300 dark:bg-gray-600';
            case 'pink':
            default:
                return checked ? 'bg-pink-500 dark:bg-pink-600' : 'bg-gray-300 dark:bg-gray-600';
        }
    };

    const getFocusRingColor = () => {
        switch (color) {
            case 'red':
                return 'focus:ring-red-500';
            case 'green':
                return 'focus:ring-green-500';
            case 'blue':
                return 'focus:ring-blue-500';
            case 'pink':
            default:
                return 'focus:ring-pink-500';
        }
    };

    return (
        <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="flex items-center gap-3">
                {icon && (
                    <div className="text-gray-600 dark:text-gray-400">
                        {icon}
                    </div>
                )}
                {label && (
                    <label
                        htmlFor={id}
                        className="text-base font-normal text-gray-900 dark:text-white cursor-pointer select-none"
                    >
                        {label}
                    </label>
                )}
            </div>
            <button
                id={id}
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                onClick={() => onChange(!checked)}
                className={`
                    relative inline-flex h-7 w-12 items-center rounded-full
                    transition-colors duration-200 ease-in-out
                    focus:outline-none focus:ring-2 focus:ring-offset-2 ${getFocusRingColor()}
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${getColorClasses()}
                `}
            >
                <span
                    className={`
                        inline-block h-5 w-5 transform rounded-full bg-white
                        transition-transform duration-200 ease-in-out
                        shadow-md
                        ${checked ? 'translate-x-6' : 'translate-x-1'}
                    `}
                />
            </button>
        </div>
    );
};
