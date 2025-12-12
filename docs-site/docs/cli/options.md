# CLI Options

All available options for create-solana-pwa.

## Syntax

```bash
npx create-solana-pwa <project-name> [options]
```

## Options

| Option | Description | Default |
|--------|-------------|---------|
| `--network <net>` | Default Solana network | `mainnet` |
| `--npm` | Use npm as package manager | ✓ |
| `--yarn` | Use yarn as package manager | |
| `--pnpm` | Use pnpm as package manager | |
| `--no-git` | Skip git initialization | |
| `--help` | Show help message | |

## Network Option

Set the default Solana network for the project:

```bash
# Mainnet (default)
npx create-solana-pwa my-dapp --network mainnet

# Devnet (for development)
npx create-solana-pwa my-dapp --network devnet

# Testnet
npx create-solana-pwa my-dapp --network testnet
```

This updates `WalletProvider.tsx`:

```tsx
// --network devnet
const network = WalletAdapterNetwork.Devnet;
```

## Package Manager

Choose your preferred package manager:

```bash
# npm (default)
npx create-solana-pwa my-dapp --npm

# yarn
npx create-solana-pwa my-dapp --yarn

# pnpm
npx create-solana-pwa my-dapp --pnpm
```

This affects:
- Which installer runs (`npm install`, `yarn`, `pnpm install`)
- Instructions shown after creation

## Git Initialization

By default, git is initialized with an initial commit.

Skip git setup:

```bash
npx create-solana-pwa my-dapp --no-git
```

## Combining Options

Options can be combined:

```bash
npx create-solana-pwa my-dapp --network devnet --yarn --no-git
```

## Examples

### Basic Usage

```bash
npx create-solana-pwa my-dapp
```

### Development Project

```bash
npx create-solana-pwa test-app --network devnet
```

### Production Project

```bash
npx create-solana-pwa production-app --network mainnet
```

### Quick Prototype

```bash
npx create-solana-pwa prototype --network devnet --no-git
```

### Team Project with Yarn

```bash
npx create-solana-pwa team-project --yarn
```

## Environment Variables

The CLI respects these environment variables:

| Variable | Description |
|----------|-------------|
| `npm_config_registry` | Custom npm registry |
| `GITHUB_TOKEN` | For private template repos |

## Project Name Rules

Valid project names:
- ✅ `my-dapp`
- ✅ `my_dapp`
- ✅ `mydapp123`
- ✅ `MyDApp`

Invalid project names:
- ❌ `my dapp` (spaces)
- ❌ `my/dapp` (slashes)
- ❌ `@my/dapp` (special characters)

## Output

Successful creation shows:

```
✓ Success! Created my-dapp

Next steps:

  cd my-dapp
  npm run dev

Build for production:

  npm run build

Build TWA (Android app):

  cd twa && ./scripts/build-twa.sh

Documentation:

  https://solana-pwa-docs.vercel.app
```

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Error (missing name, directory exists, etc.) |

## Verbose Output

The CLI shows progress:

```
[1/5] Creating project directory...
✓ Created my-dapp/

[2/5] Cloning template...
✓ Template cloned successfully

[3/5] Configuring project...
✓ Updated package.json
✓ Updated manifest.json
✓ Updated twa-manifest.json

[4/5] Installing dependencies...
✓ Dependencies installed

[5/5] Initializing git...
✓ Git repository initialized

✓ Success! Created my-dapp
```
