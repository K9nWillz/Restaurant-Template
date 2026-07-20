const fs = require('fs');
const settings = JSON.parse(fs.readFileSync('settings.json', 'utf8'));
settings.hero = {
  bestsellerName: "Special Jollof",
  bestsellerImage: "https://images.unsplash.com/photo-1574653853027-5382a3d23a15?auto=format&fit=crop&q=80&w=1000",
  bestsellerIcon: "🥘"
};
settings.contact = {
  address: "1 Brackenbury St, LGA, Abakaliki 480251, Ebonyi",
  phone: "0703 998 5714",
  email: "hello@tastia.com",
  hours: "Open - Closes 22:00"
};
fs.writeFileSync('settings.json', JSON.stringify(settings, null, 2));
