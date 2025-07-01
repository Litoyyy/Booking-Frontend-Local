<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';
    import { createNewInput } from '~/composables/createNewInputs'; 

    const {
        phoneArr,
        emailArr,
        childsArr,
        phoneAppendButton,
        emailAppendButton,
        appendContactInput,
        deleteContactInput,
        valueTransfer,
        mainInputHandle
    } = createNewInput();
</script>

<template>
    <Popup name="Заказчик">
        <template #header_description>
            <ElementLink color="subaccent">
                Выбрать гостя
            </ElementLink>
        </template>
        <form class="popup__form">
            <ElementInput 
            fake-placeholder="Фамилия" 
            name="last_name"
            id="booking-card-customer-last-name"></ElementInput>
            <ElementInput 
            fake-placeholder="Имя" 
            name="first_name"
            id="booking-card-customer-first-name"></ElementInput>
            <ElementInput 
            fake-placeholder="Отчество" 
            name="sur_name"
            id="booking-card-customer-sur-name"></ElementInput>
            <DatePicker fakePlaceholder="Дата рождения"></DatePicker>
            <div class="popup__form__contact">
                <div class="popup__form__contact__item">
                    <ElementInput 
                    fake-placeholder="Номер телефона" 
                    name="phone"
                    id="booking-card-customer-phone"
                    @input="mainInputHandle('phone')"
                    :max-length="16"></ElementInput>

                    <ElementIconButton color="transparent"
                    size="large"
                    type="button"
                    @click="appendContactInput('phone')"
                    ref="phoneAppendButton"
                    :disabled="true">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.833 12.834V5.83398H15.1663V12.834H22.1663V15.1673H15.1663V22.1673H12.833V15.1673H5.83301V12.834H12.833Z" fill="#1C5BAD"/>
                        </svg>
                    </ElementIconButton>
                </div>
                <div class="popup__form__contact__item" v-for="(item, index) in phoneArr">
                    <ElementInput 
                        :fake-placeholder="`Номер телефона ${index + 2}`"
                        :id="`booking-card-customer-phone-${index + 2}`"
                        name="phone"
                        :newValue="item.value"
                        ref="phoneInputs"
                        v-model="phoneArr[index].value"
                        :maxLength=16
                        @input="(value) => valueTransfer(value, index, 'phone')"></ElementInput>
                    <ElementIconButton color="transparent"
                        size="large"
                        type="button"
                        @click="deleteContactInput(index, 'phone')"
                        ghost>
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.16634 7.00065V3.50065C8.16634 2.85632 8.68868 2.33398 9.33301 2.33398H18.6663C19.3107 2.33398 19.833 2.85632 19.833 3.50065V7.00065H25.6663V9.33398H23.333V24.5007C23.333 25.145 22.8107 25.6673 22.1663 25.6673H5.83301C5.18868 25.6673 4.66634 25.145 4.66634 24.5007V9.33398H2.33301V7.00065H8.16634ZM10.4997 4.66732V7.00065H17.4997V4.66732H10.4997Z" fill="#2D3033" fill-opacity="0.48"/>
                            </svg>
                    </ElementIconButton>
                </div>
            </div>
            <div class="popup__form__contact">
                <div class="popup__form__contact__item">
                    <ElementInput 
                    fake-placeholder="E-mail" 
                    name="email"
                    id="booking-card-customer-email"
                    @input="mainInputHandle('email')"></ElementInput>
                    <ElementIconButton color="transparent"
                    size="large"
                    @click="appendContactInput('email')" 
                    type="button"
                    data-type="email"
                    ref="emailAppendButton"
                    :disabled="true">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.833 12.834V5.83398H15.1663V12.834H22.1663V15.1673H15.1663V22.1673H12.833V15.1673H5.83301V12.834H12.833Z" fill="#1C5BAD"/>
                        </svg>
                    </ElementIconButton>
                </div>
                <div class="popup__form__contact__item" v-for="(item, index) in emailArr">
                    <ElementInput 
                    :fake-placeholder="`E-mail ${index + 2}`" 
                    name="email"
                    :id="`booking-card-customer-email-${index + 2}`"
                    @input="(value) => valueTransfer(value, index, 'email')"></ElementInput>
                    <ElementIconButton color="transparent"
                    size="large"
                    type="button"
                    @click="deleteContactInput(index, 'email')"
                    ghost>
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.16634 7.00065V3.50065C8.16634 2.85632 8.68868 2.33398 9.33301 2.33398H18.6663C19.3107 2.33398 19.833 2.85632 19.833 3.50065V7.00065H25.6663V9.33398H23.333V24.5007C23.333 25.145 22.8107 25.6673 22.1663 25.6673H5.83301C5.18868 25.6673 4.66634 25.145 4.66634 24.5007V9.33398H2.33301V7.00065H8.16634ZM10.4997 4.66732V7.00065H17.4997V4.66732H10.4997Z" fill="#2D3033" fill-opacity="0.48"/>
                        </svg>
                    </ElementIconButton>
                </div>
            </div>
        </form>
        <ElementButton size="large" name="button">
            Применить
        </ElementButton>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        &__form {
            @include grid(2, 1rem);
            &__contact {
                @include df_fdc;
                gap: 1rem;
                &__item {
                    @include df-ac;
                    gap: .75rem;
                }
            }
        }
    }
</style>