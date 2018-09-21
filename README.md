# Async-Lock-Game

## Background:
The `ShipmentUpdateListenerInterface` will get updates passed to it (from some external system, REST interface, Queue system or something similar). It has to update the `ShipmentSearchIndex` with the new data of the shipment.

## Restrictions:
Whenever `receiveUpdate` is called the function `updateShipment` of the `ShipmentSearchIndex` is called once, with the corresponding data and id passed to it.

The executions of `updateShipment` with the same id never run in concurrently (Execution always in order and consecutive). All the code is running in one NodeJS process.
