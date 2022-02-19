import React from "react";

import "@fortawesome/fontawesome-svg-core/styles.css";
import initFontAwesome from "../utils/initFontAwesome";
import "../styles/globals.scss";

initFontAwesome();

function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

export default MyApp;
