import AdminHotel from "~/components/section/admin/create-letter/hotel/AdminHotel.vue"
import LetterHotel from "~/components/section/admin/create-letter/hotel/LetterHotel.vue"

type typeMailHotel = 'textPart'
    | 'detailOfBooking'
    | 'comment'
    | 'sign'

// Visibility
const textPart = ref<boolean>(true)
const detailOfBooking = ref<boolean>(true)
const comment = ref<boolean>(true)
const sign = ref<boolean>(true)

// Text ref
const textAppeal = ref('')
const textComment = ref('')
const textSign = ref('')

const toggleBool = (value: typeMailHotel) => {
    switch (value) {
        case 'textPart': textPart.value = !textPart.value; break;
        case 'detailOfBooking': detailOfBooking.value = !detailOfBooking.value; break;
        case 'comment': comment.value = !comment.value; break;
        case 'sign': sign.value = !sign.value; break;
    }
}

export const getMailHotel = () => {
    return {
        // Visibility 
        textPart,
        detailOfBooking,
        comment,
        sign,
        // Text ref
        textAppeal,
        textComment,
        textSign,
        // Function of change
        toggleBool,
        // Components
        letter: LetterHotel,
        admin: AdminHotel
    }
}