import React, { createContext, useReducer, useState, useEffect } from "react";
import { CDExportStatusModal } from "./CDExportStatusModal";
import { EXPORT_CD_STATUS } from "../../../models/common/action";

interface IState {
  list: any;
  // status: EXPORT_CD_STATUS;
  params: any;
  visible: boolean;
}

interface IAction {
  type: string;
  payload: IState;
}

const initialState: IState = {
  list: [],
  // status: EXPORT_CD_STATUS.init
  params: null,
  visible: false
};

const intialContext = {
  ...initialState,
  dispatch: () => {}
};

type CDExportStatusType = IState & { dispatch: any };

export const CDExportCDContext = createContext<CDExportStatusType>(intialContext);

export const CDExportStatusProvider: React.FC = React.memo(function CDExportCDStore({ children }) {
  // const [visible, setVisible] = useState<boolean>(false);
  const [state, dispatch] = useReducer((state: IState, action: IAction) => {
    switch (action.type) {
      case "update":
        const { list, params, visible } = action.payload;
        // console.log("action.payload", action.payload);
        return { ...state, list, params, visible };
    }
    return state;
  }, initialState);

  const handleCancel = () => {
    // setVisible(false);
  };

  useEffect(() => {
    // if (state.list) setVisible(true);
  }, [state.list]);

  const handleConfirm = () => {
    // setVisible(false);
    // if (exportType === "file") {
    //   exportParam && dispatch(triggerExportCDAction.request(exportParam));
    // } else {
    //   dispatch(
    //     triggerExportVoiceAction.request({
    //       idList: exportCDList?.map(item => item.id)
    //     })
    //   );
    // }
  };

  console.log("state", state);

  return (
    <>
      <CDExportStatusModal
        list={state.list}
        visible={state.visible}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
      <CDExportCDContext.Provider value={{ ...state, dispatch }}>
        {children}
      </CDExportCDContext.Provider>
    </>
  );
});
