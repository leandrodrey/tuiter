import {Routes, Route} from 'react-router-dom';
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.tsx";
import FeedPage from "../pages/FeedPage/FeedPage.tsx";
import CreatePostPage from "../pages/CreatePostPage/CreatePostPage.tsx";
import UserRegistrationPage from "../pages/UserRegistrationPage/UserRegistrationPage.tsx";
import UserEditPage from "../pages/UserEditPage/UserEditPage.tsx";
import UserFavoritesPage from "../pages/UserFavoritesPage/UserFavoritesPage.tsx";
import PostReplyPage from "../pages/PostReplyPage/PostReplyPage.tsx";
import LoginPage from "../pages/LoginPage/LoginPage.tsx";
import AuthGuard from "./AuthGuard.tsx";

const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={
                    <AuthGuard>
                        <FeedPage/>
                    </AuthGuard>
                }/>
                <Route path="/login" element={
                    <LoginPage/>
                }/>
                <Route path="/feed" element={
                    <AuthGuard>
                        <FeedPage/>
                    </AuthGuard>
                }/>
                <Route path="/posts/create" element={
                    <AuthGuard>
                        <CreatePostPage/>
                    </AuthGuard>
                }/>
                <Route path="/posts/:postId/reply" element={
                    <AuthGuard>
                        <PostReplyPage/>
                    </AuthGuard>
                }/>
                <Route path="/users/register" element={
                    <UserRegistrationPage/>
                }/>
                <Route path="/users/edit" element={
                    <AuthGuard>
                        <UserEditPage/>
                    </AuthGuard>
                }/>
                <Route path="/users/edit/:userId" element={
                    <AuthGuard>
                        <UserEditPage/>
                    </AuthGuard>
                }/>
                <Route path="/users/favorites" element={
                    <AuthGuard>
                        <UserFavoritesPage/>
                    </AuthGuard>
                }/>
                <Route path="*" element={
                    <NotFoundPage/>
                }/>
            </Routes>
        </>
    );
}

export default AppRouter;
