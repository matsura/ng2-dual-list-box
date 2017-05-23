import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DualListBoxComponent } from './dual-list-box.component';
import { ArraySortPipe } from './array.pipes';

export * from './dual-list-box.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ArraySortPipe,
    DualListBoxComponent
  ],
  exports: [
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
