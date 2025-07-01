<script lang="ts" setup>
import Popup from '~/layouts/components/Popup.vue';

    const props = defineProps<{
        deleteItem?: string
    }>();
</script>

<template>
    <Popup name="Сохранить изменения?" :description="props.deleteItem">
        <span>Вы покидаете страницу не сохранив внесенные изменения.</span>
        <div class="popup__button-block">
            <ElementButton size="large">Сохранить</ElementButton>
            <ElementButton size="large" color="transparent">Не сохранять</ElementButton>
        </div>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        span {
            @include text_1;
            color: $text-primary-transparent-48;
        }
        &__button-block {
            @include df_ac;
            gap: 1rem;
        }
    }
</style>