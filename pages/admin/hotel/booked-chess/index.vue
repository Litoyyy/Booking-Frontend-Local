<script lang="ts" setup>

    const { 
        sortElements, 
        selectSort, 
        dropSort 
    } = useSorters('booked-chess');


    definePageMeta({
        isAdmin: true,
    });

    const infoShow = ref(true);

    const searchVal = ref('');


    const getSearchVal=(event: Event)=>{
        const input = event.target as HTMLInputElement;
        searchVal.value = input.value;
    };
    const debouncedSearchVal = debounce(getSearchVal, 500);

</script>

<template>
    <section>
        <div class="booked-chess-section">
            <div class="booked-chess-section__container container_admin">

                <div class="booked-chess-section__header">
                    <div class="admin-section__title-block">
                        <div class="admin-section__title-block__title" @click="infoShow = !infoShow" :data-opened="infoShow">
                            Шахматка броней
                            <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.0007 13.1333L8.22608 18.9081L6.57617 17.2582L14.0007 9.8335L21.4254 17.2582L19.7755 18.9081L14.0007 13.1333Z" fill="#2D3033"/>
                            </svg>
                        </div>
                        <div class="admin-section__title-block__btns-block">
                            <ElementButton
                            >Создать бронь
                            </ElementButton>
                            <ElementButton
                                color="transparent"
                            >Создать групповую бронь
                            </ElementButton>
                        </div>
                    </div>
                    <Transition name="cards-grid">
                    <div class="booked-chess-section__info-cards" v-if="infoShow">
                        <InfoCardPercents class="info-card_percents"></InfoCardPercents>
                        <InfoCardGuestChips class="info-card_chips"></InfoCardGuestChips>
                        <InfoCardGuestProperties class="info-card_chips"></InfoCardGuestProperties>
                        <InfoCardRoomCondition class="info-card_gantt"></InfoCardRoomCondition>
                    </div>
                    </Transition>
                </div>
                
                <div class="booked-chess-section__filters">
                    <div class="admin-service-section__header__input-block">
                        <ElementInput 
                            class="admin-booked-searcher"
                            id="admin-booked-searcher"
                            placeholder="Поиск по номеру брони, ФИО гостя или e-mail…"
                            :on-input="debouncedSearchVal"
                        ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168Z" fill="#2D3033" fill-opacity="0.32"/>
                        </svg>
                        </ElementInput>
                    </div>
                    <div class="admin-section__filters-block">
                        <div class="admin-section__filters-block__sort">
                            <div class="admin-section__filters-block__sort__elem" v-for="elem in sortElements">
                                <span class="title">{{ elem.title }}</span>
                                <Dropdown menu-side="left">
                                    <template #header>
                                        <ElementLink
                                            color="neutral"
                                            chevron="right"
                                        >{{ elem.variants.find(variant=>variant.state === 'active')?.text }}
                                        </ElementLink>
                                    </template>
                                    <div class="dropdown__option" v-for="(variant, index) in elem.variants">
                                        <ElementOption
                                            type="ghost"
                                            :on-click="()=>selectSort(variant, elem.variants)"
                                            :state="variant.state"
                                        >{{ variant.text }}
                                        </ElementOption><hr>
                                    </div>
                                </Dropdown>
                            </div>
                            <div class="admin-section__filters-block__sort__elem">
                                <ElementLink
                                    color="transparent"
                                    @click="dropSort"
                                >Сбросить
                                </ElementLink>
                            </div>
                        </div>
                        <ElementIconButton
                            size="small"
                            color="transparent"
                            data-state="disabled"
                            ghost
                        ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.3643 15.5355L16.9501 14.1213L18.3643 12.7071C20.3169 10.7545 20.3169 7.58866 18.3643 5.63604C16.4117 3.68341 13.2458 3.68341 11.2932 5.63604L9.87898 7.05025L8.46477 5.63604L9.87898 4.22182C12.6127 1.48815 17.0448 1.48815 19.7785 4.22182C22.5122 6.95549 22.5122 11.3876 19.7785 14.1213L18.3643 15.5355ZM15.5358 18.364L14.1216 19.7782C11.388 22.5118 6.9558 22.5118 4.22213 19.7782C1.48846 17.0445 1.48846 12.6123 4.22213 9.87868L5.63634 8.46446L7.05056 9.87868L5.63634 11.2929C3.68372 13.2455 3.68372 16.4113 5.63634 18.364C7.58896 20.3166 10.7548 20.3166 12.7074 18.364L14.1216 16.9497L15.5358 18.364ZM14.8287 7.75736L16.243 9.17157L9.17188 16.2426L7.75766 14.8284L14.8287 7.75736Z" fill="#2D3033" fill-opacity="0.16"/>
                        </svg>
                        </ElementIconButton>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<style lang="scss">
    .booked-chess-section {
        &__header {
            grid-column: span 12;
            @include df_fdc;
            gap: 1.5rem;
            .admin-section {
                &__title-block {
                    &__title {
                        cursor: pointer;
                        svg {
                            @include transition(transform);
                        }
                        &[data-opened="false"] {
                            svg {
                                transform: rotate(-180deg);
                            }
                        }
                    }
                    &__btns-block {
                        gap: .75rem;
                    }
                }
            }
        }
        &__info-cards {
            display: flex;
            gap: 1rem;
            .info-card {
                &_percents {
                    min-width: 20rem;
                }
                &_chips {
                    min-width: 19.125rem;
                }
                &_gantt {
                    width: 100%;
                }
            }
        }
        &__filters {
            grid-column: span 12;
            @include df_fdc;
            gap: 1.5rem;
            .field {
                max-width: 38.5rem
            }
        }
    }
    .cards-grid-enter-active,
    .cards-grid-leave-active {
        @include transition(opacity, transform);
    }

    .cards-grid-enter-from,
    .cards-grid-leave-to {
        opacity: 0;
        transform: translateY(-2rem);
    }
</style>