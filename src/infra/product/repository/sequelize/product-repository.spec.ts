import { Sequelize } from 'sequelize-typescript'
import ProductRepository from './product.repository';
import ProductModel from './product.model';
import Product from '../../../../domain/product/entity/product';

describe("Product repository test", () => {
  let sequileze: Sequelize;

  beforeEach(async () => {
    sequileze = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequileze.addModels([ProductModel]);
    await sequileze.sync();
  });

  afterEach(async () => {
    await sequileze.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } })

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    })
  })

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    let productModel = await ProductModel.findOne({ where: { id: "1" } })

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    })

    product.changeName("new product name");
    product.changePrice(150);

    await productRepository.update(product);

    productModel = await ProductModel.findOne({ where: { id: "1" } })

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "new product name",
      price: 150,
    })
  })

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    let productModel = await ProductModel.findOne({ where: { id: "1" } })

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    })

    await productRepository.find(product.id);


    expect(productModel.toJSON()).toStrictEqual({
      id: productModel.id,
      name: productModel.name,
      price: product.price,
    })
  })

  it("should find all Product", async () => {
    const productRepository = new ProductRepository();

    const product1 = new Product("1", "Product 1", 100);
    const product2 = new Product("2", "Product 2", 200);


    await Promise.all([product1, product2].map(async product => await productRepository.create(product)))


    let products = await productRepository.findAll()

    expect(products).toHaveLength(2)
    expect(products).toEqual([product1, product2])
  })


})
