import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});

// Navigate to the dev server
await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 15000 });

// Wait a bit for animations
await page.waitForTimeout(2000);

// Take screenshots of each screen
const screens = [
  { name: '01-onboarding', url: null },
  { name: '02-events', click: 'text=Start', wait: 1500 },
];

// Screenshot 1: Onboarding screen
await page.screenshot({ path: 'screenshots/01-onboarding.png', fullPage: false });
console.log('Screenshot 1: onboarding');

// Fill onboarding and proceed
try {
  await page.fill('input[placeholder*="First name"], input[type="text"]', 'Alex');
  await page.waitForTimeout(300);
  // Select birthday month
  const selects = await page.$$('select');
  if (selects.length >= 1) await selects[0].selectOption('March');
  if (selects.length >= 2) await selects[1].selectOption('15');
  // Pick avatar
  const avatarBtn = await page.$('button[aria-label*="avatar" i], .avatar-option, .avatar-grid > *');
  if (avatarBtn) await avatarBtn.click();
  await page.waitForTimeout(300);
  // Click start
  const startBtn = await page.$('button:has-text("Start"), button:has-text("Continue"), button:has-text("Begin"), button:has-text("Go"), button[type="submit"]');
  if (startBtn) await startBtn.click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshots/02-events.png', fullPage: false });
  console.log('Screenshot 2: events');
} catch (e) {
  console.log('Onboarding flow error:', e.message);
  await page.screenshot({ path: 'screenshots/02-events.png', fullPage: false });
}

// Navigate to Create screen
try {
  const fab = await page.$('button[aria-label*="Create"], button[aria-label*="create"], .fab, button:has-text("+")');
  if (fab) {
    await fab.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'screenshots/03-create.png', fullPage: false });
    console.log('Screenshot 3: create');
  }
} catch (e) {
  console.log('Create nav error:', e.message);
}

// Go back and try map
try {
  await page.goto('http://localhost:5173/map', { waitUntil: 'networkidle', timeout: 10000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshots/04-map.png', fullPage: false });
  console.log('Screenshot 4: map');
} catch (e) {
  console.log('Map nav error:', e.message);
}

// Notifications
try {
  await page.goto('http://localhost:5173/notifications', { waitUntil: 'networkidle', timeout: 10000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshots/05-notifications.png', fullPage: false });
  console.log('Screenshot 5: notifications');
} catch (e) {
  console.log('Notifications nav error:', e.message);
}

// Profile
try {
  await page.goto('http://localhost:5173/profile', { waitUntil: 'networkidle', timeout: 10000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshots/06-profile.png', fullPage: false });
  console.log('Screenshot 6: profile');
} catch (e) {
  console.log('Profile nav error:', e.message);
}

// Chats
try {
  await page.goto('http://localhost:5173/chats', { waitUntil: 'networkidle', timeout: 10000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshots/07-chats.png', fullPage: false });
  console.log('Screenshot 7: chats');
} catch (e) {
  console.log('Chats nav error:', e.message);
}

await browser.close();
console.log('Done!');
