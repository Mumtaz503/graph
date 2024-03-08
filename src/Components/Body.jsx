import { Form } from "@web3uikit/core";
import { useMoralis, useWeb3Contract } from "react-moralis";
import chainManagerAddresses from '../Constants-Professional/chainManagerAddresses.json';
import chainManagerAbi from '../Constants-Professional/chainManagerAbi.json';
import { useState } from "react";
import { useNotification } from "@web3uikit/core";

export default function Body() {

  const { isWeb3Enabled, chainId: chainIdHex } = useMoralis();
  const buttonState = !isWeb3Enabled;
  const chainId = parseInt(chainIdHex);
  const chainManagerAddress = chainId in chainManagerAddresses ? chainManagerAddresses[chainId][0] : null;
  const [storeData, setStoreData] = useState({
    FirstName: '',
    LastName: '',
    Field: '',
    Education: '',
  });
  const dispatch = useNotification();

  console.log(storeData);
  function handleChange(event) {
    let name, value;

    if (typeof event === 'object') {
        name = event.target.name;
        value = event.target.value;
    } else {
        name = event;
        value = arguments[1];
    }

    setStoreData(prevData => ({
        ...prevData,
        [name]: value
    }));
}

  const { runContractFunction: store } = useWeb3Contract({
    abi: chainManagerAbi,
    contractAddress: chainManagerAddress,
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
                id: 'dev',
                label: 'Developer'
              },
              {
                id: 'marketing',
                label: 'Marketing'
              },
              {
                id: 'business',
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
            type: 'select',
            selectOptions: [
              {
                id: 'bs',
                label: 'Bachelors'
              },
              {
                id: 'ms',
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