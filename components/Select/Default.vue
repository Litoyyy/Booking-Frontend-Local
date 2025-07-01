<script setup lang="ts">

    import Select from '~/layouts/components/Select.vue';

    const selectRef = ref<InstanceType<typeof Select> | null>(null);

    const props = defineProps<{
        type?: 'default' | 'checkbox' | 'large-mobile',
        options?: Array<Object>,
        selectedOptions?: Array<Object> | Object,
        valueType?: 'default' | 'length',
        optionId?: string,
        
        onUpdate?: (newValue?: string)=>void,
    }>();

    const newValue = ref('');
    const attr = ref('');

    const optionsModArray = ref();

    const inputFunc=()=>{
        const target = event?.target as HTMLInputElement;
        
        optionsModArray.value.map(item => {
            if(item.name.toLocaleLowerCase().includes(target.value.toLocaleLowerCase())) {
                item.show = true;
            } else {
                item.show = false;
            };
        });
    };

    const blurFunc=()=>{
        const target = event?.target as any;
        if(!target) return; 
        newValue.value = `${newValue.value} `;
        clearShowStates();
        setTimeout(() => {
            newValue.value = newValue.value.trim();
        }, 100);
    };

    const chooseOption = (checked: boolean, option: any) => {
        if (props.type === 'default' || props.type === undefined) {
            optionsModArray.value.map(item=>item.checked = false);
            option.checked = true;
            selectRef.value?.closeSelect();
        } else if (props.type === 'checkbox') {
            option.checked = checked;
        }
        clearShowStates();
    };

    const clearShowStates=()=>{
        optionsModArray.value?.map(elem=>{
            elem.show=true;
        });
    }

    onMounted(()=>{
        if(optionsModArray.value && optionsModArray.value?.length > 0) {
            clearShowStates();
        };
    });
    const updateList=()=>{
        const selectedArray = Array.isArray(props.selectedOptions)
            ? props.selectedOptions
            : props.selectedOptions
            ? [props.selectedOptions]
            : [];

        const selectedIds = selectedArray.map(item => item.id);
        
        optionsModArray.value = props.options?.map((option, index) => ({ 
            ...option,
            show: true,
            checked: selectedIds.includes(option.id)
        })) || [];
    };

    watch(()=>optionsModArray.value,()=>{
        const allChecked = optionsModArray.value
            .filter(item=>item.checked);

        attr.value = allChecked.map(elem=>elem.id).join(', ');

        if (!props.valueType || props.valueType === 'default') {
            newValue.value = allChecked.map(elem=>elem.name).join(', ');
        } else if(props.valueType === 'length') {
            newValue.value = allChecked.length;
        };
        if(props.onUpdate) props.onUpdate(newValue.value);
    }, { deep: true });
    watch(()=>props.selectedOptions, (selected)=>{
        updateList();
    }, { immediate: true, deep: true });

    watch(() => props.options, (newOptions) => {
        updateList();
    }, { immediate: true });
</script>

<template>
    <Select
        ref="selectRef"
        :new-value="newValue"
        :on-input="inputFunc"
        :on-blur="blurFunc"
        :data-attr="attr"
    >
        <div 
            class="select__menu__item" 
            v-for="option in optionsModArray" 
            :key="option.name"
        >
            <ElementOption
                :type="type || 'default'"
                :on-click="(checked: boolean) => chooseOption(checked, option)"
                :id="`${optionId ?? ''}select-${option.name}`"
                :checked="option.checked"
                :state="option.checked ? 'active' : ''"
                v-if="option.show"
            >{{ option.name }}
            </ElementOption>
            <hr v-if="option.show">
        </div>
    </Select>
</template>