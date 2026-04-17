import { StatusCodes } from 'http-status-codes';
import { test, expect } from '@playwright/test';

let baseURL: string = 'http://localhost:3000/users';

test.describe('User management API', () => {

test('find user: should return a user by ID', async ({ request }) => {
const createResponse = await request.post(`${baseURL}`, {
data: {
name: 'Test',
email: 'test@test.com',
phone: '123456'
}
});

expect(createResponse.status()).toBe(StatusCodes.CREATED);

const createdUser = await createResponse.json();
const userId = createdUser.id;

const response = await request.get(`${baseURL}/${userId}`);
expect(response.status()).toBe(StatusCodes.OK);
});

test('find user: should return 404 if user not found', async ({ request }) => {
const response = await request.get(`${baseURL}/999999`);
expect(response.status()).toBe(StatusCodes.NOT_FOUND);
});

test('create user: should add a new user', async ({ request }) => {
const response = await request.post(`${baseURL}`, {
data: {
name: 'Test',
email: 'test@test.com',
phone: '123456'
}
});

expect(response.status()).toBe(StatusCodes.CREATED);
});

test('delete user: should delete a user by ID', async ({ request }) => {
const createResponse = await request.post(`${baseURL}`, {
data: {
name: 'Test',
email: 'test@test.com',
phone: '123456'
}
});

expect(createResponse.status()).toBe(StatusCodes.CREATED);

const createdUser = await createResponse.json();
const userId = createdUser.id;

const response = await request.delete(`${baseURL}/${userId}`);
expect(response.status()).toBe(StatusCodes.OK);
});

test('delete user: should return 404 if user not found', async ({ request }) => {
const response = await request.delete(`${baseURL}/999999`);
expect(response.status()).toBe(StatusCodes.NOT_FOUND);
});

});