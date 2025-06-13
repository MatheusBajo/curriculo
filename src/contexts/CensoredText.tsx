// src/components/CensoredText.tsx
import React from 'react';

interface CensoredTextProps {
    text: string;
    className?: string;
}

export const CensoredText: React.FC<CensoredTextProps> = ({ text, className = '' }) => {
    return (
        <span
            className={`
                relative inline-block
                bg-white/10 dark:bg-white/5
                rounded px-1
                select-none
                transition-all duration-300
                hover:bg-white/15 dark:hover:bg-white/10
                cursor-not-allowed
                ${className}
            `}
        >
            {/* Texto invisível para manter o tamanho */}
            <span className="invisible">{text}</span>

            {/* Texto borrado */}
            <span
                className="
                    absolute inset-0 px-1
                    text-gray-400 dark:text-gray-600
                    blur-md
                    opacity-70
                    pointer-events-none
                "
                aria-hidden="true"
            >
                {text}
            </span>

            {/* Overlay */}
            <span
                className="
                    absolute inset-0
                    bg-black/20 dark:bg-black/40
                    backdrop-blur-sm
                    rounded
                    pointer-events-none
                "
            />
        </span>
    );
};

// Uso no componente Aside.tsx
// Importe o componente e substitua os spans com className="censored" por:
// <CensoredText text={parts.before} />
// <CensoredText text={resto} />
// <CensoredText text={privFull} />