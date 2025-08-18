import type { ReactNode } from "react";

interface ServiceCardProps {
    icon: ReactNode;
    title: string;
    description: string;
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
    return (
        <a href="#" className="min-h-40">
            <div className="h-full border-2 border-green-600 p-4 rounded-2xl text-center hover:shadow-md hover:scale-105 transition-all duration-300">
                <div className="text-4xl text-green-600 mb-2 flex justify-center items-center h-12 w-12 rounded-full mx-auto">
                    {icon}
                </div>
                <h3 className="text-xl font-bold text-gray-600 leading-none mb-2">{title}</h3>
                <p className="text-xs text-gray-600">{description}</p>
            </div>
        </a>
    );
}