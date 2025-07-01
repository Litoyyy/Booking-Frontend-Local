import AdminGuest from "~/components/section/admin/create-letter/guest/AdminGuest.vue"
import LetterGuest from "~/components/section/admin/create-letter/guest/LetterGuest.vue"

type typeMailGuest = 'textPart' 
    | 'detailOfBooking'
    | 'comment'
    | 'sign'

const textPart = ref<boolean>(true)
const detailOfBooking = ref<boolean>(true)
const comment = ref<boolean>(true)
const sign = ref<boolean>(true)

const textAppeal = ref('')
const textGreetings = ref('')
const textComment = ref('')
const textSign = ref('')

const toggleBool = (value: typeMailGuest) => {
    switch (value) {
        case 'textPart': textPart.value = !textPart.value; break;
        case 'detailOfBooking': detailOfBooking.value = !detailOfBooking.value; break;
        case 'comment': comment.value = !comment.value; break;
        case 'sign': sign.value = !sign.value; break;
    }
}

export const getMailGuest = () => {
    return {
        // Visible 
        textPart,
        detailOfBooking,
        comment,
        sign,
        // Text for TextEdit
        textAppeal,
        textGreetings,
        textComment,
        textSign,
        // Toggle value
        toggleBool,
        // Components
        admin: AdminGuest,
        letter: LetterGuest
    }
}