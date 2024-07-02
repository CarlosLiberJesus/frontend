import { TestBed } from '@angular/core/testing';

import { PageService } from '../page.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PageService', () => {
  let service: PageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [PageService],
      imports: [HttpClientModule, BrowserAnimationsModule], // Import the HttpClientModule to provide HttpClient
    });

    service = TestBed.inject(PageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
