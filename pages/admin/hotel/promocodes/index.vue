<script lang="ts" setup>
    import { z } from 'zod';
    const route = useRoute();

    definePageMeta({
        isAdmin: true,
    });

    const displayState = ref('rows');
    const createPopupOpened = ref(false);
    const dialogCreatedShow = ref(false);

    const createdPromo = ref({});

    const allPromos = ref([]);

    const updPromos =async()=>{
        const res = await getData('/promotions/promocode');
        allPromos.value = res.results;
        allPromos.value.map(item=>item.checked = item.checked ? item.checked : false);
    };

    const {
        allChecked,
        checkAllFunc
    } = useTableCheckboxes(allPromos);
    
    const formRef = ref<HTMLFormElement | null>(null);

    const createPromoSchema = z.object({
        code: z.string().min(1),
        description: z.string(),
    });

    const handleValidate=()=>{
        if(formRef.value) {
            validate(formRef.value, createPromoSchema,
                async(body: any)=>{
                    body.name = body.code;
                    const res = await sendData(body, '/promotions/promocode');
                    createdPromo.value = res;
                    dialogCreatedShow.value = true;
                    updPromos();
                }, { clearAfterSubmit: true, errorOff: true }
            )
        }
    };

    onMounted(async()=>{
        updPromos();
        if(formRef.value) {
            validate(formRef.value, createPromoSchema,
                (body: any)=>{}, { errorOff: true }
            );
        };
        const createdPromoQuery = route.query.created_promo;
        if(!!createdPromoQuery) {
            const res = await getData(`/promotions/promocode/${createdPromoQuery}`);
            createdPromo.value = res;
            dialogCreatedShow.value = true;
        };
    });

</script>

<template>
    <section>
        <div class="admin-promocodes-section">
            <div class="admin-promocodes-section__container container_admin">
                <div class="admin-promocodes-section__header">
                    
                    <div class="admin-section__title-block">
                        <div class="admin-section__title-block__title">
                            Промокоды
                        </div>
                        <div class="admin-section__title-block__btns-block">
                            <div class="admin-section__title-block__btns-block__btns">
                                <ElementIconButton
                                    color="transparent"
                                    :state="displayState === 'rows' ? 'active' : ''"
                                    @click="()=>{displayState = 'rows'}"
                                    ghost
                                ><svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24.5 23.8333C24.5 24.4777 23.9777 25 23.3333 25L4.66667 25C4.02232 25 3.5 24.4777 3.5 23.8333L3.5 20.7184C3.5 20.0741 4.02232 19.5518 4.66667 19.5518H23.3333C23.9777 19.5518 24.5 20.0741 24.5 20.7184V23.8333Z" fill="#2D3033" fill-opacity="0.48"/>
                                    <path d="M24.5 8.27342C24.5 8.91777 23.9777 9.44009 23.3333 9.44009L4.66667 9.44008C4.02232 9.44008 3.5 8.91777 3.5 8.27342L3.5 5.16667C3.5 4.52232 4.02232 4 4.66667 4L23.3333 4C23.9777 4 24.5 4.52232 24.5 5.16667V8.27342Z" fill="#2D3033" fill-opacity="0.48"/>
                                    <path d="M24.5 16.0567C24.5 16.701 23.9777 17.2234 23.3333 17.2234L4.66667 17.2234C4.02232 17.2234 3.5 16.701 3.5 16.0567L3.5 12.9418C3.5 12.2975 4.02232 11.7751 4.66667 11.7751L23.3333 11.7751C23.9777 11.7751 24.5 12.2975 24.5 12.9418L24.5 16.0567Z" fill="#2D3033" fill-opacity="0.48"/>
                                </svg>
                                </ElementIconButton>
                                <ElementIconButton
                                    color="transparent"
                                    :state="displayState === 'cards' ? 'active' : ''"
                                    @click="()=>{displayState = 'cards'}"
                                    ghost
                                ><svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M25.6667 15.6655V23.8333C25.6667 24.4777 25.1444 25 24.5 25H15.1667V15.6655H25.6667ZM12.8334 15.6655V25H3.50004C2.85571 25 2.33337 24.4777 2.33337 23.8333V15.6655H12.8334ZM12.8334 4V13.3322H2.33337V5.16667C2.33337 4.52234 2.85571 4 3.50004 4H12.8334ZM24.5 4C25.1444 4 25.6667 4.52234 25.6667 5.16667V13.3322H15.1667V4H24.5Z" fill="#2D3033" fill-opacity="0.48"/>
                                </svg>
                                </ElementIconButton>
                            </div>
                            <ElementButton
                                @click="()=>{
                                    createPopupOpened = true;
                                }"
                            >Создать
                            </ElementButton>
                        </div>
                    </div>

                </div>
                <div class="admin-promocodes-section__body">

                    <div class="admin-promocodes-section__body__table" v-if="displayState === 'rows'">
                        <table class="table">
                            <thead class="table__head">
                                <tr>
                                    <th class="table__checkbox">
                                        <ElementCheckbox
                                            :checked="allChecked"
                                            :on-update="(checked: boolean)=>checkAllFunc(checked)"
                                            id="table-head-checkbox"
                                        />
                                    </th>
                                    <th class="table__t2 table__t2_heading table__toggle">Вкл.</th>
                                    <th class="table__t2 table__t2_heading table__promo">Промокод</th>
                                    <th class="table__t2 table__t2_heading table__discount-type">Тип скидки</th>
                                    <th class="table__t2 table__t2_heading table__discount">Скидка</th>
                                    <th class="table__t2 table__t2_heading table__description">Описание</th>
                                    <th class="table__drag">
                                        <ElementIconButton
                                            size="small"
                                            color="transparent-secondary"
                                            disabled
                                            ghost
                                        ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#2D3033" fill-opacity="0.32"/>
                                        </svg>
                                        </ElementIconButton>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="table__body">
                                <tr v-for="promo in allPromos">
                                    <td>
                                        <ElementCheckbox
                                            :id="`table-promocodes-checkbox-${promo.id}`"
                                            :checked="promo.checked"
                                            :on-update="(checked: boolean)=>{promo.checked = checked}"
                                        />
                                    </td>
                                    <td>
                                        <ElementToggle
                                            v-model:checked="promo.is_active"
                                            :on-change="async(checked: boolean)=>{
                                                promo.is_active = checked;
                                                await sendData(promo, `/promotions/promocode/${promo.id}`, 'PATCH');
                                            }"
                                            :id="`table-toggle-${promo.id}`"
                                        />
                                    </td>
                                    <td>
                                        <ElementLink
                                            :link="`/admin/hotel/promocodes/create/?promo_id=${promo.id}`"
                                            color="neutral"
                                        >{{ promo.name }}
                                        </ElementLink>
                                    </td>
                                    <td class="table__t1 table__t1_tp" colspan="3">
                                        {{ promo.description ?? '' }}
                                    </td>
                                    <td>
                                        <Dropdown menu-side="left">
                                            <template #header>
                                                <ElementIconButton
                                                    size="small"
                                                    color="transparent-secondary"
                                                    ghost
                                                ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#2D3033" fill-opacity="0.32"/>
                                                </svg>
                                                </ElementIconButton>
                                            </template>
                                            <ElementOption>
                                                <NuxtLink :to="`/admin/hotel/promocodes/create/?promo_id=${promo.id}`">
                                                    Редактировать
                                                </NuxtLink>
                                            </ElementOption>
                                            <ElementOption
                                                :on-click="async()=>{
                                                    await sendData('', `/promotions/promocode/${promo.id}`, 'DELETE');
                                                    updPromos();
                                                }"
                                            >Удалить
                                            </ElementOption>
                                        </Dropdown>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <form class="admin-promocodes-section__body__create-form" ref="formRef" v-if="displayState === 'rows'">
                        <ElementInput class="field_code"
                            id="admin-promocodes-create-code-input"
                            name="code"
                            fake-placeholder="Промокод"
                            helper="Введите ячейки и нажмите ↵ Enter"
                            :on-input="()=>handleValidate()"
                        />
                        <ElementInput class="field_description"
                            id="admin-promocodes-create-description-input"
                            name="description"
                            fake-placeholder="Описание"
                            :on-input="()=>handleValidate()"
                        />
                        <button class="hidden" name="button"></button>
                    </form>
                    <div class="admin-promocodes-section__body__cards" v-if="displayState === 'cards'">
                        <TableCardPromo v-for="promo in allPromos"
                            :res="promo"
                            v-model:checked="promo.is_active"
                            :on-change="async(checked: boolean)=>{
                                promo.is_active = checked;
                                await sendData(promo, `/promotions/promocode/${promo.id}`, 'PATCH');
                            }"
                            :id="`promotion-promo-${promo.id}`"
                        >
                        <template #icon_button>
                            <Dropdown menu-side="left">
                                <template #header>
                                    <ElementIconButton
                                        size="small"
                                        color="transparent-secondary"
                                        ghost
                                    ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#2D3033" fill-opacity="0.32"/>
                                    </svg>
                                    </ElementIconButton>
                                </template>
                                <ElementOption>
                                    <NuxtLink :to="`/admin/hotel/promocodes/create/?promo_id=${promo.id}`">
                                        Редактировать
                                    </NuxtLink>
                                </ElementOption>
                                <ElementOption
                                    :on-click="async()=>{
                                        await sendData('', `/promotions/promocode/${promo.id}`, 'DELETE');
                                        updPromos();
                                    }"
                                >Удалить
                                </ElementOption>
                            </Dropdown>
                        </template>
                        </TableCardPromo>
                    </div>

                </div>
            </div>
        </div>
    </section>

    <Dialog
        draw-line
        v-model:visible="dialogCreatedShow"
        title="Создание завершено"
        :description="createdPromo?.code"
    />
    <PopupCreatePromocode
        v-model:visible="createPopupOpened"
        :onSubmit="(createdObject: object)=>{
            createdPromo = createdObject;
            createPopupOpened = false;
            updPromos()
        }"
    />
</template>

<style lang="scss">
    .admin-promocodes-section {
        &__header {
            grid-column: span 12;
        }
        &__body {
            grid-column: span 12;
            &__table {
                .table {
                    width: 100%;
                    &__promo {
                        min-width: 30rem;
                    }
                    &__discount-type {
                        min-width: 15rem;
                    }
                    &__discount {
                        min-width: 12.5rem;
                    }
                    &__description {
                        width: 100%;
                    }
                }
            }
            &__create-form {
                position: relative;
                display: flex;
                padding: 1.5rem;
                padding-left: 8.25rem;
                padding-right: 4rem;
                .hidden {
                    position: absolute;
                    opacity: 0;
                    scale: 0;
                }
                .field {
                    &_code {
                        min-width: 30rem;
                        .input-label {
                            border-radius: .5rem 0 0 .5rem;
                            border-right: 1px solid $border-primary-subdued-8;
                        }
                    }
                    &_description {
                        width: 100%;
                        .input-label {
                            border-radius: 0 .5rem .5rem 0;
                        }
                    }
                }
            }
            &__cards {
                @include grid(4, 1rem);
            }
        }
    }
</style>