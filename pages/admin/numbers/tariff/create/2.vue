<script lang="ts" setup>

    const {
        currentDate,
        yearsToSelect,
        monthDays,
        monthsArray,
        dontShowPrevMonths
    } = useYearsCalendar();

    definePageMeta({
        isAdmin: true,
        breadcrumbs: [
            {
                name: 'Номера'
            },
            {
                name: 'Тарифы',
                slug: '/admin/numbers/tariff/',
            },
            {
                name: 'Создать',
                slug: '/admin/numbers/tariff/create/1/',
                state: 'active'
            }
        ],
        breadcrumbsSteps: [
            {
                name: '1.Общие настройки',
                slug: '/admin/numbers/tariff/create/1/',
            },
            {
                name: '2.Цены и ограничения',
                slug: '/admin/numbers/tariff/create/2/',
                state: 'active'
            },
            {
                name: '3.Услуги',
                slug: '/admin/numbers/tariff/create/3/',
            },
        ],
        headerType: 'breadcrumbs-steps'
    });

    const rooms = ref([]);

    const tableFilters = ref([
        {
            name: 'Цены',
            filter: 'prices',
            state: 'active'
        },
        {
            name: 'Закрыть/Открыть',
            filter: 'close/open',
            state: ''
        },
        {
            name: 'MinLos',
            filter: 'minLos',
            state: ''
        },
        {
            name: 'MinAdv',
            filter: 'minAdv',
            state: ''
        },
        {
            name: 'MaxAdv',
            filter: 'maxAdv',
            state: ''
        },
    ]);

    const setFilterActive=(activeIndex: number)=>{
        tableFilters.value.map((item, index)=> {
            item.state = index === activeIndex ? 'active' : '';
        });
    };

    const router = useRouter();

    const saveContinue=async()=>{
        
        await router.push('/admin/numbers/tariff/create/3/');
    };
    const save=async()=>{
        
        await router.push('/admin/numbers/tariff//');
    };

    onMounted(async()=>{
        const getRooms = await getData('/hotel/room')
        rooms.value = getRooms.results;
    })

</script>

<template>
    <section>
        <div class="create-tariff-second-section">
            <div class="create-tariff-second-section__container container_admin">
                <div class="create-tariff-second-section__header">
                    <SelectDefault
                        id="create-tariff-select"
                        fake-placeholder="Номера"
                        type="checkbox"
                        :options="rooms"
                    />
                </div>
                <div class="create-tariff-second-section__body">
                    <div class="create-tariff-second-section__body__chipses">
                        <ElementChip
                            dot-color="#E66F6F"
                        >Доступность заблокирована
                        </ElementChip>
                        <ElementChip
                            dot-color="#E66F6F52"
                        >Закрыто
                        </ElementChip>
                        <ElementChip
                            dot-color="#1C5BAD"
                        >Переопределение
                        </ElementChip>
                    </div>
                    <div class="create-tariff-second-section__body__table">
                        <div class="create-tariff-second-section__body__table__head">
                            <div class="create-tariff-second-section__body__table__head__btns">
                                <ElementButton v-for="(item, index) in tableFilters"
                                    color="outlined"
                                    :state="item.state"
                                    @click="setFilterActive(index)"
                                >{{ item.name }}
                                </ElementButton>
                            </div>
                            <div class="create-tariff-second-section__body__table__head__helpers">
                                <ElementCheckbox v-if="currentDate.getFullYear().toString() === yearsToSelect.find(item=>item.state === 'active')?.year"
                                    size="small"
                                    id="tariff-dont-show-passed"
                                    :on-update="(checked: boolean)=>(dontShowPrevMonths = checked)"
                                    :checked="dontShowPrevMonths"
                                >Скрывать прошедшие месяцы
                                </ElementCheckbox>
                                <Dropdown on-click
                                    menu-side="left">
                                    <template #header>
                                        <ElementIconButton
                                            size="small"
                                            color="transparent-secondary"
                                            ghost
                                        ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#2D3033" fill-opacity="0.16"/>
                                        </svg>
                                        </ElementIconButton>
                                    </template>
                                    <ElementOption
                                    >Мультиредактировать
                                    </ElementOption>
                                    <ElementOption
                                    >Редактировать поочередно
                                    </ElementOption>
                                    <ElementOption
                                    >Очистить ячейки
                                    </ElementOption>
                                </Dropdown>
                            </div>
                        </div>
                        <div class="create-tariff-second-section__body__table__main">
                            <table class="table">
                                <thead class="table__head">
                                    <tr>
                                        <th class="table__year">
                                            <Dropdown>
                                                <template #header>
                                                    <ElementLink
                                                        size="small"
                                                        chevron="right"
                                                    >{{ yearsToSelect.find(year=>year.state === 'active')?.year }}
                                                    </ElementLink>
                                                </template>
                                                <ElementOption v-for="option in yearsToSelect"
                                                    @click="()=>{
                                                        yearsToSelect.map(item=>item.state = '');
                                                        option.state = 'active';
                                                    }"
                                                >{{ option.year }}
                                                </ElementOption>
                                            </Dropdown> 
                                        </th>
                                        <th class="table__t2 table__t2_heading table__week-day" v-for="day in monthDays" :data-day="day">
                                            {{ day }}
                                        </th>
                                    </tr>
                                </thead>

                                <tbody class="table__body" v-if="tableFilters.find(item=>item.state === 'active')?.filter === 'prices'">
                                    <tr v-for="month in monthsArray">
                                        <td class="table__month">
                                            <strong>{{ month.month }}</strong>
                                            <span>1 осн.</span>
                                            <span>2 осн.</span>
                                            <span>реб. (0-7)</span>
                                            <span>реб. (7-14)</span>
                                        </td>
                                        <td v-for="space in Array((month.days[0].day) - 1 < 0 ? 6: (month.days[0].day) - 1)" class="table__space"></td>
                                        <td v-for="(day, index) in month.days" :data-pos="day.day" class="table__day">
                                            <div class="table__day__date" data-closed="true" data-disabled="true">
                                                <span>{{ day.date }}</span>
                                            </div>
                                            <span>3 900</span>
                                            <span>3 900</span>
                                            <span>1 500</span>
                                            <span>0</span>
                                        </td>
                                    </tr>
                                </tbody>

                                <tbody class="table__body" v-else-if="tableFilters.find(item=>item.state === 'active')?.filter === 'close/open'">
                                    <tr v-for="(month, monthIdx) in monthsArray">
                                        <td class="table__month">
                                            <strong>{{ month.month }}</strong>
                                        </td>
                                        <td v-for="space in Array((month.days[0].day) - 1 < 0 ? 6: (month.days[0].day) - 1)" class="table__space"></td>
                                        <td v-for="(day, index) in month.days" :data-pos="day.day" class="table__day">
                                            <div class="table__day__date" data-closed="true" data-disabled="true">
                                                <span>{{ day.date }}</span>
                                            </div>
                                            <label :for="`table-day-checked-${day.date}-${monthIdx}`" class="table__day__button">
                                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="day.state === 'checked'">
                                                    <path d="M11.6663 17.6995L22.3908 6.9751L24.0407 8.62501L11.6663 20.9993L4.2417 13.5748L5.89162 11.9249L11.6663 17.6995Z" fill="#2D3033" fill-opacity="0.32"/>
                                                </svg>
                                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" v-else>
                                                    <path d="M13.9998 12.3509L19.7746 6.57617L21.4245 8.22608L15.6497 14.0008L21.4245 19.7755L19.7746 21.4254L13.9998 15.6507L8.22512 21.4254L6.5752 19.7755L12.3499 14.0008L6.5752 8.22608L8.22512 6.57617L13.9998 12.3509Z" fill="#E66F6F"/>
                                                </svg>
                                                <input type="checkbox" :id="`table-day-checked-${day.date}-${monthIdx}`"
                                                    :checked="day.state === 'checked'"
                                                    @click="(evt)=>{
                                                        const input = evt.target as HTMLInputElement;
                                                        day.state = input.checked ? 'checked': '';
                                                    }"
                                                >
                                            </label>
                                        </td>
                                    </tr>
                                </tbody>

                                <tbody class="table__body" v-else-if="tableFilters.find(item=>item.state === 'active')?.filter === 'minLos'">
                                    <tr v-for="(month, monthIdx) in monthsArray">
                                        <td class="table__month">
                                            <strong>{{ month.month }}</strong>
                                        </td>
                                        <td v-for="space in Array((month.days[0].day) - 1 < 0 ? 6: (month.days[0].day) - 1)"></td>
                                        <td v-for="(day, index) in month.days" :data-pos="day.day" class="table__day">
                                            <div class="table__day__date" data-closed="true" data-disabled="true">
                                                <span>{{ day.date }}</span>
                                            </div>
                                            <span class="table__day__number">1</span>
                                        </td>
                                    </tr>
                                </tbody>

                                <tbody class="table__body" v-else-if="tableFilters.find(item=>item.state === 'active')?.filter === 'minAdv'">
                                    <tr v-for="(month, monthIdx) in monthsArray">
                                        <td class="table__month">
                                            <strong>{{ month.month }}</strong>
                                        </td>
                                        <td v-for="space in Array((month.days[0].day) - 1 < 0 ? 6: (month.days[0].day) - 1)"></td>
                                        <td v-for="(day, index) in month.days" :data-pos="day.day" class="table__day">
                                            <div class="table__day__date" data-closed="true" data-disabled="true">
                                                <span>{{ day.date }}</span>
                                            </div>
                                            <span class="table__day__number">1</span>
                                        </td>
                                    </tr>
                                </tbody>

                                <tbody class="table__body" v-else-if="tableFilters.find(item=>item.state === 'active')?.filter === 'maxAdv'">
                                    <tr v-for="(month, monthIdx) in monthsArray">
                                        <td class="table__month">
                                            <strong>{{ month.month }}</strong>
                                        </td>
                                        <td v-for="space in Array((month.days[0].day) - 1 < 0 ? 6: (month.days[0].day) - 1)"></td>
                                        <td v-for="(day, index) in month.days" :data-pos="day.day" class="table__day">
                                            <div class="table__day__date" data-closed="true" data-disabled="true">
                                                <span>{{ day.date }}</span>
                                            </div>
                                            <span class="table__day__number">1</span>
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
                <div class="create-tariff-second-section__btns">
                    <ElementButton
                        size="large"
                        @click="saveContinue()"
                    >Продолжить
                    </ElementButton>
                    <ElementButton
                        size="large"
                        color="transparent"
                        @click="save()"
                    >Сохранить
                    </ElementButton>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    .create-tariff-second-section {
        &__header {
            grid-column: span 12;
            .select {
                width: 38.5rem;
            }
        }
        &__body {
            grid-column: span 12;
            @include df_fdc;
            gap: 1.5rem;
            height: calc(100dvh - 21.5rem);
            &__chipses {
                @include df_ac;
                gap: 1.5rem;
            }
            &__table {
                @include df_fdc;
                &__head {
                    @include df_ac;
                    justify-content: space-between;
                    padding: .5rem;
                    width: 100%;
                    border: 1px solid $border-primary-transparent-8;
                    border-radius: .5rem .5rem 0 0 ;
                    &__btns {
                        @include df_ac;
                        gap: .75rem;
                    }
                    &__helpers {
                        @include df_ac;
                        gap: 2rem;
                    }
                }
                &__main {
                    @include wh_100;
                    overflow: auto;
                    height: calc(100dvh - 28.25rem);
                    .table {
                        th, td {
                            padding: .5rem;
                            &[data-pos="5"],
                            &[data-pos="6"],
                            &[data-pos="0"] {
                                background-color: $bg-accent-transparent-8;
                            }
                        }
                        &__year {
                            min-width: 7.5rem;
                        }
                        &__week-day {
                            min-width: 4.75rem;
                            &[data-day="Пт"],
                            &[data-day="Сб"],
                            &[data-day="Вс"] {
                                background-color: $bg-accent-transparent-8;
                            }
                        }
                        &__month {
                            &:has(span) {
                                strong {
                                    padding-bottom: .5rem;
                                }
                            }
                            strong {
                                display: block;
                                @include strong_2;
                                width: 100%;
                                color: $text-primary;
                            }
                            span {
                                display: block;
                                @include text_2;
                                width: 100%;
                                color: $text-primary-transparent-48;
                            }
                        }
                        &__space {
                            background-color: $bg-inverse-transparent-4;
                        }
                        &__day {
                            padding: 0 !important;
                            @include text_2;
                            span {
                                display: block;
                                width: 100%;
                                padding: 0 .5rem;
                            }
                            &__date {
                                padding: .5rem 0;
                                &[data-closed="true"] {
                                    background-color: $bg-system-negative-transparent-32;
                                }
                                &[data-disabled="true"] {
                                    color: $text-inverse;
                                    span {
                                        background-color: $bg-system-negative;
                                    }
                                }
                            }
                            &__button {
                                @include df_ac_jcc;
                                height: 4rem;
                                width: 100%;
                                padding: .5rem;
                                padding-top: .25rem;
                                cursor: pointer;
                                svg {
                                    width: 1.75rem;
                                    height: 1.75rem;
                                }
                                input {
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    opacity: 0;
                                    scale: 0;
                                }
                            }
                            &__number {
                                display: flex !important;
                                align-items: center;
                                justify-content: center;
                                height: 3.75rem;
                                width: 100%;
                                padding: .5rem;
                                padding-top: .25rem;
                            }
                        }
                    }
                }
            }
        }
        &__btns {
            grid-column: span 12;
            display: flex;
            gap: .75rem;
        }
    }
</style>