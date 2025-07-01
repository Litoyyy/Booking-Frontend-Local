<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="Создать группу">
        <form class="popup__group-form">
            <div class="popup__group-form__label-block">
                <ElementInput 
                fake-placeholder="Название" 
                name="group_name"
                id="group_name"></ElementInput>
                <SelectDefault size="large"></SelectDefault>
            </div>
            <ElementButton size="large">
                Создать
            </ElementButton>
        </form>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        &__group-form {
            @include df_fdc;
            gap: 2rem;
            &__label-block {
                @include df_fdc;
                gap: 1rem;
            }
        }
    }
</style>