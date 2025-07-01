<script lang="ts" setup>
    import InfoCard from '~/layouts/components/InfoCard.vue';

    const props = defineProps<{
        title?: string,
        info_title?: string,
        description?: string,
        subaccent?: boolean
    }>();
</script>

<template>
    <InfoCard :title="props.title" size="basic">
        <div class="info-card__info-block" :subaccent="props.subaccent">
            <span>{{ info_title }}</span>
            {{ description }}
        </div>
    </InfoCard>
</template>

<style lang="scss" scoped>
    .info-card {
        overflow: hidden;
        &__info-block {
            @include df_fdc;
            @include text_2;
            span {
                @include heading_1;
                color: $text-accent;
            }
            &[subaccent="true"] {
                color: $text-primary-transparent-48;
                span {
                    color: $text-subaccent;
                }
            }
        }
    }
</style>