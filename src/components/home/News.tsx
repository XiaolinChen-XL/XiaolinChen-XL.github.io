'use client';

import { motion } from 'framer-motion';
import { useMessages } from '@/lib/i18n/useMessages';

export interface NewsItem {
    date: string;
    content: string;
}

interface NewsProps {
    items: NewsItem[];
    title?: string;
}

export default function News({ items, title }: NewsProps) {
    const messages = useMessages();
    const resolvedTitle = title || messages.home.news;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
        >
            <h2 className="academic-section-title">{resolvedTitle}</h2>
            <div className="academic-news-list">
                {items.map((item, index) => (
                    <div key={index} className="academic-news-item">
                        <span className="academic-news-date">{item.date}</span>
                        <p>{item.content}</p>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}
