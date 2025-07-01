<script lang="ts" setup>
    import { YandexMap, YandexMapDefaultSchemeLayer } from 'vue-yandex-maps';
    import { z } from 'zod';
    import { childRange } from '~/composables/admin/hotel-settings/childRange';
    import { dopPhone } from '~/composables/admin/hotel-settings/dopPhone';
    import { email } from '~/composables/admin/hotel-settings/email';

    definePageMeta({
        isAdmin: true,
    });

    interface SelectorItem {
        id?: number
    }

    interface Weekday {
        id: number,
        weekDay: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun',
        ruWeekDay: 'Пн' | 'Вт' | 'Ср' | 'Чт' | 'Пт' | 'Сб' | 'Вс'
        active: boolean
    }

    const weekDaysData = ref<Array<Weekday>>([
        { id: 0, weekDay: "mon", ruWeekDay: "Пн", active: false },
        { id: 1, weekDay: "tue", ruWeekDay: "Вт", active: false  },
        { id: 2, weekDay: "wed", ruWeekDay: "Ср", active: false  },
        { id: 3, weekDay: "thu", ruWeekDay: "Чт", active: false  },
        { id: 4, weekDay: "fri", ruWeekDay: "Пт", active: false  },
        { id: 5, weekDay: "sat", ruWeekDay: "Сб", active: false  },
        { id: 6, weekDay: "sun", ruWeekDay: "Вс", active: false  },
    ])

    const weekActiveData = ref<Array<boolean>>([])

    const toggleWeekCheckbox = (id: number) => {
        weekDaysData.value = weekDaysData.value.map((item: Weekday) => {
            if (item.id === id) {
                return { ...item, active: !item.active };
            }
            return item;
        })

        weekActiveData.value = weekDaysData.value.map(item => item.active);
    }

    const mainRef = ref<HTMLFormElement | null>(null)

    const schema = z.object({
        hotel_name_ru: z.string().min(1),
        hotel_name_eu: z.string().min(1),
        hotel_type: z.string().min(1),
        
        storage_time: z.string().min(1),
        minimal_count_check_in: z.string().min(1),
        minimal_time_check_in: z.string().min(1),
        minimal_count_exit: z.string().min(1),
        minimal_time_exit: z.string().min(1),
        сheck_in_time: z.string().min(1),
        departure_time: z.string().min(1),
        weekdays_checkbox: z.array(z.boolean()).refine(data => data.includes(true)),
        with_pets: z.string().min(3),
        address_index: z.string().min(3),
        address_region: z.string().min(3),
        address_district: z.string().min(3),
        address_city: z.string().min(3),
        address_street: z.string().min(3),
        address_home: z.string().min(3),
        address_literal: z.string().min(3),
        address_structure: z.string().min(3),
        address_frame:  z.string().min(3),
        address_latitude: z.string().min(3),
        address_longitude: z.string().min(3),
        how_to_there: z.string().min(3).nullable(),
        range_from: z.string().min(3),
        range_to: z.string().min(3),
        
        phone_main: z.string().min(1),
        
        phone_dop: z.array(z.string()),

        phone_main_comm: z.string().min(1),
        
        email_contacts: z.string().email(),
        main_email: z.string().email(),
        
        check_in_dispatch_time: z.string().min(1),
        
        admin_upcoming_race_from_time: z.string().min(1),
        admin_upcoming_race_from_days: z.string().min(1),
        admin_upcoming_race_to_time: z.string().min(1),
        admin_upcoming_race_to_days: z.string().min(1),

        check_in_reserv_time: z.string().min(1),
        
        admin_upcoming_reserv_from_time: z.string().min(1),
        admin_upcoming_reserv_from_days: z.string().min(1),
        admin_upcoming_reserv_to_time: z.string().min(1),
        admin_upcoming_reserv_to_days: z.string().min(1),
    })

    const visibleMap = ref<boolean>(false)
    const toggleVisibleMap = () => {
        visibleMap.value = !visibleMap.value
    }

    const sendData = () => {
        console.log('send data')
    }

    let fileCounter = 1

    const selectFile = ref<Array<SelectorItem>>([
        { id: 1 }
    ])

    const addSelectFile = (id: number) => {
        const index = selectFile.value.findIndex((file) => file.id === id)
        if (index !== -1) {
            fileCounter++
            selectFile.value.splice(index + 1, 0, { id: fileCounter });
        }
    }

    const removeSelectFile = (id: number) => {
        if (selectFile.value.length > 1) {
            selectFile.value = selectFile.value.filter((file) => file.id !== id)
        }
    }

    const validateForm = () => {
        if (mainRef.value) {
            console.log(mainRef.value);
            validate(mainRef.value, schema, () => {
                console.log('valid')
            })
        }
    }

    const { childRangeData, removeChildRange, addChildRange } = childRange()

    const { defaultEmail, emailsData, updateEmail, addEmail, removeEmail } = email()

    const { dopNumbers, addDopNumbers, removeDopNumbers } = dopPhone()
</script>

<template>
    <section>
        <div class="hotel-settings-section">
            <div class="hotel-settings-section__container container_admin">
                <div class="admin-section__title-block">
                    <div class="admin-section__title-block__title">
                        Настройки гостиницы
                    </div>
                </div>
                <form class="hotel-settings-section__form" ref="mainRef" @submit.prevent="validateForm">
                    <div class="hotel-settings-section__info-block">
                        <div class="hotel-settings-section__info-block__title">Название</div>
                        <div class="hotel-settings-section__inputs">
                            <ElementInput
                                id="hotel-name-ru"
                                name="hotel_name_ru"
                                size='large'
                                popover="Название на русском"
                                fake-placeholder="Название на русском" />
                            <ElementInput
                                id="hotel-name-eu"
                                name="hotel_name_eu"
                                size='large'
                                popover="Название на английском"
                                fake-placeholder="Название на английском" />
                            <SelectDefault class="gcs2"
                                id="hotel-type"
                                name="hotel_type"
                                fake-placeholder="Тип"
                                state='select-opened'
                                aria-readonly="true"
                                :options="[{text: 'Гостинница'}, {text: 'Гостинница2'}, {text: 'Гостинница3'}]" />
                        </div>
                    </div>
                    <div class="hotel-settings-section__info-block">
                        <div class="hotel-settings-section__info-block__title">
                            <span>Логотип</span>
                            <ElementPopover>Логотип вашего объекта отобразится в подтверждении бронирования гостя и в письма раздела «Маркетинг»</ElementPopover>
                        </div>
                        <div class="hotel-settings-section__file-picker">
                            <div class="hotel-settings-section__file-picker__item">
                                <span class="hotel-settings-section__file-picker__item__title">Основной</span>
                                <ElementImageSelector
                                    id="main-image-select"
                                    name="main_image_select" />
                            </div>
                            <div class="hotel-settings-section__file-picker__item">
                                <span class="hotel-settings-section__file-picker__item__title">Малый<ElementPopover>малый малый</ElementPopover></span>
                                <ElementImageSelector
                                    id="small-image-select"
                                    name="small_image_select" />
                            </div>
                            <div class="hotel-settings-section__file-picker__item">
                                <span class="hotel-settings-section__file-picker__item__title">Текстовый<ElementPopover>малый малый</ElementPopover></span>
                                <ElementImageSelector
                                    id="text-image-select"
                                    name="text_image_select" />
                            </div>
                        </div>
                        <span class="hotel-settings-section__desc">Малый и текстовый логотипы являются не обязательными</span>
                    </div>
                    <div class="hotel-settings-section__info-block">
                        <span class="hotel-settings-section__info-block__title">
                            Хранение персональных данных
                            <ElementPopover>Попавер хранение данных</ElementPopover>
                        </span>
                        <SelectDefault
                            id="storage-time"
                            name="storage_time"
                            size='large'
                            fake-placeholder="Срок"
                            state='select-opened' />
                    </div>
                    <div class="hotel-settings-section__info-block">
                        <div class="hotel-settings-section__info-block__title">Разрешенный период бронирования</div>
                        <div class="hotel-settings-section__inputs">
                            <div class="hotel-settings-section__minimal-time-item">
                                <span class="hotel-settings-section__minimal-time-item__title">Минимальное время до заезда</span>
                                <ElementInput
                                    id="minimal-count-check-in"
                                    name="minimal_count_check_in"
                                    placeholder="0"
                                    fake-placeholder="Кол-во" />
                                <SelectDefault
                                    id="minimal-time-check-in"
                                    name="minimal_time_check_in"
                                    placeholder="Дней"
                                    fake-placeholder="Времени" />
                            </div>

                            <div class="hotel-settings-section__minimal-time-item">
                                <span class="hotel-settings-section__minimal-time-item__title">Минимальное время до выезда</span>
                                <ElementInput
                                    id="minimal-count-exit"
                                    name="minimal_count_exit"
                                    placeholder="0"
                                    fake-placeholder="Кол-во" />
                                <SelectDefault
                                    id="minimal-time-exit"
                                    name="minimal_time_exit"
                                    placeholder="Дней"
                                    fake-placeholder="Времени" />
                            </div>
                        </div>
                    </div>
                    <div class="hotel-settings-section__info-block pb">
                        <div class="hotel-settings-section__info-block__title">Расчетный час</div>
                        <div class="hotel-settings-section__inputs">
                            <LazyTimePicker class="w-100"
                                id="сheck-in-time"
                                name="сheck_in_time"
                                fake-placeholder="Время заезда" />
                            <LazyTimePicker class="w-100"
                                id="departure-time"
                                name="departure_time"
                                fake-placeholder="Время выезда" />
                        </div>
                    </div>
                    <div class="hotel-settings-section__info-block">
                        <div class="hotel-settings-section__info-block__title">
                            Выходные дни
                            <ElementPopover>Выходные дни</ElementPopover>
                        </div>
                        <div class="hotel-settings-section__checkboxes">
                            <ElementCheckbox v-for="(item, index) in weekDaysData" 
                                :id="`checkbox-weekend-${item.weekDay}`"
                                :name="`checkbox_weekend_${item.weekDay}`"
                                :checked="item.active"
                                @change="toggleWeekCheckbox(item.id)"
                            >{{ item.ruWeekDay }}
                            </ElementCheckbox>
                        </div>
                    </div>
                    <div class="hotel-settings-section__info-block">
                        <div class="hotel-settings-section__info-block__title">
                            Детские возрастные диапазоны
                            <ElementPopover>Детские возрастные диапозоны</ElementPopover>
                        </div>
                        <div class="hotel-settings-section__inputs">
                            <div v-for="(item, index) in childRangeData" :key="index" class="hotel-settings-section__item-range">
                                <span class="hotel-settings-section__item-range__title">Диапазон {{ index + 1 }}</span>
                                <div class="hotel-settings-section__item-range__inputs">
                                    <ElementCounter
                                        :id="`range-${index}-from`"
                                        name="range_from"
                                        fake-placeholder="Лет, от"
                                        :updated-value="item.ageFrom" />
                                    <ElementCounter
                                        :id="`range-${index}-to`"
                                        name="range_to"
                                        fake-placeholder="Лет, до"
                                        :updated-value="item.ageTo" />
                                    <ElementIconButton
                                        @click="removeChildRange(index)"
                                        size='large'
                                        color='transparent'
                                        ghost
                                        :display-div="true" >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                            <path d="M9.33329 7.99996V3.99996C9.33329 3.26359 9.93025 2.66663 10.6666 2.66663H21.3333C22.0697 2.66663 22.6666 3.26359 22.6666 3.99996V7.99996H29.3333V10.6666H26.6666V28C26.6666 28.7364 26.0697 29.3333 25.3333 29.3333H6.66663C5.93025 29.3333 5.33329 28.7364 5.33329 28V10.6666H2.66663V7.99996H9.33329ZM12 5.33329V7.99996H20V5.33329H12Z" fill="#2D3033"/>
                                        </svg>
                                    </ElementIconButton>
                                </div>
                            </div>

                            <ElementIconButton
                                @click="addChildRange"
                                size='large'
                                color='transparent' >
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                    <path d="M12.834 12.834V5.83398H15.1673V12.834H22.1673V15.1673H15.1673V22.1673H12.834V15.1673H5.83398V12.834H12.834Z" fill="#1C5BAD"/>
                                </svg>
                            </ElementIconButton>
                        </div>
                    </div>
                    <div class="hotel-settings-section__info-block">
                        <div class="hotel-settings-section__info-block__title">
                            Размещение с питомцами
                            <ElementPopover>Размещение с питомцами</ElementPopover>
                        </div>
                        <div class="hotel-settings-section__inputs">
                            <SelectDefault class="gcs2"
                                id="with-pets"
                                name="with_pets"
                                fake-placeholder="С какими животными можно проживать в гостинице" />
                        </div>
                    </div>
                    <div class="hotel-settings-section__info-block">
                        <div class="hotel-settings-section__info-block__title">
                            Адрес
                        </div>
                        <div class="hotel-settings-section__address-form">
                            <div class="hotel-settings-section__address-form__index-region">
                                <ElementInput
                                    id="address-index"
                                    name="address_index"
                                    fake-placeholder="Индекс" />
                                <SelectDefault
                                    class="span4"
                                    id="address-region"
                                    name="address_region"
                                    fake-placeholder="Регион" />
                            </div>
                            <div class="hotel-settings-section__address-form__district-city">
                                <ElementInput
                                    class="hotel-settings-section__address-form__district-city__item"
                                    id="address-district"
                                    name="address_district"
                                    size='large'
                                    fake-placeholder="Район" />
                                <SelectDefault
                                    class="hotel-settings-section__address-form__district-city__item"
                                    id="address-city"
                                    name="address_city"
                                    size='large'
                                    fake-placeholder="Город" />
                            </div>
                            <ElementInput
                                id='address-street'
                                name='address_street'
                                fake-placeholder="Улица" />
                            <div class="hotel-settings-section__address-form__house-building">
                                <ElementInput 
                                    id='address-home'
                                    name='address_home'
                                    fake-placeholder="Дом" />
                                <ElementInput 
                                    id='address-literal'
                                    name='address_literal'
                                    fake-placeholder="Литерал" />
                                <ElementInput 
                                    id='address-structure'
                                    name='address_structure'
                                    fake-placeholder="Строение" />
                                <ElementInput 
                                    id='address-frame'
                                    name='address_frame'
                                    fake-placeholder="Корпус" />
                            </div>
                            <div class="hotel-settings-section__address-form__coordinates">
                                <ElementInput
                                    class="hotel-settings-section__address-form__coordinates__item"
                                    id='address-latitude'
                                    name='address_latitude'
                                    fake-placeholder="Широта"
                                    size='large' />
                                <ElementInput
                                    class="hotel-settings-section__address-form__coordinates__item"
                                    id='address-longitude'
                                    name='address_longitude'
                                    fake-placeholder="Широта"
                                    size='large' />
                                <ElementIconButton
                                    color='transparent-secondary'
                                    @click="toggleVisibleMap" 
                                    display-div>
                                    <svg v-show="!visibleMap" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                        <path d="M2.33398 5.83398L10.5007 2.33398L17.5007 5.83398L24.8541 2.68247C25.1504 2.55556 25.4932 2.69272 25.6202 2.98885C25.6512 3.06146 25.6673 3.13964 25.6673 3.21863V22.1673L17.5007 25.6673L10.5007 22.1673L3.1471 25.3188C2.85098 25.4458 2.50806 25.3086 2.38115 25.0125C2.35003 24.9399 2.33398 24.8616 2.33398 24.7826V5.83398ZM17.5007 23.0585V8.37258L17.425 8.40496L10.5007 4.94273V19.6288L10.5762 19.5963L17.5007 23.0585Z" fill="#2D3033" fill-opacity="0.48"/>
                                    </svg>
                                    <svg v-show="visibleMap" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                        <path d="M13.9988 12.3509L19.7736 6.57617L21.4235 8.22608L15.6487 14.0008L21.4235 19.7755L19.7736 21.4254L13.9988 15.6507L8.22414 21.4254L6.57422 19.7755L12.3489 14.0008L6.57422 8.22608L8.22414 6.57617L13.9988 12.3509Z" fill="#2D3033"/>
                                    </svg>
                                </ElementIconButton>
                            </div>
                            <div v-if="visibleMap" class="hotel-settings-section__address-form__map" style="height: 31.25rem;">
                                <yandex-map
                                    :settings="{
                                        location: {
                                            center: [49.522262, 53.474643],
                                            zoom: 20,
                                        },
                                    }"
                                >
                                    <yandex-map-default-scheme-layer />
                                </yandex-map>
                            </div>
                            <ElementInput 
                                id="how-to-there"
                                name="how_to_there"
                                type='textarea'
                                :maxLength='300'
                                fake-placeholder="Как до вас добраться"/>
                        </div>
                    </div>
                    <div class="hotel-settings-section__info-block">
                        <div class="hotel-settings-section__info-block__title">
                            <span>Телефония</span>
                            <ElementPopover>Логотип вашего объекта отобразится в подтверждении бронирования гостя и в письма раздела «Маркетинг»</ElementPopover>
                        </div>
                        <div class="hotel-settings-section__inputs">
                            <div class="hotel-settings-section__item-range">
                                <span class="hotel-settings-section__item-range__title">Основной номер</span>
                                <div class="hotel-settings-section__item-range__inputs">
                                    <ElementInput 
                                        id="phone-main"
                                        name="phone_main"
                                        mask="+{7} (000) 000-00-00"
                                        fake-placeholder="Номер телефона" />
                                    <ElementInput
                                        id="phone-main-comm"
                                        name="phone_main_comm"
                                        fake-placeholder="Комментарий" />
                                    <ElementIconButton
                                        size='basic'
                                        color='transparent-secondary' >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                            <path d="M8.16732 7.00065V3.50065C8.16732 2.85632 8.68966 2.33398 9.33398 2.33398H18.6673C19.3117 2.33398 19.834 2.85632 19.834 3.50065V7.00065H25.6673V9.33398H23.334V24.5007C23.334 25.145 22.8117 25.6673 22.1673 25.6673H5.83398C5.18966 25.6673 4.66732 25.145 4.66732 24.5007V9.33398H2.33398V7.00065H8.16732ZM10.5007 4.66732V7.00065H17.5007V4.66732H10.5007Z" fill="#2D3033" fill-opacity="0.48"/>
                                        </svg>
                                    </ElementIconButton>
                                </div>
                            </div>

                            <div v-for="item in dopNumbers" class="hotel-settings-section__item-range">
                                <span class="hotel-settings-section__item-range__title">Дополнительный номер {{ item.id }}</span>
                                <div class="hotel-settings-section__item-range__inputs">
                                    <ElementInput 
                                        :id="`phone-main-${ item.id }`"
                                        :name="`phone_main`"
                                        fake-placeholder="Номер телефона"  />
                                    <ElementInput
                                        :id="`phone-main-comm-${ item.id }`"
                                        :name="`phone_main_comm`"
                                        fake-placeholder="Комментарий" />
                                    <ElementIconButton
                                        @click="removeDopNumbers(item.id)"
                                        size='basic'
                                        color='transparent-secondary' >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                            <path d="M8.16732 7.00065V3.50065C8.16732 2.85632 8.68966 2.33398 9.33398 2.33398H18.6673C19.3117 2.33398 19.834 2.85632 19.834 3.50065V7.00065H25.6673V9.33398H23.334V24.5007C23.334 25.145 22.8117 25.6673 22.1673 25.6673H5.83398C5.18966 25.6673 4.66732 25.145 4.66732 24.5007V9.33398H2.33398V7.00065H8.16732ZM10.5007 4.66732V7.00065H17.5007V4.66732H10.5007Z" fill="#2D3033" fill-opacity="0.48"/>
                                        </svg>
                                    </ElementIconButton>
                                </div>
                            </div>

                            <ElementIconButton
                                @click="addDopNumbers"
                                class="telephone-options-section__phones__add-item"
                                size='basic'
                                color='transparent'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                    <path d="M12.834 12.834V5.83398H15.1673V12.834H22.1673V15.1673H15.1673V22.1673H12.834V15.1673H5.83398V12.834H12.834Z" fill="#1C5BAD"/>
                                </svg>
                            </ElementIconButton>
                        </div>
                    </div>
                    <div class="hotel-settings-section__info-block">
                        <div class="hotel-settings-section__info-block__title">Электронная почта</div>
                        <div class="hotel-settings-section__inputs">
                            <ElementInput
                                class="gcs2"
                                id="email-contacts"
                                name="email_contacts"
                                fake-placeholder="Контактная" />

                            <div class="hotel-settings-section__inputs__item">
                                <ElementInput
                                    id="main-email"
                                    name="main_email"
                                    :new-value="defaultEmail.email"
                                    @input="updateEmail(1, $event.target.value)"
                                    fake-placeholder="Для уведомлений о бронировании" />
                                <ElementIconButton
                                    @click="removeEmail"
                                    color='transparent-secondary'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                        <path d="M8.16732 7.00065V3.50065C8.16732 2.85632 8.68966 2.33398 9.33398 2.33398H18.6673C19.3117 2.33398 19.834 2.85632 19.834 3.50065V7.00065H25.6673V9.33398H23.334V24.5007C23.334 25.145 22.8117 25.6673 22.1673 25.6673H5.83398C5.18966 25.6673 4.66732 25.145 4.66732 24.5007V9.33398H2.33398V7.00065H8.16732ZM10.5007 4.66732V7.00065H17.5007V4.66732H10.5007Z" fill="#2D3033" fill-opacity="0.48"/>
                                    </svg>
                                </ElementIconButton>    
                            </div>

                            <div v-for="(item, index) in emailsData" :key="item.id" class="hotel-settings-section__inputs__item">
                                <ElementInput
                                    :id='`main-email${item.id}`'
                                    :name='`main_email`'
                                    :new-value="item.email"
                                    :fake-placeholder="`Для уведомлений о бронировании ${item.id}`"
                                    @input="updateEmail(item.id, $event.target.value)" />
                                <ElementIconButton
                                    @click="removeEmail(item.id)"
                                    color='transparent-secondary'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                        <path d="M8.16732 7.00065V3.50065C8.16732 2.85632 8.68966 2.33398 9.33398 2.33398H18.6673C19.3117 2.33398 19.834 2.85632 19.834 3.50065V7.00065H25.6673V9.33398H23.334V24.5007C23.334 25.145 22.8117 25.6673 22.1673 25.6673H5.83398C5.18966 25.6673 4.66732 25.145 4.66732 24.5007V9.33398H2.33398V7.00065H8.16732ZM10.5007 4.66732V7.00065H17.5007V4.66732H10.5007Z" fill="#2D3033" fill-opacity="0.48"/>
                                    </svg>
                                </ElementIconButton>    
                            </div>

                            <ElementIconButton
                                @click="addEmail"
                                size='basic'
                                color='transparent'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                    <path d="M12.834 12.834V5.83398H15.1673V12.834H22.1673V15.1673H15.1673V22.1673H12.834V15.1673H5.83398V12.834H12.834Z" fill="#1C5BAD"/>
                                </svg>
                            </ElementIconButton>
                        </div>
                    </div>
                    <div class="hotel-settings-section__info-block">
                        <div class="hotel-settings-section__info-block__title">
                            Реестр
                            <ElementPopover>Реестр</ElementPopover>
                        </div>
                        <div class="hotel-settings-section__registry">
                            <div class="hotel-settings-section__registry__item">
                                <span class="hotel-settings-section__registry__item__title">Ближайшие заезды, ежедневно</span>
                                <TimePicker 
                                    class="hotel-settings-section__registry__item__big-input"
                                    id="check-in-dispatch-time"
                                    name="check_in_dispatch_time"
                                    fake-placeholder="Время отправки" />
                                <span class="hotel-settings-section__registry__item__desc">Брони с датой создания</span>    
                                <div class="hotel-settings-section__registry__item__container-inputs">
                                    <TimePicker
                                        class="hotel-settings-section__registry__item__container-inputs__input"
                                        id="admin-upcoming-race-from"
                                        name="admin_upcoming_race_from_time"
                                        fake-placeholder="Начиная с" />
                                    <SelectDefault
                                        class="hotel-settings-section__registry__item__container-inputs__input"
                                        id="admin-upcoming-race-from-days"
                                        name="admin_upcoming_race_from_days"
                                        fake-placeholder="Дня" />
                                    <TimePicker
                                        class="hotel-settings-section__registry__item__container-inputs__input"
                                        id="admin-upcoming-race-to-time"
                                        name="admin_upcoming_race_to_time"
                                        fake-placeholder="Заканчивая" />
                                    <SelectDefault
                                        class="hotel-settings-section__registry__item__container-inputs__input"
                                        id="admin-upcoming-race-to-days"
                                        name="admin_upcoming_race_to_days"
                                        fake-placeholder="Дня" />
                                </div>
                                <label for="check-in-notifi" class="hotel-settings-section__registry__item__checkbox">
                                    <ElementCheckbox 
                                        id="check-in-notifi" />
                                        Уведомлять об отстутствии
                                </label>
                            </div>
                            <div class="hotel-settings-section__registry__item">
                                <span class="hotel-settings-section__registry__item__title">Ближайшие брони, ежедневно</span>
                                <TimePicker 
                                    class="hotel-settings-section__registry__item__big-input"
                                    id="check-in-reserv-time"
                                    name="check_in_reserv_time"
                                    fake-placeholder="Время отправки" />
                                <span class="hotel-settings-section__registry__item__desc">Брони с датой создания</span>    
                                <div class="hotel-settings-section__registry__item__container-inputs">
                                    <TimePicker
                                        class="hotel-settings-section__registry__item__container-inputs__input"
                                        id="admin-upcoming-reserv-from-time"
                                        name="admin_upcoming_reserv_from_time"
                                        fake-placeholder="Начиная с" />
                                    <SelectDefault
                                        class="hotel-settings-section__registry__item__container-inputs__input"
                                        id="admin-upcoming-reserv-from-days"
                                        name="admin_upcoming_reserv_from_days"
                                        fake-placeholder="Дня" />
                                    <TimePicker
                                        class="hotel-settings-section__registry__item__container-inputs__input"
                                        id="admin-upcoming-reserv-to-time"
                                        name="admin_upcoming_reserv_to_time"
                                        fake-placeholder="Заканчивая" />
                                    <SelectDefault
                                        class="hotel-settings-section__registry__item__container-inputs__input"
                                        id="admin-upcoming-reserv-to-days"
                                        name="admin_upcoming_reserv_to_days"
                                        fake-placeholder="Дня" />
                                </div>
                                <label for="check-in-notifi-bron" class="hotel-settings-section__registry__item__checkbox">
                                    <ElementCheckbox 
                                        id="check-in-notifi-bron" />
                                        Уведомлять об отстутствии
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="hotel-settings-section__info-block">
                        <div class="hotel-settings-section__info-block__title">
                            Доп.файл к подтверждению бронирования гостя
                            <ElementPopover>Доп подтверждение</ElementPopover>
                        </div>
                        <div class="hotel-settings-section__file-selector">
                            <ElementFileSelector 
                                v-for="file in selectFile"
                                :key="file.id"
                                :id="String(file.id)"
                                :addFunc="addSelectFile"
                                :remove-func="removeSelectFile" />
                        </div>
                    </div>
                    <div class="hotel-settings-section__info-block">
                        <ElementButton
                            type="submit"
                            size="large"
                            name="button"
                        >Сохранить
                        </ElementButton>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    .hotel-settings-section {
        .admin-section__title-block {
            grid-column: 2 / span 10;
        }
        &__form {
            grid-column: 2 / span 10;
            @include df_fdc;
            gap: 4rem;
        }
        &__info-block {
            @include df_fdc;
            gap: 1.5rem;
            &.pb {
                padding-bottom: 4.5rem;
            }
            &__title {
                @include heading_3;
                @include df_ac;
                gap: 0.25rem;
            }
            &:last-of-type {
                padding-bottom: 4rem;
            }
        }
        &__inputs {
            @include grid(2, 1rem);
            &__item {
                @include df_ac;
                gap: 1rem;
                .field {
                    width: 100%;
                }
            }
            .gcs2 {
                grid-column: span 2;
            }
        }
        &__file-picker {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            &__item {
                @include df_fdc;
                gap: 0.75rem;
                &__title {
                    @include text_1;
                    display: flex;
                    align-items: center;
                }
            }
        }
        &__minimal-time-item {
            @include grid(2, 1rem);
            &__title {
                @include text_1;
                color: $text-primary;
                grid-column: span 2;
            }
        }
        .w-100 {
            max-width: none;
            width: 100%;
        }
        &__desc {
            @include text_2;
            color: $text-primary-transparent-48;
        }
        &__checkboxes {
            @include df_ac;
            gap: 0.5rem;
            &__text {
                @include text_1;
                color: $text-primary;
            }
        }
        &__item-range {
            @include df_fdc;
            gap: 1rem;
            &__title {
                @include text_1;
                color: $text-primary;
            }
            &__inputs {
                @include df_ac;
                gap: 1rem;
            }
        }
        &__address-form {
            @include df_fdc;
            gap: 1rem;
            &__index-region {
                @include grid(5, 1rem);
                .span4 {
                    grid-column: span 4;
                }
            }
            &__district-city {
                display: flex;
                gap: 1rem;
                &__item {
                    width: 100%;
                }
            }
            &__house-building {
                @include grid(4, 1rem);
            }
            &__coordinates {
                @include df_ac;
                gap: 0.75rem;
                &__item {
                    width: 100%;
                }
            }
        }
        &__registry {
            @include grid(2, 2rem);
            &__item {
                @include df_fdc;
                gap: 2rem;
                width: 100%;
                height: 100%;
                padding: 1.5rem;
                background-color: $bg-primary;
                border-radius: 0.5rem;
                &__title {
                    @include df_ac;
                    gap: 0.25rem;
                    @include heading_3;
                    color: $text-primary;
                }
                &__big-input {
                    max-width: none;
                    width: 100%;
                }
                &__desc {
                    @include text_1;
                    color: $text-primary;
                }
                &__container-inputs {
                    @include grid(2, 0.75rem);
                    &__input {
                        max-width: none;
                        width: 100%;
                    }
                }
                &__checkbox {
                    @include df_ac;
                    gap: 0.5rem;
                    padding-top: 0.75rem;
                    @include text_1;
                    color: $text-primary;
                }
            }
        }
        &__file-selector {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap
        }
    }
</style>