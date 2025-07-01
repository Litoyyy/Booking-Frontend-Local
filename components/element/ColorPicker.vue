<script setup lang="ts">
    const props = defineProps<{
        id?: string,
        name?: string,
        size?: 'large' | 'small',
        color?: string
    }>();

    const active = defineModel<boolean>('active');
</script>

<template>
    <label class="color-picker"
        :for="props.id"
        :style="{ backgroundColor: props.color }"
        :data-size="props.size || 'large'"
    >
    <input type="radio"
        :id="props.id"
        :name="props.name"
        v-model="active"
        :checked="active"
    />
    </label>
</template>

<style lang="scss">
    .color-picker {
        display: flex;
        height: 100%;
        aspect-ratio: 1;
        outline-style: solid;
        outline-color: rgba(255, 255, 255, 0);
        cursor: pointer;

        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;

        input {
            opacity: 0;
            width: 100%;
        }
        &[data-size="large"] {
            max-height: 4rem;
            border-radius: .5rem;
            outline-width: 2px;
            outline-offset: 2px;
            margin: .25rem;
        }
        &[data-size="small"] {
            max-height: 1.25rem;
            outline-width: 1px;
            outline-offset: 1px;
            margin: .125rem;
        }
        &:hover {
            outline-color: $border-primary-transparent-16;
        }
        &:has(input:checked) {
            outline-color: $border-primary;
        }
    }
</style>