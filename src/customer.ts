 class Customer{

     _id: string;
    _name: string;
    _address: string;

    constructor(id:string, name:string, address: string){

      this._id = id;
      this._address = address;
      this._name = name;
    }


    get id():string{
      return this._id;
    }

    get name():string{
      return this._name;
    }


    get address():string{
      return this._address;
    }

 }

 //Entidade anemica
 //Cria-se essas entidades anemicas em virtude da ORM
 //DDD as entidades possui regra de negócio