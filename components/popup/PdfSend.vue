<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';


    const props = defineProps<{
        name: string,
        email: string
    }>();
</script>

<template>
    <Popup name="Отправить ваучер">
        <div class="popup__info-block">
            {{ name }}, <a :href="`mailto:${email}`">{{ email }}</a>
        </div>
        <ElementButton size="large">
            Отправить
        </ElementButton>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        &__info-block {
            @include text_1;
            a {
                color: $text_accent;
            }
        }
    }
</style>