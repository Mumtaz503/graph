import { ConnectButton } from "@web3uikit/web3";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";

export default function NavBar() {
  const { isWeb3Enabled } = useMoralis();
  const router = useRouter();
  const handleClick = () => {
    router.push("/Marketplace");
  };
  return (
    <nav className="nav--bar">
      <h1>Top Talent Chain</h1>
      <div className="right--side">
        {isWeb3Enabled ? (
          <label onClick={handleClick}>Marketplace</label>
        ) : (
          <label>Marketplace</label>
        )}
        <ConnectButton chainId={11155111} />
      </div>
    </nav>
  );
}
