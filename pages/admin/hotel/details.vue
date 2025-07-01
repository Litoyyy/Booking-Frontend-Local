<script lang="ts" setup>

    interface BodyInterface {
        name: string;
        bank_name: string;
        legal_address: string;
        country: string;
        phone: string;
        inn: string;
        kpp: string;
        bank_name_second: string;
        bik: string;
        correspondent_account: string;
        current_account: string;
    }

    import { z } from 'zod'

    definePageMeta({
        isAdmin: true,
    });

    const schema = z.object({
        name: z.string().min(1),
        bank_name: z.string().min(1),
        legal_address: z.string().min(1),
        country: z.string().min(1),
        phone: z.string().min(16),
        inn: z.string().min(10).max(10),
        kpp: z.string().min(9).max(9),
        bank_name_second: z.string().min(1),
        bik: z.string().min(9).max(9),
        correspondent_account: z.string().min(24).max(24),
        current_account:  z.string().min(24).max(24)
    });

    const countriesList = ref([
        {
            name: "Россия"
        },
        {
            name: "Турция"
        },
        {
            name: "Узбекистан"
        },
    ]);

    const mainForm = ref<HTMLFormElement | null>(null);

    const validateForm =()=> {
        if (mainForm.value) {
            validate(mainForm.value, schema, 
                async(body: BodyInterface) => {
                    const sendInfo = {
                        requests: {
                            name: body.name,
                            bank_name: body.bank_name,
                            legal_address: body.legal_address,
                            country: body.country,
                            phone: body.phone,
                            inn: body.inn,
                            kpp: body.kpp,
                        },
                        bank_account: {
                            bank_name: body.bank_name_second,
                            bik: body.bik,
                            correspondent_account: body.correspondent_account,
                            current_account: body.current_account,
                        }
                    };
                    await sendData(sendInfo, '/hotel/settings/requests/update', 'PATCH');
                }
            );
        }
    };

    onMounted(()=>{
        validateForm();
    });

</script>

<template>
    <section>
        <div class="admin-details-section">
            <div class="admin-details-section__container container_admin">
                <div class="admin-section__title-block">
                    <div class="admin-section__title-block__title">
                        Реквизиты
                    </div>
                </div>
                <form class="admin-details-section__info-block" ref="mainForm">
                    <div class="admin-details-section__item">
                        <span class="admin-details-section__item__title">Информация об организации</span>
                        <div class="admin-details-section__item__content">
                            <ElementInput
                                class="span-2"
                                id="name-org"
                                name="name"
                                :on-input="()=>validateForm()"
                                fake-placeholder="Наименование юр.лица, ИП или ООО"
                                helper="В свободной форме, адрес, ИНН или ОГРН" />
                            <ElementInput
                                class="span-2"
                                id="name-for-bank"
                                name="bank_name"
                                :on-input="()=>validateForm()"
                                fake-placeholder="Наименование для банковского счета" />
                            <ElementInput
                                class="span-4"
                                id="legal-address"
                                name="legal_address"
                                :on-input="()=>validateForm()"
                                fake-placeholder="Юридический адрес" />
                            <SelectDefault 
                                id="country"
                                name="country"
                                :options="countriesList"
                                readonly
                                fake-placeholder="Страна" />
                            <ElementInput
                                id="phone-org"
                                name="phone"
                                :on-input="()=>validateForm()"
                                fake-placeholder="Номер телефона"
                                mask="+{7} (000) 000-00-00" />
                            <ElementInput
                                id="inn"
                                name="inn"
                                :on-input="()=>validateForm()"
                                fake-placeholder="ИНН"
                                mask="0000000000" />
                            <ElementInput
                                id="kpp"
                                name="kpp"
                                :on-input="()=>validateForm()"
                                fake-placeholder="КПП"
                                mask="000000000" />
                        </div>
                    </div>
                    <div class="admin-details-section__item">
                        <span class="admin-details-section__item__title">Банковский счет</span>
                        <div class="admin-details-section__item__content">
                            <ElementInput 
                                id="name-bank"
                                name="bank_name_second"
                                :on-input="()=>validateForm()"
                                fake-placeholder="Название банка"/>
                            <ElementInput 
                                id="bik-bank"
                                name="bik"
                                :on-input="()=>validateForm()"
                                fake-placeholder="БИК"
                                mask="000000000" />
                            <ElementInput 
                                id="check-bank"
                                name="correspondent_account"
                                :on-input="()=>validateForm()"
                                fake-placeholder="Корр.счет"
                                mask="000000000000000000000000" />
                            <ElementInput 
                                id="curr-bank"
                                name="current_account"
                                :on-input="()=>validateForm()"
                                fake-placeholder="Расчетный счет"
                                mask="000000000000000000000000" />
                        </div>
                    </div>
                    <ElementButton
                        size="large"
                        name="button"
                    >Сохранить
                    </ElementButton>
                </form>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    .admin-details-section {
        &__container {
            row-gap: 4rem;
        }
        .admin-section__title-block {
            grid-column: 2 / span 10;
        }
        &__info-block {
            grid-column: 2 / span 10;
            @include df_fdc;
            gap: 4rem;
        }
        &__item {
            @include df_fdc;
            gap: 1.5rem;
            &__title {
                @include heading_3;
                color: $text-primary;
            }
            &__content {
                @include grid(4, 1rem);
                .span-2 {
                    grid-column: span 2;
                }
                .span-4 {
                    grid-column: span 4;
                }
                &.grid-2 {
                    @include grid(2, 1rem);
                }
            }
        }
    }
</style>