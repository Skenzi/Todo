import React from 'react';

interface LoginFormItem {
  name: string,
  labelText: string,
  type: string,
}

interface FormGroupProps {
  infoControl: LoginFormItem,
  onChangeDataForm: (dataKey: string) => (ev: React.ChangeEvent<HTMLInputElement>) => void,
}

function FormGroup({
  infoControl, onChangeDataForm,
}: FormGroupProps) {
  return (
    <div className="form-group">
      <label htmlFor={infoControl.name} className="form-label">{infoControl.labelText}</label>
      <input id={infoControl.name} onChange={onChangeDataForm(infoControl.name)} type={infoControl.type} className="form-control" />
    </div>
  );
}

export default FormGroup;
