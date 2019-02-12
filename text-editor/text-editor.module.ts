import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextEditorComponent } from './text-editor.component';
import {NgbModule,NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import { MentionModule } from '../mention/mention.module';

@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    MentionModule
  ],
  declarations: [TextEditorComponent],
  exports:[TextEditorComponent],
})
export class TextEditorModule { }
