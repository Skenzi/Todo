import { render } from 'react-dom';
import './styles/app.scss';
import init from './init.jsx';

const runApp = () => {
    const app = document.getElementById('app');
    render(init(), app);
};

runApp();