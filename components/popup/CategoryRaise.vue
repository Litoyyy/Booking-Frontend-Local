<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="Повысить категорию">
        <div class="popup__info-block">
            <!-- <CatalogCard view="vertical"></CatalogCard>
            <CatalogCard view="vertical"></CatalogCard> -->
        </div>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        &__info-block {
            @include grid(2, 1rem);
            .catalog-card {
                grid-column: span 1;
            }
        }
    }
</style>