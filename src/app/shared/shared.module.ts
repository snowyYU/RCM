import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
// import {HTML5ValidateDirective}   from '../../directives/HTML5Validate/HTML5Validate.directive';


import { UploaderModule } from '../../utils/uploader/uploader.module'

import { YuanFormatPipe } from '../../pipe/yuan-format/yuan-format.pipe'
import { EffDateFormatPipe } from '../../pipe/eff-date-format/eff-date-format.pipe'
import { FilterNullPipe } from '../../pipe/filter-null/filter-null.pipe'
import { FilterMultiplyPipe } from '../../pipe/filter-multiply/filter-multiply.pipe'
import { PreviewerComponent } from '../../utils/previewer/previewer.component'
import { PreviewOrDownloadComponent } from '../../utils/preview-or-download/preview-or-download.component'
import { DropDownComponent } from '../../utils/drop-down/drop-down.component'
import { MySrcDirective } from '../../utils/previewer/mySrc.directive'
import { HTML5ValidateDirective } from '../../directives/HTML5Validate/HTML5Validate.directive'


import { FormsModule as MyFormsModule } from 'dolphinng'
import { ModalModule } from 'dolphinng'
import { LayoutModule } from 'dolphinng'
import { NavModule } from 'dolphinng'
import { GalleryModule } from 'dolphinng'
import { PaginatorModule } from 'dolphinng'
import { DatePickerModule } from 'dolphinng'
import { DatetimePickerModule } from 'dolphinng'
import { CurrencyFormatModule } from 'dolphinng'
import { CommonModule as MyCommonModule } from 'dolphinng'
// import { DatetimePickerComponent } from 'dolphinng'


//导入模态框

@NgModule({
  imports:[
      CommonModule,
      FormsModule,
      UploaderModule,
      MyFormsModule,
      ModalModule,
      LayoutModule,
      NavModule,
      GalleryModule,
      PaginatorModule,
      DatePickerModule,
      DatetimePickerModule,
      CurrencyFormatModule,
      MyCommonModule
      ],
  declarations: [
    
    YuanFormatPipe,
    EffDateFormatPipe,
    FilterNullPipe,
    FilterMultiplyPipe,
    MySrcDirective,
    PreviewerComponent,
    PreviewOrDownloadComponent,
    DropDownComponent,
    HTML5ValidateDirective,
    // DatetimePickerComponent
  ],
  exports:      [
    FormsModule,
    CommonModule,
    UploaderModule,
    MyFormsModule,
    ModalModule,
    LayoutModule,
    NavModule,
    GalleryModule,
    PaginatorModule,
    DatePickerModule,
    DatetimePickerModule,
    CurrencyFormatModule,
    MyCommonModule,
    MySrcDirective,
    YuanFormatPipe,
    EffDateFormatPipe,
    FilterNullPipe,
    FilterMultiplyPipe,
    PreviewerComponent,
    PreviewOrDownloadComponent,
    DropDownComponent,
    HTML5ValidateDirective,
    // DatetimePickerComponent
  ]
})
export class SharedModule { }
