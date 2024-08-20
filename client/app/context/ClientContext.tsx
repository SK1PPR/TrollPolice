import { createContext, useContext } from "react";
const ClientContext = createContext(undefined);

function ClientProvider({ children }) {
  const contextValue = {};
  return <ClientContext.Provider value={contextValue}>{children}</ClientContext.Provider>;
}

export default ClientProvider;

export function useClient() {
  return useContext(ClientContext);
}
