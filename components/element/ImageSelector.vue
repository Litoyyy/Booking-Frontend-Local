<script setup lang="ts">
    import { reactive } from 'vue';

    const props = defineProps<{
        id?: string,
        name?: string,
        maxSize?: number,
        onChange?: (value: string)=>void
    }>();

    const inputRef = ref<HTMLInputElement | null>(null);

    const imageSelected = reactive<{
        image: string | null;
    }>({
        image: null,
    });

    function getImage() {
        if(!inputRef.value || !inputRef.value.files) return;
        const image = inputRef.value.files[0];
        if(props.maxSize && props.maxSize < image.size) return;
        console.log(image.size);
        imageSelected.image = URL.createObjectURL(image);
    };

    function clearImage() {
        imageSelected.image = null;
        if (!!inputRef.value) inputRef.value.value = '';
    };
    
    watch(()=>imageSelected,
        (newValue)=>{
            if(props.onChange) props.onChange(imageSelected.image ?? '');
        }
    )
</script>

<template>
    <div class="image-selector">
        <div class="image-selector__displayed" v-if="imageSelected.image">
            <div class="image-selector__displayed__image">
                <img :src="imageSelected.image" alt="Display image">
            </div>
            <div class="image-selector__displayed__buttons">
                <label :for="props.id || 'image-select'">
                    <ElementIconButton
                        size="small"
                        color="transparent-secondary"
                        :displayDiv=true
                    ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.8995 6.85479L17.1421 11.0975L7.24264 20.997H3V16.7543L12.8995 6.85479ZM14.3137 5.44058L16.435 3.31926C16.8256 2.92874 17.4587 2.92874 17.8492 3.31926L20.6777 6.14769C21.0682 6.53821 21.0682 7.17138 20.6777 7.5619L18.5563 9.68322L14.3137 5.44058Z" fill="#2D3033" fill-opacity="0.32"/>
                    </svg>
                    </ElementIconButton>
                </label>
                <div class="image-selector__displayed__buttons__icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 15.5C7 14.6716 6.32843 14 5.5 14C4.67157 14 4 14.6716 4 15.5C4 16.3284 4.67157 17 5.5 17C6.32843 17 7 16.3284 7 15.5ZM13.5 15.5C13.5 14.6716 12.8284 14 12 14C11.1716 14 10.5 14.6716 10.5 15.5C10.5 16.3284 11.1716 17 12 17C12.8284 17 13.5 16.3284 13.5 15.5ZM18.5 14C19.3284 14 20 14.6716 20 15.5C20 16.3284 19.3284 17 18.5 17C17.6716 17 17 16.3284 17 15.5C17 14.6716 17.6716 14 18.5 14ZM7 8.5C7 7.6716 6.32843 7 5.5 7C4.67157 7 4 7.6716 4 8.5C4 9.3284 4.67157 10 5.5 10C6.32843 10 7 9.3284 7 8.5ZM12 7C12.8284 7 13.5 7.6716 13.5 8.5C13.5 9.3284 12.8284 10 12 10C11.1716 10 10.5 9.3284 10.5 8.5C10.5 7.6716 11.1716 7 12 7ZM20 8.5C20 7.6716 19.3284 7 18.5 7C17.6716 7 17 7.6716 17 8.5C17 9.3284 17.6716 10 18.5 10C19.3284 10 20 9.3284 20 8.5Z" fill="#2D3033" fill-opacity="0.48"/>
                    </svg>
                </div>
                <ElementIconButton
                    size="small"
                    color="transparent-secondary"
                    @click="clearImage"
                ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" fill="#2D3033" fill-opacity="0.32"/>
                </svg>
                </ElementIconButton>
            </div>
        </div>
        <label class="image-selector__select" v-else
            :for="props.id || 'image-select'"
        >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.3335 5.83333H4.66683V22.1667L15.5078 11.3242C15.9634 10.8686 16.702 10.8686 17.1577 11.3241L23.3335 17.5121V5.83333ZM2.3335 4.65897C2.3335 4.01889 2.86469 3.5 3.4906 3.5H24.5097C25.1488 3.5 25.6668 4.01911 25.6668 4.65897V23.341C25.6668 23.9811 25.1356 24.5 24.5097 24.5H3.4906C2.85155 24.5 2.3335 23.9809 2.3335 23.341V4.65897ZM9.3335 12.8333C8.04483 12.8333 7.00016 11.7887 7.00016 10.5C7.00016 9.21133 8.04483 8.16667 9.3335 8.16667C10.6222 8.16667 11.6668 9.21133 11.6668 10.5C11.6668 11.7887 10.6222 12.8333 9.3335 12.8333Z" fill="#1C5BAD"/>
            </svg>
            <span>Добавить</span>
        </label>
        <div class="image-selector__input">
            <input type="file" 
                ref="inputRef"
                :id="props.id || 'image-select'"
                :name="props.name"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                @change="() => {getImage()}"
            >
        </div>
    </div>
</template>

<style lang="scss">
    .image-selector {
        position: relative;
        @include df_fdc;
        width: 7.5rem;
        &__select {
            @include df_fdc_ac;
            justify-content: center;
            width: 100%;
            height: 7.5rem;
            @include text_1;
            color: $text-accent;
            border-width: 1px;
            border-style: dashed;
            border-color: $border-accent-transparent-16;
            border-radius: .5rem;
            cursor: pointer;
            @include transition(border-color);

            svg {
                width: 1.75rem;
                height: 1.75rem;
            }
            &:hover {
                border-color: $border-accent;
            }
        }
        &__displayed {
            @include df_fdc;
            &__image {
                display: flex;
                width: 100%;
                height: 7.5rem;
                border-radius: .5rem;
                overflow: hidden;
                img {
                    @include image_contain;
                }
            }
            &__buttons {
                @include df_ac;
                justify-content: space-between;
                &__icon {
                    width: 1.5rem;
                    height: 1.5rem;
                    svg {
                        @include wh_100;
                    }
                }
                .icon-button {
                    opacity: 0;
                }
            }
        }
        &__input {
            position: absolute;
            input {
                opacity: 0;
                width: 0;
                height: 0;
            }
        }
        &:hover {
            .image-selector__displayed__buttons {
                .icon-button {
                    opacity: 1;
                }
            }
        }
    }
</style>