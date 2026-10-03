const synonyms = [
  ["kakao", "cocoa", "cacao", "cokelat", "chocolate", "可可"],
  ["kopi", "coffee", "咖啡"],
  ["rempah", "spice", "spices", "香料"],
  ["sawit", "palm", "棕榈"],
  ["ekspor", "export", "出口"],
  ["biaya", "cost", "harga", "price", "费用"],
  ["buyer", "pembeli", "买家"],
  ["jepang", "japan", "日本"],
  ["jerman", "germany", "德国"],
];

export function normalize(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function matchesSearch(haystack: string, query: string) {
  const text = normalize(haystack);
  return normalize(query)
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => {
      const related = synonyms.find((group) => group.includes(word)) ?? [word];
      return related.some((term) => text.includes(term));
    });
}
