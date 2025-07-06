export const getLevelStyles = (level: string) => {
  switch (level) {
    case "WARMUP":
      return "bg-teal-500/60 text-teal-100 border-teal-400/50";
    case "MEDIUM":
      return "bg-yellow-500/60 text-yellow-100 border-yellow-400/50";
    case "HARDER":
      return "bg-orange-500/60 text-orange-100 border-orange-400/50";
    case "INSANE":
      return "bg-red-500/60 text-red-100 border-red-400/50";
    default:
      return "bg-gray-500/60 text-gray-100 border-gray-400/50";
  }
};
