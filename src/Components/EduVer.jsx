import { Hero, Button, Loading } from "@web3uikit/core";
import { useState, useEffect } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import idTokenAbi from "../Constants-Professional/idTokenAbi.json";
import idTokenAddresses from "../Constants-Professional/idTokenAddresses.json";
import rewardTokenAbi from "../Constants-Professional/rewardTokenAbi.json";
import rewardTokenAddresses from "../Constants-Professional/rewardTokenAddresses.json";
import eduData from "@/Data/eduData";
import { useNotification } from "@web3uikit/core";
import { useQuery, gql } from "@apollo/client";

const GET_USER_INFO = gql`
  {
    educationVerifieds(first: 100) {
      tokenId_
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
    edu: "",
  });
  const [showHero, setShowHero] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [proERC1155Balance, setProERC1155Balance] = useState(0);
  const { isWeb3Enabled, chainId: chainIdHex, account } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const idTokenAddress =
    chainId in idTokenAddresses ? idTokenAddresses[chainId][0] : null;
  const rewardTokenAddress =
    chainId in rewardTokenAddresses ? rewardTokenAddresses[chainId][0] : null;
  const dispatch = useNotification();

  const { runContractFunction: getTokenURI } = useWeb3Contract({
    abi: idTokenAbi,
    contractAddress: idTokenAddress,
    functionName: "tokenURI",
    params: {
      _tokenId: tokenIdFromProps,
    },
  });

  const { runContractFunction: verifyEducation } = useWeb3Contract({
    abi: idTokenAbi,
    contractAddress: idTokenAddress,
    functionName: "verifyEducation",
    params: {
      _tokenId: tokenIdFromProps,
      _verficationReward: 100,
    },
  });

  const { runContractFunction: eduVerify } = useWeb3Contract({
    abi: rewardTokenAbi,
    contractAddress: rewardTokenAddress,
    functionName: "eduVerify",
    params: {
      _to: account,
      _eduVerId: eduVerifyId,
    },
  });

  const { runContractFunction: getEduVerId } = useWeb3Contract({
    abi: rewardTokenAbi,
    contractAddress: rewardTokenAddress,
    functionName: "getEduVerId",
    params: {},
  });

  const { runContractFunction: balanceOf } = useWeb3Contract({
    abi: rewardTokenAbi,
    contractAddress: rewardTokenAddress,
    functionName: "balanceOf",
    params: {
      account: account,
      id: 2,
    },
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
      setUserEduData({
        firstName: firstname,
        lastName: lastname,
        edu: education,
      });
    }
  }

  async function setEduVerId() {
    const educationVerificationIdFromCall = await getEduVerId();
    console.log(
      `Education Verification ERC-1155 Id is: ${educationVerificationIdFromCall}`
    );
    if (educationVerificationIdFromCall) {
      setEduVerifyId(educationVerificationIdFromCall);
    }
  }

  async function setUserERC1155Balance() {
    const userERC1155Balance = await balanceOf();
    console.log(
      `User RewardToken Balance for EDUCATION_VERIFICATION_ID IS ${userERC1155Balance}`
    );
    if (userERC1155Balance) {
      setProERC1155Balance(userERC1155Balance);
    }
  }

  function checkEducationVerification(
    tokenId,
    loading,
    error,
    data,
    setShowHero
  ) {
    if (loading) {
      console.log("Loading data...");
      return;
    }
    if (error) {
      console.error("Error fetching data:", error);
      return;
    }
    if (!data || !data.educationVerifieds) {
      console.log("No data available");
      return;
    }

    const { educationVerifieds } = data;

    const isEduVerified = educationVerifieds.some(
      (item) => item.tokenId_ === tokenId
    );
    if (isEduVerified) {
      console.log("Data recieved");
      setShowHero(false);
    } else {
      console.log("No data found");
      setShowHero(true);
    }
  }

  useEffect(() => {
    const checkDatOnMount = async () => {
      checkEducationVerification(
        tokenIdFromProps,
        loading,
        error,
        data,
        setShowHero
      );
    };
    checkDatOnMount();
  }, [tokenIdFromProps, loading, error, data, setShowHero]);

  useEffect(() => {
    if (isWeb3Enabled) {
      setHero();
      setEduVerId();
      setUserERC1155Balance();
    }
  }, [isWeb3Enabled]);

  const handleSuccess = async (tx) => {
    try {
      await tx.wait(1);
      handleSuccessNotification(tx);
    } catch (err) {
      console.error(err);
    }
  };

  const handleErc1155Success = async (tx) => {
    try {
      await tx.wait(1);
      handleErc1155SuccessNotification(tx);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSuccessNotification = () => {
    dispatch({
      type: "success",
      message: `Successfully verified Education for ${userEduData.firstName} ${userEduData.lastName}`,
      title: "Success",
      position: "topR",
    });
  };

  const handleErc1155SuccessNotification = () => {
    dispatch({
      type: "success",
      message: `Successfully sent Reward tokens to ${account.slice(
        0,
        6
      )}...${account.slice(account.length - 4)}`,
      title: "Success",
      position: "topR",
    });
  };

  const handleError = (tx) => {
    handleErrorNotification(tx);
  };

  const handleErrorNotification = (tx) => {
    dispatch({
      type: "error",
      message: `Transaction Reverted. Reason: ${tx}`,
      title: "Error",
      position: "topR",
    });
  };

  return (
    <div>
      {loading ? (
        <div
          style={{
            backgroundColor: "#0000",
            borderRadius: "8px",
            padding: "20px",
          }}
        >
          <Loading
            fontSize={12}
            size={12}
            spinnerColor="#FFF"
            spinnerType="loader"
            text="Fetching Data..."
          />
        </div>
      ) : (
        <div>
          {showHero ? (
            <div className="edu--ver">
              <Hero
                customize={{
                  backgroundColor: "#f3f3f3",
                  border: "1px solid black",
                  borderRadius: "10px",
                  color: "#111111",
                  padding: "10px",
                }}
                height="200px"
                subTitle={`User: ${userEduData.firstName} ${
                  userEduData.lastName
                } has education ${
                  userEduData.edu
                } to verify (acc: ${account.slice(0, 6)}...${account.slice(
                  account.length - 4
                )})`}
                title="Education Verification"
              >
                <Button
                  text="Verify"
                  theme="colored"
                  size="large"
                  color="blue"
                  radius={15}
                  isLoading={isButtonLoading}
                  disabled={isButtonDisabled}
                  onClick={async () => {
                    const isUserEduDataPresent = eduData.some((item) => {
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
                            setIsButtonDisabled(true);
                            try {
                              await eduVerify({
                                onSuccess: handleErc1155Success,
                                onError: handleError,
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
                        type: "error",
                        message: "Data not present",
                        title: "Error",
                        position: "topR",
                      });
                    }
                  }}
                />
                <label style={{ fontSize: "small" }}>
                  *This is a two transaction process so please wait for the 1st
                  transaction to finish before approving the second one.
                </label>
                <label style={{ marginLeft: "5px", fontSize: "small" }}>
                  Else both transactions may fail
                </label>
              </Hero>
            </div>
          ) : (
            <Hero
              customize={{
                backgroundColor: "#00000",
                border: "1px solid white",
                borderRadius: "10px",
                color: "#FFFFFF",
                margin: "60px",
                padding: "10px",
                gap: "10px",
              }}
              height="200px"
              subTitle={`User "${account.slice(0, 6)}...${account.slice(
                account.length - 4
              )}" has been rewarded (ERC-1155) tokens: ${proERC1155Balance}`}
              title="Your Education was verified successfully!"
            >
              <label style={{ marginTop: "5px", fontSize: "small" }}>
                *This data is being fetched and updated directly from the Reward
                Token reflecting the user's ERC-1155 token balance rewarded for
                education verification
              </label>
            </Hero>
          )}
        </div>
      )}
    </div>
  );
}
