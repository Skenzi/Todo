import { render } from 'react-dom';
import './styles/app.scss';
import init from './init.jsx';

const runApp = () => {
    const container = document.getElementById('container');
    render(init(), container);
};

runApp();