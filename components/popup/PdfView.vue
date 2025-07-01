<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';


    const props = defineProps<{
        pdf: string,
    }>();
</script>

<template>
    <Popup name="Настройки модуля" fadeBottom>
        <template #header_description>
            <ElementLink color="accent">Распечатать</ElementLink>
            <ElementLink color="accent">Скачать в .pdf</ElementLink>
            <ElementLink color="accent">Экспорт в Word</ElementLink>
        </template>
        <div class="popup__info-block custom-scrollbar">
            <img :src="props.pdf" alt="pdf-image">
        </div>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        &::v-deep(.popup__header) {
            gap: 1.5rem;
        }
        &::v-deep(.popup__header__description) {
            @include df_ac;
            gap: 1.5rem;
        }
        &__info-block {
            @include df_fdc;
            height: 49rem;
            img {
                @include image_contain;
            }
        }
    }
</style>