import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EditorModule
  ],
  exports: [
    EditorModule
  ]
})
export class UserSettingsModule { }
