import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, ArrowUpRight, X } from "lucide-react";

interface BlogPost {
    id: number;
    images: string[];
    title: string;
    blurb: string;
    date: string;
    tags: string[];
    fullContent: string;
}

const blogPosts: BlogPost[] = [
    {
        id: 1,
        images: ["/images/blog-post-1.jpg"],
        title: "My First Blog Post",
        blurb: "This is a short summary of my first blog post.",
        date: "2024-06-01",
        tags: ["Design", "Web"],
        fullContent: "This is the full content of my first blog post. It goes into more detail about the topic discussed in the blurb.",
    }
];

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
}

function ImageWithFallback({ src, alt, className }: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`${className ?? ""} bg-muted flex items-center justify-center text-muted-foreground`}
        role="img"
        aria-label={alt}
      >
        <span className="text-xs">Image</span>
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} onError={() => setHasError(true)} loading="lazy" />;
}

export default function Blog() {
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

    // Close on Escape
    useEffect(() => {
      if (!selectedPost) return;
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setSelectedPost(null);
      };
      window.addEventListener("keydown", onKeyDown);
      // lock scroll while modal is open
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", onKeyDown);
        document.body.style.overflow = prevOverflow;
      };
    }, [selectedPost]);

    return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1
            className="font-[family-name:var(--font-family-display)] mb-4"
            style={{ fontSize: "3.5rem", fontWeight: 700, lineHeight: 1.2 }}
          >
            <span className="gradient-heading">Blog</span>
          </h1>
          <div
            className="w-32 h-1.5 mx-auto rounded-full"
            style={{
              background: "linear-gradient(90deg, var(--pastel-purple), var(--pastel-pink))",
            }}
          />
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setSelectedPost(post)}
              className="bg-card rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all cursor-pointer border border-border group"
            >
              {/* Image(s) */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {post.images.length === 1 ? (
                  <ImageWithFallback
                    alt={post.title}
                    src={post.images[0]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="grid grid-cols-2 gap-1 h-full">
                    {post.images.map((img, imgIndex) => (
                      <ImageWithFallback
                        key={imgIndex}
                        src={img}
                        alt={`${post.title} - ${imgIndex + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ))}
                  </div>
                )}
                {/* Read more indicator */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: "var(--pastel-purple)" }}
                  >
                    <ArrowUpRight size={14} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
                    style={{
                      backgroundColor: "rgba(201,184,240,0.15)",
                      color: "var(--pastel-purple)",
                      fontWeight: 600,
                    }}
                  >
                    <Calendar size={11} />
                    {post.date}
                  </div>
                </div>

                <h2
                  className="mb-3 group-hover:text-[var(--pastel-purple)] transition-colors duration-200"
                  style={{ fontSize: "1.25rem", fontWeight: 600, lineHeight: 1.3 }}
                >
                  {post.title}
                </h2>

                <p
                  className="text-[var(--foreground)]/70"
                  style={{ fontSize: "0.9375rem", lineHeight: 1.6, fontWeight: 400 }}
                >
                  {post.blurb}
                </p>
                <div className="flex gap-2 mt-4 flex-wrap">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-xs"
                      style={{
                        backgroundColor: "rgba(184,216,240,0.2)",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Expanded Post Modal (custom, no Radix) */}
      <AnimatePresence>
        {selectedPost && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
              style={{ backgroundColor: "rgba(26,22,37,0.7)", backdropFilter: "blur(8px)" }}
              onClick={() => setSelectedPost(null)}
            />
            <motion.div
              key="content"
              role="dialog"
              aria-modal="true"
              aria-labelledby="blog-modal-title"
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
              onClick={(e) => e.target === e.currentTarget && setSelectedPost(null)}
            >
              <div
                className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-border"
                style={{ backgroundColor: "var(--card)" }}
              >
                {/* Hero image */}
                <div className="relative h-56 sm:h-72 flex-shrink-0 overflow-hidden">
                  {selectedPost.images.length === 1 ? (
                    <ImageWithFallback
                      src={selectedPost.images[0]}
                      alt={selectedPost.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="grid grid-cols-2 gap-1 h-full">
                      {selectedPost.images.map((img, i) => (
                        <ImageWithFallback key={i} src={img} alt={`${selectedPost.title} - ${i + 1}`} className="w-full h-full object-cover" />
                      ))}
                    </div>
                  )}
                  {/* Gradient fade */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
                    style={{
                      background: "linear-gradient(to top, var(--card), transparent)",
                    }}
                  />
                </div>

                {/* Close button */}
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-opacity hover:opacity-80 z-10"
                  style={{ backgroundColor: "var(--card)" }}
                  aria-label="Close"
                >
                  <X size={16} style={{ color: "var(--foreground)" }} />
                </button>

                {/* Scrollable body */}
                <div className="overflow-y-auto flex-1 px-7 pb-8 pt-2">
                  {/* Meta */}
                  <div className="flex items-center gap-2 flex-wrap mb-4">
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
                      style={{
                        backgroundColor: "rgba(201,184,240,0.15)",
                        color: "var(--pastel-purple)",
                        fontWeight: 600,
                      }}
                    >
                      <Calendar size={11} />
                      {selectedPost.date}
                    </div>
                    {selectedPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full text-xs"
                        style={{
                          backgroundColor: "rgba(184,216,240,0.2)",
                          color: "var(--muted-foreground)",
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <h2
                    id="blog-modal-title"
                    className="font-[family-name:var(--font-family-display)] mb-5"
                    style={{ fontSize: "1.75rem", fontWeight: 700, lineHeight: 1.25, color: "var(--card-foreground)" }}
                  >
                    {selectedPost.title}
                  </h2>

                  {/* Full content — render markdown-lite bold and paragraphs */}
                  <div
                    className="prose-custom space-y-4"
                    style={{ color: "var(--card-foreground)", opacity: 0.85, fontSize: "0.9375rem", lineHeight: 1.75 }}
                  >
                    {selectedPost.fullContent.split("\n\n").map((block, i) => {
                      if (block.startsWith("**") && block.endsWith("**")) {
                        return (
                          <p key={i} style={{ fontWeight: 700, fontSize: "1rem", opacity: 1, color: "var(--pastel-purple)" }}>
                            {block.slice(2, -2)}
                          </p>
                        );
                      }
                      if (block.startsWith("*") && block.endsWith("*") && !block.startsWith("**")) {
                        return (
                          <p key={i} style={{ fontStyle: "italic" }}>
                            {block.slice(1, -1)}
                          </p>
                        );
                      }
                      const parts = block.split(/(\*\*[^*]+\*\*)/g);
                      return (
                        <p key={i}>
                          {parts.map((part, j) =>
                            part.startsWith("**") && part.endsWith("**") ? (
                              <strong key={j} style={{ fontWeight: 700, color: "var(--card-foreground)", opacity: 1 }}>
                                {part.slice(2, -2)}
                              </strong>
                            ) : (
                              part
                            )
                          )}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}