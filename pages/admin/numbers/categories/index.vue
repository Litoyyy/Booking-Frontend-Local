<script lang="ts" setup>
    import { z } from 'zod';
    import { useRooms } from '~/composables/rooms/useRooms';

    const { getCategories } = navSidebar();
    const { allRooms, getRooms } = useRooms();

    definePageMeta({
        isAdmin: true,
    });

    const route = useRoute();
    const popupDeleteOpened = ref(false);
    const popupCreateOpened = ref(false);
    const dialogDeleteFailureOpened = ref(false);
    const categoryToEdit = ref();

    const displayState = ref('columns');

    const categories = ref([]);

    const updateCategories = async() => {
        const getCategories = await getData('/hotel/room-category');
        categories.value = getCategories.results;
    };
    onMounted(()=>{
        updateCategories();
    });
    
    const {
        allChecked,
        checkAllFunc
    } = useTableCheckboxes(categories);
    
    const allToggled = ref(false);
    const toggleAllFunc=(checked: boolean)=> {
        const promises = categories.value.map(async(category: Object)=>{
            category.is_active = checked;
            await sendData(category, `/hotel/room-category/${category.id}`, 'PATCH');
        });
        Promise.all(promises).then(()=>{
            updateCategories();
        });
    };

    watch(
        ()=>categories.value,
        (newValue)=>{
            let totalToggled = true;
            const promises = categories.value.map(item=>{
                if(!item.is_active) totalToggled = false;
            });
            Promise.all(promises)
            .then(()=>{
                allToggled.value = totalToggled;
            });
        }, { immediate: true, deep: true }
    );

    const formRef = ref<HTMLFormElement | null>(null);
    const createSchema = z.object({
        name: z.string().min(1),
    });

    const dialogCreatedShow = ref(false);

    const handleValidate=()=> {
        if(formRef.value) {
            validate(formRef.value, createSchema,
                async(body: any)=>{
                    const roomsInput = formRef.value.elements.rooms as HTMLInputElement;
                    if(!!roomsInput.dataset.value) {
                        body.rooms = roomsInput.dataset.value?.split(', ');
                    } else {
                        body.rooms = [];
                    }
                    const res = await sendData(body, '/hotel/room-category');
                    updateCategories();
                    getCategories();
                    categoryToEdit.value = res;
                    dialogCreatedShow.value = true;
                },{ errorOff: true, clearAfterSubmit: true }
            );
        };
    };

    const handleRoomChange=async(checked: boolean, room: Object, category: Object)=> {
        let categoryArr = [...room.category];

        if (checked) {
            if (!categoryArr.includes(category.id)) categoryArr.push(category.id);
        } else {
            categoryArr = categoryArr.filter(id => id !== category.id);
        };

        const trySend=async()=>{
            try {
                await sendData({
                    category: categoryArr
                },`/hotel/room/${room.id}`, 'PATCH');
                await updateCategories();
                await getRooms();
            } catch(error) {
                console.error(`Ошибка при изменении номера: ${error}`);
            };
        };
        trySend();
    };

    onMounted(()=>{
        if(!!route.query.created_category) {
            dialogCreatedShow.value = true;
            categoryToEdit.value = { name: route.query.created_category };
        }
        if(formRef.value) {
            handleValidate();
        };
    });

    const rowRefs = ref<HTMLElement[]>([]);
    const zoneRef = ref<HTMLElement>();

    const cardsRefs = ref<HTMLElement[]>([]);
    const cardsZoneRef = ref<HTMLElement>();

</script>

<template>
    <section>
        <div class="admin-categories-section">
            <div class="admin-categories-section__container container_admin">
                <div class="admin-categories-section__header">
                    <div class="admin-section__title-block">
                        <div class="admin-section__title-block__title">
                            Категории номеров
                        </div>
                        <div class="admin-section__title-block__btns-block">
                            <div class="admin-section__title-block__btns-block__btns">
                                <ElementIconButton
                                    color="transparent"
                                    :state="displayState === 'columns' ? 'active' : ''"
                                    @click="()=>{displayState = 'columns'}"
                                    ghost
                                ><svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24.5 23.8333C24.5 24.4777 23.9777 25 23.3333 25L4.66667 25C4.02232 25 3.5 24.4777 3.5 23.8333L3.5 20.7184C3.5 20.0741 4.02232 19.5518 4.66667 19.5518H23.3333C23.9777 19.5518 24.5 20.0741 24.5 20.7184V23.8333Z" fill="#2D3033" fill-opacity="0.48"/>
                                    <path d="M24.5 8.27342C24.5 8.91777 23.9777 9.44009 23.3333 9.44009L4.66667 9.44008C4.02232 9.44008 3.5 8.91777 3.5 8.27342L3.5 5.16667C3.5 4.52232 4.02232 4 4.66667 4L23.3333 4C23.9777 4 24.5 4.52232 24.5 5.16667V8.27342Z" fill="#2D3033" fill-opacity="0.48"/>
                                    <path d="M24.5 16.0567C24.5 16.701 23.9777 17.2234 23.3333 17.2234L4.66667 17.2234C4.02232 17.2234 3.5 16.701 3.5 16.0567L3.5 12.9418C3.5 12.2975 4.02232 11.7751 4.66667 11.7751L23.3333 11.7751C23.9777 11.7751 24.5 12.2975 24.5 12.9418L24.5 16.0567Z" fill="#2D3033" fill-opacity="0.48"/>
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
                                @click="popupCreateOpened = true"
                            >Создать
                            </ElementButton>
                        </div>
                    </div>
                </div>
                
                <div class="admin-categories-section__body">
                    <div class="admin-categories-section__body__table" v-if="displayState === 'columns'">
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
                                    <th class="table__t2 table__t2_heading table__title">
                                        Название 
                                    </th>
                                    <th class="table__t2 table__t2_heading table__rooms">
                                        Номера
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
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <ElementToggle
                                            :checked="allToggled"
                                            :on-change="(checked: boolean)=>toggleAllFunc(checked)"
                                        />
                                    </td>
                                    <td>
                                        <ElementLink
                                            link="/admin/numbers/categories/0/"
                                        >Все
                                        </ElementLink>
                                    </td>
                                    <td class="table__t1 table__t1_tp">
                                        Все
                                    </td>
                                    <td></td>
                                </tr>
                                <tr v-for="(category, index) in categories" 
                                    class="table__row"
                                    :key="category.id" 
                                    ref="rowRefs"
                                    ref_for
                                >
                                    <td class="table__checkbox">
                                        <ElementCheckbox
                                            :id="`table-checkbox-${category.id}`"
                                            :checked="category.checked"
                                            :on-update="(checked: boolean)=>{category.checked = checked}"
                                        />
                                    </td>
                                    <td class="table__drag-icon">
                                        <TableDragElem
                                            :all-draggable="rowRefs"
                                            :drag-zone="zoneRef"
                                            :cur-index="index"
                                        />
                                    </td>
                                    <td class="table__toggle">
                                        <ElementToggle
                                            v-model:checked="category.is_active"
                                            :on-change="async(checked: boolean)=>{
                                                category.is_active = checked;
                                                await sendData(category, `/hotel/room-category/${category.id}`, 'PATCH');
                                            }"
                                            :id="`table-toggle-${category.id}`"
                                        />
                                    </td>
                                    <td class="table__title">
                                        <ElementLink
                                            :link="`/admin/numbers/categories/${category.id}/`"
                                        >{{ category.name }}
                                        </ElementLink>
                                    </td>
                                    <td class="table__t1 table__t1_tp table__rooms">
                                        <Dropdown>
                                            <template #header>
                                                <ElementLink
                                                    color="transparent"
                                                    chevron="right"
                                                >{{ category.count_rooms }}
                                                </ElementLink>
                                            </template>
                                            <ElementOption v-for="room in allRooms"
                                                :id="`room-option-${room.id}`"
                                                type="checkbox"
                                                :on-click="(checked: boolean)=>handleRoomChange(checked, room, category)"
                                                :checked="!!room.category.includes(category.id)"
                                            >{{ room.name }}
                                            </ElementOption>
                                        </Dropdown>
                                    </td>
                                    <td class="table__drag">
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
                                                <NuxtLink :to="`/admin/numbers/categories/${category.id}/`">
                                                    Редактировать
                                                </NuxtLink>
                                            </ElementOption>
                                            <ElementOption
                                                :on-click="()=>{
                                                    popupDeleteOpened = true;
                                                    categoryToEdit = category;
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
                    <form class="admin-categories-section__body__create-category" ref="formRef" v-if="displayState === 'columns'">
                        <ElementInput
                            id="admin-categories-create-category"
                            name="name"
                            placeholder="Название новой категории"
                            helper="Введите ячейки и нажмите ↵ Enter"
                            :on-input="(event: Event)=>handleValidate()"
                        />
                        <SelectDefault
                            id="admin-categories-select"
                            :options="allRooms"
                            name="rooms"
                            type="checkbox"
                            value-type="length"
                            placeholder="0"
                            :on-update="()=>handleValidate()"
                            readonly
                        />
                        <button name="button" class="hidden"></button>
                    </form>
                    <div class="admin-categories-section__body__cards" v-else-if="displayState === 'cards'" ref="cardsZoneRef">
                        <TableCardSuitGroup v-for="(category, index) in categories"
                            :res="category"
                            :key="category.id" 
                            ref="cardsRefs"
                            ref_for
                            v-model:checked="category.is_active"
                            :on-change="async(checked: boolean)=>{
                                category.is_active = checked;
                                await sendData(category, `/hotel/room-category/${category.id}`, 'PATCH');
                            }"
                            :draggable="true"
                            :all-draggable="cardsRefs"
                            :drag-zone="cardsZoneRef"
                            :cur-index="index"
                            :id="`category-${category.id}`"
                        ><template #icon_button>
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
                                    <NuxtLink :to="`/admin/numbers/categories/${category.id}/`">
                                        Редактировать
                                    </NuxtLink>
                                </ElementOption>
                                <ElementOption
                                    :on-click="()=>{
                                        popupDeleteOpened = true;
                                        categoryToEdit = category;
                                    }"
                                >
                                    Удалить
                                </ElementOption>
                            </Dropdown>
                        </template>
                        <template #rooms>
                            <Dropdown>
                                <template #header>
                                    <ElementLink
                                        color="transparent"
                                        chevron="right"
                                    >{{ category.count_rooms }}
                                    </ElementLink>
                                </template>
                                <ElementOption v-for="room in allRooms"
                                    :id="`room-option-${room.id}`"
                                    type="checkbox"
                                    :on-click="(checked: boolean)=>handleRoomChange(checked, room, category)"
                                    :checked="!!room.category.includes(category.id)"
                                >{{ room.name }}
                                </ElementOption>
                            </Dropdown>
                        </template>
                        </TableCardSuitGroup>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <PopupDelete class="admin-categories-delete-popup"
        v-model:visible="popupDeleteOpened"
        type="form"
        :description="categoryToEdit?.name"
        :on-delete="async()=>{
            try {
                const res = await getData(`/hotel/room-category/${categoryToEdit.id}`, 'DELETE');
                await updateCategories();
                await getCategories();
            } catch (error) {
                dialogDeleteFailureOpened = true;
            }
            popupDeleteOpened = false;
        }"
        title="категорию"
    ></PopupDelete>

    <PopupCreateCategory
        type="rooms"
        v-model:visible="popupCreateOpened"
        :on-submit="(res?: object)=>{
            updateCategories();
            popupCreateOpened = false;
            if(!!res && res.name) {
                categoryToEdit = res;
                dialogCreatedShow = true;
            }
        }"
    />

    <Dialog
        draw-line
        v-model:visible="dialogCreatedShow"
        title="Создание завершено"
        :description="categoryToEdit?.name"
    />

    <Dialog
        v-model:visible="dialogDeleteFailureOpened"
        color="negative"
        title="Удаление невозможно"
        description="В данной категории находятся номера, на которых в данный момент существует одна или более бронь"
    />

</template>

<style lang="scss">
    .admin-categories-section {
        &__header {
            grid-column: span 12;
        }
        &__body {
            grid-column: span 12;
            &__table {
                .table {
                    width: 100%;
                    &__rooms {
                        min-width: 16rem;
                    }
                    &__title {
                        width: 100%;
                    }
                    .option {
                        a {
                            color: $text-primary-transparent-48;
                        }
                    }
                }
            }
            &__create-category {
                display: flex;
                padding: 1.5rem 13.5rem 0 12rem;
                .field {
                    &:has(.field__helper) {
                        width: 100%;
                        .input-label {
                            border-radius: .5rem 0 0 .5rem;
                            border: 1px solid $border-primary-subdued-8;
                        }
                    }
                }
                .select {
                    width: 7.25rem;
                    .input-label {
                        border-radius: 0 .5rem .5rem 0;
                        border: 1px solid $border-primary-subdued-8;
                    }
                }
                .hidden {
                    position: absolute;
                    opacity: 0;
                }
            }
            &__cards {
                @include grid(4, 1rem);
                .option {
                    a {
                        color: $text-primary-transparent-48;
                    }
                }
            }
        }
    }
    .admin-categories-delete-popup {
        .popup__content {
            max-width: 40rem;
            width: 100%;
        }
    }
</style>