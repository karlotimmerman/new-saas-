.
├── README.md
├── components.json
├── middleware.ts
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── public
│   └── images
│       ├── esrs-efrag.webp
│       ├── favicon.ico
│       ├── logo128.svg
│       ├── logo256.svg
│       ├── logo32.svg
│       ├── logo512.svg
│       ├── logo64.svg
│       ├── logo96.svg
│       ├── risk-matrix.png
│       └── risk.png
├── scripts
│   └── update-nav.mjs
├── src
│   ├── app
│   │   ├── (auth)
│   │   │   ├── layout.tsx
│   │   │   ├── login
│   │   │   │   ├── actions.ts
│   │   │   │   └── page.tsx
│   │   │   └── private
│   │   │       └── page.tsx
│   │   ├── (protected)
│   │   │   └── layout.tsx
│   │   ├── 2fa-verify
│   │   │   └── page.tsx
│   │   ├── @admin
│   │   │   ├── billing
│   │   │   │   ├── BillingContent.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── cost
│   │   │   │   ├── CostContent.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── limits
│   │   │   │   ├── LimitsContent.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── usage
│   │   │   │   ├── UsageContent.tsx
│   │   │   │   └── page.tsx
│   │   │   └── users
│   │   │       ├── actions.ts
│   │   │       └── page.tsx
│   │   ├── api
│   │   │   ├── auth
│   │   │   │   └── confirm
│   │   │   │       └── route.ts
│   │   │   ├── navigation
│   │   │   │   ├── main
│   │   │   │   │   └── route.ts
│   │   │   │   ├── secondary
│   │   │   │   │   └── route.ts
│   │   │   │   └── user
│   │   │   │       └── route.ts
│   │   │   ├── openmeter
│   │   │   │   └── track
│   │   │   │       └── route.ts
│   │   │   ├── pricing
│   │   │   │   ├── billing
│   │   │   │   │   └── route.ts
│   │   │   │   ├── cost
│   │   │   │   │   └── route.ts
│   │   │   │   ├── limits
│   │   │   │   │   └── route.ts
│   │   │   │   └── usage
│   │   │   │       └── route.ts
│   │   │   ├── projects
│   │   │   │   └── route.ts
│   │   │   ├── test-db-connection
│   │   │   │   └── route.ts
│   │   │   └── user
│   │   │       └── profile
│   │   │           └── route.ts
│   │   ├── favicon.ico
│   │   ├── fonts
│   │   │   ├── GeistMonoVF.woff
│   │   │   └── GeistVF.woff
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── protected
│   │       ├── 2fa-setup
│   │       │   └── page.tsx
│   │       ├── admin
│   │       │   └── users
│   │       │       └── page.tsx
│   │       ├── dashboard
│   │       │   └── page.tsx
│   │       └── layout.tsx
│   ├── components
│   │   ├── AdminSidebar.tsx
│   │   ├── Bar
│   │   │   ├── nav-main.tsx
│   │   │   ├── nav-projects.tsx
│   │   │   ├── nav-secondary.tsx
│   │   │   └── nav-user.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── PlatformSidebar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── app-sidebar.tsx
│   │   ├── theme-provider.tsx
│   │   └── ui
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx
│   │       ├── aspect-ratio.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── breadcrumb.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── collapsible.tsx
│   │       ├── command.tsx
│   │       ├── context-menu.tsx
│   │       ├── dialog.tsx
│   │       ├── drawer.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── hover-card.tsx
│   │       ├── input-otp.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── menubar.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── pagination.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── radio-group.tsx
│   │       ├── resizable.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── sonner.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toast.tsx
│   │       ├── toaster.tsx
│   │       ├── toggle-group.tsx
│   │       ├── toggle.tsx
│   │       └── tooltip.tsx
│   ├── config
│   │   └── routes.ts
│   ├── hooks
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   ├── useBillingData.ts
│   │   ├── useCostData.ts
│   │   ├── useLimitsData.ts
│   │   └── useUsageData.ts
│   ├── lib
│   │   ├── logger.ts
│   │   └── utils.ts
│   ├── styles
│   │   └── globals.css
│   ├── types
│   │   ├── navigation.ts
│   │   ├── supabase.ts
│   │   └── ui.ts
│   └── utils
│       ├── supabase
│       │   ├── client.ts
│       │   ├── middleware.ts
│       │   └── server.ts
│       ├── supabase-2fa.ts
│       └── supabase-admin.ts
├── tailwind.config.mjs
├── tree.md
└── tsconfig.json

50 directories, 137 files
.
├── README.md
├── components.json
├── middleware.ts
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── public
│   └── images
│       ├── esrs-efrag.webp
│       ├── favicon.ico
│       ├── logo128.svg
│       ├── logo256.svg
│       ├── logo32.svg
│       ├── logo512.svg
│       ├── logo64.svg
│       ├── logo96.svg
│       ├── risk-matrix.png
│       └── risk.png
├── scripts
│   └── update-nav.mjs
├── src
│   ├── app
│   │   ├── (auth)
│   │   │   ├── layout.tsx
│   │   │   ├── login
│   │   │   │   ├── actions.ts
│   │   │   │   └── page.tsx
│   │   │   └── private
│   │   │       └── page.tsx
│   │   ├── (protected)
│   │   │   └── layout.tsx
│   │   ├── 2fa-verify
│   │   │   └── page.tsx
│   │   ├── @admin
│   │   │   ├── billing
│   │   │   │   ├── BillingContent.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── cost
│   │   │   │   ├── CostContent.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── limits
│   │   │   │   ├── LimitsContent.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── usage
│   │   │   │   ├── UsageContent.tsx
│   │   │   │   └── page.tsx
│   │   │   └── users
│   │   │       ├── actions.ts
│   │   │       └── page.tsx
│   │   ├── api
│   │   │   ├── auth
│   │   │   │   ├── confirm
│   │   │   │   │   └── route.ts
│   │   │   │   └── logout
│   │   │   │       └── route.ts
│   │   │   ├── navigation
│   │   │   │   ├── main
│   │   │   │   │   └── route.ts
│   │   │   │   ├── secondary
│   │   │   │   │   └── route.ts
│   │   │   │   └── user
│   │   │   │       └── route.ts
│   │   │   ├── openmeter
│   │   │   │   └── track
│   │   │   │       └── route.ts
│   │   │   ├── pricing
│   │   │   │   ├── billing
│   │   │   │   │   └── route.ts
│   │   │   │   ├── cost
│   │   │   │   │   └── route.ts
│   │   │   │   ├── limits
│   │   │   │   │   └── route.ts
│   │   │   │   └── usage
│   │   │   │       └── route.ts
│   │   │   ├── projects
│   │   │   │   └── route.ts
│   │   │   ├── test-db-connection
│   │   │   │   └── route.ts
│   │   │   └── user
│   │   │       └── profile
│   │   │           └── route.ts
│   │   ├── favicon.ico
│   │   ├── fonts
│   │   │   ├── GeistMonoVF.woff
│   │   │   └── GeistVF.woff
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── protected
│   │       ├── 2fa-setup
│   │       │   └── page.tsx
│   │       ├── admin
│   │       │   └── users
│   │       │       └── page.tsx
│   │       ├── dashboard
│   │       │   └── page.tsx
│   │       └── layout.tsx
│   ├── components
│   │   ├── AdminSidebar.tsx
│   │   ├── Bar
│   │   │   ├── nav-main.tsx
│   │   │   ├── nav-projects.tsx
│   │   │   ├── nav-secondary.tsx
│   │   │   └── nav-user.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── PlatformSidebar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── app-sidebar.tsx
│   │   ├── theme-provider.tsx
│   │   └── ui
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx
│   │       ├── aspect-ratio.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── breadcrumb.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── collapsible.tsx
│   │       ├── command.tsx
│   │       ├── context-menu.tsx
│   │       ├── dialog.tsx
│   │       ├── drawer.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── hover-card.tsx
│   │       ├── input-otp.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── menubar.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── pagination.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── radio-group.tsx
│   │       ├── resizable.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── sonner.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toast.tsx
│   │       ├── toaster.tsx
│   │       ├── toggle-group.tsx
│   │       ├── toggle.tsx
│   │       └── tooltip.tsx
│   ├── config
│   │   └── routes.ts
│   ├── hooks
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   ├── useBillingData.ts
│   │   ├── useCostData.ts
│   │   ├── useLimitsData.ts
│   │   └── useUsageData.ts
│   ├── lib
│   │   ├── logger.ts
│   │   └── utils.ts
│   ├── styles
│   │   └── globals.css
│   ├── types
│   │   ├── navigation.ts
│   │   ├── supabase.ts
│   │   └── ui.ts
│   └── utils
│       ├── supabase
│       │   ├── client.ts
│       │   ├── middleware.ts
│       │   └── server.ts
│       ├── supabase-2fa.ts
│       └── supabase-admin.ts
├── tailwind.config.mjs
├── tree.md
└── tsconfig.json

51 directories, 138 files
.
├── README.md
├── components.json
├── middleware.ts
├── next-env.d.ts
├── next.config.mjs
├── node
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── prisma
│   └── schema.prisma
├── public
│   └── images
│       ├── esrs-efrag.webp
│       ├── favicon.ico
│       ├── logo128.svg
│       ├── logo256.svg
│       ├── logo32.svg
│       ├── logo512.svg
│       ├── logo64.svg
│       ├── logo96.svg
│       ├── risk-matrix.png
│       └── risk.png
├── scripts
│   ├── update-nav.mjs
│   └── validate-setup.mjs
├── src
│   ├── app
│   │   ├── (auth)
│   │   │   ├── layout.tsx
│   │   │   ├── login
│   │   │   │   ├── actions.ts
│   │   │   │   └── page.tsx
│   │   │   └── private
│   │   │       └── page.tsx
│   │   ├── (protected)
│   │   │   └── layout.tsx
│   │   ├── 2fa-verify
│   │   │   └── page.tsx
│   │   ├── @admin
│   │   │   ├── billing
│   │   │   │   ├── BillingContent.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── cost
│   │   │   │   ├── CostContent.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── limits
│   │   │   │   ├── LimitsContent.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── usage
│   │   │   │   ├── UsageContent.tsx
│   │   │   │   └── page.tsx
│   │   │   └── users
│   │   │       ├── actions.ts
│   │   │       └── page.tsx
│   │   ├── api
│   │   │   ├── auth
│   │   │   │   ├── confirm
│   │   │   │   │   └── route.ts
│   │   │   │   └── logout
│   │   │   │       └── route.ts
│   │   │   ├── navigation
│   │   │   │   ├── main
│   │   │   │   │   └── route.ts
│   │   │   │   ├── secondary
│   │   │   │   │   └── route.ts
│   │   │   │   └── user
│   │   │   │       └── route.ts
│   │   │   ├── openmeter
│   │   │   │   └── track
│   │   │   │       └── route.ts
│   │   │   ├── pricing
│   │   │   │   ├── billing
│   │   │   │   │   └── route.ts
│   │   │   │   ├── cost
│   │   │   │   │   └── route.ts
│   │   │   │   ├── limits
│   │   │   │   │   └── route.ts
│   │   │   │   └── usage
│   │   │   │       └── route.ts
│   │   │   ├── projects
│   │   │   │   └── route.ts
│   │   │   ├── test-db-connection
│   │   │   │   └── route.ts
│   │   │   └── user
│   │   │       └── profile
│   │   │           └── route.ts
│   │   ├── favicon.ico
│   │   ├── fonts
│   │   │   ├── GeistMonoVF.woff
│   │   │   └── GeistVF.woff
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── protected
│   │       ├── 2fa-setup
│   │       │   └── page.tsx
│   │       ├── admin
│   │       │   └── users
│   │       │       └── page.tsx
│   │       ├── dashboard
│   │       │   └── page.tsx
│   │       └── layout.tsx
│   ├── components
│   │   ├── AdminSidebar.tsx
│   │   ├── Bar
│   │   │   ├── nav-main.tsx
│   │   │   ├── nav-projects.tsx
│   │   │   ├── nav-secondary.tsx
│   │   │   └── nav-user.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── PlatformSidebar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── app-sidebar.tsx
│   │   ├── theme-provider.tsx
│   │   └── ui
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx
│   │       ├── aspect-ratio.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── breadcrumb.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── collapsible.tsx
│   │       ├── command.tsx
│   │       ├── context-menu.tsx
│   │       ├── dialog.tsx
│   │       ├── drawer.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── hover-card.tsx
│   │       ├── input-otp.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── menubar.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── pagination.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── radio-group.tsx
│   │       ├── resizable.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── sonner.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toast.tsx
│   │       ├── toaster.tsx
│   │       ├── toggle-group.tsx
│   │       ├── toggle.tsx
│   │       └── tooltip.tsx
│   ├── config
│   │   ├── navigation
│   │   │   └── main.json
│   │   └── routes.ts
│   ├── hooks
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   ├── useBillingData.ts
│   │   ├── useCostData.ts
│   │   ├── useLimitsData.ts
│   │   └── useUsageData.ts
│   ├── lib
│   │   ├── auth
│   │   │   └── rbac.ts
│   │   ├── cache.ts
│   │   ├── db.ts
│   │   ├── errors.ts
│   │   ├── logger.ts
│   │   ├── prisma.ts
│   │   ├── sessions.ts
│   │   └── utils.ts
│   ├── styles
│   │   └── globals.css
│   ├── types
│   │   ├── auth.ts
│   │   ├── navigation.ts
│   │   ├── supabase.ts
│   │   └── ui.ts
│   └── utils
│       ├── supabase
│       │   ├── client.ts
│       │   ├── middleware.ts
│       │   └── server.ts
│       ├── supabase-2fa.ts
│       └── supabase-admin.ts
├── tailwind.config.mjs
├── tree.md
└── tsconfig.json

54 directories, 149 files
.
├── README.md
├── components.json
├── middleware.ts
├── next-env.d.ts
├── next.config.mjs
├── node
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── prisma
│   ├── prisma
│   │   └── migrations.sql
│   └── schema.prisma
├── public
│   └── images
│       ├── esrs-efrag.webp
│       ├── favicon.ico
│       ├── logo128.svg
│       ├── logo256.svg
│       ├── logo32.svg
│       ├── logo512.svg
│       ├── logo64.svg
│       ├── logo96.svg
│       ├── risk-matrix.png
│       └── risk.png
├── scripts
│   ├── sync-prisma-supabase.mjs
│   ├── update-nav.mjs
│   └── validate-setup.mjs
├── src
│   ├── app
│   │   ├── (auth)
│   │   │   ├── layout.tsx
│   │   │   ├── login
│   │   │   │   ├── actions.ts
│   │   │   │   └── page.tsx
│   │   │   └── private
│   │   │       └── page.tsx
│   │   ├── (protected)
│   │   │   └── layout.tsx
│   │   ├── 2fa-verify
│   │   │   └── page.tsx
│   │   ├── @admin
│   │   │   ├── billing
│   │   │   │   ├── BillingContent.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── cost
│   │   │   │   ├── CostContent.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── limits
│   │   │   │   ├── LimitsContent.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── usage
│   │   │   │   ├── UsageContent.tsx
│   │   │   │   └── page.tsx
│   │   │   └── users
│   │   │       ├── actions.ts
│   │   │       └── page.tsx
│   │   ├── api
│   │   │   ├── auth
│   │   │   │   ├── confirm
│   │   │   │   │   └── route.ts
│   │   │   │   └── logout
│   │   │   │       └── route.ts
│   │   │   ├── navigation
│   │   │   │   ├── main
│   │   │   │   │   └── route.ts
│   │   │   │   ├── secondary
│   │   │   │   │   └── route.ts
│   │   │   │   └── user
│   │   │   │       └── route.ts
│   │   │   ├── openmeter
│   │   │   │   └── track
│   │   │   │       └── route.ts
│   │   │   ├── pricing
│   │   │   │   ├── billing
│   │   │   │   │   └── route.ts
│   │   │   │   ├── cost
│   │   │   │   │   └── route.ts
│   │   │   │   ├── limits
│   │   │   │   │   └── route.ts
│   │   │   │   └── usage
│   │   │   │       └── route.ts
│   │   │   ├── projects
│   │   │   │   └── route.ts
│   │   │   ├── test-db-connection
│   │   │   │   └── route.ts
│   │   │   └── user
│   │   │       └── profile
│   │   │           └── route.ts
│   │   ├── favicon.ico
│   │   ├── fonts
│   │   │   ├── GeistMonoVF.woff
│   │   │   └── GeistVF.woff
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── protected
│   │       ├── 2fa-setup
│   │       │   └── page.tsx
│   │       ├── admin
│   │       │   └── users
│   │       │       └── page.tsx
│   │       ├── dashboard
│   │       │   └── page.tsx
│   │       └── layout.tsx
│   ├── components
│   │   ├── AdminSidebar.tsx
│   │   ├── Bar
│   │   │   ├── nav-main.tsx
│   │   │   ├── nav-projects.tsx
│   │   │   ├── nav-secondary.tsx
│   │   │   └── nav-user.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── PlatformSidebar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── app-sidebar.tsx
│   │   ├── theme-provider.tsx
│   │   └── ui
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx
│   │       ├── aspect-ratio.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── breadcrumb.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── collapsible.tsx
│   │       ├── command.tsx
│   │       ├── context-menu.tsx
│   │       ├── dialog.tsx
│   │       ├── drawer.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── hover-card.tsx
│   │       ├── input-otp.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── menubar.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── pagination.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── radio-group.tsx
│   │       ├── resizable.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── sonner.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toast.tsx
│   │       ├── toaster.tsx
│   │       ├── toggle-group.tsx
│   │       ├── toggle.tsx
│   │       └── tooltip.tsx
│   ├── config
│   │   ├── navigation
│   │   │   └── main.json
│   │   └── routes.ts
│   ├── hooks
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   ├── useBillingData.ts
│   │   ├── useCostData.ts
│   │   ├── useLimitsData.ts
│   │   └── useUsageData.ts
│   ├── lib
│   │   ├── auth
│   │   │   └── rbac.ts
│   │   ├── cache.ts
│   │   ├── db.ts
│   │   ├── errors.ts
│   │   ├── logger.ts
│   │   ├── prisma.ts
│   │   ├── sessions.ts
│   │   └── utils.ts
│   ├── styles
│   │   └── globals.css
│   ├── types
│   │   ├── auth.ts
│   │   ├── middleware.ts
│   │   ├── navigation.ts
│   │   ├── supabase.ts
│   │   └── ui.ts
│   └── utils
│       ├── supabase
│       │   ├── client.ts
│       │   ├── middleware.ts
│       │   └── server.ts
│       ├── supabase-2fa.ts
│       └── supabase-admin.ts
├── tailwind.config.mjs
├── tree.md
└── tsconfig.json

55 directories, 152 files
