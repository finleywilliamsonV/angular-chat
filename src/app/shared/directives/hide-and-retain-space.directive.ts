import { Directive, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

/**
 * Hide and Retain Space Directive
 * 
 * Hides the host element based on the input parameter, but preserves the height of the host element while hidden.
 */
@Directive({
    selector: '[hideAndRetainSpace]'
})
export class HideAndRetainSpaceDirective implements OnChanges {

    // injected variable
    @Input()
    public hideAndRetainSpace: boolean

    // bind to the host's visibility property
    @HostBinding('style.visibility')
    public visibility: string
    
    /**
     * On Changes Lifecycle Hook
     * @param changes 
     */
    public ngOnChanges(changes: SimpleChanges): void {
        this.visibility = this.hideAndRetainSpace ? 'hidden' : 'inherit'
    }
}
