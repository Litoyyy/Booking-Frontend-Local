<script lang="ts" setup>
    import { z } from 'zod';
    import Popup from '~/layouts/components/Popup.vue';

    const props = defineProps<{
        type?: 'default' | 'form'
        title?: string,
        text?: string,
        popupName?: string,
        btnText?: string,
        onDelete?: ()=>void
    }>();

    const formRef = ref<HTMLFormElement | null>(null);
    const schema = z.object({
        delete: z.string().toLowerCase()
            .min(7)
            .max(7)
            .includes('удалить')
    });

    const handleValidate=()=>{
        if(formRef.value) {
            validate(formRef.value, schema,
                (body: any)=>{
                    if(props.onDelete) props.onDelete();
                }
            );
        };
    };

    const handleDelete=()=> {
        if(props.onDelete && props.type != 'form') props.onDelete();
    };

    const openedPopup=()=>{
        setTimeout(() => {
            if(formRef.value) {
                validate(formRef.value, schema,
                    (body: any)=>{},
                    { errorOff: true }
                );
            };
        }, 300);
    };

    const popupName = ref(`Удалить ${props.title ?? ''}`);
    const btnText = ref('Удалить')

    onMounted(()=>{
        if(props.btnText) {
            btnText.value = props.btnText;
        }
        if(props.popupName) {
            popupName.value = props.popupName;
        }
    });

</script>

<template>
    <Popup 
        :name="popupName" 
        :data-type="props.type || 'default'" 
        :description="props.text || ''" 
        :on-opened="()=>{
            openedPopup();
        }"
    >
        <div class="popup__info-block">
            <form v-if="props.type && props.type === 'form'" 
                id="delete-category-form" 
                ref="formRef"
            >
                <ElementInput 
                    placeholder="Подтвердите удаление, написав «Удалить»"
                    name="delete"
                    id="popup-category-delete"
                    :on-input="handleValidate"
                ></ElementInput>
            </form>
            <span v-else>
                {{ props.text }}
            </span>
        </div>
        <ElementButton 
        form="delete-category-form"
        name="button"
        size="large"
        color="negative"
        @click="handleDelete">
            {{ btnText }}
        </ElementButton>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        &__info-block {
            @include text_1;
            color: $text-system-negative;
        }
    }
</style>