// CleanResume.tsx – versão ATS-friendly com design centralizado no index.css
import resume from '../data/resume.json'
import type { ResumeData } from '../utils/types'
import { useSensitive } from '../contexts/SensitiveContext.tsx'

export default function CleanResume() {
    const { visivel } = useSensitive()
    const data = resume as ResumeData

    /* -------- helpers -------- */
    const getContactInfo = () => {
        const contacts =
            data.aside.sections.find(s => s.title === 'Detalhes e Contato')?.list || []

        const result: { type: string; value: string; url?: string }[] = []

        /* endereço */
        const endereco = contacts.find(c => c.label === 'End.')
        if (endereco) {
            const texto =
                visivel && endereco.private ? endereco.private.value : endereco.value
            if (texto) result.push({ type: 'address', value: texto })
        }

        /* telefone */
        const telefone = contacts.find(c => c.label === 'Telefone')
        if (telefone) result.push({ type: 'phone', value: telefone.value })

        /* email */
        const email = contacts.find(c => c.label === 'E-mail')
        if (email) result.push({ type: 'email', value: email.value, url: email.url })

        /* LinkedIn */
        const linkedin = contacts.find(c => c.label === 'LinkedIn')
        if (linkedin)
            result.push({
                type: 'linkedin',
                value: linkedin.value,
                url: linkedin.url,
            })

        /* GitHub */
        const github = contacts.find(c => c.label === 'GitHub')
        if (github)
            result.push({ type: 'github', value: github.value, url: github.url })

        return result
    }

    /* remove formatação markdown p/ ATS */
    const cleanMarkdown = (text: string) =>
        text
            .replace(/\*\*([^*]+)\*\*/g, '$1')
            .replace(/_([^_]+)_/g, '$1')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

    /* -------- render -------- */
    return (
        <div className="clean-resume">
            {/* ---------- header ---------- */}
            <header className="clean-header">
                <h1 className="clean-name">
                    {data.main.header.nameLines.flat().join(' ').toUpperCase()}
                </h1>

                <div className="w-20 h-px bg-gray-400 mx-auto mb-2" />

                <p className="clean-role">
                    {data.main.header.role.join(' ')}
                </p>

                <div className="clean-contact-wrap">
                    {getContactInfo().map((c, idx) => (
                        <div key={idx} className="clean-contact">
                            {idx > 0 && <span className="clean-contact-dot">•</span>}
                            {c.url ? (
                                <a href={c.url} className="clean-contact-link">
                                    {c.value}
                                </a>
                            ) : (
                                <span>{c.value}</span>
                            )}
                        </div>
                    ))}
                </div>
            </header>

            {/* ---------- divisor ---------- */}
            <div className="clean-divider">
                <div className="clean-divider-line" />
                <div className="clean-divider-diamond" />
                <div className="clean-divider-line" />
            </div>

            {/* ---------- resumo ---------- */}
            <section className="mb-6">
                <h2 className="clean-section-title">
                    <span className="clean-section-bullet">▪</span>
                    RESUMO PROFISSIONAL
                </h2>
                <p className="clean-paragraph">
                    {cleanMarkdown(
                        data.aside.sections.find(s => s.title === 'Sobre Mim')?.paragraph ||
                        '',
                    )}
                </p>
            </section>

            {/* ---------- experiência ---------- */}
            <section className="mb-6">
                <h2 className="clean-section-title mb-3">
                    <span className="clean-section-bullet">▪</span>
                    EXPERIÊNCIA PROFISSIONAL
                </h2>
                {data.main.experiences.map((exp, idx) => (
                    <div key={idx} className="clean-exp-block">
                        <div className="clean-exp-header">
                            <h3 className="clean-exp-title">{exp.title}</h3>
                            <span className="clean-exp-period">{exp.period}</span>
                        </div>
                        <p className="clean-exp-meta">
                            <span className="font-medium">{exp.code}</span> - {exp.location}
                        </p>
                        <p className="clean-paragraph">
                            {cleanMarkdown(exp.paragraph)}
                        </p>
                    </div>
                ))}
            </section>

            {/* ---------- formação ---------- */}
            <section className="mb-6">
                <h2 className="clean-section-title">
                    <span className="clean-section-bullet">▪</span>
                    FORMAÇÃO E QUALIFICAÇÕES
                </h2>
                <p className="clean-paragraph">
                    {cleanMarkdown(data.main.qualifications)}
                </p>
            </section>

            {/* ---------- skills ---------- */}
            <section className="mb-6">
                <h2 className="clean-section-title">
                    <span className="clean-section-bullet">▪</span>
                    COMPETÊNCIAS TÉCNICAS
                </h2>
                <div className="clean-skills-grid">
                    {data.main.skills.map((skill, idx) => (
                        <div key={idx} className="clean-skill-item">
                            <span className="clean-skill-label">{skill.label}</span>
                            <span className="clean-skill-pct">{skill.pct}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ---------- extras visíveis ---------- */}
            {visivel && (
                <>
                    {/* dados pessoais */}
                    <section className="mb-5">
                        <h2 className="clean-section-title">
                            <span className="clean-section-bullet">▪</span>
                            DADOS PESSOAIS
                        </h2>
                        <div className="pl-4">
                            {data.aside.sections
                                .find(s => s.title === 'Detalhes e Contato')!
                                .list.filter(i =>
                                    ['Idade', 'Nacionalidade', 'Estado Civil'].includes(i.label!),
                                )
                                .map(i => {
                                    const valor = i.private?.value || i.value
                                    return valor ? (
                                        <span key={i.label} className="clean-extra-text">
                      <span className="clean-extra-label">{i.label}:</span>{' '}
                                            {valor}
                    </span>
                                    ) : null
                                })}
                        </div>
                    </section>

                    {/* interesses */}
                    <section className="mb-5">
                        <h2 className="clean-section-title">
                            <span className="clean-section-bullet">▪</span>
                            INTERESSES E ATIVIDADES
                        </h2>
                        <p className="clean-paragraph">
                            {cleanMarkdown(
                                data.aside.sections.find(s => s.title === 'Hobbies e Interesses')
                                    ?.paragraph || '',
                            )}
                        </p>
                    </section>
                </>
            )}

            {/* ---------- rodapé ---------- */}
            <footer className="clean-footer">
                <p className="clean-footer-text">
                    Currículo atualizado em {data.main.footerDate}
                </p>
            </footer>
        </div>
    )
}
