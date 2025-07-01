export interface ColorPickerInt {
    id: number,
    color: string,
    active: boolean,
    name: string
}

export interface ActiveColor {
    color: string | null,
    name: string | null
}

export type Shade = 'bright' | 'muted' | 'pastel'
export type ShadeName = 'Ярко' | 'Тускло' | 'Постельный'

export interface ShadeInfo { 
    key: Shade,
    name: Shade | ShadeName
}

export interface ShadeOptions { 
    name: ShadeName
}

const activeColor = ref<ActiveColor>({ 
    color: null, 
    name: null
})

const activeShade = ref<ShadeInfo>({ 
    key: 'bright', 
    name: 'Ярко' 
})

export const useEmailColor = () => {

    const arrayShade: ShadeInfo[] = [
        {
            key: 'bright',
            name: 'Ярко'
        },
        {
            key: 'muted',
            name: 'Тускло'
        },
        {
            key: 'pastel',
            name: 'Постельный'
        }
    ]

    const shadeColors: Record<Shade, ColorPickerInt[]> = {
        bright: [
            { id: 1, color: "#C62828", active: false, name: "Red" },
            { id: 2, color: "#A65628", active: false, name: "Brown" },
            { id: 3, color: "#B89E23", active: false, name: "Olive" },
            { id: 4, color: "#9CB323", active: false, name: "Lime" },
            { id: 5, color: "#43A047", active: false, name: "Green" },
            { id: 6, color: "#2EAF74", active: false, name: "Teal" },
            { id: 7, color: "#26A69A", active: false, name: "Turquoise" },
            { id: 8, color: "#1E88E5", active: false, name: "Blue" },
            { id: 9, color: "#1565C0", active: false, name: "Dark Blue" }, // Выделенный цвет
            { id: 10, color: "#283593", active: false, name: "Indigo" },
            { id: 11, color: "#512DA8", active: false, name: "Purple" },
            { id: 12, color: "#8E24AA", active: false, name: "Violet" },
            { id: 13, color: "#D81B60", active: false, name: "Pink" },
            { id: 14, color: "#C2185B", active: false, name: "Magenta" }
        ],
        muted: [
            { id: 1, color: '#AD8383', active: false, name: 'Red' },
            { id: 2, color: '#AD9483', active: false, name: 'Brown' }
        ],
        pastel: [
            { id: 1, color: '#EBC9C9', active: false, name: 'Red' },
            { id: 2, color: '#EBD6C9', active: false, name: 'Brown' }
        ]
    }

    const shadeObject: Record<Shade, ShadeInfo> = {
        bright: {
            key: 'bright',
            name: 'Ярко'
        },
        muted: {
            key: 'muted',
            name: 'Тускло'
        },
        pastel: {
            key: 'pastel',
            name: 'Постельный'
        }
    }

    const setActiveShade = (shade: Shade) => {
        activeShade.value = shadeObject[`${shade}`]
    }

    const setActiveColor = (index: number) => {
        const key = activeShade.value.key
        const updatedArray = shadeColors[key].map((item, idx) => ({
            ...item,
            active: idx === index ? !item.active : false
        }))

        shadeColors[key] = updatedArray

        activeColor.value = updatedArray[index].active
            ? { color: updatedArray[index].color, name: updatedArray[index].name }
            : { color: null, name: null }
    }

    const setShade = (shade: ShadeName) => {
        switch (shade) {
            case 'Ярко':
                setActiveShade('bright')
                break;
            
            case 'Постельный':
                setActiveShade('pastel')
                break;

            case 'Тускло':
                setActiveShade('muted')
                break;

            default:
                setActiveShade('bright')
                break;
        }
    }

    return {
        activeColor,
        activeShade,
        setActiveColor,
        setActiveShade,
        shadeColors,
        arrayShade,
        setShade
    }
}