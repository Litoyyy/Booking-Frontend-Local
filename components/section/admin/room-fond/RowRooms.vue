<script lang="ts" setup>
    import { useRooms } from '~/composables/admin/room-fond/newRoom';

    const {
        rooms,
        toggleRoomActive,
        options,
        checkedAll,
    } = useRooms()

</script>

<template>
    <div class="admin-room-fond-section__table">
        <table 
            class="table" 
            table="columns">
            <thead class="table__head">
                <tr>
                    <th class="table__t1 table__year table_tac" rowspan="2">
                        <ElementCheckbox
                            :checked="checkedAll"
                            :on-update="() => toggleRoomActive('all')"
                            id="table-head-checkbox"
                        />
                    </th>
                    <th class="table__t2 table__t2_heading table__room gap-4 h-100">
                        <span>№ комнаты</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15" fill="none">
                            <path d="M13.8333 0.5L17.1667 4.66667H14.6667V14.6667H13V4.66667H10.5L13.8333 0.5ZM9.66667 13V14.6667H0.5V13H9.66667ZM9.66667 7.16667V8.83333H0.5V7.16667H9.66667ZM8 1.33333V3H0.5V1.33333H8Z" fill="#2D3033" fill-opacity="0.32"/>
                        </svg>
                    </th>
                    <th class="table__t2 table__t2_heading table__category-room">
                        Категория номера
                    </th>
                    <th class="table__t2 table__t2_heading table__frame-room">
                        Корпус
                    </th>
                    <th class="table__t2 table__t2_heading table__floor">
                        Этаж
                    </th>
                    <th class="table__t2 table__t2_heading table__comment">
                        Комментарий
                    </th>
                    <th class="table__drag">
                        <ElementIconButton
                            size="small"
                            color="transparent-secondary"
                            disabled
                            ghost
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#2D3033" fill-opacity="0.32"/>
                            </svg>
                        </ElementIconButton>
                    </th>
                </tr>
            </thead>
            <tbody class="table__body">
                <template v-for="conf in rooms">

                    <tr 
                        v-for="room in conf.rooms"
                        :key="room.idRoom">
                        <td>
                            <ElementCheckbox 
                                :id="`table-checkbox-${room.idRoom}`"
                                :checked="room.active"
                                :on-update="() => toggleRoomActive(room.idRoom)"
                            />
                        </td>
                        <td class="table__t1">
                            {{ room.roomNumber }}
                        </td>
                        <td class="table__t1 table__t1_tp">
                            {{ room.categoryRoom }}
                        </td>
                        <td class="table__t1 table__t1_tp">
                            {{ conf.frame }}
                        </td>
                        <td class="table__t1 table__t1_tp">
                            {{ room.floor }}
                        </td>
                        <td class="table__t1 table__t1_tp">
                            {{ conf.comment }}
                        </td>
                        <td class="table__drag">
                            <Dropdown
                                menu-side='left'
                            >
                                <template #header>
                                    <ElementIconButton
                                        size="small"
                                        color="transparent-secondary"
                                        disabled
                                        ghost
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#2D3033" fill-opacity="0.32"/>
                                        </svg>
                                    </ElementIconButton>
                                </template>
                                <ElementOption 
                                    v-for="{ name, fun } in options"
                                    @click="fun(room.idRoom)"
                                >
                                    {{ name }}
                                </ElementOption>
                            </Dropdown>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss">

</style>