import React from 'react';
import { Link } from 'react-router-dom';
import FormGroup from './FormGroup';

interface LoginFormItem {
  name: string,
  labelText: string,
  type: string,
}

interface LoginFormProps {
  onChangeDataForm: (dataKey: string) => (ev: React.ChangeEvent<HTMLInputElement>) => void,
  error: string,
  onSubmit: (ev: React.FormEvent) => void,
  infoForm: {
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

function LoginForm({
  onChangeDataForm, error, onSubmit, infoForm,
}: LoginFormProps) {
  return (
    <form className="form bg-main" onSubmit={onSubmit}>
      <div className="form-title">{infoForm.title}</div>
      <div className="form-body">
        {infoForm.formGroups.map((item: LoginFormItem) => (
          <FormGroup
            key={item.name}
            infoControl={item}
            onChangeDataForm={onChangeDataForm}
          />
        ))}
        {error ? <div className="text-error">{error}</div> : null}
        <button type="submit" className="button button-sm button-submit">{infoForm.btnSubmitText}</button>
      </div>
      <div className="form-footer">
        <Link to="/signUpPage" type="button" className="button button-sm">{infoForm.btnLinkText}</Link>
      </div>
    </form>
  );
}

export default LoginForm;
