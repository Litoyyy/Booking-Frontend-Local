<script lang="ts" setup>

    definePageMeta({
        isAdmin: true,
    });

    const displayState = ref('columns');
    const displayedBody = ref('data');

    const roomCategories = ref([]);

    const updRoomCategories =async()=>{
        const res = await getData('/hotel/room-category');
        roomCategories.value = res.results;
    };

    const allRooms = ref([]);

    const updRooms =async()=>{
        const res = await getData('/hotel/room');
        allRooms.value = res.results;
        console.log(allRooms.value);
    };

    onMounted(()=>{
        updRoomCategories();
        updRooms();
    });

</script>

<template>
    <section>
        <div class="admin-availability-section">
            <div class="admin-availability-section__container container_admin">
                <div class="admin-availability-section__header">
                    <div class="admin-section__title-block">
                        <div class="admin-section__title-block__title">
                            Доступность
                        </div>
                        <div class="admin-section__title-block__btns-block" v-if="displayedBody === 'data'">
                            <div class="admin-section__title-block__btns-block__btns">
                                <ElementIconButton
                                    color="transparent"
                                    :state="displayState === 'columns' ? 'active' : ''"
                                    @click="()=>{displayState = 'columns'}"
                                    ghost
                                ><svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.3333 4C23.9777 4 24.5 4.52234 24.5 5.16667V23.8333C24.5 24.4777 23.9777 25 23.3333 25H20.2184C19.5741 25 19.0518 24.4777 19.0518 23.8333L19.0518 5.16667C19.0518 4.52234 19.5741 4 20.2184 4L23.3333 4Z" fill="#2D3033"/>
                                    <path d="M7.77342 4C8.41777 4 8.94009 4.52234 8.94009 5.16667L8.94008 23.8333C8.94008 24.4777 8.41777 25 7.77342 25H4.66667C4.02232 25 3.5 24.4777 3.5 23.8333L3.5 5.16667C3.5 4.52234 4.02232 4 4.66667 4L7.77342 4Z" fill="#2D3033"/>
                                    <path d="M15.5567 4C16.201 4 16.7234 4.52234 16.7234 5.16667L16.7234 23.8333C16.7234 24.4777 16.201 25 15.5567 25H12.4418C11.7975 25 11.2751 24.4777 11.2751 23.8333L11.2751 5.16667C11.2751 4.52234 11.7975 4 12.4418 4L15.5567 4Z" fill="#2D3033"/>
                                </svg>
                                </ElementIconButton>
                                <ElementIconButton
                                    color="transparent"
                                    :state="displayState === 'rows' ? 'active' : ''"
                                    @click="()=>{displayState = 'rows'}"
                                    ghost
                                ><svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24.5 23.8333C24.5 24.4777 23.9777 25 23.3333 25L4.66667 25C4.02232 25 3.5 24.4777 3.5 23.8333L3.5 20.7184C3.5 20.0741 4.02232 19.5518 4.66667 19.5518H23.3333C23.9777 19.5518 24.5 20.0741 24.5 20.7184V23.8333Z" fill="#2D3033" fill-opacity="0.48"/>
                                    <path d="M24.5 8.27342C24.5 8.91777 23.9777 9.44009 23.3333 9.44009L4.66667 9.44008C4.02232 9.44008 3.5 8.91777 3.5 8.27342L3.5 5.16667C3.5 4.52232 4.02232 4 4.66667 4L23.3333 4C23.9777 4 24.5 4.52232 24.5 5.16667V8.27342Z" fill="#2D3033" fill-opacity="0.48"/>
                                    <path d="M24.5 16.0567C24.5 16.701 23.9777 17.2234 23.3333 17.2234L4.66667 17.2234C4.02232 17.2234 3.5 16.701 3.5 16.0567L3.5 12.9418C3.5 12.2975 4.02232 11.7751 4.66667 11.7751L23.3333 11.7751C23.9777 11.7751 24.5 12.2975 24.5 12.9418L24.5 16.0567Z" fill="#2D3033" fill-opacity="0.48"/>
                                </svg>
                                </ElementIconButton>
                            </div>
                        </div>
                    </div>
                    <div class="admin-availability-section__header__btns">
                        <ElementButton
                            color="outlined"
                            :state="displayedBody === 'data' ? 'active' : undefined"
                            @click="displayedBody = 'data'"
                        >Данные
                        </ElementButton>
                        <ElementButton
                            color="outlined"
                            :state="displayedBody === 'settings' ? 'active' : undefined"
                            @click="displayedBody = 'settings'"
                        >Настройки
                        </ElementButton>
                    </div>
                    <div class="admin-availability-section__header__inputs" v-if="displayedBody === 'data'">
                        <DatePicker rangeSelect
                            id="admin-availability"
                        />
                    </div>
                </div>

                <div class="admin-availability-section__body" v-if="displayedBody === 'data'">
                    <div class="admin-availability-section__body__chips">
                        <ElementChip dot-color="#1CAD64">Изменена вручную</ElementChip>
                        <ElementChip dot-color="#E66F6F">Overbooking</ElementChip>
                        <ElementChip dot-color="#E68F6F">Доступность исчерпана</ElementChip>
                        <!-- <ElementChip dot-color="#1C5BAD">Бронь отменена</ElementChip> -->
                    </div>
                    <div class="admin-availability-section__body__table">
                        <table class="table" v-if="displayState === 'columns'" table="columns">
                            <thead class="table__head">
                                <tr>
                                    <th class="table__t1 table__year table_tac" rowspan="2">
                                        2024
                                    </th>

                                    <th 
                                        v-for="room in allRooms"
                                        class="table__t1 table_tac table__t1_room-title" 
                                        colspan="5"
                                    >{{ room.name }}
                                    </th>
                                </tr>
                                <tr>
                                    <template v-for="room in allRooms">
                                        <th class="table__t2 table__t2_row table_tac table__toggle"
                                        >Вкл.
                                        </th>
                                        <th class="table__t2 table__t2_row table_tac">
                                            Продается
                                        </th>
                                        <th class="table__t2 table__t2_row table_tac">
                                            Брони
                                        </th>
                                        <th class="table__t2 table__t2_row table_tac">
                                            Свободно
                                        </th>
                                        <th class="table__t2 table__t2_row table_tac">
                                            Отмены
                                        </th>
                                    </template>
                                </tr>
                            </thead>
                            <tbody class="table__body">
                                <tr>
                                    <td class="table__t1 table__t1_tp">
                                        14 окт, пн
                                    </td>

                                    <td>
                                        <div class="table__toggle_elem">
                                            <ElementToggle/>
                                        </div>
                                    </td>
                                    <td class="table__t1">33</td>
                                    <td class="table__t1">7</td>
                                    <td class="table__t1">26</td>
                                    <td class="table__t1">4</td>

                                    <td>
                                        <div class="table__toggle_elem">
                                            <ElementToggle/>
                                        </div>
                                    </td>
                                    <td class="table__t1">33</td>
                                    <td class="table__t1">7</td>
                                    <td class="table__t1">26</td>
                                    <td class="table__t1">4</td>

                                    <td>
                                        <div class="table__toggle_elem">
                                            <ElementToggle/>
                                        </div>
                                    </td>
                                    <td class="table__t1">33</td>
                                    <td class="table__t1">7</td>
                                    <td class="table__t1">26</td>
                                    <td class="table__t1">4</td>

                                    <td>
                                        <div class="table__toggle_elem">
                                            <ElementToggle/>
                                        </div>
                                    </td>
                                    <td class="table__t1">33</td>
                                    <td class="table__t1">7</td>
                                    <td class="table__t1">26</td>
                                    <td class="table__t1">4</td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="table" v-else-if="displayState === 'rows'" table="rows">
                            <thead class="table__head">
                                <tr>
                                    <th class="table__t1 table__year">
                                        2024
                                    </th>
                                    <th class="table__t1 table__t1_tp">
                                        14 окт, пн
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="table__body">
                                <tr>
                                    <td class="table__t1 table__room-title">
                                        Стандарт с широкой кроватью
                                    </td>
                                    <td>
                                        <div class="table__toggle">
                                            <ElementToggle />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="table__t2 table__t2_heading">
                                        Продается
                                    </td>
                                    <td class="table__t1 table_tac">
                                        33
                                    </td>
                                </tr>
                                <tr>
                                    <td class="table__t2 table__t2_heading">
                                        Брони
                                    </td>
                                    <td class="table__t1 table_tac">
                                        7
                                    </td>
                                </tr>
                                <tr>
                                    <td class="table__t2 table__t2_heading">
                                        Свободно
                                    </td>
                                    <td class="table__t1 table_tac">
                                        26
                                    </td>
                                </tr>
                                <tr>
                                    <td class="table__t2 table__t2_heading">
                                        Отмены
                                    </td>
                                    <td class="table__t1 table_tac">
                                        4
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="admin-availability-section__body" v-else-if="displayedBody === 'settings'" data-body="settings">
                    <div class="admin-availability-section__body__text">
                        Укажите значения по умолчанию по каждой из категорий номеров
                    </div>
                    <div class="admin-availability-section__body__inputs">
                        <ElementInput v-for="category in roomCategories"
                            :id="`admin-availability-settings-input-${category.id}`"
                            :fake-placeholder="category.name"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    .admin-availability-section {
        &__container {
            padding-bottom: 3rem;
        }
        &__header {
            @include df_fdc;
            gap: 1.5rem;
            grid-column: span 12;
            .calendar-container {
                max-width: 31.25rem;
            }
            &__btns {
                @include df_ac;
                gap: .75rem;
            }
        }
        &__body {
            @include df_fdc;
            gap: 1.5rem;
            grid-column: span 12;
            height: calc(100dvh - 25rem);
            &[data-body="settings"] {
                grid-column: span 6;
                height: unset;
            }
            &__chips {
                @include df_ac;
                gap: 1.5rem;
            }
            &__table {
                height: 100%;
                overflow: auto;
                .table {
                    &[table="columns"] {
                        .table {
                            &__head {
                                th {
                                    padding: 1rem;
                                }
                                .table__t2_row {
                                    min-width: 7.25rem;
                                }
                            }
                            &__body {
                                td {
                                    text-align: center;
                                }
                                .table__t1_tp {
                                    text-align: left;
                                }
                            }
                            &__toggle {
                                min-width: 5.5625rem !important;
                                &_elem {
                                    display: inline-flex;
                                    justify-content: center;
                                    width: 100%;
                                }
                            }
                            &__year {
                                min-width: 10rem;
                                background-color: $bg-inverse-transparent-4;
                            }
                            &_tac {
                                text-align: center;
                            }
                        }
                    }
                    &[table="rows"] {
                        .table {
                            &__head {
                                th {
                                    padding: 1rem;
                                    min-width: 8.75rem;
                                    text-align: center;
                                }
                            }
                            &__body {
                                td {
                                    padding: .5rem;
                                }
                            }
                            &__year {
                                min-width: 15rem !important;
                                max-width: 15rem;
                                background-color: $bg-inverse-transparent-4;
                            }
                            &_tac {
                                text-align: center;
                            }
                            &__room-title {
                                text-wrap: wrap;
                                max-width: 15rem;
                                padding-bottom: 1rem !important;
                            }
                            &__toggle {
                                display: inline-flex;
                                align-items: center;
                                justify-content: center;
                                @include wh_100;
                            }
                        }
                    }
                }
            }
            &__text {
                @include text_1;
            }
            &__inputs {
                @include grid(2, 1rem);
            }
        }
    }
</style>