
export function getExpertUrl(domain: string, user: string) {
    if (domain && user) {
        return ('https://' + domain + '/de/p/' + user);
    } else {
        return '';
    }
}

export function getEventUrl(domain: string, eventUuid: string) {
    if (domain && eventUuid) {
        return ('https://' + domain + '/de/event/' + eventUuid);
    } else {
        return '';
    }
}

export function getCallUrl(domain: string, eventUuid: string) {
    if (domain && eventUuid) {
        return ('https://' + domain + '/de/expert/call/preparation/' + eventUuid);
    } else {
        return '';
    }
}