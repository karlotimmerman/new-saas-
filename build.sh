#!/bin/bash

# Create new directories
declare -a directories=(
  "src/app/protected/admin/cost"
  "src/app/protected/admin/limits"
  "src/app/protected/admin/usage"
  "src/app/protected/admin/billing"
  "src/app/api/pricing/cost"
  "src/app/api/pricing/limits"
  "src/app/api/pricing/usage"
  "src/app/api/pricing/billing"
  "src/app/api/openmeter/track"
  "src/components/admin"
  "src/hooks"
  "src/types"
  "src/lib"
)

for dir in "${directories[@]}"; do
  mkdir -p "$dir"
done

# Create new files
declare -a files=(
  "src/app/protected/admin/cost/page.tsx"
  "src/app/protected/admin/cost/CostContent.tsx"
  "src/app/protected/admin/limits/page.tsx"
  "src/app/protected/admin/limits/LimitsContent.tsx"
  "src/app/protected/admin/usage/page.tsx"
  "src/app/protected/admin/usage/UsageContent.tsx"
  "src/app/protected/admin/billing/page.tsx"
  "src/app/protected/admin/billing/BillingContent.tsx"
  "src/app/api/pricing/cost/route.ts"
  "src/app/api/pricing/limits/route.ts"
  "src/app/api/pricing/usage/route.ts"
  "src/app/api/pricing/billing/route.ts"
  "src/app/api/openmeter/track/route.ts"
  "src/hooks/useCostData.ts"
  "src/hooks/useLimitsData.ts"
  "src/hooks/useUsageData.ts"
  "src/hooks/useBillingData.ts"
  "src/types/ui.ts"
  "src/lib/logger.ts"
)

for file in "${files[@]}"; do
  touch "$file"
done

# Update existing files
declare -a updates=(
  "src/components/ui/button.tsx"
  "src/components/ui/alert.tsx"
)

for update in "${updates[@]}"; do
  echo "import { Variant } from '@/types/ui';" >> "$update"
done

# Install necessary packages
npm install swr sonner @openmeter/sdk

echo "Files and directories created successfully!"
