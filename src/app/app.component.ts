import { Component } from '@angular/core';

import BroswerImage from 'node-vibrant/lib/image/browser';
import Vibrant from 'node-vibrant/lib/vibrant';
Vibrant.DefaultOpts.ImageClass = BroswerImage;

import ColorThief from 'color-thief-standalone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  formData: any = {
    file: null
  };
  images: any = [];

  loadPalettes () {
    // FileReader support
    if (FileReader && this.formData.file) {
        this.images.push({ name: this.formData.file.name, palettes: [], source: '' })
        let fr = new FileReader();
        let image = new Image();
        fr.onload =  () => {
          image.onload = () => {
            this.images[this.images.length -1].source = fr.result;
            // Palette with Vibrant.js
            this.images[this.images.length -1].palettes.push({ createdBy:'Created with Vibrant.js', colors:[] })
            let vibrant = new Vibrant(fr.result);
            vibrant.getPalette((error, palette) => {
              for (var swatch in palette) {
                if (palette.hasOwnProperty(swatch) && palette[swatch]) {
                  this.images[this.images.length -1].palettes[0].colors.push({ name: swatch, code: palette[swatch].getHex() })
                  // console.log(swatch, palette[swatch].getHex())
                }
              }
            });

            // Palette with color-thief.js
            this.images[this.images.length -1].palettes.push({ createdBy:'Created with color-thief.js', colors:[] })
            let colorThief = new ColorThief();

            this.images[this.images.length -1].palettes[1].colors = colorThief.getPalette(image, 8).map((colorSet) => {
              return { name: 'unnamed', code: `rgb(${ colorSet[0] }, ${ colorSet[1] }, ${ colorSet[2] })` }
            });
          }
          image.src = fr.result;
        }
        fr.readAsDataURL(this.formData.file);
    }

  }
}
