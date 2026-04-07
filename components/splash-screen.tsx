"use client";

import { motion } from "framer-motion";

export function SplashScreen({
  onOpen,
}: {
  onOpen: () => void;
}) {
  const layeredBackground = {
    backgroundImage: [
      "url('/splash/logo.png')",
      "url('/splash/brain.png')",
      "url('/splash/eyes.png')",
      "url('/splash/heart.png')",
      "url('/splash/slogan.png')",
      "url('/splash/buckle.png')",
      "url('/splash/denim-bg.png')",
    ].join(", "),
    backgroundRepeat: "no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat",
    backgroundPosition: "34px 52px, -62px 242px, 42px 466px, 96px 700px, 48px 596px, 232px 316px, center",
    backgroundSize: "308px auto, 176px auto, 108px auto, 128px auto, 292px auto, 124px auto, cover",
  } as const;

  return (
    <motion.div
      key="splash"
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative h-full w-full overflow-hidden rounded-[36px] bg-[#b7d0e4]"
      style={layeredBackground}
    >
      <motion.button
        type="button"
        onClick={onOpen}
        whileTap={{ scale: 0.97 }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.2 }}
        className="absolute left-[228px] top-[298px] h-[272px] w-[130px] rounded-[32px] focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-transparent"
        aria-label="Open Lingya notebook"
      >
        <span className="sr-only">Tap the buckle to enter the home screen</span>
      </motion.button>
    </motion.div>
  );
}
