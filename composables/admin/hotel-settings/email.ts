interface Email {
    id: number,
    email: string
}

export function email() {
    
    const defaultEmail = ref<Email>({
        id: 1,
        email: ''
    })

    const dataId = ref(3)

    const emailsData = ref<Array<Email>>([
        {
            id: 2,
            email: ''
        }
    ])

    const addEmail = () => {
        emailsData.value.push({
            id: dataId.value,
            email: ''
        })
        dataId.value++
    }

    const removeEmail = (index: number) => {
        emailsData.value.splice(index, 1)
    }

    const updateEmail = (id: number, newValue: string) => {
        if (id === 1) return defaultEmail.value.email === newValue
        
        emailsData.value = emailsData.value.map(el => {
            if(el.id === id) {
                return { ...el, email: newValue }
            }
            return el
        })
    }

    return {
        defaultEmail,
        emailsData,
        updateEmail,
        addEmail,
        removeEmail
    }
}