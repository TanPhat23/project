import "./globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClerkProvider } from "@clerk/nextjs";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ClerkProvider>
        <ToastContainer />
        <Component {...pageProps} />
      </ClerkProvider>
    </RecoilRoot>
  );
}
