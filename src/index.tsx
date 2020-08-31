import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Widget, { WidgetType } from './components/Widget';

ReactDOM.render(
    <React.StrictMode>
        <Widget type={WidgetType.EventList} />
    </React.StrictMode>,
    document.getElementById('expert-widget')
);

ReactDOM.render(
    <React.StrictMode>
        <Widget type={WidgetType.FloatingButton} />
    </React.StrictMode>,
    document.body.appendChild(document.createElement('DIV'))
);