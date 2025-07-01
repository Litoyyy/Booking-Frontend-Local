<script lang="ts" setup>
    import { z } from 'zod';

    const route = useRoute();

    definePageMeta({
        isAdmin: true,
    });

    const popupDeleteOpened = ref(false);
    const dialogDeleteFailureOpened = ref(false);
    const dialogCreatedShow = ref(false);
    const roomToEdit = ref();

    const displayState = ref('columns');
    
    const categoryInfo = ref();
    const categoryRooms = ref([]);

    let categoryQuery = '';

    if(route.params.id != '0') {
        const res = await getData(`/hotel/room-category/${route.params.id}`);
        categoryInfo.value = res;
        categoryQuery = `?category=${route.params.id}`;
    }
    const getRooms=async()=>{
        const resRooms = await getData(`/hotel/room${categoryQuery}`);
        categoryRooms.value = resRooms.results;
    };

    const {
        allChecked,
        checkAllFunc
    } = useTableCheckboxes(categoryRooms);

    const formRef = ref<HTMLFormElement | null>(null);

    const createSchema = z.object({
        name: z.string().min(1),
        small_name: z.string().min(1),
        base_price: z.string().min(1),
        room_count: z.string().min(1),
    });


    const handleValidate=()=> {
        if(formRef.value) {
            validate(formRef.value, createSchema,
                async(body: any)=> { 
                    body.category = [ Number(route.params.id) ];
                    body.room_count = Number(body.room_count);
                    body.base_price = Number(body.base_price);

                    try {
                        const res = await sendData(body, '/hotel/room');
                        roomToEdit.value = res;
                        getRooms();
                    } catch(error) {
                        console.error('Ошибка при создании номера:' + error)
                    }
                },{ errorOff: true, clearAfterSubmit: true }
            );
        };
    };

    onMounted(()=>{
        getRooms();
    });

    const rowRefs = ref<HTMLElement[]>([]);
    const zoneRef = ref<HTMLElement>();

</script>

<template>
    

    <section>
        <div class="admin-category-section">
            <div class="admin-category-section__container container_admin">

                <div class="admin-category-section__header">
                    <div class="admin-section__title-block">
                        <div class="admin-section__title-block__title">
                            <span v-if="route.params.id != '0'">«{{ categoryInfo?.name }}»</span> 
                            <span v-else>Все</span>
                            номера
                        </div>
                        <div class="admin-section__title-block__btns-block">
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
                                    :state="displayState === 'cards' ? 'active' : ''"
                                    @click="()=>{displayState = 'cards'}"
                                    ghost
                                ><svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M25.6667 15.6655V23.8333C25.6667 24.4777 25.1444 25 24.5 25H15.1667V15.6655H25.6667ZM12.8334 15.6655V25H3.50004C2.85571 25 2.33337 24.4777 2.33337 23.8333V15.6655H12.8334ZM12.8334 4V13.3322H2.33337V5.16667C2.33337 4.52234 2.85571 4 3.50004 4H12.8334ZM24.5 4C25.1444 4 25.6667 4.52234 25.6667 5.16667V13.3322H15.1667V4H24.5Z" fill="#2D3033" fill-opacity="0.48"/>
                                </svg>
                                </ElementIconButton>
                            </div>
                            <ElementButton
                                :link="`/admin/numbers/categories/create/${route.params.id}/`"
                            >Создать
                            </ElementButton>
                        </div>
                    </div>
                </div>

                <div class="admin-category-section__body">
                    <div class="admin-category-section__body__table" v-if="displayState === 'columns'">
                        <table class="table">
                            <thead class="table__head">
                                <tr>
                                    <th class="table__checkbox">
                                        <ElementCheckbox
                                            :checked="allChecked"
                                            :on-update="(checked: boolean)=>checkAllFunc(checked)"
                                            id="table-head-checkbox"
                                        />
                                    </th>
                                    <th class="table__drag-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.5 7C9.32843 7 10 6.32843 10 5.5C10 4.67157 9.32843 4 8.5 4C7.67157 4 7 4.67157 7 5.5C7 6.32843 7.67157 7 8.5 7ZM8.5 13.5C9.32843 13.5 10 12.8284 10 12C10 11.1716 9.32843 10.5 8.5 10.5C7.67157 10.5 7 11.1716 7 12C7 12.8284 7.67157 13.5 8.5 13.5ZM10 18.5C10 19.3284 9.32843 20 8.5 20C7.67157 20 7 19.3284 7 18.5C7 17.6716 7.67157 17 8.5 17C9.32843 17 10 17.6716 10 18.5ZM15.5 7C16.3284 7 17 6.32843 17 5.5C17 4.67157 16.3284 4 15.5 4C14.6716 4 14 4.67157 14 5.5C14 6.32843 14.6716 7 15.5 7ZM17 12C17 12.8284 16.3284 13.5 15.5 13.5C14.6716 13.5 14 12.8284 14 12C14 11.1716 14.6716 10.5 15.5 10.5C16.3284 10.5 17 11.1716 17 12ZM15.5 20C16.3284 20 17 19.3284 17 18.5C17 17.6716 16.3284 17 15.5 17C14.6716 17 14 17.6716 14 18.5C14 19.3284 14.6716 20 15.5 20Z" fill="#2D3033" fill-opacity="0.32"/>
                                        </svg>
                                    </th>
                                    <th class="table__t2 table__t2_heading table__toggle">
                                        Вкл.
                                    </th>
                                    <th class="table__t2 table__t2_heading table__name">
                                        Название номера 
                                    </th>
                                    <th class="table__t2 table__t2_heading table__price">
                                        Стоимость, ₽
                                    </th>
                                    <th class="table__t2 table__t2_heading table__equipment">
                                        Оснащение
                                    </th>
                                    <th class="table__t2 table__t2_heading table__reduction">
                                        Сокращение
                                    </th>
                                    <th class="table__t2 table__t2_heading table__same-width">
                                        Кол-во
                                    </th>
                                    <th class="table__t2 table__t2_heading table__same-width">
                                        Фото
                                    </th>
                                    <th class="table__t2 table__t2_heading table__same-width">
                                        Мест
                                    </th>
                                    <th class="table__drag">
                                        <ElementIconButton
                                            size="small"
                                            color="transparent-secondary"
                                            disabled
                                            ghost
                                        ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#2D3033" fill-opacity="0.32"/>
                                        </svg>
                                        </ElementIconButton>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="table__body" ref="zoneRef">
                                <tr v-for="(room, index) in categoryRooms"
                                    :key="room.id" 
                                    ref="rowRefs"
                                    ref_for
                                >
                                    <td>
                                        <ElementCheckbox
                                            :id="`table-checkbox-${room.id}`"
                                            :checked="room.checked"
                                            :on-update="(checked: boolean)=>{room.checked = checked}"
                                        />
                                    </td>
                                    <td class="table__drag-icon">
                                        <TableDragElem
                                            :all-draggable="rowRefs"
                                            :drag-zone="zoneRef"
                                            :cur-index="index"
                                        />
                                    </td>
                                    <td>
                                        <ElementToggle
                                            v-model:checked="room.is_active"
                                            :on-change="async(checked: boolean)=>{
                                                room.is_active = checked;
                                                await sendData(room, `/hotel/room/${room.id}`, 'PATCH');
                                            }"
                                            :id="'table-toggle-' + room.id"
                                        />
                                    </td>
                                    <td>
                                        <ElementLink 
                                            color="neutral"
                                            :link="`/admin/numbers/categories/create/${categoryInfo?.id}/?room_id=${room?.id}`"
                                        >{{ room.name }}
                                        </ElementLink>
                                    </td>
                                    <td class="table__t1">
                                        {{ room.base_price }}
                                    </td>
                                    <td class="table__t1 table__t1_tp">
                                        {{ room.addition_items.length }}
                                    </td>
                                    <td class="table__t1 table__t1_tp">
                                        {{ room.small_name }}
                                    </td>
                                    <td class="table__t1 table__t1_tp">
                                        {{ room.room_count ? room.room_count : 0 }}
                                    </td>
                                    <td class="table__t1 table__t1_tp">
                                        {{ room.room_count ? room.room_count : 0 }}
                                    </td>
                                    <td class="table__t1 table__t1_tp">
                                        {{ room.room_count ? room.room_count : 0 }}
                                    </td>
                                    <td>
                                        <Dropdown menu-side="left">
                                            <template #header>
                                                <ElementIconButton
                                                    size="small"
                                                    color="transparent-secondary"
                                                    ghost
                                                ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#2D3033" fill-opacity="0.32"/>
                                                </svg>
                                                </ElementIconButton>
                                            </template>
                                            <ElementOption>
                                                Создать дубликат
                                            </ElementOption>
                                            <ElementOption>
                                                <NuxtLink
                                                    :to="`/admin/numbers/categories/create/${categoryInfo?.id}/?room_id=${room?.id}`"
                                                >Редактировать
                                                </NuxtLink>
                                            </ElementOption>
                                            <ElementOption
                                                :on-click="()=>{
                                                    popupDeleteOpened = true;
                                                    roomToEdit = room;
                                                }"
                                            >
                                                Удалить
                                            </ElementOption>
                                        </Dropdown>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <form class="admin-category-section__body__create-room" ref="formRef" v-if="displayState === 'columns'">
                        <ElementInput class="name"
                            id="admin-categories-create-room"
                            name="name"
                            fake-placeholder="Название нового номера"
                            helper="Введите ячейки и нажмите ↵ Enter"
                            :on-input="(event: Event)=>handleValidate()"
                        />
                        <ElementInput class="price"
                            id="admin-categories-price"
                            name="base_price"
                            fake-placeholder="Стоимость"
                            :mask="Number"
                            :on-input="(event: Event)=>handleValidate()"
                        />
                        <ElementInput class="equipment"
                            id="admin-categories-xddd"
                            fake-placeholder="0"
                            state="disabled"
                        />
                        <ElementInput class="reduction"
                            id="admin-categories-small_name"
                            name="small_name"
                            fake-placeholder="Сокращение"
                            :on-input="(event: Event)=>handleValidate()"
                        />
                        <ElementInput class="quantity"
                            id="admin-categories-quantity"
                            name="room_count"
                            fake-placeholder="Кол-во"
                            :mask="Number"
                            :on-input="(event: Event)=>handleValidate()"
                        />
                        <ElementInput class="photo"
                            id="admin-categories-xddd"
                            fake-placeholder="0"
                            state="disabled"
                        />
                        <ElementInput class="photo"
                            id="admin-categories-xddd"
                            fake-placeholder="0"
                            state="disabled"
                        />
                        <button name="button" class="hidden"></button>
                    </form>
                    <div class="admin-category-section__body__cards" v-else-if="displayState === 'cards'">
                        <TableCardSuit v-for="room in categoryRooms"
                            :id="`room-${room.id}`"
                            v-model:checked="room.is_active"
                            :on-change="async(checked: boolean)=>{
                                room.is_active = checked;
                                await sendData(room, `/hotel/room/${room.id}`, 'PATCH');
                            }"
                            :res="room"
                            draggable
                        >
                            <template #icon_button>
                                <Dropdown menu-side="left">
                                    <template #header>
                                        <ElementIconButton
                                            size="small"
                                            color="transparent-secondary"
                                            ghost
                                        ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#2D3033" fill-opacity="0.32"/>
                                        </svg>
                                        </ElementIconButton>
                                    </template>
                                    <ElementOption>
                                        Создать дубликат
                                    </ElementOption>
                                    <ElementOption>
                                        <NuxtLink
                                            :to="`/admin/numbers/categories/create/${categoryInfo.id}/?room_id=${room?.id}`"
                                        >Редактировать
                                        </NuxtLink>
                                    </ElementOption>
                                    <ElementOption
                                        :on-click="()=>{
                                            popupDeleteOpened = true;
                                            roomToEdit = room;
                                        }"
                                    >
                                        Удалить
                                    </ElementOption>
                                </Dropdown>
                            </template>
                        </TableCardSuit>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <PopupDelete class="admin-categories-delete-popup"
        v-model:visible="popupDeleteOpened"
        :description="roomToEdit?.name"
        :on-delete="async()=>{
            try {
                const res = await getData(`/hotel/room/${roomToEdit.id}`, 'DELETE');
                await getRooms();
            } catch (error) {
                dialogDeleteFailureOpened = true;
            }
            popupDeleteOpened = false;
        }"
        title="номер"
        text="При удалении карточки номера, информация полностью удалится из модуля бронирования. "
    ></PopupDelete>

    <Dialog
        draw-line
        v-model:visible="dialogCreatedShow"
        title="Создание завершено"
        :description="room?.name"
    />

    <Dialog
        v-model:visible="dialogDeleteFailureOpened"
        color="negative"
        title="Удаление невозможно"
        description="Произошла ошибка при удалении номера"
    />

</template>

<style lang="scss">
    .admin-category-section {
        &__header {
            grid-column: span 12;
        }
        &__body {
            grid-column: span 12;
            &__table {
                .table {
                    width: 100%;

                    &__name {
                        width: 25.25rem;
                    }
                    &__price {
                        width: 11.5rem;
                    }
                    &__equipment {
                        width: 8rem;
                    }
                    &__reduction {
                        width: 12.5rem;
                    }
                    &__same-width {
                        width: 7.35%;
                    }
                }
            }
            &__create-room {
                display: flex;
                padding: 1.5rem 4.25rem 0 12rem;
                .field {
                    width: 100%;
                    .input-label {
                        border-radius: 0;
                        border: 1px solid $border-primary-subdued-8;
                    }
                    &:first-of-type {
                        .input-label {
                            border-radius: .5rem 0 0 .5rem;
                        }
                    }
                    &:last-of-type {
                        .input-label {
                            border-radius: 0 .5rem .5rem 0;
                        }
                    }
                    &.name {
                        min-width: 25.75rem;
                    }
                    &.price {
                        min-width: 11.65rem;
                    }
                    &.equipment {
                        min-width: 8.125rem;
                    }
                    &.reduction {
                        min-width: 12.5rem;
                    }
                }
                .hidden {
                    position: absolute;
                    opacity: 0;
                }
            }
            &__cards {
                @include grid(4, 1rem);
            }
        }
    }
</style>