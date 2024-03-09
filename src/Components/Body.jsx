import { Form } from "@web3uikit/core";
import { useMoralis, useWeb3Contract } from "react-moralis";
import idTokenAbi from '../Constants-Professional/idTokenAbi.json';
import idTokenAddresses from '../Constants-Professional/idTokenAddresses.json';
import { useState } from "react";
import { useNotification } from "@web3uikit/core";

export default function Body() {

  const { isWeb3Enabled, chainId: chainIdHex } = useMoralis();
  const buttonState = !isWeb3Enabled;
  const chainId = parseInt(chainIdHex);
  const idTokenAddress = chainId in idTokenAddresses ? idTokenAddresses[chainId][0] : null;
  const [storeData, setStoreData] = useState({
    FirstName: '',
    LastName: '',
    Field: '',
    Education: '',
  });
  const dispatch = useNotification();
  const svgData = `<svg width="300" height="150" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="100%" height="100%" fill="#f0f0f0"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="20" fill="#333">
    <tspan x="50%" dy="-20">First Name: ${storeData.FirstName}</tspan>
    <tspan x="50%" dy="25">Last Name: ${storeData.LastName}</tspan>
    <tspan x="50%" dy="25">Field: ${storeData.Field}</tspan>
    <tspan x="50%" dy="25">Education: ${storeData.Education}</tspan>
  </text>
</svg>`;

  const extractName = (name) => {
    const arr = name.split("_");
    return arr[0];
  };

  console.log(svgData);
  function handleChange(event) {
    // console.log(event.target);
    let name, value;
    if (event.target.nodeName === "INPUT") {
      name = event.target.name;
      value = event.target.value;
    } else if (event.target.nodeName === "SELECT") {
      name = extractName(event.target.id);
      value = event.target.value;
    }
    setStoreData({ ...storeData, [name]: value });
  }

  const { runContractFunction: mintNft } = useWeb3Contract({
    abi: idTokenAbi,
    contractAddress: idTokenAddress,
    functionName: "mintNft",
    params: {
      _fName: storeData.FirstName,
      _lName: storeData.LastName,
      _field: storeData.Field,
      _edu: storeData.Education,
      _svg: svgData
    }
  });

  const handleSuccess = async (tx) => {
    try {
      await tx.wait(1);
      handleSuccessNotification(tx);
    } catch (err) {
      console.log(err);
    }
  }

  const handleSuccessNotification = () => {
    dispatch({
      type: "success",
      message: "Info Added succesfully",
      title: "Success",
      position: "topR"
    });
  }

  const handleError = (tx) => {
    handleErrorNotification(tx);
  }

  const handleErrorNotification = (tx) => {
    dispatch({
      type: "error",
      message: `Something went wrong ${tx}`,
      title: "Error",
      position: "topR",
    });
  }

  return (
    <div className="form--button">
      <Form
        buttonConfig={{
          onClick: async () => {
            await mintNft({
              onSuccess: handleSuccess,
              onError: handleError,
            });
          },
          theme: 'primary'
        }}
        data={[
          {
            inputWidth: '100%',
            name: 'FirstName',
            type: 'text',
            validation: {
              required: true
            },
            value: ''
          },
          {
            inputWidth: '100%',
            name: 'LastName',
            type: 'text',
            validation: {
              required: true
            },
            value: ''
          },
          {
            inputWidth: '100%',
            name: 'Field',
            validation: {
              required: true
            },
            selectOptions: [
              {
                id: 'Developer',
                label: 'Developer'
              },
              {
                id: 'Marketing',
                label: 'Marketing'
              },
              {
                id: 'Business',
                label: 'Business'
              }
            ],
            type: 'select',
            value: ''
          },
          {
            inputWidth: '100%',
            name: 'Education',
            validation: {
              required: true
            },
            selectOptions: [
              {
                id: 'Bachelors',
                label: 'Bachelors'
              },
              {
                id: 'Masters',
                label: 'Masters'
              }
            ],
            type: 'select',
            value: ''
          }]
        }
        onChange={handleChange}
        isDisabled={buttonState}
      />
    </div>
  );
}