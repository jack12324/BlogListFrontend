import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import { NotificationContextProvider } from "./context/NotificationContext";
import { CurrentUserContextProvider } from "./context/CurrentUserContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <CurrentUserContextProvider>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </CurrentUserContextProvider>
  </QueryClientProvider>
);
