<script lang="ts" setup>

    import { z } from 'zod';

    const {
        sortElements, 
        selectSort,
        dropSort
    } = useSorters('tariff')

    definePageMeta({
        isAdmin: true,
    });

    const displayState = ref('rows');

    const tariffs = ref([]);

    const {
        allChecked,
        checkAllFunc
    } = useTableCheckboxes(tariffs);

    const updTariffs=async()=>{
        const getTariffs = await getData('/hotel/tariffs');
        tariffs.value = getTariffs.results;
    };

    onMounted(async()=>{
        updTariffs()
    });

    const createFormRef =  ref<HTMLFormElement | null>(null);
    
    const createTariffSchema = z.object({
        name: z.string().min(1),
        
    });

    const handleValidate=()=>{
        if(!createFormRef.value) return;
        validate(createFormRef.value, createTariffSchema,
            async(body: Object)=>{
                const startDateElem = createFormRef.value?.elements.start_date;
                const endDateElem = createFormRef.value?.elements.end_date;
                if(startDateElem) body.start_date = formatDate(startDateElem.dataset.value, false, true);
                if(endDateElem) body.end_date = formatDate(endDateElem.dataset.value, false, true);

                await sendData(body, '/hotel/tariffs');
                updTariffs();
            }, { errorOff: true }
        );
    };

    onMounted(()=>{
        if(!createFormRef.value) return;
        validate(createFormRef.value, createTariffSchema,
            (body: Object)=>{},
            { errorOff: true }
        );
    });

    const rowRefs = ref<HTMLElement[]>([]);
    const zoneRef = ref<HTMLElement>();

</script>

<template>
    <section>
        <div class="admin-tariff-section">
            <div class="admin-tariff-section__container container_admin">

                <div class="admin-tariff-section__header">
                    <div class="admin-section__title-block">
                        <div class="admin-section__title-block__title">
                            Тарифы
                        </div>
                        <div class="admin-section__title-block__btns-block">
                            <div class="admin-section__title-block__btns-block__btns">
                                <ElementIconButton
                                    color="transparent"
                                    :state="displayState === 'rows' ? 'active' : ''"
                                    @click="()=>{displayState = 'rows'}"
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
                                    @click="()=>{displayState = 'cards'}"
                                    ghost
                                ><svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M25.6667 15.6655V23.8333C25.6667 24.4777 25.1444 25 24.5 25H15.1667V15.6655H25.6667ZM12.8334 15.6655V25H3.50004C2.85571 25 2.33337 24.4777 2.33337 23.8333V15.6655H12.8334ZM12.8334 4V13.3322H2.33337V5.16667C2.33337 4.52234 2.85571 4 3.50004 4H12.8334ZM24.5 4C25.1444 4 25.6667 4.52234 25.6667 5.16667V13.3322H15.1667V4H24.5Z" fill="#2D3033" fill-opacity="0.48"/>
                                </svg>
                                </ElementIconButton>
                            </div>
                            <div class="admin-section__title-block__btns-block__btns_text">
                                <ElementButton
                                    link="/admin/numbers/tariff/create/1/"
                                >Создать
                                </ElementButton>
                                <ElementButton
                                    color="transparent"
                                    link="/admin/numbers/tariff/create/1/?inherited=1"
                                >Создать наследуемый
                                </ElementButton>
                            </div>
                        </div>
                    </div>
                    <ElementInput
                        id="admin-tariff-search-input"
                        placeholder="Поиск по названию, периоду, источнику…"
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
                            <div class="admin-booked-section__header__filters-block__sort__elem">
                                <ElementLink
                                    color="transparent"
                                    @click="dropSort"
                                >Сбросить
                                </ElementLink>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="admin-tariff-section__body">
                    <div class="admin-tariff-section__body__table" v-if="displayState === 'rows'">
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
                                    <th class="table__drag-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.5 7C9.32843 7 10 6.32843 10 5.5C10 4.67157 9.32843 4 8.5 4C7.67157 4 7 4.67157 7 5.5C7 6.32843 7.67157 7 8.5 7ZM8.5 13.5C9.32843 13.5 10 12.8284 10 12C10 11.1716 9.32843 10.5 8.5 10.5C7.67157 10.5 7 11.1716 7 12C7 12.8284 7.67157 13.5 8.5 13.5ZM10 18.5C10 19.3284 9.32843 20 8.5 20C7.67157 20 7 19.3284 7 18.5C7 17.6716 7.67157 17 8.5 17C9.32843 17 10 17.6716 10 18.5ZM15.5 7C16.3284 7 17 6.32843 17 5.5C17 4.67157 16.3284 4 15.5 4C14.6716 4 14 4.67157 14 5.5C14 6.32843 14.6716 7 15.5 7ZM17 12C17 12.8284 16.3284 13.5 15.5 13.5C14.6716 13.5 14 12.8284 14 12C14 11.1716 14.6716 10.5 15.5 10.5C16.3284 10.5 17 11.1716 17 12ZM15.5 20C16.3284 20 17 19.3284 17 18.5C17 17.6716 16.3284 17 15.5 17C14.6716 17 14 17.6716 14 18.5C14 19.3284 14.6716 20 15.5 20Z" fill="#2D3033" fill-opacity="0.32"/>
                                        </svg>
                                    </th>
                                    <th class="table__chevron">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.0001 13.1714L16.9499 8.22168L18.3641 9.63589L12.0001 15.9999L5.63623 9.63589L7.05044 8.22168L12.0001 13.1714Z" fill="#2D3033" fill-opacity="0.32"/>
                                        </svg>
                                    </th>
                                    <th class="table__t2 table__t2_heading table__toggle">
                                        Вкл.
                                    </th>
                                    <th class="table__t2 table__t2_heading table__name">
                                        Название
                                    </th>
                                    <th class="table__t2 table__t2_heading table__same-width">
                                        Источник
                                    </th>
                                    <th class="table__t2 table__t2_heading table__same-width">
                                        Период действия
                                    </th>
                                    <th class="table__t2 table__t2_heading table__same-width">
                                        Привязка к промокодам
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
                            <tbody class="table__body" ref="zoneRef">
                                <tr v-for="(tariff, index) in tariffs"
                                    :key="tariff.id" 
                                    ref="rowRefs"
                                    ref_for
                                >
                                    <td>
                                        <ElementCheckbox
                                            :id="`table-checkbox-${tariff.id}`"
                                            :checked="tariff.checked"
                                            :on-update="(checked: boolean)=>{tariff.checked = checked}"
                                        />
                                    </td>
                                    <td class="table__drag-icon">
                                        <TableDragElem
                                            :all-draggable="rowRefs"
                                            :drag-zone="zoneRef"
                                            :cur-index="index"
                                        />
                                    </td>
                                    <td class="table__chevron">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.0001 13.1714L16.9499 8.22168L18.3641 9.63589L12.0001 15.9999L5.63623 9.63589L7.05044 8.22168L12.0001 13.1714Z" fill="#2D3033" fill-opacity="0.32"/>
                                        </svg>
                                    </td>
                                    <td>
                                        <ElementToggle
                                            :checked="tariff.is_active"
                                            :on-change="async(checked: boolean)=>{
                                                tariff.is_active = checked;
                                                await sendData(tariff, `/hotel/tariffs/${tariff.id}`, 'PATCH');
                                            }"
                                            :id="`table-toggle-${tariff.id}`"
                                        />
                                    </td>
                                    <td>
                                        <ElementLink
                                            :link="`/admin/numbers/tariff/create/1/?tariff_id=${tariff.id}`"
                                        >{{ tariff.name }}
                                        </ElementLink>
                                    </td>
                                    <td class="table__t1 table__t1_tp">
                                        Модуль ВМ
                                    </td>
                                    <td class="table__t1 table__t1_tp">
                                        Всегда
                                    </td>
                                    <td class="table__t1 table__t1_tp">
                                        {{ tariff.sum_with_promo_code ? 'Да': 'Нет' }}
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
                                                <NuxtLink
                                                    :to="`/admin/numbers/tariff/create/1/?tariff_id=${tariff.id}`"
                                                >Редактировать
                                                </NuxtLink>
                                            </ElementOption>
                                            <ElementOption
                                                :on-click="()=>{
                                                    // popupDeleteOpened = true;
                                                    // categoryToEdit = category;
                                                }"
                                            >
                                                Удалить
                                            </ElementOption>
                                        </Dropdown>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <div class="admin-tariff-section__body__create-input" v-if="displayState === 'rows'">
                        <form class="admin-tariff-section__body__create-input__inputs" ref="createFormRef">
                            <ElementInput class="name-input"
                                id="admin-tariff-create-input-name"
                                placeholder="Название тарифа"
                                name="name"
                                :on-input="handleValidate"
                            /><hr>
                            <SelectDefault class="same-width-input"
                                id="admin-tariff-create-select"
                                type="checkbox"
                                placeholder="Источник"
                            /><hr>
                            <DatePicker class="same-width-input"
                                range-select
                                first-placeholder="От"
                                last-placeholder="До"
                                first-name="start_date"
                                last-name="end_date"
                                @update="()=>{
                                    handleValidate();
                                }"
                            /><hr>
                            <SelectDefault class="same-width-input"
                                id="admin-tariff-create-select-promo"
                                type="checkbox"
                                placeholder="Привязка к промокодам"
                            />
                            <button class="hidden" name="button"></button>
                        </form>
                        <div class="admin-tariff-section__body__create-input__helper">
                            Введите ячейки и нажмите ↵ Enter
                        </div>
                    </div>
                    <div class="admin-tariff-section__body__cards" v-if="displayState === 'cards'">
                        <TableCardTariff v-for="tariff in tariffs"
                            :res="tariff"
                            v-model:checked="tariff.is_active"
                            :on-change="async(checked: boolean)=>{
                                tariff.is_active = checked;
                                await sendData(tariff, `/hotel/tariffs/${tariff.id}`, 'PATCH');
                            }"
                            :draggable="true"
                            :id="`tariff-${tariff.id}`"
                        />
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<style lang="scss">
    .admin-tariff-section {
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
                    &__chevron {
                        width: 4rem;
                        cursor: pointer;
                        text-align: center;
                        svg {
                            width: 1.5rem;
                            height: 1.5rem;
                            @include transition(transform);
                        }
                    }
                    &__name {
                        width: 30rem;
                    }
                    &__rooms {
                        width: 16rem;
                    }
                    &__same-width {
                        width: 15.7%;
                    }
                    .option {
                        a {
                            color: $text-primary-transparent-48;
                        }
                    }
                }
            }
            &__create-input {
                @include df_fdc;
                gap: .5rem;
                padding: 1.5rem 4rem 0 16rem;
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
                        min-width: 30.25rem;
                        .input-label {
                            border-radius: .5rem 0 0 .5rem !important;
                        }
                    }
                    .same-width-input {
                        width: 30%;
                    }
                    .hidden {
                        position: absolute;
                        scale: 0;
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