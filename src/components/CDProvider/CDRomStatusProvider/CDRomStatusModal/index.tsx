import classNames from "classnames";
import React, { useEffect } from "react";
import FlexSpread from "../../businessComponents/FlexSpread";
import Button from "../../businessComponents/Button";
import { Modal } from "../../businessComponents/Modal";
import NoCDImg from "../../assets/light-theme-icons/Img_CDInsert.png";
import NoRowImg from "../../assets/light-theme-icons/Img_CDRow.png";
import "./index.scss";
import { GlobalTheme } from "../../app/defaultConfig";
import { CD_ROM_STATUS } from "../../models/common/reducer";
import { STATUS_CONTENT } from "./constants";

const PREFIX = "CDRomStatusModal";

interface IProp {
  className?: string;
  onCancel: (e?: React.MouseEvent) => void;
  status?: string;
  title?: string;
  visible: boolean;
}

const CDRomStatusModal = ({ className, onCancel, status = "", title, visible }: IProp) => {
  // const onClose = useCallback(
  //   (e: React.MouseEvent) => {
  //     e.stopPropagation();
  //     onCancel && onCancel(e);
  //   },
  //   [onCancel]
  // );

  useEffect(() => {
    if (!status) onCancel?.();
  }, [status]);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCancel();
  };

  return (
    <Modal
      className={classNames(PREFIX, GlobalTheme)}
      visible={visible}
      width={933}
      title={title}
      centered={true}
      destroyOnClose={true}
      onCancel={onCancel}
      closable={false}
      footer={null}
      maskClosable={false}
    >
      <div className={`${PREFIX}-content`}>
        <img
          src={status === CD_ROM_STATUS.NO_ROM ? NoCDImg : NoRowImg}
          className={`${PREFIX}-FailureImg`}
          alt=""
        />
        <div className={`${PREFIX}-Message`}>{STATUS_CONTENT?.[status]?.content}</div>
        <div className={`${PREFIX}-Message-Sub`}>{STATUS_CONTENT?.[status]?.subContent}</div>
        <FlexSpread />
        <Button
          className={`${PREFIX}-Button ${PREFIX}-Info-Button`}
          onClick={handleClose}
          color="blue"
        >
          知道了
        </Button>
      </div>
    </Modal>
  );
};

export default CDRomStatusModal;
