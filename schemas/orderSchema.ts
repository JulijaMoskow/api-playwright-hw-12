export const orderSchema = {
    id: 'number',
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    courierId: ['number', 'null'],
    status: ['string', 'null']
};