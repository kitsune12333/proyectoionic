import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { Router } from '@angular/router';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(RegisterPage);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should go to home page on home', () => {
    spyOn(router, 'navigate');

    component.register();

    expect(router.navigate).toHaveBeenCalledWith(['home'])
  });
});
