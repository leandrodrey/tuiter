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
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute.tsx";

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
                    <ProtectedRoute>
                        <CreatePostPage/>
                    </ProtectedRoute>
                }/>
                <Route path="/posts/:postId/reply" element={
                    <ProtectedRoute>
                        <PostReplyPage/>
                    </ProtectedRoute>
                }/>
                <Route path="/users/register" element={
                    <UserRegistrationPage/>
                }/>
                <Route path="/users/edit" element={
                    <ProtectedRoute>
                        <UserEditPage/>
                    </ProtectedRoute>
                }/>
                <Route path="/users/edit/:userId" element={
                    <ProtectedRoute>
                        <UserEditPage/>
                    </ProtectedRoute>
                }/>
                <Route path="/users/favorites" element={
                    <ProtectedRoute>
                        <UserFavoritesPage/>
                    </ProtectedRoute>
                }/>
                <Route path="*" element={
                    <NotFoundPage/>
                }/>
            </Routes>
        </>
    );
}

export default AppRouter;
