import React, { useEffect, useState } from "react";
import { useGetAllAzureQuery } from "../../services/calendarApi";
import socket from "../../SocketioService";
import {
  useUpdateToolbarMutation,
  useGetToolbarQuery,
} from "../../services/tBarApi";
import EwsIntegrationModal from "./ewsIntegrationModal";
import { useParams } from "react-router-dom";
import {
  useGetScreensByIdQuery,
  useGetScreensByRoomIdQuery,
} from "../../services/screenApi";
import { useDisclosure, Text } from "@chakra-ui/react";

const ScreenIntegration: React.FC = () => {
  //Here for modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const obj = {
    initialRef: initialRef,
    finalRef: finalRef,
    isOpen: isOpen,
    onOpen: onOpen,
    onClose: onClose,
  };

  //Here rtk query
  const { data, isSuccess } = useGetAllAzureQuery();
  const [state, setState] = useState();
  const [code, setCode] = useState();

  //steate
  const [toolbarStatus, setToolbarStatus] = useState<boolean>();

  //parameter
  const { screenId, roomId } = useParams();

  //queries
  const { data: IToolbar, isSuccess: toolbarSuccess } = useGetToolbarQuery(1);
  const [updateToolbar] = useUpdateToolbarMutation();
  const { data: screenData, isSuccess: isScreenSuccess } =
    useGetScreensByIdQuery(roomId!);

  console.log(screenData);
  const toolbar = (id: number, status: boolean) => {
    const data = { id: id, status: status };
    updateToolbar(data);
    setToolbarStatus(data.status);
  };

  useEffect(() => {
    IToolbar && setToolbarStatus(IToolbar.status);
  }, [IToolbar]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket connection integration.tsx", socket.connected);
    });

    socket.on("exchange", (data) => {
      console.log("Received message from server:", data);
    });
  }, []);

  useEffect(() => {
    if (window.location.search) {
      let params: any = window.location.search
        .substring(1)
        .split("&")
        .reduce(function (result: any, item) {
          let parts = item.split("=");
          result[parts[0]] = parts[1];
          return result;
        }, {});
      setCode(params["code"]);
      setState(params["state"]);
    }
  }, []);

  /**
   * TODO this message object is not useful. I don't use it in socket.
   * TODO I need to improve this point. in java spring.
   * noo need this because I'll send message from java controller.
   */
  const sendMessage = () => {
    socket.emit("send_toolbar", {
      type: "CLIENT",
      message: "toolbarStatus",
    });
  };

  return (
    <div className="space-x-1 w-full h-full bg-red-50">
      <EwsIntegrationModal {...obj} />
      <a
        href={
          `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?` +
          `client_id=469e5942-bf76-44f3-8c77-272988660c36` +
          `&response_type=code` +
          // `&redirect_uri=http://localhost:3000/redirect` +
          `&redirect_uri=https://screenapi.mintyfi.com/redirect` +
          `&response_mode=query` +
          `&scope=openid%20offline_access%20https%3A%2F%2Fgraph.microsoft.com%2Fcalendars.read%20https%3A%2F%2Fgraph.microsoft.com%2Fuser.read` +
          `&state=rooms-${roomId}-screens-${screenId}-integration&prompt=consent`
        }
        rel="noopener noreferrer"
      >
        <button
          onClick={onOpen}
          className="bg-blue-500 font-semibold rounded p-2 text-sm text-white"
        >
          Office 365 Integration
        </button>
      </a>
      <button
        onClick={onOpen}
        className="bg-blue-500 font-semibold rounded p-2 text-sm text-white"
      >
        EWS Integration
      </button>
      <button
        onClick={() => {
          toolbar(1, !toolbarStatus);
        }}
        className="bg-blue-500 font-semibold rounded p-2 text-sm text-white"
      >
        Toolbar On/Off
      </button>

      <Text fontSize={32}>
        <b>Screen name: </b> {isScreenSuccess && screenData.screenName}
      </Text>
      <p>
        <b>Toolbar:</b> {toolbarStatus ? "Open" : "Close"}
      </p>
    </div>
  );
};

export default ScreenIntegration;
