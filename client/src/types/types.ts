export interface FormLoginProps {
    onChangeDataForm: string,
    error: string,
    dataLogin: string,
    onSubmit: string,
    infoForm: string,
}

export interface Task {
    name: string,
    text: string,
    title: string,
    status: string,
    id: string,
}

export interface User {
    username: string,
    password: string,
}