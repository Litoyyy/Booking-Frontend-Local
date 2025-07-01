<script lang="ts" setup>
import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="Задать вопрос">
        <form class="popup__question-form">
            <ElementInput fake-placeholder="Имя"
            name="first_name"
            id="popup-question-first-name"></ElementInput>
            <ElementInput fake-placeholder="Номер телефона"
            name="phone"
            id="popup-question-phone"></ElementInput>
            <ElementInput fake-placeholder="E-mail"
            name="email"
            id="popup-question-email"></ElementInput>
            <ElementInput fake-placeholder="Вопрос" 
            type="textarea"
            name="question"
            id="popup-question-question"
            :max-length="300"></ElementInput>

            <ElementButton name="button" color="accent" size="large">
                Отправить
            </ElementButton>
        </form>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        &__question-form {
            @include grid(2, 1rem);
            .field {
                &:first-of-type {
                    grid-column: span 2;
                }
                &:last-of-type {
                    grid-column: span 2;
                }
            }
        }
    }
</style>