import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — JVA",
  description:
    "Insights on AI automation, workflow systems, and building a smarter business.",
};

const posts = [
  {
    category: "Automation",
    title: "How I Built an Email Triage Agent with Claude Code",
    excerpt:
      "A step-by-step breakdown of the system that reads, labels, and voice-summarises every email — twice a day, hands-free.",
    date: "May 2025",
    readTime: "7 min read",
    featured: true,
  },
  {
    category: "AI",
    title: "The Future of AI-Powered Virtual Assistance",
    excerpt:
      "Why the next generation of virtual assistants won't be humans with laptops — and what that means for small business owners.",
    date: "May 2025",
    readTime: "5 min read",
    featured: false,
  },
  {
    category: "Automation",
    title: "n8n vs Zapier: Which Platform Is Right for You?",
    excerpt:
      "After building 50+ workflows across both platforms, here's the honest comparison nobody else will give you.",
    date: "April 2025",
    readTime: "8 min read",
    featured: false,
  },
  {
    category: "Products",
    title: "Building Your First Claude Code Skill in 30 Minutes",
    excerpt:
      "A practical guide to writing, testing, and deploying a Claude Code automation skill from scratch.",
    date: "April 2025",
    readTime: "10 min read",
    featured: false,
  },
  {
    category: "Business",
    title: "Why Small Business Owners Need Automation Now",
    excerpt:
      "The manual work that's quietly killing your margins — and the automations that fix it this week.",
    date: "March 2025",
    readTime: "6 min read",
    featured: false,
  },
  {
    category: "Automation",
    title: "5 Time-Killing Tasks You Should Automate Today",
    excerpt:
      "Email triage, client onboarding, reporting, invoicing, social scheduling — none of these need a human anymore.",
    date: "March 2025",
    readTime: "4 min read",
    featured: false,
  },
];

const categoryColors: Record<string, string> = {
  Automation: "bg-jva-accent/20 text-jva-bright border-jva-accent/30",
  AI:         "bg-purple-500/15 text-purple-300 border-purple-500/30",
  Products:   "bg-green-500/15 text-green-400 border-green-500/30",
  Business:   "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <main className="pt-20">
      {/* Page header */}
      <section className="py-20 lg:py-28 bg-jva-deep relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <div className="w-[500px] h-[500px] rounded-full bg-jva-accent/10 blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-jva-accent text-sm font-medium tracking-widest uppercase mb-4">
            The JVA Blog
          </p>
          <h1 className="text-5xl md:text-7xl font-black font-display leading-none tracking-tight max-w-2xl">
            Insights from<br />the field.
          </h1>
          <p className="text-jva-lavender text-xl mt-6 max-w-lg leading-relaxed">
            Real lessons on AI automation, workflow building, and running
            a smarter business.
          </p>
        </div>
      </section>

      {/* Blog content */}
      <section className="py-20 bg-jva-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* Featured post */}
          <div className="mb-14">
            <div className="bg-jva-deep border border-jva-purple/30 rounded-2xl p-8 lg:p-12 hover:border-jva-purple/50 transition-colors duration-300 group cursor-pointer">
              <div className="flex items-center gap-3 mb-5">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[featured.category]}`}>
                  {featured.category}
                </span>
                <span className="text-jva-lavender/40 text-xs">Featured</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-black font-display text-jva-white mb-4 group-hover:text-jva-bright transition-colors duration-200 max-w-3xl leading-tight">
                {featured.title}
              </h2>
              <p className="text-jva-lavender/80 text-lg leading-relaxed mb-6 max-w-2xl">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-4 text-jva-lavender/50 text-sm">
                <span>{featured.date}</span>
                <span>·</span>
                <span>{featured.readTime}</span>
                <span className="text-jva-bright ml-2 group-hover:translate-x-1 transition-transform duration-200">
                  Read more →
                </span>
              </div>
            </div>
          </div>

          {/* Post grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <article
                key={post.title}
                className="bg-jva-deep border border-jva-purple/20 rounded-2xl p-6 hover:border-jva-purple/40 transition-colors duration-300 group cursor-pointer flex flex-col"
              >
                <div className="mb-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${categoryColors[post.category]}`}>
                    {post.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-display text-jva-white mb-3 group-hover:text-jva-bright transition-colors duration-200 leading-snug flex-1">
                  {post.title}
                </h3>
                <p className="text-jva-lavender/70 text-sm leading-relaxed mb-5">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-jva-lavender/40 text-xs pt-4 border-t border-jva-purple/15">
                  <span>{post.date} · {post.readTime}</span>
                  <span className="text-jva-bright group-hover:translate-x-0.5 transition-transform duration-200">→</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
