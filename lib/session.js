import { withIronSessionApiRoute } from 'iron-session/next';

export default withIronSessionApiRoute(async function login(req, res) {
    
}, {
    cookieName: 'my_app_cookie',
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieOptions: {
        secure: false
    }
});