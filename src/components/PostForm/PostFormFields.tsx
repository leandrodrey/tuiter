import {type JSX} from 'react';
import {Field, ErrorMessage, useField} from 'formik';

interface PostFormFieldsProps {
    isSubmitting: boolean;
}

const PostFormFields = ({isSubmitting}: PostFormFieldsProps): JSX.Element => {
    const [field] = useField('message');
    const charCount = field.value.length;
    const maxChars = 280; // Twitter/X.com standard
    const charsLeft = maxChars - charCount;
    const isNearLimit = charsLeft <= 20;
    const isOverLimit = charsLeft < 0;

    // Calculate percentage for circular progress
    const percentage = Math.min(100, (charCount / maxChars) * 100);
    const circumference = 2 * Math.PI * 10; // 10 is the radius of the circle
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    // Determine color based on character count
    const getProgressColor = () => {
        if (isOverLimit) return 'text-red-500 dark:text-red-400';
        if (isNearLimit) return 'text-yellow-500 dark:text-yellow-400';
        if (percentage > 75) return 'text-orange-500 dark:text-orange-400';
        return 'text-blue-500 dark:text-blue-400';
    };

    return (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
                <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    What's on your mind?
                </label>

                <div className="flex items-center">
                    {/* Circular progress indicator */}
                    <div className="relative w-6 h-6 mr-2">
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
                        {isOverLimit && (
                            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-red-500 dark:text-red-400">!</span>
                        )}
                    </div>

                    <span
                        className={`text-xs font-medium ${
                            isOverLimit
                                ? 'text-red-600 dark:text-red-400'
                                : isNearLimit
                                    ? 'text-yellow-600 dark:text-yellow-400'
                                    : 'text-gray-500 dark:text-gray-400'
                        }`}
                    >
                        {charsLeft} characters left
                    </span>
                </div>
            </div>

            <div className="relative">
                <Field
                    as="textarea"
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Write your post here..."
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 border ${
                        isOverLimit
                            ? 'border-red-500 dark:border-red-600'
                            : 'border-gray-300 dark:border-gray-600'
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition duration-200 ease-in-out resize-none`}
                />

                {/* Emoji picker button (visual only) */}
                <button
                    type="button"
                    disabled={isSubmitting}
                    className="absolute right-3 bottom-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z" clipRule="evenodd"/>
                    </svg>
                </button>

                {isSubmitting && (
                    <div className="absolute inset-0 bg-white bg-opacity-50 dark:bg-gray-800 dark:bg-opacity-50 flex items-center justify-center rounded-lg">
                        <div className="animate-pulse text-blue-500 dark:text-blue-400">
                            Processing...
                        </div>
                    </div>
                )}
            </div>

            <ErrorMessage
                name="message"
                component="div"
                className="mt-2 text-sm text-red-600 dark:text-red-400"
            />
        </div>
    );
};

export default PostFormFields;
