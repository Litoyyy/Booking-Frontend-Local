<script lang="ts" setup>
    import { z } from 'zod';

    definePageMeta({
        isAdmin: true,
        breadcrumbs: [
            {
                name: 'Номера'
            },
            {
                name: 'Тарифы',
                slug: '/admin/numbers/tariff/',
            },
            {
                name: 'Создать',
                slug: '/admin/numbers/tariff/create/1/',
                state: 'active'
            }
        ],
        breadcrumbsSteps: [
            {
                name: '1.Общие настройки',
                slug: '/admin/numbers/tariff/create/1/',
                state: 'active'
            },
            {
                name: '2.Цены и ограничения',
                slug: '/admin/numbers/tariff/create/2/',
            },
            {
                name: '3.Услуги',
                slug: '/admin/numbers/tariff/create/3/',
            },
        ],
        headerType: 'breadcrumbs-steps'
    });

    const route = useRoute();

    const tariffToEdit = ref({});

    const getTariffInfo=async()=>{
        const tariffToEditId = route.query.tariff_id;
        if(!!tariffToEditId) {
            try {
                const res = await getData(`/hotel/tariffs/${tariffToEditId}`);
                tariffToEdit.value = res;
            } catch (error) {
                console.error('Failed "GET" tariffInfo');
            }
        }
    }
    
    const allRooms = ref([]);
    const paymentMethods = ref([]);

    const disabledForm = ref(false);

    const inherited = ref(false);
    const periodical = ref(false);

    const checkInheritedCreate=()=>{
        const tariffInherited = route.query.inherited;
        if(!!tariffInherited) {
            inherited.value = !!tariffInherited;
        };
    };

    const formRef = ref<HTMLFormElement | null>(null);
    
    const createTariffSchema = z.object({
        name: z.string().min(1),
        description: z.string(),
        payment_type: z.string().min(1),
        rooms: z.string().min(1)
    });

    const handleValidate=()=>{
        if(!formRef.value) return;
        validate(formRef.value, createTariffSchema,
            async(body: Object, button: HTMLButtonElement)=>{
                const isActive = formRef.value?.elements.is_active.checked;
                const sumWithPromo = formRef.value?.elements.sum_with_promo_code.checked;

                const startDateElem = formRef.value?.elements.start_date;
                const endDateElem = formRef.value?.elements.end_date;
                if(startDateElem) body.start_date = formatDate(startDateElem.dataset.value, false, true);
                if(endDateElem) body.end_date = formatDate(endDateElem.dataset.value, false, true)
                else {
                    delete body.start_date;
                    delete body.end_date;
                };

                const discountValueElem = formRef.value?.elements.discount_value;
                const discountTypeElem = formRef.value?.elements.discount_type;
                if(discountValueElem) body.discount_value =  Number(discountValueElem.value);
                if(discountTypeElem) body.discount_type =  Number(discountTypeElem.dataset.value);
                else {
                    delete body.discount_value;
                    delete body.discount_type;
                };

                body.rooms = formRef.value?.elements.rooms.dataset.value.split(', ').map(item=>item = Number(item));
                body.payment_type = formRef.value?.elements.payment_type.dataset.value.split(', ').map(item=>item = Number(item));

                body.is_active = isActive;
                body.sum_with_promo_code = sumWithPromo;


                const router = useRouter();
                if(button.dataset.button === 'continue') {
                    if(!!tariffToEdit.id) {
                        const send = await sendData(body, `/hotel/tariffs/${tariffToEdit.id}`, 'PATCH');
                        router.push(`/admin/numbers/tariff/create/2/?tariff_id=${tariffToEdit.id}`);
                    } else {
                        const send = await sendData(body, '/hotel/tariffs');
                        router.push(`/admin/numbers/tariff/create/2/?tariff_id=${send.id}`);
                    }
                } else if(button.dataset.button === 'save') {
                    await sendData(body, '/hotel/tariffs');
                    router.push('/admin/numbers/tariff/');
                };
            }
        );
    };

    onMounted(async()=>{
        const getRooms = await getData('/hotel/room');
        allRooms.value = getRooms.results;
        const getPayment = await getData('/hotel/payment-methods');
        paymentMethods.value = getPayment.results;
        checkInheritedCreate();
        getTariffInfo();
        if(!formRef.value) return;
        validate(formRef.value, createTariffSchema,
            ()=>{},
            { errorOff: true }
        );
    });

</script>

<template>
    <section>
        <div class="create-tariff-section">
            <form class="create-tariff-section__container container" ref="formRef" :data-disabled="disabledForm">
                <div class="create-tariff-section__item">
                    <div class="create-tariff-section__item__title">
                        Общая информация
                    </div>
                    <div class="create-tariff-section__item__inputs">
                        <ElementInput
                            id="create-tariff-name-input"
                            name="name"
                            fake-placeholder="Название"
                            :new-value="tariffToEdit?.name"
                            :on-input="handleValidate"
                        />
                        <SelectDefault
                            id="create-tariff-rooms-selector"
                            fake-placeholder="Номера"
                            name="rooms"
                            type="checkbox"
                            :onUpdate="handleValidate"
                            :selectedOptions="tariffToEdit?.rooms"
                            :options="allRooms"
                        />
                        <SelectDefault
                            id="create-tariff-payment-selector"
                            fake-placeholder="Возможные способы оплаты"
                            name="payment_type"
                            type="checkbox"
                            :onUpdate="handleValidate"
                            :selectedOptions="tariffToEdit?.payment_type"
                            :options="paymentMethods"
                        />
                        <ElementInput
                            id="create-tariff-description-textarea"
                            type="textarea"
                            :max-length="300"
                            :new-value="tariffToEdit?.description"
                            name="description"
                            fake-placeholder="Описание тарифа"
                            :on-input="handleValidate"
                        />
                    </div>
                    <div class="create-tariff-section__item__checkboxes">
                        <ElementCheckbox
                            id="create-tariff-inherited-checkbox"
                            :onUpdate="(checked: boolean)=>{
                                inherited = checked;
                                disabledForm = checked;
                                handleValidate()
                            }"
                            :checked="inherited"
                        >Наследуемый
                        </ElementCheckbox>
                        <div class="create-tariff-section__item__inputs" v-if="inherited">
                            <SelectDefault
                                id="create-tariff-inherited-selector"
                                fake-placeholder="Наследовать тариф"
                                :onUpdate="handleValidate"
                            />
                            <div class="create-tariff-section__item__inputs__block">
                                <ElementInput
                                    id="create-tariff-discount-input"
                                    name="discount_value"
                                    fake-placeholder="Размер скидки"
                                    :on-input="handleValidate"
                                    :new-value="`${tariffToEdit.discount_value ?? ''}`"
                                    :mask="Number"
                                />
                                <SelectDefault
                                    id="create-tariff-discount-type-selector"
                                    fake-placeholder="Счисление"
                                    name="discount_type"
                                    :onUpdate="handleValidate"
                                    :selectedOptions="!!tariffToEdit?.discount_type ? [{id: tariffToEdit?.discount_type}]: undefined"
                                    :options="[
                                        {
                                            name: 'Руб.',
                                            id: 1,
                                        },
                                        {
                                            name: '%',
                                            id: 2,
                                        },
                                    ]"
                                />
                            </div>
                        </div>
                        <ElementCheckbox
                            id="create-tariff-periodical-checkbox"
                            :onUpdate="(checked: boolean)=>{
                                periodical = checked;
                                disabledForm = checked;
                                handleValidate();
                            }"
                        >Работает в конкретный период
                        </ElementCheckbox>
                        <div class="create-tariff-section__item__inputs" v-if="periodical">
                            <DatePicker range-select
                                first-placeholder="С"
                                last-placeholder="По"
                                first-name="start_date"
                                last-name="end_date"
                                :first-date="tariffToEdit?.start_date"
                                :last-date="tariffToEdit?.end_date"
                                @update="(firstDate: string, lastDate: string)=>{
                                    if(!!firstDate && !!lastDate) {
                                        disabledForm = false;
                                    } else {
                                        disabledForm = true;
                                    };
                                    handleValidate();
                                }"
                            />
                        </div>
                    </div>
                </div>
                <div class="create-tariff-section__item">
                    <div class="create-tariff-section__item__title">
                        Условия
                    </div>
                    <div class="create-tariff-section__item__inputs">
                        <div class="create-tariff-section__item__inputs__block">
                            <ElementCounter
                                id="create-tariff-counter-input-from"
                                fake-placeholder="Длительность проживания, от"
                            />
                            <ElementCounter
                                id="create-tariff-counter-input-to"
                                fake-placeholder="Длительность проживания, до"
                            />
                        </div>
                        <SelectDefault
                            id="create-tariff-decline-selector"
                            placeholder="Отмена и аннуляция"
                            type="checkbox"
                            :onUpdate="handleValidate"
                        />
                    </div>
                    <ElementCheckbox
                        id="create-tariff-sum-with-promo-checkbox"
                        name="sum_with_promo_code"
                        :checked="tariffToEdit?.sum_with_promo_code"
                    >Суммируется с промокодом
                    </ElementCheckbox>
                </div>
                <div class="create-tariff-section__item">
                    <ElementCheckbox
                        id="create-tariff-active-checkbox"
                        name="is_active"
                        :checked="tariffToEdit?.is_active"
                    >Активен после создания
                    </ElementCheckbox>
                    <div class="create-tariff-section__item__buttons">
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
                </div>
            </form>
        </div>
    </section>
</template>



<style lang="scss">
    .create-tariff-section {
        &__container {
            padding: 1.5rem 0 4rem;
            row-gap: 2rem;
        }
        &__item {
            grid-column: 2 / span 6;
            @include df_fdc;
            gap: 1.5rem;
            &__title {
                @include heading_3;
            }
            &__inputs {
                @include df_fdc;
                gap: 1rem;
                &__block {
                    @include grid(2, 1rem);
                }
                .calendar-container__inputs {
                    gap: 1rem;
                }
            }
            &__checkboxes {
                @include df_fdc;
                gap: 1.5rem;
            }
            &__buttons {
                @include df_ac;
                gap: .75rem;
            }
        }
    }
</style>