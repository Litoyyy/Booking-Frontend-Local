export function navSidebar() {

    const route = useRoute();

    const showSidebar = useState('show',()=>ref(true));

    const categoriesList = ref();
    
    const getCategories = async() => {
        try {
            const res = await getData('/hotel/room-category');
            categoriesList.value = [
                {
                    title: 'Все номера',
                    link: '/admin/numbers/categories/0/'
                },
                ...res.results.map((item: any) => ({
                    title: item.name,
                    link: `/admin/numbers/categories/${item.id}/`,
                    linkCreate: `/admin/numbers/categories/create/${item.id}/`
                }))
            ];
            setActiveState(sidebarAccordions.value);
        } catch(error) {
            console.error('Ошибка загрузки категорий:', error);
        };
    };

    const sidebarAccordions = ref([
        {
            title: 'Номера',
            items: [
                {
                    title: 'Категории',
                    link: '/admin/numbers/categories/',
                    linkCreate: '/admin/numbers/categories/create/',
                    get items() {
                        return categoriesList.value;
                    }
                },
                {
                    title: 'Брони',
                    link: '/admin/numbers/booked/',
                    linkCreate: '/admin/numbers/booked/create/'
                },
                {
                    title: 'Доступность',
                    link: '/admin/numbers/availability/'
                },
                {
                    title: 'Тарифы',
                    link: '/admin/numbers/tariff/',
                    linkCreate: '/admin/numbers/tariff/create/1/'
                },
                {
                    title: 'Скидки',
                    link: '/admin/numbers/discounts/',
                    linkCreate: '/admin/numbers/discounts/create/'
                },
                {
                    title: 'Уровни цен',
                    link: '/admin/numbers/price-levels/',
                },
            ]
        },
        {
            title: 'Гостиница',
            items: [
                {
                    title: 'Услуги',
                    link: '/admin/hotel/services/',
                    linkCreate: '/admin/hotel/services/create/'
                },
                {
                    title: 'Гости',
                    link: '/admin/hotel/guests/',
                    linkCreate: '/admin/hotel/guests/create/'
                },
                {
                    title: 'Номерной фонд',
                    link: '/admin/hotel/room-fond/',
                    linkCreate: '/admin/hotel/room-fond/create/'
                },
                {
                    title: 'Шахматка броней',
                    link: '/admin/hotel/booked-chess/',
                },
                {
                    title: 'Промокоды',
                    link: '/admin/hotel/promocodes/',
                    linkCreate: '/admin/hotel/promocodes/create/'
                },
                {
                    title: 'Способы оплаты',
                    link: '/admin/hotel/payment-methods/',
                },
                {
                    title: 'Реквизиты',
                    link: '/admin/hotel/details/'
                },
                {
                    title: 'Налогооблажение',
                    link: '/admin/hotel/taxation/'
                },
                {
                    title: 'Настройки',
                    link: '/admin/hotel/settings/'
                }
            ]
        },
        {
            title: 'Маркетинг',
            items: [
                {
                    title: 'Рассылки',
                    link: '/admin/marketing/mailings/'
                },
                {
                    title: 'Вопросы гостей',
                    link: '/admin/marketing/questions/'
                }
            ]
        }
    ]);

    onMounted(() => {
        getCategories();
    });

    const setAllUnactive = () => {
        const clearItems =(items: Array<Object>)=>{
            items.forEach(item=>{
                item.state = '';
                if(item.items && item.items.length > 0) {
                    clearItems(item.items);
                };
            });
        };
        clearItems(sidebarAccordions.value);
    };

    const setActiveState = (items: Array<any>, parent: any = null): boolean => {
        setAllUnactive();
        return items.some((item) => {
            if (item.link === route.path || item.linkCreate === route.path) {
                item.state = 'active';
                let currentParent = parent;
                while (currentParent) {
                    currentParent.state = 'opened';
                    currentParent = currentParent.parent;
                }
                return true;
            }
            
            if (item.items && item.items.length > 0) {
                const newParent = { ...item, parent };
                if (setActiveState(item.items, newParent)) {
                    item.state = 'opened';
                    return true;
                }
            }
            return false;
        });
    };
    

    watch(
        ()=>route.path,
        ()=>{
            setActiveState(sidebarAccordions.value);
        },
    );

    return {
        showSidebar,
        sidebarAccordions,
        getCategories,
    }
}