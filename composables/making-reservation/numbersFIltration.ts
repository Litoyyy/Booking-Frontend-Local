export function numbersFiltration() {
    const filters = ref([]);

    const getFilters=()=>{
        const res = getData('/api/reservation/filters/');
        res.map(filter=>{
            filter.defaultTitle = filter.title;
            filter.values.map(item=>{
                item.state = '';
            });
        });
    };

    const confirmedFilters = ref('');
    
    const setFilter=(index: number)=>{
        
    }

    watch(
        ()=>filters.value,
        (newValues)=>{
            newValues.map(filter=>{
                if(filter.state === 'active') confirmedFilters.value += `&${filter.query}=${filter.value}`;
            });
        }
    )
}