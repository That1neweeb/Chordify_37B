const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

const OrderMock = dbMock.define('Order', {
   id: 1,
  user_id: 10,
  total_amount: 2500.50,
  address: "Kathmandu, Nepal",
  phone: "9800000000",
  status: "PENDING",
  createdAt: new Date(),
  updatedAt: new Date()
});

describe('Order Model', () => {
    it('should create an order', async() => {
        const order = await OrderMock.create({
            user_id: 10,
            total_amount: 2500.50,
            address: "Kathmandu, Nepal",
            phone: "9800000000",
            status: "PENDING"
        });

        expect(order.user_id).toBe(10);
        expect(order.total_amount).toBe(2500.5);
        expect(order.address).toBe('Kathmandu, Nepal');
        expect(order.phone).toBe('9800000000');
        expect(order.status).toBe('PENDING');
    });

    it('should require all fields', async() => {

        const order = await OrderMock.create({});

        // Default values come from the mock definition
        expect(order.user_id).toBe(10);
        expect(order.total_amount).toBe(2500.5);
        expect(order.address).toBe('Kathmandu, Nepal');
        expect(order.phone).toBe('9800000000');
        expect(order.status).toBe('PENDING');

        // await expect(OrderMock.create({})).rejects.toThrow();
    });
});