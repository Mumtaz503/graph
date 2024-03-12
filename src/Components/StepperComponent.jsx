import { Stepper } from "@web3uikit/core";
import idTokenAbi from '../Constants-Professional/idTokenAbi.json';
import idTokenAddresses from '../Constants-Professional/idTokenAddresses.json';
import { useWeb3Contract, useMoralis } from "react-moralis";
import { useState, useEffect } from "react";

export default function StepperComponent({ tokenId }) {
    const userTokenId = tokenId[0];
    const [eduVerificationVal, setEduVerificationVal] = useState(0);
    const { isWeb3Enabled, chainId: chainIdHex } = useMoralis();
    const chainId = parseInt(chainIdHex);
    const idTokenAddress = chainId in idTokenAddresses ? idTokenAddresses[chainId][0] : null;

    const { runContractFunction: getTokenURI } = useWeb3Contract({
        abi: idTokenAbi,
        contractAddress: idTokenAddress,
        functionName: "tokenURI",
        params: {
            _tokenId: userTokenId
        }
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
            setEduVerificationVal(eduVer);
        }
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            setStepper();
        }
    }, [isWeb3Enabled])

    const stepperNum = () => {
        if (eduVerificationVal === 0) {
            return 2
        } else if (eduVerificationVal === 100) {
            return 3
        }
    }

    return (
        <div className="stepper">
            <div
                style={{
                    height: '1px',
                    minHeight: '450px',
                    fontSize: '10'
                }}
            >
                <Stepper
                    contentPadding="100px"
                    onComplete={function noRefCheck() { }}
                    onNext={function noRefCheck() { }}
                    onPrev={function noRefCheck() { }}
                    orientation="vertical"
                    step={stepperNum}
                    hasNavButtons={false}
                    stepperWidth={400}
                    stepData={[
                        {
                            content: <div style={{ display: 'block', textAlign: 'left', width: '100%', color: 'beige' }}>Registration</div>,
                            stepTitle: 'Register'
                        },
                        {
                            content: <div style={{ display: 'block', textAlign: 'left', width: '100%', color: 'beige' }}>Education Verification Required</div>,
                            stepTitle: 'Verify Education'
                        },
                        {
                            content: <div style={{ display: 'block', textAlign: 'left', width: '100%', color: 'beige' }}>Got Hired!!</div>,
                            stepTitle: 'Get hired'
                        }
                    ]}
                />
            </div>
        </div>

    )
}
