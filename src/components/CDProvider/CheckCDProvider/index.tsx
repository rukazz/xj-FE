import React, { createContext, useState, useCallback, useEffect } from "react";
import { usePrevious, useInterval } from "react-use";
import { globalNotice } from "../../GlobalNotification";
import LightDisk_In from "../../assets/svg/LightDisk_In.svg";
import LightDisk_Out from "../../assets/svg/LightDisk_Out.svg";
import { GlobalTheme } from "../../../app/defaultConfig";
import { useDispatch, useSelector } from "react-redux";
import { triggerGetCDDriverAction } from "../../../models/common/action";
import { isPollingSelector } from "../../../models/common/selector";

interface CheckCDContextValue {
  cdRom: boolean; // 是否插入光驱
}

export const CheckCDContext = createContext<CheckCDContextValue>({
  cdRom: false
});

const CheckCDProvider: React.FC = (props: React.PropsWithChildren<{}>) => {
  const [cdRom, setCdRom] = useState<boolean>(false);
  const dispatch = useDispatch();
  const isPollingCDRom = useSelector(isPollingSelector);

  const prevCDRom = usePrevious(cdRom);

  const checkCDRom = useCallback(() => {
    if (GlobalTheme === "black" || !isPollingCDRom) {
      return;
    }
    dispatch(
      triggerGetCDDriverAction.request({
        success: () => {
          setCdRom(true);
        },
        failure: () => {
          setCdRom(false);
        }
      })
    );
  }, [isPollingCDRom]);

  useEffect(() => {
    checkCDRom();
  }, []);

  useInterval(checkCDRom, 5000);

  useEffect(() => {
    if (prevCDRom !== cdRom) {
      if (cdRom) {
        // 提示光驱插入
        globalNotice({
          content: `光驱已接入`,
          duration: 2000,
          icon: LightDisk_In.url
        });
      } else {
        // 提示光驱推出
        globalNotice({
          content: `光驱/光盘已推出`,
          duration: 2000,
          icon: LightDisk_Out.url
        });
      }
    }
  }, [cdRom, prevCDRom]);

  return <CheckCDContext.Provider value={{ cdRom }}>{props.children}</CheckCDContext.Provider>;
};

export default CheckCDProvider;
