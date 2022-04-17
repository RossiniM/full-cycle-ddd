 export default class Customer{

     _id: string;
    _name: string;
    _address: Address;
    _active: boolean = true;

    constructor(id:string, name:string, address: Address){

      this._id = id;
      this._address = address;
      this._name = name;
      this.validate();
    }


    get id():string{
      return this._id;
    }

    validate(){
      if(this._name.length === 0){
        throw new Error("Name is required")
      }

      if(this._id.length === 0){
        throw new Error("ID is required")
      }
    }

    changeName(name: string){
       this._name = name;
    }

    activate(){
      this._active = true;
    }

    inactivate(){ 
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