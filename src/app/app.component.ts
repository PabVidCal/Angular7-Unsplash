import { Component, OnInit } from '@angular/core';
import { ImageService } from './shared/image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Angular7-Unsplash';

  constructor(private imageService : ImageService) {}

  ngOnInit() {


  }

}
