import { boolean } from "zod"

export type TypeEmail = 
  'welcome' | 
  'feedback' | 
  'guest' | 
  'hotel' | 
  'payment'

export const useEmailNavigate = () => {
    const emailTypeState = useState<TypeEmail>('email-type', () => 'welcome')
    
    const goToWithEmailType = async (path: string, typeEmail: TypeEmail) => {
        emailTypeState.value = typeEmail
        await navigateTo(path)
    }
    
    return {
        goToWithEmailType,
        emailTypeState,
    }
}

export interface EmailSendInt {
    visible: boolean,
    textDesc: string
}

export interface EmailSendValue extends EmailSendInt {
    route: boolean
}

export const useChooseEmailNavigate = () => {
    const startData: EmailSendInt = reactive({ visible: false, textDesc: '' })
    const emailTypeState = useState<EmailSendInt>('email-send', () => startData)

    const changeEmailTypeState = ({ visible, textDesc, route } :EmailSendValue) => {
        emailTypeState.value.visible = visible
        emailTypeState.value.textDesc = textDesc
        route && goToMailing()
    }
    
    const goToMailing = async () => {
        await navigateTo('/admin/mailings')
    }

    return {
        emailTypeState,
        changeEmailTypeState
    }
}