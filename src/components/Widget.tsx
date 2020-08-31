import React, { useState, useEffect } from 'react';
import FloatingButton from './FloatingButton';
import getProfileData from '../services/ExpertRestClient';
import { ExpertProfileData } from '../model/ExpertProfileData';
import { loadCachedData, saveDataToCache } from '../services/LocalStorageService';
import EventList from './EventList';
import styled from 'styled-components';
import tinycolor from 'tinycolor2';
import * as Constants from '../constants/SharedConstants';

export enum WidgetType {
    EventList,
    FloatingButton
}

interface WidgetProps {
    type: WidgetType
}

const Widget = (props: WidgetProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [domain, setDomain] = useState('');
    const [platformName, setPlatformName] = useState<string | null>(null);
    const [showFloatingButton, setShowFloatingButton] = useState(false);
    const [showEventList, setShowEventList] = useState(false);
    const [userData, setUserData] = useState({} as ExpertProfileData);
    const [maxListItems, setMaxListItems] = useState(Constants.DEFAULT_MAX_LIST_ITEMS);
    const [maxListDays, setMaxListDays] = useState(Constants.DEFAULT_MAX_LIST_DAYS);
    const [listTitle, setListTitle] = useState(Constants.EVENT_LIST_DEFAULT_TITLE);
    const [listButtonText, setListButtonText] = useState(Constants.EVENT_LIST_BUTTON_DEFAULT_TEXT);
    const [primaryColor, setPrimaryColor] = useState(Constants.DEFAULT_PRIMARY_COLOR);
    const [buttonTextColor, setButtonTextColor] = useState(Constants.DEFAULT_BUTTON_TEXT_COLOR);
    const [lightShadePrimaryColor, setLightShadePrimaryColor] = useState(tinycolor(primaryColor).lighten(Constants.LIGHTEN_PRIMARY_COLOR_AMOUNT).toString());
    const [darkShadePrimaryColor, setDarkShadePrimaryColor] = useState(tinycolor(primaryColor).darken(Constants.DARKEN_PRIMARY_COLOR_AMOUNT).toString());
    const [wrongConfig, setWrongConfig] = useState(false);
    const [apiError, setApiError] = useState(false);

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const htmlDecode = (input: string) => {
        const doc = new DOMParser().parseFromString(input, 'text/html');
        return doc.documentElement.textContent;
    }

    const getData = async () => {
        const htmlNode = document.getElementById('expert-widget');
        if (htmlNode) {
            const user = htmlNode.getAttribute('user');
            const domain = htmlNode.getAttribute('domain');
            const platformName = htmlNode.getAttribute('platform-name');
            const showFloatingButton = props.type === WidgetType.FloatingButton && htmlNode.hasAttribute('floating-button');
            const showEventList = props.type === WidgetType.EventList && htmlNode.hasAttribute('event-list');
            const maxListItems = htmlNode.getAttribute('max-list-items');
            const maxListDays = htmlNode.getAttribute('max-list-days');
            const listTitle = htmlNode.getAttribute('list-title');
            const primaryColor = htmlNode.getAttribute('primary-color');
            const buttonTextColor = htmlNode.getAttribute('button-text-color');
            const listButtonText = htmlNode.getAttribute('list-button-text');


            setShowFloatingButton(showFloatingButton);
            setShowEventList(showEventList);

            if (!showFloatingButton && !showEventList) {
                // nothing to show and therefore no need to load
                return;
            }

            if ((typeof user === 'string') && (typeof domain === 'string')) {
                setDomain(domain);
                if (typeof platformName === 'string') {
                    setPlatformName(platformName);
                }
                if (typeof listTitle === 'string') {
                    const htmlDecodedText = htmlDecode(listTitle)
                    if (htmlDecodedText) {
                        setListTitle(htmlDecodedText);
                    }
                }
                if (typeof listButtonText === 'string') {
                    setListButtonText(listButtonText);
                }
                if (typeof maxListItems === 'string') {
                    setMaxListItems(parseInt(maxListItems));
                }
                if (typeof maxListDays === 'string') {
                    setMaxListDays(parseInt(maxListDays));
                }
                if (typeof primaryColor === 'string') {
                    setPrimaryColor(primaryColor);
                    setLightShadePrimaryColor(tinycolor(primaryColor).lighten(Constants.LIGHTEN_PRIMARY_COLOR_AMOUNT).toString());
                    setDarkShadePrimaryColor(tinycolor(primaryColor).darken(Constants.DARKEN_PRIMARY_COLOR_AMOUNT).toString());
                }
                if (typeof buttonTextColor === 'string') {
                    setButtonTextColor(buttonTextColor);
                }

                const cachedUserData = loadCachedData(user, domain);
                if (!cachedUserData) {
                    try {
                        const data = await getProfileData(user, domain);
                        setUserData(data);
                        saveDataToCache(data, user, domain);
                        setIsLoading(false);
                    } catch (e) {
                        setApiError(true);
                        setIsLoading(false);
                    }
                } else {
                    setUserData(cachedUserData);
                    setIsLoading(false);
                }
            } else {
                setWrongConfig(true);
                setIsLoading(false);
            }
        }
    };

    const renderEventList = () => {
        if (showEventList) {
            return (
                <EventList data={userData}
                    domain={domain}
                    isLoading={isLoading}
                    listTitle={listTitle}
                    listButtonText={listButtonText}
                    maxListItems={maxListItems}
                    maxListDays={maxListDays}
                    apiError={apiError}
                    wrongConfig={wrongConfig}
                    primaryColor={primaryColor}
                    buttonTextColor={buttonTextColor}
                    lightShadePrimaryColor={lightShadePrimaryColor}
                    darkShadePrimaryColor={darkShadePrimaryColor} />
            );
        }

        return (<div />);
    }

    const renderFloatingButton = () => {
        if (showFloatingButton) {
            return (
                <FloatingButton data={userData}
                    domain={domain}
                    platformName={platformName}
                    isLoading={isLoading}
                    apiError={apiError}
                    wrongConfig={wrongConfig}
                    primaryColor={primaryColor}
                    buttonTextColor={buttonTextColor}
                    lightShadePrimaryColor={lightShadePrimaryColor}
                    darkShadePrimaryColor={darkShadePrimaryColor} />
            );
        }
    }

    return (
        <Container>
            {renderEventList()}
            {renderFloatingButton()}
        </Container>
    );

}

const Container = styled.div`
    font-family: inherit;
`;

export default Widget;