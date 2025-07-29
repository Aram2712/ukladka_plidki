
export type TNavbar = {
    id: number,
    title: string,
    isActive: boolean,
    path: string
}

export type TUser = {
    id?: number,
    fullName: string,
    phoneNumber: string,
    password: string,
    role: string
}

export type TMessage = {
    id: number,
    text: string,
    submitedBy: string
}

export type TComment = { 
    id?: number,
    description: string, 
    rating: number, 
    fullName: string 
}

export type TOrder = {
    id: number,
    imagesPath: string,
    phoneNumber: string
    square: number
}

export type TService = {
    id: number,
    title: string;
    header: string;
    description: string;
    price: string;
    imagesPaths: string;
}

export type TForum = {
    id: number,
    userName: string,
    message: string
}

export type TPrice = {
    id?: number,
    title: string,
    price: string
}