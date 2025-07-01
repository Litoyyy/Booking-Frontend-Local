export function reservationSteps() {
    const currentStep = ref(1);

    const nextStep=()=>{currentStep.value += 1}
    const prevStep=()=>{currentStep.value -= 1}
    const setStep=(value: number)=>{currentStep.value = value};

    return {
        currentStep,
        nextStep,
        prevStep,
        setStep
    }
}