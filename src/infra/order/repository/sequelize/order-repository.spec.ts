import { Sequelize } from "sequelize-typescript";
import Customer from "../../../../domain/customer/entity/customer";
import Product from "../../../../domain/product/entity/product";
import Address from "../../../../domain/customer/entity/adress";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer-repository";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderRepository from "./order-repository";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Order from "../../../../domain/checkout/entity/order";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    const customer = new Customer("123", "Customer 1", address);

    const product = new Product("123", "Product 1", 10);

    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [ordemItem]);

    await Promise.all([
      customerRepository.create(customer),
      productRepository.create(product)]);

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: ordemItem.id,
          name: ordemItem.name,
          price: ordemItem.getUnitPrice(),
          quantity: ordemItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should find a new order", async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    const customer = new Customer("123", "Customer 1", address);

    const product = new Product("123", "Product 1", 10);

    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [ordemItem]);

    await Promise.all([
      customerRepository.create(customer),
      productRepository.create(product)]);

    await orderRepository.create(order);

    const foundOrder = await orderRepository.find(order.id)
    expect(foundOrder).toStrictEqual(order);
  });

  it("should update a customer's order", async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    const c1 = new Customer("1", "Customer 1", address);
    const c2 = new Customer("2", "Customer 2", address);

    const p1 = new Product("1", "Product 1", 10);
    const p2 = new Product("2", "Product 2", 50);

    const ordemItem1 = new OrderItem("1", p1.name, p1.price, p1.id, 1);
    const ordemItem2 = new OrderItem("2", p2.name, p2.price, p2.id, 1);



    const order = new Order("123", "1", [ordemItem1, ordemItem2]);

    await Promise.all([
      customerRepository.create(c1),
      customerRepository.create(c2),
      productRepository.create(p1),
      productRepository.create(p2)]);

    await orderRepository.create(order);

    const foundOrder = await orderRepository.find(order.id)
    expect(foundOrder).toStrictEqual(order);

    const orderWithNewCustomer = foundOrder.changeCustomer(c2.id);
    await orderRepository.update(orderWithNewCustomer)

    const updateOrder = await orderRepository.find(orderWithNewCustomer.id)

    expect(orderWithNewCustomer).toStrictEqual(updateOrder);
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    const customer = new Customer("123", "Customer 1", address);

    const p1 = new Product("1", "Product 1", 10);
    const p2 = new Product("2", "Product 2", 50);
    const p3 = new Product("3", "Product 3", 100);

    const ordemItems = [p1, p2, p3].map(p => new OrderItem(p.id, p.name, p.price, p.id, 1))

    const order1 = new Order("1", "123", ordemItems.slice(0, 2));
    const order2 = new Order("2", "123", [ordemItems[2]]);

    await Promise.all([
      customerRepository.create(customer),
      productRepository.create(p1),
      productRepository.create(p2),
      productRepository.create(p3),
    ]);

    await Promise.all([
      orderRepository.create(order1),
      orderRepository.create(order2),
    ]);


    const foundOrder = await orderRepository.findAll()
    expect(foundOrder[0]).toStrictEqual(order1);
    expect(foundOrder[1]).toStrictEqual(order2);
  });
});