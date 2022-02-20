import Head from 'next/head'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider, chain, defaultChains, useContract } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { WalletLinkConnector } from 'wagmi/connectors/walletLink'

import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }: AppProps) {
  const infuraId = process.env.INFURA_ID

  // Chains for connectors to support
  const chains = [chain.polygonMainnet, chain.polygonTestnetMumbai]

  const connectors = ({ chainId }: any) => {
    const rpcUrl =
      chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
      chain.mainnet.rpcUrls[0]
    return [
      new InjectedConnector({
        chains,
        options: { shimDisconnect: true },
      }),
      new WalletConnectConnector({
        options: {
          infuraId,
          qrcode: true,
        },
      }),
      new WalletLinkConnector({
        options: {
          appName: 'My wagmi app',
          jsonRpcUrl: `${rpcUrl}/${infuraId}`,
        },
      }),
    ]
  }

  return (
    <Provider autoConnect connectors={connectors}>
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
