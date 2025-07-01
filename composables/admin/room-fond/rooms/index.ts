export interface GetRoom {
    building: number,
    level: number,
    type_room: number,
    bed: number,
    comment: string,
    number: number,
    checked: boolean
}

export interface SendRoom {
    building: number,
    level: number,
    type_room: number,
    bed: number,
    comment: string,
    numbers: number[]
}

export type Display = 'table' | 'row'

export type actions = 'Выбрать' | 'Редактировать' | 'Удалить'

export interface ItemActions {
    name: actions,
    fun: (id: number, newNumber?: number, parentId?: number) => void
}

const activeDisplay = ref<Display>('row')

export const useRoomFond = async () => {

    const rooms = useState<GetRoom[]>('rooms-data', () => [])

    const getNewData = () => {
        getData('/hotel/room-number').then(el => {
            rooms.value = el.results.map((room: any) => {
                return {
                    ...room,
                    checked: false
                }
            });
        });
    };

    const checkedAll = ref<boolean>(false)

    const toggleAll = () => {
        checkedAll.value = !checkedAll.value;
        rooms.value.forEach(el => {
            el.checked = checkedAll.value;
        });
    };

    const toggleCheckbox = (id: number | 'all') => {
        if (id == 'all') {
            toggleAll();
            return;
        };
        const room = rooms.value.find(el => el.id === id)
        if (room) {
            room.checked = !room.checked;
        };
    };

    const changeDisplay = () => {
        activeDisplay.value = activeDisplay.value === 'row' ? 'table' : 'row'
    }

    const addRoom = (newRoom: GetRoom) => {
        const newId = Math.max(...rooms.value.map(room => room.id))
        console.log(newId)
        rooms.value = [...rooms.value, newRoom]
    }

    const deleteRoom = (id: number) => {
        rooms.value = rooms.value.filter(el => el.id !== id)
    }

    const editRoom = (id: number) => {
        useRouter().push(`/admin/room-fond/edit/${id}`)
    }

    const changeRoom = (changesRoom :GetRoom) => {
        const roomIndex = rooms.value.findIndex(el => el.id === changesRoom.id)
        if (roomIndex !== 1) {
            rooms.value[roomIndex] = changesRoom
        };
    };

    const options = ref<ItemActions[]>([
        {
            name: 'Выбрать',
            fun: toggleCheckbox
        },
        {
            name: 'Редактировать',
            fun: editRoom
        },
        {
            name: 'Удалить',
            fun: deleteRoom
        }
    ])

    const getRoomById = (id: number) => {
        return rooms.value.find(el => el.id === id)
    }

    const saveRoom = (newRoom: SendRoom) => {
        console.log(newRoom)
    }

    return {
        // Array data rooms
        rooms,
        // Get data
        getNewData,
        // Checkboxs
        checkedAll,
        toggleCheckbox,
        // Display
        activeDisplay,
        changeDisplay,
        // Options
        options,
        // Methods
        getRoomById,
        changeRoom,

        saveRoom,
    }
}
