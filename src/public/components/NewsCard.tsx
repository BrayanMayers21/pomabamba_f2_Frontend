import type { FC } from "react";
import { Link } from "react-router-dom";

interface NewsCardProps {
  image: string;
  title: string;
  summary: string;
  link: string;
  date?: string;
  category?: string;
  readTime?: string;
}

const NewsCard: FC<NewsCardProps> = ({
  image,
  title,
  summary,
  link,
  date,
  readTime = "2 min",
}) => {
  return (
    <div className="group  hover:shadow-2xl overflow-hidden h-full rounded-lg transition-all duration-500  border-green-700 border-l-4 transform hover:-translate-y-2 hover:scale-[1.02]">
      <div className="relative overflow-hidden">
        <div className="aspect-video relative">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {date && (
          <div className="absolute top-3 right-3 bg-green-600 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-gray-50 font-medium shadow-lg border border-white/20 flex items-center gap-1">
            <i className="fas fa-calendar-alt w-3 h-3 text-gray-50"></i>
            {date}
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-bold text-xl mb-3 text-green-700 leading-tight line-clamp-2 group-hover:text-green-700 transition-colors duration-300">
          {title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
          {summary}
        </p>

        <Link
          to={link}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl group/link focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          aria-label={`Leer más sobre ${title}`}
        >
          <span>Leer más</span>
          <i className="fas fa-arrow-right w-4 h-4 transform transition-transform duration-300 group-hover/link:translate-x-1"></i>
        </Link>
      </div>

      <div className="h-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
};

export default NewsCard;
