import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import apiContext from '../context/index.js';
import { modalSelector } from '../store/selectors/index.js';
import { setStateModal } from '../store/slices/modalSlice.js';
import { addTask } from '../store/slices/tasksSlice.js';

const ModalTaskForm = () => {
    const { elements } = useContext(apiContext);
    const modalState = useSelector(modalSelector);
    const [taskData, setTaskData] = useState({name: '', text: '', dateEnd: ''});
    const dispatch = useDispatch();
    const closeModal = () => {
        setTaskData({name: '', text: '', dateEnd: ''});
        dispatch(setStateModal(false));
        elements.body.classList.remove('modal-open');
    };
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(addTask(taskData));
        closeModal();
    };

    return modalState.show ? <div className="modal-background">
        <div role="dialog" aria-modal className="modal">
            <h2 className="modal-caption">Add Quest</h2>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="quest-name" className="form-label">Name</label>
                    <input name="quest-name" className="form-control" required type="text" value={taskData.name} onChange={(e) => setTaskData({...taskData, name: e.currentTarget.value})}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="quest-text" className="form-label">Text</label>
                    <textarea name="quest-text" className="form-control" rows="5" required value={taskData.text} onChange={(e) => setTaskData({...taskData, text: e.currentTarget.value})}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="quest-text" className="form-label">Срок</label>
                    <input name="quest-text" className="form-control" required value={taskData.dateEnd} type="date" onChange={(e) => setTaskData({...taskData, dateEnd: e.currentTarget.value})}></input>
                </div>
                <div className="button-group">
                    <button type="submit" className="button button-submit">Add</button>
                    <button type="button" className="button button-submit" onClick={closeModal}>Cancel</button>
                </div>
            </form>
        </div>
    </div> : null;
};

export default ModalTaskForm;