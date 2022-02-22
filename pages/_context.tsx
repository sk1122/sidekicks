import { useEffect, FC, createContext, useContext, useState } from "react";
import { ethers } from "ethers";

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
}

export const AppContext = createContext<Context>({} as Context);

export function useAccountContext() {
  return useContext(AppContext);
}

export default function () {
  return <div></div>;
}
