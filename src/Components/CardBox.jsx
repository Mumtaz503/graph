import { useWeb3Contract, useMoralis } from "react-moralis";
import { useState, useEffect } from "react";
import { Button, Loading } from "@web3uikit/core";
import Image from "next/image";
import idTokenAbi from '../Constants-Professional/idTokenAbi.json';
import idTokenAddresses from '../Constants-Professional/idTokenAddresses.json';

export default function CardBox({ tokenId, isInMarketplace }) {
    const userTokenId = tokenId[0];
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [field, setField] = useState("");
    const [education, setEducation] = useState("");
    const [imageURI, setImageURI] = useState("");
    const [experience, setExperience] = useState(0);
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

    async function updateUI() {
        const tokenURIEncodedString = await getTokenURI();
        console.log(`token URI is: ${tokenURIEncodedString}`);
        if (tokenURIEncodedString) {
            const base64EncodedString = tokenURIEncodedString.replace(
                "data:application/json;base64,",
                ""
            );
            const jsonString = atob(base64EncodedString);
            const jsonObj = JSON.parse(jsonString);
            const imageURI = jsonObj.image;
            const fName = jsonObj.firstname;
            const lName = jsonObj.lastname;
            const fieldOfWork = jsonObj.field;
            const edu = jsonObj.education;
            const exp = jsonObj.attributes[0].value;
            const eduVer = jsonObj.attributes[1].value;
            setImageURI(imageURI);
            setFirstName(fName);
            setLastName(lName);
            setField(fieldOfWork);
            setEducation(edu);
            setExperience(exp);
            setEduVerificationVal(eduVer);
        }
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI();
        }
    }, [isWeb3Enabled]);

    return (
        <div>
            {imageURI ? (
                <div className="card--box">
                    <div className="img--box">
                        <Image
                            loader={() => imageURI}
                            src={imageURI}
                            width={300}
                            height={150}
                            layout="fixed"
                            style={{ borderRadius: '10px' }}
                        />
                    </div>
                    <div className="details">
                        <label>Owned by: {firstName} {lastName}</label>
                        <label>Token ID: {tokenId}</label>
                        <label>Field: {field}</label>
                        <div className="education">
                            <label>Education: {education}</label>
                            {eduVerificationVal >= 100 ? <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="green">
                                <path d="M12 2l2.24 7.24h7.24l-5.84 4.48 2.24 7.28-6.64-4.84-6.64 4.84 2.24-7.28-5.84-4.48h7.24z" />
                            </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M16.8 7.2l-9.6 9.6M7.2 7.2l9.6 9.6" />
                                </svg>
                            }
                        </div>
                        <label>Work Experience Points: {experience}</label>
                    </div>
                    <div className="button">
                        {isInMarketplace ? <Button text="Reward User" color='blue' theme="primary" /> : null}
                    </div>
                </div>
            ) :
                <div
                    style={{
                        backgroundColor: '#0000',
                        borderRadius: '8px',
                        padding: '20px',
                    }}
                >
                    <Loading
                        fontSize={12}
                        size={12}
                        spinnerColor="#FFF"
                        spinnerType="loader"
                        text="Loading ID..."
                    />
                </div>
            }
        </div>
    )
}