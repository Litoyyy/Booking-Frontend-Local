import * as z from 'zod';

interface Settings {
    errorOff?: boolean;
    clearAfterSubmit?: boolean;
}

export function validate(form: HTMLFormElement, schema: any, callback: Function, settings?: Settings) {

    form.onsubmit = (e) => {e.preventDefault();}

    const body = getBodyForm(form);

    const button = form.elements.button as HTMLButtonElement;

    const allInputs = Array.from(form.elements).filter((el: any)=>{
        return el.type === 'text' || 
               el.type === 'textarea' || 
               el.type === 'password' || 
               el.type === 'email';
    });
    validateParse({
        schema: schema,
        body
    }).then(res=>{
        allInputs.map(input=>input.classList.remove('error'));

        if(!button) return;
        if(form.dataset.disabled && JSON.parse(form.dataset.disabled)) {
            if (button instanceof RadioNodeList) {
                button.forEach((btn: any)=>{
                    btn.dataset.state = 'disabled';
                })
            } else {
                button.dataset.state = 'disabled';
            }
        } else {
            if (button instanceof RadioNodeList) {
                button.forEach((btn: any)=>{
                    btn.dataset.state = '';
                })
            } else {
                button.dataset.state = '';
            }
        }
        if(!callback) return;
        if (button instanceof RadioNodeList) {
            button.forEach((btn: any) => {
                btn.onclick = () => {
                    callback(body, btn)
                    if(!settings || !settings.clearAfterSubmit) return;
                    const inputEvent = new Event("input");
                    allInputs.map(input=>{
                        input.value = '';
                        input.dispatchEvent(inputEvent);
                    });
                };
            });
        } else {
            button.onclick = () => {
                callback(body, button)
                if(!settings || !settings.clearAfterSubmit) return;
                const inputEvent = new Event("input");
                allInputs.map(input=>{
                    input.value = '';
                    input.dispatchEvent(inputEvent);
                });
            };
        };
    }).catch(error=>{
        const errorString = error.toString();

        allInputs.map(input=>input.classList.remove('error'));

        const parse = JSON.parse(`[${getTextInsideSquareBrackets(errorString)}]`);
        const nameErrorInput = parse.map((el: Object)=>el.path[0]);
        let errorInputs = []
        for(const errorName of nameErrorInput) {
            const input = form.elements[`${errorName}`]
            if (input) {
                errorInputs.push(form.elements[`${errorName}`]);
            };
        };
        if(!settings || !settings.errorOff) {
            errorInputs.map(input => {
                if (!!input) {
                    if (typeof input.forEach === "function") {
                        input.forEach((el: HTMLInputElement) => {
                            el.classList.add('error');
                        });
                    } else {
                        input.classList.add('error');
                    };
                };
            });
        };
        if(!button) return;
        if (button instanceof RadioNodeList) {
            button.forEach((btn: any) => {
                btn.dataset.state = 'disabled';
                btn.onclick = () => {};
            });
        } else {
            button.dataset.state = 'disabled';
            button.onclick = () => {};
        };
    });
}

export function setFormError(form: HTMLFormElement) {
    const allInputs = Array.from(form.elements).filter((el: any)=>{
        return el.type === 'text' || 
               el.type === 'textarea' || 
               el.type === 'password' || 
               el.type === 'email';
    });
    allInputs.forEach(input=>{
        input.classList.add('error');
    });
}

function getTextInsideSquareBrackets(text: String) {
    const startIndex = text.indexOf('[');
    const endIndex = text.lastIndexOf(']');
    if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
        return text.substring(startIndex + 1, endIndex);
    } else {
        return '';
    }
}

function getBodyForm(form: HTMLFormElement) {
    const formData = new FormData(form);

    const body = {};
    for (let [name, value] of formData.entries()) {
        body[name] = value;
    }
    return body;
}

async function validateParse(validateInfo: any) {
    try {
        validateInfo.schema.parse(validateInfo.body);
        console.log("Validation successful");
        if(typeof validateInfo?.callback == 'function')validateInfo?.callback();
        return true;
    } 
    catch (error) {
        if (error instanceof z.ZodError) {
            throw new Error(JSON.stringify(error.errors));
        } else {
            // console.error("Unknown error", error);
        }
    }
}