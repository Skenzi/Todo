import React, { useContext, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import apiContext from '../context/index';
import { modalSelector } from '../store/selectors/index';
import { setStateModal } from '../store/slices/modalSlice';
import CreateTask from './CreateTask';

function Modal() {
  const { elements } = useContext(apiContext);
  const modalState = useSelector(modalSelector);
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setStateModal(false));
    elements.body.classList.remove('modal-open');
  };

  const closeModalHandler = (ev: React.MouseEvent) => {
    if(modalRef.current && !modalRef.current.contains(ev.target as Node)) {
      closeModal();
    }
  }

  return modalState.show ? (
    <div className="modal-background" onClick={closeModalHandler}>
      <div role="dialog" aria-modal ref={modalRef} className="modal">
        <h2 className="modal-caption">Add Quest</h2>
        <CreateTask closeModal={closeModal}/>
      </div>
    </div>
  ) : null;
}

export default Modal;
