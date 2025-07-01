<script setup lang="ts">
    import { VueScrollPicker  } from 'vue-scroll-picker'
    import "vue-scroll-picker/style.css";

    const props = defineProps<{
        id?: string,
        name?: string,
        fakePlaceholder?: string,
    }>();

    const inputValue = ref('');

    const timePickerRef = ref<HTMLDivElement | null>(null);
    const timePickerOpened = ref(false);

    const openTimePicker =()=> {
        timePickerOpened.value = true;
        if(!inputValue.value) inputValue.value = '__:__';
        document.addEventListener('mousedown', checkForClose);
    }

    const closeTimePicker =()=> {
        timePickerOpened.value = false;
        if(inputValue.value === '__:__') inputValue.value = '';
        document.removeEventListener('mousedown', checkForClose);
    }

    const checkForClose =(event: Event)=> {
        const target = event.target as HTMLDivElement;
        if(timePickerRef.value && !timePickerRef.value.contains(target)) closeTimePicker();
    }

    const hours: string[] = reactive([]);
    const minutes: string[] = reactive([]);

    let hour = 0;
    while (hour < 24) {
        let hourStr = hour.toString();
        if(hourStr.length == 1) hourStr = '0' + hourStr;
        hours.push(hourStr);
        hour = hour + 1;
    };
    let minute = 0;
    while (minute < 59) {
        let minuteStr = minute.toString();
        if(minuteStr.length == 1) minuteStr = '0' + minuteStr;
        minutes.push(minuteStr);
        minute = minute + 5;
    };

    let selectedHour = ref('12');
    let selectedMinute = ref('30');

    function updateInputValue(){
        const splittedValue = inputValue.value.split(':');

        if(!!selectedHour.value) splittedValue[0] = selectedHour.value;
        if(!!selectedMinute.value) splittedValue[1] = selectedMinute.value;

        inputValue.value = splittedValue[0]+':'+splittedValue[1];
    }

    function handleUpdateHour(value: VueScrollPickerValue | undefined) {
        selectedHour.value = value;
        updateInputValue();
    }

    function handleUpdateMinute(value: VueScrollPickerValue | undefined) {
        selectedMinute.value = value;
        updateInputValue();
    }

    

</script>

<template>
    <div class="time-picker" ref="timePickerRef">
        <ElementInput
            @click=openTimePicker
            :id=id
            :name=name
            :fake-placeholder="fakePlaceholder"
            readonly
            :new-value="inputValue"
            icon='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM13 12V7H11V14H17V12H13Z" fill="#2D3033" fill-opacity="0.32"/>
                </svg>'
        />
        <Transition name="time-picker-menu">
            <div class="time-picker__menu" v-if=timePickerOpened>
                <div class="time-picker__menu__numbers" ref="hoursBlockRef">
                    <VueScrollPicker
                        :options="hours"
                        :model-value="selectedHour"
                        @update:model-value="handleUpdateHour"
                    />
                </div>
                <span>:</span>
                <div class="time-picker__menu__numbers" ref="minutesBlockRef">
                    <VueScrollPicker
                        :options="minutes"
                        :model-value="selectedMinute"
                        @update:model-value="handleUpdateMinute"
                    />
                </div>
            </div>
        </Transition>
    </div>
</template>

<style lang="scss">
    .time-picker {
        position: relative;
        @include df_fdc;
        max-width: 17.5rem;
        &__menu {
            position: absolute;
            top: 4.25rem;
            left: 0;
            z-index: 20;
            @include df_ac;
            gap: 1rem;
            padding: 1rem;
            width: 100%;
            height: 12.35rem;
            border-radius: .5rem;
            // background-color: $bg-inverse-transparent-4;
            background-color: $bg-primary;
            overflow: hidden;
            @include heading_1;
            @include mobile {
                padding: .75rem;
                border-radius: .375rem;
            }
            &__numbers {
                @include df_fdc_ac;
                gap: 1rem;
                @include wh_100;
                color: $text-primary-transparent-32;
                overflow-y: scroll;
                scroll-snap-type: y mandatory;
                user-select: none;
                cursor: grab;
                &::-webkit-scrollbar {
                    width: 0;
                }
                &__number {
                    display: flex;
                    scroll-snap-align: center;
                    @include transition(color);
                    &[data-state="active"] {
                        color: $text-primary;
                    }
                }
            }
        }
        .vue-scroll-picker-layer-top,
        .vue-scroll-picker-layer-bottom {
            display: none;
        }
        .vue-scroll-picker-item {
            color: $text-primary-transparent-32;
            // @include heading_1;
            &[aria-selected="true"] {
                color: $text-primary;
            }
        }
    }

    .time-picker-menu-enter-active,
    .time-picker-menu-leave-active {
        @include transition(opacity, transform);
    }

    .time-picker-menu-enter-from,
    .time-picker-menu-leave-to {
        opacity: 0;
        transform: translateY(-2rem);
    }
</style>