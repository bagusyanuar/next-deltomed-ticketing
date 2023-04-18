import Dashboard from '../components/pages/dashboard'
import Layouts from '../components/layouts'
import { withIronSessionSsr } from 'iron-session/next'
import { ironSessionOptions } from '../lib/session'

export default function DashboardPage({ token }) {
    return (
        <Layouts title='Dashboard'>
            <Dashboard />
        </Layouts>
    );
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