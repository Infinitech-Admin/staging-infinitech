"use client";

import { useEffect } from "react";
import { X, Calendar, User, Tag } from "lucide-react";
import { BlogPost } from "./types";
import { formatDate } from "./utils";

interface BlogModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BlogModal({ post, isOpen, onClose }: BlogModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  if (!isOpen || !post) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media */}
        {post.videoUrl ? (
          <div className="aspect-video bg-black rounded-t-2xl overflow-hidden">
            <video
              src={post.videoUrl}
              poster={post.imageUrl ?? undefined}
              controls
              className="w-full h-full"
            />
          </div>
        ) : post.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full max-h-[400px] object-cover rounded-t-2xl"
          />
        ) : null}

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-4">
            {post.category && (
              <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                <Tag className="w-3.5 h-3.5" />
                {post.category}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.publishedAt)}
            </span>
            {post.author && (
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                {post.author}
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            {post.title}
          </h2>

          <div className="text-slate-300 leading-relaxed whitespace-pre-line">
            {post.content || post.description}
          </div>
        </div>
      </div>
    </div>
  );
}
