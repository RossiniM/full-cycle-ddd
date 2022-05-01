
export default class Product {

  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {

    this._id = id;
    this._name = name;
    this._price = price;

    this.validate();
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  get id(): string {
    return this._id;
  }

  validate() {
    if (this._id.length === 0) {
      throw Error("ID is required");
    }

    if (this._name.length === 0) {
      throw Error("Name is required");
    }

    if (this._price < 0) {
      throw Error("Price is invalid");
    }
    return true;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }


  changePrice(price: number): Product {
    this._price = price;
    this.validate();
    return this;
  }
}