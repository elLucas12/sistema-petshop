import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAgendamentoComponent } from './popup-agendamento.component';

describe('PopupAgendamentoComponent', () => {
  let component: PopupAgendamentoComponent;
  let fixture: ComponentFixture<PopupAgendamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupAgendamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
