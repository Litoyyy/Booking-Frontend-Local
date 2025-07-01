<script lang="ts" setup>

    definePageMeta({
        isAdmin: true,
    });

    const displayState = ref('rows');
    const popupOpened = ref(false);
    
    const paymentItems = ref([]);

    const {
        allChecked,
        checkAllFunc
    } = useTableCheckboxes(paymentItems);
    
    const getPaymentItems=async()=>{
        const res = await getData('/hotel/payment-methods');
        paymentItems.value = res.results;
    };


    onMounted(()=>{
        getPaymentItems();
        
    });

    const rowRefs = ref<HTMLElement[]>([]);
    const zoneRef = ref<HTMLElement>();

</script>

<template>
    <section>
        <div class="admin-payment-methods-section">
            <div class="admin-payment-methods-section__container container_admin">
                <div class="admin-payment-methods-section__header">

                    <div class="admin-section__title-block">
                        <div class="admin-section__title-block__title">
                            Способы оплаты
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
                        </div>
                    </div>

                    <div class="admin-payment-methods-section__header__tax">
                        <span class="admin-payment-methods-section__header__tax__text">Налогооблажение:</span>
                        <div class="admin-payment-methods-section__header__tax__inputs">
                            <SelectDefault 
                                :class="'w-332'"
                                id="admin-payment-select-for-what"
                                fake-placeholder="За сколько"
                                readonly
                            />
                            <span class="admin-payment-methods-section__header__tax__text">за</span>
                            <div class="admin-payment-methods-section__header__tax__inputs__time">
                                <SelectDefault 
                                    :class="'w-176'"
                                    id="admin-payment-select-value"
                                    fake-placeholder="Кол-во"
                                    readonly
                                />
                                <SelectDefault 
                                    :class="'w-176'"
                                    id="admin-payment-select-time"
                                    fake-placeholder="Времени"
                                    readonly
                                />
                            </div>
                        </div>
                    </div>
                    <div class="admin-payment-methods-section__header__ecvire">
                        <div class="close-toggle">
                            <div class="close-toggle__item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M12.6667 6.66668H13.3333C13.7015 6.66668 14 6.96514 14 7.33334V14C14 14.3682 13.7015 14.6667 13.3333 14.6667H2.66667C2.29848 14.6667 2 14.3682 2 14V7.33334C2 6.96514 2.29848 6.66668 2.66667 6.66668H3.33333V6.00001C3.33333 3.42268 5.42267 1.33334 8 1.33334C10.5773 1.33334 12.6667 3.42268 12.6667 6.00001V6.66668ZM11.3333 6.66668V6.00001C11.3333 4.15906 9.84093 2.66668 8 2.66668C6.15905 2.66668 4.66667 4.15906 4.66667 6.00001V6.66668H11.3333ZM7.33333 9.33334V12H8.66667V9.33334H7.33333Z" fill="#E68F6F"/>
                                </svg>
                            </div>
                        </div>
                        <span class="admin-payment-methods-section__header__ecvire__text">Эквайринг BookingModule (банк.карта РФ), первых ночей: 1</span>
                    </div>
                </div>

                <div class="admin-payment-methods-section__table" v-if="displayState === 'rows'">
                    <table class="table" table="columns">
                        <thead class="table__head">
                            <tr>
                                <th class="table__t1 table__year table__checkbox">
                                    <ElementCheckbox 
                                        id="allItemsCheckbox"
                                        name="allItemsCheckbox"
                                        :checked="allChecked"
                                        :on-update="(checked: boolean)=>{
                                            checkAllFunc(checked);
                                        }"
                                    />
                                </th>
                                <th class="table__t1 table__year table__drag-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M8.5 7C9.32843 7 10 6.32843 10 5.5C10 4.67157 9.32843 4 8.5 4C7.67157 4 7 4.67157 7 5.5C7 6.32843 7.67157 7 8.5 7ZM8.5 13.5C9.32843 13.5 10 12.8284 10 12C10 11.1716 9.32843 10.5 8.5 10.5C7.67157 10.5 7 11.1716 7 12C7 12.8284 7.67157 13.5 8.5 13.5ZM10 18.5C10 19.3284 9.32843 20 8.5 20C7.67157 20 7 19.3284 7 18.5C7 17.6716 7.67157 17 8.5 17C9.32843 17 10 17.6716 10 18.5ZM15.5 7C16.3284 7 17 6.32843 17 5.5C17 4.67157 16.3284 4 15.5 4C14.6716 4 14 4.67157 14 5.5C14 6.32843 14.6716 7 15.5 7ZM17 12C17 12.8284 16.3284 13.5 15.5 13.5C14.6716 13.5 14 12.8284 14 12C14 11.1716 14.6716 10.5 15.5 10.5C16.3284 10.5 17 11.1716 17 12ZM15.5 20C16.3284 20 17 19.3284 17 18.5C17 17.6716 16.3284 17 15.5 17C14.6716 17 14 17.6716 14 18.5C14 19.3284 14.6716 20 15.5 20Z" fill="#2D3033" fill-opacity="0.32"/>
                                    </svg>
                                </th>
                                <th  class="table__t2 table__t2_heading table__toggle">
                                    Вкл.
                                </th>
                                <th class="table__t2 table__t2_heading table__payment-text">
                                    Способы оплаты
                                </th>
                                <th class="table__t2 table__t2_heading table__tarifs">
                                    Тарифы
                                </th>
                                <th class="table__t2 table__t2_heading table__prepayment">
                                    Предоплата
                                </th>
                                <th class="table__t2 table__t2_heading table__check-in">
                                    Доступно до заезда
                                </th>
                                <th class="table__t2 table__t2_heading table__same-width">
                                    Отмена
                                </th>
                                <th class="table__t2 table__t2_heading table__same-width">
                                    Подробнее
                                </th>
                                <th class="table__t2 table__t2_heading table__drag-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#2D3033" fill-opacity="0.16"/>
                                    </svg>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="table__body" ref="zoneRef">
                            <tr v-for="(item, index) in paymentItems" 
                                :key="item.id" 
                                ref="rowRefs"
                                ref_for
                            >
                                <td>
                                    <ElementCheckbox 
                                        :id="`items-checkbox-${item.id}`"
                                        name="allItemsCheckbox"
                                        :checked="item.checked"
                                        :on-update="(checked: boolean)=>{
                                            item.checked = checked;
                                        }"
                                    />
                                </td>
                                <td class="table__drag-icon">
                                    <TableDragElem
                                        :all-draggable="rowRefs"
                                        :drag-zone="zoneRef"
                                        :cur-index="index"
                                    />
                                </td>
                                <td>
                                    <ElementToggle 
                                        :checked="item.is_active"
                                        :on-change="(checked: boolean)=>{
                                            item.is_active = checked
                                            sendData(item, `/hotel/payment-methods/${item.id}`, 'PATCH');
                                        }"
                                    />
                                </td>
                                <td class="table__t1 table__payment-text">
                                    <span class="table__payment-text__title">
                                        {{ item.name }}
                                    </span>
                                    <span 
                                        v-if="item.accessibility_type"
                                        class="table__payment-text__text"
                                    >
                                        {{ item.accessibility_type }}
                                    </span>
                                </td>
                                <td class="table__t1 table__t1_tp">
                                    <template v-if="item.tariffs.length === 0">
                                        Нет
                                    </template>
                                    <template v-else>
                                        {{ item.tariffs.length }}
                                    </template>
                                </td>
                                <td class="table__t1 table__t1_tp table__prepayment">
                                    {{ item.prepayment }}
                                </td>
                                <td class="table__t1 table__t1_tp table__check-in">
                                    {{ item.checkIn }}
                                </td>
                                <td class="table__t1 table__t1_tp">
                                    <template v-if="item.can_refund">
                                        Разрешена
                                    </template>
                                    <template v-else>
                                        Запрещена
                                    </template>
                                </td>
                                <td>
                                    <ElementLink
                                        color="neutral"
                                    >Подробнее
                                    </ElementLink>
                                </td>
                                <td>
                                    <ElementIconButton
                                        size="small"
                                        color="transparent-secondary"
                                        ghost
                                    ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.8995 6.85454L17.1421 11.0972L7.24264 20.9967H3V16.754L12.8995 6.85454ZM14.3137 5.44033L16.435 3.31901C16.8256 2.92849 17.4587 2.92849 17.8492 3.31901L20.6777 6.14744C21.0682 6.53796 21.0682 7.17113 20.6777 7.56165L18.5563 9.68297L14.3137 5.44033Z" fill="#2D3033" fill-opacity="0.32"/>
                                    </svg>
                                    </ElementIconButton>
                                </td>
                            </tr>


                        </tbody>
                    </table>
                </div>

                <div class="admin-payment-methods-section__grid" v-if="displayState === 'cards'">
                    <div 
                        v-for="item in paymentItems"
                        class="item"
                    >
                        <div class="item__header">
                            <div class="item__header__buttons">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M8.5 7C9.32843 7 10 6.32843 10 5.5C10 4.67157 9.32843 4 8.5 4C7.67157 4 7 4.67157 7 5.5C7 6.32843 7.67157 7 8.5 7ZM8.5 13.5C9.32843 13.5 10 12.8284 10 12C10 11.1716 9.32843 10.5 8.5 10.5C7.67157 10.5 7 11.1716 7 12C7 12.8284 7.67157 13.5 8.5 13.5ZM10 18.5C10 19.3284 9.32843 20 8.5 20C7.67157 20 7 19.3284 7 18.5C7 17.6716 7.67157 17 8.5 17C9.32843 17 10 17.6716 10 18.5ZM15.5 7C16.3284 7 17 6.32843 17 5.5C17 4.67157 16.3284 4 15.5 4C14.6716 4 14 4.67157 14 5.5C14 6.32843 14.6716 7 15.5 7ZM17 12C17 12.8284 16.3284 13.5 15.5 13.5C14.6716 13.5 14 12.8284 14 12C14 11.1716 14.6716 10.5 15.5 10.5C16.3284 10.5 17 11.1716 17 12ZM15.5 20C16.3284 20 17 19.3284 17 18.5C17 17.6716 16.3284 17 15.5 17C14.6716 17 14 17.6716 14 18.5C14 19.3284 14.6716 20 15.5 20Z" fill="#2D3033" fill-opacity="0.48"/>
                                </svg>
                                <ElementToggle 
                                    :checked="item.on"
                                />
                            </div>
                            <div class="item__header__edit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12.8995 6.85454L17.1421 11.0972L7.24264 20.9967H3V16.754L12.8995 6.85454ZM14.3137 5.44033L16.435 3.31901C16.8256 2.92849 17.4587 2.92849 17.8492 3.31901L20.6777 6.14744C21.0682 6.53796 21.0682 7.17113 20.6777 7.56165L18.5563 9.68297L14.3137 5.44033Z" fill="#2D3033" fill-opacity="0.32"/>
                                </svg>
                            </div>
                        </div>
                        <div class="item__info-block-4">
                            <span class="item__title">
                                {{ item.name }}
                            </span>
                            <span class="item__text" v-if="item.accessibility_type">
                                {{ item.accessibility_type }}
                            </span>
                        </div>
                        <div class="item__info-block">
                            <span class="item__text">
                                <template v-if="item.tariffs.length === 0">
                                    Нет
                                </template>
                                <template v-else>
                                    {{ item.tariffs.length }}
                                </template> тарифов
                            </span>
                            <span class="item__text">
                                {{ item.prepayment }}
                            </span>
                        </div>

                        <span class="item__text">
                            {{ item.checkIn }}
                        </span>

                        <div class="item__info-block">
                            <span class="item__text">
                                Отмена 
                                <template v-if="item.can_refund">
                                    разрешена
                                </template>
                                <template v-else>
                                    запрещена
                                </template>
                            </span>
                            <span class="item__text__black">
                                Подробнее
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <LazyPopupEditPayment
        :active="popupOpened"
    />
</template>

<style lang="scss">

    .admin-payment-methods-section {
        &__header {
            @include df_fdc;
            grid-column: span 12;
            gap: 1.5rem;
            // &__title-block {
            //     @include df_ac;
            //     justify-content: space-between;
            //     &__title {
            //         @include heading_1;
            //         color: $text-primary;
            //         width: fit-content;
            //     }
            //     &__struct {
            //         @include df_ac;
            //     }
            // }
            &__tax {
                @include df_ac;
                gap: 2rem;
                &__text {
                    @include text_1;
                    color: $text-primary;
                }
                &__inputs {
                    @include df_ac;
                    gap: 1.5rem;
                    &__time {
                        @include df_ac;
                        gap: 0.75rem;
                    }
                }
            }
            &__ecvire {
                @include df_ac;
                gap: 1rem;
                &__text {
                    @include strong_1;
                    color: $text-primary;
                }
            }
        }
        &__table {
            grid-column: span 12;
            .table {
                width: 100%;
                &__payment-text {
                    text-wrap: wrap;
                    min-width: 22.5rem;
                    max-width: 22.5rem;
                    &__title {
                        display: block;
                        width: 100%;
                        @include text_1;
                    }
                    &__text {
                        @include text_1;
                        color: $text-primary-transparent-48;
                    }
                }
                &__tarifs {
                    width: 7.5rem;
                }
                &__prepayment {
                    min-width: 9.75rem;
                    max-width: 9.75rem;
                    text-wrap: wrap;
                }
                &__check-in {
                    min-width: 12.5rem;
                    max-width: 12.5rem;
                    text-wrap: wrap;
                }
                &__same-width {
                    min-width: 13.625rem;
                }
            }
        }
        &__grid {
            grid-column: span 12;
            @include grid(4, 1rem);
            .item {
                padding: 1.5rem;
                
                border: 1px solid $border-primary-subdued-8;
                border-radius: 0.5rem;
                
                @include df_fdc;
                gap: 1.5rem;

                &__header {
                    @include df_jb;
                    &__buttons {
                        @include df_ac;
                        gap: 0.75rem;
                    }
                    &__edit {
                        @include df_ac_jcc;
                        width: 2rem;
                        height: 2rem;
                        svg {
                            width: 1.5rem;
                            height: 1.5rem;
                        }
                    }
                }
                &__info-block-4 {
                    @include df_fdc;
                    gap: 0.25rem;
                }
                &__info-block {
                    @include df_fdc;
                }
                &__title {
                    @include heading_3;
                    color: $text-primary;
                }
                &__text {
                    @include text_1;
                    color: $text-primary-transparent-48;
                    &__black {
                        @include text_1;
                        color: $text-primary;
                    }
                }
            }
        }
    }

    .close-toggle {
        width: 4rem;
        height: 2rem;
        border-radius: 62.5rem;
        background-color: $bg-subaccent;

        display: flex;
        justify-content: end;
        align-items: center;
        
        padding-inline: 0.125rem;
        &__item {
            @include df_ac_jcc;
            width: 1.75rem;
            height: 1.75rem;
            background-color: $bg-primary;
            border-radius: 100%;
            svg {
                width: 1rem;
                height: 1rem;
            }
        }
    }

    .w-176 {
        width: 11rem;
    }
    .w-332 {
        width: 20.75rem;
    }
</style>