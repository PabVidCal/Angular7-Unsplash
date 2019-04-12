import { Injectable } from '@angular/core';
import Unsplash from 'unsplash-js';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  buildAuthentication(): Unsplash {
    console.log("/* BUILD AUTHENTICATION */")

    var unsplashApi: Unsplash = new Unsplash({
      applicationId: "4d875470fc82df4d4fe10a9b27baa98899b2ae6805a00cd05048ccc915bc152f",
      secret: "41981a229c57ad3980a4bb158609b82152095de31f508d473b778fa421b41d0b"
    });

    const authenticationUrl = unsplashApi.auth.getAuthenticationUrl([
      "public",
      "read_user",
      "write_user",
      "read_photos",
      "write_photos"
    ]);

    return unsplashApi;
  }

}
