import {type JSX} from 'react';

/**
 * Props for the CircularProgress component
 * @interface CircularProgressProps
 * @property {number} value - The current value
 * @property {number} maxValue - The maximum value
 * @property {boolean} showExclamation - Whether to show an exclamation mark when over limit
 */
interface CircularProgressProps {
    value: number;
    maxValue: number;
    showExclamation?: boolean;
}

/**
 * Circular progress indicator component.
 * Displays a circular progress bar that changes color based on the percentage of completion.
 *
 * @param {CircularProgressProps} props - Component props
 * @returns {JSX.Element} The circular progress component
 */
const CircularProgress = ({value, maxValue, showExclamation = false}: CircularProgressProps): JSX.Element => {
    // Calculate percentage for circular progress
    const percentage = Math.min(100, (value / maxValue) * 100);
    const circumference = 2 * Math.PI * 10; // 10 is the radius of the circle
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    // Determine if approaching limit
    const isNearLimit = value >= maxValue * 0.9 && value <= maxValue;
    const isOverLimit = value > maxValue;

    // Determine color based on percentage
    const getProgressColor = () => {
        if (isOverLimit) return 'text-red-500 dark:text-red-400';
        if (isNearLimit) return 'text-yellow-500 dark:text-yellow-400';
        if (percentage > 75) return 'text-orange-500 dark:text-orange-400';
        return 'text-blue-500 dark:text-blue-400';
    };

    return (
        <div className="relative w-6 h-6">
            <svg className="w-6 h-6 transform -rotate-90" viewBox="0 0 24 24">
                <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-gray-200 dark:text-gray-700"
                />
                <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className={getProgressColor()}
                    strokeLinecap="round"
                />
            </svg>
            {showExclamation && isOverLimit && (
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-red-500 dark:text-red-400">!</span>
            )}
        </div>
    );
};

export default CircularProgress;
