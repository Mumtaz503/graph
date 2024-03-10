import { Stepper } from "@web3uikit/core"

export default function StepperComponent() {
    return (
        <div className="stepper">
            <div
                style={{
                    height: '1px',
                    minHeight: '450px'
                }}
            >
                <Stepper
                    contentPadding="100px"
                    onComplete={function noRefCheck() { }}
                    onNext={function noRefCheck() { }}
                    onPrev={function noRefCheck() { }}
                    orientation="vertical"
                    step={2}
                    hasNavButtons={false}
                    stepperWidth={400}
                    stepData={[
                        {
                            content: <div style={{ display: 'block', textAlign: 'left', width: '100%' }}>Registration</div>,
                            stepTitle: 'Register'
                        },
                        {
                            content: <div style={{ display: 'block', textAlign: 'left', width: '100%' }}>Education Verification Required</div>,
                            stepTitle: 'Verify Education'
                        },
                        {
                            content: <div style={{ display: 'block', textAlign: 'left', width: '100%' }}>Got Hired!!</div>,
                            stepTitle: 'Get hired'
                        }
                    ]}
                />
            </div>
        </div>

    )
}