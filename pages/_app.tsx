import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "../utils/providers/User.provider";
import theme from "../styles/theme.chakra";
import "regenerator-runtime/runtime.js";
import PageWrapper from "../components/Wrappers/PageWrapper.wrapper";
import { ImageKeyProvider } from "../utils/providers/ImageKey.provider";
import config from "../utils/helpers/config";
import { FileProvider } from "../utils/providers/File.provider";
import { QueriedFilesProvider } from "../utils/providers/QueriedFiles.provider";
import { StorageProvider } from "../utils/providers/Database.provider";

import Script from "next/script";
import { NextSeo } from "next-seo";

function App({ Component, pageProps }: AppProps) {
  const supportedChainIds = [config.chainId];
  /**
   * Include the connectors you want to support
   * injected - MetaMask
   * magic - Magic Link
   * walletconnect - Wallet Connect
   * walletlink - Coinbase Wallet
   */
  const connectors = {
    injected: {},
    magic: {
      apiKey: String(process.env.REACT_APP_MAGIC_KEY),
      chainId: config.chainId,
    },
    walletconnect: {},
    walletlink: {
      appName: "Vault3",
      url: "https://vault3.vercel.app",
      darkMode: false,
    },
  };

  return (
    <>
      <Script
        id="google-analytics"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
      />

      <Script strategy="lazyOnload" id="google-analytics">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
      <NextSeo
        title="Vault3 | Your Safest Decentralized Vault"
        description="Secure your passwords, images, documents and much more on-chain with Vault3."
        defaultTitle="Vault3 | Your Safest Decentralized Vault"
        canonical="https://vault3.live"
        openGraph={{
          url: "https://vault3.live",
          title: "Vault3 | Your Safest Decentralized Vault",
          description:
            "Secure your passwords, images, documents and much more on-chain with Vault3.",
          images: [
            {
              url: "/assets/embed.png",
              width: 1280,
              height: 720,
              alt: "Vault3 | Your Safest Decentralized Vault",
            },
          ],
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            property: "keywords",
            content:
              "web3, vault, decentralized, storage, hackathon, data, vault3, drive, cloud, thirdweb, metamask, files, blockchain storage, blockchain, on-chain storage, on-chain vault, on-chain, chain, safest, safe, passwords, images, documents, files",
          },
        ]}
      />
      <ThirdwebWeb3Provider
        connectors={connectors}
        supportedChainIds={supportedChainIds}
      >
        <ChakraProvider theme={theme}>
          <UserProvider>
            <PageWrapper>
              <ImageKeyProvider>
                <FileProvider>
                  <QueriedFilesProvider>
                    <StorageProvider>
                      <Component {...pageProps} />
                    </StorageProvider>
                  </QueriedFilesProvider>
                </FileProvider>
              </ImageKeyProvider>
            </PageWrapper>
          </UserProvider>
        </ChakraProvider>
      </ThirdwebWeb3Provider>
    </>
  );
}

export default App;
