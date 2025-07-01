<script lang="ts" setup>
    import { bookedInfo } from '~/composables/booked/bookedInfo';

    const { 
        sortElements,
        selectSort,
        dropSort
    } = useSorters('booked');

    const { 
        currentPage, 
        fullInfo, 
        setNewFilter, 
        getBookedInfo, 
        itemsPerPage, 
        allItemsCount 
    } = bookedInfo();

    definePageMeta({
        isAdmin: true,
    });

    const displayState = ref('rows');

    const getSearchVal=(event: Event)=>{
        const input = event.target as HTMLInputElement;
        setNewFilter('q', input.value);
    };

    const getDates=(start_date: string, end_date: string)=>{
        const start_formatted = formatDate(start_date, false, true);
        const end_formatted = formatDate(end_date, false, true);
        if(!start_date || !end_date) {
            setNewFilter('start_date', '');
            setNewFilter('end_date', '');
        } else {
            setNewFilter('start_date', start_formatted);
            setNewFilter('end_date', end_formatted);
        };
    };

    const debouncedSearchVal = debounce(getSearchVal, 500);

    onMounted(()=>{
        // getBookedInfo();
    });

    watch(
        ()=>currentPage.value,
        (updVal)=>{
            // getBookedInfo();
        }
    );

</script>

<template>
    <section>
        <div class="admin-booked-section">
            <div class="admin-booked-section__container container">
                <div class="admin-booked-section__header">
                    <div class="admin-section__title-block">
                        <div class="admin-section__title-block__title">
                            Брони
                        </div>
                        <div class="admin-section__title-block__btns-block">
                            <div class="admin-section__title-block__btns-block__btns">
                                <ElementIconButton
                                    color="transparent"
                                    :state="displayState === 'rows' ? 'active' : ''"
                                    @click="displayState = 'rows'"
                                    ghost
                                ><svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24.5 23.8333C24.5 24.4777 23.9777 25 23.3333 25L4.66667 25C4.02232 25 3.5 24.4777 3.5 23.8333L3.5 20.7184C3.5 20.0741 4.02232 19.5518 4.66667 19.5518H23.3333C23.9777 19.5518 24.5 20.0741 24.5 20.7184V23.8333Z" fill="#2D3033" fill-opacity="0.48"/>
                                    <path d="M24.5 8.27342C24.5 8.91777 23.9777 9.44009 23.3333 9.44009L4.66667 9.44008C4.02232 9.44008 3.5 8.91777 3.5 8.27342L3.5 5.16667C3.5 4.52232 4.02232 4 4.66667 4L23.3333 4C23.9777 4 24.5 4.52232 24.5 5.16667V8.27342Z" fill="#2D3033" fill-opacity="0.48"/>
                                    <path d="M24.5 16.0567C24.5 16.701 23.9777 17.2234 23.3333 17.2234L4.66667 17.2234C4.02232 17.2234 3.5 16.701 3.5 16.0567L3.5 12.9418C3.5 12.2975 4.02232 11.7751 4.66667 11.7751L23.3333 11.7751C23.9777 11.7751 24.5 12.2975 24.5 12.9418L24.5 16.0567Z" fill="#2D3033" fill-opacity="0.48"/>
                                </svg>
                                </ElementIconButton>
                                <ElementIconButton
                                    color="transparent"
                                    :state="displayState === 'cards' ? 'active' : ''"
                                    @click="displayState = 'cards'"
                                    ghost
                                ><svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M25.6666 15.6655V23.8333C25.6666 24.4777 25.1443 25 24.4999 25H15.1666V15.6655H25.6666ZM12.8333 15.6655V25H3.49992C2.85559 25 2.33325 24.4777 2.33325 23.8333V15.6655H12.8333ZM12.8333 4V13.3322H2.33325V5.16667C2.33325 4.52234 2.85559 4 3.49992 4H12.8333ZM24.4999 4C25.1443 4 25.6666 4.52234 25.6666 5.16667V13.3322H15.1666V4H24.4999Z" fill="#2D3033" fill-opacity="0.48"/>
                                </svg>
                                </ElementIconButton>
                            </div>
                            <ElementButton
                                color="accent"
                                link="/admin/numbers/booked/create/"
                            >Создать
                            </ElementButton>
                        </div>
                    </div>
                    <div class="admin-booked-section__header__inputs-block">
                        <ElementInput 
                            class="admin-booked-searcher"
                            id="admin-booked-searcher"
                            placeholder="Поиск по id, ФИО, номеру телефона, ИНН…"
                            :on-input="debouncedSearchVal"
                        ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168Z" fill="#2D3033" fill-opacity="0.32"/>
                        </svg>
                        </ElementInput>
                        <DatePicker range-select
                            @update="(start_date, end_date)=>{getDates(start_date, end_date)}"
                        />
                    </div>
                    <div class="admin-section__filters-block">
                        <div class="admin-section__filters-block__sort">
                            <div class="admin-section__filters-block__sort__elem" v-for="elem in sortElements">
                                <span class="title">{{ elem.title }}</span>
                                <Dropdown menu-side="left">
                                    <template #header>
                                        <ElementLink
                                            color="neutral"
                                            chevron="right"
                                        >{{ elem.variants.find(variant=>variant.state === 'active')?.text }}
                                        </ElementLink>
                                    </template>
                                    <div class="dropdown__option" v-for="(variant, index) in elem.variants">
                                        <ElementOption
                                            type="ghost"
                                            :on-click="()=>selectSort(variant, elem.variants)"
                                            :state="variant.state"
                                        >{{ variant.text }}
                                        </ElementOption><hr>
                                    </div>
                                </Dropdown>
                            </div>
                            <div class="admin-section__filters-block__sort__elem">
                                <ElementLink
                                    color="transparent"
                                    @click="dropSort"
                                >Сбросить
                                </ElementLink>
                            </div>
                        </div>
                        <ElementLink
                            color="subaccent"
                        >XLSX Экспорт
                        </ElementLink>
                    </div>
                </div>
                <div class="admin-booked-section__body">
                    <div class="table__add-new-row" v-if="displayState === 'rows'">
                        <ElementIconButton
                            size="small"
                            color="transparent"
                        ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" fill="#1C5BAD"/>
                        </svg>
                        </ElementIconButton>
                    </div>
                    <div class="admin-booked-section__body__table" v-if="displayState === 'rows'">
                        <table class="table">
                            <thead class="table__head">
                                <tr>
                                    <th class="table__checkbox">
                                        <ElementCheckbox></ElementCheckbox>
                                    </th>
                                    <th class="table__t2 table__t2_heading">id</th>
                                    <th class="table__t2 table__t2_heading">Гость</th>
                                    <th class="table__price table__t2 table__t2_heading">Стоимость, ₽</th>
                                    <th class="table__period table__t2 table__t2_heading">Период</th>
                                    <th class="table__room table__t2 table__t2_heading">Номер</th>
                                    <th class="table__services table__t2 table__t2_heading">Доп.услуги</th>
                                    <th class="table__t2 table__t2_heading">Номер телефона</th>
                                    <th class="table__t2 table__t2_heading">E-mail</th>
                                    <th class="table__t2 table__t2_heading">
                                        <ElementIconButton
                                            size="small"
                                            color="transparent-secondary"
                                            disabled
                                            ghost
                                        ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#2D3033" fill-opacity="0.32"/>
                                        </svg>
                                        </ElementIconButton>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="table__body">
                                <tr v-for="info in fullInfo" class="table__row">
                                    <td class="table__checkbox">
                                        <ElementCheckbox></ElementCheckbox>
                                    </td>
                                    <td class="table__id">
                                        <span>{{ info.id }}</span><br>
                                        <span v-if="info.state === 'new'" :data-state="info.state">Новая</span>
                                        <span v-else-if="info.state === 'decline'" :data-state="info.state">Отказано</span>
                                        <span v-else-if="info.state === 'confirm'" :data-state="info.state">Подтверждена</span>
                                    </td>
                                    <td class="table__guest">{{ info.guest }}</td>
                                    <td class="table__price">{{ info.price }}</td>
                                    <td class="table__period table_transparent">{{ info.period }}</td>
                                    <td class="table__room table__t2 table_transparent">{{ info.room.title }}</td>
                                    <td class="table__services table__t2 table_transparent">
                                        <span v-for="service in info.services" v-if="info.services.length > 0">
                                            {{ service.title }}
                                            <br>
                                        </span>
                                        <span v-else>-</span>
                                    </td>
                                    <td class="table__phone" nowrap>
                                        <CopyToClipboard
                                            :text="info.phone"
                                        />
                                    </td>
                                    <td class="table__mail" nowrap>
                                        <CopyToClipboard
                                            :text="info.email"
                                        />
                                    </td>
                                    <td class="table__dropdown">
                                        <Dropdown menu-side="left">
                                            <template #header>
                                                <ElementIconButton
                                                    size="small"
                                                    color="transparent-secondary"
                                                    ghost
                                                ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#2D3033" fill-opacity="0.32"/>
                                                </svg>
                                                </ElementIconButton>
                                            </template>
                                            <ElementOption>
                                                Отменить
                                            </ElementOption>
                                            <ElementOption>
                                                Создать дубликат
                                            </ElementOption>
                                            <ElementOption>
                                                Редактировать
                                            </ElementOption>
                                            <ElementOption>
                                                Удалить
                                            </ElementOption>
                                        </Dropdown>
                                    </td>
                                    <div class="table__row__confirmation">

                                    </div>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="admin-booked-section__body__cards" v-else-if="displayState === 'cards'">
                        <TableCardBooking v-for="info in fullInfo" :res="info"/>
                    </div>
                </div>
                <div class="admin-booked-section__sub-info">
                    <div class="admin-booked-section__sub-info__text">
                        Всего броней 41 в период 12-14 октября на сумму 973 200 ₽
                    </div>
                    <Paginator 
                        v-model:new-value="currentPage"
                        :last-page="Math.ceil(allItemsCount / itemsPerPage)"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    .admin-section__main {
        &:has(.admin-booked-section) {
            height: 100dvh;
        }
    }
    .admin-booked-section {
        height: calc(100dvh - 5rem);
        &__container {
            padding: 1.5rem 0;
            height: 100%;
        }
        &__header {
            @include df_fdc;
            gap: 1.5rem;
            grid-column: span 12;
            &__inputs-block {
                @include df_ac;
                gap: 1.5rem;
                .admin-booked-searcher {
                    width: 38.5rem;
                }
                .calendar-container {
                    .field {
                        width: 15.25rem;
                    }
                }
            }
        }
        &__body {
            grid-column: span 12;
            height: calc(100dvh - 27.5rem);
            position: relative;
            &__table {
                overflow: auto;
                height: 100%;
            }
            .table {
                &_transparent {
                    color: $text-primary-transparent-48;
                }
                &__row {
                    position: relative;
                    &__confirmation {
                        position: absolute;
                    }
                }
                &__id {
                    min-width: 17.625rem;
                    width: fit-content;
                    text-wrap: nowrap;
                    [data-state="new"] {
                        color: $text-system-positive;
                    }
                    [data-state="decline"] {
                        color: $text-system-negative;
                    }
                    [data-state="confirm"] {
                        color: $text-primary-transparent-48;
                    }
                }
                &__guest {
                    min-width: 15rem;
                }
                &__price,
                &__period {
                    min-width: 10rem;
                }
                &__room {
                    min-width: 8.75rem;
                }
                &__services {
                    min-width: 10.75rem;
                }
                &__phone {
                    min-width: 13.4375rem;
                    width: fit-content;
                    white-space: nowrap;
                    span {
                        display: flex;
                        align-items: center;
                        gap: .5rem;
                    }
                }
                &__mail {
                    min-width: 18.4375rem;
                    width: fit-content;
                    white-space: nowrap;
                    span {
                        display: flex;
                        align-items: center;
                        gap: .5rem;
                    }
                }
                &__dropdown {
                    padding: 0;
                    .dropdown {
                        padding: 1rem;
                        height: 100%;
                        &__menu {
                            top: 3rem;
                        }
                    }
                    .icon-button {
                        height: 100%;
                    }   
                }
                tbody {
                    @include text_1;
                }
                &__add-new-row {
                    z-index: 2;
                    position: absolute;
                    top: 1px;
                    right: 1px;
                    @include df_ac_jcc;
                    padding: .75rem 1rem;
                    border-width: 0 0 1px 1px;
                    border-style: solid;
                    border-color: $border-primary-subdued-4;
                    background-color: $bg-primary;
                }
            }
            &__cards {
                @include grid(4, 1rem);
                overflow: auto;
                height: 100%;
            }
        }
        &__sub-info {
            grid-column: span 12;
            @include df_ac;
            justify-content: space-between;
            padding-top: 1rem;
            &__text {
                @include text_2;
                color: $text-primary-transparent-48;
            }
        }
    }
</style>