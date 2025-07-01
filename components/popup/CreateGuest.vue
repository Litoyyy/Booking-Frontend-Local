<script lang="ts" setup>
    
    import { createNewInput } from '~/composables/createNewInputs'; 
    import Popup from '~/layouts/components/Popup.vue';

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
    <Popup name="Создать гостя" position="end" resize>
        <form class="popup__guest-form" ref="formRef">
            <div class="popup__guest-form__info">
                <div class="popup__guest-form__name">
                    Общая информация
                </div>
                <div class="popup__guest-form__label-block">
                    <ElementInput 
                        fake-placeholder="Фамилия"
                        id="modal-guest-form-last-name"
                        name="last_name"></ElementInput>
                    <ElementInput 
                        fake-placeholder="Имя"></ElementInput>
                    <ElementInput 
                        fake-placeholder="Отчество"
                        id="modal-guest-form-first-name"
                        name="first_name"></ElementInput>
                    <DatePicker></DatePicker>
                    <div class="popup__guest-form__contact">
                        <div class="popup__guest-form__contact__item">
                            <ElementInput 
                                fake-placeholder="Номер телефона"
                                id="modal-guest-form-phone"
                                name="phone"
                                @input="mainInputHandle('phone')"
                                :maxLength="16"></ElementInput>
                            <ElementIconButton 
                            type="button" 
                            size="large" 
                            color="transparent" 
                            @click="appendContactInput('phone')"
                            ref="phoneAppendButton"
                            :disabled="true"
                            data-type="phone">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.833 12.834V5.83398H15.1663V12.834H22.1663V15.1673H15.1663V22.1673H12.833V15.1673H5.83301V12.834H12.833Z" fill="#1C5BAD"/>
                                </svg>
                            </ElementIconButton>
                        </div>
                        <div class="popup__guest-form__contact__item" v-for="(item, index) in phoneArr">
                            <ElementInput 
                                :fake-placeholder="`Номер телефона ${index + 2}`"
                                :id="`modal-guest-form-phone-${index + 2}`"
                                name="phone"
                                :newValue="item.value"
                                ref="phoneInputs"
                                v-model="phoneArr[index].value"
                                :maxLength=16
                                @input="(value) => valueTransfer(value, index, 'phone')"></ElementInput>
                            <ElementIconButton 
                            type="button" 
                            size="large" 
                            color="transparent" 
                            :ghost="true" 
                            @click="deleteContactInput(index, 'phone')">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.16634 7.00065V3.50065C8.16634 2.85632 8.68868 2.33398 9.33301 2.33398H18.6663C19.3107 2.33398 19.833 2.85632 19.833 3.50065V7.00065H25.6663V9.33398H23.333V24.5007C23.333 25.145 22.8107 25.6673 22.1663 25.6673H5.83301C5.18868 25.6673 4.66634 25.145 4.66634 24.5007V9.33398H2.33301V7.00065H8.16634ZM10.4997 4.66732V7.00065H17.4997V4.66732H10.4997Z" fill="#2D3033" fill-opacity="0.48"/>
                                </svg>
                            </ElementIconButton>
                        </div>
                    </div>
                    <div class="popup__guest-form__contact">
                        <div class="popup__guest-form__contact__item">
                            <ElementInput 
                                fake-placeholder="E-mail"
                                id="modal-guest-form-email"
                                name="email"
                                @input="mainInputHandle('email')"></ElementInput>
                            <ElementIconButton 
                                size="large" 
                                color="transparent" 
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
                        <div class="popup__guest-form__contact__item" v-for="(item, index) in emailArr">
                            <ElementInput 
                                :fake-placeholder="`E-mail ${index + 2}`"
                                :id="`modal-guest-form-email-${index}`"
                                name="email"
                                :newValue="item.value"
                                @input="(value) => valueTransfer(value, index, 'email')"></ElementInput>
                            <ElementIconButton 
                                type="button" 
                                size="large" 
                                color="transparent" 
                                :ghost="true" 
                                @click="deleteContactInput(index, 'email')">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.16634 7.00065V3.50065C8.16634 2.85632 8.68868 2.33398 9.33301 2.33398H18.6663C19.3107 2.33398 19.833 2.85632 19.833 3.50065V7.00065H25.6663V9.33398H23.333V24.5007C23.333 25.145 22.8107 25.6673 22.1663 25.6673H5.83301C5.18868 25.6673 4.66634 25.145 4.66634 24.5007V9.33398H2.33301V7.00065H8.16634ZM10.4997 4.66732V7.00065H17.4997V4.66732H10.4997Z" fill="#2D3033" fill-opacity="0.48"/>
                                </svg>
                            </ElementIconButton>
                        </div>
                    </div>
                    <SelectDefault id="modal-guest-segment"></SelectDefault>
                </div>
            </div>
            <div class="popup__guest-form__info">
                <div class="popup__guest-form__name">
                    Дети
                </div>
                <div class="popup__guest-form__label-block childrens">
                    <ElementInput 
                        fake-placeholder="ФИО ребенка"
                        id="modal-guest-form-first-name"
                        name="first_name"></ElementInput>
                    <ElementCounter 
                        fake-placeholder="Возраст"
                        id="modal-guest-form-age"
                        name="age"></ElementCounter>
                    <ElementIconButton 
                    size="large" 
                    color="transparent"
                    @click="appendContactInput('childs')"
                    type="button">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.833 12.834V5.83398H15.1663V12.834H22.1663V15.1673H15.1663V22.1673H12.833V15.1673H5.83301V12.834H12.833Z" fill="#1C5BAD"/>
                        </svg>
                    </ElementIconButton>
                </div>
                <div class="popup__guest-form__label-block childrens" v-for="(item, index) in childsArr">
                    <ElementInput 
                        :fake-placeholder="`ФИО ребенка ${index + 2}`"
                        :id="`modal-guest-form-first-name-${index}`"
                        name="child_name"
                        :newValue="item.name"
                        @input="(value) => valueTransfer(value, index, 'childs')"></ElementInput>
                    <ElementCounter
                    :fake-placeholder="`Возраст ${index + 2}`"
                    :id="`modal-guest-form-age-${index}`"
                    name="child_age"
                    :newValue="item.age"
                    @input="(value) => valueTransfer(value, index, 'childs')"></ElementCounter>
                    <ElementIconButton 
                        type="button" 
                        size="large" 
                        color="transparent" 
                        :ghost="true" 
                        @click="deleteContactInput(index, 'childs')">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.16634 7.00065V3.50065C8.16634 2.85632 8.68868 2.33398 9.33301 2.33398H18.6663C19.3107 2.33398 19.833 2.85632 19.833 3.50065V7.00065H25.6663V9.33398H23.333V24.5007C23.333 25.145 22.8107 25.6673 22.1663 25.6673H5.83301C5.18868 25.6673 4.66634 25.145 4.66634 24.5007V9.33398H2.33301V7.00065H8.16634ZM10.4997 4.66732V7.00065H17.4997V4.66732H10.4997Z" fill="#2D3033" fill-opacity="0.48"/>
                            </svg>
                    </ElementIconButton>
                </div>
            </div>
            <ElementButton size="large" name="button">
                Создать
            </ElementButton>
        </form>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        &__guest-form {
            @include df_fdc;
            gap: 2rem;
            &__name {
                @include heading_3;
            }
            &__info {
                @include df_fdc;
                gap: 1.5rem;
            }
            &__label-block {
                @include grid(2, 1rem);
                .select {
                    grid-column: span 2;
                }
                &.childrens {
                    @include df_ac;
                    .field {
                        width: 100%;
                    }
                }
            }
            &__contact {
                @include df_fdc;
                gap: 1rem;
                &__item {
                    @include df_ac;
                    gap: .75rem;
                }
            }
        }
    }
</style>