
export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  imageUrl: string;
  projectUrl: string;
  whatsappNumber: string;
  createdAt: string;
}

export enum ProjectCategory {
  SAAS = "SaaS",
  WEB_SYSTEM = "Sistema web",
  CMS = "CMS",
  APPS = "Aplicativos",
  PHP = "PHP script",
  WORDPRESS = "Temas do WordPress"
}

export const projectCategories = [
  ProjectCategory.SAAS,
  ProjectCategory.WEB_SYSTEM,
  ProjectCategory.CMS,
  ProjectCategory.APPS,
  ProjectCategory.PHP,
  ProjectCategory.WORDPRESS
];

export const getCategoryColor = (category: ProjectCategory): string => {
  switch (category) {
    case ProjectCategory.SAAS:
      return "bg-blue-500";
    case ProjectCategory.WEB_SYSTEM:
      return "bg-amber-500";
    case ProjectCategory.CMS:
      return "bg-purple-500";
    case ProjectCategory.APPS:
      return "bg-green-500";
    case ProjectCategory.PHP:
      return "bg-red-500";
    case ProjectCategory.WORDPRESS:
      return "bg-cyan-500";
    default:
      return "bg-gray-500";
  }
};
