import React, {useEffect, useState} from 'react';
import {Button, space} from "@chakra-ui/react";
import {CalendarIcon, ViewOffIcon} from '@chakra-ui/icons'
import {useGetAllAzureQuery} from "../../services/calendarApi";
import socket from '../../SocketioService';
import {useUpdateToolbarMutation, useGetToolbarQuery} from "../../services/tBarApi";
import {useGetPokemonByNameQuery} from '../../services/pokemon'


const Integration = () => {
    const {data, isSuccess} = useGetAllAzureQuery();
    const [state, setState] = useState()
    const [code, setCode] = useState()
    const [toolbarStatus,setToolbarStatus] =useState<boolean>()

    const [updateToolbar] = useUpdateToolbarMutation();

    // const {data: Pokemon} = useGetPokemonByNameQuery('bulbasaur')

    const {data: IToolbar,isSuccess:toolbarSuccess} = useGetToolbarQuery(1)

    const toolbar = (id: number, status: boolean) => {
        const data = {id: id, status: status}
        updateToolbar(data)
        setToolbarStatus(data.status);
    };

    useEffect(() => {
        IToolbar &&  setToolbarStatus(IToolbar.status)
    }, [IToolbar]);


    useEffect(() => {

        socket.on("connect", () => {
            console.log("socket connection integration.tsx",socket.connected);
        });

        socket.on('exchange', (data) => {
            console.log('Received message from server:', data);
        });

    }, []);

    useEffect(() => {
        if (window.location.search) {
            let params: any = window.location.search.substring(1).split('&').reduce(function (result: any, item) {
                let parts = item.split('=');
                result[parts[0]] = parts[1];
                return result;
            }, {});
            setCode(params['code']);
            setState(params['state']);
        }
    }, [])


    /**
     * TODO this message object is not useful. I don't use it in socket.
     * TODO I need to improve this point. in java spring.
     * noo need this because I'll send message from java controller.
     */
    const sendMessage = () => {
        socket.emit("send_toolbar", {
            "type": "CLIENT",
            "message": "toolbarStatus"
        });
    }

    return (
        <div className="space-x-1">
            <a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize?
                    client_id=469e5942-bf76-44f3-8c77-272988660c36
                    &response_type=code
                    &redirect_uri=http://localhost:3000/integration
                    &response_mode=query
                    &scope=openid%20offline_access%20https%3A%2F%2Fgraph.microsoft.com%2Fcalendars.read%20https%3A%2F%2Fgraph.microsoft.com%2Fuser.read
                    &state=12345&prompt=consent" rel="noopener noreferrer">
                <Button leftIcon={<CalendarIcon/>} colorScheme='blue'>Office 365 Integration</Button>
            </a>
            <Button leftIcon={<CalendarIcon/>} colorScheme='blue'>EWS Integration</Button>

            <Button onClick={() => {
                toolbar(1,!toolbarStatus)
            }} leftIcon={<ViewOffIcon/>} colorScheme='blue'>Toolbar On/Off</Button>

            <p><b>Code From URL:</b> {code}</p>
            <p><b>State From URL:</b> {state}</p>
            <p><b>Access Token Return From Backend:</b> {isSuccess && data.response} </p>

            <p><b>Toolbar:</b> {toolbarStatus ? "Open": "Close"}</p>
        </div>
    );
};

export default Integration;
