import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const strict = process.argv.includes("--strict");
const extensions = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".json", ".md", ".yml", ".yaml", ".html", ".css", ".env", ".txt", ".xml"]);
const ignored = new Set(["node_modules", ".next", ".git", "dist", "build", "coverage"]);
const selfFiles = new Set(["scripts/privacy-audit.mjs", "SECURITY-AUDIT.md"]);

const rules = [
  { id: "personal-name", severity: "critical", re: /\b(?:Agung|Hermawan|Ahmad\s+Firdaus|Silsilia\s+Raihana|Muhammad\s+Aqso)\b/gi },
  { id: "personal-email", severity: "critical", re: /\b[A-Z0-9._%+-]+@(?:gmail|yahoo|outlook|hotmail)\.[A-Z]{2,}\b/gi },
  { id: "institution-email", severity: "critical", re: /\b[A-Z0-9._%+-]+@(?:customs|beacukai|kemenkeu)\.[A-Z0-9.-]+\b/gi },
  { id: "phone-number", severity: "critical", re: /(?:\+62|\b08)\d[\d\s-]{7,14}\d/g },
  { id: "government-identity", severity: "high", re: /\b(?:Bea\s*Cukai|KPPBC|DJBC|Kementerian\s+Keuangan|Pangkalpinang)\b/gi },
  { id: "developer-username", severity: "high", re: /\bagung3956\b/gi },
  { id: "source-repository", severity: "high", re: /(?:github\.com|raw\.githubusercontent\.com|github\.io)/gi },
  { id: "deployment-domain", severity: "high", re: /(?:vercel\.app|netlify\.app)/gi },
  { id: "legacy-domain", severity: "high", re: /\bwebbcpapin\b/gi },
  { id: "source-credit", severity: "medium", re: /\b(?:Source GitHub|Created by|Developed by|Powered by)\b/gi },
  { id: "google-script", severity: "critical", re: /https?:\/\/script\.google\.com\/macros\/s\//gi },
  { id: "private-key", severity: "critical", re: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g },
  { id: "token-assignment", severity: "critical", re: /\b(?:api[_-]?key|secret|token|password)\s*[:=]\s*["'][^"']{12,}["']/gi },
];

function walk(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (extensions.has(path.extname(entry.name).toLowerCase()) || entry.name.startsWith(".env")) files.push(full);
  }
  return files;
}

const findings = [];
for (const file of walk(root)) {
  const relative = path.relative(root, file).replaceAll("\\", "/");
  if (selfFiles.has(relative)) continue;
  let text;
  try { text = fs.readFileSync(file, "utf8"); } catch { continue; }
  const lines = text.split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    for (const rule of rules) {
      rule.re.lastIndex = 0;
      const matches = [...lines[index].matchAll(rule.re)];
      for (const match of matches) findings.push({ file: relative, line: index + 1, rule: rule.id, severity: rule.severity, match: match[0].slice(0, 120) });
    }
  }
}

const totals = findings.reduce((acc, item) => ({ ...acc, [item.severity]: (acc[item.severity] || 0) + 1 }), {});
console.log(JSON.stringify({ platform: "bece.asia", scannedAt: new Date().toISOString(), totals, findings }, null, 2));
if (strict && findings.some((item) => item.severity === "critical" || item.severity === "high")) process.exit(1);
