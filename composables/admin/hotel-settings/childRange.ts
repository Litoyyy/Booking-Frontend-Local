interface ChildRange {
    id: string,
    ageFrom: number,
    ageTo: number
}

export function childRange() {
    
    const dataId = ref<number>(0)

    const childRangeData = ref<Array<ChildRange>>([
        { 
            id: String(dataId.value), 
            ageFrom: 0, 
            ageTo: 0 
        },
    ])

    dataId.value++

    const removeChildRange = (index: number) => {
        if (childRangeData.value.length > 1) {
            childRangeData.value = childRangeData.value.filter((_, idx) => idx !== index);
        }
    }

    const addChildRange = () => {
        childRangeData.value.push(
            { 
                id: String(dataId.value), 
                ageFrom: 0, 
                ageTo: 0 
            }
        )

        dataId.value++
    };

    return {
        childRangeData,
        removeChildRange,
        addChildRange
    }
}