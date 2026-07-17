"use client";

interface CategoryFilterProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  active,
  onChange,
}: CategoryFilterProps) {
  const allCategories = ["All", ...categories];

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-8">
      {allCategories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all whitespace-nowrap ${
            active === cat
              ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
