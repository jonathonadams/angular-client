import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

describe('ApiService', () => {
  const baseUrl = environment.apiBaseUrl;
  const testData = { id: '1', data: 'some data' };
  let apiService: ApiService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService],
      imports: [HttpClientTestingModule]
    });

    // Inject the http service and test controller for each test
    apiService = TestBed.get(ApiService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  describe('get', () => {
    it('should make a GET request to the API url /resources', () => {
      // Make an HTTP GET request
      apiService.get('test').subscribe(data => {
        // When observable resolves, result should match test data
        expect(data).toEqual([testData]);
      });

      // The following `expectOne()` will match the request's URL.
      // If no requests or multiple requests matched that URL
      // `expectOne()` would throw.
      const req = httpTestingController.expectOne(`${baseUrl}/test`);

      // Assert that the request is a GET.
      expect(req.request.method).toEqual('GET');

      // Respond with mock data, causing Observable to resolve.
      // Subscribe callback asserts that correct data was returned.
      req.flush([testData]);

      // Finally, assert that there are no outstanding requests.
      httpTestingController.verify();
    });
  });

  describe('getOne', () => {
    it('should make a GET request to the API url /resources/:id', () => {
      apiService.getOne('test', testData.id).subscribe(data => {
        expect(data).toEqual(testData);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/test/${testData.id}`);

      expect(req.request.method).toEqual('GET');
      req.flush(testData);
      httpTestingController.verify();
    });
  });

  describe('post', () => {
    it('should make a POST request to the API url /resources', () => {
      apiService.post('test', testData).subscribe(data => {
        expect(data).toEqual(testData);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/test`);

      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(testData);
      req.flush(testData);
      httpTestingController.verify();
    });
  });

  describe('put', () => {
    it('should make a PUT request to the API url /resources/:id', () => {
      apiService.put('test', testData).subscribe(data => {
        expect(data).toEqual(testData);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/test/${testData.id}`);

      expect(req.request.method).toEqual('PUT');
      req.flush(testData);
      httpTestingController.verify();
    });
  });

  describe('delete', () => {
    it('hould make a DELETE request to the API url /resources/:id', () => {
      apiService.delete('test', testData.id).subscribe(data => {
        expect(data).toEqual(testData);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/test/${testData.id}`);

      expect(req.request.method).toEqual('DELETE');
      req.flush(testData);
      httpTestingController.verify();
    });
  });

  describe('search', () => {
    it('should make a GET request to the API url /resources/search with search paramaters', () => {
      const params = new HttpParams().set('data', 'some data');
      apiService.search('test', params).subscribe(data => {
        expect(data).toEqual(testData);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/test/search?data=some%20data`);

      expect(req.request.method).toEqual('GET');
      expect(req.request.params).toBeTruthy();
      expect(req.request.params.get('data')).toEqual('some data');

      req.flush(testData);
      httpTestingController.verify();
    });
  });

  describe('onRequestError', () => {
    it('should log all errors', () => {
      const error = new Error('Test Error');
      spyOn(console, 'log');
      apiService.onRequestError(error);

      expect(console.log).toHaveBeenCalled();
    });
  });
});
