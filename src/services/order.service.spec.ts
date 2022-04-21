import { idText, isTemplateExpression } from "typescript"
import OrderItem from "../entity/order_item"
import Order from "../entity/order"
import OrderService from "./order.service"

describe("Order service unit tests ", () => {



it("should sum total of all orders", () => {

  const orderItem1 = new OrderItem("1","Item 1", 100, "p1", 1)
  const orderItem2 = new OrderItem("1","Item 2", 200, "p2", 2)

  const order1 = new Order("1","c2", [orderItem1])
  const order2 = new Order("2","c2", [orderItem2])

  expect(OrderService.getTotalOrder([order1, order2])).toBe(500);

})




















})