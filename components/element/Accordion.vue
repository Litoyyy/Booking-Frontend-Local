<script lang="ts" setup>
    const props = defineProps<{
        family?: string,
        type?: 'question' | 'default',
        state?: 'active' | '' | 'opened',
    }>();

    const accordionBody = ref<HTMLElement | null>(null);
    const accordionContent = ref<HTMLElement | null>(null);

    const emit = defineEmits<{
        (event: "update:state", value: string): void;
    }>();

    const updateMaxHeight = () => {
        if (accordionBody.value && accordionContent.value) {
            if(props.state === '') return;
            accordionBody.value.style.maxHeight = accordionContent.value.scrollHeight + 'px';
        };
    };

    const handleAccordion=()=>{
        if(props.state === 'active' || props.state === 'opened') {
            emit("update:state", '');
        } else {
            emit("update:state", 'active');
        };
    };
    
    watch(
        ()=>props.state,
        (newValue)=>{
            if(!accordionBody.value || !accordionContent.value) return;
            if(newValue === 'active' || props.state === 'opened') {
                updateMaxHeight();
            } else {
                accordionBody.value.style.maxHeight = '';
            };
        }
    );

    let resizeObserver: ResizeObserver | null = null;

    onMounted(() => {
        if (accordionContent.value) {
            if(props.state === 'active' || props.state === 'opened') updateMaxHeight();
            
            resizeObserver = new ResizeObserver(() => {
                updateMaxHeight();
            });

            resizeObserver.observe(accordionContent.value);
        }
    });

    onBeforeUnmount(() => {
        if (resizeObserver) {
            resizeObserver.disconnect();
        };
    });
</script>

<template>
    <div class="accordion-item">
        <div class="accordion-item__header" @click="handleAccordion" :data-family="props.family">
            <slot name="header"/>
        </div>
        <div class="accordion-item__body" ref="accordionBody">
            <div class="accordion-item__content" ref="accordionContent">
                <slot />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .accordion-item {
        cursor: pointer;

        &__body {
            max-height: 0;
            overflow-y: hidden;
            transition: max-height 0.3s ease;
        }
    }
</style>
