import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { MhvresidentsAppComponent } from '../app/mhvresidents.component';

beforeEachProviders(() => [MhvresidentsAppComponent]);

describe('App: Mhvresidents', () => {
  it('should create the app',
      inject([MhvresidentsAppComponent], (app: MhvresidentsAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'mhvresidents works!\'',
      inject([MhvresidentsAppComponent], (app: MhvresidentsAppComponent) => {
    expect(app.title).toEqual('mhvresidents works!');
  }));
});
