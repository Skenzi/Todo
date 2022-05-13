export interface FormLoginProps {
    onChangeDataForm: string,
    error: string,
    dataLogin: string,
    onSubmit: string,
    infoForm: string,
}

export interface Task {
    text: string,
    title: string,
    status: string,
    reward: number,
    stat: string
    id: number,
}

export interface User {
    username: string,
    password: string,
}