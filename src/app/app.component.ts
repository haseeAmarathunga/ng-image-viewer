import { Component } from '@angular/core';
import {CustomImageEvent} from '../../projects/ng-image-viewer/src/lib/model/custom-image-event-model';
import {ImageViewerConfig} from '../../projects/ng-image-viewer/src/lib/model/image-viewer-config.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'haseePackage';
  config: ImageViewerConfig;
  images = ['https://i.ytimg.com/vi/nlYlNF30bVg/hqdefault.jpg'];
  imageIndexOne = 0;
  handleEvent(event: CustomImageEvent) {
    console.log(`${event.name} has been click on img ${event.imageIndex + 1}`);

    switch (event.name) {
      case 'print':
        console.log('run print logic');
        break;
    }
  }
}
