<script lang="ts" setup>
    import { z } from 'zod';
    import Popup from '~/layouts/components/Popup.vue';
    import { useRooms } from '~/composables/rooms/useRooms';
    import { useServices } from '~/composables/services/useServices';

    const { allRooms } = useRooms();
    const { allServices } = useServices();

    const { getCategories } = navSidebar();

    const props = defineProps<{
        type: 'rooms' | 'services',
        onSubmit?: (res?: object)=>void
    }>();

    const formRef = ref<HTMLFormElement | null>(null);

    const createRoomSchema = z.object({
        name: z.string().min(1),
    });

     const createServiceSchema = z.object({
        name: z.string().min(1),
        description: z.string()
    });

    const handleValidate=()=>{
        if(formRef.value) {
            if(props.type === 'rooms') {
                validate(formRef.value, createRoomSchema,
                    async(body: any)=>{
                        const roomsInput = formRef.value.elements.rooms as HTMLInputElement;
                        if(!!roomsInput.dataset.value) {
                            body.rooms = roomsInput.dataset.value?.split(', ');
                        } else {
                            body.rooms = [];
                        }
                        const res = await sendData(body, '/hotel/room-category');
                        getCategories();
                        if(props.onSubmit) props.onSubmit(res);
                    }, { errorOff: true, clearAfterSubmit: true });
            } else if(props.type === 'services') {
                validate(formRef.value, createServiceSchema,
                    async(body: any)=>{
                        const servicesInput = formRef.value.elements.services as HTMLInputElement;
                        if(!!servicesInput.dataset.value) {
                            body.services = servicesInput.dataset.value?.split(', ');
                        } else {
                            body.services = [];
                        }
                        const res = await sendData(body, '/hotel/service-category');
                        if(props.onSubmit) props.onSubmit(res);
                    }, { errorOff: true, clearAfterSubmit: true });
            }
        };
    };
</script>

<template>
    <Popup name="Создать категорию" position="end" resize :on-opened="()=>{handleValidate()}">
        <form class="popup__category-form" ref="formRef">
            <div class="popup__category-form__label-block">
                <ElementInput 
                    fake-placeholder="Название"
                    name="name"
                    id="popup-create-category-name-input"
                    :on-input="handleValidate"
                />
                <SelectDefault v-if="type === 'rooms'"
                    id="popup-create-category-select"
                    :options="allRooms"
                    name="rooms"
                    type="checkbox"
                    fake-placeholder="Номера в категории"
                    :on-update="()=>handleValidate()"
                    readonly
                />
                <SelectDefault v-else-if="type === 'services'"
                    id="popup-create-category-select"
                    :options="allServices"
                    name="services"
                    type="checkbox"
                    fake-placeholder="Услуги в категории"
                    :on-update="()=>handleValidate()"
                    readonly
                />
                <ElementInput v-if="type === 'services'"
                    type="textarea" 
                    name="description"
                    :maxLength="300"
                    :on-input="handleValidate"
                    fake-placeholder="Описание"
                />
            </div>
            <ElementButton size="large"
                name="button"
            >Создать
            </ElementButton>
        </form>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        :deep(.popup__content) {
            width: 53.25rem;
        }
        &__category-form {
            @include df_fdc;
            gap: 2rem;
            &__label-block {
                @include df_fdc;
                gap: 1rem;
            }
        }
    }
</style>