import * as React from 'react';
import * as moment from 'moment';

import { SessionCard, SessionInfo } from './Session';

interface AppProps {
    date: Date
}

interface AppState {
    isLoading: boolean,
    sessions: SessionInfo[]
}

export class App extends React.Component<AppProps, AppState> {

    private dataURL = 'https://api.uwaterloo.ca/v2/resources/infosessions.json?key=8ba5813a8da454869db638eec2845e0e'

    state = {
        isLoading: true,
        sessions: [] as SessionInfo[]
    }

    componentWillMount() {
        fetch(this.dataURL)
            .then((response) => response.json())
            .then((responseJSON) => {
                const sessions: SessionInfo[] = [];

                responseJSON.data.forEach((session: SessionInfo) => {
                    sessions.push(session);
                });

                this.setState({
                    isLoading: false,
                    sessions: sessions
                });
            });
    }

    render() {
        const { isLoading, sessions } = this.state;
        const { date } = this.props;

        const todaySessions = sessions.filter((session: SessionInfo) => {
            const sessionDate = moment(session.date);
            const momentDate = moment(date);

            return sessionDate.dayOfYear() === momentDate.dayOfYear();
        });

        todaySessions.sort((a: SessionInfo, b: SessionInfo) => {
            const aStartDate = Date.parse(a.date + ' ' + a.start_time);
            const bStartDate = Date.parse(b.date + ' ' + b.start_time);

            return aStartDate - bStartDate;
        });

        const sessionCards = todaySessions.map((session: SessionInfo, index: number) => {
            return <SessionCard key={index} {...session} />
        });

        return (
            <div id="content">
                {isLoading && <div id="p2" className="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>}
                {!isLoading && <h4 className="align-center">{moment(date).format('dddd MMMM Do')}</h4>}
                {!isLoading && todaySessions.length === 0 && <h4 className="align-center">No employer information sessions</h4>}
                {!isLoading && todaySessions.length !== 0 && <div className="mdl-grid">{sessionCards}</div>}
            </div>
        );
    }
}