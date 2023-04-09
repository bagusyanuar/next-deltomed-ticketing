export const ironSessionOptions = {
    cookieName: 'my_app_cookie',
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieOptions: {
        secure: false
    }
}