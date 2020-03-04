export interface Interest {
    apply: number;
    interestId: string;
}

export interface PointsLastWeek {
    initDay?: any;
    lastDay?: any;
    points: number;
}

export interface PointsThisWeek {
    initDay?: any;
    lastDay?: any;
    points: number;
}

export interface PointsThisDay {
    additionalQuizz: number;
    booking: number;
    cancelBooking: number;
    enterApp: number;
    onboardingQuizz: number;
    qrScan: number;
    rate: number;
    redeem: number;
}

export interface Player {
    level: number;
    levelId: string;
    points: number;
    pointsLastWeek: PointsLastWeek;
    pointsThisWeek: PointsThisWeek;
    pointsThisDay: PointsThisDay;
    unlockedTier: string[];
    unlockedPerk: any[];
}

export interface UserAccount {
    birthDate: string;
    code: string;
    deviceId?: any;
    email: string;
    firstName: string;
    interest: Interest[];
    lastName: string;
    phone: string;
    player: Player;
    referralCode?: any;
    resetPass: boolean;
    userPhoto?: any;
}
