import {ElementRef, Renderer, Directive} from '@angular/core';

@Directive({
    selector: '[autoGrow]',
    host: {
        '(blur)': 'onBlur()',
        '(focus)': 'onFocus()'
    }
})
export class AutoGrowDirective {
    constructor(private el: ElementRef, private renderer: Renderer){
    }
    onFocus(){
        this.renderer.setElementStyle(this.el.nativeElement, 'width', '200');
    }

    onBlur(){
        this.renderer.setElementStyle(this.el.nativeElement, 'width', '120');
    }
}
