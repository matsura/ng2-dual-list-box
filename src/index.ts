import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DualListBoxComponent } from './dual-list-box.component';
import { ArraySortPipe, ArrayFilterPipe } from './array.pipes';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ArraySortPipe,
    ArrayFilterPipe,
    DualListBoxComponent
  ],
  exports: [
    ArraySortPipe,
    ArrayFilterPipe,
    DualListBoxComponent
  ]
})
export class DualListBoxModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DualListBoxModule
    };
  }
}
