import React from "react";
import CheckCDProvider from "./CheckCDProvider";
import { CDExportStatusProvider } from "./CDExportStatuslProvider";
import { CDStatusProvider } from "./CDRomStatusProvider";

export const CDProvider: React.FC = ({ children }) => {
  return (
    <CheckCDProvider>
      <CDExportStatusProvider>
        <CDStatusProvider>{children}</CDStatusProvider>
      </CDExportStatusProvider>
    </CheckCDProvider>
  );
};
