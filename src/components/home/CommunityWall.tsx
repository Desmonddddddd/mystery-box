"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronDown } from "lucide-react";
import { communityComments } from "@/data/comments";
import { timeAgo } from "@/lib/utils";
import type { Comment } from "@/types";
import GlassCard from "@/components/ui/GlassCard";

type SortMode = "latest" | "popular";

const STORAGE_KEY = "myx-wall";

interface WallState {
  posts: Comment[];
  liked: string[];
}

function loadWallState(): WallState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<WallState>;
      return {
        posts: Array.isArray(parsed.posts) ? parsed.posts : [],
        liked: Array.isArray(parsed.liked) ? parsed.liked : [],
      };
    }
  } catch {
    // corrupt or unavailable storage — start fresh
  }
  return { posts: [], liked: [] };
}

export default function CommunityWall() {
  const [userPosts, setUserPosts] = useState<Comment[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [sort, setSort] = useState<SortMode>("latest");
  const [showAll, setShowAll] = useState(false);
  const [newComment, setNewComment] = useState("");

  // Relative times depend on Date.now(), so the server-rendered strings can
  // disagree with the client's ("12m ago" vs "29m ago") and trigger a
  // hydration mismatch. Render them only after mount. Persisted wall state
  // is also loaded after mount for the same reason.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const stored = loadWallState();
    setUserPosts(stored.posts);
    setLikedIds(stored.liked);
    setMounted(true);
  }, []);

  // Persist likes + posts so user actions survive refresh
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ posts: userPosts, liked: likedIds } satisfies WallState)
      );
    } catch {
      // ignore quota/unavailable errors
    }
  }, [mounted, userPosts, likedIds]);

  const localComments = useMemo<Comment[]>(() => {
    const withLikes = (c: Comment): Comment =>
      likedIds.includes(c.id)
        ? { ...c, likes: c.likes + 1, isLiked: true }
        : { ...c, isLiked: false };
    return [...userPosts.map(withLikes), ...communityComments.map(withLikes)];
  }, [userPosts, likedIds]);

  const sorted = useMemo(() => {
    const copy = [...localComments];
    if (sort === "popular") {
      copy.sort((a, b) => b.likes - a.likes);
    }
    // "latest" is already sorted by timestamp in the data
    return copy;
  }, [localComments, sort]);

  const displayed = showAll ? sorted : sorted.slice(0, 8);

  const maxLikes = useMemo(
    () => Math.max(...localComments.map((c) => c.likes)),
    [localComments]
  );

  const handleLike = (id: string) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `c-new-${Date.now()}`,
      username: "You",
      avatar: "Y",
      text: newComment.trim(),
      likes: 0,
      timestamp: new Date().toISOString(),
    };

    setUserPosts((prev) => [comment, ...prev]);
    setNewComment("");
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            The Wall
          </h2>
          <p className="text-white/50 mb-2">
            Raw reactions. Real people. No filter.
          </p>
          <p className="text-[11px] uppercase tracking-wider text-white/25">
            Seed posts are a simulated preview · your posts stay on this device
          </p>
        </motion.div>

        {/* Add comment */}
        <form onSubmit={handleAddComment} className="mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="say something..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
            />
            <button
              type="submit"
              className="px-5 py-3 min-h-[44px] rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity flex-shrink-0"
            >
              Post
            </button>
          </div>
        </form>

        {/* Sort toggle */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setSort("latest")}
            className={`px-4 py-2.5 min-h-[44px] rounded-lg text-xs font-medium transition-all ${
              sort === "latest"
                ? "bg-white/10 text-white"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            Latest
          </button>
          <button
            onClick={() => setSort("popular")}
            className={`px-4 py-2.5 min-h-[44px] rounded-lg text-xs font-medium transition-all ${
              sort === "popular"
                ? "bg-white/10 text-white"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            Most Popular
          </button>
        </div>

        {/* Comments */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {displayed.map((comment) => {
              const isHighlighted = comment.likes === maxLikes && maxLikes > 0;
              return (
                <motion.div
                  key={comment.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <GlassCard
                    hover={false}
                    className={`!p-4 ${isHighlighted ? "!border-pink-500/30" : ""}`}
                    glow={isHighlighted ? "rgba(236, 72, 153, 0.15)" : undefined}
                  >
                    <div className="flex gap-3">
                      {/* Avatar */}
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {comment.avatar}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-white">
                            {comment.username}
                          </span>
                          <span className="text-xs text-white/30">
                            {mounted ? timeAgo(comment.timestamp) : ""}
                          </span>
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed">
                          {comment.text}
                        </p>
                      </div>

                      {/* Like button — 44px tap target */}
                      <button
                        onClick={() => handleLike(comment.id)}
                        aria-label={
                          comment.isLiked ? "Unlike comment" : "Like comment"
                        }
                        className="flex items-center justify-center gap-1 text-xs flex-shrink-0 self-start min-w-[44px] min-h-[44px] -my-2 -mr-2 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <Heart
                          className={`w-4 h-4 transition-colors ${
                            comment.isLiked
                              ? "text-pink-500 fill-pink-500"
                              : "text-white/30 hover:text-pink-400"
                          }`}
                        />
                        <span
                          className={
                            comment.isLiked
                              ? "text-pink-400"
                              : "text-white/30"
                          }
                        >
                          {comment.likes}
                        </span>
                      </button>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Show More */}
        {!showAll && sorted.length > 8 && (
          <motion.button
            onClick={() => setShowAll(true)}
            className="mt-4 w-full flex items-center justify-center gap-2 py-3 min-h-[44px] text-sm text-white/50 hover:text-white/70 transition-colors"
            whileHover={{ y: 2 }}
          >
            <ChevronDown className="w-4 h-4" />
            Show More ({sorted.length - 8} more)
          </motion.button>
        )}
      </div>
    </section>
  );
}
