import React from 'react';
import { FormGroupProps } from '../types/types';

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
