import { motion } from "framer-motion";

const InkBlob = () => {
  return (
    <div className="absolute top-[5%] -right-[10%] w-[800px] h-[800px] pointer-events-none z-0 mix-blend-multiply opacity-20 lg:opacity-30">
      <motion.div
        animate={{
          scale: [1, 1.1, 0.9, 1],
          rotate: [0, 90, 180, 360],
          borderRadius: [
            "40% 60% 70% 30% / 40% 50% 60% 50%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "50% 50% 60% 40% / 50% 60% 40% 50%",
            "40% 60% 70% 30% / 40% 50% 60% 50%",
          ],
        }}
        transition={{
          duration: 25,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="w-full h-full bg-gradient-to-br from-[#0a0f1d] via-[#0a0f1d] to-[#c5a059] blur-3xl"
      />
    </div>
  );
};

export default InkBlob;
