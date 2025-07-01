<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="11 ноя 2024, занято номеров: 13">
        <div class="popup__info-block">
            <TableArrivals></TableArrivals>
        </div>
        <ElementLink color="subaccent">
            XLSX Экспорт
        </ElementLink>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        grid-column: span 11;
        .link {
            width: fit-content;
        }
    }
</style>