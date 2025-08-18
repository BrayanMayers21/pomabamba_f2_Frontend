import type { FC } from "react";
import { Link } from "react-router-dom";

interface NewsCardProps {
  image: string;
  title: string;
  summary: string;
  link: string;
}

const NewsCard: FC<NewsCardProps> = ({ image, title, summary, link }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex-shrink-0 w-full">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{summary}</p>
        <Link
          to={link}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Leer más →
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
