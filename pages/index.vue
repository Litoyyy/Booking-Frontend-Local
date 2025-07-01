<script setup lang="ts">
    import { reservationRooms } from '~/composables/making-reservation/reservationRooms';

    import { z } from 'zod';

    definePageMeta({
        layout: false
    });

    const currentStep = ref('introduction');

    const formRef = ref<HTMLFormElement | null>(null);

    const { getTags } = reservationRooms()

    const introductionSchema = z.object({
        start_date: z.string().min(1),
        end_date: z.string().min(1),
        introduction_select: z.string().min(1).refine(value => value !== "0"),
    });

    const validateIntroduction =()=>{
        setTimeout(() => {
            if(formRef.value) {
                validate(formRef.value, introductionSchema,
                    (body: any)=>{
                        console.log(body);
                    }
                );
            };
        }, 150);
    };

    onMounted(()=>{
        validateIntroduction();
    });

</script>

<template>
    <section v-if="currentStep === 'introduction'" class="wh_100">
        <div class="introduction-section">
            <div class="introduction-section__container">
                <div class="introduction-section__title">
                    Посетителей онлайн: 3
                </div>
                <form class="introduction-section__form" ref="formRef">
                    <div class="inputs-trip-block">
                        <DatePicker id="header-datepicker" rangeSelect
                            first-placeholder="Въезд"
                            last-placeholder="Выезд"
                            theme="dark"
                            :on-update="validateIntroduction"
                        />
                        <SelectSmartSelectGuest 
                            fake-placeholder="Кол-во гостей"
                            theme="dark"
                            name="introduction_select"
                            :readonly="true"
                            :onChoose="validateIntroduction"
                            :min-value="1"
                            :tags="getTags"
                            />
                    </div>
                    <ElementButton
                        size="large"
                        color="subaccent"
                        name="button"
                    >Найти номер
                    </ElementButton>
                </form>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    section.wh_100 {
        height: 100dvh;
        width: 100%;
    }
    .introduction-section {
        @include wh_100;
        background-color: $bg-accent;
        &__container {
            @include df_fdc_ac;
            @include wh_100;
            justify-content: center;
            gap: 3rem;
            @include mobile {
                padding: 0 1rem;
            }
        }
        &__title {
            @include heading_1;
            color: $text-inverse;
        }
        &__form {
            @include df_fdc_ac;
            gap: 2rem;
            @include mobile {
                gap: 1.5rem;
            }
            .button[data-color="subaccent"] {
                max-width: 17.5rem;
                width: 100%;
                @include mobile {
                    max-width: none;
                }
            }
        }
    }
    .inputs-trip-block {
        display: flex;
        gap: 1px;
        @include mobile {
            flex-direction: column;
        }
        .calendar-container__inputs {
            gap: 1px;
        }
        .field {
            max-width: 17.5rem;
            @include mobile {
                max-width: none;
            }
        }
        .calendar-second {
            .input-label {
                border-radius: 0;
                @include mobile {
                    border-radius: 0 .375rem 0 0;
                }
            }
        }
        .calendar-first {
            .input-label {
                border-radius: .5rem 0 0 .5rem;
                @include mobile {
                    border-radius: .375rem 0 0 0;
                }
            }
        }
        .select-input {
            .input-label {
                border-radius: 0 .5rem .5rem 0;
                @include mobile {
                    border-radius: 0 0 .375rem .375rem;
                }
            }
        }
    }
</style>