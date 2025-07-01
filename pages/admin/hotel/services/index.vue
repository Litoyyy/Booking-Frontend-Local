<script lang="ts" setup>
    import { z } from 'zod';

    definePageMeta({
        isAdmin: true,
    });

     const route = useRoute();

    const categoryToEdit = ref();
    const popupCreateOpened = ref(false);
    const popupDeleteOpened = ref(false);
    const dialogDeleteFailureOpened = ref(false);

    const displayState = ref('rows');

    const categories = ref([]);

    const {
        allChecked,
        checkAllFunc
    } = useTableCheckboxes(categories);

    const updateCategories = async() => {
        const getCategories = await getData('/hotel/service-category');
        categories.value = getCategories.results;
    };
    onMounted(()=>{
        updateCategories();
        if(!!route.query.created_category) {
            dialogCreatedShow.value = true;
            categoryToEdit.value = { name: route.query.created_category };
        }
    });

    const allToggled = ref(false);
    const toggleAllFunc=(checked: boolean)=> {
        const promises = categories.value.map(async(category: Object)=>{
            category.is_active = checked;
            await sendData(category, `/hotel/service-category/${category.id}`, 'PATCH');
        });
        Promise.all(promises).then(()=>{
            updateCategories();
        });
    };


    const formRef = ref<HTMLFormElement | null>(null);
    const createSchema = z.object({
        name: z.string().min(1),
        description: z.string(),
    });

    const dialogCreatedShow = ref(false);

    const handleValidate=()=>{
        if(formRef.value) {
            validate(formRef.value, createSchema,
                async(body: any)=>{
                    const servicesInput = formRef.value.elements.services as HTMLInputElement;
                    if(!!servicesInput.dataset.value) {
                        body.services = servicesInput.dataset.value?.split(', ');
                    } else {
                        body.services = [];
                    }
                    
                    console.log(body.services);
                    const res = await sendData(body, '/hotel/service-category');
                    updateCategories();
                    categoryToEdit.value = res;
                    dialogCreatedShow.value = true;
                },{ errorOff: true, clearAfterSubmit: true }
            );
        };
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
</script>

<template>
    <section>
        <div class="admin-services-categories-section">
            <div class="admin-services-categories-section__container container_admin">
                <div class="admin-services-categories-section__header">
                    <div class="admin-section__title-block">
                        <div class="admin-section__title-block__title">
                            Категории услуг
                            <ElementPopover>
                                Категории услуг
                            </ElementPopover>
                        </div>
                        <div class="admin-section__title-block__btns-block">
                            <div class="admin-section__title-block__btns-block__btns">
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
                            <div class="admin-section__title-block__btns-block__btns_text">
                                <ElementButton
                                    @click="popupCreateOpened = true"
                                >Создать
                                </ElementButton>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="admin-services-categories-section__body">
                    <div class="admin-services-categories-section__body__table" v-if="displayState === 'rows'">
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
                                    <th class="table__t2 table__t2_heading table__toggle">
                                        Вкл.
                                    </th>
                                    <th class="table__t2 table__t2_heading table__name">
                                        Название
                                    </th>
                                    <th class="table__t2 table__t2_heading table__quantity">
                                        Кол-во услуг
                                    </th>
                                    <th class="table__t2 table__t2_heading table__desc">
                                        Описание
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
                            <tbody class="table__body">
                                <tr>
                                    <td></td>
                                    <td>
                                        <ElementToggle
                                            :checked="allToggled"
                                            :on-change="(checked: boolean)=>toggleAllFunc(checked)"
                                        />
                                    </td>
                                    <td>
                                        <ElementLink
                                            link="/admin/hotel/services/0/"
                                        >Все
                                        </ElementLink>
                                    </td>
                                    <td class="table__t1 table__t1_tp">
                                        Все
                                    </td>
                                    <td class="table__t1 table__t1_tp">
                                        Все услуги гостиницы
                                    </td>
                                    <td></td>
                                </tr>
                                <tr v-for="category in categories">
                                    <td>
                                        <ElementCheckbox
                                            :id="`table-checkbox-${category.id}`"
                                            :checked="category.checked"
                                            :on-update="(checked: boolean)=>{category.checked = checked}"
                                        />
                                    </td>
                                    <td>
                                        <ElementToggle
                                            v-model:checked="category.is_active"
                                            :on-change="async(checked: boolean)=>{
                                                category.is_active = checked;
                                                await sendData(category, `/hotel/service-category/${category.id}`, 'PATCH');
                                            }"
                                            :id="`table-toggle-${category.id}`"
                                        />
                                    </td>
                                    <td>
                                        <ElementLink
                                            :link="`/admin/hotel/services/${category.id}/`"
                                        >{{ category.name }}
                                        </ElementLink>
                                    </td>
                                    <td class="table__t1 table__t1_tp">

                                    </td>
                                    <td class="table__t1 table__t1_tp">
                                        {{ category.description ?? '-' }}     
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
                                                <NuxtLink :to="`/admin/hotel/services/${category.id}/`">
                                                    Редактировать
                                                </NuxtLink>
                                            </ElementOption>
                                            <ElementOption
                                                :on-click="()=>{
                                                    popupDeleteOpened = true;
                                                    categoryToEdit = category;
                                                }"
                                            >Удалить
                                            </ElementOption>
                                        </Dropdown>
                                    </td>
                                </tr>

                         
                            </tbody>
                        </table>
                    </div>
                    <form class="admin-services-categories-section__body__create-category" ref="formRef" v-if="displayState === 'rows'">
                        <ElementInput
                            id="admin-services-categories-create-category-name"
                            name="name"
                            placeholder="Название"
                            helper="Введите ячейки и нажмите ↵ Enter"
                            :on-input="(event: Event)=>handleValidate()"
                        />
                        <SelectDefault
                            id="admin-services-categories-select"
                            :options="allServices"
                            name="services"
                            type="checkbox"
                            value-type="length"
                            placeholder="0"
                            :on-update="()=>handleValidate()"
                            readonly
                        />
                        <ElementInput class="desc-input"
                            id="admin-services-categories-create-category-desc"
                            name="description"
                            placeholder="Описание"
                            :on-input="(event: Event)=>handleValidate()"
                        />
                        <button name="button" class="hidden"></button>
                    </form>
                    <div class="admin-services-categories-section__body__cards" v-else-if="displayState === 'cards'">
                        <TableCardService v-for="category in categories"
                            :res="category"
                            v-model:checked="category.is_active"
                            :on-change="async(checked: boolean)=>{
                                category.is_active = checked;
                                await sendData(category, `/hotel/service-category/${category.id}`, 'PATCH');
                            }"
                            :id="`service-category-${category.id}`"
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
                                    <NuxtLink :to="`/admin/hotel/services/${category.id}/`">
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
                        </TableCardService>
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
                const res = await getData(`/hotel/service-category/${categoryToEdit.id}`, 'DELETE');
                await updateCategories();
            } catch (error) {
                dialogDeleteFailureOpened = true;
            }
            popupDeleteOpened = false;
        }"
        title="категорию"
    ></PopupDelete>

    <PopupCreateCategory 
        type="services"
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
        description="В данной категории находятся услуги, на которых в данный момент существует одна или более бронь"
    />
</template>

<style lang="scss">
    .admin-services-categories-section {
        &__header {
            grid-column: span 12;
        }
        &__body {
            grid-column: span 12;
            @include df_fdc;
            gap: 1.5rem;
            &__table {
                .table {
                    width: 100%;
                    &__quantity {
                        width: 15rem;
                    }
                    &__desc {
                        width: 28rem;
                    }
                }
            }
            &__create-category {
                display: flex;
                padding: 1.5rem 4rem 0 8.5rem;
                .field {
                    &:has(.field__helper) {
                        width: 100%;
                        .input-label {
                            border-radius: .5rem 0 0 .5rem;
                        }
                    }
                    &.desc-input {
                        min-width: 28rem;
                        .input-label {
                            border-radius: 0 .5rem .5rem 0;
                        }
                    }
                }
                .select {
                    min-width: 15rem;
                    .input-label {
                        border-radius: 0;
                        border-left: 1px solid $border-primary-subdued-8;
                        border-right: 1px solid $border-primary-subdued-8;
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