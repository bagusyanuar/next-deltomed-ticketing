import { withIronSessionSsr } from 'iron-session/next';
import Division from '../../components/layouts/division'
import { ironSessionOptions } from '../../lib/session'

export default function DivisionPage({ token }) {
    return (<Division token={token}/>);
}

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req}) {
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