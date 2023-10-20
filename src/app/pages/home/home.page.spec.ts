import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomePage } from './home.page';
import { Router } from '@angular/router';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router: Router;
  
  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    router = TestBed.get(router);
    fixture.detectChanges();
  }));

  it('should go to home page on mi-asistencia', () => {
    spyOn(router, 'navigate');

    component.miAsistencia();

    expect(router.navigate).toHaveBeenCalledWith(['mi-asistencia'])
  });
});
