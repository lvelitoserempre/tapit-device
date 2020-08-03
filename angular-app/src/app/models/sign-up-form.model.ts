import {FormBuilder} from '@angular/forms';

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
