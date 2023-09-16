import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-renderer',
  templateUrl: './image-renderer.component.html',
  styleUrls: ['./image-renderer.component.scss']
})
export class ImageRendererComponent {

  @Input() imageUrls: string[] = [];

}
