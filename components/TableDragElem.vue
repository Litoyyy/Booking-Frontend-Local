<script lang="ts" setup>
    const props = defineProps<{
        allDraggable: Array<HTMLDivElement>,
        dragZone: HTMLDivElement,
        curIndex: number
    }>();

    const dragElem = ref();
    const emptyRowInserted = ref();

    function handleMouseDown(event: Event){
        dragElem.value = props.allDraggable[props.curIndex];
        const draggableElemRect = dragElem.value.getBoundingClientRect();

        dragElem.value?.classList.add('fixed');
        props.dragZone.style.position = 'relative';

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td class="table__row_empty" style="height: ${draggableElemRect.height}px;" colspan="${dragElem.value.querySelectorAll('td').length}"></td>
        `;
        emptyRowInserted.value = props.dragZone.insertBefore(emptyRow, dragElem.value);
    };

    function handleMouseMove(){
        const draggableZoneRect = props.dragZone.getBoundingClientRect();
        const draggableElemRect = dragElem.value.getBoundingClientRect();

        const zoneMousePosition = event.clientY - draggableZoneRect.top;
        props.allDraggable.forEach((item, index)=>{
            if(index === props.curIndex) return;
            const itemRect = item.getBoundingClientRect();
            if(event.clientY > itemRect.top && event.clientY < itemRect.top + itemRect.height) {
                item.style.borderTop = '4px #E68F6F solid';
            } else {
                item.style.removeProperty('border-top');
            };
        });

        if(event.clientY < draggableZoneRect.top || event.clientY > draggableZoneRect.bottom - draggableElemRect.height/2) return;
        dragElem.value.style.top = `${event.clientY - draggableZoneRect.top}px`;
    };

    function handleMouseUp(){
        setTimeout(() => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }, 100);
        setTimeout(() => {
            props.dragZone.removeChild(emptyRowInserted.value);
            props.dragZone.style.removeProperty('position');
            
            props.allDraggable.forEach(item=>{
                item.classList.remove('fixed');
                item.style.removeProperty('top');
                item.style.removeProperty('border-top');
            });
        }, 150);
    };
</script>

<template>
    <div @mousedown="(event: Event)=>handleMouseDown(event)">
    <ElementPopover>
        <template #icon>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.5 7C9.32843 7 10 6.32843 10 5.5C10 4.67157 9.32843 4 8.5 4C7.67157 4 7 4.67157 7 5.5C7 6.32843 7.67157 7 8.5 7ZM8.5 13.5C9.32843 13.5 10 12.8284 10 12C10 11.1716 9.32843 10.5 8.5 10.5C7.67157 10.5 7 11.1716 7 12C7 12.8284 7.67157 13.5 8.5 13.5ZM10 18.5C10 19.3284 9.32843 20 8.5 20C7.67157 20 7 19.3284 7 18.5C7 17.6716 7.67157 17 8.5 17C9.32843 17 10 17.6716 10 18.5ZM15.5 7C16.3284 7 17 6.32843 17 5.5C17 4.67157 16.3284 4 15.5 4C14.6716 4 14 4.67157 14 5.5C14 6.32843 14.6716 7 15.5 7ZM17 12C17 12.8284 16.3284 13.5 15.5 13.5C14.6716 13.5 14 12.8284 14 12C14 11.1716 14.6716 10.5 15.5 10.5C16.3284 10.5 17 11.1716 17 12ZM15.5 20C16.3284 20 17 19.3284 17 18.5C17 17.6716 16.3284 17 15.5 17C14.6716 17 14 17.6716 14 18.5C14 19.3284 14.6716 20 15.5 20Z" fill="#2D3033" fill-opacity="0.48"/>
            </svg>
        </template>
        Переместить
    </ElementPopover>
    </div>
</template>