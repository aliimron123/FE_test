export interface MenuItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  subMenu?: SubMenuItem[];
}

export interface SubMenuItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}
