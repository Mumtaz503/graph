import { useState } from "react";
import { useMoralis } from "react-moralis";
import { useEffect } from "react";
import CardBox from "@/Components/CardBox";
import StepperComponent from "@/Components/StepperComponent";
import EduVer from "@/Components/EduVer";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { Loading, BannerStrip, Button } from "@web3uikit/core";

const GET_USER_INFO = gql`
  {
    idTokenMinteds(first: 100) {
      professional_
      tokenId_
    }
  }
`;

export default function Dashboard() {
  const router = useRouter();
  const { account, isWeb3Enabled, Moralis } = useMoralis();
  const [display, setDisplay] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const { loading, error, data } = useQuery(GET_USER_INFO);
  const [tokenId, setTokenID] = useState();

  function checkProfessional(addr, loading, error, data, setShowDashboard) {
    if (loading) {
      console.log("Loading data...");
      return;
    }
    if (error) {
      console.error("Error fetching data:", error);
      return;
    }
    if (!data || !data.idTokenMinteds) {
      console.log("No data available");
      return;
    }

    const { idTokenMinteds } = data;
    const isProfessionalPresent = idTokenMinteds.some(
      (item) => item.professional_ === addr
    );

    if (isProfessionalPresent) {
      console.log("User present");
      setShowDashboard(true);
      const professionalTokenId_ = idTokenMinteds
        .filter((item) => item.professional_ === addr)
        .map((item) => item.tokenId_);
      console.log(`token id is: ${professionalTokenId_}`);
      setTokenID(professionalTokenId_);
    } else {
      console.log("User not present");
      setShowDashboard(false);
    }
  }

  useEffect(() => {
    const checkProfessionalOnMount = async () => {
      checkProfessional(account, loading, error, data, setShowDashboard);
    };

    checkProfessionalOnMount();

    const accountChangedListener = Moralis.onAccountChanged(async (address) => {
      checkProfessional(address, loading, error, data, setShowDashboard);
    });

    return () => {
      accountChangedListener();
    };
  }, [account, loading, error, data, setShowDashboard]);

  const handleSidebarClick = (itemName) => {
    setDisplay(itemName);
  };

  const handleBodyRoute = () => {
    router.push("/Body");
  };

  return (
    <div>
      {loading ? (
        <div
          style={{
            backgroundColor: "#0000",
            borderRadius: "8px",
            padding: "20px",
            marginLeft: 600,
          }}
        >
          <Loading
            fontSize={12}
            size={12}
            spinnerColor="#FFF"
            spinnerType="wave"
            text="Loading Dashboard..."
          />
        </div>
      ) : (
        <div>
          {isWeb3Enabled && showDashboard ? (
            <div className="dashboard">
              <div className="sidebar">
                <ul>
                  <li>
                    <a
                      href="#"
                      onClick={() => handleSidebarClick("professional id")}
                    >
                      My professional ID
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={() => handleSidebarClick("progress")}>
                      My progress
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={() => handleSidebarClick("edu ver")}>
                      Education Verification
                    </a>
                  </li>
                </ul>
              </div>
              <div className="content">
                {display === "professional id" && (
                  <CardBox tokenId={tokenId} isInMarketplace={false} />
                )}
                {display === "progress" && (
                  <StepperComponent tokenId={tokenId} />
                )}
                {display === "edu ver" && <EduVer tokenId={tokenId} />}
              </div>
            </div>
          ) : (
            <div
              key="1"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transform: "scale(1)",
                width: 400,
                height: 100,
                marginTop: 50,
                marginLeft: 500,
                backgroundColor: "#f3f3f3",
              }}
            >
              <BannerStrip
                isCloseBtnVisible={false}
                text="Connect your wallet or move to Landing page"
                type="error"
                style={{
                  paddingTop: 3,
                }}
              />
              <Button
                onClick={handleBodyRoute}
                style={{
                  marginTop: "50px",
                }}
                text="Go to landing page"
                theme="outline"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
