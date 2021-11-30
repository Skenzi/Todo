import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalSelector } from '../store/selectors/index.js';
import { setStateModal } from '../store/slices/modalSlice.js';

const ModalTaskForm = () => {
    const modalState = useSelector(modalSelector);
    const dispatch = useDispatch();
    return modalState.show ? <div className="modal-background" onClick={(e) => {
        e.stopPropagation();
        dispatch(setStateModal(false));
    }}>
        <div className="modal">
            <h2>Add Quest</h2>
            <form className="form">
                <label htmlFor="quest-name">Name</label>
                <input name="quest-name" type="text"></input>
                <label htmlFor="quest-text">Text</label>
                <input name="quest-text" type="text"></input>
                <button type="submit" className="button button-submit">Add</button>
            </form>
        </div>
    </div> : null;
};

export default ModalTaskForm;