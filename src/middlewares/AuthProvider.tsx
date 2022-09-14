import {createContext, ReactNode, useContext, useMemo} from "react";
import { useNavigate } from "react-router-dom";
import {useLocalStorage} from "react-meilleursbiens";
import {Routes} from "../Routes";

// @ts-ignore
const AuthContext = createContext();

export const AuthProvider = ({ children }: {children: ReactNode}) => {
  const [user, setUser] = useLocalStorage("spotify_token", null);
  const navigate = useNavigate();

  const login = async (data: any) => {
    setUser(data);
    navigate(Routes.DASHBOARD);
  };

  const logout = () => {
    setUser(null);
    navigate(Routes.AUTH.LOGIN, { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
