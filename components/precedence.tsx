import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useMemo } from "react";

const EmotionCacheProvider = ({ children }: { children: React.ReactNode }) => {
  const cache = useMemo(
    () =>
      createCache({
        key: "with-tailwind",
        insertionPoint: document.querySelector("title")!,
      }),
    []
  );

  return <CacheProvider value={cache}>{children}</CacheProvider>;
};

export default EmotionCacheProvider;
