import { Validators, FormBuilder } from '@angular/forms';
import { UnderAgeValidator } from '../common/utils/validators';

/**
 * Model for 'sign up' form
 */
export class SignUpFormModel {
    birthDate = ['', Validators.compose([
        Validators.required,
        UnderAgeValidator
    ])];
    code = null;
    deviceId = null;
    email = ['', [Validators.required, Validators.email]];
    // The password field is not part of the final model
    // Is required for user creation purposes only and
    // will be removed before sending the final form
    password = ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]{6,}$/),
    ])];
    firstName = ['', Validators.required];
    lastName = ['', Validators.required];
    phone = ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/),
    ])];
    player = new FormBuilder().group(new PlayerFormModel());
    referralCode = null;
    resetPass = false;
    userPhoto = null;
}

/**
 * Model for 'points last week' form
 */
export class PointsLastWeekFormModel {
    initDay = null;
    lastDay = null;
    points = 0;
}

/**
 * Model for 'points this week' form
 */
export class PointsThisWeekFormModel {
    initDay = null;
    lastDay = null;
    points = 0;
}

/**
 * Model for 'points this day' form
 */
export class PointsThisDayFormModel {
    additionalQuizz = 0;
    booking = 0;
    cancelBooking = 0;
    enterApp = 0;
    onboardingQuizz = 0;
    qrScan = 0;
    rate = 0;
    redeem = 0;
}

/**
 * Model for 'player' form
 */
export class PlayerFormModel {
    level = 'Cero';
    levelId = 'level0';
    points = 0;
    pointsLastWeek = new FormBuilder().group(new PointsLastWeekFormModel());
    pointsThisWeek = new FormBuilder().group(new PointsThisWeekFormModel());
    pointsThisDay = new FormBuilder().group(new PointsThisDayFormModel());
    unlockedPerk = [[]];
    unlockedTier = [['tier1']];
}
