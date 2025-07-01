<script lang="ts" setup>
    import TableCard from '~/layouts/components/TableCard.vue';

    const props = defineProps<{
        complete?: boolean
    }>();
</script>

<template>
    <TableCard draggable>
        <template #header_title>
            <div class="table-card__name">
                Владимир
                <div class="table-card__contact-item">
                    +7 495 390 30 20
                    <ElementIconButton size="micro" color="transparent-secondary" :ghost="true">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.83317 5.00033V2.50033C5.83317 2.04009 6.20627 1.66699 6.6665 1.66699H16.6665C17.1267 1.66699 17.4998 2.04009 17.4998 2.50033V14.167C17.4998 14.6272 17.1267 15.0003 16.6665 15.0003H14.1665V17.4996C14.1665 17.9602 13.7916 18.3337 13.3275 18.3337H3.33888C2.87549 18.3337 2.5 17.9632 2.5 17.4996L2.50217 5.83438C2.50225 5.37375 2.8772 5.00033 3.34118 5.00033H5.83317ZM7.49983 5.00033H14.1665V13.3337H15.8332V3.33366H7.49983V5.00033Z" fill="#2D3033" fill-opacity="0.32"/>
                        </svg>
                    </ElementIconButton>
                </div>
                <div class="table-card__contact-item">
                    ermolaev@gmail.com
                    <ElementIconButton size="micro" color="transparent-secondary" :ghost="true">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.83317 5.00033V2.50033C5.83317 2.04009 6.20627 1.66699 6.6665 1.66699H16.6665C17.1267 1.66699 17.4998 2.04009 17.4998 2.50033V14.167C17.4998 14.6272 17.1267 15.0003 16.6665 15.0003H14.1665V17.4996C14.1665 17.9602 13.7916 18.3337 13.3275 18.3337H3.33888C2.87549 18.3337 2.5 17.9632 2.5 17.4996L2.50217 5.83438C2.50225 5.37375 2.8772 5.00033 3.34118 5.00033H5.83317ZM7.49983 5.00033H14.1665V13.3337H15.8332V3.33366H7.49983V5.00033Z" fill="#2D3033" fill-opacity="0.32"/>
                        </svg>
                    </ElementIconButton>
                </div>
            </div>
        </template>
        <hr>
        <div class="table-card__question">
            <span v-if="props.complete">Вопрос</span>
            Добрый день! Подскажите, есть ли у Вашего отеля льготные тарифы?
        </div>
        <hr>
        <div class="table-card__answer" v-if="props.complete">
            <span>Ответ от Lead-Admin, 22.10.2024</span>
            Добрый день, у нашего отеля есть льготные тарифы.
        </div>
        <form class="table-card__form" v-if="!props.complete">
            <ElementInput 
            type="textarea" 
            fake-placeholder="Ответ на вопрос" 
            :max-length="300"
            name="question_textarea"
            id="question_textarea"></ElementInput>
            <ElementButton :disabled="true" size="large">
                Отправить
            </ElementButton>
        </form>
        <div class="table-card__closed" v-else>
            Вопрос закрыт.
        </div>
    </TableCard>
</template>

<style lang="scss" scoped>
    .table-card {
        &__name {
            @include df_fdc;
            gap: .25rem;
        }
        &__contact-item {
            @include df_ac;
            gap: .5rem;
            @include text_1;
            color: $text-primary-transparent-48;
        }
        .table-card__question,
        .table-card__answer {
            @include df_fdc;
            @include text_1;
            span {
                @include text_2;
                color: $text-primary-transparent-48;
            }
        }
        &__form {
            @include df_fdc;
            gap: 1.5rem;
        }
        hr {
            border: 0;
            border-bottom: 1px solid $border-primary-transparent-8;
        }
        &__closed {
            @include text_1;
            color: $text-system-positive;
        }
    }
</style>