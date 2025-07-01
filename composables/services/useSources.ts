export function useSources() {
    const sources = ref([
        {
            id: 1,
            name: 'Booking module'
        }
    ]);

    return{
        sources
    };
};