import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app';

describe('App', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that no unmatched requests are outstanding
    httpTestingController.verify();
    TestBed.resetTestingModule();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges(); // Trigger ngOnInit

    const app = fixture.componentInstance;
    expect(app).toBeTruthy();

    // Handle the HTTP request made in ngOnInit
    const req = httpTestingController.expectOne('http://localhost:8080/bible_verses');
    expect(req.request.method).toBe('GET');
    req.flush([]); // Respond with empty array

    fixture.destroy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges(); // Trigger ngOnInit

    // Handle the HTTP request made in ngOnInit
    const req = httpTestingController.expectOne('http://localhost:8080/bible_verses');
    req.flush([]); // Respond with empty array

    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Bible Verse Locket');

    fixture.destroy();
  });
});
