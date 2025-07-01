export interface ReviewCard {
    id: number
    name: string
    phone?: string
    email?: string
    question: string
    answer: boolean
}

export const reviews: ReviewCard[] = reactive([
    {
        id: 1,
        name: 'Владимир',
        phone: '+7 495 390 30 20',
        email: 'ermolaev@gmail.com',
        question: 'Добрый день! Подскажите, есть ли у Вашего отеля льготные тарифы?',
        answer: false
    },
    {
        id: 2,
        name: 'Анна',
        question: 'Здравствуйте! Можно ли заселиться с животными?',
        answer: false
    },
    {
        id: 3,
        name: 'Игорь',
        email: 'igor@example.com',
        question: 'Есть ли у вас парковка для гостей?',
        answer: false
    },
    {
        id: 4,
        name: 'Мария',
        phone: '+7 999 123 45 67',
        question: 'Хотелось бы узнать про питание: включено ли оно в стоимость?',
        answer: false
    }
])
  

export const answerOnQuest = (id: number) => {
    const review = reviews.find(item => item.id === id)
    if (review) {
        review.answer = true
    }
}