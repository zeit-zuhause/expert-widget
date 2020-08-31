import React, { useState, useEffect } from 'react';
import { Chat, Event, Videocam } from '@material-ui/icons';
import { ExpertProfileData } from '../model/ExpertProfileData';
import { getExpertUrl, getCallUrl } from '../services/UrlManager';
import styled from 'styled-components';
import LoadingIndicator from './LoadingIndicator';
import SingleButton from './SingleButton';
import * as Constants from '../constants/SharedConstants';

interface FloatingButtonProps {
    data: ExpertProfileData,
    domain: string,
    platformName: string | null,
    isLoading: boolean,
    apiError: boolean,
    wrongConfig: boolean,
    primaryColor: string,
    buttonTextColor: string,
    lightShadePrimaryColor: string,
    darkShadePrimaryColor: string
}

const FloatingButton = (props: FloatingButtonProps) => {
    const [platformNameToDisplay, setDomainNameToDisplay] = useState('');
    const vw = Math.min(document.documentElement.clientWidth, window.innerWidth);
    const gapToBorder = (vw < Constants.SMALL_VIEW_WIDTH) ? Constants.FLOATING_BUTTON_SMALL_GAP_TO_BORDER : Constants.FLOATING_BUTTON_LARGE_GAP_TO_BORDER;

    useEffect(() => {
        if (props.platformName) {
            setDomainNameToDisplay(props.platformName);
        } else {
            const secondLevelDomain = getSecondLevelDomainFromUrl(props.domain);
            if (secondLevelDomain) {
                setDomainNameToDisplay(secondLevelDomain);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const openExpertLink = () => {
        const url = getExpertUrl(props.domain, props.data.expert.experts[0].uuid);
        if (url !== '') {
            window.open(url, '_blank');
        }
    }

    const openCallLink = () => {
        const url = getCallUrl(props.domain, props.data.expert.experts[0].uuid);
        if (url !== '') {
            window.open(url, '_blank');
        }
    }

    const getSecondLevelDomainFromUrl = (url: string) => {
        let result;
        let match;
        //eslint-disable-next-line
        if (match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
            result = match[1];
            //eslint-disable-next-line
            if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
                result = match[1];
            }
            result = result.split('.')[0];
        }
        return result
    }

    const renderCallButton = () => {
        return (
            <SingleButton
                onClick={openCallLink}
                primaryColor={props.primaryColor}
                buttonTextColor={props.buttonTextColor}
                lightShadePrimaryColor={props.lightShadePrimaryColor}
                darkShadePrimaryColor={props.darkShadePrimaryColor}
                fontSize={Constants.FLOATING_BUTTON_SINGLE_BUTTON_FONT_SIZE}
                margin={Constants.SMALL_MARGIN}
                padding={Constants.STANDARD_PADDING}
                height={null}>
                <Videocam style={{ fontSize: Constants.FLOATING_BUTTON_SINGLE_BUTTON_FONT_SIZE }} />
            </SingleButton>
        );
    }

    const renderMessageButton = () => {
        if (props.data.expert.experts[0].allowMessaging === true) {
            return (
                <SingleButton
                    onClick={openExpertLink}
                    primaryColor={props.primaryColor}
                    buttonTextColor={props.buttonTextColor}
                    lightShadePrimaryColor={props.lightShadePrimaryColor}
                    darkShadePrimaryColor={props.darkShadePrimaryColor}
                    fontSize={Constants.FLOATING_BUTTON_SINGLE_BUTTON_FONT_SIZE}
                    margin={Constants.SMALL_MARGIN}
                    padding={Constants.STANDARD_PADDING}
                    height={null}>
                    <Chat style={{ fontSize: Constants.FLOATING_BUTTON_SINGLE_BUTTON_FONT_SIZE }} />
                </SingleButton>
            );
        }
    }

    const renderEventsButton = () => {
        if (props.data.events.length > 0) {
            return (
                <SingleButton
                    onClick={openExpertLink}
                    primaryColor={props.primaryColor}
                    buttonTextColor={props.buttonTextColor}
                    lightShadePrimaryColor={props.lightShadePrimaryColor}
                    darkShadePrimaryColor={props.darkShadePrimaryColor}
                    fontSize={Constants.FLOATING_BUTTON_SINGLE_BUTTON_FONT_SIZE}
                    margin={Constants.SMALL_MARGIN}
                    padding={Constants.STANDARD_PADDING}
                    height={null}>
                    <Event style={{ fontSize: Constants.FLOATING_BUTTON_SINGLE_BUTTON_FONT_SIZE }} />
                </SingleButton>
            );
        }
    }

    if (props.apiError) {
        return (
            <Container
                className='expert-widget__floating-button-container'
                lightShadePrimaryColor={props.lightShadePrimaryColor}
                gapToBorder={gapToBorder}>
                <ErrorText>Data for the given user could not be retrieved</ErrorText>
            </Container>
        );
    } else if (props.wrongConfig) {
        return (
            <Container
                className='expert-widget__floating-button-container'
                lightShadePrimaryColor={props.lightShadePrimaryColor}
                gapToBorder={gapToBorder}>
                <ErrorText>Wrong Configuration of the Widget</ErrorText>
            </Container>
        );
    } else if (props.isLoading) {
        return (
            <Container
                className='expert-widget__floating-button-container'
                lightShadePrimaryColor={props.lightShadePrimaryColor}
                gapToBorder={gapToBorder}>
                <LoadingIndicator spinnerColor={props.darkShadePrimaryColor} />
            </Container>
        );
    } else {
        return (
            <Container
                className='expert-widget__floating-button-container'
                lightShadePrimaryColor={props.lightShadePrimaryColor}
                gapToBorder={gapToBorder}>
                <InnerContainer className='expert-widget__floating-button-inner-container'>
                    {renderCallButton()}
                    {renderMessageButton()}
                    {renderEventsButton()}
                </InnerContainer>
                <Subtitle buttonTextColor={props.buttonTextColor}>
                    powered by <UrlText buttonTextColor={props.buttonTextColor}
                        href={'https://' + props.domain}
                        target='_blank'>{platformNameToDisplay}</UrlText>
                </Subtitle>
            </Container>
        );
    }
}

type ContainerProps = {
    lightShadePrimaryColor: string;
    gapToBorder: string;
};

type SubtitleProps = {
    buttonTextColor: string;
};

type UrlTextProps = {
    buttonTextColor: string;
};

const Container = styled.div<ContainerProps>`
    position: fixed;
    bottom: ${props => props.gapToBorder};
    right: ${props => props.gapToBorder};
    background-color: ${props => props.lightShadePrimaryColor};
    max-height: 120px;
    width: 200px;
    -webkit-border-radius: ${Constants.LARGE_BORDER_RADIUS};
    -moz-border-radius: ${Constants.LARGE_BORDER_RADIUS};
    border-radius: ${Constants.LARGE_BORDER_RADIUS};
    padding: ${Constants.SMALL_PADDING};
    border: solid #000000 2px;
    transition: all .15s ease-in-out;
    z-index: ${Constants.FLOATING_BUTTON_Z_INDEX};

    &:hover {
        transform: scale(1.02);
    }
`;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Subtitle = styled.p<SubtitleProps>`
    text-align: center;
    font-size: ${Constants.FLOATING_BUTTON_SUBTITLE_FONT_SIZE};
    margin: 0;
    font-family: inherit;
    color: ${props => props.buttonTextColor};
`;

const ErrorText = styled.p`
    text-align: center;
    font-size: ${Constants.ERROR_TEXT_FONT_SIZE};
    font-family: inherit;
`;

const UrlText = styled.a<UrlTextProps>`
    color: ${props => props.buttonTextColor};
`;

export default FloatingButton;