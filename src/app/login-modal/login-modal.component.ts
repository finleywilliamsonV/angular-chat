import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

    constructor(
        private modalService: NgbModal,
        private modalInstanceService: NgbActiveModal
    ) {
        
    }

    ngOnInit(): void {
    }

    

}
