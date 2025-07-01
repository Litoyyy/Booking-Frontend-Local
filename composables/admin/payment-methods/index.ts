export interface GetPayment {
    id: number,
    name: string,
    is_active: boolean,
    can_refund: boolean,
    accessibility_condition: number,
    accessibility_type: string,
    accessibility_value: number,
    tariffs: number[]
}

export default function usePaymentMethods() {
    const paymentItemsState = useState<GetPayment[]>('payment-methods', () => [])

    getData('/hotel/payment-methods')
        .then(el => {
            paymentItemsState.value = el.results
        })

    const displayState = ref<'table' | 'grid'>('table')

    const toggleDisplay = (newValue: 'table' | 'grid') => {
        displayState.value = newValue
    }

    const openPopupEdit = ref<boolean>(false)

    const togglePopupEdit = (id: number) => {
        console.log(id)
        console.log(openPopupEdit.value)
        openPopupEdit.value = !openPopupEdit.value
        console.log(openPopupEdit.value)
    }

    return {
        paymentItemsState,

        displayState,
        toggleDisplay,

        openPopupEdit,
        togglePopupEdit
    }
}