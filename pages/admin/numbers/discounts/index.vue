<script lang="ts" setup>
    definePageMeta({
        isAdmin: true,
    });

    const { 
        sortElements, 
        selectSort, 
        dropSort 
    } = useSorters('discounts');

    const displayState = ref('rows');

    const popupCreateOpened = ref(false);
    const successCreateDialog = ref(false);

    const discounts = ref([
        {
            id: 1,
            title: 'Сильвер',
            size: '6',
            type: 'Лояльность',
            period: '3 июн - 31 дек',
            is_active: true,
            tariffs: [{},{},{}],
            rooms: [{},{},{},{},{}]
        },
        {
            id: 2,
            title: 'Голд',
            size: '10',
            type: 'Лояльность',
            period: '3 июн - 31 дек',
            is_active: true,
            tariffs: [{},{},{}],
            rooms: [{},{},{},{},{}]
        },
    ]);

    const {
        allChecked,
        checkAllFunc
    } = useTableCheckboxes(discounts);

    const updDiscounts=async()=>{
        // const getDiscounts = await getData('/hotel/discounts');
        // discounts.value = getDiscounts.results;
    };

    onMounted(()=>{
        updDiscounts();
    });
</script>

<template>
    <section>
        <div class="admin-discounts-section">
            <div class="admin-discounts-section__container container_admin">

                <div class="admin-discounts-section__header">
                    <div class="admin-section__title-block">
                        <div class="admin-section__title-block__title">
                            Скидки
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
                                @click="popupCreateOpened = true"
                            >Создать
                            </ElementButton>
                        </div>
                    </div>
                    <ElementInput
                        id="admin-discounts-search-input"
                        placeholder="Поиск по названию, периоду…"
                        icon='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168Z" fill="#2D3033" fill-opacity="0.32"/>
                            </svg>'
                    />
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
                    </div>
                </div>

                <div class="admin-discounts-section__body">
                    <div class="admin-discounts-section__body__table" v-if="displayState === 'rows'">
                        <table class="table">
                            <thead class="table__head">
                                <tr>
                                    <th class="table__checkbox">
                                        <ElementCheckbox
                                            :checked="allChecked"
                                            :on-update="(checked: boolean)=>checkAllFunc(checked)"
                                            id="table-head-checkbox"
                                        />
                                    </th>
                                    <th class="table__t2 table__t2_heading table__toggle">
                                        Вкл.
                                    </th>
                                    <th class="table__t2 table__t2_heading table__name">
                                        Название
                                    </th>
                                    <th class="table__t2 table__t2_heading table__same-width">
                                        Размер, %
                                    </th>
                                    <th class="table__t2 table__t2_heading table__name">
                                        Тип
                                    </th>
                                    <th class="table__t2 table__t2_heading table__period">
                                        Период действия
                                    </th>
                                    <th class="table__t2 table__t2_heading table__same-width">
                                        Тарифы
                                    </th>
                                    <th class="table__t2 table__t2_heading table__same-width">
                                        Номера
                                    </th>
                                    <th class="table__drag">
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

                            <tbody class="table__body" v-for="discount in discounts">
                                <tr>
                                    <td>
                                        <ElementCheckbox
                                            :id="`table-checkbox-${discount.id}`"
                                            :checked="discount.checked"
                                            :on-update="(checked: boolean)=>{discount.checked = checked}"
                                        />
                                    </td>
                                    <td>
                                        <ElementToggle
                                            :id="`table-toggle-${discount.id}`"
                                            :checked="discount.is_active"
                                            :on-change="async(checked: boolean)=>{
                                                discount.is_active = checked;
                                                // await sendData(discount, `/hotel/discount/${discount.id}`, 'PATCH');
                                            }"
                                        />
                                    </td>
                                    <td>
                                        <ElementLink 
                                            color="neutral"
                                        >{{ discount.title }}
                                        </ElementLink>
                                    </td>
                                    <td class="table__t1 table__t1_tp">
                                        {{ discount.size }}
                                    </td>
                                    <td class="table__t1 table__t1_tp">
                                        {{ discount.type }}
                                    </td>
                                    <td class="table__t1 table__t1_tp">
                                        {{ discount.period }}
                                    </td>
                                    <td class="table__t1 table__t1_tp">
                                        {{ discount?.tariffs.length }}
                                    </td>
                                    <td class="table__t1 table__t1_tp">
                                        {{ discount?.rooms.length }}
                                    </td>
                                    <td>
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
                                                <NuxtLink>
                                                    Редактировать
                                                </NuxtLink>
                                            </ElementOption>
                                            <ElementOption
                                                :on-click="()=>{
                                                    // popupDeleteOpened = true;
                                                    // categoryToEdit = category;
                                                }"
                                            >Удалить
                                            </ElementOption>
                                        </Dropdown>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="admin-discounts-section__body__create-input" v-if="displayState === 'rows'">
                        <div class="admin-discounts-section__body__create-input__inputs">
                            <ElementInput class="name-input"
                                id="admin-discounts-name"
                                name="name"
                                placeholder="Название скидки"
                            /><hr>
                            <ElementInput class="same-width-input"
                                id="admin-discounts-size"
                                name="size"
                                placeholder="Размер"
                            /><hr>
                            <ElementInput class="type-input"
                                id="admin-discounts-type"
                                name="type"
                                placeholder="Тип"
                            /><hr>
                            <DatePicker range-select
                                first-placeholder="От"
                                last-placeholder="До"
                            /><hr>
                            <SelectDefault class="same-width-input"
                                type="checkbox"
                                placeholder="Тарифы"
                            /><hr>
                            <SelectDefault class="same-width-input"
                                type="checkbox"
                                placeholder="Номера"
                            />
                        </div>
                        <div class="admin-discounts-section__body__create-input__helper">
                            Введите ячейки и нажмите ↵ Enter
                        </div>
                    </div>
                    <div class="admin-discounts-section__body__cards" v-else-if="displayState === 'cards'">
                        <TableCardDiscount v-for="discount in discounts"
                            :res="discount"
                            v-model:checked="discount.is_active"
                            :on-change="async(checked: boolean)=>{
                                discount.is_active = checked;
                                // await sendData(discount, `/hotel/discounts/${discount.id}`, 'PATCH');
                            }"
                        />
                    </div>
                </div>
                
            </div>
        </div>
    </section>

    <Dialog 
        :key="'success-create'"
        color='positive' 
        drawLine
        title="Создание завершено"
        description="Сильвер"
        v-model:visible="successCreateDialog"
    />
    <PopupCreateDiscount
        v-model:visible="popupCreateOpened"
        position="end"
    />
</template>

<style lang="scss">
    .admin-discounts-section {
        &__header {
            grid-column: span 12;
            @include df_fdc;
            gap: 1.5rem;
            .field {
                width: 38.5rem;
            }
        }
        &__body {
            grid-column: span 12;
            &__table {
                .table {
                    width: 100%;
                    &__name {
                        width: 20rem;
                    }
                    &__period {
                        width: 14.125rem;
                    }
                    &__same-width {
                        width: 10%;
                    }
                }
            }
            &__create-input {
                @include df_fdc;
                gap: .5rem;
                padding-left: 8.35rem;
                padding-top: 1.5rem;
                padding-right: 4rem;
                &__inputs {
                    @include df_ac;
                    .input-label {
                        border-radius: 0 !important;
                    }
                    hr {
                        width: 1px;
                        height: 3.75rem;
                        border: 0;
                        border-left: 1px solid $border-primary-subdued-8;
                    }
                    .calendar-container__inputs {
                        gap: 0;
                        .calendar-first {
                            border-right: 1px solid $border-primary-subdued-8;
                        }
                    }
                    .name-input {
                        min-width: 20rem;
                        .input-label {
                            border-radius: .5rem 0 0 .5rem !important;
                        }
                    }
                    .type-input {
                        min-width: 20rem;
                    }
                    .same-width-input {
                        width: 30%;
                        &:last-of-type {
                            .input-label {
                                border-radius: 0 .5rem .5rem 0 !important;
                            }
                        }
                    }
                }
                &__helper {
                    @include text_2;
                    color: $text-primary-transparent-48;
                    padding-left: 1rem;
                }
            }
            &__cards {
                @include grid(4, 1rem);
            }
        }
    }
</style>