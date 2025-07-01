<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="Нераспределенные брони на 22 ноя 2024">
        <div class="popup__info-block">
            <TableUnallocated></TableUnallocated>
        </div>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        grid-column: span 12;
        &__info-block {
            @include df_fdc;
            gap: 1rem;
            &__item {
                @include df_ac;
                gap: 1rem;
                @include text_1;
                .key {
                    flex: 1;
                    color: $text-primary-transparent-48;
                }
                .value {
                    flex: 1;
                }
            }
        }
        &__form {
            @include grid(2, 1rem);
        }
    }
</style>