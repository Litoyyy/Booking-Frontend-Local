export function getRem() {
    const fontSize = ref('');
    onMounted(()=>{
        const element = document.querySelector("html");
        fontSize.value = window.getComputedStyle(element).fontSize;
        const numericFontSize = parseInt(fontSize, 10);
    });
    return fontSize.value.slice(0, -2);
};
