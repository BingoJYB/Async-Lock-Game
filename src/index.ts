let AsyncLock = require('async-lock');
let lock = new AsyncLock();

async function sleep(ms: number) {
    return new Promise((resolve: any) => {
        setTimeout(() => resolve(), ms)
    })
}

async function randomDelay() {
    const randomTime = Math.round(Math.random() * 10000);
    return sleep(randomTime)
}

class ShipmentSearchIndex {
     async updateShipment(id: string, shipmentData: any) {
        const startTime = new Date();
        await randomDelay();
        const endTime = new Date();
        console.log(`update ${id}@${
            startTime.toISOString()
            } with ${shipmentData} finished@${
            endTime.toISOString()
            }`
        );

        return {startTime, endTime}
    }
}

interface ShipmentUpdateListenerInterface {
    receiveUpdate(id: string, shipmentData: any): any
}

class ShipmentUpdateListener extends ShipmentSearchIndex implements ShipmentUpdateListenerInterface {
    receiveUpdate(id: string, shipmentData: any): void {
        lock.acquire(id, async () => {
            await this.updateShipment(id, shipmentData);
        })
    }
}

let shipment: ShipmentUpdateListenerInterface = new ShipmentUpdateListener();

shipment.receiveUpdate('1', 'data1');
shipment.receiveUpdate('1', 'data2');
shipment.receiveUpdate('2', 'data1');
shipment.receiveUpdate('1', 'data3');
shipment.receiveUpdate('1', 'data4');
shipment.receiveUpdate('2', 'data2');
shipment.receiveUpdate('3', 'data1');
shipment.receiveUpdate('2', 'data3');
