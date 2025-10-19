// app/profile/[category]/layout.tsx
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata> {
  const formattedName = params?.category
    ? params?.category.charAt(0).toUpperCase() +
      params?.category.slice(1).toLowerCase()
    : "Kategoriya";

  return {
    title: formattedName,
    description: formattedName || "Alla platformasidagi kontent.",
    openGraph: {
      title: formattedName || "Kategoriya",
      description: formattedName,
    },
  };
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
