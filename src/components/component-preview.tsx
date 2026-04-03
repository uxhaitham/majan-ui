import { useState } from "react"
import { Highlight, themes } from "prism-react-renderer"
import { Copy, Check, Languages } from "lucide-react"
import { cn } from "@/lib/utils"

interface ComponentPreviewProps {
  children: React.ReactNode
  code: string
  installCommand?: string
}

export function ComponentPreview({
  children,
  code,
  installCommand,
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview")
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr")
  const [copied, setCopied] = useState(false)
  const [copiedInstall, setCopiedInstall] = useState(false)

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* clipboard not available */ }
  }

  const handleCopyInstall = async () => {
    if (!installCommand) return
    try {
      await navigator.clipboard.writeText(installCommand)
      setCopiedInstall(true)
      setTimeout(() => setCopiedInstall(false), 2000)
    } catch { /* clipboard not available */ }
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 rounded-lg border bg-muted p-1">
          <button
            onClick={() => setActiveTab("preview")}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              activeTab === "preview"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              activeTab === "code"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Code
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* LTR/RTL toggle — preview only */}
          {activeTab === "preview" && (
            <button
              onClick={() => setDir(dir === "ltr" ? "rtl" : "ltr")}
              className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              aria-label={`Switch to ${dir === "ltr" ? "RTL" : "LTR"} direction`}
            >
              <Languages className="h-3.5 w-3.5" />
              {dir.toUpperCase()}
            </button>
          )}

          {/* Copy code */}
          {activeTab === "code" && (
            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {copied ? "Copied" : "Copy"}
            </button>
          )}
        </div>
      </div>

      {/* Preview / Code panel */}
      <div className="rounded-lg border">
        {activeTab === "preview" ? (
          <div
            dir={dir}
            className="flex min-h-[200px] items-center justify-center p-8"
          >
            {children}
          </div>
        ) : (
          <div className="relative max-h-[400px] overflow-auto">
            <Highlight
              theme={themes.nightOwl}
              code={code.trim()}
              language="tsx"
            >
              {({ style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  style={style}
                  className="rounded-lg p-4 text-sm leading-relaxed"
                >
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                      <span className="me-4 inline-block w-8 select-none text-end text-muted-foreground/40">
                        {i + 1}
                      </span>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
        )}
      </div>

      {/* Install command */}
      {installCommand && (
        <div className="flex items-center gap-2 rounded-lg border bg-muted/50 px-4 py-3">
          <code className="flex-1 text-sm text-muted-foreground">
            {installCommand}
          </code>
          <button
            onClick={handleCopyInstall}
            aria-label="Copy install command"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {copiedInstall ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      )}
    </div>
  )
}
