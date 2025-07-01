<script lang="ts" setup>
    // import { useRoomBuilding } from '~/composables/admin/room-fond/frame'
    import type { Floor } from '~/components/popup/SuitCreate.vue'
    import { z } from 'zod'
    import { useRoomFond } from '~/composables/admin/room-fond/rooms'

    definePageMeta({
        isAdmin: true,
    })

    const {
        phoneArr,
        emailArr,
        childsArr,
        roomNumberArr,
        phoneAppendButton,
        emailAppendButton,
        roomNumbersAppendButton,
        appendContactInput,
        deleteContactInput,
        valueTransfer,
        mainInputHandle
    } = createNewInput()

    // const {
    //     data,
    //     getNewData
    // } = await useRoomBuilding()

    // getNewData()Настройки гостиницы

    const {
        rooms,
        saveRoom,
    } = await useRoomFond()


    const arrayFloors = ref<Floor[] | null | undefined>()

    const arrayBed = ref<{ id: number, name: string }[]>([
        {
            id: 1,
            name: 'Стандарт с широкой кроватью'
        },
        {
            id: 2,
            name: 'Двуспальная'
        }
    ])

    const arrayTypeNumber = ref<{ id: number, name: string }[]>([
        {
            id: 1,
            name: 'Стандарт'
        },
        {
            id: 2, 
            name: 'Люкс'
        }
    ])

    const updateArrayFloors = (roomNumber: string) => {

        const foundFloor = data.value.find(el => el.name === roomNumber)

        const maxFloor = foundFloor?.levels ?? 0

        arrayFloors.value = Array.from({ length: maxFloor }, (_, index) => ({
            name: index + 1
        }))
    }

    // Get data from first input
    const firstInputValue = ref<string>('')

    const valueInArray = ref<{ name: string }[]>([])

    const checkFirstInput = (e: Event) => {
        
        const value = ref<HTMLInputElement>(e.target as HTMLInputElement)
        firstInputValue.value = value.value.value

        roomNumberArr.value.unshift({ value: firstInputValue.value })

        valueInArray.value = roomNumberArr.value.map(el => {
            return { name: el.value }
        })

        roomNumberArr.value.shift()
    }

    const refForm = ref<HTMLFormElement | null>(null)

    const schema = z.object({
        frame: z.string().min(1),
        floor: z.string().min(1),
        typeRoom: z.string().min(1),
        bedInfo: z.string().min(1),
        numbers: z.string().min(1)        
    })

    const viewBed = ref<boolean>(false)

    const changeViewBed = (newValue: string) => {
        if (newValue.length !== 0) {
            viewBed.value = true
        } else {
            viewBed.value = false
        }
    }

    const buttonDisable = ref<boolean>(true)

    const validateForm = (click?: boolean) => {
        if (refForm.value) {
            validate(refForm.value, schema, (body: any, button: HTMLButtonElement) => {
                if (click) {
                    
                }
            })
        }
    }

</script>

<template>
    <section>
        <form ref="refForm" @submit.prevent="validateForm">
            <div class="section-room-fond-create">
                <div class="section-room-fond-create__container ">
                    <div class="section-room-fond-create__dop-container">
    
                        <div class="section-room-fond-create__input-contain">
                            <SelectDefault
                                id="room-frame"
                                name="frame"
                                fake-placeholder="Корпус"
                                :options="data"
                                :on-update="(newValue: string) => {
                                    updateArrayFloors(newValue)
                                }"
                                readonly
                            />
                            <SelectDefault
                                id="room-floor"
                                name="floor"
                                fake-placeholder="Этаж"
                                :options="arrayFloors"
                                readonly
                            />
                            <SelectDefault
                                id="room-type"
                                name="typeRoom"
                                fake-placeholder="Тип номера"
                                :options="arrayTypeNumber"
                                :on-update="(newValue: string) => {
                                    changeViewBed(newValue)
                                }"
                                readonly
                            />
                            <SelectDefault
                                v-if="viewBed"
                                id="room-bed"
                                name="bedInfo"
                                fake-placeholder="Кровати в номере"
                                :options="arrayBed"
                                readonly
                            />
                            <ElementInput 
                                id="comment"
                                name="comment"
                                fake-placeholder="Комментарии"
                                :maxLength="300"
                                type='textarea'
                            />
                        </div>
        
                        <div class="section-room-fond-create__input-contain">
                            <span class="section-room-fond-create__input-contain__title">Номера комнат</span>
                            <div class="section-room-fond-create__grid">

                                <div class="section-room-fond-create__grid__item">
                                    <ElementInput 
                                        name="numbers"
                                        :class="'w_100'"
                                        size='large'
                                        ref="firstInputRef"
                                        fake-placeholder="Номер"
                                        id="popup-suit-create-created-number"
                                        @input="(e: Event) => {
                                            mainInputHandle('room_numbers') 
                                            checkFirstInput(e)
                                        }"
                                    />
                                    <ElementIconButton 
                                        type="button" 
                                        size="large"
                                        :ghost="true" 
                                        disabled>
                                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.16634 7.00065V3.50065C8.16634 2.85632 8.68868 2.33398 9.33301 2.33398H18.6663C19.3107 2.33398 19.833 2.85632 19.833 3.50065V7.00065H25.6663V9.33398H23.333V24.5007C23.333 25.145 22.8107 25.6673 22.1663 25.6673H5.83301C5.18868 25.6673 4.66634 25.145 4.66634 24.5007V9.33398H2.33301V7.00065H8.16634ZM10.4997 4.66732V7.00065H17.4997V4.66732H10.4997Z" fill="#2D3033" fill-opacity="0.48"/>
                                        </svg>
                                    </ElementIconButton>
                                </div>

                                <div class="section-room-fond-create__grid__item" v-for="(item, index) in roomNumberArr">
                                    <ElementInput
                                        :fake-placeholder="`Номер ${index + 2}`"
                                        :id="`popup-suit-create-created-number-${index + 2}`"
                                        name="numbers"
                                        @input="(value: any) => { 
                                            valueTransfer(value, index, 'room_numbers') 
                                        }"
                                        v-model="roomNumberArr[index].value"
                                        :newValue="item.value"
                                        ref="phoneInputs" 
                                        :class="'w_100'"
                                    />
                                    <ElementIconButton 
                                        type="button" 
                                        size="large"
                                        color="transparent" 
                                        :ghost="true" 
                                        @click="deleteContactInput(index, 'room_numbers')">
                                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.16634 7.00065V3.50065C8.16634 2.85632 8.68868 2.33398 9.33301 2.33398H18.6663C19.3107 2.33398 19.833 2.85632 19.833 3.50065V7.00065H25.6663V9.33398H23.333V24.5007C23.333 25.145 22.8107 25.6673 22.1663 25.6673H5.83301C5.18868 25.6673 4.66634 25.145 4.66634 24.5007V9.33398H2.33301V7.00065H8.16634ZM10.4997 4.66732V7.00065H17.4997V4.66732H10.4997Z" fill="#2D3033" fill-opacity="0.48"/>
                                        </svg>
                                    </ElementIconButton>
                                </div>
                                <ElementButton 
                                    size="large" 
                                    color="transparent"
                                    @click="appendContactInput('room_numbers')"
                                    ref="roomNumbersAppendButton"
                                    :disabled="buttonDisable">
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.833 12.834V5.83398H15.1663V12.834H22.1663V15.1673H15.1663V22.1673H12.833V15.1673H5.83301V12.834H12.833Z" fill="#1C5BAD"/>
                                    </svg>
                                </ElementButton>
    
                            </div>
                        </div>
    
                        <div class="section-room-fond-create__buttons">
                            <ElementCheckbox 
                                id="not-stat"
                                name="not-stat"
                            >
                                Не учитывать в статистике
                            </ElementCheckbox>
                            <ElementButton
                                type="submit"
                                color='accent'
                                size='large'
                                name="button"
                            >
                                Создать
                            </ElementButton>
                        </div>
    
                    </div>
    
                </div>
            </div>
        </form>
    </section>
</template>

<style lang="scss">
    .section-room-fond-create {
        &__container {
            padding: 1.5rem 11rem 0rem;
        }
        &__dop-container {
            @include df_fdc;
            max-width: 47.125rem;
            gap: 2rem;
        }
        &__input-contain {
            @include df_fdc;
            gap: 1rem;
            &__title {
                @include strong_1;
                color: $text-primary;
            }
        }
        &__grid {
            @include grid(2, 1rem);
            &__item {
                @include df_ac;
                gap: .5rem;
            }
        }
        &__buttons {
            @include df_fdc;
            gap: 1.5rem;
        }
    }
    .w_100 {
        width: 100%;
    }
</style>