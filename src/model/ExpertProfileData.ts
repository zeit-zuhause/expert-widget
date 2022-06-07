export interface Expert {
    uuid: string,
    experts: Array <{
        uuid: string,
        allowMessaging: boolean
    }>
}

export interface Event {
    title: string,
    expectedDurationSeconds: number,
    expectedStartTime: string,
    // price: number,
    fullParticipantPrice: number,
    uuid: string
}

export interface ExpertProfileData {
    expert: Expert,
    events: Array<Event>
}

export interface CacheData {
    userData: ExpertProfileData
    date: Date
}