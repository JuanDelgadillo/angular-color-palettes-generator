import { Component, OnInit } from '@angular/core';

import BroswerImage from 'node-vibrant/lib/image/browser';
import Vibrant from 'node-vibrant/lib/vibrant';
Vibrant.DefaultOpts.ImageClass = BroswerImage;

import ColorThief from 'color-thief-standalone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  formData: any = {
    file: null
  };
  exampleImages = [{
    palettes: [{
      createdBy:'Created with color-thief-standalone',
      colors:[{
        code: 'rgb(55, 37, 29)'
      }, {
        code: 'rgb(213, 193, 136)'
      }, {
        code: 'rgb(110, 204, 223)'
      }, {
        code: 'rgb(131, 122, 58)'
      }, {
        code: 'rgb(43, 124, 148)'
      }, {
        code: 'rgb(156, 176, 121)'
      }, {
        code: 'rgb(131, 121, 110)'
      }, {
        code: 'rgb(167, 198, 220)'
      }, {
        code: 'rgb(213, 75, 8)'
      }]
    }, {
      createdBy: 'Created with node-vibrant',
      colors: [{
        code: '#e18517'
      }, {
        code: '#6fd9f0'
      }, {
        code: '#873f17'
      }, {
        code: '#6d9bac'
      }, {
        code: '#d3dab5'
      }, {
        code: '#2b1e17'
      }]
    }],
    source: 'http://lokeshdhakar.com/projects/color-thief/images/image-1.jpg',
    mainColor: 'rgb(125, 189, 193)'
   }, {
    palettes: [{
      createdBy:'Created with color-thief-standalone',
      colors:[{
        code: 'rgb(92, 167, 229)'
      }, {
        code: 'rgb(58, 87, 36)'
      }, {
        code: 'rgb(207, 218, 228)'
      }, {
        code: 'rgb(119, 195, 246)'
      }, {
        code: 'rgb(111, 152, 67)'
      }, {
        code: 'rgb(81, 110, 118)'
      }, {
        code: 'rgb(28, 27, 19)'
      }, {
        code: 'rgb(128, 105, 96)'
      }, {
        code: 'rgb(188, 42, 75)'
      }]
    }, {
      createdBy: 'Created with node-vibrant',
      colors: [{
        code: '#4fb1fb'
      }, {
        code: '#77c8fb'
      }, {
        code: '#3c6f14'
      }, {
        code: '#83a65a'
      }, {
        code: '#d1dfeb'
      }, {
        code: '#46592a'
      }]
    }],
    source: 'http://lokeshdhakar.com/projects/color-thief/images/image-2.jpg',
    mainColor: 'rgb(58, 83, 41)'
   }, {
    palettes: [{
      createdBy:'Created with color-thief-standalone',
      colors:[{
        code: 'rgb(214, 197, 193)'
      }, {
        code: 'rgb(117, 12, 15)'
      }, {
        code: 'rgb(21, 6, 8)'
      }, {
        code: 'rgb(193, 46, 68)'
      }, {
        code: 'rgb(123, 169, 184)'
      }, {
        code: 'rgb(66, 83, 159)'
      }, {
        code: 'rgb(72, 7, 10)'
      }, {
        code: 'rgb(68, 80, 97)'
      }, {
        code: 'rgb(37, 38, 88)'
      }]
    }, {
      createdBy: 'Created with node-vibrant',
      colors: [{
        code: '#0da8f3'
      }, {
        code: '#f0435e'
      }, {
        code: '#6f0808'
      }, {
        code: '#879971'
      }, {
        code: '#adcad4'
      }, {
        code: '#445065'
      }]
    }],
    source: 'http://lokeshdhakar.com/projects/color-thief/images/image-3.jpg',
    mainColor: 'rgb(206, 143, 149)'
  }];

  images: any = [];

  ngOnInit() {
    this.images = this.exampleImages;
  }

  loadPalettes () {
    this.images = (this.images[0].source === this.exampleImages[0].source) ? [] : this.images;
    // FileReader support
    if (FileReader && this.formData.file) {
        this.images.push({ palettes: [], source: '', mainColor: '' })
        let fr = new FileReader();
        let image = new Image();
        fr.onload =  () => {
          image.onload = () => {
            this.images[this.images.length -1].source = fr.result;

            // Palette with color-thief.js
            this.images[this.images.length -1].palettes.push({ createdBy:'Created with color-thief-standalone', colors:[] })
            let colorThief = new ColorThief();
            let mainColor = colorThief.getColor(image)
            this.images[this.images.length -1].mainColor = `rgb(${ mainColor[0] }, ${ mainColor[1] }, ${ mainColor[2] })`;

            this.images[this.images.length -1].palettes[0].colors = colorThief.getPalette(image, 8).map((colorSet) => {
              return { name: 'unnamed', code: `rgb(${ colorSet[0] }, ${ colorSet[1] }, ${ colorSet[2] })` }
            });

            // Palette with Vibrant.js
            this.images[this.images.length -1].palettes.push({ createdBy:'Created with node-vibrant', colors:[] })

            let vibrant = new Vibrant(fr.result);
            vibrant.getPalette((error, palette) => {
              for (var swatch in palette) {
                if (palette.hasOwnProperty(swatch) && palette[swatch]) {
                  this.images[this.images.length -1].palettes[1].colors.push({ name: swatch, code: palette[swatch].getHex() })
                }
              }
            });
          }
          image.src = fr.result;
        }
        fr.readAsDataURL(this.formData.file);
    }

  }
}
