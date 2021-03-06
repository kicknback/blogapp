import Home from "./views/Home.js";
import PostIndex from "./views/PostIndex.js";
import About from "./views/About.js";
import Error404 from "./views/Error404.js";
import Loading from "./views/Loading.js";
import Login from "./views/Login.js";
import LoginEvent from "./auth.js";
import {postListener} from "./views/PostIndex.js";
import Register, {registerListener} from "./views/Register.js";
import User, {searchUser} from "./views/User.js";
import {navListener} from "./views/partials/Navbar.js";

/**
 * Returns the route object for a specific route based on the given URI
 * @param URI
 * @returns {*}
 */
export default function router(URI) {
    const routes = {
        '/': {
            returnView: Home,
            state: {},
            uri: '/',
            title: 'Home',
            viewEvent: navListener
        },
        '/login': {
            returnView: Login,
            state: {},
            uri: '/login',
            title: "Login",
            viewEvent: LoginEvent
        },
        '/posts': {
            returnView: PostIndex,
            state: {
                posts: '/api/posts',
                categories: '/api/categories'
            },
            uri: '/posts',
            title: 'All Posts',
            viewEvent: postListener

        },
        '/register': {
            returnView: Register,
            state: {
                users: '/api/users'
            },
            uri: '/register',
            title: 'Register user',
            viewEvent: registerListener
        },
        '/user': {
            returnView: User,
            state: {
                users: '/api/users/'
            },
            uri: '/user',
            title: 'User Search',
            viewEvent: searchUser
        },
        '/about': {
            returnView: About,
            state: {},
            uri: '/about',
            title: 'About',
        },
        '/error': {
            returnView: Error404,
            state: {},
            uri: location.pathname,
            title: ' ERROR',
        },
        '/loading': {
            returnView: Loading,
            state: {},
            uri: location.pathname,
            title: 'Loading...',
        }
    };

    return routes[URI];
}

