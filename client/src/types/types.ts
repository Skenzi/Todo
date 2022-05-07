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
    dateEnd: string,
    status: string,
    id: number,
}

export interface User {
    username: string,
    password: string,
}