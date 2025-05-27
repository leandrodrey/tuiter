import {type JSX} from 'react';
import {useNavigate, useLocation, Link} from 'react-router-dom';
import {Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
import {
    HomeIcon,
    UserIcon,
    CreatePostIcon,
    FavoritesIcon,
    EditProfileIcon,
    TuiterLogo,
    TweetButton
} from '../../UI';
import {useAuthContext} from '../../../hooks/context/useAuthContext';
import {useUser} from '../../../hooks/context/useUser';
import UserMenu from "../UserMenu/UserMenu.tsx";

interface ToggleMenuProps {
    collapsed: boolean;
}

/**
 * ToggleMenu component that displays a responsive sidebar menu using react-pro-sidebar.
 * The collapsed state is controlled by the parent component.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.collapsed - Whether the sidebar is collapsed
 * @returns {JSX.Element} The toggle menu component
 */
const ToggleMenu = ({collapsed}: ToggleMenuProps): JSX.Element => {
    const {isAuthenticated, logout} = useAuthContext();
    const {userInformation} = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string): boolean => {
        return location.pathname === path;
    };

    const handleTweetClick = () => {
        navigate('/posts/create');
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="h-full pt-15">
            <Sidebar
                collapsed={collapsed}
                backgroundColor="#15202b"
                collapsedWidth="0px"
                rootStyles={{
                    height: '100%',
                    color: 'white',
                    border: 'none'
                }}
            >
                <div className="p-4">
                    <TuiterLogo className="h-8 w-8"/>
                </div>
                <Menu
                    menuItemStyles={{
                        button: {
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#1e2732',
                                color: '#1d9bf0'
                            },
                            [`&.active`]: {
                                backgroundColor: '#1e2732',
                                color: '#1d9bf0'
                            }
                        }
                    }}
                >
                    <MenuItem
                        icon={<HomeIcon className="h-6 w-6"/>}
                        className={isActive('/') ? 'active' : ''}
                        component={<Link to="/"/>}
                    >
                        Home
                    </MenuItem>

                    {!isAuthenticated && (
                        <>
                            <MenuItem
                                icon={<UserIcon className="h-6 w-6"/>}
                                className={isActive('/login') ? 'active' : ''}
                                component={<Link to="/login"/>}
                            >
                                Login
                            </MenuItem>
                            <MenuItem
                                icon={<UserIcon className="h-6 w-6"/>}
                                className={isActive('/users/register') ? 'active' : ''}
                                component={<Link to="/users/register"/>}
                            >
                                Register
                            </MenuItem>
                        </>
                    )}

                    {isAuthenticated && (
                        <>
                            <MenuItem
                                icon={<CreatePostIcon className="h-6 w-6"/>}
                                className={isActive('/posts/create') ? 'active' : ''}
                                component={<Link to="/posts/create"/>}
                            >
                                Create Post
                            </MenuItem>
                            <MenuItem
                                icon={<FavoritesIcon className="h-6 w-6"/>}
                                className={isActive('/users/favorites') ? 'active' : ''}
                                component={<Link to="/users/favorites"/>}
                            >
                                Favorites
                            </MenuItem>
                            <MenuItem
                                icon={<EditProfileIcon className="h-6 w-6"/>}
                                className={isActive('/users/edit') ? 'active' : ''}
                                component={<Link to="/users/edit"/>}
                            >
                                Edit Profile
                            </MenuItem>
                        </>
                    )}
                </Menu>

                {isAuthenticated && !collapsed && (
                    <div className="mt-4 px-4">
                        <TweetButton onClick={handleTweetClick}/>
                    </div>
                )}

                <UserMenu
                    userInformation={userInformation}
                    onLogout={handleLogout}
                    isAuthenticated={isAuthenticated}
                    collapsed={collapsed}
                />
            </Sidebar>
        </div>
    );
};

export default ToggleMenu;
