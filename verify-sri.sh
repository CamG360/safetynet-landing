#!/bin/bash
# SRI Hash Verification Script

echo "=== SRI Hash Verification ==="
echo ""

# Tailwind CSS 3.4.10
echo "1. Verifying Tailwind CSS 3.4.10..."
TAILWIND_URL="https://cdn.tailwindcss.com/3.4.10"
EXPECTED_TAILWIND="sha384-VK3iZSOy03XNa6Ba48af6ubHywenceWJjdXhhrvfhdaDgDGHRCt47O6A6d8fjdVu"

curl -sL "$TAILWIND_URL" | openssl dgst -sha384 -binary | openssl base64 -A > /tmp/tailwind_hash.txt
ACTUAL_TAILWIND="sha384-$(cat /tmp/tailwind_hash.txt)"

echo "   Expected: $EXPECTED_TAILWIND"
echo "   Actual:   $ACTUAL_TAILWIND"
if [ "$EXPECTED_TAILWIND" = "$ACTUAL_TAILWIND" ]; then
    echo "   ✓ MATCH"
else
    echo "   ✗ MISMATCH"
fi
echo ""

echo "Lucide Icons are self-hosted from js/vendor/lucide.min.js (no SRI required for same-origin assets)."
echo "=== Verification Complete ==="
