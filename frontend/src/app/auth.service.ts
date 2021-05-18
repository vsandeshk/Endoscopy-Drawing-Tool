import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { baseUrl } from './../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
};
interface myData {
  success: boolean,
  message: string,
  accessToken: string
}

interface registerResponse {
  success: boolean
}

interface uploadResponse {
  success: boolean,
  message: string,

}
// const token = localStorage.getItem('token')

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  getUserDetails(username, password) {
    return this.http.post<myData>(baseUrl + 'services/user/login', {
      username,
      password
    })
  }

  registerUser(username, password, fName, lName, dob, gender) {
    return this.http.post<registerResponse>(baseUrl + 'services/user/add', {
      username,
      password,
      fName,
      lName,
      dob,
      gender
    })
  }

  getUsers() {
    return this.http.get(baseUrl + 'services/user/getAll')
  }

  getImages() {
    return this.http.get(baseUrl + 'services/image/getAll', httpOptions)
  }
  getPublicImages() {
    console.log(baseUrl + 'services/image/getAll/public');

    return this.http.get(baseUrl + 'services/image/getAll/public')
  }

  UploadImage(endoscopyImage, imagetype) {
    console.log(endoscopyImage, imagetype)
    let formData = new FormData();
    formData.append("endoscopyImage", endoscopyImage);
    formData.append("imageType", imagetype)
    return this.http.post<uploadResponse>(baseUrl + 'services/image/upload', formData, httpOptions)
  }

  updateImage(imagePath, endoscopyImage) {
    console.log(imagePath, endoscopyImage)
    let formData = new FormData();
    formData.append("imagePath", imagePath);
    formData.append("endoscopyImage", endoscopyImage)
    console.log(formData)
    return this.http.post<uploadResponse>(baseUrl + 'services/image/update', formData, httpOptions)
  }


}
