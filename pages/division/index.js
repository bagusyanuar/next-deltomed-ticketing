import { withIronSessionSsr } from 'iron-session/next';
import Division from '../../components/pages/division'
import { ironSessionOptions } from '../../lib/session'
import Layouts from '../../components/layouts'

export default function DivisionPage({ token }) {
    return (
        <Layouts title='Division'>
            <Division />
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
}, ironSessionOptions)