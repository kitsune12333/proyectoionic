import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ListaAsistenciaPage } from './lista-asistencia.page';

describe('ListaAsistenciaPage', () => {
  let component: ListaAsistenciaPage;
  let fixture: ComponentFixture<ListaAsistenciaPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(ListaAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
