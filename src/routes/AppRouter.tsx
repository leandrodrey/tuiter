import {Routes, Route} from 'react-router-dom';
import HomePage from "../pages/HomePage.tsx";
import NotFoundPage from "../pages/NotFoundPage.tsx";
import FeedPage from "../pages/FeedPage.tsx";
import CreatePostPage from "../pages/CreatePostPage.tsx";
import UserRegistrationPage from "../pages/UserRegistrationPage.tsx";
import UserEditPage from "../pages/UserEditPage.tsx";
import UserFavoritesPage from "../pages/UserFavoritesPage.tsx";
import PostReplyPage from "../pages/PostReplyPage.tsx";
import Navbar from "../components/Navbar/Navbar.tsx";

const AppRouter = () => {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/feed" element={<FeedPage/>}/>
                <Route path="/posts/create" element={<CreatePostPage/>}/>
                <Route path="/posts/:postId/reply" element={<PostReplyPage/>}/>
                <Route path="/users/register" element={<UserRegistrationPage/>}/>
                <Route path="/users/edit" element={<UserEditPage/>}/>
                <Route path="/users/edit/:userId" element={<UserEditPage/>}/>
                <Route path="/users/favorites" element={<UserFavoritesPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </>
    );
}

export default AppRouter;
