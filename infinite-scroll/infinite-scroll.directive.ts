/**
 * @author Noman Hasan
 * @email nomanbinhussein@gmail.com
 * 
 */


import { Directive, Output, EventEmitter, HostListener, OnInit, HostBinding, ElementRef, Input } from '@angular/core';



import log from '../../logger/logger';

enum EMIT_STATUS {
  NONE,
  PREVIOUS,
  NEXT
} 


@Directive({
  selector: '[hxInfiniteScroll]'
})
export class InfiniteScrollDirective implements OnInit {



  scrollTop;

  scrollMaximum;

  scrollPercentage;

  emitHistory = EMIT_STATUS.NONE;


  @Input() previousThreshold = 30;


  @Input() nextThreshold = 70;


  @Output() next: EventEmitter<any>;


  @Output() previous: EventEmitter<any>;



  @Input() set scrollBarUp(value){
    const st = this.el.nativeElement.scrollTop;
    // this.el.nativeElement.scrollTop = ((st*80) / 100)
  }



  constructor(
    private el: ElementRef
  ) { 

    this.next = new EventEmitter<any>();
    
    this.previous = new EventEmitter<any>();


  }

  ngOnInit() {

  }



  @HostListener('scroll', ['$event']) onscroll(event) {
    this.scrollTop = this.el.nativeElement.scrollTop;

    this.emitEvent();

  }

  



  emitEvent() {
    this.scrollMaximum = this.el.nativeElement.scrollHeight - this.el.nativeElement.clientHeight;

    this.scrollPercentage = (this.scrollTop / this.scrollMaximum) * 100;

    if (this.scrollPercentage > this.nextThreshold) {

      if (this.emitHistory !== EMIT_STATUS.NEXT) {

        this.emitNext();

      }

    } else if (this.scrollPercentage < this.previousThreshold) {

      if (this.emitHistory !== EMIT_STATUS.PREVIOUS) {

        this.emitPrevious();

      }
      
    } else {
      this.emitHistory = EMIT_STATUS.NONE;
    }

  }

  emitNext() {

    this.next.emit(this.scrollPercentage);

    this.emitHistory = EMIT_STATUS.NEXT;

  }

  emitPrevious() {

    this.previous.emit(this.scrollPercentage);

    this.emitHistory = EMIT_STATUS.PREVIOUS;

  }


}
