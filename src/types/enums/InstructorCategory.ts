export const  InstructorCategory = {
  FrontendDevelopment: "FrontendDevelopment",
  BackendDevelopment: "BackendDevelopment",
  FullstackDevelopment: "FullstackDevelopment",
  UXUIDesign: "UXUIDesign",
  MobileDevelopment: "MobileDevelopment",
  DevOps: "DevOps",
  DataEngineering: "DataEngineering",
  DataScience: "DataScience",
  QualityAssurance: "QualityAssurance",
  ProductManagement: "ProductManagement",
  ProjectManagement: "ProjectManagement",
  SystemAdministration: "SystemAdministration",
  SecurityEngineering: "SecurityEngineering",
  CloudArchitecture: "CloudArchitecture",
  BusinessAnalysis: "BusinessAnalysis",
} as const;

export type InstructorCategory = typeof InstructorCategory[keyof typeof InstructorCategory];
