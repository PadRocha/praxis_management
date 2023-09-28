import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmComponent, InputSelectComponent, HeaderComponent, ScrollToTopComponent, ToasterComponent } from './components';
import { CopyDirective, DebounceClickDirective } from './directives';
import { CapitalizePipe, TimeAgoPipe } from './pipes';

@NgModule({
  declarations: [
    ScrollToTopComponent,
    ToasterComponent,
    DebounceClickDirective,
    CapitalizePipe,
    TimeAgoPipe,
    ConfirmComponent,
    CopyDirective,
    InputSelectComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ScrollToTopComponent,
    ToasterComponent,
    DebounceClickDirective,
    CapitalizePipe,
    TimeAgoPipe,
    ConfirmComponent,
    CopyDirective,
    InputSelectComponent,
    HeaderComponent,
  ]
})
export class SharedModule { }
