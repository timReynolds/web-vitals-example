import "../styles/globals.css";
import type { AppProps } from "next/app";
import { reportNextJsMetric } from "../lib/analytics";

export function reportWebVitals(metric: any) {
  reportNextJsMetric(metric);
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
