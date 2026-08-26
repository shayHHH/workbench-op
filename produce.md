| 类别 | 统一技术选型 | 要求 |
| --- | --- | --- |
| 运行时 | Node.js 22 LTS | 所有服务统一 Node 22 |
| 开发语言 | TypeScript 5.x | 开启严格类型检查，不使用大量 `any` |
| 包管理 | pnpm | 使用 lockfile 锁定依赖版本 |
| 模块规范 | ESM | 不混用 CommonJS 与 ESM |
| 工程结构 | 模块化单体 | 按业务模块拆分，不直接拆成大量微服务 |
| 构建 | TypeScript Compiler / tsx | 开发使用 tsx，生产使用编译后的 JS |
| 配置 | dotenv + Zod | 所有环境变量必须经过 Zod 校验 |
新项目建议目录结构：
```text
bv-node-server/
├── src/
│   ├── app/
│   ├── config/
│   ├── common/
│   ├── middleware/
│   ├── modules/
│   │   ├── auth/
│   │   ├── permission/
│   │   ├── crm/
│   │   ├── merchant/
│   │   ├── quote/
│   │   ├── audit/
│   │   ├── wallet/
│   │   ├── transaction/
│   │   ├── workflow/
│   │   ├── file/
│   │   ├── notification/
│   │   └── meeting/
│   ├── jobs/
│   ├── integrations/
│   └── index.ts
├── tests/
├── docs/
├── Dockerfile
├── docker-compose.yml
└── package.json