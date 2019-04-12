import { Component, OnInit, Input, HostListener, ChangeDetectorRef } from '@angular/core';
import { ImageService } from '../shared/image.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  isCollapsed : boolean;
  throttle = 300;
  scrollDistance = 2;
  scrollUpDistance = 2;
  page: number = 1;
  headerForm: FormGroup;
  randomImage: any;
  private randomImgURL: String;
  isHeaderVisible: boolean = true;
  navbarForm: FormGroup;
  public images: Array<any>;
  public _albums: Array<any> = [];


  constructor(private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer, private imageService: ImageService, private lightbox: Lightbox) { }

  async ngOnInit() {

    this.navbarForm = new FormGroup({
      searchText: new FormControl()
    })

    this.headerForm = new FormGroup({
      searchInputType: new FormControl()
    });

    this.randomImgURL = await this.imageService.getRandomImage().then(randomImg => randomImg.urls.full);
    this.randomImage = this.sanitizer.bypassSecurityTrustStyle('url(' + this.randomImgURL + ')');
    this.cdr.detectChanges();
  }

  async onSearch(event, searchRequest: string) {

    if (event.key === "Enter" || event.type === "click") {
      if (!this.isNullOrWhitespace(searchRequest)) {
        this.navbarForm.get('searchText').setValue(searchRequest)
        this.headerForm.get('searchInputType').setValue('');
        this.isHeaderVisible = false;
        this.images = await this.imageService.searchImages(searchRequest);
        this._albums = [];

        for (let i = 0; i < this.images.length; i++) {
          let photo_tags = this.images[i].photo_tags.map(function(val) {
            return val.title;
          }).join(', ');

          const album = {
            src: this.images[i].urls.full,
            caption: "Description: " + this.images[i].description
            + "<br/>Uploaded user: " + this.images[i].user.name
            + "<br/>Photo tags: " + photo_tags
            + "<br/>Likes: " + this.images[i].likes,
            thumb: this.images[i].urls.thumb 
          };
          this._albums.push(album);
        }
      }
    }
  }

  isNullOrWhitespace(searchRequest: any): boolean {
    return !searchRequest || !searchRequest.trim();
  }
  openLightBoxByIndex(index: number) {
    this.lightbox.open(this._albums, index);
  }

  async onScrollDown() {
    let keyword: string = this.navbarForm.get('searchText').value;
    this.page += 1;

    let imagesToLoad: Array<any> = await this.imageService.searchImages(keyword, this.page);

    this.images.push(...imagesToLoad);

    this._albums = [];
    for (let i = 0; i < this.images.length; i++) {
      const album = {
        src: this.images[i].urls.full,
        caption: this.images[i].description,
        thumb: this.images[i].urls.thumb
      };
      this._albums.push(album);

    }

  }


  goBack() {
    this.isHeaderVisible = true;
  }
}

