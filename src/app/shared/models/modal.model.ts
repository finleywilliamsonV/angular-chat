import { ModalDismissReasons, NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

export type ModalStaticResponse = typeof MODAL_CLOSED | typeof MODAL_DISMISSED
export const MODAL_CLOSED = 'modal closed'
export const MODAL_DISMISSED = 'modal dismissed'

export type ModalBindings = {
    [key: string]: any
}

export type ModalWithBindings<T> = NgbModalRef & {
    componentInstance: T
}