<script lang="ts" setup>
   
</script>

<template>
   <section>
        <div class="category-section">
            <div class="category-section__container container_admin">
                <div class="category-section__header">
                    <span>Категории номеров</span>
                    <div class="category-section__header__button-block">
                        <div class="category-section__header__view-buttons">
                            <ElementRadio id="category-section-view-small" 
                            name="category_view"
                            checked>
                                <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24.5 23.8333C24.5 24.4777 23.9777 25 23.3333 25L4.66667 25C4.02232 25 3.5 24.4777 3.5 23.8333L3.5 20.7184C3.5 20.0741 4.02232 19.5518 4.66667 19.5518H23.3333C23.9777 19.5518 24.5 20.0741 24.5 20.7184V23.8333Z" fill="#2D3033" fill-opacity="0.48"/>
                                    <path d="M24.5 8.27342C24.5 8.91777 23.9777 9.44009 23.3333 9.44009L4.66667 9.44008C4.02232 9.44008 3.5 8.91777 3.5 8.27342L3.5 5.16667C3.5 4.52232 4.02232 4 4.66667 4L23.3333 4C23.9777 4 24.5 4.52232 24.5 5.16667V8.27342Z" fill="#2D3033" fill-opacity="0.48"/>
                                    <path d="M24.5 16.0567C24.5 16.701 23.9777 17.2234 23.3333 17.2234L4.66667 17.2234C4.02232 17.2234 3.5 16.701 3.5 16.0567L3.5 12.9418C3.5 12.2975 4.02232 11.7751 4.66667 11.7751L23.3333 11.7751C23.9777 11.7751 24.5 12.2975 24.5 12.9418L24.5 16.0567Z" fill="#2D3033" fill-opacity="0.48"/>
                                </svg>
                            </ElementRadio>
                            <ElementRadio id="category-section-view-big" 
                            name="category_view">
                                <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M25.6667 15.6655V23.8333C25.6667 24.4777 25.1444 25 24.5 25H15.1667V15.6655H25.6667ZM12.8334 15.6655V25H3.50004C2.85571 25 2.33337 24.4777 2.33337 23.8333V15.6655H12.8334ZM12.8334 4V13.3322H2.33337V5.16667C2.33337 4.52234 2.85571 4 3.50004 4H12.8334ZM24.5 4C25.1444 4 25.6667 4.52234 25.6667 5.16667V13.3322H15.1667V4H24.5Z" fill="#2D3033" fill-opacity="0.48"/>
                                </svg>
                            </ElementRadio>
                        </div>
                        <ElementButton>Создать</ElementButton>
                    </div>
                </div>
                <div class="category-section__body">
                    <table class="table table_category">
                        <thead class="table__head">
                            <tr>
                                <th class="table__t2 table__t2_heading">
                                    <ElementCheckbox name="category_choose"
                                    id="room-category-choose"></ElementCheckbox>
                                </th>
                                <th class="table__t2 table__t2_heading">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.5 7C9.32843 7 10 6.32843 10 5.5C10 4.67157 9.32843 4 8.5 4C7.67157 4 7 4.67157 7 5.5C7 6.32843 7.67157 7 8.5 7ZM8.5 13.5C9.32843 13.5 10 12.8284 10 12C10 11.1716 9.32843 10.5 8.5 10.5C7.67157 10.5 7 11.1716 7 12C7 12.8284 7.67157 13.5 8.5 13.5ZM10 18.5C10 19.3284 9.32843 20 8.5 20C7.67157 20 7 19.3284 7 18.5C7 17.6716 7.67157 17 8.5 17C9.32843 17 10 17.6716 10 18.5ZM15.5 7C16.3284 7 17 6.32843 17 5.5C17 4.67157 16.3284 4 15.5 4C14.6716 4 14 4.67157 14 5.5C14 6.32843 14.6716 7 15.5 7ZM17 12C17 12.8284 16.3284 13.5 15.5 13.5C14.6716 13.5 14 12.8284 14 12C14 11.1716 14.6716 10.5 15.5 10.5C16.3284 10.5 17 11.1716 17 12ZM15.5 20C16.3284 20 17 19.3284 17 18.5C17 17.6716 16.3284 17 15.5 17C14.6716 17 14 17.6716 14 18.5C14 19.3284 14.6716 20 15.5 20Z" fill="#2D3033" fill-opacity="0.48"/>
                                    </svg>
                                </th>
                                <th class="table__t2 table__t2_heading">Вкл</th>
                                <th class="table__t2 table__t2_heading">Название</th>
                                <th class="table__t2 table__t2_heading">Номера</th>
                                <th class="table__t2 table__t2_heading">
                                    <ElementIconButton size="small" ghost color="transparent-secondary">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#2D3033" fill-opacity="0.16"/>
                                        </svg>
                                    </ElementIconButton>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="table__body">
                            <tr>
                                <td class="table__t1"></td>
                                <td class="table__t1"></td>
                                <td class="table__t1">
                                    <ElementToggle id="table-card-toggle-1"></ElementToggle>
                                </td>
                                <td class="table__t1">Все</td>
                                <td class="table__t1 table__t1_tp">Все</td>
                                <td class="table__t1"></td>
                            </tr>
                            <tr>
                                <td class="table__t1">
                                    <ElementCheckbox name="category_choose"
                                    id="room-category-choose"></ElementCheckbox>
                                </td>
                                <td class="table__t1">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.5 7C9.32843 7 10 6.32843 10 5.5C10 4.67157 9.32843 4 8.5 4C7.67157 4 7 4.67157 7 5.5C7 6.32843 7.67157 7 8.5 7ZM8.5 13.5C9.32843 13.5 10 12.8284 10 12C10 11.1716 9.32843 10.5 8.5 10.5C7.67157 10.5 7 11.1716 7 12C7 12.8284 7.67157 13.5 8.5 13.5ZM10 18.5C10 19.3284 9.32843 20 8.5 20C7.67157 20 7 19.3284 7 18.5C7 17.6716 7.67157 17 8.5 17C9.32843 17 10 17.6716 10 18.5ZM15.5 7C16.3284 7 17 6.32843 17 5.5C17 4.67157 16.3284 4 15.5 4C14.6716 4 14 4.67157 14 5.5C14 6.32843 14.6716 7 15.5 7ZM17 12C17 12.8284 16.3284 13.5 15.5 13.5C14.6716 13.5 14 12.8284 14 12C14 11.1716 14.6716 10.5 15.5 10.5C16.3284 10.5 17 11.1716 17 12ZM15.5 20C16.3284 20 17 19.3284 17 18.5C17 17.6716 16.3284 17 15.5 17C14.6716 17 14 17.6716 14 18.5C14 19.3284 14.6716 20 15.5 20Z" fill="#2D3033" fill-opacity="0.48"/>
                                    </svg>
                                </td>
                                <td class="table__t1">
                                    <ElementToggle id="table-card-toggle-2"></ElementToggle>
                                </td>
                                <td class="table__t1">Все</td>
                                <td class="table__t1">Все</td>
                                <td class="table__t1"></td>
                            </tr>
                        </tbody>
                    </table>
                    <form class="category-section__body__create-category">
                        <table class="table table_form">
                            <tbody class="table__body">
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <ElementInput fake-placeholder="Название новой категории"
                                        helper="Введите ячейки и нажмите ↵ Enter"></ElementInput>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div> 
   </section>
</template>

<style lang="scss" scoped>
    .category-section {
        &__header {
            grid-column: span 12;
            @include df_jb_ac;
            @include heading_1;
            &__button-block {
                @include df_ac;
                gap: 1.5rem;
            }
            &__view-buttons {
                @include df_ac;
                .custom-radio-label {
                    padding: .5rem;
                    svg {
                        max-height: 1.75rem;
                        max-width: 1.75rem;
                        @include wh-100;
                        aspect-ratio: 1;
                    }
                    &::before, &::after {
                        display: none;
                    }
                    :deep(input) {
                        display: none;
                    }
                    &:has(input:checked) {
                        svg path {
                            fill-opacity: 1;
                        }
                    }
                }
            }
        }
        &__body {
            grid-column: span 12;
            .table {
                width: 100%;
                &_category {
                    th, td {
                        white-space: nowrap;
                        svg {
                            height: 1.5rem;
                            width: 1.5rem;
                            aspect-ratio: 1 / 1;
                        }
                        &:nth-child(4) {
                            width: auto;
                        }

                        &:nth-child(5) {
                            width: 16rem;
                        }

                        &:not(:nth-child(4)):not(:nth-child(5)) {
                            width: 1%;
                        }
                    }
                }
                &_form {
                    td {
                        &:nth-child(1) {
                            width: 3.25rem;
                        }
                        &:nth-child(2) {
                            width: 3.5rem;
                        }
                        &:nth-child(3) {
                            width: 5rem;
                        }
                    }
                }
            }
            &__create-category {
                &::v-deep(.field__helper) {
                    color: $text-primary-transparent-48;
                }
            }
        }
    }
</style>