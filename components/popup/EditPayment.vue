<script lang="ts" setup>    
    import { ElementInput, SelectDefault } from '#components';
    import usePaymentMethods from '~/composables/admin/payment-methods';
    import Popup from '~/layouts/components/Popup.vue';

    const {
        openPopupEdit
    } = usePaymentMethods()

    watch(openPopupEdit, () => console.log('ww'))

</script>

<template>
    <Popup
        name="Редактировать спооооособ оплаты"
        description="Эквайринг BookingModule (банк.карта РФ)(Кэшбек МИР)"
        position="end"
        :visible="openPopupEdit"
        resize
        
    >
        <form class="popup-edit-payment">
            <div class="popup-edit-payment__access">
                <span class="popup-edit-payment__access__title">Доступен</span>
                <div class="popup-edit-payment__access__row">
                    <SelectDefault 
                        class="w283"
                        :fake-placeholder="'За сколько'"
                    />
                    <span class="popup-edit-payment__access__title">за</span>
                    <div class="popup-edit-payment__access__inputs">
                        <ElementInput 
                            class="w135"
                            :fake-placeholder="'Кол-во'"
                        />
                        <SelectDefault 
                            class="w135"
                            :fake-placeholder="'Времени'"
                        />
                    </div>
                    <span class="popup-edit-payment__access__title">до заезда</span>
                </div>
            </div>
            <div class="popup-edit-payment__milti-select">
                <SelectTagMultiSelect 
                    fake-placeholder="Доступен для тарифов"
                />
            </div>
        </form>
    </Popup>
</template>

<style lang="scss">
    .popup-edit-payment {
        @include df_fdc;
        gap: 2rem;
        width: 47.25rem;
        &__access {
            @include df_fdc;
            gap: 1rem;
            &__inputs {
                @include df_ac;
                gap: 0.75rem;
            }
            &__title {
                @include text_1;
                color: $text-primary;
            }
            &__row {
                @include df_ac;
                gap: 1.5rem;
            }
        }
    }
    .w283 {
        width: 17.6875rem;
    }
    .w135 {
        width: 8.4375rem;
    }
</style>