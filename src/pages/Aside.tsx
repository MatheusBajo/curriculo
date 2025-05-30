// Aside.tsx
import {useEffect, useRef} from "react";
import { gsap } from 'gsap'
import SplitText from 'gsap/SplitText'

export default function Aside() {
    const asideRef = useRef<HTMLElement>(null);

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
            <header className="w-full flex min-h-[220px] items-center justify-center">
                <img
                    src={import.meta.env.BASE_URL + "/perfil-picture.png"}
                    alt="Foto de perfil"
                    className="size-[150px] rounded-full border-[6px] border-white shadow-2xl"
                />
            </header>
            <div className="flex flex-col gap-6 px-6 overflow-y-hidden">

                {/* Sobre Mim */}
                <section>
                    <h2 className="">Sobre Mim</h2>

                    <p className="">
                        Graduando em <strong>Análise e Desenvolvimento de Sistemas</strong> (UAM) e formado em
                        <strong> Técnico em Informática</strong>. Dedico-me principalmente a
                        <strong> Java/Spring/JavaFX</strong>, <strong>React com TypeScript & Tailwind</strong>,
                        criando desde aplicações desktop a sistemas e sites completos.
                        Sou curioso, colaborativo e sempre procuro agregar valor onde atuo, compartilhando conhecimento
                        e, mantendo a mente aberta
                        para novas experiências e ideias.
                    </p>
                </section>


                {/* Detalhes Pessoais */}
                <section>
                    <h2 className="">
                        Detalhes Pessoais
                    </h2>
                    <ul className="">
                        <li><strong>Nome:</strong> Matheus Yoshiro de Santana Bajo</li>
                        <li><strong>End.:</strong> R. José Salvador Pazzobom, 345 - Jaguaribe, Osasco, SP - 06050-070
                        </li>
                        <li><strong>Nacionalidade:</strong> Brasileiro, Natural de São Paulo</li>
                        <li><strong>Estado Civil:</strong> Solteiro</li>
                        <li><strong>Gênero:</strong> Masculino</li>
                        <li><strong>Data de Nascimento:</strong> 24/01/2007</li>
                    </ul>
                </section>

                {/*Contato*/}
                <section>
                    <h2 className="">
                        Contato
                    </h2>
                    <ul>
                        <li><strong>WhatsApp:</strong> <a
                            className="underline print:no-underline text-blue-300 print:text-white/90"
                            href="https://wa.me/5511954139973" target="_blank">(11) 9 5413-9973</a></li>
                        <li><strong>E-mail:</strong> <a
                            className="underline print:no-underline text-blue-300 print:text-white/90"
                            href="mailto:matheusbajo@gmail.com">matheusbajo@gmail.com</a></li>
                        <li><strong>Instagram:</strong> <a
                            className="underline print:no-underline text-blue-300 print:text-white/90"
                            href="https://www.instagram.com/yoshiro_.bajo" target="_blank">@yoshiro_.bajo</a></li>
                        <li><strong>LinkedIn:</strong> <a
                            className="underline print:no-underline text-blue-300 print:text-white/90"
                            href="https://www.linkedin.com/in/matheusbajo" target="_blank">Matheus Bajo</a></li>
                        <li><strong>GitHub:</strong> <a
                            className="underline print:no-underline text-blue-300 print:text-white/90"
                            href="https://github.com/MatheusBajo" target="_blank">MatheusBajo</a></li>
                    </ul>
                </section>

                {/* Hobbies e Interesses */}
                <section>
                    <h2 className="text-lg font-extrabold uppercase">Hobbies e Interesses</h2>

                    <p className="text-[9pt] font-medium leading-snug text-justify">
                        Apaixonado por esportes: pratico <strong>atletismo</strong> há 6&nbsp;anos e sigo uma rotina de
                        <strong> musculação</strong> há 1&nbsp;ano e meio, sempre alinhada a uma boa alimentação.
                        Curto jogar <strong>futebol</strong> pra relaxar e manter o cárdio em dia. Nas horas livres,
                        toco <strong>violão há 9&nbsp;anos!</strong> Um hobby que continuo aperfeiçoando até hoje.
                    </p>
                </section>


            </div>
        </aside>
    );
}