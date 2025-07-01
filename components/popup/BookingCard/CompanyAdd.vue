<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="Компания-заказчик">
        <form class="popup__form">
            <ElementInput fake-placeholder="Название компании"
            id="booking-card-company-add-company-name"
            name="company_name"></ElementInput>
            <ElementInput fake-placeholder="ИНН"
            id="booking-card-company-add-inn"
            name="inn"></ElementInput>
            <ElementInput fake-placeholder="Фамилия"
            id="booking-card-company-add-last-name"
            name="last_name"></ElementInput>
            <ElementInput fake-placeholder="Имя"
            id="booking-card-company-add-first-name"
            name="first_name"></ElementInput>
            <ElementInput fake-placeholder="Отчество"
            id="booking-card-company-add-sur-name"
            name="sur_name"></ElementInput>
            <ElementInput fake-placeholder="Телефон компании"
            id="booking-card-company-add-company-phone"
            name="phone"></ElementInput>
            <ElementInput fake-placeholder="E-mail компании"
            id="booking-card-company-add-company-email"
            name="email"></ElementInput>
            <ElementInput fake-placeholder="Факс компании"
            id="booking-card-company-add-company-fax"
            name="fax"></ElementInput>
        </form>
        <ElementButton size="large">
            Добавить
        </ElementButton>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        &__form {
            @include grid(2, 1rem);
        }
    }
</style>