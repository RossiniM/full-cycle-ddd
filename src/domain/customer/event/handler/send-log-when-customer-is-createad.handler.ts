import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import EventInterface from "../../../@shared/event/event.interface";

export default class SendLogWheCustomerIsCreatedHandler1 implements EventHandlerInterface {

  handle(event: EventInterface): void {
    console.log(`Esse é o primeiro console.log do evento: CustomerCreated"`);
  }
}