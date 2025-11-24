"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function ProductImages({ images, name }: { images: string[], name: string }) {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    return (
        <div className="space-y-4">
            <div
                className="relative aspect-square bg-white/5 rounded-2xl overflow-hidden cursor-zoom-in border border-white/10 hover:border-primary/50 transition-colors"
                onClick={() => setOpen(true)}
            >
                <Image
                    src={images[0]}
                    alt={name}
                    fill
                    className="object-cover"
                />
            </div>

            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={images.map(src => ({ src }))}
                index={index}
                on={{ view: ({ index }) => setIndex(index) }}
            />
        </div>
    );
}
