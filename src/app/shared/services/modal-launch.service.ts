import { ModalDismissReasons, NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { ModalBindings, ModalStaticResponse, ModalWithBindings, MODAL_CLOSED, MODAL_DISMISSED } from '../models/modal.model';

/**
 * Modal Launch Service
 */

@Injectable({
    providedIn: 'root'
})
export class ModalLaunchService {

    /**
     * Constructor
     * @param modalService 
     */
    constructor(
        private modalService: NgbModal
    ) { }

    /**
     * Opens the modal with the provided modal options and bindings
     * @param content - the name of the component to open
     * @param modalOptions - the options to use for the modal
     * @param modalBindings - the properties to be bound to the modal instance
     * @returns Promise -> ModalStaticResponse
     */
    public async open<Bindings extends ModalBindings>(
        content: any,
        modalOptions?: NgbModalOptions,
        modalBindings?: Bindings
    ): Promise<ModalStaticResponse> {
        
        // open the modal and store the reference
        const modalRef: ModalWithBindings<Bindings> = this.modalService.open(content, modalOptions)

        // bind the properties to the modalRef
        if (modalBindings) {
            for (const [binding, value] of Object.entries(modalBindings)) {
                modalRef.componentInstance[binding] = value
            }
        }
        
        // wait for the result and pass the corresponding response
        return modalRef.result
            .then(
                (result: string) => {
                    console.log(`Closed with: ${result}`)
                    return MODAL_CLOSED
                },
                (reason: string | number) => {
                    console.log(`Dismissed ${this.getDismissReason(reason)}`)
                    return MODAL_DISMISSED
                }
            )
    }

    /**
     * Parses the dismiss reason into a readable string
     * @param reason 
     * @returns 
     */
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
