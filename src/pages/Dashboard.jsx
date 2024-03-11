import { useState } from "react";
import { useMoralis } from "react-moralis";
import { useEffect } from "react";
import CardBox from "@/Components/CardBox";
import StepperComponent from "@/Components/StepperComponent";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const GET_USER_INFO = gql`
{
    idTokenMinteds(first: 100) {
      professional_
      tokenId_
    }
}
`

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
        const isProfessionalPresent = idTokenMinteds.some(item => item.professional_ === addr);

        // It is now obtaining multiple token ids fighure out how you should only
        // fetch 1 token Id of the account that is connected
        if (isProfessionalPresent) {
            console.log("User present");
            setShowDashboard(true);
            const professionalTokenId_ = idTokenMinteds.map(function(item) {
                return item.tokenId_;
            });
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
        router.push('/Body');
    }


    return (
        <div>
            {isWeb3Enabled && showDashboard ?
                <div>
                    <div className="sidebar">
                        <ul>
                            <li><a href="#" onClick={() => handleSidebarClick("professional id")}>My professional ID</a></li>
                            <li><a href="#" onClick={() => handleSidebarClick("progress")}>My progress</a></li>
                            <li><a href="#" onClick={() => handleSidebarClick("edu ver")}>Education Verification</a></li>
                        </ul>

                    </div>
                    <div className="content">
                        {/* {<p>Token id is: {tokenID}</p>} */}
                        {display === "professional id" && <CardBox tokenId={tokenId} isInMarketplace={false} />}
                        {display === "progress" && <StepperComponent />}
                        {display === "edu ver" && <h1>Your Edu verification goes here {account}</h1>}
                    </div>
                </div>
                : 
                <labe
                    onClick={handleBodyRoute}
                    style={{
                        cursor: "pointer",
                    }}
                >Seems like you're not registered click here to get redirected to the registration form</labe>
                }
        </div>
    );
}