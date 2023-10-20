import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomeProfePage } from './home-profe.page';
import { Router } from '@angular/router';

describe('HomeProfePage', () => {
  let component: HomeProfePage;
  let fixture: ComponentFixture<HomeProfePage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(HomeProfePage);
    component = fixture.componentInstance;
    router = TestBed.get(router);
    fixture.detectChanges();
  }));

  it('should go homeprofe to asistncia', () => {
    spyOn(router, 'navigate');

    component.asistencia();

    expect(router.navigate).toHaveBeenCalledWith(['asistencia'])
  });

  it('should go to home page on login', () => {
    spyOn(router, 'navigate');

    component.lista();

    expect(router.navigate).toHaveBeenCalledWith(['lista-asistencia'])
  });


});
