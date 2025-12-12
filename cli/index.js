#!/usr/bin/env node

/**
 * create-solana-pwa
 *
 * CLI to scaffold a new Solana Mobile PWA project with MWA integration.
 *
 * Usage:
 *   npx create-solana-pwa my-app
 *   npx create-solana-pwa my-app --typescript
 *   npx create-solana-pwa my-app --network devnet
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync, readFileSync, cpSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  bold: '\x1b[1m',
};

function log(message, color = '') {
  console.log(`${color}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`\n${colors.cyan}[${step}]${colors.reset} ${message}`);
}

function logSuccess(message) {
  log(`${colors.green}✓${colors.reset} ${message}`);
}

function logError(message) {
  log(`${colors.red}✗${colors.reset} ${message}`);
}

// Parse command line arguments
function parseArgs(args) {
  const options = {
    projectName: null,
    network: 'mainnet',
    packageManager: 'npm',
    git: true,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg.startsWith('--')) {
      switch (arg) {
        case '--network':
          options.network = args[++i];
          break;
        case '--npm':
          options.packageManager = 'npm';
          break;
        case '--yarn':
          options.packageManager = 'yarn';
          break;
        case '--pnpm':
          options.packageManager = 'pnpm';
          break;
        case '--no-git':
          options.git = false;
          break;
        case '--help':
          printHelp();
          process.exit(0);
      }
    } else if (!options.projectName) {
      options.projectName = arg;
    }
  }

  return options;
}

function printHelp() {
  console.log(`
${colors.bold}create-solana-pwa${colors.reset} - Create a new Solana Mobile PWA

${colors.cyan}Usage:${colors.reset}
  npx create-solana-pwa <project-name> [options]

${colors.cyan}Options:${colors.reset}
  --network <net>   Default network: mainnet, devnet, testnet (default: mainnet)
  --npm             Use npm as package manager (default)
  --yarn            Use yarn as package manager
  --pnpm            Use pnpm as package manager
  --no-git          Skip git initialization
  --help            Show this help message

${colors.cyan}Examples:${colors.reset}
  npx create-solana-pwa my-dapp
  npx create-solana-pwa my-dapp --network devnet
  npx create-solana-pwa my-dapp --yarn

${colors.cyan}Features:${colors.reset}
  • Next.js 14 with App Router
  • Mobile Wallet Adapter (MWA) integration
  • PWA with service worker caching
  • Safe area handling for mobile devices
  • Bottom navigation with 48dp touch targets
  • Bubblewrap TWA configuration
  • Chrome browser preference for TWA
  • Framer Motion animations
  • Pull-to-refresh support

${colors.cyan}Learn more:${colors.reset}
  https://docs.solanamobile.com
`);
}

async function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function main() {
  const args = process.argv.slice(2);
  const options = parseArgs(args);

  // Print banner
  console.log(`
${colors.magenta}╔═══════════════════════════════════════════════════════╗${colors.reset}
${colors.magenta}║${colors.reset}                                                       ${colors.magenta}║${colors.reset}
${colors.magenta}║${colors.reset}   ${colors.green}create-solana-pwa${colors.reset}                                 ${colors.magenta}║${colors.reset}
${colors.magenta}║${colors.reset}   ${colors.cyan}Solana Mobile PWA Template${colors.reset}                        ${colors.magenta}║${colors.reset}
${colors.magenta}║${colors.reset}                                                       ${colors.magenta}║${colors.reset}
${colors.magenta}╚═══════════════════════════════════════════════════════╝${colors.reset}
`);

  // Get project name
  let projectName = options.projectName;

  if (!projectName) {
    projectName = await prompt(`${colors.cyan}?${colors.reset} Project name: `);
  }

  if (!projectName) {
    logError('Project name is required');
    process.exit(1);
  }

  // Validate project name
  const validNameRegex = /^[a-z0-9-_]+$/i;
  if (!validNameRegex.test(projectName)) {
    logError('Project name can only contain letters, numbers, hyphens, and underscores');
    process.exit(1);
  }

  const projectPath = join(process.cwd(), projectName);

  // Check if directory exists
  if (existsSync(projectPath)) {
    logError(`Directory "${projectName}" already exists`);
    process.exit(1);
  }

  logStep('1/5', 'Creating project directory...');
  mkdirSync(projectPath, { recursive: true });
  logSuccess(`Created ${projectName}/`);

  logStep('2/5', 'Cloning template...');

  try {
    // Clone the template repository
    execSync(
      `git clone --depth 1 https://github.com/solana-mobile/solana-mobile-pwa-template.git "${projectPath}"`,
      { stdio: 'pipe' }
    );

    // Remove .git directory from cloned repo
    execSync(`rm -rf "${join(projectPath, '.git')}"`, { stdio: 'pipe' });

    logSuccess('Template cloned successfully');
  } catch (error) {
    // Fallback: copy from local template if available
    const templatePath = join(__dirname, '..', 'template');

    if (existsSync(templatePath)) {
      cpSync(templatePath, projectPath, { recursive: true });
      logSuccess('Template copied from local');
    } else {
      logError('Failed to clone template. Check your internet connection.');
      console.error(error.message);
      process.exit(1);
    }
  }

  logStep('3/5', 'Configuring project...');

  // Update package.json with project name
  const packageJsonPath = join(projectPath, 'package.json');
  if (existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    packageJson.name = projectName;
    packageJson.version = '0.1.0';
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    logSuccess('Updated package.json');
  }

  // Update PWA manifest with project name
  const manifestPath = join(projectPath, 'public', 'manifest.json');
  if (existsSync(manifestPath)) {
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
    manifest.name = projectName;
    manifest.short_name = projectName;
    writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    logSuccess('Updated manifest.json');
  }

  // Update TWA manifest with project name
  const twaManifestPath = join(projectPath, 'twa', 'twa-manifest.json');
  if (existsSync(twaManifestPath)) {
    const twaManifest = JSON.parse(readFileSync(twaManifestPath, 'utf-8'));
    twaManifest.name = projectName;
    twaManifest.launcherName = projectName;
    writeFileSync(twaManifestPath, JSON.stringify(twaManifest, null, 2));
    logSuccess('Updated twa-manifest.json');
  }

  // Update network configuration if specified
  if (options.network !== 'mainnet') {
    const walletProviderPath = join(
      projectPath,
      'src',
      'components',
      'wallet',
      'WalletProvider.tsx'
    );
    if (existsSync(walletProviderPath)) {
      let content = readFileSync(walletProviderPath, 'utf-8');
      content = content.replace(
        /WalletAdapterNetwork\.Mainnet/g,
        `WalletAdapterNetwork.${options.network.charAt(0).toUpperCase() + options.network.slice(1)}`
      );
      writeFileSync(walletProviderPath, content);
      logSuccess(`Set default network to ${options.network}`);
    }
  }

  logStep('4/5', 'Installing dependencies...');

  const installCmd =
    options.packageManager === 'yarn'
      ? 'yarn'
      : options.packageManager === 'pnpm'
        ? 'pnpm install'
        : 'npm install';

  try {
    execSync(installCmd, {
      cwd: projectPath,
      stdio: 'inherit',
    });
    logSuccess('Dependencies installed');
  } catch {
    logError('Failed to install dependencies');
    console.log(`Run "${installCmd}" manually in the project directory.`);
  }

  logStep('5/5', 'Initializing git...');

  if (options.git) {
    try {
      execSync('git init', { cwd: projectPath, stdio: 'pipe' });
      execSync('git add -A', { cwd: projectPath, stdio: 'pipe' });
      execSync('git commit -m "Initial commit from create-solana-pwa"', {
        cwd: projectPath,
        stdio: 'pipe',
      });
      logSuccess('Git repository initialized');
    } catch {
      log('Git initialization skipped', colors.yellow);
    }
  } else {
    log('Git initialization skipped', colors.yellow);
  }

  // Print success message
  console.log(`
${colors.green}✓ Success!${colors.reset} Created ${colors.cyan}${projectName}${colors.reset}

${colors.bold}Next steps:${colors.reset}

  ${colors.cyan}cd ${projectName}${colors.reset}
  ${colors.cyan}${options.packageManager === 'yarn' ? 'yarn dev' : options.packageManager === 'pnpm' ? 'pnpm dev' : 'npm run dev'}${colors.reset}

${colors.bold}Build for production:${colors.reset}

  ${colors.cyan}${options.packageManager === 'yarn' ? 'yarn build' : options.packageManager === 'pnpm' ? 'pnpm build' : 'npm run build'}${colors.reset}

${colors.bold}Build TWA (Android app):${colors.reset}

  ${colors.cyan}cd twa && ./scripts/build-twa.sh${colors.reset}

${colors.bold}Documentation:${colors.reset}

  • PWA Setup: ${colors.cyan}docs/SETUP.md${colors.reset}
  • TWA Guide: ${colors.cyan}docs/TWA-GUIDE.md${colors.reset}
  • Publishing: ${colors.cyan}docs/PUBLISHING.md${colors.reset}

${colors.bold}Learn more:${colors.reset} ${colors.cyan}https://docs.solanamobile.com${colors.reset}
`);
}

main().catch((error) => {
  logError('An error occurred:');
  console.error(error);
  process.exit(1);
});
