import { ExpertProfileData, CacheData } from '../model/ExpertProfileData';
import * as Constants from '../constants/SharedConstants';
import moment from 'moment';

const createDataToCache = (data: ExpertProfileData): CacheData => ({
    userData: data,
    date: new Date()
});

const getLocalStorageKey = (user: string, domain: string) => {
    return ('user-data-' + domain + '-' + user);
}

export function loadCachedData(user: string, domain: string): ExpertProfileData | null {

    const dataString = localStorage.getItem(getLocalStorageKey(user, domain));
    if (dataString) {
        const dataObject = JSON.parse(dataString);
        const currentDate = moment();
        const dataDate = moment(dataObject.date);
        const diffMinutes = (currentDate.diff(dataDate)) / 1000 / 60;
        if (diffMinutes < Constants.MAX_MINUTES_SINCE_LAST_ACCESS) {
            return dataObject.userData;
        }
    }
    return null;
}

export function saveDataToCache(data: ExpertProfileData, user: string, domain: string) {
    if (data) {
        const dataToCache = createDataToCache(data);
        localStorage.setItem(getLocalStorageKey(user, domain), JSON.stringify(dataToCache));
    }
}