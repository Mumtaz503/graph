import { Form } from "@web3uikit/core";
import { useState } from "react";

export default function Example() {
    const [storeData, setStoreData] = useState({
        Bestpie: '',
        BestZelda: '',
    })
    console.log(storeData)
    function handleChange(event) {
        setStoreData(prevData => {
            return {
                ...prevData,
                [event.target.name]: event.target.value
              }
        })
    } 
    return (
        <div>
            <Form
                buttonConfig={{
                    onClick: function noRefCheck() { },
                    theme: 'primary'
                }}
                data={[
                    {
                        name: 'Bestpie',
                        selectOptions: [
                            {
                                id: 'apple',
                                label: 'Apple Pie'
                            },
                            {
                                id: 'black',
                                label: 'Blackberry Pie'
                            },
                            {
                                id: 'pump',
                                label: 'Pumpkin Pie'
                            }
                        ],
                        type: 'select',
                        value: ''
                    },
                    {
                        name: 'BestZelda',
                        selectOptions: [
                            {
                                id: 'oot',
                                label: 'Ocarina of Time'
                            },
                            {
                                id: 'ww',
                                label: 'Wind Waker'
                            },
                            {
                                id: 'botw',
                                label: 'Breath of the Wild'
                            }
                        ],
                        type: 'select',
                        value: ''
                    }
                ]}
                onChange={handleChange}
                title="Select thing"
            />
        </div>
    );
}