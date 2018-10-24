import { Component } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  image: SafeResourceUrl;
  async takePicture() {
    const { Camera } = Plugins;

    const cameraResult = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });

    // Get blob from web path
    let blob = await fetch(cameraResult.webPath).then(r => r.blob());
    
    // Add blob as FormData
    var formData = new FormData();
    formData.append("imagen", blob);

    // Send using XMLHttpRequest POST
    var request = new XMLHttpRequest();
    request.open("POST", "https://phonegapes.000webhostapp.com/camera/upload.php", true);
    request.onload = function () {
        console.log('uploaded');
    };
    request.send(formData);

    this.image = cameraResult.webPath;
  }
}
