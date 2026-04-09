"use client";

import Link from "next/link";
import { MapPin, ShoppingBasket } from "lucide-react";
import { Button } from "./ui/Button";
import Image from "next/image";

export function ArtisanCard({ info }) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Image */}
      <Link href={`/artisan/${info.artisanKey}`} className="relative block aspect-square overflow-hidden bg-muted">
        <Image
          src={info.image}
          alt={info.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          width={96}
          height={96}
          onError={(e) => {
            e.target.src = `https://placehold.co/500x500/E8D5B0/7A5C3A?text=${encodeURIComponent(info.name)}`;
          }}
        />
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <Link href={`/artisan/${info.artisanKey}`}>
            <h3 className="font-semibold text-foreground text-sm leading-snug hover:text-primary transition-colors line-clamp-2">
              {info.name}
            </h3>
          </Link>
        </div>

        <div className="flex items-center gap-1 mb-2">
          <MapPin className="w-3 h-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{info.country}</span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <Button
            size="sm"
            onClick={() => console("Hacia productos")}
            className="gap-1.5"
          >
            <ShoppingBasket className="w-3.5 h-3.5" />
            Go to Products
          </Button>
        </div>
      </div>
    </div>
  );
}
