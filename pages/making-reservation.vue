<script lang="ts" setup>
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/swiper-bundle.css';

    import { z } from 'zod';

    import { reservationSteps } from '~/composables/making-reservation/reservationSteps';
    import { reservationDates } from '~/composables/making-reservation/reservationDates';
    import { reservationRooms } from '~/composables/making-reservation/reservationRooms';
    
    definePageMeta({
        layout: false
    })

    const { currentStep, prevStep, nextStep, setStep } = reservationSteps();

    const { reservationDatesValues, setReservationDates, dateFilters } = reservationDates();

    const { roomsInfo, addNewRoom, changeRoomInfo, getTags, addRoomBtnDisabled, formattedTotalRooms, checkForDelete } = reservationRooms();

    const { currentlyMobile } = mobileState();

    const bottomSheetBookingOverviewActive = ref(false);

    const allCatalogCards = ref([
        {
            id: 3,
            base_price: 100,
            discount: 0,
            price: 100,
            info: '',
            title: 'Стандарт с широкой кроватью',
            description: 'Описание номера...',
            other_info: '',
        },
        {
            id: 1,
            base_price: 120,
            discount: 20,
            price: 100,
            info: '',
            title: 'Стандарт с широкой кроватью',
            description: 'Описание номера1...',
            other_info: '',
        },
    ]);

    const selectedCatalogCard = ref({});

    const getCatalogCards=()=>{
        const res = getData(`/api/rooms/${dateFilters}`);
        res.results.map((card: any)=>{
            allCatalogCards.value.push(card);
        });
    };

    const allTariffCards = ref([
        {
            id: 1,
            title: 'SMART',
            base_price: 14400,
            discount: 20,
            price: 10500,
        },
        {
            id: 2,
            title: 'SMART2',
            base_price: 100000,
            discount: 0,
            price: 100000,
        },
        {
            id: 3,
            title: 'SMART3',
            base_price: 100,
            discount: 0,
            price: 100,
        },
    ]);

    const selectedTariffCard = ref({});

    const getTariffCards=()=>{
        const res = getData(`/api/tariffs/${dateFilters}&number_id=${selectedCatalogCard.id}`);
        res.results.map((tariff: any)=>{
            allTariffCards.value.push(tariff);
        });
    }

    const allServiceCards = ref([
        {
            id: 1,
            price: 1250,
            info: '2 ночи, 1 гость',
            title: 'Завтрак «Шведский стол»',
            type: 'Питание'
        },
        {
            id: 2,
            price: 1500,
            info: '2 ночи, 1 гость',
            title: 'Ужин «Шведский стол»',
            type: 'Питание'
        },
        {
            id: 3,
            price: 1200,
            info: '2 ночи, 1 гость',
            title: 'Полупансион',
            type: 'Питание'
        },
    ]);

    const allCheckedServices = ref([]);

    watch(
        ()=>allServiceCards,
        ()=>{
            allCheckedServices.value = allServiceCards.value.filter(service => service.state === 'active');
        },
        { deep: true }
    );

    const getServiceCards=()=>{
        const res = getData(`/api/services/${dateFilters}`);
        res.results.map((service: any)=>{
            allServiceCards.value.push(service);
        });
    };

    const swiperTariffsOptions = {
        slidesPerView: 1.17,
        spaceBetween: 8,
        breakpoints: {
            769: {
                slidesPerView: 3,
                spaceBetween: 16,
            },
        },
    };

    const reservationStartFormRef = ref<HTMLFormElement | null>(null);
    const reservationStartSchema = z.object({
        start_date: z.string().min(1),
        end_date: z.string().min(1),
        reservation_select: z.string().min(1).refine(value => value !== "0"),
    });
    const validateReservationStart=()=>{
        setTimeout(() => {
            if(!!reservationStartFormRef.value) {
                validate(reservationStartFormRef.value, reservationStartSchema,
                    (body: any)=>{
                        nextStep();
                        // getCatalogCards();
                    }
                );
            };
        }, 50);
    };

    const chooseMainGuest = ref([
        {
            text: 'Для себя',
            id: 'for_me',
            checked: true,
        },
        {
            text: 'Для другого',
            id: 'for_other',
            checked: false   
        }
    ]);
    const agreementWRules = ref(false);
    const getAgreementWRules=(event: MouseEvent)=>{
        const target = event.target as HTMLInputElement;
        agreementWRules.value = target.checked;
    };
    const selectedPaymentMethod = ref('without_prepayment');
    const reservationConfirmFormRef = ref<HTMLFormElement | null>(null);
    const reservationConfirmSchema = z.object({
        last_name: z.string().min(1),
        first_name: z.string().min(1),
        phone: z.string().min(16),
        email: z.string()
            .email({message: "Invalid email address"}),
        citizenship: z.string().min(1),
        comment: z.string()
    });
    const validateReservationConfirm=()=>{
        setTimeout(() => {
            if(!!reservationConfirmFormRef.value) {
                validate(reservationConfirmFormRef.value, reservationConfirmSchema,
                    (body: any)=>{
                        const info = {...body, services: []};
                        allCheckedServices.value.map(service=>{
                            info.services.push({
                                id: service.id
                            });
                        });
                        info.tariff = selectedTariffCard.value.id;
                        info.room = selectedCatalogCard.value.id;
                        console.log(info);
                        if(selectedPaymentMethod.value) {
                            console.log(selectedPaymentMethod.value);
                        }
                    }
                );
            };
        }, 50);
    };
    watch(currentStep, (newValue) => {
        if (newValue === 5) {
            validateReservationConfirm();
        };
    });

    const paymentMethods = ref([
        {
            text: 'Без предоплаты',
            state: 'active',
        },
        {
            text: 'С предоплатой',
            state: '',
        },
    ]);

    const selectActiveMethod=(index: number)=>{
        paymentMethods.value.map(val=>val.state = '');
        paymentMethods.value[index].state = 'active';
        validateReservationConfirm();
    };

    const formattedDatesRange=()=>{
        let totalDates = '';

        const [firstDate_day, firstDate_month, firstDate_year] = reservationDatesValues.value.start_date.split('.').map(Number);
        const [endDate_day, endDate_month, endDate_year] = reservationDatesValues.value.end_date.split('.').map(Number);

        const formattedFirstDate = formatDate(reservationDatesValues.value.start_date);
        const formattedEndDate = formatDate(reservationDatesValues.value.end_date);

        totalDates = firstDate_month === endDate_month ? `${firstDate_day}-${formattedEndDate}`: `${formattedFirstDate}-${formattedEndDate}`;
        return totalDates;
    };

    onMounted(()=>{
        validateReservationStart();
    });
</script>

<template>
    <main class="wh_100">
        <section v-if="currentStep === 1">
            <div class="reservation-start-section">
                <form class="reservation-start-section__container" ref="reservationStartFormRef" :data-disabled="addRoomBtnDisabled">
                    <div class="reservation-start-section__header">
                        <div class="reservation-start-section__header__title">Выберите даты заезда, выезда и кол-во гостей</div>
                        <LanguageSelector/>
                    </div>
                    <div class="reservation-start-section__form">
                        <div class="reservation-start-section__form__inputs">
                            <DatePicker id="reservation-datepicker" rangeSelect
                                first-placeholder="Заезд"
                                last-placeholder="Выезд"
                                @update="(start_date, end_date)=>{setReservationDates(start_date, end_date), validateReservationStart()}"
                            />
                            <div class="reservation-start-section__form__inputs__block" v-for="(input, index) in roomsInfo">
                                <div class="reservation-start-section__form__inputs__block__title" v-if="roomsInfo.length > 1">
                                    Номер {{ index + 1 }}
                                </div>
                                <div class="reservation-start-section__form__inputs__block__input">
                                    <SelectSmartSelectGuest 
                                        type="smartselect-guests"
                                        fake-placeholder="Кол-во гостей"
                                        :name="index === 0 ? 'reservation_select': `reservation_select_${index}`"
                                        :id="'first-number' + index"
                                        :readonly="true"
                                        :min-value="index === 0 ? 1 : 0"
                                        :on-choose="()=>{
                                            validateReservationStart()
                                            checkForDelete(index)
                                        }"
                                        :tags="getTags"
                                        :get-updated-values="(newInfo)=>{changeRoomInfo(index, newInfo)}"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="reservation-start-section__form__button">
                            <ElementLink
                                size="basic"
                                color="accent"
                                :disabled="addRoomBtnDisabled"
                                @click="addNewRoom(), validateReservationStart()"
                            >Добавить номер
                            </ElementLink>
                        </div>
                    </div>
                    <div class="reservation-start-section__button">
                        <ElementButton
                            size="large"
                            color="accent"
                            name="button"
                        >Найти
                        </ElementButton>
                    </div>
                </form>
            </div>
        </section>
        <section v-else-if="currentStep > 1 && currentStep < 6">
            <div class="reservation-default-layout reservation_container">
                <div class="reservation__header">
                    <div class="reservation__header__inputs">
                        <DatePicker id="reservation-datepicker-select-number" rangeSelect
                            first-placeholder="Заезд"
                            last-placeholder="Выезд"
                            :first-date="reservationDatesValues.start_date"
                            :last-date="reservationDatesValues.end_date"
                            @update="(start_date, end_date)=>{setReservationDates(start_date, end_date)}"
                            v-if="currentStep <= 3"
                        />
                        <ElementInput v-else
                            state="disabled"
                            icon='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 11H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V11ZM17 3H21C21.5523 3 22 3.44772 22 4V9H2V4C2 3.44772 2.44772 3 3 3H7V1H9V3H15V1H17V3Z" fill="#2D3033" fill-opacity="0.32"/>
                            </svg>'
                            :new-value="formatDate(reservationDatesValues.start_date, true) + ' — ' + formatDate(reservationDatesValues.end_date, true)"
                        />
                        <SelectSmartSelectWidget
                            :info="roomsInfo"
                            id="reservation-smartselect-guest"
                            fake-placeholder="Кол-во гостей"
                            :tags="getTags"
                            :disabled="currentStep >= 4"
                        />
                    </div>
                    <Transition name="button-appear">
                        <div class="reservation__header__btn-block" v-if="Object.keys(selectedTariffCard).length != 0 && currentlyMobile && currentStep === 3">
                            <ElementButton
                                size="large"
                                color="accent"
                                @click="nextStep()"
                            >Продолжить
                            </ElementButton>
                        </div>
                    </Transition>
                    <LanguageSelector v-if="!currentlyMobile"/>
                </div>
                <div class="reservation__body reservation__body_number" v-if="currentStep === 2">
                    <div class="reservation__title-block">
                        <div class="reservation__title-block__title">
                            Выберите номер
                        </div>
                        <LanguageSelector v-if="currentlyMobile"/>
                    </div>
                    <div class="reservation__body_number__banner">
                        <img src="/images/reservation-banner_mobile.png" alt="reservation banner" v-if="currentlyMobile">
                        <img src="/images/reservation-banner.png" alt="reservation banner" v-else>
                    </div>
                    <div class="reservation__body_number__filters">
                        <div class="reservation__body_number__filters__desktop">
                            <!-- <Dropdown v-for="filtersList in allNumbersFilters">
                                <template #header>
                                    <ElementLink
                                        chevron="right"
                                    >{{ filtersList.title }}
                                    </ElementLink>
                                </template>
                                <div class="dropdown__option" v-for="(filter, index) in filtersList.values">
                                    <ElementOption
                                        type="ghost"
                                        :state="filter.state"
                                        @click="selectNumbersFilter(filtersList, filter)"
                                    >{{ filter.text }}
                                    </ElementOption><hr>
                                </div>
                            </Dropdown> -->
                        </div>
                        <ElementLink
                            color="transparent"
                        >Сбросить
                        </ElementLink>
                    </div>
                    <div class="reservation__body_number__list">
                        <CatalogCard v-for="number in allCatalogCards"
                            view="vertical"
                            :res="number"
                            :on-add="()=>{
                                selectedCatalogCard = number;
                                nextStep();
                            }"
                        >
                        </CatalogCard>
                    </div>
                </div>
                <div class="reservation__body reservation__body_tariff" v-else-if="currentStep === 3">
                    <div class="reservation__title-block">
                        <div class="reservation__title-block__texts">
                            <ElementLink
                                size="small"
                                color="transparent"
                                @click="prevStep()"
                            >К номерам
                            </ElementLink>
                            <div class="reservation__title-block__title">
                                Выберите тариф
                            </div>
                        </div>
                        <Transition name="button-appear">
                            <ElementButton v-if="Object.keys(selectedTariffCard).length != 0 && !currentlyMobile"
                                size="large"
                                color="accent"
                                @click="nextStep()"
                            >Продолжить
                            </ElementButton>
                        </Transition>
                        <LanguageSelector v-if="currentlyMobile"/>
                    </div>
                    <div class="reservation__body_tariff__selected-card">
                        <CatalogCard
                            view="horizontal_order"
                            :res="selectedCatalogCard"
                        >
                        </CatalogCard>
                    </div>
                    <div class="reservation__body_tariff__tariffs-block">
                        <div class="reservation__body_tariff__tariffs-block__title">
                            Тариф
                        </div>
                        <div class="reservation__body_tariff__tariffs-block__list">
                            <Swiper v-bind="swiperTariffsOptions">
                                <SwiperSlide v-for="tariff in allTariffCards">
                                    <TariffCard
                                        :res="tariff"
                                        :id="`reservation-${tariff.id}`"
                                        name="reservation_tariffs"
                                        :is-active="tariff == selectedTariffCard ? true : false"
                                        :on-click="()=>{
                                            selectedTariffCard = tariff;
                                        }"
                                    />
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
                <div class="reservation__body reservation__body_services" v-else-if="currentStep === 4">
                    <div class="reservation__body_services__items-block">
                        <div class="reservation__title-block">
                            <div class="reservation__title-block__texts">
                                <ElementLink
                                    size="small"
                                    color="transparent"
                                    @click="prevStep()"
                                >К тарифам
                                </ElementLink>
                                <div class="reservation__title-block__title">
                                    Закажите услуги
                                </div>
                            </div>
                            <LanguageSelector v-if="currentlyMobile"/>
                        </div>
                        <div class="reservation__body_services__items-block__filters">
                            <ElementLink
                                color="transparent"
                            >Все
                            </ElementLink>
                            <!-- <ElementLink v-for="filter in orderFilters"
                                color="transparent"
                                @click="setActiveOrderFilter(filter)"
                                :state="filter.state"
                            >{{ filter.text }}
                            </ElementLink> -->
                        </div>
                        <div class="reservation__body_services__items-block__list custom-scrollbar">
                            <ServiceCard v-for="service in allServiceCards"
                                :id="`reservation-${service.id}`"
                                :res="service"
                                :on-click="(checked)=>{
                                    if(checked) {
                                        service.state = 'active';
                                    } else {
                                        service.state = '';
                                    }
                                }"
                            >
                            </ServiceCard>
                        </div>
                    </div>
                    <div class="reservation__menu">
                        <div class="reservation__menu__info-list" v-if="!currentlyMobile">
                            <div class="reservation__menu__info-list__item title">
                                Обзор брони
                            </div>
                            <div class="reservation__menu__info-list__item">
                                <span class="sub-title">Номер</span>
                                {{ selectedCatalogCard.title }}
                            </div>
                            <div class="reservation__menu__info-list__item">
                                <span class="sub-title">Период</span>
                                {{ formattedDatesRange() }}
                            </div>
                            <div class="reservation__menu__info-list__item">
                                <span class="sub-title">Гости</span>
                                {{ formattedTotalRooms() }}
                            </div>
                            <div class="reservation__menu__info-list__item">
                                <span class="sub-title">Тариф</span>
                                {{ selectedTariffCard.title || 'Не выбрано' }}
                            </div>
                            <div class="reservation__menu__info-list__item">
                                <span class="sub-title">Доп. услуги</span>
                                <span v-for="service in allCheckedServices" v-if="allCheckedServices.length > 0">
                                    {{ service.title }}
                                </span>
                                <span v-else>
                                    Не выбрано
                                </span>
                            </div>
                        </div>
                        <ElementButton v-else
                            size="large"
                            color="subaccent"
                            ghost
                            @click="()=>{bottomSheetBookingOverviewActive = true}"
                        >Просмотреть данные о брони
                        </ElementButton>
                        <div class="reservation__menu__order-block">
                            <div class="reservation__menu__price-block">
                                15000 ₽
                                <div class="discount">
                                    -35%
                                    <span>18 400</span>
                                </div>
                            </div>
                            <ElementButton
                                size="large"
                                color="accent"
                                @click="nextStep()"
                            >Продолжить
                            </ElementButton>
                        </div>
                    </div>
                </div>
                <div class="reservation__body reservation__body_form" v-else-if="currentStep === 5">
                    <form class="reservation__body_form__info-block custom-scrollbar" ref="reservationConfirmFormRef" :data-disabled="!agreementWRules">
                        <div class="reservation__title-block">
                            <div class="reservation__title-block__texts">
                                <ElementLink
                                    size="small"
                                    color="transparent"
                                    @click="prevStep()"
                                >К услугам
                                </ElementLink>
                                <div class="reservation__title-block__title">
                                    Ввод данных
                                </div>
                            </div>
                            <LanguageSelector v-if="currentlyMobile"/>
                        </div>
                        <div class="reservation__body_form__main-info">
                            <div class="reservation__body_form__main-info__choose-guest">
                                <div class="reservation__body_form__main-info__choose-guest__radio">
                                    <ElementRadio v-for="(guest, index) in chooseMainGuest"
                                        :id="'reservarion-select-guest-' + guest.id"
                                        name="reservarion_select_guest"
                                        :checked="guest.checked"
                                        :on-update="()=>{
                                            chooseMainGuest.map(guest=>guest.checked = false);
                                            guest.checked = true;
                                        }"
                                    >{{ guest.text }}
                                    </ElementRadio>
                                </div>
                                <span>Укажите данные основного гостя. Остальных гостей — при заселении</span>
                            </div>
                            <div class="reservation__body_form__main-info__inputs-block">
                                <div class="reservation__body_form__main-info__inputs-block__inputs">
                                    <ElementInput
                                        id="reservation-form-input-last-name"
                                        fake-placeholder="Фамилия*"
                                        name="last_name"
                                        :on-input="()=>{validateReservationConfirm()}"
                                    />
                                    <ElementInput
                                        id="reservation-form-input-first-name"
                                        fake-placeholder="Имя*"
                                        name="first_name"
                                        :on-input="()=>{validateReservationConfirm()}"
                                    />
                                    <ElementInput
                                        id="reservation-form-input-phone"
                                        fake-placeholder="Телефон для связи*"
                                        name="phone"
                                        :on-input="()=>{validateReservationConfirm()}"
                                    />
                                    <ElementInput
                                        id="reservation-form-input-email"
                                        fake-placeholder="E-mail*"
                                        name="email"
                                        :on-input="()=>{validateReservationConfirm()}"
                                    />
                                    <SelectDefault
                                        id="reservation-form-citizenship-select"
                                        name="citizenship"
                                        fake-placeholder="Гражданство*"
                                        :on-choose="()=>{validateReservationConfirm()}"
                                        :options="[
                                            {
                                                text: 'Российское'
                                            },
                                            {
                                                text: 'Беларусское'
                                            },
                                            {
                                                text: 'Азербайджанское'
                                            },
                                        ]"
                                    />
                                </div>
                                <div class="reservation__body_form__main-info__inputs-block__checkboxes">
                                    <ElementCheckbox
                                        id="reservation-checkbox-confirm-phone"
                                        name="confirm_phone"
                                    >Пришлите мне подтверждение на телефон
                                    </ElementCheckbox>
                                    <ElementCheckbox
                                        id="reservation-checkbox-get-mailing-list"
                                        name="get_mailing_list"
                                    >Соглашаюсь на получение рассылки
                                    </ElementCheckbox>
                                </div>
                            </div>
                        </div>
                        <div class="reservation__body_form__add-info">
                            <div class="reservation__body_form__add-info__title">
                                Дополнительно
                            </div>
                            <ElementInput
                                type="textarea"
                                id="reservation-form-comment"
                                name="comment"
                                fake-placeholder="Комментарий, при желании"
                                :max-length="300"
                            />
                        </div>
                        <div class="reservation__body_form__payment-method">
                            <div class="reservation__body_form__payment-method__title-block">
                                <div class="reservation__body_form__payment-method__title-block__title">
                                    Выберите способ оплаты
                                </div>
                                <div class="reservation__body_form__payment-method__title-block__popover-text">
                                    Сейчас вы не платите за бронирование!
                                    <ElementPopover
                                        position="left"
                                        title="Правила отмены"
                                    >Бесплатная отмена в любое время без необходимости внесения данных кредитной карты в качестве гарантии. Бронирование является негарантированным.
                                    </ElementPopover>
                                </div>
                            </div>
                            <div class="reservation__body_form__payment-method__btns-block">
                                <ElementLink v-for="(method, index) in paymentMethods"
                                    color="transparent"
                                    :state="method.state"
                                    @click="selectActiveMethod(index)"
                                >{{ method.text }}
                                </ElementLink>
                            </div>
                            <div class="reservation__body_form__payment-method__card" v-if="paymentMethods.indexOf(paymentMethods.find(val=> val.state === 'active')) === 0">
                                <div class="reservation__body_form__payment-method__card__info">
                                    <div class="reservation__body_form__payment-method__card__text-block">
                                        <div class="reservation__body_form__payment-method__card__text-block__title">
                                            Оплатить при заселении
                                            <span>Самый удобный способ, без предоплаты</span>
                                        </div>
                                        <div class="reservation__body_form__payment-method__card__text-block__text">
                                            <span>Выбирая этот способ оплаты, вы не вносите предоплату за бронь. Получаете подтверждение бронирования и предъявляете его при заселении. При выборе данного вида оплаты Ваше бронирование является негарантированным и сохраняется за Вами до 18:00 дня заезда. </span>
                                            <span>В случае незаезда до указанного времени, гостиница оставляет за собой право аннуляции брони без оповещения гостя.</span>
                                            <span>Если Вы планируете заезд после этого времени, мы рекомендуем Вам прогарантировать Ваше бронирование, выбрав способ оплаты Банковской картой</span>
                                        </div>
                                    </div>
                                    <ElementButton
                                        size="large"
                                        color="accent"
                                        name="button"
                                        @click="selectedPaymentMethod = 'without_prepayment'"
                                    >Забронировать
                                    </ElementButton>
                                </div>
                            </div>
                            <div class="reservation__body_form__payment-method__card" v-if="paymentMethods.indexOf(paymentMethods.find(val=> val.state === 'active')) === 1">
                                <div class="reservation__body_form__payment-method__card__info">
                                    <div class="reservation__body_form__payment-method__card__text-block big-gap">
                                        <div class="reservation__body_form__payment-method__card__text-block__title">
                                            Банковская карта
                                            <span>Visa, MasterCard, МИР, Белкарт, SberPay</span>
                                        </div>
                                        <div class="reservation__body_form__payment-method__card__text-block__text">
                                            <span>Оплачивается вся сумма брони. </span>
                                            <span>Кассовый чек в электронном виде будет предоставлен ООО «Комфорт Букинг». Вы получите его после оплаты на адрес электронной почты, который указали при бронировании. Закрывающие документы, подтверждающие факт проживания и оказания услуг за весь период, вам предоставит средство или объект размещения.</span>
                                            <span>Обработка платежей осуществляется процессинговой системой PayAnyWay.</span>
                                        </div>
                                    </div>
                                    <div class="reservation__body_form__payment-method__card__btn-block">
                                        <ElementButton
                                            size="large"
                                            color="accent"
                                            name="button"
                                            @click="selectedPaymentMethod = 'bank_card'"
                                        >Забронировать
                                        </ElementButton>
                                        <div class="reservation__body_form__payment-method__card__price-block">
                                            15 000 ₽
                                            <span>Предоплата</span>
                                        </div>
                                    </div>
                                </div>
                                <hr>
                                <div class="reservation__body_form__payment-method__card__info">
                                    <div class="reservation__body_form__payment-method__card__text-block big-gap">
                                        <div class="reservation__body_form__payment-method__card__text-block__title">
                                            Оплата по QR-коду, СБП
                                            <span>Система быстрых платежей</span>
                                        </div>
                                        <div class="reservation__body_form__payment-method__card__text-block__text">
                                            <span>Оплачивается вся сумма брони. </span>
                                            <span>Система Быстрых Платежей — самый простой и безопасный способ оплаты. Вам не нужно указывать данные вашей карты: просто отсканируйте QR-код через приложение своего банка на смартфоне и подтвердите платеж.Данный способ оплаты поддерживают многие банки, например «ВТБ», «Т-Банк», «Русский Стандарт», «Ак Барс Банк», «Райффайзенбанк» и другие. Смотреть полный список банков.</span>
                                            <span>Кассовый чек в электронном виде будет предоставлен ООО "Комфорт Букинг". Вы получите его после оплаты на адрес электронной почты, который указали при бронировании. Закрывающие документы, подтверждающие факт проживания и оказания услуг за весь период, вам предоставит средство или объект размещения.</span>
                                            <span>Обработка платежей осуществляется процессинговой системой PayAnyWay.</span>
                                        </div>
                                    </div>
                                    <div class="reservation__body_form__payment-method__card__btn-block">
                                        <ElementButton
                                            size="large"
                                            color="accent"
                                            name="button"
                                            @click="selectedPaymentMethod = 'sbp'"
                                        >Забронировать
                                        </ElementButton>
                                        <div class="reservation__body_form__payment-method__card__price-block">
                                            15 000 ₽
                                            <span>Предоплата</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="reservation__body_form__payment-method__checkbox">
                                <ElementCheckbox
                                    id="reservation-checkbox-confirm-rules"
                                    name="accept_rules"
                                    :on-update="(event)=>{
                                        getAgreementWRules(event);
                                        validateReservationConfirm();
                                    }"
                                >Я согласен с правилами онлайн-бронирования, обработкой персональных данных и политикой конфиденциальности
                                </ElementCheckbox>
                            </div>
                        </div>
                    </form>
                    <div class="reservation__menu">
                        <div class="reservation__menu__info-list" v-if="!currentlyMobile">
                            <div class="reservation__menu__info-list__item title">
                                Обзор брони
                            </div>
                            <div class="reservation__menu__info-list__item">
                                <span class="sub-title">Номер</span>
                                {{ selectedCatalogCard.title }}
                            </div>
                            <div class="reservation__menu__info-list__item">
                                <span class="sub-title">Период</span>
                                {{ formattedDatesRange() }}
                            </div>
                            <div class="reservation__menu__info-list__item">
                                <span class="sub-title">Гости</span>
                                {{ formattedTotalRooms() }}
                            </div>
                            <div class="reservation__menu__info-list__item">
                                <span class="sub-title">Тариф</span>
                                {{ selectedTariffCard.title || 'Не выбрано' }}
                            </div>
                            <div class="reservation__menu__info-list__item">
                                <span class="sub-title">Доп. услуги</span>
                                <span v-for="service in allCheckedServices" v-if="allCheckedServices.length > 0">
                                    {{ service.title }}
                                </span>
                                <span v-else>
                                    Не выбрано
                                </span>
                            </div>
                        </div>
                        <ElementButton v-else
                            size="large"
                            color="subaccent"
                            ghost
                            @click="()=>{bottomSheetBookingOverviewActive = true}"
                        >Просмотреть данные о брони
                        </ElementButton>
                        <div class="reservation__menu__order-block">
                            <div class="reservation__menu__price-block">
                                15000 ₽
                                <div class="discount">
                                    -35%
                                    <span>18 400</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomSheetBookingOverview
                :res="{
                   title: selectedCatalogCard.title,
                   period: formattedDatesRange(),
                   guests: formattedTotalRooms(),
                   tariff: selectedTariffCard.title || 'Не выбрано',
                   services: allCheckedServices
                }"
                v-model:active="bottomSheetBookingOverviewActive"
            />
        </section>
        <section v-else-if="currentStep === 6">
            <div class="reservation-success-section">
                <div class="reservation-success-section__container">
                    <div class="reservation-success-section__title-block">
                        <div class="reservation-success-section__title-block__title">
                            Успешно!
                        </div>
                        <div class="reservation-success-section__title-block__text">
                            На ваш E-mail придет подтверждение бронирования. При необходимости мы свяжемся с вами по телефону, чтобы уточнить детали.
                        </div>
                    </div>
                    <div class="reservation-success-section__info-cards">
                        <div class="reservation-success-section__info-cards__card">
                            <div class="reservation-success-section__info-cards__card__title">
                                Детали бронирования
                            </div>
                            <div class="reservation-success-section__info-cards__card__info-list">
                                <div class="reservation-success-section__info-cards__card__info-list__item mobile-flex">
                                    <span>ID, порядковый номер</span>
                                    20210101-2122-839145123
                                </div><hr>
                                <div class="reservation-success-section__info-cards__card__info-list__item mobile-flex">
                                    <span>Период размещения</span>
                                    11-16 октября
                                </div><hr>
                                <div class="reservation-success-section__info-cards__card__info-list__item mobile-flex">
                                    <span>Номер</span>
                                    Стандарт с широкой кроватью
                                </div><hr>
                                <div class="reservation-success-section__info-cards__card__info-list__item mobile-flex">
                                    <span>Тариф</span>
                                    Long Stay
                                </div><hr>
                                <div class="reservation-success-section__info-cards__card__info-list__item mobile-flex">
                                    <span>Доп.услуги</span>
                                    Завтрак «Шведский стол», Трансферт из аэропорта
                                </div>
                            </div>
                        </div>
                        <div class="reservation-success-section__info-cards__card">
                            <div class="reservation-success-section__info-cards__card__title">
                                Стоимость
                            </div>
                            <div class="reservation-success-section__info-cards__card__info-list">
                                <div class="reservation-success-section__info-cards__card__info-list__item">
                                    <span>За номер</span>
                                    6 500,00
                                </div><hr>
                                <div class="reservation-success-section__info-cards__card__info-list__item">
                                    <span>За услуги</span>
                                    1 000,00
                                </div>
                                <div class="reservation-success-section__info-cards__card__info-list__item small">
                                    <span>Завтрак  «Шведский стол»</span>
                                    0,00
                                    <span>Трансферт из аэропорта</span>
                                    1 000,00
                                </div><hr>
                                <div class="reservation-success-section__info-cards__card__info-list__item big">
                                    <span>Итого</span>
                                    7 500,00
                                </div>
                            </div>
                            <div class="reservation-success-section__info-cards__card__title_sub">
                                Оплата при заселении
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style lang="scss">
    main.wh_100 {
        height: 100dvh;
        width: 100%;
        @include mobile {
            height: unset;
        }
        section {
            @include wh_100;
        }
    }
    .reservation {
        &_container {
            @include wh_100;
            @include df_fdc;
            gap: 3rem;
            padding: 3rem;
            @include mobile {
                gap: 1.5rem;
                padding: 1rem;
                padding-top: 2.25rem;
                padding-bottom: 9.875rem;
                &:has(.calendar-container) {
                    padding-bottom: 13.5rem;
                }
                &:has(.reservation__header__btn-block) {
                    padding-bottom: 19.5rem;
                }
            }
        }
        &__title-block {
            @include df_ac;
            justify-content: space-between;
            &__texts {
                @include df_fdc;
                gap: .5rem;
                @include mobile {
                    gap: .25rem;
                }
            }
            &__title {
                @include heading_1;
            }
        }
        &__menu {
            @include df_fdc;
            gap: 2rem;
            padding: 2rem;
            max-width: 27.75rem;
            height: fit-content;
            width: 100%;
            border-radius: .5rem;
            background-color: $bg-inverse-transparent-4;
            @include mobile {
                padding: 1.5rem;
                gap: 1.5rem;
                border-radius: .375rem;
                max-width: none;
            }
            &__info-list {
                @include df_fdc;
                gap: 1.5rem;
                &__item {
                    @include df_fdc;
                    @include text_1;
                    .sub-title {
                        @include text_2;
                        color: $text-primary-transparent-48;
                    }
                    &.title {
                        @include heading_3;
                    }
                }
            }
            &__order-block {
                @include df_fdc;
                gap: 1.5rem;
                @include mobile {
                    gap: 1rem;
                    .button {
                        width: 100%;
                    }
                }
            }
            &__price-block {
                @include df_ac;
                gap: 1rem;
                @include heading_2;
                @include mobile {
                    gap: .75rem;
                }
                .discount {
                    @include df_ac;
                    gap: .5rem;
                    @include text_2;
                    color: $text-system-positive;
                    @include mobile {
                        gap: .25rem;
                    }
                    span {
                        @include text_2;
                        text-decoration: line-through;
                        color: $text-primary-transparent-48;
                    }
                }
            }
        }
        &__header {
            @include df_ac;
            justify-content: space-between;
            &__inputs {
                @include df_ac;
                gap: 1rem;
                @include mobile {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: .75rem;
                    width: 100%;
                    .select,
                    .field {
                        width: 100%;
                    }
                }
            }
            &__btn-block {
                display: flex;
                width: 100%;
                padding: .5rem;
                padding-top: 1.75rem;
                .button {
                    width: 100%;
                }
            }
            @include mobile {
                position: fixed;
                z-index: 5;
                bottom: 0;
                left: 0;
                @include df_fdc;
                gap: .75rem;
                padding: 1rem;
                border-radius: .75rem .75rem 0 0;
                width: 100%;
                background-color: $bg-inverse-subdued-4;
                .calendar-container {
                    width: 100%;
                    &__inputs {
                        @include df_fdc;
                        align-items: flex-start;
                        .field {
                            width: 100%;
                        }
                    }
                }
                .dropdown {
                    display: none;
                }
            }
        }
    }
    section {
        .reservation-start-section {
            @include df_fdc_ac;
            @include wh_100;
            justify-content: center;
            background-color: $bg-primary;
            @include mobile {
                height: 100dvh;
            }
            &__container {
                @include df_fdc;
                gap: 3rem;
                max-width: 37.375rem;
                @include mobile {
                    max-width: none;
                    padding: 0 1.5rem;
                    gap: 2.25rem;
                }
            }
            &__header {
                @include df_ac;
                gap: 3rem;
                @include mobile {
                    gap: 1.5rem;
                }
                &__title {
                    @include heading_1;
                    @include mobile {
                        @include heading_2;
                    }
                }
            }
            &__form {
                @include df_fdc;
                gap: 1.5rem;
                @include mobile {
                    gap: 1rem;
                }
                &__inputs {
                    @include df_fdc;
                    gap: 1rem;
                    @include mobile {
                        gap: .75rem;
                    }
                    .calendar-container {
                        @include mobile {
                            width: 100%;
                        }
                        &__inputs {
                            gap: .25rem;
                            @include mobile {
                                flex-direction: column;
                                gap: .75rem;
                                .field {
                                    width: 100%;
                                }
                            }
                        }
                    }
                    .calendar-second {
                        .input-label {
                            border-radius: 0 .5rem .5rem 0;
                            @include mobile {
                                border-radius: .375rem;
                            }
                        }
                    }
                    .calendar-first {
                        .input-label {
                            border-radius: .5rem 0 0 .5rem;
                            @include mobile {
                                border-radius: .375rem;
                            }
                        }
                    }
                    &__block {
                        @include df_fdc;
                        gap: .75rem;
                        &__title {
                            @include strong_1;
                        }
                        &__input {
                            @include df_ac;
                            gap: .75rem;
                            .select {
                                width: 100%;
                            }
                        }
                    }
                }
            }
            &__button {
                .button {
                    width: 100%;
                }
            }
        }
        .reservation {
            &__body {
                @include df_fdc;
                gap: 3rem;
                @include mobile {
                    gap: 1.5rem;
                }
                &_number {
                    &__filters {
                        @include df_ac;
                        gap: 1.5rem;
                        @include mobile {
                            justify-content: space-between;
                            gap: .25rem;
                        }
                        &__desktop {
                            @include df_ac;
                            gap: 1.5rem;
                            padding-left: 1rem;
                        }
                    }
                    &__banner {
                        aspect-ratio: 100 / 11;
                        width: 100%;
                        border-radius: 1rem;
                        @include mobile {
                            aspect-ratio: 69 / 62;
                            border-radius: .75rem;
                        }
                        img {
                            @include image_contain;
                            border-radius: 1rem;
                            @include mobile {
                                border-radius: .75rem;
                            }
                        }   
                    }
                    &__list {
                        @include grid(3, 1rem);
                        @include mobile {
                            @include grid(1, .75rem);
                        }
                    }
                }
                &_tariff {
                    .catalog-card[view="horizontal_order"] {
                        .catalog-card__img-block {
                            height: 13rem;
                            aspect-ratio: 229 / 104;
                            @include mobile {
                                height: 9.875rem;
                            }
                        }
                    }
                    &__selected-card {
                        min-height: 13rem;
                        @include mobile {
                            min-height: unset;
                        }
                    }
                    &__tariffs-block {
                        @include df_fdc;
                        gap: 1.5rem;
                        height: 100%;
                        @include mobile {
                            gap: 1rem;
                        }
                        &__title {
                            @include heading_2;
                        }
                        &__list {
                            height: 100%;
                        }
                    }
                }
                &_services {
                    display: flex;
                    flex-direction: row;
                    gap: 3.375rem;
                    height: 100%;
                    @include mobile {
                        flex-direction: column;
                        gap: 1.5rem;
                    }
                    &__items-block {
                        @include df_fdc;
                        gap: 2rem;
                        width: 100%;
                        @include mobile {
                            gap: 1.5rem;
                        }
                        .reservation__title-block {
                            padding-bottom: 1rem;
                            @include mobile {
                                padding-bottom: 0;
                            }
                        }
                        &__filters {
                            @include df_ac;
                            gap: 1rem;
                            width: 100%;
                            @include mobile {
                                overflow-x: scroll;
                            }
                        }
                        &__list {
                            @include grid(3, 1rem);
                            overflow-y: scroll;
                            height: 100%;
                            padding-right: 1.25rem;
                            @include mobile {
                                @include df_fdc;
                                gap: .75rem;
                                padding-right: 0;
                            }
                        }
                    }
                }
                &_form {
                    display: flex;
                    flex-direction: row;
                    gap: 4.625rem;
                    @include mobile {
                        gap: 0;
                        display: block;
                    }
                    &__info-block {
                        @include df_fdc;
                        gap: 3rem;
                        width: 100%;
                        padding-bottom: 3rem;
                        @include mobile {
                            gap: 2.25rem;
                            padding-bottom: 1.5rem;
                        }
                    }
                    &__main-info {
                        @include df_fdc;
                        gap: 2rem;
                        @include mobile {
                            gap: 1.5rem;
                        }
                        &__choose-guest {
                            @include df_fdc;
                            gap: .75rem;
                            @include mobile {
                                gap: .5rem;
                            }
                            &__radio {
                                @include df_ac;
                                gap: 1rem;
                                @include mobile {
                                    gap: .75rem;
                                }
                            }
                            span {
                                @include text_3;
                                color: $text-primary-transparent-48;
                            }
                        }
                        &__inputs-block {
                            @include df_fdc;
                            gap: 2rem;
                            @include mobile {
                                gap: 1.5rem;
                            }
                            &__inputs {
                                @include grid(2, 1rem);
                                @include mobile {
                                    @include grid(1, .75rem);
                                }
                                .select {
                                    grid-column: span 2;
                                    @include mobile {
                                        grid-column: span 1;
                                    }
                                }
                            }
                            &__checkboxes {
                                @include df_fdc;
                                gap: 1rem;
                                @include mobile {
                                    gap: .75rem;
                                    .custom-checkbox-label {
                                        @include text_2;
                                    }
                                }
                            }
                        }
                    }
                    &__add-info {
                        @include df_fdc;
                        gap: 2rem;
                        @include mobile {
                            gap: 1rem;
                        }
                        &__title {
                            @include heading_2;
                            @include mobile {
                                @include heading_3;
                            }
                        }
                    }
                    &__payment-method {
                        @include df_fdc;
                        gap: 2rem;
                        @include mobile {
                            gap: 1.5rem;
                        }
                        &__title-block {
                            @include df_ac;
                            justify-content: space-between;
                            @include mobile {
                                flex-direction: column;
                                align-items: flex-start;
                                justify-content: flex-start;
                            }
                            &__title {
                                @include heading_2;
                                @include mobile {
                                    @include heading_3;
                                }
                            }
                            &__popover-text {
                                @include df_ac;
                                gap: .25rem;
                                @include text_2;
                                color: $text-system-negative;
                                .icon-popover__text-block {
                                    width: 22.5rem;
                                }
                            }
                        }
                        &__btns-block {
                            @include df_ac;
                            gap: 2rem;
                        }
                        &__card {
                            @include df_fdc;
                            gap: 3rem;
                            padding: 2rem;
                            border-radius: .5rem;
                            background-color: $bg-inverse-transparent-4;
                            @include mobile {
                                gap: 1.5rem;
                                padding: 1.5rem;
                                border-radius: .375rem;
                            }
                            &__info {
                                @include df_fdc;
                                gap: 2rem;
                            }
                            &__text-block {
                                @include df_fdc;
                                gap: .75rem;
                                @include mobile {
                                    gap: 1rem;
                                }
                                &.big-gap {
                                    gap: 1.5rem;
                                    @include mobile {
                                        gap: 1rem;
                                    }
                                }
                                &__title {
                                    display: flex;
                                    gap: 1.5rem;
                                    @include heading_3;
                                    @include mobile {
                                        flex-direction: column;
                                        gap: .5rem;
                                    }
                                    span {
                                        @include text_2;
                                        color: $text-primary-transparent-48;
                                        padding-top: .4375rem;
                                        @include mobile {
                                            padding-top: 0;
                                        }
                                    }
                                }
                                &__text {
                                    @include df_fdc;
                                    gap: .5rem;
                                    @include text_1;
                                    @include mobile {
                                        @include text_2;
                                    }
                                }
                            }
                            &__btn-block {
                                @include df_ac;
                                gap: 2rem;
                                @include mobile {
                                    flex-direction: column-reverse;
                                    align-items: flex-start;
                                    gap: .75rem;
                                    .button {
                                        width: 100%;
                                    }
                                }
                            }
                            &__price-block {
                                display: flex;
                                align-items: flex-end;
                                gap: 1rem;
                                @include heading_2;
                                @include mobile {
                                    gap: .75rem;
                                }
                                span {
                                    @include text_2;
                                    color: $text-primary-transparent-48;
                                }
                            }
                            hr {
                                border: none;
                                border-top: 1px solid $border-primary-transparent-8;
                            }
                        }
                        &__checkbox {
                            @include mobile {
                                .custom-checkbox-label {
                                    @include text_2;
                                }
                            }
                        }
                    }
                }
            }
        }
        .reservation-success-section {
            height: 100%;
            &__container {
                height: 100%;
                @include df_fdc_ac;
                justify-content: center;
                gap: 3rem;
                padding: 3rem;
                @include mobile {
                    gap: 2rem;
                    padding: 1rem;
                }
            }
            &__title-block {
                @include df_fdc_ac;
                gap: .75rem;
                text-align: center;
                max-width: 34.125rem;
                @include mobile {
                    gap: .5rem;
                }
                &__title {
                    @include heading_0;
                }
                &__text {
                    @include text_1;
                }
            }
            &__info-cards {
                @include grid(2, 1rem);
                width: 100%;
                @include mobile {
                    @include grid(1, .75rem);
                }
                &__card {
                    @include df_fdc;
                    gap: 2rem;
                    padding: 2rem;
                    border-radius: .5rem;
                    background-color: $bg-inverse-transparent-4;
                    @include mobile {
                        gap: 1.5rem;
                        padding: 1.5rem; 
                        border-radius: .375rem;
                    }
                    &__title {
                        @include heading_2;
                        &_sub {
                            @include text_1;
                            color: $text-primary-transparent-48;
                        }
                    }
                    &__info-list {
                        @include df_fdc;
                        gap: 1rem;
                        @include mobile {
                            gap: .75rem;
                        }
                        hr {
                            border: none;
                            border-top: 1px solid $border-primary-transparent-8;
                        }
                        &__item {
                            @include grid(2, 1rem);
                            @include text_1;
                            span {
                                color: $text-primary-transparent-48;
                            }
                            &.mobile-flex {
                                @include mobile {
                                    @include df_fdc;
                                    gap: 0;
                                }
                            }
                            &.small {
                                row-gap: .5rem;
                                @include text_2;
                                @include mobile {
                                    row-gap: .25rem;
                                }
                            }
                            &.big {
                                @include heading_2;
                                span {
                                    color: $text-primary;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    .button-appear-enter-active,
    .button-appear-leave-active {
        @include transition(opacity);
    }
    .button-appear-enter-from,
    .button-appear-leave-to {
        opacity: 0;
    }
</style>