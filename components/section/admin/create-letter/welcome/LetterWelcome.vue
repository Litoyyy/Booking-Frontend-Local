<script lang="ts" setup>
    import { useEmailColor } from '~/composables/admin/letters/letterColor';
    import { useDataLetter } from '~/composables/admin/letters/letterData';
    import { getMailWelcome } from '~/composables/admin/letters/letterData/welcomeMail';

    const {
        activeColor
    } = useEmailColor()

    const {
        // Отображение блоков
        textPart,
        detailOfBooking,
        peymentView,
        cancellationBooking,
        sign,
        // Текстовые переменные для TextEdit
        textAppeal,
        textGreetings,
        textPayment,
        textSign,
    } = getMailWelcome()

    const {
        fromLetter
    } = useDataLetter()

</script>

<template>
    <!-- Письмо Welcome -->
    <div class="letter">
        <div class="letter__container">
            <div 
                class="letter__content"
                :style="{ backgroundColor: activeColor.color?.toString() ?? '#1C5BAD'}">
                
                <div class="letter__header">
                    <div class="letter__header__img-container">
                        <img src="../../../../../assets/images/logo_hotel.png" alt="">
                    </div>

                    <div class="letter__header__title-block">
                        <span class="letter__header__title-block__name-hotel">{{ fromLetter }}</span>
                        <span class="letter__header__title-block__city">Москва</span>
                    </div>

                    <div class="letter__header__address">
                        <p class="letter__header__address__text">
                            <span>
                                Гостиница Измайлово Гамма-Дельте «Люкс-Лайм» 
                            </span>

                            <span>
                                г. Москва, Измайловское ш., д. 71 
                            </span>

                            <span>
                                Круглосуточно: +7 495 215 10 95 <br> +7 499 391 39 23
                            </span>
                        </p>
                    </div>

                </div>
            
                <div class="letter__content-mail">
                    
                    <div v-if="textPart" class="letter__block">
                        <span 
                            v-html="textAppeal"
                            class="letter__block__title__h1">
                        </span>
                        <span 
                            v-html="textGreetings"
                            class="letter__block__text">
                        </span>
                        <div class="letter__number-base">
                            2
                        </div>
                    </div>

                    <div v-if="detailOfBooking" class="letter__block">
                        
                        <div class="letter__block__header">
                            <span class="letter__block__title__h2">
                                Детали бронирования
                            </span>
                            <span class="letter__block__text">
                                20210101-2122-839145123
                            </span>
                        </div>
                        
                        <div class="letter__block__table">
                            
                            <div class="letter__block__table__row">
                                <span class="letter__block__table__key">
                                    Период размещения
                                </span>
                                <span class="letter__block__table__value">
                                    11-16 октября (5 ночей)
                                </span>
                            </div>
                            <hr>

                            <div class="letter__block__table__row">
                                <span class="letter__block__table__key">
                                    Номер
                                </span>
                                <span class="letter__block__table__value">
                                    Стандарт с широкой кроватью
                                </span>
                            </div>
                            <hr>

                            <div class="letter__block__table__row">
                                <span class="letter__block__table__key">
                                    Тариф
                                </span>
                                <span class="letter__block__table__value">
                                    Long Stay
                                </span>
                            </div>
                            <hr>

                            <div class="letter__block__table__row">
                                <span class="letter__block__table__key">
                                    Тариф
                                </span>
                                <span class="letter__block__table__value">
                                    Long Stay
                                </span>
                            </div>
                            <hr>

                            <div class="letter__block__table__row">
                                <span class="letter__block__table__key">
                                    Доп.услуги
                                </span>
                                <span class="letter__block__table__value">
                                    Завтрак «Шведский стол», Трансферт из аэропорта
                                </span>
                            </div>
                            <hr>

                            <div class="letter__block__table__row">
                                <span class="letter__block__table__key">
                                    Стоимость номера
                                </span>
                                <span class="letter__block__table__value-s1">
                                    6 500,00 ₽
                                </span>
                            </div>
                            <hr>

                            <div class="letter__block__table__row">
                                <span class="letter__block__table__key">
                                    Стоимость услуг
                                </span>
                                <span class="letter__block__table__value-s1">
                                    1 000,00 ₽
                                </span>
                                <div class="letter__block__small-table">
                                    <div class="letter__block__small-table__row">
                                        <span class="letter__block__small-table__key">Завтрак  «Шведский стол»</span>
                                        <span class="letter__block__small-table__value">0,00 ₽ (включено)</span>
                                    </div>
                                    <div class="letter__block__small-table__row">
                                        <span class="letter__block__small-table__key">Трансферт из аэропорта</span>
                                        <span class="letter__block__small-table__value">1 000,00 ₽</span>
                                    </div>
                                </div>
                            </div>
                            <hr>

                            <div class="letter__block__table__result">
                                <span class="letter__block__table__result__key">Итог</span>
                                <span class="letter__block__table__result__value">7 500 </span>
                            </div>

                        </div>

                        <div class="letter__number-base">
                            3
                        </div>
                    </div>

                    <div v-if="peymentView" class="letter__block gap-2">
                        <span class="letter__block__title__h3" v-html="textPayment"></span>
                        <div class="letter__block__text">
                            <span>Вид бронирования: негарантированное, прибытие до 14:00</span>
                            <span>В случае незаезда до указанного времени, гостиница оставляет за собой право аннуляции брони без оповещения гостя.</span>
                            <span>Для оформления актов выполненных работ и счетов-фактур необходимо наличие доверенности от организации, содержащей адрес электронной почты.</span>
                            <span>Доверенность необходимо предъявить до принятия оплаты за проживание для оформления документов на организацию.</span>
                            <span>Документы высылаются в течение 5 рабочих дней после выезда гостей. При предоставлении фискального чека на физическое лицо, акты выполненных работ и счета-фактур не предоставляются.</span>
                        </div>
                        <div class="letter__number-base">
                            4
                        </div>
                    </div>

                    <div v-if="cancellationBooking" class="letter__block gap-2">
                        <span class="letter__block__title__h2">Условия отмены бронирования</span>
                        <span class="letter__block__text">Связаться со службой бронирования можно по номеру телефона: +7 495 215 10 95, +7 499 391 39 23 или E-mail: luxe-tourizm@mail.com</span>
                        <span class="letter__block__text">Для отмены бронирования перейдите по ссылке https://www.bookingmodule.ru/cancelation/?number-20210101-2122-839145123 и введите код отмены бронирования: VF23J</span>
                        <div class="letter__number-base">
                            5
                        </div>
                    </div>

                    <div v-if="sign" class="letter__block">
                        <span class="letter__block__title__h3" v-html="textSign"></span>
                        <div class="letter__number-base">
                            6
                        </div>
                    </div>

                </div>

            </div>

        </div>

        <div class="letter__number-1">
            1
        </div>
    
    </div>
</template>

<style lang="scss">

    @mixin button-container {
        @include df_ac;
        padding: 1.25rem;
        gap: 0.625rem;
        border: 0.0625rem solid $border-primary-transparent-8;
    }

    @mixin icon-button {
        cursor: pointer;
        width: 1.5rem;
        height: 1.5rem;
    }

    @mixin number-block {
        @include heading_3;
        @include df_ac_jcc;
        position: absolute;
        z-index: 10;
        width: 2.5625rem;
        height: 2.5625rem;
        background-color: $bg-inverse;
        border-radius: 0.5rem;
        color: $text-inverse;
    }

    .letter {
        max-width: 39.125rem;
        width: 100%;
        height: 54.625rem;
        position: fixed;
        bottom: 1rem;
        right: 3rem;
        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4rem;
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%);
            z-index: 50;
        }
        &__container {
            width: 100%;
            height: 100%;
            position: relative;
            overflow-y: scroll;
            overflow-x: hidden;
            scrollbar-width: none;
        }
        &__content {
            @include df_fdc;
            width: 100%;
            height: fit-content;
            padding: 1.5rem;
        }
        &__header {
            display: flex;
            gap: 1rem;
            &__img-container {
                width: 4.5rem;
                height: 4.5rem;
                border-radius: 0.5rem;
            }
            &__title-block {
                @include df_fdc;
                justify-content: center;
                &__name-hotel {
                    @include heading_2;
                    color: $text-inverse;
                }
                &__city {
                    @include strong_1;
                    color: $text-inverse;
                }
            }
            &__address {
                width: 100%;
                &__text {
                    @include text_2;
                    @include df_fdc;
                    gap: .25rem;
                    color: $text-inverse;
                    text-align: end;
                }
            }
        }
        &__content-mail {
            @include df_fdc;
            gap: 0.75rem;
            padding-top: 2.5rem;
            width: 100%;
        }
        &__block {
            @include df_fdc;
            gap: 1rem;
            position: relative;
            background-color: $bg-primary;
            padding: 2rem;
            border-radius: 0.5rem;
            &__title {
                &__h1 {
                    @include heading_1;
                    color: $text-primary;
                }
                &__h2 {
                    @include heading_2;
                    color: $text-primary;
                }
                &__h3 {
                    @include heading_3;
                    color: $text-primary;
                }
            }
            &__text {
                @include df_fdc;
                gap: 0.375rem;
                @include text_1;
                color: $text-primary;
            }
            &__header {
                @include df_fdc;
            }
            &__desc {
                @include text_1;
                color: $text-primary;
            }
            &__table {
                @include df_fdc;
                gap: 1rem;
                padding-top: 2rem;
                &__row {
                    @include grid(2, 1rem);
                }
                &__key {
                    @include text_1;
                    color: $text-primary-transparent-48;
                }
                &__value {
                    @include text_1;
                    color: $text-primary;
                }
                &__value-s1 {
                    @include strong_1;
                    color: $text-primary;
                }
                hr {
                    border: none;
                    height: 0.0625rem;
                    background-color: $border-primary-transparent-8;
                }
                &__result {
                    grid-column: span 2;
                    @include grid(2, 1rem);
                    &__key {
                        @include heading_2;
                        color: $text-primary;
                    }
                    &__value {
                        @include heading_2;
                        color: $text-primary;
                    }
                
                }
            }
            &__small-table {
                grid-column: span 2;
                @include df_fdc;
                gap: 0.5rem;
                &__row {
                    @include grid(2, 1rem);
                }
                &__key {
                    @include text_2;
                    color: $text-primary-transparent-48;
                    width: 100%;
                }
                &__value {
                    @include strong_2;
                    color: $text-primary;
                    width: 100%;
                }
            }
        }
        
        .gap-2 {
            gap: 2rem;
        }

        &__number-1 {
            @include number-block();
            left: -1.3125rem;
            top: -1.3125rem;
        }
        &__number-base {
            @include number-block();
            left: -1.3125rem;
            top: 1.3125rem;
        }
    }
</style>