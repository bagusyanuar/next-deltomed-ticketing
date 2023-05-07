import { withIronSessionSsr } from 'iron-session/next';
import Location from '../../components/pages/location/location'
import { ironSessionOptions } from '../../lib/session'
import Layouts from '../../components/layouts'

export default function LocationPage({ token }) {
    return (
        <Layouts title={`Location`}>
            <Location token={token}/>
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