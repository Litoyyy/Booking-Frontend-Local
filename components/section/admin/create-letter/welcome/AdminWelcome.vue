<script lang="ts" setup>
    import TextEdit from '../TextEdit.vue';
    import { useDataLetter } from '~/composables/admin/letters/letterData';
    import { getMailWelcome } from '~/composables/admin/letters/letterData/welcomeMail';
    import { useChooseEmailNavigate, type EmailSendValue } from '~/composables/admin/letters/useEmailNavigate';

    const {
        keyValueWelcome,
    } = useDataLetter()

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
        textSign
    } = getMailWelcome()

    const {
        changeEmailTypeState
    } = useChooseEmailNavigate()

    const valueForChangeEmail: EmailSendValue = {
        route: true,
        visible: true,
        textDesc: 'Welcome письмо'
    }

</script>

<template>
    <div class="text-letter">
        <div class="text-letter__contianer">
            <div class="text-letter__header">
                <span class="section__title">2. Текстовая часть</span>
                <ElementToggle
                    id="text-letter-toggle"
                    :checked="textPart"
                    @change="textPart = !textPart"
                />
            </div>
            <div class="text-letter__appeal">
                <span class="text-letter__title">Обращение</span>
                <TextEdit
                    :key-value="keyValueWelcome" 
                    v-model="textAppeal"
                />
            </div>
            <div class="text-letter__greetings">
                <span class="text-letter__title">Текст приветствия</span>
                <TextEdit
                    :key-value="keyValueWelcome"
                    v-model="textGreetings"
                />
            </div>

        </div>
    </div>

    <hr class="hr-row">

    <div class="booking-details">
        <div class="booking-details__container">
            <div class="booking-details__header">
                <span class="section__title">3. Детали бронирования</span>
                <ElementToggle 
                    :checked="detailOfBooking"
                    @change="detailOfBooking = !detailOfBooking" />
            </div>
            <span class="booking-details__content">
                Информация о бронировании соответствует информации в подтверждении бронирования гостя и не может быть отредактирована в письме.                                
            </span>
        </div>
    </div>

    <hr class="hr-row">

    <div class="payment">
        <div class="payment__container">
            <div class="payment__header">
                <span class="section__title">4. Способ оплаты</span>
                <ElementToggle
                    :checked="peymentView"
                    @change="peymentView = !peymentView" />
            </div>
            <TextEdit 
                :key-value="keyValueWelcome" 
                v-model="textPayment"
            />
        </div>
    </div>

    <hr class="hr-row">

    <div class="booking-cond">
        <div class="booking-cond__container">
            <div class="booking-cond__header">
                <span class="section__title">5. Условия отмены бронирования</span>
                <ElementToggle
                    :checked="cancellationBooking"
                    @change="cancellationBooking = !cancellationBooking" />
            </div>
            <span class="booking-cond__content">
                Условия отмены формулируются автоматически, на основе правил отмены по выбранному тарифу.
            </span>
        </div>
    </div>

    <div class="sign">
        <div class="sign__container">
            <div class="sign__header">
                <span class="section__title">6. Подпись</span>
                <ElementToggle
                    :checked="sign"
                    @change="sign = !sign" />
            </div>
            <TextEdit
                :key-value="keyValueWelcome"
                v-model="textSign"
            />
        </div>
    </div>
    
    <div class="buttons-container">
        <ElementButton
            color='accent'
            size='large'
            @click="changeEmailTypeState(valueForChangeEmail)">
            Сохранить
        </ElementButton>

        <ElementButton
            color='transparent'
            size='large'>
            Отправить тестовое письмо
        </ElementButton>
    </div>
</template>

<style lang="scss"></style>