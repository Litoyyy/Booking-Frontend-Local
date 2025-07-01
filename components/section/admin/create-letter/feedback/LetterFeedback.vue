<script lang="ts" setup>
    import { useEmailColor } from '~/composables/admin/letters/letterColor';
    import { useDataLetter } from '~/composables/admin/letters/letterData';
    import { getMailFeedback } from '~/composables/admin/letters/letterData/feedbackMail';

    const { 
        activeColor
    } = useEmailColor()

    const {
        // Visible blocks
        textPart,
        linkOnQuest,
        comment,
        sign,
        // String for TextEdit
        textAppeal,
        textGreetings,
        textComment,
        textSign,
        // Switch fun
        toggleBool,
        // Components
        letter: LetterFeedback,
        admin: AdminFeedback
    } = getMailFeedback()

    const {
        fromLetter
    } = useDataLetter()
</script>

<template>
    <div class="letter">
        <div class="letter__container">
            <div 
                class="letter__content"
                :style="{ backgroundColor: activeColor.color?.toString() ?? '#1C5BAD'}">
                
                <div class="letter__header">
                    <div class="letter__header__img-container">
                        <img src="/images/logo_hotel.png" alt="">
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
                        
                        <a v-if="linkOnQuest" href="#" class="letter__link">Перейти к анкете гостя</a>

                        <div class="letter__number-base">
                            2
                        </div>

                        <div v-if="linkOnQuest" class="letter__number-link">
                            3
                        </div>

                    </div>

                    <div class="letter__block">
                        
                        <span 
                            class="letter__text" 
                            v-html="textComment"></span>

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