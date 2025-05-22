import {type JSX} from 'react';
import type {PostFormData} from '../../validations/postSchemas';

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

    return (
        <div className="button-group">
            <button
                type="button"
                onClick={() => onSaveDraft(values)}
                disabled={isSubmitting || isMessageEmpty}
                className="save-draft-button"
            >
                Save Draft
            </button>

            <button
                type="button"
                onClick={() => onClearDraft(resetForm)}
                disabled={isSubmitting || isMessageEmpty}
                className="clear-draft-button"
            >
                Clear Draft
            </button>

            <button
                type="submit"
                disabled={isSubmitting || isMessageEmpty}
                className="submit-button"
            >
                {isSubmitting ? 'Posting...' : 'Post'}
            </button>
        </div>
    );
};

export default PostFormActions;
