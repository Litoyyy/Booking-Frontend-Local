<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="Выбрать плательщика для счета 310502924-01">
        <form class="popup__form">
            <SelectDefault
            fake-placeholder="Плательщик"
            id="booking-card-payer-payer"
            name="payer">
            </SelectDefault>
        </form>
        <ElementButton size="large" name="button">
            Сохранить
        </ElementButton>
    </Popup>
</template>