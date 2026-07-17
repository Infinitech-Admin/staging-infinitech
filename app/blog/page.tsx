"use client";

import { useEffect, useState } from "react";
import { Divider } from "@heroui/react";
import { poetsen_one } from "@/config/fonts";
import { BlogPost } from "@/components/blog/types";
import BlogModal from "@/components/blog/BlogModal";
import BlogGrid from "@/components/blog/BlogGrid";
import LoadingSkeleton from "@/components/blog/LoadingSkeleton";
import CategoryFilter from "@/components/blog/CategoryFilter";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filtered, setFiltered] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const categories = Array.from(
    new Set(
      posts
        .map((p) => p.category)
        .filter((c): c is string => c !== null && c !== undefined),
    ),
  );

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/blogs", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load blog posts");
      const json = await res.json();
      const data: BlogPost[] = json.data ?? [];
      setPosts(data);
      setFiltered(data);
    } catch (err) {
      setError("Could not load blog posts. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (activeCategory === "All") {
      setFiltered(posts);
    } else {
      setFiltered(posts.filter((p) => p.category === activeCategory));
    }
  }, [activeCategory, posts]);

  return (
    <>
      <section>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mt-12 mx-auto text-center">
            <h2 className="font-bold text-accent text-4xl tracking-wider uppercase">
              Blog
            </h2>
            <h1
              className={`text-4xl text-primary mt-2 ${poetsen_one.className}`}
            >
              Stories, updates, and ideas from our team
            </h1>
          </div>

          {!loading && !error && categories.length > 1 && (
            <CategoryFilter
              categories={categories}
              active={activeCategory}
              onChange={(cat) => setActiveCategory(cat)}
            />
          )}

          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <p className="text-center text-red-500 py-12">{error}</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-12">
              No blog posts yet. Check back soon!
            </p>
          ) : (
            <BlogGrid posts={filtered} onCardClick={setSelectedPost} />
          )}

          <Divider className="my-12" />
        </div>
      </section>

      <BlogModal
        post={selectedPost}
        isOpen={selectedPost !== null}
        onClose={() => setSelectedPost(null)}
      />
    </>
  );
}
