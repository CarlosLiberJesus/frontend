import { TestBed } from '@angular/core/testing';

import { SplashScreenService } from '../splash-screen.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SplashScreenService', () => {
  let service: SplashScreenService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [SplashScreenService],
      imports: [BrowserAnimationsModule], // Import the HttpClientModule to provide HttpClient
    });

    service = TestBed.inject(SplashScreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
