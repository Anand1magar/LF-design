/**
 * Reusable motion presets — spread directly onto any motion.* element:
 *   <motion.div {...fadeUp} className="...">
 *   <motion.div {...fadeUpItem(i * 0.1)} className="...">
 */

/** Section-level fade-up: headers, full-width blocks */
export const fadeUp = {
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1,  y: 0  },
  viewport:    { once: true, margin: "-100px" } as const,
  transition:  { duration: 0.7 },
};

/** Item-level fade-up: grid cards, list rows — accepts an optional stagger delay */
export const fadeUpItem = (delay = 0) => ({
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1,  y: 0  },
  viewport:    { once: true, margin: "-50px" } as const,
  transition:  { duration: 0.5, delay },
});
