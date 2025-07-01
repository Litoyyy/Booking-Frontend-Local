<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="Номер 3, Димитрова В. А." resize>
        <div class="popup__info-block custom-scrollbar">
            <div class="popup__info-block__info">
                <div class="item">
                    <div class="item__key">Статус</div>
                    <div class="item__value positive">Новая бронь</div>
                </div>
                <div class="item">
                    <div class="item__key">Статус</div>
                    <div class="item__value accent">Новая бронь</div>
                </div>
                <div class="item">
                    <div class="item__key">Статус</div>
                    <div class="item__value accent">Новая бронь</div>
                </div>
                <div class="item">
                    <div class="item__key">Статус</div>
                    <div class="item__value accent">Новая бронь</div>
                </div>
                <div class="item">
                    <div class="item__key">Статус</div>
                    <div class="item__value accent">Новая бронь</div>
                </div>
            </div>
            <hr>
            <div class="popup__info-block__info">
                <div class="item">
                    <div class="item__key">Заезд и выезд</div>
                    <div class="item__value">20 ноя, 14:00 - 23 ноя, 12:00</div>
                </div>
                <div class="item">
                    <div class="item__key">Заезд и выезд</div>
                    <div class="item__value">20 ноя, 14:00 - 23 ноя, 12:00</div>
                </div>
                <div class="item">
                    <div class="item__key">Заезд и выезд</div>
                    <div class="item__value">20 ноя, 14:00 - 23 ноя, 12:00</div>
                </div>
            </div>
            <hr>
            <div class="popup__info-block__info">
                <div class="item">
                    <div class="item__key">Взрослых, детей</div>
                    <div class="item__value">1</div>
                </div>
            </div>
            <hr>
            <div class="popup__info-block__info">
                <div class="item">
                    <div class="item__key">Источник</div>
                    <div class="item__value">Сайт гостиницы</div>
                </div>
            </div>
            <hr>
            <div class="popup__info-block__info">
                <div class="item">
                    <div class="item__key">Сумма за проживание</div>
                    <div class="item__value">18 900</div>
                </div>
                <div class="item">
                    <div class="item__key">Сумма за проживание</div>
                    <div class="item__value">18 900</div>
                </div>
                <div class="item">
                    <div class="item__key">Сумма за проживание</div>
                    <div class="item__value">18 900</div>
                </div>
                <div class="item">
                    <div class="item__key">Сумма за проживание</div>
                    <div class="item__value">18 900</div>
                </div>
                <div class="item">
                    <div class="item__key">Сумма за проживание</div>
                    <div class="item__value">18 900</div>
                </div>
                <div class="item">
                    <div class="item__key">Сумма за проживание</div>
                    <div class="item__value">18 900</div>
                </div>
            </div>
        </div>

        <div class="popup__fade-bottom"></div>

        <div class="popup__button-panel">
            <ElementIconButton size="large">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.0494 7.99676L19.9991 12.9465L8.44975 24.496H3.5V19.5461L15.0494 7.99676ZM16.6993 6.34685L19.1742 3.87198C19.6299 3.41637 20.3685 3.41637 20.8241 3.87198L24.124 7.17181C24.5796 7.62742 24.5796 8.36612 24.124 8.82172L21.649 11.2966L16.6993 6.34685Z" fill="white"/>
                </svg>
            </ElementIconButton>
            <ElementIconButton size="large"
            color="transparent">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.9996 12.3509L19.7743 6.57617L21.4242 8.22608L15.6495 14.0008L21.4242 19.7755L19.7743 21.4254L13.9996 15.6507L8.22487 21.4254L6.57495 19.7755L12.3497 14.0008L6.57495 8.22608L8.22487 6.57617L13.9996 12.3509Z" fill="#1C5BAD"/>
                </svg>
            </ElementIconButton>
            <ElementIconButton size="large"
            color="transparent">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.9999 25.6668C7.55659 25.6668 2.33325 20.4434 2.33325 14.0002C2.33325 7.55684 7.55659 2.3335 13.9999 2.3335C20.4432 2.3335 25.6666 7.55684 25.6666 14.0002C25.6666 20.4434 20.4432 25.6668 13.9999 25.6668ZM8.16659 12.8335V9.3335L2.33325 14.0002L8.16659 18.6668V15.1668H17.4999V12.8335H8.16659Z" fill="#1C5BAD"/>
                </svg>
            </ElementIconButton>
            <ElementIconButton size="large"
            color="transparent">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.6661 12.8335H2.39038C2.97572 6.93796 7.94986 2.3335 13.9995 2.3335C20.4428 2.3335 25.6662 7.55684 25.6662 14.0002C25.6662 20.4434 20.4428 25.6668 13.9995 25.6668C7.94986 25.6668 2.97572 21.0623 2.39038 15.1668H11.6661V18.6668L17.4995 14.0002L11.6661 9.3335V12.8335Z" fill="#1C5BAD"/>
                </svg>
            </ElementIconButton>
            <ElementIconButton size="large"
            color="transparent">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.9999 25.6668C7.55659 25.6668 2.33325 20.4434 2.33325 14.0002C2.33325 7.55684 7.55659 2.3335 13.9999 2.3335C20.4432 2.3335 25.6666 7.55684 25.6666 14.0002C25.6666 20.4434 20.4432 25.6668 13.9999 25.6668ZM19.8333 18.6668L25.6666 14.0002L19.8333 9.3335V12.8335H10.4999V15.1668H19.8333V18.6668Z" fill="#1C5BAD"/>
                </svg>
            </ElementIconButton>
            <ElementIconButton size="large"
            color="transparent">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.3333 25.6668H4.66667C4.02234 25.6668 3.5 25.1445 3.5 24.5002V3.50016C3.5 2.85584 4.02234 2.3335 4.66667 2.3335H23.3333C23.9777 2.3335 24.5 2.85584 24.5 3.50016V24.5002C24.5 25.1445 23.9777 25.6668 23.3333 25.6668ZM8.16667 7.00016V11.6668H12.8333V7.00016H8.16667ZM8.16667 14.0002V16.3335H19.8333V14.0002H8.16667ZM8.16667 18.6668V21.0002H19.8333V18.6668H8.16667ZM15.1667 8.16683V10.5002H19.8333V8.16683H15.1667Z" fill="#1C5BAD"/>
                </svg>
            </ElementIconButton>
            <ElementIconButton size="large"
            color="transparent">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.6725 12.8329V23.3329C25.6725 23.9772 25.1501 24.4995 24.5058 24.4995H3.50578C2.86145 24.4995 2.33911 23.9772 2.33911 23.3329V12.8329H25.6725ZM25.6725 8.16618H2.33911V4.66618C2.33911 4.02184 2.86145 3.49951 3.50578 3.49951H24.5058C25.1501 3.49951 25.6725 4.02184 25.6725 4.66618V8.16618Z" fill="#1C5BAD"/>
                </svg>
            </ElementIconButton>
            <ElementIconButton size="large"
            color="transparent">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.53023 22.1667L2.33325 26.25V4.66667C2.33325 4.02234 2.85559 3.5 3.49992 3.5H24.4999C25.1443 3.5 25.6666 4.02234 25.6666 4.66667V21C25.6666 21.6443 25.1443 22.1667 24.4999 22.1667H7.53023ZM12.8333 11.6667H9.33325V14H12.8333V17.5H15.1666V14H18.6666V11.6667H15.1666V8.16667H12.8333V11.6667Z" fill="#1C5BAD"/>
                </svg>
            </ElementIconButton>
            <ElementIconButton size="large" color="negative">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.62351 3.5H24.4991C25.1435 3.5 25.6658 4.02234 25.6658 4.66667V23.3333C25.6658 23.9777 25.1435 24.5 24.4991 24.5H7.62351C7.23343 24.5 6.86916 24.3051 6.65279 23.9805L0.430561 14.6471C0.169305 14.2553 0.169305 13.7447 0.430561 13.3528L6.65279 4.01952C6.86916 3.69495 7.23343 3.5 7.62351 3.5ZM15.1658 12.3501L11.866 9.05025L10.216 10.7002L13.5159 14L10.216 17.2998L11.866 18.9497L15.1658 15.6499L18.4656 18.9497L20.1156 17.2998L16.8157 14L20.1156 10.7002L18.4656 9.05025L15.1658 12.3501Z" fill="white"/>
                </svg>
            </ElementIconButton>
        </div>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        &:has(.popup__info-block.custom-scrollbar) {
            padding-bottom: 3rem;
        }
        &__fade-bottom {
            position: absolute;
            left: 0;
            bottom: 9rem;
            width: 100%;
            height: 4rem;
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%);
            pointer-events: none;
        }
        &__info-block {
            @include df_fdc;
            gap: 1.5rem;

            max-height: 43.5625rem;
            &__info {
                @include df_fdc;
                gap: 1rem;
                .item {
                    @include df_ac;
                    gap: 1rem;
                    @include text_1;
                    &__key {
                        flex: 1;
                        color: $text-primary-transparent-48;
                    }
                    &__value {
                        flex: 1;
                        &.positive {
                            color: $text-system-positive;
                        }
                        &.accent {
                            color: $text-accent;
                        }
                    }
                }
            }
            hr {
                border: 0;
                border-bottom: 1px solid $border-primary-transparent-8;
            }
        }
        &__button-panel {
            @include df_ac;
            gap: .75rem;
            padding: 0 3rem;
        }
    }
</style>