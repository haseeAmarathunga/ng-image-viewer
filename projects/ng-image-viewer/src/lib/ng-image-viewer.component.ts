import {Component, EventEmitter, HostListener, Inject, Input, OnInit, Optional, Output} from '@angular/core';
import {ImageViewerConfig} from './model/image-viewer-config.model';
import {CustomImageEvent} from './model/custom-image-event-model';

const DEFAULT_CONFIG: ImageViewerConfig = {
  btnClass: 'default',
  zoomFactor: 0.1,
  containerBackgroundColor: '#ccc',
  wheelZoom: true,
  allowFullscreen: true,
  allowKeyboardNavigation: true,
  btnShow: {
    zoomIn: true,
    zoomOut: true,
    rotateClockwise: true,
    rotateCounterClockwise: true,
  },
  btnIcons: {
    zoomIn: 'fa fa-plus',
    zoomOut: 'fa fa-minus',
    rotateClockwise: 'fa fa-repeat',
    rotateCounterClockwise: 'fa fa-undo',
    fullscreen: 'fa fa-arrows-alt',
  }
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ng-image-viewer',
  template: `
      <div class="img-container" [style.backgroundColor]="config.containerBackgroundColor"
           (wheel)="scrollZoom($event)" (dragover)="onDragOver($event)">
          <div [ngStyle]="{width: width+'px',height: height+'px'}">
              <img [src]="src[index]"  [ngStyle]="style" alt="Image not found..." (dragstart)="onDragStart($event)"
                   (load)="onLoad()" (loadstart)="onLoadStart()" />
              <!-- Div below will be used to hide the 'ghost' image when dragging -->
          </div>
          <div></div>
          <div class="spinner-container" *ngIf="loading">
              <div class="spinner"></div>
          </div>

          <button type="button" [class]="config.btnClass" *ngIf="config.btnShow.rotateCounterClockwise"
                  (click)="rotateCounterClockwise()">
              <span [class]="config.btnIcons.rotateCounterClockwise"></span>
          </button>
          <button type="button" [class]="config.btnClass" *ngIf="config.btnShow.rotateClockwise" (click)="rotateClockwise()">
              <span [class]="config.btnIcons.rotateClockwise"></span>
          </button>

          <button type="button" [class]="config.btnClass" *ngIf="config.btnShow.zoomOut" (click)="zoomOut()">
              <span [class]="config.btnIcons.zoomOut"></span>
          </button>
          <button type="button" [class]="config.btnClass" *ngIf="config.btnShow.zoomIn" (click)="zoomIn()">
              <span [class]="config.btnIcons.zoomIn"></span>
          </button>

          <!--    <button type="button" [class]="config.btnClass" *ngFor="let cBtn of config.customBtns"-->
          <!--        (click)="fireCustomEvent(cBtn.name, index)">-->
          <!--        <span [class]="cBtn.icon"></span>-->
          <!--    </button>-->

          <button type="button" [class]="config.btnClass" (click)="toggleFullscreen()"
                  *ngIf="config.allowFullscreen">
              <span [class]="config.btnIcons.fullscreen"></span>
          </button>

          <div class="nav-button-container" *ngIf="src.length > 1">
              <button type="button" [class]="config.btnClass" (click)="prevImage($event)" [disabled]="index === 0">
                  <span [class]="config.btnIcons.prev"></span>
              </button>
              <button type="button" [class]="config.btnClass" (click)="nextImage($event)" [disabled]="index === src.length - 1">
                  <span [class]="config.btnIcons.next"></span>
              </button>
          </div>
      </div>
  `,
  styleUrls: ['./ng-image-viewer.component.scss' ]
})
export class NgImageViewerComponent implements OnInit {

  @Input()
  src: string[];

  @Input()
  width: string;

  @Input()
  height: string;

  @Input()
  index = 0;

  @Input()
  config: ImageViewerConfig;

  @Output()
  indexChange: EventEmitter<number> = new EventEmitter();

  @Output()
  configChange: EventEmitter<ImageViewerConfig> = new EventEmitter();

  @Output()
  customImageEvent: EventEmitter<CustomImageEvent> = new EventEmitter();

  public style = { transform: '', msTransform: '', oTransform: '', webkitTransform: '', cursor: 'pointer' };
  public fullscreen = false;
  public loading = true;
  private scale = 1;
  private rotation = 0;
  private translateX = 0;
  private translateY = 0;
  private prevX: number;
  private prevY: number;
  private hovered = false;

  constructor(@Optional() @Inject('config') public moduleConfig: ImageViewerConfig) { }

  ngOnInit() {
    const merged = this.mergeConfig(DEFAULT_CONFIG, this.moduleConfig);
    this.config = this.mergeConfig(merged, this.config);
    this.triggerConfigBinding();
  }

  @HostListener('window:keyup.ArrowRight', ['$event'])
  nextImage(event) {
    if (this.canNavigate(event) && this.index < this.src.length - 1) {
      this.loading = true;
      this.index++;
      this.triggerIndexBinding();
      this.reset();
    }
  }

  @HostListener('window:keyup.ArrowLeft', ['$event'])
  prevImage(event) {
    if (this.canNavigate(event) && this.index > 0) {
      this.loading = true;
      this.index--;
      this.triggerIndexBinding();
      this.reset();
    }
  }

  zoomIn() {
    this.scale *= (1 + this.config.zoomFactor);
    this.updateStyle();
  }

  zoomOut() {
    if (this.scale > this.config.zoomFactor) {
      this.scale /= (1 + this.config.zoomFactor);
    }
    this.updateStyle();
  }

  scrollZoom(evt) {
    if (this.config.wheelZoom) {
      evt.deltaY > 0 ? this.zoomOut() : this.zoomIn();
      return false;
    }
  }

  rotateClockwise() {
    this.rotation += 90;
    this.updateStyle();
  }

  rotateCounterClockwise() {
    this.rotation -= 90;
    this.updateStyle();
  }

  onLoad() {
    this.loading = false;
  }

  onLoadStart() {
    this.loading = true;
  }

  onDragOver(evt) {
    this.translateX += (evt.clientX - this.prevX);
    this.translateY += (evt.clientY - this.prevY);
    this.prevX = evt.clientX;
    this.prevY = evt.clientY;
    this.updateStyle();
  }

  onDragStart(evt) {
    this.prevX = evt.clientX;
    this.prevY = evt.clientY;
  }

  toggleFullscreen() {
    // this.fullscreen = !this.fullscreen;
    // if (!this.fullscreen) {
    //   this.reset();
    // }
    this.translateX = 0;
    this.translateY = 0;
    this.scale = 1;
    this.rotation = 0;
    this.translateX = 0;
    this.translateY = 0;
    this.zoomIn();
    this.zoomOut();
  }

  triggerIndexBinding() {
    this.indexChange.emit(this.index);
  }

  triggerConfigBinding() {
    this.configChange.next(this.config);
  }

  fireCustomEvent(name, imageIndex) {
    this.customImageEvent.emit(new CustomImageEvent(name, imageIndex));
  }

  reset() {
    this.scale = 1;
    this.rotation = 0;
    this.translateX = 0;
    this.translateY = 0;
    this.updateStyle();
  }

  @HostListener('mouseover')
  onMouseOver() {
    this.hovered = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hovered = false;
  }

  private canNavigate(event: any) {
    return event == null || (this.config.allowKeyboardNavigation && this.hovered);
  }

  private updateStyle() {
    this.style.transform = `translate(${this.translateX}px, ${this.translateY}px) rotate(${this.rotation}deg) scale(${this.scale})`;
    this.style.msTransform = this.style.transform;
    this.style.webkitTransform = this.style.transform;
    this.style.oTransform = this.style.transform;
  }

  private mergeConfig(defaultValues: ImageViewerConfig, overrideValues: ImageViewerConfig): ImageViewerConfig {
    let result: ImageViewerConfig = { ...defaultValues };
    if (overrideValues) {
      result = { ...defaultValues, ...overrideValues };

      if (overrideValues.btnIcons) {
        result.btnIcons = { ...defaultValues.btnIcons, ...overrideValues.btnIcons };
      }
    }
    return result;
  }
}
