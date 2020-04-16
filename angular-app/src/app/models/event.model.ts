export interface Image {
    active: boolean;
    imageLink: string;
}

export interface EventOwner {
    NIT: string;
    phone: string;
    description: string;
    contractLink: string;
    timeAdded: any;
    representative: string;
    image: Image;
    name: string;
    eventOwnerId: string;
}

export interface EventPhoto {
    active: boolean;
    imageLink: string;
}

export interface Location {
    latitude: number;
    longitude: number;
}

export interface Interest {
    interestId: string;
    apply: number;
}

export interface Event {
    gmt: string;
    timeAdded: any;
    startDate: string;
    capacity: number;
    description: string;
    promotion: boolean;
    termsAndConditions: string;
    experienceId?: any;
    endTime: string;
    eventOwner: EventOwner[];
    type: string;
    price?: number;
    slogan: string;
    endDate: string;
    vigenceDays?: any;
    address: string;
    weekDays: string[];
    active: boolean;
    name: string;
    eventPhoto: EventPhoto[];
    location: Location;
    interest: Interest[];
    minInfluenceLevel?: any;
    startTime: string;
    venue?: any;
    numPeople: number;
    eventId: string;
}
