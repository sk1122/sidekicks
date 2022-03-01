import { useEffect, FC, createContext, useContext, useState } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

export interface Context {
  account: string
  setAccount: Function
  getAllProjects: Function
  getProject: Function
  myContributions: Function
  myProjects: Function
  contributeProject: Function
  startProject: Function
  uploadFile: Function
  getImages: Function
  connectContract: Function
  contract: any
}

export const AppContext = createContext<Context>({} as Context);

export function useAccountContext() {
  return useContext(AppContext);
}

export default function () {
  const [{ data, error, loading }, disconnect] = useAccount()
  return <div></div>;
}
