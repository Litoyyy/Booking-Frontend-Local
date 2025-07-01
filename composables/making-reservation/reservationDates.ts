export function reservationDates() {
    const reservationDatesValues = useState('reservationDates', ()=> 
        ref({
            start_date: '',
            end_date: '',
        })
    );

    const setReservationDates=(firstDate: string, lastDate: string) => {
        if(firstDate != undefined && lastDate != undefined) {
            reservationDatesValues.value.start_date = firstDate;
            reservationDatesValues.value.end_date = lastDate;
        }
    };

    const dateFilters = `?start_date=${reservationDatesValues.start_date}&end_date=${reservationDatesValues.end_date}`;

    return {
        reservationDatesValues,
        setReservationDates,
        dateFilters
    }
}