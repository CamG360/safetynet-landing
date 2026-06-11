# AGENTS.md — SafetyNet Landing Page

## Purpose

This repository contains the SafetyNet landing page.

Agents working in this repository are bounded execution workers. They may inspect the repository, make narrow authorised changes, run checks, and report results. They are not product owners, UX owners, copy owners, or deployment owners.

## Source of Truth

- `main` is the source of truth for the live landing page.
- Do not push directly to `main` unless the user explicitly authorises