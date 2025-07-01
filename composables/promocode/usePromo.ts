import type { Display, ItemActions } from "../admin/room-fond/rooms";

export type TypeDiscound = 'Общая' | 'На тарифы' | 'На номера'

export interface Promocode {
    id: number,
    active: boolean,
    on: boolean,
    promocode: string,
    typeDiscound: TypeDiscound,
    discound: string,
    description: string
}

const activeDisplay = ref<Display>('row')

export function usePromo() {

    const promocodes = useState<Promocode[]>('promocodes', () => [
        {
            id: 1,
            active: false,
            on: false,
            promocode: 'WELCOME10',
            typeDiscound: 'На номера',
            discound: '10',
            description: '10% скидка для новых пользователей',
        },
        {
            id: 2,
            active: false,
            on: false,
            promocode: 'FREESHIP',
            typeDiscound: 'На тарифы',
            discound: '300',
            description: 'Скидка 300₽ на доставку',
        },
        {
            id: 3,
            active: false,
            on: false,
            promocode: 'SUMMER25',
            typeDiscound: 'На номера',
            discound: '25',
            description: '25% летняя скидка',
        },
        {
            id: 4,
            active: false,
            on: false,
            promocode: 'MEGA50',
            typeDiscound: 'Общая',
            discound: '50',
            description: '50% на всё по промокоду MEGA50',
        },
        {
            id: 5,
            active: false,
            on: false,
            promocode: 'OLDUSER20',
            typeDiscound: 'На номера',
            discound: '500',
            description: '500₽ скидка для старых пользователей',
        },
    ])

    const cheackedAll = ref<boolean>(false)

    const toggleActive = (id: number | 'all') => {
        if (id === 'all') {
            cheackedAll.value = !cheackedAll.value
            promocodes.value = promocodes.value.map(el => {
                return {
                    ...el,
                    active: cheackedAll.value
                }
            })
        }

        const promo = promocodes.value.find(el => el.id === id)
        if (promo) {
            promo.active = !promo.active
        }
    }

    const toggleOn = (id: number) => {

        promocodes.value = promocodes.value.map(el => {
            if (el.id === id) {
                return {
                    ...el,
                    on: !el.on
                }
            }
            return el
        })
    }

    const removePromo = (id: number) => {
        promocodes.value = promocodes.value.filter(el => el.id !== id)
    }

    const addPromo = (newItem: Promocode) => {
        promocodes.value.push(newItem)
    }

    const options = ref<ItemActions[]>([
        {
            name: 'Выбрать',
            fun: toggleActive,
        },
        {
            name: 'Удалить',
            fun: removePromo
        }
    ])

    const changeDisplay = (display: Display) => {
        activeDisplay.value = display
    }

    const toggleDisplay = () => {
        
        console.log(activeDisplay)

        if (activeDisplay.value == 'row') {
            activeDisplay.value = 'table'
        } else {
            activeDisplay.value = 'row'
        }
    }

    return {
        // Data promocodes
        promocodes,
        // Methods
        toggleActive,
        toggleOn,
        addPromo,   
        removePromo,
        // Display
        activeDisplay,
        changeDisplay,
        toggleDisplay,
        // Options
        options,
        // Cheacked All
        cheackedAll
    }
}