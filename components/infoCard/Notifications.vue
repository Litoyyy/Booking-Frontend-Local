<script lang="ts" setup>
    import InfoCard from '~/layouts/components/InfoCard.vue';

    const props = defineProps<{
        filled?: boolean,
        res?: Object,
    }>();
</script>

<template>
    <InfoCard title="Уведомления" size="large" :filled="props.filled">
        <template #title>
            <ElementLink size="small" color="transparent">
                Очистить
            </ElementLink>
        </template>
        <div class="info-card__info-block custom-scrollbar" v-if="filled">
            <NotificationCard v-for="item in res"
            type="booking"
            :res="item"></NotificationCard>
        </div>

        <div class="info-card__info-block__empty-title" v-else>
            Тут пусто.
        </div>
    </InfoCard>
</template>

<style lang="scss" scoped>
    .info-card {
        &__info-block {
            max-height: 19.4375rem;
            overflow-y: auto;
            @include df_fdc;
            gap: .5rem;
            padding-right: .5rem;
            &__empty-title {
                @include df_ac_jcc;
                height: 17.9375rem;
                @include text_1;
                color: $text-primary-transparent-48;
            }
        }
        &[filled="true"] {
            padding-right: .5rem;
            padding-bottom: 0;
            &::v-deep(.info-card__title) {
                padding-right: 1rem;
            }
        }
    }
</style>