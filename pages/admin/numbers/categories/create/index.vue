<script lang="ts" setup>
    import { z } from 'zod';
    import { useRooms } from '~/composables/rooms/useRooms';

    const { allRooms } = useRooms();

    const { getCategories } = navSidebar();

    const router = useRouter();

    definePageMeta({
        isAdmin: true,
    });

    
    const formRef = ref<HTMLFormElement | null>(null);

    const createRoomSchema = z.object({
        name: z.string().min(1),
    });

    const handleValidate = () => {
        if(formRef.value) {
            validate(formRef.value, createRoomSchema,
                async(body: any)=>{
                    const roomsInput = formRef.value.elements.rooms as HTMLInputElement;
                    body.rooms = roomsInput.dataset.value?.split(', ');
                    const res = await sendData(body, '/hotel/room-category');
                    getCategories();
                    await router.push(`/admin/numbers/categories/?created_category=${res.name}`);
                }, { errorOff: true, clearAfterSubmit: true });
        };
    };

    onMounted(()=>{
        if(formRef.value) {
            validate(formRef.value, createRoomSchema,
                (body: any)=>{},
                { errorOff: true }
            );
        };
    });

</script>

<template>
    <section>
        <div class="create-category-section">
            <div class="create-category-section__container container">
                <form class="create-category-section__form" ref="formRef">
                    <div class="create-category-section__form__inputs">
                        <ElementInput
                            id="create-category-name"
                            name="name"
                            fake-placeholder="Название"
                            :on-input="handleValidate"
                        />
                        <SelectDefault
                            id="create-categories-select"
                            :options="allRooms"
                            name="rooms"
                            type="checkbox"
                            fake-placeholder="Номера в категории"
                            :on-update="()=>handleValidate()"
                            readonly
                        />
                    </div>
                    <ElementButton
                        name="button"
                    >Создать
                    </ElementButton>
                </form>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    .create-category-section {
        &__container {
            padding: 1.5rem 0;
        }
        &__form {
            grid-column: 2 / span 6;
            @include df_fdc;
            gap: 2rem;
            &__inputs {
                @include df_fdc;
                gap: 1rem;
            }
        }
    }
</style>