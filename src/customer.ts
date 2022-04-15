 class Customer{

     _id: string;
    _name: string;
    _address: string;
    _active: boolean = true;

    constructor(id:string, name:string, address: string){

      this._id = id;
      this._address = address;
      this._name = name;
    }


    get id():string{
      return this._id;
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
