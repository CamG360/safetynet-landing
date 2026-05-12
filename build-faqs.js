#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FAQ_JSON_PATH = path.join(__dirname, 'data', 'faq.json');
const INDEX_HTML_PATH = path.join(__dirname, 'index.html');

const slugify = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function qHTML(q, categoryId){return `\n<div class="faq-item bg-white rounded-xl border border-slate-200 p-6" data-category="${categoryId}" data-faq-id="${q.id}">\n<button class="faq-question w-full flex justify-between items-center text-left" aria-expanded="false"><h3 class="text-lg font-bold text-slate-900 pr-8">${q.question}</h3><i data-lucide="chevron-down" class="w-5 h-5 text-slate-400 faq-icon flex-shrink-0"></i></button><div class="faq-answer text-slate-600 leading-relaxed">${q.answer}</div></div>`;}
function sectionHTML(c){const hid=slugify(c.Category_Title);return `\n<section class="faq-category-section space-y-4" data-category-group="${c.Category_ID}" aria-labelledby="faq-heading-${hid}">\n<h3 id="faq-heading-${hid}" class="faq-category-heading text-2xl font-bold text-slate-900 pt-2">${c.Category_Title}</h3>${c.Questions_Array.map(q=>qHTML(q,c.Category_ID)).join('')}\n</section>`;}

const data=JSON.parse(fs.readFileSync(FAQ_JSON_PATH,'utf8'));
const cats=data.faq_categories;
const tabs=['<button class="faq-category-btn active px-4 py-2 rounded-full text-sm font-semibold transition-all" data-category="all" aria-pressed="true">All</button>',...cats.map(c=>`<button class="faq-category-btn px-4 py-2 rounded-full text-sm font-semibold transition-all" data-category="${c.Category_ID}" aria-pressed="false">${c.Category_Title}</button>`)].join('\n                ');
const sections=cats.map(sectionHTML).join('\n            ');
let html=fs.readFileSync(INDEX_HTML_PATH,'utf8');
html=html.replace(/<div id="faq-category-tabs"[\s\S]*?<\/div>/,`<div id="faq-category-tabs" class="flex flex-wrap justify-center gap-2 mb-8">\n                ${tabs}\n            </div>`);
html=html.replace(/<div id="faq-container"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,`<div id="faq-container" class="space-y-10" role="region" aria-label="Frequently asked questions by category">\n            ${sections}\n            </div>\n        </div>\n    </div>`);
fs.writeFileSync(INDEX_HTML_PATH,html);
console.log('FAQ build done');
