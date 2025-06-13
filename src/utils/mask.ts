// utils/mask.ts
export const mask = (valor: string, tipo: 'curto' | 'longo' = 'curto') =>
    tipo === 'curto'
        ? '*******'                      // seis bullets
        : valor.replace(/./g, '*');     // mesmo comprimento

export const blurRest = (pub: string, completo: string) =>
    completo.startsWith(pub) ? completo.slice(pub.length) : ' ••• ';

// src/utils/mask.ts
export const getResto = (pub: string, full: string) => {
    const i = full.toLowerCase().indexOf(pub.toLowerCase());
    if (i === -1) return full;                 // não achou? devolve tudo
    return (full.slice(0, i) + full.slice(i + pub.length)).trim();
};

