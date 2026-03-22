const fs = require('fs');
const path = require('path');

const packages = [
  { slug: "primary-health-check-up-male", image: "/images/wellness_packages/bronze-men.jpg" },
  { slug: "primary-health-check-up-female", image: "/images/wellness_packages/bronze-women.jpg" },
  { slug: "executive-health-check-up-male", image: "/images/wellness_packages/diamond-men.jpg" },
  { slug: "executive-health-check-up-female", image: "/images/wellness_packages/diamond-women.jpg" },
  { slug: "advance-health-check-up-male", image: "/images/wellness_packages/silver-men.jpg" },  
  { slug: "advance-health-check-up-female", image: "/images/wellness_packages/silver-women.jpg" },
  { slug: "child-health-check-up", image: "/images/wellness_packages/healthy-young-one.jpg" },
  { slug: "well-woman-executive-health-checkup", image: "/images/wellness_packages/gold-women.jpg" },
  { slug: "healthy-heart-checkup", image: "/images/wellness_packages/healthy-lungs-checkup.jpg" },
  { slug: "annual-health-check-up-male", image: "/images/wellness_packages/cardiac-health.jpg" },
  { slug: "annual-health-check-up-female", image: "/images/wellness_packages/check_up.jpeg" },
  { slug: "comprehensive-health-check-up-male-female", image: "/images/wellness_packages/comprehensive_health.jpg" },
  { slug: "comprehensive-health-check-up-female", image: "/images/wellness_packages/cardiac-advanced-care.jpg" },
  { slug: "cardiac-screening-1", image: "/images/wellness_packages/cardiac-health-scanning.jpg" },
  { slug: "cardiac-screening-2", image: "/images/wellness_packages/cardiac_screening.jpg" },
  { slug: "cardiac-active-package", image: "/images/wellness_packages/cardian_screening_two.jpg" }
];

const basePath = 'e:/popular-hospital/frontend/src/app/services/wellness-packages';

packages.forEach(pkg => {
    const filePath = path.join(basePath, pkg.slug, 'page.tsx');
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        // Replace hero image
        // Replace card image
        // The original image was "/images/health-packages/health_packages.jpg"
        content = content.replace(/"\/images\/health-packages\/health_packages\.jpg"/g, `"${pkg.image}"`);
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${pkg.slug}`);
    } else {
        console.log(`File not found: ${filePath}`);
    }
});
