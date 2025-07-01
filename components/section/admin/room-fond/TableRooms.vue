<script lang="ts" setup>
    import { useRoomFond } from '~/composables/admin/room-fond/rooms';
    import ItemGrid from './ItemGrid.vue';
import { useRooms } from '~/composables/admin/room-fond/newRoom';

    const {
        rooms
    } = useRooms()

</script>

<template>
    <div class="admin-room-fond-section__grid">
        <template v-for="conf in rooms">
            <ItemGrid 
                v-for="room in conf.rooms"
                :res="room"
            />
        </template>
    </div>
</template>

<style lang='scss'>
    .admin-room-fond-section {
        &__grid {
            grid-column: span 12;
            @include grid(4, 1rem);
        }
    }
</style>