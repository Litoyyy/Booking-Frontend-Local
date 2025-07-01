<script lang="ts" setup>
    const props = defineProps<{
        res?: Object,
        type?: 'personal' | 'general' | 'popup' | 'number_card'
    }>();
</script>

<template>
    <div class="testimonial-card" :type="props.type || 'general'">
        <div class="testimonial-card__container">
            <div class="testimonial-card__header">
                <span v-if="type !== 'personal'">{{ res.name }}</span>
                <ElementLink size="small" v-if="type !== 'popup' && props.type !== 'number_card'">
                    {{ res.id }}
                </ElementLink>
            </div>
            <div class="testimonial-card__body">
                {{ res.text }}
            </div>
            <div class="testimonial-card__footer">
                <div class="testimonial-card__footer__rating">
                    {{ res.rating }}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.00056 12.173L3.29826 14.8051L4.34848 9.51961L0.39209 5.86087L5.74345 5.22638L8.00056 0.333008L10.2576 5.22638L15.609 5.86087L11.6526 9.51961L12.7028 14.8051L8.00056 12.173Z" fill="#E68F6F"/>
                    </svg>
                </div>
                <span>{{ res.date }}</span>
            </div>
        </div>
        <ElementIconButton size="small" color="transparent-secondary" v-if="type !== 'popup' && props.type !== 'number_card'">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.0002 2.5C9.0835 2.5 8.3335 3.25 8.3335 4.16667C8.3335 5.08333 9.0835 5.83333 10.0002 5.83333C10.9168 5.83333 11.6668 5.08333 11.6668 4.16667C11.6668 3.25 10.9168 2.5 10.0002 2.5ZM10.0002 14.1667C9.0835 14.1667 8.3335 14.9167 8.3335 15.8333C8.3335 16.75 9.0835 17.5 10.0002 17.5C10.9168 17.5 11.6668 16.75 11.6668 15.8333C11.6668 14.9167 10.9168 14.1667 10.0002 14.1667ZM10.0002 8.33333C9.0835 8.33333 8.3335 9.08333 8.3335 10C8.3335 10.9167 9.0835 11.6667 10.0002 11.6667C10.9168 11.6667 11.6668 10.9167 11.6668 10C11.6668 9.08333 10.9168 8.33333 10.0002 8.33333Z" fill="#2D3033" fill-opacity="0.32"/>
            </svg>
        </ElementIconButton>
    </div>
</template>

<style lang="scss">
    .testimonial-card {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 1.5rem;
        background-color: $bg-primary;
        border-radius: .5rem;
        &__container {
            @include df_fdc;
            gap: 1.5rem;
        }
        &__header {
            @include df_fdc;
            gap: .25rem;
            span {
                @include strong_1;
            }
        }
        &__body {
            @include text_1;
        }
        &__footer {
            @include df_ac;
            gap: 1rem;
            span {
                @include text_2;
                color: $text-primary-transparent-48;
            }
            &__rating {
                @include df_ac;
                gap: .25rem;
                @include text_2;
                svg {
                    max-height: 1rem;
                    aspect-ratio: 1;
                    @include wh-100;
                }
            }
        }
        &[type="number_card"] {
            border: .063rem solid $border-primary-transparent-8;
            gap: 1rem;
            .testimonial-card__header {
                span {
                    @include strong_2;
                }
            }
            .testimonial-card__body {
                @include text_2;
            }
        }
        &[type="popup"] {
            background-color: unset;
        }
    }
</style>