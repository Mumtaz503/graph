import "@/styles/globals.css";
import NavBar from "../Components/NavBar";
import Body from "@/Components/Body";
import ListComponent from "@/Components/ListComponent";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "@web3uikit/core";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";


const client = new ApolloClient({
  cache: new InMemoryCache,
  uri: "https://api.studio.thegraph.com/query/65711/g-q-l/v0.0.1"
})
export default function App({ Component, pageProps }) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <ApolloProvider client={client}>
      <div>
        <NotificationProvider>
          <NavBar />
          <Body />
          <ListComponent />
          <Component {...pageProps} />
        </NotificationProvider>
      </div>
      </ApolloProvider>
    </MoralisProvider>
    
  );
}
