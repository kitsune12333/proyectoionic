import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MiAsistenciaPage } from './mi-asistencia.page';

describe('MiAsistenciaPage', () => {
  let component: MiAsistenciaPage;
  let fixture: ComponentFixture<MiAsistenciaPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(MiAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
