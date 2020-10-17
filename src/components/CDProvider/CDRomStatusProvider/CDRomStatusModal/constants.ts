import { CD_ROM_STATUS } from "../../models/common/reducer";

export const STATUS_CONTENT = {
  [CD_ROM_STATUS.NO_ROM]: { content: "未检测到光驱", subContent: "请先接入光驱等待连接" },
  [CD_ROM_STATUS.NO_CD]: { content: "请插入光盘", subContent: "请确认光盘中有内容且可用" },
  [CD_ROM_STATUS.EMPTY_PATH]: { content: "光盘为新光盘", subContent: "不支持从光盘导入操作" },
  [CD_ROM_STATUS.OUT_OF_SPACE]: { content: "请插入空间足够大的光盘", subContent: "请确认光盘空间" },
  [CD_ROM_STATUS.CD_ROM_NOT_FOUND]: { content: "未找到有内容的光盘", subContent: "请确认光盘空间" },
  [CD_ROM_STATUS.CD_MAKE_FAIL]: { content: "光盘镜像制作失败", subContent: "请再试一次" },
  [CD_ROM_STATUS.CD_SESSION_NOT_FOUND]: { content: "未检测到光盘分区", subContent: "请确认光盘" },
  [CD_ROM_STATUS.CD_BURNING_ERROR]: { content: "光盘刻录失败", subContent: "请再试一次" },
  [CD_ROM_STATUS.ROM_BUSY]: { content: "光驱繁忙", subContent: "请稍后再试" }
};
