<script lang="ts" setup>
    import { answerOnQuest, type ReviewCard } from '~/composables/admin/questions/question';

    const { name, phone, email, question } = defineProps<ReviewCard>()
    
    const answer = ref<string>('')

    const handleInput = (event: Event) => {
        const target = event.target as HTMLInputElement
        answer.value = target.value
    }

    const copyText = async (text: string | number) => {
        await navigator.clipboard.writeText(text.toString())
    }
</script>

<template>
    <div class="card-container">
        
        <div class="card-container__info-user">

            <div class="card-container__info-user__container">
                <span class="card-container__info-user__title">{{ name }}</span>
                <div class="card-container__info-user__copy-block">
                    <CopyToClipboard v-if="phone"
                        :text="phone"
                    />
                    <CopyToClipboard v-if="email"
                        :text="email"
                    />
                </div>
            </div>

            <div class="card-container__svg-cont">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#2D3033" fill-opacity="0.32"/>
                </svg>
            </div>

        </div>
        
        <hr>
    
        <div class="card-container__question-block">
            <span class="card-container__question-block__question">
                {{ question }}
            </span>
        </div>
    
        <hr>

        <ElementInput 
            id="answer"
            name="answer"
            class="w-full"
            size='large'
            type='textarea'
            fakePlaceholder="Ответ на вопрос"
            :maxLength="300"
            :new-value="answer"
            :onInput="handleInput"
        />

        <ElementButton
            id="sendAnswer"
            name="sendAnswer"
            :disabled="answer.length === 0"
            @click="answerOnQuest(id)"
        >
            Отправить
        </ElementButton>

    </div>
</template>

<style lang="scss" scoped>
    .card-container {
        @include df_fdc;
        gap: 1.5rem;
        padding: 1.5rem;
        border-radius: 0.5rem;
        border: 0.0625rem solid $border-primary-subdued-8;
        &__info-user {
            width: 100%;
            @include df_jb;
            min-height: 4rem;
            &__title {
                @include heading_3;
                color: $text-primary;
            }
            &__copy-block {
                @include df_ac;
                gap: 1.5rem;
            }
            :deep(.copy-to-clipboard) {
                color: $text-primary-transparent-48;
            }
            &__container {
                @include df_fdc;
                gap: 0.25rem;
                width: 100%;
            }
        }

        &__question-block {
            width: 100%;
            height: 100%;
            &__question {
                @include text_1;
                color: $text-primary;
            }
        }

        &__svg-cont {
            @include df_ac_jcc;
            width: 1.5rem;
            height: 1.5rem;
        }
    }

    .w-full {
        width: 100%;
    }

    hr {
        border: 1px solid $border-primary-transparent-8;
        width: 100%;
        height: 1px;
    }
</style>