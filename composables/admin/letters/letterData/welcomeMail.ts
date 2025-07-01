import LetterWelcome from "~/components/section/admin/create-letter/welcome/LetterWelcome.vue"
import AdminWelcome from "~/components/section/admin/create-letter/welcome/AdminWelcome.vue"

// Всё вынесено из функции чтобы сохранялся контекст переменных
// Почему не хуки? 
// Чтобы контекст изменялся при переходе между страницами
type typeMailWelcome = 'textPart' 
    | 'detailOfBooking'
    | 'peymentView'
    | 'cancellationBooking'
    | 'sign'

// Значения для отображения блоков
const textPart = ref<boolean>(true)
const detailOfBooking = ref<boolean>(true)
const peymentView = ref<boolean>(true)
const cancellationBooking = ref<boolean>(true)
const sign = ref<boolean>(true)

// Текстовые переменные для TextEdit
const textAppeal = ref('')
const textGreetings = ref('')
const textPayment = ref('')
const textSign = ref('')

const toggleBool = (value: typeMailWelcome) => {
    switch (value) {
        case 'textPart': textPart.value = !textPart.value; break;
        case 'detailOfBooking': detailOfBooking.value = !detailOfBooking.value; break;
        case 'peymentView': peymentView.value = !peymentView.value; break;
        case 'cancellationBooking': cancellationBooking.value = !cancellationBooking.value; break;
        case 'sign': sign.value = !sign.value; break;
    }
}

export const getMailWelcome = () => {
    return {
        // Отображение блоков
        textPart,
        detailOfBooking,
        peymentView,
        cancellationBooking,
        sign,
        // Текстовые переменные для TextEdit
        textAppeal,
        textGreetings,
        textPayment,
        textSign,
        // Функции изменения 
        toggleBool,
        // Components
        letter: LetterWelcome,
        admin: AdminWelcome
    }
}