import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Text } from "@chakra-ui/react";

const M365Redirect = () => {
  const nav = useNavigate();
  const [state, setState] = useState();
  const [code, setCode] = useState();
  const [screenId, setScreenId] = useState();
  console.log(screenId);

  useEffect(() => {
    const fetchData = async () => {
      if (window.location.search) {
        let params: any = window.location.search
          .substring(1)
          .split("&")
          .reduce(function (result: any, item) {
            let parts = item.split("=");
            result[parts[0]] = parts[1];
            return result;
          }, {});
        // console.log(params)
        setCode(params["code"]);
        setState(params["state"].replaceAll("-", "/"));
        const state = params["state"].split("-");
        setScreenId(state[3]);
      }
    };
    fetchData();

    const fetchToken = async () => {
      try {
        const response = await axios.get("/api/calendar/fourth", {
          headers: {
            Authorization: code, // code değişkenini kullanarak Authorization başlığını ekledik
            screenId: screenId,
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchToken();

    const timeoutId = setTimeout(() => {
      nav(`/${state}`);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [nav, state]);

  return (
    <div>
      <Text fontSize={32}>
        Please wait!! We are preparing your integration.
      </Text>
      <p>
        <b>Code From URL:</b> {code}
      </p>
      <p>
        <b>State From URL:</b> {state}
      </p>
    </div>
  );
};

export default M365Redirect;
