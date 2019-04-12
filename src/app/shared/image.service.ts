import { Injectable } from '@angular/core';
import { Global } from '../providers/global';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  public mierda: any;

  constructor(private global: Global) { }

  searchImages(userInput: String, pageIndex:number = 1, elementsPerPage:number = 30): Promise<any> {
  return this.global.UNSPLASH_API.search.photos(userInput, pageIndex, elementsPerPage).then(response => response.json()).then(json => json.results);
    
  }

  getImageById(id: String, width: number, height:number, rectangle:number) : Promise<any>{
    return this.global.UNSPLASH_API.photos.getPhoto(id, width, height, rectangle).then(response => response.json()).then(json => json.results);;
  }

  getRandomImage() : Promise<any>{
   return this.global.UNSPLASH_API.photos.getRandomPhoto()
    .then(response => response.json());
  }
}
