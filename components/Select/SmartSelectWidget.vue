<script setup lang="ts">
    import Select from '~/layouts/components/Select.vue';

    const props = defineProps<{
        id?: string,
        tags?: Array<any>,
        info: Array<any>,
        disabled?: boolean,
        fakePlaceholder?: string,
    }>();

    const newValue = ref('');

    const selectRef = ref<InstanceType<typeof Select> | null>(null);

    const changeCounterValue=(value: string, index: number)=>{
        const infoItem = props.info[index];
        infoItem.value = value;
        if(value === '0') props.info.splice(index, 1);
        getTotalValue();
    };

    const selectTag=(tagIndex: number, itemIndex: number)=>{
        const infoItem = props.info[itemIndex];
        if(!!props.tags && props.tags.length > 0) {
            infoItem.tags.push(props.tags[tagIndex]);
        };
        getTotalValue();
    };
    const removeTag=(tagIndex: number, itemIndex: number)=>{
        const infoItem = props.info[itemIndex];
        if(!!infoItem.tags && infoItem.tags.length > 0) {
            infoItem.tags.splice(tagIndex, 1); 
        };
        getTotalValue();
    };

    function getTotalValue () {
        let adultNumber = 0;
        let kidsNumber = 0;
        let roomsNumber = 0;
        const promises = props.info.map(item=>{
            adultNumber += Number(item.value);
            kidsNumber += item.tags.length;
            roomsNumber += 1;
        });
        Promise.all(promises)
        .then(()=>{
            const kidsDisplay = kidsNumber > 0 ? ` + ${kidsNumber}`: '';
            newValue.value = `${adultNumber}${kidsDisplay}, ${roomsNumber} номер${getWordEnding(roomsNumber, ['','а','ов'])}`;
        });
    };

    onNuxtReady(()=>{
        getTotalValue();
    });

</script>

<template>
    <Select
        ref="selectRef"
        :new-value="disabled ? '':newValue"
        :fake-placeholder="disabled ? newValue:fakePlaceholder"
        :readonly="true"
        :disabled="disabled"
    >
        <div class="select__menu__widget-item" v-for="(item, index) in info">
            <div class="select__menu__widget-item__title">
                Номер {{ index + 1 }}
            </div>
            <ElementCounter
                :id="'smartselect-counter-' + id + index"
                fake-placeholder="Взрослые"
                :on-update="(value)=>{changeCounterValue(value, index)}"
                :updated-value="Number(item.value)"
                :min-value="index === 0 ? 1 : 0"
            ></ElementCounter>
            <div class="select__menu__tags-block">
                <div class="select__menu__tags-block__title_sub">
                    Дети младше 14 лет
                </div>
                <div class="select__menu__tags-block__list">
                    <ElementTag 
                        v-for="(tag, tagIndex) in item.tags"
                        state="deletable"
                        :on-delete="()=>{removeTag(tagIndex, index)}"
                    >{{ tag.text }}
                    </ElementTag>
                    <Dropdown on-click>
                        <template #header>
                            <ElementIconButton
                                size="small"
                                color="transparent"
                            ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" fill="white"/>
                            </svg>
                            </ElementIconButton>
                        </template>
                        <div class="dropdown__option" v-for="(tag, tagIndex) in tags">
                            <ElementOption
                                type="ghost"
                                :on-click="()=>selectTag(tagIndex, index)"
                            >{{ tag.text }}
                            </ElementOption><hr>
                        </div>
                    </Dropdown>
                </div>
            </div>
            <hr>
        </div>
    </Select>
</template>

<style lang="scss">
    .select {
        &__menu {
            &:has(.select__menu__widget-item) {
                gap: 0;
                padding: 0;
            }
            &__widget-item {
                @include df_fdc;
                gap: 1rem;
                padding: 1rem;
                padding-bottom: 0;
                &__title {
                    @include text_1;
                }
                hr {
                    border: 0;
                    border-top: 1px solid $border-primary-transparent-8;
                }
                &:last-of-type {
                    padding-bottom: 1rem;
                    hr {
                        display: none;
                    }
                }
            }
        }
    }
</style>