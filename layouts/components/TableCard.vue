<script lang="ts" setup>
    const slots = useSlots();

    const props = defineProps<{
        checked?: boolean,
        id?: string,
        onChange?: (checked: boolean)=>void,

        draggable?: boolean,
        allDraggable?: Array<HTMLDivElement>,
        dragZone?: HTMLDivElement,
        curIndex?: number
    }>();

</script>

<template>
    <div class="table-card">
        <div class="table-card__header">
            <div class="table-card__header__drag-block" v-if="!$slots.header_title">
                <CardDragElem
                    :allDraggable="allDraggable"
                    :dragZone="dragZone"
                    :curIndex="curIndex"
                    v-if="draggable"
                />
                <ElementToggle :id="`table-card-toggle-${id}`"
                    :on-change="onChange"
                    :checked="checked"
                />
            </div>
            <div class="table-card__header__title-block" v-else>
                <slot name="header_title" />
            </div>
            <div class="table-card__header__button-block">
                <ElementIconButton size="small" color="transparent-secondary" :ghost="true" v-if="!$slots.icon_button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#2D3033" fill-opacity="0.32"/>
                    </svg>
                </ElementIconButton>
                <slot name="icon_button" />
                <slot name="extra_button" />
            </div>
        </div>
        <slot />
    </div>
</template>

<style lang="scss" scoped>
    .table-card {
        @include df_fdc;
        gap: 1.5rem;
        padding: 1.5rem;
        border-radius: .5rem;
        background-color: $bg-primary;
        border: 1px solid $border-primary-subdued-8;
        &::v-deep(.table-card__name) {
            @include heading_3;
        }
        &__header {
            @include df_jb_ac;
            &__drag-block {
                @include df_ac;
                gap: .75rem;
                &::v-deep(.popover) {
                    width: 1.5rem;
                    height: 1.5rem;
                }
                .popover {
                    svg {
                        @include wh_100;
                    }
                }
            }
            &__button-block {
                @include df_ac;
                gap: .25rem;
            }
        }
    }
</style>