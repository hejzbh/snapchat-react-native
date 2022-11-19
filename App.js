// Tailwind
import { TailwindProvider } from "tailwindcss-react-native";
// Redux
import { Provider } from "react-redux";
import { store } from "./redux/store";
// Navigation
import { ScreenNavigator } from "./navigation/ScreenNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <TailwindProvider>
        <ScreenNavigator />
      </TailwindProvider>
    </Provider>
  );
}
