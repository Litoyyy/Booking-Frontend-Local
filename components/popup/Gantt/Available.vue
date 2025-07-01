<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="11 ноя 2024, занято номеров: 13">
        <div class="popup__info-block">
            <TableAvailable></TableAvailable>
        </div>
        <ElementCheckbox>
            Показывать только категории, в которых есть свободные номера
        </ElementCheckbox>
        <ElementLink color="subaccent">
            XLSX Экспорт
        </ElementLink>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        grid-column: span 10;
        &__info-block {
            .table {
                width: 100%;
            }
        }
        .link {
            width: fit-content;
        }
    }
</style>