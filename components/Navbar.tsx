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
        <a className="text-2xl font-bold">sidekicks</a>
      </Link>
      <div className="">
        <ul className="ml-48 flex space-x-5">
          {[
            // test route
            {
              name: 'Start Project',
              link: '/start-project',
            },
            {
              name: 'Fund Project',
              link: '/',
            },
            {
              name: 'Leaderboard',
              link: '/',
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
        {accountData?.address && (
          <button className="flex items-center rounded bg-gray-100 py-2 px-4 text-sm text-black">
            <span className="mr-2">
              <svg
                width="19"
                height="18"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 10H7.5C7.76522 10 8.01957 9.89464 8.20711 9.70711C8.39464 9.51957 8.5 9.26522 8.5 9V1C8.5 0.734784 8.39464 0.48043 8.20711 0.292893C8.01957 0.105357 7.76522 0 7.5 0H1.5C1.23478 0 0.98043 0.105357 0.792893 0.292893C0.605357 0.48043 0.5 0.734784 0.5 1V9C0.5 9.26522 0.605357 9.51957 0.792893 9.70711C0.98043 9.89464 1.23478 10 1.5 10ZM0.5 17C0.5 17.2652 0.605357 17.5196 0.792893 17.7071C0.98043 17.8946 1.23478 18 1.5 18H7.5C7.76522 18 8.01957 17.8946 8.20711 17.7071C8.39464 17.5196 8.5 17.2652 8.5 17V13C8.5 12.7348 8.39464 12.4804 8.20711 12.2929C8.01957 12.1054 7.76522 12 7.5 12H1.5C1.23478 12 0.98043 12.1054 0.792893 12.2929C0.605357 12.4804 0.5 12.7348 0.5 13V17ZM10.5 17C10.5 17.2652 10.6054 17.5196 10.7929 17.7071C10.9804 17.8946 11.2348 18 11.5 18H17.5C17.7652 18 18.0196 17.8946 18.2071 17.7071C18.3946 17.5196 18.5 17.2652 18.5 17V10C18.5 9.73478 18.3946 9.48043 18.2071 9.29289C18.0196 9.10536 17.7652 9 17.5 9H11.5C11.2348 9 10.9804 9.10536 10.7929 9.29289C10.6054 9.48043 10.5 9.73478 10.5 10V17ZM11.5 7H17.5C17.7652 7 18.0196 6.89464 18.2071 6.70711C18.3946 6.51957 18.5 6.26522 18.5 6V1C18.5 0.734784 18.3946 0.48043 18.2071 0.292893C18.0196 0.105357 17.7652 0 17.5 0H11.5C11.2348 0 10.9804 0.105357 10.7929 0.292893C10.6054 0.48043 10.5 0.734784 10.5 1V6C10.5 6.26522 10.6054 6.51957 10.7929 6.70711C10.9804 6.89464 11.2348 7 11.5 7Z"
                  fill="#000814"
                />
              </svg>
            </span>
            Dashboard
          </button>
        )}
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
