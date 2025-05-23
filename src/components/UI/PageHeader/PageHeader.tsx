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
        <div className={className}>
            <div className="flex">
                <div className="flex-1 mx-2">
                    <h2 className="px-4 py-2 text-xl font-semibold text-white">
                        {title}
                    </h2>
                </div>
            </div>

            {subtitle && (
                <div className="px-6 pb-2">
                    <p className="text-sm text-gray-400">
                        {subtitle}
                    </p>
                </div>
            )}

            {children && (
                <div className="mt-2 px-4">
                    {children}
                </div>
            )}

            <hr className="border-gray-800"/>
        </div>
    );
};

export default PageHeader;
