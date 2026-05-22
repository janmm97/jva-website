export const toolLogos = [
  { name: "n8n",         src: "/assets/tools-logo/n8n.light.svg" },
  { name: "Claude Code", src: "/assets/tools-logo/claudecode.light.svg" },
  { name: "Anthropic",   src: "/assets/tools-logo/anthropic.light.svg" },
  { name: "Claude",      src: "/assets/tools-logo/claude.light.svg" },
  { name: "Notion",      src: "/assets/tools-logo/notion.light.svg" },
  { name: "Zapier",      src: "/assets/tools-logo/zapier.light.svg" },
  { name: "OpenAI",      src: "/assets/tools-logo/openai.light.svg" },
  { name: "Gemini",      src: "/assets/tools-logo/gemini.light.svg" },
  { name: "Shopify",     src: "/assets/tools-logo/shopify.light.svg" },
  { name: "Perplexity",  src: "/assets/tools-logo/perplexity.light.svg" },
  { name: "Asana",       src: "/assets/tools-logo/asana.light.svg" },
  { name: "ClickUp",     src: "/assets/tools-logo/clickup.light.svg" },
  { name: "Resend",      src: "/assets/tools-logo/resend.light.svg" },
  { name: "Trello",      src: "/assets/tools-logo/trello.light.svg" },
  { name: "Attio",       src: "/assets/tools-logo/attio.png" },
  { name: "Grok",        src: "/assets/tools-logo/grok.light.svg" },
  { name: "Firecrawl",   src: "/assets/tools-logo/firecrawl.light.svg" },
  { name: "Monday",      src: "/assets/tools-logo/monday.light.svg" },
];

const tickerItems = [...toolLogos, ...toolLogos];

export function ToolTickerStrip() {
  return (
    <div className="ticker-wrap overflow-hidden">
      <div className="ticker-track flex items-center gap-0">
        {tickerItems.map((logo, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2.5 flex-shrink-0 px-10 group"
          >
            <img
              src={logo.src}
              alt={logo.name}
              className="h-8 w-auto object-contain opacity-40 group-hover:opacity-90 transition-opacity duration-300"
            />
            <span className="text-jva-lavender/30 group-hover:text-jva-lavender/70 text-xs tracking-wide transition-colors duration-300 font-display">
              {logo.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LogoTicker() {
  return (
    <section className="bg-jva-deep border-y border-jva-purple/15 py-14">
      <p className="text-center text-jva-lavender/40 text-sm tracking-widest uppercase mb-10 font-display">
        Built for the tools you already use
      </p>

      <ToolTickerStrip />
    </section>
  );
}
