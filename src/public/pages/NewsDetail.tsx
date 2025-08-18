import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import NewsCard from "../components/NewsCard";

type NoticeDetail = {
  id: number;
  title: string;
  slug: string;
  body: string;
  date: string;
  category: { id: number; name: string };
  tags: { id: number; name: string }[];
  images: { file_name: string; url: string; is_main: boolean }[];
};

type NoticePreview = {
  id: number;
  title: string;
  slug: string;
  date: string;
  body: string;
  category: { id: number; name: string };
  tags: { id: number; name: string }[];
  main_image: {
    url: string | null;
    file_name: string | null;
  } | null;
};

export default function NewsDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [notice, setNotice] = useState<NoticeDetail | null>(null);
  const [similarNotices, setSimilarNotices] = useState<NoticePreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setNotFound(false);
    setNotice(null);
    setSimilarNotices([]);

    // Obtener noticia principal
    axios
      .get(API_URL + `/notices/${slug}`)
      .then((res) => {
        setNotice(res.data);
        setLoading(false);

        // Obtener noticias similares
        return axios.get(API_URL + `/notices/${slug}/similar`);
      })
      .then((res) => {
        setSimilarNotices(res.data);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <section className="p-8 text-center">Cargando noticia...</section>;
  }

  if (notFound || !notice) {
    return (
      <section className="p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Noticia no encontrada</h1>
        <Link to="/noticias" className="mt-4 inline-block text-blue-700 underline">
          Volver a noticias
        </Link>
      </section>
    );
  }

  const mainImage = notice.images.find(img => img.is_main)?.url || notice.images[0]?.url;

  return (
    <section className="bg-white py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Columna principal */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-semibold text-gray-800">{notice.title}</h1>
          <hr className="border-gray-400 my-4" />

          {mainImage && (
            <img
              src={API_URL + mainImage}
              alt={notice.slug}
              className="w-full max-h-[400px] object-contain rounded-lg mb-6"
            />
          )}

          <div className="text-sm text-gray-500 mb-2">
            <span>{new Date(notice.date).toLocaleDateString()}</span> •{" "}
            <span className="text-blue-700">{notice.category.name}</span>
          </div>

          <div
            className="prose prose-blue max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: notice.body }}
          />

          <div className="mb-6">
            {notice.tags.map(tag => (
              <span
                key={tag.id}
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2"
              >
                #{tag.name}
              </span>
            ))}
          </div>

          <Link to="/noticias" className="inline-block text-blue-700 underline text-sm">
            ← Volver a noticias
          </Link>
        </div>

        {/* Columna lateral - Noticias similares */}
        <div className="md:border-l-1 pl-4 border-gray-400">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Noticias similares</h2>
          <ul className="space-y-4">
            {similarNotices.map(newsItem => (
              <NewsCard
                image={newsItem.main_image ? API_URL + newsItem.main_image.url : "/placeholder.jpg"}
                title={newsItem.title}
                summary={newsItem.body}
                link={`/noticias/${newsItem.slug}`}
              />
            ))}
            {similarNotices.length === 0 && (
              <p className="text-sm text-gray-500">No se encontraron noticias similares.</p>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
