import React, { useState, useEffect } from 'react';
import { Calendar, User, Tag, Clock, Share2, ArrowLeft, Eye, ThumbsUp, MessageCircle, Download, ExternalLink, BookmarkPlus, Bookmark, Send, Heart } from 'lucide-react';

const ArticleDetailPage = () => {
    const [article, setArticle] = useState(null);
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [views, setViews] = useState(0);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [readingProgress, setReadingProgress] = useState(0);
    const [showFloatingActions, setShowFloatingActions] = useState(false);

    // Simulación de datos de la base de datos
    const MOCK_ARTICLE_DATA = {
        id: 1,
        title: "Nuevo Proceso de Matrícula Escolar 2025",
        content: `
            <p>La Unidad de Gestión Educativa Local (UGEL) de Áncash informa a toda la comunidad educativa sobre la implementación del nuevo proceso de matrícula escolar para el año académico 2025, que incorpora importantes mejoras tecnológicas y procedimentales.</p>
            
            <h2>Principales Novedades del Sistema</h2>
            <p>El nuevo sistema de matrícula digital presenta las siguientes características innovadoras:</p>
            <ul>
                <li><strong>Proceso 100% digital:</strong> Eliminación del uso de papel y trámites presenciales innecesarios</li>
                <li><strong>Plataforma unificada:</strong> Un solo portal para todas las instituciones educativas de la región</li>
                <li><strong>Validación automática:</strong> Verificación instantánea de documentos mediante inteligencia artificial</li>
                <li><strong>Notificaciones en tiempo real:</strong> Alertas SMS y correo electrónico sobre el estado del proceso</li>
            </ul>

            <h2>Cronograma de Matrículas 2025</h2>
            <p>Las fechas establecidas para el proceso de matrícula son las siguientes:</p>
            <ul>
                <li><strong>1 al 15 de enero:</strong> Matrícula para estudiantes que continúan en la misma institución</li>
                <li><strong>16 al 31 de enero:</strong> Matrícula para nuevos estudiantes y traslados</li>
                <li><strong>1 al 15 de febrero:</strong> Matrícula extemporánea (casos especiales)</li>
                <li><strong>1 de marzo:</strong> Inicio oficial del año escolar 2025</li>
            </ul>

            <h2>Requisitos y Documentación</h2>
            <p>Los padres de familia deberán contar con los siguientes documentos en formato digital:</p>
            <ul>
                <li>DNI del estudiante y padres de familia</li>
                <li>Partida de nacimiento del estudiante</li>
                <li>Certificado de estudios del año anterior</li>
                <li>Ficha única de matrícula actualizada</li>
                <li>Constancia de domicilio</li>
            </ul>

            <h2>Soporte Técnico y Capacitación</h2>
            <p>La UGEL ha habilitado múltiples canales de soporte para asegurar el éxito del proceso:</p>
            <ul>
                <li><strong>Mesa de ayuda telefónica:</strong> (043) 421-563 de lunes a viernes, 8:00 AM - 6:00 PM</li>
                <li><strong>Soporte en línea:</strong> Chat disponible en la plataforma web</li>
                <li><strong>Videotutoriales:</strong> Guías paso a paso disponibles en nuestro canal de YouTube</li>
                <li><strong>Capacitaciones presenciales:</strong> Talleres para directores y personal administrativo</li>
            </ul>

            <p>Este nuevo sistema representa un paso fundamental hacia la modernización de nuestros procesos educativos, garantizando mayor eficiencia, transparencia y accesibilidad para todas las familias de nuestra región.</p>
        `,
        summary: "Información sobre el nuevo proceso de matrícula digital para el año escolar 2025, incluyendo cronograma, requisitos y soporte técnico disponible.",
        main_image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200",
        publish_date: "2024-08-15T10:30:00Z",
        created_at: "2024-08-14T15:20:00Z",
        updated_at: "2024-08-15T10:30:00Z",
        status: "published",
        views: 1247,
        likes: 89,
        author_id: 1,
        category_id: 1
    };

    const MOCK_AUTHOR_DATA = {
        id: 1,
        full_name: "María González Pérez",
        bio: "Especialista en Gestión Educativa con más de 15 años de experiencia en el sector público. Magíster en Administración Educativa por la Universidad Nacional de Ancash.",
        email: "mgonzalez@ugel.gob.pe",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616c2d6e2e2?w=150"
    };

    const MOCK_CATEGORY_DATA = {
        id: 1,
        name: "Matrículas",
        description: "Información sobre procesos de matrícula escolar"
    };

    const MOCK_TAGS_DATA = [
        { id: 1, name: "matrícula" },
        { id: 2, name: "2025" },
        { id: 3, name: "educación" },
        { id: 4, name: "digital" },
        { id: 5, name: "proceso" }
    ];

    const MOCK_RELATED_ARTICLES = [
        {
            id: 2,
            title: "Calendario Académico 2025: Fechas Importantes",
            summary: "Conoce todas las fechas relevantes del año escolar 2025",
            main_image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400",
            category_name: "Calendario",
            publish_date: "2024-08-10T09:00:00Z",
            views: 892
        },
        {
            id: 3,
            title: "Guía de Documentos para Matrícula",
            summary: "Lista completa de documentos requeridos para el proceso de matrícula",
            main_image: "https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?w=400",
            category_name: "Matrículas",
            publish_date: "2024-08-08T14:15:00Z",
            views: 1205
        },
        {
            id: 4,
            title: "Sistema de Becas y Apoyo Estudiantil",
            summary: "Información sobre programas de apoyo económico para estudiantes",
            main_image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400",
            category_name: "Becas",
            publish_date: "2024-08-05T11:30:00Z",
            views: 756
        }
    ];

    const MOCK_COMMENTS_DATA = [
        {
            id: 1,
            author: "Carlos Mendoza",
            content: "Excelente iniciativa. ¿Habrá algún tutorial en video disponible?",
            created_at: "2024-08-16T08:30:00Z",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50",
            likes: 5
        },
        {
            id: 2,
            author: "Ana Rodríguez",
            content: "¿El sistema estará disponible también para tablets y móviles?",
            created_at: "2024-08-16T10:15:00Z",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50",
            likes: 3
        },
        {
            id: 3,
            author: "Luis Prado",
            content: "Muy buena información. Esto facilitará mucho el proceso a los padres de familia.",
            created_at: "2024-08-16T14:20:00Z",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50",
            likes: 8
        }
    ];

    // Simulación de carga de datos desde la base de datos
    const fetchArticleData = async (articleId) => {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1000));
        return MOCK_ARTICLE_DATA;
    };

    const fetchAuthorData = async (authorId) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return MOCK_AUTHOR_DATA;
    };

    const fetchCategoryData = async (categoryId) => {
        await new Promise(resolve => setTimeout(resolve, 200));
        return MOCK_CATEGORY_DATA;
    };

    const fetchTagsData = async (articleId) => {
        await new Promise(resolve => setTimeout(resolve, 400));
        return MOCK_TAGS_DATA;
    };

    const fetchRelatedArticles = async (categoryId, currentArticleId) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_RELATED_ARTICLES;
    };

    const fetchComments = async (articleId) => {
        await new Promise(resolve => setTimeout(resolve, 600));
        return MOCK_COMMENTS_DATA;
    };

    useEffect(() => {
        const loadArticleData = async () => {
            try {
                setIsLoading(true);
                
                // Cargar datos del artículo principal
                const articleData = await fetchArticleData(1);
                
                // Cargar datos relacionados en paralelo
                const [authorData, categoryData, tagsData, relatedData, commentsData] = await Promise.all([
                    fetchAuthorData(articleData.author_id),
                    fetchCategoryData(articleData.category_id),
                    fetchTagsData(articleData.id),
                    fetchRelatedArticles(articleData.category_id, articleData.id),
                    fetchComments(articleData.id)
                ]);

                // Construir objeto completo del artículo
                const completeArticle = {
                    ...articleData,
                    author: authorData,
                    category: categoryData,
                    tags: tagsData
                };

                setArticle(completeArticle);
                setRelatedArticles(relatedData);
                setComments(commentsData);
                animateViews(articleData.views);

            } catch (error) {
                console.error('Error loading article data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadArticleData();

        // Scroll listener para progreso de lectura
        const handleScroll = () => {
            const articleContent = document.querySelector('.article-content');
            if (articleContent) {
                const scrollTop = window.scrollY;
                const docHeight = articleContent.offsetHeight;
                const winHeight = window.innerHeight;
                const scrollPercent = Math.max(0, Math.min(100, (scrollTop / (docHeight - winHeight)) * 100));
                
                setReadingProgress(scrollPercent);
                setShowFloatingActions(scrollPercent > 20);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const animateViews = (targetViews) => {
        let currentViews = 0;
        const increment = Math.ceil(targetViews / 50);
        const timer = setInterval(() => {
            currentViews += increment;
            if (currentViews >= targetViews) {
                currentViews = targetViews;
                clearInterval(timer);
            }
            setViews(currentViews);
        }, 30);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-PE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDateShort = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-PE', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleLike = () => {
        setLiked(!liked);
        // Aquí iría la llamada a la API para actualizar el like
        // updateArticleLike(article.id, !liked);
    };

    const handleBookmark = () => {
        setBookmarked(!bookmarked);
        // Aquí iría la llamada a la API para guardar/quitar bookmark
        // updateBookmark(article.id, !bookmarked);
    };

    const handleShare = () => {
        setShowShareMenu(!showShareMenu);
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim()) {
            const newCommentData = {
                id: comments.length + 1,
                author: "Usuario Actual",
                content: newComment.trim(),
                created_at: new Date().toISOString(),
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50",
                likes: 0
            };
            
            setComments([newCommentData, ...comments]);
            setNewComment('');
            
            // Aquí iría la llamada a la API para guardar el comentario
            // await createComment(article.id, newComment);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative mb-8">
                        <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200"></div>
                        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-600 absolute inset-0"></div>
                    </div>
                    <div className="space-y-4">
                        <div className="animate-pulse bg-gray-200 h-4 w-48 rounded mx-auto"></div>
                        <div className="animate-pulse bg-gray-200 h-3 w-32 rounded mx-auto"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Artículo no encontrado</h2>
                    <p className="text-gray-600 mb-8">El artículo que buscas no existe o ha sido eliminado.</p>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        Volver al inicio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative">
            {/* Barra de progreso de lectura */}
            <div className="fixed top-0 left-0 w-full h-1 bg-blue-100 z-50">
                <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 ease-out"
                    style={{ width: `${readingProgress}%` }}
                />
            </div>

            {/* Acciones flotantes */}
            {showFloatingActions && (
                <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 animate-slideInRight">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-3 space-y-3">
                        <button
                            onClick={handleLike}
                            className={`group relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                liked 
                                    ? 'bg-red-500 text-white shadow-lg scale-110' 
                                    : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500 shadow-md hover:shadow-lg'
                            }`}
                        >
                            <Heart className={`h-5 w-5 transition-all duration-300 ${liked ? 'fill-current' : ''}`} />
                            <div className="absolute -right-2 -top-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {article.likes + (liked ? 1 : 0)}
                            </div>
                        </button>
                        
                        <button
                            onClick={handleBookmark}
                            className={`group w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                bookmarked 
                                    ? 'bg-yellow-500 text-white shadow-lg' 
                                    : 'bg-white text-gray-600 hover:bg-yellow-50 hover:text-yellow-500 shadow-md hover:shadow-lg'
                            }`}
                        >
                            {bookmarked ? <Bookmark className="h-5 w-5 fill-current" /> : <BookmarkPlus className="h-5 w-5" />}
                        </button>
                        
                        <button
                            onClick={handleShare}
                            className="group w-12 h-12 rounded-xl bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-500 shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300"
                        >
                            <Share2 className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Header con navegación */}
            <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-blue-100 sticky top-0 z-30">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <button className="group flex items-center space-x-3 text-blue-600 hover:text-blue-800 transition-all duration-300">
                            <div className="p-2 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
                                <ArrowLeft className="h-5 w-5" />
                            </div>
                            <span className="font-medium hidden sm:block">Volver a artículos</span>
                        </button>
                        
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Eye className="h-4 w-4" />
                                <span className="font-medium tabular-nums">{views.toLocaleString()}</span>
                            </div>
                            <div className="hidden md:block text-gray-400">|</div>
                            <div className="hidden md:block text-gray-600 text-sm">
                                UGEL Áncash
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Contenido principal */}
                    <div className="lg:col-span-3">
                        {/* Artículo */}
                        <article className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden animate-fadeInUp article-content">
                            {/* Hero section */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20" />
                                <img
                                    src={article.main_image}
                                    alt={article.title}
                                    className="w-full h-72 md:h-96 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                
                                {/* Categoría flotante */}
                                <div className="absolute top-6 left-6 animate-slideInLeft">
                                    <div className="bg-white/90 backdrop-blur-sm text-blue-600 px-4 py-2 rounded-2xl font-medium shadow-lg border border-blue-100">
                                        {article.category.name}
                                    </div>
                                </div>

                                {/* Estadísticas flotantes */}
                                <div className="absolute top-6 right-6 animate-slideInRight">
                                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
                                        <div className="flex items-center space-x-3 text-sm">
                                            <div className="flex items-center space-x-1 text-gray-600">
                                                <Eye className="h-4 w-4" />
                                                <span className="font-medium tabular-nums">{views.toLocaleString()}</span>
                                            </div>
                                            <div className="flex items-center space-x-1 text-red-500">
                                                <Heart className="h-4 w-4" />
                                                <span className="font-medium tabular-nums">{article.likes + (liked ? 1 : 0)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Título sobre la imagen */}
                                <div className="absolute bottom-8 left-8 right-8 animate-slideInUp" style={{ animationDelay: '0.3s' }}>
                                    <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-2xl">
                                        {article.title}
                                    </h1>
                                </div>
                            </div>

                            {/* Contenido del artículo */}
                            <div className="p-6 md:p-10">
                                {/* Metadata */}
                                <div className="flex flex-wrap items-center gap-6 mb-8 pb-6 border-b border-gray-100">
                                    <div className="flex items-center space-x-3 animate-fadeInLeft" style={{ animationDelay: '0.4s' }}>
                                        <img
                                            src={article.author.avatar}
                                            alt={article.author.full_name}
                                            className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-800">{article.author.full_name}</p>
                                            <p className="text-sm text-gray-500">Autor</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 animate-fadeInRight" style={{ animationDelay: '0.5s' }}>
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="h-4 w-4 text-blue-500" />
                                            <span>{formatDate(article.publish_date)}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Clock className="h-4 w-4 text-green-500" />
                                            <span>Actualizado: {formatDate(article.updated_at)}</span>
                                        </div>
                                    </div>
                                </div>

                                

                                {/* Contenido principal */}
                                <div className="prose prose-lg max-w-none animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
                                    <div 
                                        dangerouslySetInnerHTML={{ __html: article.content }}
                                        className="text-gray-700 leading-relaxed"
                                    />
                                </div>

                                {/* Tags */}
                                <div className="mt-12 pt-8 border-t border-gray-100 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-2 rounded-xl">
                                            <Tag className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800">Etiquetas relacionadas</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {article.tags.map((tag, index) => (
                                            <span
                                                key={tag.id}
                                                className="bg-gradient-to-r from-gray-100 to-gray-50 hover:from-blue-100 hover:to-indigo-100 text-gray-700 hover:text-blue-700 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-200 hover:shadow-md animate-slideInUp"
                                                style={{ animationDelay: `${0.9 + index * 0.1}s` }}
                                            >
                                                #{tag.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Acciones */}
                                <div className="mt-12 pt-8 border-t border-gray-100 animate-fadeInUp" style={{ animationDelay: '1s' }}>
                                    <div className="flex items-center justify-between flex-wrap gap-4">
                                        <div className="flex items-center space-x-4">
                                            <button
                                                onClick={handleLike}
                                                className={`group flex items-center space-x-3 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                                                    liked 
                                                        ? 'bg-red-500 text-white shadow-lg shadow-red-200 scale-105' 
                                                        : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-500 hover:shadow-lg'
                                                }`}
                                            >
                                                <Heart className={`h-5 w-5 transition-all duration-300 ${liked ? 'fill-current' : ''}`} />
                                                <span>{liked ? 'Te gusta' : 'Me gusta'}</span>
                                                <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                                                    {article.likes + (liked ? 1 : 0)}
                                                </span>
                                            </button>
                                            
                                            <button
                                                onClick={handleBookmark}
                                                className={`group flex items-center space-x-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                                                    bookmarked 
                                                        ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-200' 
                                                        : 'bg-gray-100 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 hover:shadow-lg'
                                                }`}
                                            >
                                                {bookmarked ? <Bookmark className="h-5 w-5 fill-current" /> : <BookmarkPlus className="h-5 w-5" />}
                                                <span>{bookmarked ? 'Guardado' : 'Guardar'}</span>
                                            </button>
                                        </div>
                                        
                                        <div className="relative">
                                            <button
                                                onClick={handleShare}
                                                className="flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-2xl font-medium hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                                            >
                                                <Share2 className="h-5 w-5" />
                                                <span>Compartir</span>
                                            </button>
                                            
                                            {showShareMenu && (
                                                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-20 animate-slideDown">
                                                    <div className="px-4 py-2 text-sm font-medium text-gray-800 border-b border-gray-100">
                                                        Compartir artículo
                                                    </div>
                                                    {[
                                                        { name: 'Copiar enlace', icon: '🔗' },
                                                        { name: 'WhatsApp', icon: '📱' },
                                                        { name: 'Facebook', icon: '📘' },
                                                        { name: 'Twitter', icon: '🐦' }
                                                    ].map((option) => (
                                                        <button 
                                                            key={option.name}
                                                            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3"
                                                        >
                                                            <span>{option.icon}</span>
                                                            <span className="text-gray-700">{option.name}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>

                        {/* Información del autor */}
                        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 mt-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                            <div className="flex items-start space-x-6">
                                <div className="relative">
                                    <img
                                        src={article.author.avatar}
                                        alt={article.author.full_name}
                                        className="w-20 h-20 rounded-2xl object-cover border-4 border-blue-100"
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h3 className="text-2xl font-bold text-gray-800">{article.author.full_name}</h3>
                                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                            Autor verificado
                                        </span>
                                    </div>
                                    <p className="text-blue-600 font-medium mb-3">{article.author.email}</p>
                                    <p className="text-gray-700 leading-relaxed mb-4">{article.author.bio}</p>
                                    {/* <div className="flex space-x-3">
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors duration-200 text-sm font-medium">
                                            Seguir autor
                                        </button>
                                        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors duration-200 text-sm font-medium">
                                            Ver más artículos
                                        </button>
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        {/* Comentarios */}
                        <div>
                        {/* <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 mt-8 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                            <div className="flex items-center space-x-3 mb-8">
                                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-3 rounded-2xl">
                                    <MessageCircle className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800">Comentarios</h3>
                                    <p className="text-gray-600">{comments.length} comentarios</p>
                                </div>
                            </div> */}
                            
                            {/* Formulario de comentarios */}
                            {/* <div className="mb-8">
                                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
                                    <div className="flex space-x-4">
                                        <img
                                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50"
                                            alt="Tu avatar"
                                            className="w-12 h-12 rounded-2xl object-cover border-2 border-blue-100"
                                        />
                                        <div className="flex-1">
                                            <textarea
                                                placeholder="Comparte tu opinión sobre este artículo..."
                                                value={newComment}
                                                onChange={(e) => setNewComment(e.target.value)}
                                                className="w-full p-4 border border-gray-200 rounded-2xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200"
                                                rows="3"
                                            />
                                            <div className="flex justify-between items-center mt-4">
                                                <div className="flex space-x-2">
                                                    <button className="p-2 text-gray-500 hover:text-blue-500 transition-colors duration-200">
                                                        📎
                                                    </button>
                                                    <button className="p-2 text-gray-500 hover:text-blue-500 transition-colors duration-200">
                                                        😊
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={handleCommentSubmit}
                                                    disabled={!newComment.trim()}
                                                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-2xl font-medium hover:from-blue-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
                                                >
                                                    <Send className="h-4 w-4" />
                                                    <span>Publicar</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                            {/* Lista de comentarios */}
                            {/* <div className="space-y-6">
                                {comments.map((comment, index) => (
                                    <div 
                                        key={comment.id} 
                                        className="group bg-white/50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 animate-slideInUp"
                                        style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                                    >
                                        <div className="flex space-x-4">
                                            <img
                                                src={comment.avatar}
                                                alt={comment.author}
                                                className="w-12 h-12 rounded-2xl object-cover border-2 border-gray-100"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center space-x-3">
                                                        <span className="font-semibold text-gray-800">{comment.author}</span>
                                                        <span className="text-sm text-gray-500">
                                                            {formatDateShort(comment.created_at)}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                        <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200">
                                                            <Heart className="h-4 w-4" />
                                                        </button>
                                                        <span className="text-sm text-gray-500">{comment.likes}</span>
                                                    </div>
                                                </div>
                                                <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                                                <div className="flex items-center space-x-4 mt-3">
                                                    <button className="text-sm text-gray-500 hover:text-blue-500 transition-colors duration-200">
                                                        Responder
                                                    </button>
                                                    <button className="text-sm text-gray-500 hover:text-red-500 transition-colors duration-200">
                                                        Me gusta · {comment.likes}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div> */}

                            {/* Cargar más comentarios */}
                            {/* <div className="text-center mt-8">
                                <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-2xl font-medium hover:bg-gray-200 transition-all duration-300 hover:shadow-lg">
                                    Cargar más comentarios
                                </button>
                            </div> */}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-8">
                            {/* Artículos relacionados */}
                            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-6 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-2 rounded-xl">
                                        <Eye className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800">Artículos relacionados</h3>
                                </div>
                                
                                <div className="space-y-6">
                                    {relatedArticles.map((relatedArticle, index) => (
                                        <div 
                                            key={relatedArticle.id} 
                                            className="group cursor-pointer animate-slideInRight"
                                            style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                                        >
                                            <div className="relative mb-3 overflow-hidden rounded-2xl">
                                                <img
                                                    src={relatedArticle.main_image}
                                                    alt={relatedArticle.title}
                                                    className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                <div className="absolute top-3 left-3">
                                                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                                                        {relatedArticle.category_name}
                                                    </span>
                                                </div>
                                                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-lg text-xs flex items-center space-x-1">
                                                    <Eye className="h-3 w-3" />
                                                    <span>{relatedArticle.views.toLocaleString()}</span>
                                                </div>
                                            </div>
                                            <h4 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                                                {relatedArticle.title}
                                            </h4>
                                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                {relatedArticle.summary}
                                            </p>
                                            <div className="flex items-center justify-between text-xs text-gray-500">
                                                <div className="flex items-center space-x-1">
                                                    <Calendar className="h-3 w-3" />
                                                    <span>{formatDateShort(relatedArticle.publish_date)}</span>
                                                </div>
                                                <span className="text-blue-500 group-hover:text-blue-600 font-medium">
                                                    Leer más →
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recursos útiles */}
                            {/* <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 border border-blue-100 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-2 rounded-xl">
                                        <Download className="h-5 w-5" />
                                    </div>
                                    <h4 className="font-bold text-gray-800">Recursos útiles</h4>
                                </div>
                                
                                <div className="space-y-3">
                                    {[
                                        { name: 'Descargar PDF completo', icon: Download, color: 'from-red-500 to-pink-500' },
                                        { name: 'Portal oficial UGEL', icon: ExternalLink, color: 'from-blue-500 to-indigo-500' },
                                        { name: 'Formulario de matrícula', icon: Download, color: 'from-green-500 to-teal-500' },
                                        { name: 'Mesa de ayuda', icon: ExternalLink, color: 'from-purple-500 to-indigo-500' }
                                    ].map((resource, index) => (
                                        <a 
                                            key={resource.name}
                                            href="#" 
                                            className="group flex items-center space-x-3 p-3 bg-white/70 backdrop-blur-sm rounded-2xl hover:shadow-lg transition-all duration-300 animate-slideInUp"
                                            style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                                        >
                                            <div className={`bg-gradient-to-r ${resource.color} text-white p-2 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                                                <resource.icon className="h-4 w-4" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 flex-1">
                                                {resource.name}
                                            </span>
                                            <span className="text-gray-400 group-hover:text-gray-600 transition-colors duration-300">
                                                →
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div> */}

                            {/* Newsletter */}
                            {/* <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-6 border border-purple-100 animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
                                <div className="text-center">
                                    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-3 rounded-2xl w-fit mx-auto mb-4">
                                        <MessageCircle className="h-6 w-6" />
                                    </div>
                                    <h4 className="font-bold text-gray-800 mb-2">¡Mantente informado!</h4>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Recibe las últimas noticias de la UGEL directamente en tu correo
                                    </p>
                                    <div className="space-y-3">
                                        <input
                                            type="email"
                                            placeholder="tu@email.com"
                                            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                                        />
                                        <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-2xl font-medium hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                                            Suscribirse
                                        </button>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes fadeInRight {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.8s ease-out forwards;
                }

                .animate-slideInLeft {
                    animation: slideInLeft 0.8s ease-out forwards;
                }

                .animate-slideInRight {
                    animation: slideInRight 0.8s ease-out forwards;
                }

                .animate-slideInUp {
                    animation: slideInUp 0.6s ease-out forwards;
                }

                .animate-slideDown {
                    animation: slideDown 0.3s ease-out forwards;
                }

                .animate-fadeInLeft {
                    animation: fadeInLeft 0.6s ease-out forwards;
                }

                .animate-fadeInRight {
                    animation: fadeInRight 0.6s ease-out forwards;
                }

                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .prose h2 {
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: #1f2937;
                    margin: 2rem 0 1rem 0;
                    background: linear-gradient(135deg, #3b82f6, #6366f1);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .prose ul {
                    margin: 1.5rem 0;
                    padding-left: 1.5rem;
                }

                .prose li {
                    margin: 0.75rem 0;
                    line-height: 1.7;
                    position: relative;
                }

                .prose li::before {
                    content: '▶';
                    color: #3b82f6;
                    position: absolute;
                    left: -1.5rem;
                    font-size: 0.8rem;
                }

                .prose strong {
                    font-weight: 600;
                    background: linear-gradient(135deg, #1f2937, #4b5563);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .prose p {
                    margin: 1.5rem 0;
                    line-height: 1.8;
                    text-align: justify;
                }

                .prose em {
                    font-style: italic;
                    color: #6b7280;
                    background: #f3f4f6;
                    padding: 0.125rem 0.25rem;
                    border-radius: 0.25rem;
                }

                ::-webkit-scrollbar {
                    width: 8px;
                }

                ::-webkit-scrollbar-track {
                    background: #f1f5f9;
                    border-radius: 4px;
                }

                ::-webkit-scrollbar-thumb {
                    background: linear-gradient(135deg, #3b82f6, #6366f1);
                    border-radius: 4px;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(135deg, #2563eb, #4f46e5);
                }
            `}</style>
        </div>
    );
};

export default ArticleDetailPage;