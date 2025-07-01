export function useRooms(categoryId?: number) {
    const allRooms = ref([]);

    const getRooms = async()=>{
        if(!!categoryId) {
            const rooms = await getData(`/hotel/room?category=${categoryId}`);
            allRooms.value = rooms.results;
        } else {
            const rooms = await getData(`/hotel/room`);
            allRooms.value = rooms.results;
        };
    };

    onMounted(()=>{
        getRooms();
    });

    return {
        allRooms,
        getRooms
    }
}