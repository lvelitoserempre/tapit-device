import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { EventService } from 'src/app/services/event/event.service';
import { Event } from 'src/app/models/event.model';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GenerateBookingResponse } from 'src/app/common/enums/generate-booking-response.enum';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';
import { UserAccount, FromPoker } from 'src/app/models/user-account.model';
import { Base64 } from 'js-base64';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
/**
 * Component for home screen
 */
export class HomeComponent implements OnInit {

    @Input() event: Event;
    @Output() subscribe = new EventEmitter<Event>();

    events: Event[];
    oneTimeEvents: Event[];
    user: any;
    isLoading = false;
    userReferralCode: string;
    userFirstName: string;

    userAccountValue = {
        "birthDate":"18/06/1992",
        "code":null,
        "deviceId":null,
        "email":"prieto@mail.com",
        "firstName":"coco",
        "lastName":"prieto",
        "phone":"1234512345",
        "player": {
            "level":"Cero",
            "levelId":"level0",
            "points":0,
            "pointsLastWeek": {
                "initDay":null,
                "lastDay":null,
                "points":0
            },
            "pointsThisWeek": {
                "initDay":null,
                "lastDay":null,
                "points":0
            },
            "pointsThisDay": {
                "additionalQuizz":0,
                "booking":0,
                "cancelBooking":0,
                "enterApp":0,
                "onboardingQuizz":0,
                "qrScan":0,
                "rate":0,
                "redeem":0
            },
            "unlockedPerk":[],
            "unlockedTier":["tier1"]
        },
        "referralCode":"addd",
        "resetPass":false,
        "userPhoto":null,
        "pid": ""
    };

    shareURL = environment.shareUrl;
    showLinkCopied = false;
    estereoPicnic = false;
    loadData = true;
    fromPoker: FromPoker  = {
        user: false
    };
    origin = window.location.origin;

    // Reference urlHiddenInput variable inside Component
    @ViewChild('urlHiddenInput', {static: false}) urlHiddenInputRef: ElementRef;

    constructor(
        private loaderService: LoaderService,
        private eventService: EventService,
        private dialogService: DialogService,
        private authService: AuthService,
        private userAccountService: UserAccountService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.loaderService.isLoading.subscribe(
            (loading) => {
                this.isLoading = loading;
            }
        );
    }

    get isLoggedIn(): boolean { return this.authService.isLoggedIn; }

    ngOnInit() {
        this.init();
        if (this.loadData) {
            const userAccount = this.userAccountService.getUserAccountFromLocalStorage();
            setTimeout(() => {
                this.shareURL = this.shareURL.replace('{0}',userAccount.code);
            }, 500);
            this.userReferralCode = userAccount.code;
            this.userFirstName = userAccount.firstName;
        }
    }

    /**
     * On subscribe event
     * @param event The event
     */
    onSubscribe(event: Event) {
        this.loaderService.show();
        const userId = this.user.uid;
        this.eventService.generateBooking(userId, event)
            .then((response) => {
                const code = response.data.result;
                switch (code) {
                    case GenerateBookingResponse.GENERATE_BOOKING_OK:
                        const qrCode = response.data.booking.bookingCode;
                        this.dialogService.openQRDialog(qrCode);
                        break;

                    case GenerateBookingResponse.GENERATE_BOOKING_SOLD_OUT:
                        this.dialogService.openEventBookingSoldOutErrorDialog();
                        break;

                    case GenerateBookingResponse.GENERATE_BOOKING_ALREADY_GENERATED_BY_USER:
                        this.dialogService.openEventBookingAlreadyGeneratedByUserErrorDialog();
                        break;
                    case GenerateBookingResponse.GENERATE_BOOKING_ALREADY_REDEEMED:
                        this.dialogService.openEventBookingAlreadyRedeemedErrorDialog();
                        break;

                    default:
                        break;
                }
                this.loaderService.hide();
            })
            .catch((error) => {
                this.loaderService.hide();
                this.dialogService.openGenerateBookingErrorDialog();
            });
    }

    onStepAction(stepNumber: number){
        if(stepNumber === 1) { // book multi venue event
            if(this.events && this.events.length > 0) {
                this.onSubscribe(this.events[0]);
            }
        } else if (stepNumber === 3) {// show invite friends dialog
          this.dialogService.openShareDialog(this.shareURL);
        }
    }

    /**
     * Initializes the home screen
     */
    private async init() {
        let userDataParam = this.route.snapshot.queryParamMap.get("u");
        if(!!userDataParam) {
            await this.registerPokerUser(userDataParam);
        }
        await this.getUserAccount();
        await this.getEvent();
        await this.getEventsOneTime();
    }

    private async registerPokerUser(userDataParam) {
        this.loadData = false;
        this.loaderService.show();

        let userData = JSON.parse(Base64.decode(userDataParam));

        this.userAccountValue.birthDate = userData.birthdate;
        this.userAccountValue.firstName = userData.name;
        this.userAccountValue.lastName = userData.surname;
        this.userAccountValue.email = userData.email;
        this.userAccountValue.referralCode = userData.refcode;
        this.userAccountValue.pid = userData.id;

        userData.password = userData.id;
        // Sign up with firebase
        const user = await this.authService.signUp(userData.email, userData.password).catch((error) => {
            this.loaderService.hide();
            //this.dialogService.manageError(error);
            this.fromPoker.user = true;
            // this.router.navigate(['/login']);
            window.location.href = this.origin + '/login'
        });
        if(user !== undefined) {
            // Set the user info in local storage
            console.log(user)
            this.authService.setUserInLocalStorage(user.user);

            // Create a new item in the user account collection
            await this.userAccountService.create(this.userAccountValue).catch((error) => {
                this.loaderService.hide();
                //this.dialogService.manageError(error);
            });

            // Create a referral code for the user
            await this.userAccountService.createUserReferralCode(user.user.uid).catch((error) => {
                this.loaderService.hide();
                //this.dialogService.manageError(error);
            });

            //const referralCode = this.signUpForm.get('referralCode').value;

            if (!!userData.refcode) {
                await this.userAccountService.applyPromotionalCode(user.user.uid, userData.refcode).catch((error) => {
                    this.loaderService.hide();
                    //this.dialogService.manageError(error);
                });
            }

            // Send welcoming email
            //await this.userAccountService.sendEmailUserRegister(user.user.uid).catch((error) => {
                //this.loaderService.hide();
                //this.dialogService.manageError(error);
            //});
        }

        // Log in with firebase
        await this.authService.login(userData.email, userData.password).catch((error) => {
            this.loaderService.hide();
            //this.dialogService.manageError(error);
        });

        this.loaderService.hide();
        // this.router.navigate(['/home']);
    }

    /**
     * Gets the user account
     */
    private async getUserAccount() {
        this.user = this.authService.getUserFromLocalStorage();
        // Set the user account data in local storage
        if (this.user) {
            this.userAccountService.getUserAccount(this.user.uid)
            .then((doc) => {
                if (doc.exists) {
                    const userAccount: UserAccount = doc.data() as UserAccount;
                    this.userAccountService.setUserAccountInLocalStorage(userAccount);
                }
            })
            .catch(() => {
                // TODO: manage error
                this.loaderService.hide();
            });
        } 
        
    }

    /**
     * Get the event
     */
    private async getEvent() {
        this.loaderService.show();
        this.eventService.getEvents()
            .then((events) => {
                this.events = [];
                this.events = events.data as Event[];
                this.loaderService.hide();
            })
            .catch(() => {
                this.loaderService.hide();
            });
    }

    private async getEventsOneTime() {
        this.loaderService.show();
        this.eventService.getEventsOneTime()
            .then((events) => {
                this.oneTimeEvents = [];
                this.oneTimeEvents = events.data.filter(e => e.type === 'ONE_TIMER') as Event[];
                console.log(this.oneTimeEvents);
                this.loaderService.hide();
            })
            .catch(() => {
                this.loaderService.hide();
            });
    }

    /**
     * Hour format AM PM
     */
    getHour(time) {
        if (time) {
            time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

            if (time.length > 1) {
                time = time.slice (1);
                time[5] = +time[0] < 12 ? ' AM' : ' PM';
                time[0] = +time[0] % 12 || 12;
            }
            return time.join ('');
        }
    }
    /**
     * Month name format
     */
    displayDate(date) {
        if (date) {
            const months = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
            let date1 = date.slice(0, 2);
            let date2 = date.slice(2, 4);
            let date3 = date.slice(4, 8);
            let completeDate = new Date(date1 + "-" + date2 + "-" + date3);
            let result = date2 + ' ' + months[completeDate.getMonth()];
            return result;
        }
    }
    /**
     * Day name format
     */
    displayDay(date) {
        if (date) {
            const dayNames = ['LUN','MAR','MIE','JUE','VIE','SAB','DOM'];
            let date1 = date.slice(0, 2);
            let date2 = date.slice(2, 4);
            let date3 = date.slice(4, 8);
            let completeDate = new Date(date1 + "-" + date2 + "-" + date3);
            let result = dayNames[completeDate.getDay()];
            return result;
        }
    }
    slideConfig = {
        "slidesToShow": 1,
        "slidesToScroll": 1,
        "dots": true,
        "responsive": [
            {
                "breakpoint": 980,
                "settings": {
                    "slidesToShow": 1,
                    "slidesToScroll": 1,
                }
            }
        ]
    };

    selectAndCopy($event) {
      //const input = $event.target;
      //input.select();
      //document.execCommand('copy');
      //input.setSelectionRange(0, 0);
      
      const input = this.urlHiddenInputRef.nativeElement;
      let selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = input.value;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);

      this.showLinkCopied = true;
      setTimeout(() => {
        this.showLinkCopied = false;
      }, 2000);
    }
}
