import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const baseDir = dirname(fileURLToPath(import.meta.url));
const outputDir = resolve(baseDir, process.env.MAKEFUN_OUTPUT_DIR ?? './output');
const line = 'You cost $3,000, and your smartest feature is telling me the milk I am holding is expired.';
const count = Array.from(line).length;

await mkdir(outputDir, { recursive: true });
await writeFile(resolve(outputDir, 'entry.txt'), line, 'utf8');
const bytes = await readFile(resolve(outputDir, 'entry.txt'));
const writtenLine = bytes.toString('utf8');
const writtenCount = Array.from(writtenLine).length;
console.log(line);
console.log(`Character count: ${count}`);
console.log(`SHA-256: ${createHash('sha256').update(bytes).digest('hex')}`);

if (count < 1 || count > 160 || writtenLine !== line || writtenCount < 1 || writtenCount > 160) {
  process.exitCode = 1;
}

const hasTrailingNewline = writtenLine.endsWith('\n') || writtenLine.endsWith('\r');
console.log(`Trailing newline: ${hasTrailingNewline}`);
console.log(`Word count: ${line.trim().split(/\s+/).length}`);

if (hasTrailingNewline) {
  process.exitCode = 1;
}
