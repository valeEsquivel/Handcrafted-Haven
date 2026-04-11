"use client";

import { use, useEffect, useState } from "react";
import { ArtisanCard } from "@/app/components/ArtisanCard";
// import { artisans } from "@/app/data/artisans";
import Link from "next/link";
import { ArrowLeft, UsersRound } from "lucide-react";

export default function ArtisanPage({ params }) {
  const [artisans, setArtisans] = useState([]);

  const fetchArtisans = async () => {
    try {
      const res = await fetch("/api/artisans");
      const data = await res.json();
      setArtisans(data);
    } catch (error) {
      console.error("Error: Loading artisans:", error);
    }
  };

  useEffect(() => {
    fetchArtisans()
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-primary text-primary-foreground py-12 px-4">
        <div className="container mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <UsersRound className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold font-serif">Artisans</h1>
              <p className="text-primary-foreground/75 mt-1">
                Meet our skilled artisans and their products
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Skilled Artisans */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            {artisans.length} {artisans.length === 1 ? "artisan" : "artisans"}
          </p>
        </div>

        {artisans.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground text-lg mb-6">
              No artisans found yet.
            </p>
            <Link href="/" className="text-primary hover:underline font-medium">
              ← Back to home page
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {artisans.map((info) => (
              <ArtisanCard
                key={info.artisanKey}
                info={info}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
