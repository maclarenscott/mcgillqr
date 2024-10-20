import "../styles/globals.css";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { createEmotionSsrAdvancedApproach } from "tss-react/next";
import React from "react";

const {
    augmentDocumentWithEmotionCache,
    withAppEmotionCache
} = createEmotionSsrAdvancedApproach({ "key": "sbcsclub" });

export { augmentDocumentWithEmotionCache };

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  )
};

export default trpc.withTRPC(withAppEmotionCache(MyApp));