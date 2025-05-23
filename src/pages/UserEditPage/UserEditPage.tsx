import {type JSX} from 'react';
import {useNavigate} from 'react-router-dom';
import {Loader, PageHeader} from '../../components/UI';
import {useToast} from "../../hooks/context/useToast.ts";
import {useUserEdit} from "./hooks/useUserEdit.ts";
import {UserEditForm} from '../../components/UserEdit';

const UserEditPage = (): JSX.Element => {
    const navigate = useNavigate();
    const toast = useToast();

    const {initialValues, isLoading, error, handleSubmit} = useUserEdit(navigate, toast);

    if (isLoading) {
        return <Loader text="Loading user data..." fullScreen={true}/>;
    }

    return (
        <div>
            <PageHeader title="Edit Profile"/>
            <div className="max-w-2xl mx-auto">
                <UserEditForm
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    error={error}
                />
            </div>
        </div>
    );
};

export default UserEditPage;
