import {type JSX} from 'react';
import type {PostFormData} from "../../../types/formTypes.ts";

interface SaveDraftButtonProps {
    onClick: (values: PostFormData) => void;
    values: PostFormData;
    isDisabled: boolean;
}

/**
 * Button component for saving a draft of a post.
 * Shows a save icon and text.
 *
 * @param {SaveDraftButtonProps} props - Component props
 * @returns {JSX.Element} The save draft button component
 */
const SaveDraftButton = ({
    onClick,
    values,
    isDisabled
}: SaveDraftButtonProps): JSX.Element => {
    return (
        <div className="flex-1 text-center px-1 py-1 m-2">
            <button
                type="button"
                onClick={() => onClick(values)}
                disabled={isDisabled}
                aria-label="Save draft"
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
                    <title>Save icon</title>
                    <path d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
                </svg>
                <span className="ml-1 text-sm">Save</span>
            </button>
        </div>
    );
};

export default SaveDraftButton;
