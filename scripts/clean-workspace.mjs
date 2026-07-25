#!/usr/bin/env node

import path from "node:path";
import { rm, readdir } from "node:fs/promises";

const CACHE_DIR_NAMES = new Set([
	// ── JS / Node / React / Next / Remix / etc ──────────────
	".next",
	".turbo",
	".expo",
	".cache",
	".parcel-cache",
	".vite",
	".swc",
	".nyc_output",
	".rpt2_cache",
	"coverage",
	"dist",
	"build",
	"out",
	"web-build",
	".gradle",
	".nuxt",
	".svelte-kit",
	".astro",

	// ── Python ──────────────────────────────────────────────
	"__pycache__",
	".pytest_cache",
	".mypy_cache",
	".ruff_cache",
	".tox",
	".eggs",
	"htmlcov",

	// ── Rust ────────────────────────────────────────────────
	"target",
]);

const CACHE_FILE_NAMES = new Set([
	"tsconfig.tsbuildinfo",
	".eslintcache",
	".stylelintcache",
	".prettiercache",
	".coverage",
]);

const DEPS_DIR_NAMES = new Set(["node_modules"]);

const SKIP_DIR_NAMES = new Set([".git"]);

function parseArgs(argv) {
	const parsed = {
		dryRun: false,
		mode: "all",
		root: process.cwd(),
	};

	for (let index = 0; index < argv.length; index += 1) {
		const arg = argv[index];

		if (arg === "--dry-run") {
			parsed.dryRun = true;
			continue;
		}

		if (arg === "--mode") {
			const next = argv[index + 1];
			if (!next || !["all", "cache", "deps"].includes(next)) {
				throw new Error("--mode must be one of: all, cache, deps");
			}

			parsed.mode = next;
			index += 1;
			continue;
		}

		if (arg === "--root") {
			const next = argv[index + 1];
			if (!next) {
				throw new Error("Missing path after --root");
			}

			parsed.root = path.resolve(next);
			index += 1;
			continue;
		}

		if (arg === "--help" || arg === "-h") {
			parsed.help = true;
			continue;
		}

		throw new Error(`Unknown argument: ${arg}`);
	}

	return parsed;
}

function getTargetSets(mode) {
	if (mode === "cache") {
		return { dirs: CACHE_DIR_NAMES, files: CACHE_FILE_NAMES };
	}

	if (mode === "deps") {
		return { dirs: DEPS_DIR_NAMES, files: new Set() };
	}

	// all
	return {
		dirs: new Set([...CACHE_DIR_NAMES, ...DEPS_DIR_NAMES]),
		files: CACHE_FILE_NAMES,
	};
}

async function findTargets(dir, acc, targetDirs, targetFiles) {
	const entries = await readdir(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);

		if (entry.isDirectory()) {
			if (SKIP_DIR_NAMES.has(entry.name)) continue;

			if (targetDirs.has(entry.name)) {
				acc.push(fullPath);
				continue;
			}

			// Never recurse into node_modules — those are installed
			// package artifacts and traversing them will pick up dist/
			// and build/ dirs inside the pnpm virtual store, corrupting packages.
			if (entry.name === "node_modules") continue;

			await findTargets(fullPath, acc, targetDirs, targetFiles);
			continue;
		}

		if (targetFiles.has(entry.name)) {
			acc.push(fullPath);
		}
	}
}

function formatTarget(root, absolutePath) {
	const relative = path.relative(root, absolutePath);
	if (relative === "") return ".";

	const folder = path.dirname(relative);
	const name = path.basename(relative);

	if (folder === ".") {
		return name;
	}
	return `${folder} - ${name}`;
}

async function run() {
	const args = parseArgs(process.argv.slice(2));

	if (args.help) {
		console.log(
			"Usage: node scripts/clean-workspace.mjs [--mode all|cache|deps] [--dry-run] [--root <path>]",
		);
		console.log("");
		console.log("Modes:");
		console.log("  all     Remove both cache and deps directories (default)");
		console.log("  cache   Remove build/cache dirs across JS, Python, Rust, Go, and more (does NOT touch node_modules)");
		console.log("  deps    Remove node_modules directories only");
		console.log("");
		console.log("Options:");
		console.log("  --dry-run  List targets without deleting anything");
		console.log("  --root     Root directory to scan (default: cwd)");
		return;
	}

	const { dirs: targetDirs, files: targetFiles } = getTargetSets(args.mode);
	const targets = [];
	await findTargets(args.root, targets, targetDirs, targetFiles);
	targets.sort((left, right) => left.localeCompare(right));

	if (targets.length === 0) {
		const label = args.mode === "all" ? "" : ` ${args.mode}`;
		console.log(`No matching${label} targets found in ${args.root}`);
		return;
	}

	const mode = args.dryRun ? "Dry run" : "Removing";
	console.log(`${mode} ${targets.length} targets:`);

	for (const target of targets) {
		console.log(`- ${formatTarget(args.root, target)}`);

		if (!args.dryRun) {
			await rm(target, { recursive: true, force: true });
		}
	}

	if (!args.dryRun) {
		console.log("Cleanup complete.");
	}
}

run().catch((error) => {
	console.error(error.message);
	process.exitCode = 1;
});
