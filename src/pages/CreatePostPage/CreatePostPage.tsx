import {type JSX} from 'react';
import {
    createPostValidationSchema as validationSchema
} from '../../validations/postSchemas';
import PostForm from '../../components/PostForm/PostForm';
import {PageHeader} from '../../components/UI';
import {usePostCreation} from '../../hooks/post-creation/usePostCreation';
import {useUser} from '../../hooks/context/useUser';

/**
 * Page component for creating new posts.
 * Provides a form for users to create posts, save drafts, and submit them.
 * Uses the usePostCreation hook to handle form submission and draft management.
 *
 * @returns {JSX.Element} The rendered create post page
 */
const CreatePostPage = (): JSX.Element => {
    const {
        initialValues,
        handleSubmit,
        handleSaveDraft,
        handleClearDraft
    } = usePostCreation();

    const { userInformation } = useUser();

    return (
        <div>
            <PageHeader title="Create New Post" subtitle="Create a new post and share it with the world."/>

            <div className="max-w-2xl mx-auto">
                <PostForm
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    onSaveDraft={handleSaveDraft}
                    onClearDraft={handleClearDraft}
                    userAvatar={userInformation?.avatar_url}
                />
            </div>
        </div>
    );
};

export default CreatePostPage;
