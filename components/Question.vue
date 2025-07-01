<script lang="ts" setup>

    const props = defineProps<{
        name: string,
        link: string,
        answer: string
    }>();
</script>
с
<template>
    <div>
        <ElementAccordion class="question-item"
        :title="props.name">
            <template #icon>
                <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.9998 15.8665L19.7745 10.0918L21.4244 11.7417L13.9998 19.1664L6.5752 11.7417L8.22511 10.0918L13.9998 15.8665Z" fill="#2D3033" fill-opacity="0.48"/>
                </svg>
            </template>
            <span>
                {{ props.answer }}
            </span>
            <ElementLink color="accent">Попа</ElementLink>
        </ElementAccordion>
    </div>
</template>

<style lang="scss" scoped>
    .question-item {
        padding: 1.5rem;
        border-radius: .5rem;
        background-color: $bg-inverse-subdued-4;
        @include transition(background-color);
        :deep(.question-item__header) {
            @include heading_3;
            @include df_jb_ac;

            .link {
                @include heading_3;
                @include df_jb_ac;
                flex-direction: row-reverse;
                width: 100%;
                color: $text-primary;
            }
        }

        :deep(.question-item__content) {
            @include text_1;
            @include df_fdc;
            gap: 1rem;
            padding-top: 1rem;
        }
        &:hover {
            background-color: $bg-inverse-subdued-8;
        }
    }
</style>