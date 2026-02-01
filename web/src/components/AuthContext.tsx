import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

const AuthContext = createContext<
  | {
      username: string;
      setUsername: Dispatch<SetStateAction<string>>;
      displayName: string;
      setDisplayName: Dispatch<SetStateAction<string>>;
      permissions: string[];
      setPermissions: Dispatch<SetStateAction<string[]>>;
      featureFlags: object;
      setFeatureFlags: Dispatch<SetStateAction<Object>>;
    }
  | undefined
>(undefined);

export function AuthProvider({ children }: { children: ReactNode }): ReactNode {
  const [username, setUsername] = useState<string>("axm157821");
  const [displayName, setDisplayName] = useState<string>("Admin McAdmin");
  const [permissions, setPermissions] = useState<string[]>([
    "vm:*:list",
    "vm:*:describe",
    "vm:*:request",
    "vm:*:approve",
  ]);
  const [featureFlags, setFeatureFlags] = useState<object>({
    vmRequests: true,
    kubernetesNamespaceRequests: false,
  });

  return (
    <AuthContext.Provider
      value={{
        username,
        setUsername,
        displayName,
        setDisplayName,
        permissions,
        setPermissions,
        featureFlags,
        setFeatureFlags,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used with an AuthProvider.");
  }
  return context;
}
