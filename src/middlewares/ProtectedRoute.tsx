import {Navigate} from "react-router-dom";
import {Routes} from "../Routes";
import {useLocalStorage} from "react-meilleursbiens";

export const ProtectedRoute = ({ children }: {children: any}) => {

  const [user, setUser] = useLocalStorage("spotify_token", null);

  if (!user) {
    return <Navigate to={Routes.AUTH.LOGIN} />;
  }

  return children;
};
