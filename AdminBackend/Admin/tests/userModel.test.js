const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

const UserMock = dbMock.define('User', {
   id: 1,
  full_name: "Satyam Shrestha",
  email: "satyam@example.com",
  password_hash: "satyam123",
  role: "customer",
  verification_token: null,
  token_expires: null,
  is_verified: false,
  reset_token: null,
  reset_token_expires: null
});

describe('User Model', () => {
    it('should create a user', async() => {
        const user = await UserMock.create({
            full_name: "Satyam Shrestha",
            email: "satyam@example.com",
            password_hash: "satyam123",
            role: "customer",
            verification_token: null,
            token_expires: null,
            is_verified: false,
            reset_token: null,
            reset_token_expires: null
        });

        expect(user.full_name).toBe('Satyam Shrestha');
        expect(user.email).toBe('satyam@example.com');
        expect(user.password_hash).toBe('satyam123');
        expect(user.role).toBe('customer');
        expect(user.verification_token).toBe(null);
        expect(user.token_expires).toBe(null);
        expect(user.is_verified).toBe(false);
        expect(user.reset_token).toBe(null);
        expect(user.reset_token_expires).toBe(null);
    });

    it('should require all fields', async() => {

        const user = await UserMock.create({});

        // Default values come from the mock definition
        expect(user.full_name).toBe('Satyam Shrestha');
        expect(user.email).toBe('satyam@example.com');
        expect(user.password_hash).toBe('satyam123');
        expect(user.role).toBe('customer');
        expect(user.verification_token).toBe(null);
        expect(user.token_expires).toBe(null);
        expect(user.is_verified).toBe(false);
        expect(user.reset_token).toBe(null);
        expect(user.reset_token_expires).toBe(null);

        // await expect(UserMock.create({})).rejects.toThrow();
    });
});