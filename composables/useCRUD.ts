type UpdateFun<T> = (item: T) => T

export function useCRUD<T>() {
    const items = ref<T[]>([])

    const add = (item: T)  => {
        items.value.push(item)
    }

    const update = (index: number, updater: UpdateFun<T>) => {
        if (index >= 0 && index < items.value.length) {
            items.value[index] = updater(items.value[index]);
        }
    }

    const remove = (index: number) => {
        if (index >= 0 && index < items.value.length) {
            items.value.splice(index, 1)
        }
    }

    const getAll = () => {
        return items.value
    }

    return {
        items,
        add,
        update,
        remove,
        getAll
    }
}