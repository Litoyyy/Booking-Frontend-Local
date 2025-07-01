<script setup lang="ts">
    const props = defineProps<{
        id?: string,
        rangeSelect?: boolean,
        firstDate?: string,
        lastDate?: string,
        firstPlaceholder?: string,
        lastPlaceholder?: string,
        firstHelper?: string,
        lastHelper?: string,
        firstName?: string,
        lastName?: string,
        theme?: 'light' | 'dark',
    }>();

    const { currentlyMobile } = mobileState();
    const showCalendar = ref(false);
    const calendarRef = ref<HTMLDivElement | null>(null);

    const firstInputValue = ref('');
    const secondInputValue = ref('');

    const firstDateValue = ref(props.firstDate || '');
    const lastDateValue = ref(props.lastDate || '');


    const mobileVariant = ref(false);

    watch(() => firstDateValue.value, (newValue) => {
        if(!!newValue){
            firstInputValue.value = formatDate(newValue, true);
        } else {
            firstInputValue.value = '';
        }
    });
    watch(() => lastDateValue.value, (newValue) => {
        if(!!newValue){
            secondInputValue.value = formatDate(newValue, true);
        } else {
            secondInputValue.value = '';
        }
    });

    const today = new Date();

    const firstDayThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayConstructor = new Date(today.getFullYear() + 1, today.getMonth() + 1, 1);

    const groupedDates: Object[] = reactive([]);

    let date = new Date(firstDayThisMonth);
    while (date < lastDayConstructor) {
        const year = date.getFullYear().toString();
        const month = date.toLocaleString('default', { month: 'long' });

        let monthObj = groupedDates.find(item => item.month === month && item.year === year);

        if (!monthObj) {
            monthObj = {
                month: month,
                year: year,
                days: []
            };
            groupedDates.push(monthObj);
        }

        let dateState = '';

        if(new Date(date) < today || new Date(date) > new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())) {
            dateState = 'disabled';
        }

        const dayObj = {
            fullDate: new Date(date),
            date: date.getDate(),
            day: date.getDay(),
            state: dateState,
            subState: '',
        }
        monthObj.days.push(dayObj);

        date.setDate(date.getDate() + 1);
    };

    const allDays: Object[] = [];
    groupedDates.map(month=>{
        month.days.map(day=>allDays.push(day));
    });

    const shouldDisplayYear = (index: number) => {
        if (index === 0) return true;
        return groupedDates[index].year !== groupedDates[index - 1].year;
    };


    const calendarList = ref<HTMLDivElement | null>(null);
    const calendarItems = ref<(HTMLDivElement | null)[]>([]);
    const calendarButtons = ref<(HTMLButtonElement | null)[]>([]);

    const onScroll = () => {
        if (calendarList.value) {
            const calendarRect = calendarList.value.getBoundingClientRect();
            const moddleLine =  calendarRect.height / 2
            calendarItems.value.forEach((item, index)=>{
                const itemRect = item.getBoundingClientRect();
                const itemPositionTop = calendarRect.top - itemRect.top;
                const itemPositionBottom = itemPositionTop + itemRect.height;
                if(itemPositionTop < moddleLine && moddleLine < itemPositionBottom) {
                    calendarItems.value.map(item=>item.dataset.state = '');
                    calendarButtons.value.map(item=>item.dataset.state = '');
                    calendarButtons.value[index].dataset.state = 'active';
                    item.dataset.state = 'active';
                }
            });
        };
    };
    const scrollTo = (index: number) => {
        if(calendarItems.value) {
            calendarItems.value[index].scrollIntoView({behavior: 'smooth'});
        };
    };

    const clearBtnStateFirst = ref(false);
    const clearBtnStateSecond = ref(false);

    const clearAllFilled = () => {
        groupedDates.map(month=>{
            month.days.map(day=>{
                if(day.subState !== '') day.subState = '';
                if(day.state === 'filled') day.state = '';
            });
        });
    };

    const selectDate=async(choosenDay: Object)=> {
        if(props.rangeSelect) {
            const setDatesBetween = (dayStart: Date, dayEnd: Date) =>{
                if(dayStart < dayEnd) {
                    allDays.filter(item=>(item.fullDate > dayStart && item.fullDate < dayEnd)).map(day=>day.state='filled')
                } else {
                    allDays.filter(item=>(item.fullDate > dayEnd && item.fullDate < dayStart)).map(day=>day.state='filled')
                };
            };
            
            if(!!firstDateValue.value && !!lastDateValue.value) {
                allDays.map(day=>{
                    if(day.state == 'disabled') return;
                    day.subState = '';
                    day.state = '';
                });
                clearAllFilled();
                clearBtnStateFirst.value = true;
                choosenDay.state = 'active';
                lastDateValue.value = '';
                firstDateValue.value = choosenDay.fullDate.toLocaleDateString();
            } else if (!!firstDateValue.value || !!lastDateValue.value) {
                let selectDate = {};
                groupedDates.map(month=>{
                    const activeDay = month.days.find(day=>day.state === 'active');
                    if(!activeDay) return;
                    selectDate = activeDay;
                });
                if(choosenDay.fullDate == selectDate.fullDate) {
                    choosenDay.state = '';
                    firstDateValue.value = '';
                    lastDateValue.value = '';
                    return;
                } else {
                    choosenDay.state = 'active';
                    if(choosenDay.fullDate > selectDate.fullDate) {
                        selectDate.subState = 'active-right';
                        choosenDay.subState = 'active-left';
                        firstDateValue.value = selectDate.fullDate.toLocaleDateString();
                        lastDateValue.value = choosenDay.fullDate.toLocaleDateString();
                    } else {
                        selectDate.subState = 'active-left';
                        choosenDay.subState = 'active-right';
                        firstDateValue.value = choosenDay.fullDate.toLocaleDateString();
                        lastDateValue.value = selectDate.fullDate.toLocaleDateString();
                    };
                    closeCalendar();
                };
                setDatesBetween(selectDate.fullDate, choosenDay.fullDate);
            } else {
                clearBtnStateFirst.value = true;
                choosenDay.state = 'active';
                firstDateValue.value = choosenDay.fullDate.toLocaleDateString();
            };
        } else {
            allDays.map(day=>{
                if(day.state == 'disabled') return;
                day.state = '';
            });
            choosenDay.state = 'active';
            clearBtnStateFirst.value = true;
            firstDateValue.value = choosenDay.fullDate.toLocaleDateString();
        };
    };

    const clearFirtsInput = () => {
        firstDateValue.value = '';
        if(props.rangeSelect) {
            const firstActiveDay = allDays.find(day=>day.state === 'active');
            if(!firstActiveDay) return;
            clearAllFilled();
            firstActiveDay.state = '';
        } else {
            allDays.map(day=>{
                if(day.state == 'disabled') return;
                day.state = '';
            });
        };
    };
    const clearSecondInput = () => {
        lastDateValue.value = '';
        const allActiveDays: Object[] = [];
        allDays.map(day=>{if(day.state === 'active') allActiveDays.push(day)})
        clearAllFilled();
        if(allActiveDays.length > 1) {
            allActiveDays.map((day, index) =>{
                if(index !== 0) day.state = '';
            });
        } else {
            allActiveDays.map(day=>day.state = '');
        };
    };

    const openCalendar=async()=> {
        showCalendar.value = true;

        const scrollHeight = document.body.scrollHeight;

        await nextTick(); 
        const calendarRect = calendarRef.value?.getBoundingClientRect();
        if(calendarRef.value && calendarRect && calendarRect?.bottom > scrollHeight) {
            const totalCalendarHeight = calendarRect?.height - (calendarRect?.bottom - scrollHeight)
            calendarRef.value.style.height = (totalCalendarHeight) / getRem() - 3 + 'rem';
        };
        setTimeout(() => {
            document.addEventListener('click', checkForClose);
        }, 300);
    };
    const closeCalendar = () => {
        showCalendar.value = false;
        document.removeEventListener('click', checkForClose);
    };
    function checkForClose(event: Event) {
        const targetElem = (event.target as any);
        if(!targetElem.closest('.calendar') && !targetElem.closest('.calendar-container__inputs')) {
            closeCalendar();
        };
    };

    const emit = defineEmits<{
        (event: 'update', firstDate: string, lastDate: string): void;
    }>();

    const updateParent = () => {
        emit('update', firstDateValue.value, lastDateValue.value);
    };

    watch([firstDateValue, lastDateValue], updateParent);

    onNuxtReady(()=>{
        if(window.innerWidth < 769) mobileVariant.value = true;
        const normalizeDate = (dateStr: string) => {
            const parts = dateStr.split('.');
            if (parts.length === 3) {
                return `${parts[2]}-${parts[1]}-${parts[0]}`;
            }
            return dateStr;
        };

        const setDatesBetween = (dayStart: Date, dayEnd: Date) =>{
            if(dayStart < dayEnd) {
                allDays.filter(item=>(item.fullDate > dayStart && item.fullDate < dayEnd)).map(day=>day.state='filled')
            } else {
                allDays.filter(item=>(item.fullDate > dayEnd && item.fullDate < dayStart)).map(day=>day.state='filled')
            };
        };

        if(props.rangeSelect) {
            if(!!firstDateValue.value && !!lastDateValue.value) {
                const parseFirstDate = new Date(normalizeDate(firstDateValue.value));
                const parseLastDate = new Date(normalizeDate(lastDateValue.value));
                firstInputValue.value = formatDate(firstDateValue.value, true);
                secondInputValue.value = formatDate(lastDateValue.value, true);
                setDatesBetween(parseFirstDate, parseLastDate);
                const firstChoosenDay = allDays.find(day=>day.fullDate.toLocaleDateString() === firstDateValue.value);
                const lastChoosenDay = allDays.find(day=>day.fullDate.toLocaleDateString() === lastDateValue.value);
                if(!!firstChoosenDay && !!lastChoosenDay) {
                    firstChoosenDay.subState = 'active-right';
                    lastChoosenDay.subState = 'active-left';
                    firstChoosenDay.state = 'active';
                    lastChoosenDay.state = 'active';
                }
            }
        } else {
            if(!!firstDateValue.value) {
                const choosenDay = allDays.find(day=>day.fullDate.toLocaleDateString() === props.firstDate);
                if(!choosenDay) return;
                selectDate(choosenDay);
                if(!!firstDateValue.value)firstInputValue.value = firstDateValue.value;
            }
        }
    });
</script>

<template>
    <div class="calendar-container">
        <div class="calendar-container__inputs">
            <ElementInput
                class="calendar-first"
                :id="`${id ?? 'calendar-second-id'}-1`"
                :fake-placeholder="firstPlaceholder"
                icon='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 11H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V11ZM17 3H21C21.5523 3 22 3.44772 22 4V9H2V4C2 3.44772 2.44772 3 3 3H7V1H9V3H15V1H17V3Z" fill="#2D3033" fill-opacity="0.32"/>
                </svg>'
                ref="inputElem"
                :name="firstName || 'start_date'"
                :on-focus="openCalendar"
                :delete-btn="clearBtnStateFirst"
                :on-clear="clearFirtsInput"
                :readonly="true"
                :new-value="firstInputValue"
                :data-attr="firstDateValue"
                :helper="firstHelper"
                :clearBtn="true"
                placeholder="__.__.____"
                :theme="theme"
            />
            <ElementInput v-if="rangeSelect"
                class="calendar-second"
                :id="`${id ?? 'calendar-second-id'}-2`"
                :fake-placeholder="lastPlaceholder"
                icon='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 11H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V11ZM17 3H21C21.5523 3 22 3.44772 22 4V9H2V4C2 3.44772 2.44772 3 3 3H7V1H9V3H15V1H17V3Z" fill="#2D3033" fill-opacity="0.32"/>
                </svg>'
                ref="inputElem"
                :name="lastName || 'end_date'"
                :on-focus="openCalendar"
                :delete-btn="clearBtnStateSecond"
                :on-clear="clearSecondInput"
                :readonly="true"
                :new-value="secondInputValue"
                :data-attr="lastDateValue"
                :helper="lastHelper"
                :clearBtn="true"
                placeholder="__.__.____"
                :theme="theme"
            />
        </div>
        <Transition name="calendar">
            <div class="calendar" v-if="showCalendar" ref="calendarRef">
                <div class="calendar__inset" v-if="mobileVariant"
                    @click="closeCalendar"
                ></div>
                <div class="calendar__left-list" v-if="!mobileVariant">
                    <button class="calendar__left-list__item" v-for="(month, index) in groupedDates"
                        ref="calendarButtons"
                        @click="scrollTo(index)"
                    >{{ month.month.slice(0, 3) }} <span v-if="shouldDisplayYear(index)">‘{{ month.year.slice(2, 4) }}</span>
                    </button>
                </div>
                <div class="calendar__main">
                    <div class="calendar__main__title-block" v-if="currentlyMobile">
                        <span v-if="!firstDateValue">{{ firstPlaceholder }}</span>
                        <span v-else>{{ lastPlaceholder }}</span>
                        <ElementButton
                            size="large"
                            color="neutral"
                            ghost
                            @click="()=>{
                                clearFirtsInput()
                                clearSecondInput()
                            }"
                        >Сбросить
                        </ElementButton>
                    </div>
                    <div class="calendar__main__heading">
                        <span>Пн</span>
                        <span>Вт</span>
                        <span>Ср</span>
                        <span>Чт</span>
                        <span>Пт</span>
                        <span>Сб</span>
                        <span>Вс</span>
                    </div>
                    <div class="calendar__main__list custom-scrollbar"
                        @scroll="onScroll"
                        ref="calendarList"
                    >
                        <div class="calendar__main__list__item" v-for="(month, index) in groupedDates"
                            ref="calendarItems"
                        >
                            <div class="calendar__main__list__item__title">
                                {{ month.month }}
                            </div>
                            <div class="calendar__main__list__item__table">
                                <ElementButton v-for="(day, index) in month.days"
                                    :key="index"
                                    size="large"
                                    color="neutral"
                                    :data-grid="day.day"
                                    :state="day.state"
                                    :data-substate="day.subState"
                                    ref="dateButtons"
                                    @click="selectDate(day)"
                                >{{ day.date }}
                                </ElementButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </Transition>
    </div>
</template>

<style lang="scss">
    .calendar-container {
        position: relative;
        &__inputs {
            @include df_ac;
            gap: .5rem;
            .field {
                flex: 1;
            }
        }
    }
    .calendar {
        z-index: 30;
        position: absolute;
        display: flex;
        height: 31rem;
        width: 35.125rem;
        border-radius: .5rem;
        background-color: $bg-primary;
        box-shadow: 0 0 1rem 0 #2D303314;
        @include mobile {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            align-items: flex-end;
            background-color: unset;
            border-radius: 0;
        }
        &__inset {
            position: absolute;
            inset: 0;
            background-color: $bg-inverse-transparent-16;
        }
        &__left-list {
            @include df_fdc;
            overflow-y: auto;
            padding: .5rem 0;
            border-right: 1px solid $border-primary-transparent-4;
            &::-webkit-scrollbar {
                width: 0;
            }
            &__item {
                @include text_2;
                color: $text-primary-transparent-48;
                display: flex;
                padding: .5rem 1rem;
                text-transform: capitalize;
                @include transition(color);
                &[data-state="active"] {
                    color: $text-primary
                }
            }
        }
        &__main {
            z-index: 1;
            @include df_fdc;
            width: 29.25rem;
            @include mobile {
                width: 100%;
                height: calc(100% - 8rem);
                background-color: $bg-primary;
                border-radius: 0.75rem 0.75rem 0 0;
            }
            &__title-block {
                @include df_ac;
                justify-content: space-between;
                padding: 1rem;
                span {
                    @include heading_2;
                }
            }
            &__heading {
                @include grid(7, 0);
                padding: 1rem 1.5rem;
                @include text_2;
                color: $text-primary-transparent-48;
                @include mobile {
                    padding: 1rem;
                    border-top: 1px solid $border-primary-transparent-4;
                    border-bottom: 1px solid $border-primary-transparent-4;
                }
                span {
                    @include df_ac_jcc;
                }
            }
            &__list {
                @include df_fdc;
                overflow-y: auto;
                @include mobile {
                    &::-webkit-scrollbar {
                        width: 0;
                    }
                }
                &__item {
                    @include df_fdc;
                    gap: 1rem;
                    padding: 1rem 1.5rem;
                    @include mobile {
                        padding: 1rem;
                    }
                    &__title {
                        @include heading_3;
                        text-transform: capitalize;
                    }
                    &__table {
                        @include grid(7, 0);
                        .button {
                            aspect-ratio: 1;
                            width: 100%;
                            &[data-grid="0"] {
                                grid-column: 7;
                                color: $text-subaccent;
                                &[data-state="active"] {
                                    color: $text-inverse;
                                }
                                &[data-state="disabled"] {
                                    color: $text-primary-transparent-16;
                                }
                            }
                            &[data-grid="1"] {
                                grid-column: 1;
                            }
                            &[data-grid="2"] {
                                grid-column: 2;
                            }
                            &[data-grid="3"] {
                                grid-column: 3;
                            }
                            &[data-grid="4"] {
                                grid-column: 4;
                            }
                            &[data-grid="5"] {
                                grid-column: 5;
                            }
                            &[data-grid="6"] {
                                grid-column: 6;
                                color: $text-subaccent;
                                &[data-state="active"] {
                                    color: $text-inverse;
                                }
                                &[data-state="disabled"] {
                                    color: $text-primary-transparent-16;
                                }
                            }
                            &[data-substate="active-right"] {
                                border-radius: .5rem 0 0 .5rem;
                            }
                            &[data-substate="active-left"] {
                                border-radius: 0 .5rem .5rem 0;
                            }
                        }
                    }
                }
            }
        }
    }

    .calendar-enter-active,
    .calendar-leave-active {
        @include transition(opacity, transform);
    }

    .calendar-enter-from,
    .calendar-leave-to {
        opacity: 0;
        transform: translateY(-2rem);
        @include mobile {
            transform: none;
        }
    }
</style>