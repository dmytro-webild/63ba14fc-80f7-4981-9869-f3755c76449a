import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import DrawOnScroll from "@/components/animation/DrawOnScroll";
import { MotionMedia } from "@/components/kit/Media";
import { useWordLines } from "@/components/kit/useWordLines";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type StatementPlusConceptProps = {
  label?: string;
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  ariaLabel?: string;
  className?: string;
};

const EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];

const StatementPlusConcept = ({
  label = "The house",
  title = "Twenty rooms by the sea built around one garden and a long slow lunch",
  description = "An old summer house on the Ribera, restored room by room, with the pool, the spa and the kitchen a few steps apart.",
  imageSrc,
  imageAlt = "",
  ariaLabel,
  className,
}: StatementPlusConceptProps) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const cutoutY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const wordsRef = useRef<HTMLDivElement>(null);
  const words = title.split(/\s+/).filter(Boolean);
  const lineOf = useWordLines(wordsRef, title);

  return (
    <section
      ref={ref}
      aria-label={ariaLabel ?? label ?? "Statement"}
      className={cn("relative z-10 overflow-hidden bg-background py-[var(--section-space)] text-foreground", className)}
    >
      {imageSrc && (
        <MotionMedia
          src={imageSrc}
          alt={imageAlt}
          aria-hidden={imageAlt === "" ? true : undefined}
          loading="lazy"
          decoding="async"
          style={reduce ? undefined : { y: cutoutY }}
          className="pointer-events-none absolute -left-[4vw] -top-[6%] w-[42vw] max-w-[34rem] object-contain lg:w-[28vw]"
        />
      )}

      <div className="relative mx-auto flex w-[var(--container)] flex-col items-center text-center">
        {label && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)]"
          >
            {label}
          </motion.p>
        )}

        {words.length > 0 && (
          <h2
            aria-label={title}
            className="mt-[clamp(1.5rem,3vw,2.5rem)] max-w-[10.5em] text-[length:clamp(2rem,1.2rem+2.9vw,3.5rem)] uppercase leading-[0.98] tracking-[-0.01em] [font-family:var(--font-heading)] [font-weight:var(--heading-weight)] [overflow-wrap:anywhere]"
          >
            <motion.div ref={wordsRef} aria-hidden="true" initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.5 }}>
              {words.flatMap((word, i) => {
                const line = lineOf[i] ?? 0;
                const variants = { hidden: { y: "105%" }, show: { y: "0%", transition: { duration: 1.2, ease: EASE, delay: line * 0.08 } } };
                const end = i === words.length - 1 || (lineOf[i + 1] ?? 0) !== line;
                return [
                  <div key={i} data-word className="relative inline-block align-top">
                    <div className="block overflow-hidden pb-[0.08em]">
                      <motion.div variants={variants} className="block">
                        {word}
                      </motion.div>
                    </div>
                    {end && (
                      <div className="absolute left-full top-0 overflow-hidden pb-[0.08em] pl-[0.15em]">
                        <motion.div variants={variants} className="block">
                          <sup className="align-[0.9em] text-[0.32em] leading-none">+</sup>
                        </motion.div>
                      </div>
                    )}
                  </div>,
                  i < words.length - 1 ? " " : null,
                ];
              })}
            </motion.div>
          </h2>
        )}

        {description && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="mt-[clamp(2rem,4vw,3.5rem)] max-w-[24rem] text-balance text-[length:var(--text-body)] leading-[1.55] text-muted-foreground"
          >
            {description}
          </motion.p>
        )}

        <svg aria-hidden="true" viewBox="0 0 40 40" className="mt-[clamp(2rem,4vw,3rem)] h-8 w-8 text-current">
          <path d="M20 4 V36 M4 20 H36 M8.7 8.7 L31.3 31.3 M31.3 8.7 L8.7 31.3" stroke="currentColor" strokeWidth={1} strokeLinecap="round" fill="none" />
          <circle cx="20" cy="20" r="3" stroke="currentColor" strokeWidth={1} fill="none" />
        </svg>
        <div className="mt-6 h-12 w-px">
          <DrawOnScroll d="M0.5 0 V48" viewBox="0 0 1 48" strokeWidth={1} className="h-12 text-current opacity-50" />
        </div>
      </div>
    </section>
  );
};

export default StatementPlusConcept;
