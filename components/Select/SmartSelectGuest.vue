<script setup lang="ts">
    import Select from '~/layouts/components/Select.vue';

    const props = defineProps<{
        id?: string,
        tags?: Array<any>,
        minValue?: number,
        getUpdatedValues?: (Obj: Object) => void,
    }>();

    const valuesUpdated =()=> {
        if(props.getUpdatedValues && typeof(props.getUpdatedValues) === 'function') props.getUpdatedValues(selectedObject.value);
        getTotalValue();
    };

    const selectedObject = ref({
        text: '',
        value: '',
        tags: <Object []>[],
    });

    watch(
        () => selectedObject.value,
        (newValue) => {
            valuesUpdated();
        },
        { immediate: true, deep: true }
    );


    const selectTagsBlocked = ref(true);

    const selectTag=(index: number)=>{
        if(!!props.tags && props.tags.length > 0) {
            selectedObject.value.tags.push(props.tags[index]);
        };
    };
    const removeTag=(index: number)=>{
        if(!!selectedObject.value.tags && selectedObject.value.tags.length > 0) {
            selectedObject.value.tags.splice(selectedObject.value.tags[index], 1); 
        };
    };

    const getCounterValue=(value: string)=>{
        if(!!value) {
            selectedObject.value.value = value;
            if(value === '0') {
                selectTagsBlocked.value = true;
                selectedObject.value.tags.splice(0, selectedObject.value.tags.length);
            } else {
                selectTagsBlocked.value = false;
            }
        };
    };

    function getTotalValue() {
        if (selectedObject.value.tags.length > 0) {
            selectedObject.value.text = selectedObject.value.value + ' + ' + selectedObject.value.tags.length;
        } else {
            selectedObject.value.text = selectedObject.value.value;
        };
    };
</script>

<template>
    <Select
        :new-value="selectedObject.text"
        :readonly="true"
        :id="id"
    >
        <ElementCounter
            :id="'smartselect-counter-' + id"
            fake-placeholder="Взрослые"
            :on-update="getCounterValue"
            :updated-value="Number(selectedObject.value)"
            :min-value="minValue"
        ></ElementCounter>
        <div class="select__menu__tags-block">
            <div class="select__menu__tags-block__title">
                Дети
            </div>
            <div class="select__menu__tags-block__list">
                <ElementTag 
                    v-for="(tag, index) in selectedObject.tags"
                    state="deletable"
                    :on-delete="()=>{removeTag(index)}"
                >{{ tag.text }}
                </ElementTag>
                <Dropdown on-click>
                    <template #header>
                        <ElementIconButton
                            size="small"
                            color="transparent"
                            :disabled="selectTagsBlocked"
                        ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" fill="white"/>
                        </svg>
                        </ElementIconButton>
                    </template>
                    <div class="dropdown__option" v-for="(tag, index) in tags">
                        <ElementOption
                            type="ghost"
                            :on-click="()=>selectTag(index)"
                        >{{ tag.text }}
                        </ElementOption><hr>
                    </div>
                </Dropdown>
            </div>
        </div>
    </Select>
</template>

<style lang="scss">
    .select {
        &__menu {
            &:has(.counter-block) {
                gap: 1rem;
                padding: 1rem;
                border-radius: .5rem;
            }
            &__tags-block {
                @include df_fdc;
                gap: .75rem;
                &__title {
                    @include text_1;
                    &_sub {
                        @include text_2;
                    }
                }
                &__list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: .5rem;
                    .dropdown {
                        &__menu {
                            top: 2rem;
                            padding-top: .75rem;
                            &__container {
                                max-height: 7.5rem;
                            }
                        }
                        &__option {
                            width: 15.625rem;   
                        }
                    }
                }
            }
        }
    }
</style>