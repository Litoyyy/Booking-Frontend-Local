<script lang="ts" setup>

    const props = defineProps<{
        headerType?: 'panel' | 'catalog' | 'catalog-fixed' | 'breadcrumbs' | 'breadcrumbs-steps',
        headerTheme?: 'light' | 'dark',
        breadcrumbs?: Array<any>,
        breadcrumbsSteps?: Array<any>
    }>();

    const selectLanguages = reactive([
        {
            key: 'RU',
            value: 'Русский',
            state: 'active'
        },
        {
            key: 'EN',
            value: 'Английский',
            state: ''
        },
        {
            key: 'DE',
            value: 'Немецкий',
            state: ''
        },
        {
            key: 'ES',
            value: 'Испанский',
            state: ''
        },
    ]);

    let selectedLang = ref(selectLanguages.find(elem=>elem.state === 'active'));

    const selectFunc=(index: number)=>{
        selectLanguages.map(item=>item.state = '');
        selectLanguages[index].state = 'active';
        selectedLang.value = selectLanguages[index];
    };

    if(props.breadcrumbs && props.breadcrumbs.length > 0) {
        const lastArrElem = props.breadcrumbs.findLast(last=>last);
        lastArrElem.state = 'active';
    };

    const username = ref('');
    const getUsername =()=>{
        const usernameCookie = useCookie('username');
        if(!usernameCookie.value) return;
        username.value = usernameCookie.value;
    };
    getUsername();

    const router = useRouter();

    const prevPage=()=> {
        if (window.history.length > 1) {
            router.go(-1);
        };
    };
    const nextPage=()=> {
        router.go(1);
    };

</script>

<template>
    <header :data-type="headerType || 'panel'" :data-theme="headerTheme">
        <div class="header-section">
            <div class="header-section__container" v-if="headerType == 'catalog' || headerType == 'panel' || headerType == 'catalog-fixed'">
                <Dropdown v-if="headerType != 'panel'">
                    <template #header>
                        <ElementLink
                            size="small"
                            :theme="headerTheme"
                            chevron="right"
                        >{{ selectedLang.key }}
                        </ElementLink>
                    </template>
                    <div class="dropdown__option" v-for="(language, index) in selectLanguages">
                        <ElementOption
                            type="ghost"
                            :state="language.state"
                            @click="selectFunc(index)"
                        ><span>{{ language.key }}</span>
                            {{ language.value }}
                        </ElementOption><hr>
                    </div>
                </Dropdown>
                <NuxtLink to="/" class="header-section__logo" v-if="headerType != 'catalog-fixed'">
                    <img src="/_nuxt/assets/images/logo_header.png" alt="header logo" v-if="headerTheme != 'dark'">
                    <img src="/_nuxt/assets/images/logo_header_dark.png" alt="header logo" v-if="headerTheme == 'dark'">
                </NuxtLink>
                <BlockInputsTrip v-if="headerType === 'catalog-fixed'"/>
                <ElementLink v-if="headerType != 'panel'"
                    size="small"
                    :theme="headerTheme"
                >Задать вопрос
                </ElementLink>
            </div>
            <div class="header-section__container" v-if="headerType == 'breadcrumbs' || headerType == 'breadcrumbs-steps'">
                <div class="header-section__breadcrumbs-block">
                    <div class="header-section__breadcrumbs-block__buttons">
                        <ElementIconButton 
                            @click="prevPage"
                            size="small"
                            color="transparent-secondary"
                        ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.8284 10.9999L13.1924 5.63589L11.7782 4.22168L4 11.9999L11.7782 19.778L13.1924 18.3638L7.8284 12.9999H20V10.9999H7.8284Z" fill="#2D3033" fill-opacity="0.16"/>
                        </svg>
                        </ElementIconButton>
                        <ElementIconButton   
                            @click="nextPage"
                            size="small"
                            color="transparent-secondary"
                        ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" fill="#2D3033" fill-opacity="0.16"/>
                        </svg>
                        </ElementIconButton>
                    </div>
                    <div class="header-section__breadcrumbs-block__info">
                        <div class="header-section__breadcrumbs-block__info__link" v-for="crumb in breadcrumbs">
                            <ElementLink
                                size="small"
                                :theme="headerTheme"
                                color="transparent"
                                :state="crumb.state ?? ''"
                                :link="crumb.slug ?? ''"
                            >{{ crumb.name }}
                            </ElementLink>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.7813 8.00047L5.48145 4.70062L6.42426 3.75781L10.6669 8.00047L6.42426 12.2431L5.48145 11.3003L8.7813 8.00047Z" fill="#2D3033" fill-opacity="0.32"/>
                            </svg>
                        </div>
                    </div>
                    <hr v-if="headerType == 'breadcrumbs-steps'">
                    <div class="header-section__breadcrumbs-block__filters" v-if="headerType == 'breadcrumbs-steps'">
                        <ElementLink v-for="crumb in breadcrumbsSteps"
                            size="small"
                            color="transparent"
                            :theme="headerTheme"
                            :state="crumb.state ?? ''"
                            :link="crumb.slug ?? ''"
                        >{{ crumb.name }}
                        </ElementLink>
                    </div>
                </div>
                <div class="header-section__right-block">
                    <div class="header-section__right-block__link">
                        <ElementLink
                            size="small"
                            color="subaccent"
                        >Предпросмотр модуля
                        </ElementLink>
                        <div class="header-section__right-block__link__counter">
                            14
                        </div>
                    </div>
                    <div class="header-section__right-block__login-block">
                        <div class="header-section__right-block__icons-block">
                            <ElementIconButton
                                color="transparent-secondary"
                                size="small"
                            ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C16.9706 2 21 6.04348 21 11.0314V20H3V11.0314C3 6.04348 7.02944 2 12 2ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z" fill="#2D3033" fill-opacity="0.32"/>
                            </svg>
                            </ElementIconButton>
                            <ElementIconButton
                                color="transparent-secondary"
                                size="small"
                            ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168Z" fill="#2D3033" fill-opacity="0.32"/>
                            </svg>
                            </ElementIconButton>
                            <ElementIconButton
                                color="transparent-secondary"
                                size="small"
                            ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM13 13.3551C14.4457 12.9248 15.5 11.5855 15.5 10C15.5 8.067 13.933 6.5 12 6.5C10.302 6.5 8.88637 7.70919 8.56731 9.31346L10.5288 9.70577C10.6656 9.01823 11.2723 8.5 12 8.5C12.8284 8.5 13.5 9.17157 13.5 10C13.5 10.8284 12.8284 11.5 12 11.5C11.4477 11.5 11 11.9477 11 12.5V14H13V13.3551Z" fill="#2D3033" fill-opacity="0.32"/>
                            </svg>
                            </ElementIconButton>
                            <ElementIconButton
                                color="transparent-secondary"
                                size="small"
                            ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="#2D3033" fill-opacity="0.32"/>
                            </svg>
                            </ElementIconButton>
                        </div>
                        <Dropdown menu-side="left">
                            <template #header>
                                <ElementLink
                                    size="small"
                                    color="transparent"
                                    chevron="right"
                                >{{ username }}
                                </ElementLink>
                            </template>
                            <ElementOption
                                type="ghost"
                                @click="async()=>{
                                    const cookiesToDelete = ['access', 'refresh', 'username'];
                                    cookiesToDelete.map(key=>{
                                        const cookie = useCookie(`${key}`);
                                        cookie.value = null;
                                    });
                                    await router.push('/admin/login/');
                                }"
                            >Выйти
                            </ElementOption>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <!-- <div class="header-spacing"></div> -->
</template>

<style lang="scss">
    header {
        // max-width: 1921px;
        width: 100%;
        z-index: 50;
        background-color: $bg-primary;
        @include transition(background-color);
        @include desktop {
            left: 0;
            transform: none;
        }
        .header-section {
            &__container {
                @include df_ac;
                justify-content: space-between;
                padding: 1.5rem;
                // max-width: 1921px;
                .option {
                    gap: 1.5rem;
                }
                .dropdown__option {
                    width: 15rem;
                }
            }
            &__logo {
                display: flex;
                max-width: 10.625rem;
                max-height: 2rem;
                @include wh_100;
                img {
                    @include image_contain;
                }
            }
            &__breadcrumbs-block {
                @include df_ac;
                gap: 1.5rem;
                &__buttons {
                    @include df_ac;
                    gap: .25rem;
                }
                &__info {
                    @include df_ac;
                    gap: .5rem;
                    svg {
                        height: 1rem;
                        width: 1rem;
                    }
                    &__link {
                        @include df_ac;
                        gap: .5rem;
                        &:last-of-type {
                            svg {
                                display: none;
                            }
                        }
                    }
                }
                &__filters {
                    @include df_ac;
                    gap: 1.5rem;
                    .link {
                        pointer-events: none;
                    }
                }
                hr {
                    border: none;
                    height: 1.5rem;
                    border-left: 1px solid $border-primary-transparent-16;
                }
            }
            &__right-block {
                @include df_ac;
                gap: 3rem;
                &__login-block {
                    @include df_ac;
                    gap: 1.5rem;
                    .dropdown {
                        &__menu {
                            width: 8rem;
                        }
                    }
                }
                &__icons-block {
                    @include df_ac;
                    gap: .5rem;
                }
                &__link {
                    position: relative;
                    &__counter {
                        pointer-events: none;
                        position: absolute;
                        right: .1875rem;
                        top: -.5rem;
                        @include df_ac_jcc;
                        height: 1.25rem;
                        aspect-ratio: 1;
                        background-color: $bg-accent;
                        color: $text-inverse;
                        border-radius: .25rem;
                        @include text_3;
                    }
                }
            }
        }
        &[data-theme="dark"] {
            background-color: $bg-accent;
        }
        &[data-type="panel"] {
            .header-section__container {
                justify-content: center;
            }
        }
        &[data-type="catalog"],
        &[data-type="catalog-fixed"] {
            position: fixed;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            .header-section__container {
                padding-left: 22.1875rem;
                padding-right: 22.1875rem;
            }
        }
        &[data-type="breadcrumbs"] {
            grid-column: span 12;
            .header-section__container {
                padding: 1.5rem 3rem;
            }
        }
    }
    .header-spacing {
        content: '';
        height: 5rem;
        width: 100%;
    }
    .dropdown-enter-active,
    .dropdown-leave-active {
        @include transition(opacity, transform);
    }

    .dropdown-enter-from,
    .dropdown-leave-to {
        opacity: 0;
        transform: translateY(-1rem);
    }
</style>