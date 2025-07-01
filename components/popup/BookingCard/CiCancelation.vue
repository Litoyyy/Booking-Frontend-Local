<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="Отменить заселение гостя" description="№ брони 20241120-1524-308251917">
        <form class="popup__form">
            <ElementInput fake-placeholder="Причина отмены заселения"
            type="textarea"
            :max-length="300"
            id="booking-card-ci-cancelation-cause"
            name="cause"></ElementInput>
        </form>
        <ElementButton size="large" name="button">
            Применить
        </ElementButton>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        &::v-deep(.popup__header__description) {
            color: $text-primary-transparent-48;
        }
        &__form {
            @include df_fdc;
            gap: 1rem;
        }
    }
</style>