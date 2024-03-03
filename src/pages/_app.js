import "@/styles/globals.css";
import NavBar from "../Components/NavBar";
import Body from "@/Components/Body";
import List from "@/Components/List";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "@web3uikit/core";

export default function App({ Component, pageProps }) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <div>
        <NotificationProvider>
          <NavBar />
          <Body />
          <List />
          <Component {...pageProps} />
        </NotificationProvider>
      </div>
    </MoralisProvider>
  );
}
