<script lang="ts" setup>
    import { useEmailColor } from '~/composables/admin/letters/letterColor';
    import { useDataLetter } from '~/composables/admin/letters/letterData';
    import { getMailGuest } from '~/composables/admin/letters/letterData/guestMail';

    const {
        activeColor
    } = useEmailColor()

    const {
        fromLetter
    } = useDataLetter()

    const {
        // Visible 
        textPart,
        detailOfBooking,
        comment,
        sign,
        // Text for TextEdit
        textAppeal,
        textGreetings,
        textComment,
        textSign
    } = getMailGuest()

</script>

<template>
    <div class="letter">
        <div class="letter__container">
            <div 
                class="letter__content"
                :style="{ backgroundColor: activeColor.color?.toString() ?? '#1C5BAD'}">
                
                <div class="letter__header">
                    <div class="letter__header__img-container">
                        <img src="/_nuxt/assets/images/logo_hotel.png" alt="">
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
                                <span class="letter__block__table__result__value">7 500 ₽</span>
                            </div>

                        </div>

                        <div class="letter__orange-button">
                            Завершить бронирование на сайте
                        </div>

                        <div class="letter__number-base">
                            3
                        </div>
                    </div>

                    <div v-if="comment" class="letter__block">
                        <span class="letter__block__title__h2">Комментарий</span>
                        <span 
                            v-html="textComment"
                            class="letter__block__text"></span>
                        <div class="letter__number-base">
                            4
                        </div>
                    </div>

                    <div v-if="sign" class="letter__block">
                        <span class="letter__block__title__h3" v-html="textSign"></span>
                        <div class="letter__number-base">
                            5
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
    
</style>