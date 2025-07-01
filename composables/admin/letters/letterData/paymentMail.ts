import AdminPayment from "~/components/section/admin/create-letter/prepayment/AdminPayment.vue"
import LetterPayment from "~/components/section/admin/create-letter/prepayment/LetterPayment.vue"

type typeMailPayment = 'textPart'
    | 'detailOfBooking'
    | 'sign'

// Visibility
const textPart = ref<boolean>(true)
const detailOfBooking = ref<boolean>(true)
const sign = ref<boolean>(true)

// Text ref
const textAppeal = ref('')
const textGreeting = ref('')
const textSign = ref('')

const toggleBool = (value: typeMailPayment) => {
    switch (value) {
        case 'textPart': textPart.value = !textPart.value; break;
        case 'detailOfBooking': detailOfBooking.value = !detailOfBooking.value; break;
        case 'sign': sign.value = !sign.value; break;
    }
}

export const getMailPayment = () => {
    return {
        // Visible
        textPart,
        detailOfBooking,
        sign,
        // Text ref
        textAppeal,
        textGreeting,
        textSign,
        // Toggle
        toggleBool,
        // Component
        letter: LetterPayment,
        admin: AdminPayment
    }
}