import Head from 'next/head'
import Image from 'next/image'
import {
  withIronSessionSsr
} from 'iron-session/next'
import {
  ironSessionOptions
} from '../lib/session'

import Login from '../components/layouts/login'

export default function Home() {
  return (< Login />)
}

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({
  req
}) {
  const token = req.session.token;
  if (token) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: true
      }
    }
  }
  return {
    props: {},
  }
}, ironSessionOptions);