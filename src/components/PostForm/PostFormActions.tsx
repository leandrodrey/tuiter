import {type JSX, useState} from 'react';
import type {PostFormData} from '../../validations/postSchemas';
import Spinner from '../UI/Loader/Spinner.tsx';

interface PostFormActionsProps {
    isSubmitting: boolean;
    values: PostFormData;
    resetForm: (nextState?: { values: PostFormData }) => void;
    onSaveDraft: (values: PostFormData) => void;
    onClearDraft: (resetForm: (nextState?: { values: PostFormData }) => void) => void;
}

const PostFormActions = ({
    isSubmitting,
    values,
    resetForm,
    onSaveDraft,
    onClearDraft
}: PostFormActionsProps): JSX.Element => {
    const isMessageEmpty = !values.message.trim();
    const [showTooltip, setShowTooltip] = useState<string | null>(null);

    // Character count for the message
    const charCount = values.message.trim().length;
    const maxChars = 280; // Twitter/X.com standard
    const isOverLimit = charCount > maxChars;

    return (
        <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
                <div className="flex flex-wrap gap-2">
                    <div className="relative inline-block">
                        <button
                            type="button"
                            onClick={() => onSaveDraft(values)}
                            disabled={isSubmitting || isMessageEmpty}
                            onMouseEnter={() => setShowTooltip('save')}
                            onMouseLeave={() => setShowTooltip(null)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="hidden sm:inline">Save Draft</span>
                            <span className="sm:hidden">Save</span>
                        </button>
                        {showTooltip === 'save' && (
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-lg whitespace-nowrap">
                                Save your post as a draft
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                            </div>
                        )}
                    </div>

                    <div className="relative inline-block">
                        <button
                            type="button"
                            onClick={() => onClearDraft(resetForm)}
                            disabled={isSubmitting || isMessageEmpty}
                            onMouseEnter={() => setShowTooltip('clear')}
                            onMouseLeave={() => setShowTooltip(null)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="hidden sm:inline">Clear Draft</span>
                            <span className="sm:hidden">Clear</span>
                        </button>
                        {showTooltip === 'clear' && (
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-lg whitespace-nowrap">
                                Clear your current draft
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="relative inline-block">
                    <button
                        type="submit"
                        disabled={isSubmitting || isMessageEmpty || isOverLimit}
                        className="w-full sm:w-auto px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center">
                                <Spinner size="sm" color="white"/>
                                <span className="ml-2">Posting...</span>
                            </span>
                        ) : 'Post'}
                    </button>
                    {isOverLimit && (
                        <div className="absolute -top-2 right-0 transform translate-x-1/2 -translate-y-full px-2 py-1 text-xs text-white bg-red-600 rounded-full shadow-lg">
                            Too long!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostFormActions;
