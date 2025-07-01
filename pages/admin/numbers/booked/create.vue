<script setup lang="ts">

    import { reservationRooms } from '~/composables/making-reservation/reservationRooms';

    const { getTags } = reservationRooms();

    definePageMeta({
        isAdmin: true,
    });

    const selectedRoom = ref({});

    const rooms = ref([
        {
            title: 'Стандарт с широкой кроватью',
            price: 1200,
            id: 1,
            square: 45,
            places: 2,
        },
        {
            title: 'Стандарт с широкой кроватью',
            price: 1200,
            id: 2,
            square: 45,
            places: 2,
        },
        {
            title: 'Стандарт с широкой кроватью',
            price: 1200,
            id: 3,
            square: 45,
            places: 2,
        },
    ]);

    const services = ref([
        {

        }
    ]);

</script>

<template>
    <section>
        <div class="admin-booked-create-section">
            <div class="admin-booked-create-section__container container">
                <div class="admin-booked-create-section__main">

                    <div class="admin-booked-create-section__info-block">
                        <div class="admin-booked-create-section__title-block">
                            <span class="title">Номер</span>
                            <ElementButton
                                color="subaccent"
                                ghost
                            >Создать
                            </ElementButton>
                        </div>
                        <div class="admin-booked-create-section__info-block__list">
                            <RadioName v-for="room in rooms" 
                                :res="room" 
                                variant="image"
                                :on-update="()=>{selectedRoom = room}"    
                            />
                        </div>
                    </div>

                    <div class="admin-booked-create-section__info-block">
                        <div class="admin-booked-create-section__title-block">
                            <span class="title">Доп.услуги</span>
                            <ElementButton
                                color="subaccent"
                                ghost
                            >Создать
                            </ElementButton>
                        </div>
                        <div class="admin-booked-create-section__info-block__list">
                            <CheckboxName v-for="room in rooms" 
                                :res="room"
                                :on-update="(checked: boolean)=>{
                                    console.log(checked);
                                }"
                            />
                        </div>
                    </div>

                    <div class="admin-booked-create-section__info-block">
                        <div class="admin-booked-create-section__title-block">
                            <span class="title">Контактная информация</span>
                            <ElementButton
                                color="subaccent"
                                ghost
                            >Выбрать гостя
                            </ElementButton>
                        </div>
                        <div class="admin-booked-create-section__info-block__inputs">
                            <ElementInput 
                                id="admin-booked-last-name"
                                name="last_name"
                                placeholder="Фамилия"
                            />
                            <ElementInput 
                                id="admin-booked-first-name"
                                name="first_name"
                                placeholder="Имя"
                            />
                            <ElementInput 
                                id="admin-booked-sur-name"
                                name="sur_name"
                                placeholder="Отчество"
                            />
                            <DatePicker 
                                id="admin-booked-date-birth"
                                first-name="date_birth"
                                first-placeholder="Дата рождения"
                            />
                            <ElementInput 
                                id="admin-booked-phone"
                                name="phone"
                                placeholder="Номер телефона"
                            />
                            <ElementInput 
                                id="admin-booked-email"
                                name="email"
                                placeholder="E-mail"
                            />
                        </div>
                    </div>

                    <div class="admin-booked-create-section__info-block">
                        <div class="admin-booked-create-section__title-block">
                            <span class="title">Гости и дата</span>
                        </div>
                        <div class="admin-booked-create-section__info-block__inputs">
                            <DatePicker class="gc-s2"
                                rangeSelect
                                id="admin-booked-range-dates"
                                first-name="date_birth"
                                last-name=""
                                first-placeholder="Заезд"
                                last-placeholder="Выезд"
                                first-helper="Номер будет готов к 14:00"
                                last-helper="Осуществляется не позднее 12:00"
                            />
                            <SelectSmartSelectGuest class="gc-s2"
                                id="admin-booked-smart-guest"
                                fake-placeholder="Кол-во гостей"
                                :tags="getTags"
                            />
                        </div>
                    </div>

                    <div class="admin-booked-create-section__info-block">
                        <div class="admin-booked-create-section__title-block">
                            <span class="title">Расчет</span>
                        </div>
                        <div class="admin-booked-create-section__info-block__inputs">
                            <SelectDefault class="gc-s2"
                                id="admin-booked-tariffs"
                                name="tariffs"
                                fake-placeholder="Тариф"
                            />
                            <ElementInput 
                                id="admin-booked-room"
                                name="room"
                                placeholder="Номер"
                                input-label-text="₽"
                            />
                            <ElementInput 
                                id="admin-booked-services"
                                name="services"
                                placeholder="Доп.услуги"
                                input-label-text="₽"
                            />
                        </div>
                    </div>

                </div>
                <div class="admin-booked-create-section__menu">
                    <div class="admin-booked-create-section__menu__title">Обзор брони</div>
                    <div class="admin-booked-create-section__menu__info">
                        <span class="sub-title">Категория номера</span>
                        <span v-if="Object.keys(selectedRoom).length === 0">-</span>
                        <span v-else>{{ selectedRoom.title }}</span>
                    </div>
                    <div class="admin-booked-create-section__menu__info">
                        <span class="sub-title">Доп.услуги</span>
                        -
                    </div>
                    <div class="admin-booked-create-section__menu__info">
                        <span class="sub-title">Гость</span>
                        -
                    </div>
                    <div class="admin-booked-create-section__menu__info">
                        <span class="sub-title">Гости и дата</span>
                        -
                    </div>
                    <div class="admin-booked-create-section__menu__info">
                        <span class="sub-title">Тариф</span>
                        -
                    </div>
                    <div class="admin-booked-create-section__menu__title">
                        ? ₽
                    </div>
                    <ElementButton
                        size="large"
                    >Создать бронь
                    </ElementButton>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    .admin-booked-create-section {
        &__container {
            padding: 1.5rem 0 4rem;
        }
        &__main {
            grid-column: 2 / span 6;
            @include grid(1, 3rem);
        }
        &__info-block {
            @include df_fdc;
            gap: 1.5rem;
            &__list {
                @include df_fdc;
                gap: 1rem;
            }
            &__inputs {
                @include grid(2, 1rem);
                .gc-s2 {
                    grid-column: span 2;
                }
            }
        }
        &__title-block {
            @include df_ac;
            justify-content: space-between;
            .title {
                @include heading_3;
            }
        }
        &__menu {
            position: sticky;
            top: 6rem;
            grid-column: 9 / span 3;
            @include df_fdc;
            gap: 1.5rem;
            height: fit-content;
            &__title {
                @include heading_3;
            }
            &__info {
                @include df_fdc;
                @include text_1;
                .sub-title {
                    @include text_2;
                    color: $text-primary-transparent-48;
                }
            }
        }
    }
</style>