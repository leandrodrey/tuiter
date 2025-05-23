import {type JSX} from 'react';
import type {PostFormData} from "../../../types/formTypes.ts";

interface ClearDraftButtonProps {
    onClick: (resetForm: (nextState?: { values: PostFormData }) => void) => void;
    resetForm: (nextState?: { values: PostFormData }) => void;
    isDisabled: boolean;
}

/**
 * Button component for clearing a draft of a post.
 * Shows a trash icon and text.
 *
 * @param {ClearDraftButtonProps} props - Component props
 * @returns {JSX.Element} The clear draft button component
 */
const ClearDraftButton = ({
    onClick,
    resetForm,
    isDisabled
}: ClearDraftButtonProps): JSX.Element => {
    return (
        <div className="flex-1 text-center px-1 py-1 m-2">
            <button
                type="button"
                onClick={() => onClick(resetForm)}
                disabled={isDisabled}
                aria-label="Clear draft"
                className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-blue-300"
            >
                <svg
                    className="text-center h-7 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    role="img"
                >
                    <title>Trash icon</title>
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                <span className="ml-1 text-sm">Clear</span>
            </button>
        </div>
    );
};

export default ClearDraftButton;
