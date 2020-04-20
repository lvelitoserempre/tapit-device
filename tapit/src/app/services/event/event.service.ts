import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/functions';
import { environment } from 'src/environments/environment';
import { Event } from 'src/app/models/event.model';

const KEY = 'api-key';
const VALUE = environment.cloudFunctionsApiKey;
const IS_MOBILE_KEY = 'isMobile';
const IS_MOBILE_VALUE = false;
const SITE_KEY = 'site';
const SITE_VALUE = 'Poker';
const USER_ID_KEY = 'userId';
const EVENT_ID_KEY = 'eventId';
const NUM_PEOPLE_KEY = 'numPeople';
const PARAMS = {
    [KEY]: VALUE
};

@Injectable({
    providedIn: 'root'
})
/**
 * Service for events
 */
export class EventService {

    private functions: firebase.functions.Functions;

    constructor() {
        this.functions = firebase.functions();
    }

    /**
     * Gets the event through firebase cloud functions
     */
    getEvents() {
        PARAMS[SITE_KEY] = SITE_VALUE;
        return this.call(environment.functions.getEvents, PARAMS);
    }

    getEventsOneTime() {
        PARAMS[IS_MOBILE_KEY] = IS_MOBILE_VALUE;
        PARAMS[SITE_KEY] = SITE_VALUE;
        return this.call(environment.functions.getEventsOneTime, PARAMS);
    }

    /**
     * Generates an event booking
     * @param userId The user uid
     * @param event The event
     */
    generateBooking(userId: string, event: Event) {
        PARAMS[IS_MOBILE_KEY] = IS_MOBILE_VALUE;
        PARAMS[USER_ID_KEY] = userId;
        PARAMS[EVENT_ID_KEY] = event.eventId;
        PARAMS[NUM_PEOPLE_KEY] = event.numPeople;

        return this.call(environment.functions.generateBooking, PARAMS);
    }

    /**
     * Makes the actual call to the cloud function with the specified payload
     * @param cloudFunction The name of the cloud function
     * @param payload The payload
     */
    private call(cloudFunction: string, payload: any) {
        return this.functions.httpsCallable(cloudFunction)(payload);
    }
}
