export function useYearsCalendar() {
    const currentDate = new Date();

    const yearsToSelect = ref([
        {
            year: '2024',
            state: ''
        },
        {
            year: '2025',
            state: 'active'
        },
        {
            year: '2026',
            state: ''
        },
    ]);

    const week = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const monthDays = ref(Array(6).fill(week).flat());

    const monthsArray: Object[] = reactive([]);

    const dontShowPrevMonths = ref(false);
    const changeMonthsArray=(monthToStart?: number)=>{
        monthsArray.length = 0;
        const activeYear = yearsToSelect.value.find(year=>year.state === 'active')?.year;

        let date = new Date(activeYear, monthToStart ?? 0);
        const lastDate = new Date(activeYear, 11, 31);

        while (date <= lastDate) {
            const month = date.toLocaleString('default', { month: 'long' });
            const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

            let monthObj = monthsArray.find(item => item.month === capitalizedMonth);

            if (!monthObj) {
                monthObj = {
                    month: capitalizedMonth,
                    days: []
                };
                monthsArray.push(monthObj);
            };
            const dayObj = {
                fullDate: new Date(date),
                date: date.getDate(),
                day: date.getDay(),
                state: ''
            }
            monthObj.days.push(dayObj);

            date.setDate(date.getDate() + 1);
        };
    };

    watch(()=>dontShowPrevMonths.value,
        ()=>{
            if(dontShowPrevMonths.value) {
                changeMonthsArray(currentDate.getMonth());
            } else {
                changeMonthsArray();
            };
        }, { immediate: true, deep: true }
    )
    watch(()=>yearsToSelect.value,
        ()=>{
            const selectedYear = yearsToSelect.value.find(item=>item.state === 'active')?.year;
            if(selectedYear === currentDate.getFullYear().toString()) {
                if(dontShowPrevMonths.value) {
                    changeMonthsArray(currentDate.getMonth());
                } else {
                    changeMonthsArray();
                };
            } else {
                changeMonthsArray();
            };
            
        }, { immediate: true, deep: true }
    );

    return {
        currentDate,
        yearsToSelect,
        monthDays,
        monthsArray,
        dontShowPrevMonths
    }
}