import Router from "./src/routes";
import { CurrentUserProvider } from './src/context/UserContext'

export default function App() {
  return (
    <CurrentUserProvider>
      <Router />
    </CurrentUserProvider>
  );
}