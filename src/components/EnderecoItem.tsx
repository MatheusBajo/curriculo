// components/EnderecoItem.tsx
import { SensitivePart } from '@/components/SensitivePart';

type EnderecoItemProps = {
    publico: string;        // "Osasco, SP"
    privado: string;        // "R. José Salvador Pazzobom, 345 - Jaguaribe, Osasco, SP - 06050-070"
};

export function EnderecoItem({ publico, privado }: EnderecoItemProps) {
    // quebra o endereço completo na parte antes e depois do trecho público
    const [antes, depois = ''] = privado.split(publico);

    return (
        <>
            <SensitivePart>{antes}</SensitivePart>
            {publico}      {/* sempre visível */}
            <SensitivePart>{depois}</SensitivePart>
        </>
    );
}