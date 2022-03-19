import React from 'react';
import { Link } from 'react-router-dom';
import GroupControls from './GroupControl.jsx';

function LoginForm({
  onChangeDataForm, error, dataControls, onSubmit, infoForm,
}) {
  return (
    <form className="form bg-main" onSubmit={onSubmit}>
      <div className="form-title">{infoForm.title}</div>
      <div className="form-body">
        {infoForm.groupControls.map((item) => (
          <GroupControls
            key={item.name}
            infoControl={item}
            dataLogin={dataControls}
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
