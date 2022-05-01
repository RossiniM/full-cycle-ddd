import { UUID } from "sequelize/types";
import Address from "../../customer/entity/adress";
import Customer from "../../customer/entity/customer";
import CustomerChangeAddressEvent from "../../customer/event/customer-change-address.event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import SendLogWheCustomerAddresIsChangedHandler from "../../customer/event/handler/send-log-when-customer-is-changed.handler";
import SendLogWheCustomerIsCreatedHandler1 from "../../customer/event/handler/send-log-when-customer-is-createad.handler";
import SendLogWheCustomerIsCreatedHandler2 from "../../customer/event/handler/send-log-when-customer-is-createad.handler2";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-createad.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain event tests", () => {

  it("should registe an event handler", () => {

    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {

    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);

  });

  it("should unregister all event handlers", () => {

    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    eventDispatcher.register("ProductCreatedEvent2", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent2"][0]).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent2"]).toBeUndefined();
  });




  it("should notify all event handlers", () => {

    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);



    const event = new ProductCreatedEvent({ name: "Celular", model: "Sansung", year: "2021" });
    eventDispatcher.notify(event);

    expect(spyEventHandler).toHaveBeenCalled();

  });


  it("should notify customer address change", () => {

    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendLogWheCustomerAddresIsChangedHandler();

    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]).toMatchObject(eventHandler);

    let addr = new Address("camp noua", 78232, "4545", "CityHall");
    let { id, name, address } = new Customer("1", "Jhon", addr);


    const event = new CustomerChangeAddressEvent(
      { id, name, address });

    eventDispatcher.notify(event);

    expect(spyEventHandler).toHaveBeenCalledWith(event);
  });

  it("should notify customer creation", () => {

    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendLogWheCustomerIsCreatedHandler1();
    const eventHandler2 = new SendLogWheCustomerIsCreatedHandler2();

    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
    
    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

    const event1 = new CustomerCreatedEvent({});
    const event2 = new CustomerCreatedEvent({});
    eventDispatcher.notify(event1);
    eventDispatcher.notify(event2);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });
});