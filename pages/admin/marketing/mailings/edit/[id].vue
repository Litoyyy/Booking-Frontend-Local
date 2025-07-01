<script lang="ts" setup>
    import { useEmailNavigate } from '~/composables/admin/letters/useEmailNavigate'
    import { getMailTheme, useDataLetter } from '~/composables/admin/letters/letterData'
    import { useEmailColor, type ShadeName } from '~/composables/admin/letters/letterColor'
    
    definePageMeta({
        isAdmin: true,
    })

    const { emailTypeState } = useEmailNavigate()

    onMounted(() => {
        if (!emailTypeState.value) {
            useRouter().push('/admin/mailing')
        }
    })
    
    const {
        arrayLanguage,
        textFromLetter
    } = useDataLetter()
    
    const {
        admin,
        letter
    } = getMailTheme(emailTypeState.value)()

    const { 
        activeColor,
        activeShade,
        setActiveColor, 
        shadeColors,
        arrayShade,
        setShade
    } = useEmailColor()

</script>

<template>
    <main>
        <section>
            <div class="container-colums">

                <div class="editor-letter">
                    <div class="settings-letter">
                        <SelectDefault
                            id="email-language"
                            name="email_language"
                            readonly
                            :options="arrayLanguage"
                            fake-placeholder="Язык" />
                        <div class="settings-letter__info">
                            <span class="section__title">Общая информация</span>
                            <div class="settings-letter__from-theme">
                                <ElementInput
                                    id="email-from"
                                    placeholder="От кого"
                                    helper="Гостиница «Измайлово»" 
                                    :onInput="textFromLetter" />
                                <ElementInput
                                    id="email-theme"
                                    placeholder="Тема письма" />
                            </div>
                        </div>
                    </div>

                    <hr class="hr-row">
                    
                    <div class="color-letter">
                        <div class="color-letter__header">
                            <span class="section__title">1. Цвет шаблона</span>
                            <span class="color-letter__header__color-name">{{ activeColor.name ?? 'Нет активного цвета' }}</span>
                        </div>
                        <div class="color-letter__color-picker">
                            <Dropdown>
                                <template #header>
                                    <ElementLink
                                        color='neutral'
                                        chevron='right'
                                    >
                                        {{ activeShade.name }}
                                    </ElementLink>
                                </template>
                                <ElementOption
                                    v-for="(item, index) in arrayShade"
                                    :key="index"
                                    @click="setShade(item.name as ShadeName)"
                                >
                                    {{ item.name }}
                                </ElementOption>
                            </Dropdown>
                            <div class="color-letter__color-picker__container">
                                <ElementColorPicker
                                    v-for="(item, index) in shadeColors[activeShade.key]"
                                    :key="item.id"
                                    :id="item.id.toString()"
                                    :name="'color-picker-group'"
                                    :color="item.color"
                                    v-model:active="item.active" 
                                    @click="setActiveColor(index)" 
                                />
                            </div>    
                        </div>
                    </div>

                    <hr class="hr-row">

                    <component :is="admin" />    

                </div>
                
                <component :is="letter" />

            </div>
        </section>
    </main>
</template>

<style lang="scss">
    @mixin button-container {
        @include df_ac;
        padding: 1.25rem;
        gap: 0.625rem;
        border: 0.0625rem solid $border-primary-transparent-8;
    }

    @mixin icon-button {
        cursor: pointer;
        width: 1.5rem;
        height: 1.5rem;
    }

    @mixin number-block {
        @include heading_3;
        @include df_ac_jcc;
        position: absolute;
        z-index: 10;
        width: 2.5625rem;
        height: 2.5625rem;
        background-color: $bg-inverse;
        border-radius: 0.5rem;
        color: $text-inverse;
    }

    main {
        padding: 1.5rem 3rem 0rem;
        .container-colums {
            display: flex;
            justify-content: space-between;
            position: relative;
        }
        .editor-letter {
            @include df_fdc;
            gap: 2rem;

            max-width: 47.25rem;
            width: 100%;
        }
        .hr-row {
            width: 100%;
            height: 0.0625rem;
            background-color: $border-primary-subdued-8;
            border: none;
        }
        .settings-letter {
            @include df_fdc;
            gap: 2rem;
            &__info {
                @include df_fdc;
                gap: 1.5rem;
            }
            &__from-theme {
                @include df_fdc;
                gap: 1rem;
                .blue-text {
                    color: $text-accent;
                }
            }
        }
        .color-letter {
            @include df_fdc;
            gap: 1.5rem;
            &__header {
                @include df_ac;
                justify-content: space-between;
                &__color-name {
                    @include text_2;
                    color: $text-primary;
                }
            }
            &__color-picker {
                @include df_fdc;
                gap: 0.75rem;
                &__container {
                    @include grid(10, 0.5rem);
                }
            }
        }
        .text-letter {
            @include df_fdc;
            gap: 3rem;
            &__contianer {
                @include df_fdc;
                gap: 3rem;
            }
            &__header {
                @include df_ac;
                justify-content: space-between;
            }
            &__appeal {
                @include df_fdc;
                gap: 0.75rem;
                position: relative;
                resize: none;
            }
            &__greetings {
                @include df_fdc;
                gap: 0.75rem;
                position: relative;
                resize: none;
            }

            &__title {
                @include strong_1;
                color: $text-primary;
            }
        }
        .booking-details {
            &__container {
                @include df_fdc;
                gap: 1rem;
            }
            &__header {
                @include df_jb_ac;
            }
            &__content {
                @include text_1;
                color: $text-primary;
            }
        }
        .payment {
            &__container {
                @include df_fdc;
                gap: 1rem;
            }
            &__header {
                @include df_jb_ac;
            }
        }
        .booking-cond {
            &__container {
                @include df_fdc;
                gap: 1rem;
            }
            &__header {
                @include df_jb_ac;
            }
            &__content {
                @include text_1;
                color: $text-primary;
            }
        }
        .sign {
            &__header {
                @include df_jb_ac;
            }
            &__container {
                @include df_fdc;
                gap: 0.75rem;
            }
        }
        .buttons-container {
            @include df_ac;
            gap: 0.75rem;
            padding-top: 2rem;
        }
        .section {
            &__title {
                @include heading_3;
                color: $text-primary;
            }
        }
        .letter {
            max-width: 39.125rem;
            width: 100%;
            height: calc(100dvh - 10rem);
            position: fixed;
            bottom: 1rem;
            right: 3rem;
            &:after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 4rem;
                background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%);
                z-index: 50;
            }
            &__container {
                width: 100%;
                height: 100%;
                position: relative;
                overflow-y: scroll;
                overflow-x: hidden;
                scrollbar-width: none;
            }
            &__content {
                @include df_fdc;
                width: 100%;
                height: fit-content;
                padding: 1.5rem;
            }
            &__header {
                display: flex;
                gap: 1rem;
                &__img-container {
                    width: 4.5rem;
                    height: 4.5rem;
                    border-radius: 0.5rem;
                }
                &__title-block {
                    @include df_fdc;
                    justify-content: center;
                    &__name-hotel {
                        @include heading_2;
                        color: $text-inverse;
                    }
                    &__city {
                        @include strong_1;
                        color: $text-inverse;
                    }
                }
                &__address {
                    width: 100%;
                    &__text {
                        @include text_2;
                        @include df_fdc;
                        gap: .25rem;
                        color: $text-inverse;
                        text-align: end;
                    }
                }
            }
            &__content-mail {
                @include df_fdc;
                gap: 0.75rem;
                padding-top: 2.5rem;
                width: 100%;
            }
            &__block {
                @include df_fdc;
                gap: 1rem;
                position: relative;
                background-color: $bg-primary;
                padding: 2rem;
                border-radius: 0.5rem;
                &__title {
                    &__h1 {
                        @include heading_1;
                        color: $text-primary;
                    }
                    &__h2 {
                        @include heading_2;
                        color: $text-primary;
                    }
                    &__h3 {
                        @include heading_3;
                        color: $text-primary;
                    }
                }
                &__text {
                    @include df_fdc;
                    gap: 0.375rem;
                    @include text_1;
                    color: $text-primary;
                }
                &__header {
                    @include df_fdc;
                }
                &__desc {
                    @include text_1;
                    color: $text-primary;
                }
                &__table {
                    @include df_fdc;
                    gap: 1rem;
                    padding-top: 2rem;
                    &__row {
                        @include grid(2, 1rem);
                    }
                    &__key {
                        @include text_1;
                        color: $text-primary-transparent-48;
                    }
                    &__value {
                        @include text_1;
                        color: $text-primary;
                    }
                    &__value-s1 {
                        @include strong_1;
                        color: $text-primary;
                    }
                    hr {
                        border: none;
                        height: 0.0625rem;
                        background-color: $border-primary-transparent-8;
                    }
                    &__result {
                        grid-column: span 2;
                        @include grid(2, 1rem);
                        &__key {
                            @include heading_2;
                            color: $text-primary;
                        }
                        &__value {
                            @include heading_2;
                            color: $text-primary;
                        }
                    
                    }
                }
                &__small-table {
                    grid-column: span 2;
                    @include df_fdc;
                    gap: 0.5rem;
                    &__row {
                        @include grid(2, 1rem);
                    }
                    &__key {
                        @include text_2;
                        color: $text-primary-transparent-48;
                        width: 100%;
                    }
                    &__value {
                        @include strong_2;
                        color: $text-primary;
                        width: 100%;
                    }
                }
            }
            &__orange-button {
                @include strong_1;
                @include df_ac_jcc;
                width: 100%;
                height: 3.75rem;
                color: $text-inverse;
                background-color: $bg-subaccent;
                border-radius: 0.5rem;
                cursor: pointer;
            }
            .gap-2 {
                gap: 2rem;
            }
            &__number-1 {
                @include number-block();
                left: -1.3125rem;
                top: -1.3125rem;
            }
            &__number-base {
                @include number-block();
                left: -1.3125rem;
                top: 1.3125rem;
            }
            &__number-link {
                @include number-block();
                left: -1.3125rem;
                bottom: 1.5625rem;
            }
            &__link {
                @include text_1;
                color: $text-accent;
            }
        }
    }

    .white-select {
        position: relative;
        z-index: 50;
        width: fit-content;
        .input-label {
            background-color: transparent !important;
        }
        #shade {
            width: fit-content !important;
        }
    }
</style>