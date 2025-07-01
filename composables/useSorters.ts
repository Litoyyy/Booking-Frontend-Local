export function useSorters(type: TypesortElements) {
    const sortElements = ref([
        {
            title: 'Статус:',
            variants: [
                {
                    text: 'Все',
                    value: ''
                },
                {
                    text: 'Активные',
                    value: 'active'
                },
                {
                    text: 'Отказано',
                    value: 'deactive'
                }
            ]
        },
        {
            title: 'Способ оплаты:',
            variants: [
                {
                    text: 'Все',
                    value: ''
                },
                {
                    text: 'Активные',
                    value: 'active'
                },
                {
                    text: 'Отказано',
                    value: 'deactive'
                }
            ]
        },
    ]);
    sortElements.value.map(elem=>{
        elem.variants.map(variant=>{
            variant.state = '';
            if(variant.value === '') variant.state = 'active';
        });
    });
    const selectSort=(variant: Object, allVariants: Array<any>)=>{
        allVariants.map(item=>item.state = '');
        variant.state = 'active';
    };
    const dropSort=()=>{
        sortElements.value.map(elem=>{
            elem.variants.map(variant=>{
                variant.state = '';
                if(variant.value === '') variant.state = 'active';
            });
        });
    };

    return {
        sortElements,
        selectSort,
        dropSort
    }
}