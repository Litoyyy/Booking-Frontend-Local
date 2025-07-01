<script lang="ts" setup>
    import BottomSheet from '~/layouts/components/BottomSheet.vue';
    const props = defineProps<{
        res: {
            title: string,
            period: string,
            guests: string,
            tariff: string,
            services: Array<any>
        }
    }>();
</script>

<template>
    <BottomSheet inset>
        <div class="bottom-sheet__content">
            <div class="bottom-sheet__content__item">
                <span class="light">Номер</span>
                {{ res.title }}
            </div>
            <div class="bottom-sheet__content__item">
                <span class="light">Период</span>
                {{ res.period }}
            </div>
            <div class="bottom-sheet__content__item">
                <span class="light">Гости</span>
                {{ res.guests }}
            </div>
            <div class="bottom-sheet__content__item">
                <span class="light">Тариф</span>
                {{ res.tariff }}
            </div>
            <div class="bottom-sheet__content__item">
                <span class="light">Доп. услуги</span>
                <span>
                    <span v-for="(service, index) in res.services" v-if="res.services.length > 0">
                        {{ index === 0 ? service.title : `, ${service.title}` }}
                    </span>
                    <span v-else>
                        Не выбрано
                    </span>
                </span>
            </div>
        </div>
    </BottomSheet>
</template>

<style lang="scss" scoped>
    .bottom-sheet {
        &__content {
            @include df_fdc;
            gap: 1rem;
            padding: 1.5rem;
            padding-top: .75rem;
            &__item {
                @include df_fdc;
                @include text_1;
                .light {
                    @include text_2;
                    color: $text-primary-transparent-48;
                }
            }
        }
    }
</style>