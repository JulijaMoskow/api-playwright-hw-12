import { StatusCodes } from 'http-status-codes';
import { test, expect } from '@playwright/test';

let baseURL: string = 'http://localhost:3000/users';

test('all users: should return empty array when no users', async ({ request }) => {
// удаляем всех пользователей
for (let i = 1; i < 100; i++) {
await request.delete(`${baseURL}/${i}`);
}

const response = await request.get(`${baseURL}`);
expect(response.status()).toBe(StatusCodes.OK);

const responseBody = await response.text();
expect(responseBody).toBe('[]');
});