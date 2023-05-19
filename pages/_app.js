import { WalletProvider } from "@/context/wallet";
import { useKeplr } from "@/services/keplr";
import "@/styles/globals.css";
import { useEffect } from "react";

const SideEffects = () => {
  const keplr = useKeplr();

  useEffect(() => {
    const listenKeystoreChange = () => keplr.connect(true);
    window.addEventListener("keplr_keystorechange", listenKeystoreChange);
  }, [keplr]);

  useEffect(() => {
    const walletAddress = window.localStorage.getItem("wallet_address");
    if (walletAddress) {
      keplr.connect();
    }
  }, [keplr]);
  return null;
};

export default function App({ Component, pageProps }) {
  return (
    <WalletProvider>
      <SideEffects />
      <Component {...pageProps} />
    </WalletProvider>
  );
}
