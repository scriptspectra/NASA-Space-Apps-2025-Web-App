interface ModelImageProps {
  imageUrl: string;
  alt: string;
  title: string;
  subtitle: string;
}

export default function ModelImage({
  imageUrl,
  alt,
  title,
  subtitle,
}: ModelImageProps) {
  return (
    <div className="relative w-full group cursor-pointer">
      {/* Image + Glow Wrapper */}
      <div className="relative rounded-2xl w-full h-64 overflow-hidden">
        {/* Image */}
        <img
          src={imageUrl}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Glow effect (matches image) */}
        <div className="absolute top-0 left-0 w-full h-full rounded-2xl opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-700 bg-gradient-to-r from-orange-600 to-white pointer-events-none"></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80"></div>

        {/* Accent Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-cyan-500/20 mix-blend-overlay"></div>

        {/* Bottom Text */}
        <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500 group-hover:translate-y-0">
          <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">
            {title}
          </h3>
          <p className="text-gray-300 text-sm font-medium">{subtitle}</p>
        </div>

        {/* Decorative Element */}
        <div className="absolute top-4 right-4 w-12 h-12 border-2 border-white/30 rounded-full backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
