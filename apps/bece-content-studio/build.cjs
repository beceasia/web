// Build the standalone BECE Content Studio from the versioned source archive.
const fs = require("node:fs");
const path = require("node:path");
const zlib = require("node:zlib");
const payload = [0,1,2,3,4].map(n=>fs.readFileSync(path.join(__dirname,`payload-${String(n).padStart(2,"0")}.b64`),"utf8")).join("").replace(/\s+/g,"");
const tar = zlib.brotliDecompressSync(Buffer.from(payload, "base64"));
const allowed = new Set(["index.html","styles.css","app.js","PAKET_KONTEN_21_HARI.json"]);
const dest = path.join(__dirname, "dist");
fs.mkdirSync(dest,{recursive:true});
let offset=0, extracted=[];
while(offset+512<=tar.length){
 const header=tar.subarray(offset,offset+512);
 if(header.every(b=>b===0)) break;
 const name=header.subarray(0,100).toString("utf8").split("\0")[0].replace(/^\.\//,"");
 const size=parseInt(header.subarray(124,136).toString("ascii").replace(/\0/g,"").trim(),8)||0;
 if(!allowed.has(name)) throw new Error("Unexpected archive entry: "+name);
 if(offset+512+size>tar.length) throw new Error("Truncated archive: "+name);
 fs.writeFileSync(path.join(dest,name),tar.subarray(offset+512,offset+512+size));
 extracted.push(name);
 offset+=512+Math.ceil(size/512)*512;
}
if(!allowed.has(extracted[0]) || extracted.length!==allowed.size || !extracted.every(x=>allowed.has(x))) throw new Error("Archive incomplete: "+extracted);
fs.writeFileSync(path.join(dest,"robots.txt"),"User-agent: *\nDisallow: /\n");
console.log("BECE Content Studio build: "+extracted.join(", "));
