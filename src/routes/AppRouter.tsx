import {Routes, Route} from 'react-router-dom';
import HomePage from "../pages/HomePage.tsx";
import NotFoundPage from "../pages/NotFoundPage.tsx";
import FeedPage from "../pages/FeedPage.tsx";
import CreatePostPage from "../pages/CreatePostPage.tsx";
import UserRegistrationPage from "../pages/UserRegistrationPage.tsx";
import UserEditPage from "../pages/UserEditPage.tsx";
import UserFavoritesPage from "../pages/UserFavoritesPage.tsx";
import PostReplyPage from "../pages/PostReplyPage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import Navbar from "../components/Navbar/Navbar.tsx";
import AuthGuard from "./AuthGuard.tsx";

const AppRouter = () => {
    return (
        <>
            <Navbar/>

            <Routes>
                <Route path="/" element={
                    <HomePage/>
                }/>
                <Route path="/login" element={
                    <LoginPage/>
                }/>
                <Route path="/feed" element={
                    <FeedPage/>
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
