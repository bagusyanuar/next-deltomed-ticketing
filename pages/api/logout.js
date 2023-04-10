import { withIronSessionApiRoute } from 'iron-session/next'
import { ironSessionOptions } from '../../lib/session'

async function logoutRoute(req, res) {
    req.session.destroy()
    res.status(200).json({ message: 'success'})
}

export default withIronSessionApiRoute(logoutRoute, ironSessionOptions);