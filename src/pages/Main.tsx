// Main.tsx
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import {useEffect, useRef} from "react";
import ReactMarkdown from 'react-markdown'
import resume from '../data/resume.json'
import type { ResumeData } from '../utils/types'

export default function Main() {
    const mainRef = useRef<HTMLElement>(null);
    const data: ResumeData['main'] = (resume as ResumeData).main;


    useEffect(() => {
        if (!mainRef.current) return;
        gsap.registerPlugin(SplitText);

        const ctx = gsap.context(() => {

            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });


            /* ---------- HEADER ---------- */
            const h1 = mainRef.current!.querySelector<HTMLElement>("h1");
            if (h1) {
                const sp = new SplitText(h1, { type: "words", wordsClass: "gsap-word" });
                gsap.set(sp.words, { x: 60, autoAlpha: 0 });
                tl.to(sp.words, { x: 0, autoAlpha: 1, duration: 0.3, stagger: 0.1 });
            }

            const subtitle = mainRef.current!.querySelector<HTMLElement>("header p");
            if (subtitle) {
                gsap.set(subtitle, { y: 25, autoAlpha: 0 });
                tl.to(subtitle, { y: 0, autoAlpha: 1, duration: 0.6 }, "-=0.35");
            }

            const contacts = mainRef.current!.querySelectorAll<HTMLElement>("header ul li");
            if (contacts.length) {
                gsap.set(contacts, { yPercent: 60, autoAlpha: 0 });
                tl.to(contacts, { yPercent: 0, autoAlpha: 1, duration: 0.4, stagger: 0.12 }, "-=0.5");
            }

            /* ---------- H2 “Experiência Profissional” ---------- */
            const expH2 = [...mainRef.current!.querySelectorAll<HTMLElement>(".coluna-direita > section > h2")]
                .find(h2 => h2.textContent?.trim() === "Experiência Profissional");
            if (expH2) {
                const sp = new SplitText(expH2, { type: "words", wordsClass: "gsap-word" });
                gsap.set(sp.words, { x: 50, autoAlpha: 0 });
                tl.to(sp.words, { x: 0, autoAlpha: 1, duration: 0.5, stagger: 0.1 }, "-=0.6")
                    .to(expH2, { "--line-scale": 1, borderBottom: 0, duration: 0.8 }, "<");
            }

            /* ---------- EXPERIÊNCIAS (job-row) ---------- */
            const rows = mainRef.current!.querySelectorAll<HTMLElement>(".job-row");
            rows.forEach(row => {
                const line = gsap.timeline();

                /* 1. coluna esquerda */
                const leftPs = row.querySelectorAll<HTMLElement>(".job-left p");
                line.to(leftPs, { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.05 });

                /* 2. borda-left */
                const box = row.querySelector<HTMLElement>(".section-exp");
                if (box) line.to(box, { borderLeftColor: "#e5e7eb", duration: 0.5 }, "-=0.35");

                /* 3. h3 */
                const h3 = row.querySelector<HTMLElement>("h3");
                if (h3) {
                    const spH3 = new SplitText(h3, { type: "words", wordsClass: "gsap-word" });
                    gsap.set(spH3.words, { x: 40, autoAlpha: 0 });
                    line.to(spH3.words, { x: 0, autoAlpha: 1, duration: 0.5, stagger: 0.035 }, "-=0.3");
                }

                /* 4. parágrafo descritivo */
                const para = row.querySelector<HTMLElement>(".section-exp p.text-justify");
                if (para) {
                    const spP = new SplitText(para, { type: "lines", linesClass: "gsap-line" });
                    gsap.set(spP.lines, { yPercent: 100, autoAlpha: 0, zIndex: (i, _, a) => a.length - i });
                    line.to(spP.lines, { yPercent: 0, autoAlpha: 1, duration: 0.4, stagger: 0.08 }, "-=0.5");
                }

                tl.add(line, "-=0.25"); // mantém a ordem global
            });

            /* ---------- QUALIFICAÇÕES ---------- */
            const qualSec = [...mainRef.current!.querySelectorAll<HTMLElement>("section")]
                .find(s => s.textContent?.includes("QUALIFICAÇÕES"));
            if (qualSec) {
                const qH2 = qualSec.querySelector<HTMLElement>("h2");
                if (qH2) {
                    const sp = new SplitText(qH2, { type: "words", wordsClass: "gsap-word" });
                    gsap.set(sp.words, { x: 50, autoAlpha: 0 });
                    tl.to(sp.words, { x: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08 }, "-=0.25")
                        .to(qH2, { "--line-scale": 1, borderBottom: 0, duration: 0.6 }, "<");
                }
                const qP = qualSec.querySelector<HTMLElement>("p.text-justify");
                if (qP) {
                    const sp = new SplitText(qP, { type: "lines", linesClass: "gsap-line" });
                    gsap.set(sp.lines, { yPercent: 100, autoAlpha: 0, zIndex: (i, _, a) => a.length - i });
                    tl.to(sp.lines, { yPercent: 0, autoAlpha: 1, duration: 0.4, stagger: 0.08 }, "-=0.3");
                }
            }

            /* ---------- COMPETÊNCIAS ---------- */
            const skillsSec = [...mainRef.current!.querySelectorAll<HTMLElement>("section")]
                .find(s => s.textContent?.includes("Competências"));
            if (skillsSec) {
                const sH2 = skillsSec.querySelector<HTMLElement>("h2");
                if (sH2) {
                    const sp = new SplitText(sH2, { type: "words", wordsClass: "gsap-word" });
                    gsap.set(sp.words, { x: 50, autoAlpha: 0 });
                    tl.to(sp.words, { x: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08 }, "-=0.25")
                        .to(sH2, { "--line-scale": 1, borderBottom: 0, duration: 0.6 }, "<");
                }

                const skillRows = skillsSec.querySelectorAll<HTMLElement>(".grid > div.flex");
                skillRows.forEach(r => r.classList.add("skills-row"));
                gsap.set(skillRows, { autoAlpha: 0, y: 20 });
                tl.to(skillRows, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.1 }, "-=0.3");

                const bars = skillsSec.querySelectorAll<HTMLElement>(".grid .flex-1 > .h-full");
                gsap.set(bars, { scaleX: 0, transformOrigin: "left center" });
                tl.to(bars, { scaleX: 1, duration: 0.6, stagger: 0.1 }, "-=0.4");
            }

            /* ---------- FOOTER ---------- */
            const footer = mainRef.current!.querySelector<HTMLElement>("footer");
            if (footer) {
                gsap.set(footer, { y: 25, autoAlpha: 0 });
                tl.to(footer, { y: 0, autoAlpha: 1, duration: 0.5 }, "+=0.2");
            }

        }, mainRef.current);

        return () => ctx.revert();
    }, []);




    return (
        <main ref={mainRef} className="coluna-direita flex-1 bg-white flex flex-col px-6 overflow-hidden">
            {/*Cabeçalho: nome, cargo e contatos*/}
            <header className="flex flex-shrink-0 items-center gap-5 w-full min-h-[220px]">
                <div className="flex flex-grow items-center justify-between">
                    <div className="flex flex-col items-start justify-center">
                        <h1 className="font-extrabold uppercase w-full text-primary leading-[1.25]">
                            {data.header.nameLines.map((line, i) => (
                                <div key={i} className={`flex justify-between w-full${i === 0 ? ' gap-3' : ''}`}>
                                    {line.map(part => (
                                        <span className="!text-[18.85pt] text-primary" key={part}>{part}</span>
                                    ))}
                                </div>
                            ))}
                        </h1>

                        <p className="flex justify-between w-full">
                            {data.header.role.map(r => (
                                <span className="!text-[15pt] leading-[1] text-primary tracking-[-0.25px] font-thin uppercase" key={r}>{r}</span>
                            ))}
                        </p>

                    </div>
                    <ul className="flex flex-col h-full divide-y-[1px] divide-primary">
                        {data.header.contacts.map(c => (
                            <li key={c.label} className="flex-1 flex items-center text-primary gap-2">
                                <span className="inline-flex items-center justify-center size-[14px] bg-primary rounded-[2px]">
                                    <img src={import.meta.env.BASE_URL + '/' + c.icon} alt={c.label} className="px-[3px] invert" />
                                </span>
                                <span className="text-[10pt] font-bold">{c.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>


            </header>

            {/* Experiência Profissional */}
            <section className="mb-8">
                <h2 className="">Experiência Profissional</h2>

                <div className="space-y-4">
                    {data.experiences.map(exp => (
                        <div className="flex job-row" key={exp.code}>
                            <div className="w-1/4 text-left pr-2 job-left">
                                <p className="text-sm font-bold text-primary/60 uppercase">{exp.code}</p>
                                <p className="text-xs text-gray-500">{exp.location}</p>
                                <p className="text-xs text-gray-500">{exp.period}</p>
                            </div>
                            <div className="w-3/4 pl-6 border-l-2 border-gray-200 section-exp">

                                <h3 className="font-bold uppercase leading-[1] mb-2">
                                    {exp.title}
                                </h3>
                                <ReactMarkdown
                                    components={{
                                        p: ({...props}) => (
                                            <p className="text-justify font-normal text-[9pt] leading-[1.25]" {...props} />
                                        ),
                                        strong: ({...props}) => <strong className="font-bold" {...props} />,
                                    }}
                                >
                                    {exp.paragraph}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ))}
                </div>
            </section>



            {/* Qualificações */}
            <section className="mb-8">
                <h2 className="text-[16pt] font-bold border-b-2 border-background mb-2 uppercase">
                    QUALIFICAÇÕES
                </h2>

                <ReactMarkdown
                    components={{
                        p: ({...props}) => (
                            <p className="text-justify text-primary font-normal text-[9pt] leading-[1.25]" {...props} />
                        ),
                        strong: ({...props}) => <strong className="font-bold" {...props} />,
                    }}
                >
                    {data.qualifications}
                </ReactMarkdown>

            </section>


            {/* Competências */}
            <section className="mb-8">
                <h2 className="text-[16pt] font-bold border-b-2 border-background mb-4 uppercase">
                    Competências
                </h2>

                <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-[8pt] font-bold">
                    {data.skills.map(({ label, pct }) => (
                        <div key={label} className="flex items-center gap-4">
                            <span className="text-gray-800 font-medium min-w-[110px]">{label}</span>
                            <div className="flex-1 h-2 bg-[#dcdcdc] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#304e58]"
                                    style={{ width: pct }}
                                />
                            </div>
                        </div>
                    ))}

                </div>
            </section>



            <footer className="flex mx-auto h-full items-end p-1">
                <div className="relative b-0 text-center text-gray-500 text-[6pt] mt-4">
                    <p>Currículo atualizado em: {data.footerDate}</p>
                    <p>Desenvolvido por Matheus Bajo</p>
                </div>
            </footer>
        </main>
    );
}