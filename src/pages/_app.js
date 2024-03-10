import "@/styles/globals.css";
import NavBar from "../Components/NavBar";
import Body from "@/Components/Body";
import ListComponent from "@/Components/ListComponent";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "@web3uikit/core";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { useRouter } from 'next/router';
import Dashboard from "./Dashboard";
import CardBox from "@/Components/CardBox";
import StepperComponent from "@/Components/StepperComponent";
import EduVer from "@/Components/EduVer";


const client = new ApolloClient({
  cache: new InMemoryCache,
  uri: "https://api.studio.thegraph.com/query/65711/pro-ind/v0.0.1"
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isMarketplaceRoute = router.pathname === '/Marketplace';
  return (
    <MoralisProvider initializeOnMount={false}>
      <ApolloProvider client={client}>
      <div>
        <NotificationProvider>
          <div>
          <NavBar />
          {!isMarketplaceRoute && (
            <>
              <Body />
              {/* <Dashboard /> */}
              {/* <CardBox /> */}
              {/* <StepperComponent /> */}
              {/* <EduVer /> */}
            </>
          )}
          <Component {...pageProps} />
          </div>
        </NotificationProvider>
      </div>
      </ApolloProvider>
    </MoralisProvider>
    
  );
}
