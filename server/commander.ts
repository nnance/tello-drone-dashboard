import socketio from "socket.io";
import { droneFactory, IFlightController } from "tello-api-node";

// tslint:disable:no-console
const connectToDrone = async (socket: socketio.Socket) => {

    const listener = (msg: string) => socket.emit("status", msg);
    const stateListener = (state: {}) => socket.emit("state", state);
  
    try {
      const drone = await droneFactory(console.log, listener, stateListener);
      return drone;
    } catch (error) {
      listener("not connected");
      return undefined;
    }
};

export default async function commander(socket: socketio.Socket) {
    let drone: IFlightController;
    let timeoutId;

    const connectWithRetry = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        return connectToDrone(socket).then((result) => {
            if (!result) {
            console.log("unable to connect to Drone");
            timeoutId = setTimeout(() => {
                console.log("timed out waiting on Drone");
                connectWithRetry();
            }, 15000);
            } else {
            drone = result;
            }
        });
    };

    console.log("a user connected");
    connectWithRetry();

    socket.on("command", async (obj: {command: string}) => {
        console.log(`got command ${obj.command}`);
        if (drone) {
            try {
            if (obj.command === "takeoff") {
                await drone.takeOff();
            } else if (obj.command === "land") {
                await drone.land();
            } else if (obj.command === "start") {
                await drone.takeOff();
                await drone.forward(120);
                await drone.rotateClockwise(180);
                await drone.forward(120);
                await drone.rotateClockwise(180);
                await drone.land();
            }
            } catch (error) {
            drone.disconnect();
            drone = undefined;
            }
        } else {
            console.log("Drone not initialized");
            connectWithRetry();
        }
    });
}