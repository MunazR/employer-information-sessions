import * as React from 'react';
import * as moment from 'moment';

export interface SessionInfo {
    id: number,
    employer: string,
    date: string,
    day: string,
    start_time: string,
    end_time: string,
    description: string,
    website: string,
    building: {
        code: string,
        name: string,
        room: string,
        latitude: number,
        longitude: number,
        map_url: string
    },
    audience: [string],
    link: string
}

export class SessionCard extends React.Component<SessionInfo, {}> {

    private getImageURL = () => {
        const buildingCode = this.props.building.code;

        switch(buildingCode) {
            case 'TC':
                return './images/locations/TC.jpg';
            case 'DC':
                return './images/locations/DC.jpg';
            case 'FED':
                return './images/locations/FED.jpg';
            case 'SLC':
                return './images/locations/SLC.jpg';
            case 'UC':
                return './images/locations/UC.jpg';
            default:
                return './images/locations/NA.jpg';
        }
    }

    private getStartTime = () => {
        return moment(this.props.date + ' ' + this.props.start_time).format('LT');
    }

    private getEndTime = () => {
        return moment(this.props.date + ' ' + this.props.end_time).format('LT');
    }

    render() {
        const now = new Date();
        const end = new Date(this.props.date + ' ' + this.props.end_time);
        let register = null;

        if (now.valueOf() - end.valueOf() < 0) {
            register = <a target="_blank" href={this.props.link}>Register</a>;
        } else {
            register = <a target="_blank" className="disabled" href={this.props.link}>Register</a>;
        }

        return (
            <section className="mdl-card section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                <div className="mdl-card__title">
                    <h2 className="mdl-card__title-text">{this.props.employer}</h2>
                </div>
                <div className="mdl-card__media">
                    <img className='employer-image' src={this.getImageURL()} alt="" />
                </div>
                <div className="mdl-card__supporting-text">
                    <div>{this.getStartTime()} - {this.getEndTime()}</div>
                    {this.props.building.code && this.props.building.code.length &&
                        <a href={this.props.building.map_url} target="_blank">
                            <i className="material-icons align-middle">map</i>
                            <span className="align-middle">{this.props.building.code} {this.props.building.room}</span>
                        </a>
                    }
                </div>
                <div className="mdl-card__actions">
                    {register}
                </div>
            </section>
        )
    }

}