<script lang="ts" setup>
    import { createNewInput } from '~/composables/createNewInputs'; 
    import Popup from '~/layouts/components/Popup.vue';
    import { z } from 'zod';
    import { categoryRoomArray, useRooms, type ConfigRoom, type RoomInfo } from '~/composables/admin/room-fond/newRoom';

    export interface Floor {
        name: number
    }

    const {
        rooms,
        addConf,
        addRoom
    } = useRooms()

    const {
        roomNumberArr,
        roomNumbersAppendButton,
        appendContactInput,
        deleteContactInput,
        valueTransfer,
        mainInputHandle
    } = createNewInput()

    const firstInputRef = ref<HTMLInputElement | null>()

    const arrayFloors = ref<Floor[] | null | undefined | []>()

    const framseData = rooms.value.map(el => { return { name: el.frame } })

    const updateArrayFloors = (frame: string) => {
        
        const foundFloor = rooms.value.find(el => el.frame === frame)
        
        if (foundFloor === undefined) return

        const maxFloor = foundFloor.maxFloor

        arrayFloors.value = Array.from({ length: Number(maxFloor) }, (_, index) => ({
            name: index + 1
        }))
    }

    const categoryRoomOptions = ref<{ name: string }[]>( categoryRoomArray.map(el => { return { name: el } }) )

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

    // Validate form
    const formRef = ref<HTMLFormElement | null>(null)
    
    const schema = z.object({
        frame: z.string().min(1),
        floor: z.string().min(1),
        typeRoom: z.string().min(1),
        bedInfo: z.string().min(1),
        comment: z.string().min(1),
        number_room: z.string().min(1)
    })

    const eventOnButton = ref<boolean>(false)

    const validateForm = () => {

        if (formRef.value) {
            validate(formRef.value, schema, (body: any) => {
                createRooms(body)
            })
        }

        if (eventOnButton.value) return null

        setTimeout(() => {
            eventOnButton.value = true
            const button = formRef.value?.elements.namedItem('button') as HTMLButtonElement;
            if (button && !button.dataset.state) {
                button.click()
            }
        }, 10);
    }

    const createRooms = (body: any) => {

        const newId = ref<number>(
            Math.max(...rooms.value
                .flatMap(conf => conf.rooms)
                .map(room => room.idRoom)) + 1
        )
        
        const confId = ref<number>((rooms.value.find(conf => conf.frame === body.frame) as ConfigRoom).idConf)

        if (roomNumberArr.value.length === 0) {
            
            const newRoom = reactive<RoomInfo>({
                roomNumber: firstInputValue.value,
                idRoom: Number(newId),
                floor: Number(body.floor),
                active: false,
                categoryRoom: body.typeRoom
            })

            addRoom(newRoom, confId.value)
        } else {
            const dopRooms = ref<number[]>(roomNumberArr.value.map(el => Number(el.value)))
            const newRooms = ref<number[] | RoomInfo[]>([
                Number(firstInputValue.value),
                ...dopRooms.value
            ])
            
            newRooms.value = newRooms.value.map(el => {

                
                const newRoom = reactive<RoomInfo>({
                    roomNumber: Number(el),
                    idRoom: newId.value,
                    floor: Number(body.floor),
                    active: false,
                    categoryRoom: body.typeRoom
                })
                
                newId.value++

                console.log(newRoom);

                return newRoom
            })
            addRoom(newRooms.value, confId.value)
        }
    }

</script>

<template>
    <Popup name="Создать комнату" resize>
        <form ref="formRef" class="popup__form" @submit.prevent="validateForm">
            <div ref="formRef" class="popup__inputs">
                <div class="popup__form__label-block">
                    <SelectDefault
                        fake-placeholder="Корпус"
                        id="popup-suit-create-frame"
                        name="frame"
                        :options="framseData"
                        :on-update="(newValue: string) => { updateArrayFloors(newValue), validateForm }"
                        readonly
                    />
                    <SelectDefault 
                        fake-placeholder="Этаж"
                        id="popup-suit-create-level"
                        name="floor" 
                        :options="arrayFloors"
                        readonly
                        :on-update="(newValue: string) => { validateForm }"
                    />
                    <SelectDefault 
                        fake-placeholder="Тип номера"
                        id="popup-suit-create-room-number"
                        name="typeRoom" 
                        :options="categoryRoomOptions"
                        :on-update="(newValue: string) => { validateForm }"
                    />
                    <SelectDefault 
                        fake-placeholder="Кровати в номере"
                        id="popup-suit-create-bed"
                        name="bedInfo" 
                        :options="arrayBed"
                        :on-update="(newValue: string) => { validateForm }"
                    />
                    <ElementInput 
                        fake-placeholder="Комментарий"
                        id="popup-suit-create-comment"
                        name="comment"
                        type="textarea"
                        :max-length="300" 
                        @input="validateForm"
                    />
                </div>
                <div class="popup__form__room-numbers">
                    <div class="popup__form__room-numbers__title">
                        Номера комнат
                    </div>
                    <div class="popup__form__item">
                        <ElementInput 
                            ref="firstInputRef"
                            fake-placeholder="Номер"
                            id="popup-suit-create-created-number"
                            @input="(e: Event) => {
                                mainInputHandle('room_numbers') 
                                checkFirstInput(e)
                                validateForm
                            }"
                            name="number_room" 
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
                    <div class="popup__form__item" v-for="(item, index) in roomNumberArr">
                        <ElementInput 
                            :fake-placeholder="`Номер ${index + 2}`"
                            :id="`popup-suit-create-created-number-${index + 2}`"
                            :name="`number_room`"
                            @input="(value: string) => { valueTransfer(value, index, 'room_numbers'), validateForm }"
                            v-model="roomNumberArr[index].value"
                            :newValue="item.value"
                            ref="phoneInputs" 
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
                        type="button"
                        ref="roomNumbersAppendButton"
                        :disabled="true">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.833 12.834V5.83398H15.1663V12.834H22.1663V15.1673H15.1663V22.1673H12.833V15.1673H5.83301V12.834H12.833Z" fill="#1C5BAD"/>
                        </svg>
                    </ElementButton>
                </div>
            </div>
            <div class="popup__button-block">
                <ElementCheckbox>
                    Не учитывать в статистике
                </ElementCheckbox>
                <ElementButton 
                    size="large" 
                    name="button"
                    id="button"
                    type='submit'
                >
                    Создать
                </ElementButton>
            </div>
        </form>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        &__inputs {
            @include df_fdc;
            gap: 2rem;
        }
        &__form {
            @include df_fdc;
            gap: 2rem;
            &__label-block {
                @include df_fdc;
                gap: 1rem;
            }
            &__room-numbers {
                @include grid(2, 1rem);
                &__title {
                    grid-column: span 2;
                    @include strong_1;
                }
            }
            &__item {
                @include df_ac;
                gap: .5rem;
            }
        }
        &__button-block {
            @include df_fdc;
            gap: 1.5rem;
        }
    }
</style>