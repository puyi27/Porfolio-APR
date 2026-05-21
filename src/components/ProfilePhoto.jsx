import { motion } from "framer-motion";

const ProfilePhoto = () => {
  return (
    <div className="relative w-64 h-64 mx-auto lg:mx-0 flex items-center justify-center">
      {/* Outer engraved ring */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full text-ember opacity-40"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
        <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </motion.svg>

      {/* Inner engraved ring */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full text-ember opacity-60"
        animate={{ rotate: -360 }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
      >
        <circle cx="100" cy="100" r="75" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </motion.svg>

      {/* Core Avatar (Geometric Navy Blue) */}
      <motion.div 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-32 h-32 bg-ash rounded-full relative z-10 flex items-center justify-center shadow-[0_0_40px_rgba(10,15,29,0.2)]"
      >
        {/* Subtle inner reflection */}
        <div className="absolute inset-0 rounded-full border border-ember/20" />
      </motion.div>
    </div>
  );
};

export default ProfilePhoto;
