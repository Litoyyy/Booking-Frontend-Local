<script lang="ts" setup>
    import InfoCard from '~/layouts/components/InfoCard.vue';

    const props = defineProps<{
        title?: string,
        count?: number,
        capacity?: boolean
    }>();
</script>

<template>
    <InfoCard :title="props.title" size="basic">
        <div class="info-card__info-block">
            <span v-if="!capacity">{{ count }}</span>
            <span v-else>{{ count }}м²</span>
            <ElementLink 
            v-if="!capacity" 
            color="accent" 
            size="small">
                Создать ещё
            </ElementLink>
        </div>
    </InfoCard>
</template>

<style lang="scss" scoped>
    .info-card {
        &__info-block {
            display: flex;
            @include df_fdc;
            gap: .5rem;
            span {
                @include heading_1;
                color: $text-accent;
            }
        }
    }
</style>