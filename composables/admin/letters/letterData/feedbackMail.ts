import LetterFeedback from "~/components/section/admin/create-letter/feedback/LetterFeedback.vue"
import AdminFeedback from "~/components/section/admin/create-letter/feedback/AdminFeedback.vue"

type typeMailFeedback = 'textPart' 
    | 'linkOnQuest'
    | 'comment'
    | 'sign'

// Значения для отображения блоков
const textPart = ref<boolean>(true)
const linkOnQuest = ref<boolean>(true)
const comment = ref<boolean>(true)
const sign = ref<boolean>(true)

// Текстовые переменные для TextEdit
const textAppeal = ref('')
const textGreetings = ref('')
const textComment = ref('')
const textSign = ref('')

const toggleBool = (value: typeMailFeedback) => {
    switch (value) {
        case 'textPart': textPart.value = !textPart.value; break;
        case 'linkOnQuest': linkOnQuest.value = !linkOnQuest.value; break;
        case 'comment': comment.value = !comment.value; break;
        case 'sign': sign.value = !sign.value; break;
    }
}

export const getMailFeedback = () => {
    return {
        // Visible blocks
        textPart,
        linkOnQuest,
        comment,
        sign,
        // String for TextEdit
        textAppeal,
        textGreetings,
        textComment,
        textSign,
        // Switch fun
        toggleBool,
        // Components
        letter: LetterFeedback,
        admin: AdminFeedback
    }
}