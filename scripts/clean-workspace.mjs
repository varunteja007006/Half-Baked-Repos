#!/usr/bin/env node

import path from "node:path";
import { rm, readdir } from "node:fs/promises";

const TARGET_DIR_NAMES = new Set([
	"node_modules",
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
	"web-build",
	".gradle",
]);

const TARGET_FILE_NAMES = new Set(["tsconfig.tsbuildinfo"]);

const SKIP_DIR_NAMES = new Set([".git"]);

function parseArgs(argv) {
	const parsed = {
		dryRun: false,
		root: process.cwd(),
	};

	for (let index = 0; index < argv.length; index += 1) {
		const arg = argv[index];

		if (arg === "--dry-run") {
			parsed.dryRun = true;
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

async function findTargets(dir, acc) {
	const entries = await readdir(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);

		if (entry.isDirectory()) {
			if (SKIP_DIR_NAMES.has(entry.name)) continue;

			if (TARGET_DIR_NAMES.has(entry.name)) {
				acc.push(fullPath);
				continue;
			}

			await findTargets(fullPath, acc);
			continue;
		}

		if (TARGET_FILE_NAMES.has(entry.name)) {
			acc.push(fullPath);
		}
	}
}

function toRepoRelative(root, absolutePath) {
	const relative = path.relative(root, absolutePath);
	return relative === "" ? "." : relative;
}

async function run() {
	const args = parseArgs(process.argv.slice(2));

	if (args.help) {
		console.log(
			"Usage: node scripts/clean-workspace.mjs [--dry-run] [--root <path>]",
		);
		return;
	}

	const targets = [];
	await findTargets(args.root, targets);
	targets.sort((left, right) => left.localeCompare(right));

	if (targets.length === 0) {
		console.log(`No matching cache directories found in ${args.root}`);
		return;
	}

	const mode = args.dryRun ? "Dry run" : "Removing";
	console.log(`${mode} ${targets.length} directories:`);

	for (const target of targets) {
		console.log(`- ${toRepoRelative(args.root, target)}`);

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
