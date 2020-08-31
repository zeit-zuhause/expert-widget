import React from 'react';
import { ExpertProfileData } from '../model/ExpertProfileData';
import { getExpertUrl, getEventUrl } from '../services/UrlManager';
import styled from 'styled-components';
import LoadingIndicator from './LoadingIndicator';
import ListElement from './ListElement';
import SingleButton from './SingleButton';
import * as Constants from '../constants/SharedConstants';
import moment from 'moment';

interface EventListProps {
    data: ExpertProfileData,
    domain: string,
    isLoading: boolean,
    listTitle: string,
    listButtonText: string,
    maxListItems: number,
    maxListDays: number,
    apiError: boolean,
    wrongConfig: boolean,
    primaryColor: string,
    buttonTextColor: string,
    lightShadePrimaryColor: string,
    darkShadePrimaryColor: string
}

const EventList = (props: EventListProps) => {

    const openExpertLink = () => {
        const url = getExpertUrl(props.domain, props.data.expert.experts[0].uuid);
        if (url !== '') {
            window.open(url, '_blank');
        }
    }

    const renderExpertProfileButton = () => {
        return (
            <SingleButton
                onClick={openExpertLink}
                primaryColor={props.primaryColor}
                buttonTextColor={props.buttonTextColor}
                lightShadePrimaryColor={props.lightShadePrimaryColor}
                darkShadePrimaryColor={props.darkShadePrimaryColor}
                fontSize={Constants.STANDARD_BUTTON_TEXT_FONT_SIZE}
                margin={Constants.LARGE_MARGIN}
                padding={Constants.STANDARD_PADDING}
                height={null}>
                {props.listButtonText}
            </SingleButton>
        );
    }

    if (props.apiError) {
        return (
            <Container className='expert-widget__event-list-container'>
                <ErrorText>Data for the given user could not be retrieved</ErrorText>
            </Container>
        );
    } else if (props.wrongConfig) {
        return (
            <Container className='expert-widget__event-list-container'>
                <ErrorText>Wrong Configuration of the Widget</ErrorText>
            </Container>
        );
    } else if (props.isLoading) {
        return (
            <Container className='expert-widget__event-list-container'>
                <EmptyLoadingListContainer>
                    <LoadingIndicator spinnerColor={props.darkShadePrimaryColor} />
                </EmptyLoadingListContainer>
            </Container>
        );
    } else {
        let listElements = [];
        // design alternative:
        // listElements.push(<Line key={'line-1'}/>);
        for (let i = 0; i < props.maxListItems && i < props.data.events.length; i++) {
            const currentDate = moment();
            const startTime = props.data.events[i].expectedStartTime;
            const eventDate = moment(startTime);
            const diff = eventDate.diff(currentDate);
            const diffDays = diff / 1000 / 60 / 60 / 24;
            if (diffDays < props.maxListDays || props.maxListDays < 0) {
                listElements.push(
                    <ListElement
                        key={props.data.events[i].uuid}
                        event={props.data.events[i]}
                        url={getEventUrl(props.domain, props.data.events[i].uuid)} />);
                listElements.push(<Line key={'line' + i} />);
            }
        }
        // design alternative: delete the last Line element
        listElements.pop();

        if (listElements.length > 0) {
            return (
                <Container className='expert-widget__event-list-container'>
                    <Headline>{props.listTitle}</Headline>
                    <List className='expert-widget__event-list'>
                        {listElements}
                    </List>
                    {renderExpertProfileButton()}
                </Container>
            );
        } else {
            return (
                <Container className='expert-widget__event-list-container'>
                    <Headline>{props.listTitle}</Headline>
                    <NoEventsText>Aktuell sind keine Events angelegt.</NoEventsText>
                    {renderExpertProfileButton()}
                </Container>
            );
        }
    }
}

const Container = styled.div`
    margin: ${Constants.LARGE_MARGIN};
    padding: 0;
    max-width: ${Constants.EVENT_LIST_MAX_WIDTH};
    border: solid #000000 1px;
    border-radius: ${Constants.LARGE_BORDER_RADIUS};
    font-size: ${Constants.EVENT_LIST_STANDARD_FONT_SIZE};
    background-color: white;
`

const Headline = styled.h3`
    padding-left: ${Constants.LARGE_PADDING};
    padding-right: ${Constants.LARGE_PADDING};
    font-family: inherit;
`

const NoEventsText = styled.p`
    color: #000000;
    margin: ${Constants.LARGE_PADDING};
`;

const List = styled.ul`
    list-style-type:none;
    padding-inline-start: 0px;
`

const Line = styled.div`
    margin-left: ${Constants.LARGE_MARGIN};
    margin-right: ${Constants.LARGE_MARGIN};
    margin-top: 1px;
    margin-bottom: 1px;
    background-color: #000000;
    height: 1px;
`;

const EmptyLoadingListContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${Constants.EVENT_LIST_LOADING_HEIGHT};
`

const ErrorText = styled.p`
    text-align: center;
    font-size: ${Constants.ERROR_TEXT_FONT_SIZE};
    font-family: inherit;
`;

export default EventList;