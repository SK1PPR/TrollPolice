"use client";
import { AccountId, Client, PrivateKey } from "@hashgraph/sdk";
import { createContext, useContext } from "react";

const ClientContext = createContext(undefined);

function ClientProvider({ children }) {
  const operatorId = AccountId.fromString(process.env.NEXT_PUBLIC_OPERATOR_ID);
  const operatorPrivateKey = PrivateKey.fromString(process.env.NEXT_PUBLIC_OPERATOR_KEY);
  const client = Client.forTestnet();
  client.setOperator(operatorId, operatorPrivateKey);
  const contextValue = { client };
  return <ClientContext.Provider value={contextValue}>{children}</ClientContext.Provider>;
}

export default ClientProvider;

export function useClient() {
  return useContext(ClientContext);
}
