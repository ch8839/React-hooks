// 常见工具函数

export const getObjectPathValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc, cur) => acc && acc[cur], obj);
};