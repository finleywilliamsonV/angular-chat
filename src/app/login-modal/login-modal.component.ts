import { ModalDismissReasons, NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

    constructor(
        private modalService: NgbModal,
        private modalInstanceService: NgbActiveModal,
        private modalConfig: NgbModalConfig
    ) {
        console.log('modalConfig', modalConfig)
    }

    ngOnInit(): void {
    }

    

}
