export function mobileState() {
    const currentlyMobile = ref(false);

    const updateWidth = () => {
        if (process.client) {
            currentlyMobile.value = window.innerWidth <= 768;
        }
    };

    onMounted(() => {
        updateWidth();
        window.addEventListener('resize', updateWidth);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', updateWidth);
    });

    return {
        currentlyMobile,
    };
}