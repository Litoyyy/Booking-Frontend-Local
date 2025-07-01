

export function useTableCheckboxes(items: Ref) {
    const allChecked = ref(false);

    const checkAllFunc=(checked: boolean)=>{
        items.value.map(item=>{item.checked = checked});
        allChecked.value = checked;
    };

    watch(
        ()=>items.value,
        (newVal)=>{
            let totalChecked = true;
            const promises = items.value.map(item=>{
                if(item.checked === undefined) item.checked = false;
                if(!item.checked) totalChecked = false;
            });
            Promise.all(promises)
            .then(()=>{
                allChecked.value = totalChecked;
            });
        }, { immediate: true, deep: true }
    );

    return {
        allChecked,
        checkAllFunc
    };
}