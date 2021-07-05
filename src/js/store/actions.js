import { CONNECT, SEND, DISCONNECT, RECEIVE } from "./types";

export function ioConnect(url) {
  return function (dispatch) {
    dispatch({ type: CONNECT, payload: url });
  };
}

export function ioDisconnect() {
  return function (dispatch) {
    dispatch({ type: DISCONNECT });
  };
}

export function ioSend(message) {
  return function (dispatch) {
    dispatch({ type: SEND, payload: message });
  };
}

export function ioRecv() {
  return function (dispatch) {
    dispatch({ type: RECEIVE });
  };
}
