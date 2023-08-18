import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SharedModule from './shared/shared';

let root: ReactDOM.Root;

function render(props: any){
	const {container, shared = SharedModule.getShared()} = props;
	if(props.shared){
		SharedModule.overloadShared(props.shared);
	}else{
		SharedModule.overloadShared(shared);
	}
	if(container) {
		root = ReactDOM.createRoot(container.querySelector('#root'));
	}else {
		root = ReactDOM.createRoot(document.querySelector('#root') as HTMLElement);
	}

	root.render(
		<React.StrictMode>
		  <App  shared = {SharedModule.getShared()} />
		  {/* <App></App> */}
		</React.StrictMode>
	);
}

if(!window.__RICHON_SHELL__) {
	console.log('!window.__RICHON_SHELL_', !window.__RICHON_SHELL__);
  	render({shared: SharedModule.getShared()});
}

export async function bootstrap() {
	console.log('bootstrap');
}

export async function mount(props: any = {}) {
	console.log('mount', props);
	render(props);
}

export async function unmount(props: any) {
	console.log('unmount');
	root.unmount();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
