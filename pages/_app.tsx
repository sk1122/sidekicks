import Head from 'next/head'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {
  Provider,
  chain,
  defaultChains,
  useContract,
  useSigner,
  useAccount,
} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { WalletLinkConnector } from 'wagmi/connectors/walletLink'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { ExternalProvider } from '@ethersproject/providers'
import { AppContext } from './_context'
import { supabase } from '../client'
import { Project } from '../types/Project.type'

import Navbar from '../components/Navbar'

const CONTRACT_ADDRESS = '0xB9A67c503B0c86491E0B9AFcf87831535C01Deff'
const abi = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'projectID',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'currentTotal',
        type: 'uint256',
      },
    ],
    name: 'cryptoKick',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'projectID',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'databaseID',
        type: 'uint256',
      },
    ],
    name: 'projectRegistered',
    type: 'event',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_projectId', type: 'uint256' }],
    name: 'contribute',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllProjects',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'projectId', type: 'uint256' },
          { internalType: 'address payable', name: 'creator', type: 'address' },
          { internalType: 'uint256', name: 'totalSupport', type: 'uint256' },
          { internalType: 'uint256', name: 'cryptoKicks', type: 'uint256' },
        ],
        internalType: 'struct sidekicks.Project[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getContractBalance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'projectId', type: 'uint256' }],
    name: 'getProject',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'projectId', type: 'uint256' },
          { internalType: 'address payable', name: 'creator', type: 'address' },
          { internalType: 'uint256', name: 'totalSupport', type: 'uint256' },
          { internalType: 'uint256', name: 'cryptoKicks', type: 'uint256' },
        ],
        internalType: 'struct sidekicks.Project',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_databaseId', type: 'uint256' }],
    name: 'getProjectFromDatabaseId',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'projectId', type: 'uint256' },
          { internalType: 'address payable', name: 'creator', type: 'address' },
          { internalType: 'uint256', name: 'totalSupport', type: 'uint256' },
          { internalType: 'uint256', name: 'cryptoKicks', type: 'uint256' },
        ],
        internalType: 'struct sidekicks.Project',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_projectId', type: 'uint256' },
      { internalType: 'address', name: '_address', type: 'address' },
    ],
    name: 'myContributions',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'myProjects',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_databaseId', type: 'uint256' }],
    name: 'startProject',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

function MyApp({ Component, pageProps }: AppProps) {
  const [account, setAccount] = useState('')

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

  var provider: any, contract: any, signer: any

  const connectContract = () => {
    provider = new ethers.providers.Web3Provider(
      window.ethereum as ExternalProvider
    )
    signer = provider.getSigner()
    contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer)
  }

  useEffect(() => {
    connectContract()

    contract.on(
      'projectRegistered',
      async (owner: string, projectID: any, databaseID: any) => {
        console.log(owner, projectID.toNumber(), databaseID.toNumber())

        const { data, error } = await supabase
          .from('Projects')
          .update({ projectId: projectID.toNumber() })
          .match({ id: databaseID.toNumber() })
        if (!data || error || data.length == 0) {
          console.log('This Project is Fucked')
        }
      }
    )
  }, [])

  /// @dev: Get ALL PRojects from the Platform
  const getAllProjects = async () => {
    try {
      connectContract()
      let projects = await contract.getAllProjects()
      return projects
    } catch (e) {
      console.log(e)
    }
  }

  /// @dev: Get PRojects using projectID from the Platform
  const getProject = async (projectId: number) => {
    try {
      connectContract()
      let project = await contract.getProject(projectId)
      return project
    } catch (e) {
      console.log(e)
    }
  }

  /// @dev: Get ALL Contributions for logged user for a given project
  const myContributions = async (projectId: number) => {
    try {
      connectContract()
      let contributions = await contract.myContributions(0, account)
      return contributions
    } catch (e) {
      console.log(e)
    }
  }

  /// @dev: Get ALL My projects
  const myProjects = async () => {
    try {
      connectContract()
      let projects = await contract.myProjects()
      return projects
    } catch (e) {
      console.log(e)
    }
  }

  /// @dev: Contribute to a Project with projectId and amount in whole ethers not WEI
  const contributeProject = async (projectId: number, amount: string) => {
    try {
      connectContract()
      let project = await contract.contribute(projectId, {
        value: ethers.utils.parseEther(amount),
      })
      await project.wait()
    } catch (e) {
      console.log(e)
    }
  }

  /// @dev: Start a Project using interface Project
  const startProject = async (projectData: Project) => {
    var id
    try {
      connectContract()

      const { data, error } = await supabase
        .from('Projects')
        .insert([projectData])

      if (!data || error || data.length == 0) {
        return false
      }

      var id = data[0].id
      let project = await contract.startProject(data[0].id)
      await project.wait()
      console.log(project)
    } catch (e) {
      const { data, error } = await supabase
        .from('Projects')
        .delete()
        .match({ id: id })
      console.log(e)
    }
  }

  /// @dev: Example
  // useEffect(() => {
  //   (async () => {
  //     let project: Project = {
  //       title: 'Yo',
  //       description: 'Yo',
  //       tagline: 'string',
  //       thumbnail: 'string',
  //       demo_video: 'string',
  //       makers: [{'object': 'ds'}],
  //       wallet_id: 'String',
  //       category: 'string',
  //       images: ['string[]']
  //     }
  //     console.log(await startProject(project))
  //   })()
  // }, [])

  let sharedState = {
    account,
    setAccount,
    getAllProjects,
    getProject,
    myContributions,
    myProjects,
    contributeProject,
    startProject,
  }

  useEffect(() => {
    console.log(account)
  }, [account])

  // Get Data from Context
  return (
    <AppContext.Provider value={sharedState}>
      <Provider autoConnect connectors={connectors}>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </AppContext.Provider>
  )
}

export default MyApp
