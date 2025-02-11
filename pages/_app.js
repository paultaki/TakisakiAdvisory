// pages/_app.js
import "../css/styles.css";  // ✅ Move global CSS import here

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}
