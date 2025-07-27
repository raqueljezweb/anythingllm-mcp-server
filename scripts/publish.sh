#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}AnythingLLM MCP Server - Release Script${NC}"
echo "======================================="

# Check if user is logged in to npm
echo -e "\n${YELLOW}Checking npm login status...${NC}"
if ! npm whoami &> /dev/null; then
    echo -e "${RED}Error: Not logged in to npm${NC}"
    echo "Please run 'npm login' first"
    exit 1
fi

# Check for uncommitted changes
echo -e "\n${YELLOW}Checking for uncommitted changes...${NC}"
if ! git diff-index --quiet HEAD --; then
    echo -e "${RED}Error: Uncommitted changes found${NC}"
    echo "Please commit your changes before releasing"
    exit 1
fi

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo -e "\n${GREEN}Current version: ${CURRENT_VERSION}${NC}"

# Ask for version bump type
echo -e "\n${YELLOW}Select version bump type:${NC}"
echo "1) Patch (bug fixes) - X.X.+1"
echo "2) Minor (new features) - X.+1.0"
echo "3) Major (breaking changes) - +1.0.0"
echo "4) Custom version"
echo "5) Cancel"

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        VERSION_TYPE="patch"
        ;;
    2)
        VERSION_TYPE="minor"
        ;;
    3)
        VERSION_TYPE="major"
        ;;
    4)
        read -p "Enter custom version: " CUSTOM_VERSION
        # Validate version format
        if ! [[ $CUSTOM_VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
            echo -e "${RED}Invalid version format. Please use X.X.X${NC}"
            exit 1
        fi
        ;;
    5)
        echo "Release cancelled"
        exit 0
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

# Update version
echo -e "\n${YELLOW}Updating version...${NC}"
if [ "$choice" -eq 4 ]; then
    npm version $CUSTOM_VERSION --no-git-tag-version
    NEW_VERSION=$CUSTOM_VERSION
else
    NEW_VERSION=$(npm version $VERSION_TYPE --no-git-tag-version)
fi

echo -e "${GREEN}New version: ${NEW_VERSION}${NC}"

# Update changelog
echo -e "\n${YELLOW}Would you like to add a changelog entry? (y/n)${NC}"
read -p "> " add_changelog

if [ "$add_changelog" = "y" ]; then
    echo "Enter changelog for version ${NEW_VERSION} (press Ctrl+D when done):"
    CHANGELOG_ENTRY=$(cat)
    
    # Create or update CHANGELOG.md
    if [ ! -f CHANGELOG.md ]; then
        echo "# Changelog" > CHANGELOG.md
        echo "" >> CHANGELOG.md
    fi
    
    # Add new entry at the top
    TEMP_FILE=$(mktemp)
    echo "# Changelog" > $TEMP_FILE
    echo "" >> $TEMP_FILE
    echo "## ${NEW_VERSION} - $(date +%Y-%m-%d)" >> $TEMP_FILE
    echo "" >> $TEMP_FILE
    echo "$CHANGELOG_ENTRY" >> $TEMP_FILE
    echo "" >> $TEMP_FILE
    tail -n +2 CHANGELOG.md >> $TEMP_FILE
    mv $TEMP_FILE CHANGELOG.md
    
    git add CHANGELOG.md
fi

# Commit version bump
echo -e "\n${YELLOW}Committing version bump...${NC}"
git add package.json package-lock.json
git commit -m "Release ${NEW_VERSION}"

# Create git tag
echo -e "\n${YELLOW}Creating git tag...${NC}"
git tag -a "${NEW_VERSION}" -m "Release ${NEW_VERSION}"

# Push to GitHub
echo -e "\n${YELLOW}Pushing to GitHub...${NC}"
git push origin main
git push origin "${NEW_VERSION}"

# Publish to npm
echo -e "\n${YELLOW}Publishing to npm...${NC}"
npm publish

if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✅ Successfully released version ${NEW_VERSION}!${NC}"
    echo -e "\n${YELLOW}Package URLs:${NC}"
    echo "NPM: https://www.npmjs.com/package/anythingllm-mcp-server"
    echo "GitHub: https://github.com/raqueljezweb/anythingllm-mcp-server/releases/tag/${NEW_VERSION}"
    echo -e "\n${YELLOW}Next steps:${NC}"
    echo "- Update the GitHub release notes at the URL above"
    echo "- Notify users about the new release"
else
    echo -e "\n${RED}❌ Failed to publish to npm${NC}"
    echo "You may need to:"
    echo "- Check your npm authentication"
    echo "- Ensure the package name is available"
    echo "- Check for any npm errors above"
    exit 1
fi