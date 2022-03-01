import Link from 'next/link'
import { useConnect, useAccount } from 'wagmi'
import { useState } from 'react'

const Navbar = () => {
  const [{ data: connectData, error: connectError }, connect] = useConnect()
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  })

  const [isOpen, setIsOpen] = useState(false)
  const [logoutModal, setLogoutModal] = useState(false)

  return (
    <nav className="flex w-full items-center justify-between bg-black px-16 py-6 text-white">
      <Link href="/">
        <a className="font-clash text-2xl font-bold">sidekicks</a>
      </Link>
      <div className="hidden md:block">
        <ul className="flex space-x-5">
          {[
            // test route
            {
              name: 'Start Project',
              link: '/startproject',
            },
            {
              name: 'Explore Projects',
              link: '/products',
            },
            {
              name: 'About',
              link: '/about',
            },
          ].map((item) => (
            <Link href={item.link} key={item.name}>
              <a className="cursor-pointer px-2 py-1 text-sm">{item.name}</a>
            </Link>
          ))}
        </ul>
      </div>
      <div className="flex space-x-4">
        {!accountData?.address && (
          <div>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className={
                (isOpen ? 'hidden ' : '') +
                'flex w-40 cursor-pointer items-center justify-center rounded-md bg-white px-3 py-3 text-sm font-semibold text-black'
              }
            >
              Connect Wallet
            </div>
            {isOpen && (
              <div className="flex w-40 cursor-pointer items-center justify-center rounded-md bg-white px-3 py-3 text-sm font-semibold text-black">
                <svg
                  className="h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#000"
                    stroke-width="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="#000"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            )}
          </div>
        )}
        {accountData?.address && (
          <div className="space-y-5">
            <div
              onClick={() => setLogoutModal(!logoutModal)}
              className="flex w-40 cursor-pointer items-center justify-center rounded-md bg-white px-3 py-3 text-sm font-semibold text-black"
            >
              {!accountData.ens ? (
                <span className="w-20 truncate">{accountData.address}</span>
              ) : (
                accountData.ens
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div
              onClick={disconnect}
              className={
                (logoutModal ? '' : 'hidden ') +
                ' absolute z-50 flex w-40 cursor-pointer items-center justify-center rounded-md bg-white p-3 text-black'
              }
            >
              Logout
            </div>
          </div>
        )}
      </div>
      <div
        className={
          (isOpen ? '' : 'hidden') +
          ' fixed top-1/2 left-1/2 z-50 flex h-1/2 w-1/3 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center space-y-5 rounded-xl bg-white transition-opacity duration-1000 ease-out'
        }
      >
        <button
          className="absolute top-5 right-5 text-black"
          onClick={() => setIsOpen(false)}
        >
          X
        </button>
        <h2 className="text-2xl font-bold text-black">Connect Your Wallet</h2>
        <div>
          {connectData.connectors.map((connector) => (
            <button
              key={connector.id}
              onClick={() => {
                connect(connector)
                setIsOpen(false)
              }}
              className="m-3 flex w-64 items-center justify-center space-x-3 rounded-xl bg-black p-3"
            >
              {connector.name.toLowerCase() === 'metamask' && (
                <img className="w-10" src="/MetaMask_Fox.svg" />
              )}
              {connector.name.toLowerCase() === 'walletconnect' && (
                <img className="w-10" src="/walletconnect-circle-blue.svg" />
              )}
              {connector.name.toLowerCase() === 'coinbase wallet' && (
                <img className="w-10" src="/coinbase.png" />
              )}
              <span>{connector.name}</span>
              {!connector.ready && ' (unsupported)'}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
