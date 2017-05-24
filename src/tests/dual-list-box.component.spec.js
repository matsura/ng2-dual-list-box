"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var _ = require("lodash");
var dual_list_box_component_1 = require("../dual-list-box.component");
var array_pipes_1 = require("../array.pipes");
describe('DualListBoxComponent with TCB', function () {
    var fixture;
    var testArray = [];
    for (var i = 1; i < 100; i++) {
        testArray.push({
            id: i.toString(),
            name: 'Name ' + i
        });
    }
    beforeEach(function (done) {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                dual_list_box_component_1.DualListBoxComponent,
                array_pipes_1.ArraySortPipe,
                array_pipes_1.ArrayFilterPipe
            ],
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule
            ],
            providers: []
        });
        testing_1.TestBed.compileComponents().then(function () {
            fixture = testing_1.TestBed.createComponent(dual_list_box_component_1.DualListBoxComponent);
            done();
        });
    });
    it('should initialize available and selected items from passed data, valueField and textField', function (done) {
        var component = fixture.componentInstance;
        component.valueField = 'id';
        component.textField = 'name';
        component.data = testArray;
        fixture.detectChanges();
        expect(component['selectedItems']).toEqual([]);
        expect(_.isEqualWith(testArray, component['availableItems'], function (testItem, availableItem) {
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
