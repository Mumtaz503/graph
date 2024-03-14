import { Slider } from "@web3uikit/core";
import idTokenAbi from "../Constants-Professional/idTokenAbi.json";
import idTokenAddresses from "../Constants-Professional/idTokenAddresses.json";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { useState, useEffect } from "react";

export default function StepperComponent({ tokenId }) {
  const userTokenId = tokenId[0];
  const [stepperNum, setStepperNum] = useState(0);
  const { isWeb3Enabled, chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const idTokenAddress =
    chainId in idTokenAddresses ? idTokenAddresses[chainId][0] : null;

  const { runContractFunction: getTokenURI } = useWeb3Contract({
    abi: idTokenAbi,
    contractAddress: idTokenAddress,
    functionName: "tokenURI",
    params: {
      _tokenId: userTokenId,
    },
  });

  async function setStepper() {
    const tokenURIEncodedString = await getTokenURI();
    console.log(`token URI is: ${tokenURIEncodedString}`);
    if (tokenURIEncodedString) {
      const base64EncodedString = tokenURIEncodedString.replace(
        "data:application/json;base64,",
        ""
      );
      const jsonString = atob(base64EncodedString);
      const jsonObj = JSON.parse(jsonString);
      const eduVer = jsonObj.attributes[1].value;

      if (eduVer === 100) {
        setStepperNum(1000);
      } else {
        setStepperNum(500);
      }
    }
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      setStepper();
    }
  }, [isWeb3Enabled]);

  return (
    <div className="stepper">
      <div
        style={{
          height: "1px",
          minHeight: "450px",
          width: "700px",
          fontSize: "10",
          paddingTop: "50px",
        }}
      >
        <Slider
          disabled
          max={1000}
          min={0}
          onChange={function noRefCheck() {}}
          value={stepperNum}
          markers={[
            <h3>Register</h3>,
            <h3>Education Verification</h3>,
            <h3>Get Hired</h3>,
          ]}
          bgColor="#00ffff"
          labelBgColor="#000000"
        />
      </div>
    </div>
  );
}
