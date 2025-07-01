export function reservationRooms() {
    const roomsInfo = useState('roomsInfo',()=>
        ref([
            {
                text: '',
                value: '',
                tags: [],
            }
        ])
    );

    const tags = ref([
        { text: '1 год', id: 1 },
        { text: '2 года', id: 2 },
        { text: '3 года', id: 3 },
        { text: '4 года', id: 4 },
        { text: '5 лет', id: 5 },
    ]);
    
    const getTags = computed(() => tags.value);

    const addNewRoom=()=>{
        const newInfo = {text: '', value: '', tags: []}
        roomsInfo.value.push(newInfo);
    };

    const changeRoomInfo=(index: number, newInfo: {text: string, value: string, tags: []})=>{
        roomsInfo.value[index] = newInfo;
    };

    const checkForDelete=(index: number)=>{
        const checkingObject = roomsInfo.value[index];
        if(checkingObject.value === '0') roomsInfo.value.splice(index, 1);
    };

    function formattedTotalRooms () {
        let formattedTotal = '';

        let totalAdults = 0;
        let totalKids = 0;
        let totalKidsTags = '';

        roomsInfo.value.map(info=>{
            totalAdults += Number(info.value);
            totalKids += info.tags.length;
            info.tags.map(kid=>{
                totalKidsTags += totalKidsTags === '' ? kid.text: `, ${kid.text}`;
            });
        });

        formattedTotal = `${totalAdults} взросл${getWordEnding(totalAdults, ['ый', 'ых', 'ых'])}`;
        if(totalKids > 0) {
            formattedTotal += ` и ${totalKids} ${getWordEnding(totalAdults, ['ребенок', 'ребенка', 'детей'])} (${totalKidsTags})`;
        }

        return formattedTotal;
    };

    const addRoomBtnDisabled = ref(true);

    watch(
        ()=>roomsInfo.value,
        async()=>{
            let disableBtn = false;
            const promises = roomsInfo.value.map(info=>{
                if(!info.text) disableBtn = true;
            });
            Promise.all(promises).then(()=>{
                addRoomBtnDisabled.value = disableBtn;
            });
        },
        { deep: true }
    )

    return {
        roomsInfo,
        addNewRoom,
        changeRoomInfo,
        getTags,
        addRoomBtnDisabled,
        formattedTotalRooms,
        checkForDelete
    }
}