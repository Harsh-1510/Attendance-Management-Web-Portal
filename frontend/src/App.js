import Router from "./Router"
import axios from 'axios';
import { AuthContextProvider } from "./context/authContext";

axios.defaults.withCredentials = true;

export default function App(props) {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}
