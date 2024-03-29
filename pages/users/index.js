import Layouts from '../../components/layouts'
import { withIronSessionSsr } from 'iron-session/next';
import User from '../../components/pages/user/index'
import { ironSessionOptions } from '../../lib/session'

export default function UsersPage({ token }) {
    return (
        <Layouts title="Users">
            <User token={token} />
        </Layouts>
    )
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
}, ironSessionOptions)