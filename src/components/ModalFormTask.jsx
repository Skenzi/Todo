import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalSelector } from '../store/selectors/index.js';
import { setStateModal } from '../store/slices/modalSlice.js';
import { addTask } from '../store/slices/tasksSlice.js';

const ModalTaskForm = () => {
    const modalState = useSelector(modalSelector);
    const [taskData, setTaskData] = useState({name: '', text: '', dateEnd: ''});
    const dispatch = useDispatch();
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(addTask(taskData));
        dispatch(setStateModal(false));
    };
    return modalState.show ? <div className="modal-background">
        <div className="modal">
            <h2>Add Quest</h2>
            <form className="form" onSubmit={onSubmit}>
                <label htmlFor="quest-name">Name</label>
                <input name="quest-name" required type="text" value={taskData.name} onChange={(e) => setTaskData({...taskData, name: e.currentTarget.value})}></input>
                <label htmlFor="quest-text">Text</label>
                <input name="quest-text" required value={taskData.text} type="text" onChange={(e) => setTaskData({...taskData, text: e.currentTarget.value})}></input>
                <label htmlFor="quest-text">Срок</label>
                <input name="quest-text" required value={taskData.dateEnd} type="date" onChange={(e) => setTaskData({...taskData, dateEnd: e.currentTarget.value})}></input>
                <button type="submit" className="button button-submit">Add</button>
            </form>
        </div>
    </div> : null;
};

export default ModalTaskForm;