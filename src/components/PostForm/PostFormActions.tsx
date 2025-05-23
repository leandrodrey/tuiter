import {type JSX} from 'react';
import type {PostFormData} from '../../types/formTypes.ts';
import Spinner from '../UI/Loader/Spinner.tsx';
import {CharCount, SaveDraftButton, ClearDraftButton, TweetButton} from '../UI';

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
    const charCount = values.message.trim().length;
    const maxChars = 280;
    const isOverLimit = charCount > maxChars;

    return (
        <div className="flex">
            <div className="w-64 px-2">
                <div className="flex items-center">
                    {/* Save Draft button */}
                    <SaveDraftButton
                        onClick={onSaveDraft}
                        values={values}
                        isDisabled={isSubmitting || isMessageEmpty}
                    />

                    {/* Clear Draft button */}
                    <ClearDraftButton
                        onClick={onClearDraft}
                        resetForm={resetForm}
                        isDisabled={isSubmitting || isMessageEmpty}
                    />
                </div>
            </div>

            <div className="flex-1 flex items-center justify-end">
                {charCount > 0 && (
                    <div className="mr-3">
                        <CharCount charCount={charCount} maxChars={maxChars} />
                    </div>
                )}
                <TweetButton
                    type="submit"
                    disabled={isSubmitting || isMessageEmpty || isOverLimit}
                    className="mr-8 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center">
                            <Spinner size="sm" color="white"/>
                            <span className="ml-2">Posting...</span>
                        </span>
                    ) : null}
                </TweetButton>
            </div>
        </div>
    );
};

export default PostFormActions;
