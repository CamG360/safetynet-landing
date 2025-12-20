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

# Lucide Icons 0.294.0
echo "2. Verifying Lucide Icons 0.294.0..."
LUCIDE_URL="https://unpkg.com/lucide@0.294.0/dist/umd/lucide.min.js"
EXPECTED_LUCIDE="sha384-43WP8IQ+5H0ncT+LNM4dZnu+hPINYmeOuNMhTvHfszzXdFjBEji77gkq7TyjQl/U"

curl -sL "$LUCIDE_URL" | openssl dgst -sha384 -binary | openssl base64 -A > /tmp/lucide_hash.txt
ACTUAL_LUCIDE="sha384-$(cat /tmp/lucide_hash.txt)"

echo "   Expected: $EXPECTED_LUCIDE"
echo "   Actual:   $ACTUAL_LUCIDE"
if [ "$EXPECTED_LUCIDE" = "$ACTUAL_LUCIDE" ]; then
    echo "   ✓ MATCH"
else
    echo "   ✗ MISMATCH"
fi
echo ""

echo "=== Verification Complete ==="
