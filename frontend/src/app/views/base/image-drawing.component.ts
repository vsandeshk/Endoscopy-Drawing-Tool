import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { fabric } from 'fabric';
import { I18nEn, I18nInterface, i18nLanguages } from './i18n';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'image-drawing',
  styleUrls: ['./image-drawing.component.scss'],
  templateUrl: './image-drawing.component.html',
  providers: [AuthService, HttpClient],
})
export class ImageDrawingComponent implements OnInit, OnChanges {

  @Input() public src?: string;
  @Input() public width?: number;
  @Input() public height?: number;

  @Input() public forceSizeCanvas = true;
  @Input() public forceSizeExport = true;
  @Input() public enableRemoveImage = true;
  @Input() public enableLoadAnotherImage = true;
  @Input() public enableTooltip = true;
  @Input() public showCancelButton = true;

  // @ts-ignore
  @Input('i18n') public i18nUser: I18nInterface;
  @Input() public locale: string = 'en';
  /* @deprecated Use i18n.saveBtn */
  @Input() public saveBtnText = 'Save';
  /* @deprecated Use i18n.cancelBtn */
  @Input() public cancelBtnText = 'Cancel';
  /* @deprecated Use i18n.loading */
  @Input() public loadingText = 'Loading…';
  /* @deprecated Use i18n.loadError */
  @Input() public errorText = 'Error loading %@';

  @Input() public loadingTemplate?: TemplateRef<any>;
  @Input() public errorTemplate?: TemplateRef<any>;

  @Input() public outputMimeType = 'image/jpeg';
  @Input() public outputQuality = 0.8;

  @Input() public borderCss: string = 'none';

  @Input() public drawingSizes: { [name: string]: number } = {
    small: 5,
    medium: 10,
    large: 25,
  };

  @Input() public colors: { [name: string]: string } = {
    // White: '#FFFFFF',
    // Snow: '#FFFAFA',
    // HoneyDew: '#F0FFF0',
    // MintCream: '#F5FFFA',
    // Azure: '#F0FFFF',
    // AliceBlue: '#F0F8FF',
    // GhostWhite: '#F8F8FF',
    // WhiteSmoke: '#F5F5F5',
    // SeaShell: '#FFF5EE',
    // Beige: '#F5F5DC',
    // OldLace: '#FDF5E6',
    // FloralWhite: '#FFFAF0',
    // Ivory: '#FFFFF0',
    // AntiqueWhite: '#FAEBD7',
    // Linen: '#FAF0E6',
    // LavenderBlush: '#FFF0F5',
    // MistyRose: '#FFE4E1',
    // Gold: '#FFD700',
    // Yellow: '#FFFF00',
    // LightYellow: '#FFFFE0',
    // LemonChiffon: '#FFFACD',
    // LightGoldenRodYellow: '#FAFAD2',
    // PapayaWhip: '#FFEFD5',
    // Moccasin: '#FFE4B5',
    // PeachPuff: '#FFDAB9',
    // PaleGoldenRod: '#EEE8AA',
    // Khaki: '#F0E68C',
    // DarkKhaki: '#BDB76B',
    // Orange: '#FFA500',
    // DarkOrange: '#FF8C00',
    // Coral: '#FF7F50',
    // Tomato: '#FF6347',
    // OrangeRed: '#FF4500',
    // LightSalmon: '#FFA07A',
    // Salmon: '#FA8072',
    // DarkSalmon: '#E9967A',
    // LightCoral: '#F08080',
    // IndianRed: '#CD5C5C',
    // Crimson: '#DC143C',
    // Red: '#FF0000',
    // FireBrick: '#B22222',
    // DarkRed: '#8B0000',
    // Cornsilk: '#FFF8DC',
    // BlanchedAlmond: '#FFEBCD',
    // Bisque: '#FFE4C4',
    // NavajoWhite: '#FFDEAD',
    // Wheat: '#F5DEB3',
    // BurlyWood: '#DEB887',
    // Tan: '#D2B48C',
    // RosyBrown: '#BC8F8F',
    // SandyBrown: '#F4A460',
    // GoldenRod: '#DAA520',
    // DarkGoldenRod: '#B8860B',
    // Peru: '#CD853F',
    // Chocolate: '#D2691E',
    // Olive: '#808000',
    // SaddleBrown: '#8B4513',
    // Sienna: '#A0522D',
    // Brown: '#A52A2A',
    // Maroon: '#800000',
    // Pink: '#FFC0CB',
    // LightPink: '#FFB6C1',
    // Flirt: '#A2006D',
    // HotPink: '#FF69B4',
    // DeepPink: '#FF1493',
    // PaleVioletRed: '#DB7093',
    // MediumVioletRed: '#C71585',
    // Lavender: '#E6E6FA',
    // Thistle: '#D8BFD8',
    // Plum: '#DDA0DD',
    // Orchid: '#DA70D6',
    // Violet: '#EE82EE',

    // Magenta: '#FF00FF',
    // MediumOrchid: '#BA55D3',

    // DarkViolet: '#9400D3',
    // BlueViolet: '#8A2BE2',
    // DarkMagenta: '#8B008B',
    // MediumPurple: '#9370DB',
    // MediumSlateBlue: '#7B68EE',
    // SlateBlue: '#6A5ACD',
    // DarkSlateBlue: '#483D8B',
    // RebeccaPurple: '#663399',
    // Indigo: '#4B0082',

    // CadetBlue: '#5F9EA0',
    // SteelBlue: '#4682B4',
    // LightSteelBlue: '#B0C4DE',
    // LightBlue: '#ADD8E6',
    // PowderBlue: '#B0E0E6',
    // LightSkyBlue: '#87CEFA',
    // SkyBlue: '#87CEEB',
    // CornflowerBlue: '#6495ED',
    // DeepSkyBlue: '#00BFFF',
    // DodgerBlue: '#1E90FF',
    // RoyalBlue: '#4169E1',
    // Blue: '#0000FF',
    // MediumBlue: '#0000CD',
    // FrenchBlue: '#0072BB',
    // DarkBlue: '#00008B',
    // Navy: '#000080',
    // MidnightBlue: '#191970',

    // Aqua: '#00FFFF',
    // Cyan: '#00FFFF',
    // LightCyan: '#E0FFFF',
    // PaleTurquoise: '#AFEEEE',
    // Aquamarine: '#7FFFD4',
    // Turquoise: '#40E0D0',
    // MediumTurquoise: '#48D1CC',
    // DarkTurquoise: '#00CED1',

    // GreenYellow: '#ADFF2F',
    // Chartreuse: '#7FFF00',
    // LawnGreen: '#7CFC00',
    // Lime: '#00FF00',
    // LimeGreen: '#32CD32',
    // PaleGreen: '#98FB98',
    // LightGreen: '#90EE90',
    // MediumSpringGreen: '#00FA9A',
    // SpringGreen: '#00FF7F',
    // MediumSeaGreen: '#3CB371',
    // SeaGreen: '#2E8B57',
    // ForestGreen: '#228B22',
    // Green: '#008000',
    // DarkGreen: '#006400',
    // YellowGreen: '#9ACD32',
    // OliveDrab: '#6B8E23',
    // DarkOliveGreen: '#556B2F',
    // MediumAquaMarine: '#66CDAA',
    // DarkSeaGreen: '#8FBC8F',
    // LightSeaGreen: '#20B2AA',
    // DarkCyan: '#008B8B',
    // Teal: '#008080',

    // Black: '#000',
    white: '#fff',
    yellow: '#ffeb3b',
    red: '#f44336',
    blue: '#2196f3',
    green: '#4caf50',
    purple: '#7a08af',
    // AbsoluteZero: '#0048BA',
    // AcidGreen: '#B0BF1A	',
    // Aero: '#7CB9E8',
    // AeroBlue: '#C0E8D5',
    // AfricanViolet: '#B284BE',
    // AirSuperiorityBlue: '#72A0C1',
    // Alabaster: '#EDEAE0',
    // AlloyOrange: '#C46210',
    // Almond: '#EFDECD',
    // Amaranth: '#E52B50',
    // Amaranth2: '#9F2B68',
    // AmaranthPink: '#F19CBB',
    // AmaranthPurple: '#AB274F',
    // AmaranthRed: '#D3212D',
    // Amazon: '#3B7A57',
    // Amber: '#FFBF00',
    // Amber2: '#FF7E00',
    // Amethyst: '#9966CC',
    // AndroidGreen: '#A4C639',
    // AntiqueBrass: '#CD9575',
    // AntiqueBronze: '#665D1E',
    // AntiqueFuchsia: '#915C83',
    // AntiqueRuby: '#841B2D',
    // Ao: '#008000',
    // AppleGreen: '#8DB600',
    // Apricot: '#FBCEB1',
    // ArcticTime: '#D0FF14',
    // ArmyGreen: '#4B5320',
    // Fuchsia: '#FF00FF',
    //
    // Gainsboro: '#DCDCDC',
    // LightGray: '#D3D3D3',
    // Silver: '#C0C0C0',
    // DarkGray: '#A9A9A9',
    // DimGray: '#696969',
    // Gray: '#808080',
    // LightSlateGray: '#778899',
    // SlateGray: '#708090',
    // DarkSlateGray: '#2F4F4F',
    black: '#000000',
  };

  @Output() public save: EventEmitter<Blob> = new EventEmitter<Blob>();
  @Output() public cancel: EventEmitter<void> = new EventEmitter<void>();

  public currentTool = 'brush';
  public currentSize = 'medium';
  public currentColor = 'black';
  public i18n: I18nInterface = I18nEn;

  public canUndo = true;
  public canRedo = true;

  public isLoading = false;
  public hasError = false;
  public errorMessage = '';

  private canvas: fabric.Canvas;
  private stack: fabric.Object[] = [];

  public colorsName: string[] = [];
  public drawingSizesName: string[] = [];

  private imageUsed?: fabric.Image;

  constructor(private Auth: AuthService, private router: Router) {
  }

  public ngOnInit(): void {
    this.colorsName = Object.keys(this.colors);
    this.drawingSizesName = Object.keys(this.drawingSizes);

    this.canvas = new fabric.Canvas('canvas', {
      hoverCursor: 'pointer',
      isDrawingMode: true,
    });
    this.canvas.backgroundColor = 'white';
    var url = localStorage.getItem("imgurl")
    if (url) {
      this.importPhotoFromSrc(url);
    }
    if (this.src) {
      this.importPhotoFromSrc(this.src);
    } else {
      if (!this.width || !this.height) {
        throw new Error('No width or hight given !');
      }

      this.canvas.setWidth(this.width);
      this.canvas.setHeight(this.height);
    }

    this.canvas.on('path:created', () => {
      this.stack = [];
      this.setUndoRedo();
    });

    this.selectTool(this.currentTool);
    this.selectColor(this.currentColor);
    this.selectDrawingSize(this.currentSize);

    if (this.locale && i18nLanguages[this.locale.toLowerCase()]) {
      this.i18n = i18nLanguages[this.locale.toLowerCase()];
    }

    // FIXME remove after a while because properties are now deprecated
    if (this.saveBtnText) {
      this.i18n.saveBtn = this.saveBtnText;
    }
    if (this.cancelBtnText) {
      this.i18n.cancelBtn = this.cancelBtnText;
    }
    if (this.loadingText) {
      this.i18n.loading = this.loadingText;
    }
    if (this.errorText) {
      this.i18n.loadError = this.errorText;
    }
  }

  // Tools
  public selectTool(tool: string) {
    this.currentTool = tool;
  }

  public selectDrawingSize(size: string) {
    this.currentSize = size;
    if (this.canvas) {
      this.canvas.freeDrawingBrush.width = this.drawingSizes[size];
    }
  }

  public selectColor(color: string) {
    this.currentColor = color;
    if (this.canvas) {
      this.canvas.freeDrawingBrush.color = this.colors[color];
    }
  }

  // Actions

  public undo() {
    if (this.canUndo) {
      const lastId = this.canvas.getObjects().length - 1;
      const lastObj = this.canvas.getObjects()[lastId];
      this.stack.push(lastObj);
      this.canvas.remove(lastObj);
      this.setUndoRedo();
    }
  }

  public redo() {
    if (this.canRedo) {
      const firstInStack = this.stack.splice(-1, 1)[0];
      if (firstInStack) {
        this.canvas.insertAt(firstInStack, this.canvas.getObjects().length - 1, false);
      }
      this.setUndoRedo();
    }
  }

  public clearCanvas() {
    if (this.canvas) {
      this.canvas.remove(...this.canvas.getObjects());
      this.setUndoRedo();
    }
  }

  public saveImage() {

    this.canvas.getElement().toBlob(
      (data: Blob) => {
        console.log(data)
        this.save.emit(data);
        //let url = window.URL.createObjectURL(data);
        var url = localStorage.getItem("imgurl")
        console.log(url)
        var newurl = url.replace('http://localhost:3000/images/endoscopy/', '')


        var file = new File([data], newurl, { lastModified: new Date().getTime(), type: data.type })
        console.log(newurl)
        var imagePath = 'public/images/endoscopy/' + newurl
        const endoscopyImage = file;
        this.Auth.updateImage(imagePath, endoscopyImage).subscribe(data => {
          if (data.success) {
            this.router.navigate(['/dashboard/images/private'])
          }
          else {
            window.alert(data.message)
          }
        }, error => {
          alert(error.error);
        })
      },
      this.outputMimeType,
      this.outputQuality,
      console.log(this.outputMimeType)

    );

  }


  public cancelAction() {
    this.cancel.emit();
  }

  public getTextTranslated(name: string): string {
    let strOk = name.split('.').reduce((o, i) => o[i], this.i18n as any);

    if (this.i18nUser) {
      try {
        const str = name.split('.').reduce((o, i) => o[i], this.i18nUser as any);
        if (str) {
          strOk = str;
        }
      } catch (e) {
        // if we pass here, ignored
      }
    }

    if (!strOk) {
      console.error(name + ' translation not found !');
    }

    return strOk;
  }

  public getTooltipTranslated(name: string): string {
    if (this.enableTooltip) {
      return this.getTextTranslated(name)
    } else {
      return '';
    }
  }

  private setUndoRedo() {
    this.canUndo = this.canvas.getObjects().length > 0;
    this.canRedo = this.stack.length > 0;
    // this.canvas.renderAll();
  }

  public importPhotoFromFile(event: Event | any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type.match('image.*')) {
        this.importPhotoFromBlob(file);
      } else {
        throw new Error('Not an image !');
      }
    }
  }

  public removeImage() {
    if (this.imageUsed) {
      this.imageUsed.dispose();
      this.imageUsed = null;
    }
    this.canvas.backgroundImage = null;

    if (this.width && this.height) {
      this.canvas.setWidth(this.width);
      this.canvas.setHeight(this.height);
    }

    this.canvas.renderAll();
  }

  public get hasImage(): boolean {
    return !!this.canvas.backgroundImage;
  }

  private importPhotoFromSrc(src: string) {
    console.log(src)
    this.isLoading = true;
    let isFirstTry = true;
    const imgEl = new Image();
    imgEl.setAttribute('crossOrigin', 'anonymous');
    imgEl.src = src;
    imgEl.onerror = () => {
      // Retry with cors proxy
      if (isFirstTry) {
        imgEl.src = 'https://cors-anywhere.herokuapp.com/' + this.src;
        isFirstTry = false;
      } else {
        this.isLoading = false;
        this.hasError = true;
        this.errorMessage = this.getTextTranslated('loadError').replace('%@', this.src as string);
      }
    };
    imgEl.onload = () => {
      this.isLoading = false;
      this.imageUsed = new fabric.Image(imgEl);

      this.imageUsed.cloneAsImage(image => {
        let width = imgEl.width;
        let height = imgEl.height;

        if (this.width) {
          width = this.width;
        }
        if (this.height) {
          height = this.height;
        }

        image.scaleToWidth(width, false);
        image.scaleToHeight(height, false);

        this.canvas.setBackgroundImage(image, ((img: HTMLImageElement) => {
          if (img) {
            if (this.forceSizeCanvas) {
              this.canvas.setWidth(width);
              this.canvas.setHeight(height);
            } else {
              this.canvas.setWidth(image.getScaledWidth());
              this.canvas.setHeight(image.getScaledHeight());
            }
          }
        }), {
            crossOrigin: 'anonymous',
            originX: 'left',
            originY: 'top'
          });
      });
    };
  }

  private importPhotoFromBlob(file: Blob | File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (evtReader: any) => {
      if (evtReader.target.readyState == FileReader.DONE) {
        this.importPhotoFromSrc(evtReader.target.result);
      }
    };
  }

  public importPhotoFromUrl() {
    // const url = prompt(this.getTooltipTranslated('loadImageUrl'));
    var url = localStorage.getItem("imgurl")
    if (url) {
      this.importPhotoFromSrc(url);
    }
  }
  updateImage() {
    console.log(localStorage.getItem("imgurl"))
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.src && !changes.src.firstChange && changes.src.currentValue) {
      if (typeof changes.src.currentValue === 'string') {
        this.importPhotoFromSrc(changes.src.currentValue);
      } else if (changes.src.currentValue instanceof Blob) {
        this.importPhotoFromBlob(changes.src.currentValue);
      }
    }
  }
}
