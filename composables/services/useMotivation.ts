export function useMotivation() {
    const motivation = ref([
        {
            id: 0,
            name: 'Без мотиватора',
        },
        {
            id: 1,
            name: 'Акция',
        },
        {
            id: 2,
            name: 'Лидер продаж',
        },
        {
            id: 3,
            name: 'Успейте забронировать',
        },
        {
            id: 4,
            name: 'Семьям с детьми',
        },
        {
            id: 5,
            name: 'Компаниям друзей',
        }
    ]);

    return{
        motivation
    };
};