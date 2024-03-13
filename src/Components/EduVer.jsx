import { Hero, Button } from "@web3uikit/core";
import { useState, useEffect } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import idTokenAbi from '../Constants-Professional/idTokenAbi.json';
import idTokenAddresses from '../Constants-Professional/idTokenAddresses.json';
import rewardTokenAbi from '../Constants-Professional/rewardTokenAbi.json';
import rewardTokenAddresses from '../Constants-Professional/rewardTokenAddresses.json';
import eduData from "@/Data/eduData";
import { useNotification } from "@web3uikit/core";
import { useQuery, gql } from "@apollo/client";

const GET_USER_INFO = gql`
{
    educationVerifieds(first: 100) {
      professional_
      educationVerification_
    }
}
`;


export default function EduVer({ tokenId }) {
    const tokenIdFromProps = tokenId[0];
    const { loading, error, data } = useQuery(GET_USER_INFO);
    const [eduVerifyId, setEduVerifyId] = useState(0);
    const [userEduData, setUserEduData] = useState({
        firstName: "",
        lastName: "",
        edu: ""
    });
    const [showHero, setShowHero] = useState(false);
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const { isWeb3Enabled, chainId: chainIdHex, account, Moralis } = useMoralis();
    const chainId = parseInt(chainIdHex);
    const idTokenAddress = chainId in idTokenAddresses ? idTokenAddresses[chainId][0] : null;
    const rewardTokenAddress = chainId in rewardTokenAddresses ? rewardTokenAddresses[chainId][0] : null;
    const dispatch = useNotification();

    const { runContractFunction: getTokenURI } = useWeb3Contract({
        abi: idTokenAbi,
        contractAddress: idTokenAddress,
        functionName: "tokenURI",
        params: {
            _tokenId: tokenIdFromProps
        }
    });

    const { runContractFunction: verifyEducation } = useWeb3Contract({
        abi: idTokenAbi,
        contractAddress: idTokenAddress,
        functionName: "verifyEducation",
        params: {
            _tokenId: tokenIdFromProps,
            _verficationReward: 100
        }
    });

    const { runContractFunction: eduVerify } = useWeb3Contract({
        abi: rewardTokenAbi,
        contractAddress: rewardTokenAddress,
        functionName: "eduVerify",
        params: {
            _to: account,
            _eduVerId: eduVerifyId
        }
    });

    const { runContractFunction: getEduVerId } = useWeb3Contract({
        abi: rewardTokenAbi,
        contractAddress: rewardTokenAddress,
        functionName: "getEduVerId",
        params: {},
    });

    async function setHero() {
        const tokenURIEncodedString = await getTokenURI();
        console.log(`token URI is: ${tokenURIEncodedString}`);
        if (tokenURIEncodedString) {
            const base64EncodedString = tokenURIEncodedString.replace(
                "data:application/json;base64,",
                ""
            );
            const jsonString = atob(base64EncodedString);
            const jsonObj = JSON.parse(jsonString);
            const { firstname, lastname, education } = jsonObj;
            const eduVerVal = await jsonObj.attributes[1].value;
            setUserEduData({
                firstName: firstname,
                lastName: lastname,
                edu: education
            });
        }
    }

    async function setEduVerId() {
        const educationVerificationIdFromCall = await getEduVerId();
        console.log(`Education Verification ERC-1155 Id is: ${educationVerificationIdFromCall}`);
        if (educationVerificationIdFromCall) {
            setEduVerifyId(educationVerificationIdFromCall);
        }
    }

    function checkEducationVerification(addr, loading, error, data, setShowHero) {
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

        const { educationVerifieds } = data;

        const isEduVerified = educationVerifieds.some(item => item.professional_ === addr);
        if (isEduVerified) {
            console.log("Data recieved");
            setShowHero(true);
        } else {
            console.log("No data found");
            setShowHero(false);
        }

    }

    useEffect(() => {
        const checkDatOnMount = async () => {
            checkEducationVerification(account, loading, error, data, setShowHero);
        };
        checkDatOnMount();

        const accountsChangedListener = Moralis.onAccountChanged(async (address) => {
            checkEducationVerification(address, loading, error, data, setShowHero);
        });

        return () => {
            accountsChangedListener;
        }
    },[account, loading, error, data, setShowHero])

    useEffect(() => {
        if (isWeb3Enabled) {
            setHero();
            setEduVerId();
        }
    }, [isWeb3Enabled]);

    const handleSuccess = async (tx) => {
        try {
            await tx.wait(1);
            handleSuccessNotification(tx);
        } catch (err) {
            console.error(err);
        }
    }

    const handleErc1155Success = async (tx) => {
        try {
            await tx.wait(1);
            handleErc1155SuccessNotification(tx);
        } catch (err) {
            console.error(err);
        }
    }

    const handleSuccessNotification = () => {
        dispatch({
            type: 'success',
            message: `Successfully verified Education for ${userEduData.firstName} ${userEduData.lastName}`,
            title: 'Success',
            position: 'topR'
        });
    }

    const handleErc1155SuccessNotification = () => {
        dispatch({
            type: 'success',
            message: `Successfully sent Reward tokens to ${account.slice(0, 6)}...${account.slice(account.length - 4)}`,
            title: 'Success',
            position: 'topR'
        })
    }

    const handleError = (tx) => {
        handleErrorNotification(tx);
    }

    const handleErrorNotification = (tx) => {
        dispatch({
            type: 'error',
            message: `Transaction Reverted. Reason: ${tx}`,
            title: 'Error',
            position: 'topR'
        });
    }

    //Figure out how you must show hero only to people who haven't verified their IDs.
    return (
        <div>
            {!loading ?
        <div>
            {!showHero ?
                (
                    <div className="edu--ver">
                        <Hero
                            customize={{
                                backgroundColor: '#f3f3f3',
                                border: '1px solid black',
                                borderRadius: '10px',
                                color: '#111111',
                                margin: '60px',
                                padding: '24px',
                            }}
                            height="200px"
                            subTitle={`User: ${userEduData.firstName} ${userEduData.lastName} has education ${userEduData.edu} to verify (acc: ${account})`}
                            title="Education Verification"
                        >
                            <Button
                                text="Verify"
                                theme="colored"
                                size="large"
                                color="blue"
                                radius={15}
                                isLoading={isButtonLoading}
                                onClick={async () => {
                                    const isUserEduDataPresent = eduData.some(item => {
                                        return (
                                            item.firstName === userEduData.firstName &&
                                            item.lastName === userEduData.lastName &&
                                            item.edu === userEduData.edu
                                        );
                                    });

                                    if (isUserEduDataPresent) {
                                        try {
                                            setIsButtonLoading(true);
                                            await verifyEducation({
                                                onSuccess: async (tx) => {
                                                    handleSuccess(tx);
                                                    try {
                                                        await eduVerify({
                                                            onSuccess: handleErc1155Success,
                                                            onError: handleError
                                                        });
                                                    } catch (error) {
                                                        console.error(error);
                                                    }
                                                },
                                                onError: handleError,
                                            });
                                        } catch (error) {
                                            console.error(error);
                                        }
                                    } else {
                                        dispatch({
                                            type: 'error',
                                            message: 'Data not present',
                                            title: 'Error',
                                            position: 'topR'
                                        });
                                    }
                                }}
                            />
                        </Hero>
                    </div>
                )
                :
                (
                    <h2>
                        Your education is verified
                    </h2>
                )
            }
        </div>
: <p>Loading data please wait</p>}
        </div>
    );
}