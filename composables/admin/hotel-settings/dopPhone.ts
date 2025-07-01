interface DopNumbers {
    id: number,
    value: string
}

export function dopPhone() {
    
    const dataId = ref<number>(1)

    const dopNumbers = ref<Array<DopNumbers>>([
        {
            id: dataId.value,
            value: ''
        }
    ])

    const addDopNumbers = () => {
        dataId.value++

        dopNumbers.value.push({
            id: dataId.value,
            value: ''
        })
    }

    const removeDopNumbers = (id: number) => {
        if (dopNumbers.value.length !== 1) {
            dopNumbers.value.filter((el) => {
                el.id !== id
            })
        }
    }

    return {
        dopNumbers,
        addDopNumbers,
        removeDopNumbers
    }
}