"use client";

import { Play, Calendar, User } from "lucide-react";
import { BlogPost } from "./types";
import { formatDate, excerpt } from "./utils";

interface BlogCardProps {
  post: BlogPost;
  onClick: () => void;
}

export default function BlogCard({ post, onClick }: BlogCardProps) {
  const hasVideo = Boolean(post.videoUrl);

  return (
    <button
      onClick={onClick}
      className="group text-left bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:bg-slate-800/70 transition-all duration-300 flex flex-col h-full"
    >
      {/* Media */}
      <div className="relative aspect-video bg-slate-900 overflow-hidden">
        {post.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600 text-sm">
            No image
          </div>
        )}

        {hasVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
            <span className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg">
              <Play className="w-6 h-6 text-white ml-0.5" fill="currentColor" />
            </span>
          </div>
        )}

        {post.category && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 text-cyan-400 border border-cyan-500/30">
            {post.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
          {post.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {excerpt(post.description, 140)}
        </p>

        <div className="flex items-center gap-4 text-xs text-slate-500 mt-auto pt-3 border-t border-slate-700">
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
      </div>
    </button>
  );
}
