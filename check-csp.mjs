import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const pages = {
  'dist/index.html': 'layout WITH <slot name="head" /> in <head>',
  'dist/plain/index.html': 'layout WITHOUT named slot in <head>',
};
for (const [file, label] of Object.entries(pages)) {
  const html = readFileSync(file, 'utf8');
  const csp = html.match(/http-equiv="content-security-policy" content="([^"]*)"/i)?.[1] ?? '';
  console.log(label);
  for (const src of ["console.log('layout script');", "console.log('component script');"]) {
    const hash = `sha256-${createHash('sha256').update(src).digest('base64')}`;
    console.log(`  ${csp.includes(hash) ? 'present' : 'MISSING'}  ${src}`);
  }
}
