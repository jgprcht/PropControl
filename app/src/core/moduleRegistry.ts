export type ModuleId =
  | "core"
  | "properties"
  | "tenants"
  | "expenses"
  | "financing"
  | "reporting"
  | "utilities"
  | "tax"
  | "documents";

export interface ModuleDefinition {
  id: ModuleId;
  displayName: string;
  enabled: boolean;
}

/**
 * Registry of all known modules.
 *
 * For S01 this is a static definition without runtime behavior.
 * Later slices can extend this with routes, permissions and feature flags.
 */
export const moduleRegistry: ModuleDefinition[] = [
  {
    id: "core",
    displayName: "Core Platform",
    enabled: true,
  },
  {
    id: "properties",
    displayName: "Properties",
    enabled: false,
  },
  {
    id: "tenants",
    displayName: "Tenants",
    enabled: false,
  },
  {
    id: "expenses",
    displayName: "Expenses",
    enabled: false,
  },
  {
    id: "financing",
    displayName: "Financing",
    enabled: false,
  },
  {
    id: "reporting",
    displayName: "Reporting",
    enabled: false,
  },
  {
    id: "utilities",
    displayName: "Utilities",
    enabled: false,
  },
  {
    id: "tax",
    displayName: "Tax",
    enabled: false,
  },
  {
    id: "documents",
    displayName: "Documents",
    enabled: false,
  },
];
