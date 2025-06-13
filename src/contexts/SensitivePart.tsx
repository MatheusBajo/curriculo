// components/SensitivePart.tsx
import { Spoiler } from 'spoiled';
import { useSensitive } from '../contexts/SensitiveContext';

/**
 * Exibe o children com “censura estilo Telegram”.
 * Quando visivel=true o conteúdo fica totalmente limpo;
 * quando visivel=false o Spoiler cobre tudo.
 */
export function SensitivePart({ children }: { children: React.ReactNode }) {
    const { visivel } = useSensitive();

    return (
        <Spoiler                 // nuvem de partículas
            hidden={!visivel}      // controla pelo toggle
            revealOn="click"       // o click do usuário tira a nuvem se quiser
            fps={24}               // performance ok até em notebook fraco
            density={0.05}         // não exagere na densidade
        >
            {children}
        </Spoiler>
    );
}