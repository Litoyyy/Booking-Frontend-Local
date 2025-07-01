<script lang="ts" setup>
    const { 
        sortElements, 
        selectSort, 
        dropSort 
    } = useSorters('guests');

    const route = useRoute();

    definePageMeta({
        isAdmin: true,
    });

    const displayState = ref('rows');
    const createPopupOpened = ref(false);
    const dialogCreatedShow = ref(false);
    const popupDeleteOpened = ref(false);
    const popupBlockOpened = ref(false);

    const guestToEdit = ref({});

    const allGuests = ref([
        {
            id: 1,
            full_name: 'Панченко Татьяна Альбертовна',
            birth_date: '20.12.1989',
            phone: '+7 495 390 30 20',
            email: 'alexandrov@gmail.com',
            income: '8 500',
            segment: 'Online'
        },
        {
            id: 2,
            full_name: 'Авдонина Дарья Андреевна',
            birth_date: '17.02.1972',
            phone: '+7 495 390 30 20',
            email: 'alexandrov@gmail.com',
            income: '8 500',
            segment: 'Online'
        },
    ]);

    const {
        allChecked,
        checkAllFunc
    } = useTableCheckboxes(allGuests);

    const currentPage = ref(1);
    const totalPages = ref();
    const searchVal = ref('');
    
    const createdGuest = ref();

    const updGuests =()=> {
        const res = getData(`/hotel/guests/?page=${currentPage}&q=${searchVal}`);
        allGuests.value = res.results;
    }

    const getSearchVal=(event: Event)=>{
        const input = event.target as HTMLInputElement;
        searchVal.value = input.value;
    };

    const debouncedSearchVal = debounce(getSearchVal, 500);

    watch(()=>currentPage.value,
        ()=>{
            // updGuests();
        });
    watch(()=>searchVal.value,
        ()=>{
            // updGuests();
        });

    onMounted(()=>{
        // updGuests();
        const queryCreated = route.query.created;
        if(!!queryCreated) {
            const guestInfo = getData(`/hotel/guests/${queryCreated}`);
            createdGuest.value = guestInfo;
        };
    });
</script>

<template>
    <section>
        <div class="admin-guests-section">
            <div class="admin-guests-section__container container_admin">
                <div class="admin-guests-section__header">

                    <div class="admin-section__title-block">
                        <div class="admin-section__title-block__title">
                            Гости
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
                                @click="()=>{
                                    createPopupOpened = true;
                                }"
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
                        <ElementLink
                            color="subaccent"
                        >XLSX Экспорт
                        </ElementLink>
                    </div>

                </div>
                <div class="admin-guests-section__body">
                    <div class="admin-guests-section__body__table" v-if="displayState === 'rows'">
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
                                    <th class="table__t2 table__t2_heading table__full-name">ФИО</th>
                                    <th class="table__t2 table__t2_heading table__date-birth">Дата рождения</th>
                                    <th class="table__t2 table__t2_heading table__phone">Телефон</th>
                                    <th class="table__t2 table__t2_heading table__mail">E-mail</th>
                                    <th class="table__t2 table__t2_heading table__income">Доход, ₽</th>
                                    <th class="table__t2 table__t2_heading table__segment">Сегмент</th>
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
                                <tr v-for="guest in allGuests">
                                    <td>
                                        <ElementCheckbox
                                            :id="`table-checkbox-${guest.id}`"
                                            :checked="guest.checked"
                                            :on-update="(checked: boolean)=>{guest.checked = checked}"
                                        />
                                    </td>
                                    <td class="table__full-name">
                                        <ElementLink
                                            :link="`/admin/hotel/guests/${guest.id}/`"
                                        >{{ guest.full_name }}
                                        </ElementLink>
                                    </td>
                                    <td class="table__t1 table__t1_tp">
                                        {{ guest.birth_date }}
                                    </td>
                                    <td class="table__t1">
                                        <CopyToClipboard
                                            :text="guest.phone"
                                        />
                                    </td>
                                    <td class="table__t1">
                                        <CopyToClipboard
                                            :text="guest.email"
                                        />
                                    </td>
                                    <td class="table__t1 table__t1_tp">
                                        {{ guest.income }}
                                    </td>
                                    <td class="table__t1 table__t1_tp">
                                        {{ guest.segment }}
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
                                                <NuxtLink :to="`/admin/hotel/guests/create/?guest_id=${guest.id}`">
                                                    Редактировать
                                                </NuxtLink>
                                            </ElementOption>
                                            <ElementOption
                                                :on-click="()=>{
                                                    popupBlockOpened = true;
                                                    guestToEdit = guest;
                                                }"
                                            >Заблокировать
                                            </ElementOption>
                                            <ElementOption
                                                :on-click="()=>{
                                                    popupDeleteOpened = true;
                                                    guestToEdit = guest;
                                                }"
                                            >Удалить
                                            </ElementOption>
                                        </Dropdown>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="admin-guests-section__body__cards" v-else-if="displayState === 'cards'">
                        <TableCardGuests v-for="guest in allGuests"
                            :res="guest"
                        />
                    </div>

                    <div class="admin-guests-section__body__pagination">
                        <span class="admin-guests-section__body__pagination__info">Всего гостей 4 937</span>
                        <Paginator 
                            id="admin-guests-pagination"
                            v-model:newValue="currentPage"
                            :lastPage="totalPages"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>

    <PopupCreateGuest
        v-model:visible="createPopupOpened"
    />
    <Dialog
        draw-line
        v-model:visible="dialogCreatedShow"
        title="Создание завершено"
        :description="createdGuest?.full_name"
    />
    
    <PopupDelete v-model:visible="popupBlockOpened"
        class="popup_block"
        popupName="Заблокировать гостя"
        btnText="Заблокировать"
        :description="guestToEdit.full_name"
        text="После блокировки, гость не сможет забронировать номер на личные данные, которые были указаны у него в карточке."
    />
    <PopupDelete v-model:visible="popupDeleteOpened"
        class="popup_block"
        title="гостя"
        :description="guestToEdit.full_name"
        text="При удалении карточки гостя, информация полностью удалится из модуля бронирования, а также остановится отправка маркетинговых рассылок."
    />
</template>

<style lang="scss">
    .admin-guests-section {
        &__container {
            padding-bottom: 3rem;
        }
        &__header {
            grid-column: span 12;
            @include df_fdc;
            gap: 1.5rem;
            .admin-service-section__header__input-block {
                max-width: 38.5rem;
            }
        }
        &__body {
            grid-column: span 12;
            @include df_fdc;
            gap: 1rem;
            &__table {
                overflow: auto;
                height: calc(100dvh - 27.5rem);
                .table {
                    width: 100%;
                    &__full-name {
                        max-width: 19.125rem;
                        width: 100%;
                        text-wrap: wrap;
                    }
                    &__date-birth {
                        min-width: 15rem;
                    }
                    &__phone {
                        min-width: 15rem;
                    }
                    &__mail {
                        min-width: 17.5rem;
                    }
                    &__income {
                        min-width: 10rem;
                    }
                    &__segment {
                        min-width: 11.5rem;
                    }
                    &__body {
                        td {
                            span {
                                @include df_ac;
                                gap: .5rem;
                            }
                        }
                    }
                }
            }
            &__cards {
                height: calc(100dvh - 27.5rem);
                @include grid(4, .75rem);
                overflow-y: auto;
            }
            &__pagination {
                @include df_ac;
                justify-content: space-between;
                &__info {
                    @include text_2;
                    color: $text-primary-transparent-48;
                }
            }
        }
    }
</style>