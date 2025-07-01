import { ref } from 'vue';

export function createNewInput() {
    const phoneArr = ref<{ value: string }[]>([]);
    const emailArr = ref<{ value: string }[]>([]);
    const roomNumberArr = ref<{ value: string }[]>([]);
    const childsArr = ref<{ name: string, age: string }[]>([]);

    const phoneAppendButton = ref<HTMLElement | null>(null);
    const emailAppendButton = ref<HTMLElement | null>(null);
    const roomNumbersAppendButton = ref<HTMLElement | null>(null);

    const appendContactInput = (type: 'phone' | 'email' | 'childs' | 'room_numbers') => {
        if (type === 'phone') {
            phoneArr.value.push({ value: '' });
        } else if (type === 'email') {
            emailArr.value.push({ value: '' });
        } else if (type === 'childs') {
            childsArr.value.push({ name: '', age: '' });
        } else if (type === 'room_numbers') {
            roomNumberArr.value.push({ value: '' });
        }

        const button = event?.currentTarget as HTMLButtonElement;
        if (button) button.disabled = true;
    }

    const deleteContactInput = (index: number, type: 'phone' | 'email' | 'childs' | 'room_numbers') => {
        if (type === 'phone') {
            phoneArr.value.splice(index, 1);
        } else if (type === 'email') {
            emailArr.value.splice(index, 1);
        } else if (type === 'childs') {
            childsArr.value.splice(index, 1);
        } else if (type === 'room_numbers') {
            roomNumberArr.value.splice(index, 1);
        }
    }

    const valueTransfer = (event: Event, index: number, type: 'phone' | 'email' | 'childs' | 'room_numbers') => {
        const input = event.target as HTMLInputElement | null;
        const phoneButton = phoneAppendButton.value?.$el;
        const emailButton = emailAppendButton.value?.$el;
        const roomNumberButton = roomNumbersAppendButton.value?.$el;
        if (input) {
            if (type === 'phone' && phoneArr.value[index]) {
                phoneArr.value[index].value = input.value;
                if(input?.value.length == 16 && phoneButton) {
                    phoneButton.disabled = false;
                } else {
                    phoneButton.disabled = true;
                }
            } else if (type === 'email' && emailArr.value[index]) {
                emailArr.value[index].value = input.value;
                if(input?.value.length > 1 && emailButton) {
                    emailButton.disabled = false;
                } else {
                    emailButton.disabled = true;
                }
            } else if (type === 'childs' && childsArr.value[index]) {
                if(input.name === 'child_name') {
                    childsArr.value[index].name = input.value;
                } else if(input.name === 'child_age') {
                    childsArr.value[index].age = input.value;
                }
            } else if (type === 'room_numbers' && roomNumberArr.value[index]) {
                roomNumberArr.value[index].value = input.value;
                if(input?.value.length >= 1 && roomNumberButton) {
                    roomNumberButton.disabled = false;
                } else {
                    roomNumberButton.disabled = true;
                }
            }
        }
    };

    const mainInputHandle = (type: 'phone' | 'email' | 'room_numbers') => {
        const phoneButton = phoneAppendButton.value?.$el;
        const emailButton = emailAppendButton.value?.$el;
        const roomNumberButton = roomNumbersAppendButton.value?.$el;
        const input = event?.target as HTMLInputElement | null;
        if (!input) return;

        if(type === 'phone') {
            if(input?.value.length === 16) {
                phoneButton.disabled = false;
            } else {
                phoneButton.disabled = true;
            };
        } else if(type === 'email') {
            if(input?.value.length > 5) {
                emailButton.disabled = false;
            } else {
                emailButton.disabled = true;
            }
        } else if(type === 'room_numbers') {
            if(input?.value.length >= 1) {
                roomNumberButton.disabled = false;
            } else {
                roomNumberButton.disabled = true
            }
        }
    };

    return {
        phoneArr,
        emailArr,
        childsArr,
        roomNumberArr,
        phoneAppendButton,
        emailAppendButton,
        roomNumbersAppendButton,
        appendContactInput,
        deleteContactInput,
        valueTransfer,
        mainInputHandle
    };
}