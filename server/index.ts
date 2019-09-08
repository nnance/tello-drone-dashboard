import { createServer } from "http";
import { parse } from "url";
import socketio from "socket.io";
import next from "next";
import commander from "./commander";

const port = parseInt(process.env.PORT, 10) || 3000;
const ioPort = 4001;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const http = createServer();
    const io = socketio(http);

    io.on("connection", commander);

    http.listen(ioPort, () => {
        console.log(`listening on *:${ioPort}`);
    });

    createServer(handle).listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`)
    })
})