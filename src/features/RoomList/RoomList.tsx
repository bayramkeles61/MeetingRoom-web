import React, { useState } from "react";
import {
  useDeleteRoomMutation,
  useGetAllRoomQuery,
} from "../../services/roomApi";
import AddRoomModal from "./RoomModalCreate";
import { MeetIcon } from "../../assets/icons/meet";
import { GridIcon } from "../../assets/icons/grid";
import { ListIcon } from "../../assets/icons/list";
import { useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Tab {
  id: string;
  title: string;
  type: string;
  icon: JSX.Element;
}

const tabsData: Tab[] = [
  {
    id: "1",
    title: "Tab 1",
    type: "list",
    icon: <ListIcon />,
  },
  {
    id: "2",
    title: "Tab 2",
    type: "grid",
    icon: <GridIcon />,
  },
];

function RoomList() {
  const [activeTab, setActiveTab] = useState(tabsData[0]);
  const changeTab = (tab: any) => {
    setActiveTab(tab);
  };

  const { data, isSuccess, refetch } = useGetAllRoomQuery();
  const [deleteRoom] = useDeleteRoomMutation();
  const deleteHandler = async (roomId: number) => {
    try {
      await deleteRoom(roomId);
      await refetch();
    } catch (error) {
      console.log("Error in deleting room", error);
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="flex flex-col py-2 overflow-hidden">
      <AddRoomModal isOpen={isOpen} onClose={onClose} />
      <div className="flex items-center px-6 justify-between w-full">
        <button
          onClick={onOpen}
          className="bg-blue-500 font-semibold rounded p-2 text-sm text-white"
        >
          Add New Room
        </button>
        <div className="flex bg-gray-100 max-w-fit gap-2 px-1 rounded-[8px]">
          {tabsData.map((tab) => (
            <button
              key={tab.id}
              className={`${
                tab.id === activeTab.id ? "bg-gray-200" : "text-gray-400"
              } px-2 my-1 py-1 rounded-[6px] text-lg font-semibold`}
              onClick={() => changeTab(tab)}
            >
              {tab.icon}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full h-full flex flex-wrap items-center mt-4 overflow-y-auto px-4">
        {Array(10)
          .fill(0)
          .map((item, itemIndex) => (
            <Link
              to={"1/screens/"}
              key={itemIndex}
              className="flex items-center rounded w-1/3 p-2"
              style={{
                width: activeTab.type === "grid" ? "33.3333%" : "100%",
              }}
            >
              <div className="shadow border border-slate-50 rounded w-full flex items-center px-4 py-2 space-x-2">
                <div className="text-3xl">
                  <MeetIcon />
                </div>
                <div className="flex items-center p-2 w-full">
                  <div className="w-full space-y-2">
                    <div className="flex items-center justify-between w-full">
                      <h1 className="whitespace-nowrap text-xs font-medium text-gray-500">
                        Room Name:
                      </h1>
                      <h1 className="text-sm font-semibold">Room 1</h1>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <h1 className="whitespace-nowrap text-xs font-medium text-gray-500">
                        Status:
                      </h1>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></div>
                        <h1 className="text-sm font-bold uppercase text-green-500">
                          Available
                        </h1>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <h1 className="whitespace-nowrap text-xs font-medium text-gray-500">
                        Location:
                      </h1>
                      <h1 className="text-sm font-semibold">Floor 1</h1>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default RoomList;
