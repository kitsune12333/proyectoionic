import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoaderPage } from './loader.page';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('LoaderPage', () => {
  let component: LoaderPage;
  let fixture: ComponentFixture<LoaderPage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(LoaderPage);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
    AppRoutingModule
  }));

  it('should go to login page after load', () => {
    spyOn(router, 'navigate')
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['login'])
  });
});
