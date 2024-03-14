import { ConnectButton } from "@web3uikit/web3";
import { useRouter } from "next/router";

export default function NavBar () {

    const router = useRouter();
    const handleClick = () => {
        router.push('/Marketplace');
    };
    return (
        <nav className="nav--bar">
            <h1>
                Top Talent Chain
            </h1>
            <div className="right--side">
                <label onClick={handleClick}>
                    Marketplace
                </label>
                <ConnectButton chainId={11155111} />
            </div>
        </nav>
    );
}