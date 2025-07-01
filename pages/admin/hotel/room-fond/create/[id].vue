<script lang="ts" setup>
    import { useRoomFond, type GetRoom } from '~/composables/admin/room-fond/rooms'

    definePageMeta({
        isAdmin: true,
    })

    const id = Number(useRoute().params.id)

    const {
        
    } = useRoomFond()

    console.log(getRoomById(id))

    const validateForm = () => {

    }

</script>

<template>
    <section>
        <form  ref="refForm" @submit.prevent="validateForm">
            <div class="section-room-fond-create">
                <div class="section-room-fond-create__container ">
                    <div class="section-room-fond-create__dop-container">
    
                        <div class="section-room-fond-create__input-contain">
                            <SelectDefault
                                id="room-frame"
                                name="frame"
                                fake-placeholder="Корпус"
                                :options="framesState"
                                :on-update="(newValue: string) => updateArrayFloors(newValue)"
                                readonly
                            />
                            <SelectDefault
                                id="room-floor"
                                name="floor"
                                fake-placeholder="Этаж"
                                :options="arrayFloors"
                            />
                            <SelectDefault
                                id="room-type"
                                name="typeRoom"
                                fake-placeholder="Тип номера"
                                :options="valueInArray"
                                :on-update="(newValue: string) => {  }"
                            />
                            <SelectDefault
                                v-if="viewBed"
                                id="room-bed"
                                name="bedInfo"
                                fake-placeholder="Кровати в номере"
                                :options="arrayBed"
                            />
                            <ElementInput 
                                id="room-bed"
                                name="bedInfo"
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
                                        :class="'w_100'"
                                        size='large'
                                        ref="firstInputRef"
                                        fake-placeholder="Номер"
                                        id="popup-suit-create-created-number"
                                        @input="(e: Event) => {
                                            mainInputHandle('room_numbers') 
                                            checkFirstInput(e)
                                        }"
                                        name="number" 
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
                                        name="numberRoom"
                                        @input="(value: any) => { valueTransfer(value, index, 'room_numbers') }"
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
                                    type="button"
                                    ref="roomNumbersAppendButton"
                                    :disabled="true">
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
                                @click="validateForm"
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