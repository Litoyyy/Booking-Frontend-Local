<script lang="ts" setup>
    import { z } from 'zod';
    import Select from '~/layouts/components/Select.vue';

    export interface Tag {
        name: string,
        selected?: boolean
    }

    const selectRef = ref<InstanceType<typeof Select> | null>(null);
    const formRef = ref<HTMLFormElement | null>(null);

    const props = defineProps<{
        type?: 'default' | 'cell',
        tags?: Array<Object>,
        tagsCategoryId?: Number
    }>();

    const tagsArray = ref([]);

    const createSchema = z.object({
        name: z.string().min(1) 
    })

    const handleCreateValidate=()=>{
        if(formRef.value) {
            validate(formRef.value, createSchema,
                (body: Object)=>{
                    tagsArray.value.push(body);
                }, { errorOff: true, clearAfterSubmit: true }
            )
        };
    };

    watch(
        ()=>props.tags,
        (newValue)=>{
            console.log(newValue);
        }
    );

</script>

<template>
    <Select class="select_tag-multi"
        ref="selectRef"
        :on-open="handleCreateValidate"
        :data-attr="`${JSON.stringify(tagsArray.filter(item => item.selected))}`"
        readonly
    >
    <template #replace_input v-if="tagsArray.filter(item=>item.selected).length > 0">
        <div class="select_tag-multi__replace-input">
            <div class="select_tag-multi__tags">
                <div class="select_tag-multi__tags__tag" v-for="tag in tagsArray">
                    <ElementTag v-if="tag.selected"
                        state="deletable"
                        :on-delete="()=>{tag.selected = false}"
                    >{{ tag.name }}
                    </ElementTag>
                </div>
            </div>
            <div class="clear-btn" @click="tagsArray.map(item=>item.selected=false)" v-if="tagsArray.filter(item=>item.selected).length > 0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" fill="#2D3033" fill-opacity="0.48"/>
                </svg>
            </div>
        </div>
    </template>
    <div class="select__menu__tags-list">
        <div class="select__menu__tags-list__tag" v-for="tag in tagsArray">
            <ElementTag v-if="!tag.selected" @click="tag.selected = true">
                {{ tag.name }}
            </ElementTag>
        </div>
    </div>
    <form class="select__menu__form" v-if="type === 'cell'" ref="formRef">
        <ElementInput
            id="select-menu-create-new-tag-input-name"
            name="name"
            :on-input="handleCreateValidate"
            placeholder="Новый элемент"
        />
        <ElementIconButton
            name="button"
            size="large"
            color="accent"
        ><svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.6663 17.6991L22.3908 6.97461L24.0407 8.62452L11.6663 20.9989L4.2417 13.5743L5.89162 11.9244L11.6663 17.6991Z" fill="white"/>
        </svg>
        </ElementIconButton>
    </form>
    </Select>
</template>

<style lang="scss">
    .select_tag-multi {
        .select {
            &__menu {
                padding: 1rem;
                background-color: $bg-inverse-subdued-4;
                border-radius: .5rem;
                &:has(.tag) {
                    gap: .5rem;
                }
                &__tags-list {
                    display: flex;
                    flex-wrap: wrap;
                    .tag {
                        flex: 0 0 auto;
                        margin-right: .5rem;
                        margin-bottom: .5rem;
                    }
                    .tag:nth-child(3n + 1) {
                        clear: both;
                    }
                }
                &__form {
                    @include df_ac;
                    gap: .5rem;
                    .field {
                        width: 100%;
                        min-width: 11.25rem;
                    }
                }
            }
        }
        &__replace-input {
            display: flex;
            width: 100%;
            .clear-btn {
                width: 1.5rem;
                height: 1.5rem;
                cursor: pointer;
                margin-top: .375rem;
                &:hover {
                    svg path {
                        fill-opacity: 1;
                    }
                }
                svg {
                    @include wh_100;
                    path {
                        @include transition(fill-opacity);
                    }
                }
            }
        }
        &__tags {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            .tag {
                margin-right: .5rem;
                margin-bottom: .5rem;
            }
        }
        .input-label {
            &:has(.select_tag-multi__tags) {
                gap: .5rem;
                padding: .75rem 1rem .25rem;
                .input-label__icon-block {
                    padding-top: .375rem;
                }
            }
        }
    }
</style>