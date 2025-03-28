import { Toaster } from "sonner";
import AppRoutes from "./routes";

function App() {
  return (
    <div id="app">
      <AppRoutes />
      <Toaster />
    </div>
  );
}

export default App;
