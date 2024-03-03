import { ConnectButton } from "@web3uikit/web3";

export default function NavBar () {
    return (
        <nav className="nav--bar">
            <h1>
                This app stores user info on the blockchain
            </h1>
            <ConnectButton />
        </nav>
    ); 
}