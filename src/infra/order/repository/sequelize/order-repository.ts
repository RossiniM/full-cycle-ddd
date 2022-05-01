import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {

    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total(),
      items: entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.getUnitPrice(),
        product_id: item.productId,
        quantity: item.quantity
      }))
    }, {
      include: [{ model: OrderItemModel }]
    })
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total(),
      items: entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.getUnitPrice(),
        product_id: item.productId,
        quantity: item.quantity
      }))
    }, {
      where: { id: entity.id },
    })
  }
  async find(id: string): Promise<Order> {
    const order = await OrderModel.findOne({ where: { id }, include: [{ model: OrderItemModel }] });
    const orderItems = order.items.map(i => new OrderItem(i.id, i.name, i.price, i.product_id, i.quantity));
    return new Order(
      order.id,
      order.customer_id,
      orderItems
    );
  }
  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({ include: [{ model: OrderItemModel }] });
    return orders.map(order => {
      const orderItems =
        order.items.map(i => new OrderItem(i.id, i.name, i.price, i.product_id, i.quantity));

      return new Order(order.id, order.customer_id, orderItems)
    })
  }
}