import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionTemplate, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { scrollRange, useImageReady, usePreloadImages } from "@/components/kit/kitMotion";
import EraArchWindow from "@/components/kit/EraArchWindow";
import Media, { MotionMedia } from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type GalleryItem = { title: string; imageSrc: string; imageAlt?: string };

type GalleryWindowMergeProps = {
  word?: string;
  quote?: string;
  credit?: string;
  imageSrc?: string;
  imageAlt?: string;
  items?: GalleryItem[];
  ariaLabel?: string;
  className?: string;
};

const pexels = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&w=1200`;

const defaultItems: GalleryItem[] = [
  { title: "The lemon courtyard", imageSrc: pexels(13888606), imageAlt: "Courtyard with lemon trees" },
  { title: "The garden path", imageSrc: pexels(17086146), imageAlt: "Stone path under a pergola" },
  { title: "The shutters", imageSrc: pexels(3445683), imageAlt: "White facade with blue shutters" },
];

const EASE_OUT: [number, number, number, number] = [0.25, 1, 0.5, 1];
const STOPS = [0, 0.55, 0.8];

const useInset = (progress: MotionValue<number>, top: number[], right: number[], bottom: number[], left: number[]) => {
  const t = useTransform(progress, STOPS, top);
  const r = useTransform(progress, STOPS, right);
  const b = useTransform(progress, STOPS, bottom);
  const l = useTransform(progress, STOPS, left);
  return useMotionTemplate`inset(${t}% ${r}% ${b}% ${l}%)`;
};

const GalleryWindowMerge = ({
  word = "Sitges",
  quote = "We kept the old garden walls and let the light do the rest.",
  credit = "Marta Roig, architect",
  imageSrc = pexels(36808514),
  imageAlt = "White house with terraces under a blue sky",
  items = defaultItems,
  ariaLabel,
  className,
}: GalleryWindowMergeProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  usePreloadImages(sectionRef, "200%");
  const reduce = useReducedMotion();
  const mobileRef = useRef<HTMLDivElement>(null);
  const mobileIn = useInView(mobileRef, { once: true, amount: 0.2 });
  const mobileReady = useImageReady(mobileRef, mobileIn);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });

  const leftClip = useInset(scrollYProgress, [10, 18.5, 0], [56, 50, 0], [45, 18.5, 0], [1, 1, 0]);
  const rightClip = useInset(scrollYProgress, [45, 18.5, 0], [1, 1, 0], [10, 18.5, 0], [56, 50, 0]);
  const seamOpacity = useTransform(scrollYProgress, [0.45, 0.55, 0.62], [0, 1, 0]);
  const imageScale = useTransform(scrollYProgress, scrollRange(0, 0.8), [1.12, 1]);
  const wordY = useTransform(scrollYProgress, scrollRange(0.58, 0.8), ["105%", "0%"], { ease: (v) => 1 - Math.pow(1 - v, 3) });
  const captionOpacity = useTransform(scrollYProgress, scrollRange(0.72, 0.86), [0, 1]);
  const captionY = useTransform(scrollYProgress, scrollRange(0.72, 0.86), [24, 0]);
  const shadeOpacity = useTransform(scrollYProgress, scrollRange(0.55, 0.8), [0, 1]);
  const fit = (180 / Math.max(word?.length ?? 0, 6)).toFixed(1);
  const count = items.length;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: count > 1, align: "center", active: count > 1 });
  const [active, setActive] = useState(0);
  const onSelect = useCallback((api: EmblaCarouselType) => setActive(api.selectedScrollSnap()), []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      ref={sectionRef}
      aria-label={ariaLabel ?? word ?? "Gallery"}
      data-scene
      className={cn("relative bg-background py-[var(--section-space)] text-foreground", className)}
    >
      {!reduce && (
        <div ref={trackRef} className="relative hidden h-[300svh] lg:block">
          <div className="sticky top-0 h-svh w-full overflow-hidden">
            <motion.div style={{ clipPath: leftClip }} className="absolute inset-0">
              <MotionMedia src={imageSrc} alt={imageAlt} loading="lazy" decoding="async" style={{ scale: imageScale }} className="h-full w-full object-cover" />
            </motion.div>
            <motion.div aria-hidden="true" style={{ clipPath: rightClip }} className="absolute inset-0">
              <MotionMedia src={imageSrc} alt="" loading="lazy" decoding="async" style={{ scale: imageScale }} className="h-full w-full object-cover" />
            </motion.div>
            <motion.div aria-hidden="true" style={{ opacity: seamOpacity }} className="absolute left-1/2 top-[18.5%] h-[63%] w-px -translate-x-1/2 bg-background" />
            <motion.div
              aria-hidden="true"
              style={{ opacity: shadeOpacity }}
              className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-start px-[var(--gutter)] pt-[4svh] text-center text-white">
              <div className="overflow-hidden pb-[0.06em]">
                <motion.h2
                  style={{ y: wordY, fontSize: `min(calc(var(--text-display) * 1.6), ${fit}vw)` }}
                  className="uppercase leading-[var(--heading-leading)] tracking-[var(--heading-tracking)] [font-family:var(--font-heading)] [font-weight:var(--heading-weight)] [overflow-wrap:anywhere]"
                >
                  {word}
                </motion.h2>
              </div>
            </div>
            {(quote || credit) && (
              <motion.div
                style={{ opacity: captionOpacity, y: captionY }}
                className="absolute inset-x-0 bottom-[clamp(2rem,6svh,4rem)] mx-auto flex w-[var(--container)] flex-col items-center gap-3 text-center text-white"
              >
                {quote && <p className="max-w-[34rem] text-balance text-[length:var(--text-body-lg)] leading-[1.4]">{quote}</p>}
                {credit && <p className="text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)]">{credit}</p>}
              </motion.div>
            )}
          </div>
        </div>
      )}

      <div ref={mobileRef} className={cn("relative h-[85svh] min-h-[28rem] w-full overflow-hidden", !reduce && "lg:hidden")}>
        <MotionMedia
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          initial={reduce ? false : { scale: 1.15 }}
          animate={mobileIn && mobileReady ? { scale: 1 } : undefined}
          transition={{ duration: 1.2, ease: EASE_OUT }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        <div className="absolute inset-0 flex items-start justify-center px-[var(--gutter)] pt-[6svh] text-center text-white">
          <motion.div initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.4 }} className="overflow-hidden pb-[0.06em]">
            <motion.h2
              variants={{ hidden: { y: "105%" }, show: { y: "0%", transition: { duration: 1.2, ease: EASE_OUT } } }}
              style={{ fontSize: `min(calc(var(--text-display) * 1.2), 18vw, ${fit}vw)` }}
              className="uppercase leading-[var(--heading-leading)] tracking-[var(--heading-tracking)] [font-family:var(--font-heading)] [font-weight:var(--heading-weight)] [overflow-wrap:anywhere]"
            >
              {word}
            </motion.h2>
          </motion.div>
        </div>
        {(quote || credit) && (
          <div className="absolute inset-x-0 bottom-8 mx-auto flex w-[var(--container)] flex-col items-center gap-3 text-center text-white">
            {quote && <p className="max-w-[34rem] text-balance text-[length:var(--text-body)] leading-[1.4]">{quote}</p>}
            {credit && <p className="text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)]">{credit}</p>}
          </div>
        )}
      </div>

      {count > 0 && (
        <div className="mx-auto mt-[var(--section-space)] w-[var(--container)]">
          <div ref={emblaRef} className="overflow-hidden">
            <ul className="flex">
              {items.map((item, index) => (
                <li
                  key={index}
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${count}`}
                  className="min-w-0 shrink-0 grow-0 basis-full px-[calc(var(--gap)/2)] lg:basis-[78%]"
                >
                  <div className="border border-foreground/20 p-2">
                    <EraArchWindow className="aspect-[4/3] w-full rounded-[var(--radius-image)] lg:aspect-[16/9]">
                      <Media
                        src={item.imageSrc}
                        alt={item.imageAlt ?? item.title}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </EraArchWindow>
                  </div>
                  <p
                    className={cn(
                      "mt-4 text-center text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] text-muted-foreground transition-opacity duration-[var(--dur-base)] [overflow-wrap:anywhere]",
                      index === active ? "opacity-100" : "opacity-0",
                    )}
                  >
                    {item.title}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          {count > 1 && (
            <div className="mt-[clamp(1.5rem,3vw,2.5rem)] flex items-center justify-center gap-6">
              <button
                type="button"
                aria-label="Previous photo"
                onClick={() => emblaApi?.scrollPrev()}
                className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-foreground/40 transition-colors duration-[var(--dur-fast)] hover:border-foreground"
              >
                <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M15 8H2M7 3 2 8l5 5" />
                </svg>
              </button>
              <div className="flex items-center gap-4 text-[length:var(--text-label)] font-semibold tabular-nums">
                <p aria-hidden="true">{active + 1}</p>
                <div aria-hidden="true" className="h-px w-16 bg-current" />
                <p aria-hidden="true">{count}</p>
              </div>
              <button
                type="button"
                aria-label="Next photo"
                onClick={() => emblaApi?.scrollNext()}
                className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-foreground/40 transition-colors duration-[var(--dur-fast)] hover:border-foreground"
              >
                <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M1 8h13M9 3l5 5-5 5" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default GalleryWindowMerge;
