#!/bin/bash

# Quick publish script for patch releases
# For more control, use ./scripts/publish.sh

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Check npm login
if ! npm whoami &> /dev/null; then
    echo -e "${RED}Error: Not logged in to npm. Run 'npm login' first${NC}"
    exit 1
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo -e "${RED}Error: Uncommitted changes found. Commit first!${NC}"
    exit 1
fi

# Bump patch version
NEW_VERSION=$(npm version patch)

# Commit and tag
git push origin main
git push origin $NEW_VERSION

# Publish to npm
npm publish

echo -e "${GREEN}✅ Published $NEW_VERSION successfully!${NC}"