import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import { v4 as uuid } from "uuid";
import OrderItem from "../entity/order_item";

export default class OrderService {


  static getTotalOrder(orderList: Order[]): number {
    return orderList.reduce((accumulator, order) => accumulator + order.total(), 0);
  }

  static placeOrder(customer: Customer, orderItemList: OrderItem[]): Order {
    if (orderItemList.length === 0) {
      throw new Error("Order must have at least one item")
    }

    const order = new Order(uuid(), customer.id, orderItemList);
    customer.addRewardPoints(order.total() * 0.5);
    return order;
  }
}