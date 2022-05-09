import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import apiContext from '../context/index';
import { modalSelector } from '../store/selectors/index';
import { setStateModal } from '../store/slices/modalSlice';
import { addTask } from '../store/slices/tasksSlice';

interface ModalFormProps {
  onSubmit: (e: React.FormEvent) => void,
  setTaskData: React.Dispatch<React.SetStateAction<{
    name: string;
    text: string;
    dateEnd: string;
    reward: number;
    stat: string;
  }>>,
  taskData: {
    name: string;
    text: string;
    dateEnd: string;
    reward: number;
    stat: string;
  },
  closeModal: () => void,
}

function ModalForm({
  onSubmit, setTaskData, taskData, closeModal,
}: ModalFormProps) {
  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="quest-name" className="form-label">Name</label>
        <input id="quest-name" className="form-control" required type="text" value={taskData.name} onChange={(e) => setTaskData({ ...taskData, name: e.currentTarget.value })} />
      </div>
      <div className="form-group">
        <label htmlFor="quest-text" className="form-label">Text</label>
        <textarea id="quest-text" className="form-control" rows={5} required value={taskData.text} onChange={(e) => setTaskData({ ...taskData, text: e.currentTarget.value })} />
      </div>
      <div className="form-group">
        <label htmlFor="quest-reward" className="form-label">Reward</label>
        <input id="quest-reward" className="form-control" required type="text" value={taskData.reward} onChange={(e) => setTaskData({ ...taskData, reward: +e.currentTarget.value })} />
      </div>
      <div className="form-group">
        <label htmlFor="quest-reward" className="form-label">Какая характеристика повышается?</label>
        <select name="stats" defaultValue="str" className="form-control" onChange={(e) => setTaskData({ ...taskData, stat: e.currentTarget.value })}>
          <option value="str">str</option>
          <option value="agi">agi</option>
          <option value="int">int</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="quest-date" className="form-label">Срок</label>
        <input id="quest-date" className="form-control" required value={taskData.dateEnd} type="date" onChange={(e) => setTaskData({ ...taskData, dateEnd: e.currentTarget.value })} />
      </div>
      <div className="button-group">
        <button type="submit" className="button button-submit">Add</button>
        <button type="button" className="button button-submit" onClick={closeModal}>Cancel</button>
      </div>
    </form>
  );
}

function ModalTaskForm() {
  const { elements } = useContext(apiContext);
  const modalState = useSelector(modalSelector);
  const [taskData, setTaskData] = useState({
    name: '', text: '', dateEnd: '', reward: 0, stat: '',
  });
  const dispatch = useDispatch();

  const closeModal = () => {
    setTaskData({
      name: '', text: '', dateEnd: '', reward: 0, stat: '',
    });
    dispatch(setStateModal(false));
    elements.body.classList.remove('modal-open');
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTask(taskData));
    closeModal();
  };

  return modalState.show ? (
    <div className="modal-background">
      <div role="dialog" aria-modal className="modal">
        <h2 className="modal-caption">Add Quest</h2>
        <ModalForm
          onSubmit={onSubmit}
          setTaskData={setTaskData}
          closeModal={closeModal}
          taskData={taskData}
        />
      </div>
    </div>
  ) : null;
}

export default ModalTaskForm;
