import React, { useState, useContext } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addTask } from "../store/slices/tasksSlice";
import apiContext from '../context/index';

const CreateTask = ({ closeModal }: { closeModal: () => void}) => {
  const api = useContext(apiContext);
  const user = api.getUser();
  const dispatch = useDispatch();
    const [taskData, setTaskData] = useState({
        title: '', text: '', dateEnd: 0, reward: 0, stat: 'str', user: user.username, status: 'active'
    });
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const res = axios.post('http://localhost:5000/addTask', {task: {...taskData, dateStart: Date.now()}});
        res.then(({ data }) => {
          dispatch(addTask(data))
        }).catch((err) => {
          console.log('Error modal task')
        })
        closeModal();
      };
    return (
        <form className="form" onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="quest-name" className="form-label">Name</label>
        <input id="quest-name" className="form-control" required type="text" value={taskData.title} onChange={(e) => setTaskData({ ...taskData, title: e.currentTarget.value })} />
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
        <select name="stats" defaultValue="str" className="form-control" onChange={(e) => setTaskData({ ...taskData, stat: e.target.value })}>
          <option value="str">str</option>
          <option value="agi">agi</option>
          <option value="int">int</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="quest-date" className="form-label">Срок</label>
        <input id="quest-date" className="form-control" required type="date" onChange={(e) => setTaskData({ ...taskData, dateEnd: new Date(e.currentTarget.value).getTime() })} />
      </div>
      <div className="button-group">
        <button type="submit" className="button button-submit">Add</button>
        <button type="button" className="button button-submit" onClick={closeModal}>Cancel</button>
      </div>
    </form>
    )
}

export default CreateTask;