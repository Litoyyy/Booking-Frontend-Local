<script lang="ts" setup>
    const props = defineProps<{
        id?: string,
        newValue: number,
        lastPage: number
    }>();

    const emit = defineEmits(['update:newValue']);

    const modelValue = computed({
        get: () => props.newValue, 
        set: (val) => emit('update:newValue', val),
    });

    const onInputFunc = (event: Event) => {
        const target = event.target as HTMLInputElement;
        let value = Number(target.value);
        
        if (isNaN(value)) {
            value = props.newValue;
        }
        
        if (value > props.lastPage) {
            value = props.lastPage;
        } else if (value < 1) {
            value = 1;
        }
        
        modelValue.value = value;
    };

    watch(
        ()=>props.lastPage,
        (updVal)=>{
            if (modelValue.value > props.lastPage) {
                modelValue.value = props.lastPage;
            }
        }
    );

</script>

<template>
    <div class="paginator">
        <div class="paginator__btns">
            <ElementIconButton
                color="transparent"
                @click="modelValue = 1"
                ghost
            ><svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.64185 14L12.8835 21.2416L14.5334 19.5917L8.94168 14L14.5334 8.40833L12.8835 6.75842L5.64185 14ZM12.2334 14L19.475 21.2416L21.1249 19.5917L15.5332 14L21.1249 8.40833L19.475 6.75842L12.2334 14Z" fill="#2D3033" fill-opacity="0.48"/>
            </svg>
            </ElementIconButton>
            <ElementIconButton
                color="transparent"
                @click="modelValue <= 1 ? null: modelValue -= 1"
                ghost
            ><svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.6331 14.0008L18.4078 19.7755L16.7579 21.4254L9.33325 14.0008L16.7579 6.57617L18.4078 8.22608L12.6331 14.0008Z" fill="#2D3033" fill-opacity="0.48"/>
            </svg>
            </ElementIconButton>
        </div>
        <ElementInput
            :id="`paginator-input-${id}`"
            :new-value="modelValue?.toString()"
            :on-input="onInputFunc"
            :mask="Number"
        />
        <div class="paginator__btns">
            <ElementIconButton
                color="transparent"
                @click="modelValue === lastPage ? null: modelValue += 1"
                ghost
            ><svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.367 14.0008L9.59229 8.22608L11.2422 6.57617L18.6668 14.0008L11.2422 21.4254L9.59229 19.7755L15.367 14.0008Z" fill="#2D3033" fill-opacity="0.48"/>
            </svg>
            </ElementIconButton>
            <ElementIconButton
                color="transparent"
                @click="modelValue = lastPage ?? 1"
                ghost
            ><svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.3605 14L15.1189 21.2416L13.469 19.5917L19.0607 14L13.469 8.40833L15.1189 6.75842L22.3605 14ZM15.769 14L8.52734 21.2416L6.87744 19.5917L12.4692 14L6.87744 8.40833L8.52734 6.75842L15.769 14Z" fill="#2D3033" fill-opacity="0.48"/>
            </svg>
            </ElementIconButton>
        </div>
    </div>
</template>

<style lang="scss">
    .paginator {
        @include df_ac;
        gap: .5rem;
        &__btns {
            @include df_ac;
        }
        .field {
            width: 3rem;
            height: 2.75rem;
            .input-label {
                background-color: $bg-primary;
                padding: .5rem;
                &:hover {
                    background-color: $bg-primary;
                }
                input {
                    text-align: center;
                }
            }
        }
    }
</style>