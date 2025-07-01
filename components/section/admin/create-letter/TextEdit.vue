<script lang="ts" setup>
import Dropdown from '~/components/Dropdown.vue'

const { keyValue } = defineProps<{
    keyValue?: { [key: string]: any } | null | undefined
}>()

let observer = null

// =======================
// Состояния и переменные 
// =======================

const modelValue = defineModel()

const localContent = ref(modelValue.value || '')

watch(()=>modelValue, (newVal) => {
    if (newVal !== localContent.value) {
        localContent.value = newVal
    }
})

type FontSizeName =
    | 'Extra small'
    | 'Small'
    | 'Regular'
    | 'Medium'
    | 'Large'
    | 'Extra large'
    | 'Big'

interface FontSize {
    name: string
    id: number
    value: number
}

interface Symbol {
    title: string
}

interface Color {
    hex: string
}

// =======================
// Состояния и переменные
// =======================

const editor = ref<HTMLElement | null>(null)

let savedRange: Range | null = null

const isBold = ref(false)
const isItalic = ref(false)
const isUnderline = ref(false)
const isStrikeThrough = ref(false)

const isAlignLeft = ref(false)
const isAlignCenter = ref(false)
const isAlignRight = ref(false)
const isAlignJustify = ref(false)

const isOrderedList = ref(false)
const isUnorderedList = ref(false)

const currentTagPath = ref('')

const activeColorText = ref('')
const activeColorBackground = ref('')

const isResizing = ref(false)
let startY = 0
let startHeight = 0

// =======================
// Массивы данных
// =======================

const arrayFontSize: FontSize[] = [
    { name: 'Extra small', id: 1, value: 1 },
    { name: 'Small', id: 2, value: 2 },
    { name: 'Regular', id: 3, value: 3 },
    { name: 'Medium', id: 4, value: 4 },
    { name: 'Large', id: 5, value: 5 },
    { name: 'Extra large', id: 6, value: 6 },
    { name: 'Big', id: 7, value: 7 }
]

const arraySymbols: Symbol[] = [
    { title: '«' },
    { title: '»' }
]

const colors: Color[] = [
    { hex: '#1E5EBE' }, { hex: '#B25A17' }, { hex: '#B09318' },
    { hex: '#66A421' }, { hex: '#00B42A' }, { hex: '#00BA64' },
    { hex: '#00C4A6' }, { hex: '#0091FF' }, { hex: '#0633CB' },
    { hex: '#681FDB' }, { hex: '#B336D6' }, { hex: '#C0204D' }
]

// =======================
// Общие утилиты
// =======================

function rgbToHex(rgb: string): string {
    const result = rgb.match(/\d+/g)
    if (!result || result.length < 3) return ''
    const r = parseInt(result[0]).toString(16).padStart(2, '0')
    const g = parseInt(result[1]).toString(16).padStart(2, '0')
    const b = parseInt(result[2]).toString(16).padStart(2, '0')
    return `#${r}${g}${b}`.toUpperCase()
}

// =======================
// Работа с выделением
// =======================

function saveSelection() {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
        savedRange = selection.getRangeAt(0).cloneRange()
    }
}

function restoreSelection() {
    if (savedRange) {
        const selection = window.getSelection()
        if (selection) {
            selection.removeAllRanges()
            selection.addRange(savedRange)
        }
    }
}

// =======================
// Работа с форматированием
// =======================

function formatExec(cmd: string, value: string | null = null, color?: string) {
    const el = editor.value
    if (!el) return

    el.focus()
    restoreSelection()

    if (color && (cmd === 'foreColor' || cmd === 'hiliteColor')) {
        document.execCommand(cmd, false, color)
    } else if (value) {
        document.execCommand(cmd, false, value)
    } else {
        document.execCommand(cmd, false)
    }

    restoreSelection()
    saveSelection()
    updateToolbarStates()
    updateTagPath()
    updateActiveColors()
}

function applyColor(cmd: 'foreColor' | 'hiliteColor', color: string) {
    const el = editor.value
    if (!el) return

    el.focus()
    restoreSelection()
    document.execCommand(cmd, false, color)
    saveSelection()
    updateActiveColors()
}

function setActiveFontSize(size: FontSizeName) {
    const selectedFontSize = arrayFontSize.find(value => size === value.name)
    if (!selectedFontSize) return
    formatExec('fontSize', selectedFontSize.value.toString())
}

// =======================
// Работа с символами
// =======================

function insertTextSymbol(symbol: string) {
    const el = editor.value
    if (!el) return

    el.focus()
    restoreSelection()

    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)
    range.deleteContents()
    const textNode = document.createTextNode(symbol)
    range.insertNode(textNode)
    range.setStartAfter(textNode)
    range.setEndAfter(textNode)

    selection.removeAllRanges()
    selection.addRange(range)

    saveSelection()
    updateToolbarStates()
    updateTagPath()
}

// =======================
// Обновление состояний тулбара
// =======================

function updateToolbarStates() {
    isBold.value = document.queryCommandState('bold')
    isItalic.value = document.queryCommandState('italic')
    isUnderline.value = document.queryCommandState('underline')
    isStrikeThrough.value = document.queryCommandState('strikeThrough')

    const align = document.queryCommandValue('justifyCenter') === 'true' ? 'center' :
        document.queryCommandValue('justifyRight') === 'true' ? 'right' :
        document.queryCommandValue('justifyFull') === 'true' ? 'justify' :
        'left'

    isAlignLeft.value = align === 'left'
    isAlignCenter.value = align === 'center'
    isAlignRight.value = align === 'right'
    isAlignJustify.value = align === 'justify'

    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) {
        isOrderedList.value = false
        isUnorderedList.value = false
        return
    }

    let node: Node | null = selection.anchorNode
    if (node && node.nodeType === Node.TEXT_NODE) {
        node = node.parentNode
    }

    isOrderedList.value = false
    isUnorderedList.value = false
    while (node && node !== editor.value) {
        if (node instanceof HTMLElement) {
            if (node.tagName === 'OL') {
                isOrderedList.value = true
                break
            }
            if (node.tagName === 'UL') {
                isUnorderedList.value = true
                break
            }
        }
        node = node?.parentNode
    }
}

function updateTagPath() {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) {
        currentTagPath.value = ''
        return
    }

    let node: Node | null = selection.anchorNode
    if (!node) return

    if (node.nodeType === Node.TEXT_NODE) {
        node = node.parentNode
    }

    const path: string[] = []
    while (node && node !== editor.value) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            path.unshift((node as HTMLElement).tagName.toLowerCase())
        }
        node = node.parentNode
    }

    if (editor.value) {
        path.unshift(editor.value.tagName.toLowerCase())
    }

    currentTagPath.value = path.join(' > ')
}

function updateActiveColors() {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)
    let node = range.startContainer as HTMLElement
    if (node.nodeType === Node.TEXT_NODE) {
        node = node.parentElement as HTMLElement
    }

    if (node) {
        const styles = window.getComputedStyle(node)
        activeColorText.value = rgbToHex(styles.color)
        activeColorBackground.value = rgbToHex(styles.backgroundColor)
    }

    saveSelection()
}

// =======================
// Обработка выделения
// =======================

function onSelectionChange() {
    saveSelection()
    updateToolbarStates()
    updateTagPath()
    updateActiveColors()
}

// =======================
// Изменение размера редактора
// =======================

function onMouseDownResize(e: MouseEvent) {
    e.preventDefault()
    if (!editor.value) return
    isResizing.value = true
    startY = e.clientY
    startHeight = editor.value.offsetHeight

    document.addEventListener('mousemove', onMouseMoveResize)
    document.addEventListener('mouseup', onMouseUpResize)
}

function onMouseMoveResize(e: MouseEvent) {
    if (!isResizing.value || !editor.value) return
    const delta = e.clientY - startY
    editor.value.style.height = `${Math.max(100, startHeight + delta)}px`
}

function onMouseUpResize() {
    isResizing.value = false
    document.removeEventListener('mousemove', onMouseMoveResize)
    document.removeEventListener('mouseup', onMouseUpResize)
}

onBeforeUnmount(() => {
    document.removeEventListener('mousemove', onMouseMoveResize)
    document.removeEventListener('mouseup', onMouseUpResize)
})

// =======================
// Состояния для insertLink
// =======================

const wrapper = ref<HTMLElement | null>(null)
const showPopup = ref<boolean>(false)
const urlInput = ref<string>('')
const popupPosition = ref<{ x: string; y: string }>({ x: '0px', y: '0px' })

function openLinkInput() {
    if (!savedRange || savedRange.collapsed || !wrapper.value) return

    const rect = savedRange.getBoundingClientRect()
    const containerRect = wrapper.value.getBoundingClientRect()

    popupPosition.value = {
        x: `${rect.left - containerRect.left}px`,
        y: `${rect.bottom - containerRect.top + 5}px`
    }

    urlInput.value = ''
    showPopup.value = true
}

function insertLink() {
    if (!savedRange || !urlInput.value.trim()) {
        showPopup.value = false
        return
    }

    const link = document.createElement('a')
    const href = urlInput.value.trim()
    link.href = href.startsWith('http') ? href : `https://${href}`
    link.textContent = savedRange.toString()
    link.target = '_blank'
    link.rel = 'noopener noreferrer'

    savedRange.deleteContents()
    savedRange.insertNode(link)
    showPopup.value = false
}

function removeLink() {
    if (!savedRange) return

    const selection = window.getSelection()
    if (!selection) return

    const container = document.createElement('div')
    container.appendChild(savedRange.cloneContents())

    const link = container.querySelector('a')
    if (!link) return

    const textNode = document.createTextNode(link.textContent || '')
    savedRange.deleteContents()
    savedRange.insertNode(textNode)

    showPopup.value = false
}

// =======================
// Вывод текста чтоб показать как будет выглядеть, вывод переменных
// =======================

const rawText = ref<HTMLElement | null>(null)

const replacements = keyValue ? keyValue : {}
const arrayKeys = ref<Array<string>>(keyValue ? Object.keys(keyValue) : [''])

function renderWithHighlights(str: string): string {
  
    return str.replace(/#(\w+)/g, (_, tag) => {
        const value = replacements[tag]
        if (value) {
            return `${value}`
        }
        return `#${tag}`
    })
}

const onInput = () => {
    if (!editor.value) return

    const text = editor.value.innerHTML

    const highlighted = renderWithHighlights(text)

    rawText.value = highlighted

    moveCaretToEnd(editor.value)

    modelValue.value = rawText.value
}

function moveCaretToEnd(el: HTMLElement) {
    const range = document.createRange()
    const sel = window.getSelection()
    range.selectNodeContents(el)
    range.collapse(false)
    sel?.removeAllRanges()
    sel?.addRange(range)
}

onMounted(() => {
    observer = new MutationObserver(() => {
        onInput()
    })

    if (editor.value) {
        observer.observe(editor.value, {
            childList: true,
            characterData: true,
            subtree: true
        }) 
    }
})

onBeforeUnmount(() => {
    if (observer) observer.disconnect()
})


</script>

<template>
    <div 
        class="text-letter__appeal__container"
        ref="wrapper">
        <div class="text-letter__appeal__buttons">

            <!-- back/go -->
            <div class="text-letter__appeal__buttons__row">

                <!-- back -->
                <div class="text-letter__appeal__buttons__row__item" @click="formatExec('undo')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5.82843 6.99858L8.36396 9.53412L6.94975 10.9483L2 5.99858L6.94975 1.04883L8.36396 2.46305L5.82843 4.99858H13C17.4183 4.99858 21 8.5803 21 12.9986C21 17.4168 17.4183 20.9986 13 20.9986H4V18.9986H13C16.3137 18.9986 19 16.3123 19 12.9986C19 9.68487 16.3137 6.99858 13 6.99858H5.82843Z"  />
                    </svg>
                </div>
            
                <!-- go -->
                <div class="text-letter__appeal__buttons__row__item" @click="formatExec('redo')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18.1716 6.99858H11C7.68629 6.99858 5 9.68487 5 12.9986C5 16.3123 7.68629 18.9986 11 18.9986H20V20.9986H11C6.58172 20.9986 3 17.4168 3 12.9986C3 8.5803 6.58172 4.99858 11 4.99858H18.1716L15.636 2.46305L17.0503 1.04883L22 5.99858L17.0503 10.9483L15.636 9.53412L18.1716 6.99858Z"  />
                    </svg>
                </div>

            </div>

            <!-- align -->
            <div class="text-letter__appeal__buttons__row">
                
                <!-- align: left -->
                <div 
                    class="text-letter__appeal__buttons__row__item" 
                    :class="{ active: isAlignLeft }"
                    @click="formatExec('justifyLeft')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M3 4H21V6H3V4ZM3 19H17V21H3V19ZM3 14H21V16H3V14ZM3 9H17V11H3V9Z"  />
                    </svg>
                </div>

                <!-- align: center -->
                <div 
                    class="text-letter__appeal__buttons__row__item" 
                    :class="{ active: isAlignCenter }"
                    @click="formatExec('justifyCenter')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M3 4H21V6H3V4ZM5 19H19V21H5V19ZM3 14H21V16H3V14ZM5 9H19V11H5V9Z"  />
                    </svg>
                </div>

                <!-- align: right -->
                <div 
                    class="text-letter__appeal__buttons__row__item" 
                    :class="{ active: isAlignRight }"
                    @click="formatExec('justifyRight')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M3 4H21V6H3V4ZM7 19H21V21H7V19ZM3 14H21V16H3V14ZM7 9H21V11H7V9Z"  />
                    </svg>
                </div>

                <!-- align: center-full -->
                <div 
                    class="text-letter__appeal__buttons__row__item" 
                    :class="{ active: isAlignJustify }"
                    @click="formatExec('justifyFull')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M3 4H21V6H3V4ZM3 19H21V21H3V19ZM3 14H21V16H3V14ZM3 9H21V11H3V9Z"  />
                    </svg>
                </div>

            </div>

            <!-- text-effect -->
            <div class="text-letter__appeal__buttons__row">

                <!-- effect: bold -->
                <div 
                    class="text-letter__appeal__buttons__row__item" 
                    :class="{ active: isBold }"
                    @click="formatExec('bold')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" >
                        <path d="M8 11H12.5C13.8807 11 15 9.88071 15 8.5C15 7.11929 13.8807 6 12.5 6H8V11ZM18 15.5C18 17.9853 15.9853 20 13.5 20H6V4H12.5C14.9853 4 17 6.01472 17 8.5C17 9.70431 16.5269 10.7981 15.7564 11.6058C17.0979 12.3847 18 13.837 18 15.5ZM8 13V18H13.5C14.8807 18 16 16.8807 16 15.5C16 14.1193 14.8807 13 13.5 13H8Z" />
                    </svg>
                </div>

                <!-- effct: italic -->
                <div 
                    class="text-letter__appeal__buttons__row__item" 
                    :class="{ active: isItalic }"
                    @click="formatExec('italic')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 20H7V18H9.92661L12.0425 6H9V4H17V6H14.0734L11.9575 18H15V20Z"  />
                    </svg>
                </div>

                <!-- effect: underline -->
                <div 
                    class="text-letter__appeal__buttons__row__item" 
                    :class="{ active: isUnderline }"
                    @click="formatExec('underline')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M8 3V12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12V3H18V12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12V3H8ZM4 20H20V22H4V20Z"  />
                    </svg>
                </div>

                <!-- effect: crossed out -->
                <div 
                    class="text-letter__appeal__buttons__row__item" 
                    :class="{ active: isStrikeThrough }"
                    @click="formatExec('strikeThrough')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M17.1538 14C17.3846 14.5161 17.5 15.0893 17.5 15.7196C17.5 17.0625 16.9762 18.1116 15.9286 18.867C14.8809 19.6223 13.4335 20 11.5862 20C9.94674 20 8.32335 19.6185 6.71592 18.8555V16.6009C8.23538 17.4783 9.7908 17.917 11.3822 17.917C13.9333 17.917 15.2128 17.1846 15.2208 15.7196C15.2208 15.0939 15.0049 14.5598 14.5731 14.1173C14.5339 14.0772 14.4939 14.0381 14.4531 14H3V12H21V14H17.1538ZM13.076 11H7.62908C7.4566 10.8433 7.29616 10.6692 7.14776 10.4778C6.71592 9.92084 6.5 9.24559 6.5 8.45207C6.5 7.21602 6.96583 6.165 7.89749 5.299C8.82916 4.43299 10.2706 4 12.2219 4C13.6934 4 15.1009 4.32808 16.4444 4.98426V7.13591C15.2448 6.44921 13.9293 6.10587 12.4978 6.10587C10.0187 6.10587 8.77917 6.88793 8.77917 8.45207C8.77917 8.87172 8.99709 9.23796 9.43293 9.55079C9.86878 9.86362 10.4066 10.1135 11.0463 10.3004C11.6665 10.4816 12.3431 10.7148 13.076 11Z"  />
                    </svg>
                </div>
            </div>

            <!-- font-size -->
            <div class="text-letter__appeal__buttons__row max-h-70">
                <SelectDefault
                    placeholder="Размер"
                    readonly
                    name="font_size"
                    size='basic'
                    :options="arrayFontSize"
                    :class="'selece-text-edit'"
                    :on-update="(newValue?: string)=> { setActiveFontSize(newValue) }"
                />
                
            </div>

            <!-- list -->
            <div class="text-letter__appeal__buttons__row">
                
                <div 
                    class="text-letter__appeal__buttons__row__item" 
                    :class="{ active: isUnorderedList }"
                    @click="formatExec('insertUnorderedList')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M8 6V9H5V6H8ZM3 4V11H10V4H3ZM13 4H21V6H13V4ZM13 11H21V13H13V11ZM13 18H21V20H13V18Z"  />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3 13V20H10V13H3ZM8 18V15H5V18H8Z"  />
                    </svg>
                </div>
                
                <div 
                    class="text-letter__appeal__buttons__row__item" 
                    :class="{ active: isOrderedList }"
                    @click="formatExec('insertOrderedList')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5.81469 3.75H4.78178L3.31445 4.14317V5.69582L4.31447 5.42782L4.31463 8.75H3.06445V10.25H7.06445V8.75H5.81469V3.75ZM10.0645 4.25H21.0645V6.25H10.0645V4.25ZM10.0645 11.25H21.0645V13.25H10.0645V11.25ZM10.0645 18.25H21.0645V20.25H10.0645V18.25ZM2.93945 15.875C2.93945 14.7014 3.89084 13.75 5.06445 13.75C6.23806 13.75 7.18945 14.7014 7.18945 15.875C7.18945 16.3606 7.02628 16.8087 6.75192 17.1667L6.74716 17.1729L5.38032 18.75H7.06445V20.25H3.06457L3.06404 19.1286L5.53615 16.285C5.63175 16.1752 5.68945 16.0321 5.68945 15.875C5.68945 15.5298 5.40963 15.25 5.06445 15.25C4.73823 15.25 4.47018 15.5001 4.44192 15.8188L4.42955 16.125H2.93945V15.875Z"  />
                    </svg>
                </div>
            </div>

            <!-- степени -->
            <div class="text-letter__appeal__buttons__row">
                
                <!-- верхняя степень  -->
                <div class="text-letter__appeal__buttons__row__item" @click="formatExec('superscript')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5.59567 5L10.5 10.9283L15.4043 5H18L11.7978 12.4971L18 19.9943V20H15.4091L10.5 14.0659L5.59092 20H3V19.9943L9.20216 12.4971L3 5H5.59567ZM21.5507 6.5803C21.7042 6.43453 21.8 6.22845 21.8 6C21.8 5.55817 21.4418 5.2 21 5.2C20.5582 5.2 20.2 5.55817 20.2 6C20.2 6.07624 20.2107 6.14999 20.2306 6.21983L19.0765 6.54958C19.0267 6.37497 19 6.1906 19 6C19 4.89543 19.8954 4 21 4C22.1046 4 23 4.89543 23 6C23 6.57273 22.7593 7.08923 22.3735 7.45384L20.7441 9H23V10H19V9L21.5507 6.5803Z"  />
                    </svg>
                </div>

                <!-- нижняя степень -->
                <div class="text-letter__appeal__buttons__row__item" @click="formatExec('subscript')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5.59567 4L10.5 9.92831L15.4043 4H18L11.7978 11.4971L18 18.9943V19H15.4091L10.5 13.0659L5.59092 19H3V18.9943L9.20216 11.4971L3 4H5.59567ZM21.8 16C21.8 15.5582 21.4418 15.2 21 15.2C20.5582 15.2 20.2 15.5582 20.2 16C20.2 16.0762 20.2107 16.15 20.2306 16.2198L19.0765 16.5496C19.0267 16.375 19 16.1906 19 16C19 14.8954 19.8954 14 21 14C22.1046 14 23 14.8954 23 16C23 16.5727 22.7593 17.0892 22.3735 17.4538L20.7441 19H23V20H19V19L21.5507 16.5803C21.7042 16.4345 21.8 16.2284 21.8 16Z"  />
                    </svg>
                </div>
            </div>
            
            <!-- symbol -->
            <div class="text-letter__appeal__buttons__row">
                <div class="text-letter__appeal__buttons__row__item">
                    <Dropdown menu-side='right'>
                        <template #header>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M14 20V17.8432C15.8631 16.6512 17.5 13.9677 17.5 10.8844C17.5 7.8107 15.5 4.85516 12 4.85516C8.5 4.85516 6.5 7.8107 6.5 10.8844C6.5 13.9677 8.13687 16.6512 10 17.8432V20H3V18H7.7597C5.66635 16.5054 4 13.9889 4 10.8844C4 6.24653 7.5 3 12 3C16.5 3 20 6.24653 20 10.8844C20 13.9889 18.3336 16.5054 16.2403 18H21V20H14Z"  />
                            </svg>
                        </template>
                        <div class="dropdown__container">
                            <button 
                                class="dropdown__item"
                                v-for="{ title } in arraySymbols"
                                @click="insertTextSymbol(title)">
                                {{ title }}
                            </button>
                        </div>
                    </Dropdown>
                </div>
            </div>

            <!-- color  -->
            <div class="text-letter__appeal__buttons__row">
                <div class="text-letter__appeal__buttons__row__item">
                    <Dropdown menu-side='right'>
                        <template #header>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M15.2459 14H8.75407L7.15407 18H5L11 3H13L19 18H16.8459L15.2459 14ZM14.4459 12L12 5.88516L9.55407 12H14.4459ZM3 20H21V22H3V20Z"  />
                            </svg>
                        </template>
                        
                        <div class="dropdown__container-color">
                            <div 
                                class="dropdown__item-container"
                                v-for="{ hex } in colors"
                                @click="applyColor('foreColor', hex)"
                                :data-active="hex == activeColorText"
                            >
                                <div 
                                    :style="{
                                        backgroundColor: hex
                                    }"
                                    class="dropdown__item-color">
                                </div>
                            </div>
                        </div>

                    </Dropdown>
                </div>

                <div class="text-letter__appeal__buttons__row__item">
                    
                    <Dropdown menu-side='right'>
                        <template #header>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.15407 19.125L8.75407 15.125H15.2459L16.8459 19.125H19L13 4.12501H11L5 19.125H7.15407ZM12 7.01017L14.4459 13.125H9.55407L12 7.01017ZM22.5 1.5L1.5 1.5L1.5 22.5H22.5V1.5Z"  />
                            </svg>
                        </template>
                        
                        <div class="dropdown__container-color">
                            <div 
                                class="dropdown__item-container"
                                v-for="{ hex } in colors"
                                :key="hex"
                                @click="applyColor('hiliteColor', hex)"
                                :data-active="hex == activeColorBackground"
                            >

                                <div 
                                    :style="{
                                        backgroundColor: hex
                                    }"
                                    class="dropdown__item-color">
                                </div>

                            </div>
                        </div>

                    </Dropdown>

                </div>
            </div>

            <!-- links -->
            <div class="text-letter__appeal__buttons__row">
                <div 
                    class="text-letter__appeal__buttons__row__item"
                    @click="openLinkInput">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18.3643 15.5358L16.9501 14.1216L18.3643 12.7074C20.3169 10.7548 20.3169 7.58897 18.3643 5.63635C16.4117 3.68372 13.2458 3.68372 11.2932 5.63635L9.87898 7.05056L8.46477 5.63635L9.87898 4.22213C12.6127 1.48846 17.0448 1.48846 19.7785 4.22213C22.5122 6.9558 22.5122 11.3879 19.7785 14.1216L18.3643 15.5358ZM15.5358 18.3643L14.1216 19.7785C11.388 22.5121 6.9558 22.5121 4.22213 19.7785C1.48846 17.0448 1.48846 12.6126 4.22213 9.87899L5.63634 8.46477L7.05056 9.87899L5.63634 11.2932C3.68372 13.2458 3.68372 16.4116 5.63634 18.3643C7.58896 20.3169 10.7548 20.3169 12.7074 18.3643L14.1216 16.95L15.5358 18.3643ZM14.8287 7.75767L16.243 9.17188L9.17188 16.2429L7.75766 14.8287L14.8287 7.75767Z"  />
                    </svg>
                </div>

                <div 
                    class="text-letter__appeal__buttons__row__item"
                    @click="removeLink">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M17 17H22V19H19V22H17V17ZM7 7H2V5H5V2H7V7ZM18.364 15.5355L16.9497 14.1213L18.364 12.7071C20.3166 10.7545 20.3166 7.58866 18.364 5.63604C16.4113 3.68342 13.2455 3.68342 11.2929 5.63604L9.87868 7.05025L8.46447 5.63604L9.87868 4.22183C12.6123 1.48816 17.0445 1.48816 19.7782 4.22183C22.5118 6.9555 22.5118 11.3877 19.7782 14.1213L18.364 15.5355ZM15.5355 18.364L14.1213 19.7782C11.3877 22.5118 6.9555 22.5118 4.22183 19.7782C1.48816 17.0445 1.48816 12.6123 4.22183 9.87868L5.63604 8.46447L7.05025 9.87868L5.63604 11.2929C3.68342 13.2455 3.68342 16.4113 5.63604 18.364C7.58866 20.3166 10.7545 20.3166 12.7071 18.364L14.1213 16.9497L15.5355 18.364ZM14.8284 7.75736L16.2426 9.17157L9.17157 16.2426L7.75736 14.8284L14.8284 7.75736Z"  />
                    </svg>
                </div>
            </div>

        </div>

        <p class="text-letter__appeal__textarea" 
            contenteditable
            ref="editor"
            @input="onInput"
            @mouseup="onSelectionChange"
            @keyup="onSelectionChange"></p>

        <div
            v-if="showPopup"
            class="text-letter__appeal__link-input"
            :style="{ top: popupPosition.y, left: popupPosition.x }">
            <input 
                v-model="urlInput"
                @keydown.enter.prevent="insertLink"
                class="text-letter__appeal__link-input__input"
                type="text"
                placeholder="Введите ссылку"
                autofocus>
        </div>

        <div class="text-letter__appeal__bottom-handle">
            <span class="text-letter__appeal__bottom-handle__text">Теги: {{ currentTagPath }}</span>
            <div
                class="text-letter__appeal__bottom-handle__handler"
                @mousedown="onMouseDownResize"
                >
                <svg class="nwse-resize" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M9.19531 29.6509L29.6763 9.16992V12.9617L12.9612 29.6768L9.19531 29.6509Z"  fill-opacity="0.32"/>
                    <path d="M18.1953 29.6509L29.6763 18.1699V21.9617L21.9612 29.6768L18.1953 29.6509Z"  fill-opacity="0.32"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M29.6763 27.1699L27.1953 29.6509L29.6763 29.668V27.1699Z"  fill-opacity="0.32"/>
                </svg>
            </div>
        </div>
    </div>

    <p v-if="!!keyValue" class="text-letter__appeal__substitution">
        <span class="text-letter__appeal__substitution__title">Подставить</span>
        <span 
            v-for="keyValue in arrayKeys"
            :key="keyValue"
            class="text-letter__appeal__substitution__text">
            #{{ keyValue }}
        </span>
    </p>
</template>

<style lang="scss" scoped>

    @mixin button-container {
        @include df_ac;
        position: relative;
        max-height: 4rem;
        height: 100%;
        padding: 1.25rem;
        gap: 0.625rem;
        border: 0.0625rem solid $border-primary-transparent-8;
    }

    @mixin icon-button {
        cursor: pointer;
        position: relative;
        max-width: 1.5rem;
        width: 100%;
        max-height: 1.5rem;
        height: 100%;
    }

    svg {
        path {
            fill: #2D3033;
            fill-opacity:0.48;
        }
    }

    .text-letter__appeal {
        @include df_fdc;
        gap: 3rem;
        &__container {
            position: relative;
            @include df_fdc;
            border: 0.0625rem solid $border-primary-transparent-8;
            border-radius: 1rem;
            overflow: hidden;
        }
        &__buttons {
            @include df_ac;
            flex-wrap: wrap;
            border: 0.0625rem solid $border-primary-transparent-8;
            border-collapse: collapse;
            &__row {
                @include button-container;
                &__item {
                    @include icon-button;
                    svg {
                        @include icon-button;
                    }
                }
                .selece-text-edit {
                    max-width: 8.75rem !important;
                    max-height: 2.5rem !important;
                    background-color: $bg-inverse-transparent-4 !important;
                    .input-label {
                        max-height: 2.75rem;
                        padding: .625rem 1rem;
                    }
                    input[type="text"] {
                        @include text_1;
                    }
                }
            }
        }
        &__textarea {
            padding: 1.5rem;
            height: 13.5625rem;
            outline: none !important;
            border: none !important;
            ul {
                padding-left: 1.5rem;
                list-style: disc;
            }
        }
        &__bottom-handle {
            @include df_jb_ac;
            width: 100%;
            padding: 1.125rem 1rem;
            border: 0.0625rem solid $border-primary-transparent-8;
            &__text {
                @include text_1;
                color: $text-primary;
            }
            &__handler {
                cursor: nwse-resize;
                svg {
                    max-width: 2rem;
                    max-height: 2rem;
                }
            }
        }
        &__link-input {
            position: absolute;
            padding: 0.25rem 0.5rem;
            border-radius: 0.5rem;
            width: 14.5625rem;
            height: 2rem;
            background-color: $bg-inverse;
            &__input {
                @include text_2;
                color: $text-inverse;
            }
        }
        &__substitution {
            @include df_ac;
            gap: 1rem;
            padding-inline: 1rem;
            padding-top: .5rem;
            flex-wrap: wrap;
            &__title {
                @include text_1;
                color: $text-primary-transparent-48;
            }
            &__text {
                @include text_1;
                color: $text-subaccent;
            }
        }
    }
    .max-h-64 {
        max-height: 4rem;
    }
    .w-140 {
        width: 8.75rem;
    }
    .dropdown {
        &__container {
            position: absolute;
            top: 1rem;
            left: -1.25rem;
            @include grid(6, 0.25rem);
            justify-content: center;
            width: 18.75rem;
            height: 11.75rem;
            background-color: $bg-inverse-subdued-4;
            border-radius: 0.5rem;
            padding: 0.75rem;
        }
        &__container-color {
            position: absolute;
            top: 1rem;
            left: -1.25rem;
            @include grid(5, 0.375rem);
            justify-content: center;
            width: 10.5rem;
            height: 6rem;
            background-color: $bg-inverse-subdued-4;
            border-radius: 0.5rem;
            padding: 0.75rem;
            overflow-y: scroll;
        }
        &__item {
            @include df_ac_jcc;
            width: 3.25rem;
            height: 3.25rem;
            color: $text-primary-transparent-32;
        }
        &__item-container {
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 0.25rem;
            padding: 0.0625rem;
            overflow: hidden;
            &[data-active="true"] {
                border: 0.0625rem solid $border-primary;
            }
        }
        &__item-color {
            width: 100%;
            height: 100%;
            border-radius: 0.1875rem;
        }
        &__colors {
            @include df_ac_jcc;
            width: 1.5rem;
            height: 1.5rem;
        }
    }
    .active {
        svg {
            path {
                stroke: $icon-primary !important;
                fill: $icon-primary !important;
                fill-opacity: 1 !important;
            }
        }
    }
</style>