const fs = require("fs");
const path = require("path");

const dir = "e:/popular-hospital/frontend/src/app/services/wellness-packages";

const subdirs = fs
  .readdirSync(dir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

let updated = 0;

for (const subdir of subdirs) {
  const filePath = path.join(dir, subdir, "page.tsx");
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, "utf8");

    // We want to remove the specific <div className="absolute inset-0 z-0"> block
    // which contains the <Image /> tag for the banner
    const heroImageRegex =
      /<div className=\"absolute inset-0 z-0\">\s*<Image[\s\S]*?\/>\s*<div className=\"absolute inset-0 [^\"]+\" \/>\s*<\/div>/g;

    // Some formats might not match the specific regex exactly due to variations, so let's try a safer regex
    // Search for <div className="absolute inset-0 z-0">...</div>
    const divRegex = /<div className="absolute inset-0 z-0">[\s\S]*?<\/div>/;

    if (divRegex.test(content)) {
      // make sure it actually has an Image tag inside it so we don't delete wrong divs
      const match = content.match(divRegex)[0];
      if (
        match.includes("<Image") &&
        match.includes("images/wellness_packages")
      ) {
        content = content.replace(divRegex, "");
        fs.writeFileSync(filePath, content);
        updated++;
        console.log("Updated " + subdir);
      }
    }
  }
}
console.log("Total updated: " + updated);
