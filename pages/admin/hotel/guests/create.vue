<script lang="ts" setup>
    import { z } from 'zod';
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

    definePageMeta({
        isAdmin: true,
        breadcrumbs: [
            {
                name: 'Гостиница'
            },
            {
                name: 'Гости',
                slug: '/admin/hotel/guests/',
            },
            {
                name: 'Создание',
                slug: '/admin/hotel/guests/create/',
                state: 'active'
            },
        ],
    });

    const formRef = ref<HTMLFormElement | null>(null);
    const schema = z.object({
        last_name: z.string().min(1),
        first_name: z.string().min(1),
        sur_name: z.string().min(1),
        birth_date: z.string().min(1),
        phone: z.string().min(16),
        email: z.string().email(),
        segments: z.string().min(1),

    });

    const handleValidate=()=>{
        if(formRef.value) {
            validate(formRef.value, schema,
                (body: any)=>{

                }
            )
        }
    };
    onMounted(()=>{
        if(!formRef.value) return;
        validate(formRef.value, schema,
            (body: any)=>{},
            { errorOff: true }
        )
    });
</script>

<template>
    <section>
        <div class="create-guest-section">
            <div class="create-guest-section__container container_admin">
                <form class="create-guest-section__form" ref="formRef">
                    <div class="create-guest-section__info-block">
                        <span class="title">Общая информация</span>
                        <div class="create-guest-section__inputs">
                            <ElementInput
                                id="create-guest-input-last-name"
                                name="last_name"
                                fake-placeholder="Фамилия"
                                :onInput="()=>handleValidate()"
                            />
                            <ElementInput
                                id="create-guest-input-first-name"
                                name="first_name"
                                fake-placeholder="Имя"
                                :onInput="()=>handleValidate()"
                            />
                            <ElementInput
                                id="create-guest-input-sur-name"
                                name="sur_name"
                                fake-placeholder="Отчество"
                                :onInput="()=>handleValidate()"
                            />
                            <DatePicker
                                id="create-guest-date-birth-input"
                                name="birth_date"
                                first-placeholder="Дата рождения"
                            />
                            <div class="create-guest-section__inputs__created-items">
                                <div class="create-guest-section__inputs__created-items__item">
                                    <ElementInput 
                                        fake-placeholder="Номер телефона"
                                        id="create-guest-form-phone"
                                        name="phone"
                                        :onInput="()=>{
                                            mainInputHandle('phone')
                                            handleValidate()
                                        }"
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
                                <div class="create-guest-section__inputs__created-items__item" v-for="(item, index) in phoneArr">
                                    <ElementInput 
                                        :fake-placeholder="`Номер телефона ${index + 2}`"
                                        :id="`create-guest-form-phone-${index + 2}`"
                                        name="phone"
                                        :newValue="item.value"
                                        ref="phoneInputs"
                                        v-model="phoneArr[index].value"
                                        :maxLength=16
                                        :onInput="(event: Event)=>{
                                            valueTransfer(event, index, 'phone')
                                            handleValidate()
                                        }"></ElementInput>
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
                            <div class="create-guest-section__inputs__created-items">
                                <div class="create-guest-section__inputs__created-items__item">
                                    <ElementInput 
                                        fake-placeholder="E-mail"
                                        id="modal-guest-form-email"
                                        name="email"
                                        :onInput="()=>{
                                            mainInputHandle('email')
                                            handleValidate()
                                        }"></ElementInput>
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
                                <div class="create-guest-section__inputs__created-items__item" v-for="(item, index) in emailArr">
                                    <ElementInput 
                                        :fake-placeholder="`E-mail ${index + 2}`"
                                        :id="`modal-guest-form-email-${index}`"
                                        name="email"
                                        :newValue="item.value"
                                        :onInput="(event: Event) => {
                                            valueTransfer(event, index, 'email')
                                            handleValidate()
                                        }"></ElementInput>
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
                            <SelectTagMultiSelect class="gcs_2"
                                id="create-guest-date-segments-select"
                                name="segment"
                                fake-placeholder="Сегменты"
                            />
                        </div>
                    </div>
                    <div class="create-guest-section__info-block">
                        <span class="title">Дети</span>
                        <div class="create-guest-section__inputs">
                            <div class="create-guest-section__inputs__block">
                                <ElementInput 
                                    fake-placeholder="ФИО ребенка"
                                    id="create-guest-form-first-name"
                                    :onInput="()=>{
                                        handleValidate()
                                    }"
                                    name="first_name"/>
                                <ElementCounter 
                                    fake-placeholder="Возраст"
                                    id="create-guest-form-age"
                                    
                                    name="age"/>
                            </div>
                            <div class="create-guest-section__inputs__block" v-for="(item, index) in childsArr">
                                <ElementInput 
                                    :fake-placeholder="`ФИО ребенка ${index + 2}`"
                                    :id="`modal-guest-form-first-name-${index}`"
                                    name="child_name"
                                    :newValue="item.name"
                                    />
                                <ElementCounter 
                                    :fake-placeholder="`Возраст ${index + 2}`"
                                    :id="`modal-guest-form-age-${index}`"
                                    name="child_age"
                                    :newValue="item.age"
                                    :onInput="(event: Event)=>{
                                        handleValidate()
                                        valueTransfer(event, index, 'childs')
                                    }"/>
                            </div>
                            <ElementIconButton class="gcs_2"
                                size="large" 
                                color="transparent"
                                @click="appendContactInput('childs')"
                                type="button">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.833 12.834V5.83398H15.1663V12.834H22.1663V15.1673H15.1663V22.1673H12.833V15.1673H5.83301V12.834H12.833Z" fill="#1C5BAD"/>
                                </svg>
                            </ElementIconButton>
                        </div>
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
    .create-guest-section {
        &__form {
            grid-column: 2 / span 6;
            @include df_fdc;
            gap: 2rem;
        }
        &__info-block {
            @include df_fdc;
            gap: 1.5rem;
            .title {
                @include heading_3;
            }
        }
        &__inputs {
            @include grid(2, 1rem);
            .gcs_2 {
                grid-column: span 2;
            }
            .icon-button {
                &.gcs_2 {
                    width: 100%;
                }
            }
            &__created-items {
                grid-column: span 2;
                @include df_fdc;
                gap: 1rem;
                &__item {
                    @include df_ac;
                    gap: .75rem;
                    .field {
                        width: 100%;
                    }
                }
            }
            &__block {
                grid-column: span 2;
                @include grid(2, 1rem);
            }
        }
    }
</style>