# Contexto — Huntly (huntly.com.br)

Atualizado em 2026-11-13. Toda informação abaixo tem a fonte ao lado. Arquivos citados ficam em `huntly-site-v44/huntly-site/huntlysitev58/` (raiz servida pelo Vercel via rewrite em `/vercel.json`).

## Configuração do autopilot

```
Site:          https://www.huntly.com.br
Product:       Consultoria brasileira de recrutamento e seleção (Executive Search, Recrutamento Especializado e RPO) para empresas médias e grandes que precisam contratar liderança, especialistas ou alto volume.
Conversion:    formulário de contato de cliente enviado (evento GA4 generate_lead) ou clique em WhatsApp/e-mail/telefone
Competitors:   Robert Half, Michael Page / Page Executive, Korn Ferry, Randstad (Sourceright), Stanton Chase; diretório/marketplace oHub domina as SERPs comerciais
Ship mode:     PR for review (main faz deploy automático no Vercel)
```

## Stack do site

- HTML estático, uma página = um arquivo `.html` com CSS inline; sem build, sem lint. Fonte: estrutura do repo.
- `cleanUrls: true` — URLs sem `.html`. Fonte: `/vercel.json`.
- Raiz pública = `huntly-site-v44/huntly-site/huntlysitev58/` via `rewrites`. A pasta `seo/` na raiz do repo NÃO é servida. Fonte: `/vercel.json`.
- Sitemap: `sitemap.xml`; robots libera tudo; `llms.txt` existe. Fonte: arquivos homônimos.
- Formulários via Formspree (`mgobnwbr`, mesmo ID para cliente e recrutador). Fonte: `index.html` e comentários HTML nas páginas.
- GA4 `G-K1DBR8B7FJ` com consentimento LGPD; eventos generate_lead, cadastro_recrutador, contato_whatsapp/email/telefone. Fonte: `analytics.js`.
- Nova página: copiar o `<head>`, `<nav>`, `<footer>` e scripts de `huntly-recrutamento-varejo-atacado.html`; trocar title, description, canonical, og/twitter, JSON-LD (Service + BreadcrumbList); adicionar ao sitemap, ao rodapé de todas as páginas e ao `llms.txt`.

## Empresa

- Razão social Huntly Recrutamento Digital Ltda. (antes Headhunters Recrutamento Digital); fundação 2019-05-23; marca relançada em 2020. Fonte: JSON-LD de `index.html`, `llms.txt`, `huntly-quem-somos.html`.
- Fundador e CEO: Renato Trindade. Fonte: `huntly-quem-somos.html`.
- Sede: Barueri/SP; atende todo o Brasil. Fonte: JSON-LD de `index.html`.
- Contato: atendimento@huntly.com.br · +55 11 96843-8287. Fonte: `index.html`.
- LinkedIn: https://www.linkedin.com/company/huntlyoficial. Fonte: rodapé.
- Não confundir com Huntly.ai (recrutamento tech internacional). Fonte: `llms.txt`.

## Serviços (o que se vende)

- Executive & Board Search — C-level, VPs, diretoria executiva, conselho; processo confidencial em etapas (briefing, perfil da posição, mapeamento confidencial, busca ativa…). Fonte: `huntly-executive-search.html`.
- Recrutamento Especializado — posições técnicas e média gestão; 20+ segmentos. Fonte: `huntly-recrutamento-especializado.html`.
- RPO Estratégico — terceirização do recrutamento em alto volume; relatórios semanais, KPIs (time-to-fill, custo por contratação, aderência), governança. Fonte: `huntly-rpo.html`.
- Segmento Varejo & Atacado (RPO + Especializado + contratação afirmativa PCD). Fonte: `huntly-recrutamento-varejo-atacado.html`.
- Shortlist de 3 a 5 profissionais na curadoria executiva. Fonte: `index.html`.

## Números publicados (usar só estes, sempre como estão no site)

- 92% de clientes recorrentes; +40k candidatos avaliados; 20+ segmentos. Fonte: `index.html`.
- RPO: 3x mais rápido que o recrutamento interno; +8.000 admissões; +40.000 candidatos enviados. Fonte: `huntly-rpo.html`.
- Case meios de pagamento: +1.500 posições comerciais; +2.600 candidatos mapeados. Fonte: `huntly-rpo.html#case-cielo`.
- Case energia: ~70 posições core em 4 meses, +3.000 mapeados, +30 recrutadores. Fonte: `huntly-rpo.html#case-edp`.
- Case PCD atacado e varejo: +700 posições afirmativas; +200 candidatos PCD mapeados; diversas áreas e níveis. Fonte: `huntly-rpo.html#case-atacadao`.
  - **EM REVISÃO (2026-11-13):** os dois números não fecham (200 candidatos para 700 vagas, com conversão real de ~1 contratação a cada 11 encaminhados). Não usar o "+200" em conteúdo novo até a dona confirmar vagas trabalhadas, candidatos encaminhados, contratações e período.
- Cases Recrutamento Especializado: Tenda, Odontoprev, Nivea. Fonte: `huntly-recrutamento-especializado.html#cases`.
- Logos de clientes exibidos: Cielo, Atacadão, BMG, EDP, Newave, NIVEA, Decathlon, GWM, Algar, Banco PAN, Dasa, Sinqia, Odontoprev, Track & Field, Bracell, Coop. Fonte: `index.html`.

## Fatos externos usados nas páginas

- Lei de Cotas (art. 93 da Lei 8.213/1991): empresas com 100+ empregados; 100–200 → 2%; 201–500 → 3%; 501–1.000 → 4%; 1.001+ → 5%. Fonte: https://www.planalto.gov.br/ccivil_03/leis/l8213cons.htm (conferido em 2026-11-13 via TJDFT e LegJur).

## Concorrentes e paisagem de busca (2026-11-13, busca web)

- "Huntly recrutamento": huntly.com.br não aparece no topo; resultados são Huntly.ai (Notion, casestudies.com), clube de futebol escocês e um diretório (JobMentis) que descreve a Huntly como "staffing agency". Problema de marca.
- SERPs comerciais ("melhores consultorias de recrutamento e seleção", "empresa de RPO", "recrutamento PCD"): dominadas por oHub (marketplace/diretório), Korn Ferry, Randstad Sourceright, Robert Half, Gupy/Flash/Sólides (blogs de software de RH).
- Executive Search SP: Robert Half, Page Executive, Stanton Chase, Signium, Keller, Talentor, FS Executive Search.
- Referência de "ranking desejado" em IA (definida pela dona): Robert Half, Hays, Korn Ferry, Spencer Stuart, Michael Page, Foursales.

## Fontes de dados

- Google Search Console: verificado (meta tag em `index.html`), mas SEM conector nesta sessão → posições, cliques e indexação "não verificados".
- GA4: instalado, sem conector → conversões "não verificadas".
- Ferramenta de volume de busca (Ahrefs/Semrush): nenhuma conectada → volumes "n/d".
- Busca web: disponível.
