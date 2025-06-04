const request = require('supertest');
const app = require('../app'); // Adjust path to your app.js

describe('Sample API Test', () => {
  test('GET / should return 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World');
  });
});