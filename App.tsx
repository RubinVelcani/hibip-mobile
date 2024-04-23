import "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ApplicationNavigator from "navigators/ApplicationNavigator";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ApplicationNavigator />
    </QueryClientProvider>
  );
}
