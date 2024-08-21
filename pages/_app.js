// File: _app.js
import { Provider } from "react-redux";
import store from "../store/store";
import { UserProvider } from "../context/UserContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </Provider>
  );
}

export default MyApp;
