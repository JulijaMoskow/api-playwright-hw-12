import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'https://backend.tallinn-learning.ee';
const TEST_ORDERS_URL = `${BASE_URL}/test-orders`;
const API_KEY = process.env.API_KEY || '';

test('GET /test-orders should return 405 (method not allowed)', async ({ request }) => {
const response = await request.get(TEST_ORDERS_URL);

console.log('GET /test-orders status:', response.status());

expect(response.status()).toBe(405);
});

test('POST /test-orders should create order (no api key required)', async ({ request }) => {
const response = await request.post(TEST_ORDERS_URL, {
data: {
customerName: 'Test',
customerPhone: '123456',
comment: 'test order',
},
});

const body = await response.json();

console.log('POST /test-orders status:', response.status());
console.log('POST /test-orders body:', body);

expect(response.status()).toBe(200);
expect(body).toHaveProperty('id');
expect(typeof body.id).toBe('number');
});

test('POST /test-orders with api key should also create order', async ({ request }) => {
const response = await request.post(TEST_ORDERS_URL, {
headers: {
'x-api-key': API_KEY,
},
data: {
customerName: 'Test',
customerPhone: '123456',
comment: 'test order',
},
});

const body = await response.json();

console.log('POST /test-orders with api key status:', response.status());
console.log('POST /test-orders with api key body:', body);

expect(response.status()).toBe(200);
expect(body).toHaveProperty('id');
});

test('POST /login/student with invalid credentials should return 401', async ({ request }) => {
const response = await request.post(`${BASE_URL}/login/student`, {
data: {
username: 'student',
password: 'student',
},
});

const responseText = await response.text();

console.log('POST /login/student status:', response.status());
console.log('POST /login/student raw body:', responseText);

expect(response.status()).toBe(401);
});