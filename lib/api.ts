import { decodeDeposits } from "./deposits";
import { IOrder } from "./orders";
import { ISale } from "./sales";
import socketIOClient from "socket.io-client";

export function decode<T>(json: string) {
  return JSON.parse(json) as T;
}

export const getSales = () => getData("api/sales").then((json) => decode<ISale[]>(json));
export const getDeposits = () => getData("api/deposits").then((json) => decodeDeposits(json));
export const getOrders = ()  => getData("api/orders").then((json) => decode<IOrder[]>(json));

export async function callApi<T>(path: string): Promise<T[]> {
    const response = await fetch(path);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
}

export async function getData(path: string): Promise<string> {
  const response = await fetch(path);
  const body = await response.blob();
  const results = await (new Response(body)).text();
  if (response.status !== 200) {
    throw Error(results);
  }
  return results;
}

// TODO: replace global with React Provider Pattern
let globalClient;

export const getSocketIOClient = () => {
  globalClient = globalClient || socketIOClient("http://127.0.0.1:4001");
  return globalClient;
};