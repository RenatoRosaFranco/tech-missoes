import { enabled, type FeatureName } from "@/ui/site/site";
import nav from "./header.json";

export type NavItem = {
  href: string;
  label: string;
  feature?: FeatureName;
  children?: NavItem[];
};

export const navCta = nav.cta;
export const navLinks = enabled(nav.links as NavItem[]);
