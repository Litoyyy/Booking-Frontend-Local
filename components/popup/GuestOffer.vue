<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="В базе найдены похожие гости" description="Вы можете выбрать одного из них">
        <div class="popup__info-block">
            <GuestCard state="offer"></GuestCard>
            <GuestCard state="offer"></GuestCard>
        </div>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        padding: 2rem;
        &::v-deep(.popup__header) {
            gap: .25rem;
            .popup__header__name {
                @include heading_3;
            }
        }
        &__info-block {
            @include df_fdc;
            gap: .5rem;
        }
    }
</style>