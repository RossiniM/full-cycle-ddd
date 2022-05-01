import { idText, isTemplateExpression } from "typescript"
import OrderItem from "../entity/order_item"
import Order from "../entity/order"
import OrderService from "./order.service"
import Customer from "../../customer/entity/customer"
import Address from "../../customer/entity/adress"

describe("Order service unit tests ", () => {

  it("should sum total of all orders", () => {

    const orderItem1 = new OrderItem("1", "Item 1", 100, "p1", 1)
    const orderItem2 = new OrderItem("1", "Item 2", 200, "p2", 2)

    const order1 = new Order("1", "c2", [orderItem1])
    const order2 = new Order("2", "c2", [orderItem2])

    expect(OrderService.getTotalOrder([order1, order2])).toBe(500);

  })

  it("should place an order and generate reward points", () => {

    const address = new Address("vereador nunes", 12, "88545788", "Aratuba")
    const customer = new Customer("c1", "Joe", address);
    const orderItem1 = new OrderItem("1", "Item 1", 10, "p1", 1)

    const order = OrderService.placeOrder(customer, [orderItem1])

    expect(customer.rewardPoints).toBe(5)

    expect(order.total()).toBe(10)

  })
})