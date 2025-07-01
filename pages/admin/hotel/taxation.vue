<script lang="ts" setup>
    import { z } from 'zod';

    definePageMeta({
        isAdmin: true,
    });

    const schema = z.object({
        org_name: z.string().min(1),
        org_phone: z.string().min(16),
        org_inn: z.string().min(9).max(10),
        org_system: z.string().min(1)
    })

    const mainForm = ref<HTMLFormElement | null>(null);

    let timer: ReturnType<typeof setTimeout> | null = null;

    const debounce = <T extends (...args: any[]) => void>(func: T, delay = 1500) => {
    return (...args: Parameters<T>) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
    };

    const validateForm = debounce(() => {
        if (mainForm.value) {
            validate(mainForm.value, schema, () => {
                console.log("wwwww");
            });
        }
    }, 1000);

</script>

<template>
    <section>
        <div class="admin-taxation-section">
            <div class="admin-taxation-section__container container_admin">
                <div class="admin-section__title-block">
                    <div class="admin-section__title-block__title">
                        Налогооблажение
                    </div>
                </div>
                <form class="admin-taxation-section__form" ref="mainForm" @input="validateForm">
                    <div class="admin-taxation-section__info-block">
                        <div class="admin-taxation-section__title">
                            Реквизиты организации
                            <ElementPopover>Что то в popover</ElementPopover>
                        </div>
                        <div class="admin-taxation-section__inputs">
                            <ElementInput class="gcs2"
                                id="org-name"
                                name="org_name"
                                fake-placeholder="Наименование юр.лица, ИП или ООО"
                                helper="В свободной форме, адрес, ИНН или ОГРН" />
                            <ElementInput 
                                id="org-phone"
                                name="org_phone"
                                fake-placeholder="Номер телефона"
                                mask="+{7} (000) 000-00-00" />
                            <ElementInput
                                id="org-inn"
                                name="org_inn"
                                fake-placeholder="ИНН"
                                mask="0000000000" />
                        </div>
                    </div>
                    <div class="admin-taxation-section__info-block">
                        <div class="admin-taxation-section__title">
                            Система
                            <ElementPopover>Popover system</ElementPopover>
                        </div>
                        <div class="admin-taxation-section__inputs">
                            <SelectDefault class="gcs2"
                                fake-placeholder="Система налогооблажения"
                                size='large'
                                readonly
                                id="system-org"
                                name="org_system" />
                        </div>
                    </div>
                    <div class="admin-taxation-section__info-block">
                        <div class="admin-taxation-section__title">
                            Детализация доп. услуг для юр.лиц
                                <ElementPopover>Доп поповер</ElementPopover>
                        </div>
                        <div class="admin-taxation-section__inputs">
                            <ElementCheckbox 
                                id="provide-services-org"
                                name="provide_services_org"
                            >Выделять доп.услуги
                            </ElementCheckbox>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    .admin-taxation-section {
        &__container {
            row-gap: 4rem;
        }
        .admin-section__title-block {
            grid-column: 2 / span 10;
        }
        &__form {
            grid-column: 2 / span 10;
            @include df_fdc;
            gap: 4rem;
        }
        &__title {
            @include heading_3;
            @include df_ac;
            gap: 0.25rem;
        }
        &__info-block {
            @include df_fdc;
            gap: 1.5rem;
        }
        &__inputs {
            @include grid(2, 1rem);
            .gcs2 {
                grid-column: span 2;
            }
        }
    }
</style>