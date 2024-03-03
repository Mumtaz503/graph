import { Form } from "@web3uikit/core";
import { useMoralis, useWeb3Contract } from "react-moralis";
import address from '../Constants/address.json';
import abi from '../Constants/abi.json';
import { useState } from "react";
import { useNotification } from "@web3uikit/core";

export default function Body() {

  const { isWeb3Enabled, chainId: chainIdHex } = useMoralis();
  const buttonState = !isWeb3Enabled;
  const chainId = parseInt(chainIdHex);
  const storageAddress = chainId in address ? address[chainId][0] : null;
  const [storeData, setStoreData] = useState({
    Name: '',
    Job: '',
    Experience: 0
  });
  const dispatch = useNotification();

  function handleChange(event) {
    setStoreData(prevData => {
      return {
        ...prevData,
        [event.target.name]: event.target.value
      }
    });
  }

  const { runContractFunction: store } = useWeb3Contract({
    abi: abi,
    contractAddress: storageAddress,
    functionName: "store",
    params: {
      _name: storeData.Name,
      _job: storeData.Job,
      _experience: storeData.Experience
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
            await store({
              onSuccess: handleSuccess,
              onError: handleError,
            });
          },
          theme: 'primary'
        }}
        data={[
          {
            inputWidth: '100%',
            name: 'Name',
            type: 'text',
            validation: {
              required: true
            },
            value: ''
          },
          {
            inputWidth: '100%',
            name: 'Job',
            type: 'text',
            validation: {
              required: true
            },
            value: ''
          },
          {
            name: 'your experience',
            type: 'number',
            validation: {
              required: true
            },
            value: ''
          }]
        }
        onChange={() => handleChange}
        isDisabled={buttonState}
      />
    </div>
  );
}