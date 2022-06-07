import { ExpertProfileData } from '../model/ExpertProfileData';

export default async function getProfileData(user: string, domain: string): Promise<ExpertProfileData> {
    let getDataUrl = 'https://europe-west1-xpertyme-widget.cloudfunctions.net/webApi/api/v1/expertProfile?domain='
        + domain + '&user=' + user;

    // workaround because of cors
    // getDataUrl = 'https://cors-anywhere.herokuapp.com/' + getDataUrl;
    getDataUrl = 'https://cors-expert-widget.herokuapp.com/' + getDataUrl;

    const response = await fetch(getDataUrl);
    if (!response.ok) { // or check for response.status
        throw new Error(response.statusText);
    }
    return (await response.json()) as ExpertProfileData;
}