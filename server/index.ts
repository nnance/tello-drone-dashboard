import express from "express";
import { createServer } from "http";
import socketio from "socket.io";
import next from "next";

import commander from "./commander";
import salesRouter from "./routes/sales";
import ordersRouter from "./routes/orders";
import depositsRouter from "./routes/deposits";

const port = parseInt(process.env.PORT, 10) || 3000;
const ioPort = 4001;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const createIOServer = () => {
    const http = createServer();
    const io = socketio(http);

    io.on("connection", commander);

    http.listen(ioPort, () => {
        console.log(`listening on *:${ioPort}`);
    });
}

const createExpressServer = () => {
    const app = express();
    app.use("/api/sales", salesRouter);
    app.use("/api/orders", ordersRouter);
    app.use("/api/deposits", depositsRouter);

    app.get('*', (req, res) => {
        return handle(req, res)
    });

    app.listen(port, err => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
}

app.prepare().then(() => {
    createIOServer();
    createExpressServer();
})