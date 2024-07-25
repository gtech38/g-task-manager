import { Provider } from "react-redux";
import store from "../store/store";
import "../styles/globals.css";

// Custom App component to wrap the app with the Redux Provider
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
