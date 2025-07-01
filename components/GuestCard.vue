<script lang="ts" setup>
    const props = defineProps<{
        state?: 'offer' | 'static',
        res?: Object,
    }>();
</script>

<template>
    <label class="guest-card" :status="props.state || 'static'" id="guest_card_id">
        <ElementRadio id="guest_card_id" name="guest_card_id" v-if="state === 'offer' || props.state"></ElementRadio>
        <div class="guest-card__container">
            <div class="guest-card__name">
                <span>{{ res.name }}</span>
                <ElementIconButton size="small" color="transparent-secondary" v-if="state === 'static' || !props.state">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.0002 2.5C9.0835 2.5 8.3335 3.25 8.3335 4.16667C8.3335 5.08333 9.0835 5.83333 10.0002 5.83333C10.9168 5.83333 11.6668 5.08333 11.6668 4.16667C11.6668 3.25 10.9168 2.5 10.0002 2.5ZM10.0002 14.1667C9.0835 14.1667 8.3335 14.9167 8.3335 15.8333C8.3335 16.75 9.0835 17.5 10.0002 17.5C10.9168 17.5 11.6668 16.75 11.6668 15.8333C11.6668 14.9167 10.9168 14.1667 10.0002 14.1667ZM10.0002 8.33333C9.0835 8.33333 8.3335 9.08333 8.3335 10C8.3335 10.9167 9.0835 11.6667 10.0002 11.6667C10.9168 11.6667 11.6668 10.9167 11.6668 10C11.6668 9.08333 10.9168 8.33333 10.0002 8.33333Z" fill="#2D3033" fill-opacity="0.32"/>
                    </svg>
                </ElementIconButton>
            </div>
            <div class="guest-card__info-block">
                <div class="guest-card__contact-block">
                    <div class="guest-card__contact-block__info">
                        {{ res.phone }}
                        <ElementIconButton size="small" color="transparent-secondary">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.83317 5.00033V2.50033C5.83317 2.04009 6.20627 1.66699 6.6665 1.66699H16.6665C17.1267 1.66699 17.4998 2.04009 17.4998 2.50033V14.167C17.4998 14.6272 17.1267 15.0003 16.6665 15.0003H14.1665V17.4996C14.1665 17.9602 13.7916 18.3337 13.3275 18.3337H3.33888C2.87549 18.3337 2.5 17.9632 2.5 17.4996L2.50217 5.83438C2.50225 5.37375 2.8772 5.00033 3.34118 5.00033H5.83317ZM7.49983 5.00033H14.1665V13.3337H15.8332V3.33366H7.49983V5.00033Z" fill="#2D3033" fill-opacity="0.32"/>
                            </svg>
                        </ElementIconButton>
                    </div>
                    <div class="guest-card__contact-block__info">
                        {{ res.email }}
                        <ElementIconButton size="small" color="transparent-secondary">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.83317 5.00033V2.50033C5.83317 2.04009 6.20627 1.66699 6.6665 1.66699H16.6665C17.1267 1.66699 17.4998 2.04009 17.4998 2.50033V14.167C17.4998 14.6272 17.1267 15.0003 16.6665 15.0003H14.1665V17.4996C14.1665 17.9602 13.7916 18.3337 13.3275 18.3337H3.33888C2.87549 18.3337 2.5 17.9632 2.5 17.4996L2.50217 5.83438C2.50225 5.37375 2.8772 5.00033 3.34118 5.00033H5.83317ZM7.49983 5.00033H14.1665V13.3337H15.8332V3.33366H7.49983V5.00033Z" fill="#2D3033" fill-opacity="0.32"/>
                            </svg>
                        </ElementIconButton>
                    </div>
                </div>
                <div class="guest-card__status-block">
                    <div class="guest-card__status-block__info">
                        {{ res.birthday }}
                    </div>
                    <div class="guest-card__status-block__info">
                        Сегмент: {{ res.status }}
                    </div>
                </div>
            </div>
        </div>
    </label>
</template>

<style lang="scss">
    .guest-card {
        background-color: $bg-inverse-transparent-4;
        border-radius: .5rem;
        padding: 1rem;
        @include df_ac;
        gap: 1.5rem;
        cursor: pointer;
        &__container {
            @include df_fdc;
            gap: 1rem;
            width: 100%;
        }
        &__name {
            @include df_jb_ac;
            @include strong_1;
        }
        &__info-block {
            display: flex;
            gap: 1rem;
        }
        &__contact-block {
            flex: 1;
            &__info {
                @include df_ac;
                gap: .5rem;
                @include text_1;
            }
        }
        &__status-block {
            flex: 1;
            &__info {
                @include text_1;
                color: $text-primary-transparent-48;
            }
        }
        &:hover {
            .custom-radio-label {
                &::before {
                    background-color: $bg-inverse-transparent-16;
                }
            }
        }
        &:has(input:checked) {
            .custom-radio-label {
                &::before {
                    background-color: $bg-subaccent;
                }
            }
        }
    }
</style>