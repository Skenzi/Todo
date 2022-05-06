import React from 'react';

function GroupControls({
  infoControl, value, onChangeDataForm,
}) {
  return (
    <div className="form-group">
      <label htmlFor={infoControl.name} className="form-label">{infoControl.labelText}</label>
      <input id={infoControl.name} value={value} onChange={onChangeDataForm(infoControl.name)} type={infoControl.type} className="form-control" />
    </div>
  );
}

export default GroupControls;
