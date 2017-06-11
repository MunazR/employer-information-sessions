import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as moment from 'moment';

import { App } from './components/App';

const today = moment().toDate();
const tomorrow = moment().add(1, 'days').toDate();

ReactDOM.render(
    <App date={today} />,
    document.getElementById("today")
);

ReactDOM.render(
    <App date={tomorrow} />,
    document.getElementById("tomorrow")
);