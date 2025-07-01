<script lang="ts" setup>
    import { z } from 'zod';
    import { useServices } from '~/composables/services/useServices';

    const { allServices } = useServices();

    const router = useRouter();

    definePageMeta({
        isAdmin: true,
        breadcrumbs: [
            {
                name: 'Гостиница'
            },
            {
                name: 'Группы услуг',
                slug: '/admin/hotel/services/',
            },
            {
                name: 'Создать',
                slug: '/admin/hotel/services/create/',
                state: 'active'
            }
        ],
    });

    const formRef = ref<HTMLFormElement | null>(null);

    const createServiceSchema = z.object({
        name: z.string().min(1),
        description: z.string()
    });

    const handleValidate=()=>{
        if(formRef.value) {
            validate(formRef.value, createServiceSchema,
                async(body: any)=>{
                    const servicesInput = formRef.value.elements.services as HTMLInputElement;
                    if(!!servicesInput.dataset.value) {
                        body.services = servicesInput.dataset.value?.split(', ');
                    } else {
                        body.services = [];
                    }
                    const res = await sendData(body, '/hotel/service-category');
                    await router.push(`/admin/hotel/services/?created_category=${res.name}`);
                }, { errorOff: true, clearAfterSubmit: true });
        }
    }
</script>

<template>
    <section>
        <div class="service-create-section">
            <div class="service-create-section__container container_admin">
                <form class="service-create-section__form" ref="formRef">
                    <div class="service-create-section__form__inputs">
                        <ElementInput 
                            fake-placeholder="Название"
                            name="name"
                            id="popup-create-category-name-input"
                            :on-input="handleValidate"
                        />
                        <SelectDefault
                            id="popup-create-category-select"
                            :options="allServices"
                            name="services"
                            type="checkbox"
                            fake-placeholder="Услуги в категории"
                            :on-update="()=>handleValidate()"
                            readonly
                        />
                        <ElementInput
                            type="textarea" 
                            name="description"
                            :maxLength="300"
                            :on-input="handleValidate"
                            fake-placeholder="Описание"
                        />
                    </div>
                    <ElementButton 
                        size="large"
                        name="button"
                    >Создать
                    </ElementButton>
                </form>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    .service-create-section {
        &__form {
            grid-column: 2 / span 6;
            @include df_fdc;
            gap: 3.75rem;
            &__inputs {
                @include df_fdc;
                gap: 1rem;
            }
        }
    }
</style>