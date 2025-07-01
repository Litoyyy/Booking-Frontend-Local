export function usePriceRule() {
    const priceRule = ref([
        {
            id: 1,
            name: 'За гостя в сутки',
        },
        {
            id: 2,
            name: 'За гостя',
        },
        {
            id: 3,
            name: 'За использование',
        },
        {
            id: 4,
            name: 'За номер в сутки',
        },
        {
            id: 5,
            name: 'За номер',
        },
        {
            id: 6,
            name: 'За бронь',
        }
    ]);

    return{
        priceRule
    };
};