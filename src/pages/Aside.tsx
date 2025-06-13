// Aside.tsx - Solução 1: Adicionar configurações ao SplitText
import {useEffect, useRef} from "react";
import { gsap } from 'gsap'
import SplitText from 'gsap/SplitText'
import ReactMarkdown from 'react-markdown'
import resume from '../data/resume.json'
import type { ResumeData } from '../utils/types'
import {useSensitive} from "../contexts/SensitiveContext.tsx";
import {mask} from "../utils/mask.ts";

export default function Aside() {
    const { visivel } = useSensitive();                        // ← usa aqui
    const asideRef = useRef<HTMLElement>(null);
    const data: ResumeData['aside'] = (resume as ResumeData).aside;

    useEffect(() => {
        if (!asideRef.current) return;
        gsap.registerPlugin(SplitText);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            const sections = asideRef.current!.querySelectorAll<HTMLElement>("section");

            sections.forEach(section => {
                // 1) h2: words slide from right + barra cresce
                const h2 = section.querySelector<HTMLElement>("h2");
                if (h2) {
                    const splitH2 = new SplitText(h2, {
                        type: "words",
                        wordsClass: "gsap-word"
                    });
                    tl.from(splitH2.words, {
                        x: 50,
                        autoAlpha: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        stagger: 0.1
                    })
                        .to(h2, {
                            "--bar-scale": 1,
                            duration: 0.8,
                            ease: "power3.out"
                        }, "<");
                }

                // 2) <p>: SOLUÇÃO - Adicionar configurações para preservar elementos inline
                const p = section.querySelector<HTMLElement>("p");
                if (p) {
                    // Opção 1: Configurar o SplitText para não quebrar em elementos inline
                    const splitP = new SplitText(p, {
                        type: "lines",
                        linesClass: "gsap-line",
                        // Preserva elementos inline como <strong>
                        tag: "div",
                        // Força o SplitText a respeitar a largura do container
                        position: "relative"
                    });

                    // Adiciona classe para controlar overflow
                    splitP.lines.forEach(line => {
                        line.style.whiteSpace = "normal";
                        line.style.overflow = "visible";
                    });

                    // define estado inicial oculto
                    gsap.set(splitP.lines, {
                        yPercent: 100,
                        autoAlpha: 0,
                        zIndex: (i, _, arr) => arr.length - i
                    });
                    // anima para visível
                    tl.to(splitP.lines, {
                        yPercent: 0,
                        autoAlpha: 1,
                        duration: 0.4,
                        ease: "power3.out",
                        stagger: 0.1
                    }, "-=0.8");
                }

                // 3) <ul>: itens sobem um a um (mesma lógica do <p>)
                const ul = section.querySelector<HTMLElement>("ul");
                if (ul) {
                    const items = ul.querySelectorAll<HTMLElement>("li");
                    gsap.set(items, {
                        yPercent: 100,
                        autoAlpha: 0,
                        zIndex: (i, _, arr) => arr.length - i
                    });
                    tl.to(items, {
                        yPercent: 0,
                        autoAlpha: 1,
                        duration: 0.2,
                        ease: "power3.out",
                        stagger: 0.1
                    }, "-=0.8");
                }
            });
        }, asideRef.current);

        return () => ctx.revert();
    }, []);

    return (
        <aside
            ref={asideRef}
            className="w-[30%] bg-[#1a2e35] flex flex-col items-center overflow-visible"
        >
            <header className="w-full flex min-h-[220px] items-center justify-center">
                <img
                    src={import.meta.env.BASE_URL + data.profilePicture}
                    alt="Foto de perfil"
                    className="size-[150px] rounded-full border-[6px] border-white shadow-2xl"
                />
            </header>
            <div className="flex flex-col gap-5 w-[80%] ">
                {data.sections.map(sec => (
                    <section key={sec.title}>
                        <h2 className={sec.title}>{sec.title}</h2>
                        {sec.paragraph && (
                            <ReactMarkdown
                                components={{
                                    p: ({...props}) => (
                                        <p
                                            className={sec.title}
                                            {...props}
                                        />
                                    ),
                                    strong: ({...props}) => <strong className="font-bold" {...props} />,
                                }}
                            >
                                {sec.paragraph}
                            </ReactMarkdown>
                        )}
                        {sec.list && (
                            <ul>
                                {sec.list.map((it, idx) => {
                                    if (it.private && !visivel) return null

                                    const texto = visivel
                                        ? it.private?.value ?? it.value ?? ''
                                        : it.value ?? ''

                                    if (!texto) return null

                                    const mostrarLink = !!it.url

                                    return (
                                        <li
                                            key={it.label || idx}
                                            style={mostrarLink ? {
                                                whiteSpace: 'nowrap',
                                                overflow: 'visible',
                                                position: 'relative'
                                            } : undefined}
                                        >
                                            {it.label && (
                                                <strong>
                                                    {it.label}:{' '}
                                                </strong>
                                            )}

                                            {mostrarLink ? (
                                                <a
                                                    href={it.url}
                                                    className="text-blue-300 hover:text-blue-200 print:text-white underline"
                                                >
                                                    {texto}
                                                </a>
                                            ) : (
                                                texto
                                            )}
                                        </li>
                                    )
                                })}
                            </ul>
                        )}

                    </section>
                ))}
            </div>
        </aside>
    );
}