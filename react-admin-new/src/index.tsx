import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SharedModule from './shared/shared';

let root: ReactDOM.Root;

const render = (props: any) => {
  const {container, shared = SharedModule.getShared()} = props;

  if(props.shared) {
    SharedModule.overloadShared(props.shared);
  }else{
    SharedModule.overloadShared(shared);
  }

  if(container) {
    root = ReactDOM.createRoot(container.querySelector('#root'));
  }else{
    root = ReactDOM.createRoot(document.querySelector('#root') as HTMLElement);
  }

  root.render(
    <React.StrictMode>
      <App shared = {SharedModule.getShared()} />
    </React.StrictMode>
  )
}

if(!window.__RICHON_SHELL__) {
  render({shared: SharedModule.getShared()})
}

export const bootstrap = async () => {

}

export const mount = async (props: any = {}) => {
  render(props);
}

export const unmount = async (props: any) => {
  root.unmount();
}

reportWebVitals();
