import { render } from 'react-dom';
import './styles/app.scss';
import init from './init';

const runApp = async () => {
  const app = document.getElementById('app');
  render(await init(), app);
};

runApp();
