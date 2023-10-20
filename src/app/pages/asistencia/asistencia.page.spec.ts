import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AsistenciaPage } from './asistencia.page';
import { Router } from '@angular/router';

describe('AsistenciaPage', () => {
  let component: AsistenciaPage;
  let fixture: ComponentFixture<AsistenciaPage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(AsistenciaPage);
    component = fixture.componentInstance;
    router = TestBed.get(router);
    fixture.detectChanges();
  }));

  it('should go to lista asistencia on asistencia', () => {
    spyOn(router, 'navigate');

    component.verAsistencia();

    expect(router.navigate).toHaveBeenCalledWith(['lista-asistencia'])
  });
});
