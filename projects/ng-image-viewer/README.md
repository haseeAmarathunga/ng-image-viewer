## @haseeamarathunga/ng-image-viewer

[![npm (scoped)](https://img.shields.io/npm/v/@bamblehorse/tiny.svg)](https://www.npmjs.com/package/@haseeamarathunga/ng-image-viewer)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/@bamblehorse/tiny.svg)](https://www.npmjs.com/package/@haseeamarathunga/ng-image-viewer)

Image Viewer with Following Features

## Features
* Image Zoom In
* Image Zoom Out
* Rotate Left
* Rotate Right
* Reset Position


## Prerequisites
You must install font-awesome library for load icons

### Runtime Dependencies
* Angular: `^4.0.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0`
* RxJs: `^5.0.0 || ^6.0.0`
* App must be served on a secure context (https or localhost)

## Usage
1) Install font-awesome library via standard npm command:

`npm install font-awesome --save`

2) Add it to style.css

```css
@import "~font-awesome/css/font-awesome.css";
```

3) Install ng-image-viewer library via standard npm command:

`npm install @haseeamarathunga/ng-image-viewer`

4) Import the `NgImageViewer` into your Angular module:

```typescript
import {NgImageViewerModule} from '@haseeamarathunga/ng-image-viewer.module';
@NgModule({
  imports: [
    NgImageViewerModule,
    ...
  ],
  ...
})
export class AppModule { }
```

3) Use the `NgImageViewer` on your pages:

In .html file

```html
 <ng-image-viewer [src]="images"
                  [width]="500"
                  [height]="400"
                  [(config)]="config"
                  (customImageEvent)="handleEvent($event)">
    </ng-image-viewer>

```

In .ts file

```typescript
  images = ['image-path.jpg'];

  config: ImageViewerConfig;

  handleEvent(event: CustomImageEvent) {
    console.log(`${event.name} has been click on img ${event.imageIndex + 1}`);

    switch (event.name) {
      case 'print':
        console.log('run print logic');
        break;
    }
  }
```
## Options and Events
This section describes the basic inputs/outputs of the component. All inputs are optional.
### Inputs

### Outputs

```typescript

```

## Development
Here you can find instructions on how to start developing this library.

### Build
Run `npm run packagr` to build the library. The build artifacts will be stored in the `dist/` directory.

### Start
Run `npm start` to build and run the surrounding webapp with the `NgImageViewerModule`. Essential for live-developing.

### Generate docs/
Run `npm run docs` to generate the live-demo documentation pages in the `docs/` directory.

### Running Unit Tests
Run `npm run test` to run unit-tests.
