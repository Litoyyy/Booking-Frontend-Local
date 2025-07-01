<script setup lang="ts">

    const props = defineProps<{
        id?: string,
        addFunc?: (id: number) => void
        removeFunc?: (id: number) => void
    }>();

    const fileSelected = reactive<{
        file: string | null,
        fileSize: string | null,
        fileName: string | null;
    }>({
        file: null,
        fileSize: null,
        fileName: null,
    });

    function getFile(event: Event) {
        const input = (event.target as HTMLInputElement);
        if(!input.files) return;
        const file = input.files[0]

        fileSelected.file = URL.createObjectURL(file);
        fileSelected.fileName = file.name;

        const sizeInMB = file.size / 1024 / 1024;
        const formattedSize = sizeInMB > .1 ? sizeInMB.toString().slice(0, 4) + 'MB': (sizeInMB * 1024).toString().slice(0, 4) + 'KB';

        fileSelected.fileSize = `(${formattedSize})` 
    }

    function clearFile() {
        fileSelected.file = '';
        fileSelected.fileSize = '';
    }

</script>

<template>
    <div class="file-selector">
        <div class="file-selector__selected" v-if="fileSelected.file">
            <div class="file-selector__selected__text">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.3333 25.6663H4.66667C4.02234 25.6663 3.5 25.144 3.5 24.4997V3.49967C3.5 2.85535 4.02234 2.33301 4.66667 2.33301H23.3333C23.9777 2.33301 24.5 2.85535 24.5 3.49967V24.4997C24.5 25.144 23.9777 25.6663 23.3333 25.6663ZM8.16667 6.99967V11.6663H12.8333V6.99967H8.16667ZM8.16667 13.9997V16.333H19.8333V13.9997H8.16667ZM8.16667 18.6663V20.9997H19.8333V18.6663H8.16667ZM15.1667 8.16634V10.4997H19.8333V8.16634H15.1667Z" fill="#2D3033" fill-opacity="0.32"/>
                </svg>
                {{ fileSelected.fileName }} {{ fileSelected.fileSize }}
            </div>
            <div class="file-selector__selected__buttons">
                <label :for="props.id || 'file-selector'">
                    <ElementIconButton
                        size="small"
                        color="transparent-secondary"
                        :displayDiv=true
                    ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.8995 6.85479L17.1421 11.0975L7.24264 20.997H3V16.7543L12.8995 6.85479ZM14.3137 5.44058L16.435 3.31926C16.8256 2.92874 17.4587 2.92874 17.8492 3.31926L20.6777 6.14769C21.0682 6.53821 21.0682 7.17138 20.6777 7.5619L18.5563 9.68322L14.3137 5.44058Z" fill="#2D3033" fill-opacity="0.32"/>
                    </svg>
                    </ElementIconButton>
                </label>
                <ElementIconButton
                    size="small"
                    color="transparent-secondary"
                    @click="() => {
                        clearFile()
                        if (props.removeFunc) {
                            removeFunc(Number(props.id))
                        }
                    }"
                ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" fill="#2D3033" fill-opacity="0.32"/>
                </svg>
                </ElementIconButton>
            </div>
        </div>
        <label :for="props.id || 'file-selector'" class="file-selector__select" v-else>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.3333 25.6663H4.66667C4.02234 25.6663 3.5 25.144 3.5 24.4997V3.49967C3.5 2.85535 4.02234 2.33301 4.66667 2.33301H23.3333C23.9777 2.33301 24.5 2.85535 24.5 3.49967V24.4997C24.5 25.144 23.9777 25.6663 23.3333 25.6663ZM8.16667 6.99967V11.6663H12.8333V6.99967H8.16667ZM8.16667 13.9997V16.333H19.8333V13.9997H8.16667ZM8.16667 18.6663V20.9997H19.8333V18.6663H8.16667ZM15.1667 8.16634V10.4997H19.8333V8.16634H15.1667Z" fill="#1C5BAD"/>
            </svg>
            Добавить
        </label>
        <div class="file-selector__input">
            <input type="file" :id="props.id || 'file-selector'"
                @change="(event) => {
                    getFile(event)
                    if (props.addFunc) {
                        addFunc(Number(props.id))
                    }
                }"
            >
        </div>
    </div>
</template>

<style lang="scss">
    .file-selector {
        position: relative;
        @include df_ac;
        gap: .5rem;
        width: fit-content;
        border-radius: .5rem;
        border-width: 1px;
        border-style: dashed;
        border-color: $border-accent-transparent-16;
        @include text_1;

        @include transition(border-color);
        &__select {
            @include df_ac;
            gap: .5rem;
            padding: 1rem;
            color: $text-accent;
            cursor: pointer;
        }
        &__selected {
            @include df_ac;
            gap: 1rem;
            padding: 1rem;
            &__text {
                @include df_ac;
                gap: .5rem;
            }
            &__buttons {
                @include df_ac;
            }
        }
        svg {
            width: 1.75rem;
            height: 1.75rem;
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
            border-color: $border-accent;
        }
    }
</style>