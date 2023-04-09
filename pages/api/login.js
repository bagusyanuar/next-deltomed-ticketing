import axios from 'axios';
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironSessionOptions } from '../../lib/session'

async function loginRoute(req, res) {
    const { username, password } = await req.body;
    const body = {
        username, password
    };
    try {
        let response = await axios.post('http://localhost:8000/api/support/sign-in', JSON.stringify(body));
        if (response.status === 200) {
            let data = response.data;
            let token = data.data;
            req.session.token = token;
            await req.session.save();
            // console.log(req.session);
            res.status(200).json({ message: 'success' });
        } else {
            res.status(response.status).json(response.data)
        }
    } catch (error) {
        // console.log(error);
        res.status(error.response.status).json(error.response.data)
    }
}

export default withIronSessionApiRoute(loginRoute, ironSessionOptions)