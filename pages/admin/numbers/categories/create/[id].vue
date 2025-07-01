<script lang="ts" setup>
    import { z } from 'zod';

    definePageMeta({
        isAdmin: true,
    });
    const route = useRoute();

    const categories = ref([]);
    const activeCategory = ref();
    const activeRoom = ref();

    const updateCategories = async() => {
        const getCategories = await getData('/hotel/room-category');
        categories.value = getCategories.results;
        activeCategory.value = categories.value.find(category=>category.id === Number(route.params.id));
    };
    const updateRoomInfo = async() => {
        if(!route.query.room_id) return;
        const getRoom = await getData(`/hotel/room/${route.query.room_id}`);
        activeRoom.value = getRoom;
        console.log(activeRoom.value);
    }
    onMounted(()=>{
        updateCategories();
        updateRoomInfo();
    });

    const selectedImages = ref([
        {
            value: ''
        }
    ]);

    const handleValidate=()=>{

    };


    const createdCategory=ref();
    const additionalsSchema = z.object({
        name: z.string().min(1)
    });
    const createAdditionalsFormRef = ref<HTMLFormElement | null>(null);
    const handleAdditionalsValidate=()=>{
        if(createAdditionalsFormRef.value) {
            validate(createAdditionalsFormRef.value, additionalsSchema,
                async(body: Object)=>{
                    body.additions = [];
                    try {
                        const categoryRes = await sendData(body, '/hotel/additional-category');
                        createdCategory.value = categoryRes;
                    } catch(error) {

                    };
                    console.log(body);
                }, {errorOff: true, clearAfterSubmit: true}
            );
        };
    };

    const place_count = ref([
        {
            name: '1',
            id: 1,
            text: 'Одноместное',
            showText: true
        },
        {
            name: '2',
            id: 2,
            text: 'Двухместное',
            showText: true
        },
        {
            name: '3',
            id: 3,
            text: 'Трёхместное',
            showText: false
        },
        {
            name: '4',
            id: 4,
            text: 'Четырёхместное',
            showText: false
        },
        {
            name: '5',
            id: 5,
            text: 'Пятиместное',
            showText: false
        },
        {
            name: '6',
            id: 6,
            text: 'Шестиместное',
            showText: false
        },
        {
            name: '7',
            id: 7,
            text: 'Семиместное',
            showText: false
        },
    ]);
    const additional_places = ref([
        {
            name: '1',
            id: 1
        },
        {
            name: '2',
            id: 2
        },
        {
            name: '3',
            id: 3
        }
    ]);
    const kids_places = ref([
        {
            name: '1',
            id: 1
        },
        {
            name: '2',
            id: 2
        },
    ]);

    const showAdditionalPlacesCheckboxes = ref(false);
    const showKidsPlacesCheckboxes = ref(false);

</script>

<template>
    <section>
        <div class="admin-create-category-section">
            <div class="admin-create-category-section__container container">
                <form class="admin-create-category-section__item" id="create-form" ref="formRef">
                    <div class="admin-create-category-section__item__title">
                        Общая информация
                    </div>
                    <div class="admin-create-category-section__item__info">
                        <ElementInput 
                            id="create-category-input-name"
                            fake-placeholder="Полное название"
                            :new-value="activeRoom?.name"
                            name="name"
                            :on-input="handleValidate"
                        />
                        <ElementInput 
                            id="create-category-input-small-name"
                            fake-placeholder="Сокращенное название"
                            :new-value="activeRoom?.small_name"
                            name="small_name"
                            :on-input="handleValidate"
                        />
                        <SelectDefault
                            id="create-category-select-category"
                            fake-placeholder="Категория номера"
                            emptyOption="Категория номера"
                            type="checkbox"
                            :options="categories"
                            :selected-options="activeCategory"
                        >
                        </SelectDefault>
                        <ElementInput 
                            id="create-category-input-price"
                            fake-placeholder="Стоимость"
                            :new-value="activeRoom?.base_price"
                            name="base_price"
                            :on-input="handleValidate"
                            input-label-text="₽"
                        />
                        <ElementInput class="gcs2"
                            type="textarea" 
                            name="description"
                            :maxLength="300"
                            :on-input="handleValidate"
                            fake-placeholder="Описание"
                        />
                    </div>
                </form>
                <div class="admin-create-category-section__item">
                    <div class="admin-create-category-section__item__title">
                        Вместимость
                    </div>
                    <div class="admin-create-category-section__item__info">
                        <ElementInput
                            id="create-category-input-room_area"
                            placeholder="Площадь"
                            name="room_area"
                            :new-value="activeRoom?.room_area"
                            :mask="Number"
                            :on-input="handleValidate"
                            input-label-text="м²"
                        />
                        <ElementInput
                            id="create-category-input-rooms-length"
                            placeholder="Кол-во комнат"
                            name="room_count"
                            :mask="Number"
                            :on-input="handleValidate"
                        />
                    </div>
                </div>
                <div class="admin-create-category-section__item">
                    <div class="admin-create-category-section__item__title">
                        Основные места
                    </div>
                    <div class="admin-create-category-section__item__info">
                        <SelectDefault class="gcs2"
                            id="create-category-select-main-places-length"
                            fake-placeholder="Кол-во мест"
                            emptyOption="Кол-во мест"
                            name="place_count"
                            :options="place_count"
                            :onUpdate="(newValue)=>{
                                if(!newValue) return;
                                place_count.map(item=>{
                                    if(item.id <= Number(newValue)) {
                                        item.showText = true;
                                    } else {
                                        item.showText = false;
                                    };
                                });
                            }"
                        >
                        </SelectDefault>
                    </div>
                    <div class="admin-create-category-section__item__info">
                        <div class="admin-create-category-section__item__list">
                            <span class="title">Размещение</span>
                            <template v-for="item in place_count">
                                <ElementCheckbox v-if="item.showText"
                                    :id="`create-category-select-main-places-placement-${item.id}`"
                                >{{ item.text }}
                                </ElementCheckbox>
                            </template>
                        </div>
                        <div class="admin-create-category-section__item__list">
                            <span class="title">С детьми (бесплатно)</span>
                            <ElementCheckbox
                                id="create-category-select-main-places-kids-1"
                            >От 0 до 7
                            </ElementCheckbox>
                            <ElementCheckbox
                                id="create-category-select-main-places-kids-2"
                            >От 7 до 14
                            </ElementCheckbox>
                        </div>
                    </div>
                </div>
                <div class="admin-create-category-section__item">
                    <div class="admin-create-category-section__item__title">
                        Дополнительные места
                    </div>
                    <div class="admin-create-category-section__item__info">
                        <SelectDefault class="gcs2"
                            id="create-category-select-additional-places-length"
                            fake-placeholder="Кол-во мест"
                            emptyOption="Кол-во мест"
                            name="additional_places"
                            optionId="additional-places-"
                            :options="additional_places"
                            :onUpdate="(newValue)=>{
                                if(!!newValue) {
                                    showAdditionalPlacesCheckboxes = true;
                                } else {
                                    showAdditionalPlacesCheckboxes = false;
                                };
                            }"
                        >
                        </SelectDefault>
                    </div>
                    <div class="admin-create-category-section__item__list" v-if="showAdditionalPlacesCheckboxes">
                        <span class="title">Размещение</span>
                        <ElementCheckbox
                            id="create-category-select-additional-places-placement-1"
                        >Взрослый
                        </ElementCheckbox>
                        <ElementCheckbox
                            id="create-category-select-additional-places-placement-2"
                        >Ребенок от 0 до 7 лет
                        </ElementCheckbox>
                        <ElementCheckbox
                            id="create-category-select-additional-places-placement-3"
                        >Ребенок от 7 до 14 лет
                        </ElementCheckbox>
                    </div>
                </div>
                <div class="admin-create-category-section__item">
                    <div class="admin-create-category-section__item__title">
                        Размещение детей без места
                    </div>
                    <div class="admin-create-category-section__item__info">
                        <SelectDefault class="gcs2"
                            id="create-category-select-kids-no-places-length"
                            fake-placeholder="Кол-во мест"
                            optionId="kids-places-"
                            emptyOption="Кол-во мест"
                            name="kids_places"
                            :onUpdate="(newValue)=>{
                                if(!!newValue) {
                                    showKidsPlacesCheckboxes = true;
                                } else {
                                    showKidsPlacesCheckboxes = false;
                                }
                            }"
                            :options="kids_places"
                        >
                        </SelectDefault>
                    </div>
                    <div class="admin-create-category-section__item__list" v-if="showKidsPlacesCheckboxes">
                        <span class="title">С детьми (бесплатно)</span>
                        <ElementCheckbox
                            id="create-category-select-kids-no-places-placement-1"
                        >От 0 до 7
                        </ElementCheckbox>
                        <ElementCheckbox
                            id="create-category-select-kids-no-places-placement-2"
                        >От 7 до 14
                        </ElementCheckbox>
                    </div>
                </div>
                <div class="admin-create-category-section__item">
                    <div class="admin-create-category-section__item__table">
                        <table class="table">
                            <thead class="table__head">
                                <tr>
                                    <th class="table__t2 table__t2_heading table__first">
                                        Тип оснащения
                                    </th>
                                    <th class="table__t2 table__t2_heading">
                                        Что входит
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="table__body">
                                <tr>
                                    <td class="table__t1 table__t1_tp">
                                        Мебель
                                    </td>
                                    <td>
                                        <SelectTagMultiSelect
                                            type="cell"
                                            placeholder="Мебель"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="admin-create-category-section__item__create-input">
                        <form class="admin-create-category-section__item__create-input__table" ref="createAdditionalsFormRef">
                            <div class="left-cell">
                                <ElementInput
                                    id="admin-create-category-create-equipment-input"
                                    :on-input="handleAdditionalsValidate"
                                    name="name"
                                    placeholder="Название нового типа"
                                />
                            </div>
                            <SelectTagMultiSelect
                                id="admin-create-category-create-equipment-select"
                                type="cell"
                                name="additions"
                                :tags-category-id="createdCategory?.id"
                                placeholder="0"
                            />
                            <button name="button" class="hidden"></button>
                        </form>
                        <span class="helper">Введите ячейки и нажмите ↵ Enter</span>
                    </div>
                    <div class="admin-create-category-section__item__grid">
                        <SelectTagMultiSelect
                            placeholder="Приоритетные элементы оснащения (до 5 шт.)"
                        />
                    </div>
                </div>
                <div class="admin-create-category-section__item">
                    <div class="admin-create-category-section__item__text-block">
                        <span class="title">
                            Фотогалерея
                        </span>
                        <span class="text">
                            Максимальный размер изображения - 10МБ. <br>
                            Максимальное количество - 30 штук
                        </span>
                    </div>
                    <ElementImageSelector v-for="(image, index) in selectedImages"
                        :id="`admin-create-category-section-${index}`"
                    />
                </div>
                <div class="admin-create-category-section__item">
                    <ElementCheckbox
                        id="admin-create-category-offline-checkbox"
                    >Доступен только оффлайн
                    </ElementCheckbox>
                    <ElementButton
                        size="large"
                        name="button"
                    >Создать номер
                    </ElementButton>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    .admin-create-category-section {
        &__container {
            padding: 1.5rem 0;
            padding-bottom: 4rem;
            row-gap: 3rem;
        }
        &__item {
            grid-column: 2 / span 6;
            @include df_fdc;
            gap: 1.5rem;
            &:has(.admin-create-category-section__item__table) {
                grid-column: 2 / span 10;
            }
            &__title {
                @include heading_3;
            }
            &__info {
                @include grid(2, 1rem);
                .gcs2 {
                    grid-column: span 2;
                }
            }
            &__list {
                @include df_fdc;
                gap: .75rem;
                .title {
                    padding-bottom: .25rem;
                    @include text_1;
                }
            }
            &__table {
                .table {
                    width: 100%;
                    &__first {
                        width: 20rem;
                    }
                    td {
                        &:has(.select) {
                            padding: 0;
                            .select {
                                @include wh_100;
                            }
                        }
                    }
                }
            }
            &__create-input {
                @include df_fdc;
                gap: .5rem;
                &__table {
                    display: flex;
                    .select {
                        height: fit-content;
                        width: 100%;
                    }
                    .left-cell {
                        .field {
                            min-width: 20rem;
                            max-width: 20rem;
                            height: 100%;
                        }
                        .input-label {
                            height: 100%;
                            border-radius: .5rem 0 0 .5rem !important;
                            border: 1px solid $border-primary-transparent-8;
                        }
                    }
                    .select {
                        .input-label {
                            &:has(.input-label__icon) {
                                border-radius: 0 .5rem .5rem 0 !important;
                                border: 1px solid $border-primary-transparent-8;
                            }
                        }
                    }
                }
                .helper {
                    @include text_2;
                    color: $text-primary-transparent-48;
                }
            }
            &__grid {
                @include grid(10, 1rem);
                .select {
                    grid-column: span 6;
                }
            }
            &__text-block {
                @include df_fdc;
                gap: .25rem;
                .title {
                    @include heading_3;
                }
                .text {
                    @include text_1;
                    color: $text-primary-transparent-48;
                }
            }
        }
    }
</style>