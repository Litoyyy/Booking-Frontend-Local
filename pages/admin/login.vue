<script lang="ts" setup>
    import { z } from 'zod';

    const router = useRouter();

    definePageMeta({
        isAdmin: false,
    });

    const formRef = ref<HTMLFormElement | null>(null);

    const forgotPasswordValue = ref(false);
    const errorPopupValue = ref(false);

    const schemaLogin = z.object({
        username: z.string().min(1),
        password: z.string().min(1)
    });


    const handleValidate = () => {
        if (formRef.value) {
            validate(formRef.value, schemaLogin, 
            async(body: any) => {
                try {
                    const res = await sendData(body, '/auth/token/');
                    Object.keys(res).map((key)=>{
                        const cookie = useCookie(`${key}`);
                        cookie.value = res[`${key}`];
                    });
                    const usernameCookie = useCookie('username');
                    usernameCookie.value = body.username;
                    await router.push('/admin/');
                } catch (error) {
                    setFormError(formRef.value);
                    errorPopupValue.value = true;
                };
            });
        };
    };

    onMounted(()=>{
        if (formRef.value) {
            validate(formRef.value, schemaLogin, 
            (body: any) => {},
            { errorOff: true });
        };
    });
</script>


<template>
    <section>
        <div class="form-admin">
            <form ref="formRef" class="form-admin__form">
                <span class="form-admin__form__title">Войти</span>
                <div class="form-admin__form__content">
                    <div class="form-admin__form__content__inputs">
                        <ElementInput 
                            id="admin-login-input"
                            name="username"
                            size="large"
                            fakePlaceholder="Логин"
                            :on-input="handleValidate" />
                        <ElementInput 
                            id="admin-password-input"
                            name="password"
                            size="large"
                            fakePlaceholder="Пароль"
                            type="password"
                            :on-input="handleValidate" />
                    </div>
                    <ElementButton
                        name="button"
                        size="large"
                        >Войти</ElementButton>
                    <span class="form-admin__form__forgot-password" 
                    @click="()=>{
                        forgotPasswordValue = true;
                    }">
                        Я забыл(а) пароль
                    </span>
                </div>
            </form>
        </div>

        <Dialog
            :key="'error-popup'"
            color='negative' 
            title="Неверный логин или пароль"
            description="Проверьте данные и повторите попытку"
            v-model:visible="errorPopupValue"
        />

        <Dialog 
            :key="'forgot-password'"
            color='positive' 
            drawLine
            title="Запрос отправлен"
            description="Ожидайте письмо с новым паролем, оно придет на Вашу почту"
            v-model:visible="forgotPasswordValue"
        />


        <div class="form-admin__support-block">
            <a href="tel:+79297198118" class="phone">+7 495 390 30 20</a>
            <span class="support">Поддержка (круглосуточно)</span>
        </div>
    </section>
</template>

<style lang="scss">
    .form-admin {
        @include df_fdc;
        justify-content: center;
        align-items: center;
        height: calc(100dvh - 10rem);
        &__form {
            max-width: 18.25rem;
            width: 100%;
            @include df_fdc;
            align-items: center;
            gap: 2rem;
            &__title {
                color: $text-primary;
                @include heading_1;
            }
            &__content {
                @include df_fdc;
                width: 100%;
                gap: 1.5rem;
                .button {
                    width: 100%;
                }
                &__inputs {
                    @include df_fdc;
                    gap: 0.75rem;
                }
            }
            &__forgot-password {
                text-align: center;
                color: $text-primary-transparent-48;
                cursor: pointer;
            }
        }
        &__support-block {
            position: fixed;
            bottom: 3rem;
            left: 50%;
            transform: translateX(-50%);
            max-width: 18.25rem;
            width: 100%;
            @include df_fdc;
            align-items: center;
            .phone {
                @include text_1;
                color: $text-primary;
            }
            .support {
                @include strong_2;
                color: $text-primary-transparent-48;
            }
        }
    }
</style>