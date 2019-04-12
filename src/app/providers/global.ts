import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class Global {
    public readonly UNSPLASH_API = this.authService.buildAuthentication();
    constructor(private authService :AuthService){}
}