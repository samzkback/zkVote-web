import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import "tailwindcss/tailwind.css";

import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { useState } from "react";
import { WalletContext } from "../contexts/WalletContext";

const { chains, provider, webSocketProvider } = configureChains(
  [chain.goerli],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY })]
);

const { wallets } = getDefaultWallets({
  appName: "RainbowKit demo",
  chains,
});

const demoAppInfo = {
  appName: "Rainbowkit Demo",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ chains }),
      trustWallet({ chains }),
      ledgerWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [isSnapInstalled, setIsSnapInstalled] = useState<boolean | undefined>(
    undefined
  );
  const [isConnected, setIsConnected] = useState<boolean | undefined>(undefined);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider appInfo={demoAppInfo} chains={chains}>
        <WalletContext.Provider value={{
          address,
          setAddress,
          isSnapInstalled,
          setIsSnapInstalled,
          isConnected,
          setIsConnected,
        }}
        >
        <Layout>
          <Component {...pageProps} />
        </Layout>
        </WalletContext.Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
