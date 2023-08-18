
import React from 'react';
import { createRoot } from 'react-dom/client';

const containerCssText = `
position: fixed;
left: 0;
bottom: 0;
width: 100vw;
height: 100vh;
z-index: 999;
cursor: auto;
background-color: rgba(128, 128, 128, 0.6);
`;

const divCssText = `
position: relative;
overflow: auto;
text-align: left;
z-index: 200;
top: calc((100vh - 600px) / 3);
left: calc((100vw - 600px) / 2);
width: 600px;
height: 600px;
border: 2px solid black;
border-radius: 8px;
color: #000;
background-color: #ffffff;
pointer-events: auto;
z-index: 25;        
`;

const DEFAULT_DESRUCTION_DELAY = 3000;
const noop = () => {}

interface IAsyncCommonOptions {
    destructionDelay: number;
}

const DEFAULT_OPTIONS: IAsyncCommonOptions = {
    destructionDelay: DEFAULT_DESRUCTION_DELAY
}

interface ICommonProps {
    onSubmit: (p: any) => void;
    onDismiss: () => void;
    show: boolean;
}

const asyncCommon = async (component: React.FC<ICommonProps>, options?: IAsyncCommonOptions) => {
    const {destructionDelay} = {...DEFAULT_OPTIONS, ...options};

    const container = document.createElement('div');
    container.style.cssText =  containerCssText;

    document.body.appendChild(container);

    const div = document.createElement('div');
    div.style.cssText = divCssText;

    container.appendChild(div);

    const root = createRoot(div);

    const renderComponent = (params: ICommonProps) => {
        const {show, onSubmit, onDismiss} = params;
        root.render(component({onSubmit, onDismiss, show}));
    }

    const hideComponent = (param: ICommonProps, callback: () => void) => {
        root.render(component(param));
        container.style.display = 'none';
        callback();
    }

    const destroyComponent = () => {
        root.unmount();
        container.removeChild(div);
        document.body.removeChild(container);
    }

    const confirmation = new Promise(resolve => {
        const onSubmit = (result: any) => resolve(result);
        const onDismiss = () => resolve(undefined);

        renderComponent({onSubmit, onDismiss, show: true});
    })

    confirmation.finally(() => {
        const onSubmit = noop;
        const onDismiss = noop;

        hideComponent({onSubmit, onDismiss, show: false}, () => {
            setTimeout(destroyComponent, destructionDelay);
        })
    })

    return confirmation;
}
 
export default asyncCommon;