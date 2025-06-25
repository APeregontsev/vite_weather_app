import "./App.css";
import { Weather } from "./pages/Weather/Weather";
import { Providers } from "./providers/providers";

function App() {
  return (
    <Providers>
      <Weather />
    </Providers>
  );
}

export default App;
