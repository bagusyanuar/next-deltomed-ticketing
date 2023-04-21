import '@/styles/globals.css'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import { wraper } from '../redux/store'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

// const App = ({ Component, ...rest }) => {
//   const {store, props} = wraper.useWrappedStore(rest)
//   return (
//     <Provider store={store}>
//       <Component {...props.pageProps} />
//     </Provider>
//   );
// }

// export default wraper.withRedux(App);