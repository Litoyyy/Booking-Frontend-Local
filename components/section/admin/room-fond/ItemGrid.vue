<script lang="ts" setup>
    import type { GetRoom } from '~/composables/admin/room-fond/rooms';

    const props = defineProps<{
        res: GetRoom,
    }>();


</script>

<template>
    <div class="card-info-room">
        <div class="card-info-room__header">
            <span class="card-info-room__title">{{ res.number }}</span>
            <ElementIconButton
                    size="small"
                    color="transparent-secondary"
                    disabled
                    ghost
                >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#2D3033" fill-opacity="0.32"/>
                </svg>
            </ElementIconButton>
        </div>
        <div class="card-info-room__info">
            <span class="card-info-room__info__text">{{ res.categoryRoom }}</span>
            <span class="card-info-room__info__text">{{ res.frame }}</span>
            <span class="card-info-room__info__text">{{ res.floor }} этаж</span>
        </div>
        <span class="card-info-room__comment">
            {{ res.comment }}
        </span>
    </div>
</template>

<style lang="scss">
    .card-info-room {
        @include df_fdc;
        gap: 1.5rem;
        padding: 1.5rem;
        border: 0.0625rem solid $border-primary-subdued-8;
        border-radius: 0.5rem;
        &__header {
            @include df_jb_ac;
        }
        &__title {
            @include heading_3;
        }
        &__info {
            @include df_fdc;
            &__text {
                @include text_1;
                color: $text-primary-transparent-48;
            }
        }
        &__comment {
            @include text_1;
            color: $text-primary-transparent-48;
        }
    }
</style>