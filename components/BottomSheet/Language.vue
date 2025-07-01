<script lang="ts" setup>
    import BottomSheet from '~/layouts/components/BottomSheet.vue';

    const props = defineProps<{
        languages: Array<any>,
        selected: Object,
        onSelect: (index: number)=>void,
    }>();
</script>

<template>
    <BottomSheet inset>
        <div class="bottom-sheet__content">
            <div class="bottom-sheet__content__item">
                <ElementOption v-for="(lang, index) in languages"
                    type="large-mobile"
                    :id="'language-selector' + lang.key"
                    :state="lang == selected ? 'active': ''"
                    @click="onSelect(index)"
                ><span>{{ lang.key }}</span>{{ lang.value }}
                </ElementOption>
            </div>
        </div>
    </BottomSheet>
</template>

<style lang="scss" scoped>
    .bottom-sheet {
        &__content {
            @include df_fdc;
            &__item {
                .option {
                    gap: 1rem;
                    @include text_1;
                    &[data-state="active"] {
                        color: $text-accent;
                    }
                }
            }
        }
    }
</style>