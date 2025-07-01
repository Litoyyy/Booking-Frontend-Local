<script lang="ts" setup>
    import { z } from 'zod';
    import { usePriceRule } from '~/composables/services/usePriceRule';
    import { useSources } from '~/composables/services/useSources';

    const { 
        sortElements, 
        selectSort, 
        dropSort 
    } = useSorters('services');

    const {
        priceRule
    } = usePriceRule();

    const {
        sources
    } = useSources();

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
                slug: '',
                state: 'active'
            }
        ],
    });

    const route = useRoute();

    const displayState = ref('rows');
    const dialogCreatedShow = ref(false);

    const categoryInfo = ref();
    const allServices = ref([]);
    const allCategories = ref([]);

    const {
        allChecked,
        checkAllFunc
    } = useTableCheckboxes(allServices);

    const updateCategoryInfo=async()=>{
        const id = route.params.id;
        const res = await getData(`/hotel/service-category/${id}`);
        categoryInfo.value = res;
    };

    const updServicesInfo=async()=>{
        const id = route.params.id;
        const res = await getData(`/hotel/service?category=${id}`);
        allServices.value = res.results;
    };

    const updateCategories = async() => {
        const getCategories = await getData('/hotel/room-category');
        allCategories.value = getCategories.results;
    };
    const getSearchVal=(event: Event)=>{
        const input = event.target as HTMLInputElement;
        // setNewFilter('q', input.value);
    };

    const debouncedSearchVal = debounce(getSearchVal, 500);


    const formRef = ref<HTMLFormElement | null>(null);

    const serviceCreateSchema = z.object({
        name: z.string().min(1),
        description: z.string(),
        price_rule: z.string().min(1),
        sources: z.string().min(1),
    });

    const handleValidate=()=>{
        if(formRef.value) {
            validate(formRef.value, serviceCreateSchema,
                async(body: any)=>{
                    const elements = formRef.value?.elements;

                    const selectNames = ['sources', 'category', 'price_rule'];
                    selectNames.map(name=>{
                        if(!!elements[`${name}`].value) {
                            body[`${name}`] = Number(elements[`${name}`].dataset.value);
                        } else {
                            delete body[`${name}`];
                        }
                    });

                    await sendData(body, '/hotel/service');
                    updServicesInfo();
                }, { clearAfterSubmit: true}
            )
        }
    };

    onMounted(()=>{
        updateCategoryInfo();
        updServicesInfo();
        updateCategories();
    });

    const rowRefs = ref<HTMLElement[]>([]);
    const zoneRef = ref<HTMLElement>();

</script>

<template>
    <section>
        <div class="admin-service-section">
            <div class="admin-service-section__container container_admin">

                <div class="admin-service-section__header">
                    <div class="admin-section__title-block">
                        <div class="admin-section__title-block__title">
                            <span v-if="route.params.id == '0'">Все услуги</span>
                            <span v-else>Услуги категории «{{ categoryInfo?.name }}»</span>
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
                            <ElementButton
                                :link="`/admin/hotel/services/create/1/?category_id=${categoryInfo?.id}`"
                            >Создать
                            </ElementButton>
                        </div>
                    </div>
                    <div class="admin-service-section__header__input-block">
                        <ElementInput 
                            class="admin-booked-searcher"
                            id="admin-booked-searcher"
                            placeholder="Поиск по id, ФИО, номеру телефона, ИНН…"
                            :on-input="debouncedSearchVal"
                        ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168Z" fill="#2D3033" fill-opacity="0.32"/>
                        </svg>
                        </ElementInput>
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
                    </div>
                </div>

                <div class="admin-service-section__body" ref="zoneRef">
                    <div class="admin-service-section__body__table" v-if="displayState === 'rows'">
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
                                    <th class="table__t2 table__t2_heading table__toggle">
                                        Вкл.
                                    </th>
                                    <th class="table__t2 table__t2_heading table__name">
                                        Название 
                                    </th>
                                    <th class="table__t2 table__t2_heading table__desc">
                                        Описание
                                    </th>
                                    <th class="table__t2 table__t2_heading table__sources">
                                        Источники
                                    </th>
                                    <th class="table__t2 table__t2_heading table__even">
                                        Тарифы
                                    </th>
                                    <th class="table__t2 table__t2_heading table__even">
                                        Фото
                                    </th>
                                    <th class="table__t2 table__t2_heading table__category">
                                        Категория
                                    </th>
                                    <th class="table__t2 table__t2_heading table__accrual-rate">
                                        Темп начисления
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
                            <tbody class="table__body">
                                <tr v-for="(service, index) in allServices"
                                    :key="service.id" 
                                    ref="rowRefs"
                                    ref_for
                                >
                                    <td>
                                        <ElementCheckbox
                                            :id="`table-checkbox-${service.id}`"
                                            :checked="service.checked"
                                            :on-update="(checked: boolean)=>{service.checked = checked}"
                                        />
                                    </td>
                                    <td class="table__drag-icon">
                                        <TableDragElem
                                            :all-draggable="rowRefs"
                                            :drag-zone="zoneRef"
                                            :cur-index="index"
                                        />
                                    </td>
                                    <td>
                                        <ElementToggle
                                            v-model:checked="service.is_active"
                                            :on-change="async(checked: boolean)=>{
                                                service.is_active = checked;
                                                await sendData(service, `/hotel/service/${service.id}`, 'PATCH');
                                            }"
                                            :id="`table-toggle-${service.id}`"
                                        />
                                    </td>
                                    <td>
                                        <ElementLink
                                            :link="`/admin/hotel/services/create/1/?service=${service.id}&category_id=${categoryInfo.id}`"
                                        >{{ service.name }}
                                        </ElementLink>
                                    </td>
                                    <td class="table__t1 table__t1_tp">
                                        {{ service.description }}
                                    </td>
                                    <td class="table__t1 table__t1_tp">
                                        <span v-for="(item, index) in service.sources">
                                            <span v-if="index != 0">, </span> 
                                            {{ item.name }}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <form class="admin-service-section__body__create-input" ref="formRef" v-if="displayState === 'rows'">
                        <ElementInput class="name"
                            id="admin-services-create-service-name"
                            name="name"
                            fake-placeholder="Название"
                            helper="Введите ячейки и нажмите ↵ Enter"
                            :on-input="(event: Event)=>handleValidate()"
                        />
                        <ElementInput class="desc"
                            id="admin-services-create-service-desc"
                            name="description"
                            fake-placeholder="Описание"
                            :on-input="(event: Event)=>handleValidate()"
                        />
                        <SelectDefault class="services"
                            id="admin-services-create-service-sources"
                            name="sources"
                            :options="sources"
                            type="checkbox"
                            fake-placeholder="Источники"
                            :onUpdate="(newValue?:string)=>handleValidate()"
                        />
                        <SelectDefault class="even"
                            id="admin-services-create-service-tariffs"
                            name="tariffs"
                            type="checkbox"
                            placeholder="0"
                            :onUpdate="(newValue?:string)=>handleValidate()"
                        />
                        <SelectDefault class="even"
                            id="admin-services-create-service-photos"
                            name="photos"
                            type="checkbox"
                            placeholder="0"
                            :onUpdate="(newValue?:string)=>handleValidate()"
                        />
                        <SelectDefault class="categories"
                            id="admin-services-create-service-categories"
                            name="category"
                            :options="allCategories"
                            type="default"
                            fake-placeholder="Группа"
                            :onUpdate="(newValue?:string)=>handleValidate()"
                        />
                        <SelectDefault class="accrual-rate"
                            id="admin-services-create-service-accrual-rate"
                            name="price_rule"
                            :options="priceRule"
                            fake-placeholder="Темп начисления"
                            :onUpdate="(newValue?:string)=>handleValidate()"
                        />
                        <button name="button" class="hidden"></button>
                    </form>
                    <div class="admin-service-section__body__cards" v-else-if="displayState === 'cards'">
                        <TableCardServices v-for="service in allServices"
                            :res="service"
                        />
                    </div>
                </div>

            </div>
        </div>
    </section>

    <Dialog
        draw-line
        v-model:visible="dialogCreatedShow"
        title="Создание завершено"
        :description="categoryToEdit?.name"
    />
</template>

<style lang="scss">
    .admin-service-section {
        &__header {
            grid-column: span 12;
            @include df_fdc;
            gap: 1.5rem;
            &__input-block {
                max-width: 38.5rem;
            }
        }
        &__body {
            grid-column: span 12;
            @include df_fdc;
            gap: 1.5rem;
            &__table {
                .table {
                    width: 100%;
                    &__name {
                        min-width: 20rem;
                    }
                    &__desc {
                        width: 11.25rem;
                    }
                    &__sources {
                        width: 12.5rem;
                    }
                    &__even {
                        width: 6rem;
                    }
                    &__category {
                        width: 11.875rem;
                    }
                    &__accrual-rate {
                        width: 11.875rem;
                    }
                }
            }
            &__create-input {
                display: flex;
                padding: 1.5rem 4rem 0 12rem;
                .field {
                    .input-label {
                        border-radius: 0;
                        border-left: 1px solid $border-primary-subdued-8;
                        border-right: 1px solid $border-primary-subdued-8;
                    }
                    &:has(.field__helper) {
                        min-width: 20rem;
                        .input-label {
                            border-radius: .5rem 0 0 .5rem;
                            border-left: none;
                        }
                    }
                    &.desc {
                        min-width: 11.25rem;
                        max-width: 11.25rem;
                    }
                }
                .select {
                    &:last-of-type {
                        .input-label {
                            border-radius: 0 .5rem .5rem 0;
                            border-right: none;
                        }
                    }
                    &.services {
                        max-width: 12.5rem;
                    }
                    &.sources {
                        max-width: 12.5rem;
                    }
                    &.even {
                        max-width: 6rem;
                    }
                    &.categories {
                        max-width: 11.875rem;
                    }
                    &.accrual-rate {
                        max-width: 11.875rem;
                    }
                }
                .hidden {
                    position: absolute;
                    opacity: 0;
                }
            }
            &__cards {
                @include grid(4, 1rem);
            }
        }
    }
</style>