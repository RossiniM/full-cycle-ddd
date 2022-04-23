
import Product from "./product";

describe("Product unit tests", () => {

  it("should throw err when id is empty", () => {

    expect(() => {

      const product = new Product("", "Product 1", 100);

    }).toThrowError("ID is required");
  });

  it("should throw err when name is empty", () => {

    expect(() => {

      const product = new Product("1", "", 100);

    }).toThrowError("Name is required");
  });

  it("should throw price when is invalid", () => {

    expect(() => {

      const product = new Product("1", "Product 1", - 100);

    }).toThrowError("Price is invalid");
  });


  it("should change name ", () => {

    const product = new Product("1", "Product 1", 100);
    product.changeName("productName");
    expect(product.name).toBe("productName");

  });


  it("should change price to valid value ", () => {

    const product = new Product("1", "Product 1", 100);
    product.changePrice(200);
    expect(product.price).toBe(200);

  });


  it("should change price to invalid value ", () => {

    expect(() => {
      const product = new Product("1", "Product 1", 100);

      product.changePrice(-5);

    }).toThrowError("Price is invalid");


  });

});
