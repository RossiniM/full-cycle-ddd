import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

  it("should throw err when id is empty", () => {

    expect(() => {

      let order = new Order("", "123", []);

    }).toThrowError("ID is required");
  });

  it("should throw err when customerID is empty", () => {

    expect(() => {

      let order = new Order("1", "", []);

    }).toThrowError("CustomerID is required");
  });

  it("should throw err when items is empty", () => {

    expect(() => {

      let order = new Order("1", "123", []);

    }).toThrowError("Items are required");
  });

  it("should calculate total", () => {


    const item1 = new OrderItem("1", "item1", 50, "1", 2);
    const item2 = new OrderItem("1", "item1", 50, "1", 2);

    let order = new Order("1", "123", [item1, item2]);

    expect(order.total()).toBe(200);

  });

})