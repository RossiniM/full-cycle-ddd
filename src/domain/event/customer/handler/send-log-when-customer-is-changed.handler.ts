import EventHandlerInterface from "../../@shared/event-handler.interface";
import eventInterface from "../../@shared/event.interface";

export default class SendLogWheCustomerAddresIsChangedHandler implements EventHandlerInterface {


  handle(event: eventInterface): void {
    const { id, name, address } = event.eventData
    console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${address}`);
  }
}