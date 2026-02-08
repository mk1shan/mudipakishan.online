import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from './App';
import { BookOpen, ExternalLink, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MediumArticle {
    title: string;
    pubDate: string;
    link: string;
    guid: string;
    author: string;
    thumbnail: string;
    description: string;
    categories: string[];
}

const MediumArticles = () => {
    const [articles, setArticles] = useState<MediumArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(
                    'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@mudipakishanimayanga'
                );
                const data = await response.json();

                if (data.status === 'ok') {
                    setArticles(data.items);
                } else {
                    setError('Failed to fetch articles');
                }
            } catch (err) {
                setError('Error connecting to Medium API');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Helper to strip HTML tags for preview and limit length
    const getPreview = (html: string) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const text = doc.body.textContent || "";
        return text.length > 150 ? text.substring(0, 150) + "..." : text;
    };

    // Helper to extract first image from content if thumbnail is missing
    const extractImage = (content: string) => {
        const doc = new DOMParser().parseFromString(content, 'text/html');
        const img = doc.querySelector('img');
        return img ? img.src : null;
    };

    return (
        <div className="min-h-screen bg-background text-white pt-24 px-4 sm:px-6 md:px-8 lg:px-20 max-w-7xl mx-auto pb-12">
            <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-accent mb-8 transition-colors font-mono text-sm uppercase tracking-wider">
                ← Back to Home
            </Link>

            <div className="flex items-baseline gap-2 sm:gap-4 mb-8 sm:mb-12 border-b border-white/10 pb-3 sm:pb-4">
                <span className="font-mono text-accent text-xs sm:text-sm">(06)</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-display font-bold uppercase">Writing</h2>
            </div>

            {loading && (
                <div className="flex justify-center items-center py-20 text-white/50 font-mono animate-pulse">
                    Loading articles...
                </div>
            )}

            {error && (
                <div className="text-center py-20 text-red-400 font-mono border border-red-500/20 bg-red-500/5 rounded-lg">
                    {error}. <br />
                    <a href="https://medium.com/@mudipakishanimayanga" target="_blank" rel="noreferrer" className="text-accent underline mt-2 inline-block hover:text-white">
                        View directly on Medium
                    </a>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                    <motion.a
                        key={article.guid}
                        href={article.link}
                        target="_blank"
                        rel="noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group block bg-surface/30 border border-white/10 overflow-hidden hover:border-accent transition-colors duration-300 flex flex-col h-full"
                    >
                        {/* Image Container - maintaining aspect ratio */}
                        <div className="aspect-video w-full overflow-hidden bg-white/5 relative">
                            {article.thumbnail || extractImage(article.description) ? (
                                <img
                                    src={article.thumbnail || extractImage(article.description) || ""}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    onError={(e) => {
                                        // Fallback if image fails to load
                                        (e.target as HTMLImageElement).style.display = 'none';
                                        (e.target as HTMLImageElement).parentElement!.classList.add('flex', 'items-center', 'justify-center');
                                        (e.target as HTMLImageElement).parentElement!.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open text-white/20"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>';
                                    }}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white/20">
                                    <BookOpen size={48} />
                                </div>
                            )}
                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 text-[10px] font-mono text-accent rounded uppercase tracking-wider flex items-center gap-1">
                                Medium <ExternalLink size={10} />
                            </div>
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex items-center gap-4 text-xs font-mono text-white/40 mb-3">
                                <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(article.pubDate)}</span>
                                <span className="flex items-center gap-1"><User size={12} /> {article.author}</span>
                            </div>

                            <h3 className="text-lg sm:text-xl font-display font-bold leading-tight mb-3 group-hover:text-accent transition-colors line-clamp-2">
                                {article.title}
                            </h3>

                            <p className="text-sm text-white/60 font-light leading-relaxed mb-4 line-clamp-3">
                                {getPreview(article.description)}
                            </p>

                            <div className="mt-auto pt-4 border-t border-white/5 flex flex-wrap gap-2">
                                {article.categories.slice(0, 3).map(cat => (
                                    <span key={cat} className="text-[10px] px-2 py-1 bg-white/5 rounded-full text-white/50 group-hover:text-white/80 transition-colors">
                                        #{cat}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.a>
                ))}
            </div>

            {!loading && !error && (
                <div className="mt-12 text-center">
                    <a
                        href="https://medium.com/@mudipakishanimayanga"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-3 border border-white/20 rounded-full hover:bg-accent hover:text-black hover:border-accent transition-all duration-300 font-bold tracking-widest uppercase text-xs"
                    >
                        Read all articles on Medium
                    </a>
                </div>
            )}
        </div>
    );
};

export default MediumArticles;
