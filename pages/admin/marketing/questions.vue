<script lang="ts" setup>
    import CardReview from '~/components/section/admin/questions/CardReview.vue';
    import { reviews } from '~/composables/admin/questions/question'

    definePageMeta({
        isAdmin: true,
    })

    const previewSend = ref<boolean>(false)

    const sortBy = reactive<string[]>(['По дате'])
    const regions = reactive<string[]>(['Все'])


    watch(
        () => reviews,
        (newVal) => {
            previewSend.value = true
            setTimeout(() => {
                previewSend.value = false
            }, 5000)
        },
        { deep: true }
    )
</script>

<template>
    <main>
        <section>
            <div class="container-questions">
                <div class="container-questions__info-block">
                    <div class="container-questions__title-container">
                        <span class="container-questions__info-block__title-container__text">Вопросы гостей</span>
                        <ElementPopover>Info</ElementPopover>
                    </div>
                    <ElementInput 
                        name="search"
                        id="search"
                        type='text'
                        size="large"
                        placeholder="Поиск по ФИО, конкретному слову…"
                        class="w-616"
                    />
                    <div class="container-questions__filters-container">
                        <div class="container-questions__filters-container__filter">
                            <span class="container-questions__filters-container__title">Сортировка: </span>
                            <Dropdown
                                menu-side='right'>
                                <template #header>
                                    <ElementLink
                                        color="neutral"
                                        chevron="right"
                                    >
                                        По дате
                                    </ElementLink>
                                </template>
                                <ElementOption 
                                    v-for="(item, index) in sortBy"
                                    :key="index">
                                    {{ item }}
                                </ElementOption>
                            </Dropdown>
                        </div>
                        <div class="container-questions__filters-container__filter">
                            <span class="container-questions__filters-container__title">Регион: </span>

                            <Dropdown
                                menu-side='right'>
                                <template #header>
                                    <ElementLink
                                        color="neutral"
                                        chevron="right"
                                    >
                                        Все
                                    </ElementLink>
                                </template>
                                <ElementOption 
                                    v-for="(item, index) in regions"
                                    :key="index">
                                    {{ item }}
                                </ElementOption>
                            </Dropdown>
                        </div>
                        <span class="container-questions__filters-container__title">Сбросить</span>
                    </div>
                </div>
                <div class="container-questions__cards">
                    <template
                        v-for="item in reviews" 
                        :key="item.id">
                        <CardReview
                            v-if="!item.answer"
                            :id="item.id"
                            :name="item.name"
                            :phone="item.phone"
                            :email="item.email"
                            :question="item.question"
                            :answer="item.answer" 
                        />
                    </template>
                </div>
            </div>
        </section>
        <Dialog 
            color='inverse'
            drawLine
            title="Ответ отправлен"
            description="Письмо с ответом от представителя отеля отправлено на указанный гостем E-mail"
            :visible="previewSend"
        />
    </main>
</template>

<style lang="scss">
    .container-questions {
        @include df_fdc;
        gap: 3rem;
        padding: 1.5rem 2.25rem;
        &__info-block {
            @include df_fdc;
            gap: 1.5rem;
        }
        &__title-container {
            @include df_ac;
            gap: 0.25rem;
            &__text {
                @include heading_1;
                color: $text-primary;
            }
        }
        &__filters-container {
            @include df_ac;
            gap: 1.5rem;
            &__filter {
                @include df_ac;
                gap: 0.5rem;
            }
            &__title {
                @include text_1;
                color: $text-primary-transparent-48;
            }
        }
        &__cards {
            @include grid(2, 1rem);
        }
    }

    .w-616 {
        max-width: 38.5rem;
    }
</style>