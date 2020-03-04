import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { EventService } from 'src/app/services/event/event.service';
import { Event } from 'src/app/models/event.model';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GenerateBookingResponse } from 'src/app/common/enums/generate-booking-response.enum';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';
import { UserAccount } from 'src/app/models/user-account.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
/**
 * Component for home screen
 */
export class HomeComponent implements OnInit {

    events: Event[];
    user: any;
    isLoading = false;

    constructor(
        private loaderService: LoaderService,
        private eventService: EventService,
        private dialogService: DialogService,
        private authService: AuthService,
        private userAccountService: UserAccountService
    ) {
        this.loaderService.isLoading.subscribe(
            (loading) => {
                this.isLoading = loading;
            }
        );
    }

    ngOnInit() {
        this.init();
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

    /**
     * Initializes the home screen
     */
    private async init() {
        await this.getUserAccount();
        await this.getEvent();
    }

    /**
     * Gets the user account
     */
    private async getUserAccount() {
        this.user = this.authService.getUserFromLocalStorage();
        // Set the user account data in local storage
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

}
