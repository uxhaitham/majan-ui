import { useEffect, useRef, useState } from "react"

function readDir(el: HTMLElement | null): "ltr" | "rtl" {
  const ancestor = el?.closest("[dir]")
  return (ancestor?.getAttribute("dir") as "ltr" | "rtl") ?? "ltr"
}

export function useDir<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr")

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Sync initial value
    setDir(readDir(el))

    const target = el.closest("[dir]")
    if (!target) return
    const observer = new MutationObserver(() => setDir(readDir(el)))
    observer.observe(target, { attributes: true, attributeFilter: ["dir"] })
    return () => observer.disconnect()
  }, [])

  return { ref, dir, isRtl: dir === "rtl" }
}
