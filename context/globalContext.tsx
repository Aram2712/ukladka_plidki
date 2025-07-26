
'use client'
import { createContext, useContext, useState, ReactNode } from 'react';
import type { TComment, TNavbar, TOrder, TService, TUser, TForum } from '../types';

type ContextType = {
    navbar: Array<TNavbar>,
    setNavbar: (bar: Array<TNavbar>) => void,
    adminHeader: Array<TNavbar>,
    setAdminHeader: (bar: Array<TNavbar>) => void,
    user: TUser | null,
    setUser: (user: TUser | null) => void ,
    // clients: TUser[],
    // setClients: (users: TUser[]) => void,
    services:TService[] 
    setServices: (services: TService[]) => void,
    comments: TComment[];
    setComments: (comment:TComment[]) => void,
    orders: TOrder[],
    setOrders: (orders: TOrder[]) => void,
    messages: Array<any>,
    setMessages: (messages: any[]) => void,
    forumData: TForum[], 
    setForumData: (data: TForum[]) => void

};

const GlobalContext = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  
    const [user, setUser] = useState<TUser | null>(null);
    const [navbar, setNavbar] = useState<TNavbar[]>([
        {
            id: 1,
            title: 'Главная',
            isActive: true,
            path: '/'
        },
        {
            id: 2,
            title: 'Прайс',
            isActive: false,
            path: '/services'
        }
    ])

    const [adminHeader, setAdminHeader] = useState<TNavbar[]>([
        {
            id: 2,
            title: 'Заявки',
            isActive: true,
            path: ''
        },
        {
            id: 3,
            title: 'Услуги',
            isActive: false,
            path: ''
        },
        {
            id: 4,
            title: 'Клиенты',
            isActive: false,
            path: ''
        }
    ])

    // const [clients, setClients] = useState([
    //     {
    //         id: 2,
    //         fullName: 'Игорь Крутой',
    //         phoneNumber: '72222222222',
    //         password: '2222',
    //         role: 'user'
    //     },
    //     {
    //         id: 1,
    //         fullName: 'Гор Мкртчян',
    //         phoneNumber: '71111111111',
    //         password: '1111',
    //         role: 'admin'
    //     },
    //     {
    //         id: 3,
    //         fullName: 'Наталья Сергеева',
    //         phoneNumber: '73333333333',
    //         password: '3333',
    //         role: 'user'
    //     }
    // ])

    const [services, setServices] = useState<TService[]> ([
        {
            id: 1,
            title: 'Санузел с душевой кабиной',
            description: 'Укладка керамогранита 1200х600 мм (глянец) так-же произвёл частичную переделку сантехники. Опустил канализацию душевого поддона более чем на 100 мм. Я влюбился в этот санузел получилось очень круто 👍',
            price: '150₽/м2',
            imagesPaths: 'https://ukladka-plitki.ru/wp-content/uploads/photo_5470042268145668618_w-819x1024-1.webp,https://ukladka-plitki.ru/wp-content/uploads/photo_5470042268145668617_w-819x1024-1.webp,https://ukladka-plitki.ru/wp-content/uploads/1713899046-10.mp4'
        },
        {
            id: 2,
            title: 'Гидроизоляция комплект',
            description: 'Заказчик требовал высокое качество, мы ему его дали, продолжаем сотрудничество, впереди много интересного.',
            price: '370/м2',
            imagesPaths: 'https://ukladka-plitki.ru/wp-content/uploads/photo_5470042268145668617_w-819x1024-1.webp,https://ukladka-plitki.ru/wp-content/uploads/photo_5470042268145668618_w-819x1024-1.webp,https://ukladka-plitki.ru/wp-content/uploads/1713899046-10.mp4'
        },
        {
            id: 3,
            title: 'Укладка плитки 1200-600',
            description: 'Запил наружных углов под 45 градусов. Затирку не успели сделать, т.к заказчику срочно нужно было уезжать👨‍🚀 ) поэтому выкладываю что есть, считаю что и без затирки смотреться красиво🤔',
            price: '420/м2',
            imagesPaths: 'https://ukladka-plitki.ru/wp-content/uploads/photo_5470042268145668618_w-819x1024-1.webp,https://ukladka-plitki.ru/wp-content/uploads/photo_5470042268145668617_w-819x1024-1.webp,https://ukladka-plitki.ru/wp-content/uploads/photo_5470042268145668618_w-819x1024-1.webp,https://ukladka-plitki.ru/wp-content/uploads/1713899046-10.mp4'
        },
        {
            id: 4,
            title: 'Укладка бордюра, вставки',
            description: 'Укладка крупноформатной плитки в массажном салоне на улице Савушкина, размер плиты 1000×3000 мм, керамогранит 6 мм',
            price: '1200/м2',
            imagesPaths: 'https://ukladka-plitki.ru/wp-content/uploads/photo_5470042268145668617_w-819x1024-1.webp,https://ukladka-plitki.ru/wp-content/uploads/photo_5470042268145668618_w-819x1024-1.webp,https://ukladka-plitki.ru/wp-content/uploads/1713899046-10.mp4'
        },
        {
            id: 5,
            title: 'Укладка плитки 50-50',
            description: 'Запил наружных углов под 45 градусов. Затирку не успели сделать, т.к заказчику срочно нужно было уезжать👨‍🚀 ) поэтому выкладываю что есть, считаю что и без затирки смотреться красиво🤔',
            price: '360/м2',
            imagesPaths: 'https://ukladka-plitki.ru/wp-content/uploads/photo_5470042268145668618_w-819x1024-1.webp,https://ukladka-plitki.ru/wp-content/uploads/photo_5470042268145668617_w-819x1024-1.webp,https://ukladka-plitki.ru/wp-content/uploads/photo_5470042268145668618_w-819x1024-1.webp,https://ukladka-plitki.ru/wp-content/uploads/1713899046-10.mp4'
        },
        {
            id: 6,
            title: 'Более тысячи погонных метров реза керамогранита в санузле',
            description: 'Укладка крупноформатной плитки в массажном салоне на улице Савушкина, размер плиты 1000×3000 мм, керамогранит 6 мм',
            price: '590/м2',
            imagesPaths: 'https://ukladka-plitki.ru/wp-content/uploads/photo_5470042268145668617_w-819x1024-1.webp,https://ukladka-plitki.ru/wp-content/uploads/photo_5470042268145668618_w-819x1024-1.webp,https://ukladka-plitki.ru/wp-content/uploads/1713899046-10.mp4'
        },
    ])


    const [comments, setComments] = useState<TComment[]>([
        {
            id: 1,
            description: "Очень доволен работой мастера! Всё сделал быстро, аккуратно и по разумной цене. Настоящий профессионал своего дела. Рекомендую!", 
            rating: 5, 
            fullName: "Алексей Смирнов" 
        },
        {
            id: 2,
            description: "Заказали ремонт ванной комнаты — результат превзошёл ожидания! Всё чисто, красиво и по срокам. Спасибо огромное!", 
            rating: 5, 
            fullName: "Ирина Ковальчук" 
        },
        {
            id: 3,
            description: "Мастер пунктуальный, вежливый и работает на совесть. Объяснил всё, что делал, дал полезные советы. Будем обращаться снова!", 
            rating: 5, 
            fullName: "Михаил Иванов" 
        },
        {
            id: 4,
            description: "Приятно иметь дело с таким специалистом. Всё сделал без лишних разговоров, учёл все пожелания. Настоящий мастер.", 
            rating: 5, 
            fullName: "Владимир Петров" 
        },
    ])

    const [orders, setOrders] = useState<TOrder[]>([
        {
            id: 1,
            imagesPath: 'https://ukladka-plitki.ru/wp-content/uploads/photo_5470042268145668617_w-819x1024-1.webp,https://ukladka-plitki.ru/wp-content/uploads/photo_5470042268145668618_w-819x1024-1.webp',
            phoneNumber: '+71234567788',
            square: 25
        },
        {
            id: 2,
            imagesPath: 'https://ukladka-plitki.ru/wp-content/uploads/photo_5470042268145668617_w-819x1024-1.webp,https://ukladka-plitki.ru/wp-content/uploads/photo_5470042268145668618_w-819x1024-1.webp',
            phoneNumber: '+74565556677',
            square: 16
        }
    ])

    const [messages, setMessages] = useState<Array<any>>([
        {
            id: 1,
            senderId: 2,
            receiverId: "admin",
            text: 'Здравствуйте! Хотел бы узнать, делаете ли вы ремонт ванных комнат под ключ?'
        },
        {
            id: 2,
            senderId: 'admin',
            receiverId: 2,
            text: 'Здравствуйте! Да, конечно, делаю полный ремонт ванных комнат — от демонтажа до укладки плитки и установки сантехники.Можете рассказать, что именно вы планируете? И где находится объект?'
        },
        {
            id: 3,
            senderId: 2,
            receiverId: 'admin',
            text: 'Квартира в Питере, ванная около 4 кв.м. Хотим поменять плитку, сантехнику и установить душевую кабину. Сколько примерно по времени займёт?'
        },
        {
            id: 4,
            senderId: 'admin',
            receiverId: 2,
            text: 'Понял вас. При таких работах обычно уходит от 7 до 10 дней, в зависимости от объёма и состояния помещения.'
        },
    ])

    const [forumData, setForumData] = useState<TForum[]>([
        {
            id: 1,
            userName: 'Игорь Смирнов',
            message: 'Добрый день! Планирую ремонт в ванной, хочу заменить плитку и сантехнику. Кто-нибудь может порекомендовать хорошего мастера?'
        },
        {
            id: 2,
            userName: 'Анна Кузнецова',
            message: 'Привет, Игорь! Мы недавно делали ремонт, нам помог Гор – очень аккуратный и пунктуальный. Работает быстро, качество отличное. Если надо, могу скинуть контакты'
        },
        {
            id: 3,
            userName: 'Сергей Лебедев',
            message: 'Подтверждаю, Гор – профессионал. Делал у меня душевую кабину и укладку плитки. Цены разумные, работает чисто.'
        },
        {
            id: 4,
            userName: 'Игорь Смирнов',
            message: 'Спасибо, Анна и Сергей! Буду благодарен за контакты. Можно в личку или сюда.'
        }
    ])

    return (
        <GlobalContext.Provider 
            value = {{ 
                navbar,
                setNavbar,
                user, 
                setUser,
                adminHeader, 
                setAdminHeader,
                services, setServices,
                comments, setComments,
                orders, setOrders,
                messages, setMessages,
                forumData, setForumData
            }}
        >
        {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};