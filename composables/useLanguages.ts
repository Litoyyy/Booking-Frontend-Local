export function useLanguages() {
    const selectLanguages = useState('languages', () =>
        reactive([
            { key: 'RU', value: 'Русский', state: 'active' },
            { key: 'EN', value: 'Английский', state: '' },
            { key: 'DE', value: 'Немецкий', state: '' },
            { key: 'ES', value: 'Испанский', state: '' }
        ])
    );
  
    const selectedLang = useState('selectedLang', () =>
        selectLanguages.value.find((elem) => elem.state === 'active') || selectLanguages.value[0]
    );
  
    const selectFunc = (index: number) => {
        selectLanguages.value.forEach((item) => (item.state = ''));
        selectLanguages.value[index].state = 'active';
        selectedLang.value = selectLanguages.value[index];
    };
  
    return {
        selectLanguages,
        selectedLang,
        selectFunc
    };
};