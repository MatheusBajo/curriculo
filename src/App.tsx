import Aside from './pages/Aside';
import Main  from './pages/Main';
import { PAGE_W, PAGE_H } from './utils/pageConstants';
import FittedPdf from './FittedPdf';
import { CERTIFICADOS } from './utils/certificates';
import './utils/pdfWorker';
import {useEffect, useState} from "react";          // mantém o worker
import { gsap } from 'gsap'          // coloque no topo de TODO arquivo que use gsap
import CleanResume from './pages/CleanResume';
import type { Variant } from './pages/Aside';


export default function App() {
    const [variant, setVariant] = useState<Variant>('secure');

    useEffect(() => {
        // empurra tudo pro fim e força repaint síncrono
        const finish = () => {
            gsap.globalTimeline.pause().progress(1) // chega a 100 %
            gsap.ticker.flush()                     // aplica estilos imediatamente
        }

        // Chromium
        window.addEventListener('beforeprint', finish)

        // Safari + Firefox
        const mql = window.matchMedia('print')
        const mqHandler = (e: MediaQueryListEvent) => e.matches && finish()
        // addEventListener existe no Chrome 111+, Safari 14.1+, Firefox 103+
        if (mql.addEventListener) {
            mql.addEventListener('change', mqHandler)
        } else {
            mql.addListener(mqHandler)
        }

        return () => {
            window.removeEventListener('beforeprint', finish)
            if (mql.removeEventListener) {
                mql.removeEventListener('change', mqHandler)
            } else {
                mql.removeListener(mqHandler)
            }
        }
    }, [])


    return (
        <main className="flex flex-col gap-2 print:gap-0">
            <div className="fixed top-2 right-2 z-50 flex gap-2">
                <button onClick={() => setVariant('clean')} className="px-2 py-1 bg-white text-black border">Clean</button>
                <button onClick={() => setVariant('secure')} className="px-2 py-1 bg-white text-black border">Segura</button>
            </div>

            {/* Currículo */}
            {variant === 'clean' ? (
                <CleanResume />
            ) : (
                <section
                    className="flex justify-center items-stretch
                   w-full md:w-dvw
                   h-auto   md:h-dvh
                   max-w-100dvw max-h-dvh
                   print:break-after-page"
                >
                    <svg
                        /* largura sempre 100%; altura só cresce acima de md */
                        className="w-full h-auto md:h-full"
                        viewBox={`0 0 ${PAGE_W} ${PAGE_H}`}
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <foreignObject x="0" y="0" width={PAGE_W} height={PAGE_H}>
                            <div
                                xmlns="http://www.w3.org/1999/xhtml"
                                className="page flex w-full h-full bg-white"
                            >
                                <Aside variant={variant} />
                                <Main variant={variant} />
                            </div>
                        </foreignObject>
                    </svg>
                </section>
            )}

            {/* Certificados */}
            {CERTIFICADOS.map(cert => (
                <section
                    key={cert.src}
                    className="flex justify-center items-stretch
                     w-full md:w-dvw
                     h-auto   md:h-dvh
                     max-w-[100dvw] max-h-[100dvh]
                     print:break-after-page"
                >
                    <FittedPdf file={cert.src} />
                </section>
            ))}
        </main>
    );
}
