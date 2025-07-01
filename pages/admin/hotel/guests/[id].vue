<script lang="ts" setup>
    const route = useRoute();

    definePageMeta({
        isAdmin: true,
        breadcrumbs: [
            {
                name: 'Гостиница'
            },
            {
                name: 'Гости',
                slug: '/admin/hotel/guests/',
                state: 'active'
            },
        ],
    });

    const displayedTable = ref(1);

    const guestInfo = ref({
        id: 1,
        full_name: 'Панченко Татьяна Альбертовна',
        birth_date: '20.12.1989',
        phone: '+7 495 390 30 20',
        email: 'alexandrov@gmail.com',
        income: '8 500',
        segment: 'Online'
    });

    const updGuestInfo =async()=>{
        const res = await getData(`/hotel/guests/${route.params.id}`);
        guestInfo.value = res;
    };
    
    const infoShow = ref(true);

    const popupDeleteOpened = ref(false);
    const popupBlockOpened = ref(false);

    // const {
    //     allChecked,
    //     checkAllFunc
    // } = useTableCheckboxes(allGuests);

    onMounted(()=>{
        // updGuestInfo();
    });

</script>

<template>
    <section>
        <div class="admin-guest-card-section">
            <div class="admin-guest-card-section__container container_admin">
                <div class="admin-guest-card-section__header">
                    <div class="admin-section__title-block">
                        <div class="admin-section__title-block__title" @click="infoShow = !infoShow" :data-opened="infoShow">
                            {{ guestInfo.full_name }}, {{ guestInfo.birth_date }}
                            <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.0007 13.1333L8.22608 18.9081L6.57617 17.2582L14.0007 9.8335L21.4254 17.2582L19.7755 18.9081L14.0007 13.1333Z" fill="#2D3033"/>
                            </svg>
                        </div>
                        <div class="admin-section__title-block__btns-block">
                            <div class="admin-section__title-block__btns-block__btns">
                                <ElementPopover
                                    position="center"
                                >Редактировать
                                <template #icon>
                                    <ElementIconButton
                                    color="transparent"
                                    :link="`/admin/hotel/guests/create/?guest_id=${guestInfo.id}`"
                                    ghost
                                    ><svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.0494 8.49676L19.9991 13.4465L8.44975 24.996H3.5V20.0461L15.0494 8.49676ZM16.6993 6.84685L19.1742 4.37198C19.6299 3.91637 20.3685 3.91637 20.8241 4.37198L24.124 7.67181C24.5796 8.12742 24.5796 8.86612 24.124 9.32172L21.649 11.7966L16.6993 6.84685Z" fill="#2D3033" fill-opacity="0.48"/>
                                    </svg>
                                    </ElementIconButton>
                                </template>
                                </ElementPopover>
                                <ElementPopover
                                    position="center"
                                >Заблокировать
                                <template #icon>
                                    <ElementIconButton
                                    color="transparent"
                                    @click="popupBlockOpened = true"
                                    ghost
                                    ><svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.74956 6.24956C7.93777 4.06135 10.9056 2.83203 14.0002 2.83203C17.0948 2.83203 20.0627 4.06135 22.2509 6.24956C24.4391 8.43777 25.6684 11.4056 25.6684 14.5002C25.6684 17.5948 24.4391 20.5627 22.2509 22.7509C20.0627 24.9391 17.0948 26.1684 14.0002 26.1684C10.9056 26.1684 7.93777 24.9391 5.74956 22.7509C3.56135 20.5627 2.33203 17.5948 2.33203 14.5002C2.33203 11.4056 3.56135 8.43777 5.74956 6.24956ZM8.27941 7.12743L21.373 20.221C22.6362 18.5932 23.3322 16.5826 23.3322 14.5002C23.3322 12.0252 22.349 9.65162 20.5989 7.90154C18.8488 6.15147 16.4752 5.16828 14.0002 5.16828C11.9179 5.16828 9.90725 5.86427 8.27941 7.12743ZM19.721 21.873L6.62743 8.77941C5.36427 10.4073 4.66828 12.4179 4.66828 14.5002C4.66828 16.9752 5.65147 19.3488 7.40154 21.0989C9.15162 22.849 11.5252 23.8322 14.0002 23.8322C16.0826 23.8322 18.0932 23.1362 19.721 21.873Z" fill="#2D3033" fill-opacity="0.48"/>
                                    </svg>
                                    </ElementIconButton>
                                </template>
                                </ElementPopover>
                                <ElementPopover
                                    position="center"
                                >Удалить
                                <template #icon>
                                    <ElementIconButton
                                    color="transparent"
                                    @click="popupDeleteOpened = true"
                                    ghost
                                    ><svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.16732 7.50016V4.00016C8.16732 3.35584 8.68966 2.8335 9.33398 2.8335H18.6673C19.3117 2.8335 19.834 3.35584 19.834 4.00016V7.50016H25.6673V9.8335H23.334V25.0002C23.334 25.6445 22.8117 26.1668 22.1673 26.1668H5.83398C5.18966 26.1668 4.66732 25.6445 4.66732 25.0002V9.8335H2.33398V7.50016H8.16732ZM10.5007 5.16683V7.50016H17.5007V5.16683H10.5007Z" fill="#2D3033" fill-opacity="0.48"/>
                                    </svg>
                                    </ElementIconButton>
                                </template>
                                </ElementPopover>
                            </div>
                        </div>
                    </div>
                </div>
                <Transition name="cards-grid">
                <div class="admin-guest-card-section__cards-grid" v-if="infoShow">
                    <InfoCardBookings class="gcs2"
                        title="Доход"
                        info_title="130 500 ₽"
                        description="Оплачен"
                    />
                    <InfoCardBookings class="gcs2"
                        title="Всего броней"
                        info_title="15"
                        description="Активные: 1, Отмены: 0"
                    />
                    <InfoCardBookings class="gcs2"
                        subaccent
                        title="Лояльность"
                        info_title="0%"
                        description="Нет данных"
                    />
                    <InfoCardContacts class="gcs3"
                        
                    />
                    <InfoCardChildrens class="gcs3"

                    />
                    <InfoCardTestimonials class="gcs6"
                    
                    />
                    <InfoCardSegments class="gcs6"
                    
                    />
                </div>
                </Transition>
                <div class="admin-guest-card-section__body">
                    <div class="admin-guest-card-section__body__filters">
                        <ElementButton
                            @click="displayedTable = 1"
                            :state="displayedTable === 1 ? 'active' : undefined"
                            color="neutral"
                            ghost
                        >История бронирования
                        </ElementButton>
                        <ElementButton
                            @click="displayedTable = 2"
                            :state="displayedTable === 2 ? 'active' : undefined"
                            color="neutral"
                            ghost
                        >Услуги
                        </ElementButton>
                        <ElementButton
                            @click="displayedTable = 3"
                            :state="displayedTable === 3 ? 'active' : undefined"
                            color="neutral"
                            ghost
                        >Письма
                        </ElementButton>
                    </div>
                    <div class="admin-guest-card-section__body__input">
                        <ElementInput
                            id="admin-guest-card-search-input"
                            name="search"
                            placeholder="Поиск по номеру брони, id, периоду…"
                        ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168Z" fill="#2D3033" fill-opacity="0.32"/>
                        </svg>
                        </ElementInput>
                    </div>
                    <div class="admin-guest-card-section__body__table">
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
                                    <th class="table__t2 table__t2_heading table__id">
                                        id
                                    </th>
                                    <th class="table__t2 table__t2_heading table__sum">
                                        Сумма, ₽
                                    </th>
                                    <th class="table__t2 table__t2_heading table__return">
                                        Возврат, ₽
                                    </th>
                                    <th class="table__t2 table__t2_heading table__period">
                                        Период
                                    </th>
                                    <th class="table__t2 table__t2_heading table__same-width">
                                        Источник
                                    </th>
                                    <th class="table__t2 table__t2_heading table__same-width">
                                        Номер
                                    </th>
                                    <th class="table__t2 table__t2_heading table__same-width">
                                        Статус
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
                                <tr>
                                    <td>
                                        <ElementCheckbox
                                            id="admin-guest-checkbox"
                                        />
                                    </td>
                                    <td>
                                        <ElementLink
                                            color="neutral"
                                        >782
                                        </ElementLink>
                                    </td>
                                    <td>
                                        <span class="table__sum-cell">
                                            8500
                                            <ElementIconButton
                                                size="small"
                                                color="transparent"
                                            ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.99872 15.1709L19.1911 5.97852L20.6053 7.39273L9.99872 17.9993L3.63477 11.6354L5.04899 10.2212L9.99872 15.1709Z" fill="#1C5BAD"/>
                                            </svg>
                                            </ElementIconButton>
                                        </span>
                                    </td>
                                    <td class="table__t1 table__t1_tp">
                                        -
                                    </td>
                                    <td class="table__t1 table__t1_tp">
                                        12.10-14.10
                                    </td>
                                    <td class="table__t2 table__t1_tp">
                                        Сайт и мобильная версия сайта
                                    </td>
                                    <td class="table__t2 table__t1_tp">
                                        Стандарт с широкой кроватью
                                    </td>
                                    <td class="table__t2 table__t1_tp">
                                        Подтверждена
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
                                                <NuxtLink :to="`/admin/hotel/guests/`">
                                                    Редактировать
                                                </NuxtLink>
                                            </ElementOption>
                                            <ElementOption
                                                :on-click="()=>{
                                                    // popupDeleteOpened = true;
                                                    // guestToEdit = guest;
                                                }"
                                            >Удалить
                                            </ElementOption>
                                        </Dropdown>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <PopupDelete v-model:visible="popupBlockOpened"
        class="popup_block"
        popupName="Заблокировать гостя"
        btnText="Заблокировать"
        :description="guestInfo.full_name"
        text="После блокировки, гость не сможет забронировать номер на личные данные, которые были указаны у него в карточке."
    />
    <PopupDelete v-model:visible="popupDeleteOpened"
        class="popup_block"
        title="гостя"
        :description="guestInfo.full_name"
        text="При удалении карточки гостя, информация полностью удалится из модуля бронирования, а также остановится отправка маркетинговых рассылок."
    />
</template>

<style lang="scss">
    .admin-guest-card-section {
        &__header {
            grid-column: span 12;
            .admin-section {
                &__title-block {
                    &__title {
                        cursor: pointer;
                        svg {
                            @include transition(transform);
                        }
                        &[data-opened="false"] {
                            svg {
                                transform: rotate(-180deg);
                            }
                        }
                    }
                }
            }
            .popover {
                &__text-block {
                    top: 2.5rem !important;
                }
            }
        }
        &__cards-grid {
            grid-column: span 12;
            @include grid(12, 1rem);
            .gcs2 {
                grid-column: span 2;
            }
            .gcs3 {
                grid-column: span 3;
            }
            .gcs6 {
                grid-column: span 6;
            }
        }
        &__body {
            grid-column: span 12;
            @include df_fdc;
            gap: 1.5rem;
            &__filters {
                @include df_ac;
                gap: 1.5rem;
            }
            &__input {
                max-width: 38.5rem;
            }
            &__table {
                width: 100%;
                .table {
                    width: 100%;
                    &__id {
                        min-width: 5rem;
                    }
                    &__sum {
                        min-width: 15rem;
                    }
                    &__return {
                        min-width: 7.5rem;
                    }
                    &__period {
                        min-width: 12.5rem;
                    }
                    &__same-width {
                        min-width: 16rem;
                    }
                    &__sum-cell {
                        @include df_ac;
                        gap: .5rem;
                        @include text_1;
                    }
                }
            }
        }
    }
    .popup_block {
        .popup__content {
            max-width: 40rem;
        }
    }
    .cards-grid-enter-active,
    .cards-grid-leave-active {
        @include transition(opacity, transform);
    }

    .cards-grid-enter-from,
    .cards-grid-leave-to {
        opacity: 0;
        transform: translateY(-2rem);
    }
</style>