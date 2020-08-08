import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CartlistComponent } from './cartlist.component';

describe('CartlistComponent', () => {
  let component: CartlistComponent;
  let fixture: ComponentFixture<CartlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartlistComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CartlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
