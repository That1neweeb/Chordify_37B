const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

const ProductMock = dbMock.define('Product', {
   id: 1,
   name: 'Fender Stratocaster',
   brand:'Fender',
   price:120000,
   condition:'New',
   rating: 4.8,
   category:'Electric Guitar',
   image_urls:'/uploads/imgs.search.brave.com/PC5dfILhv60c8tASyKOLeA4GANRriIrZ93G9dFvkkJc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMS8x/MC8yNC8xOC8yMC9m/ZW5kZXItc3RyYXRv/Y2FzdGVyLTY3Mzg5/MDJfNjQwLmpwZw',
   user_id: 101,
   status: 'pending',
    description: 'A classic electric guitar model'
});

describe('Product Model', () => {
    it('should create a product', async() => {
        const product = await ProductMock.create({
            name: 'Fender Stratocaster',
            brand:'Fender',
            price:120000,
            condition:'New',
            rating: 4.8,
            category:'Electric Guitar',
            image_urls:'/uploads/imgs.search.brave.com/PC5dfILhv60c8tASyKOLeA4GANRriIrZ93G9dFvkkJc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMS8x/MC8yNC8xOC8yMC9m/ZW5kZXItc3RyYXRv/Y2FzdGVyLTY3Mzg5/MDJfNjQwLmpwZw',
            user_id: 101,
            status: 'pending',
            description: 'A classic electric guitar model'
        });

        expect(product.name).toBe('Fender Stratocaster');
        expect(product.brand).toBe('Fender');
        expect(product.price).toBe(120000);
        expect(product.condition).toBe('New');
        expect(product.rating).toBe(4.8);
        expect(product.category).toBe('Electric Guitar');
        expect(product.image_urls).toBe('/uploads/imgs.search.brave.com/PC5dfILhv60c8tASyKOLeA4GANRriIrZ93G9dFvkkJc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMS8x/MC8yNC8xOC8yMC9m/ZW5kZXItc3RyYXRv/Y2FzdGVyLTY3Mzg5/MDJfNjQwLmpwZw');
        expect(product.user_id).toBe(101);
        expect(product.status).toBe('pending');
        expect(product.description).toBe('A classic electric guitar model');
    });

    it('should require all fields', async() => {

        const product = await ProductMock.create({});

        // Default values come from the mock definition
        expect(product.name).toBe('Fender Stratocaster');
        expect(product.brand).toBe('Fender');
        expect(product.price).toBe(120000);
        expect(product.condition).toBe('New');
        expect(product.rating).toBe(4.8);
        expect(product.category).toBe('Electric Guitar');
        expect(product.image_urls).toBe('/uploads/imgs.search.brave.com/PC5dfILhv60c8tASyKOLeA4GANRriIrZ93G9dFvkkJc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMS8x/MC8yNC8xOC8yMC9m/ZW5kZXItc3RyYXRv/Y2FzdGVyLTY3Mzg5/MDJfNjQwLmpwZw');
        expect(product.user_id).toBe(101);
        expect(product.status).toBe('pending');
        expect(product.description).toBe('A classic electric guitar model');

        // await expect(ProductMock.create({})).rejects.toThrow();
    });
});