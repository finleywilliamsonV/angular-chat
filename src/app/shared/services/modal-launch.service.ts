import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ModalLaunchService {

    private closeResult: string

    constructor(
        private modalService: NgbModal
    ) { }

    public async open(content: any, options?: NgbModalOptions) {
        console.log('options', options)
        this.modalService.open(content, options).result
        .then(
            (result: string) => {
                this.closeResult = `Closed with: ${result}`
            },
            (reason: string | number) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
            }
        )
    }

    private getDismissReason(reason: string | number): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC'
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop'
        } else {
            return `with: ${reason}`
        }
    }
}
