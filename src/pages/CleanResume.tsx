import resume from '../data/resume.json'
import type { ResumeData } from '../utils/types'
import { CERTIFICADOS } from '../utils/certificates'

export default function CleanResume() {
    const data = resume as ResumeData
    const personal = data.aside.sections.find(s => s.title === 'Detalhes Pessoais')
    const contact = data.aside.sections.find(s => s.title === 'Contato')
    const summary = data.aside.sections.find(s => s.title === 'Sobre Mim')

    return (
        <article className="w-[210mm] mx-auto p-6 font-sans text-black text-[10pt]">
            <header className="mb-4">
                <h1 className="text-[14pt] font-bold">
                    {data.main.header.nameLines.flat().join(' ')}
                </h1>
                <p className="text-[12pt]">{data.main.header.role.join(' ')}</p>
                <ul className="text-[10pt]">
                    {personal?.list?.map(item => (
                        <li key={item.label}><strong>{item.label}:</strong> {item.value}</li>
                    ))}
                    {contact?.list?.filter(i => i.label !== 'WhatsApp').map(item => (
                        <li key={item.label}><strong>{item.label}:</strong> {item.value}</li>
                    ))}
                </ul>
            </header>

            {summary && (
                <section className="mb-4">
                    <h2 className="text-[12pt] font-bold">Resumo Profissional</h2>
                    <p>{summary.paragraph}</p>
                </section>
            )}

            <section className="mb-4">
                <h2 className="text-[12pt] font-bold">Competências Técnicas</h2>
                <ul className="list-disc pl-4">
                    {data.main.skills.map(s => (
                        <li key={s.label}>{s.label}</li>
                    ))}
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-[12pt] font-bold">Experiência Profissional</h2>
                {data.main.experiences.slice(0,4).map(exp => (
                    <div key={exp.code} className="mb-2">
                        <p className="font-bold">{exp.title} - {exp.code}</p>
                        <p className="italic">{exp.period} | {exp.location}</p>
                        <p>{exp.paragraph}</p>
                    </div>
                ))}
            </section>

            <section className="mb-4">
                <h2 className="text-[12pt] font-bold">Projetos ou Certificações</h2>
                <ul className="list-disc pl-4">
                    {CERTIFICADOS.map(c => (
                        <li key={c.src}>{c.titulo}</li>
                    ))}
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-[12pt] font-bold">Idiomas</h2>
                <p>Português (nativo)</p>
            </section>
        </article>
    )
}
