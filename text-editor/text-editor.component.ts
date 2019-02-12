import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatterInputOutputService } from '../../matter/matter-input-output.service';
import { Converter } from '../../models/converter.models';
import { Observable } from 'rxjs/Observable';
import { GlobalFieldService } from '../../services/field/global-field.service';
import { RequestOptions } from '@angular/http';




@Component({
  selector: 'hx-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: [ './text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {
  @Input() data;
  @Input() attachments: any[] = [];
  @Input() style;
  @Input() isShowHtmlTextEditor: boolean = false;
  @Input() isShowTextEditorBody: boolean = true;
  @Input() searchKeys: any[] = []
  @Input() formatValue: string = "";
  @Input() autoSearchValues: any
  @Output() notifyDoc=new EventEmitter<any>()
  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
  selectedForeColor: String = '';
  selectedBackColor: String = '';
  selectedFont: String = "Arial";
  selectedFontSize: number = 11;
  moreMenuCount: number = 0;
  isShowMenu: boolean = false;
  email: any;
  selectedMatter: any;
  newmsg: any = {};
  private files = [];
  formatBold = false;
  fontList: Array<any> = [
    { "style": "Arial, Helvetica, sans-serif", "font": "Arial" },
    { "style": "'Arial Black', Gadget, sans-serif", "font": "Arial Black" },
    { "style": "'Comic Sans MS', cursive, sans-serif", "font": "Comic Sans MS" },
    { "style": "'Courier New', Courier, monospace", "font": "Courier New" },
    { "style": "Georgia, serif", "font": "Georgia" },
    { "style": "Impact, Charcoal, sans-serif", "font": "Impact" },
    { "style": "'Lucida Console', Monaco, monospace", "font": "Lucida Console" },
    { "style": "'Lucida Sans Unicode', 'Lucida Grande', sans-serif", "font": "Lucida Sans Unicode" },
    { "style": "'Palatino Linotype', 'Book Antiqua', Palatino, serif", "font": "Palatino Linotype" },
    { "style": "Tahoma, Geneva, sans-serif", "font": "Tahoma" },
    { "style": "'Trebuchet MS', Helvetica, sans-serif", "font": "Trebuchet MS" },
    { "style": "Verdana, Geneva, sans-serif", "font": "Verdana" },
    { "style": "'Comic Sans MS', cursive, sans-serif", "font": "Comic Sans MS" },
    { "style": "Times New Roman", "font": "Times New Roman" }
  ];
  fontSizes: Array<number> = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72];
  color1: Array<any> = [
    { "title": "White Background 1", "color": "#FFFFFF" },
    { "title": "Black, Text 1", "color": "#000000" },
    { "title": "Tan, Background 2", "color": "#EEECE1" },
    { "title": "Dark Blue, Text 2", "color": "#1F497D" },
    { "title": "Blue, Accent 1", "color": "#4F81BD" },
    { "title": "Red, Accent 2", "color": "#C0504D" },
    { "title": "Olive Green, Accent 3", "color": "#9BBB59" },
    { "title": "Purple, Accent 4", "color": "#8064A2" },
    { "title": "Aqua, Accent 5", "color": "#4BACC6" },
    { "title": "Orange, Accent 6", "color": "#F79646" }
  ];
  color2: Array<any> = [
    { "title": "White Background 1, Background 5%", "color": "#F2F2F2" },
    { "title": "Black, Text 1, Background 50%", "color": "#7F7F7F" },
    { "title": "Tan, Background 2, Darker 10%", "color": "#DDD9C3" },
    { "title": "Dark Blue, Text 2, Lighter 80%", "color": "#C6D9F0" },
    { "title": "Red, Accent 2, Lighter 80%", "color": "#DBE5F1" },
    { "title": "Red, Accent 2, Lighter 80%", "color": "#F2DCDB" },
    { "title": "Olive Green, Accent 3, Lighter 80%", "color": "#EBF1DD" },
    { "title": "Purple, Accent 4, Lighter 80%", "color": "#E5E0EC" },
    { "title": "Aqua, Accent 5, Lighter 80%", "color": "#DBEEF3" },
    { "title": "Orange, Accent 6, Lighter 80%", "color": "#FDEADA" }
  ];
  color3: Array<any> = [
    { "title": "White Background 1, Darker 15%", "color": "#D8D8D8" },
    { "title": "Black, Text 1, Lighter 35%", "color": "#595959" },
    { "title": "Tan, Background 2, Darker 25%", "color": "#C4BD97" },
    { "title": "Dark Blue, Text 2, Lighter 60%", "color": "#8DB3E2" },
    { "title": "Blue, Accent 1, Lighter 60%", "color": "#B8CCE4" },
    { "title": "Red, Accent 2, Lighter 60%", "color": "#E5B9B7" },
    { "title": "Olive Green, Accent 3, Lighter 60%", "color": "#D7E3BC" },
    { "title": "Purple, Accent 4, Lighter 60%", "color": "#CCC1D9" },
    { "title": "Aqua, Accent 5, Lighter 60%", "color": "#B7DDE8" },
    { "title": "Orange, Accent 6, Lighter 60%", "color": "#FBD5B5" }
  ];
  color4: Array<any> = [
    { "title": "White Background 1, Darker 25%", "color": "#BFBFBF" },
    { 'title': "Black, Text 1, Lighter 25%", "color": "#3F3F3F" },
    { 'title': 'Tan, Background 2, Darker 50%', 'color': "#938953" },
    { 'title': "Dark Blue, Text 2, Lighter 40%", "color": "#548DD4" },
    { "title": "Blue, Accent 1, Lighter 40%", "color": "#95B3D7" },
    { "title": "Red, Accent 2, Lighter 40%", "color": "#D99694" },
    { "title": "Olive Green, Accent 3, Lighter 40%", "color": "#C3D69B" },
    { "title": "Purple, Accent 4, Lighter 40%", "color": "#B2A2C7" },
    { "title": "Aqua, Accent 5, Lighter 40%", "color": "#92CDDC" },
    { "title": "Orange, Accent 6, Lighter 40%", "color": "#FAC08F" }
  ];
  color5: Array<any> = [
    { "title": "White Background 1, Darker 35%", "color": "#A5A5A5" },
    { "title": "Black, Text 1, Lighter 15%", "color": "#262626" },
    { "title": "Tan, Background 2, Darker 75%", "color": "#494429" },
    { "title": "Dark Blue, Text 2, Darker 25%", "color": "#17365D" },
    { "title": "Blue, Accent 1, Darker 25%", "color": "#366092" },
    { "title": "Red, Accent 2, Darker 25%", "color": "#953734" },
    { "title": "Olive Green, Accent 3, Darker 25%", "color": "#76923C" },
    { "title": "Purple, Accent 4, Darker 25%", "color": "#5F497A" },
    { "title": "Aqua, Accent 5, Darker 25%", "color": "#31859B" },
    { "title": "Orange, Accent 6, Darker 25%", "color": "#E36C09" }
  ];
  color6: Array<any> = [
    { "title": "White Background 1, Darker 50%", "color": "#7F7F7F" },
    { "title": "Black, Text 1, Lighter 5%", "color": "#0C0C0C" },
    { "title": "Tan, Background 2, Darker 90%", "color": "#1D1B10" },
    { "title": "Dark Blue, Text 2, Darker 50%", "color": "#0F243E" },
    { "title": "Blue, Accent 1, Darker 50%", "color": "#244061" },
    { "title": "Red, Accent 2, Darker 50%", "color": "#632423" },
    { "title": "Olive Green, Accent 3, Darker 50%", "color": "#4F6128" },
    { "title": "Purple, Accent 4, Darker 50%", "color": "#3F3151" },
    { "title": "Aqua, Accent 5, Darker 50%", "color": "#205867" },
    { "title": "Orange, Accent 6, Darker 50%", "color": "#974806" }
  ];
  color7: Array<any> = [
    { "title": "Dark red", "color": "#7F7F7F" },
    { "title": "red", "color": "#FF0000" },
    { "title": "Orange", "color": "#FFC000" },
    { "title": "Yellow", "color": "#FFFF00" },
    { "title": "Light Green", "color": "#92D050" },
    { "title": "Green", "color": "#00B050" },
    { "title": "Light Blue", "color": "#00B0F0" },
    { "title": "Blue", "color": "#0070C0" },
    { "title": "Dark Blue", "color": "#002060" },
    { "title": "Purple", "color": "#7030A0" }
  ];
  fadeTarget:any;
  mouseX = 0;
  mouseY = 0;

  constructor(private _matterInputOutputService: MatterInputOutputService, private _globalFieldService: GlobalFieldService, ) { }

  ngOnInit() {
    this.isShowTextEditorBody = true;
    this.selectedMatter = JSON.parse(localStorage.getItem('selectedMatter'));
    this.fadeTarget = document.getElementById("menu");
  }
  ngOnChanges() {
    for (let i = 0; i < this.attachments.length; i++) {
      var icon = this.attachments[i].filename.substring(this.attachments[i].filename.lastIndexOf(".") + 1);
      this.attachments[i].icon = icon;
    }
  }
  format(item: any, keyValue) {
    if (keyValue == 'name') {
      let val = '{' + item[keyValue] + '},';
      return val.replace(/,/gi, " ");
    }
    else {
      let val = item[keyValue]+",";
      let li= val.replace(/,/gi, " ");
      return li;
    }

  }

  attachDocFromPanelTwo(){
    this.notifyDoc.emit(true);
  }
  getEmailBody(event) {
    let data = event.target.innerHTML;
    this._matterInputOutputService.sendActionDocumentData(data);
  }
  removeFromAttachment(index) {
    this.attachments.splice(index, 1)
  }

  /* Content Editor Functions */
  public selection: any = [];
  showColorPicker: boolean = false;
  showColorPickerBack: boolean = false;
  forePalette: any;
  backPalette: any;

  color: string;
  fontSize: number = 11;
  showColorPickerFn() {
    this.showColorPicker = !this.showColorPicker;
    this.showColorPickerBack = false;
  }
  showColorPickerBackFn() {
    this.showColorPickerBack = !this.showColorPickerBack;
    this.showColorPicker = false;
  }

  public makeStyle(e) {
    try {
      const command = e;
      this.reselect();
      if (command == 'createlink' || command == 'insertimage') {
        const url = prompt('Enter the link here: ', 'http:\/\/');
        document.execCommand(e, false, url);
      } else {
        document.execCommand(command, false, null);
        // if (command === 'bold') {
        //   if(this.formatBold) {
        //     this.formatBold = false;
        //     const sel = this.getSelection();
        //     sel.removeAllRanges();
        //   } else {
        //      this.formatBold = true;
        //   }
        // }
      }
    } catch (e) {
      throw e;
    }
  };

  public makeColor(command, color) {
    try {
      this.reselect();
      document.execCommand(command, false, color);
      if (command == 'forecolor') {
        this.selectedForeColor = color;
      } else {
        this.selectedBackColor = color;
      }
    } catch (e) {
      throw e;
    }
  }

  public changeFont(font) {
    try {
      this.reselect();
      this.selectedFont = font;
      document.execCommand('fontname', false, font);
    } catch (e) {
      throw e;
    }
  }

  public changeFontSize(size) {
    try {
      this.reselect();
      this.selectedFontSize = size;
      document.execCommand('fontsize', false, "1");
      this.resetFontSize(size);
    } catch (e) {
      throw e;
    }
  }
  private resetFontSize(size) {
    try {
      const fontElements = document.getElementsByTagName("font");
      for (let i = 0, len = fontElements.length; i < len; ++i) {
        if (fontElements[i].size == 1) {
          fontElements[i].removeAttribute("size");
          fontElements[i].style.fontSize = size + "px";
        }
      }
    } catch (e) {
      throw e;
    }
  }

  private updateSelection = function () {
    try {
      const sel = this.getSelection();
      this.selection = [];
      for (let i = 0; i < sel.rangeCount; i++) {
        this.selection.push(sel.getRangeAt(i).cloneRange());
      }
    } catch (e) {
      throw e;
    }
  };

  public onMouseUp(event) {
    try {
      const sel = this.getSelection();
      // console.log(sel.toString());
      this.updateSelection();
    } catch (e) {
      throw e;
    }
  }
 public onMouseMove(event) {
this.mouseX = event.pageX;
this.mouseY = event.pageY;
}
// public onMouseDown(event) {
//   this.fadeOut();
//   }

  onClick(event) {
    let xx = (this.mouseY-80).toString();
    let gg = (this.mouseX-50).toString();
    this.fadeTarget.style.top=xx ;
    this.fadeTarget.style.left=gg;
    this.fadeIn();

  }

 fadeOut() {
      this.fadeTarget.style.display = 'none';
}

 fadeIn() {
      this.fadeTarget.style.display = 'block';
}

//    fadeOutEffect() {
//     const fadeEffect = setInterval(function () {
//         if (!this.fadeTarget.style.opacity) {
//             this.fadeTarget.style.opacity = 1;
//         }
//         if (this.fadeTarget.style.opacity < 0.1) {
//             clearInterval(fadeEffect);
//         } else {
//             this.fadeTarget.style.opacity -= 0.1;
//         }
//     }, 200);
// }
  private reselect = function () {
    try {
      const sel = this.getSelection();
      sel.removeAllRanges();
      for (let i = 0; i < this.selection.length; i++) {
        sel.addRange(this.selection[i].cloneRange());
      }
    } catch (e) {
      throw e;
    }
  };

  private getSelection() {
    try {
      return window.getSelection ? window.getSelection() : document.getSelection();
    } catch (e) {
      throw e;
    }
  }


  ///file attachment
  onSelectFile($event) {
    let files = $event.target.files;
    let attachments = []
    for (var i = 0; i < files.length; i++) {
      (function (file) {
        var filename = file.name;
        var icon = file.name.substring(file.name.lastIndexOf(".") + 1);
        var reader = new FileReader();
        reader.onload = function (e: any) {
          attachments.push({ icon: icon, filename: filename, base64Blob: e.target.result.split('base64,')[1] });
        }
        reader.readAsDataURL(file);
      })(files[i]);
    }
    setTimeout(() => {
      this.attachments = this.attachments.concat(attachments);
      this._matterInputOutputService.sendEmailAttachmentFiles(this.attachments);
    }, 1000)
  }

  previewAttachment(attach) {
    this.attachments.forEach(attachment => {
      attachment.isPreview = undefined;
      if (attachment.blob === attach.blob) {
        attachment.isPreview = true;
      }
    })
    const data = {
      attachments: this.attachments,
      isShowAttachment: true
    }
    this._matterInputOutputService.sendPreviewAttachment(data);
  }
  
}
