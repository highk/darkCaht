import React from "react";
import SocketIoClient from "socket.io-client";
const { REACT_APP_SOCKET_HOST }: any = process.env;

const io = SocketIoClient(REACT_APP_SOCKET_HOST);

export const SocketContext = React.createContext<SocketIOClient.Socket>(io);

const SocketContextProvider = (props: { children: React.ReactNode }) => {
  return (
    <SocketContext.Provider value={io}>{props.children}</SocketContext.Provider>
  );
};

export default SocketContextProvider;
