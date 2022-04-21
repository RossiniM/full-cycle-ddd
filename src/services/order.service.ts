import Order from "../entity/order";

export default class OrderService{


static getTotalOrder(orderList:Order []): number{
  return orderList.reduce((accumulator, order) => accumulator + order.total(),0);
}

}