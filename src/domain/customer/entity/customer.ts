import Address from "./adress"

export default class Customer {

  private _id: string;
  private _name: string;
  private _address: Address;
  private _rewardPoints: number = 0;
  private _active: boolean = true;

  constructor(id: string, name: string, address: Address) {

    this._id = id;
    this._address = address;
    this._name = name;
    this.validate();
  }


  get id(): string {
    return this._id;
  }


  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get address(): Address{
    return this._address;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  validate() {
    if (this._name.length === 0) {
      throw new Error("Name is required")
    }

    if (this._id.length === 0) {
      throw new Error("ID is required")
    }

    if (this._address == undefined) {
      throw new Error("Address is required")
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    this._active = true;
  }

  isActive(): boolean {
    return this._active;
  }

  inactivate() {
    this._active = false;
  }

}
/*

Complexidade de negócio

Domain
- Entity
 -- Customer.ts(Regra de negócio)


 Complexidade acidental

 infra - Mundo externo
- Entity/Model
 -- customer.ts(get,set)
*/