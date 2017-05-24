import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import * as _ from 'lodash';

import { DualListBoxComponent } from '../dual-list-box.component';
import { ArraySortPipe, ArrayFilterPipe } from '../array.pipes';

describe('DualListBoxComponent with TCB', (): void => {

    let fixture: ComponentFixture<DualListBoxComponent>;
    let testArray = [];
    for (let i = 1; i < 100; i++) {
        testArray.push({
            id: i.toString(),
            name: 'Name ' + i
        });
    }

    beforeEach((done: Function) => {
        TestBed.configureTestingModule({
            declarations: [
                DualListBoxComponent,
                ArraySortPipe,
                ArrayFilterPipe
            ],
            imports: [
                CommonModule,
                ReactiveFormsModule
            ],
            providers: [
                /*provideRoutes(
                    [{ component: DualListBoxComponent, path: '' }]
                )*/
            ]
        });

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(DualListBoxComponent);
            done();
        });
    });

    it('should initialize available and selected items from passed data, valueField and textField', (done: Function): void => {

        const component: DualListBoxComponent = fixture.componentInstance;
        component.valueField = 'id';
        component.textField = 'name';
        component.data = testArray;

        fixture.detectChanges();

        expect(component['selectedItems']).toEqual([]);
        expect(_.isEqualWith(testArray, component['availableItems'], (testItem, availableItem) => {
            return testItem.id === availableItem.value && testItem.name === availableItem.text;
        })).toBe(true);

        done();
    });
/*
    it('should emit action on dropdown item click', (done: Function): void => {

        const actions: IDropDownAction[] = [{ icon: 'delete', name: MetadataAction.type.DELETE }];
        const component: UIDropdownIconComponent = fixture.componentInstance;
        component.actions = actions;
        spyOn(component.onActionClick, 'emit');
        fixture.detectChanges();

        const item: DebugElement = fixture.debugElement.query(By.css('.item'));
        expect(item).toBeTruthy();
        item.nativeElement.dispatchEvent(new Event('click'));

        expect(component.onActionClick.emit).toHaveBeenCalledWith(MetadataAction.type.DELETE);
        done();
    }); */

});