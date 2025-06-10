// Aside.tsx
import {useEffect, useRef} from "react";
import { gsap } from 'gsap'
import SplitText from 'gsap/SplitText'
import ReactMarkdown from 'react-markdown'
import resume from '../data/resume.json'
import type { ResumeData } from '../utils/types'

export type Variant = 'secure' | 'clean';
export default function Aside({ variant }: { variant: Variant }) {
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

                // 2) <p>: linhas mascaradas sobem (de oculto para visível)
                const p = section.querySelector<HTMLElement>("p");
                if (p) {
                    const splitP = new SplitText(p, {
                        type: "lines",
                        linesClass: "gsap-line"
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
            {variant === 'secure' && (
                <header className="w-full flex min-h-[220px] items-center justify-center">
                    <img
                        src={import.meta.env.BASE_URL + data.profilePicture}
                        alt="Foto de perfil"
                        className="size-[150px] rounded-full border-[6px] border-white shadow-2xl"
                    />
                </header>
            )}
            <div className="flex flex-col gap-6 px-6 overflow-y-hidden">
                {data.sections.map(sec => {
                    if (variant === 'secure' && sec.title === 'Contato' && sec.list) {
                        sec = { ...sec, list: sec.list.filter(item => item.label !== 'WhatsApp') };
                    }
                    return (
                        <section key={sec.title}>
                        <h2 className={sec.title === 'Hobbies e Interesses' ? 'text-lg font-extrabold uppercase' : ''}>{sec.title}</h2>
                        {sec.paragraph && (
                            <ReactMarkdown
                                components={{
                                    p: ({...props}) => (
                                        <p
                                            className={sec.title === 'Hobbies e Interesses' ? 'text-[9pt] font-medium leading-snug text-justify' : ''}
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
                            <ul className="">
                                {sec.list.map(item => (
                                    <li key={item.label}>
                                        <strong>{item.label}:</strong>{' '}
                                        {item.url ? (
                                            <a
                                                className="underline print:no-underline text-blue-300 print:text-white/90"
                                                href={item.url}
                                                target="_blank"
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            item.value
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                ))}


            </div>
        </aside>
    );
}