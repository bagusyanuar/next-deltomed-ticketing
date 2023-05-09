import Layouts from '../../components/layouts'
import { withIronSessionSsr } from 'iron-session/next';
import AddPage from '../../components/pages/user/add'
import { ironSessionOptions } from '../../lib/session'

export default function UserAddPage({ token }) {
    return (
        <Layouts title="Users">
            <AddPage token={token} />
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