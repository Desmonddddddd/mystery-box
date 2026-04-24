"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Share2 } from "lucide-react";
import Link from "next/link";
import { blogPosts, getBlogPostBySlug } from "@/data/blogPosts";
import { WHATSAPP_LINK } from "@/lib/constants";

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🐒</p>
          <h1 className="text-2xl font-bold text-white mb-2">
            Post Not Found
          </h1>
          <p className="text-white/50 mb-6">
            This blog post doesn&apos;t exist.
          </p>
          <Link
            href="/blog"
            className="text-pink-400 hover:text-pink-300 text-sm"
          >
            &larr; Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Related posts (same category, different slug)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2);

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("## ")) {
        return (
          <h2
            key={i}
            className="text-2xl font-bold text-white mt-8 mb-4"
          >
            {line.slice(3)}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3
            key={i}
            className="text-lg font-semibold text-white mt-6 mb-3"
          >
            {line.slice(4)}
          </h3>
        );
      }
      if (line.startsWith("| ")) {
        return (
          <p key={i} className="text-white/50 text-sm font-mono mb-1">
            {line}
          </p>
        );
      }
      if (line.startsWith("- ")) {
        return (
          <li
            key={i}
            className="text-white/60 text-sm ml-4 mb-1 list-disc"
          >
            {line.slice(2)}
          </li>
        );
      }
      if (line.startsWith("---")) {
        return <hr key={i} className="border-white/10 my-8" />;
      }
      if (line.startsWith("*") && line.endsWith("*")) {
        return (
          <p key={i} className="text-white/40 text-sm italic mt-4">
            {line.slice(1, -1)}
          </p>
        );
      }
      if (line.trim() === "") {
        return <div key={i} className="h-2" />;
      }
      // Replace [text](url) with links
      const withLinks = line.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" class="text-pink-400 hover:text-pink-300 underline">$1</a>'
      );
      return (
        <p
          key={i}
          className="text-white/60 text-sm leading-relaxed mb-2"
          dangerouslySetInnerHTML={{ __html: withLinks }}
        />
      );
    });
  };

  return (
    <div className="min-h-screen bg-dark-950">
      <section className="relative pt-24 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-purple-500/5 blur-[120px]" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Header */}
            <div className="mb-8">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/40 uppercase tracking-wider">
                {post.category}
              </span>

              <h1 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-4">
                <span className="mr-3">{post.emoji}</span>
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-white/40">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <span>{post.date}</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 mb-8">
              {renderContent(post.content)}
            </div>

            {/* Share */}
            <div className="flex items-center gap-3 mb-12">
              <span className="text-sm text-white/40">Share:</span>
              <a
                href={`${WHATSAPP_LINK}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm hover:bg-green-500/20 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                WhatsApp
              </a>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Related Posts
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedPosts.map((related) => (
                    <Link key={related.slug} href={`/blog/${related.slug}`}>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-colors">
                        <span className="text-2xl mb-2 block">
                          {related.emoji}
                        </span>
                        <h4 className="text-sm font-bold text-white mb-1 line-clamp-2">
                          {related.title}
                        </h4>
                        <p className="text-xs text-white/40 line-clamp-2">
                          {related.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.article>
        </div>
      </section>
    </div>
  );
}
