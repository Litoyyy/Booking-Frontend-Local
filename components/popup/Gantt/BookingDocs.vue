<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="Документы" description="№ брони 20241120-1524-308251917">
        <div class="popup__info-block">
            <ElementLink color="accent">Счет гостиницы 308251917-01</ElementLink>
            <ElementLink color="accent">Гостевой ваучер</ElementLink>
            <ElementLink color="accent">Анкета гостя, Димитрова Виктория Александровна</ElementLink>
        </div>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        &::v-deep(.popup__header__description) {
            color: $text-primary-transparent-48;
        }
        &__info-block {
            @include df_fdc;
            gap: 1rem;
        }
    }
</style>