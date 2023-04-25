import '@/styles/globals.css'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import PageLoadingBar from '../components/loader/page-loading-bar'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PageLoadingBar/>
      <Component {...pageProps} />
    </Provider>
  );
}