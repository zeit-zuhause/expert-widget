import React from 'react';
import styled from 'styled-components';
import { Event } from '../model/ExpertProfileData';
import * as Constants from '../constants/SharedConstants';
import moment from 'moment';
import 'moment/locale/de';
moment.locale('de');

interface ListElementProps {
    event: Event,
    url: string
}

const ListElement = (props: ListElementProps) => {
    const formatPrice = (price: number) => {
        if (price === 0) {
            return 'Preis: kostenfrei';
        } else {
            return 'Preis: ' + price.toFixed(2).replace('.', ',') + ' €';
        }
    }

    const formatStartTime = (startTime: string) => {
        const date = moment(startTime);
        return date.format('D. MMMM YYYY, HH:mm [Uhr]');
    }

    const formatDuration = (durationSeconds: number) => {
        const secondsOf1Hour = 3600;
        const secondsOf24Hours = secondsOf1Hour * 24;
        const secondsof1Month = secondsOf24Hours * 31;
        let output = 'Dauer: ';
        if (durationSeconds > 0 && durationSeconds < secondsOf1Hour) {
            output = output + moment.duration(durationSeconds, 'seconds').minutes() + ' Minuten';
        } else if (durationSeconds % secondsOf1Hour === 0 && durationSeconds < secondsOf24Hours) {
            output = output + moment.duration(durationSeconds, 'seconds').hours();
            if (durationSeconds === secondsOf1Hour) {
                output = output + ' Stunde';
            } else {
                output = output + ' Stunden';
            }
        } else if (durationSeconds > secondsOf1Hour && durationSeconds < secondsOf24Hours) {
            output = output + moment.duration(durationSeconds, 'seconds').hours() + ':';
            if (moment.duration(durationSeconds, 'seconds').minutes() < 10) {
                output = output + '0';
            }
            output = output + moment.duration(durationSeconds, 'seconds').minutes() + ' Stunden';
        } else if (durationSeconds > secondsOf24Hours && durationSeconds < secondsof1Month) {
            output = output + moment.duration(durationSeconds, 'seconds').days() + ' Tage, '
                + moment.duration(durationSeconds, 'seconds').hours() + ' Stunden';
        } else {
            output = output + 'nicht verfügbar';
        }
        return output;
    }

    const openExpertLink = () => {
        if (props.url !== '') {
            window.open(props.url, '_blank');
        }
    }

    return (
        // make this clickable -> open new tab
        <Clickable onClick={openExpertLink}>
            <List>
                <Title>{props.event.title}</Title><br />
                <Span>{formatStartTime(props.event.expectedStartTime)}</Span><br />
                <Span>{formatDuration(props.event.expectedDurationSeconds)}</Span><br />
                <Span>{formatPrice(props.event.price)}</Span>
            </List>
        </Clickable >
    )
}

const List = styled.li`
    padding-left: ${Constants.LARGE_PADDING};
    padding-right: ${Constants.LARGE_PADDING};
    padding-top: ${Constants.STANDARD_PADDING};
    padding-bottom: ${Constants.STANDARD_PADDING};
`;

const Clickable = styled.div`
    cursor: pointer;

    &:hover {
        background: ${Constants.LIGHT_GREY_2};
    }
`;

const Title = styled.span`
    font-weight: bold;
    color: #000000;
`;

const Span = styled.span`
    color: ${Constants.DARK_GREY_2};
`;

export default ListElement;