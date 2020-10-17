import React, { useContext, useReducer, useEffect, useState, useCallback } from "react";
import { Modal } from "../../Modal";
import cls from "classnames";
import { EXPORT_CD_STATUS } from "../../../models/common/action";
import { useSelector } from "react-redux";
// import { exportCDListSelector } from "src/renderer/models/common/selector";
import DriveFileImg from "../../../assets/light-theme-icons/DriveFile.png";
import Button from "../../Button";
import { Progress } from "antd";
import CDFailedImg from "../../../assets/light-theme-icons/Img_CDFailed.png";
import { useInterval } from "../../../uilts/hooks";
import { exportCDStatusSelector } from "../../../models/common/selector";

interface IProps {
  className?: string;
  visible: boolean;
  onCancel: () => void;
  list?: any;
  onConfirm: () => void;
  cdStatus?: EXPORT_CD_STATUS;
}

const PREFIX = "CDExportStatusModal";
const INTERVAL_LOW = 33;
const INTERVAL_NORMAL = 2571; // 前70%耗时180s

export const CDExportStatusModal: React.FC<IProps> = React.memo(function CDExportStatusModal({
  className,
  visible,
  onCancel,
  onConfirm,
  list
  // cdStatus
}) {
  const status = useSelector(exportCDStatusSelector);

  const [percent, setPercent] = useState<number>(0);
  // const [status, setStatus] = useState<EXPORT_CD_STATUS>(cdStatus);
  const [updateInterval, setUpdateInterval] = useState<number>(INTERVAL_NORMAL);
  // const exportCDList = useSelector(exportCDListSelector);

  const updatePercent = useCallback(() => {
    if (
      (status === EXPORT_CD_STATUS.loading && percent < 70) ||
      (status === EXPORT_CD_STATUS.success && percent < 100)
    ) {
      setPercent(percent + 1);
    }
  }, [percent, status]);

  useInterval(updatePercent, updateInterval);

  useEffect(() => {
    if (status === EXPORT_CD_STATUS.loading) {
      setUpdateInterval(INTERVAL_NORMAL);
      setPercent(0);
    }
    if (status === EXPORT_CD_STATUS.success) {
      setUpdateInterval(INTERVAL_LOW);
    }
    if (!visible) {
      setPercent(0);
    }
  }, [status, visible]);

  const renderStatus = (status: EXPORT_CD_STATUS, percent: number) => {
    if (!status) {
      return (
        <>
          <div className={`${PREFIX}-Message`}>光盘刻录失败</div>
          <div className={`${PREFIX}-Message-Sub`}>请确认插入空光盘且光盘可用</div>
        </>
      );
    }

    console.log("status", status);

    const contentMap = {
      [EXPORT_CD_STATUS.init]: (
        <>
          <div className={`${PREFIX}-Prompt`}>确认刻录以下{list?.length}个记录到光盘</div>
          <div className={`${PREFIX}-List`}>
            {list?.map(item => (
              <div className={`${PREFIX}-List-Item`} key={item.id}>
                <img className={`${PREFIX}-List-Item-Img`} src={DriveFileImg} alt="" />
                {item.name}
              </div>
            ))}
          </div>
          <div className={`${PREFIX}-ConfirmButtons`}>
            <Button className={`${PREFIX}-Button`} onClick={onCancel}>
              取消
            </Button>
            <Button className={`${PREFIX}-Button`} color="blue" onClick={onConfirm}>
              确认刻录
            </Button>
          </div>
        </>
      ),
      [EXPORT_CD_STATUS.loading]: (
        <>
          <div className={`${PREFIX}-Progress`}>
            <Progress
              type="circle"
              width={92}
              showInfo={false}
              percent={percent}
              strokeWidth={9}
              strokeColor="#606060"
              trailColor="#d0d0d0"
            />
          </div>
          <div className={`${PREFIX}-Message`}>正在刻录至光盘</div>
          <div className={`${PREFIX}-Message-Sub`}>请不要拔掉光驱</div>
        </>
      ),
      [EXPORT_CD_STATUS.success]:
        percent < 100 ? (
          <>
            <div className={`${PREFIX}-Progress`}>
              <Progress
                type="circle"
                width={92}
                showInfo={false}
                percent={percent}
                strokeWidth={9}
                strokeColor="#606060"
                trailColor="#d0d0d0"
              />
            </div>
            <div className={`${PREFIX}-Message`}>正在刻录至光盘</div>
            <div className={`${PREFIX}-Message-Sub`}>请不要拔掉光驱</div>
          </>
        ) : (
          <>
            <div className={`${PREFIX}-Progress`}>
              <Progress
                type="circle"
                width={92}
                percent={100}
                strokeWidth={9}
                strokeColor="#606060"
                trailColor="#d0d0d0"
                format={() => <span className={`${PREFIX}-Progress-Success`}></span>}
              />
            </div>
            <div className={`${PREFIX}-Message`}>刻录成功</div>
            {/* <FlexSpread /> */}
            <Button
              className={`${PREFIX}-Button ${PREFIX}-Info-Button`}
              onClick={onCancel}
              color="blue"
              size="large"
            >
              关闭
            </Button>
          </>
        ),
      [EXPORT_CD_STATUS.failure]: (
        <>
          <img src={CDFailedImg} className={`${PREFIX}-FailureImg`} alt="" />
          <div className={`${PREFIX}-Message`}>光盘刻录失败</div>
          <div className={`${PREFIX}-Message-Sub`}>请确认插入空光盘且光盘可用</div>
          {/* <FlexSpread /> */}
          <Button
            className={`${PREFIX}-Button ${PREFIX}-Info-Button`}
            onClick={onCancel}
            color="blue"
          >
            知道了
          </Button>
        </>
      )
    };
    return contentMap?.[status] || "";
  };

  return (
    <Modal
      className={cls(PREFIX, className)}
      visible={visible}
      width={933}
      title={"刻录至光盘"}
      centered={true}
      destroyOnClose={true}
      onCancel={onCancel}
      closable={false}
      footer={null}
      maskClosable={false}
      z-zIndex={1200}
    >
      <div className={`${PREFIX}-content`}>{renderStatus}</div>
    </Modal>
  );
});
