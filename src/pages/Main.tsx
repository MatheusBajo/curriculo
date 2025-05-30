// Main.tsx
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import {useEffect, useRef} from "react";

export default function Main() {
    const mainRef = useRef<HTMLElement>(null);

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
                <div className="flex flex-grow items-center justify-between ">
                    <div className="flex flex-col items-start justify-center">
                        <h1 className="font-extrabold uppercase w-full text-foreground leading-[1.25]">
                            <div className="flex justify-between w-full text-[18.85pt] gap-3">
                                <span>Matheus</span>
                                <span>Yoshiro</span>
                            </div>
                            <div className="flex justify-between w-full text-[18.85pt]">
                                <span>de</span>
                                <span>Santana</span>
                                <span>Bajo</span>
                            </div>
                        </h1>

                        <p className="flex justify-between w-full text-[16pt] leading-[1] tracking-tight font-thin uppercase">
                            <span>Técnico</span>
                            <span>em</span>
                            <span>Informática</span>
                        </p>

                    </div>
                    <ul className="flex flex-col h-full divide-y-[1px] divide-background">
                        <li className="flex-1 flex items-center gap-2">
                            <span
                                className="inline-flex items-center justify-center size-[14px] bg-background rounded-[2px]">
                              <img src={import.meta.env.BASE_URL + "/linkedin-in-brands.svg"} alt="LinkedIn" className="px-[3px] invert"/>
                            </span>
                            <span className="text-[10pt] font-bold">Matheus Bajo</span>
                        </li>
                        <li className="flex-1 flex items-center gap-2">
                            <span
                                className="inline-flex items-center justify-center size-[14px] bg-background rounded-[2px]">
                              <img src={import.meta.env.BASE_URL + "/envelope-solid.svg"} alt="Email" className="px-[3px] invert"/>
                            </span>
                            <span className="text-[10pt] font-bold">matheusbajo@gmail.com</span>
                        </li>
                        <li className="flex-1 flex items-center gap-2">
                            <span
                                className="inline-flex items-center justify-center size-[14px] bg-background rounded-[2px]">
                              <img src={import.meta.env.BASE_URL + "/whatsapp-brands.svg"} alt="WhatsApp" className="px-[3px] invert"/>
                            </span>
                            <span className="text-[10pt] font-bold">(11) 9 5413-9973</span>
                        </li>
                        <li className="flex-1 flex items-center gap-2">
                            <span
                                className="inline-flex items-center justify-center size-[14px] bg-background rounded-[2px]">
                              <img src={import.meta.env.BASE_URL + "/github-brands.svg"} alt="Instagram" className="px-[3px] invert"/>
                            </span>
                            <span className="text-[10pt] font-bold">MatheusBajo</span>
                        </li>
                    </ul>
                </div>


            </header>

            {/* Experiência Profissional */}
            <section className="mb-8">
                <h2 className="">Experiência Profissional</h2>

                <div className="space-y-4">
                    {/* 1.0 YouTube */}
                    <div className="flex job-row">
                        <div className="w-1/4 text-left pr-2 job-left">
                            <p className="text-sm font-bold text-gray-600 uppercase">1.0 Canal YouTube</p>
                            <p className="text-xs text-gray-500">Online</p>
                            <p className="text-xs text-gray-500">2015 – 2020</p>
                        </div>
                        <div className="w-3/4 pl-6 border-l-2 border-gray-200 section-exp">

                            <h3 className="font-bold uppercase leading-[1] mb-2">
                                Criador de Conteúdo
                            </h3>
                            <p className="text-justify font-normal text-[9pt] leading-[1.25]">
                                Iniciei meu canal de projetos eletrônicos aos <strong>8 anos</strong> (2015) e atingi
                                mais de
                                <strong> 40 mil visualizações</strong> e <strong>900 inscritos</strong>. Essa
                                experiência consolidou minhas
                                habilidades de <strong>roteiro, gravação, edição de vídeo e comunicação</strong>.
                                Encerrei o canal em 2020,
                                mas sigo usando essas técnicas em edições pontuais.
                            </p>

                        </div>
                    </div>

                    {/* 2.0 Locação de Games */}
                    <div className="flex job-row">
                        <div className="w-1/4 text-left pr-2 job-left">
                            <p className="text-sm font-bold text-gray-600 uppercase">2.0 Locação de Games</p>
                            <p className="text-xs text-gray-500">Osasco – São Paulo</p>
                            <p className="text-xs text-gray-500">2019 – Presente</p>
                        </div>
                        <div className="w-3/4 pl-6 border-l-2 border-gray-200 section-exp">

                            <h3 className="font-bold uppercase leading-[1] mb-2 whitespace-nowrap">
                                Desenvolvedor Full Stack / Técnico de TI
                            </h3>
                            <p className="text-justify font-normal text-[9pt] leading-[1.25]">
                                Criei sistema de orçamentos em <strong>JavaFX + MySQL</strong> que
                                reduziu o tempo de <strong>5 min</strong> para <strong>~30s</strong>, gerando até 5 propostas diferentes. Desenvolvi site responsivo em
                                <strong> React TSX + Tailwind + GSAP</strong> e configurei um
                                <strong> servidor</strong> com <strong>Windows Server 2019</strong> e desenvolvi um <strong>sistema</strong> em grupo com <strong>Spring Boot</strong> para melhor controle logístico e
                                financeiro. Ofereço suporte técnico e faço manutenção diária em PCs,
                                redes e fliperamas.
                            </p>
                        </div>
                    </div>

                    {/* 2.1 WeFlying Marketing */}
                    <div className="flex job-row">
                        <div className="w-1/4 text-left pr-2 job-left">
                            <p className="text-sm font-bold text-gray-600 uppercase">2.1 WeFlying</p>
                            <p className="text-xs text-gray-500">Freelancer</p>
                            <p className="text-xs text-gray-500">2024</p>
                        </div>
                        <div className="w-3/4 pl-6 border-l-2 border-gray-200 section-exp">

                            <h3 className="font-bold uppercase leading-[1] mb-2">
                                Desenvolvedor Front End
                            </h3>
                            <p className="text-justify font-normal text-[9pt] leading-[1.25]">
                                Fiz um site para a empresa de marketing <strong>WeFlying</strong> usando <strong>Vite Vanilla + Tailwind</strong>,
                                focando em leads, performance e SEO completo.
                            </p>
                        </div>
                    </div>

                    {/* 2.2 Gleide Fashion Hair */}
                    <div className="flex job-row">
                        <div className="w-1/4 text-left pr-2 job-left">
                            <p className="text-sm font-bold text-gray-600 uppercase">2.2 Gleide Fashion Hair</p>
                            <p className="text-xs text-gray-500">Osasco – São Paulo</p>
                            <p className="text-xs text-gray-500">2024 – Presente</p>
                        </div>
                        <div className="w-3/4 pl-6 border-l-2 border-gray-200 section-exp">

                            <h3 className="font-bold uppercase leading-[1] mb-2">
                                Desenvolvedor Web
                            </h3>
                            <p className="text-justify font-normal text-[9pt] leading-[1.25]">
                                Criei landing page responsiva e dou manutenção básica em HTML, CSS e JavaScript. Auxilio em campanhas de Google Ads.
                            </p>
                        </div>
                    </div>
                </div>
            </section>



            {/* Qualificações */}
            <section className="mb-8">
                <h2 className="text-[16pt] font-bold border-b-2 border-background mb-2 uppercase">
                    QUALIFICAÇÕES
                </h2>

                <p className="text-justify font-normal text-[9pt] leading-[1.25]">
                    Desenvolvedor full stack com ênfase em <strong>Java / Spring Boot </strong>
                    no back-end e <strong>JavaFX, React com TypeScript e Tailwind</strong> no
                    front-end. Experiência com <strong>modelagem MySQL</strong>, APIs REST e
                    versionamento <strong>Git / GitHub</strong>. Conhecimento sólido em
                    <strong> HTML, CSS, JavaScript/TypeScript</strong>. Nos cursos da Alura
                    aprofundei <strong>orientação a objetos</strong> (POO) <strong>em Java</strong>, construção de APIs REST e boas
                    práticas de arquitetura com Spring Boot. Também atuo como gestor de tráfego
                    com noções de <strong>Google Ads</strong> e <strong>Facebook Ads</strong>.
                    <strong> Investidor</strong> ativo em <strong>ações</strong> desde 2020, focado em visão de longo prazo.
                </p>

            </section>


            {/* Competências */}
            {/* Competências */}
            <section className="mb-8">
                <h2 className="text-[16pt] font-bold border-b-2 border-background mb-4 uppercase">
                    Competências
                </h2>

                <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-[8pt] font-bold">
                    {[
                        { label: 'HTML & CSS', pct: 'w-[95%]' },
                        { label: 'Tailwind CSS', pct: 'w-[95%]' },
                        { label: 'React & TypeScript', pct: 'w-[85%]' },
                        { label: 'Java & Spring Boot', pct: 'w-[60%]' },
                        { label: 'Manutenção', pct: 'w-[80%]' },
                        { label: 'Google Ads & SEO', pct: 'w-[50%]' },
                        { label: 'Git / GitHub', pct: 'w-[40%]' },
                        { label: 'MySQL / SQL', pct: 'w-[30%]' },
                    ].map(({ label, pct }) => (
                        <div key={label} className="flex items-center gap-4">
                            <span className="text-gray-800 font-medium min-w-[110px]">{label}</span>
                            <div className="flex-1 h-2 bg-[#dcdcdc] rounded-full overflow-hidden">
                                <div className={`h-full bg-[#304e58] ${pct}`}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>



            <footer className="flex mx-auto h-full items-end p-1">
                <div className="relative b-0 text-center text-gray-500 text-[6pt] mt-4">
                    <p>Currículo atualizado em: 26/05/2025</p>
                    <p>Desenvolvido por Matheus Bajo</p>
                </div>
            </footer>
        </main>
    );
}