<script lang="ts" setup>

    import { copyToClipboards } from '~/utils/copyToClipboards';

    const props = defineProps<{
        text: string
    }>();

    const copyState = ref('Скопировать');

    const handleCopy = async () => {
        try {
            await copyToClipboards(props.text);
            copyState.value = 'Скопировано!';
            setTimeout(() => {
                copyState.value = 'Скопировать';
            }, 3000);
        } catch (err) {
            copyState.value = 'Ошибка копирования';
            setTimeout(() => {
                copyState.value = 'Скопировать';
            }, 3000);
        }
    };
</script>

<template>
    <span class="copy-to-clipboard" 
        @click="handleCopy">
        <ElementPopover position="right">
            <template #icon>
                {{ text }}
                <ElementIconButton
                    size="micro"
                    color="transparent-secondary"
                    ghost
                ><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.83317 5.00033V2.50033C5.83317 2.04009 6.20627 1.66699 6.6665 1.66699H16.6665C17.1267 1.66699 17.4998 2.04009 17.4998 2.50033V14.167C17.4998 14.6272 17.1267 15.0003 16.6665 15.0003H14.1665V17.4996C14.1665 17.9602 13.7916 18.3337 13.3275 18.3337H3.33888C2.87549 18.3337 2.5 17.9632 2.5 17.4996L2.50217 5.83438C2.50225 5.37375 2.8772 5.00033 3.34118 5.00033H5.83317ZM7.49983 5.00033H14.1665V13.3337H15.8332V3.33366H7.49983V5.00033Z" fill="#2D3033" fill-opacity="0.32"/>
                </svg>
                </ElementIconButton>
            </template>
            {{ copyState }}
        </ElementPopover>
    </span>
</template>

<style lang="scss">
    .copy-to-clipboard {
        @include df_ac;
        gap: .5rem;
        @include text_1;
        cursor: pointer;
        .popover {
            cursor: pointer;
        }
    }
</style>