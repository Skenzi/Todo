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

export interface LoginFormItem {
    name: string,
    labelText: string,
    type: string,
}

export interface FormGroupProps {
    infoControl: LoginFormItem,
    onChangeDataForm: (dataKey: string) => (ev: React.ChangeEvent<HTMLInputElement>) => void,
}
  
export interface LoginFormProps {
    onChangeDataForm: (dataKey: string) => (ev: React.ChangeEvent<HTMLInputElement>) => void,
    error: string,
    onSubmit: (ev: React.FormEvent) => void,
    infoForm: {
      pathLink: string,
      title: string;
      btnSubmitText: string;
      btnLinkText: string;
      formGroups: {
          name: string;
          labelText: string;
          type: string;
      }[],
    }
}

export interface ModalFormProps {
    onSubmit: (e: React.FormEvent) => void,
    setTaskData: React.Dispatch<React.SetStateAction<{
      title: string;
      text: string;
      dateEnd: string;
      reward: number;
      stat: string;
    }>>,
    taskData: {
      title: string;
      text: string;
      dateEnd: string;
      reward: number;
      stat: string;
    },
    closeModal: () => void,
}

export interface TaskFormProps {
    task: Task,
    setStateTaskForm: React.Dispatch<React.SetStateAction<boolean>>,
}

export interface TaskBodyProps {
    task: Task,
    setStateTaskForm: React.Dispatch<React.SetStateAction<boolean>>,
    compliteTask: () => void,
}

export interface DataItemProps {
    value: string | number,
    property: string,
}