import Dashboard from '../components/layouts/dashboard'
import { withIronSessionSsr } from 'iron-session/next'
import { ironSessionOptions } from '../lib/session'

export default function DashboardPage({ token }) {
    return (<Dashboard token={token} />);
}

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req }) {
    const token = req.session.token;
    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }
    return {
        props: { token: token },
    }
}, ironSessionOptions);