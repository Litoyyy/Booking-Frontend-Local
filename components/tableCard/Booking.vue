<script lang="ts" setup>
    import TableCard from '~/layouts/components/TableCard.vue';

    const props = defineProps<{
        res: Object,
    }>();
</script>

<template>
    <TableCard>
        <template #header_title>
            <div class="table-card__header-title-block">
                {{ res.id }}
                <span v-if="res.state === 'new'" :data-state="res.state">Новая</span>
                <span v-else-if="res.state === 'decline'" :data-state="res.state">Отказано</span>
                <span v-else-if="res.state === 'confirm'" :data-state="res.state">Подтверждена</span>
            </div>
        </template>
        <div class="table-card__name">
            {{ res.guest }}
        </div>
        <div class="table-card__contacts">
            <div class="table-card__contacts__item">
                {{ res.phone }}
                <ElementIconButton size="micro" color="transparent-secondary" :ghost="true">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.83317 5.00033V2.50033C5.83317 2.04009 6.20627 1.66699 6.6665 1.66699H16.6665C17.1267 1.66699 17.4998 2.04009 17.4998 2.50033V14.167C17.4998 14.6272 17.1267 15.0003 16.6665 15.0003H14.1665V17.4996C14.1665 17.9602 13.7916 18.3337 13.3275 18.3337H3.33888C2.87549 18.3337 2.5 17.9632 2.5 17.4996L2.50217 5.83438C2.50225 5.37375 2.8772 5.00033 3.34118 5.00033H5.83317ZM7.49983 5.00033H14.1665V13.3337H15.8332V3.33366H7.49983V5.00033Z" fill="#2D3033" fill-opacity="0.32"/>
                    </svg>
                </ElementIconButton>
            </div>
            <div class="table-card__contacts__item">
                {{ res.email }}
                <ElementIconButton size="micro" color="transparent-secondary" :ghost="true">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.83317 5.00033V2.50033C5.83317 2.04009 6.20627 1.66699 6.6665 1.66699H16.6665C17.1267 1.66699 17.4998 2.04009 17.4998 2.50033V14.167C17.4998 14.6272 17.1267 15.0003 16.6665 15.0003H14.1665V17.4996C14.1665 17.9602 13.7916 18.3337 13.3275 18.3337H3.33888C2.87549 18.3337 2.5 17.9632 2.5 17.4996L2.50217 5.83438C2.50225 5.37375 2.8772 5.00033 3.34118 5.00033H5.83317ZM7.49983 5.00033H14.1665V13.3337H15.8332V3.33366H7.49983V5.00033Z" fill="#2D3033" fill-opacity="0.32"/>
                    </svg>
                </ElementIconButton>
            </div>
        </div>
        <div class="table-card__info-block">
            {{ res.room.title }}
            <span>{{ res.period }}</span>
        </div>
        <div class="table-card__services" v-if="res.services && res.services.length > 0">
            <span v-for="service in res.services">{{ service.title }} <br></span>
        </div>
        <div class="table-card__services" v-else>
            <span>-</span>
        </div>
        <div class="table-card__price-block">
            11 400 ₽
            <ElementIconButton size="small" color="transparent">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 11.5V5.5H13V11.5H19V13.5H13V19.5H11V13.5H5V11.5H11Z" fill="#1C5BAD"/>
                </svg>
            </ElementIconButton>
        </div>
        <div class="table-card__button-block" v-if="res.state === 'new'">
            <ElementIconButton color="positive">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.6663 17.6995L22.3908 6.9751L24.0407 8.62501L11.6663 20.9993L4.2417 13.5748L5.89162 11.9249L11.6663 17.6995Z" fill="white"/>
                </svg>
            </ElementIconButton>
            <ElementIconButton color="negative">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.9998 12.3509L19.7746 6.57617L21.4245 8.22608L15.6497 14.0008L21.4245 19.7755L19.7746 21.4254L13.9998 15.6507L8.22512 21.4254L6.5752 19.7755L12.3499 14.0008L6.5752 8.22608L8.22512 6.57617L13.9998 12.3509Z" fill="white"/>
                </svg>
            </ElementIconButton>
        </div>
    </TableCard>
</template>

<style lang="scss" scoped>
    .table-card {
        position: relative;
        &__header-title-block {
            @include df_fdc;
            gap: .25rem;
            @include text_1;
            span {
                [data-state="new"] {
                    color: $text-system-positive;
                }
                [data-state="decline"] {
                    color: $text-system-negative;
                }
                [data-state="confirm"] {
                    color: $text-primary-transparent-48;
                }
            }
        }
        &__contacts {
            @include df_fdc;
            &__item {
                @include df_ac;
                gap: .5rem;
                @include text_1;
                color: $text-primary-transparent-48;
            }
        }
        &__info-block {
            @include df_fdc;
            @include text_1;
            color: $text-primary-transparent-48;
        }
        &__services {
            color: $text-primary-transparent-48;
            height: 100%;
        }
        &__price-block {
            @include df_ac;
            gap: .5rem;
            @include heading_3;
        }
        &__button-block {
            position: absolute;
            right: 0;
            bottom: 0;
            @include df_ac;
            gap: .75rem;
            padding: 1rem;
            border-radius: .5rem 0 0 0;
            border-top: 1px solid $border-primary-subdued-4;
            border-left: 1px solid $border-primary-subdued-4;
        }
    }
</style>