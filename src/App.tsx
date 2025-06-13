import Aside from './pages/Aside';
import Main  from './pages/Main';
import { PAGE_W, PAGE_H } from './utils/pageConstants';
import FittedPdf from './FittedPdf';
import { CERTIFICADOS } from './utils/certificates';
import './utils/pdfWorker';
import {useEffect, useState} from "react";
import { gsap } from 'gsap'
import CleanResume from './pages/CleanResume';
import ToggleSensitive from "./components/ToggleSensitive.tsx";
import {Button} from "./components/ui/button.tsx";


export default function App() {
    // Detecta a rota inicial baseada no pathname
    const [clean, setClean] = useState(() => {
        return window.location.pathname.includes('/clean');
    });

    // Atualiza a URL e o estado quando clica no botão
    const toggleLayout = () => {
        const newClean = !clean;
        setClean(newClean);

        // Atualiza a URL
        const newPath = newClean ? '/curriculo/clean' : '/curriculo/';
        window.history.pushState({}, '', newPath);
    };

    useEffect(() => {
        // Listener para mudanças de navegação (botões voltar/avançar)
        const handlePopState = () => {
            setClean(window.location.pathname.includes('/clean'));
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

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

            <div className="fixed top-2 right-2 z-50 flex gap-2 print:hidden">
                <Button
                    id="button-layout"
                    variant="outline"
                    className="!bg-foreground !text-background hover:!bg-[#1a2e35]"
                    onClick={toggleLayout}
                >
                    {clean ? 'Layout Original' : 'Versão ATS'}
                </Button>
                <ToggleSensitive/>
            </div>


            {/* Currículo */}
            <section
                className="flex justify-center items-stretch
                   w-full md:w-dvw
                   h-auto   md:h-dvh
                   max-w-100dvw max-h-dvh
                   print:break-after-page"
            >
                <svg
                    className="w-full h-auto md:h-full"
                    viewBox={`0 0 ${PAGE_W} ${PAGE_H}`}
                    preserveAspectRatio="xMidYMid meet"
                >
                    <foreignObject x="0" y="0" width={PAGE_W} height={PAGE_H}>
                        <div
                            xmlns="http://www.w3.org/1999/xhtml"
                            className="page flex w-full h-full bg-white"
                        >
                            {clean ? (
                                <CleanResume />
                            ) : (
                                <>
                                    <Aside />
                                    <Main />
                                </>
                            )}
                        </div>
                    </foreignObject>
                </svg>
            </section>

            {/* Certificados - apenas no layout original */}
            {!clean && CERTIFICADOS.map(cert => (
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