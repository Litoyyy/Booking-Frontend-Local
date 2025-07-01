<script lang="ts" setup>
    const {
        currentDate,
        yearsToSelect,
        monthDays,
        monthsArray,
        dontShowPrevMonths
    } = useYearsCalendar();

    const route = useRoute();

    definePageMeta({
        isAdmin: true,
        breadcrumbs: [
            {
                name: 'Гостиница'
            },
            {
                name: 'Группы услуг',
                slug: '/admin/hotel/services/',
            },
            {
                name: 'Питание',
                slug: ''
            },
            {
                name: 'Создание',
                slug: '',
                state: 'active'
            },
        ],
        breadcrumbsSteps: [
            {
                name: '1.Общие настройки',
                slug: '/admin/hotel/services/create/1/',
            },
            {
                name: '2.Цены и ограничения',
                slug: '/admin/hotel/services/create/2/',
                state: 'active'
            },
        ],
        headerType: 'breadcrumbs-steps'
    });

    const serviceId = Number(route.query.service_id);

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
        }
    ]);

    const setFilterActive=(activeIndex: number)=>{
        tableFilters.value.map((item, index)=> {
            item.state = index === activeIndex ? 'active' : '';
        });
    };

</script>

<template>
    <section>
        <div class="create-service-second-step-section">
            <div class="create-service-second-step-section__container container_admin">
                <div class="create-service-second-step-section__body">
                    <div class="create-service-second-step-section__body__chipses">
                        <ElementChip
                            dot-color="#E66F6F"
                        >Закрыто
                        </ElementChip>
                    </div>
                    <div class="create-service-second-step-section__body__table">
                        <div class="create-service-second-step-section__body__table__head">
                            <div class="create-service-second-step-section__body__table__head__btns">
                                <ElementButton v-for="(item, index) in tableFilters"
                                    color="outlined"
                                    :state="item.state"
                                    @click="setFilterActive(index)"
                                >{{ item.name }}
                                </ElementButton>
                            </div>
                            <div class="create-service-second-step-section__body__table__head__helpers">
                                <ElementCheckbox v-if="currentDate.getFullYear().toString() === yearsToSelect.find(item=>item.state === 'active')?.year"
                                    size="small"
                                    id="services-dont-show-passed"
                                    :on-update="(checked: boolean)=>(dontShowPrevMonths = checked)"
                                    :checked="dontShowPrevMonths"
                                >Скрывать прошедшие месяцы
                                </ElementCheckbox>
                                <ElementCheckbox
                                    size="small"
                                    id="services-take-as-model"
                                >Принять за образец
                                <ElementPopover 
                                    position="right"
                                >Последующие созданные таблицы с данными значениями будут использоваться как стандарт
                                </ElementPopover>
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
                        <div class="create-service-second-step-section__body__table__main">
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
                                <tbody class="table__body">
                                    <tr v-for="month in monthsArray">
                                        <td class="table__month">
                                            <strong>{{ month.month }}</strong>
                                        </td>
                                        <td v-for="space in Array((month.days[0].day) - 1 < 0 ? 6: (month.days[0].day) - 1)" class="table__space"></td>
                                        <td v-for="(day, index) in month.days" :data-pos="day.day" class="table__day">
                                            <div class="table__day__date" data-closed="true" data-disabled="true">
                                                <strong>{{ day.date }}</strong>
                                            </div>
                                            <span>3 900</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            
                        </div>
                    </div>
                    <div class="create-service-second-step-section__body__btn">
                        <ElementButton
                            size="large"
                            name="button"
                        >Сохранить
                        </ElementButton>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    .create-service-second-step-section {
         &__body {
            grid-column: span 12;
            @include df_fdc;
            gap: 1.5rem;
            // height: calc(100dvh - 21.5rem);
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
                        .custom-checkbox-label {
                            .popover {
                                &__text-block {
                                    min-width: 22.5rem;
                                }
                            }
                        }
                    }
                }
                &__main {
                    @include wh_100;
                    overflow: auto;
                    height: calc(100dvh - 22.25rem);
                    .table {
                        th, td {
                            padding: .5rem;
                        }
                        &__year {
                            min-width: 7.5rem;
                        }
                        &__week-day {
                            min-width: 4.75rem;
                        }
                        &__month {
                            strong {
                                display: block;
                                @include strong_2;
                                width: 100%;
                                color: $text-primary-transparent-48;
                            }
                        }
                        &__space {
                            background-color: $bg-inverse-transparent-4;
                        }
                        &__day {
                            strong {
                                display: block;
                                @include strong_2;
                                width: 100%;
                                color: $text-primary-transparent-48;
                            }
                            span {
                                display: block;
                                @include text_2;
                                padding-top: .25rem;
                                width: 100%;
                                color: $text-primary;
                            }
                        }
                    }
                }
            }
            &__btn {
                padding-top: 1.5rem;
            }
        }
    }
</style>