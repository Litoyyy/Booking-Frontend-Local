<script lang="ts" setup>
    import { arrayBed, type ConfigRoom, type RoomInfo, type TypeBed, useRooms } from '~/composables/admin/room-fond/newRoom';

    definePageMeta({
        isAdmin: true,
    });

    const {
        rooms,
        findConfById,
        addRoom,
        removeRoom
    } = useRooms()


    const id = Number(useRoute().params.id)

    const conf = findConfById(id)

    if (!conf || conf.idConf === undefined) {
        throw new Error('Invalid config')
    }

    const data = reactive<ConfigRoom>(conf)

    const createEmptyRoom = () => {

        const newId = Math.max(...rooms.value.map(conf => conf.idConf)) + 1

        const emptyRoom = reactive<RoomInfo>({
            roomNumber: '',
            idRoom: newId,
            floor: Number(data?.rooms[0].floor),
            active: false,
            categoryRoom: 'Стандарт'
        })

        addRoom(emptyRoom, data?.idConf as number)
    }

    const changeFloor = (floor: number) => {
        data.rooms = data.rooms.map(el => {
            return {  
                ...el,
                floor: floor
            }
        })
    }

    const arrayFloors = ref<{ name: number }[]>(Array.from({ length: Number(data?.maxFloor) }, (_, index) => ({ name: index + 1 }) ))

    const arrayFrames = rooms.value.map(el => { return { name: el.frame } })

    const validateForm = () => {

    }

</script>

<template>
    <section>
        <form @submit.prevent="validateForm">
            <div class="section-room-fond-edit">
                <div class="section-room-fond-edit__container">
                    <div class="section-room-fond-edit__dop-container">
                        <div class="section-room-fond-edit__inputs">

                            <SelectDefault
                                name="frame"
                                id="frame"
                                fake-placeholder="Корпус"
                                :options="arrayFrames"
                                :newValue="data?.frame"
                            />

                            <SelectDefault
                                name="floor"
                                id="floor"
                                fake-placeholder="Этаж"
                                :options="arrayFloors"
                                :newValue="data?.rooms[0].floor"
                                
                            />
                            
                            <SelectDefault
                                name="type_number"
                                id="type_number"
                                fake-placeholder="Кровати в номере"
                                :newValue="data?.typeBed"
                                :options="arrayBed"
                                readonly
                            />

                            <ElementInput
                                type='textarea'
                                fake-placeholder="Комментарий"
                                :max-length="300"
                                :newValue="String(data?.comment)"
                            />
                        </div>

                        <div class="section-room-fond-edit__rooms">
                            <span class="section-room-fond-edit__rooms__title">Номера комнат</span>
                        
                            <div
                                v-for="item in data?.rooms" 
                                class="section-room-fond-edit__rooms__item">
                                <ElementInput 
                                    name='room-number'
                                    id="room-number"
                                    size='large'
                                    fake-placeholder="Номер"
                                    :new-value="String(item.roomNumber)"
                                />
                                
                                <ElementIconButton
                                    :size="'large'"
                                    :color="'transparent-secondary'"
                                    @click="removeRoom(data.idConf)"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M6.16732 4.99992V1.49992C6.16732 0.855592 6.68966 0.333252 7.33398 0.333252H16.6673C17.3117 0.333252 17.834 0.855592 17.834 1.49992V4.99992H23.6673V7.33325H21.334V22.4999C21.334 23.1443 20.8117 23.6666 20.1673 23.6666H3.83398C3.18966 23.6666 2.66732 23.1443 2.66732 22.4999V7.33325H0.333984V4.99992H6.16732ZM8.50065 2.66659V4.99992H15.5007V2.66659H8.50065Z" fill="#2D3033" fill-opacity="0.48"/>
                                    </svg>
                                </ElementIconButton>
                            </div>

                            <ElementButton 
                                size="large" 
                                color="transparent"
                                @click="createEmptyRoom"
                                type="button"
                                ref="roomNumbersAppendButton"
                            >
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.833 12.834V5.83398H15.1663V12.834H22.1663V15.1673H15.1663V22.1673H12.833V15.1673H5.83301V12.834H12.833Z" fill="#1C5BAD"/>
                                </svg>
                            </ElementButton>

                        </div>

                        <div class="section-room-fond-edit__buttons">
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
    .section-room-fond-edit {
        &__container {
            padding: 1.5rem 11rem 0rem;
        }
        &__dop-container {
            @include df_fdc;
            max-width: 47.125rem;
            gap: 2rem;
        }
        &__inputs {
            @include df_fdc;
            gap: 1rem;
        }
        &__rooms {
            @include grid(2, 1rem);
            &__title {
                @include strong_1;
                color: $text-primary;
                grid-column: span 2;
            }
            &__item {
                @include df_ac;
                gap: 1rem;
            }
        }
        &__buttons {
            @include df_fdc;
            gap: 1.5rem;
        }
    }
</style>