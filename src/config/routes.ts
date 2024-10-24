export const routes = {
  // Public routes
  home: "/",
  about: "/about",
  pricing: "/pricing",

  // Authentication routes
  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",

  // Protected routes
  dashboard: "/dashboard",
  profile: "/profile",
  settings: "/settings",

  // Admin routes
  adminDashboard: "/admin",
  adminUsers: "/admin/users",
  adminDetails: "/admin/details",
  adminWorkspaces: "/admin/workspaces",
  adminBilling: "/admin/billing",
  adminLimits: "/admin/limits",
  adminApiKeys: "/admin/api-keys",
  adminLogs: "/admin/logs",
  adminUsage: "/admin/usage",
  adminCost: "/admin/cost",

  // 2FA routes
  twoFactorSetup: "/2fa-setup",
  twoFactorVerify: "/2fa-verify",

  // API routes
  api: {
    users: "/api/users",
    auth: "/api/auth",
    admin: "/api/admin",
    authCallback: "/api/auth/confirm",
  },
} as const;

// Helper function to get route with parameters
export function getRoute(
  route: keyof typeof routes,
  params?: Record<string, string>,
): string {
  let path = routes[route];
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      path = path.replace(`:${key}`, value);
    });
  }
  return path;
}

// Usage example:
// import { getRoute } from '@/config/routes';
// const userProfileRoute = getRoute('profile', { userId: '123' });
