import type { TypeEmail } from "./useEmailNavigate"
import { getMailWelcome } from "./letterData/welcomeMail"
import { getMailFeedback } from "./letterData/feedbackMail"
import { getMailGuest } from "./letterData/guestMail"
import { getMailHotel } from "./letterData/hotelMail"
import { getMailPayment } from "./letterData/paymentMail"

export const useDataLetter = () => {
    const arrayLanguage: Array<{ name: string }> = [
        { name: 'Русский' },
        { name: 'Английский' },
        { name: 'Итальянский' }
    ]

    const keyValueWelcome = ref<any>({
        name: 'Иван',
        last_name: 'Иванов'
    })

    const fromLetter = ref('')

    const textFromLetter = (e: Event) => {
        const targer = e.target as HTMLInputElement
        fromLetter.value = String(targer.value)
    }

    return {
        arrayLanguage, 
        keyValueWelcome,
        fromLetter,
        textFromLetter
    }
}

export const getMailTheme = (value: TypeEmail) => {

    switch (value) {
        case 'welcome': return getMailWelcome;
        case 'feedback': return getMailFeedback;
        case 'guest': return getMailGuest;
        case 'hotel': return getMailHotel;
        case 'payment': return getMailPayment;
    }
}