import { test, expect } from '@playwright/test';
import { createOrder, getOrderById } from '../helpers/orderHelper';
import { orderSchema } from '../schemas/orderSchema';


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
for (const key of Object.keys(orderSchema) as Array<keyof typeof orderSchema>) {
const expectedType = orderSchema[key];
const actualValue = body[key];

if (Array.isArray(expectedType)) {
const actualType = actualValue === null ? 'null' : typeof actualValue;
expect(expectedType).toContain(actualType);
} else {
expect(typeof actualValue).toBe(expectedType);
}
}

console.log('POST /test-orders status:', response.status());
console.log('POST /test-orders body:', body);

expect(response.status()).toBe(200);
expect(body).toHaveProperty('id');
expect(typeof body.id).toBe('number');
});

test('POST /test-orders with api key should also create order', async ({ request }) => {
const response = await createOrder(request, TEST_ORDERS_URL, API_KEY);

const body = await response.json();
for (const key of Object.keys(orderSchema) as Array<keyof typeof orderSchema>) {
const expectedType = orderSchema[key];
const actualValue = body[key];

if (Array.isArray(expectedType)) {
const actualType = actualValue === null ? 'null' : typeof actualValue;
expect(expectedType).toContain(actualType);
} else {
expect(typeof actualValue).toBe(expectedType);
}
}

console.log('POST /test-orders with api key status:', response.status());
console.log('POST /test-orders with api key body:', body);

expect(response.status()).toBe(200);
expect(body).toHaveProperty('id');
});

test('POST /login/student with invalid credentials should return 401', async ({ request }) => {
const response = await request.post(`${BASE_URL}/login/student`, {
data: {
username: 'wrong_user',
password: 'wrong_password',
},
});

const responseText = await response.text();

console.log('POST /login/student status:', response.status());
console.log('POST /login/student raw body:', responseText);

expect(response.status()).toBe(401);
});
test('POST create order should return created order id', async ({ request }) => {
const createResponse = await createOrder(request, TEST_ORDERS_URL, API_KEY);
const createBody = await createResponse.json();
for (const key of Object.keys(orderSchema) as Array<keyof typeof orderSchema>) {
const expectedType = orderSchema[key];
const actualValue = createBody[key];

if (Array.isArray(expectedType)) {
const actualType = actualValue === null ? 'null' : typeof actualValue;
expect(expectedType).toContain(actualType);
} else {
expect(typeof actualValue).toBe(expectedType);
}
}

console.log('Create status:', createResponse.status());
console.log('Create body:', createBody);

const orderId = createBody.id;
expect(typeof orderId).toBe('number');
});
