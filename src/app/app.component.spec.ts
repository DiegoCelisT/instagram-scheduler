import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      imports: [
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have title with "nforms"', () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    const title = component.title
    expect(title).toEqual('nforms');
  });

  it('should have <h5> with "Postgrain challenge by DiegoCelisT"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    const h5 = bannerElement.querySelector('h5')!;
    expect(h5.textContent).toEqual('Postgrain challenge by DiegoCelisT');
  });

  it('should have figcaption with className "profile-thumbnail-label"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    const figcaption = bannerElement.querySelector('figcaption')!;
    expect(figcaption.className).toEqual('profile-thumbnail-label');
  });

  it('should have a correct submit initial statement', () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    const submit = component.submit
    expect(submit).toEqual(false);
  });

  // it('should have <h2> with "Channels"', () => {
  //   const bannerElement: HTMLElement = fixture.nativeElement;
  //   fixture = TestBed.createComponent(AppComponent);
  //   component = fixture.debugElement.componentInstance;
  //   const h2 = bannerElement.querySelector('h2')!;
  //   expect(h2.textContent).toEqual('Channels');
  // });

  // it('should have correct sum', () => {
  //   fixture = TestBed.createComponent(AppComponent);
  //   component = fixture.debugElement.componentInstance;
  //   const sum = component.sum(5,2)
  //   expect(sum).toEqual(7);
  // });

});