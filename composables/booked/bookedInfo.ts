export function bookedInfo() {
    const currentPage = ref(1);
    const itemsPerPage = 10;
    const allItemsCount = ref(326);

    const fullInfo = ref([
        {
            id: '20241014-0943-92125',
            state: 'new',
            guest: 'Абду Елена Николаевна',
            price: '24 400',
            period: '12 - 14 окт',
            room: {
                title: 'Бизнес-класс премиум',
            },
            services: [
                {
                    title: 'Завтрак «Шведский стол»'
                },
                {
                    title: 'Завтрак «Шведский стол»'
                },
                {
                    title: 'Завтрак «Шведский стол»'
                },
            ],
            phone: '+7 495 390 30 20',
            email: 'luxe-tourism@gmail.com'
        },
        {
            id: '20241014-0943-92125',
            state: 'new',
            guest: 'Абду Елена Николаевна',
            price: '24 400',
            period: '12 - 14 окт',
            room: {
                title: 'Бизнес-класс премиум',
            },
            services: [
                {
                    title: 'Завтрак «Шведский стол»'
                }
            ],
            phone: '+7 495 390 30 20',
            email: 'luxe-tourism@gmail.com'
        },
        {
            id: '20241014-0943-92125',
            state: 'new',
            guest: 'Абду Елена Николаевна',
            price: '24 400',
            period: '12 - 14 окт',
            room: {
                title: 'Бизнес-класс премиум',
            },
            services: [
                {
                    title: 'Завтрак «Шведский стол»'
                }
            ],
            phone: '+7 495 390 30 20',
            email: 'luxe-tourism@gmail.com'
        },
        {
            id: '20241014-0943-92125',
            state: 'new',
            guest: 'Абду Елена Николаевна',
            price: '24 400',
            period: '12 - 14 окт',
            room: {
                title: 'Бизнес-класс премиум',
            },
            services: [
                {
                    title: 'Завтрак «Шведский стол»'
                }
            ],
            phone: '+7 495 390 30 20',
            email: 'luxe-tourism@gmail.com'
        },
        {
            id: '20241014-0943-92125',
            state: 'new',
            guest: 'Абду Елена Николаевна',
            price: '24 400',
            period: '12 - 14 окт',
            room: {
                title: 'Бизнес-класс премиум',
            },
            services: [
                {
                    title: 'Завтрак «Шведский стол»'
                }
            ],
            phone: '+7 495 390 30 20',
            email: 'luxe-tourism@gmail.com'
        },
        {
            id: '20241014-0943-92125',
            state: 'new',
            guest: 'Абду Елена Николаевна',
            price: '24 400',
            period: '12 - 14 окт',
            room: {
                title: 'Бизнес-класс премиум',
            },
            services: [
                {
                    title: 'Завтрак «Шведский стол»'
                }
            ],
            phone: '+7 495 390 30 20',
            email: 'luxe-tourism@gmail.com'
        },
        {
            id: '20241014-0943-92125',
            state: 'new',
            guest: 'Абду Елена Николаевна',
            price: '24 400',
            period: '12 - 14 окт',
            room: {
                title: 'Бизнес-класс премиум',
            },
            services: [
                {
                    title: 'Завтрак «Шведский стол»'
                }
            ],
            phone: '+7 495 390 30 20',
            email: 'luxe-tourism@gmail.com'
        },
        {
            id: '20241014-0943-92125',
            state: 'new',
            guest: 'Абду Елена Николаевна',
            price: '24 400',
            period: '12 - 14 окт',
            room: {
                title: 'Бизнес-класс премиум',
            },
            services: [
                {
                    title: 'Завтрак «Шведский стол»'
                }
            ],
            phone: '+7 495 390 30 20',
            email: 'luxe-tourism@gmail.com'
        },
        {
            id: '20241014-0943-92125',
            state: 'new',
            guest: 'Абду Елена Николаевна',
            price: '24 400',
            period: '12 - 14 окт',
            room: {
                title: 'Бизнес-класс премиум',
            },
            services: [
                {
                    title: 'Завтрак «Шведский стол»'
                }
            ],
            phone: '+7 495 390 30 20',
            email: 'luxe-tourism@gmail.com'
        },
        {
            id: '20241014-0943-92125',
            state: 'new',
            guest: 'Абду Елена Николаевна',
            price: '24 400',
            period: '12 - 14 окт',
            room: {
                title: 'Бизнес-класс премиум',
            },
            services: [
                {
                    title: 'Завтрак «Шведский стол»'
                }
            ],
            phone: '+7 495 390 30 20',
            email: 'luxe-tourism@gmail.com'
        },
        {
            id: '20241014-0943-92125',
            state: 'new',
            guest: 'Абду Елена Николаевна',
            price: '24 400',
            period: '12 - 14 окт',
            room: {
                title: 'Бизнес-класс премиум',
            },
            services: [
                {
                    title: 'Завтрак «Шведский стол»'
                }
            ],
            phone: '+7 495 390 30 20',
            email: 'luxe-tourism@gmail.com'
        },
        {
            id: '20241014-0943-92125',
            state: 'new',
            guest: 'Абду Елена Николаевна',
            price: '24 400',
            period: '12 - 14 окт',
            room: {
                title: 'Бизнес-класс премиум',
            },
            services: [
                {
                    title: 'Завтрак «Шведский стол»'
                }
            ],
            phone: '+7 495 390 30 20',
            email: 'luxe-tourism@gmail.com'
        },
        {
            id: '20241014-0943-92125',
            state: 'new',
            guest: 'Абду Елена Николаевна',
            price: '24 400',
            period: '12 - 14 окт',
            room: {
                title: 'Бизнес-класс премиум',
            },
            services: [
                {
                    title: 'Завтрак «Шведский стол»'
                }
            ],
            phone: '+7 495 390 30 20',
            email: 'luxe-tourism@gmail.com'
        },
        {
            id: '20241014-0943-92125',
            state: 'new',
            guest: 'Абду Елена Николаевна',
            price: '24 400',
            period: '12 - 14 окт',
            room: {
                title: 'Бизнес-класс премиум',
            },
            services: [
                {
                    title: 'Завтрак «Шведский стол»'
                }
            ],
            phone: '+7 495 390 30 20',
            email: 'luxe-tourism@gmail.com'
        },
    ]);

    const selectedFilters = ref([
        {
            query: 'page',
            value: currentPage.value.toString()
        },
        {
            query: 'max_limit',
            value: itemsPerPage.toString()
        },
    ]);

    let stringifyFilters = '';

    const getBookedInfo =()=>{
        const res = getData(`/api/booked/guests/${stringifyFilters}`);
        fullInfo.value = res.results;
        allItemsCount.value = res.count;
    };

    const setNewFilter=(query: string, value: string)=>{
        const searchObj = selectedFilters.value.find(item=>item.query === query);
        if(!!searchObj) {
            const index = selectedFilters.value.indexOf(searchObj);
            if(value === '') {
                selectedFilters.value.splice(index, 1);
            } else {
                searchObj.value = value;
            }
        } else {
            selectedFilters.value.push({
                query: query,
                value: value
            });
        }
    };

    watch(
        ()=>selectedFilters.value,
        (newVal)=>{
            stringifyFilters = '';
            const promises = newVal.map((filter, index)=>{
                stringifyFilters += index === 0 ? `?${filter.query}=${filter.value}`: `&${filter.query}=${filter.value}`;
            });
            Promise.all(promises)
            .then(()=>{
                // getBookedInfo();
            });
        },
        {deep: true, immediate: true}
    );
    return {
        currentPage,
        fullInfo,
        setNewFilter,
        getBookedInfo,
        itemsPerPage,
        allItemsCount
    }
}