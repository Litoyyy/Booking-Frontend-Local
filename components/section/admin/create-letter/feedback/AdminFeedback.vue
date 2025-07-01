<script lang="ts" setup>
    
    import TextEdit from '../TextEdit.vue';

    import { useDataLetter } from '~/composables/admin/letters/letterData';
    import { getMailFeedback } from '~/composables/admin/letters/letterData/feedbackMail';
    import { useChooseEmailNavigate, type EmailSendValue } from '~/composables/admin/letters/useEmailNavigate';

    const {
        keyValueWelcome,
    } = useDataLetter()

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
    } = getMailFeedback()

    const {
        changeEmailTypeState
    } = useChooseEmailNavigate()

    const valueForChangeEmail: EmailSendValue = {
        route: true,
        visible: true,
        textDesc: 'Feedback-письмо'
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
                    @change="toggleBool('textPart')"
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
                <span class="section__title">3. Ссылка на анкету</span>
                <ElementToggle 
                    :checked="linkOnQuest"
                    @change="toggleBool('linkOnQuest')" />
            </div>
            <span class="booking-details__content">
                Генерируется автоматически
            </span>
        </div>
    </div>

    <hr class="hr-row">

    <div class="payment">
        <div class="payment__container">
            <div class="payment__header">
                <span class="section__title">4. Комментарий</span>
                <ElementToggle
                    :checked="comment"
                    @change="toggleBool('comment')" />
            </div>
            <TextEdit 
                :key-value="keyValueWelcome" 
                v-model="textComment"
            />
        </div>
    </div>

    <hr class="hr-row">

    <div class="sign">
        <div class="sign__container">
            <div class="sign__header">
                <span class="section__title">5. Подпись</span>
                <ElementToggle
                    :checked="sign"
                    @change="toggleBool('sign')" />
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

<style lang="scss">

</style>