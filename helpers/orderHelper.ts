export async function createOrder(request, url, apiKey) {
    const response = await request.post(url, {
        headers: {
            'x-api-key': apiKey,
        },
        data: {
            customerName: 'Test',
            customerPhone: '123456',
            comment: 'test order',
        },
    });

    return response;
}

export async function getOrderById(request, url, orderId) {
    const response = await request.get(`${url}/${orderId}`);

    return response;
}