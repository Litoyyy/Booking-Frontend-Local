export function useServices(categoryId?: number) {
    const allServices = ref([]);

    const getServices=async()=>{
        if(!!categoryId) {
            const services = await getData(`/hotel/service?category=${categoryId}`);
            allServices.value = services.results;
        } else {
            const services = await getData(`/hotel/service`);
            allServices.value = services.results;
        };
    };

    onMounted(()=>{
        getServices();
    })

    return {
        allServices,
        getServices
    }
}