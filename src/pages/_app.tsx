import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { UserProvider } from "@auth0/nextjs-auth0";
import { Layout } from "../components/Layout";
import { FirebaseMessagingProvider } from "../components/providers/FirebaseMessagingProvider";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <FirebaseMessagingProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ReactQueryDevtools initialIsOpen={false} />
        </FirebaseMessagingProvider>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default MyApp;
