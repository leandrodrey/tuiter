import {type JSX, type ReactNode} from 'react';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    className?: string;
    children?: ReactNode;
}

const PageHeader = ({
    title,
    subtitle,
    className = '',
    children
}: PageHeaderProps): JSX.Element => {
    return (
        <div className={`mb-8 ${className}`}>
            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
                {title}
            </h1>

            {subtitle && (
                <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
                    {subtitle}
                </p>
            )}

            {children && (
                <div className="mt-4">
                    {children}
                </div>
            )}
        </div>
    );
};

export default PageHeader;
