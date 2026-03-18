# === 第一阶段：构建阶段 ===
FROM node:18-alpine AS build-stage

WORKDIR /app

# 安装 pnpm (使用 corepack 是 Node 官方推荐的方式)
RUN corepack enable && corepack prepare pnpm@9.7.1 --activate

# 拷贝 pnpm 的锁文件
COPY package.json pnpm-lock.yaml ./

# 使用 pnpm 安装依赖
# --frozen-lockfile 类似于 npm ci，确保版本严格一致
RUN pnpm install --frozen-lockfile

# 先拷贝 package.json 以利用 Docker 缓存
# COPY package*.json ./
# RUN npm install

# 拷贝所有源代码（建议配合 .dockerignore 使用）
COPY . .

# 执行生产环境打包
RUN pnpm run build

# === 第二阶段：运行阶段 ===
FROM nginx:stable-alpine

# 1. 从构建阶段拷贝编译好的静态文件到 Nginx 目录
COPY --from=build-stage /app/build /usr/share/nginx/html

# 2. 拷贝我们自定义的 nginx.conf 覆盖默认配置
# 注意：有些 Nginx 镜像的默认配置在 /etc/nginx/conf.d/default.conf
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]