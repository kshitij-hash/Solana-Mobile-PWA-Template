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

Set the default Solana network:

```bash
# Mainnet (default) - for production
npx create-solana-pwa my-dapp --network mainnet

# Devnet - for development and testing
npx create-solana-pwa my-dapp --network devnet

# Testnet
npx create-solana-pwa my-dapp --network testnet
```

This updates `WalletProvider.tsx`:

```tsx
const network = WalletAdapterNetwork.Devnet;
```

## Package Manager

Choose your preferred package manager:

```bash
npx create-solana-pwa my-dapp --npm   # default
npx create-solana-pwa my-dapp --yarn
npx create-solana-pwa my-dapp --pnpm
```

## Git Initialization

By default, git is initialized with an initial commit. Skip it with:

```bash
npx create-solana-pwa my-dapp --no-git
```

## Combining Options

```bash
npx create-solana-pwa my-dapp --network devnet --yarn --no-git
```

## Examples

```bash
# Development project on devnet
npx create-solana-pwa test-app --network devnet

# Production project with yarn
npx create-solana-pwa my-app --network mainnet --yarn

# Quick prototype without git
npx create-solana-pwa prototype --network devnet --no-git
```

## Project Name Rules

Valid names:
- `my-dapp`
- `my_dapp`
- `mydapp123`
- `MyDApp`

Invalid names:
- `my dapp` (spaces)
- `my/dapp` (slashes)
- `@my/dapp` (special characters)

## Output

Successful creation shows:

```
[1/5] Creating project directory...
✓ Created my-dapp/

[2/5] Cloning template...
✓ Template cloned successfully

[3/5] Configuring project...
✓ Updated package.json
✓ Updated manifest.json
✓ Updated twa-manifest.template.json

[4/5] Installing dependencies...
✓ Dependencies installed

[5/5] Initializing git...
✓ Git repository initialized

✓ Success! Created my-dapp

Next steps:

  cd my-dapp
  npm run dev

Build for production:

  npm run build

Build TWA (Android app):

  cd twa && ./scripts/init-twa.sh

Documentation:

  https://solana-pwa-docs.vercel.app
```

## Help

```bash
npx create-solana-pwa --help
```
