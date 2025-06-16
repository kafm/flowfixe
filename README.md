# Flowfixe Platfom

A modular ecosystem for building apps with reusable UI, data, and automation layers.

> ⚠️ Monorepo – under active development. Structure and APIs may change.

---

## 📁 Packages

This repository uses [PNPM Workspaces](https://pnpm.io/workspaces) to manage multiple packages:

| Package           | Description                                       | Status     |
|-------------------|---------------------------------------------------|------------|
| [`@flowfixe/common`](./packages/common) | Shared utility functions and types               | ✅ In Progress |
| [`@flowfixe/ui`](./packages/ui)         | Reusable and accessible React components         | ✅ In Progress |
| [`@flowfixe/engine`](./packages/engine) | Headless data and process automation engine      | ⚙️ Early Planning |
| [`@flowfixe/apps`](./packages/apps)     | Visual app builder and runtime for Flowfixe apps | ⏳ Planned     |

---

## 📦 Getting Started

### 1. Clone and install dependencies:

```bash
git clone https://github.com/flowfixe/flowfixe.git
cd flowfixe
npm install
