<script lang="ts" setup>
    import { z } from 'zod';
    import { usePriceRule } from '~/composables/services/usePriceRule';
    import { useMotivation } from '~/composables/services/useMotivation';
    
    const {
        priceRule
    } = usePriceRule();

    const {
        motivation
    } = useMotivation();

    const route = useRoute();

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
                name: 'Питание',
                slug: ''
            },
            {
                name: 'Создание',
                slug: '',
                state: 'active'
            },
        ],
        breadcrumbsSteps: [
            {
                name: '1.Общие настройки',
                slug: '/admin/hotel/services/create/1/',
                state: 'active'
            },
            {
                name: '2.Цены и ограничения',
                slug: '/admin/hotel/services/create/2/',
            },
        ],
        headerType: 'breadcrumbs-steps'
    });

    const serviceToEdit = route.query.service;
    const serviceToEditCategory = ref({});
    const allCategories = ref([]);

    const updateCategories = async() => {
        const getCategories = await getData('/hotel/service-category');
        allCategories.value = getCategories.results;
        if(!!route.query.category_id) {
            const activeCategoryId = Number(route.query.category_id);
            allCategories.value.map(item=>{
                if(item.id != activeCategoryId) return;
                serviceToEditCategory.value = item;
            });
        };
    };

    const formRef = ref<HTMLFormElement | null>(null);

    const createServiceSchema = z.object({
        name: z.string().min(1),
        price_rule: z.string().min(1),
        motivation: z.string().min(1),
        description: z.string()
    });

    const handleValidate=()=>{
        if(formRef.value) {
            validate(formRef.value, createServiceSchema,
                async(body: any, button: HTMLButtonElement)=>{
                    const elements = formRef.value?.elements;

                    const selectNames = ['motivation', 'category', 'price_rule'];
                    selectNames.map(name=>{
                        if(!!elements[`${name}`].value) {
                            body[`${name}`] = Number(elements[`${name}`].dataset.value);
                        } else {
                            delete body[`${name}`];
                        };
                    });

                    const router = useRouter();
                    if(button.dataset.button === 'continue') {
                        if(!!serviceToEdit) {
                            const send = await sendData(body, `/hotel/service/${serviceToEdit}`, 'PATCH');
                            router.push(`/admin/hotel/services/create/2/?service_id=${serviceToEdit.id}`);
                        } else {
                            const send = await sendData(body, '/hotel/service');
                            router.push(`/admin/hotel/services/create/2/?service_id=${send.id}`);
                        }
                    } else if(button.dataset.button === 'save') {
                        const send = await sendData(body, '/hotel/service');
                        router.push(`/admin/hotel/services/?service_created=${send.id}`);
                    };
                }
            );
        };
    };

    onMounted(()=>{
        updateCategories();
    });
</script>

<template>
    <section>
        <div class="create-service-first-step-section">
            <div class="create-service-first-step-section__container container_admin">
                <form class="create-service-first-step-section__form" ref="formRef">
                    <div class="create-service-first-step-section__info-block">
                        <div class="create-service-first-step-section__title-block">
                            <span class="title">Общая информация</span>
                        </div>
                        <div class="create-service-first-step-section__inputs-block">
                            <ElementInput
                                id="create-service-first-step-name-input"
                                fake-placeholder="Название"
                                name="name"
                                :oninput="()=>handleValidate()"
                            />
                            <SelectDefault
                                id="create-service-first-step-categories"
                                name="category"
                                :options="allCategories"
                                :selectedOptions="serviceToEditCategory"
                                fake-placeholder="Группа"
                                :onUpdate="(newValue?:string)=>handleValidate()"
                            />
                            <SelectDefault
                                id="create-service-first-step-accrual-rate"
                                name="price_rule"
                                :options="priceRule"
                                fake-placeholder="Темп начисления"
                                :onUpdate="(newValue?:string)=>handleValidate()"
                            />
                            <SelectDefault
                                id="create-service-first-step-motivation"
                                name="motivation"
                                :options="motivation"
                                fake-placeholder="Мотиватор(ы)"
                                :onUpdate="(newValue?:string)=>handleValidate()"
                            />
                            <ElementInput
                                id="create-service-first-step-desc-input"
                                type="textarea"
                                fake-placeholder="Описание"
                                name="description"
                                :max-length="300"
                                :oninput="()=>handleValidate()"
                            />
                        </div>
                        <ElementCheckbox
                            id="create-service-first-step-checkbox"
                            name="include_price_in_prepay"
                        >Включать стоимость услуги в стоимость предоплаты брони
                        </ElementCheckbox>
                    </div>
                    <div class="create-service-first-step-section__info-block">
                        <div class="create-service-first-step-section__title-block">
                            <span class="title">
                                Фотографии
                            </span>
                            <div class="title_sub">
                                <span>Максимальный размер изображения - 10МБ. </span>
                                <span>Максимальное количество - 30 штук</span>
                            </div>
                        </div>
                        <div class="create-service-first-step-section__selectors-block">
                            <ElementImageSelector
                                :max-size="10000000"
                            />
                        </div>
                    </div>
                    <div class="create-service-first-step-section__btns-block">
                        <ElementButton
                            size="large"
                            name="button"
                            data-button="continue"
                        >Продолжить
                        </ElementButton>
                        <ElementButton
                            size="large"
                            color="transparent"
                            name="button"
                            data-button="save"
                        >Сохранить
                        </ElementButton>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    .create-service-first-step-section {
        &__form {
            grid-column: 2 / span 6;
            @include df_fdc;
            gap: 3rem;
        }
        &__info-block {
            @include df_fdc;
            gap: 1.5rem;
        }
        &__title-block {
            @include df_fdc;
            gap: .25rem;
            .title {
                @include heading_3;
                &_sub {
                    @include df_fdc;
                    @include text_1;
                    color: $text-primary-transparent-48;
                }
            }
        }
        &__inputs-block {
            @include df_fdc;
            gap: 1rem;
        }
        &__btns-block {
            @include df_ac;
            gap: .75rem;
            padding-bottom: 4rem;
        }
    }
</style>