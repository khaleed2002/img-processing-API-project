import supertest from 'supertest';
import app from '../index';
//supertest code is from Udacity classroom
const request = supertest(app);
describe('Test endpoint responses', () => {
  it('Test root response', async () => {
    const response = await request.get('/');
    expect(response.status).toEqual(200);
  });
  it('gets the resize endpoint', async () => {
    const response = await request.get('/resize');
    expect(response.status).toEqual(200);
  });
});
