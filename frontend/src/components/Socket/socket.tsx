import React from "react";
import SocketIoClient from "socket.io-client";

const io = SocketIoClient("https://dark-ch.herokuapp.com");

export const SocketContext = React.createContext<SocketIOClient.Socket>(io);

const SocketContextProvider = (props: { children: React.ReactNode }) => {
  return (
    <SocketContext.Provider value={io}>{props.children}</SocketContext.Provider>
  );
};

export default SocketContextProvider;
