<script lang="ts" setup>
    import { z } from 'zod';
    // import Row from '~/components/section/admin/room-fond/RowRooms.vue';
    // import Table from '~/components/section/admin/room-fond/TableRooms.vue';

    definePageMeta({
        isAdmin: true,
    })

    const {
        sortElements,
        selectSort,
        dropSort
    } = useSorters('rooms');

    const visiblePopupCreate = ref(false);
    const visiblePopupEdit = ref(false);
    const displayState = ref('frame');
    const roomDisplayState = ref('rows');


    const roomBuildingList = ref([]);
    const roomBuildingListRef = ref([]);

    const getRoomBuilding=async()=>{
        const res = await getData('/hotel/room-building');
        roomBuildingList.value = res.results;
    };
    
    const createRoomBuilding=async()=>{
        await sendData({name: 'Не указано', levels: 0}, '/hotel/room-building');
        await getRoomBuilding();
    };

    const updateSchema = z.object({
        name: z.string().min(1),
        levels: z.string().min(1)
    });

    const handleUpdateRoomBuilding=async()=>{
        roomBuildingListRef.value.map(async(form: HTMLFormElement)=>{
            const id = Number(form.dataset.id);
            await validate(form, updateSchema,()=>{});
            const body = {};
            body.name = (form.elements.name as HTMLInputElement).value;
            body.levels = Number((form.elements.levels as HTMLInputElement).value);
            await sendData(body, `/hotel/room-building/${id}`, 'PATCH');
        });
    };

    const deleteRoomBuilding=async(id: Number)=>{
        await getData(`/hotel/room-building/${id}`, 'DELETE');
        getRoomBuilding();
    };



    onMounted(()=>{
        getRoomBuilding();
    });

</script>


<template>
    <section>
        <div class="admin-room-fond-section">

            <div class="admin-room-fond-section__container container_admin">
                <div class="admin-room-fond-section__header">

                    <div class="admin-section__title-block">
                        <span class="admin-section__title-block__title">Номерной фонд</span>
                        <div class="admin-section__title-block__btns-block" v-if="displayState === 'rooms'">
                            <div class="admin-room-fond-section__header__small-button">
                                <ElementIconButton
                                    size='basic'
                                    color='transparent-secondary'
                                    :state="roomDisplayState === 'rows' ? 'active' : ''"
                                    @click="roomDisplayState = 'rows'"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" viewBox="0 0 28 29" fill="none">
                                        <path d="M24.5 23.8333C24.5 24.4777 23.9777 25 23.3333 25L4.66667 25C4.02232 25 3.5 24.4777 3.5 23.8333L3.5 20.7184C3.5 20.0741 4.02232 19.5518 4.66667 19.5518H23.3333C23.9777 19.5518 24.5 20.0741 24.5 20.7184V23.8333Z" fill="#2D3033"/>
                                        <path d="M24.5 8.27342C24.5 8.91777 23.9777 9.44009 23.3333 9.44009L4.66667 9.44008C4.02232 9.44008 3.5 8.91777 3.5 8.27342L3.5 5.16667C3.5 4.52232 4.02232 4 4.66667 4L23.3333 4C23.9777 4 24.5 4.52232 24.5 5.16667V8.27342Z" fill="#2D3033"/>
                                        <path d="M24.5 16.0567C24.5 16.701 23.9777 17.2234 23.3333 17.2234L4.66667 17.2234C4.02232 17.2234 3.5 16.701 3.5 16.0567L3.5 12.9418C3.5 12.2975 4.02232 11.7751 4.66667 11.7751L23.3333 11.7751C23.9777 11.7751 24.5 12.2975 24.5 12.9418L24.5 16.0567Z" fill="#2D3033"/>
                                    </svg>
                                </ElementIconButton>
                                <ElementIconButton
                                    size='basic'
                                    color='transparent-secondary'
                                    :state="roomDisplayState === 'cards' ? 'active' : ''"
                                    @click="roomDisplayState = 'cards'"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" viewBox="0 0 28 29" fill="none">
                                        <path d="M25.6673 15.6655V23.8333C25.6673 24.4777 25.145 25 24.5007 25H15.1673V15.6655H25.6673ZM12.834 15.6655V25H3.50065C2.85632 25 2.33398 24.4777 2.33398 23.8333V15.6655H12.834ZM12.834 4V13.3322H2.33398V5.16667C2.33398 4.52234 2.85632 4 3.50065 4H12.834ZM24.5007 4C25.145 4 25.6673 4.52234 25.6673 5.16667V13.3322H15.1673V4H24.5007Z" fill="#2D3033" fill-opacity="0.48"/>
                                    </svg>
                                </ElementIconButton>
                            </div>
                            <ElementButton
                                size='large'
                                @click="visiblePopupCreate = true"
                            >
                                <span class="admin-room-fond-section__header__button">Создать</span>
                            </ElementButton>
                        </div>
                    </div>

                    <div class="admin-room-fond-section__choose-category">
                        <ElementButton
                            size='basic'
                            color="outlined"
                            @click="displayState = 'frame'"
                            :state="displayState === 'frame' ? 'active' : undefined"
                        >Корпуса и этажи
                        </ElementButton>
                        
                        <ElementButton
                            size='basic'
                            color="outlined"
                            @click="displayState = 'rooms'"
                            :state="displayState === 'rooms' ? 'active' : undefined"
                        >Комнаты
                        </ElementButton>
                    </div>

                    <div class="admin-section__title-block__filters-block" v-if="displayState === 'rooms'">
                        <div class="admin-section__filters-block__sort">
                            
                            <div class="admin-section__filters-block__sort__elem" v-for="elem in sortElements" :key="elem.title">
                                <span class="title">{{ elem.title }}</span>
                                <Dropdown menu-side="left">
                                    <template #header>
                                        <ElementLink
                                            color="neutral"
                                            chevron="right"
                                        >{{ elem.variants.find(variant=>variant.state === 'active')?.text }}
                                        </ElementLink>
                                    </template>
                                    <div class="dropdown__option" v-for="(variant, index) in elem.variants">
                                        <ElementOption
                                            type="ghost"
                                            :on-click="()=>selectSort(variant, elem.variants)"
                                            :state="variant.state"
                                        >{{ variant.text }}
                                        </ElementOption><hr>
                                    </div>
                                </Dropdown>
                            </div>
                            
                            <ElementLink
                                size='basic'
                                color='transparent'
                                @click="dropSort"
                            >
                                Сбросить
                            </ElementLink>
    
                        </div>
                    </div>

                </div>

                <div class="admin-room-fond-section__frame-body" v-if="displayState === 'frame'">
                    <div class="admin-room-fond-section__frame-body__items">
                        <form v-for="(item, index) in roomBuildingList" 
                            @submit="(e)=>e.preventDefault()"
                            class="admin-room-fond-section__frame-body__items__item"
                            :data-id="item.id"
                            :key="item.id" 
                            ref="roomBuildingListRef" 
                            ref_for>
                            <ElementInput
                                :id="'admin-room-fond-frame-name' + item.id"
                                fake-placeholder="Название корпуса"
                                name="name"
                                :new-value="item.name"
                            />
                            <ElementCounter
                                :id="'admin-room-fond-frame-floors' + item.id"
                                fake-placeholder="Количество этажей"
                                name="levels"
                                :updated-value="item.levels"
                            />
                            <ElementIconButton
                                size="large"
                                color="transparent-secondary"
                                :state="index === 0 ? 'disabled' : ''"
                                @click="index === 0 ? '' : deleteRoomBuilding(item.id)"
                            ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M6.16732 4.99992V1.49992C6.16732 0.855592 6.68966 0.333252 7.33398 0.333252H16.6673C17.3117 0.333252 17.834 0.855592 17.834 1.49992V4.99992H23.6673V7.33325H21.334V22.4999C21.334 23.1443 20.8117 23.6666 20.1673 23.6666H3.83398C3.18966 23.6666 2.66732 23.1443 2.66732 22.4999V7.33325H0.333984V4.99992H6.16732ZM8.50065 2.66659V4.99992H15.5007V2.66659H8.50065Z" fill="#2D3033" fill-opacity="0.48"/>
                            </svg>
                            </ElementIconButton>
                        </form>
                        <ElementIconButton
                            size="large"
                            color='transparent'
                            @click="createRoomBuilding()"
                        ><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <path d="M12.834 12.8333V5.83325H15.1673V12.8333H22.1673V15.1666H15.1673V22.1666H12.834V15.1666H5.83398V12.8333H12.834Z" fill="#1C5BAD"/>
                        </svg>
                        </ElementIconButton>
                    </div>

                    <ElementButton
                        size='large'
                        @click="handleUpdateRoomBuilding()"
                    >Сохранить
                    </ElementButton>
                </div>

                <!-- <Row v-if="displayState === 'rooms' && activeDisplay === 'row'" />
                <Table v-if="displayState === 'rooms' && activeDisplay === 'table'" /> -->
                
            </div>
        
        </div>
    </section>

    <PopupSuitCreate 
        position="end"
        v-model:visible="visiblePopupCreate"
        header="subheader"
    />
    <PopupSuitCreate 
        position="end"
        v-model:visible="visiblePopupEdit"
        header="subheader"
    />
</template>

<style lang="scss">
    .admin-room-fond-section {
        &__header {
            @include df_fdc;
            gap: 1.5rem;
            grid-column: span 12;
            &__button {
                @include strong_1;
                color: $text-inverse;
            }
            &__small-button {
                @include df_ac;
            }
        }
        &__choose-category {
            @include df_ac;
            gap: .75rem;
        }
        &__frame-body {
            grid-column: span 6;
            @include df_fdc;
            gap: 3rem;
            &__items {
                @include df_fdc;
                gap: 1rem;
                &__item {
                    @include df_ac;
                    gap: .5rem;
                }
            }
        }
        &__table {
            grid-column: span 12;
            .table { 
                &__room {
                    min-width: 15rem;
                }
                &__category-room {
                    min-width: 25rem;
                }
                &__frame-room {
                    min-width: 20.25rem;
                }
                &__floor {
                    min-width: 7.5rem;
                }
                &__comment {
                    min-width: 20.25rem;
                }
            }
        }
    }
</style>