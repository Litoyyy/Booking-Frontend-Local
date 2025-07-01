export interface RoomInfo {
    roomNumber: number | string,
    idRoom: number,
    floor: number,
    active: boolean,
    categoryRoom: CategoryRoom,
}

export interface SendRoomInfo {
    roomNumber: number,
    idRoom: number
}

export interface ConfigRoom {
    idConf: number,
    rooms: RoomInfo[],
    frame: string,
    maxFloor: number | string,
    comment: string | null,
    typeBed: TypeBed
}

export interface MiniConf {
    frame: string,
    floor: string
}

export const categoryRoomArray = ['Люкс', 'Стандарт'] as const;

export type CategoryRoom = 'Люкс' | 'Стандарт'

type actions = 'Выбрать' | 'Редактировать' | 'Удалить'

export type TypeBed = 'Стандарт с широкой кроватью' | 'Двуспальная'

interface ItemActions {
    name: actions,
    fun: (id: number) => void
}

export const arrayBed = ref<{ name: string }[]>([
    {
        name: 'Стандарт с широкой кроватью'
    },
    {
        name: 'Двуспальная'
    }
])

export const useRooms = () => {

    const rooms = useState<ConfigRoom[]>('new-room-store', () => [
        {
            idConf: 1,
            rooms: [
                {
                    roomNumber: 1,
                    idRoom: 1,
                    floor: 1,
                    active: false,
                    categoryRoom: 'Люкс',
                },
                {
                    roomNumber: 2,
                    idRoom: 2,
                    floor: 1,
                    active: false,
                    categoryRoom: 'Стандарт',
                }
            ],
            frame: 'Главный',
            maxFloor: 3,
            comment: 'Крутой',
            typeBed: 'Стандарт с широкой кроватью'
        },
        {
            idConf: 2,
            rooms: [
                {
                    roomNumber: 3,
                    idRoom: 3,
                    floor: 2,
                    active: false,
                    categoryRoom: 'Люкс',
                },
                {
                    roomNumber: 4,
                    idRoom: 4,
                    floor: 2,
                    active: false,
                    categoryRoom: 'Стандарт'
                }
            ],
            frame: 'Стандарт',
            maxFloor: 3,
            comment: 'Обычный',
            typeBed: 'Двуспальная'
        }
    ])

    // Conf methods
    const findConfById = (confId: number) => {
        return rooms.value.find(el => el.idConf === confId)
    }

    const updateConf = (confId: number, newConf: ConfigRoom) => {
        rooms.value = rooms.value.map(el => {
            if (el.idConf === confId) return newConf
            return el
        })
    }

    const removeConf = (confId: number) => {
        console.log(confId)
        rooms.value = rooms.value.filter(el => el.idConf !== confId)
    }

    const addConf = (newConf: MiniConf) => {

        if (rooms.value.length === 0) return 1;
        const newId = Math.max(...rooms.value.map(conf => conf.idConf)) + 1

        rooms.value.push({
            idConf: newId,
            rooms: [],
            categoryRoom: 'Стандарт',
            comment: null,
            frame: newConf.frame,
            maxFloor: Number(newConf.floor)
        })
    }

    const setConfFloor = (id: number, newValue: string) => {
        rooms.value = rooms.value.map(el => {
            if (el.idConf !== id) return el
            const newEl = {
                ...el,
                floor: Number(newValue)
            }
            return newEl
        })
    }

    const setConfFrame = (id: number, newValue: string) => {
        rooms.value = rooms.value.map(el => {
            if (el.idConf !== id) return el
            const newEl = {
                ...el,
                frame: newValue
            }
            return newEl
        })
    }

    // Rooms methods
    const findRoomById = (id: number) => {
        const item = rooms.value
            .flatMap(conf => conf.rooms)
            .find(el => el.idRoom === id)
        return item
    }

    const checkedAll = ref<boolean>(false)

    const toggleRoomActive = (id: number | 'all') => {
        
        
        if (id === 'all') {
            checkedAll.value = !checkedAll.value
            rooms.value = rooms.value.map(conf => {
                conf.rooms = conf.rooms.map(room => {
                    return {
                        ...room,
                        active: checkedAll.value
                    }
                })
                return conf
            })
        }
   
        const item = rooms.value
            .flatMap(conf => conf.rooms)
            .find((room) => {
                if (room.idRoom === id) {
                    room.active = !room.active
                }
            })
    }

    const setRoomNumber = (id: number, newNumber?: number) => {

        if (newNumber === undefined) return

        rooms.value
            .flatMap(conf => conf.rooms)
            .find((room) => {
                if (room.idRoom === id) {
                    room.roomNumber = newNumber
                }
            })
    }

    const addRoom = (newRoom: RoomInfo | RoomInfo[], confId: number) => {
        
        confId = Number(confId)

        if (Array.isArray(newRoom)) {
            rooms.value.find(conf => {
                if (confId === conf.idConf) {
                    conf.rooms = [ ...conf.rooms, ...newRoom ]
                }
            })
        } else {
            rooms.value.find(conf => {
                if (conf.idConf === confId) {
                    conf.rooms.push(newRoom)
                }
            })
        }
    }

    const removeRoom = (idRoom: number) => {
        for (const conf of rooms.value) {
            conf.rooms = conf.rooms.filter(room => {
                return room.idRoom !== idRoom
            })
        }
    }

    // Options 
    const options = ref<ItemActions[]>([
        {
            name: 'Выбрать',
            fun: toggleRoomActive
        },
        {
            name: 'Редактировать',
            fun: setRoomNumber
        },
        {
            name: 'Удалить',
            fun: removeRoom
        }
    ])

    return {
        // Data
        rooms,
        
        // Methods for config
        findConfById,
        updateConf,
        addConf,
        removeConf,

        // Set config
        setConfFloor,
        setConfFrame,

        // Methods for rooms
        findRoomById,
        addRoom,
        removeRoom,
        setRoomNumber,
        toggleRoomActive,
        checkedAll,

        // Options 
        options
    }
}