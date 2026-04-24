"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "@/data/blogPosts";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "All" },
  { id: "unboxing", label: "Unboxing" },
  { id: "tips", label: "Tips" },
  { id: "community", label: "Community" },
  { id: "news", label: "News" },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPosts =
    activeCategory === "all"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Hero */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px]" />
          <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] rounded-full bg-pink-500/5 blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm text-purple-400 mb-6">
              <BookOpen className="w-4 h-4" />
              MYSTERYX Blog
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Stories &amp;{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                Updates
              </span>
            </h1>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Unboxing stories, tips, community highlights, and platform news.
            </p>
          </motion.div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "bg-white/5 text-white/50 hover:text-white hover:bg-white/10 border border-white/10"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300 h-full flex flex-col">
                    {/* Emoji & Category */}
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl">{post.emoji}</span>
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-medium text-white/40 uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-bold text-white mb-2 group-hover:text-pink-400 transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm text-white/40 mb-4 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-white/30">
                      <span>{post.date}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/40 text-lg">
                No posts in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
