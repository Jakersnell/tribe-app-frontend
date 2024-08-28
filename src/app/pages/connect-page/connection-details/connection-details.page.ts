import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import { Router} from "@angular/router";
import { ConnectModelService } from '../_services/connect.model.service';
import { AlertService } from "src/app/_services/alert/alert.service";

@Component({
    selector: 'app-connection-details',
    templateUrl: './connection-details.page.html',
    styleUrls: ['./connection-details.scss']
})
export class ConnectionDetailsPage implements OnInit{
    connectedWithUserId: number;
    connectionDetails: any;

    constructor(
                private route: ActivatedRoute,
                private _connectModelService: ConnectModelService,
                private _alertService: AlertService,
                private _router: Router) {}

    ngOnInit() {
        this.initConnectedWithUserId();
    }

    initConnectedWithUserId() {
        const userIdString = this.route.snapshot.paramMap.get('userId');
        const userId = parseInt(userIdString, 10);
        this.connectedWithUserId = userId;
    }

    onCancelBtnClick() {
        this._router.navigate(['/connect/list-connections']);
    }

    // getCancelBtnClickFunc() {
    //     const self = this;
    //     return () => {
    //       self.navigateTo('/list-connections');
    //     }
    // }


    onRemoveBtnClick() {
      let self = this;
      this._alertService.show({
        header: 'Wait!',
        message: "Do you really want to remove this connection?",
        buttons: [{
          text: "Oops, no..",
          role: 'cancel'
        }, {
          text: 'Yes!',
          handler: () => {
            this._connectModelService.removeConnection(this.connectedWithUserId);
          }
        }]
      })
    }

    navigateTo(url?: string) {
        this._router.navigate([url], { replaceUrl: true });
    }
}