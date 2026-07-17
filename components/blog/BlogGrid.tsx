"use client";

import { BlogPost } from "./types";
import BlogCard from "./BlogCard";

interface BlogGridProps {
  posts: BlogPost[];
  onCardClick: (post: BlogPost) => void;
}

export default function BlogGrid({ posts, onCardClick }: BlogGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} onClick={() => onCardClick(post)} />
      ))}
    </div>
  );
}
