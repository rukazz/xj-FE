import React, { useEffect, useState } from "react";
import CDRomStatusModal from "./CDRomStatusModal";
import { useDispatch, useSelector } from "react-redux";
import { cdStatusSelector } from "../../../models/common/selector";
import { triggerGetCDDriverAction } from "../../../models/common/action";
import { CD_ROM_STATUS } from "../../../models/common/reducer";

export interface ICDContext {
  isShow: (render?: boolean) => boolean;
}

export const CDStatusContext = React.createContext<ICDContext>({
  isShow: () => false
});

export const CDStatusProvider: React.FC = props => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const status = useSelector(cdStatusSelector);

  useEffect(() => {
    dispatch(triggerGetCDDriverAction.request({}));
  }, []);

  const isShow = (render = false) => {
    if (status !== CD_ROM_STATUS.CD_CHECK_SUCCESS && status !== CD_ROM_STATUS.EMPTY_PATH) {
      render && setVisible(true);
      return false;
    }
    return true;
  };

  return (
    <>
      <CDRomStatusModal
        status={status}
        onCancel={() => setVisible(false)}
        title={"刻录至光盘"}
        visible={visible}
      />
      <CDStatusContext.Provider value={{ isShow }}>{props.children}</CDStatusContext.Provider>
    </>
  );
};
