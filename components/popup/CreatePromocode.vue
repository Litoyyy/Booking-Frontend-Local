<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';
    import { z } from 'zod';

    const props = defineProps<{
        onSubmit?: (createdObject: object)=>void
    }>();

    const formRef = ref<HTMLFormElement | null>(null);

    const createPromoSchema = z.object({
        code: z.string().min(1),
        description: z.string(),
    });

    const isActive = ref(true);

    const handleValidate =(errorOff?: boolean)=>{
        if(formRef.value) {
            validate(formRef.value, createPromoSchema,
                async(body: any)=>{
                    body.name = body.code;
                    body.is_active = isActive.value;
                    const res = await sendData(body, '/promotions/promocode');
                    if(props.onSubmit) props.onSubmit(res);
                }, {errorOff: errorOff}
            );
        };
    };

    
    const randomizedPromo = ref('');

    const updRandomizedPromo=()=>{
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for ( var i = 0; i < 12; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        randomizedPromo.value = result;
        setTimeout(() => {
            handleValidate();
        }, 100);
    };
    </script>

<template>
    <Popup name="Создать промокод" resize position="end"
        :onOpened="()=>{
            handleValidate(true);
        }"
    >
        <form class="popup__info-block" ref="formRef" id="create-promo-popup-form">
            <ElementInput 
                id="create-promo-popup-input-name"
                :on-input="()=>handleValidate()"
                :new-value="randomizedPromo"
                name="code"
                fake-placeholder="Промокод"
            >
            <ElementPopover position="center">
                <template #icon>
                    <div
                        @click="updRandomizedPromo()"
                    ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.2238 15.5078L13.0111 20.158C12.8687 20.4572 12.5107 20.5843 12.2115 20.4419C12.1448 20.4102 12.0845 20.3664 12.0337 20.3128L8.49229 16.574C8.39749 16.4739 8.27113 16.4095 8.13445 16.3917L3.02816 15.7242C2.69958 15.6813 2.46804 15.3801 2.51099 15.0515C2.52056 14.9783 2.54359 14.9074 2.5789 14.8425L5.04031 10.3191C5.1062 10.198 5.12839 10.0579 5.10314 9.92241L4.16 4.85979C4.09931 4.53402 4.3142 4.22074 4.63997 4.16005C4.7126 4.14652 4.78711 4.14652 4.85974 4.16005L9.92237 5.10319C10.0579 5.12843 10.198 5.10625 10.319 5.04036L14.8424 2.57895C15.1335 2.42056 15.4979 2.52813 15.6562 2.81919C15.6916 2.88409 15.7146 2.95495 15.7241 3.02821L16.3916 8.1345C16.4095 8.27118 16.4739 8.39754 16.5739 8.49233L20.3127 12.0337C20.5533 12.2616 20.5636 12.6414 20.3357 12.882C20.2849 12.9356 20.2246 12.9794 20.1579 13.0111L15.5078 15.2239C15.3833 15.2831 15.283 15.3834 15.2238 15.5078ZM16.0206 17.4349L17.4348 16.0207L21.6775 20.2633L20.2633 21.6775L16.0206 17.4349Z" fill="#2D3033" fill-opacity="0.32"/></svg>
                    </div>
                </template>
                Сгенерировать
            </ElementPopover>
            </ElementInput>
            <ElementInput 
                id="create-promo-popup-input-desc"
                :on-input="()=>handleValidate()"
                name="description"
                fake-placeholder="Описание" 
                :maxLength="300" 
                type="textarea"
            />
        </form>
        <div class="popup__button-block">
            <ElementCheckbox
                id="create-promo-popup-checkbox"
                :checked="isActive"
                :onUpdate="(checked: boolean)=>isActive = checked"
            >Промокод активен сразу после создания
            </ElementCheckbox>
            <ElementButton 
                form="create-promo-popup-form"
                name="button"
                size="large"
            >Создать
            </ElementButton>
        </div>
    </Popup>
</template>

<style lang="scss">
    .popup {
        :deep(.popup__content) {
            min-width: 53.25rem;
        }
        :deep(.popover) {
            height: fit-content;
        }
        :deep(.field) {
            .input-label {
                overflow: unset;
            }
        }
        &__info-block {
            @include df_fdc;
            gap: 1rem;
        }
        &__button-block {
            @include df_fdc;
            gap: 1.5rem;
        }
    }
</style>