import { useCallback, useEffect, useRef, useState } from "react"

export function useDir<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr")

  const update = useCallback(() => {
    const el = ref.current?.closest("[dir]")
    setDir((el?.getAttribute("dir") as "ltr" | "rtl") ?? "ltr")
  }, [])

  useEffect(() => {
    update()
    const target = ref.current?.closest("[dir]")
    if (!target) return
    const observer = new MutationObserver(update)
    observer.observe(target, { attributes: true, attributeFilter: ["dir"] })
    return () => observer.disconnect()
  }, [update])

  return { ref, dir, isRtl: dir === "rtl" }
}
