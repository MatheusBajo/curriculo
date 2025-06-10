const fs = require('fs');
const path = require('path');

function readJSON(p){
  return JSON.parse(fs.readFileSync(p,'utf8'));
}

const resume = readJSON(path.join(__dirname,'..','src','data','resume.json'));

function readCertificates(){
  const text = fs.readFileSync(path.join(__dirname,'..','src','utils','certificates.ts'),'utf8');
  const titles = [];
  const regex = /titulo:\s*"([^"]+)"/g;
  let m;
  while((m = regex.exec(text))){
    titles.push(m[1]);
  }
  return titles;
}

const certificates = readCertificates();

function generateHTML({secure=false}={}){
  const {aside, main} = resume;
  const sections = [];

  const header = [];
  const nome = main.header.nameLines.flat().join(' ');
  header.push(`<h1>${nome}</h1>`);
  header.push(`<p>${main.header.role.join(' ')}</p>`);

  const detailsSec = aside.sections.find(s=>s.title==='Detalhes Pessoais');
  if(detailsSec){
    const city = detailsSec.list.find(i=>/cidade/i.test(i.label));
    const nationality = detailsSec.list.find(i=>/nacionalidade/i.test(i.label));
    if(city){
      header.push(`<p>${city.value}</p>`);
    }
    if(nationality){
      header.push(`<p ${secure? 'data-sensitive="true"':''}>${nationality.label}: ${nationality.value}</p>`);
    }
  }

  const contactsSec = aside.sections.find(s=>s.title==='Contato');
  if(contactsSec){
    const list = contactsSec.list.map(it=>{
      const value = it.value.replace(/^(https?:\/\/)?/, '');
      if(secure && (/whatsapp/i.test(it.label) || /e-mail/i.test(it.label))){
        return `<li data-sensitive="true">${it.label}: ${value}</li>`;
      }
      return `<li>${it.label}: ${value}</li>`;
    }).join('');
    header.push(`<ul>${list}</ul>`);
  }
  sections.push(`<section>${header.join('') }</section>`);

  const about = aside.sections.find(s=>s.title==='Sobre Mim');
  if(about){
    sections.push(`<section><h2>Resumo Profissional</h2><p>${about.paragraph}</p></section>`);
  }

  sections.push(`<section><h2>Competências Técnicas</h2><ul>${main.skills.map(s=>`<li>${s.label}</li>`).join('')}</ul></section>`);

  const edu = aside.sections.find(s=>/educa/i.test(s.title||''));
  if(edu){
    const list = edu.list ? edu.list.map(i=>`<li>${i.label?i.label+': ':''}${i.value}</li>`).join('') : edu.paragraph||'';
    sections.push(`<section><h2>Educação</h2>${list}</section>`);
  }

  if(main.experiences && main.experiences.length){
    const exps = main.experiences.slice(0,4).map(e=>`<li><strong>${e.title}</strong> - ${e.code} (${e.period})</li>`).join('');
    sections.push(`<section><h2>Experiência Profissional</h2><ul>${exps}</ul></section>`);
  }

  if(certificates.length){
    sections.push(`<section><h2>Projetos ou Certificações</h2><ul>${certificates.map(t=>`<li>${t}</li>`).join('')}</ul></section>`);
  }

  const langs = aside.sections.find(s=>/idioma/i.test(s.title||''));
  if(langs){
    const list = langs.list ? langs.list.map(i=>`<li>${i.label?i.label+': ':''}${i.value}</li>`).join('') : langs.paragraph||'';
    sections.push(`<section><h2>Idiomas</h2>${list}</section>`);
  }

  const styles = `body{font-family:Arial,Helvetica,Calibri,sans-serif;font-size:11pt;margin:1.5rem;}h1{font-size:14pt;margin:0;}h2{font-size:12pt;margin:1rem 0 0.25rem;}ul{margin:0;padding-left:1rem;}section{margin-bottom:1rem;}`;

  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>Currículo ${secure?'Segura':'Clean'}</title><style>${styles}</style></head><body>${sections.join('')}</body></html>`;
}

function writeFile(name,content){
  const dir = path.join(__dirname,'..','variants');
  if(!fs.existsSync(dir)) fs.mkdirSync(dir);
  fs.writeFileSync(path.join(dir,name),content);
}

writeFile('resume-clean.html', generateHTML());
writeFile('resume-segura.html', generateHTML({secure:true}));

console.log('Arquivos gerados em ./variants');
