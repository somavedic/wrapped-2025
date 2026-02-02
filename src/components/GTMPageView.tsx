"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { sendGTMEvent } from "@next/third-parties/google";

export function GTMPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    
    sendGTMEvent({
      event: "page_view",
      page_path: url,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}
