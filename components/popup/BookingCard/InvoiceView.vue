<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';

    const props = defineProps<{
        pdf: string,
    }>();
</script>

<template>
    <Popup name="Просмотр счета" fadeBottom>
        <div class="popup__info-block custom-scrollbar">
            <img :src="props.pdf" alt="pdf-image">
        </div>
        <ElementButton size="large" name="button">
            Сохранить
        </ElementButton>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        &__info-block {
            display: flex;
            height: 54.3125rem;
            img {
                border-radius: .5rem;
                border: 1px solid $border-primary-transparent-8;
                @include image_contain;
            }
        }
    }
</style>