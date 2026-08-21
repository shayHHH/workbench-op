(() => {
  "use strict";

  const roles = {
    agent: { label: "初级交易员", name: "杨澜", title: "Junior Trader · JT-018", initials: "YL" },
    ops: { label: "高级交易员", name: "陈文静", title: "Senior Trader · ST-07", initials: "CJ" },
    payout: { label: "出款员", name: "何嘉敏", title: "Payout Clerk · PO-03", initials: "PO" },
    compliance: { label: "合规官", name: "Tina Lau", title: "合规官 · CO-02", initials: "TL" },
    manager: { label: "运营经理", name: "陆景然", title: "Operations Manager · OM-01", initials: "OM" },
    finance: { label: "财务", name: "许嘉怡", title: "Finance · FN-05", initials: "FN" },
    admin: { label: "Admin", name: "Peter Wong", title: "System Administrator", initials: "PW" }
  };

  const navByRole = {
    agent: [
      ["dashboard", "工作台", "⌂", 5], ["customers", "客户管理", "♙"], ["quoteCenter", "报价管理", "₿"],
      ["businessAccess", "业务准入", "⇪"], ["scheduleCenter", "排单中心", "≣"]
    ],
    ops: [
      ["dashboard", "工作台", "⌂", 6], ["customers", "客户管理", "♙"], ["quoteCenter", "报价管理", "₿"],
      ["businessAccess", "业务准入", "⇪"], ["scheduleReviewCenter", "出款审核", "▦"]
    ],
    payout: [
      ["dashboard", "工作台", "⌂", 5], ["cases", "处理队列", "▦", 5], ["receipts", "凭证匹配", "▧", 2]
    ],
    compliance: [
      ["dashboard", "工作台", "⌂", 4], ["cases", "审核队列", "▦", 3], ["kycConfig", "KYC list 配置", "≡"], ["audit", "审计日志", "◌"]
    ],
    manager: [
      ["dashboard", "工作台", "⌂", 6], ["customers", "客户管理", "♙"]
    ],
    finance: [
      ["dashboard", "工作台", "⌂", 4], ["customers", "客户管理", "♙"], ["commissions", "费率与佣金", "◇"]
    ],
    admin: [
      ["dashboard", "总览", "⌂"], ["customers", "全部客户", "♙"], ["config", "规则与权限", "⚙"], ["audit", "审计日志", "◌"]
    ]
  };

  const baseTimeline = [
    { title: "建立客户草稿", detail: "交易员 杨澜创建个人客户资料", role: "交易员", time: "今天 09:12" }
  ];

  const sampleSubCustomers = customer => ({
    "C-2026-0694": ["Northstar 贸易联系人 A", "Northstar 付款人 B"],
    "C-2026-0677": ["Aurora 投资人账户 A", "Aurora 受益人账户 B"],
    "C-2026-0658": ["Blue Harbor 付款联系人 A", "Blue Harbor 收款账户 B"],
    "C-2026-0636": ["Mosaic 董事账户 A", "Mosaic 运营联系人 B"],
    "C-2026-0614": ["Sunrise UBO 联系人 A", "Sunrise 付款人 B"],
    "C-2026-0599": ["Pacific Crest 历史联系人 A", "Pacific Crest 受益人 B"]
  }[customer.id] || [`${customer.name} 下级客户 A`, `${customer.name} 下级客户 B`]);

  const initialCustomers = () => [
    {
      id: "C-2026-0718", name: "陈嘉宁", enName: "JIA NING CHEN", type: "个人", region: "中国香港", agent: "杨澜",
      status: "未准入", risk: "低", updated: "今天 09:12", owner: "交易员 杨澜", dob: "1992-08-16", idMasked: "K8••••(3)",
      phone: "+852 •••• 2189", email: "j.chen••@mail.com", source: "交易员 转介", business: "SINO",
      documents: [
        { name: "香港身份证", meta: "ID_card_front.pdf · 已上传", state: "待识别", tone: "blue" },
        { name: "地址证明", meta: "address_proof.pdf · 2 页", state: "待检查", tone: "amber" },
        { name: "近三个月银行流水", meta: "bank_statement.pdf · 8 页", state: "待检查", tone: "amber" }
      ],
      timeline: [...baseTimeline]
    },
    {
      id: "C-2026-0694", name: "Northstar Trading Limited", enName: "NORTHSTAR TRADING LIMITED", type: "企业", region: "新加坡", agent: "杨澜",
      status: "材料审核中", risk: "中", updated: "今天 08:46", owner: "交易员 杨澜", dob: "2018-04-09", idMasked: "UEN 2018•••19N",
      phone: "+65 •••• 8821", email: "ops••@northstar.sg", source: "交易员 转介", business: "SGB",
      documents: [
        { name: "公司注册证书", meta: "certificate.pdf · 已验证", state: "已通过", tone: "teal" },
        { name: "董事及 UBO 名单", meta: "ubo_register.pdf · 缺签署页", state: "需补件", tone: "red" },
        { name: "公司银行流水", meta: "statement_q2.pdf · 14 页", state: "已通过", tone: "teal" }
      ],
      timeline: [
        { title: "发起补件", detail: "需补充 UBO 名单签署页", role: "运营 陈文静", time: "今天 08:46" },
        { title: "运营预审", detail: "完成企业资料初步检查", role: "运营 陈文静", time: "昨天 17:32" }
      ]
    },
    {
      id: "C-2026-0588", name: "林雅雯", enName: "YA WEN LIN", type: "个人", region: "中国大陆", agent: "周辰",
      status: "已排单", risk: "低", updated: "今天 10:18", owner: "交易员 周辰", dob: "1987-11-03", idMasked: "E9••••(8)",
      phone: "+86 138 •••• 9077", email: "yawen••@mail.com", source: "已有客户", business: "SINO",
      documents: [
        { name: "身份证明", meta: "passport.pdf · 有效至 2031-08", state: "已通过", tone: "teal" },
        { name: "追加银行流水", meta: "bank_2026_06.pdf · 新上传", state: "待复核", tone: "amber" }
      ],
      materialSubmission: {
        applicationId: "APP-20260713-0588",
        generationPath: "ocr",
        submittedAt: "今天 10:42",
        items: [
          { category: "身份证明", name: "passport.pdf", url: "assets/trustpass-stage1-template.pdf", opsDecision: "通过", versions: [{ version: "v1" }] },
          { category: "地址证明", name: "address_proof_2026_06.pdf", url: "assets/trustpass-stage1-template.pdf", opsDecision: "待审核", versions: [{ version: "v1" }] },
          { category: "银行月结单", name: "bank_2026_06.pdf", url: "assets/trustpass-stage1-template.pdf", opsDecision: "待审核", versions: [{ version: "v1" }] }
        ],
        applicationPdf: { filename: "APP-20260713-0588_v1.pdf", name: "APP-20260713-0588_v1.pdf", url: "assets/trustpass-stage1-template.pdf" },
        signedPdf: { filename: "APP-20260713-0588_signed.pdf", name: "APP-20260713-0588_signed.pdf", url: "assets/trustpass-stage1-template.pdf" }
      },
      statusLog: [
        { from: "审核通过", to: "已排单", operator: "交易员 杨澜", time: "今天 10:18", note: "排单 SCH-20260819-001 已提交审核" },
        { from: "材料审核中", to: "审核通过", operator: "合规 Tina Lau", time: "2026-04-18 14:06", note: "合规审核标记通过" }
      ],
      timeline: [
        { title: "排单已提交", detail: "SCH-20260819-001 · 美元出款排单已提交审核", role: "交易员 杨澜", time: "今天 10:18" },
        { title: "追加流水", detail: "为新额度申请上传最近三个月流水", role: "交易员 周辰", time: "昨天 16:20" },
        { title: "客户准入通过", detail: "低风险个人客户", role: "合规 Tina", time: "2026-04-18 14:06" }
      ]
    },
    {
      id: "C-2026-0711", name: "赵明远", enName: "MING YUAN ZHAO", type: "个人", region: "中国大陆", agent: "杨澜",
      status: "材料审核中", risk: "高", updated: "昨天 15:04", owner: "合规 Tina", dob: "1979-02-27", idMasked: "P1••••(4)",
      phone: "+86 186 •••• 1204", email: "zmy••@mail.com", source: "交易员 转介", business: "SGB",
      documents: [
        { name: "护照", meta: "passport.pdf · 已验证", state: "已通过", tone: "teal" },
        { name: "资金来源说明", meta: "source_of_funds.pdf · 待确认", state: "风险复核", tone: "red" }
      ],
      timeline: [{ title: "提交合规", detail: "规则命中：高风险地区关联", role: "运营 陈文静", time: "昨天 15:04" }]
    },
    {
      id: "C-2026-0677", name: "Aurora Capital Pte. Ltd.", enName: "AURORA CAPITAL PTE. LTD.", type: "企业", region: "新加坡", agent: "陈浩",
      status: "交易中", risk: "中", updated: "07-08 16:40", owner: "运营 陈文静", dob: "2021-09-15", idMasked: "UEN 2021•••72R",
      phone: "+65 •••• 1742", email: "finance••@aurora.sg", source: "交易员 转介", business: "SGB",
      documents: [{ name: "完整 KYB 文件包", meta: "kyb_bundle.zip · 12 项", state: "已通过", tone: "teal" }],
      statusLog: [
        { from: "已排单", to: "交易中", operator: "高级交易员 陈文静", time: "07-08 16:40", note: "HKD 702,000 等值交易处理中" },
        { from: "审核通过", to: "已排单", operator: "交易员 陈浩", time: "07-08 12:05", note: "排单已提交审核" }
      ],
      timeline: [
        { title: "标记交易中", detail: "HKD 702,000 等值交易处理中", role: "高级交易员 陈文静", time: "07-08 16:40" },
        { title: "合规审核通过", detail: "企业 KYB 材料合规标记通过", role: "合规 Tina", time: "07-08 11:48" }
      ]
    },
    {
      id: "C-2026-0662", name: "吴思颖", enName: "SI YING NG", type: "个人", region: "中国香港", agent: "杨澜",
      status: "未准入", risk: "低", updated: "07-07 14:22", owner: "交易员 杨澜", dob: "1995-01-19", idMasked: "A6••••(0)",
      phone: "+852 •••• 9031", email: "syng••@mail.com", source: "门店到访", business: "SINO",
      documents: [
        { name: "香港身份证", meta: "hkid_front.jpg · 已上传", state: "已识别", tone: "teal" },
        { name: "地址证明", meta: "待上传", state: "待补件", tone: "amber" }
      ],
      timeline: [{ title: "资料暂存", detail: "等待客户补交地址证明", role: "交易员 杨澜", time: "07-07 14:22" }]
    },
    {
      id: "C-2026-0658", name: "Blue Harbor Services Limited", enName: "BLUE HARBOR SERVICES LIMITED", type: "企业", region: "中国香港", agent: "周辰",
      status: "材料审核中", risk: "中", updated: "07-07 10:15", owner: "运营 陈文静", dob: "2020-06-30", idMasked: "BR 712•••91",
      phone: "+852 •••• 5168", email: "admin••@blueharbor.hk", source: "中介转介", business: "SGB",
      documents: [
        { name: "商业登记证", meta: "br_2026.pdf · 已上传", state: "待检查", tone: "amber" },
        { name: "董事身份证明", meta: "directors.zip · 3 项", state: "待检查", tone: "amber" }
      ],
      timeline: [{ title: "提交运营", detail: "企业 KYB 文件包已上传", role: "交易员 周辰", time: "07-07 10:15" }]
    },
    {
      id: "C-2026-0636", name: "Mosaic Ventures Pte. Ltd.", enName: "MOSAIC VENTURES PTE. LTD.", type: "企业", region: "新加坡", agent: "杨澜",
      status: "审核通过", risk: "中", updated: "07-05 12:08", owner: "运营 陈文静", dob: "2019-12-02", idMasked: "UEN 2019•••44K",
      phone: "+65 •••• 3029", email: "ops••@mosaic.sg", source: "交易员 转介", business: "SGB",
      documents: [{ name: "企业开户文件包", meta: "mosaic_kyb.zip · 10 项", state: "已通过", tone: "teal" }],
      timeline: [{ title: "合规通过", detail: "等待运营提交银行批次", role: "合规 Tina", time: "07-05 12:08" }]
    },
    {
      id: "C-2026-0628", name: "李婉晴", enName: "WAN QING LI", type: "个人", region: "中国香港", agent: "周辰",
      status: "已成交", risk: "低", updated: "07-06 15:12", owner: "交易员 周辰", dob: "1989-10-21", idMasked: "M3••••(7)",
      phone: "+852 •••• 7640", email: "wqli••@mail.com", source: "老客户推荐", business: "SINO",
      documents: [
        { name: "出款水单 · SCH-20260817-002", meta: "SGB-回单-20260818.pdf · USD 220,000.00 · PAY-20260817-002", state: "已归档", tone: "teal", flow: "compliance", flowLabel: "出款凭证", uploadedAt: "08-18", url: "assets/trustpass-stage1-template.pdf" },
        { name: "完整 KYC 文件包", meta: "kyc_bundle.zip · 8 项", state: "已通过", tone: "teal" }
      ],
      statusLog: [
        { from: "交易中", to: "已成交", operator: "高级交易员 陈文静", time: "07-06 15:12", note: "客户交易完成，凭证已归档" },
        { from: "审核通过", to: "交易中", operator: "高级交易员 陈文静", time: "07-05 10:02", note: "客户开始首笔交易" }
      ],
      timeline: [
        { title: "标记已成交", detail: "客户交易完成，凭证已归档", role: "高级交易员 陈文静", time: "07-06 15:12" },
        { title: "标记交易中", detail: "客户开始首笔交易", role: "高级交易员 陈文静", time: "07-05 10:02" },
        { title: "客户准入通过", detail: "合规审核标记通过", role: "合规 Tina", time: "07-04 09:36" }
      ]
    },
    {
      id: "C-2026-0614", name: "Sunrise Exchange HK Limited", enName: "SUNRISE EXCHANGE HK LIMITED", type: "企业", region: "中国香港", agent: "陈浩",
      status: "合规驳回", risk: "高", updated: "07-03 18:18", owner: "交易员 陈浩", dob: "2017-08-11", idMasked: "BR 664•••30",
      phone: "+852 •••• 6119", email: "legal••@sunrise.hk", source: "中介转介", business: "SGB",
      documents: [{ name: "资金来源说明", meta: "sof_statement.pdf · 待补充", state: "需补件", tone: "red" }],
      timeline: [{ title: "合规驳回", detail: "需补充 UBO 资金来源证明", role: "合规 Tina", time: "07-03 18:18" }]
    },
    {
      id: "C-2026-0607", name: "郑凯文", enName: "KAIVEN CHENG", type: "个人", region: "中国大陆", agent: "杨澜",
      status: "审核通过", risk: "中", updated: "07-02 11:09", owner: "交易员 杨澜", dob: "1984-05-28", idMasked: "E1••••(5)",
      phone: "+86 136 •••• 0207", email: "kcheng••@mail.com", source: "交易员 转介", business: "SGB",
      documents: [{ name: "银行流水", meta: "statement_3m.pdf · 已通过审核", state: "已通过", tone: "teal" }],
      timeline: [{ title: "合规审核通过", detail: "个人 KYC 材料合规标记通过，可发起排单", role: "合规 Tina", time: "07-02 11:09" }]
    },
    {
      id: "C-2026-0599", name: "Pacific Crest Holdings Ltd.", enName: "PACIFIC CREST HOLDINGS LTD.", type: "企业", region: "中国香港", agent: "周辰",
      status: "未准入", risk: "中", updated: "07-01 15:27", owner: "运营 陈文静", dob: "2016-02-17", idMasked: "BR 539•••77",
      phone: "+852 •••• 4438", email: "corp••@pacificcrest.hk", source: "已有客户", business: "SINO",
      documents: [{ name: "历史 KYB 文件", meta: "archive_2025.zip · 已归档", state: "已通过", tone: "teal" }],
      timeline: [{ title: "业务终止", detail: "客户主动取消本次申请", role: "运营 陈文静", time: "07-01 15:27" }]
    }
  ].map((customer, index) => ({
    ...customer,
    documents: (customer.documents || []).map(doc => ({
      ...doc,
      flow: doc.flow || (customer.status === "未准入" ? "library" : "compliance"),
      flowLabel: doc.flowLabel || (customer.status === "未准入" ? "仅存材料库" : "已提交合规")
    })),
    clientNo: String(20001 + index),
    customerKind: customer.type === "企业" ? "中介" : "直客",
    subCustomers: customer.type === "企业" ? [
      { id: `${customer.id}-SUB-01`, name: sampleSubCustomers(customer)[0], clientNo: index === 1 ? "20012" : "", status: "未准入", region: customer.region, type: "个人" },
      { id: `${customer.id}-SUB-02`, name: sampleSubCustomers(customer)[1], clientNo: "", status: "未准入", region: customer.region, type: "个人" }
    ] : []
  }));

  const opsStatuses = ["待运营审核", "待客户补件", "合规驳回", "待提交银行", "银行审核中", "审核通过", "交易中", "已终止"];

  const initialCases = () => [
    { id: "OPS-260718", customerId: "C-2026-0718", customer: "陈嘉宁", type: "个人 KYC", status: "待运营审核", source: "交易员 提交", agent: "杨澜", owner: "陈文静", entered: "今天 09:42", sla: "剩余 1h 36m", risk: "低", completeness: "8 / 9", previous: "交易员 完成材料提交", next: "审核材料并决定补件或提交合规", note: "地址证明第二页签发机构信息不清晰。", bankRef: "未提交", result: "待处理" },
    { id: "OPS-260694", customerId: "C-2026-0694", customer: "Northstar Trading Limited", type: "企业 KYB", status: "待客户补件", source: "运营退回", agent: "杨澜", owner: "杨澜", entered: "今天 08:46", sla: "剩余 5h 14m", risk: "中", completeness: "7 / 9", previous: "运营发起补件", next: "跟进 UBO 名单签署页", note: "缺少 UBO 名单最后一页签署。", bankRef: "未提交", result: "等待客户" },
    { id: "OPS-260711", customerId: "C-2026-0711", customer: "赵明远", type: "个人 KYC", status: "合规驳回", source: "合规退回", agent: "杨澜", owner: "陈文静", entered: "昨天 16:28", sla: "已等待 17h", risk: "高", completeness: "9 / 9", previous: "合规驳回", next: "通知 交易员 补充资金来源说明", note: "资金来源说明不足以解释近期大额入账。", bankRef: "未提交", result: "合规驳回" },
    { id: "OPS-260677", customerId: "C-2026-0677", customer: "Aurora Capital Pte. Ltd.", type: "企业 KYB", status: "待提交银行", source: "合规通过", agent: "陈浩", owner: "陈文静", entered: "今天 09:05", sla: "剩余 3h 55m", risk: "中", completeness: "12 / 12", previous: "合规审核通过", next: "填写银行提交信息", note: "材料快照已生成，可提交银行。", bankRef: "待生成", result: "合规通过" },
    { id: "OPS-260681", customerId: "C-2026-0588", customer: "林雅雯", type: "个人 KYC", status: "银行审核中", source: "运营送审", agent: "周辰", owner: "陈文静", entered: "昨天 11:20", sla: "已等待 22h", risk: "低", completeness: "9 / 9", previous: "已提交 HSBC APP", next: "录入银行审核结果", note: "银行批次 B-0710-03。", bankRef: "BK-20260710-018", result: "等待银行" },
    { id: "OPS-260644", customerId: "C-2026-0588", customer: "林雅雯", type: "追加业务", status: "审核通过", source: "银行回传", agent: "周辰", owner: "陈文静", entered: "07-09 15:06", sla: "已通过", risk: "低", completeness: "9 / 9", previous: "银行审核通过", next: "创建或关联交易", note: "银行结果已验证。", bankRef: "BK-20260709-041", result: "通过" },
    { id: "OPS-260633", customerId: "C-2026-0677", customer: "Aurora Capital Pte. Ltd.", type: "企业交易", status: "交易中", source: "运营建单", agent: "陈浩", owner: "陈文静", entered: "07-08 16:40", sla: "T+1", risk: "中", completeness: "12 / 12", previous: "已关联额度和水单", next: "更新交易进度", note: "HKD 702,000 等值交易处理中。", bankRef: "BK-20260708-019", result: "执行中" },
    { id: "OPS-260601", customerId: "C-2026-0694", customer: "Northstar Trading Limited", type: "企业 KYB", status: "已终止", source: "银行结果", agent: "杨澜", owner: "陈文静", entered: "07-06 14:12", sla: "已关闭", risk: "中", completeness: "9 / 9", previous: "银行审核拒绝", next: "无后续操作", note: "银行未接受本次申请，需新建业务后方可重提。", bankRef: "BK-20260705-008", result: "银行拒绝", terminationType: "银行拒绝", terminationReason: "银行内部准入标准未满足" },
    { id: "CMP-260702", customerId: "C-2026-0718", customer: "陈嘉宁", type: "个人 KYC", status: "待合规审核", source: "运营提交", agent: "杨澜", owner: "Tina Lau", entered: "今天 10:08", sla: "剩余 3h 52m", risk: "低", completeness: "9 / 9", previous: "运营材料审核通过", next: "合规人工复核", note: "规则建议低风险，地址证明异常已由运营确认。", bankRef: "未提交", result: "待合规结论" },
    { id: "OPS-260731", customerId: "C-2026-0588", customer: "林雅雯", type: "个人 KYC", status: "待运营审核", source: "交易员 新申报", agent: "周辰", owner: "陈文静", entered: "今天 10:42", sla: "剩余 3h 18m", risk: "低", completeness: "7 / 8", previous: "交易员 提交材料", next: "核对银行月结单与地址证明", note: "申请表已签署，银行月结单文件名与材料项不一致。", bankRef: "未提交", result: "待处理" },
    { id: "OPS-260728", customerId: "C-2026-0718", customer: "陈嘉宁", type: "地址证明补件", status: "待客户补件", source: "运营退回", agent: "杨澜", owner: "陈文静", entered: "今天 09:26", sla: "剩余 1d 6h", risk: "低", completeness: "7 / 8", previous: "运营发起补件", next: "等待 交易员 上传地址证明第二页", note: "当前地址证明缺少签发机构信息页。", bankRef: "未提交", result: "等待客户材料" },
    { id: "OPS-260724", customerId: "C-2026-0694", customer: "Northstar Trading Limited", type: "企业 KYB", status: "合规驳回", source: "合规退回", agent: "杨澜", owner: "陈文静", entered: "昨天 18:05", sla: "已等待 16h", risk: "高", completeness: "11 / 12", previous: "合规驳回", next: "补充 UBO 资金来源证明", note: "最终受益人资金来源说明缺少支持文件。", bankRef: "未提交", result: "合规驳回" },
    { id: "OPS-260719", customerId: "C-2026-0711", customer: "赵明远", type: "个人 KYC", status: "待提交银行", source: "合规通过", agent: "杨澜", owner: "陈文静", entered: "今天 08:54", sla: "剩余 4h 06m", risk: "中", completeness: "8 / 8", previous: "合规审核通过", next: "填写银行批次与外部参考号", note: "材料快照已锁定，等待选择提交银行。", bankRef: "待生成", result: "合规通过" },
    { id: "OPS-260714", customerId: "C-2026-0677", customer: "Aurora Capital Pte. Ltd.", type: "企业 KYB", status: "银行审核中", source: "运营送审", agent: "陈浩", owner: "陈文静", entered: "昨天 15:40", sla: "已等待 19h", risk: "中", completeness: "12 / 12", previous: "已提交 BOC Online", next: "跟进银行补充问题", note: "银行要求确认董事授权书签署日期。", bankRef: "BK-20260712-027", result: "等待银行" },
    { id: "OPS-260705", customerId: "C-2026-0718", customer: "陈嘉宁", type: "个人追加业务", status: "审核通过", source: "银行回传", agent: "杨澜", owner: "陈文静", entered: "07-11 17:22", sla: "已通过", risk: "低", completeness: "8 / 8", previous: "银行审核通过", next: "创建额度预约或关联交易", note: "HSBC APP 已返回通过结果。", bankRef: "BK-20260711-052", result: "通过" },
    { id: "OPS-260698", customerId: "C-2026-0588", customer: "林雅雯", type: "个人交易", status: "交易中", source: "运营建单", agent: "周辰", owner: "陈文静", entered: "07-10 13:18", sla: "T+1", risk: "低", completeness: "8 / 8", previous: "已关联额度和水单", next: "等待银行执行结果", note: "USD 62,000 等值交易正在执行。", bankRef: "BK-20260710-061", result: "执行中" },
    { id: "OPS-260690", customerId: "C-2026-0711", customer: "赵明远", type: "个人 KYC", status: "已终止", source: "业务取消", agent: "杨澜", owner: "陈文静", entered: "07-09 11:35", sla: "已关闭", risk: "中", completeness: "8 / 8", previous: "交易员 申请取消", next: "无后续操作", note: "客户调整业务计划，主动取消本次申请。", bankRef: "未提交", result: "业务取消", terminationType: "业务取消", terminationReason: "客户主动取消本次准入申请" }
  ];

  const flowActions = [
    { track: "U换现金", role: "agent", label: "创建卖U订单", title: "客户卖出 USDT，建立现金交收订单", desc: "交易员 录入客户、USDT 数量、回收报价、交收地点和是否中介客户。系统生成待收 U 的交易单。", status: "交易报价中", event: "创建 U换现金订单", detail: "客户计划卖出 20,000 USDT，现金交收地点为 Kingcoin 旺角店", evidence: ["交易类型|U换现金", "客户卖出|20,000 USDT", "交收地点|Kingcoin 旺角"] },
    { track: "U换现金", role: "ops", label: "提供收U地址", title: "提供公司 USDT 收款地址并校验客户地址", desc: "运营选择本次交易专用收款地址，记录客户钱包地址查验结果；新地址需要语音确认并建议小额测试。", status: "地址校验中", event: "收款地址已提供", detail: "TRC20 收款地址已发出，客户地址已通过白名单查验", evidence: ["地址状态|白名单通过", "验证方式|语音确认", "测试建议|先转 10 U"] },
    { track: "U换现金", role: "ops", label: "确认USDT到账", title: "链上查 U 并计算应付现金", desc: "荷包管理员查询链上到账，交易财务按约定 rate 计算现金金额，并进行 Double Check。", status: "到账复核中", event: "USDT 到账确认", detail: "到账 20,000 USDT，按 7.82 计算应付 HKD 156,400 现金", evidence: ["到账数量|20,000 U", "计算公式|U x rate = 法币", "应付现金|HKD 156,400"] },
    { track: "U换现金", role: "ops", label: "交付现金", title: "核对信物并完成现金交收", desc: "客户到场出示 token 信物，现场人员核对无误后交付现金，客户确认金额后关闭订单。", status: "交易完成", event: "现金已交付", detail: "现场核对信物后完成 HKD 156,400 现金交收", evidence: ["信物|Token 照片", "现场核对|已通过", "客户确认|现金无误"] },

    { track: "现金换U", role: "agent", label: "创建买U订单", title: "客户使用现金购买 USDT", desc: "交易员 录入现金金额、报价、交收地点和收币地址需求，系统计算应发送 USDT 数量。", status: "交易报价中", event: "创建现金换U订单", detail: "客户计划用 HKD 156,400 购买 20,000 USDT", evidence: ["交易类型|现金换U", "现金金额|HKD 156,400", "计算公式|法币 / rate = U"] },
    { track: "现金换U", role: "ops", label: "验收现金", title: "核对信物并现场验钞", desc: "系统记录唯一信物编号，现场人员核对信物、清点现金并上传验收结果，发现假钞或金额不符必须进入异常。", status: "现金验收中", event: "现金已验收", detail: "客户现金清点无误，允许进入转 U 阶段", evidence: ["信物|唯一编号", "验钞|无异常", "可转金额|20,000 U"] },
    { track: "现金换U", role: "ops", label: "发送USDT", title: "校验客户收币地址并发送 USDT", desc: "客户提供收 U 地址，新地址进入白名单和小额测试，确认测试到账后由荷包管理员发送剩余 USDT。", status: "交易完成", event: "USDT 已发送", detail: "测试到账后已向客户地址发送剩余 19,990 USDT", evidence: ["地址验证|白名单通过", "小额测试|10 U 已确认", "正式发送|19,990 U"] },

    { track: "U换转账", role: "compliance", label: "KYC审核", title: "客户卖 U 并收银行转账，先做 KYC 与账户审查", desc: "系统识别账户类型：个人同名、POBO、公司账户或第三方账户。第三方和公司账户需合规复核后才能继续。", status: "待合规审核", event: "转账收款 KYC 通过", detail: "客户同名银行账户通过内部与银行端双重 KYC", evidence: ["账户类型|个人同名", "KYC|内部 + 银行端", "风险标记|第三方需审批"] },
    { track: "U换转账", role: "ops", label: "收U并排单", title: "确认 USDT 到账并进入内部派单", desc: "系统查 U 后将订单排入出单群，整理第二日出款列表；出款前必须进行 Second Double Check。", status: "出款排单中", event: "出款排单已生成", detail: "20,000 USDT 已到账，订单进入明日银行出款排单", evidence: ["到账数量|20,000 U", "出款时效|T+1 / T+2", "复核|Second Double Check"] },
    { track: "U换转账", role: "ops", label: "执行银行转账", title: "执行银行转账并归档水单", desc: "财务通过银行系统付款，同事核对收款人姓名、账号、金额后上传水单或 MT103，客户确认到账后完成。", status: "交易完成", event: "银行转账已完成", detail: "付款水单已归档，客户确认同名账户到账", evidence: ["收款人|姓名账号已复核", "凭证|水单 / MT103", "客户确认|已到账"] },

    { track: "转账换U", role: "agent", label: "登记入款", title: "客户银行转账购买 USDT", desc: "客户将法币汇入公司指定账户或 VA 账户，系统记录入款账户、金额和上传水单。", status: "入款待确认", event: "客户入款已登记", detail: "客户上传 HKD 156,400 银行转账凭证，等待财务查账", evidence: ["入款路径|公司账户 / VA", "凭证|客户水单", "金额|HKD 156,400"] },
    { track: "转账换U", role: "ops", label: "查账计U", title: "财务确认到账并计算应发 USDT", desc: "财务根据水单查账，按最终到账金额和确认汇率计算 USDT 数量，必要时进行小额测试。", status: "到账复核中", event: "入款到账确认", detail: "到账金额已确认，按 7.82 计算应发 20,000 USDT", evidence: ["计算公式|法币金额 / rate = U", "应发数量|20,000 U", "地址验证|新地址需语音"] },
    { track: "转账换U", role: "ops", label: "发送USDT", title: "发送 USDT 并归档交易凭证", desc: "荷包管理员向客户白名单地址发送 USDT，系统保存交易哈希、截图和客户确认结果。", status: "交易完成", event: "USDT 出币完成", detail: "USDT 已转入客户钱包，交易哈希和截图已归档", evidence: ["链|TRC20", "哈希|已记录", "客户确认|已收币"] },

    { track: "法币换法币", role: "compliance", label: "流水与KYC", title: "公对私法币兑换的流水审核与 KYC", desc: "客户先提交人民币出款银行卡流水，通过后进入 KYC；同名账户和第三方账户采用不同手续费规则。", status: "待合规审核", event: "法币兑换准入通过", detail: "客户流水与 KYC 已通过，可申请同名外币打款", evidence: ["流水审核|已通过", "手续费|同名 0.2% / 第三方 0.3%", "USDT结费|免手续费"] },
    { track: "法币换法币", role: "agent", label: "确认报价", title: "确认当日报价、额度和预约", desc: "每天 11:30 后提供当日汇率报价。系统检查单笔、当日限额和额度预约，确保足额后才允许下单。", status: "报价已确认", event: "法币换法币报价确认", detail: "客户确认 CNY 1,000,000 兑换 USD，额度已预约", evidence: ["报价时间|11:30 后", "额度检查|已通过", "预约|前一日完成"] },
    { track: "法币换法币", role: "ops", label: "确认入账", title: "客户打款后 30 分钟内查账确认", desc: "客户将人民币资金打入公司指定账户并上传截图，财务查账确认后通知客户。", status: "入款待确认", event: "人民币入账确认", detail: "财务已根据截图查账并确认到账", evidence: ["客户打款|公司指定账户", "查账时限|30 分钟", "截图|已归档"] },
    { track: "法币换法币", role: "ops", label: "外币出款", title: "2-3 小时内外币打入客户指定账户", desc: "出款同事执行外币打款，上传付款凭证；客户确认收到外币后，订单完成。", status: "交易完成", event: "外币出款完成", detail: "外币款项已打入客户指定账户，客户确认收款", evidence: ["出款时效|2-3 小时", "凭证|已上传", "客户确认|已收款"] }
  ];

  const flowTracks = [
    { name: "U换现金", key: "U换现金", steps: ["建单报价", "地址校验", "查U计数", "现金交收"] },
    { name: "现金换U", key: "现金换U", steps: ["建单计U", "现金验收", "发U完成"] },
    { name: "U换转账", key: "U换转账", steps: ["KYC审核", "收U排单", "银行出款"] },
    { name: "转账换U", key: "转账换U", steps: ["登记入款", "查账计U", "发U完成"] },
    { name: "法币换法币", key: "法币换法币", steps: ["流水KYC", "报价额度", "入账确认", "外币出款"] }
  ];

  const initialMaterialFlow = () => ({
    mode: "list",
    step: 1,
    customerId: null,
    applicationId: "",
    authorized: false,
    files: [],
    generationPath: null,
    ocrComplete: false,
    editedFields: new Set(),
    confirmed: false,
    submitted: false,
    pdfVersions: [],
    signedPdf: null,
    form: {}
  });

  const initialQuickMaterialUpload = () => ({
    customerNo: "",
    customerDropdownOpen: false,
    customerHighlightIndex: 0,
    files: [],
    destination: "library",
    businessType: "公户人民币买私户美金/港币/外币",
    kycScenarioId: 1,
    kycChannelIndex: 0,
    customerName: "",
    submitNote: "",
    archiveTarget: "sub",
    subMode: "new",
    newSubName: ""
  });

  const quickBusinessTypes = ["U换现金", "现金换U", "转账TT换U", "U换转账TT", "现金兑换"];

  const kycEngineItem = (name, subRequirement, type = "file", required = true, validity = "none") => ({
    id: `KYC-${Math.random().toString(36).slice(2, 9)}`,
    name, subRequirement, type, required, validity
  });

  const initialKycConfig = () => ({
    isEditing: true,
    lastSavedAt: "",
    searchQuery: "",
    selectedScenarioId: 1,
    activeChannelIndex: 0,
    scenarios: [
      {
        id: 1,
        code: "1",
        name: "港币/美元/外币私户打款买U",
        processDescription: "1. 审核流水，流水通过后我们才能接收该账户款项。\n2. 给我们对应的 KYC 和开户所需的文件。\n3. KYC 和 VA 账户通过后可以开始交易。\n4. 我们提供收款账户信息、收款账户名。\n5. 客户打款到指定的收款账户，提供水单给我们查账，到账后我们通知。\n6. 按照收款当天的汇率计算对应的 U 数，并跟客户确认收 U 地址，排单回 U。\n7. 回 U 后发出 U 水单给客户，客户查收，交易完成。",
        channels: [
          {
            id: "s1_sgb",
            name: "SGB",
            theme: "red",
            restrictions: [
              { type: "bank_ban", content: "暂不接受这三家银行出款给我们：招商永隆、交通银行、花旗银行（香港）。" },
              { type: "special_proof", content: "以上资料提交齐全后，如后期遇到银行合规审查需要，仍有机会需要提供更多额外文件。" }
            ],
            sections: [
              {
                title: "SGB - 个人出款材料",
                items: [
                  kycEngineItem("有效的个人身份证明文件", "护照 / 香港永居身份证 / 通行证等。"),
                  kycEngineItem("Bitvast Onboarding Form", "入驻表格。"),
                  kycEngineItem("最近一个月出款账户流水", "需能证明资金来源。", "file", true, "1m"),
                  kycEngineItem("手持证件及自愿买U声明自拍照", "手持护照/通行证/回乡证以及自愿买U声明自拍一张，具体格式参考示范图片，地址要发文字版本。")
                ]
              }
            ]
          },
          {
            id: "s1_sino",
            name: "SINO",
            theme: "blue",
            restrictions: [
              { type: "special_proof", content: "此业务方向 SINO 渠道暂停，恢复前请改用 SGB 或外部供应商渠道。" }
            ],
            sections: []
          },
          {
            id: "s1_vendor",
            name: "外部供应商",
            theme: "amber",
            restrictions: [
              { type: "special_proof", content: "环盛 2109 渠道只接受香港本地资金。" },
              { type: "special_proof", content: "以上资料提交齐全后，因应银行合规审查需要，仍有机会需要提供更多额外文件。" }
            ],
            sections: [
              {
                title: "环盛 2109 - 私户港币/外币买U",
                items: [
                  kycEngineItem("身份证明文件", "内地人：身份证+通行证/护照；香港人：永居身份证+最近 3 个月有效地址证明；外国人：护照+3 个月内的香港银行月结单作为地址证明。"),
                  kycEngineItem("出款户口最近 3 个月月结单", "完整月结单，不可遮挡。", "file", true, "3m"),
                  kycEngineItem("任职公司全称 + 职位", "以文字提供。", "text"),
                  kycEngineItem("出款人手持证件和自愿买U证明自拍", "详细参考示范图片，收 U 地址需要发文字版。")
                ]
              },
              {
                title: "MSB - 私户外币买U（3 月 16 日更新）",
                items: [
                  kycEngineItem("客户出账账户银行流水", "需提供最新一个月，日期需显示到提交资料的前一天，并完整显示交易对手信息，能穿透资金来源，否则会要求更长时段的流水或额外文件。", "file", true, "1m"),
                  kycEngineItem("身份证明文件", "内地人：身份证+通行证/护照；香港人：身份证+回乡证/护照；台湾人：身份证+护照；外国人：护照。只接受清晰彩色原件，证件不接受水印版本。"),
                  kycEngineItem("三个月有效的地址证明", "银行月结单 / 水电煤信件 / 政府信件 / 中国身份证均可。", "file", true, "3m"),
                  kycEngineItem("手持证件及自愿买U声明自拍照", "具体格式参考示范图片，地址要发文字版本。"),
                  kycEngineItem("签署我们公司的 KYC 表格一份", "只接受扫描版本，签名要用正楷字体签署全名，要清晰可辨认。")
                ]
              }
            ]
          }
        ]
      },
      {
        id: 2,
        code: "2",
        name: "港币/美元/外币公户打款买U",
        processDescription: "1. 审核流水，流水通过后我们才能接收该账户款项。\n2. KYC 审核，KYC 完成后可以进行交易。\n3. 交易前报价，接受报价后可以下一步打款。\n4. 我们提供收款账户信息、收款账户名。\n5. 客户打款到指定的收款账户，提供水单给我们查账，到账后我们通知。\n6. 按照当天汇率计算对应的 U 数，并跟客户确认收 U 地址，排单回 U。\n7. 回 U 后发出 U 水单给客户，客户查收，交易完成。",
        channels: [
          {
            id: "s2_sgb",
            name: "SGB",
            theme: "red",
            restrictions: [
              { type: "bank_ban", content: "暂不接受这三家银行出款给我们：招商永隆、交通银行、花旗银行（香港）。" },
              { type: "special_proof", content: "以上资料提交齐全后，如后期遇到银行合规审查需要，仍有机会需要提供更多额外文件。" }
            ],
            sections: [
              {
                title: "SGB - 企业主体与授权材料",
                items: [
                  kycEngineItem("BV Onboarding Form + Board Resolution", "签名需要所有董事全名 + 清晰公司公章 + 日期。"),
                  kycEngineItem("BR / 企业注册证书", "需要已缴费的。"),
                  kycEngineItem("CI / 公司注册证书", "彩色扫描件。"),
                  kycEngineItem("NAR1 / 周年申报表", "如新成立的公司请提供 NNC1，要有公司注册处收据或 barcode。"),
                  kycEngineItem("所有董事和签署人身份证明", "护照/港澳通行证、香港身份证（香港需要永居），四角露出、无破损、信息完整、有效期内，彩色原件扫描件或照片。"),
                  kycEngineItem("25% 以上股权股东身份证明", "护照/港澳通行证、香港身份证，身份证需彩色正反面。"),
                  kycEngineItem("股东架构图", "董事签名+职位+公司章+日期；董事和股东只有一人且为同一人的公司不用。")
                ]
              },
              {
                title: "SGB - 资金来源与声明",
                items: [
                  kycEngineItem("最新一个月出款账户流水证明", "同名账户，截止到入款当天。", "file", true, "1m"),
                  kycEngineItem("董事手持护照及自愿买U证明合照", "董事手持护照和签署自愿买U证明同时拍照，格式参考示范图片。")
                ]
              }
            ]
          },
          {
            id: "s2_sino",
            name: "SINO",
            theme: "blue",
            restrictions: [
              { type: "special_proof", content: "以上资料提交齐全后，如后期遇到银行合规审查需要，仍有机会需要提供更多额外文件。" }
            ],
            sections: [
              {
                title: "SINO - 企业主体与授权材料",
                items: [
                  kycEngineItem("公户最近一个月流水", "需提供最新一个月，日期需显示到提交资料的前一天，并完整显示交易对手信息，能穿透资金来源。", "file", true, "1m"),
                  kycEngineItem("BR / 企业注册证书", "彩色扫描件。"),
                  kycEngineItem("CI / 公司注册证书", "彩色扫描件。"),
                  kycEngineItem("NAR1 / 周年申报表", "如新成立的公司请提供 NNC1。"),
                  kycEngineItem("所有董事和签署人身份证明", "护照/港澳通行证、香港永居身份证，四角露出、无破损、信息完整、有效期内，彩色原件。"),
                  kycEngineItem("25% 以上股权股东身份证明", "身份证需彩色正反面。"),
                  kycEngineItem("股东架构图", "董事签名+职位+公司章+日期；董事和股东只有一人且为同一人的公司不用。"),
                  kycEngineItem("Onboarding Form + Board Resolution", "签名需要所有董事全名 + 清晰公司公章 + 日期。"),
                  kycEngineItem("董事手持护照及自愿买U声明合照", "声明文字：本人XXX为XXX公司董事，自愿跟 Big Big Leaf Limited 公司购买数字资产，我的收币地址是：xxxxxx，附签名和日期。")
                ]
              }
            ]
          }
        ]
      },
      {
        id: 3,
        code: "3",
        name: "港币/美元/外币私户打款换私户人民币",
        processDescription: "1. 审核流水，流水通过后我们才能接收该账户款项。\n2. 给我们对应的 KYC 和开户所需的文件。\n3. KYC 和 VA 账户通过后可以开始交易。\n4. 我们提供收款账户信息，收款账户名跟客户同名。\n5. 客户提供收款人民币的账户信息（姓名、银行、支行信息、账户号码）。\n6. 客户打款到指定的收款账户，提供水单给我们查账，到账后我们通知。\n7. T+1 当天完成付款人民币到客户指定的人民币账户。\n8. 收款人需在 20 分钟内查收人民币到账情况。\n9. 交易完成。",
        channels: [
          {
            id: "s3_sgb",
            name: "SGB",
            theme: "red",
            restrictions: [
              { type: "special_proof", content: "如出款和收款非同名，请提供关系证明。" },
              { type: "bank_ban", content: "暂不接受这三家银行出款给我们：招商永隆、交通银行、花旗银行（香港）。" },
              { type: "special_proof", content: "以上资料提交齐全后，如后期遇到银行合规审查需要，仍有机会需要提供更多额外文件。" }
            ],
            sections: [
              {
                title: "SGB - 出资方向材料",
                items: [
                  kycEngineItem("客户出账账户银行流水", "需提供最新一个月，日期需显示到提交资料的前一天，并完整显示交易对手信息，能穿透资金来源。", "file", true, "1m"),
                  kycEngineItem("身份证明文件", "内地人：身份证+通行证/护照；香港人：身份证+回乡证/护照；台湾人：身份证+护照；外国人：护照。只接受清晰彩色版本，证件正反面齐全。"),
                  kycEngineItem("TP Onboarding Form", "入驻表格。"),
                  kycEngineItem("换汇原因", "说明本次换汇用途与背景。", "text"),
                  kycEngineItem("出款银行账户信息", "账户名称、出款银行名称、出款人开户国家/地区、货币种类。", "bank_account")
                ]
              },
              {
                title: "SGB - 人民币收款方向材料",
                items: [
                  kycEngineItem("收款人身份证正反面 + 通行证/护照", "彩色清晰版本。")
                ]
              }
            ]
          },
          {
            id: "s3_sino",
            name: "SINO",
            theme: "blue",
            restrictions: [
              { type: "special_proof", content: "此业务方向 SINO 渠道暂停。" }
            ],
            sections: []
          }
        ]
      },
      {
        id: 4,
        code: "4",
        name: "港币/美元/外币公户打款换私户人民币",
        processDescription: "1. 审核流水，流水通过后我们才能接收该账户款项，并提前询问客户收款人民币的人和出款公户之间的关系证明。\n2. KYC 审核，KYC 完成后可以进行交易。\n3. 交易前报价，客户接受价格后可以进入下一步打款。\n4. 我们提供收款账户信息给客户。\n5. 客户提供收款人民币的账户信息（姓名、银行、支行信息、账户号码）。\n6. 客户打款到指定的收款账户，提供水单给我们查账，到账后我们通知。\n7. T+1 当天完成付款人民币到客户指定的人民币账户。\n8. 收款人需在 20 分钟内查收人民币到账情况。\n9. 交易完成。",
        channels: [
          {
            id: "s4_sgb",
            name: "SGB",
            theme: "red",
            restrictions: [
              { type: "bank_ban", content: "暂不接受这三家银行出款给我们：招商永隆、交通银行、花旗银行（香港）。" },
              { type: "special_proof", content: "以上资料提交齐全后，如后期遇到银行合规审查需要，仍有机会需要提供更多额外文件。" }
            ],
            sections: [
              {
                title: "SGB - 香港公户公司出款材料",
                items: [
                  kycEngineItem("TP Onboarding Form + Board Resolution", "签名需要所有董事全名 + 清晰公司公章 + 日期。"),
                  kycEngineItem("BR / 企业注册证书", "需要已缴费的。"),
                  kycEngineItem("CI / 公司注册证书", "彩色扫描件。"),
                  kycEngineItem("NAR1 / 周年申报表", "如新成立的公司请提供 NNC1，要有公司注册处收据或 barcode。"),
                  kycEngineItem("所有董事和签署人身份证明", "护照/港澳通行证、香港身份证（香港需要永居），彩色原件扫描件或照片。"),
                  kycEngineItem("25% 以上股权股东身份证明", "身份证需彩色正反面。"),
                  kycEngineItem("股东架构图", "董事签名+职位+公司章+日期；董事和股东只有一人且为同一人的公司不用。"),
                  kycEngineItem("最新一个月出款账户流水证明", "同名账户，截止到出款当天。", "file", true, "1m")
                ]
              },
              {
                title: "SGB - 私户收款人民币材料",
                items: [
                  kycEngineItem("收款私户的身份证正反面", "彩色清晰版本。"),
                  kycEngineItem("收款人与出款公户的关系证明", "收款人民币的人和出款公户之间的关系证明。")
                ]
              }
            ]
          },
          {
            id: "s4_sino",
            name: "SINO",
            theme: "blue",
            restrictions: [
              { type: "special_proof", content: "以上资料提交齐全后，如后期遇到银行合规审查需要，仍有机会需要提供更多额外文件。" }
            ],
            sections: [
              {
                title: "SINO - 香港公户公司出款材料",
                items: [
                  kycEngineItem("公户最近一个月流水", "需提供最新一个月，日期需显示到提交资料的前一天，并完整显示交易对手信息，能穿透资金来源。", "file", true, "1m"),
                  kycEngineItem("BR / 企业注册证书", "彩色扫描件。"),
                  kycEngineItem("CI / 公司注册证书", "彩色扫描件。"),
                  kycEngineItem("NAR1 / 周年申报表", "如新成立的公司请提供 NNC1。"),
                  kycEngineItem("所有董事和签署人身份证明", "护照/港澳通行证、香港永居身份证，彩色原件扫描件或照片。"),
                  kycEngineItem("25% 以上股权股东身份证明", "身份证需彩色正反面。"),
                  kycEngineItem("股东架构图", "董事签名+职位+公司章+日期；董事和股东只有一人且为同一人的公司不用。")
                ]
              },
              {
                title: "SINO - 私户收款人民币材料",
                items: [
                  kycEngineItem("收款私户的身份证正反面", "彩色清晰版本。"),
                  kycEngineItem("收款人与出款公户的关系证明", "收款人民币的人和出款公户之间的关系证明。")
                ]
              }
            ]
          }
        ]
      },
      {
        id: 5,
        code: "5",
        name: "卖U换私户美金/港币/其他外币转账",
        processDescription: "1. POBO 开户以及 KYC 审核。\n2. 完成开户及合规审核后，可以交易。\n3. 当天报价。\n4. 接受报价后，出 U 前要进行 KYA、KYT 审核。\n5. KYA、KYT 审核完毕，我们发地址，客户出 U，发出 U 截图。\n6. 我方查收到 U 之后，客户提供出款信息（6 要素）。\n7. 安排 T+1（第二天）出款，出款后发水单给客户。\n8. 客户注意查收款项，交易完成。",
        channels: [
          {
            id: "s5_sgb",
            name: "SGB",
            theme: "red",
            restrictions: [
              { type: "bank_ban", content: "暂不接受这三家银行作为收款行：招商永隆、交通银行、花旗银行（香港）。" },
              { type: "special_proof", content: "以上资料提交齐全后，如后期遇到银行合规审查需要，仍有机会需要提供更多额外文件。" }
            ],
            sections: [
              {
                title: "SGB - 个人收款材料",
                items: [
                  kycEngineItem("有效的个人身份证明文件", "护照 / 香港永居身份证 / 通行证等。"),
                  kycEngineItem("Bitvast Onboarding Form", "入驻表格。"),
                  kycEngineItem("收款银行账户信息", "收款人地址、账户名称、收款银行名称、开户国家/地区、账户号码、Swift Code/BIC、ABA（美国地区银行需要）、货币。", "bank_account")
                ]
              }
            ]
          },
          {
            id: "s5_sino",
            name: "SINO",
            theme: "blue",
            restrictions: [
              { type: "bank_ban", content: "不支持同名打香港星展银行（DBS HK）、香港花旗（CITI HK）、新加坡花旗（CITI SG）；渣打银行只支持香港渣打（SCB HK）。" },
              { type: "special_proof", content: "以上资料提交齐全后，如后期遇到银行合规审查需要，仍有机会需要提供更多额外文件。" }
            ],
            sections: [
              {
                title: "SINO - 个人收款材料",
                items: [
                  kycEngineItem("身份证明文件", "内地人：身份证+通行证/护照；香港人：身份证+回乡证/护照；台湾人：身份证+护照；外国人：护照。只接受清晰彩色版本，证件不接受水印版本。"),
                  kycEngineItem("三个月有效的地址证明", "水电煤信件 / 政府信件 / 中国身份证均可。", "file", true, "3m"),
                  kycEngineItem("无遮挡版本月结单", "3 个月内有效，不一定是收款户口银行的月结单。", "file", true, "3m"),
                  kycEngineItem("手持证件自拍照或核证副本（二选一）", "自拍接受水印但不可遮挡面部和证件；核证副本 Certified True Copy 需有从业资格的注册会计师出具，如需我司配合出具每次收费 900 HKD，同一客户累计满 10 万 USD 交易可豁免。"),
                  kycEngineItem("签署后的同名打款申请表格一份", "只接受扫描版本，职业栏目请提供完整公司名加职位，签名要用正楷字体签署全名。"),
                  kycEngineItem("签署我们公司的 KYC 表格一份", "只接受扫描版本，签名要用正楷字体签署全名。"),
                  kycEngineItem("收款银行账户信息", "收款人地址、账户名称、收款银行名称、开户国家/地区、账户号码、Swift Code/BIC、ABA、货币。", "bank_account")
                ]
              }
            ]
          }
        ]
      },
      {
        id: 6,
        code: "6",
        name: "卖U换香港公户美金/港币/其他外币转账",
        processDescription: "1. KYC 审核。\n2. 完成合规审核后，可以交易。\n3. 当天报价。\n4. 接受报价后，出 U 前要进行 KYA、KYT 审核。\n5. KYA、KYT 审核完毕，我们发地址，客户出 U，发出 U 截图。\n6. 我方查收到 U 之后，客户提供出款信息（6 要素）。\n7. 安排 T+1（第二天）出款，出款后会发水单给客户。\n8. 客户注意查收款项，交易完成。",
        channels: [
          {
            id: "s6_sgb",
            name: "SGB",
            theme: "red",
            restrictions: [
              { type: "bank_ban", content: "暂不接受这三家银行作为收款行：招商永隆、交通银行、花旗银行（香港）。" },
              { type: "special_proof", content: "以上资料提交齐全后，如后期遇到银行合规审查需要，仍有机会需要提供更多额外文件。" }
            ],
            sections: [
              {
                title: "SGB - 企业收款材料",
                items: [
                  kycEngineItem("BV Onboarding Form + Board Resolution", "签名需要所有董事全名 + 清晰公司公章 + 日期。"),
                  kycEngineItem("BR / 企业注册证书", "需要已缴费的。"),
                  kycEngineItem("CI / 公司注册证书", "彩色扫描件。"),
                  kycEngineItem("NAR1 / 周年申报表", "如新成立的公司请提供 NNC1，要有公司注册处收据或 barcode。"),
                  kycEngineItem("所有董事和签署人身份证明", "护照/港澳通行证、香港身份证（香港需要永居），彩色原件扫描件或照片。"),
                  kycEngineItem("25% 以上股权股东身份证明", "身份证需彩色正反面。"),
                  kycEngineItem("股东架构图", "董事签名+职位+公司章+日期；董事和股东只有一人且为同一人的公司不用。")
                ]
              }
            ]
          },
          {
            id: "s6_sino",
            name: "SINO",
            theme: "blue",
            restrictions: [
              { type: "special_proof", content: "以上资料提交齐全后，如后期遇到银行合规审查需要，仍有机会需要提供更多额外文件。" }
            ],
            sections: [
              {
                title: "SINO - 企业收款材料",
                items: [
                  kycEngineItem("Onboarding Form + Board Resolution", "签名需要所有董事全名 + 清晰公司公章 + 日期。"),
                  kycEngineItem("BR / 企业注册证书", "需要已缴费的。"),
                  kycEngineItem("CI / 公司注册证书", "彩色扫描件。"),
                  kycEngineItem("NAR1 / 周年申报表", "如新成立的公司请提供 NNC1，要有公司注册处收据或 barcode。"),
                  kycEngineItem("所有董事和签署人身份证明", "护照/港澳通行证、香港永居身份证，彩色原件扫描件或照片。"),
                  kycEngineItem("25% 以上股权股东身份证明", "身份证需彩色正反面。"),
                  kycEngineItem("股东架构图", "董事签名+职位+公司章+日期；董事和股东只有一人且为同一人的公司不用。")
                ]
              }
            ]
          }
        ]
      },
      {
        id: 7,
        code: "7",
        name: "卖U换私户人民币转账",
        processDescription: "1. 先提供账户收款人的证件给我们做 KYC，KYC 通过后方可交易。\n2. 当天报价。\n3. 接受报价后，出 U 前要进行 KYA、KYT 审核。\n4. KYA、KYT 审核完毕，客户出 U，发出 U 截图。\n5. 我方查收到 U 之后，客户提供收款账户信息（姓名+银行+支行+账户号码）。\n6. 付款人民币到客户指定的账户（尽量当天安排；优质人民币需要等待，当天不能安排则顺延到第二个工作日）。\n7. 收款人需在我们提供出款水单 20 分钟内查收人民币到账情况。\n8. 交易完成。",
        channels: [
          {
            id: "s7_rmb",
            name: "人民币专列",
            theme: "teal",
            restrictions: [],
            sections: [
              {
                title: "人民币专列 - 收款人材料",
                items: [
                  kycEngineItem("收款人身份证正反面", "彩色清晰版本。")
                ]
              }
            ]
          }
        ]
      },
      {
        id: 8,
        code: "8",
        name: "私户人民币转账买U",
        processDescription: "1. 出款人民币的银行卡流水审核通过后，可以接受做生意。\n2. 完成 KYC 要求提供文件。\n3. 每天 11:30 后报价。\n4. 接受当天报价后安排人民币账户打款（提前一天预约需求）。注意出款人民币账户的单笔和当天限额，确认限额才可以下单安排。\n5. 客户打款人民币，完成后提供截图证明出款（必须是已经审核通过流水的卡打出，否则不承认该款项）。\n6. 我方查账，到账通知客户（一般 30 分钟内）。\n7. 到账后当天回 U，客户收到 U，交易结束。",
        channels: [
          {
            id: "s8_rmb",
            name: "人民币专列",
            theme: "teal",
            restrictions: [],
            sections: [
              {
                title: "人民币专列 - 出款人材料",
                items: [
                  kycEngineItem("出款人民币账户一个月银行流水", "需提供最新一个月，日期需显示到提交资料的前一天，并完整显示交易对手信息，能穿透资金来源。", "file", true, "1m"),
                  kycEngineItem("出款人身份证正反面 + 护照/通行证", "名字 hit 中时需要提供护照/通行证。"),
                  kycEngineItem("出款人手持证件和自愿买U证明自拍", "详细参考示范图片，收 U 地址需要发文字版。")
                ]
              }
            ]
          }
        ]
      },
      {
        id: 9,
        code: "9",
        name: "U换内地公户人民币",
        processDescription: "",
        channels: [
          {
            id: "s9_rmb",
            name: "人民币专列",
            theme: "teal",
            restrictions: [],
            sections: [
              {
                title: "人民币专列 - 收款公户材料",
                items: [
                  kycEngineItem("收款账户信息", "收款公户账户完整信息。", "bank_account"),
                  kycEngineItem("营业执照", "彩色清晰版本。"),
                  kycEngineItem("法人身份证", "彩色正反面。")
                ]
              }
            ]
          }
        ]
      },
      {
        id: 10,
        code: "10",
        name: "私户人民币转账买美金/港币/外币",
        processDescription: "1. 出款人民币的银行卡流水审核通过后，可以接受做生意。\n2. 完成 KYC 要求提供文件，同名打款申请完成。\n3. 每天 11:30 后报价。\n4. 接受当天报价后安排人民币账户打款（提前一天预约需求）。注意出款人民币账户的单笔和当天限额，确认限额才可以下单安排。\n5. 客户打款人民币，完成后提供截图证明出款（必须是已经审核通过流水的卡打出，否则不承认该款项）。\n6. 我方查账，到账通知客户（一般 30 分钟内）。\n7. 到账后 2-3 小时内打出外币到客户报备的指定出款账户。\n8. 客户收到款项，交易结束。",
        channels: [
          {
            id: "s10_sgb",
            name: "SGB",
            theme: "red",
            restrictions: [
              { type: "bank_ban", content: "暂不接受这三家银行作为收款行：招商永隆、交通银行、花旗银行（香港）。" },
              { type: "special_proof", content: "如出款和收款非同名，请提供关系证明。" },
              { type: "special_proof", content: "以上资料提交齐全后，如后期遇到银行合规审查需要，仍有机会需要提供更多额外文件。" }
            ],
            sections: [
              {
                title: "SGB - 内地出款人民币材料",
                items: [
                  kycEngineItem("客户出款账户一个月银行流水", "需提供最新一个月，日期需显示到提交资料的前一天，并完整显示交易对手信息，能穿透资金来源。", "file", true, "1m"),
                  kycEngineItem("出款客户的身份证正反面", "彩色清晰版本。")
                ]
              },
              {
                title: "SGB - 收款外币材料",
                items: [
                  kycEngineItem("身份证明文件", "内地人：身份证+通行证/护照；香港人：身份证+回乡证/护照；台湾人：身份证+护照；外国人：护照。只接受清晰彩色版本。"),
                  kycEngineItem("TP Onboarding Form", "入驻表格。"),
                  kycEngineItem("换汇原因", "说明本次换汇用途与背景。", "text"),
                  kycEngineItem("收款银行账户信息", "收款人地址、账户名称、收款银行名称、开户国家/地区、账户号码、Swift Code/BIC、ABA、货币。", "bank_account")
                ]
              }
            ]
          },
          {
            id: "s10_sino",
            name: "SINO",
            theme: "blue",
            restrictions: [
              { type: "bank_ban", content: "不支持同名打香港星展银行（DBS HK）、香港花旗（CITI HK）、新加坡花旗（CITI SG）；渣打银行只支持香港渣打（SCB HK）。" },
              { type: "special_proof", content: "如出款和收款非同名，请提供关系证明。" },
              { type: "special_proof", content: "以上资料提交齐全后，如后期遇到银行合规审查需要，仍有机会需要提供更多额外文件。" }
            ],
            sections: [
              {
                title: "SINO - 内地出款人民币材料",
                items: [
                  kycEngineItem("客户出款账户一个月银行流水", "需提供最新一个月，日期需显示到提交资料的前一天，并完整显示交易对手信息，能穿透资金来源。", "file", true, "1m"),
                  kycEngineItem("出款客户的身份证正反面", "彩色清晰版本。")
                ]
              },
              {
                title: "SINO - 收款外币材料",
                items: [
                  kycEngineItem("身份证明文件", "内地人：身份证+通行证/护照；香港人：身份证+回乡证/护照；台湾人：身份证+护照；外国人：护照。只接受清晰彩色版本，证件不接受水印版本。"),
                  kycEngineItem("三个月有效的地址证明", "水电煤信件 / 政府信件 / 中国身份证均可。", "file", true, "3m"),
                  kycEngineItem("无遮挡版本月结单", "3 个月内有效，不一定是收款户口银行的月结单。", "file", true, "3m"),
                  kycEngineItem("手持证件自拍照或核证副本（二选一）", "自拍接受水印但不可遮挡面部和证件；核证副本需注册会计师出具，我司配合出具每次收费 900 HKD，累计满 10 万 USD 交易可豁免。"),
                  kycEngineItem("签署后的同名打款申请表格一份", "只接受扫描版本，职业栏目请提供完整公司名加职位，正楷签署全名。"),
                  kycEngineItem("收款银行账户信息", "收款人地址、账户名称、收款银行名称、开户国家/地区、账户号码、Swift Code/BIC、ABA、货币。", "bank_account")
                ]
              }
            ]
          }
        ]
      },
      {
        id: 11,
        code: "12",
        name: "公户人民币买U",
        processDescription: "",
        channels: [
          {
            id: "s12_rmb",
            name: "人民币专列",
            theme: "teal",
            restrictions: [],
            sections: [
              {
                title: "人民币专列 - 出款公户材料",
                items: [
                  kycEngineItem("出款公户最近一个月月结单", "需提供最新一个月，日期需显示到提交资料的前一天，并完整显示交易对手信息，能穿透资金来源。", "file", true, "1m"),
                  kycEngineItem("营业执照", "彩色清晰版本。"),
                  kycEngineItem("法人身份证 + 护照/通行证正反面", "名字 hit 中时需要提供护照/通行证。"),
                  kycEngineItem("法人手持证件和自愿购买声明书自拍", "声明文字：本人XXX为XXX公司法人，代表XXX公司自愿购买数字资产，我的收币地址是：xxxxxx，附签名和日期。")
                ]
              }
            ]
          }
        ]
      },
      {
        id: 12,
        code: "13",
        name: "公户人民币买私户美金/港币/外币",
        processDescription: "1. 出款人民币的银行卡流水审核通过后，可以进入 KYC 流程。\n2. 完成 KYC 要求提供文件，同名打款申请完成。\n3. 每天 11:30 后报价。\n4. 接受当天报价后安排人民币账户打款（提前一天预约需求）。注意出款人民币账户的单笔和当天限额，确认限额才可以下单安排。\n5. 客户打款人民币，完成后提供截图证明出款（必须是已经审核通过流水的卡打出，否则不承认该款项）。\n6. 我方查账，到账通知客户（一般 30 分钟内）。\n7. 到账后 2-3 小时内打出外币到客户报备的指定出款账户。\n8. 客户收到款项，交易结束。",
        channels: [
          {
            id: "s13_sgb",
            name: "SGB",
            theme: "red",
            restrictions: [
              { type: "bank_ban", content: "暂不接受这三家银行作为收款行：招商永隆、交通银行、花旗银行（香港）。" },
              { type: "special_proof", content: "如收款人非公户出款人的法人/股东/董事，需要提供关系证明；如属于董事/股东，请递交证明。" },
              { type: "special_proof", content: "以上资料提交齐全后，如后期遇到银行合规审查需要，仍有机会需要提供更多额外文件。" }
            ],
            sections: [
              {
                title: "SGB - 内地出款人民币材料",
                items: [
                  kycEngineItem("公户最近一个月月结单", "需提供最新一个月，日期需显示到提交资料的前一天，并完整显示交易对手信息，能穿透资金来源。", "file", true, "1m"),
                  kycEngineItem("营业执照", "彩色清晰版本。"),
                  kycEngineItem("法人身份证", "彩色正反面。")
                ]
              },
              {
                title: "SGB - 收款外币私户材料",
                items: [
                  kycEngineItem("身份证明文件", "内地人：身份证+通行证/护照；香港人：身份证+回乡证/护照；台湾人：身份证+护照；外国人：护照。只接受清晰彩色版本。"),
                  kycEngineItem("TP Onboarding Form", "入驻表格。"),
                  kycEngineItem("换汇原因", "说明本次换汇用途与背景。", "text"),
                  kycEngineItem("收款银行账户信息", "收款人地址、账户名称、收款银行名称、开户国家/地区、账户号码、Swift Code/BIC、ABA、货币。", "bank_account")
                ]
              }
            ]
          },
          {
            id: "s13_sino",
            name: "SINO",
            theme: "blue",
            restrictions: [
              { type: "bank_ban", content: "不支持同名打香港星展银行（DBS HK）、香港花旗（CITI HK）、新加坡花旗（CITI SG）；渣打银行只支持香港渣打（SCB HK）。" },
              { type: "special_proof", content: "如收款人非公户出款人的法人/股东/董事，需要提供关系证明；如属于董事/股东，请递交证明。" },
              { type: "special_proof", content: "以上资料提交齐全后，如后期遇到银行合规审查需要，仍有机会需要提供更多额外文件。" }
            ],
            sections: [
              {
                title: "SINO - 内地出款人民币材料",
                items: [
                  kycEngineItem("公户最近一个月月结单", "需提供最新一个月，日期需显示到提交资料的前一天，并完整显示交易对手信息，能穿透资金来源。", "file", true, "1m"),
                  kycEngineItem("营业执照", "彩色清晰版本。"),
                  kycEngineItem("法人身份证", "彩色正反面。")
                ]
              },
              {
                title: "SINO - 收款外币私户材料",
                items: [
                  kycEngineItem("身份证明文件", "内地人：身份证+通行证/护照；香港人：身份证+回乡证/护照；台湾人：身份证+护照；外国人：护照。只接受清晰彩色版本，证件不接受水印版本。"),
                  kycEngineItem("三个月有效的地址证明", "水电煤信件 / 政府信件 / 中国身份证均可。", "file", true, "3m"),
                  kycEngineItem("无遮挡版本月结单", "3 个月内有效，不一定是收款户口银行的月结单。", "file", true, "3m"),
                  kycEngineItem("手持证件自拍照或核证副本（二选一）", "自拍接受水印但不可遮挡面部和证件；核证副本需注册会计师出具，我司配合出具每次收费 900 HKD，累计满 10 万 USD 交易可豁免。"),
                  kycEngineItem("签署后的同名打款申请表格一份", "只接受扫描版本，签名要用正楷字体签署全名。"),
                  kycEngineItem("收款银行账户信息", "收款人地址、账户名称、收款银行名称、开户国家/地区、账户号码、Swift Code/BIC、ABA、货币。", "bank_account")
                ]
              }
            ]
          }
        ]
      },
      {
        id: 13,
        code: "14",
        name: "公户人民币买公户美金/港币/外币",
        processDescription: "",
        channels: [
          {
            id: "s14_sgb",
            name: "SGB",
            theme: "red",
            restrictions: [
              { type: "special_proof", content: "如出款公户和收款公户非同一股东或董事，也非控股关系，请提供关系证明。" },
              { type: "bank_ban", content: "暂不接受这三家银行作为收款行：招商永隆、交通银行、花旗银行（香港）。" },
              { type: "special_proof", content: "以上资料提交齐全后，如后期遇到银行合规审查需要，仍有机会需要提供更多额外文件。" }
            ],
            sections: [
              {
                title: "SGB - 内地出款人民币材料",
                items: [
                  kycEngineItem("公户最近一个月月结单", "需提供最新一个月，日期需显示到提交资料的前一天，并完整显示交易对手信息，能穿透资金来源。", "file", true, "1m"),
                  kycEngineItem("营业执照", "彩色清晰版本。"),
                  kycEngineItem("法人身份证 + 护照/通行证正反面", "彩色清晰版本。"),
                  kycEngineItem("换汇原因", "说明本次换汇用途与背景。", "text")
                ]
              },
              {
                title: "SGB - 收款外币公户材料",
                items: [
                  kycEngineItem("TP Onboarding Form + Board Resolution", "签名需要所有董事全名 + 清晰公司公章 + 日期。"),
                  kycEngineItem("BR / 企业注册证书", "需要已缴费的。"),
                  kycEngineItem("CI / 公司注册证书", "彩色扫描件。"),
                  kycEngineItem("NAR1 / 周年申报表", "如新成立的公司请提供 NNC1，要有公司注册处收据或 barcode。"),
                  kycEngineItem("所有董事和签署人身份证明", "护照/港澳通行证、香港身份证（香港需要永居），彩色原件扫描件或照片。"),
                  kycEngineItem("25% 以上股权股东身份证明", "身份证需彩色正反面。"),
                  kycEngineItem("股东架构图", "董事签名+职位+公司章+日期；董事和股东只有一人且为同一人的公司不用。")
                ]
              }
            ]
          },
          {
            id: "s14_sino",
            name: "SINO",
            theme: "blue",
            restrictions: [
              { type: "special_proof", content: "如出款公户和收款公户非同一股东或董事，也非控股关系，请提供关系证明。" },
              { type: "special_proof", content: "以上资料提交齐全后，如后期遇到银行合规审查需要，仍有机会需要提供更多额外文件。" }
            ],
            sections: [
              {
                title: "SINO - 内地出款人民币材料",
                items: [
                  kycEngineItem("公户最近一个月月结单", "需提供最新一个月，日期需显示到提交资料的前一天，并完整显示交易对手信息，能穿透资金来源。", "file", true, "1m"),
                  kycEngineItem("营业执照", "彩色清晰版本。"),
                  kycEngineItem("法人身份证 + 护照/通行证正反面", "名字 hit 中时需要提供护照/通行证。")
                ]
              },
              {
                title: "SINO - 收款外币公户材料",
                items: [
                  kycEngineItem("BR / 企业注册证书", "需要已缴费的。"),
                  kycEngineItem("CI / 公司注册证书", "彩色扫描件。"),
                  kycEngineItem("NAR1 / 周年申报表", "如新成立的公司请提供 NNC1，要有公司注册处收据或 barcode。"),
                  kycEngineItem("所有董事和签署人身份证明", "护照/港澳通行证、香港永居身份证，四角露出、无破损、信息完整、有效期内。"),
                  kycEngineItem("25% 以上股权股东身份证明", "护照/港澳通行证、香港永居身份证，彩色原件。"),
                  kycEngineItem("股东架构图", "董事签名+职位+公司章+日期；董事和股东只有一人且为同一人的公司不用。")
                ]
              }
            ]
          }
        ]
      },
      {
        id: 14,
        code: "15",
        name: "人私换公美（私户人民币换公户外币）",
        processDescription: "",
        channels: [
          {
            id: "s15_sgb",
            name: "SGB",
            theme: "red",
            restrictions: [
              { type: "bank_ban", content: "暂不接受这三家银行作为收款行：招商永隆、交通银行、花旗银行（香港）。" },
              { type: "special_proof", content: "以上资料提交齐全后，如后期遇到银行合规审查需要，仍有机会需要提供更多额外文件。" }
            ],
            sections: [
              {
                title: "SGB - 内地出款人民币材料",
                items: [
                  kycEngineItem("客户出款账户一个月银行流水", "不能有任何遮挡，流水通过后才接受此账户与我们交易。", "file", true, "1m"),
                  kycEngineItem("出款客户身份证正反面 + 护照/通行证正反面", "彩色清晰版本。")
                ]
              },
              {
                title: "SGB - 收款外币公户材料",
                items: [
                  kycEngineItem("TP Onboarding Form + Board Resolution", "签名需要所有董事全名 + 清晰公司公章 + 日期。"),
                  kycEngineItem("BR / 企业注册证书", "需要已缴费的。"),
                  kycEngineItem("CI / 公司注册证书", "彩色扫描件。"),
                  kycEngineItem("NAR1 / 周年申报表", "如新成立的公司请提供 NNC1，要有公司注册处收据或 barcode。"),
                  kycEngineItem("所有董事和签署人身份证明", "护照/港澳通行证、香港身份证（香港需要永居），彩色原件扫描件或照片。"),
                  kycEngineItem("25% 以上股权股东身份证明", "身份证需彩色正反面。"),
                  kycEngineItem("股东架构图", "董事签名+职位+公司章+日期；董事和股东只有一人且为同一人的公司不用。"),
                  kycEngineItem("出账私户和香港公户之间的关系证明", "证明出款私户与收款公户的关联关系。")
                ]
              }
            ]
          },
          {
            id: "s15_sino",
            name: "SINO",
            theme: "blue",
            restrictions: [
              { type: "special_proof", content: "以上资料提交齐全后，如后期遇到银行合规审查需要，仍有机会需要提供更多额外文件。" }
            ],
            sections: [
              {
                title: "SINO - 内地出款人民币材料",
                items: [
                  kycEngineItem("客户出款账户一个月银行流水", "不能有任何遮挡，流水通过后才接受此账户与我们交易。", "file", true, "1m"),
                  kycEngineItem("出款客户身份证正反面 + 护照/通行证正反面", "名字 hit 中时需要提供护照/通行证。")
                ]
              },
              {
                title: "SINO - 收款外币公户材料（香港公司文件要求）",
                items: [
                  kycEngineItem("BR / 企业注册证书", "需要已缴费的。"),
                  kycEngineItem("CI / 公司注册证书", "彩色扫描件。"),
                  kycEngineItem("NAR1 / 周年申报表", "如新成立的公司请提供 NNC1，要有公司注册处收据或 barcode。"),
                  kycEngineItem("所有董事和签署人身份证明", "护照/港澳通行证、香港永居身份证，四角露出、无破损、信息完整、有效期内。"),
                  kycEngineItem("25% 以上股权股东身份证明", "护照/港澳通行证、香港永居身份证，彩色原件。"),
                  kycEngineItem("股东架构图", "董事签名+职位+公司章+日期；董事和股东只有一人且为同一人的公司不用。"),
                  kycEngineItem("出账私户和香港公户之间的关系证明", "证明出款私户与收款公户的关联关系。")
                ]
              }
            ]
          }
        ]
      },
      {
        id: 15,
        code: "16",
        name: "人民币现金买卖",
        processDescription: "首先需要确定人民币现金在哪个城市及数量（目前广东省内广州、珠海、中山暂停待恢复，其他地方只做熟人）。\n\n人民币现金换U方向：\n1. 我们当天报价，你方锁定价格。\n2. 我方收款人提供信物 + 联系人联系方式，你们提供地址和联系人电话。\n3. 我们收款同事会联系对方约交付时间地点。\n4. 广东省内一般当天内完成交收；广东省外我们同事预订机票从广东出发，按约定时间地点交收。\n5. 交收使用信物确认，当场点算大数，收走现钞后回广东基地再点算清楚；广东省外 T+1 清点完找 U。\n\nU换人民币现金方向：\n1. 我们当天报价，你方锁定价格。\n2. 确定订单后先全数打 U 给我们，再安排送货。\n3. 现金送货同事会联系对方约交付时间地点，省内当天安排交收、省外按约定时间交付。\n4. 交收只使用信物作为确认。\n\n注意事项：\n1. 不同台交易，现场只数大数，回基地清点完再报数。\n2. 一旦确定单子后违约，需要赔偿总额的 1%。\n3. 单笔一百万起做，最高五百万。\n4. 现金换U方向只接受 100 元面值的人民币纸钞。",
        channels: []
      },
      {
        id: 16,
        code: "16B",
        name: "港币转账换大陆人民币现金",
        processDescription: "1. 审核流水，流水通过后我们才能接收该账户款项。\n2. 给我们对应的 KYC 和开户所需的文件。\n3. KYC 和 VA 账户通过后可以开始交易。\n4. 我们当天报价，你方锁定价格（报价当天有效）。\n5. 客户打款到指定的收款账户，提供水单给我们查账，到账后我们通知（港币需要打到我们提供的收款账户，该收款账户名跟客户同名）。\n6. 港币到账后安排大陆现金送货，客户提供收货人信息，现金送货同事会联系对方约交付时间地点。\n7. 广东省内一般是港币到账后 T+1 内完成交收；广东省外我们同事预订机票从广东出发，按约定时间交付。\n8. 交收只使用信物作为确认，交货完成后发信物照片到群组确认已交货。\n\n注意事项：\n1. 需港币到账后，才安排人民币送货。\n2. 单笔人民币一百万起做，最高五百万。\n3. 现金交收一旦确定单子后违约，需要赔偿总额的 1%。",
        channels: []
      },
      {
        id: 17,
        code: "17",
        name: "POBO个人客户出资到自己的公户进行注资",
        processDescription: "1. 注资计划书：写清楚注资金额、分多少次、单次注资金额、时间等要素，然后董事签名写日期，加盖公司公章。\n2. 资金证明要大于交易金额：客户提供的月结单足额且在 3 个月内的可以直接用；不够或超期的，请客户补交。",
        channels: [
          {
            id: "s17_sino",
            name: "SINO",
            theme: "blue",
            restrictions: [],
            sections: [
              {
                title: "SINO - POBO 注资追加材料（在 POBO 基础资料上追加）",
                items: [
                  kycEngineItem("公司注册文件", "例如香港公司 BR。"),
                  kycEngineItem("股权证明", "例如香港公司 NAR1。"),
                  kycEngineItem("注资计划书", "注明注资金额、次数、单次金额与时间，董事签名写日期，加盖公司公章。"),
                  kycEngineItem("足额的资金证明", "需大于交易金额，月结单需在 3 个月内。", "file", true, "3m")
                ]
              }
            ]
          }
        ]
      },
      {
        id: 18,
        code: "18",
        name: "POBO个人客户出资到自己的信托账户",
        processDescription: "1. 先问清楚背景，由 Gary 判断能否做，然后开通 POBO 以及 KYC 审核。\n2. 问清楚出资人和受益人是否同一人：同一人需与 Queenie 确认是否需要提供其他资料；非同一人要提供关系证明。\n3. 提供签署版的信托文件。\n4. 月结单作为资金来源证明，月结余额需要大于充值金额。",
        channels: [
          {
            id: "s18_sino",
            name: "SINO",
            theme: "blue",
            restrictions: [],
            sections: [
              {
                title: "SINO - POBO 信托追加材料（在 POBO 基础资料上追加）",
                items: [
                  kycEngineItem("信托开户文件", "签署版的信托文件。"),
                  kycEngineItem("足额的资金证明", "月结余额需大于充值金额。", "file", true, "3m"),
                  kycEngineItem("收款方的企业注册文件", "信托收款主体的注册文件。")
                ]
              }
            ]
          }
        ]
      },
      {
        id: 19,
        code: "19",
        name: "POBO个人账户交保费",
        processDescription: "",
        channels: [
          {
            id: "s19_sino",
            name: "SINO",
            theme: "blue",
            restrictions: [],
            sections: [
              {
                title: "SINO - POBO 保费追加材料（在 POBO 基础资料上追加）",
                items: [
                  kycEngineItem("已购保险的证明文件", "购买全新保险缴首期保费：完整版本投保申请书（有签名版本），后续有正式保单合同后需后补给银行；缴交非首年保费：正式保险合同和保险缴费通知书。"),
                  kycEngineItem("收款方的企业注册文件", "保险公司注册文件。"),
                  kycEngineItem("足额的资金证明", "需大于交易金额。", "file", true, "3m"),
                  kycEngineItem("预交保费优惠政策证明", "提前预交超过 2 年保费时提供，需保险公司出具，可以是小册子、宣传单张等。", "file", false)
                ]
              }
            ]
          }
        ]
      },
      {
        id: 20,
        code: "20",
        name: "POBO个人账户出款到证券账户",
        processDescription: "",
        channels: [
          {
            id: "s20_sino",
            name: "SINO",
            theme: "blue",
            restrictions: [],
            sections: [
              {
                title: "SINO - POBO 证券出款追加材料（在 POBO 基础资料上追加）",
                items: [
                  kycEngineItem("证券行开户书", "开户证明。"),
                  kycEngineItem("证券电汇信息", "一般证券行有一个电汇指示的通知书。"),
                  kycEngineItem("收款方的企业注册文件", "证券行注册文件。"),
                  kycEngineItem("足额的资金证明", "需大于交易金额；月结单足额且在 3 个月内的可直接用，不够或超期需补交。", "file", true, "3m")
                ]
              }
            ]
          }
        ]
      },
      {
        id: 21,
        code: "21",
        name: "POBO个人账户出款买楼（自己名下）",
        processDescription: "",
        channels: [
          {
            id: "s21_sino",
            name: "SINO",
            theme: "blue",
            restrictions: [],
            sections: [
              {
                title: "SINO - POBO 购房出款追加材料（在 POBO 基础资料上追加）",
                items: [
                  kycEngineItem("购房合同", "香港首期缴费：已盖章及签名的临时合约（无缴款信息则补缴费通知），并需在约定时间后补正式合同；非首期缴费需正式合同。国外直接要购房合同，非英文合同需英文翻译版；仅有预订协议时需提供付款周期或计划。"),
                  kycEngineItem("律师楼资质证书和律师委托协议", "如委托律所买房需提供，例如营业执照、律师公会资质显示。", "file", false),
                  kycEngineItem("收款方的企业注册文件", "开发商直接收款时提供。", "file", false),
                  kycEngineItem("足额的资金证明", "需大于交易金额；月结单足额且在 3 个月内的可直接用，不够或超期需补交。", "file", true, "3m")
                ]
              }
            ]
          }
        ]
      }
    ]
  });

  const scheduleFields = [
    ["orderTitle", "排单标题", "text", "例如：单 3-3:3072 出美"],
    ["beneficiaryAddress", "收款人地址", "textarea", "收款人开户地址或开户地址"],
    ["accountName", "账户名称", "text", "例如：Wu Aili"],
    ["bankName", "收款银行名称", "text", "例如：花旗银行"],
    ["countryRegion", "收款人开户国家 / 地区", "text", "例如：Hong Kong"],
    ["accountNumber", "账户号码", "text", "例如：390 9613 2574"],
    ["swiftCode", "Swift Code / BIC 代码", "text", "例如：CITIHKAX"],
    ["amount", "金额", "text", "例如：100,000usd"],
    ["payoutAccount", "出款账户", "text", "例如：SGB Wu Aili"],
    ["virtualAccountNumber", "Virtual Account Number", "text", "例如：79209100000095"],
    ["iban", "IBAN", "text", "例如：BH09SGBD79209100000095"],
    ["currency", "Currency", "text", "例如：USD"],
    ["internalNote", "内部备注", "textarea", "仅内部可见，不进入客户文案"]
  ];

  const initialScheduleTemplates = () => [
    {
      id: "TPL-SCH-001",
      name: "美元出款标准模板",
      description: "适用于香港银行美元出款，包含 VA 与 IBAN 信息。",
      fields: {
        orderTitle: "单 3-3:3072 出美",
        beneficiaryAddress: "RM C21, 2&3/F BLK 5 LONGYU, VIBE CENTRO 9 MUK NING STREET TO KWA WAN KLN",
        accountName: "Wu Aili",
        bankName: "花旗银行",
        countryRegion: "Hong Kong",
        accountNumber: "390 9613 2574",
        swiftCode: "CITIHKAX",
        amount: "100,000usd",
        payoutAccount: "SGB Wu Aili",
        virtualAccountNumber: "79209100000095",
        iban: "BH09SGBD79209100000095",
        currency: "USD",
        internalNote: "请运营核对账户名、账号、币种和金额后进入出款排单。"
      },
      updated: "今天 09:30"
    },
    {
      id: "TPL-SCH-002",
      name: "港币同名账户模板",
      description: "适用于已完成 KYC 的同名银行账户出款。",
      fields: {
        orderTitle: "单 2-1:同名 HKD 出款",
        beneficiaryAddress: "客户银行登记地址",
        accountName: "客户英文名",
        bankName: "HSBC Hong Kong",
        countryRegion: "Hong Kong",
        accountNumber: "待填写",
        swiftCode: "HSBCHKHHHKH",
        amount: "待填写 HKD",
        payoutAccount: "SGB Operating Account",
        virtualAccountNumber: "",
        iban: "",
        currency: "HKD",
        internalNote: "同名账户可按标准路径进入运营复核。"
      },
      updated: "昨天 16:10"
    }
  ];

  const initialScheduleForm = template => ({
    templateId: template?.id || "",
    templateName: template?.name || "",
    draftId: "",
    customerName: "",
    customerId: "",
    customerQuery: "",
    selectedVaAccountId: "",
    started: false,
    priority: "普通",
    expectedPayoutDate: "",
    rawScheduleText: "",
    ...Object.fromEntries(scheduleFields.map(([key]) => [key, template?.fields?.[key] || ""]))
  });

  const initialVaAccounts = () => [
    { id: "VA-0718-USD-1", customerId: "C-2026-0718", customerName: "陈嘉宁", label: "Account 1", virtualAccountNumber: "79209100000095", iban: "BH09SGBD79209100000095", currency: "USD", bank: "SGB Virtual Account", status: "可用" },
    { id: "VA-0718-HKD-1", customerId: "C-2026-0718", customerName: "陈嘉宁", label: "Account 2", virtualAccountNumber: "79209100000118", iban: "BH09SGBD79209100000118", currency: "HKD", bank: "SGB Virtual Account", status: "可用" },
    { id: "VA-0588-USD-1", customerId: "C-2026-0588", customerName: "林雅雯", label: "Account 1", virtualAccountNumber: "79209100000242", iban: "BH09SGBD79209100000242", currency: "USD", bank: "SGB Virtual Account", status: "可用" },
    { id: "VA-0694-USD-1", customerId: "C-2026-0694", customerName: "Northstar Trading Limited", label: "Account 1", virtualAccountNumber: "79209100000309", iban: "BH09SGBD79209100000309", currency: "USD", bank: "SGB Business VA", status: "可用" },
    { id: "VA-0607-USD-1", customerId: "C-2026-0607", customerName: "郑凯文", label: "Account 1", virtualAccountNumber: "79209100000355", iban: "BH09SGBD79209100000355", currency: "USD", bank: "SGB Virtual Account", status: "可用" },
    { id: "VA-0607-HKD-1", customerId: "C-2026-0607", customerName: "郑凯文", label: "Account 2", virtualAccountNumber: "79209100000356", iban: "BH09SGBD79209100000356", currency: "HKD", bank: "SGB Virtual Account", status: "可用" },
    { id: "VA-0636-USD-1", customerId: "C-2026-0636", customerName: "Mosaic Ventures Pte. Ltd.", label: "Account 1", virtualAccountNumber: "79209100000287", iban: "BH09SGBD79209100000287", currency: "USD", bank: "SGB Business VA", status: "可用" },
    { id: "VA-0677-USD-1", customerId: "C-2026-0677", customerName: "Aurora Capital Pte. Ltd.", label: "Account 1", virtualAccountNumber: "79209100000318", iban: "BH09SGBD79209100000318", currency: "USD", bank: "SGB Business VA", status: "可用" },
    { id: "VA-0628-USD-1", customerId: "C-2026-0628", customerName: "李婉晴", label: "Account 1", virtualAccountNumber: "79209100000199", iban: "BH09SGBD79209100000199", currency: "USD", bank: "SGB Virtual Account", status: "可用" }
  ];

  const initialQuoteState = () => ({
    navOpen: true,
    selectedCustomerId: "QC-10004",
    customerQuery: "ravi (10004)",
    customerDropdownOpen: false,
    batchGroupId: "G-AFTERNOON",
    batchCustomerIndex: 0,
    batchCustomerFilter: "",
    batchTypeFilter: "",
    batchSelectedKeys: [],
    historyTab: "platform",
    historyDate: "2026-08-06",
    historyCustomerId: "QC-10004",
    historyCustomerQuery: "ravi (10004)",
    historyCustomerDropdownOpen: false,
    historyDetail: null,
    activeVariableQuoteIndex: null,
    activeVariableTab: "channel",
    formulaCursor: { index: null, position: null },
    addCustomerModalOpen: false,
    addCustomerQuery: "",
    pendingCustomerIds: [],
    groupModalOpen: false,
    groupNameDraft: "",
    benchmarkEditing: false,
    benchmarkUpdatedAt: "2026/08/06 11:43:17",
    benchmarkPrices: [
      { code: "sinoDaily", label: "sino每日价格", value: 7.8230, digits: 4 },
      { code: "usdBid", label: "美元报价", value: 7.8120, digits: 4 },
      { code: "xeHkd", label: "xe港币", value: 1.2773306, digits: 7 },
      { code: "hkdU", label: "HKD-U", value: 7.8100, digits: 4 },
      { code: "uHkd", label: "U-HKD", value: 7.8280, digits: 4 }
    ],
    channelRates: [
      { code: "xeHkdUsd", label: "XE-HKD:USD", value: 1.2773306, digits: 7 },
      { code: "xeUsdHkd", label: "XE-USD:HKD", value: 7.812, digits: 3 },
      { code: "xeUsdtCnh", label: "XE-USDT:CNH", value: 7.23680, digits: 5 },
      { code: "xeCnhHkd", label: "XE-CNH:HKD", value: 1.08320, digits: 5 }
    ],
    customers: [
      { id: "QC-10001", name: "000", code: "10001", broker: "直营", brokerCode: "-", note: "-", quotes: [
        { tradeType: "美元", prefix: "sino", suffix: "(含手续费)", formula: "sinoDaily", brokerPoint: 0, bvPoint: 0, digits: 4, roundMode: "45", result: "7.8230", expanded: true, lastQuotedAt: "-" },
        { tradeType: "港币", prefix: "sgb", suffix: "", formula: "sinoDaily + 3", brokerPoint: 0, bvPoint: 0, digits: 4, roundMode: "45", result: "10.8230", expanded: false, lastQuotedAt: "-" }
      ] },
      { id: "QC-10003", name: "jojo", code: "10003", broker: "直营", brokerCode: "-", note: "-", quotes: [
        { tradeType: "美元", prefix: "sino", suffix: "(含手续费)", formula: "sinoDaily - 0.002", brokerPoint: 0, bvPoint: 0, digits: 4, roundMode: "45", result: "7.8210", expanded: false, lastQuotedAt: "-" },
        { tradeType: "港币", prefix: "sgb", suffix: "", formula: "sinoDaily + 9", brokerPoint: 0, bvPoint: 0, digits: 4, roundMode: "45", result: "16.8230", expanded: true, lastQuotedAt: "-" }
      ] },
      { id: "QC-10004", name: "ravi", code: "10004", broker: "中介林", brokerCode: "20001", note: "-", quotes: [
        { tradeType: "HKD-TT/CNH-TT", prefix: "sino", suffix: "", formula: "brokerLinHkdTtCnhTt", brokerPoint: 0, bvPoint: 0, digits: 9, roundMode: "45", result: "2.654661329", expanded: true, lastQuotedAt: "-" },
        { tradeType: "USDT/CNH-TT", prefix: "xe", suffix: "", formula: "xeUsdtCnh - 3.0289", brokerPoint: 0, bvPoint: 0, digits: 9, roundMode: "45", result: "4.207900000", expanded: false, lastQuotedAt: "-" }
      ] },
      { id: "QC-10006", name: "Eric&Liu", code: "10006", broker: "直营", brokerCode: "-", note: "VIP", quotes: [
        { tradeType: "美元", prefix: "同名", suffix: "(VIP)", formula: "usdBid", brokerPoint: 0, bvPoint: 0, digits: 4, roundMode: "45", result: "7.8120", expanded: true, lastQuotedAt: "-" },
        { tradeType: "港币", prefix: "第三方", suffix: "", formula: "xeHkd + 0.2", brokerPoint: 0, bvPoint: 0, digits: 4, roundMode: "45", result: "1.4773", expanded: false, lastQuotedAt: "-" }
      ] },
      { id: "QC-10008", name: "Patrick&Tsang", code: "10008", broker: "直营", brokerCode: "-", note: "-", quotes: [
        { tradeType: "美元", prefix: "sino", suffix: "", formula: "usdBid + 0.009", brokerPoint: 0, bvPoint: 0, digits: 4, roundMode: "45", result: "7.8210", expanded: true, lastQuotedAt: "-" },
        { tradeType: "港币", prefix: "sgb", suffix: "", formula: "sinoDaily + 8.998", brokerPoint: 0, bvPoint: 0, digits: 4, roundMode: "45", result: "16.8210", expanded: false, lastQuotedAt: "-" }
      ] },
      { id: "QC-20001", name: "中介林", code: "20001", broker: "-", brokerCode: "-", note: "中介报价源", quotes: [
        { tradeType: "HKD-TT/CNH-TT", prefix: "中介林", suffix: "", formula: "brokerLinHkdTtCnhTt", brokerPoint: 0, bvPoint: 0, digits: 9, roundMode: "45", result: "2.654661329", expanded: true, lastQuotedAt: "-" },
        { tradeType: "美元", prefix: "sino", suffix: "(含手续费)", formula: "sinoDaily", brokerPoint: 0, bvPoint: 0, digits: 4, roundMode: "45", result: "7.8230", expanded: false, lastQuotedAt: "-" }
      ] },
      { id: "QC-22156", name: "客户X", code: "22156", broker: "中介林", brokerCode: "20001", note: "-", quotes: [
        { tradeType: "美元", prefix: "sino", suffix: "", formula: "sinoDaily", brokerPoint: 0, bvPoint: 0, digits: 4, roundMode: "45", result: "7.8230", expanded: true, lastQuotedAt: "-" },
        { tradeType: "港币", prefix: "sgb", suffix: "", formula: "sinoDaily + 9", brokerPoint: 0, bvPoint: 0, digits: 4, roundMode: "45", result: "16.8230", expanded: false, lastQuotedAt: "-" }
      ] }
    ],
    groups: [
      { id: "G-MORNING", name: "早上报价", customerIds: ["QC-10001", "QC-10006", "QC-10008"] },
      { id: "G-AFTERNOON", name: "下午报价", customerIds: ["QC-10003", "QC-10004", "QC-10006", "QC-10008", "QC-20001", "QC-22156"] },
      { id: "G-HIGH", name: "高频报价组", customerIds: ["QC-10004", "QC-10006", "QC-10008"] }
    ],
    platformHistory: [
      { id: "PH-0806-1143", savedAt: "2026/08/06 11:43:17", operator: "shay", prices: [["sino每日价格", "7.8230"], ["美元报价", "7.8120"], ["xe港币", "1.2773306"], ["HKD-U", "7.8100"], ["U-HKD", "7.8280"]] },
      { id: "PH-0805-1138", savedAt: "2026/08/05 11:38:42", operator: "shay", prices: [["sino每日价格", "7.8190"], ["美元报价", "7.8080"], ["xe港币", "1.2769021"], ["HKD-U", "7.8060"], ["U-HKD", "7.8240"]] }
    ],
    customerHistory: [
      { id: "CH-HKD-0803", customerId: "QC-10004", customer: "ravi", code: "10004", broker: "中介林 - 20001", product: "HKD-TT/CNH-TT", date: "2026-08-07", quote: "2.65466", formula: "brokerLinHkdTtCnhTt", formulaCalc: "2.65466", operator: "shay" },
      { id: "CH-HKD-0804", customerId: "QC-10004", customer: "ravi", code: "10004", broker: "中介林 - 20001", product: "HKD-TT/CNH-TT", date: "2026-08-08", quote: "2.66553", formula: "brokerLinHkdTtCnhTt + 0.01087", formulaCalc: "2.65466 + 0.01087", operator: "shay" },
      { id: "CH-HKD-0806", customerId: "QC-10004", customer: "ravi", code: "10004", broker: "中介林 - 20001", product: "HKD-TT/CNH-TT", date: "2026-08-10", quote: "2.654661329", formula: "brokerLinHkdTtCnhTt", formulaCalc: "2.654661329", operator: "shay" },
      { id: "CH-USDT-0806", customerId: "QC-10004", customer: "ravi", code: "10004", broker: "中介林 - 20001", product: "USDT/CNH-TT", date: "2026-08-10", quote: "4.207900000", formula: "xeUsdtCnh - 3.02890", formulaCalc: "7.23680 - 3.02890", operator: "shay" }
    ]
  });

  const initialScheduleOrders = templates => [
    {
      id: "SCH-20260819-001",
      templateId: templates[0].id,
      templateName: templates[0].name,
      customerName: "林雅雯",
      customerId: "C-2026-0588",
      priority: "加急",
      expectedPayoutDate: "2026-08-20",
      status: "待运营处理",
      submittedAt: "今天 10:18",
      updated: "今天 10:18",
      createdBy: "杨澜",
      fields: { ...templates[0].fields, rawScheduleText: "收款人地址： RM C21, 2&3/F BLK 5 LONGYU, VIBE CENTRO 9 MUK NING STREET TO KWA WAN KLN\n账户名称： Ya Wen Lin\n收款银行名称： 花旗银行\n收款人开户国家 / 地区： Hong Kong\n账户号码： 390 9288 1160\nSwift Code/BIC 代码： CITIHKAX\n金额： 62,000usd\n出款账户： SGB Ya Wen Lin", amount: "62,000usd", accountName: "Ya Wen Lin", accountNumber: "390 9288 1160" }
    },
    {
      id: "SCH-DRAFT-0718",
      templateId: templates[1].id,
      templateName: templates[1].name,
      customerName: "陈嘉宁",
      customerId: "C-2026-0718",
      priority: "普通",
      expectedPayoutDate: "2026-08-21",
      status: "草稿",
      submittedAt: "",
      updated: "今天 09:42",
      createdBy: "杨澜",
      fields: { ...templates[1].fields, rawScheduleText: "收款人地址： 客户银行登记地址\n账户名称： JIA NING CHEN\n收款银行名称： HSBC Hong Kong\n收款人开户国家 / 地区： Hong Kong\n账户号码： 待填写\nSwift Code/BIC 代码： HSBCHKHHHKH\n金额： 800,000 HKD\n出款账户： SGB Operating Account", amount: "800,000 HKD", accountName: "JIA NING CHEN" }
    }
  ];

  const initialCaseReviewDrafts = (cases, customers) => Object.fromEntries(
    cases
      .filter(item => item.status === "待运营审核")
      .map(item => {
        const customer = customers.find(entry => entry.id === item.customerId);
        return [item.id, createCaseReviewDraft(item, customer)];
      })
  );

  const initialMaterialOrders = () => [
    { id: "APP-20260713-718", customerId: "C-2026-0718", status: "材料未完成", stage: "上传材料", step: 3, completeness: "4 / 8", updated: "今天 09:12", owner: "杨澜", note: "已保存客户资料，仍有 4 个材料项未上传。", history: ["今天 09:12 · 保存材料草稿", "今天 08:55 · 发起审核"] },
    { id: "APP-20260712-694", customerId: "C-2026-0694", status: "待客户补件", stage: "补件处理中", step: 3, completeness: "6 / 7", updated: "今天 08:46", owner: "杨澜", note: "运营要求补充 UBO 名单最后一页签署版。", history: ["今天 08:46 · 运营发起补件", "昨天 17:30 · 提交运营审核"] },
    { id: "APP-20260711-711", customerId: "C-2026-0711", status: "待运营审核", stage: "运营审核", step: 5, completeness: "8 / 8", updated: "昨天 15:04", owner: "杨澜", note: "材料与客户签署申请表已提交，等待运营处理。", history: ["昨天 15:04 · 提交运营审核", "昨天 14:52 · 客户签署版已回传"] },
    { id: "APP-20260708-588", customerId: "C-2026-0588", status: "审核通过", stage: "已完成", step: 5, completeness: "8 / 8", updated: "07-10 17:22", owner: "周辰", note: "银行审核通过，可继续额度预约与交易。", history: ["07-10 17:22 · 银行审核通过", "07-09 11:08 · 合规审核通过"] }
  ];

  const customerStorageKey = "bitvast-workbench-customers-v3";
  const customerPageSize = 8;
  const retiredCustomerIds = new Set(["C-2026-0649"]);

  function loadCustomers() {
    const seeded = initialCustomers().filter(customer => !retiredCustomerIds.has(customer.id));
    try {
      const parsed = JSON.parse(localStorage.getItem(customerStorageKey) || "[]");
      if (!Array.isArray(parsed)) return seeded;
      const saved = parsed.filter(customer => !retiredCustomerIds.has(customer.id));
      const savedIds = new Set(saved.map(customer => customer.id));
      return [...saved, ...seeded.filter(customer => !savedIds.has(customer.id))];
    } catch {
      return seeded;
    }
  }

  function persistCustomers() {
    try {
      localStorage.setItem(customerStorageKey, JSON.stringify(state.customers));
    } catch {
      toast("客户数据未能保存", "浏览器本地存储不可用，刷新后可能恢复演示数据");
    }
  }

  const defaultScheduleTemplates = initialScheduleTemplates();
  let state = {
    role: "agent",
    view: location.hash.replace("#", "") || "dashboard",
    customers: loadCustomers(),
    cases: initialCases(),
    caseReviewDrafts: {},
    flowIndex: 0,
    caseStatus: "待运营审核",
    selectedCase: "OPS-260718",
    commissionConfirmed: false,
    materialFlow: initialMaterialFlow(),
    quickMaterialUpload: initialQuickMaterialUpload(),
    kycConfig: initialKycConfig(),
    materialOrders: initialMaterialOrders(),
    scheduleTemplates: defaultScheduleTemplates,
    scheduleOrders: initialScheduleOrders(defaultScheduleTemplates),
    scheduleNavOpen: true,
    businessAccessNavOpen: true,
    payoutOrders: [],
    dispatchModal: null,
    dispatchSearch: "",
    dispatchViewOrder: null,
    payoutReceiptModal: null,
    auditTab: "pending",
    payoutOpsTab: "queue",
    quote: initialQuoteState(),
    selectedScheduleTemplateId: "",
    scheduleForm: initialScheduleForm(null),
    scheduleTemplateDraft: { name: "", description: "", fields: initialScheduleForm(null) },
    customerSearch: "",
    customerStatus: "全部状态",
    customerType: "全部类型",
    customerPage: 1,
    expandedIntermediaries: ["C-2026-0694"],
    customerModal: null,
    numberEdit: null,
    drawerCustomer: null,
    drawerTab: "overview",
    drawerApplication: null,
    complianceQueueTab: "pending",
    complianceQueueSearch: "",
    complianceQueueType: "全部审核类型",
    complianceQueueStatus: "全部状态",
    complianceQueueConclusion: "全部",
    complianceReviewingCase: null,
    complianceConclusionDraft: { decision: "", note: "" },
    createStep: 1,
    draftCustomer: { type: "个人", name: "", enName: "", region: "中国香港", agent: "杨澜", business: "SINO", relation: "新客户" },
    mobileNav: false
  };
  state.caseReviewDrafts = initialCaseReviewDrafts(state.cases, state.customers);
  state.payoutOrders = initialPayoutOrders(state.customers);

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
  const statusTone = (status = "") => {
    if (/完成|批准|确认|通过|锁定|已使用|成交|已出款/.test(status)) return "success";
    if (/拒绝|高风险|退回|异常|终止|取消|驳回/.test(status)) return "danger";
    if (/补件|等待|草稿|识别|检查|待排单|待出款/.test(status)) return "warning";
    if (/审核|预审|银行|提交|处理中|处理|报价|校验|入款|出款|排单|复核|交易中/.test(status)) return "info";
    return "neutral";
  };
  const customerStatuses = ["未准入", "材料审核中", "合规驳回", "审核通过", "已排单", "交易中", "已成交"];
  const tradeMarkableStatuses = ["审核通过", "已排单", "交易中", "已成交"];
  const customerStatusFromCase = status => ({
    "草稿": "未准入", "材料未完成": "未准入", "已终止": "未准入",
    "待运营审核": "材料审核中", "待客户补件": "材料审核中", "待合规审核": "材料审核中",
    "合规驳回": "合规驳回",
    "待提交银行": "审核通过", "银行审核中": "审核通过", "银行处理中": "审核通过", "已批准": "审核通过", "审核通过": "审核通过",
    "已排单": "已排单", "交易中": "交易中", "已成交": "已成交"
  }[status] || null);
  const riskClass = risk => risk === "高" ? "high" : risk === "中" ? "medium" : "low";
  const customerInitials = customer => (customer.customerKind || customer.type) === "中介" ? "中" : customer.name.slice(-2);
  const customerNo = customer => customer.clientNo || "无编号";
  const customerKind = customer => customer.customerKind || (customer.type === "企业" ? "中介" : "直客");
  const isoDate = date => {
    const pad = value => String(value).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  };
  const todayIsoDate = () => isoDate(new Date());
  const nowDateTime = () => {
    const current = new Date();
    const pad = value => String(value).padStart(2, "0");
    return `${isoDate(current)} ${pad(current.getHours())}:${pad(current.getMinutes())}`;
  };
  const setCustomerStatus = (customer, nextStatus, operator, note = "") => {
    if (!customer || customer.status === nextStatus) return false;
    customer.statusLog = customer.statusLog || [];
    customer.statusLog.unshift({ from: customer.status, to: nextStatus, operator, time: nowDateTime(), note });
    customer.status = nextStatus;
    customer.updated = "刚刚";
    return true;
  };
  const formatUploadDate = value => {
    const raw = String(value || "").trim();
    if (!raw) return "";
    const current = new Date();
    if (/^(刚刚|今天)/.test(raw)) return isoDate(current);
    if (/^昨天/.test(raw)) {
      const yesterday = new Date(current);
      yesterday.setDate(yesterday.getDate() - 1);
      return isoDate(yesterday);
    }
    const isoMatch = raw.match(/\b(\d{4})-(\d{2})-(\d{2})\b/);
    if (isoMatch) return isoMatch[0];
    const shortMatch = raw.match(/\b(\d{1,2})-(\d{1,2})\b/);
    if (shortMatch) return `${current.getFullYear()}-${shortMatch[1].padStart(2, "0")}-${shortMatch[2].padStart(2, "0")}`;
    return raw;
  };
  const documentUploadTime = (doc, customer) => formatUploadDate(doc.uploadedAt || doc.addedAt || doc.submittedAt || customer?.updated) || "未记录";
  const mainCustomer = () => state.customers.find(customer => customer.id === "C-2026-0718");
  const uploadCodeForCustomer = customer => customerNo(customer);
  const isQuickComplianceDestination = destination => destination === "complianceFx" || destination === "complianceU";
  const quickDestinationLabel = destination => destination === "complianceFx" ? "提交到合规（找换）" : destination === "complianceU" ? "提交到合规（U相关）" : "保存客户材料库";
  const uploadCustomerLabel = customer => customer.clientNo ? `${customer.name} (${customer.clientNo})` : customer.name;
  const uploadCustomerSearchText = customer => [
    customer.name,
    customer.enName,
    customer.id,
    customer.clientNo,
    customer.parentBroker?.name,
    customer.parentBroker?.clientNo
  ].filter(Boolean).join(" ").toLowerCase();
  const uploadCustomerEntries = () => state.customers.flatMap(parent => {
    const parentEntry = { ...parent, uploadKey: parent.id, uploadTarget: parent };
    const subEntries = (parent.subCustomers || []).map((child, index) => {
      const id = child.id || `${parent.id}-SUB-${index + 1}`;
      return {
        ...child,
        id,
        customerKind: "中介下级客户",
        type: child.type || "个人",
        region: child.region || parent.region,
        agent: child.agent || parent.agent,
        status: child.status || "未准入",
        risk: child.risk || "待评估",
        owner: child.owner || parent.owner,
        documents: child.documents || [],
        parentBroker: { id: parent.id, name: parent.name, clientNo: parent.clientNo },
        uploadKey: id,
        uploadTarget: child
      };
    });
    return [parentEntry, ...subEntries];
  });
  const getMatchingUploadCustomers = query => {
    const q = String(query || "").trim().toLowerCase();
    const entries = uploadCustomerEntries();
    if (!q) return entries.slice(0, 8);
    return entries.filter(customer => uploadCustomerSearchText(customer).includes(q)).slice(0, 8);
  };
  const getUploadCustomerByKey = key => uploadCustomerEntries().find(customer => String(customer.uploadKey || customer.id) === String(key));
  const resolveUploadCustomer = value => {
    const code = String(value || "").trim().toLowerCase();
    if (!code) return null;
    return uploadCustomerEntries().find(customer => {
      const fullId = String(customer.id || "").toLowerCase();
      const displayLabel = uploadCustomerLabel(customer).toLowerCase();
      const number = String(customer.clientNo || "").toLowerCase();
      const name = String(customer.name || "").toLowerCase();
      return displayLabel === code || fullId === code || fullId.endsWith(code) || number === code || name === code;
    }) || null;
  };
  const allCustomerNumbers = () => state.customers.flatMap(customer => [
    customer.clientNo,
    ...(customer.subCustomers || []).map(item => item.clientNo)
  ]).filter(Boolean).map(String);
  const isValidClientNo = value => /^\d{5}$/.test(String(value || "").trim()) && Number(value) >= 20001 && Number(value) <= 29999;
  const isClientNoAvailable = (value, exceptCustomerId = "", exceptSubKey = "") => {
    const normalized = String(value || "").trim();
    return !state.customers.some(customer => customer.id !== exceptCustomerId && String(customer.clientNo || "") === normalized) &&
      !state.customers.some(customer => (customer.subCustomers || []).some(item => (item.id || item.clientNo || item.name) !== exceptSubKey && String(item.clientNo || "") === normalized));
  };
  const nextAvailableClientNo = () => {
    const used = new Set(allCustomerNumbers());
    for (let number = 20001; number <= 29999; number += 1) {
      const value = String(number);
      if (!used.has(value)) return value;
    }
    return "";
  };
  const initialCustomerModalDraft = () => ({
    clientNo: nextAvailableClientNo(),
    name: "",
    customerKind: "直客",
    generateClientNo: true,
    parentId: "",
    parentSearchText: "",
    parentHighlightIndex: 0,
    parentDropdownOpen: false,
    subType: "",
    region: "",
    agent: roles[state.role]?.name || roles.agent.name,
    followTrader: "",
    phone: "",
    remark: ""
  });
  const supplementChecklist = [
    { id: "identity", label: "1. 身份证明文件", categories: ["身份证明", "身份证明正面", "身份证明反面", "护照 / EEP 资料页"] },
    { id: "address", label: "2. 三個月有效的地址證明", categories: ["地址证明"] },
    { id: "statement", label: "3. 無遮擋版本月結單", categories: ["银行月结单", "最近银行月结单"] },
    { id: "selfie", label: "4. 手持證件自拍照或 CTC", categories: ["手持护照 / EEP 自拍"] },
    { id: "job", label: "5. 任職公司名稱跟職位", categories: [] },
    { id: "signedForm", label: "6. 簽署後的打款表格", categories: ["客户签署申请表", "未签署申请表"] },
    { id: "limit", label: "7. 預期操作總額度", categories: [] },
    { id: "bankFlow", label: "8. 出款人內地銀行3個月流水", categories: ["最近银行流水"] },
    { id: "purpose", label: "9. 汇款原因", categories: [] }
  ];

  function listCaseMaterials(customer) {
    if (customer?.materialSubmission) {
      const submission = customer.materialSubmission;
      const pdfRows = [
        submission.applicationPdf && { category: "未签署申请表", name: submission.applicationPdf.filename || submission.applicationPdf.name, url: submission.applicationPdf.url, opsDecision: submission.applicationPdf.opsDecision || "待审核", readOnly: true },
        submission.signedPdf && { category: "客户签署申请表", name: submission.signedPdf.filename || submission.signedPdf.name, url: submission.signedPdf.url, opsDecision: submission.signedPdf.opsDecision || "待审核", readOnly: true }
      ].filter(Boolean);
      return [...submission.items, ...pdfRows];
    }
    return (customer?.documents || []).map(doc => ({
      category: doc.name,
      name: doc.meta,
      opsDecision: doc.state === "已通过" ? "通过" : doc.state === "需补件" ? "退回" : "待审核",
      state: doc.state,
      url: doc.url
    }));
  }

  function supplementItemTemplate(id) {
    return {
      identity: `1.身份證明文件

-內地人：内地身份證+通行證/護照

-香港人：HK永居身份證+回鄉證/護照

-外國人：護照

只接受清晰的彩色版本證件

身份證/通行證/回鄉證要求提供正反面`,
      address: `2.三個月有效的地址證明`,
      statement: `3.無遮擋版本月結單（3個月內有效，可以跟第2點相同，不要求一定是收款戶口的月結單）`,
      selfie: `4.手持護照/通行證/回鄉證的自拍照一張

或可申請 護照/通行證/回鄉證「核證副本Certified True Copy」(簡稱CTC) （優先用護照申請）

證件資料（文字/數字）清晰可見`,
      job: `5.任職公司名稱跟職位`,
      signedForm: `6.簽署後的同名打款申請表格一份

（提供任職公司名稱跟職位之后，我們會協助填好表格再給您核對簽名）`,
      limit: `7.預期操作總額度`,
      bankFlow: `8.出款人內地銀行3個月流水，需提供PDF檔或紙質版流水，不接受手機截圖

（流水餘額需超過预计操作金额，如不足需說明解釋）`,
      purpose: `9.汇款原因`
    }[id] || "";
  }

  function syncChecklistFromMaterials(draft) {
    const selected = new Set(draft.selectedSupplementIds || []);
    draft.materials.forEach(material => {
      const matched = supplementChecklist.find(option => option.categories.includes(material.category));
      if (!matched) return;
      if (material.decision === "待补件") selected.add(matched.id);
      else if (material.decision === "通过") selected.delete(matched.id);
    });
    draft.selectedSupplementIds = supplementChecklist.map(option => option.id).filter(id => selected.has(id));
  }

  function buildSupplementNotice(item, customer, draft) {
    const customerName = customer?.name || item.customer;
    const sections = (draft.selectedSupplementIds || []).map(id => supplementItemTemplate(id)).filter(Boolean);
    return `[${customerName}] 名OK，待補

${sections.join("\n\n")}

⚠️ 以上資料提交齊全後，因應銀行合規審查需要，仍有機會需要提供更多額外文件。開戶週期將隨之增加1-2個工作日，請知悉`;
  }

  function createCaseReviewDraft(item, customer) {
    const materials = listCaseMaterials(customer).map(material => ({
      category: material.category,
      decision: material.opsDecision === "通过" ? "通过" : material.opsDecision === "退回" ? "退回" : material.state === "需补件" ? "退回" : "待审核",
      note: ""
    }));
    const normalizedMaterials = materials.map(material => ({ ...material, decision: material.decision === "退回" ? "待补件" : material.decision }));
    const hasRejected = normalizedMaterials.some(material => material.decision === "待补件");
    const selectedSupplementIds = [];
    return {
      materials: normalizedMaterials,
      selectedSupplementIds,
      overallDecision: hasRejected ? "待补件" : "待定",
      supplementReason: item.note || "",
      notificationText: "",
      internalNote: "",
      followupAction: hasRejected ? "发起补件并生成文案" : "待运营判断"
    };
  }

  function ensureCaseReviewDraft(item, customer) {
    if (!state.caseReviewDrafts[item.id]) {
      state.caseReviewDrafts[item.id] = createCaseReviewDraft(item, customer);
    }
    if (!state.caseReviewDrafts[item.id].notificationText) {
      syncChecklistFromMaterials(state.caseReviewDrafts[item.id]);
      state.caseReviewDrafts[item.id].notificationText = buildSupplementNotice(item, customer, state.caseReviewDrafts[item.id]);
    }
    return state.caseReviewDrafts[item.id];
  }

  function updateCaseReviewDraft(caseId, updater) {
    const item = state.cases.find(entry => entry.id === caseId);
    const customer = state.customers.find(entry => entry.id === item?.customerId);
    if (!item || !customer) return;
    const draft = ensureCaseReviewDraft(item, customer);
    updater(draft);
    syncChecklistFromMaterials(draft);
    if (!draft.notificationText || draft.overallDecision === "补件" || draft.overallDecision === "待补件") {
      draft.notificationText = buildSupplementNotice(item, customer, draft);
    }
    render();
  }

  function setup() {
    const roleSelect = $("#role-select");
    roleSelect.innerHTML = Object.entries(roles).map(([key, role]) => `<option value="${key}">${role.label}</option>`).join("");
    roleSelect.value = state.role;
    roleSelect.addEventListener("change", event => switchRole(event.target.value));
    $("#reset-demo").addEventListener("click", confirmReset);
    $("#menu-button").addEventListener("click", () => {
      state.mobileNav = !state.mobileNav;
      $(".sidebar").classList.toggle("open", state.mobileNav);
    });
    $("#global-search").addEventListener("keydown", event => {
      if (event.key === "Enter" && event.target.value.trim()) {
        state.customerSearch = event.target.value.trim();
        navigate("customers");
      }
    });
    document.addEventListener("keydown", event => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        $("#global-search").focus();
      }
      if (event.key === "Escape") { closeDrawer(); closePdfModal(); closeMaterialReviewModal(); closeScheduleTemplateModal(); closeCustomerMasterModal(); }
    });
    $("#drawer-backdrop").addEventListener("click", closeDrawer);
    render();
  }

  function switchRole(role, preserveView = false) {
    state.role = role;
    if (!preserveView && !roleHasView(role, state.view)) state.view = "dashboard";
    $("#role-select").value = role;
    closeDrawer();
    render();
    toast("视角已切换", `当前以${roles[role].label}身份浏览`);
  }

  function navigate(view) {
    if (view === "quoteCenter") {
      state.quote.navOpen = !state.quote.navOpen;
      if (state.quote.navOpen && !isQuoteChildView(state.view)) state.view = "quickQuote";
    } else
    if (view === "businessAccess") {
      if (isBusinessAccessChildView(state.view)) {
        state.businessAccessNavOpen = !state.businessAccessNavOpen;
      } else {
        state.businessAccessNavOpen = true;
        state.view = "materialsUpload";
      }
    } else
    {
      state.view = view;
      if (isQuoteChildView(view)) state.quote.navOpen = true;
      if (isBusinessAccessChildView(view)) state.businessAccessNavOpen = true;
      if (isScheduleChildView(view) || view === "schedulingOps") state.scheduleNavOpen = true;
    }
    location.hash = view;
    state.mobileNav = false;
    $(".sidebar").classList.remove("open");
    closeDrawer();
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function render() {
    if (state.view === "quoteCenter") state.view = "quickQuote";
    if (state.view === "businessAccess") state.view = "materialsUpload";
    if (state.role === "agent" && isScheduleChildView(state.view)) state.view = "scheduleCenter";
    if (state.role === "ops" && state.view === "schedulingOps") state.view = "scheduleReviewCenter";
    if (!roleHasView(state.role, state.view)) {
      state.view = "dashboard";
    }
    renderIdentity();
    renderNav();
    const main = $("#main-content");
    main.classList.toggle("quote-replica-host", isQuoteChildView(state.view));
    const renderers = {
      dashboard: renderDashboard, flow: renderFlow, customers: renderCustomers, create: renderCreate,
      quickQuote: renderQuickQuote, batchQuote: renderBatchQuote, quoteHistory: renderQuoteHistory,
      materialsUpload: renderMaterialsUpload, documents: renderDocuments, cases: renderCases, quotas: renderQuotas, receipts: renderReceipts,
      scheduleCenter: renderPayoutDispatchCenter, scheduleReviewCenter: renderPayoutAuditCenter,
      schedulingGenerate: renderScheduleGenerate, schedulingOrders: renderScheduleOrders, schedulingOps: renderOpsScheduleCenter,
      commissions: renderCommissions, config: renderConfig, kycConfig: renderKycConfig, audit: renderAudit, tracking: renderTracking
    };
    main.innerHTML = (renderers[state.view] || renderDashboard)();
    renderCustomerMasterModal();
    renderDispatchModal();
    bindPageEvents();
  }

  function renderIdentity() {
    const role = roles[state.role];
    $("#user-avatar").textContent = role.initials;
    $("#user-name").textContent = role.name;
    $("#user-title").textContent = role.title;
    $("#notification-count").textContent = ["ops", "payout"].includes(state.role) ? "8" : state.role === "manager" ? "6" : "4";
  }

  function renderNav() {
    $("#primary-nav").innerHTML = navByRole[state.role].map(([view, label, icon, badge]) => view === "quoteCenter" ? renderQuoteNavParent(label, icon) : view === "businessAccess" ? renderBusinessAccessNavParent(label, icon) : `
      <button class="nav-button ${state.view === view ? "active" : ""}" type="button" data-view="${view}" aria-current="${state.view === view ? "page" : "false"}">
        <span class="nav-icon" aria-hidden="true">${icon}</span><span>${label}</span>${navBadge(view, badge) ? `<span class="nav-badge">${navBadge(view, badge)}</span>` : ""}
      </button>`).join("");
  }

  function navItemHasView(item, view) {
    if (item[0] === view) return true;
    return item[0] === "businessAccess" && isBusinessAccessChildView(view);
  }

  function roleHasView(role, view) {
    return navByRole[role].some(item => navItemHasView(item, view)) || (["agent", "ops"].includes(role) && view === "create") || (["agent", "ops"].includes(role) && isQuoteChildView(view)) || (role === "agent" && isScheduleChildView(view)) || (role === "ops" && view === "schedulingOps");
  }

  function isQuoteChildView(view) {
    return view === "quickQuote" || view === "batchQuote" || view === "quoteHistory";
  }

  function isScheduleChildView(view) {
    return view === "schedulingGenerate" || view === "schedulingOrders";
  }

  function isBusinessAccessChildView(view) {
    return view === "materialsUpload" || view === "documents";
  }

  function renderQuoteNavParent(label, icon) {
    const expanded = state.quote.navOpen;
    return `<div class="nav-group">
      <button class="nav-button nav-parent ${isQuoteChildView(state.view) ? "active" : ""}" type="button" data-view="quoteCenter" aria-expanded="${expanded}">
        <span class="nav-icon" aria-hidden="true">${icon}</span><span>${label}</span><i aria-hidden="true">${expanded ? "⌃" : "⌄"}</i>
      </button>
      ${expanded ? `<div class="nav-submenu">
        <button class="nav-button nav-sub-button ${state.view === "quickQuote" ? "active" : ""}" type="button" data-view="quickQuote" aria-current="${state.view === "quickQuote" ? "page" : "false"}"><span class="nav-icon" aria-hidden="true">▪</span><span>快速报价</span></button>
        <button class="nav-button nav-sub-button ${state.view === "batchQuote" ? "active" : ""}" type="button" data-view="batchQuote" aria-current="${state.view === "batchQuote" ? "page" : "false"}"><span class="nav-icon" aria-hidden="true">▦</span><span>批量报价</span></button>
        <button class="nav-button nav-sub-button ${state.view === "quoteHistory" ? "active" : ""}" type="button" data-view="quoteHistory" aria-current="${state.view === "quoteHistory" ? "page" : "false"}"><span class="nav-icon" aria-hidden="true">◷</span><span>往期报价</span></button>
      </div>` : ""}
    </div>`;
  }

  function renderScheduleNavParent(label, icon) {
    const expanded = state.scheduleNavOpen;
    const submittedCount = state.scheduleOrders.length;
    return `<div class="nav-group">
      <button class="nav-button nav-parent ${isScheduleChildView(state.view) ? "active" : ""}" type="button" data-view="scheduleCenter" aria-expanded="${expanded}">
        <span class="nav-icon" aria-hidden="true">${icon}</span><span>${label}</span><i aria-hidden="true">${expanded ? "⌃" : "⌄"}</i>
      </button>
      ${expanded ? `<div class="nav-submenu">
        <button class="nav-button nav-sub-button ${state.view === "schedulingGenerate" ? "active" : ""}" type="button" data-view="schedulingGenerate" aria-current="${state.view === "schedulingGenerate" ? "page" : "false"}"><span class="nav-icon" aria-hidden="true">▪</span><span>排单生成</span></button>
        <button class="nav-button nav-sub-button ${state.view === "schedulingOrders" ? "active" : ""}" type="button" data-view="schedulingOrders" aria-current="${state.view === "schedulingOrders" ? "page" : "false"}"><span class="nav-icon" aria-hidden="true">▦</span><span>已发起排单</span>${submittedCount ? `<span class="nav-badge">${submittedCount}</span>` : ""}</button>
      </div>` : ""}
    </div>`;
  }

  function renderBusinessAccessNavParent(label, icon) {
    const expanded = state.businessAccessNavOpen;
    return `<div class="nav-group">
      <button class="nav-button nav-parent ${isBusinessAccessChildView(state.view) ? "active" : ""}" type="button" data-view="businessAccess" aria-expanded="${expanded}">
        <span class="nav-icon" aria-hidden="true">${icon}</span><span>${label}</span><i aria-hidden="true">${expanded ? "⌃" : "⌄"}</i>
      </button>
      ${expanded ? `<div class="nav-submenu">
        <button class="nav-button nav-sub-button ${state.view === "materialsUpload" ? "active" : ""}" type="button" data-view="materialsUpload" aria-current="${state.view === "materialsUpload" ? "page" : "false"}"><span class="nav-icon" aria-hidden="true">▪</span><span>材料上传</span></button>
        <button class="nav-button nav-sub-button ${state.view === "documents" ? "active" : ""}" type="button" data-view="documents" aria-current="${state.view === "documents" ? "page" : "false"}"><span class="nav-icon" aria-hidden="true">▤</span><span>补件处理</span>${navBadge("documents", 2) ? `<span class="nav-badge">${navBadge("documents", 2)}</span>` : ""}</button>
      </div>` : ""}
    </div>`;
  }

  function renderScheduleReviewNavParent(label, icon) {
    const expanded = state.scheduleNavOpen;
    const reviewCount = state.scheduleOrders.filter(item => item.status !== "草稿").length;
    return `<div class="nav-group">
      <button class="nav-button nav-parent ${state.view === "schedulingOps" ? "active" : ""}" type="button" data-view="scheduleReviewCenter" aria-expanded="${expanded}">
        <span class="nav-icon" aria-hidden="true">${icon}</span><span>${label}</span><i aria-hidden="true">${expanded ? "⌃" : "⌄"}</i>
      </button>
      ${expanded ? `<div class="nav-submenu">
        <button class="nav-button nav-sub-button ${state.view === "schedulingOps" ? "active" : ""}" type="button" data-view="schedulingOps" aria-current="${state.view === "schedulingOps" ? "page" : "false"}"><span class="nav-icon" aria-hidden="true">▦</span><span>排单审核</span>${reviewCount ? `<span class="nav-badge">${reviewCount}</span>` : ""}</button>
      </div>` : ""}
    </div>`;
  }

  function navBadge(view, fallback) {
    if (state.role === "compliance" && view === "cases") return state.cases.filter(item => item.status === "待合规审核").length;
    if (state.role === "compliance" && view === "dashboard") return state.cases.filter(item => item.status === "待合规审核").length;
    if (state.role === "payout" && view === "cases") return state.payoutOrders.filter(item => item.status === "待出款").length;
    if (state.role === "payout" && view === "dashboard") return state.payoutOrders.filter(item => item.status === "待出款").length;
    if (state.role === "ops" && view === "scheduleReviewCenter") return state.payoutOrders.filter(item => item.status === "出款审核中").length;
    if (state.role === "agent" && view === "scheduleCenter") return dispatchPendingCustomers().length;
    if (state.role === "agent" && view === "schedulingOrders") return state.scheduleOrders.length;
    return fallback;
  }

  function pageHeader(eyebrow, title, subtitle, actions = "") {
    return `<header class="page-header"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="page-subtitle">${subtitle}</p></div>${actions ? `<div class="header-actions">${actions}</div>` : ""}</header>`;
  }

  function roleContext() {
    const role = roles[state.role];
    const next = state.flowIndex < flowActions.length ? flowActions[state.flowIndex] : null;
    const note = next && next.role === state.role ? "演示案例有一步等待你处理" : `${role.label}只能看到授权数据与操作`;
    const primaryView = navByRole[state.role][1]?.[0] || "dashboard";
    return `<div class="role-context"><div class="context-person"><i>${role.initials}</i><div><strong>${role.name}</strong><span>${role.title} · ${note}</span></div></div><button class="btn btn-sm" type="button" data-view="${primaryView}">打开主要工作项</button></div>`;
  }

  function renderDashboard() {
    const dashboards = {
      agent: { eyebrow: "JUNIOR TRADER", title: "初级交易员工作台", subtitle: "处理客户、材料、补件和排单发起，聚焦自己名下客户。", metrics: [["活跃客户", "18", "本月 +3"], ["待客户补件", "2", "最早剩余 6 小时"], ["待排单客户", String(dispatchPendingCustomers().length), "合规审核通过"], ["排单进行中", String(state.payoutOrders.filter(item => item.status !== "已出款").length), "含审核与待出款"]] },
      ops: { eyebrow: "SENIOR TRADER", title: "高级交易员工作台", subtitle: "复核客户材料、补件和排单，处理更高权限的交易动作。", metrics: [["待出款审核", String(state.payoutOrders.filter(item => item.status === "出款审核中").length), "交易员已排单"], ["待客户补件", String(state.cases.filter(item => item.status === "待客户补件").length), "需跟进"], ["今日上传材料", "6", "来自 3 位客户"], ["风险提示", "2", "需人工确认"]] },
      payout: { eyebrow: "PAYOUT CLERK", title: "出款员工作台", subtitle: "处理出款队列和凭证匹配，保持付款材料完整归档。", metrics: [["待出款", String(state.payoutOrders.filter(item => item.status === "待出款").length), "审核已通过"], ["待核凭证", "2", "1 项金额不符"], ["已出款", String(state.payoutOrders.filter(item => item.status === "已出款").length), "回单已归档"], ["今日完成", "9", "已归档"]] },
      compliance: { eyebrow: "COMPLIANCE", title: "合规官工作台", subtitle: "只处理已提交合规的案件，自动化结果仅作为判断依据。", metrics: [["待合规审核", String(state.cases.filter(item => item.status === "待合规审核").length), "全部要求人工结论"], ["即将超时", "1", "剩余 3 小时"], ["今日已通过", "5", "均已人工确认"], ["今日已驳回", "2", "已返回处理"]] },
      manager: { eyebrow: "OPERATIONS MANAGER", title: "运营经理工作台", subtitle: "查看客户池与团队处理概况，当前菜单聚焦客户管理。", metrics: [["全部客户", String(state.customers.length), "演示客户池"], ["待处理客户", String(state.customers.filter(item => !["审核通过", "已排单", "交易中", "已成交"].includes(item.status)).length), "含准入与审核"], ["高风险客户", String(state.customers.filter(item => item.risk === "高").length), "需关注"], ["今日更新", "7", "客户动态"]] },
      finance: { eyebrow: "FINANCE", title: "财务工作台", subtitle: "查看客户和费率佣金，跟进待财务确认的结算事项。", metrics: [["客户记录", String(state.customers.length), "可查阅"], ["待财务确认", "3", "佣金记录"], ["本月佣金", "HKD 42,180", "已确认"], ["当前费率", "0.35%", "个人客户"]] },
      admin: { eyebrow: "ADMINISTRATION", title: "系统总览", subtitle: "查看规则、权限和审计记录。", metrics: [["活跃用户", "26", "6 个角色组"], ["进行中案件", "38", "跨 4 个阶段"], ["规则版本", "v1.8", "07-08 生效"], ["审计事件", "1,284", "过去 30 天"]] }
    };
    const d = dashboards[state.role];
    const actionByRole = {
      agent: `<button class="btn" data-view="customers">查看客户</button><button class="btn btn-primary" data-view="materialsUpload">上传材料</button>`,
      ops: `<button class="btn" data-view="customers">查看客户</button><button class="btn btn-primary" data-view="scheduleReviewCenter">出款审核</button>`,
      payout: `<button class="btn btn-primary" data-view="cases">处理队列</button>`,
      compliance: `<button class="btn btn-primary" data-view="cases">进入审核队列</button>`,
      manager: `<button class="btn btn-primary" data-view="customers">查看客户管理</button>`,
      finance: `<button class="btn" data-view="customers">查看客户</button><button class="btn btn-primary" data-view="commissions">费率与佣金</button>`,
      admin: `<button class="btn btn-primary" data-view="config">查看系统规则</button>`
    };
    const actions = actionByRole[state.role] || "";
    return `<div class="page">${pageHeader(d.eyebrow, d.title, d.subtitle, actions)}${roleContext()}
      <section class="metric-strip" aria-label="关键指标">${d.metrics.map((m, i) => metric(m[0], m[1], m[2], ["◌", "!", "◇", "✓"][i])).join("")}</section>
      <div class="dashboard-grid">
        <section class="section"><div class="section-header"><div><h2>${["agent", "finance"].includes(state.role) ? "我的待办" : "优先处理队列"}</h2><p>按时限和风险自动排序</p></div><button class="link-button" data-view="${state.role === "admin" || state.role === "compliance" || state.role === "payout" ? navByRole[state.role][1][0] : "customers"}">查看全部 →</button></div>${renderTasks()}</section>
        <div class="flow-side">
          <section class="section"><div class="section-header"><div><h2>今日处理负载</h2><p>基于 Demo 队列</p></div></div><div class="queue-summary">${queueProgress("已完成", 14, 21, 67)}${queueProgress("即将超时", 2, 21, 10)}${queueProgress("需要协作", 5, 21, 24)}</div></section>
          <section class="section"><div class="section-header"><div><h2>接下来</h2><p>交收与截止时间</p></div></div><div class="agenda">${agenda("10:30", "现金验收", "Jack · HKD 156,400")}${agenda("14:00", "KYC复核", "U换转账 · 第三方账户")}${agenda("18:00", "地址测试", "Ha Ma · 10 U 测试")}</div></section>
        </div>
      </div></div>`;
  }

  function metric(label, value, hint, icon) {
    return `<div class="metric"><div class="metric-label"><span>${label}</span><i>${icon}</i></div><div class="metric-value">${value}<small>${/佣金|额度/.test(label) ? "" : ""}</small></div><div class="metric-trend">${hint}</div></div>`;
  }
  function queueProgress(label, value, total, percent) { return `<div class="queue-progress"><div class="queue-label"><strong>${label}</strong><span>${value} / ${total}</span></div><div class="progress-track"><i style="width:${percent}%"></i></div></div>`; }
  function agenda(time, title, sub) { return `<div class="agenda-row"><time>${time}</time><div><strong>${title}</strong><span>${sub}</span></div></div>`; }

  function renderTasks() {
    const roleTasks = {
      agent: [["材", "陈嘉宁", "补齐地址证明第二页", "待处理", "今天", "C-2026-0718"], ["传", "林雅雯", "上传最新银行月结单", "待上传", "今天 10:30", "C-2026-0588"], ["排", "Wu Aili", "粘贴客户排单内容并匹配 VA", "草稿", "今天", "C-2026-0718"], ["补", "Northstar", "跟进 UBO 签署页", "待客户补件", "明天", "C-2026-0694"]],
      ops: [["审", "林雅雯", "美元出款排单等待审核", "待运营处理", "今天 10:18", "C-2026-0588"], ["材", "陈嘉宁", "材料补件已回传，等待复核", "待运营审核", "剩余 1h", "C-2026-0718"], ["传", "Northstar", "企业材料需重新上传签署页", "待客户补件", "今天", "C-2026-0694"]],
      payout: [["队", "陈嘉宁", "处理队列等待付款进度更新", "交易中", "今天", "C-2026-0718"], ["凭", "TRX-772019", "现金验收金额与报价不一致", "异常", "剩余 1h", "C-2026-0588"], ["凭", "林雅雯", "转账凭证待匹配订单", "待确认", "今天 10:30", "C-2026-0588"]],
      compliance: [["高", "赵明远", "命中高风险地区关联规则", "高风险", "剩余 3h", "C-2026-0711"], ["审", "陈嘉宁", "运营已确认材料完整，等待人工复核", "待审核", "今天", "C-2026-0718"], ["审", "Northstar Trading", "企业 UBO 材料等待合规结论", "待审核", "明天", "C-2026-0694"]],
      manager: [["客", "客户池", "查看今日客户状态变化", "待查看", "今天", "C-2026-0718"], ["风", "赵明远", "高风险客户状态需要关注", "高风险", "今天", "C-2026-0711"], ["补", "Northstar", "客户补件超时风险", "待客户补件", "明天", "C-2026-0694"]],
      finance: [["佣", "陈嘉宁", "佣金记录等待财务确认", "待财务确认", "今天", "C-2026-0718"], ["率", "费率规则", "检查个人客户费率版本", "待确认", "今天", "C-2026-0588"], ["客", "Aurora Capital", "复核企业客户佣金基数", "已确认", "07-13", "C-2026-0677"]],
      admin: [["权", "权限变更", "Peter 为新人员分配角色", "待确认", "今天", "C-2026-0718"], ["规", "规则版本 v1.8", "角色权限菜单已更新", "已发布", "今天", "C-2026-0694"], ["审", "异常下载", "同一用户 30 分钟内下载 12 份文件", "需检查", "剩余 1h", "C-2026-0711"]]
    };
    return `<div class="task-list">${roleTasks[state.role].map(task => `<button class="task-row" type="button" data-open-customer="${task[5]}"><span class="task-icon">${task[0]}</span><span class="task-main"><strong>${task[1]}</strong><span>${task[2]}</span></span><span class="task-meta"><span class="status status-${statusTone(task[3])}">${task[3]}</span><time>${task[4]}</time></span></button>`).join("")}</div>`;
  }

  function renderPortal() {
    return `<div class="page">${pageHeader("CLIENT PORTAL", "客户服务入口", "了解业务要求、提交所需资料或查询现有申请进度。")}
      <div class="role-context"><div class="context-person"><i>客</i><div><strong>公开客户门户</strong><span>正式系统建议使用 交易员 邀请链接或一次性验证码</span></div></div><span class="status status-warning">Demo 假设</span></div>
      <section class="portal-steps">${metric("业务介绍", "01", "了解服务范围与资料要求", "i")}${metric("资料提交", "02", "个人或企业客户资料", "＋")}${metric("进度查询", "03", "使用申请编号查询", "⌕")}</section>
      <div class="dashboard-grid"><section class="section"><div class="section-header"><div><h2>选择办理事项</h2><p>需要帮助时请联系你的 交易员</p></div></div><div class="task-list">
        <button class="task-row" data-view="create"><span class="task-icon">＋</span><span class="task-main"><strong>提交新客户资料</strong><span>个人 KYC 或企业 KYB，预计 8–12 分钟</span></span><span>→</span></button>
        <button class="task-row" data-view="tracking"><span class="task-icon">⌕</span><span class="task-main"><strong>查询申请进度</strong><span>查看当前状态、补件要求和下一步</span></span><span>→</span></button>
        <button class="task-row" data-role-jump="agent"><span class="task-icon">◎</span><span class="task-main"><strong>打开内部交易流程</strong><span>切换至 交易员 视角查看五类交易执行轨道</span></span><span>→</span></button>
      </div></section><section class="section"><div class="section-header"><div><h2>资料安全提示</h2><p>演示规则</p></div></div><div class="checklist">${["本 Demo 不上传或保存文件", "同名客户仅显示脱敏信息", "OCR 与风险判断只提供建议", "关键决定必须由授权人员确认"].map(item => `<div class="checklist-row"><i>✓</i><span>${item}</span></div>`).join("")}</div></section></div></div>`;
  }

  function renderFlow() {
    const customer = mainCustomer();
    const done = state.flowIndex >= flowActions.length;
    const action = done ? null : flowActions[state.flowIndex];
    return `<div class="page">${pageHeader("BITVAST FLOW", "交易流程工作台", "用五条轨道演示 U换现金、现金换U、U换转账、转账换U、法币换法币的系统执行节点。", `<button class="btn" id="reset-flow">↻ 重置演示案例</button>`)}
      <div class="flow-layout"><section class="flow-main"><div class="flow-hero"><div class="flow-person"><span class="avatar">${customerInitials(customer)}</span><div><h2>${customer.name} <span class="status status-${statusTone(customer.status)}">${customer.status}</span></h2><p>${customer.id} · ${customer.idMasked} · 交易员 ${customer.agent}</p></div></div><div class="flow-score"><strong>${Math.round((state.flowIndex / flowActions.length) * 100)}%</strong><span>业务闭环完成度</span></div></div>
      <div class="track-map">${flowTracks.map(track => renderFlowTrack(track, action, done)).join("")}</div>
      ${done ? renderFlowComplete(customer) : renderCurrentAction(action)}
      </section><aside class="flow-side"><div class="assumption"><strong>演示边界</strong><p>五类交易共享客户、钱包地址、收付款凭证和审计记录。系统负责提示、校验、复核和归档，现金交收、合规判断和出款执行仍由授权人员确认。</p></div>
      <section class="section"><div class="section-header"><div><h2>客户时间线</h2><p>最新事件排在最上方</p></div><button class="link-button" data-open-customer="${customer.id}">查看档案 →</button></div><div class="timeline">${customer.timeline.slice(0, 7).map(timelineItem).join("")}</div></section></aside></div></div>`;
  }

  function renderFlowTrack(track, action, done) {
    const trackActions = flowActions.filter(item => item.track === track.key);
    const completed = trackActions.filter(item => flowActions.indexOf(item) < state.flowIndex).length;
    const current = action?.track === track.key;
    return `<section class="track-row ${current ? "active" : ""}"><div class="track-label"><strong>${track.name}</strong><span>${completed} / ${trackActions.length}</span></div><div class="track-steps">${track.steps.map((label, index) => `<span class="track-step ${index < completed || done ? "done" : index === completed && current ? "current" : ""}"><i>${index < completed || done ? "✓" : index + 1}</i>${label}</span>`).join("")}</div></section>`;
  }

  function renderCurrentAction(action) {
    const role = roles[action.role];
    const correctRole = state.role === action.role;
    const evidence = action.evidence.map(item => { const [label, value] = item.split("|"); return `<li><span>${label}</span><strong>${value}</strong></li>`; }).join("");
    return `<div class="current-action"><div class="action-kicker">当前待办 · 第 ${state.flowIndex + 1} 步</div><h2>${action.title}</h2><p>${action.desc}</p><ul class="action-evidence">${evidence}</ul><div class="action-footer"><span class="owner-chip"><i>${role.initials}</i>由 ${role.label} 处理</span><button class="btn btn-primary" id="flow-action" type="button">${correctRole ? action.label : `切换为${role.label}并继续`} →</button></div></div>`;
  }

  function renderFlowComplete(customer) {
    return `<div class="empty-state"><div><i>✓</i><h2>五类交易流程已完成</h2><p>${customer.name} 的报价、地址校验、到账复核、付款执行和凭证归档事件已经写入同一条业务时间线。</p><button class="btn btn-primary" data-view="commissions">查看待结算佣金 →</button></div></div>`;
  }

  function timelineItem(item) { return `<div class="timeline-item"><strong>${item.title}</strong><p>${item.detail}</p><time>${item.role} · ${item.time}</time></div>`; }

  function renderCustomers() {
    const statuses = ["全部状态", ...customerStatuses];
    const filtered = state.customers.filter(customer => {
      const query = state.customerSearch.toLowerCase();
      const subCustomerText = (customer.subCustomers || []).map(item => `${item.name}${item.clientNo || ""}`).join("");
      return (!query || `${customer.name}${customer.enName}${customer.id}${customerNo(customer)}${customer.agent}${subCustomerText}`.toLowerCase().includes(query)) &&
        (state.customerStatus === "全部状态" || customer.status === state.customerStatus) &&
        (state.customerType === "全部类型" || customerKind(customer) === state.customerType || (state.customerType === "中介下级客户" && (customer.subCustomers || []).length));
    });
    const totalPages = Math.max(1, Math.ceil(filtered.length / customerPageSize));
    if (state.customerPage > totalPages) state.customerPage = totalPages;
    if (state.customerPage < 1) state.customerPage = 1;
    const pageStart = (state.customerPage - 1) * customerPageSize;
    const paged = filtered.slice(pageStart, pageStart + customerPageSize);
    const title = state.role === "admin" ? "全部客户" : "客户管理";
    const visibleRows = paged.flatMap(customer => [customerRow(customer), ...(state.expandedIntermediaries.includes(customer.id) ? (customer.subCustomers || []).map((child, index) => subCustomerRow(customer, child, index)) : [])]);
    const pageEnd = Math.min(pageStart + paged.length, filtered.length);
    const actions = ["agent", "ops"].includes(state.role) ? `<button class="btn btn-primary" id="customer-create-open" type="button">＋ 新建客户</button>` : "";
    return `<div class="page">${pageHeader("CLIENT MASTER", title, "一个客户主档承载多次申请、钱包地址、额度、凭证和审批记录。", actions)}
      <div class="toolbar"><label class="search-control">⌕<input id="customer-search" value="${escapeHtml(state.customerSearch)}" placeholder="搜索客户名称、编号或 交易员" aria-label="搜索客户" /></label>
      <select class="select-control" id="status-filter" aria-label="按状态筛选">${statuses.map(status => `<option ${status === state.customerStatus ? "selected" : ""}>${status}</option>`).join("")}</select>
      <select class="select-control" id="type-filter" aria-label="按客户类型筛选"><option>全部类型</option><option ${state.customerType === "直客" ? "selected" : ""}>直客</option><option ${state.customerType === "中介" ? "selected" : ""}>中介</option><option ${state.customerType === "中介下级客户" ? "selected" : ""}>中介下级客户</option></select><span class="toolbar-count">显示 ${filtered.length ? `${pageStart + 1}-${pageEnd}` : "0"} / ${filtered.length}，共 ${state.customers.length} 位客户</span></div>
      <div class="data-table-wrap">${filtered.length ? `<table class="data-table customer-master-table"><thead><tr><th>客户</th><th>客户类型 / 地区</th><th>当前状态</th><th>风险</th><th>负责人</th><th>最后更新</th><th>操作</th></tr></thead><tbody>${visibleRows.join("")}</tbody></table>` : `<div class="empty-state"><div><i>⌕</i><h2>没有匹配的客户</h2><p>调整关键词或清除筛选条件。</p><button class="btn" id="clear-filters">清除筛选</button></div></div>`}</div>
      ${filtered.length ? `<div class="pagination-bar"><span>第 ${state.customerPage} / ${totalPages} 页</span><div><button class="btn btn-sm" type="button" data-customer-page="${state.customerPage - 1}" ${state.customerPage <= 1 ? "disabled" : ""}>上一页</button><button class="btn btn-sm" type="button" data-customer-page="${state.customerPage + 1}" ${state.customerPage >= totalPages ? "disabled" : ""}>下一页</button></div></div>` : ""}</div>`;
  }

  function renderQuoteReplica(viewName) {
    if (!canUseQuote()) return quotePermissionPage();
    const titles = {
      quickQuote: ["QUOTE MANAGEMENT", "快速报价", "完整复刻参考报价页的快速报价工作台。"],
      batchQuote: ["QUOTE MANAGEMENT", "批量报价", "完整复刻参考报价页的报价组和批量报价交互。"],
      quoteHistory: ["QUOTE MANAGEMENT", "往期报价", "完整复刻参考报价页的平台基准价和客户报价历史。"]
    };
    const [eyebrow, title, subtitle] = titles[viewName] || titles.quickQuote;
    const src = `quote/index02.html?embedded=1&view=${encodeURIComponent(viewName)}`;
    return `<div class="page quote-replica-page">
      <div class="quote-replica-frame-shell" aria-label="${escapeHtml(`${eyebrow} · ${subtitle}`)}">
        <iframe class="quote-replica-frame" title="${escapeHtml(title)}" src="${src}"></iframe>
      </div>
    </div>`;
  }

  function renderQuickQuote() {
    return renderQuoteReplica("quickQuote");
    if (!canUseQuote()) return quotePermissionPage();
    const customer = quoteSelectedCustomer();
    const output = quoteText(customer);
    const matches = quoteCustomerMatches(state.quote.customerQuery);
    return `<div class="page quote-page">${pageHeader("QUOTE MANAGEMENT", "快速报价", "按客户维护报价公式，引用平台基准价、渠道汇率和中介报价生成对客文本。")}
      <section class="quote-shell ${state.quote.sideCollapsed ? "side-collapsed" : ""}">
        <main class="quote-main-panel">
          <section class="quote-top-card">
            <div class="quote-combobox">
              <span>选择已有客户 / 中介：</span>
              <div class="quote-search-box">
                <input id="quote-customer-search" value="${escapeHtml(state.quote.customerQuery)}" autocomplete="off" placeholder="输入客户名称 / 编号搜索" />
                <button class="icon-button" type="button" id="quote-customer-toggle" aria-label="展开客户列表">⌄</button>
                ${state.quote.customerDropdownOpen ? `<div class="quote-dropdown">${matches.map(item => `<button type="button" data-quote-pick-customer="${item.id}"><strong>${escapeHtml(item.name)} (${item.code})</strong><span>${escapeHtml(item.broker === "-" ? "中介客户" : item.broker || "直营")} ${escapeHtml(item.brokerCode || "")}</span></button>`).join("") || `<div class="quote-dropdown-empty">没有匹配客户</div>`}</div>` : ""}
              </div>
              <button class="btn" type="button" id="quote-new-customer">＋ 新建客户</button>
            </div>
          </section>

          <section class="quote-config-panel">
            <div class="quote-section-head">
              <div><h2>对客报价配置</h2><p>${quoteCustomerLabel(customer)} · ${escapeHtml(quoteBrokerLabel(customer))}</p></div>
              <button class="btn btn-primary" type="button" id="quote-calc">⚡ 一键计算报价</button>
            </div>
            <div class="quote-info-strip">${detailField("客户信息", quoteCustomerLabel(customer))}${detailField("中介信息", quoteBrokerLabel(customer))}${detailField("中介预期加点", "-")}${detailField("备注", customer.note || "-")}</div>
            <section class="quote-output-card">
              <header><strong>对客报价文本预览</strong><button class="btn btn-sm" type="button" id="quote-copy">复制文本</button></header>
              <pre id="quote-output">${escapeHtml(output)}</pre>
            </section>
            <div class="quote-item-list">${customer.quotes.map((item, index) => renderQuoteItem(item, index, customer)).join("")}</div>
            <div class="quote-footer-actions"><button class="btn" type="button" id="quote-add-row">＋ 新增报价配置项</button></div>
          </section>
        </main>
        <aside class="quote-assist-rail">
          <button class="quote-side-toggle" type="button" id="quote-side-toggle" title="${state.quote.sideCollapsed ? "展开右侧面板" : "折叠右侧面板"}">${state.quote.sideCollapsed ? "›" : "‹"}</button>
          ${renderQuoteBenchmarkPanel()}
          ${renderQuoteChannelPanel()}
        </aside>
      </section>
      ${state.quote.activeVariableQuoteIndex !== null ? renderQuoteVariableModal() : ""}
      ${state.quote.groupModalOpen ? renderQuoteGroupModal() : ""}
      ${state.quote.addCustomerModalOpen ? renderQuoteAddCustomerModal() : ""}
    </div>`;
  }

  function renderQuoteItem(item, index) {
    const expanded = item.expanded !== false;
    const result = calculateQuoteItem(item);
    item.result = result.value;
    if (!expanded) {
      return `<article class="quote-formula-card compact">
        <button class="quote-summary-row" type="button" data-quote-toggle="${index}">
          <span><i></i><strong>${escapeHtml(item.tradeType || `报价项 #${index + 1}`)}</strong></span>
          <b>${escapeHtml(item.prefix || "-")}</b>
          <code>${renderFormulaLabel(item.formula)}</code>
          <strong>${escapeHtml(result.value)}</strong>
          <small>更新于：${escapeHtml(item.lastQuotedAt || "-")}</small>
        </button>
      </article>`;
    }
    return `<article class="quote-formula-card">
      <header>
        <div><span class="quote-dot"></span><strong>报价项 #${index + 1}</strong><small>更新于：${escapeHtml(item.lastQuotedAt || "-")}</small></div>
        <div class="quote-card-actions">
          <button class="quote-order-btn" type="button" data-quote-move="${index}" data-quote-direction="-1" ${index === 0 ? "disabled" : ""} aria-label="上移">↑</button>
          <button class="quote-order-btn" type="button" data-quote-move="${index}" data-quote-direction="1" ${index === quoteSelectedCustomer().quotes.length - 1 ? "disabled" : ""} aria-label="下移">↓</button>
          <button class="icon-button" type="button" data-quote-remove="${index}" aria-label="删除报价项">⌫</button>
          <button class="link-button" type="button" data-quote-toggle="${index}">收起 ⌃</button>
        </div>
      </header>
      <div class="quote-formula-grid">
        <label class="field"><span>交易类型</span><input data-quote-field="tradeType" data-quote-index="${index}" value="${escapeHtml(item.tradeType)}" /></label>
        <label class="field"><span>前缀描述</span><input data-quote-field="prefix" data-quote-index="${index}" value="${escapeHtml(item.prefix)}" /></label>
        <label class="field"><span>后缀描述</span><input data-quote-field="suffix" data-quote-index="${index}" value="${escapeHtml(item.suffix)}" /></label>
      </div>
      <section class="quote-formula-box">
        <div class="quote-formula-toolbar">
          <div><button class="quote-insert-variable" type="button" data-quote-variable-open="${index}">＋ 插入变量</button><span>快捷运算符:</span>${["+", "-", "*", "/", "(", ")"].map(op => `<button class="quote-op-chip" type="button" data-quote-insert-op="${op}" data-quote-index="${index}">${op}</button>`).join("")}</div>
          <button class="quote-op-chip" type="button" data-quote-clear-formula="${index}">清空</button>
        </div>
        <input class="quote-formula-editor ${result.ok ? "" : "error"}" data-quote-field="formula" data-quote-index="${index}" data-quote-formula-input="${index}" value="${escapeHtml(item.formula)}" placeholder="输入数字、运算符，或插入右侧变量" />
        <div class="quote-formula-readable">${formulaBadgeText(item.formula)}</div>
        <div class="quote-error ${result.ok ? "" : "show"}">⚠ ${escapeHtml(result.error)}</div>
        <div class="quote-param-grid">
          <label class="field"><span>中介加点</span><input data-quote-field="brokerPoint" data-quote-index="${index}" value="${escapeHtml(item.brokerPoint)}" inputmode="decimal" /></label>
          <label class="field"><span>BV 加点</span><input data-quote-field="bvPoint" data-quote-index="${index}" value="${escapeHtml(item.bvPoint)}" inputmode="decimal" /></label>
          <label class="field"><span>保留位数</span><input data-quote-field="digits" data-quote-index="${index}" value="${escapeHtml(item.digits)}" inputmode="numeric" /></label>
          <label class="field"><span>舍入模式</span><select data-quote-field="roundMode" data-quote-index="${index}">${[["45", "四舍五入"], ["up", "向上"], ["down", "向下"]].map(([value, label]) => `<option value="${value}" ${item.roundMode === value ? "selected" : ""}>${label}</option>`).join("")}</select></label>
          <div class="quote-result-box ${result.ok ? "" : "error"}"><span>计算结果</span><strong>${escapeHtml(result.value)}</strong></div>
        </div>
      </section>
    </article>`;
  }

  function renderQuoteBenchmarkPanel() {
    return `<section class="quote-assist-card">
      <header><div><span class="assist-icon">▥</span><h3>平台基准价</h3></div><div class="quote-card-actions"><button class="btn btn-sm" type="button" id="quote-benchmark-edit">${state.quote.benchmarkEditing ? "保存" : "编辑"}</button><button class="btn btn-sm" type="button" id="quote-reset-benchmark">重置</button></div></header>
      <div class="quote-assist-meta">上次保存：${escapeHtml(state.quote.benchmarkUpdatedAt)}</div>
      <div class="quote-bench-table">${state.quote.benchmarkPrices.map(row => `<div>
        <input data-quote-benchmark-label="${row.code}" value="${escapeHtml(row.label)}" ${state.quote.benchmarkEditing ? "" : "readonly"} aria-label="价格类型" />
        <input data-quote-benchmark-value="${row.code}" value="${escapeHtml(formatQuoteNumber(row.value, row.digits))}" ${state.quote.benchmarkEditing ? "" : "readonly"} aria-label="${escapeHtml(row.label)}数值" />
        <button class="icon-button" type="button" data-quote-benchmark-remove="${row.code}" ${state.quote.benchmarkEditing ? "" : "disabled"} aria-label="删除基准价">×</button>
      </div>`).join("")}</div>
      <button class="btn quote-full-btn" type="button" id="quote-add-benchmark" ${state.quote.benchmarkEditing ? "" : "disabled"}>＋ 新增基准价项目</button>
    </section>`;
  }

  function renderQuoteChannelPanel() {
    return `<section class="quote-assist-card">
      <header><div><span class="assist-icon success">⌁</span><h3>渠道即时汇率</h3></div><button class="btn btn-sm" type="button" id="quote-refresh-rates">刷新</button></header>
      <div class="quote-assist-meta"><span>数据源：XE Global</span><span class="status status-success">连接中</span></div>
      <div class="quote-channel-list">${state.quote.channelRates.map(row => `<div><span>${escapeHtml(row.label)}</span><strong>${escapeHtml(formatQuoteNumber(row.value, row.digits))}</strong></div>`).join("")}</div>
    </section>`;
  }

  function renderBatchQuote() {
    return renderQuoteReplica("batchQuote");
    if (!canUseQuote()) return quotePermissionPage();
    const group = quoteSelectedGroup();
    const customers = quoteGroupCustomers(group).filter(batchCustomerMatchesFilter);
    const selected = customers[state.quote.batchCustomerIndex] || customers[0];
    const types = [...new Set(quoteGroupCustomers(group).flatMap(customer => customer.quotes.map(item => item.tradeType || item.prefix || "其他")))];
    return `<div class="page quote-page">${pageHeader("QUOTE MANAGEMENT", "批量报价", "按报价组批量生成客户报价，可筛选、勾选并复制报价文本。")}
      <section class="batch-quote-layout refined">
        <aside class="batch-column"><header><strong>报价组</strong><button class="btn btn-sm btn-primary" id="quote-add-group" type="button">＋</button></header>
          <div class="batch-list">${state.quote.groups.map(item => `<button class="${item.id === group.id ? "active" : ""}" type="button" data-quote-group="${item.id}"><strong>${escapeHtml(item.name)}</strong><span>${item.customerIds.length} 位客户</span></button>`).join("")}</div></aside>
        <aside class="batch-column"><header><strong>该组客户</strong><button class="btn btn-sm btn-primary" id="quote-add-group-customer" type="button">＋</button></header>
          <label class="batch-filter"><input id="quote-batch-customer-filter" value="${escapeHtml(state.quote.batchCustomerFilter)}" placeholder="筛选客户名称 / 编号" /></label>
          <div class="batch-list">${customers.map((customer, index) => `<button class="${selected?.id === customer.id ? "active" : ""}" type="button" data-quote-batch-customer="${index}"><strong>${escapeHtml(customer.name)}</strong><span>#${customer.code} · ${escapeHtml(customer.broker)}</span></button>`).join("") || `<div class="schedule-empty-block"><strong>没有匹配客户</strong><span>调整筛选词后重试。</span></div>`}</div></aside>
        <main class="batch-results"><header><div><strong>报价结果 - ${escapeHtml(group.name)}</strong><span>${customers.length} 位客户，${customers.reduce((sum, customer) => sum + customer.quotes.length, 0)} 个报价项</span></div><div class="case-actions"><button class="btn" id="quote-recalc-group" type="button">重新计算全组</button><button class="btn btn-primary" id="quote-copy-picked" type="button">复制已选</button><button class="btn" id="quote-copy-group" type="button">复制全组</button></div></header>
          <div class="batch-select-bar"><select id="quote-batch-type-filter"><option value="">全部交易类型</option>${types.map(type => `<option value="${escapeHtml(type)}" ${state.quote.batchTypeFilter === type ? "selected" : ""}>${escapeHtml(type)}</option>`).join("")}</select><button class="link-button" type="button" id="quote-batch-select-visible">全选可见报价</button><button class="link-button" type="button" id="quote-batch-clear-selected">清空选择</button><span>${state.quote.batchSelectedKeys.length} 条已选</span></div>
          <div class="batch-result-list">${customers.map((customer, index) => renderBatchCustomerCard(customer, index)).join("")}</div></main>
      </section>
    </div>`;
  }

  function renderBatchCustomerCard(customer, index) {
    const visibleQuotes = customer.quotes.map((item, quoteIndex) => ({ item, quoteIndex })).filter(({ item }) => batchQuoteMatchesType(item));
    return `<article class="batch-result-card" id="batch-card-${index}"><header><label><input type="checkbox" data-quote-select-customer="${customer.id}" ${visibleQuotes.length && visibleQuotes.every(({ quoteIndex }) => quoteSelectedSet().has(batchQuoteKey(customer, quoteIndex))) ? "checked" : ""} /><span><strong>${escapeHtml(customer.name)} <em>#${customer.code}</em></strong><small>最后更新：${customer.quotes[0]?.lastQuotedAt || "-"}</small></span></label><div class="case-actions"><button class="btn btn-sm" type="button" data-quote-recalc-customer="${index}">重新计算</button><button class="btn btn-sm btn-primary" type="button" data-quote-copy-customer="${index}">复制报价</button></div></header>
      <div class="batch-quote-lines">${visibleQuotes.map(({ item, quoteIndex }) => {
        item.result = calculateQuoteItem(item).value;
        const key = batchQuoteKey(customer, quoteIndex);
        return `<div><label><input type="checkbox" data-quote-select-row="${key}" ${quoteSelectedSet().has(key) ? "checked" : ""} /><span>${escapeHtml(item.tradeType || item.prefix)}</span></label><code>${escapeHtml(renderFormulaLabel(item.formula))}</code><strong>${escapeHtml(item.result || "--")} ${escapeHtml(item.suffix || "")}</strong></div>`;
      }).join("") || `<div class="batch-empty-row">当前交易类型没有报价项</div>`}</div></article>`;
  }

  function renderQuoteHistory() {
    return renderQuoteReplica("quoteHistory");
    if (!canUseQuote()) return quotePermissionPage();
    const tab = state.quote.historyTab;
    return `<div class="page quote-page">${pageHeader("QUOTE MANAGEMENT", "往期报价", "查询平台基准价和客户历史报价，查看每笔报价的计算过程。")}
      <section class="quote-history-panel">
        <div class="quote-history-tabs"><button class="${tab === "platform" ? "active" : ""}" type="button" data-quote-history-tab="platform">平台基准价</button><button class="${tab === "customer" ? "active" : ""}" type="button" data-quote-history-tab="customer">客户报价</button></div>
        ${tab === "platform" ? renderPlatformQuoteHistory() : renderCustomerQuoteHistory()}
      </section>
      ${state.quote.historyDetail ? renderQuoteHistoryDetail() : ""}
      ${state.quote.groupModalOpen ? renderQuoteGroupModal() : ""}
      ${state.quote.addCustomerModalOpen ? renderQuoteAddCustomerModal() : ""}
    </div>`;
  }

  function renderPlatformQuoteHistory() {
    const rows = state.quote.platformHistory.filter(item => !state.quote.historyDate || item.savedAt.startsWith(state.quote.historyDate.replaceAll("-", "/")));
    return `<div class="quote-history-content"><div class="history-filter-card"><div><strong>往期报价</strong><label>报价日期：<input type="date" id="quote-history-date" value="${escapeHtml(state.quote.historyDate)}" /></label><button class="btn btn-primary" type="button" id="quote-history-search">搜索</button><button class="btn" type="button" id="quote-history-reset">重置</button></div><span>当前日期共 <b>${rows.length}</b> 次报价记录</span></div>
      <div class="platform-history-records">${rows.map(row => `<article><header><div><strong>${escapeHtml(row.savedAt)}</strong><span>操作人：${escapeHtml(row.operator)}</span></div></header><div class="quote-bench-history">${row.prices.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("")}</div></article>`).join("") || `<div class="schedule-empty-block"><strong>没有记录</strong><span>请选择 2026-08-06 或 2026-08-05 查看演示数据。</span></div>`}</div></div>`;
  }

  function renderCustomerQuoteHistory() {
    const customer = state.quote.customers.find(item => item.id === state.quote.historyCustomerId) || quoteSelectedCustomer();
    const rows = state.quote.customerHistory.filter(item => item.customerId === customer.id);
    const matches = quoteCustomerMatches(state.quote.historyCustomerQuery);
    const products = [...new Set(rows.map(row => row.product))];
    const dates = ["08-04 (二)", "08-05 (三)", "08-06 (四)", "08-07 (五)", "08-08 (六)", "08-09 (昨日)", "08-10 (今日)"];
    return `<div class="quote-history-content"><div class="history-toolbar"><div><span>搜索客户：</span><div class="quote-search-box history"><input id="quote-history-customer-search-input" value="${escapeHtml(state.quote.historyCustomerQuery)}" autocomplete="off" /><button class="icon-button" type="button" id="quote-history-customer-toggle">⌄</button>${state.quote.historyCustomerDropdownOpen ? `<div class="quote-dropdown">${matches.map(item => `<button type="button" data-quote-history-pick-customer="${item.id}"><strong>${escapeHtml(item.name)} (${item.code})</strong><span>${escapeHtml(quoteBrokerLabel(item))}</span></button>`).join("")}</div>` : ""}</div><button class="btn btn-primary" type="button" id="quote-history-customer-search">搜索</button><span>日期跨度：2026-08-04 至 2026-08-10</span></div><button class="btn btn-primary" type="button" id="quote-history-refresh">刷新数据</button></div>
      <div class="data-table-wrap"><table class="data-table quote-history-table"><thead><tr><th>交易类型</th>${dates.map(date => `<th>${date}</th>`).join("")}</tr></thead><tbody>${products.map(product => `<tr><td><strong>${escapeHtml(product)}</strong></td>${dates.map(date => {
        const day = date.slice(0, 5).replace("-", "-");
        const row = rows.find(item => item.product === product && item.date.endsWith(day));
        return `<td>${row ? `<button class="history-quote-button ${date.includes("今日") ? "highlight" : ""}" type="button" data-quote-history-detail="${row.id}">${escapeHtml(row.quote)}</button>` : "-"}</td>`;
      }).join("")}</tr>`).join("") || `<tr><td colspan="8">暂无客户报价记录</td></tr>`}</tbody></table></div></div>`;
  }

  function renderQuoteHistoryDetail() {
    const row = state.quote.customerHistory.find(item => item.id === state.quote.historyDetail);
    if (!row) return "";
    return `<div class="quote-detail-backdrop"><aside class="quote-detail-drawer"><header><div><span>QUOTE DETAIL</span><h2>${escapeHtml(row.customer)} · ${escapeHtml(row.product)}</h2><p>${escapeHtml(row.date)} · ${escapeHtml(row.operator)}</p></div><button class="icon-button" type="button" id="quote-history-close">×</button></header><div class="detail-grid">${detailField("客户编号", row.code)}${detailField("中介", row.broker || "-")}${detailField("历史报价", row.quote)}${detailField("报价公式", renderFormulaLabel(row.formula))}${detailField("公式计算", row.formulaCalc || row.formula)}${detailField("舍入模式", "四舍五入")}</div><pre class="quote-output">${escapeHtml(`${row.customer}(${row.code})：\n${row.product}: ${row.quote}\n公式：${renderFormulaLabel(row.formula)}`)}</pre></aside></div>`;
  }

  function renderQuoteVariableModal() {
    const index = state.quote.activeVariableQuoteIndex;
    const tabs = [["channel", "渠道即时汇率"], ["base", "平台基准价"], ["broker", "中介报价"], ["quoted", "已报价结果"]];
    return `<div class="quote-variable-backdrop"><section class="quote-variable-modal"><header><strong>选择公式变量</strong><button class="icon-button" type="button" id="quote-variable-close">×</button></header><div class="quote-variable-tabs">${tabs.map(([key, label]) => `<button class="${state.quote.activeVariableTab === key ? "active" : ""}" type="button" data-quote-variable-tab="${key}">${label}</button>`).join("")}</div><div class="quote-variable-list">${quoteVariableRows(state.quote.activeVariableTab).map(item => `<button type="button" data-quote-variable="${item.code}" data-quote-variable-index="${index}"><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(formatQuoteNumber(item.value, item.digits))}</strong></button>`).join("") || `<div class="quote-dropdown-empty">暂无可用变量</div>`}</div></section></div>`;
  }

  function renderQuoteGroupModal() {
    return `<div class="quote-variable-backdrop"><section class="quote-small-modal"><header><strong>新建报价组</strong><button class="icon-button" type="button" id="quote-group-modal-close">×</button></header><div class="quote-modal-body"><label class="field"><span>报价组名称</span><input id="quote-group-name-input" value="${escapeHtml(state.quote.groupNameDraft)}" placeholder="例如：VIP高频报价组、早市特惠组" /></label></div><footer><button class="btn" type="button" id="quote-group-modal-cancel">取消</button><button class="btn btn-primary" type="button" id="quote-group-modal-confirm">确定创建</button></footer></section></div>`;
  }

  function renderQuoteAddCustomerModal() {
    const group = quoteSelectedGroup();
    const selected = new Set(state.quote.pendingCustomerIds || []);
    const key = state.quote.addCustomerQuery.trim().toLowerCase();
    const candidates = state.quote.customers.filter(customer => !group.customerIds.includes(customer.id)).filter(customer => !key || `${customer.name} ${customer.code} ${customer.broker}`.toLowerCase().includes(key));
    return `<div class="quote-variable-backdrop"><section class="quote-small-modal quote-customer-modal"><header><strong>添加客户至报价组</strong><button class="icon-button" type="button" id="quote-add-customer-close">×</button></header><div class="quote-modal-body"><label class="quote-search-box standalone"><input id="quote-add-customer-query" value="${escapeHtml(state.quote.addCustomerQuery)}" placeholder="搜索客户名称、编号或中介" /></label><div class="quote-select-stats"><span>已选择 ${selected.size} 位客户</span><button class="link-button" type="button" id="quote-add-customer-select-all">全选可加客户</button></div><div class="quote-candidate-list">${candidates.map(customer => `<label><input type="checkbox" data-quote-pending-customer="${customer.id}" ${selected.has(customer.id) ? "checked" : ""} /><span><strong>${escapeHtml(customer.name)}</strong><small>#${escapeHtml(customer.code)} · ${escapeHtml(quoteBrokerLabel(customer))}</small></span></label>`).join("") || `<div class="schedule-empty-block"><strong>没有可添加客户</strong><span>当前报价组已包含匹配客户。</span></div>`}</div></div><footer><button class="btn" type="button" id="quote-add-customer-cancel">取消</button><button class="btn btn-primary" type="button" id="quote-add-customer-confirm">确定添加</button></footer></section></div>`;
  }

  function canUseQuote() {
    return ["agent", "ops"].includes(state.role);
  }

  function quotePermissionPage() {
    return `<div class="page">${pageHeader("QUOTE MANAGEMENT", "报价管理", "当前角色不能访问报价模块。")}<div class="empty-state"><div><i>锁</i><h2>无访问权限</h2><p>请切换至初级交易员或高级交易员视角使用报价模块。</p></div></div></div>`;
  }

  function quoteSelectedCustomer() {
    return state.quote.customers.find(item => item.id === state.quote.selectedCustomerId) || state.quote.customers[0];
  }

  function quoteSelectedGroup() {
    return state.quote.groups.find(item => item.id === state.quote.batchGroupId) || state.quote.groups[0];
  }

  function quoteGroupCustomers(group = quoteSelectedGroup()) {
    return group.customerIds.map(id => state.quote.customers.find(customer => customer.id === id)).filter(Boolean);
  }

  function quoteCustomerLabel(customer) {
    return `${customer.name} - ${customer.code}`;
  }

  function quoteBrokerLabel(customer) {
    return customer.broker === "-" ? "-" : `${customer.broker || "直营"}${customer.brokerCode && customer.brokerCode !== "-" ? ` - ${customer.brokerCode}` : ""}`;
  }

  function quoteSelectedSet() {
    return new Set(state.quote.batchSelectedKeys || []);
  }

  function quoteCustomerMatches(query) {
    const key = String(query || "").trim().toLowerCase();
    if (!key) return state.quote.customers;
    return state.quote.customers.filter(customer => `${customer.name} ${customer.code} ${customer.broker} ${customer.brokerCode}`.toLowerCase().includes(key)).slice(0, 20);
  }

  function quoteVariables() {
    return Object.fromEntries(quoteVariableRows("all").flatMap(row => [[row.code, row.value], [row.label, row.value]]));
  }

  function quoteVariableRows(tab = "all") {
    const customer = quoteSelectedCustomer();
    const groups = {
      base: state.quote.benchmarkPrices,
      channel: state.quote.channelRates,
      broker: [{ code: "brokerLinHkdTtCnhTt", label: "中介林 HKD-TT:CNH-TT", value: 2.654661329, digits: 9 }],
      quoted: customer.quotes.map((item, index) => ({ code: `quoteResult${index + 1}`, label: `${customer.name}${item.tradeType || item.prefix}`, value: Number(item.result) || 0, digits: Number(item.digits || 4) }))
    };
    if (tab === "all") return [...groups.base, ...groups.channel, ...groups.broker, ...groups.quoted];
    return groups[tab] || groups.channel;
  }

  function formatQuoteNumber(value, digits = 4) {
    const number = Number(value);
    if (!Number.isFinite(number)) return "--";
    return number.toFixed(Math.max(0, Math.min(9, Number(digits || 4))));
  }

  function applyQuoteRounding(value, digits, mode) {
    const safeDigits = Math.max(0, Math.min(9, Number(digits || 4)));
    const factor = 10 ** safeDigits;
    if (mode === "up") return formatQuoteNumber(Math.ceil(value * factor) / factor, safeDigits);
    if (mode === "down") return formatQuoteNumber(Math.floor(value * factor) / factor, safeDigits);
    return formatQuoteNumber(value, safeDigits);
  }

  function calculateQuoteItem(item) {
    let expr = String(item.formula || "").trim();
    const vars = quoteVariables();
    Object.keys(vars).sort((a, b) => b.length - a.length).forEach(key => {
      expr = expr.replace(new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), String(vars[key]));
    });
    expr = expr.replace(/\s+/g, "");
    if (!expr) return { ok: false, value: "--", error: "公式不能为空" };
    if (/[^0-9+\-*/().]/.test(expr)) return { ok: false, value: "--", error: "公式包含不支持的字符" };
    if (/[+\-*/.]$/.test(expr)) return { ok: false, value: "--", error: "公式末尾不能为运算符" };
    try {
      const raw = Function(`"use strict"; return (${expr});`)();
      const adjusted = Number(raw) + Number(item.brokerPoint || 0) + Number(item.bvPoint || 0);
      return Number.isFinite(adjusted) ? { ok: true, value: applyQuoteRounding(adjusted, item.digits, item.roundMode), error: "" } : { ok: false, value: "--", error: "计算结果非法" };
    } catch {
      return { ok: false, value: "--", error: "公式语法不正确" };
    }
  }

  function recalcQuoteCustomer(customer) {
    const time = new Date().toLocaleTimeString("zh-CN", { hour12: false });
    customer.quotes.forEach(item => {
      item.result = calculateQuoteItem(item).value;
      item.lastQuotedAt = time;
    });
    syncQuoteHistory(customer);
  }

  function quoteText(customer) {
    const groups = [];
    const map = new Map();
    customer.quotes.forEach((item, index) => {
      item.result = calculateQuoteItem(item).value;
      const type = item.tradeType || item.prefix || `报价项${index + 1}`;
      if (!map.has(type)) {
        const group = { type, rows: [] };
        map.set(type, group);
        groups.push(group);
      }
      map.get(type).rows.push(`${item.prefix || type}：${item.result || "--"}${item.suffix ? ` ${item.suffix}` : ""}`);
    });
    return `${customer.name}(${customer.code})：\n${groups.map(group => `${group.type}--\n${group.rows.join("\n")}`).join("\n\n")}`;
  }

  function copyQuoteText(text, message) {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => fallbackCopyQuoteText(text));
    } else {
      fallbackCopyQuoteText(text);
    }
    toast("报价文本已复制", message);
  }

  function fallbackCopyQuoteText(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    try { document.execCommand("copy"); } catch {}
    textarea.remove();
  }

  function formulaBadgeText(formula) {
    return renderFormulaLabel(formula).split(/\s+/).map(part => {
      const variable = quoteVariableRows("all").find(item => item.code === part || item.label === part);
      return variable ? `[${variable.label}]` : part;
    }).join(" ");
  }

  function renderFormulaLabel(formula) {
    let label = String(formula || "");
    quoteVariableRows("all").sort((a, b) => b.code.length - a.code.length).forEach(row => {
      label = label.replace(new RegExp(row.code.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), row.label);
    });
    return label;
  }

  function insertQuoteFormulaToken(item, index, token) {
    const formula = String(item.formula || "");
    const cursor = state.quote.formulaCursor?.index === index && Number.isFinite(state.quote.formulaCursor.position) ? state.quote.formulaCursor.position : formula.length;
    const before = formula.slice(0, cursor).trimEnd();
    const after = formula.slice(cursor).trimStart();
    const spacerBefore = before && !/[+\-*/(\s]$/.test(before) ? " " : "";
    const spacerAfter = after && !/^[+\-*/)\s]/.test(after) ? " " : "";
    item.formula = `${before}${spacerBefore}${token}${spacerAfter}${after}`.trim();
    state.quote.formulaCursor = { index, position: `${before}${spacerBefore}${token}`.length };
    item.result = calculateQuoteItem(item).value;
  }

  function batchCustomerMatchesFilter(customer) {
    const key = state.quote.batchCustomerFilter.trim().toLowerCase();
    if (!key) return true;
    return `${customer.name} ${customer.code} ${customer.broker}`.toLowerCase().includes(key);
  }

  function batchQuoteMatchesType(item) {
    return !state.quote.batchTypeFilter || (item.tradeType || item.prefix || "其他") === state.quote.batchTypeFilter;
  }

  function batchQuoteKey(customer, quoteIndex) {
    return `${customer.id}:${quoteIndex}`;
  }

  function visibleBatchQuoteKeys() {
    return quoteVisibleBatchCustomers().flatMap(customer => customer.quotes.map((item, index) => ({ customer, item, index })).filter(({ item }) => batchQuoteMatchesType(item)).map(({ customer, index }) => batchQuoteKey(customer, index)));
  }

  function quoteVisibleBatchCustomers() {
    return quoteGroupCustomers().filter(batchCustomerMatchesFilter);
  }

  function syncQuoteHistory(customer) {
    const today = "2026-08-10";
    customer.quotes.forEach((item, index) => {
      const id = `LIVE-${customer.code}-${index}`;
      const next = { id, customerId: customer.id, customer: customer.name, code: customer.code, broker: quoteBrokerLabel(customer), product: item.tradeType || item.prefix, date: today, quote: item.result || "--", formula: item.formula, formulaCalc: renderFormulaLabel(item.formula), operator: roles[state.role].name };
      const rowIndex = state.quote.customerHistory.findIndex(row => row.id === id);
      if (rowIndex >= 0) state.quote.customerHistory[rowIndex] = next;
      else state.quote.customerHistory.push(next);
    });
  }

  function customerRow(c) {
    const isIntermediary = customerKind(c) === "中介";
    const expanded = state.expandedIntermediaries.includes(c.id);
    return `<tr tabindex="0" data-open-customer="${c.id}"><td><div class="cell-primary">${isIntermediary ? `<button class="row-expander ${expanded ? "expanded" : ""}" type="button" data-toggle-intermediary="${c.id}" aria-label="${expanded ? "收起" : "展开"}${escapeHtml(c.name)}下级客户"></button>` : `<span class="row-expander-placeholder"></span>`}<span class="avatar ${isIntermediary ? "company" : ""}">${customerInitials(c)}</span><span><strong>${escapeHtml(c.name)}</strong><small>${customerNo(c)}</small></span></div></td><td>${customerKind(c)}<div class="muted">${escapeHtml(c.region || "未填写地区")}</div></td><td><span class="status status-${statusTone(c.status)}">${c.status}</span></td><td><span class="risk ${riskClass(c.risk)}">${c.risk}风险</span></td><td>${c.owner}</td><td class="muted">${c.updated}</td><td><button class="btn btn-sm" type="button" data-edit-customer-info="${c.id}">编辑信息</button></td></tr>`;
  }

  function subCustomerRow(parent, child, index) {
    const typeLabel = child.type ? (child.type === "个人" ? "个人 individual" : child.type === "企业" ? "企业 operation" : child.type) : "";
    const childKey = encodeURIComponent(child.id || child.clientNo || child.name || String(index));
    return `<tr class="sub-customer-row" tabindex="0" data-open-sub-customer="${parent.id}::${childKey}"><td><div class="cell-primary sub-customer-cell"><span class="sub-customer-connector"></span><span class="avatar sub">${escapeHtml(child.name.slice(-1))}</span><span><strong>${escapeHtml(child.name)}</strong><small>${child.clientNo ? escapeHtml(child.clientNo) : "无编号"}</small></span></div></td><td>中介下级${typeLabel ? `<div class="muted" style="color:var(--orange-700);font-weight:600">${typeLabel}</div>` : ""}<div class="muted">${escapeHtml(child.region || parent.region)}</div></td><td><span class="status status-${statusTone(child.status)}">${escapeHtml(child.status)}</span></td><td><span class="risk low">未评估</span></td><td>${escapeHtml(parent.owner)}</td><td class="muted">${escapeHtml(child.updated || "刚刚同步")}</td><td><button class="btn btn-sm" type="button" data-edit-sub-customer="${parent.id}::${childKey}">编辑信息</button></td></tr>`;
  }

  function getMatchingBrokers(state, query) {
    const brokers = state.customers.filter(c => (c.customerKind === "中介" || customerKind(c) === "中介"));
    if (!query || !query.trim()) return brokers;
    const q = query.trim().toLowerCase();
    return brokers.filter(b => 
      b.name.toLowerCase().includes(q) || 
      (b.enName && b.enName.toLowerCase().includes(q)) || 
      customerNo(b).toLowerCase().includes(q) ||
      (b.id && b.id.toLowerCase().includes(q))
    );
  }

  function renderBrokerDropdown(draft) {
    const matching = getMatchingBrokers(state, draft.parentSearchText || "");
    if (!matching.length) {
      return `<div class="broker-dropdown shadow-float"><div class="broker-dropdown-empty">未找到匹配的中介（可输入中介名称或编号搜索）</div></div>`;
    }
    return `<div class="broker-dropdown shadow-float" id="broker-dropdown-menu">
      ${matching.map((b, idx) => {
        const isHighlighted = idx === (draft.parentHighlightIndex || 0);
        const isSelected = b.id === draft.parentId;
        return `<div class="broker-option ${isHighlighted ? "highlighted" : ""} ${isSelected ? "selected" : ""}" data-broker-id="${b.id}" data-broker-index="${idx}">
          <div class="broker-option-header">
            <strong>${escapeHtml(b.name)}</strong>
            <span class="broker-code">${customerNo(b)}</span>
          </div>
          <div class="broker-option-meta">地区: ${escapeHtml(b.region)} · 交易员: ${escapeHtml(b.agent)}</div>
        </div>`;
      }).join("")}
    </div>`;
  }

  function renderCustomerMasterModal() {
    const root = $("#customer-modal-root");
    if (!root) return;
    if (state.customerModal) {
      const draft = state.customerModal.draft;
      const needsNumber = draft.customerKind !== "中介下级客户" || draft.generateClientNo;
      const customerKindOptions = `<div class="field full"><label>STEP 01 客户类型 <span>*</span></label><div class="type-options customer-kind-options"><label class="type-option"><input type="radio" name="customerKind" value="直客" ${draft.customerKind === "直客" ? "checked" : ""} /><strong>直客</strong><span>客户本人直接交易</span></label><label class="type-option"><input type="radio" name="customerKind" value="中介" ${draft.customerKind === "中介" ? "checked" : ""} /><strong>中介</strong><span>可挂载下级客户</span></label><label class="type-option"><input type="radio" name="customerKind" value="中介下级客户" ${draft.customerKind === "中介下级客户" ? "checked" : ""} /><strong>中介下级客户</strong><span>可选择是否生成编号</span></label></div></div>`;
      const numberField = `<div class="field customer-number-field">
        <div class="field-label-row">
          <label for="modal-client-no">${draft.customerKind === "中介下级客户" ? "下级客户编号" : "客户编号"} ${needsNumber ? "<span>*</span>" : ""}</label>
          ${draft.customerKind === "中介下级客户" ? `<label class="number-generate-check"><input type="checkbox" id="modal-generate-number" name="generateClientNo" ${draft.generateClientNo ? "checked" : ""} /><span>生成编号</span></label>` : ""}
        </div>
        <input id="modal-client-no" name="clientNo" value="${escapeHtml(draft.clientNo)}" inputmode="numeric" pattern="[0-9]{5}" ${needsNumber ? "required" : "disabled"} />
        <span class="field-hint">${needsNumber ? "系统已分配，可修改为 20001-29999 内未占用编号。" : "该下级客户将以无编号状态创建。"}</span>
      </div>`;
      const nameField = `<div class="field"><label for="modal-client-name">客户名称 <span>*</span></label><input id="modal-client-name" name="name" value="${escapeHtml(draft.name)}" required placeholder="${draft.customerKind === "中介下级客户" ? "输入中介下级客户名称" : draft.customerKind === "中介" ? "输入中介名称" : "输入客户名称"}" /></div>`;
      const agentOptions = `${["杨澜", "周辰", "陈浩"].map(v => `<option ${draft.agent === v ? "selected" : ""}>${v}</option>`).join("")}`;
      const regularFields = `
        ${numberField}
        ${nameField}
        <div class="field"><label for="modal-client-phone">联系电话</label><input id="modal-client-phone" name="phone" value="${escapeHtml(draft.phone)}" placeholder="输入联系电话（可选）" /></div>
        <div class="field"><label for="modal-follow-trader">跟进交易员</label><input id="modal-follow-trader" name="followTrader" value="${escapeHtml(draft.followTrader || "")}" placeholder="输入跟进交易员" /></div>
        <div class="field"><label for="modal-client-region">地区</label><select id="modal-client-region" name="region"><option value="">不填写</option>${["中国香港", "中国大陆", "新加坡", "其他"].map(v => `<option ${draft.region === v ? "selected" : ""}>${v}</option>`).join("")}</select></div>
        <div class="field"><label for="modal-client-agent">所属交易员</label><select id="modal-client-agent" name="agent"><option value="">不指定</option>${agentOptions}</select><span class="field-hint">可稍后在客户主档中分配。</span></div>
        <div class="field full"><label for="modal-client-remark">备注</label><textarea id="modal-client-remark" name="remark" placeholder="可记录来源、关系、注意事项或内部说明">${escapeHtml(draft.remark)}</textarea></div>`;
      const subCustomerFields = `
        <div class="field full broker-select-field">
          <label for="modal-broker-search">所属中介 <span>*</span></label>
          <div class="broker-combobox">
            <div class="broker-search-input-wrap">
              <input 
                id="modal-broker-search" 
                value="${escapeHtml(draft.parentSearchText || "")}" 
                placeholder="输入中介编号或中介名称搜索（如 20002 或 Northstar）" 
                autocomplete="off" 
              />
              ${draft.parentId ? `<button type="button" id="modal-broker-clear" class="broker-clear-btn" title="清除已选">×</button>` : `<span class="broker-search-icon">⌕</span>`}
            </div>
            ${draft.parentDropdownOpen ? renderBrokerDropdown(draft) : ""}
          </div>
          <span class="field-hint">新建的中介下级商户将归属于选中的中介。</span>
        </div>
        ${numberField.replace('class="field customer-number-field"', 'class="field full customer-number-field"')}
        ${nameField.replace('class="field"', 'class="field full"')}
        <div class="field">
          <label for="modal-sub-type">下级主体类型（可选）</label>
          <select id="modal-sub-type" name="subType">
            <option value="" ${!draft.subType ? "selected" : ""}>不定义</option>
            <option value="个人" ${draft.subType === "个人" ? "selected" : ""}>个人 individual</option>
            <option value="企业" ${draft.subType === "企业" ? "selected" : ""}>企业 operation</option>
          </select>
        </div>
        <div class="field"><label for="modal-client-phone">联系电话</label><input id="modal-client-phone" name="phone" value="${escapeHtml(draft.phone)}" placeholder="输入联系电话（可选）" /></div>
        <div class="field"><label for="modal-follow-trader">跟进交易员</label><input id="modal-follow-trader" name="followTrader" value="${escapeHtml(draft.followTrader || "")}" placeholder="输入跟进交易员" /></div>
        <div class="field"><label for="modal-client-region">地区</label><select id="modal-client-region" name="region"><option value="">不填写</option>${["中国香港", "中国大陆", "新加坡", "其他"].map(v => `<option ${draft.region === v ? "selected" : ""}>${v}</option>`).join("")}</select></div>
        <div class="field"><label for="modal-client-agent">所属交易员</label><select id="modal-client-agent" name="agent"><option value="">不指定</option>${agentOptions}</select><span class="field-hint">可稍后在客户主档中分配。</span></div>
        <div class="field full"><label for="modal-client-remark">备注</label><textarea id="modal-client-remark" name="remark" placeholder="可记录来源、关系、注意事项或内部说明">${escapeHtml(draft.remark)}</textarea></div>`;
      root.innerHTML = `<div class="review-launch-backdrop"><section class="customer-master-dialog" role="dialog" aria-modal="true" aria-labelledby="customer-modal-title">
        <header><div><span>NEW CUSTOMER</span><h2 id="customer-modal-title">新建客户</h2><p>先选择客户类型，再确认是否使用系统分配编号。</p></div><button class="icon-button" id="customer-modal-close" aria-label="关闭" type="button">×</button></header>
        <form id="customer-modal-form" class="customer-modal-form">
          <div class="field-grid customer-create-grid ${draft.customerKind === "中介下级客户" ? "sub-customer-create-grid" : ""}">
            ${customerKindOptions}
            ${draft.customerKind === "中介下级客户" ? subCustomerFields : regularFields}
          </div>
          ${state.customerModal.error ? `<div class="form-error">${escapeHtml(state.customerModal.error)}</div>` : ""}
          <div class="form-actions"><button class="btn" type="button" id="customer-modal-cancel">取消</button><button class="btn btn-primary" type="submit">建立客户</button></div>
        </form>
      </section></div>`;
      document.body.classList.add("modal-open");
      return;
    }
    if (state.numberEdit) {
      const edit = state.numberEdit;
      const source = edit.mode === "sub" ? findSubCustomerByRef(edit.ref) : { parent: null, child: state.customers.find(item => item.id === edit.customerId) };
      const editKind = edit.customerKind || (source.child ? customerKind(source.child) : "直客");
      const typeSummary = `<div class="field full customer-kind-summary"><label>STEP 01 客户类型</label><div><strong>${escapeHtml(editKind)}</strong><span>${editKind === "中介下级客户" ? `归属于 ${escapeHtml(edit.parentName || source.parent?.name || "指定中介")}` : editKind === "中介" ? "可挂载下级客户" : "客户本人直接交易"}</span></div></div>`;
      const subTypeField = edit.mode === "sub" ? `<div class="field"><label for="customer-edit-sub-type">下级主体类型（可选）</label><select id="customer-edit-sub-type" name="subType"><option value="" ${!edit.subType ? "selected" : ""}>不定义</option><option value="个人" ${edit.subType === "个人" ? "selected" : ""}>个人 individual</option><option value="企业" ${edit.subType === "企业" ? "selected" : ""}>企业 operation</option></select></div>` : "";
      root.innerHTML = source.child ? `<div class="review-launch-backdrop"><section class="customer-number-dialog" role="dialog" aria-modal="true" aria-labelledby="number-modal-title">
        <header><div><span>CLIENT PROFILE</span><h2 id="number-modal-title">编辑客户信息</h2><p>${escapeHtml(edit.name)} · ${escapeHtml(editKind)} · 当前编号 ${escapeHtml(edit.clientNo || "无编号")}</p></div><button class="icon-button" id="number-modal-close" aria-label="关闭" type="button">×</button></header>
        <form id="number-edit-form" class="customer-modal-form">
          <div class="field-grid customer-create-grid">
            ${typeSummary}
            <div class="field customer-number-field"><label for="number-edit-input">${edit.mode === "sub" ? "下级客户编号" : "客户编号"} ${edit.mode === "sub" ? "" : "<span>*</span>"}</label><input id="number-edit-input" name="clientNo" value="${escapeHtml(edit.clientNo)}" inputmode="numeric" pattern="[0-9]{5}" ${edit.mode === "sub" ? "" : "required"} /><span class="field-hint">${edit.mode === "sub" ? "可留空；如填写，仅允许 20001-29999 且不能重复。" : "仅允许 20001-29999，且不能与现有客户或中介下级客户重复。"}</span></div>
            <div class="field"><label for="customer-edit-name">客户名称 <span>*</span></label><input id="customer-edit-name" name="name" value="${escapeHtml(edit.name)}" required placeholder="输入客户名称" /></div>
            ${subTypeField}
            <div class="field"><label for="customer-edit-phone">联系电话</label><input id="customer-edit-phone" name="phone" value="${escapeHtml(edit.phone)}" placeholder="输入联系电话（可选）" /></div>
            <div class="field"><label for="customer-edit-follow-trader">跟进交易员</label><input id="customer-edit-follow-trader" name="followTrader" value="${escapeHtml(edit.followTrader || "")}" placeholder="输入跟进交易员" /></div>
            <div class="field"><label for="customer-edit-region">地区</label><select id="customer-edit-region" name="region"><option value="">不填写</option>${["中国香港", "中国大陆", "新加坡", "其他"].map(v => `<option ${edit.region === v ? "selected" : ""}>${v}</option>`).join("")}</select></div>
            <div class="field"><label for="customer-edit-agent">所属交易员</label><select id="customer-edit-agent" name="agent"><option value="">不指定</option>${["杨澜", "周辰", "陈浩"].map(v => `<option ${edit.agent === v ? "selected" : ""}>${v}</option>`).join("")}</select><span class="field-hint">可稍后在客户主档中分配。</span></div>
            <div class="field full"><label for="customer-edit-remark">备注</label><textarea id="customer-edit-remark" name="remark" placeholder="可记录来源、关系、注意事项或内部说明">${escapeHtml(edit.remark)}</textarea></div>
          </div>
          ${edit.error ? `<div class="form-error">${escapeHtml(edit.error)}</div>` : ""}
          <div class="form-actions"><button class="btn" type="button" id="number-modal-cancel">取消</button><button class="btn btn-primary" type="submit">保存信息</button></div>
        </form>
      </section></div>` : "";
      document.body.classList.add("modal-open");
      return;
    }
    const hadCustomerModal = root.innerHTML.trim();
    root.innerHTML = "";
    if (hadCustomerModal && !$("#pdf-modal-root")?.innerHTML && !$("#material-order-modal-root")?.innerHTML) document.body.classList.remove("modal-open");
  }

  function renderCreate() {
    const step = state.createStep;
    const stepLabels = ["基本信息", "业务与材料", "确认提交"];
    return `<div class="page">${pageHeader("CLIENT ONBOARDING", "创建客户", "建立个人 KYC 或企业 KYB 申请。这里输入的内容仅用于当前浏览器演示。")}
      <div class="form-layout"><section class="form-panel"><div class="form-stepper">${stepLabels.map((label, index) => `${index ? "<span></span>" : ""}<div class="form-step ${step === index + 1 ? "active" : step > index + 1 ? "done" : ""}"><i>${step > index + 1 ? "✓" : index + 1}</i><span>${label}</span></div>`).join("")}</div>${renderCreateStep(step)}</section>
      <aside class="form-aside section"><div class="section-header"><div><h2>提交前检查</h2><p>系统将执行以下步骤</p></div></div><div class="checklist">${["按证件号和脱敏信息检查重复客户", "模拟 OCR 提取证件关键字段", "按客户类型生成材料清单", "提交后写入业务时间线", "关键风险仍由合规人工确认"].map(item => `<div class="checklist-row"><i>✓</i><span>${item}</span></div>`).join("")}</div></aside></div></div>`;
  }

  function renderCreateStep(step) {
    const draft = state.draftCustomer;
    if (step === 1) return `<div class="form-section-title"><h2>客户基本信息</h2><p>先确认客户类型，再填写法定名称和身份信息。</p></div><form id="create-form-step"><div class="field full"><label>客户类型</label><div class="type-options"><label class="type-option"><input type="radio" name="clientType" value="个人" ${draft.type === "个人" ? "checked" : ""} /><strong>个人客户</strong><span>KYC，身份证明与地址证明</span></label><label class="type-option"><input type="radio" name="clientType" value="企业" ${draft.type === "企业" ? "checked" : ""} /><strong>企业客户</strong><span>KYB，公司、董事与 UBO 材料</span></label></div></div><div class="field-grid" style="margin-top:16px"><div class="field"><label for="client-name">中文 / 法定名称 <span>*</span></label><input id="client-name" name="name" value="${escapeHtml(draft.name)}" required placeholder="例如：陈嘉宁" /></div><div class="field"><label for="client-en-name">英文名称 <span>*</span></label><input id="client-en-name" name="enName" value="${escapeHtml(draft.enName)}" required placeholder="与证件一致" /></div><div class="field"><label for="client-region">注册 / 居住地区</label><select id="client-region" name="region">${["中国香港", "中国大陆", "新加坡", "其他"].map(v => `<option ${draft.region === v ? "selected" : ""}>${v}</option>`).join("")}</select></div><div class="field"><label for="client-agent">所属 交易员</label><select id="client-agent" name="agent"><option ${draft.agent === "杨澜" ? "selected" : ""}>杨澜 · A-018</option><option ${draft.agent === "周辰" ? "selected" : ""}>周辰 · A-006</option></select></div></div><div class="form-actions"><button class="btn" type="button" data-view="customers">取消</button><button class="btn btn-primary" type="submit">下一步：业务与材料 →</button></div></form>`;
    if (step === 2) return `<div class="form-section-title"><h2>业务关系与材料</h2><p>选择业务类型，文件仅模拟选择，不会读取或上传。</p></div><form id="create-form-step"><div class="field-grid"><div class="field"><label for="business-type">业务类型</label><select id="business-type" name="business"><option ${draft.business === "SINO" ? "selected" : ""}>SINO</option><option ${draft.business === "SGB" ? "selected" : ""}>SGB</option></select></div><div class="field"><label for="relation-type">客户关系</label><select id="relation-type" name="relation">${["新客户", "已有客户追加业务", "关联客户"].map(v => `<option ${draft.relation === v ? "selected" : ""}>${v}</option>`).join("")}</select></div><div class="field full"><label for="demo-file">身份证明 / 公司注册文件</label><input id="demo-file" type="file" /><span class="field-hint">可直接继续，系统会使用演示材料；选择文件也不会读取其内容。</span></div><div class="field full"><label for="demo-statement">银行流水</label><input id="demo-statement" type="file" /><span class="field-hint">如选择“免流水”，正式系统应记录原因并要求授权审批。</span></div></div><div class="form-actions"><button class="btn" type="button" id="create-back">← 上一步</button><button class="btn btn-primary" type="submit">下一步：确认提交 →</button></div></form>`;
    return `<div class="form-section-title"><h2>确认并建立客户草稿</h2><p>提交后会建立一条独立客户记录，后续仍需完成 OCR 和运营预审。</p></div><div class="detail-grid"><div class="detail-field"><span>客户名称</span><strong>${escapeHtml(draft.name)}</strong></div><div class="detail-field"><span>客户类型</span><strong>${draft.type} ${draft.type === "企业" ? "KYB" : "KYC"}</strong></div><div class="detail-field"><span>业务类型</span><strong>${draft.business}</strong></div><div class="detail-field"><span>客户关系</span><strong>${draft.relation}</strong></div><div class="detail-field"><span>所属 交易员</span><strong>${draft.agent}</strong></div><div class="detail-field"><span>初始状态</span><strong>未准入</strong></div></div><div class="assumption" style="margin-top:17px"><strong>隐私与授权确认</strong><p>提交即表示演示用户已获得客户授权。生产系统必须记录真实授权文本、版本、时间和渠道。</p></div><div class="form-actions"><button class="btn" type="button" id="create-back">← 上一步</button><button class="btn btn-primary" type="button" id="create-submit">建立客户草稿 →</button></div>`;
  }

  function renderCases() {
    if (state.role === "compliance") return renderComplianceQueue();
    if (state.role === "payout") return renderPayoutOperations();
    const statuses = opsStatuses;
    const visible = state.cases.filter(item => item.status === state.caseStatus);
    const selected = visible.find(item => item.id === state.selectedCase) || visible[0];
    if (selected) state.selectedCase = selected.id;
    const title = "处理队列";
    const subtitle = "按当前业务状态处理材料、合规退回、银行结果和交易进度。";
    return `<div class="page">${pageHeader("OPERATIONS QUEUE", title, subtitle, `<button class="btn">导出当前队列</button>`)}
      <div class="queue-tabs" role="tablist" aria-label="运营案件状态">${statuses.map(status => { const count = state.cases.filter(item => item.status === status).length; return `<button class="queue-tab ${state.caseStatus === status ? "active" : ""}" type="button" data-case-status="${status}" role="tab" aria-selected="${state.caseStatus === status}"><span>${status}</span><b>${count}</b></button>`; }).join("")}</div>
      <div class="toolbar queue-toolbar"><label class="search-control">⌕<input placeholder="搜索案件编号、客户或 交易员" /></label><select class="select-control"><option>全部 交易员</option><option>杨澜</option><option>周辰</option><option>陈浩</option></select><select class="select-control"><option>全部风险</option><option>高风险</option><option>中风险</option><option>低风险</option></select><span class="toolbar-count">${visible.length} 个案件</span></div>
      <div class="case-workbench"><section class="case-list" aria-label="案件列表">${visible.length ? visible.map(item => caseQueueRow(item, selected?.id)).join("") : `<div class="empty-state"><div><i>✓</i><h2>当前队列为空</h2><p>切换其他状态查看待处理案件。</p></div></div>`}</section>${selected ? renderCaseWorkspace(selected) : ""}</div></div>`;
  }

  function caseQueueRow(item, selectedId) {
    return `<button class="case-queue-row ${item.id === selectedId ? "active" : ""}" type="button" data-select-case="${item.id}"><span class="case-row-top"><strong>${item.customer}</strong><time>${item.sla}</time></span><span class="case-row-id">${item.id} · ${item.type}</span><span class="case-row-meta"><span class="risk ${riskClass(item.risk)}">${item.risk}风险</span><span>交易员 ${item.agent}</span><span>负责人 ${item.owner}</span></span><span class="case-row-next">下一步：${item.next}</span></button>`;
  }

  function renderCaseWorkspace(item) {
    const customer = state.customers.find(c => c.id === item.customerId);
    if (item.status === "待运营审核" && ["ops", "payout"].includes(state.role)) return renderOpsReviewWorkspace(item, customer);
    return `<section class="case-workspace"><header class="case-workspace-head"><div><p class="eyebrow">${item.id}</p><h2>${item.customer} <span class="status status-${statusTone(item.status)}">${item.status}</span></h2><p>${item.type} · 来源 ${item.source} · 进入状态 ${item.entered}</p></div><button class="btn btn-sm" data-open-customer="${item.customerId}">客户档案</button></header>
      <div class="case-summary-strip">${caseFact("当前责任人", item.owner)}${caseFact("SLA / 等待", item.sla)}${caseFact("材料完整度", item.completeness)}${caseFact("风险等级", `${item.risk}风险`)}</div>
      <div class="case-next"><div><span>当前应处理</span><strong>${item.next}</strong><p>${item.note}</p></div>${renderCaseActions(item)}</div>
      <div class="workspace-grid"><section><h3>处理依据</h3><dl class="case-details"><div><dt>上一步</dt><dd>${item.previous}</dd></div><div><dt>银行参考号</dt><dd>${item.bankRef}</dd></div><div><dt>当前结果</dt><dd>${item.result}</dd></div><div><dt>所属 交易员</dt><dd>${item.agent}</dd></div>${item.terminationType ? `<div><dt>终止类型</dt><dd>${item.terminationType}</dd></div><div><dt>终止原因</dt><dd>${item.terminationReason}</dd></div>` : ""}</dl></section>
      <section><h3>${casePanelTitle(item.status)}</h3>${renderCasePanel(item, customer)}</section></div>
      <footer class="workspace-audit"><span>最近操作：${item.previous}</span><span>${item.entered} · ${item.owner}</span></footer></section>`;
  }

  function renderOpsReviewWorkspace(item, customer) {
    const draft = ensureCaseReviewDraft(item, customer);
    const materials = listCaseMaterials(customer);
    const rejectedCount = draft.materials.filter(material => material.decision === "待补件").length;
    const pendingCount = draft.materials.filter(material => material.decision === "待审核").length;
    const selectedChecklist = new Set(draft.selectedSupplementIds || []);
    const primaryAction = rejectedCount ? "标记待补充材料" : "提交至合规";
    return `<section class="case-workspace"><header class="case-workspace-head"><div><p class="eyebrow">${item.id}</p><h2>${item.customer} <span class="status status-${statusTone(item.status)}">${item.status}</span></h2><p>${item.type} · 来源 ${item.source} · 进入状态 ${item.entered}</p></div><button class="btn btn-sm" data-open-customer="${item.customerId}">客户档案</button></header>
      <div class="case-summary-strip">${caseFact("所属 交易员", item.agent)}${caseFact("SLA / 等待", item.sla)}${caseFact("材料完整度", item.completeness)}${caseFact("风险等级", `${item.risk}风险`)}</div>
      <div class="case-task-bar"><div><span>审核任务摘要</span><strong>${item.next}</strong><p>${item.note}</p></div><div class="case-task-meta"><b>${rejectedCount} 项待补件</b><small>${pendingCount} 项待确认</small></div></div>
      <section class="ops-review-stack">
        <section class="ops-review-panel">
          <div class="workspace-section-head split"><div><h3>客户已提交材料及判定</h3><p>请检查原始文件并给出单项结论。</p></div><span class="section-hint">请检查原始文件并给出单项结论</span></div>
          <div class="review-material-list material-library decision-library">${materials.map((material, index) => `<article class="review-material-row decision-row"><div><span class="doc-icon">PDF</span><span><strong>${material.category}</strong><small>${escapeHtml(material.name || material.filename || "已上传材料")}${material.versions?.length ? ` · ${material.versions.at(-1).version}` : ""}</small></span></div><div class="decision-row-actions">${material.url ? `<button class="btn btn-sm" type="button" data-pdf-preview="${material.url}" data-pdf-name="${escapeHtml(material.name || material.filename || material.category)}">预览</button>` : `<button class="btn btn-sm" disabled>预览</button>`}<select class="decision-select ${draft.materials[index]?.decision === "通过" ? "success" : draft.materials[index]?.decision === "待补件" ? "warning" : "pending"}" data-review-field="decision" data-review-case="${item.id}" data-review-index="${index}"><option value="通过" ${draft.materials[index]?.decision === "通过" ? "selected" : ""}>通过 (√)</option><option value="待审核" ${draft.materials[index]?.decision === "待审核" ? "selected" : ""}>待审核 (?)</option><option value="待补件" ${draft.materials[index]?.decision === "待补件" ? "selected" : ""}>待补件</option></select></div></article>`).join("")}</div>
        </section>
        <section class="ops-review-panel">
          <div class="workspace-section-head"><div><h3>缺件精细化处理</h3><p>勾选缺失材料项，上方选择“待补件”时将智能自动勾选。</p></div></div>
          <div class="supplement-grid">${supplementChecklist.map(option => `<label class="supplement-item"><input type="checkbox" data-supplement-item="${option.id}" data-supplement-case="${item.id}" ${selectedChecklist.has(option.id) ? "checked" : ""} /><span>${option.label}</span></label>`).join("")}</div>
          <div class="generated-notice-head"><span>自动生成的客户补件通知文本：</span><button class="link-button" type="button" data-copy-notice="${item.id}">复制通知文本</button></div>
          <label class="notice-editor"><textarea data-review-output="notificationText" data-review-case="${item.id}">${escapeHtml(draft.notificationText)}</textarea></label>
        </section>
      </section>
      <section class="ops-review-output">
        <div class="workspace-section-head"><h3>最终审核结论与流转</h3><p>确认审核结论、补件原因和内部备注。</p></div>
        <div class="field-grid">
          <label class="field"><span>审核结论</span><select data-review-output="overallDecision" data-review-case="${item.id}"><option value="待定" ${draft.overallDecision === "待定" ? "selected" : ""}>待定 (待运营判断)</option><option value="待补件" ${draft.overallDecision === "待补件" || draft.overallDecision === "补件" ? "selected" : ""}>待补件</option><option value="提交合规" ${draft.overallDecision === "提交合规" ? "selected" : ""}>提交合规</option><option value="终止" ${draft.overallDecision === "终止" ? "selected" : ""}>直接终止</option></select></label>
          <label class="field"><span>后续动作</span><input data-review-output="followupAction" data-review-case="${item.id}" value="${escapeHtml(draft.followupAction)}" placeholder="待运营判断" /></label>
          <label class="field full"><span>补件 / 审核原因</span><input data-review-output="supplementReason" data-review-case="${item.id}" value="${escapeHtml(draft.supplementReason)}" placeholder="申请表已签署，银行月结单文件名与材料项不一致。" /></label>
          <label class="field full"><span>内部审核备注（仅运营和合规可见）</span><textarea data-review-output="internalNote" data-review-case="${item.id}" placeholder="填写内部备注...">${escapeHtml(draft.internalNote)}</textarea></label>
        </div>
        <div class="ops-review-footer"><button class="btn ${rejectedCount ? "btn-primary" : ""}" data-case-action="supplement" data-case-id="${item.id}">标记待补充材料</button><button class="btn btn-primary" data-case-action="compliance" data-case-id="${item.id}">${primaryAction === "提交至合规" ? "提交至合规" : "提交至合规"}</button></div>
      </section>
      <footer class="workspace-audit"><span>最近操作：${item.previous}</span><span>${item.entered} · ${item.owner}</span></footer></section>`;
  }

  function caseFact(label, value) { return `<div><span>${label}</span><strong>${value}</strong></div>`; }

  function casePanelTitle(status) {
    if (status === "待运营审核") return "材料检查与补件通知";
    if (status === "待客户补件") return "补件跟进";
    if (status === "合规驳回") return "交易员 通知";
    if (status === "待提交银行") return "银行提交信息";
    if (status === "银行审核中") return "银行结果录入";
    if (status === "已终止") return "终止记录";
    return "业务处理信息";
  }

  function renderCasePanel(item, customer) {
    if ((item.status === "待运营审核" || item.status === "待合规审核") && customer?.materialSubmission) return renderSubmissionReview(customer.materialSubmission, state.role);
    if (item.status === "待运营审核") return `<div class="document-checks">${(customer?.documents || []).map((doc, index) => `<label><input type="checkbox" ${index === 1 ? "checked" : ""} /> <span><strong>${doc.name}</strong><small>${doc.meta}</small></span><span class="status status-${statusTone(doc.state)}">${doc.state}</span></label>`).join("")}</div><div class="notice-preview"><span>补件通知预览</span><p>请重新提交完整的地址证明第二页，并确保签发机构、日期和姓名清晰可见。收到后我们将继续审核。</p></div>`;
    if (item.status === "待客户补件") return `<div class="notice-preview"><span>最近通知</span><p>需补充 UBO 名单最后一页签署版。已于今天 08:46 通知 交易员 杨澜。</p></div><label class="field"><span>跟进记录</span><textarea placeholder="记录电话、邮件或消息跟进结果"></textarea></label>`;
    if (item.status === "合规驳回") return `<div class="notice-preview"><span>通知 交易员</span><p>案件 ${item.id} 被合规退回：${item.note} 请补充说明及支持材料后重新提交。</p></div><p class="field-hint">文本由系统根据驳回原因生成，发送前必须由运营确认。</p>`;
    if (item.status === "待提交银行") return `<div class="field-grid compact-fields"><label class="field"><span>提交银行</span><select><option>HSBC APP</option><option>BOC Online</option></select></label><label class="field"><span>提交批次</span><input value="B-0710-03" /></label><label class="field"><span>外部参考号</span><input value="BK-20260710-018" /></label><label class="field"><span>提交日期</span><input type="date" value="2026-07-10" /></label></div>`;
    if (item.status === "银行审核中") return `<div class="field-grid compact-fields"><label class="field"><span>审核结果</span><select><option>通过</option><option>拒绝</option></select></label><label class="field"><span>结果日期</span><input type="date" value="2026-07-10" /></label><label class="field full"><span>结果说明</span><textarea>银行确认申请通过，可进入交易准备。</textarea></label></div>`;
    if (item.status === "已终止") return `<div class="termination-record"><span class="status status-danger">${item.terminationType}</span><h3>${item.terminationReason}</h3><p>${item.note}</p><small>终止记录只读，如需重启业务必须创建新案件。</small></div>`;
    return `<div class="notice-preview"><span>关联业务</span><p>${item.note}</p></div>`;
  }

  function renderSubmissionReview(submission, role) {
    const decisionKey = role === "compliance" ? "complianceDecision" : "opsDecision";
    const pdfRows = [submission.applicationPdf && { category: "未签署申请表", ...submission.applicationPdf }, submission.signedPdf && { category: "客户签署申请表", ...submission.signedPdf }].filter(Boolean);
    const rows = [...submission.items, ...pdfRows].map((item, index) => `<article class="review-material-row"><div><span class="doc-icon">PDF</span><span><strong>${item.category}</strong><small>${escapeHtml(item.name || item.filename)}${item.versions?.length ? ` · ${item.versions.at(-1).version}` : ""}</small></span></div><span class="status status-${statusTone(item[decisionKey] || "待审核")}">${item[decisionKey] || "待审核"}</span><div class="case-actions">${item.url ? `<button class="btn btn-sm" type="button" data-pdf-preview="${item.url}" data-pdf-name="${escapeHtml(item.name || item.filename)}">预览</button><a class="btn btn-sm" href="${item.url}" download="${escapeHtml(item.name || item.filename)}">下载</a>` : ""}${index < submission.items.length ? `<button class="btn btn-sm" data-review-material="${index}" data-review-role="${role}" data-review-decision="退回">退回</button><button class="btn btn-sm btn-primary" data-review-material="${index}" data-review-role="${role}" data-review-decision="通过">通过</button>` : ""}</div></article>`).join("");
    const pathLabel = submission.generationPath === "none" ? "仅材料送审" : submission.generationPath === "ocr" ? "OCR 生成" : submission.generationPath === "quick-upload" ? "快速上传" : "手工填写生成";
    return `<div class="submission-review-head"><div><span>申报编号</span><strong>${submission.applicationId}</strong></div><div><span>申请表路径</span><strong>${pathLabel}</strong></div><div><span>提交时间</span><strong>${submission.submittedAt}</strong></div></div><div class="review-material-list">${rows}</div>`;
  }

  function renderComplianceSubmissionReview(item, submission, customer) {
    const customerName = submission.customerName || customer?.name || item.customer;
    const tradeType = submission.businessType || submission.reviewType || item.type;
    const submitNote = submission.note || item.note || "无";
    return `<div class="submission-review-head compliance-submission-head"><div><span>交易类型</span><strong>${escapeHtml(tradeType)}</strong></div><div><span>客户姓名</span><strong>${escapeHtml(customerName)}</strong></div><div><span>说明</span><strong>${escapeHtml(submitNote)}</strong></div></div>${renderSubmissionReview(submission, "compliance").replace(/^<div class="submission-review-head">[\s\S]*?<\/div><div class="review-material-list">/, '<div class="review-material-list">')}`;
  }

  function renderCaseActions(item) {
    if (item.status === "待运营审核") return `<div class="case-actions"><button class="btn" data-case-action="supplement" data-case-id="${item.id}">发起补件</button><button class="btn btn-primary" data-case-action="compliance" data-case-id="${item.id}">提交合规</button></div>`;
    if (item.status === "待客户补件") return `<div class="case-actions"><button class="btn" data-case-action="followup" data-case-id="${item.id}">保存跟进</button><button class="btn btn-primary" data-case-action="received" data-case-id="${item.id}">确认收到补件</button></div>`;
    if (item.status === "合规驳回") return `<div class="case-actions"><button class="btn" data-case-action="notify" data-case-id="${item.id}">发送 交易员 通知</button><button class="btn btn-primary" data-case-action="compliance" data-case-id="${item.id}">重新提交合规</button></div>`;
    if (item.status === "待提交银行") return `<button class="btn btn-primary" data-case-action="bank-submit" data-case-id="${item.id}">提交银行</button>`;
    if (item.status === "银行审核中") return `<div class="case-actions"><button class="btn" data-case-action="bank-reject" data-case-id="${item.id}">录入拒绝</button><button class="btn btn-primary" data-case-action="bank-pass" data-case-id="${item.id}">录入通过</button></div>`;
    if (item.status === "审核通过") return `<button class="btn btn-primary" data-case-action="trade" data-case-id="${item.id}">创建关联交易</button>`;
    if (item.status === "交易中") return `<div class="case-actions"><button class="btn" data-case-action="cancel" data-case-id="${item.id}">业务取消</button><button class="btn btn-primary" data-case-action="progress" data-case-id="${item.id}">更新交易进度</button></div>`;
    return `<span class="status status-neutral">只读记录</span>`;
  }

  function renderComplianceQueue() {
    const reviewing = state.complianceReviewingCase && state.cases.find(item => item.id === state.complianceReviewingCase && item.status === "待合规审核");
    if (reviewing) return renderComplianceReviewPage(reviewing);
    const pending = filteredComplianceCases("pending");
    const processed = filteredComplianceCases("processed");
    const activeRows = state.complianceQueueTab === "processed" ? processed : pending;
    return `<div class="page compliance-queue-page">${pageHeader("COMPLIANCE QUEUE", "审核队列", "交易员或运营提交过来的合规审核工单会进入待处理审核，审核通过或驳回后进入已处理审核。")}
      <div class="compliance-tabs" role="tablist" aria-label="合规审核队列">
        <button type="button" class="${state.complianceQueueTab === "pending" ? "active" : ""}" data-compliance-tab="pending" role="tab" aria-selected="${state.complianceQueueTab === "pending"}">待处理审核</button>
        <button type="button" class="${state.complianceQueueTab === "processed" ? "active" : ""}" data-compliance-tab="processed" role="tab" aria-selected="${state.complianceQueueTab === "processed"}">已处理审核</button>
      </div>
      ${state.complianceQueueTab === "processed" ? renderProcessedComplianceToolbar() : renderPendingComplianceToolbar()}
      <div class="data-table-wrap compliance-table-wrap">
        <table class="data-table compliance-table">
          ${state.complianceQueueTab === "processed" ? renderProcessedComplianceTable(processed) : renderPendingComplianceTable(pending)}
        </table>
      </div>
      <div class="pagination-bar compliance-pagination"><span>共 ${activeRows.length} 条</span><div><button class="btn btn-sm" disabled>‹</button><button class="btn btn-sm btn-primary">1</button><button class="btn btn-sm" disabled>›</button></div><span>10 条/页</span></div>
    </div>`;
  }

  function renderComplianceReviewPage(item) {
    const customer = state.customers.find(c => c.id === item.customerId);
    return `<div class="page compliance-review-page"><button class="compliance-back-link" type="button" id="compliance-review-back">← 返回审核队列</button>
      <section class="case-workspace compliance-review-workspace"><header class="case-workspace-head"><div><p class="eyebrow">${escapeHtml(complianceCustomerNo(item, customer))}</p><h2>${escapeHtml(item.customer)} <span class="status status-info">${escapeHtml(complianceAuditType(item))}</span></h2><p>${escapeHtml(item.type)} · 提交时间 ${escapeHtml(complianceSubmittedAt(item, customer))}</p></div><span class="risk ${riskClass(item.risk)}">${item.risk}风险</span></header>${customer?.materialSubmission ? renderComplianceSubmissionReview(item, customer.materialSubmission, customer) : `<div class="notice-preview"><span>自动化建议 · 不是最终结论</span><p>未命中制裁名单；材料完整性已由上一环节确认，仍需合规官人工给出最终结论。</p></div>`}${renderComplianceConclusionSection(item)}</section></div>`;
  }

  function renderComplianceConclusionSection(item) {
    const draft = state.complianceConclusionDraft || { decision: "", note: "" };
    const rejectSelected = draft.decision === "reject";
    const passSelected = draft.decision === "pass";
    const hint = !draft.decision ? "请先选择审核结论"
      : rejectSelected ? (draft.note.trim() ? "提交后案件退回 交易员 处理" : "驳回必须填写审核说明")
      : "提交后案件返回运营，进入待提交银行";
    return `<footer class="compliance-review-actions compliance-conclusion">
      <div class="conclusion-title"><h3>审核结论</h3><p>选择结论并填写审核说明；说明会写入案件记录，驳回时为必填。</p></div>
      <div class="conclusion-options">
        <label class="conclusion-option ${passSelected ? "selected pass" : ""}"><input type="radio" name="compliance-conclusion" value="pass" ${passSelected ? "checked" : ""} /><span><strong>审核通过</strong><small>案件返回运营，进入待提交银行</small></span></label>
        <label class="conclusion-option ${rejectSelected ? "selected reject" : ""}"><input type="radio" name="compliance-conclusion" value="reject" ${rejectSelected ? "checked" : ""} /><span><strong>驳回</strong><small>案件退回 交易员，补充后重新提交</small></span></label>
      </div>
      <label class="field conclusion-note"><span>审核说明${rejectSelected ? ` <em class="conclusion-required">* 驳回时必填</em>` : "（选填）"}</span><textarea id="compliance-conclusion-note" rows="3" placeholder="${rejectSelected ? "请填写驳回原因，例如缺少的材料或不一致的信息" : "补充审核依据或备注，会写入案件记录"}">${escapeHtml(draft.note)}</textarea></label>
      <div class="conclusion-submit"><span class="field-hint" id="compliance-conclusion-hint">${hint}</span><button class="btn btn-primary" type="button" id="compliance-conclusion-submit" data-case-id="${item.id}" ${!draft.decision || (rejectSelected && !draft.note.trim()) ? "disabled" : ""}>提交审核结论</button></div>
    </footer>`;
  }

  function submitComplianceConclusion(id) {
    const item = state.cases.find(entry => entry.id === id);
    if (!item || item.status !== "待合规审核") return;
    const { decision, note } = state.complianceConclusionDraft;
    const trimmed = (note || "").trim();
    if (!decision) return toast("请选择审核结论", "先选择「审核通过」或「驳回」再提交");
    if (decision === "reject" && !trimmed) {
      toast("驳回需要填写说明", "请在审核说明中填写驳回原因");
      $("#compliance-conclusion-note")?.focus();
      return;
    }
    state.complianceConclusionDraft = { decision: "", note: "" };
    if (decision === "reject") {
      item.note = trimmed;
      applyCaseTransition(item, "合规驳回", "合规驳回", trimmed);
      return;
    }
    applyCaseTransition(item, "待提交银行", "合规审核通过", trimmed || "案件已返回运营等待提交银行");
  }

  function filteredComplianceCases(tab) {
    const rows = state.cases.filter(item => tab === "processed" ? isProcessedComplianceCase(item) : item.status === "待合规审核");
    const keyword = String(state.complianceQueueSearch || "").trim().toLowerCase();
    return rows.filter(item => {
      const customer = state.customers.find(c => c.id === item.customerId);
      const type = complianceAuditType(item);
      const conclusion = complianceConclusion(item);
      const searchable = `${item.customer} ${complianceCustomerNo(item, customer)} ${type} ${item.status} ${conclusion} ${complianceFinalConclusion(item)}`.toLowerCase();
      if (keyword && !searchable.includes(keyword)) return false;
      if (state.complianceQueueType !== "全部审核类型" && type !== state.complianceQueueType) return false;
      if (tab === "pending" && state.complianceQueueStatus !== "全部状态" && state.complianceQueueStatus !== "待审核") return false;
      if (tab === "processed" && state.complianceQueueConclusion !== "全部" && conclusion !== state.complianceQueueConclusion && complianceFinalConclusion(item) !== state.complianceQueueConclusion) return false;
      return true;
    });
  }

  function isProcessedComplianceCase(item) {
    return ["待提交银行", "合规驳回"].includes(item.status) && /合规/.test(`${item.source} ${item.previous} ${item.result}`);
  }

  function complianceAuditType(item) {
    return item.auditType === "驳回" ? "驳回" : "新提交";
  }

  function complianceCustomerNo(item, customer) {
    return customerNo(customer) || item.customerId || item.id;
  }

  function complianceSubmittedAt(item, customer) {
    return item.submittedAt || customer?.materialSubmission?.submittedAt || item.entered || "刚刚";
  }

  function complianceConclusion(item) {
    if (item.status === "合规驳回" || /驳回|退回/.test(`${item.previous} ${item.result}`)) return "审核驳回";
    if (item.status === "待提交银行" || /通过/.test(`${item.previous} ${item.result}`)) return "审核通过";
    return "--";
  }

  function complianceFinalConclusion(item) {
    return complianceConclusion(item) === "审核驳回" ? "未完结" : complianceConclusion(item);
  }

  function complianceTypeOptions(rows) {
    return ["全部审核类型", "新提交", "驳回"];
  }

  function renderPendingComplianceToolbar() {
    const types = complianceTypeOptions(state.cases.filter(item => item.status === "待合规审核"));
    return `<div class="compliance-filterbar">
      <label class="search-control">⌕<input id="compliance-queue-search" value="${escapeHtml(state.complianceQueueSearch)}" placeholder="输入客户名称或编号" /></label><button class="btn btn-primary" type="button" id="compliance-queue-search-btn">搜索</button>
      <span class="toolbar-spacer"></span>
      <select class="select-control" id="compliance-type-filter">${types.map(type => `<option ${state.complianceQueueType === type ? "selected" : ""}>${escapeHtml(type)}</option>`).join("")}</select>
      <select class="select-control" id="compliance-status-filter">${["全部状态", "待审核"].map(status => `<option ${state.complianceQueueStatus === status ? "selected" : ""}>${status}</option>`).join("")}</select>
      <select class="select-control" id="compliance-time-filter"><option>全部时间</option><option>今天</option><option>近 7 天</option></select>
      <button class="btn" type="button" id="compliance-filter-reset">重置</button>
    </div>`;
  }

  function renderProcessedComplianceToolbar() {
    return `<div class="compliance-filterbar">
      <label class="search-control">⌕<input id="compliance-queue-search" value="${escapeHtml(state.complianceQueueSearch)}" placeholder="输入客户名称或编号" /></label><button class="btn btn-primary" type="button" id="compliance-queue-search-btn">搜索</button>
      <span class="toolbar-spacer"></span>
      <label class="compliance-filter-field"><span>我的结论</span><select class="select-control" id="compliance-conclusion-filter">${["全部", "审核通过", "审核驳回"].map(value => `<option ${state.complianceQueueConclusion === value ? "selected" : ""}>${value}</option>`).join("")}</select></label>
      <label class="compliance-filter-field"><span>最终结论</span><select class="select-control" id="compliance-final-filter">${["全部", "审核通过", "未完结"].map(value => `<option ${state.complianceQueueConclusion === value ? "selected" : ""}>${value}</option>`).join("")}</select></label>
      <button class="btn" type="button" id="compliance-filter-reset">重置</button>
    </div>`;
  }

  function renderPendingComplianceTable(rows) {
    return `<thead><tr><th>客户名称</th><th>客户编号</th><th>审核类型</th><th>状态</th><th>提交时间</th><th>操作</th></tr></thead><tbody>${rows.length ? rows.map(item => {
      const customer = state.customers.find(c => c.id === item.customerId);
      return `<tr><td>${escapeHtml(item.customer)}</td><td>${escapeHtml(complianceCustomerNo(item, customer))}</td><td><span class="audit-type-badge">${escapeHtml(complianceAuditType(item))}</span></td><td><span class="compliance-dot pending">待审核</span></td><td>${escapeHtml(complianceSubmittedAt(item, customer))}</td><td class="table-actions"><button class="link-button" type="button" data-compliance-open-review="${item.id}">前往审核</button><button class="link-button muted-link" type="button" data-open-customer="${item.customerId}">详情</button></td></tr>`;
    }).join("") : `<tr><td colspan="6"><div class="empty-inline">暂无待处理审核工单。</div></td></tr>`}</tbody>`;
  }

  function renderProcessedComplianceTable(rows) {
    return `<thead><tr><th>客户名称</th><th>客户编号</th><th>我的结论</th><th>我的审核时间</th><th>最终结论</th><th>完结时间</th><th>操作</th></tr></thead><tbody>${rows.length ? rows.map(item => {
      const customer = state.customers.find(c => c.id === item.customerId);
      const conclusion = complianceConclusion(item);
      const finalConclusion = complianceFinalConclusion(item);
      return `<tr><td>${escapeHtml(item.customer)}</td><td>${escapeHtml(complianceCustomerNo(item, customer))}</td><td>${escapeHtml(conclusion)}</td><td>${escapeHtml(item.reviewedAt || item.entered)}</td><td><span class="audit-final ${finalConclusion === "审核通过" ? "pass" : finalConclusion === "未完结" ? "pending" : "reject"}">${escapeHtml(finalConclusion)}</span></td><td>${escapeHtml(finalConclusion === "未完结" ? "--" : item.finalizedAt || item.entered)}</td><td class="table-actions"><button class="link-button muted-link" type="button" data-open-customer="${item.customerId}">详情</button></td></tr>`;
    }).join("") : `<tr><td colspan="7"><div class="empty-inline">暂无已处理审核工单。</div></td></tr>`}</tbody>`;
  }

  function renderDocuments() {
    if (!["agent", "ops"].includes(state.role)) return `<div class="page">${pageHeader("DOCUMENTS", "补件处理", "当前角色不能处理客户补件。")}<div class="empty-state"><div><i>锁</i><h2>无处理权限</h2><p>请切换至初级交易员或高级交易员视角处理客户补件。</p></div></div></div>`;
    if (state.materialFlow.mode === "work") return renderMaterialWorkspace();
    if (state.materialFlow.mode === "detail") return renderMaterialOrderDetail();
    if (state.materialFlow.mode === "supplement") return renderSupplementWorkspace();
    return renderMaterialCustomerPicker();
  }

  function renderMaterialsUpload() {
    if (!["agent", "ops"].includes(state.role)) return `<div class="page">${pageHeader("MATERIAL UPLOAD", "材料上传", "当前角色只能查看材料记录，不能上传材料。")}<div class="empty-state"><div><i>锁</i><h2>无上传权限</h2><p>请切换至初级交易员或高级交易员视角处理客户材料。</p></div></div></div>`;
    const upload = state.quickMaterialUpload;
    const customer = resolveUploadCustomer(upload.customerNo);
    const matchingCustomers = getMatchingUploadCustomers(upload.customerNo);
    const intermediary = customer && customerKind(customer) === "中介";
    const validFiles = upload.files.length;
    const matchTone = customer ? "success" : upload.customerNo ? "danger" : "warning";
    const matchText = customer ? "匹配成功" : upload.customerNo ? "未匹配到记录" : "等待匹配";
    const customerAction = customer ? `<button class="btn btn-sm" type="button" data-open-customer="${customer.id}">查看客户</button>` : `<button class="btn btn-sm" type="button" data-view="customers">＋ 新建客户</button>`;
    const fileSummary = validFiles ? `${validFiles} 个文件已就绪` : "等待选择文件";
    const selectedScenario = state.kycConfig.scenarios.find(item => item.id === Number(upload.kycScenarioId)) || state.kycConfig.scenarios[0] || null;
    const channelIndex = Math.min(Number(upload.kycChannelIndex) || 0, Math.max((selectedScenario?.channels?.length || 1) - 1, 0));
    const selectedChannel = selectedScenario?.channels?.[channelIndex] || null;
    const hasQuickDraft = validFiles || upload.customerNo || upload.submitNote || upload.customerName || upload.customerChineseName || upload.customerEnglishName || Number(upload.kycScenarioId) !== 1 || Number(upload.kycChannelIndex) !== 0;
    return `<div class="page material-upload-page material-upload-workbench">
      <div class="material-upload-workspace">
        <main class="quick-upload-main">
          <div class="material-upload-titlebar">
            <div><p class="eyebrow">BUSINESS ACCESS</p><h1>准入材料与合规单据上传</h1><p>选择客户、业务类型和路由通道后，按右侧 KYC 规则提交本批材料。</p></div>
            <span class="status status-success">合规通道状态：双向通畅</span>
          </div>

          <section class="quick-upload-panel quick-step-card">
            <div class="quick-upload-head quick-step-head">
              <div><i class="quick-step-no">1</i><h2>选择交易客户</h2><small>按客户编号或名称搜索</small></div>
              <div class="quick-head-actions"><span class="status status-${matchTone}">${matchText}</span>${customerAction}</div>
            </div>
            <div class="quick-customer-lookup">
              <label class="field quick-upload-customer"><span>搜索或选择客户编号/名称</span><div class="quick-customer-combobox"><input id="quick-upload-customer" value="${escapeHtml(upload.customerNo)}" placeholder="输入客户编号如 20001 或公司名" autocomplete="off" aria-autocomplete="list" aria-expanded="${upload.customerDropdownOpen}" />${upload.customerDropdownOpen ? renderQuickCustomerDropdown(matchingCustomers, upload.customerHighlightIndex) : ""}</div></label>
              ${!intermediary ? renderQuickCustomerMatch(customer, upload) : ""}
            </div>
            ${intermediary ? renderQuickIntermediaryPanel(customer, upload) : ""}
          </section>

          <section class="quick-upload-panel quick-step-card">
            <div class="quick-upload-head quick-step-head">
              <div><i class="quick-step-no">2</i><h2>业务模式与路由配置</h2><small>同一批文件进入同一业务类型与渠道</small></div>
              <span class="quick-route-pill">${selectedChannel ? `${escapeHtml(selectedChannel.name)} 清算网络` : "未绑定渠道"}</span>
            </div>
            <div class="quick-route-grid">
              <label class="field"><span>1. 业务类型</span><select id="quick-kyc-scenario">${state.kycConfig.scenarios.map(item => `<option value="${item.id}" ${selectedScenario?.id === item.id ? "selected" : ""}>#${escapeHtml(item.code)} - ${escapeHtml(item.name)}</option>`).join("")}</select></label>
              <div class="field"><span>2. 路由出款通道（该业务类型绑定 ${selectedScenario?.channels?.length || 0} 个渠道）</span><div class="quick-channel-options">${selectedScenario?.channels?.length ? selectedScenario.channels.map((channel, index) => `<button type="button" class="quick-channel-chip ${index === channelIndex ? "active" : ""}" data-quick-channel="${index}">${escapeHtml(channel.name)}<small>清算网络</small></button>`).join("") : `<span class="quick-channel-empty">该业务类型暂无绑定渠道</span>`}</div></div>
              <label class="field"><span>3. 客户姓名 / 账户名称（可选填）</span><input id="quick-submit-customer-name" value="${escapeHtml(upload.customerName || upload.customerChineseName || upload.customerEnglishName || "")}" placeholder="填写汇款人中英文名称" /></label>
              <label class="field"><span>4. 业务说明 / 风险备注</span><input id="quick-submit-note" value="${escapeHtml(upload.submitNote || "")}" placeholder="填写本次材料说明或合规关注事项" /></label>
            </div>
          </section>

          <section class="quick-upload-panel quick-step-card">
            <div class="quick-upload-head quick-step-head">
              <div><i class="quick-step-no">3</i><h2>上传合规材料证明</h2><small>支持图片、PDF 和 Word，可拖拽</small></div>
              <strong class="quick-file-count">已选择 ${validFiles} 个文件</strong>
            </div>
            <label class="quick-dropzone" id="quick-dropzone">
              <input id="quick-upload-files" type="file" multiple accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx,image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
              <span aria-hidden="true">⇧</span>
              <strong>把文件拖拽到这里，或点击选择文件</strong>
              <small>支持图片、PDF 及 Word 文档，文件仅用于本地演示</small>
            </label>
            ${upload.files.length ? `<div class="quick-file-list"><div class="quick-file-list-head"><span>待提交文件列表</span><small>${fileSummary}</small></div>${upload.files.map((file, index) => renderQuickUploadFile(file, index, selectedChannel)).join("")}</div>` : `<div class="material-empty-inline">尚未选择文件</div>`}
          </section>
        </main>

        <aside class="quick-kyc-assistant">
          ${renderQuickKycAssistant(selectedScenario, selectedChannel, upload)}
        </aside>
      </div>
      <footer class="quick-submit-dock">
        <div class="quick-submit-mode"><span>选择提交模式：</span>
          <label class="${upload.destination === "library" ? "selected" : ""}"><input type="radio" name="quickDestination" value="library" ${upload.destination === "library" ? "checked" : ""} /><strong>保存客户材料库</strong><small>仅归档文件</small></label>
          <label class="${upload.destination === "complianceFx" ? "selected" : ""}"><input type="radio" name="quickDestination" value="complianceFx" ${upload.destination === "complianceFx" ? "checked" : ""} /><strong>提交到合规（找换）</strong><small>生成合规审核记录</small></label>
          <label class="${upload.destination === "complianceU" ? "selected" : ""}"><input type="radio" name="quickDestination" value="complianceU" ${upload.destination === "complianceU" ? "checked" : ""} /><strong>提交到合规（U相关）</strong><small>生成 U 相关审核记录</small></label>
        </div>
        <div class="quick-dock-actions"><button class="btn" type="button" id="quick-upload-clear" ${hasQuickDraft ? "" : "disabled"}>取消</button><button class="btn btn-primary" type="button" id="quick-upload-submit" ${customer && validFiles ? "" : "disabled"}>确认并提交</button></div>
      </footer>
    </div>`;
  }

  function renderQuickKycPreview(scenario, channel) {
    if (!scenario) return `<section class="quick-kyc-preview empty"><strong>KYC 前台预览</strong><p>暂无可用业务类型配置。</p></section>`;
    if (!channel) return `<section class="quick-kyc-preview empty"><strong>KYC 前台预览</strong><p>${escapeHtml(scenario.name)} 尚未绑定渠道，请先由合规官配置渠道和材料模块。</p></section>`;
    const restrictions = channel.restrictions || [];
    const sections = channel.sections || [];
    return `<section class="quick-kyc-preview">
      <header>
        <div><span>KYC LIST PREVIEW</span><strong>${escapeHtml(channel.name)} 渠道前台材料要求</strong></div>
        <em>#${escapeHtml(scenario.code)}</em>
      </header>
      <div class="quick-kyc-notice">
        <strong>业务流程</strong>
        <p>${escapeHtml(scenario.processDescription || "暂无流程说明").replace(/\n/g, "<br>")}</p>
      </div>
      ${restrictions.length ? `<div class="quick-kyc-restrictions"><strong>渠道限制</strong>${restrictions.map(rule => `<p>${escapeHtml(rule.content || "")}</p>`).join("")}</div>` : ""}
      <div class="quick-kyc-sections">
        ${sections.map((section, sectionIndex) => `<article class="quick-kyc-section">
          <h3><span>模块 ${sectionIndex + 1}</span>${escapeHtml(section.title)}</h3>
          <div>${(section.items || []).map((item, itemIndex) => renderQuickKycPreviewItem(item, itemIndex)).join("") || `<p class="muted">暂无材料项</p>`}</div>
        </article>`).join("")}
      </div>
    </section>`;
  }

  function renderQuickKycPreviewItem(item, itemIndex) {
    const typeLabel = item.type === "bank_account" ? "银行账户字段" : item.type === "text" ? "文本填写" : "文件上传";
    const validityLabel = item.validity === "1m" ? "1个月内有效" : item.validity === "3m" ? "3个月内有效" : "无有效期限制";
    return `<div class="quick-kyc-item">
      <span>${itemIndex + 1}</span>
      <div><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.subRequirement || "按渠道要求提交清晰完整资料。")}</small></div>
      <em class="${item.required ? "" : "optional"}">${item.required ? "必填" : "选填"}</em>
      <small>${typeLabel} · ${validityLabel}</small>
    </div>`;
  }

  function renderQuickKycAssistant(scenario, channel, upload) {
    if (!scenario) return `<section class="quick-assistant-empty"><strong>KYC 规则智能校验</strong><p>暂无可用业务类型配置。</p></section>`;
    const items = quickKycFlatItems(channel);
    const restrictions = channel?.restrictions || [];
    const uploadedTypes = new Set((upload.files || []).map(file => detectQuickMaterialType(file.name)));
    const readyCount = items.filter(item => [...uploadedTypes].some(type => item.name.includes(type) || item.subRequirement?.includes(type))).length;
    return `<section class="quick-assistant-panel">
      <header><div><span>KYC 规则智能校验</span><strong>${escapeHtml(scenario.name)}</strong></div><em>#${escapeHtml(scenario.code)} · ${channel ? escapeHtml(channel.name) : "未绑定"} 渠道</em></header>
      <div class="quick-assistant-scroll">
        <article class="quick-rule-card flow"><div><strong>业务标准流程</strong><span>规范</span></div><ol>${quickProcessLines(scenario.processDescription).map(line => `<li>${escapeHtml(line)}</li>`).join("") || `<li>暂无流程说明。</li>`}</ol></article>
        ${restrictions.length ? `<article class="quick-rule-card danger"><div><strong>${escapeHtml(channel.name)} 渠道禁收限制</strong><span>严格拦截</span></div>${restrictions.map(rule => `<p>${escapeHtml(rule.content)}</p>`).join("")}</article>` : ""}
        <article class="quick-rule-list"><header><strong>${channel ? escapeHtml(channel.name) : "当前"} 出款 - 必备材料清单</strong><span>已就绪 ${Math.min(readyCount, items.length)}/${items.length}</span></header><div>${items.map((item, index) => renderQuickAssistantRequirement(item, index)).join("") || `<div class="material-empty-inline">当前渠道暂无材料要求</div>`}</div></article>
      </div>
    </section>`;
  }

  function renderQuickAssistantRequirement(item, index) {
    const typeLabel = item.type === "bank_account" ? "字段" : item.type === "text" ? "文本" : "文件";
    return `<div class="quick-rule-item"><div><strong>${index + 1}. ${escapeHtml(item.name)}</strong><em class="${item.required ? "" : "optional"}">${item.required ? "必须" : "选填"}</em></div><p>${escapeHtml(item.subRequirement || "按渠道要求提交清晰完整资料。")}</p><small>${typeLabel}${item.validity && item.validity !== "none" ? ` · ${item.validity === "1m" ? "1个月内有效" : "3个月内有效"}` : ""}</small></div>`;
  }

  function quickKycFlatItems(channel) {
    return (channel?.sections || []).flatMap(section => section.items || []);
  }

  function quickProcessLines(text = "") {
    return String(text).split(/\n+/).map(line => line.replace(/^\s*\d+[.、]\s*/, "").trim()).filter(Boolean).slice(0, 6);
  }

  function quickMaterialCategoryOptions(channel, selected = "") {
    const items = quickKycFlatItems(channel);
    return `<option value="">关联材料类型</option>${items.map((item, index) => `<option value="${escapeHtml(item.name)}" ${selected === item.name ? "selected" : ""}>${index + 1}. ${escapeHtml(item.name)}</option>`).join("")}`;
  }

  function renderQuickCustomerDropdown(customers, highlightedIndex = 0) {
    if (!customers.length) return `<div class="quick-customer-dropdown shadow-float"><div class="quick-customer-option-empty">未找到匹配客户</div></div>`;
    return `<div class="quick-customer-dropdown shadow-float" id="quick-customer-dropdown">
      ${customers.map((customer, index) => `<button class="quick-customer-option ${index === highlightedIndex ? "highlighted" : ""}" type="button" data-quick-customer-pick="${escapeHtml(customer.uploadKey || customer.id)}"><strong>${escapeHtml(customer.name)}</strong>${customer.clientNo ? `<span>${escapeHtml(customer.clientNo)}</span>` : ""}</button>`).join("")}
    </div>`;
  }

  function renderQuickCustomerMatch(customer, upload) {
    if (customer) {
      const intermediary = customerKind(customer) === "中介";
      return `<div class="quick-customer-hit ${intermediary ? "intermediary" : ""}">
        <div class="cell-primary"><span class="avatar ${intermediary ? "company" : ""}">${customerInitials(customer)}</span><span><strong>${escapeHtml(customer.name)}</strong><small>${customerNo(customer)} · ${customerKind(customer)} · ${customer.agent}</small></span></div>
        <div class="quick-match-meta"><span class="status status-${statusTone(customer.status)}">${customer.status}</span><button class="btn btn-sm" type="button" data-open-customer="${customer.id}">查看客户</button></div>
      </div>`;
    }
    if (upload.customerNo) return `<div class="quick-customer-empty error"><strong>未匹配到记录</strong><span>请检查客户编号或名称。</span></div>`;
    return `<div class="quick-customer-empty"><strong>等待客户匹配</strong><span>输入客户编号或名称后自动匹配客户名单。</span></div>`;
  }

  function renderQuickIntermediaryPanel(customer, upload) {
    const subCustomers = customer.subCustomers || [];
    const selectedSub = subCustomers.find(item => item.clientNo) || subCustomers[0];
    const newClientNo = nextAvailableClientNo();
    const targetText = upload.archiveTarget === "self" ? `${customer.name} 自身档案库` : upload.subMode === "existing" && selectedSub ? `${selectedSub.name} (${selectedSub.clientNo || "待分配编号"})` : `${upload.newSubName || "新建下级客户"} (${newClientNo})`;
    return `<section class="quick-intermediary-panel">
      <div class="quick-broker-banner">
        <span aria-hidden="true">中</span>
        <div><strong>匹配到中介客户</strong><small>${escapeHtml(customer.name)} · ${customerNo(customer)} · 下级客户 ${subCustomers.length} 个</small></div>
      </div>
      <div class="quick-target-grid">
        <label class="quick-choice ${upload.archiveTarget === "self" ? "selected" : ""}"><input type="radio" name="quickArchiveTarget" value="self" ${upload.archiveTarget === "self" ? "checked" : ""} /><span><strong>中介机构自身</strong><small>框架协议、渠道资质或通用合规材料。</small></span></label>
        <label class="quick-choice ${upload.archiveTarget === "sub" ? "selected" : ""}"><input type="radio" name="quickArchiveTarget" value="sub" ${upload.archiveTarget === "sub" ? "checked" : ""} /><span><strong>中介代理的下级客户</strong><small>本次业务对应的具体客户主体。</small></span></label>
        <label class="quick-choice ${upload.archiveTarget === "sub" && upload.subMode === "existing" ? "selected" : ""}"><input type="radio" name="quickSubMode" value="existing" ${upload.archiveTarget === "sub" && upload.subMode === "existing" ? "checked" : ""} /><span><strong>选择已有下级客户</strong><small>${selectedSub ? "从已备案名册归档。" : "当前暂无可用下级客户。"}</small></span></label>
        <label class="quick-choice ${upload.archiveTarget === "sub" && upload.subMode === "new" ? "selected" : ""}"><input type="radio" name="quickSubMode" value="new" ${upload.archiveTarget === "sub" && upload.subMode === "new" ? "checked" : ""} /><span><strong>登记全新下级客户</strong><small>自动预分配直客规则编号。</small></span></label>
      </div>
      ${upload.archiveTarget === "sub" && upload.subMode === "new" ? `<label class="field quick-subclient-name"><span>新下级客户全称</span><input id="quick-subclient-name" value="${escapeHtml(upload.newSubName)}" placeholder="例如 新加坡海峡创新基金 Ltd" autocomplete="off" /></label>` : ""}
      <div class="quick-archive-summary"><span>最终归档主体</span><strong>${escapeHtml(targetText)}</strong><small>${upload.archiveTarget === "self" ? "适用于中介自身主档案材料。" : "材料仍与中介保持渠道关联。"}</small></div>
    </section>`;
  }

  function renderQuickUploadFile(file, index, channel = null) {
    const ext = file.name.split(".").pop()?.toUpperCase() || "FILE";
    const detected = detectQuickMaterialType(file.name);
    return `<article class="quick-file-row"><span class="doc-icon">${ext.slice(0, 4)}</span><div><strong>${escapeHtml(file.name)}</strong><small>${formatFileSize(file.size)} · ${escapeHtml(file.type || "已知文件格式")} · ${detected}</small></div><select data-quick-file-category="${index}" aria-label="关联材料类型">${quickMaterialCategoryOptions(channel, file.mappedCategory || "")}</select><button class="icon-button" type="button" data-quick-file-remove="${index}" aria-label="移除文件">×</button></article>`;
  }

  function renderMaterialCustomerPicker() {
    const orders = state.materialOrders;
    const draftCount = orders.filter(order => /未完成|草稿/.test(order.status)).length;
    const supplementCount = orders.filter(order => /补件|驳回/.test(order.status)).length;
    const reviewCount = orders.filter(order => /审核/.test(order.status)).length;
    return `<div class="page">${pageHeader("REVIEW WORK ORDERS", "材料与补件", "管理已经发起的客户审核工单、材料草稿和指定补件。")}
      <div class="material-picker-summary four"><div><strong>${orders.length}</strong><span>进行中与历史工单</span></div><div><strong>${draftCount}</strong><span>待继续提交</span></div><div><strong>${supplementCount}</strong><span>待处理补件</span></div><div><strong>${reviewCount}</strong><span>审核处理中</span></div></div>
      <div class="toolbar"><label class="search-control">⌕<input id="material-order-search" placeholder="搜索工单号、客户名称或编号" /></label><select class="select-control" id="material-order-filter"><option>全部状态</option><option>材料未完成</option><option>待客户补件</option><option>待运营审核</option><option>审核通过</option></select><span class="toolbar-count">${orders.length} 个工单</span></div>
      <div class="material-order-table"><div class="material-order-head"><span>客户</span><span>当前状态</span><span>材料完整度</span><span>最后更新</span><span>操作</span></div>${orders.map(order => materialOrderRow(order)).join("")}</div></div>`;
  }

  function materialOrderRow(order) {
    const customer = state.customers.find(item => item.id === order.customerId);
    if (!customer) return "";
    const action = /未完成|草稿/.test(order.status) ? "继续提交" : /补件|驳回/.test(order.status) ? "处理补件" : "查看详情";
    const actionType = action === "查看详情" ? "detail" : "continue";
    const displayClientNo = customer.clientNo || "无编号";
    return `<article class="material-order-row" data-order-search="${escapeHtml(`${order.id} ${customer.name} ${displayClientNo} ${customer.id} ${order.status}`)}"><div class="cell-primary"><span class="avatar ${customer.type === "企业" ? "company" : ""}">${customerInitials(customer)}</span><span><strong>${customer.name}</strong><small>${order.id} · ${escapeHtml(displayClientNo)} · ${customer.type === "企业" ? "企业 KYB" : "个人 KYC"}</small></span></div><div><span class="status status-${statusTone(order.status)}">${order.status}</span><small>${order.stage}</small></div><div><strong>${order.completeness}</strong><small>当前有效材料</small></div><div><strong>${order.updated}</strong><small>最后更新</small></div><button class="btn ${action !== "查看详情" ? "btn-primary" : ""}" type="button" data-material-order="${order.id}" data-order-action="${actionType}">${action} →</button></article>`;
  }

  function renderMaterialOrderDetail() {
    const flow = state.materialFlow;
    const order = state.materialOrders.find(item => item.id === flow.orderId);
    const customer = state.customers.find(item => item.id === order?.customerId);
    if (!order || !customer) { flow.mode = "list"; return renderMaterialCustomerPicker(); }
    const submission = customer.materialSubmission;
    const docs = submission?.items || customer.documents.map(doc => ({ category: doc.name, name: doc.meta, opsDecision: doc.state }));
    return `<div class="page">${pageHeader("WORK ORDER DETAIL", `${customer.name} · 审核工单`, `${order.id} · ${customer.type === "企业" ? "企业 KYB" : "个人 KYC"}`, `<button class="btn" id="material-back-list">← 返回工单列表</button>`)}<div class="order-detail-strip">${caseFact("当前状态", order.status)}${caseFact("当前阶段", order.stage)}${caseFact("材料完整度", order.completeness)}${caseFact("最后更新", order.updated)}</div><div class="order-detail-grid"><section class="section"><div class="section-header"><div><h2>材料与申请表</h2><p>只读工单快照</p></div></div><div class="review-material-list">${docs.map(doc => `<article class="review-material-row"><div><span class="doc-icon">PDF</span><span><strong>${doc.category || doc.name}</strong><small>${escapeHtml(doc.name || doc.meta || "已上传材料")}</small></span></div><span class="status status-${statusTone(doc.opsDecision || doc.state || "已提交")}">${doc.opsDecision || doc.state || "已提交"}</span><div class="case-actions">${doc.url ? `<button class="btn btn-sm" data-pdf-preview="${doc.url}" data-pdf-name="${escapeHtml(doc.name)}">预览</button><a class="btn btn-sm" href="${doc.url}" download>下载</a>` : `<button class="btn btn-sm" disabled>记录材料</button>`}</div></article>`).join("")}${submission?.applicationPdf ? `<article class="review-material-row"><div><span class="doc-icon">PDF</span><span><strong>申请表 PDF</strong><small>${submission.applicationPdf.filename}</small></span></div><span class="status status-success">已生成</span><div class="case-actions"><button class="btn btn-sm" data-pdf-preview="${submission.applicationPdf.url}" data-pdf-name="${submission.applicationPdf.filename}">预览</button><a class="btn btn-sm" href="${submission.applicationPdf.url}" download>下载</a></div></article>` : ""}</div></section><aside class="section"><div class="section-header"><div><h2>工单记录</h2><p>${order.note}</p></div></div><div class="order-history">${order.history.map((event, index) => `<div><i>${index + 1}</i><span>${event}</span></div>`).join("")}</div></aside></div></div>`;
  }

  function supplementRelatedCase(order) {
    return state.cases.find(item => item.customerId === order.customerId && ["待客户补件", "合规驳回"].includes(item.status));
  }

  function supplementMaterialOptions(customer) {
    const items = customer.materialSubmission?.items;
    if (items?.length) return items.map(item => item.category);
    if (customer.documents?.length) return customer.documents.map(doc => doc.name);
    return materialCategories(customer);
  }

  function supplementTargets(order, customer, relatedCase) {
    const noteText = `${order.note || ""} ${relatedCase?.note || ""}`;
    const flagged = new Set();
    (customer.materialSubmission?.items || []).forEach(item => { if (item.opsDecision === "退回") flagged.add(item.category); });
    (customer.documents || []).forEach(doc => { if (/需补件|需重传|风险复核/.test(doc.state)) flagged.add(doc.name); });
    supplementMaterialOptions(customer).forEach(category => { if (noteText.includes(category)) flagged.add(category); });
    return [...flagged];
  }

  function renderSupplementWorkspace() {
    const flow = state.materialFlow;
    const order = state.materialOrders.find(item => item.id === flow.orderId);
    const customer = state.customers.find(item => item.id === order?.customerId);
    if (!order || !customer) { flow.mode = "list"; return renderMaterialCustomerPicker(); }
    const relatedCase = supplementRelatedCase(order);
    const targets = supplementTargets(order, customer, relatedCase);
    const options = supplementMaterialOptions(customer);
    const uploads = flow.supplementUploads || [];
    const allMatched = uploads.length > 0 && uploads.every(file => file.itemKey);
    const rejectSource = relatedCase?.source || (/合规/.test(order.stage) ? "合规退回" : "运营退回");
    const rejectNote = order.note || relatedCase?.note || "请根据退回意见补充材料。";
    const snapshot = customer.materialSubmission?.items?.length
      ? customer.materialSubmission.items.map(item => ({ name: item.category, meta: item.name, state: item.opsDecision || "待审核" }))
      : (customer.documents || []).map(doc => ({ name: doc.name, meta: doc.meta, state: doc.state }));
    return `<div class="page">${pageHeader("SUPPLEMENT WORK", `${customer.name} · 补件处理`, `${order.id} · ${escapeHtml(customerNo(customer))} · ${customer.type === "企业" ? "企业 KYB" : "个人 KYC"}`, `<button class="btn" id="material-back-list">← 返回工单列表</button>`)}
      <div class="order-detail-strip">${caseFact("当前状态", order.status)}${caseFact("当前阶段", order.stage)}${caseFact("材料完整度", order.completeness)}${caseFact("退回时间", order.updated)}</div>
      <div class="order-detail-grid"><div class="supplement-main">
        <section class="supplement-reject-card"><header><span class="status status-${statusTone(order.status)}">${escapeHtml(order.status)}</span><strong>本次驳回说明</strong><small>${escapeHtml(rejectSource)} · ${escapeHtml(order.updated)}</small></header><p>${escapeHtml(rejectNote)}</p>${targets.length ? `<div class="supplement-target-row"><span>需补交材料项</span>${targets.map(target => `<em>${escapeHtml(target)}</em>`).join("")}</div>` : ""}</section>
        <section class="section supplement-upload-section"><div class="section-header"><div><h2>补交材料</h2><p>拖拽文件到下方区域或点击选择文件，每份文件需匹配一个材料项。支持 JPG、PNG、PDF。</p></div></div>
          <div class="supplement-dropzone" id="supplement-dropzone"><i>⇪</i><strong>拖拽文件到这里上传</strong><small>或点击选择文件 · 可一次选择多份</small><input id="supplement-file-input" type="file" multiple accept=".jpg,.jpeg,.png,.pdf" hidden /></div>
          ${uploads.length ? `<div class="supplement-file-list">${uploads.map((file, index) => `<article class="supplement-file-row"><span class="doc-icon">${file.type.includes("pdf") ? "PDF" : "IMG"}</span><div><strong>${escapeHtml(file.name)}</strong><small>${formatFileSize(file.size)} · 待提交</small></div><label class="supplement-match"><span>匹配材料项</span><select data-supplement-match="${index}"><option value="">请选择材料项</option>${options.map(option => `<option value="${escapeHtml(option)}" ${file.itemKey === option ? "selected" : ""}>${escapeHtml(option)}${targets.includes(option) ? "（需补件）" : ""}</option>`).join("")}</select></label><button class="icon-button" type="button" data-supplement-remove="${index}" aria-label="移除文件">×</button></article>`).join("")}</div>` : ""}
          <footer class="supplement-submit"><span class="field-hint">${!uploads.length ? "请先上传至少 1 份补件文件" : allMatched ? "提交后工单返回运营复核" : "还有文件未选择匹配材料项"}</span><button class="btn btn-primary" type="button" id="supplement-submit" ${allMatched ? "" : "disabled"}>提交补件材料</button></footer>
        </section>
      </div><aside class="section"><div class="section-header"><div><h2>已有材料</h2><p>补件前快照，无需重复上传</p></div></div><div class="review-material-list">${snapshot.map(item => `<article class="review-material-row supplement-snapshot-row"><div><span class="doc-icon">PDF</span><span><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.meta || "已上传材料")}</small></span></div><span class="status status-${statusTone(item.state)}">${escapeHtml(item.state)}</span></article>`).join("")}</div><div class="section-header supplement-history-header"><div><h2>工单记录</h2><p>最近处理动态</p></div></div><div class="order-history">${order.history.map((event, index) => `<div><i>${index + 1}</i><span>${escapeHtml(event)}</span></div>`).join("")}</div></aside></div></div>`;
  }

  function addSupplementFiles(fileList) {
    const flow = state.materialFlow;
    if (flow.mode !== "supplement") return;
    const order = state.materialOrders.find(item => item.id === flow.orderId);
    const customer = state.customers.find(item => item.id === order?.customerId);
    if (!order || !customer) return;
    const targets = supplementTargets(order, customer, supplementRelatedCase(order));
    const used = new Set(flow.supplementUploads.map(file => file.itemKey).filter(Boolean));
    let added = 0, skipped = 0;
    [...fileList].forEach(file => {
      if (!(["application/pdf", "image/jpeg", "image/png"].includes(file.type) || /\.(pdf|jpe?g|png)$/i.test(file.name))) { skipped += 1; return; }
      const guess = targets.find(target => !used.has(target)) || "";
      if (guess) used.add(guess);
      flow.supplementUploads.push({ name: file.name, size: file.size, type: file.type || "application/pdf", url: URL.createObjectURL(file), itemKey: guess });
      added += 1;
    });
    if (skipped) toast("部分文件未添加", "仅支持 JPG、JPEG、PNG 和 PDF");
    if (added) render();
  }

  function submitSupplement() {
    const flow = state.materialFlow;
    const order = state.materialOrders.find(item => item.id === flow.orderId);
    const customer = state.customers.find(item => item.id === order?.customerId);
    if (!order || !customer) return;
    const uploads = flow.supplementUploads || [];
    if (!uploads.length) return toast("还没有补件文件", "请先上传至少 1 份文件");
    if (uploads.some(file => !file.itemKey)) return toast("还有文件未匹配材料项", "为每份文件选择对应的材料项后再提交");
    const categories = [...new Set(uploads.map(file => file.itemKey))];
    const detail = `交易员补交 ${uploads.length} 份材料：${categories.join("、")}`;
    uploads.forEach(file => {
      const submissionItem = customer.materialSubmission?.items?.find(item => item.category === file.itemKey);
      if (submissionItem) {
        submissionItem.name = file.name;
        submissionItem.url = file.url;
        submissionItem.opsDecision = "待审核";
        submissionItem.versions = [...(submissionItem.versions || []), { version: `v${(submissionItem.versions?.length || 0) + 1}` }];
      }
      const doc = customer.documents.find(entry => entry.name === file.itemKey);
      if (doc) Object.assign(doc, { meta: `${file.name} · 补件新版本`, state: "待复核", tone: "amber" });
      else customer.documents.push({ name: file.itemKey, meta: `${file.name} · 补件上传`, state: "待复核", tone: "amber", flow: "compliance", flowLabel: "已提交合规" });
    });
    customer.updated = "刚刚";
    const [done, total] = (order.completeness || "0 / 0").split("/").map(part => Number(part.trim()) || 0);
    order.completeness = `${Math.min(total || done + categories.length, done + categories.length)} / ${total || done + categories.length}`;
    order.status = "待运营审核";
    order.stage = "补件复核";
    order.updated = "刚刚";
    order.note = `交易员已补交 ${categories.join("、")}，等待运营复核。`;
    order.history.unshift("刚刚 · 交易员提交补件材料");
    flow.mode = "list";
    flow.supplementUploads = [];
    const relatedCase = supplementRelatedCase(order);
    if (relatedCase) {
      applyCaseTransition(relatedCase, "待运营审核", "补件已提交", detail);
      return;
    }
    customer.timeline.unshift({ title: "补件已提交", detail, role: `交易员 ${customer.agent}`, time: "刚刚" });
    persistCustomers();
    render();
    toast("补件材料已提交", `${order.id} 已返回运营复核`);
  }

  function renderMaterialWorkspace() {
    const flow = state.materialFlow;
    const customer = state.customers.find(item => item.id === flow.customerId);
    if (!customer) { flow.mode = "list"; return renderMaterialCustomerPicker(); }
    const steps = ["开始", "客户与业务", "上传与 OCR", "编辑申请表", "确认与 PDF"];
    return `<div class="page material-page">${pageHeader("APPLICATION WORKSPACE", `${customer.name} · 发起申报`, `${flow.applicationId} · ${customer.type === "企业" ? "企业 KYB" : "个人 KYC"} · 草稿自动保存在当前浏览器`, `<button class="btn" id="material-back-list">← 返回客户列表</button>`)}
      ${customer.status === "合规驳回" || customer.documents.some(doc => doc.state === "需补件") ? `<div class="material-reject-note"><strong>补件要求</strong><span>${customer.documents.find(doc => doc.state === "需补件")?.name || "地址证明"}需要重新提交；其余有效材料无需重复上传。</span></div>` : ""}
      <div class="material-stepper">${steps.map((label, index) => `<button type="button" class="material-step ${flow.step === index + 1 ? "active" : flow.step > index + 1 ? "done" : ""}" data-material-goto="${index + 1}" ${index + 1 > flow.step ? "disabled" : ""}><i>${flow.step > index + 1 ? "✓" : index + 1}</i><span>${label}</span></button>`).join("")}</div>
      <div class="material-work-layout"><main class="material-work-main">${renderMaterialStep(customer, flow)}</main><aside class="material-work-aside">${renderMaterialAside(customer, flow)}</aside></div></div>`;
  }

  function renderMaterialStep(customer, flow) {
    if (flow.step === 1) return `<section class="material-stage"><div class="stage-kicker">STEP 01</div><h2>开始一项客户申报</h2><p>本流程将根据客户类型生成材料要求，模拟 OCR 填充申请表，并由 交易员 完成人工确认。</p><div class="material-intro-grid"><div><span>客户</span><strong>${customer.name}</strong><small>${customer.id}</small></div><div><span>申报类型</span><strong>${customer.type === "企业" ? "企业 KYB" : "个人 KYC"}</strong><small>根据客户主档自动选择</small></div><div><span>处理责任</span><strong>交易员 ${customer.agent}</strong><small>提交后转交运营</small></div></div><label class="material-consent"><input id="material-authorized" type="checkbox" ${flow.authorized ? "checked" : ""} /><span><strong>我已获得客户授权</strong><small>确认可为该客户提交材料，并允许系统生成申请表。</small></span></label>${materialStageFooter(1, !flow.authorized)}</section>`;
    if (flow.step === 2) return `<section class="material-stage"><div class="stage-kicker">STEP 02</div><h2>客户与业务</h2><p>客户主档只作为预填依据，本次申报会形成独立申请版本。</p><div class="field-grid"><label class="field"><span>客户类型</span><input value="${customer.type === "企业" ? "企业 KYB" : "个人 KYC"}" disabled /></label><label class="field"><span>所属 交易员</span><input value="${customer.agent} · A-018" disabled /></label><label class="field"><span>业务类型</span><select data-material-field="businessType"><option ${flow.form.businessType === "SINO" ? "selected" : ""}>SINO</option><option ${flow.form.businessType === "SGB" ? "selected" : ""}>SGB</option><option ${flow.form.businessType === "TransferEasy" ? "selected" : ""}>TransferEasy</option></select></label><label class="field"><span>预计月度业务量</span><input data-material-field="expectedVolume" value="${escapeHtml(flow.form.expectedVolume || "HKD 800,000")}" /></label><label class="field full"><span>业务说明</span><textarea data-material-field="businessPurpose">${escapeHtml(flow.form.businessPurpose || "客户申请跨境资金结算服务")}</textarea></label></div>${materialStageFooter(2)}</section>`;
    if (flow.step === 3) return renderMaterialUploadStep(customer, flow);
    if (flow.step === 4) return renderMaterialFormStep(customer, flow);
    return renderMaterialConfirmStep(customer, flow);
  }

  function materialStageFooter(step, disabled = false) {
    return `<footer class="material-stage-footer"><button class="btn" type="button" data-material-prev ${step === 1 ? "disabled" : ""}>← 上一步</button><button class="btn btn-primary" type="button" data-material-next ${disabled ? "disabled" : ""}>${step === 4 ? "进入确认" : "继续"} →</button></footer>`;
  }

  function renderMaterialUploadStep(customer, flow) {
    const uploaded = flow.files.filter(item => item.name).length;
    const items = flow.files.map((item, index) => `<article class="material-item ${item.name ? "uploaded" : ""}"><div class="material-item-copy"><span class="doc-icon">${item.name ? (item.type.includes("pdf") ? "PDF" : "IMG") : String(index + 1).padStart(2, "0")}</span><div><strong>${item.category}${item.required ? " *" : ""}</strong><small>${item.description}</small>${item.name ? `<p>${escapeHtml(item.name)} · ${formatFileSize(item.size)} · ${item.ocrState}</p>` : ""}</div></div><div class="material-item-actions">${item.url ? `<a class="btn btn-sm" href="${item.url}" target="_blank" rel="noopener">预览</a>` : ""}<label class="btn btn-sm btn-primary">${item.name ? "替换" : "上传"}<input class="material-item-input" data-material-item="${index}" type="file" accept=".jpg,.jpeg,.png,.pdf" /></label>${item.name ? `<button class="icon-button" data-material-remove="${index}" type="button" aria-label="移除">×</button>` : ""}</div></article>`).join("");
    const choices = uploaded ? `<div class="generation-choice"><div><h3>材料上传完成后，选择处理方式</h3><p>这一步由 交易员 决定，所有路径都会保留材料原件。</p></div><div class="generation-options">${[["ocr","OCR 识别并生成申请表","自动提取后进入可编辑表单"],["manual","手工填写并生成申请表","跳过 OCR，直接填写同一份表单"],["none","不生成申请表，直接送审","仅提交当前材料给运营审核"]].map(([value,title,desc]) => `<label class="generation-option ${flow.generationPath === value ? "selected" : ""}"><input type="radio" name="generationPath" value="${value}" ${flow.generationPath === value ? "checked" : ""}/><span><strong>${title}</strong><small>${desc}</small></span></label>`).join("")}</div></div>` : "";
    return `<section class="material-stage"><div class="stage-kicker">STEP 03</div><h2>按材料项上传客户文件</h2><p>每份文件绑定明确材料项，运营与合规会按相同目录预览、下载和审核。支持 JPG、PNG、PDF。</p><div class="material-demo-row"><span>已上传 ${uploaded} / ${flow.files.length} 项</span><button class="link-button" id="material-demo-files" type="button">载入完整演示材料</button></div><div class="material-item-list">${items}</div>${choices}<footer class="material-stage-footer"><button class="btn" type="button" data-material-prev>← 上一步</button><button class="btn btn-primary" id="material-upload-continue" type="button" ${uploaded && flow.generationPath ? "" : "disabled"}>${flow.generationPath === "none" ? "进入提交确认" : flow.generationPath === "manual" ? "填写申请表" : "运行 OCR"} →</button></footer></section>`;
  }

  function renderMaterialFormStep(customer, flow) {
    const corporate = customer.type === "企业";
    const fields = corporate ? [
      ["legalName", "企业法定名称"], ["englishName", "英文名称"], ["registrationRegion", "注册地区"], ["registrationNo", "注册编号"], ["incorporationDate", "成立日期", "date"], ["email", "联系邮箱", "email"], ["registeredAddress", "注册地址", "textarea"], ["businessAddress", "经营地址", "textarea"], ["fundSource", "资金来源说明", "textarea"], ["uboSummary", "董事与 UBO 摘要", "textarea"]
    ] : [
      ["legalName", "中文 / 法定姓名"], ["englishName", "英文姓名"], ["birthDate", "出生日期", "date"], ["nationality", "国籍 / 地区"], ["gender", "性别"], ["occupation", "职业"], ["idType", "证件类型"], ["idNo", "证件号码"], ["idExpiry", "证件有效期", "date"], ["phone", "联系电话"], ["email", "电子邮箱", "email"], ["address", "居住地址", "textarea"], ["fundSource", "资金来源说明", "textarea"]
    ];
    return `<section class="material-stage"><div class="stage-kicker">STEP 04</div><h2>${flow.generationPath === "ocr" ? "核对 OCR 申请表" : "填写申请表"}</h2><p>本页登记内容会逐项写入 TransferEasy Personal Service Application Form。企业客户现阶段也使用同一模板。</p><div class="ocr-summary"><span class="status status-${flow.generationPath === "ocr" ? "success" : "info"}">${flow.generationPath === "ocr" ? "OCR 已完成" : "手工填写"}</span><strong>${fields.length} 个基础字段</strong><span>${flow.generationPath === "ocr" ? "请确认识别结果和业务选项" : "请核对全部字段"}</span></div><form class="material-ocr-form">${fields.map((field, index) => renderOcrField(flow, field, index)).join("")}</form>${renderApplicationSelections(flow)}${materialStageFooter(4)}</section>`;
  }

  function renderApplicationSelections(flow) {
    const checkboxGroup = (key, title, subtitle, options) => `<fieldset class="application-choice-group"><legend><strong>${title}</strong><span>${subtitle}</span></legend><div class="application-choice-grid">${options.map(([value, label]) => `<label><input type="checkbox" data-material-choice="${key}" value="${value}" ${(flow.form[key] || []).includes(value) ? "checked" : ""}/><span>${label}</span></label>`).join("")}</div></fieldset>`;
    const radioGroup = (key, title, subtitle, options) => `<fieldset class="application-choice-group"><legend><strong>${title}</strong><span>${subtitle}</span></legend><div class="application-choice-grid amount-options">${options.map(([value, label]) => `<label><input type="radio" name="${key}" data-material-choice="${key}" value="${value}" ${flow.form[key] === value ? "checked" : ""}/><span>${label}</span></label>`).join("")}</div></fieldset>`;
    return `<section class="application-selections"><header><span>APPLICATION OPTIONS</span><h3>资金来源与预期服务登记</h3><p>以下选择将对应勾选申请表第 2、3 部分及金额区间。</p></header>${checkboxGroup("sourceOfWealth", "财富和资金来源", "Source of Wealth and Funds", [["Wages","工资 / 奖金 / 佣金 / 退休金"],["Rental","租金 / 利息收入"],["Investment","投资类收益"],["Loan","贷款 / 还款"],["Insurance","保险赔偿金"],["Sale","出售资产"],["Family","家庭资产"],["Others","其他"]])}${checkboxGroup("servicePurpose", "目的 / 理由", "Purpose / Reason", [["Own Funds","自有资金调配"],["Bills","账单、货物或服务付款"],["Investment","金融性投资"],["Family","朋友或家人支援"],["Business","经营性费用"],["Others","其他"]])}${radioGroup("destination", "服务目的地", "Service Destination", [["Hong Kong","中国香港"],["Mainland China","中国大陆"],["North America","北美地区"],["South East Asia","东南亚地区"],["EU/UK","欧盟地区 / 英国"],["Oceanica","大洋洲地区"]])}<div class="amount-choice-row">${radioGroup("annualAmount", "预计年度服务金额", "Estimated Annual Amount (USD)", [["0-50k","0–50,000"],["50k-230k","50,000–230,000"],["230k-500k","230,000–500,000"],["500k-2m","500,000–2,000,000"],["2m-40m","2,000,000–40,000,000"],["40m+","40,000,000 以上"]])}${radioGroup("perTxAmount", "预计单次服务金额", "Expected Amount per Transaction (USD)", [["0-20k","0–20,000"],["20k-100k","20,000–100,000"],["100k-150k","100,000–150,000"],["150k-500k","150,000–500,000"],["500k-22m","500,000–22,000,000"],["22m+","22,000,000 以上"]])}</div></section>`;
  }

  function renderOcrField(flow, [key, label, type = "text"], index) {
    const low = index === 3 || index === 8;
    const edited = flow.editedFields.has(key);
    const value = escapeHtml(flow.form[key] || "");
    const control = type === "textarea" ? `<textarea data-material-field="${key}">${value}</textarea>` : `<input type="${type}" data-material-field="${key}" value="${value}" />`;
    return `<label class="ocr-field ${low ? "low-confidence" : ""}"><span>${label} <b>*</b></span>${control}<small>${edited ? "已人工修改" : low ? `OCR 置信度 ${index === 3 ? "72" : "78"}% · 请确认` : "OCR 置信度 96%"}</small></label>`;
  }

  function renderMaterialConfirmStep(customer, flow) {
    const fields = Object.entries(flow.form).filter(([, value]) => String(value || "").trim());
    const latest = flow.pdfVersions[flow.pdfVersions.length - 1];
    const noPdf = flow.generationPath === "none";
    return `<section class="material-stage"><div class="stage-kicker">STEP 05</div><h2>${noPdf ? "确认材料并提交运营" : "确认并预览申请表"}</h2><p>${noPdf ? "本次选择不生成申请表，运营将直接审核材料目录。" : "系统会把上一步登记的基础资料、来源、用途、目的地和金额区间写入 TP 原始两页申请表。"}</p><div class="confirm-summary"><section><h3>本次处理方式</h3><div><span>申请表</span><strong>${noPdf ? "不生成" : flow.generationPath === "ocr" ? "OCR 填充生成" : "手工填写生成"}</strong></div><div><span>客户</span><strong>${escapeHtml(customer.name)}</strong></div><div><span>年度金额</span><strong>${escapeHtml(flow.form.annualAmount || "未登记")}</strong></div><div><span>单笔金额</span><strong>${escapeHtml(flow.form.perTxAmount || "未登记")}</strong></div></section><section><h3>材料目录</h3>${flow.files.filter(file => file.name).map(file => `<div><span>${file.category}</span><strong>${escapeHtml(file.name)}</strong></div>`).join("")}</section></div><label class="material-consent"><input id="material-confirmed" type="checkbox" ${flow.confirmed ? "checked" : ""} /><span><strong>我已核对资料、业务选项与材料目录</strong><small>${noPdf ? "确认可将材料直接提交运营。" : "确认表单内容准确，生成后将在弹窗中查看完整 PDF。"}</small></span></label><div class="pdf-action-bar"><button class="btn" type="button" data-material-prev>← 返回修改</button>${noPdf ? `<button class="btn btn-primary" id="material-submit-ops" ${flow.confirmed && !flow.submitted ? "" : "disabled"}>${flow.submitted ? "已提交运营" : "直接提交运营审核"}</button>` : `<button class="btn btn-primary" type="button" id="material-generate-pdf" ${flow.confirmed ? "" : "disabled"}>${latest ? "重新生成并查看 PDF" : "生成并查看 PDF"}</button>`}</div>${latest && !noPdf ? renderPdfResult(customer, flow, latest) : ""}</section>`;
  }

  function renderPdfResult(customer, flow, latest) {
    return `<div class="pdf-result"><header><div><span class="status status-success">未签署申请表已生成</span><h3>${latest.filename}</h3><p>TP 原始模板 · ${latest.version} · ${latest.generatedAt} · ${(latest.size / 1024).toFixed(0)} KB</p></div><div class="case-actions"><button class="btn" type="button" data-pdf-preview="${latest.url}" data-pdf-name="${escapeHtml(latest.filename)}">弹窗预览</button><a class="btn btn-primary" href="${latest.url}" download="${latest.filename}">下载交客户签名</a></div></header><section class="signature-return"><div><h3>回传客户签署版</h3><p>签署版将作为独立材料项留档，运营与合规均可查看。</p></div>${flow.signedPdf ? `<span class="status status-success">${escapeHtml(flow.signedPdf.name)} 已回传</span>` : ""}<label class="btn btn-primary">${flow.signedPdf ? "替换签署版" : "上传签署版"}<input id="signed-pdf-input" type="file" accept="application/pdf,.pdf" /></label></section><footer><div><strong>版本记录</strong><span>${flow.pdfVersions.map(item => `${item.version} · ${item.generatedAt}`).join("　")}</span></div><button class="btn btn-primary" id="material-submit-ops" ${flow.submitted || !flow.signedPdf ? "disabled" : ""}>${flow.submitted ? "已提交运营" : "提交运营审核"} →</button></footer></div>`;
  }

  function renderMaterialAside(customer, flow) {
    const required = materialCategories(customer).slice(0, customer.type === "企业" ? 4 : 3);
    return `<section class="section material-aside-panel"><div class="section-header"><div><h2>申报概览</h2><p>${flow.applicationId}</p></div><span class="status status-${flow.submitted ? "success" : "warning"}">${flow.submitted ? "待运营审核" : "草稿"}</span></div><div class="material-aside-body"><div class="aside-progress"><span>流程进度</span><strong>${Math.round(((flow.step - 1) / 4) * 100)}%</strong><div class="progress-track"><i style="width:${Math.round(((flow.step - 1) / 4) * 100)}%"></i></div></div><h3>必要材料</h3>${required.map(category => { const hit = flow.files.find(file => file.category === category && file.name); return `<div class="required-doc"><i>${hit ? "✓" : ""}</i><span><strong>${category}</strong><small>${hit ? hit.name : "尚未上传"}</small></span></div>`; }).join("")}<h3>自动化边界</h3><p class="aside-note">OCR 只提供字段建议。交易员 必须确认低置信度字段，PDF 才可提交运营。</p></div></section>`;
  }

  function materialCategories(customer) {
    return customer.type === "企业" ? ["公司注册文件", "董事与 UBO 名单", "董事 / 授权人身份证明", "公司地址证明", "公司银行流水", "资金来源材料", "补充材料"] : ["身份证明正面", "身份证明反面", "护照 / EEP 资料页", "手持护照 / EEP 自拍", "地址证明", "最近银行流水", "最近银行月结单", "补充材料"];
  }

  function formatFileSize(bytes) { return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`; }

  function materialDescription(category) {
    return ({ "身份证明正面": "客户身份证件正面，姓名与证件号码清晰", "身份证明反面": "客户身份证件背面或附页", "护照 / EEP 资料页": "护照或 EEP 个人资料页", "手持护照 / EEP 自拍": "客户本人手持证件合影", "地址证明": "近三个月水电账单、银行信件或政府信件", "最近银行流水": "用于资金活动与来源辅助核验", "最近银行月结单": "最近一期银行月结单", "公司注册文件": "商业登记证或公司注册证明", "董事与 UBO 名单": "董事、股东与最终受益人清单", "董事 / 授权人身份证明": "董事或授权签字人的身份证明", "公司地址证明": "公司注册地址或经营地址证明", "公司银行流水": "公司账户近期流水", "资金来源材料": "支持资金来源说明的文件", "补充材料": "可选的其他支持文件" })[category] || "支持本次申请的材料";
  }

  function materialFieldLabel(key) {
    return ({ legalName: "法定名称", englishName: "英文名称", birthDate: "出生日期", nationality: "国籍 / 地区", gender: "性别", occupation: "职业", idType: "证件类型", idNo: "证件号码", idExpiry: "证件有效期", phone: "联系电话", email: "电子邮箱", address: "居住地址", registeredAddress: "注册地址", businessAddress: "经营地址", registrationRegion: "注册地区", registrationNo: "注册编号", incorporationDate: "成立日期", fundSource: "资金来源", uboSummary: "董事与 UBO", businessType: "业务类型", expectedVolume: "预计业务量", businessPurpose: "业务说明" })[key] || key;
  }

  function renderScheduleGenerate() {
    if (state.role !== "agent") return `<div class="page">${pageHeader("SCHEDULE CENTER", "排单生成", "当前角色不能创建排单。")}<div class="empty-state"><div><i>锁</i><h2>无创建权限</h2><p>请切换至初级交易员视角创建排单。</p></div></div></div>`;
    const form = state.scheduleForm;
    const hasWorkingForm = true;
    const drafts = state.scheduleOrders.filter(item => item.status === "草稿");
    const matchedAccounts = scheduleMatchedVaAccounts(form);
    return `<div class="page schedule-page">${pageHeader("SCHEDULE CENTER", "排单生成", "粘贴客户提供的收款资料，匹配客户 VA 账户后生成完整排单。", `<button class="btn" data-view="schedulingOrders">查看已发起排单</button>`)}
      <section class="schedule-generate-layout">
        <aside class="schedule-library-column">
          <section class="section schedule-match-panel">
            <div class="section-header"><div><h2>客户与 VA 账户</h2><p>输入客户编号或名称后自动匹配</p></div></div>
            <div class="schedule-match-body">
              <label class="field"><span>客户编号 / 客户名称</span><input data-schedule-field="customerQuery" value="${escapeHtml(form.customerQuery || form.customerId || form.customerName || "")}" placeholder="例如 C-2026-0718 或 陈嘉宁" autocomplete="off" /></label>
              <div class="va-account-list">${matchedAccounts.length ? matchedAccounts.map(account => renderVaAccountOption(account, form.selectedVaAccountId)).join("") : `<div class="schedule-empty-block"><strong>暂无匹配 VA 账户</strong><span>输入客户编号或名称后显示可用账户和币种。</span></div>`}</div>
            </div>
          </section>
          <section class="section schedule-draft-panel">
            <div class="section-header"><div><h2>草稿库</h2><p>${drafts.length} 个未提交草稿</p></div></div>
            <div class="schedule-template-list">${drafts.length ? drafts.map(order => `<button class="schedule-template-row ${order.id === form.draftId ? "active" : ""}" type="button" data-schedule-load-draft="${order.id}"><strong>${escapeHtml(order.fields.orderTitle || order.id)}</strong><span>${escapeHtml(order.customerName || "未选择客户")} · ${escapeHtml(order.fields.currency || "未定币种")}</span><small>${order.updated}</small></button>`).join("") : `<div class="schedule-empty-block"><strong>暂无草稿</strong><span>保存草稿后会出现在这里。</span></div>`}</div>
          </section>
        </aside>
        <main class="form-panel schedule-form-panel">
          ${hasWorkingForm ? renderScheduleWorkForm(form) : `<div class="schedule-blank-state"><i>≣</i><h2>粘贴客户提供的排单资料</h2><p>先输入单号和客户文本，或用图片识别工具把截图内容写入文本框。左侧匹配 VA 后会补齐 Account 信息。</p><button class="btn btn-primary" type="button" id="schedule-start-blank">开始填写</button></div>`}
        </main>
        <aside class="section schedule-preview-panel">
          <div class="section-header"><div><h2>排单文案预览</h2><p>按运营可读格式生成</p></div></div>
          <pre class="schedule-preview">${escapeHtml(hasWorkingForm ? schedulePreview(form) : "填写单号、粘贴客户内容并选择 VA Account 后生成预览。")}</pre>
        </aside>
      </section>
    </div>`;
  }

  function renderVaAccountOption(account, selectedId) {
    return `<button class="va-account-option ${account.id === selectedId ? "active" : ""}" type="button" data-va-account="${account.id}"><strong>${account.label} · ${account.currency}</strong><span>${account.customerName} · ${account.customerId}</span><small>VA ${account.virtualAccountNumber} · IBAN ${account.iban}</small></button>`;
  }

  function renderScheduleWorkForm(form) {
    const selectedAccount = scheduleSelectedVaAccount();
    return `<div class="form-section-title"><h2>本次排单内容</h2><p>客户提供内容粘贴到文本框，VA Account 由左侧客户匹配自动填充。</p></div>
          <div class="schedule-compose-stack">
            <div class="field-grid">
              <label class="field"><span>单号 / 排单标题</span><input data-schedule-field="orderTitle" value="${escapeHtml(form.orderTitle || "")}" placeholder="例如：单 3-3:3072 出美" /></label>
              <label class="field"><span>期望出款日期</span><input type="date" data-schedule-field="expectedPayoutDate" value="${escapeHtml(form.expectedPayoutDate || "")}" /></label>
            </div>
            <section class="schedule-ocr-tool"><div><h3>图片识别小工具</h3><p>上传客户截图后，系统会模拟 OCR 并写入下方文本框。</p></div><label class="btn btn-primary">识别图片<input id="schedule-ocr-image" type="file" accept="image/*" /></label></section>
            <label class="field full"><span>客户提供的排单内容</span><textarea class="schedule-raw-text" data-schedule-field="rawScheduleText" placeholder="把客户发来的收款人地址、账户名称、银行、账号、Swift、金额、出款账户等内容粘贴到这里。">${escapeHtml(form.rawScheduleText || "")}</textarea></label>
            <section class="schedule-account-summary"><div class="section-header"><div><h2>已匹配 Account</h2><p>${selectedAccount ? `${selectedAccount.customerName} · ${selectedAccount.currency}` : "尚未选择 VA 账户"}</p></div></div>${selectedAccount ? `<div class="detail-grid">${detailField("Account", selectedAccount.label)}${detailField("Virtual Account Number", selectedAccount.virtualAccountNumber)}${detailField("IBAN", selectedAccount.iban)}${detailField("Currency", selectedAccount.currency)}</div>` : `<div class="schedule-empty-block"><strong>未选择 Account</strong><span>请在左侧输入客户并选择可用 VA 账户。</span></div>`}</section>
          </div>
          <div class="form-actions"><span class="field-hint">保存草稿后仍在初级交易员侧，提交后进入高级交易员排单审核。</span><div class="case-actions"><button class="btn" type="button" id="schedule-save-draft">保存草稿</button><button class="btn btn-primary" type="button" id="schedule-submit-ops">提交审核</button></div></div>`;
  }

  function renderScheduleTemplateModal() {
    const draft = state.scheduleTemplateDraft;
    return `<div class="review-launch-backdrop"><section class="schedule-template-dialog" role="dialog" aria-modal="true" aria-labelledby="schedule-template-title">
      <header><div><span>NEW TEMPLATE</span><h2 id="schedule-template-title">创建排单模板</h2><p>模板名称会显示在已提交排单表格中。</p></div><button class="icon-button" id="schedule-template-close" aria-label="关闭" type="button">×</button></header>
      <form class="schedule-template-editor" id="schedule-template-form">
        <div class="field-grid"><label class="field"><span>模板名称</span><input data-schedule-template-field="name" value="${escapeHtml(draft.name)}" placeholder="例如：美元出款标准模板" required /></label>
        <label class="field"><span>模板说明</span><input data-schedule-template-field="description" value="${escapeHtml(draft.description)}" placeholder="适用场景，便于交易员调用" /></label></div>
        <div class="schedule-template-fieldset">${scheduleFields.filter(([key]) => key !== "amount").map(([key, label, type, placeholder]) => renderScheduleTemplateInput(key, label, type, placeholder, draft.fields?.[key])).join("")}</div>
        <footer><button class="btn" type="button" id="schedule-template-cancel">取消</button><button class="btn btn-primary" type="submit">保存模板</button></footer>
      </form>
    </section></div>`;
  }

  function renderScheduleInput(key, label, type, placeholder, value = "") {
    const control = type === "textarea" ? `<textarea data-schedule-field="${key}" placeholder="${escapeHtml(placeholder)}">${escapeHtml(value)}</textarea>` : `<input data-schedule-field="${key}" value="${escapeHtml(value)}" placeholder="${escapeHtml(placeholder)}" />`;
    return `<label class="field ${type === "textarea" ? "full" : ""}"><span>${label}</span>${control}</label>`;
  }

  function renderScheduleTemplateInput(key, label, type, placeholder, value = "") {
    const control = type === "textarea" ? `<textarea data-schedule-template-field="${key}" placeholder="${escapeHtml(placeholder)}">${escapeHtml(value || "")}</textarea>` : `<input data-schedule-template-field="${key}" value="${escapeHtml(value || "")}" placeholder="${escapeHtml(placeholder)}" />`;
    return `<label class="field"><span>${label}</span>${control}</label>`;
  }

  function renderScheduleOrders() {
    if (state.role !== "agent") return `<div class="page">${pageHeader("SCHEDULE CENTER", "已发起排单", "当前角色不能查看初级交易员草稿。")}<div class="empty-state"><div><i>锁</i><h2>无查看权限</h2><p>请切换至初级交易员视角查看排单。</p></div></div></div>`;
    const rows = state.scheduleOrders;
    return `<div class="page">${pageHeader("SCHEDULE CENTER", "已发起排单", "查看初级交易员保存的草稿和已经提交审核的排单。", `<button class="btn btn-primary" data-view="schedulingGenerate">＋ 新建排单</button>`)}
      <div class="material-picker-summary four"><div><strong>${rows.length}</strong><span>全部排单</span></div><div><strong>${rows.filter(item => item.status === "草稿").length}</strong><span>草稿</span></div><div><strong>${rows.filter(item => item.status !== "草稿").length}</strong><span>已提交运营</span></div><div><strong>${initialVaAccounts().length}</strong><span>可用 VA</span></div></div>
      ${scheduleOrdersTable(rows, "agent")}</div>`;
  }

  function renderOpsScheduleCenter() {
    if (state.role !== "ops") return `<div class="page">${pageHeader("SCHEDULE CENTER", "排单审核", "当前角色不能审核排单。")}<div class="empty-state"><div><i>锁</i><h2>无处理权限</h2><p>请切换至高级交易员视角处理已提交排单。</p></div></div></div>`;
    const rows = state.scheduleOrders.filter(item => item.status !== "草稿");
    return `<div class="page">${pageHeader("SCHEDULE CENTER", "排单审核", "审核初级交易员提交的出款排单，核对账户、金额和出款账户后更新状态。")}
      <div class="material-picker-summary four"><div><strong>${rows.length}</strong><span>待处理与历史</span></div><div><strong>${rows.filter(item => item.status === "待运营处理").length}</strong><span>待运营处理</span></div><div><strong>${rows.filter(item => item.status === "处理中").length}</strong><span>处理中</span></div><div><strong>${rows.filter(item => item.status === "已排单").length}</strong><span>已排单</span></div></div>
      ${scheduleOrdersTable(rows, "ops")}</div>`;
  }

  function initialPayoutOrders(customers) {
    const byId = id => customers.find(customer => customer.id === id);
    const vaById = id => initialVaAccounts().find(account => account.id === id) || null;
    const seeds = [
      {
        id: "SCH-20260819-001", customerId: "C-2026-0588", status: "出款审核中", amount: "150,000.00", currency: "USD", channel: "SINO",
        orderTitle: "單3-1:2201出美現貨", payoutAccount: "pobo cq開-開", vaAccount: null,
        rawText: "1.Account Name (帳戶名稱): YA WEN LIN\n2.Bank Account Number (銀行帳戶號碼): 44721099128\n3.Bank Address (銀行地址): 32/F STANDARD CHARTERED BANK BUILDING, CENTRAL\n4.Account Holder's Address (收款人地址): 福建省福州市鼓楼区五四路128号\n5.Name of Bank (銀行名稱): STANDARD CHARTERED BANK (HONG KONG) LIMITED\n6.Swift Code (銀行國際代碼): SCBLHKHHXXX",
        payee: "YA WEN LIN", payeeBank: "STANDARD CHARTERED BANK (HONG KONG) LIMITED · 44721099128",
        expectedDate: "2026-08-22", note: "客户要求锁汇后当日出款", submittedBy: "杨澜", submittedAt: "今天 10:18", updated: "今天 10:18"
      },
      {
        id: "SCH-20260818-004", customerId: "C-2026-0677", status: "待出款", amount: "85,000.00", currency: "USD", channel: "SGB",
        orderTitle: "SGB單5:2810-出USD", payoutAccount: "AURORA CAPITAL SGB VA", vaAccount: vaById("VA-0677-USD-1"),
        rawText: "收款銀行帳戶訊息\n收款人地址：新加坡滨海湾金融中心一座 25-01\n賬戶名稱：AURORA CAPITAL PTE. LTD.\n收款銀行名稱：DBS BANK LTD SINGAPORE\n收款人開戶國家/地區：SINGAPORE\n賬戶號碼：0729210105\nSwift Code/BIC 代碼：DBSSSGSGXXX",
        payee: "AURORA CAPITAL PTE. LTD.", payeeBank: "DBS BANK LTD SINGAPORE · 0729210105",
        expectedDate: "2026-08-21", note: "加急批次 · 锁定汇率 7.235", submittedBy: "陈浩", submittedAt: "昨天 16:02", reviewedBy: "陈文静", reviewedAt: "昨天 17:30", updated: "昨天 17:30"
      },
      {
        id: "SCH-20260817-002", customerId: "C-2026-0628", status: "已出款", amount: "220,000.00", currency: "USD", channel: "SGB",
        orderTitle: "SGB單4:2796-出USD", payoutAccount: "WAN QING LI SGB VA", vaAccount: vaById("VA-0628-USD-1"),
        rawText: "收款銀行帳戶訊息\n收款人地址：香港九龍觀塘道 388 號創紀之城一期 12 樓\n賬戶名稱：WAN QING LI\n收款銀行名稱：CHINA CONSTRUCTION BANK(ASIA) CORPORATION LIMITED HONG KONG\n收款人開戶國家/地區：HONG KONG\n賬戶號碼：000404556065\nSwift Code/BIC 代碼：CCBQHKAXXXX",
        payee: "WAN QING LI", payeeBank: "CHINA CONSTRUCTION BANK(ASIA) CORPORATION LIMITED HONG KONG · 000404556065",
        expectedDate: "2026-08-19", note: "常规批次", submittedBy: "周辰", submittedAt: "08-17 11:24", reviewedBy: "陈文静", reviewedAt: "08-17 14:05", paidBy: "何嘉敏", paidAt: "08-18 10:26", updated: "08-18 10:26",
        receipt: { fileName: "SGB-回单-20260818.pdf", fileUrl: "assets/trustpass-stage1-template.pdf", reference: "PAY-20260817-002", note: "SGB 企业网银出款回单", uploadedBy: "何嘉敏", uploadedAt: "08-18 10:26" }
      }
    ];
    const orders = seeds.filter(seed => byId(seed.customerId)).map(seed => {
      const customer = byId(seed.customerId);
      return { clientNo: customer.clientNo || "无编号", customerName: customer.name, personName: customer.enName || customer.name, complianceStatus: "合规审核通过", ...seed };
    });
    const seededIds = new Set(orders.map(order => order.customerId));
    customers.filter(customer => customer.status === "已排单" && !seededIds.has(customer.id)).forEach((customer, index) => {
      const sgb = customer.business === "SGB";
      orders.push({ id: `SCH-20260820-R${String(index + 1).padStart(2, "0")}`, customerId: customer.id, clientNo: customer.clientNo || "无编号", customerName: customer.name, personName: customer.enName || customer.name, complianceStatus: "合规审核通过", status: "出款审核中", amount: "50,000.00", currency: "USD", channel: sgb ? "SGB" : "SINO", orderTitle: `補單:${customer.clientNo || customer.id}`, payoutAccount: sgb ? `${customer.enName || customer.name} SGB VA` : "pobo cq開-開", vaAccount: initialVaAccounts().find(account => account.customerId === customer.id) || null, rawText: "", payee: customer.enName || customer.name, payeeBank: "待补充", expectedDate: "", note: "历史排单，等待出款审核", submittedBy: customer.agent || "杨澜", submittedAt: customer.updated || "昨天", updated: customer.updated || "昨天" });
    });
    return orders;
  }

  function dispatchNowLabel() {
    const current = new Date();
    const pad = value => String(value).padStart(2, "0");
    return `今天 ${pad(current.getHours())}:${pad(current.getMinutes())}`;
  }

  function dispatchPendingCustomers() {
    const ordered = new Set(state.payoutOrders.map(order => order.customerId).filter(Boolean));
    return state.customers.filter(customer => customer.status === "审核通过" && !ordered.has(customer.id));
  }

  function dispatchVaAccountsForCustomer(customer) {
    if (!customer) return [];
    const name = String(customer.name || "").toLowerCase();
    return initialVaAccounts().filter(account => account.customerId === customer.id || account.customerName.toLowerCase() === name);
  }

  function compactDispatchAmount(value) {
    const amount = Number(String(value || "").replace(/[,，\s]/g, ""));
    if (!Number.isFinite(amount) || amount <= 0) return String(value || "").trim() || "未填写金额";
    return amount.toLocaleString("en-US", { minimumFractionDigits: Number.isInteger(amount) ? 0 : 2, maximumFractionDigits: 2 });
  }

  function composeDispatchText(data) {
    const amount = compactDispatchAmount(data.amount);
    const rawText = String(data.rawText || "").trim();
    if (data.channel === "SGB") {
      const va = data.vaAccount;
      return `* sgb（渠道2）

${data.orderTitle || "未填写单号"}

${rawText || "（待粘贴客户提供的收款银行账户信息）"}

金額：${amount} ${String(data.currency || "").toLowerCase()}
出款帳戶：${data.payoutAccount || "未填写出款账户"}
Account 1：
Virtual Account Number：${va?.virtualAccountNumber || "未匹配 VA"}
IBAN：${va?.iban || "未匹配 VA"}
Currency：${va?.currency || data.currency || ""}`;
    }
    return `* sino(渠道1) pobo

${data.orderTitle || "未填写单号"}
${rawText || "（待粘贴客户提供的收款账户资料）"}

金額: ${data.currency || ""}${amount}
出款賬戶: ${data.payoutAccount || "未填写出款账户"}`;
  }

  function parseDispatchRaw(text) {
    const source = String(text || "");
    const find = patterns => {
      for (const pattern of patterns) {
        const match = source.match(pattern);
        if (match) return match[1].trim();
      }
      return "";
    };
    return {
      payee: find([/Account Name[^:：]*[:：]\s*(.+)/i, /[账賬][户戶]名[称稱][^:：]*[:：]\s*(.+)/]),
      bankName: find([/Name of Bank[^:：]*[:：]\s*(.+)/i, /收款[银銀]行名[称稱][^:：]*[:：]\s*(.+)/, /[银銀]行名[称稱][^:：]*[:：]\s*(.+)/]),
      accountNumber: find([/Bank Account Number[^:：]*[:：]\s*(.+)/i, /[账賬][户戶][号號][码碼][^:：]*[:：]\s*(.+)/, /[账賬][号號][^:：]*[:：]\s*(.+)/]),
      swift: find([/Swift Code[^:：]*[:：]\s*(.+)/i])
    };
  }

  function dispatchOcrSample(channel, customer) {
    const person = customer ? (customer.enName || customer.name).toUpperCase() : "XIA HAOJING";
    if (channel === "SGB") return `收款銀行帳戶訊息
收款人地址：厦门市思明区海峡明珠广场1506
賬戶名稱：${person}
收款銀行名稱：CHINA CONSTRUCTION BANK(ASIA) CORPORATION LIMITED HONG KONG
收款人開戶國家/地區：HONG KONG
賬戶號碼：000404556065
Swift Code/BIC 代碼：CCBQHKAXXXX`;
    return `1.Account Name (帳戶名稱): ${person}
2.Bank Account Number (銀行帳戶號碼): 01235120383023
3.Bank Address (銀行地址): FLOOR 14, BANK OF CHINA TOWER
4.Account Holder's Address (收款人地址): 东莞市高埗镇新世纪颐龙湾五期407幢6楼1単元
5.Name of Bank (銀行名稱): BANK OF CHINA (HONG KONG) LIMITED
6.Swift Code (銀行國際代碼): BKCHHKHHXXX`;
  }

  function dispatchRows() {
    const pending = dispatchPendingCustomers().map(customer => ({
      orderId: "",
      customerId: customer.id,
      clientNo: customer.clientNo || "无编号",
      customerName: customer.name,
      personName: customer.enName || customer.name,
      complianceStatus: "合规审核通过",
      status: "待排单",
      updated: customer.updated || ""
    }));
    const rank = { "待排单": 0, "出款审核中": 1, "待出款": 2, "已出款": 3 };
    return [...pending, ...state.payoutOrders.map(order => ({ ...order, orderId: order.id }))].sort((a, b) => (rank[a.status] ?? 9) - (rank[b.status] ?? 9));
  }

  function dispatchStatusHint(row) {
    if (row.status === "待排单") return "等待发起排单";
    if (row.status === "出款审核中") return `已提交 ${row.submittedAt || ""} · 等待高级交易员审核`;
    if (row.status === "待出款") return `审核通过 ${row.reviewedAt || ""} · 等待出款员出款`;
    if (row.status === "已出款") return `${row.paidAt || ""} 出款完成`;
    return "";
  }

  function dispatchRowAction(row) {
    if (row.status === "待排单") return `<button class="payout-action blue" type="button" data-dispatch-open="${row.customerId}">发起排单</button><small>填写金额与收款账户</small>`;
    if (row.status === "出款审核中") return `<button class="btn btn-sm" type="button" data-dispatch-view="${row.orderId}">查看排单</button><small>等待高级交易员审核</small>`;
    if (row.status === "待出款") return `<button class="btn btn-sm" type="button" data-dispatch-view="${row.orderId}">查看排单</button><small>等待出款员出款</small>`;
    return `<button class="btn btn-sm" type="button" data-dispatch-view="${row.orderId}">查看排单</button><small>已出款 · ${escapeHtml(row.paidAt || "")}</small>`;
  }

  function renderPayoutDispatchCenter() {
    if (state.role !== "agent") return `<div class="page">${pageHeader("SCHEDULE CENTER", "排单中心", "当前角色不能处理排单。")}<div class="empty-state"><div><i>锁</i><h2>无处理权限</h2><p>请切换至初级交易员视角查看待排单客户。</p></div></div></div>`;
    const rows = dispatchRows();
    const keyword = String(state.dispatchSearch || "").trim().toLowerCase();
    const filtered = keyword ? rows.filter(row => `${row.clientNo} ${row.customerId} ${row.customerName} ${row.personName} ${row.orderId}`.toLowerCase().includes(keyword)) : rows;
    const count = status => rows.filter(row => row.status === status).length;
    return `<div class="page payout-workbench">
      ${pageHeader("SCHEDULE CENTER", "排单中心", "客户合规审核通过后自动进入待排单队列；完成排单进入出款审核，高级交易员通过后转为待出款。", `<button class="btn btn-primary" id="dispatch-new" type="button">＋ 新增排单</button>`)}
      ${payoutMetricGrid([
        payoutMetric("待排单客户", String(count("待排单")), "位", "", "当前队列", "合规审核通过后自动进入"),
        payoutMetric("出款审核中", String(count("出款审核中")), "笔", "blue", "已完成排单", "等待高级交易员复核"),
        payoutMetric("待出款", String(count("待出款")), "笔", "orange", "审核已通过", "等待出款员执行打款"),
        payoutMetric("已出款", String(count("已出款")), "笔", "green", "流程完成", "回单归档后关闭")
      ])}
      <section class="payout-queue-card">
        <header class="payout-queue-head"><div><i class="payout-head-icon blue">≣</i><div><h2>排单队列</h2><p>合规审核通过的客户展示为待排单，完成排单后按状态推进。</p></div></div><label class="payout-search"><input id="dispatch-search" placeholder="搜索客户编号 / 名称 / 姓名..." value="${escapeHtml(state.dispatchSearch || "")}" /></label></header>
        <div class="payout-grid payout-grid-dispatch payout-grid-head"><span>客户编号</span><span>客户名称</span><span>客户姓名</span><span>合规状态</span><span>排单状态</span><span>排单处理</span></div>
        ${filtered.length ? filtered.map(row => `<article class="payout-grid payout-grid-dispatch payout-row">
          <div class="payout-primary"><strong class="mono">${escapeHtml(row.clientNo)}</strong><small>${escapeHtml(row.customerId || "")}</small></div>
          <div><strong>${escapeHtml(row.customerName)}</strong>${row.orderId ? `<small>${escapeHtml(row.orderTitle || row.orderId)} · ${escapeHtml(`${row.currency} ${row.amount}`)}</small>` : `<small>更新于 ${escapeHtml(row.updated || "刚刚")}</small>`}</div>
          <div><strong>${escapeHtml(row.personName)}</strong><small>证件登记姓名</small></div>
          <div><span class="payout-check">${escapeHtml(row.complianceStatus)}</span></div>
          <div><span class="status status-${statusTone(row.status)}">${row.status}</span><small>${escapeHtml(dispatchStatusHint(row))}</small></div>
          <div class="payout-action-cell">${dispatchRowAction(row)}</div>
        </article>`).join("") : `<div class="empty-state dispatch-empty"><div><i>≣</i><h2>暂无排单队列</h2><p>${keyword ? "没有匹配的客户，试试其他关键词。" : "客户合规审核通过后会自动出现在这里。"}</p></div></div>`}
      </section>
    </div>`;
  }

  function renderPayoutAuditCenter() {
    if (state.role !== "ops") return `<div class="page">${pageHeader("PAYOUT RISK AUDIT", "出款审核", "当前角色不能复核出款排单。")}<div class="empty-state"><div><i>锁</i><h2>无审核权限</h2><p>请切换至高级交易员视角处理出款审核。</p></div></div></div>`;
    const pending = state.payoutOrders.filter(order => order.status === "出款审核中");
    const approved = state.payoutOrders.filter(order => order.status === "待出款");
    const paid = state.payoutOrders.filter(order => order.status === "已出款");
    const history = [...approved, ...paid];
    const activeTab = state.auditTab === "done" ? "done" : "pending";
    return `<div class="page payout-workbench">
      ${pageHeader("PAYOUT RISK AUDIT", "出款审核", "复核初级交易员完成的排单，核对客户、金额与收款账户；审核通过后转入出款员待出款队列。")}
      ${payoutMetricGrid([
        payoutMetric("待出款审核", String(pending.length), "笔", "orange", "交易员已排单", "按提交时间处理"),
        payoutMetric("审核通过待出款", String(approved.length), "笔", "blue", "已转出款员", "等待网银执行"),
        payoutMetric("已出款", String(paid.length), "笔", "green", "流程完成", "回单已归档")
      ], "three")}
      <div class="compliance-tabs" role="tablist" aria-label="出款审核队列">
        <button type="button" class="${activeTab === "pending" ? "active" : ""}" data-audit-tab="pending" role="tab" aria-selected="${activeTab === "pending"}">待审核（${pending.length}）</button>
        <button type="button" class="${activeTab === "done" ? "active" : ""}" data-audit-tab="done" role="tab" aria-selected="${activeTab === "done"}">已审核（${history.length}）</button>
      </div>
      ${activeTab === "pending" ? `<section class="payout-queue-card">
        <header class="payout-queue-head"><div><i class="payout-head-icon amber">♙</i><div><h2>交易员排单完成：待出款审核</h2><p>审核通过后状态变为待出款，退回则客户回到待排单。</p></div></div></header>
        <div class="payout-grid payout-grid-audit payout-grid-head"><span>排单编号 / 客户编号</span><span>客户名称 / 姓名</span><span>出款金额 / 通道</span><span>收款账户</span><span>审核处理</span></div>
        ${pending.length ? pending.map(order => `<article class="payout-grid payout-grid-audit payout-row">
          <div class="payout-primary"><strong class="mono">${order.id}</strong><small>${escapeHtml(order.orderTitle || "")} · ${escapeHtml(order.submittedAt || "")}</small></div>
          <div><strong>${escapeHtml(order.customerName)}</strong><small>${escapeHtml(order.personName)} · 客户编号 ${escapeHtml(order.clientNo)} · 排单人 ${escapeHtml(order.submittedBy || "")}</small></div>
          <div class="payout-amount"><strong>${escapeHtml(`${order.currency} ${order.amount}`)}</strong><span class="payout-route ${order.channel === "SGB" ? "sgb" : "sino"}">${escapeHtml(order.channel)} 通道</span></div>
          <div><strong>${escapeHtml(order.payee)}</strong><small>${escapeHtml(order.payeeBank || "見排单文案")}</small><button class="link-button" type="button" data-dispatch-view="${order.id}">查看排单文案 →</button></div>
          <div class="payout-action-cell"><button class="payout-action amber" type="button" data-dispatch-approve="${order.id}">审核通过</button><button class="btn btn-sm" type="button" data-dispatch-return="${order.id}">退回重排</button></div>
        </article>`).join("") : `<div class="empty-state dispatch-empty"><div><i>♙</i><h2>暂无待审核排单</h2><p>初级交易员完成排单后会出现在这里。</p></div></div>`}
      </section>` : `<section class="payout-queue-card">
        <header class="payout-queue-head"><div><i class="payout-head-icon green">▣</i><div><h2>已审核记录</h2><p>审核通过的排单由出款员执行，出款完成后标记已出款。</p></div></div></header>
        <div class="payout-grid payout-grid-audit payout-grid-head"><span>排单编号 / 客户编号</span><span>客户名称 / 姓名</span><span>出款金额 / 通道</span><span>审核信息</span><span>当前状态</span></div>
        ${history.length ? history.map(order => `<article class="payout-grid payout-grid-audit payout-row">
          <div class="payout-primary"><strong class="mono">${order.id}</strong><small>${escapeHtml(order.orderTitle || "")} · 客户编号 ${escapeHtml(order.clientNo)}</small><button class="link-button" type="button" data-dispatch-view="${order.id}">查看文案 →</button></div>
          <div><strong>${escapeHtml(order.customerName)}</strong><small>${escapeHtml(order.personName)}</small></div>
          <div class="payout-amount"><strong>${escapeHtml(`${order.currency} ${order.amount}`)}</strong><small>${escapeHtml(order.channel)} 通道</small></div>
          <div><span class="payout-check">审核通过</span><small class="payout-note">${escapeHtml(`${order.reviewedBy || ""} · ${order.reviewedAt || ""}`)}</small></div>
          <div><span class="status status-${statusTone(order.status)}">${order.status}</span><small>${escapeHtml(order.status === "已出款" ? `${order.paidBy || ""} · ${order.paidAt || ""}` : "等待出款员执行")}</small></div>
        </article>`).join("") : `<div class="empty-state dispatch-empty"><div><i>▣</i><h2>暂无已审核记录</h2><p>审核通过或已出款的排单会出现在这里。</p></div></div>`}
      </section>`}
    </div>`;
  }

  function renderPayoutOperations() {
    const queue = state.payoutOrders.filter(order => order.status === "待出款");
    const paid = state.payoutOrders.filter(order => order.status === "已出款");
    return `<div class="page payout-workbench">
      ${pageHeader("PAYOUT OPERATIONS", "出款处理队列", "高级交易员审核通过的排单进入待出款；完成网银打款后在此标记已出款。")}
      ${payoutMetricGrid([
        payoutMetric("待出款", String(queue.length), "笔", "green", "审核已通过", "等待执行打款"),
        payoutMetric("已出款", String(paid.length), "笔", "blue", "含回单归档", paid.length ? `最近完成 ${paid[0].paidAt || ""}` : "暂无记录"),
        payoutMetric("出款审核中", String(state.payoutOrders.filter(order => order.status === "出款审核中").length), "笔", "orange", "上游进行中", "高级交易员复核中"),
        `<article class="payout-metric-card payout-bank-card"><span>快捷网银入口</span><div class="payout-bank-links"><button type="button"><strong>↗ SGB</strong><small>企业网银</small></button><button type="button"><strong>↗ SINO</strong><small>清算网银</small></button></div></article>`
      ])}
      <div class="compliance-tabs" role="tablist" aria-label="出款处理队列">
        <button type="button" class="${state.payoutOpsTab === "paid" ? "" : "active"}" data-payout-tab="queue" role="tab" aria-selected="${state.payoutOpsTab !== "paid"}">待出款（${queue.length}）</button>
        <button type="button" class="${state.payoutOpsTab === "paid" ? "active" : ""}" data-payout-tab="paid" role="tab" aria-selected="${state.payoutOpsTab === "paid"}">已出款（${paid.length}）</button>
      </div>
      ${state.payoutOpsTab !== "paid" ? `<section class="payout-queue-card">
        <header class="payout-queue-head"><div><i class="payout-head-icon green">▣</i><div><h2>审核通过待出款：外部系统出款与标记回传</h2><p>提取账户要素，完成网银打款后标记已出款并上传水单。</p></div></div></header>
        <div class="payout-grid payout-grid-operations payout-grid-head"><span>排单编号 / 通道</span><span>出款金额 / 客户</span><span>收款账户</span><span>审核员意见</span><span>执行打款</span></div>
        ${queue.length ? queue.map(order => `<article class="payout-grid payout-grid-operations payout-row">
          <div class="payout-primary"><strong class="mono">${order.id}</strong><span class="payout-route ${order.channel === "SGB" ? "sgb" : "sino"}">通道：${escapeHtml(order.channel)}</span><small>${escapeHtml(order.orderTitle || "")}${order.expectedDate ? ` · 期望出款 ${escapeHtml(order.expectedDate)}` : ""}</small></div>
          <div class="payout-amount"><strong class="payout-green-text">${escapeHtml(`${order.currency} ${order.amount}`)}</strong><small>${escapeHtml(order.customerName)} · ${escapeHtml(order.clientNo)}</small></div>
          <div><strong>${escapeHtml(order.payee)}</strong><small>${escapeHtml(order.payeeBank || "見排单文案")}</small><button class="link-button" type="button" data-dispatch-view="${order.id}">查看排单文案 →</button></div>
          <div><span class="payout-check large">出款审核通过</span><small class="payout-note">审核员：${escapeHtml(order.reviewedBy || "")} · ${escapeHtml(order.reviewedAt || "")}</small></div>
          <div class="payout-action-cell"><button class="payout-action green" type="button" data-dispatch-paid="${order.id}">标记已出款</button><small>提交水单后完成归档</small></div>
        </article>`).join("") : `<div class="empty-state dispatch-empty"><div><i>▣</i><h2>暂无待出款排单</h2><p>高级交易员审核通过后会出现在这里。</p></div></div>`}
      </section>` : `<section class="payout-queue-card">
        <header class="payout-queue-head"><div><i class="payout-head-icon blue">◷</i><div><h2>已出款记录</h2><p>已完成打款并归档水单的排单，水单同步到客户详情。</p></div></div></header>
        <div class="payout-grid payout-grid-operations payout-grid-head"><span>排单编号 / 通道</span><span>出款金额 / 客户</span><span>收款账户</span><span>出款信息 / 水单</span><span>状态</span></div>
        ${paid.length ? paid.map(order => `<article class="payout-grid payout-grid-operations payout-row">
          <div class="payout-primary"><strong class="mono">${order.id}</strong><span class="payout-route ${order.channel === "SGB" ? "sgb" : "sino"}">通道：${escapeHtml(order.channel)}</span><button class="link-button" type="button" data-dispatch-view="${order.id}">查看文案 →</button></div>
          <div class="payout-amount"><strong>${escapeHtml(`${order.currency} ${order.amount}`)}</strong><small>${escapeHtml(order.customerName)} · ${escapeHtml(order.clientNo)}</small></div>
          <div><strong>${escapeHtml(order.payee)}</strong><small>${escapeHtml(order.payeeBank || "")}</small></div>
          <div><strong>${escapeHtml(order.paidBy || "")} · ${escapeHtml(order.paidAt || "")}</strong><small>${order.receipt ? `水单：${escapeHtml(order.receipt.fileName || "手工登记")}${order.receipt.reference ? ` · ${escapeHtml(order.receipt.reference)}` : ""}` : "水单待补"}</small>${order.receipt?.fileUrl ? `<button class="link-button" type="button" data-pdf-preview="${order.receipt.fileUrl}" data-pdf-name="${escapeHtml(order.receipt.fileName || order.id)}">预览水单 →</button>` : ""}</div>
          <div><span class="status status-${statusTone(order.status)}">${order.status}</span></div>
        </article>`).join("") : `<div class="empty-state dispatch-empty"><div><i>◷</i><h2>暂无已出款记录</h2><p>标记已出款并归档水单后会出现在这里。</p></div></div>`}
      </section>`}
    </div>`;
  }

  function renderDispatchModal() {
    const root = $("#dispatch-modal-root");
    if (!root) return;
    if (!state.dispatchModal) {
      if (state.payoutReceiptModal) { renderPayoutReceiptModal(root); return; }
      if (state.dispatchViewOrder) { renderDispatchViewModal(root); return; }
      const hadModal = root.innerHTML.trim();
      root.innerHTML = "";
      if (hadModal && !$("#customer-modal-root")?.innerHTML && !$("#pdf-modal-root")?.innerHTML && !$("#material-order-modal-root")?.innerHTML) document.body.classList.remove("modal-open");
      return;
    }
    const modal = state.dispatchModal;
    const candidates = dispatchPendingCustomers();
    const selected = state.customers.find(customer => customer.id === modal.customerId);
    const isSgb = modal.fields.channel === "SGB";
    const vaAccounts = isSgb ? dispatchVaAccountsForCustomer(selected) : [];
    const selectedVa = vaAccounts.find(account => account.id === modal.vaAccountId) || null;
    root.innerHTML = `<div class="review-launch-backdrop" id="dispatch-backdrop"><section class="schedule-template-dialog dispatch-dialog" role="dialog" aria-modal="true" aria-labelledby="dispatch-modal-title">
      <header><div><span>NEW DISPATCH</span><h2 id="dispatch-modal-title">新增排单</h2><p>中间的收款账户资料由客户提供（粘贴或图片识别），交易员补充单号、金额和出款账户；SGB 渠道按客户自动匹配内部 VA 账户。</p></div><button class="icon-button" id="dispatch-modal-close" aria-label="关闭" type="button">×</button></header>
      <form class="schedule-template-editor" id="dispatch-form">
        <div class="dispatch-modal-layout">
          <div class="dispatch-form-column">
            <div class="field-grid">
              <label class="field"><span>客户（仅显示待排单客户）</span><select id="dispatch-customer">${candidates.length ? candidates.map(customer => `<option value="${customer.id}" ${customer.id === modal.customerId ? "selected" : ""}>${escapeHtml(`${customer.clientNo || "无编号"} · ${customer.name}`)}</option>`).join("") : `<option value="">暂无合规审核通过的客户</option>`}</select></label>
              <label class="field"><span>单号 / 排单标题 *</span><input data-dispatch-field="orderTitle" value="${escapeHtml(modal.fields.orderTitle)}" placeholder="${isSgb ? "例如：SGB單6:2824-出USD" : "例如：單2-2:2156出美現貨"}" /></label>
            </div>
            <div class="field full"><span class="dispatch-field-label">出款通道</span><div class="type-options dispatch-channel-options">
              <label class="type-option"><input type="radio" name="dispatch-channel" value="SINO" ${!isSgb ? "checked" : ""} /><strong>SINO（渠道1 · pobo）</strong><span>出款账户手动填写，如 pobo cq開-開</span></label>
              <label class="type-option"><input type="radio" name="dispatch-channel" value="SGB" ${isSgb ? "checked" : ""} /><strong>SGB（渠道2）</strong><span>按客户名称自动匹配内部 VA 账户</span></label>
            </div></div>
            <section class="schedule-ocr-tool"><div><h3>客户提供的收款账户资料 *</h3><p>直接粘贴客户发来的文本，或上传截图模拟 OCR 识别写入。</p></div><label class="btn">识别图片<input id="dispatch-ocr-image" type="file" accept="image/*" /></label></section>
            <label class="field full"><textarea class="schedule-raw-text dispatch-raw-text" data-dispatch-field="rawText" placeholder="${isSgb ? "粘贴客户提供的收款銀行帳戶訊息：收款人地址、賬戶名稱、收款銀行名稱、賬戶號碼、Swift Code…" : "粘贴客户提供的 Account Name、Bank Account Number、Bank Address、Name of Bank、Swift Code…"}">${escapeHtml(modal.fields.rawText)}</textarea></label>
            ${isSgb ? `<section class="dispatch-va-panel"><div class="section-header"><div><h2>VA 账户自动匹配</h2><p>${selected ? `按客户「${escapeHtml(selected.name)}」查询内部数据库` : "选择客户后自动查询"}</p></div></div>${vaAccounts.length ? `<div class="dispatch-va-list">${vaAccounts.map(account => `<button class="va-account-option ${account.id === modal.vaAccountId ? "active" : ""}" type="button" data-dispatch-va="${account.id}"><strong>${account.label} · ${account.currency}</strong><span>Virtual Account Number：${account.virtualAccountNumber}</span><small>IBAN：${account.iban} · ${account.bank}</small></button>`).join("")}</div>` : `<div class="schedule-empty-block"><strong>内部数据库未找到该客户的 VA 账户</strong><span>SGB 渠道排单需要先在内部系统登记 VA 账户。</span></div>`}</section>` : ""}
            <div class="field-grid">
              <label class="field"><span>金额 *</span><input data-dispatch-field="amount" inputmode="decimal" value="${escapeHtml(modal.fields.amount)}" placeholder="${isSgb ? "例如 4925" : "例如 79330"}" /></label>
              <label class="field"><span>币种</span><select data-dispatch-field="currency">${["USD", "HKD", "CNY", "EUR", "SGD"].map(code => `<option ${modal.fields.currency === code ? "selected" : ""}>${code}</option>`).join("")}</select></label>
              <label class="field"><span>出款账户 *</span><input data-dispatch-field="payoutAccount" value="${escapeHtml(modal.fields.payoutAccount)}" placeholder="${isSgb ? "匹配 VA 后自动填充，如 ZHONG YONGBIN SGB VA" : "例如：pobo cq開-開"}" /></label>
              <label class="field"><span>期望出款日期</span><input type="date" data-dispatch-field="expectedDate" value="${escapeHtml(modal.fields.expectedDate)}" /></label>
              <label class="field full"><span>排单备注</span><input data-dispatch-field="note" value="${escapeHtml(modal.fields.note)}" placeholder="汇率、批次或其他需要出款审核关注的说明" /></label>
            </div>
            ${modal.error ? `<div class="form-error">${escapeHtml(modal.error)}</div>` : ""}
          </div>
          <aside class="dispatch-preview-column">
            <div class="section-header"><div><h2>排单文案预览</h2><p>提交后按此文案进入出款审核</p></div></div>
            <pre class="schedule-preview dispatch-preview" id="dispatch-preview">${escapeHtml(composeDispatchText(dispatchModalDraft(selectedVa)))}</pre>
            ${selected ? `<div class="dispatch-customer-brief"><span class="payout-check">合规审核通过</span><small>${escapeHtml(`${selected.clientNo || "无编号"} · ${selected.name} · ${selected.enName || selected.name}`)}</small></div>` : ""}
          </aside>
        </div>
        <footer><button class="btn" type="button" id="dispatch-cancel">取消</button><button class="btn btn-primary" type="submit" ${selected ? "" : "disabled"}>提交排单</button></footer>
      </form>
    </section></div>`;
    document.body.classList.add("modal-open");
    bindDispatchModalEvents();
  }

  function dispatchModalDraft(selectedVa) {
    const modal = state.dispatchModal;
    return { channel: modal.fields.channel, orderTitle: modal.fields.orderTitle, rawText: modal.fields.rawText, amount: modal.fields.amount, currency: modal.fields.currency, payoutAccount: modal.fields.payoutAccount, vaAccount: selectedVa ?? dispatchVaAccountsForCustomer(state.customers.find(customer => customer.id === modal.customerId)).find(account => account.id === modal.vaAccountId) ?? null };
  }

  function refreshDispatchPreview() {
    const preview = $("#dispatch-preview");
    if (preview && state.dispatchModal) preview.textContent = composeDispatchText(dispatchModalDraft());
  }

  function renderDispatchViewModal(root) {
    const order = state.payoutOrders.find(item => item.id === state.dispatchViewOrder);
    if (!order) { state.dispatchViewOrder = null; renderDispatchModal(); return; }
    const metaFields = [
      ["出款通道", `${order.channel} ${order.channel === "SGB" ? "（渠道2）" : "（渠道1 · pobo）"}`],
      ["金额", `${order.currency} ${order.amount}`],
      ["出款账户", order.payoutAccount || "—"],
      ["期望出款日期", order.expectedDate || "未指定"],
      ["排单人", `${order.submittedBy || ""} · ${order.submittedAt || ""}`],
      ["出款审核", order.reviewedBy ? `${order.reviewedBy} · ${order.reviewedAt}` : "待高级交易员处理"],
      ["出款执行", order.status === "已出款" ? `${order.paidBy || ""} · ${order.paidAt || ""}` : order.status === "待出款" ? "待出款员处理" : "未开始"]
    ];
    root.innerHTML = `<div class="review-launch-backdrop" id="dispatch-view-backdrop"><section class="schedule-template-dialog dispatch-dialog dispatch-view-dialog" role="dialog" aria-modal="true" aria-labelledby="dispatch-view-title">
      <header><div><span>DISPATCH ORDER</span><h2 id="dispatch-view-title">${order.id} · ${escapeHtml(order.orderTitle || "排单文案")}</h2><p>${escapeHtml(`${order.customerName}（${order.clientNo}） · ${order.personName}`)} · <span class="status status-${statusTone(order.status)}">${order.status}</span></p></div><button class="icon-button" id="dispatch-view-close" aria-label="关闭" type="button">×</button></header>
      <div class="dispatch-view-wrap">
        <div class="dispatch-view-body">
          <pre class="schedule-preview dispatch-view-text">${escapeHtml(composeDispatchText(order))}</pre>
          <aside class="dispatch-view-meta">
            <div class="section-header"><div><h2>处理轨迹</h2><p>排单 → 出款审核 → 出款执行</p></div></div>
            <div class="detail-grid">${metaFields.map(([label, value]) => detailField(escapeHtml(label), escapeHtml(value))).join("")}</div>
            ${order.receipt ? `<section class="dispatch-receipt-block"><div class="section-header"><div><h2>出款水单</h2><p>已同步到客户详情档案</p></div></div><div class="document-row"><span class="doc-icon">单</span><div><strong>${escapeHtml(order.receipt.fileName || "手工登记")}</strong><small>${escapeHtml(`${order.receipt.reference || ""}${order.receipt.reference ? " · " : ""}${order.receipt.uploadedBy || ""} · ${order.receipt.uploadedAt || ""}`)}</small></div>${order.receipt.fileUrl ? `<div class="document-actions"><button class="btn btn-sm" type="button" data-pdf-preview="${order.receipt.fileUrl}" data-pdf-name="${escapeHtml(order.receipt.fileName || order.id)}">预览</button><a class="btn btn-sm" href="${order.receipt.fileUrl}" download="${escapeHtml(order.receipt.fileName || order.id)}">下载</a></div>` : ""}</div></section>` : ""}
            ${order.note ? `<p class="application-note">排单备注：${escapeHtml(order.note)}</p>` : ""}
          </aside>
        </div>
        <footer><button class="btn" type="button" id="dispatch-view-close-btn">关闭</button><button class="btn btn-primary" type="button" id="dispatch-view-copy">复制文案</button></footer>
      </div>
    </section></div>`;
    document.body.classList.add("modal-open");
    const close = () => { state.dispatchViewOrder = null; renderDispatchModal(); };
    $("#dispatch-view-close")?.addEventListener("click", close);
    $("#dispatch-view-close-btn")?.addEventListener("click", close);
    $("#dispatch-view-backdrop")?.addEventListener("click", event => { if (event.target === event.currentTarget) close(); });
    $("#dispatch-view-copy")?.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(composeDispatchText(order));
        toast("排单文案已复制", `${order.id} 可直接粘贴发送`);
      } catch {
        toast("复制失败", "当前浏览器不支持自动复制，请手动选择文本复制");
      }
    });
    $$('[data-pdf-preview]', root).forEach(el => el.addEventListener("click", () => openPdfPreview(el.dataset.pdfPreview, el.dataset.pdfName)));
  }

  function renderPayoutReceiptModal(root) {
    const modal = state.payoutReceiptModal;
    const order = state.payoutOrders.find(item => item.id === modal.orderId);
    if (!order) { state.payoutReceiptModal = null; renderDispatchModal(); return; }
    root.innerHTML = `<div class="review-launch-backdrop" id="receipt-backdrop"><section class="schedule-template-dialog payout-receipt-dialog" role="dialog" aria-modal="true" aria-labelledby="receipt-modal-title">
      <header><div><span>MARK PAID</span><h2 id="receipt-modal-title">标记已出款 · 归档水单</h2><p>确认网银打款完成后提交出款水单，水单会同步到客户详情档案。</p></div><button class="icon-button" id="receipt-modal-close" aria-label="关闭" type="button">×</button></header>
      <form class="schedule-template-editor" id="receipt-form">
        <section class="schedule-account-summary"><div class="section-header"><div><h2>${order.id}</h2><p>${escapeHtml(order.orderTitle || "")}</p></div></div><div class="detail-grid">${detailField("客户", escapeHtml(`${order.customerName}（${order.clientNo}）`))}${detailField("出款金额", escapeHtml(`${order.currency} ${order.amount}`))}${detailField("收款账户", escapeHtml(order.payee))}${detailField("出款通道", escapeHtml(order.channel))}</div></section>
        <section class="schedule-ocr-tool"><div><h3>出款水单文件</h3><p>${modal.fileName ? `已选择：${escapeHtml(modal.fileName)}` : "上传网银回单截图或 PDF，仅保存在当前浏览器会话。"}</p></div><label class="btn ${modal.fileName ? "" : "btn-primary"}">${modal.fileName ? "更换文件" : "选择水单文件"}<input id="receipt-file" type="file" accept="image/*,application/pdf,.pdf" /></label></section>
        <div class="field-grid">
          <label class="field"><span>出款参考号</span><input data-receipt-field="reference" value="${escapeHtml(modal.reference)}" placeholder="网银流水号 / 参考号" /></label>
          <label class="field"><span>备注</span><input data-receipt-field="note" value="${escapeHtml(modal.note)}" placeholder="出款说明（可选）" /></label>
        </div>
        ${modal.error ? `<div class="form-error">${escapeHtml(modal.error)}</div>` : ""}
        <footer><button class="btn" type="button" id="receipt-cancel">取消</button><button class="btn btn-primary" type="submit">确认出款并归档水单</button></footer>
      </form>
    </section></div>`;
    document.body.classList.add("modal-open");
    const close = () => { state.payoutReceiptModal = null; renderDispatchModal(); };
    $("#receipt-modal-close")?.addEventListener("click", close);
    $("#receipt-cancel")?.addEventListener("click", close);
    $("#receipt-backdrop")?.addEventListener("click", event => { if (event.target === event.currentTarget) close(); });
    $("#receipt-file")?.addEventListener("change", event => {
      const file = event.target.files?.[0];
      if (!file || !state.payoutReceiptModal) return;
      $$('[data-receipt-field]').forEach(el => { state.payoutReceiptModal[el.dataset.receiptField] = el.value; });
      state.payoutReceiptModal.fileName = file.name;
      state.payoutReceiptModal.fileUrl = URL.createObjectURL(file);
      state.payoutReceiptModal.error = "";
      renderDispatchModal();
    });
    $$('[data-receipt-field]').forEach(el => el.addEventListener("input", () => {
      if (state.payoutReceiptModal) state.payoutReceiptModal[el.dataset.receiptField] = el.value;
    }));
    $("#receipt-form")?.addEventListener("submit", event => { event.preventDefault(); confirmDispatchPaid(); });
  }

  function applyDispatchAutoPayout(modal, customer) {
    const auto = modal.fields.channel === "SGB" && customer ? `${(customer.enName || customer.name).toUpperCase()} SGB VA` : "";
    if (!modal.fields.payoutAccount.trim() || modal.fields.payoutAccount === modal.autoPayout) modal.fields.payoutAccount = auto;
    modal.autoPayout = auto;
  }

  function bindDispatchModalEvents() {
    const close = () => { state.dispatchModal = null; renderDispatchModal(); };
    $("#dispatch-modal-close")?.addEventListener("click", close);
    $("#dispatch-cancel")?.addEventListener("click", close);
    $("#dispatch-backdrop")?.addEventListener("click", event => { if (event.target === event.currentTarget) close(); });
    $("#dispatch-form")?.addEventListener("submit", event => { event.preventDefault(); submitDispatchOrder(); });
    $("#dispatch-customer")?.addEventListener("change", event => {
      syncDispatchFields();
      const modal = state.dispatchModal;
      modal.customerId = event.target.value;
      const customer = state.customers.find(item => item.id === modal.customerId);
      modal.vaAccountId = dispatchVaAccountsForCustomer(customer)[0]?.id || "";
      applyDispatchAutoPayout(modal, customer);
      modal.error = "";
      renderDispatchModal();
    });
    $$('[name="dispatch-channel"]').forEach(el => el.addEventListener("change", () => {
      syncDispatchFields();
      const modal = state.dispatchModal;
      modal.fields.channel = el.value;
      const customer = state.customers.find(item => item.id === modal.customerId);
      if (el.value === "SGB") {
        const matched = dispatchVaAccountsForCustomer(customer);
        modal.vaAccountId = matched.find(account => account.id === modal.vaAccountId)?.id || matched[0]?.id || "";
        const va = matched.find(account => account.id === modal.vaAccountId);
        if (va) modal.fields.currency = va.currency;
      } else {
        modal.vaAccountId = "";
      }
      applyDispatchAutoPayout(modal, customer);
      modal.error = "";
      renderDispatchModal();
    }));
    $$('[data-dispatch-va]').forEach(el => el.addEventListener("click", () => {
      syncDispatchFields();
      const modal = state.dispatchModal;
      modal.vaAccountId = el.dataset.dispatchVa;
      const va = initialVaAccounts().find(account => account.id === modal.vaAccountId);
      if (va) modal.fields.currency = va.currency;
      renderDispatchModal();
    }));
    const ocrInput = $("#dispatch-ocr-image");
    if (ocrInput) ocrInput.addEventListener("change", event => {
      const file = event.target.files?.[0];
      if (!file || !state.dispatchModal) return;
      syncDispatchFields();
      const modal = state.dispatchModal;
      const customer = state.customers.find(item => item.id === modal.customerId);
      modal.fields.rawText = dispatchOcrSample(modal.fields.channel, customer);
      renderDispatchModal();
      toast("图片识别完成", `${file.name} 的收款账户资料已写入文本框`);
    });
    $$('[data-dispatch-field]').forEach(el => el.addEventListener(el.tagName === "SELECT" ? "change" : "input", () => {
      if (!state.dispatchModal) return;
      state.dispatchModal.fields[el.dataset.dispatchField] = el.value;
      refreshDispatchPreview();
    }));
  }

  function syncDispatchFields() {
    if (!state.dispatchModal) return;
    $$('[data-dispatch-field]').forEach(el => { state.dispatchModal.fields[el.dataset.dispatchField] = el.value; });
  }

  function openDispatchModal(customerId) {
    const candidates = dispatchPendingCustomers();
    const chosen = candidates.find(customer => customer.id === customerId) || candidates[0] || null;
    const channel = chosen?.business === "SGB" ? "SGB" : "SINO";
    const matched = channel === "SGB" ? dispatchVaAccountsForCustomer(chosen) : [];
    const autoPayout = channel === "SGB" && chosen ? `${(chosen.enName || chosen.name).toUpperCase()} SGB VA` : "";
    state.dispatchModal = {
      customerId: chosen?.id || "",
      vaAccountId: matched[0]?.id || "",
      autoPayout,
      fields: { orderTitle: "", rawText: "", amount: "", currency: matched[0]?.currency || "USD", channel, payoutAccount: autoPayout, expectedDate: "", note: "" },
      error: ""
    };
    renderDispatchModal();
  }

  function nextDispatchId() {
    const stamp = new Date().toISOString().slice(0, 10).replaceAll("-", "");
    let sequence = state.payoutOrders.length + 1;
    let id = `SCH-${stamp}-${String(sequence).padStart(3, "0")}`;
    while (state.payoutOrders.some(order => order.id === id)) id = `SCH-${stamp}-${String(++sequence).padStart(3, "0")}`;
    return id;
  }

  function submitDispatchOrder() {
    const modal = state.dispatchModal;
    if (!modal) return;
    syncDispatchFields();
    const customer = state.customers.find(item => item.id === modal.customerId && item.status === "审核通过");
    if (!customer) { modal.error = "请选择一位合规审核通过的客户"; renderDispatchModal(); return; }
    if (!modal.fields.orderTitle.trim()) { modal.error = "请填写单号 / 排单标题"; renderDispatchModal(); return; }
    if (!modal.fields.rawText.trim()) { modal.error = "请粘贴或识别客户提供的收款账户资料"; renderDispatchModal(); return; }
    const amountValue = Number(String(modal.fields.amount).replace(/[,，\s]/g, ""));
    if (!Number.isFinite(amountValue) || amountValue <= 0) { modal.error = "请填写有效的出款金额"; renderDispatchModal(); return; }
    const vaAccount = modal.fields.channel === "SGB" ? initialVaAccounts().find(account => account.id === modal.vaAccountId) || null : null;
    if (modal.fields.channel === "SGB" && !vaAccount) { modal.error = "内部数据库未匹配到该客户的 VA 账户，无法走 SGB 渠道"; renderDispatchModal(); return; }
    if (!modal.fields.payoutAccount.trim()) { modal.error = "请填写出款账户"; renderDispatchModal(); return; }
    const parsed = parseDispatchRaw(modal.fields.rawText);
    const id = nextDispatchId();
    state.payoutOrders.unshift({
      id, customerId: customer.id, clientNo: customer.clientNo || "无编号", customerName: customer.name,
      personName: customer.enName || customer.name, complianceStatus: "合规审核通过", status: "出款审核中",
      amount: amountValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      currency: modal.fields.currency, channel: modal.fields.channel,
      orderTitle: modal.fields.orderTitle.trim(), rawText: modal.fields.rawText.trim(),
      payoutAccount: modal.fields.payoutAccount.trim(), vaAccount,
      payee: parsed.payee || customer.enName || customer.name,
      payeeBank: [parsed.bankName, parsed.accountNumber].filter(Boolean).join(" · ") || "見排单文案",
      expectedDate: modal.fields.expectedDate || "", note: modal.fields.note.trim(),
      submittedBy: roles.agent.name, submittedAt: dispatchNowLabel(), updated: "刚刚"
    });
    setCustomerStatus(customer, "已排单", `初级交易员 ${roles.agent.name}`, `排单 ${id} 已提交出款审核`);
    customer.timeline = customer.timeline || [];
    customer.timeline.unshift({ title: "排单已提交", detail: `${id} · ${modal.fields.orderTitle.trim()} · ${modal.fields.currency} ${amountValue.toLocaleString("en-US")}`, role: `初级交易员 ${roles.agent.name}`, time: "刚刚" });
    persistCustomers();
    state.dispatchModal = null;
    render();
    toast("排单已提交", `${id} · ${modal.fields.orderTitle.trim()} 进入高级交易员出款审核`);
  }

  function approveDispatchOrder(orderId) {
    const order = state.payoutOrders.find(item => item.id === orderId);
    if (!order || order.status !== "出款审核中") return;
    order.status = "待出款";
    order.reviewedBy = roles.ops.name;
    order.reviewedAt = dispatchNowLabel();
    order.updated = "刚刚";
    const customer = state.customers.find(item => item.id === order.customerId);
    if (customer) {
      customer.timeline = customer.timeline || [];
      customer.timeline.unshift({ title: "出款审核通过", detail: `${order.id} · 转入出款员待出款队列`, role: `高级交易员 ${roles.ops.name}`, time: "刚刚" });
      persistCustomers();
    }
    render();
    toast("出款审核通过", `${order.id} 已转入出款员待出款队列`);
  }

  function returnDispatchOrder(orderId) {
    const order = state.payoutOrders.find(item => item.id === orderId);
    if (!order || order.status !== "出款审核中") return;
    showConfirm(`退回排单 ${order.id}？`, `${order.customerName} · ${order.currency} ${order.amount}。退回后客户回到排单中心待排单状态，初级交易员需重新发起排单。`, "退回原因", "收款账户要素需修改", "确认退回", note => {
      state.payoutOrders = state.payoutOrders.filter(item => item.id !== orderId);
      const customer = state.customers.find(item => item.id === order.customerId);
      if (customer && customer.status === "已排单") {
        setCustomerStatus(customer, "审核通过", `高级交易员 ${roles.ops.name}`, note || `排单 ${order.id} 被退回`);
        customer.timeline = customer.timeline || [];
        customer.timeline.unshift({ title: "排单被退回", detail: `${order.id} · ${note || "需重新排单"}`, role: `高级交易员 ${roles.ops.name}`, time: "刚刚" });
        persistCustomers();
      }
      render();
      toast("排单已退回", `${order.id} 已退回初级交易员重新排单`);
    });
  }

  function markDispatchPaid(orderId) {
    const order = state.payoutOrders.find(item => item.id === orderId);
    if (!order || order.status !== "待出款") return;
    state.payoutReceiptModal = { orderId, fileName: "", fileUrl: "", reference: `PAY-${order.id.replace("SCH-", "")}`, note: "", error: "" };
    renderDispatchModal();
  }

  function confirmDispatchPaid() {
    const modal = state.payoutReceiptModal;
    if (!modal) return;
    $$('[data-receipt-field]').forEach(el => { modal[el.dataset.receiptField] = el.value; });
    const order = state.payoutOrders.find(item => item.id === modal.orderId);
    if (!order || order.status !== "待出款") { state.payoutReceiptModal = null; render(); return; }
    if (!modal.fileName && !modal.reference.trim()) { modal.error = "请上传水单文件，或至少填写出款参考号"; renderDispatchModal(); return; }
    order.status = "已出款";
    order.paidBy = roles.payout.name;
    order.paidAt = dispatchNowLabel();
    order.updated = "刚刚";
    order.receipt = { fileName: modal.fileName, fileUrl: modal.fileUrl, reference: modal.reference.trim(), note: modal.note.trim(), uploadedBy: roles.payout.name, uploadedAt: dispatchNowLabel() };
    const customer = state.customers.find(item => item.id === order.customerId);
    if (customer) {
      setCustomerStatus(customer, "已成交", `出款员 ${roles.payout.name}`, `排单 ${order.id} 出款完成，水单已归档`);
      customer.documents = customer.documents || [];
      customer.documents.unshift({ name: `出款水单 · ${order.id}`, meta: `${modal.fileName || "手工登记"} · ${order.currency} ${order.amount}${modal.reference.trim() ? ` · ${modal.reference.trim()}` : ""}`, state: "已归档", tone: "teal", flow: "compliance", flowLabel: "出款凭证", uploadedAt: "刚刚", url: modal.fileUrl || "" });
      customer.timeline = customer.timeline || [];
      customer.timeline.unshift({ title: "出款完成", detail: `${order.id} · ${order.currency} ${order.amount} 已出款，水单${modal.fileName ? `「${modal.fileName}」` : ""}已归档到客户档案`, role: `出款员 ${roles.payout.name}`, time: "刚刚" });
      persistCustomers();
    }
    state.payoutReceiptModal = null;
    render();
    toast("已标记出款", `${order.id} · 水单已归档并同步到客户详情`);
  }

  function viewDispatchOrder(orderId) {
    if (!state.payoutOrders.some(item => item.id === orderId)) return;
    state.dispatchViewOrder = orderId;
    renderDispatchModal();
  }

  function bindDispatchEvents() {
    const dispatchNew = $("#dispatch-new");
    if (dispatchNew) dispatchNew.addEventListener("click", () => openDispatchModal(""));
    $$('[data-dispatch-open]').forEach(el => el.addEventListener("click", () => openDispatchModal(el.dataset.dispatchOpen)));
    $$('[data-dispatch-view]').forEach(el => el.addEventListener("click", () => viewDispatchOrder(el.dataset.dispatchView)));
    $$('[data-dispatch-approve]').forEach(el => el.addEventListener("click", () => approveDispatchOrder(el.dataset.dispatchApprove)));
    $$('[data-dispatch-return]').forEach(el => el.addEventListener("click", () => returnDispatchOrder(el.dataset.dispatchReturn)));
    $$('[data-dispatch-paid]').forEach(el => el.addEventListener("click", () => markDispatchPaid(el.dataset.dispatchPaid)));
    $$('[data-audit-tab]').forEach(el => el.addEventListener("click", () => { state.auditTab = el.dataset.auditTab; render(); }));
    $$('[data-payout-tab]').forEach(el => el.addEventListener("click", () => { state.payoutOpsTab = el.dataset.payoutTab; render(); }));
    const dispatchSearch = $("#dispatch-search");
    if (dispatchSearch) dispatchSearch.addEventListener("input", event => {
      const cursorStart = event.target.selectionStart ?? event.target.value.length;
      state.dispatchSearch = event.target.value;
      render();
      const nextInput = $("#dispatch-search");
      if (nextInput) { nextInput.focus(); nextInput.setSelectionRange(cursorStart, cursorStart); }
    });
  }

  function payoutMetricGrid(cards, modifier = "") {
    return `<section class="payout-metric-grid ${modifier}">${cards.join("")}</section>`;
  }

  function payoutMetric(label, value, unit, tone = "", meta = "", foot = "") {
    return `<article class="payout-metric-card"><div class="payout-metric-label"><span>${label}</span>${meta ? `<em>${meta}</em>` : ""}</div><strong class="${tone}">${value} <small>${unit}</small></strong>${foot ? `<p>${foot}</p>` : ""}</article>`;
  }

  function scheduleOrdersTable(rows, mode) {
    if (!rows.length) return `<div class="empty-state"><div><i>≣</i><h2>暂无排单</h2><p>${mode === "ops" ? "交易员提交排单后会出现在这里。" : "创建排单并保存草稿或提交运营后会出现在这里。"}</p></div></div>`;
    return `<div class="data-table-wrap schedule-orders-wrap"><table class="data-table schedule-orders-table"><thead><tr><th>排单编号</th><th>客户主体</th><th>账户 / 模板</th><th>金额 / 币种</th><th>处理状态</th><th>更新时间</th><th>操作</th></tr></thead><tbody>${rows.map(order => `<tr><td><div class="schedule-order-id"><strong>${order.id}</strong><span>${order.priority} · ${order.expectedPayoutDate || "未定日期"}</span></div></td><td><div class="schedule-customer-cell"><strong>${escapeHtml(order.customerName)}</strong><span>${escapeHtml(order.customerId || "未绑定客户编号")}</span></div></td><td><div class="schedule-account-cell"><strong>${escapeHtml(order.templateName || "客户粘贴排单")}</strong><span>${escapeHtml(order.fields.payoutAccount || order.fields.accountName || "待补账户要素")}</span></div></td><td><div class="schedule-amount-cell"><strong>${escapeHtml(order.fields.amount || "未填写")}</strong><span>${escapeHtml(order.fields.currency || "未填写币种")}</span></div></td><td><span class="status status-${statusTone(order.status)}">${order.status}</span></td><td class="muted">${order.updated}</td><td>${scheduleOrderActions(order, mode)}</td></tr>`).join("")}</tbody></table></div>`;
  }

  function scheduleOrderActions(order, mode) {
    if (mode === "agent") {
      if (order.status === "草稿") return `<button class="btn btn-sm btn-primary" type="button" data-schedule-edit="${order.id}">继续编辑</button>`;
      return `<button class="btn btn-sm" type="button" data-schedule-preview="${order.id}">查看文案</button>`;
    }
    if (order.status === "待运营处理") return `<button class="btn btn-sm btn-primary" type="button" data-schedule-status="${order.id}" data-next-status="处理中">开始处理</button>`;
    if (order.status === "处理中") return `<button class="btn btn-sm btn-primary" type="button" data-schedule-status="${order.id}" data-next-status="已排单">标记已排单</button>`;
    return `<button class="btn btn-sm" type="button" data-schedule-preview="${order.id}">查看文案</button>`;
  }

  function schedulePreview(data) {
    return `${data.orderTitle || "未填写排单标题"}
${data.rawScheduleText || "未填写客户提供的排单内容"}

Account 1:
Virtual Account Number： ${data.virtualAccountNumber || "未填写"}
IBAN： ${data.iban || "未填写"}
Currency： ${data.currency || "未填写"}`;
  }

  function renderQuotas() {
    const mainReached = state.flowIndex >= 8;
    const rows = [
      ["Q-2026-0713", "陈嘉宁", "HKD", "800,000", mainReached ? (state.flowIndex >= 11 ? "已使用" : "已锁定") : "待确认", "2026-07-13 18:00", "杨澜"],
      ["Q-2026-0709", "林雅雯", "HKD", "480,000", "待确认", "2026-07-12 16:00", "周辰"],
      ["Q-2026-0704", "Aurora Capital", "USD", "90,000", "已锁定", "今天 18:00", "陈浩"],
      ["Q-2026-0681", "Northstar Trading", "USD", "150,000", "已取消", "07-08 12:00", "杨澜"]
    ];
    if (state.role === "agent") return `<div class="page">${pageHeader("LIQUIDITY CONTROL", "额度/库存", "选择客户、交易日、币种和数量，提交后由运营确认可用现金、USDT 或外币库存。")}
      <div class="form-layout quota-layout"><section class="form-panel"><div class="form-section-title"><h2>创建额度/库存预约</h2><p>客户必须已通过对应交易的准入或地址校验。</p></div><div class="field-grid"><label class="field"><span>客户</span><select><option>陈嘉宁 · C-2026-0718</option><option>林雅雯 · C-2026-0588</option></select></label><label class="field"><span>交易日期</span><input type="date" value="2026-07-13" /></label><label class="field"><span>货币/资产</span><select><option>HKD</option><option>USD</option><option>CNY</option><option>USDT</option></select></label><label class="field"><span>数量</span><input inputmode="decimal" value="800000" /></label></div><div class="form-actions"><span class="field-hint">提交后进入运营的库存确认队列</span><button class="btn btn-primary" id="quota-submit">提交运营确认</button></div></section><aside class="section"><div class="section-header"><div><h2>预约规则</h2><p>Demo 假设</p></div></div><div class="checklist">${["现金与 USDT 库存分别锁定", "修改数量需要运营重新确认", "取消或到期自动释放", "所有状态变化写入操作记录"].map(item => `<div class="checklist-row"><i>✓</i><span>${item}</span></div>`).join("")}</div></aside></div>
      ${ledgerTable(["预约编号", "客户", "币种", "金额", "状态", "有效至", "交易员"], rows)}</div>`;
    return `<div class="page">${pageHeader("LIQUIDITY CONTROL", "额度/库存", "确认 交易员 提交的现金、USDT 或外币库存预约，并记录锁定结果。")}
      <div class="section"><div class="section-header"><div><h2>待确认预约</h2><p>按提交时间排序</p></div><span class="status status-warning">3 项待处理</span></div>${ledgerTable(["预约编号", "客户", "币种", "金额", "状态", "有效至", "交易员", "操作"], rows.map(row => [...row, row[4] === "待确认" ? `<button class="btn btn-sm quota-confirm">确认额度</button>` : "—"]))}</div></div>`;
  }

  function renderReceipts() {
    const reached = state.flowIndex >= 10;
    const rows = [
      ["TRX-982701", "陈嘉宁", "HKD", "800,000", reached ? (state.flowIndex >= 11 ? "入金已确认" : "待匹配") : "待上传", "Q-2026-0713", "今天"],
      ["TRX-772019", "林雅雯", "HKD", "475,000", "金额异常", "Q-2026-0709", "昨天"],
      ["TRX-661804", "Aurora Capital", "USD", "90,000", "入金已确认", "Q-2026-0704", "07-08"]
    ];
    if (state.role === "agent") return `<div class="page">${pageHeader("PAYMENT VOUCHER", "凭证提交", "凭证可以是银行水单、现金信物、链上截图或交易哈希，用于后续匹配与复核。")}
      <div class="receipt-compose"><section class="form-panel"><div class="form-section-title"><h2>1. 匹配内部客户</h2><p>输入客户名称，使用最少必要信息确认正确客户。</p></div><label class="field"><span>客户名称</span><input id="receipt-customer-name" value="陈嘉宁" placeholder="输入中文或英文名称" /></label><div class="match-results"><button class="match-candidate selected" type="button"><span class="avatar">嘉宁</span><span><strong>陈嘉宁</strong><small>C-2026-0718 · 生日 16/08 · 交易员 杨澜</small></span><i>✓</i></button><button class="match-candidate" type="button"><span class="avatar">嘉宁</span><span><strong>陈嘉宁</strong><small>C-2025-0442 · 生日 02/11 · 交易员 周辰</small></span><i></i></button></div><p class="field-hint">候选列表不显示完整生日、证件号、电话或邮箱。</p></section>
      <section class="form-panel"><div class="form-section-title"><h2>2. 录入付款凭证</h2><p>可粘贴水单文字、链上哈希或选择凭证文件，文件不会上传。</p></div><label class="field"><span>凭证文本</span><textarea class="receipt-text">客户名称：陈嘉宁\n付款银行：HSBC APP\n金额：HKD 800,000\n收款人：ABC LIMITED\nReference：BV123456</textarea></label><div class="field-grid"><label class="field"><span>交易编号</span><input value="TRX-982701" /></label><label class="field"><span>凭证文件</span><input type="file" /></label></div><div class="form-actions"><span class="field-hint">提交后由运营匹配订单和库存预约</span><button class="btn btn-primary" id="receipt-submit">确认客户并提交</button></div></section></div>${ledgerTable(["交易编号", "客户", "币种", "金额", "状态", "匹配预约", "上传日期"], rows)}</div>`;
    return `<div class="page">${pageHeader("PAYMENT MATCHING", "凭证匹配", "核对银行水单、链上截图、现金信物、客户和库存预约，异常差异必须记录人工处理理由。")}
      <div class="assumption receipt-definition"><strong>凭证定义</strong><p>凭证是付款、收币、现金交收或链上转账完成后的证明。系统提取结果仅用于辅助匹配。</p></div>${ledgerTable(["交易编号", "客户", "币种", "金额", "状态", "匹配预约", "上传日期"], rows)}</div>`;
  }

  function ledgerTable(headers, rows) {
    return `<div class="data-table-wrap ledger-standalone"><table class="data-table"><thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(row => `<tr>${row.map((cell, index) => `<td>${index === 4 ? `<span class="status status-${statusTone(cell)}">${cell}</span>` : index === 0 ? `<strong>${cell}</strong>` : cell}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  }

  function renderLedgerPage(eyebrow, title, subtitle, headers, rows, actionLabel) {
    return `<div class="page">${pageHeader(eyebrow, title, subtitle, `<button class="btn btn-primary" id="ledger-action">＋ ${actionLabel}</button>`)}<div class="toolbar"><label class="search-control">⌕<input placeholder="搜索编号或客户" /></label><select class="select-control"><option>全部状态</option><option>待确认</option><option>异常</option><option>已完成</option></select><span class="toolbar-count">${rows.length} 条记录</span></div><div class="data-table-wrap"><table class="data-table"><thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(row => `<tr>${row.map((cell, index) => `<td>${index === 4 ? `<span class="status status-${statusTone(cell)}">${cell}</span>` : index === 0 ? `<strong>${cell}</strong>` : cell}</td>`).join("")}</tr>`).join("")}</tbody></table></div></div>`;
  }

  function renderCommissions() {
    const generated = state.flowIndex >= flowActions.length;
    const rows = [
      ["CM-2026-0318", "陈嘉宁", "HKD 800,000", "0.35%", generated ? "HKD 2,800" : "待业务完成", generated ? "待财务确认" : "未生成"],
      ["CM-2026-0291", "林雅雯", "HKD 480,000", "0.35%", "HKD 1,680", "已确认"],
      ["CM-2026-0277", "Aurora Capital", "USD 90,000", "0.25%", "USD 225", "已确认"]
    ];
    const title = state.role === "agent" ? "待结算佣金确认" : "费率与佣金";
    return `<div class="page">${pageHeader("COMMISSION CENTER", title, "每笔佣金保留计佣基数、费率版本和触发事件，规则变更不重算历史业务。", `<button class="btn">导出报表</button>`)}
      <section class="metric-strip">${metric("本月已确认", "HKD 42,180", "较上月 +8.4%", "✓")}${metric("待财务确认", generated ? "HKD 5,940" : "HKD 3,140", "3 笔业务", "◷")}${metric("预计佣金", "HKD 18,720", "进行中业务", "◇")}${metric("当前费率", "0.35%", "个人客户 · v1.8", "◎")}</section>
      <div class="section" style="margin-top:22px"><div class="section-header"><div><h2>佣金明细</h2><p>按交易完成事件生成</p></div><span class="status status-warning">Demo 假设费率</span></div><div class="data-table-wrap" style="border:0;border-radius:0"><table class="data-table"><thead><tr><th>佣金编号</th><th>客户</th><th>计佣基数</th><th>费率</th><th>佣金</th><th>状态</th>${state.role === "agent" ? "<th>操作</th>" : ""}</tr></thead><tbody>${rows.map((row, index) => `<tr>${row.map((cell, i) => `<td>${i === 5 ? `<span class="status status-${statusTone(cell)}">${state.commissionConfirmed && index === 0 ? "已确认" : cell}</span>` : cell}</td>`).join("")}${state.role === "agent" ? `<td>${index === 0 && !state.commissionConfirmed ? '<button class="btn btn-sm" id="commission-confirm">核对并确认</button>' : "—"}</td>` : ""}</tr>`).join("")}</tbody></table></div></div></div>`;
  }

  function renderKycConfig() {
    const cfg = state.kycConfig;
    const scenario = currentKycScenario();
    const channel = currentKycEngineChannel();
    const scenarios = filteredKycScenarios();
    const totalChannels = cfg.scenarios.reduce((sum, item) => sum + item.channels.length, 0);
    const totalItems = cfg.scenarios.reduce((sum, item) => sum + item.channels.reduce((chSum, ch) => chSum + ch.sections.reduce((secSum, sec) => secSum + sec.items.length, 0), 0), 0);
    return `<div class="page kyc-config-page kyc-engine-page">
      <div class="kyc-engine-shell">
        <aside class="kyc-engine-library">
          <div class="kyc-engine-library-head"><span>业务类型配置库</span><button class="btn btn-sm" type="button" id="kyc-engine-add-scenario">＋ 新建模式</button></div>
          <label class="kyc-engine-search">⌕<input id="kyc-engine-search" value="${escapeHtml(cfg.searchQuery || "")}" placeholder="搜索业务类型或序号" /></label>
          <div class="kyc-engine-scenario-list">${scenarios.map(item => renderKycScenarioCard(item)).join("") || `<div class="empty-inline">未找到匹配业务类型</div>`}</div>
        </aside>
        <main class="kyc-engine-main">
          <header class="kyc-engine-topbar">
            <div><span class="eyebrow">COMPLIANCE ROUTING ENGINE</span><h1>合规材料与渠道路由配置中心</h1><p>以业务场景为入口，维护渠道路由、限制规则、材料模块和前台提交要求。</p></div>
            <div class="kyc-engine-actions"><span>上一次保存时间：${escapeHtml(cfg.lastSavedAt || "--")}</span><button class="btn btn-primary" type="button" id="kyc-config-save">保存并发布新版本</button></div>
          </header>
          <section class="kyc-engine-metrics"><div><strong>${cfg.scenarios.length}</strong><span>业务模式</span></div><div><strong>${totalChannels}</strong><span>绑定渠道</span></div><div><strong>${totalItems}</strong><span>材料/字段项</span></div></section>
          ${scenario ? renderKycScenarioEditor(scenario, channel) : `<div class="empty-state"><div><i>≣</i><h2>请选择业务类型</h2><p>左侧选择业务模式后维护渠道和材料规则，或点击「新建模式」创建业务类型。</p></div></div>`}
        </main>
      </div>${state.kycModal ? renderKycModal() : ""}</div>`;
  }

  function renderKycScenarioCard(item) {
    const selected = item.id === state.kycConfig.selectedScenarioId;
    const materialCount = item.channels.reduce((sum, ch) => sum + ch.sections.reduce((secSum, sec) => secSum + sec.items.length, 0), 0);
    return `<button class="kyc-engine-scenario ${selected ? "active" : ""}" type="button" data-kyc-scenario="${item.id}">
      <div><span>序号 #${escapeHtml(item.code)}</span><em>渠道 ${item.channels.length}</em></div>
      <strong>${escapeHtml(item.name)}</strong>
      <small>${materialCount} 项材料 · ${item.channels.map(ch => ch.name).join(" / ") || "未绑定渠道"}</small>
    </button>`;
  }

  function renderKycScenarioEditor(scenario, channel) {
    const activeIndex = Math.min(state.kycConfig.activeChannelIndex || 0, Math.max(scenario.channels.length - 1, 0));
    return `<section class="kyc-engine-editor">
      <div class="kyc-engine-scenario-head">
        <div class="kyc-code-pill">#${escapeHtml(scenario.code)}</div>
        <label class="kyc-engine-title-field"><input data-kyc-scenario-name="${scenario.id}" value="${escapeHtml(scenario.name)}" /><span>请定义该业务交易模式下的整体流转逻辑与各渠道收集规则</span></label>
        <span class="status status-success">已生效 v2.4</span>
        <div class="kyc-scenario-head-actions"><button class="btn btn-sm" type="button" id="kyc-engine-edit-scenario">编辑信息</button><button class="btn btn-sm kyc-danger-btn" type="button" id="kyc-engine-delete-scenario">删除模式</button></div>
      </div>
      <label class="kyc-process-field"><span>业务流程、时效与${channel ? ` ${escapeHtml(channel.name)} 渠道约束说明` : "渠道约束说明"}（面向业务人员与合规预检）</span><textarea data-kyc-scenario-process="${scenario.id}" rows="7">${escapeHtml(kycCombinedProcessText(scenario, channel))}</textarea></label>
      <section class="kyc-channel-matrix">
        <header><div><strong>通道渠道与材料收集规则 Matrix</strong><span>同一业务模式可绑定多个渠道，每个渠道维护独立限制和材料模块。</span></div><div class="kyc-matrix-actions">${channel ? `<button class="link-button" type="button" id="kyc-engine-edit-channel">编辑当前渠道</button><button class="link-button kyc-danger-link" type="button" id="kyc-engine-delete-channel">删除当前渠道</button>` : ""}<button class="link-button" type="button" id="kyc-engine-add-channel">＋ 新增绑定渠道</button></div></header>
        <div class="kyc-channel-tabs">${scenario.channels.map((ch, index) => `<button class="${index === activeIndex ? "active" : ""}" type="button" data-kyc-channel-tab="${index}"><i class="kyc-channel-dot ${ch.theme || "blue"}"></i>${escapeHtml(ch.name)} 渠道材料库<span>${kycChannelItemCount(ch)} 项材料</span></button>`).join("") || `<div class="empty-inline">当前业务模式暂无绑定渠道。</div>`}</div>
        ${channel ? renderKycChannelEditor(channel) : ""}
      </section>
    </section>`;
  }

  function renderKycChannelEditor(channel) {
    return `<div class="kyc-channel-editor">
      <div class="kyc-section-stack">${channel.sections.map((section, index) => renderKycMaterialSection(section, index)).join("") || `<div class="empty-inline">当前渠道暂无材料模块。</div>`}</div>
      <div class="kyc-channel-editor-foot"><button class="btn btn-sm" type="button" id="kyc-engine-add-section">＋ 新增材料模块</button></div>
    </div>`;
  }

  function renderKycMaterialSection(section, sectionIndex) {
    return `<section class="kyc-material-section">
      <header><div><span>模块 ${sectionIndex + 1}</span><input data-kyc-section-title="${sectionIndex}" value="${escapeHtml(section.title)}" /></div><div class="kyc-section-head-actions"><button class="btn btn-sm" type="button" data-kyc-add-section-item="${sectionIndex}">＋ 添加需要收集的材料/字段</button><button class="icon-button kyc-section-delete" type="button" data-kyc-delete-section="${sectionIndex}" aria-label="删除模块 ${sectionIndex + 1}" title="删除该材料模块">⌫</button></div></header>
      <div class="kyc-engine-items">${section.items.map((item, itemIndex) => renderKycEngineItem(item, sectionIndex, itemIndex)).join("") || `<div class="empty-inline">当前模块暂无材料项。</div>`}</div>
    </section>`;
  }

  function renderKycEngineItem(item, sectionIndex, itemIndex) {
    return `<article class="kyc-engine-item">
      <div class="kyc-engine-item-main"><i>⋮⋮</i><div><input data-kyc-item-name="${sectionIndex}:${itemIndex}" value="${escapeHtml(item.name)}" placeholder="材料名称" /><input data-kyc-item-sub="${sectionIndex}:${itemIndex}" value="${escapeHtml(item.subRequirement || "")}" placeholder="补充要求" /></div></div>
      <div class="kyc-engine-item-controls">
        <select data-kyc-item-type="${sectionIndex}:${itemIndex}"><option value="file" ${item.type === "file" ? "selected" : ""}>文件上传（PDF/图片）</option><option value="text" ${item.type === "text" ? "selected" : ""}>文本输入框</option><option value="bank_account" ${item.type === "bank_account" ? "selected" : ""}>银行账户多字段</option></select>
        <label class="kyc-required-mini"><input type="checkbox" data-kyc-item-required="${sectionIndex}:${itemIndex}" ${item.required ? "checked" : ""} /><span>${item.required ? "必填" : "选填"}</span></label>
        <select data-kyc-item-validity="${sectionIndex}:${itemIndex}"><option value="none" ${item.validity === "none" ? "selected" : ""}>无有效期限制</option><option value="1m" ${item.validity === "1m" ? "selected" : ""}>需 1 个月内有效</option><option value="3m" ${item.validity === "3m" ? "selected" : ""}>需 3 个月内有效</option></select>
        <button type="button" data-kyc-delete-section-item="${sectionIndex}:${itemIndex}">⌫</button>
      </div>
    </article>`;
  }

  function filteredKycScenarios() {
    const query = String(state.kycConfig.searchQuery || "").trim().toLowerCase();
    if (!query) return state.kycConfig.scenarios;
    return state.kycConfig.scenarios.filter(item => `${item.code} ${item.name}`.toLowerCase().includes(query));
  }

  function currentKycScenario() {
    const cfg = state.kycConfig;
    const scenario = cfg.scenarios.find(item => item.id === cfg.selectedScenarioId) || cfg.scenarios[0] || null;
    if (scenario && cfg.selectedScenarioId !== scenario.id) cfg.selectedScenarioId = scenario.id;
    return scenario;
  }

  function currentKycEngineChannel() {
    const scenario = currentKycScenario();
    if (!scenario?.channels?.length) return null;
    if ((state.kycConfig.activeChannelIndex || 0) >= scenario.channels.length) state.kycConfig.activeChannelIndex = 0;
    return scenario.channels[state.kycConfig.activeChannelIndex || 0];
  }

  function kycChannelItemCount(channel) {
    return (channel.sections || []).reduce((sum, section) => sum + (section.items || []).length, 0);
  }

  function renderKycModal() {
    const modal = state.kycModal;
    if (!modal) return "";
    const draft = modal.draft;
    const isScenario = modal.mode.startsWith("scenario");
    const title = { "scenario-new": "新建业务模式", "scenario-edit": "编辑业务模式", "channel-new": "新增绑定渠道", "channel-edit": "编辑渠道信息" }[modal.mode];
    const subtitle = isScenario ? "定义业务类型的序号、名称与流程说明，创建后可继续绑定渠道和材料模块。" : "渠道绑定在当前业务模式下，每个渠道维护独立限制和材料模块。";
    const body = isScenario ? `
        <div class="field"><label for="kyc-modal-code">序号 <span>*</span></label><input id="kyc-modal-code" name="code" value="${escapeHtml(draft.code || "")}" required inputmode="numeric" placeholder="例如：19" /><span class="field-hint">显示为 #序号，不能与现有业务模式重复。</span></div>
        <div class="field"><label for="kyc-modal-name">业务类型名称 <span>*</span></label><input id="kyc-modal-name" name="name" value="${escapeHtml(draft.name || "")}" required placeholder="例如：港币/美元/外币 私户打款买U" /></div>
        <div class="field full"><label for="kyc-modal-process">业务流程、时效与约束说明</label><textarea id="kyc-modal-process" name="process" rows="6" placeholder="面向业务人员与合规预检的流程说明，可稍后在编辑器中补充。">${escapeHtml(draft.process || "")}</textarea></div>`
      : `
        <div class="field"><label for="kyc-modal-channel-name">渠道名称 <span>*</span></label><input id="kyc-modal-channel-name" name="channelName" value="${escapeHtml(draft.name || "")}" required placeholder="例如：SGB / SINO / DBS" /><span class="field-hint">同一业务模式下渠道名称不能重复。</span></div>
        <div class="field"><label for="kyc-modal-channel-theme">标识颜色</label><select id="kyc-modal-channel-theme" name="theme">${[["red", "红色"], ["blue", "蓝色"], ["teal", "青绿色"], ["amber", "琥珀色"]].map(([value, label]) => `<option value="${value}" ${draft.theme === value ? "selected" : ""}>${label}</option>`).join("")}</select></div>
        ${modal.mode === "channel-new" ? `<div class="field full"><label for="kyc-modal-section-title">首个材料模块名称</label><input id="kyc-modal-section-title" name="sectionTitle" value="${escapeHtml(draft.sectionTitle || "")}" placeholder="留空时默认为「渠道名称 基础收集材料」" /></div>` : ""}`;
    return `<div class="review-launch-backdrop"><section class="customer-number-dialog kyc-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="kyc-modal-title">
      <header><div><span>KYC CONFIG</span><h2 id="kyc-modal-title">${title}</h2><p>${subtitle}</p></div><button class="icon-button" id="kyc-modal-close" aria-label="关闭" type="button">×</button></header>
      <form id="kyc-modal-form" class="customer-modal-form">
        <div class="field-grid customer-create-grid">${body}</div>
        ${modal.error ? `<div class="form-error">${escapeHtml(modal.error)}</div>` : ""}
        <div class="form-actions"><button class="btn" type="button" id="kyc-modal-cancel">取消</button><button class="btn btn-primary" type="submit">${modal.mode === "scenario-new" ? "创建业务模式" : modal.mode === "channel-new" ? "绑定渠道" : "保存修改"}</button></div>
      </form>
    </section></div>`;
  }

  function kycCombinedProcessText(scenario, channel) {
    const processText = String(scenario?.processDescription || "").trim();
    const restrictionLines = (channel?.restrictions || []).map(rule => String(rule.content || "").trim()).filter(Boolean);
    if (!channel || !restrictionLines.length) return processText;
    const restrictionText = restrictionLines.map((line, index) => `${index + 1}. ${line.replace(/^\d+[.、]\s*/, "")}`).join("\n");
    return [processText, `通道约束说明（${channel.name}）：\n${restrictionText}`].filter(Boolean).join("\n\n");
  }

  function applyKycCombinedProcessText(scenario, channel, value) {
    const text = String(value || "");
    const marker = /\n\s*通道约束说明(?:（[^）]*）)?[:：]\s*\n?/;
    const parts = text.split(marker);
    scenario.processDescription = (parts[0] || "").trim();
    if (!channel) return;
    if (parts.length === 1) {
      channel.restrictions = [];
      return;
    }
    const existing = channel.restrictions || [];
    const lines = parts.slice(1).join("\n").split(/\n+/)
      .map(line => line.replace(/^\s*(?:[-*]|[0-9]+[.、])\s*/, "").trim())
      .filter(Boolean);
    channel.restrictions = lines.map((content, index) => ({ type: existing[index]?.type || "special_proof", content }));
  }

  function kycNowLabel() {
    return new Date().toLocaleString("zh-CN", { hour12: false });
  }

  function renderConfig() {
    const permissions = [["初级交易员", "自己名下客户", "客户管理、报价管理、材料上传、补件处理、排单生成、已发起排单"], ["高级交易员", "交易审核范围内客户", "客户管理、报价管理、材料上传、补件处理、排单审核"], ["出款员", "出款与凭证相关队列", "处理队列、凭证匹配"], ["合规官", "分配的合规案件", "审核队列、KYC list 配置、审计日志"], ["运营经理", "客户与团队概览", "工作台、客户管理"], ["财务", "客户与佣金数据", "客户管理、费率与佣金"], ["Admin", "全系统治理数据", "全部客户、规则与权限、审计日志"]];
    return `<div class="page">${pageHeader("SYSTEM GOVERNANCE", "规则与权限", "正式系统应按角色、数据范围和动作授权，不按员工姓名写死。", `<button class="btn btn-primary">＋ 新增角色</button>`)}
      <div class="dashboard-grid"><section class="section"><div class="section-header"><div><h2>角色权限矩阵</h2><p>7 个内部角色组</p></div><button class="link-button">编辑权限</button></div><div class="data-table-wrap" style="border:0;border-radius:0"><table class="data-table"><thead><tr><th>角色</th><th>数据范围</th><th>关键权限</th></tr></thead><tbody>${permissions.map(row => `<tr>${row.map((cell, i) => `<td>${i === 0 ? `<strong>${cell}</strong>` : cell}</td>`).join("")}</tr>`).join("")}</tbody></table></div></section>
      <div class="flow-side"><section class="section"><div class="section-header"><div><h2>当前规则版本</h2><p>2026-07-08 生效</p></div><span class="status status-success">v1.8</span></div><div class="checklist">${["个人客户佣金率 0.35%", "企业客户佣金率 0.25%", "额度默认锁定 48 小时", "高风险案件要求合规复核", "关键字段修改触发重新审批"].map(item => `<div class="checklist-row"><i>✓</i><span>${item}</span></div>`).join("")}</div></section><div class="assumption"><strong>配置仅为演示</strong><p>本页展示权限和规则的系统边界，不代表业务已经确认这些正式政策。</p></div></div></div></div>`;
  }

  function renderAudit() {
    const events = state.customers.flatMap(c => c.timeline.map(item => ({ ...item, customer: c.name, id: c.id })));
    return `<div class="page">${pageHeader("AUDIT TRAIL", "审计日志", "记录谁在什么时间对哪个业务对象执行了什么动作。", `<button class="btn">导出审计记录</button>`)}<div class="toolbar"><label class="search-control">⌕<input placeholder="搜索客户、操作人或动作" /></label><select class="select-control"><option>全部角色</option><option>交易员</option><option>运营</option><option>合规</option></select><span class="toolbar-count">${events.length} 个事件</span></div><div class="data-table-wrap"><table class="data-table"><thead><tr><th>时间</th><th>客户</th><th>动作</th><th>详情</th><th>操作人</th></tr></thead><tbody>${events.map(event => `<tr data-open-customer="${event.id}"><td class="muted">${event.time}</td><td><strong>${event.customer}</strong><div class="muted">${event.id}</div></td><td>${event.title}</td><td>${event.detail}</td><td>${event.role}</td></tr>`).join("")}</tbody></table></div></div>`;
  }

  function renderTracking() {
    return `<div class="page">${pageHeader("APPLICATION TRACKING", "查询申请进度", "输入申请编号和验证信息。Demo 已预填一个示例申请。")}
      <div class="form-layout"><section class="form-panel"><div class="field-grid"><div class="field"><label for="tracking-id">申请编号</label><input id="tracking-id" value="C-2026-0718" /></div><div class="field"><label for="tracking-code">验证码</label><input id="tracking-code" value="0826" /></div></div><div class="form-actions"><span></span><button class="btn btn-primary" id="track-submit">查询进度 →</button></div><div id="tracking-result"></div></section><aside class="section"><div class="section-header"><div><h2>隐私提示</h2><p>只显示必要信息</p></div></div><div class="checklist"><div class="checklist-row"><i>✓</i><span>查询结果不显示完整证件号码</span></div><div class="checklist-row"><i>✓</i><span>验证码多次错误应触发限制</span></div><div class="checklist-row"><i>✓</i><span>补件建议通过安全邀请链接完成</span></div></div></aside></div></div>`;
  }

  function renderTrackingResult() {
    const c = mainCustomer();
    return `<div class="current-action" style="margin:22px 0 0"><div class="action-kicker">查询成功</div><h2>${c.name} · ${c.id}</h2><p>当前状态：<span class="status status-${statusTone(c.status)}">${c.status}</span></p><ul class="action-evidence"><li><span>负责团队</span><strong>${c.owner}</strong></li><li><span>最后更新</span><strong>${c.updated}</strong></li><li><span>下一步</span><strong>${state.flowIndex < flowActions.length ? flowActions[state.flowIndex].title : "业务已完成"}</strong></li></ul></div>`;
  }

  function bindQuoteEvents() {
    const customerSearch = $("#quote-customer-search");
    if (customerSearch) customerSearch.addEventListener("input", event => {
      state.quote.customerQuery = event.target.value;
      state.quote.customerDropdownOpen = true;
      render();
      $("#quote-customer-search")?.focus();
    });
    if (customerSearch) customerSearch.addEventListener("keydown", event => {
      if (event.key !== "Enter") return;
      const match = quoteCustomerMatches(state.quote.customerQuery)[0];
      if (!match) return;
      state.quote.selectedCustomerId = match.id;
      state.quote.customerQuery = `${match.name} (${match.code})`;
      state.quote.customerDropdownOpen = false;
      render();
    });
    const customerToggle = $("#quote-customer-toggle");
    if (customerToggle) customerToggle.addEventListener("click", () => { state.quote.customerDropdownOpen = !state.quote.customerDropdownOpen; render(); });
    $$('[data-quote-pick-customer]').forEach(el => el.addEventListener("click", () => {
      const customer = state.quote.customers.find(item => item.id === el.dataset.quotePickCustomer);
      if (!customer) return;
      state.quote.selectedCustomerId = customer.id;
      state.quote.customerQuery = `${customer.name} (${customer.code})`;
      state.quote.customerDropdownOpen = false;
      render();
    }));
    const quoteCalc = $("#quote-calc");
    if (quoteCalc) quoteCalc.addEventListener("click", () => {
      recalcQuoteCustomer(quoteSelectedCustomer());
      render();
      toast("报价已更新", "已按最新平台基准价重新计算");
    });
    const addRow = $("#quote-add-row");
    if (addRow) addRow.addEventListener("click", () => {
      quoteSelectedCustomer().quotes.push({ tradeType: "新报价", prefix: "报价项", suffix: "", formula: "usdBid", brokerPoint: 0, bvPoint: 0, digits: 4, roundMode: "45", result: "--", expanded: true, lastQuotedAt: "-" });
      render();
      toast("已新增报价项", "可以编辑公式后重新计算");
    });
    const newCustomer = $("#quote-new-customer");
    if (newCustomer) newCustomer.addEventListener("click", () => {
      const id = `QC-${10000 + state.quote.customers.length + 20}`;
      state.quote.customers.push({ id, name: "新客户", code: id.slice(3), broker: "直营", brokerCode: "-", note: "手工新增", quotes: [{ tradeType: "USD", prefix: "美元报价", suffix: "", formula: "usdBid", brokerPoint: 0, bvPoint: 0, digits: 4, roundMode: "45", result: "--", expanded: true, lastQuotedAt: "-" }] });
      state.quote.selectedCustomerId = id;
      state.quote.customerQuery = `新客户 (${id.slice(3)})`;
      render();
      toast("报价客户已创建", "已添加一条演示客户报价配置");
    });
    $$('[data-quote-formula-input]').forEach(el => {
      const save = event => {
        state.quote.formulaCursor = { index: Number(event.target.dataset.quoteFormulaInput), position: event.target.selectionStart ?? event.target.value.length };
      };
      el.addEventListener("focus", save);
      el.addEventListener("click", save);
      el.addEventListener("keyup", save);
    });
    $$('[data-quote-field]').forEach(el => el.addEventListener(el.tagName === "SELECT" ? "change" : "input", event => {
      const item = quoteSelectedCustomer().quotes[Number(event.target.dataset.quoteIndex)];
      if (!item) return;
      const key = event.target.dataset.quoteField;
      item[key] = ["brokerPoint", "bvPoint", "digits"].includes(key) ? Number(event.target.value) : event.target.value;
      if (key === "formula") state.quote.formulaCursor = { index: Number(event.target.dataset.quoteIndex), position: event.target.selectionStart ?? String(event.target.value).length };
      item.result = calculateQuoteItem(item).value;
      const output = $("#quote-output");
      if (output) output.textContent = quoteText(quoteSelectedCustomer());
      if (event.type === "change") render();
    }));
    $$('[data-quote-toggle]').forEach(el => el.addEventListener("click", () => {
      const item = quoteSelectedCustomer().quotes[Number(el.dataset.quoteToggle)];
      if (item) item.expanded = item.expanded === false;
      render();
    }));
    $$('[data-quote-move]').forEach(el => el.addEventListener("click", () => {
      const customer = quoteSelectedCustomer();
      const index = Number(el.dataset.quoteMove);
      const nextIndex = index + Number(el.dataset.quoteDirection);
      if (nextIndex < 0 || nextIndex >= customer.quotes.length) return;
      [customer.quotes[index], customer.quotes[nextIndex]] = [customer.quotes[nextIndex], customer.quotes[index]];
      render();
    }));
    $$('[data-quote-remove]').forEach(el => el.addEventListener("click", () => {
      const customer = quoteSelectedCustomer();
      if (customer.quotes.length <= 1) return toast("至少保留一个报价项", "当前客户需要保留一条报价配置");
      customer.quotes.splice(Number(el.dataset.quoteRemove), 1);
      render();
      toast("报价项已删除", "报价文本已同步更新");
    }));
    $$('[data-quote-insert-op]').forEach(el => el.addEventListener("click", () => {
      const index = Number(el.dataset.quoteIndex);
      const item = quoteSelectedCustomer().quotes[index];
      if (!item) return;
      insertQuoteFormulaToken(item, index, el.dataset.quoteInsertOp);
      render();
    }));
    $$('[data-quote-clear-formula]').forEach(el => el.addEventListener("click", () => {
      const item = quoteSelectedCustomer().quotes[Number(el.dataset.quoteClearFormula)];
      if (!item) return;
      item.formula = "";
      item.result = "--";
      render();
    }));
    $$('[data-quote-variable-open]').forEach(el => el.addEventListener("click", () => {
      state.quote.activeVariableQuoteIndex = Number(el.dataset.quoteVariableOpen);
      render();
    }));
    $$('[data-quote-variable-tab]').forEach(el => el.addEventListener("click", () => {
      state.quote.activeVariableTab = el.dataset.quoteVariableTab;
      render();
    }));
    $$('[data-quote-variable]').forEach(el => el.addEventListener("click", () => {
      const index = Number(el.dataset.quoteVariableIndex);
      const item = quoteSelectedCustomer().quotes[index];
      if (!item) return;
      insertQuoteFormulaToken(item, index, el.dataset.quoteVariable);
      state.quote.activeVariableQuoteIndex = null;
      render();
    }));
    const variableClose = $("#quote-variable-close");
    if (variableClose) variableClose.addEventListener("click", () => { state.quote.activeVariableQuoteIndex = null; render(); });
    const variableBackdrop = $(".quote-variable-backdrop");
    if (variableBackdrop) variableBackdrop.addEventListener("click", event => { if (event.target === event.currentTarget) { state.quote.activeVariableQuoteIndex = null; render(); } });
    const copyQuick = $("#quote-copy");
    if (copyQuick) copyQuick.addEventListener("click", () => copyQuoteText(quoteText(quoteSelectedCustomer()), quoteCustomerLabel(quoteSelectedCustomer())));
    const sideToggle = $("#quote-side-toggle");
    if (sideToggle) sideToggle.addEventListener("click", () => { state.quote.sideCollapsed = !state.quote.sideCollapsed; render(); });
    const benchmarkEdit = $("#quote-benchmark-edit");
    if (benchmarkEdit) benchmarkEdit.addEventListener("click", () => {
      if (state.quote.benchmarkEditing) {
        state.quote.benchmarkPrices.forEach(row => {
          row.label = $(`[data-quote-benchmark-label="${row.code}"]`)?.value || row.label;
          row.value = Number($(`[data-quote-benchmark-value="${row.code}"]`)?.value || row.value);
        });
        state.quote.benchmarkUpdatedAt = "2026/08/06 " + new Date().toLocaleTimeString("zh-CN", { hour12: false });
        state.quote.platformHistory.unshift({ id: `PH-${Date.now()}`, savedAt: state.quote.benchmarkUpdatedAt, operator: roles[state.role].name, prices: state.quote.benchmarkPrices.map(row => [row.label, formatQuoteNumber(row.value, row.digits)]) });
        toast("平台基准价已更新", "可点击一键计算报价");
      }
      state.quote.benchmarkEditing = !state.quote.benchmarkEditing;
      render();
    });
    const addBenchmark = $("#quote-add-benchmark");
    if (addBenchmark) addBenchmark.addEventListener("click", () => {
      state.quote.benchmarkPrices.push({ code: `custom${Date.now().toString().slice(-4)}`, label: "新增价格", value: 0, digits: 4 });
      render();
    });
    $$('[data-quote-benchmark-remove]').forEach(el => el.addEventListener("click", () => {
      if (!state.quote.benchmarkEditing || state.quote.benchmarkPrices.length <= 1) return;
      state.quote.benchmarkPrices = state.quote.benchmarkPrices.filter(row => row.code !== el.dataset.quoteBenchmarkRemove);
      render();
    }));
    const resetBench = $("#quote-reset-benchmark");
    if (resetBench) resetBench.addEventListener("click", () => {
      const fresh = initialQuoteState();
      state.quote.benchmarkPrices = fresh.benchmarkPrices;
      state.quote.benchmarkUpdatedAt = fresh.benchmarkUpdatedAt;
      render();
      toast("基准价已重置", "已恢复演示默认价格");
    });
    const refreshRates = $("#quote-refresh-rates");
    if (refreshRates) refreshRates.addEventListener("click", () => {
      state.quote.channelRates.forEach((row, index) => {
        const step = Math.abs(row.value) > 7 ? 0.002 : 0.000006;
        row.value = Number((row.value + (index % 2 ? -step : step)).toFixed(row.digits));
      });
      render();
      toast("渠道汇率已刷新", "演示汇率已小幅更新");
    });
    $$('[data-quote-group]').forEach(el => el.addEventListener("click", () => {
      state.quote.batchGroupId = el.dataset.quoteGroup;
      state.quote.batchCustomerIndex = 0;
      render();
    }));
    $$('[data-quote-batch-customer]').forEach(el => el.addEventListener("click", () => {
      state.quote.batchCustomerIndex = Number(el.dataset.quoteBatchCustomer);
      render();
      setTimeout(() => $(`#batch-card-${state.quote.batchCustomerIndex}`)?.scrollIntoView({ block: "nearest", behavior: "smooth" }), 0);
    }));
    $$('[data-quote-recalc-customer]').forEach(el => el.addEventListener("click", () => {
      const customer = quoteVisibleBatchCustomers()[Number(el.dataset.quoteRecalcCustomer)];
      if (!customer) return;
      recalcQuoteCustomer(customer);
      render();
      toast("客户报价已重算", quoteCustomerLabel(customer));
    }));
    const recalcGroup = $("#quote-recalc-group");
    if (recalcGroup) recalcGroup.addEventListener("click", () => {
      quoteGroupCustomers().forEach(recalcQuoteCustomer);
      render();
      toast("全组报价已重算", quoteSelectedGroup().name);
    });
    $$('[data-quote-copy-customer]').forEach(el => el.addEventListener("click", () => {
      const customer = quoteVisibleBatchCustomers()[Number(el.dataset.quoteCopyCustomer)];
      if (customer) copyQuoteText(quoteText(customer), quoteCustomerLabel(customer));
    }));
    const copyGroup = $("#quote-copy-group");
    if (copyGroup) copyGroup.addEventListener("click", () => copyQuoteText(quoteGroupCustomers().map(quoteText).join("\n\n"), quoteSelectedGroup().name));
    const batchFilter = $("#quote-batch-customer-filter");
    if (batchFilter) batchFilter.addEventListener("input", event => {
      state.quote.batchCustomerFilter = event.target.value;
      render();
      $("#quote-batch-customer-filter")?.focus();
    });
    const batchType = $("#quote-batch-type-filter");
    if (batchType) batchType.addEventListener("change", event => { state.quote.batchTypeFilter = event.target.value; render(); });
    $$('[data-quote-select-row]').forEach(el => el.addEventListener("change", event => {
      const selected = quoteSelectedSet();
      event.target.checked ? selected.add(el.dataset.quoteSelectRow) : selected.delete(el.dataset.quoteSelectRow);
      state.quote.batchSelectedKeys = [...selected];
      render();
    }));
    $$('[data-quote-select-customer]').forEach(el => el.addEventListener("change", event => {
      const customer = state.quote.customers.find(item => item.id === el.dataset.quoteSelectCustomer);
      if (!customer) return;
      const selected = quoteSelectedSet();
      customer.quotes.forEach((item, index) => {
        if (!batchQuoteMatchesType(item)) return;
        const key = batchQuoteKey(customer, index);
        event.target.checked ? selected.add(key) : selected.delete(key);
      });
      state.quote.batchSelectedKeys = [...selected];
      render();
    }));
    const selectVisible = $("#quote-batch-select-visible");
    if (selectVisible) selectVisible.addEventListener("click", () => {
      const selected = quoteSelectedSet();
      visibleBatchQuoteKeys().forEach(key => selected.add(key));
      state.quote.batchSelectedKeys = [...selected];
      render();
    });
    const clearSelected = $("#quote-batch-clear-selected");
    if (clearSelected) clearSelected.addEventListener("click", () => { state.quote.batchSelectedKeys = []; render(); });
    const copyPicked = $("#quote-copy-picked");
    if (copyPicked) copyPicked.addEventListener("click", () => {
      const selected = quoteSelectedSet();
      const blocks = quoteGroupCustomers().map(customer => {
        const quotes = customer.quotes.filter((_, index) => selected.has(batchQuoteKey(customer, index)));
        if (!quotes.length) return "";
        return `${customer.name}(${customer.code})：\n${quotes.map(item => `${item.tradeType}--\n${item.prefix || item.tradeType}：${calculateQuoteItem(item).value}${item.suffix ? ` ${item.suffix}` : ""}`).join("\n\n")}`;
      }).filter(Boolean);
      if (!blocks.length) return toast("没有已选报价", "请先勾选要复制的报价项");
      copyQuoteText(blocks.join("\n\n"), `${blocks.length} 位客户`);
    });
    const addGroup = $("#quote-add-group");
    if (addGroup) addGroup.addEventListener("click", () => {
      state.quote.groupModalOpen = true;
      state.quote.groupNameDraft = `新报价组 ${state.quote.groups.length + 1}`;
      render();
    });
    const addGroupCustomer = $("#quote-add-group-customer");
    if (addGroupCustomer) addGroupCustomer.addEventListener("click", () => {
      state.quote.addCustomerModalOpen = true;
      state.quote.addCustomerQuery = "";
      state.quote.pendingCustomerIds = [];
      render();
    });
    const groupNameInput = $("#quote-group-name-input");
    if (groupNameInput) groupNameInput.addEventListener("input", event => { state.quote.groupNameDraft = event.target.value; });
    const closeGroupModal = () => { state.quote.groupModalOpen = false; render(); };
    $("#quote-group-modal-close")?.addEventListener("click", closeGroupModal);
    $("#quote-group-modal-cancel")?.addEventListener("click", closeGroupModal);
    $("#quote-group-modal-confirm")?.addEventListener("click", () => {
      const name = state.quote.groupNameDraft.trim();
      if (!name) return toast("请输入报价组名称", "报价组名称不能为空");
      const id = `G-${Date.now().toString().slice(-4)}`;
      state.quote.groups.unshift({ id, name, customerIds: [state.quote.selectedCustomerId] });
      state.quote.batchGroupId = id;
      state.quote.groupModalOpen = false;
      render();
      toast("报价组已创建", name);
    });
    const addCustomerQuery = $("#quote-add-customer-query");
    if (addCustomerQuery) addCustomerQuery.addEventListener("input", event => {
      state.quote.addCustomerQuery = event.target.value;
      render();
      $("#quote-add-customer-query")?.focus();
    });
    $$('[data-quote-pending-customer]').forEach(el => el.addEventListener("change", event => {
      const selected = new Set(state.quote.pendingCustomerIds || []);
      event.target.checked ? selected.add(el.dataset.quotePendingCustomer) : selected.delete(el.dataset.quotePendingCustomer);
      state.quote.pendingCustomerIds = [...selected];
      render();
    }));
    const closeAddCustomerModal = () => { state.quote.addCustomerModalOpen = false; state.quote.pendingCustomerIds = []; render(); };
    $("#quote-add-customer-close")?.addEventListener("click", closeAddCustomerModal);
    $("#quote-add-customer-cancel")?.addEventListener("click", closeAddCustomerModal);
    $("#quote-add-customer-select-all")?.addEventListener("click", () => {
      const group = quoteSelectedGroup();
      const key = state.quote.addCustomerQuery.trim().toLowerCase();
      state.quote.pendingCustomerIds = state.quote.customers
        .filter(customer => !group.customerIds.includes(customer.id))
        .filter(customer => !key || `${customer.name} ${customer.code} ${customer.broker}`.toLowerCase().includes(key))
        .map(customer => customer.id);
      render();
    });
    $("#quote-add-customer-confirm")?.addEventListener("click", () => {
      const group = quoteSelectedGroup();
      const ids = state.quote.pendingCustomerIds.filter(id => !group.customerIds.includes(id));
      if (!ids.length) return toast("请选择客户", "至少选择一位客户加入报价组");
      group.customerIds.push(...ids);
      state.quote.addCustomerModalOpen = false;
      state.quote.pendingCustomerIds = [];
      render();
      toast("客户已加入报价组", `${ids.length} 位客户`);
    });
    $$('[data-quote-history-tab]').forEach(el => el.addEventListener("click", () => {
      state.quote.historyTab = el.dataset.quoteHistoryTab;
      state.quote.historyDetail = null;
      render();
    }));
    const historyDate = $("#quote-history-date");
    if (historyDate) historyDate.addEventListener("change", event => { state.quote.historyDate = event.target.value; render(); });
    const historySearch = $("#quote-history-search");
    if (historySearch) historySearch.addEventListener("click", () => {
      render();
      toast("历史报价已筛选", state.quote.historyDate);
    });
    const historyReset = $("#quote-history-reset");
    if (historyReset) historyReset.addEventListener("click", () => { state.quote.historyDate = "2026-08-06"; render(); });
    const historyCustomer = $("#quote-history-customer");
    if (historyCustomer) historyCustomer.addEventListener("change", event => { state.quote.historyCustomerId = event.target.value; render(); });
    const historyCustomerSearchInput = $("#quote-history-customer-search-input");
    if (historyCustomerSearchInput) historyCustomerSearchInput.addEventListener("input", event => {
      state.quote.historyCustomerQuery = event.target.value;
      state.quote.historyCustomerDropdownOpen = true;
      render();
      $("#quote-history-customer-search-input")?.focus();
    });
    const historyCustomerToggle = $("#quote-history-customer-toggle");
    if (historyCustomerToggle) historyCustomerToggle.addEventListener("click", () => { state.quote.historyCustomerDropdownOpen = !state.quote.historyCustomerDropdownOpen; render(); });
    $$('[data-quote-history-pick-customer]').forEach(el => el.addEventListener("click", () => {
      const customer = state.quote.customers.find(item => item.id === el.dataset.quoteHistoryPickCustomer);
      if (!customer) return;
      state.quote.historyCustomerId = customer.id;
      state.quote.historyCustomerQuery = `${customer.name} (${customer.code})`;
      state.quote.historyCustomerDropdownOpen = false;
      render();
    }));
    const historyCustomerSearch = $("#quote-history-customer-search");
    if (historyCustomerSearch) historyCustomerSearch.addEventListener("click", () => {
      const match = quoteCustomerMatches(state.quote.historyCustomerQuery)[0];
      if (match) {
        state.quote.historyCustomerId = match.id;
        state.quote.historyCustomerQuery = `${match.name} (${match.code})`;
      }
      render();
      toast("客户报价已筛选", quoteCustomerLabel(state.quote.customers.find(customer => customer.id === state.quote.historyCustomerId) || state.quote.customers[0]));
    });
    const historyRefresh = $("#quote-history-refresh");
    if (historyRefresh) historyRefresh.addEventListener("click", () => toast("客户报价已刷新", "已同步当前演示数据"));
    $$('[data-quote-history-detail]').forEach(el => el.addEventListener("click", () => {
      state.quote.historyDetail = el.dataset.quoteHistoryDetail;
      render();
    }));
    const historyClose = $("#quote-history-close");
    if (historyClose) historyClose.addEventListener("click", () => { state.quote.historyDetail = null; render(); });
    const detailBackdrop = $(".quote-detail-backdrop");
    if (detailBackdrop) detailBackdrop.addEventListener("click", event => { if (event.target === event.currentTarget) { state.quote.historyDetail = null; render(); } });
  }

  function bindPageEvents() {
    $$('[data-view]').forEach(el => el.addEventListener("click", () => navigate(el.dataset.view)));
    bindQuoteEvents();
    bindDispatchEvents();
    $$('[data-role-jump]').forEach(el => el.addEventListener("click", () => { state.view = "flow"; switchRole(el.dataset.roleJump, true); }));
    $$('[data-open-customer]').forEach(el => {
      el.addEventListener("click", event => { event.stopPropagation(); openCustomer(el.dataset.openCustomer); });
      el.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") openCustomer(el.dataset.openCustomer); });
    });
    $$('[data-open-sub-customer]').forEach(el => {
      el.addEventListener("click", event => { event.stopPropagation(); openSubCustomer(el.dataset.openSubCustomer); });
      el.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") openSubCustomer(el.dataset.openSubCustomer); });
    });
    $$('[data-case-status]').forEach(el => el.addEventListener("click", () => {
      state.caseStatus = el.dataset.caseStatus;
      const first = state.cases.find(item => item.status === state.caseStatus);
      state.selectedCase = first?.id || null;
      render();
    }));
    $$('[data-compliance-tab]').forEach(el => el.addEventListener("click", () => {
      state.complianceQueueTab = el.dataset.complianceTab;
      state.complianceReviewingCase = null;
      state.complianceQueueType = "全部审核类型";
      state.complianceQueueStatus = "全部状态";
      state.complianceQueueConclusion = "全部";
      render();
    }));
    const complianceSearch = $("#compliance-queue-search");
    if (complianceSearch) {
      complianceSearch.addEventListener("input", event => { state.complianceQueueSearch = event.target.value; });
      complianceSearch.addEventListener("keydown", event => { if (event.key === "Enter") render(); });
    }
    const complianceSearchBtn = $("#compliance-queue-search-btn");
    if (complianceSearchBtn) complianceSearchBtn.addEventListener("click", render);
    const complianceTypeFilter = $("#compliance-type-filter");
    if (complianceTypeFilter) complianceTypeFilter.addEventListener("change", event => { state.complianceQueueType = event.target.value; render(); });
    const complianceStatusFilter = $("#compliance-status-filter");
    if (complianceStatusFilter) complianceStatusFilter.addEventListener("change", event => { state.complianceQueueStatus = event.target.value; render(); });
    const complianceConclusionFilter = $("#compliance-conclusion-filter");
    if (complianceConclusionFilter) complianceConclusionFilter.addEventListener("change", event => { state.complianceQueueConclusion = event.target.value; render(); });
    const complianceFinalFilter = $("#compliance-final-filter");
    if (complianceFinalFilter) complianceFinalFilter.addEventListener("change", event => { state.complianceQueueConclusion = event.target.value; render(); });
    const complianceReset = $("#compliance-filter-reset");
    if (complianceReset) complianceReset.addEventListener("click", () => { Object.assign(state, { complianceQueueSearch: "", complianceQueueType: "全部审核类型", complianceQueueStatus: "全部状态", complianceQueueConclusion: "全部" }); render(); });
    $$('[data-compliance-open-review]').forEach(el => el.addEventListener("click", () => { state.complianceReviewingCase = el.dataset.complianceOpenReview; state.selectedCase = el.dataset.complianceOpenReview; state.complianceConclusionDraft = { decision: "", note: "" }; render(); }));
    const complianceReviewBack = $("#compliance-review-back");
    if (complianceReviewBack) complianceReviewBack.addEventListener("click", () => { state.complianceReviewingCase = null; state.complianceConclusionDraft = { decision: "", note: "" }; render(); });
    $$('[name="compliance-conclusion"]').forEach(el => el.addEventListener("change", () => { state.complianceConclusionDraft.decision = el.value; render(); }));
    const conclusionNote = $("#compliance-conclusion-note");
    if (conclusionNote) conclusionNote.addEventListener("input", event => {
      state.complianceConclusionDraft.note = event.target.value;
      const draft = state.complianceConclusionDraft;
      const submit = $("#compliance-conclusion-submit");
      if (submit) submit.disabled = !draft.decision || (draft.decision === "reject" && !event.target.value.trim());
      const hintEl = $("#compliance-conclusion-hint");
      if (hintEl && draft.decision === "reject") hintEl.textContent = event.target.value.trim() ? "提交后案件退回 交易员 处理" : "驳回必须填写审核说明";
    });
    const conclusionSubmit = $("#compliance-conclusion-submit");
    if (conclusionSubmit) conclusionSubmit.addEventListener("click", () => submitComplianceConclusion(conclusionSubmit.dataset.caseId));
    bindKycConfigEvents();
    $$('[data-select-case]').forEach(el => el.addEventListener("click", () => { state.selectedCase = el.dataset.selectCase; render(); }));
    $$('[data-case-action]').forEach(el => el.addEventListener("click", () => handleCaseAction(el.dataset.caseAction, el.dataset.caseId)));
    $$('[data-review-field]').forEach(el => el.addEventListener(el.tagName === "SELECT" ? "change" : "input", event => {
      const index = Number(event.target.dataset.reviewIndex);
      updateCaseReviewDraft(event.target.dataset.reviewCase, draft => {
        draft.materials[index][event.target.dataset.reviewField] = event.target.value;
        if (event.target.dataset.reviewField === "decision") {
          const hasRejected = draft.materials.some(material => material.decision === "待补件");
          const hasPending = draft.materials.some(material => material.decision === "待审核");
          draft.overallDecision = hasRejected ? "待补件" : hasPending ? "待定" : "提交合规";
          draft.followupAction = hasRejected ? "发起补件并等待客户重传" : hasPending ? "继续完成审核" : "提交合规复核";
        }
      });
    }));
    $$('[data-review-output]').forEach(el => el.addEventListener(el.tagName === "SELECT" ? "change" : "input", event => {
      updateCaseReviewDraft(event.target.dataset.reviewCase, draft => { draft[event.target.dataset.reviewOutput] = event.target.value; });
    }));
    $$('[data-supplement-item]').forEach(el => el.addEventListener("change", event => {
      updateCaseReviewDraft(event.target.dataset.supplementCase, draft => {
        const values = new Set(draft.selectedSupplementIds || []);
        if (event.target.checked) values.add(event.target.dataset.supplementItem);
        else values.delete(event.target.dataset.supplementItem);
        draft.selectedSupplementIds = supplementChecklist.map(option => option.id).filter(id => values.has(id));
        if (draft.selectedSupplementIds.length) {
          draft.overallDecision = "待补件";
          draft.followupAction = "发起补件并等待客户补齐材料";
        } else {
          const hasRejected = draft.materials.some(material => material.decision === "待补件");
          const hasPending = draft.materials.some(material => material.decision === "待审核");
          draft.overallDecision = hasRejected ? "待补件" : hasPending ? "待定" : "提交合规";
          draft.followupAction = hasRejected ? "发起补件并等待客户重传" : hasPending ? "继续完成审核" : "提交合规复核";
        }
      });
    }));
    $$('[data-copy-notice]').forEach(el => el.addEventListener("click", async () => {
      const text = ensureCaseReviewDraft(state.cases.find(item => item.id === el.dataset.copyNotice), state.customers.find(customer => customer.id === state.cases.find(item => item.id === el.dataset.copyNotice)?.customerId)).notificationText;
      try {
        await navigator.clipboard.writeText(text);
        toast("通知文本已复制", "可直接发送给 交易员");
      } catch {
        toast("复制失败", "当前浏览器不支持自动复制，请手动复制文本");
      }
    }));
    $$('[data-review-material]').forEach(el => el.addEventListener("click", () => { const selected = state.cases.find(item => item.id === state.selectedCase); const customer = state.customers.find(item => item.id === selected?.customerId); const material = customer?.materialSubmission?.items[Number(el.dataset.reviewMaterial)]; if (!material) return; material[el.dataset.reviewRole === "compliance" ? "complianceDecision" : "opsDecision"] = el.dataset.reviewDecision; render(); toast(`材料已${el.dataset.reviewDecision}`, material.category); }));
    const flowButton = $("#flow-action"); if (flowButton) flowButton.addEventListener("click", handleFlowAction);
    const resetFlow = $("#reset-flow"); if (resetFlow) resetFlow.addEventListener("click", resetFlowOnly);
    const customerSearch = $("#customer-search"); if (customerSearch) customerSearch.addEventListener("input", event => {
      const cursorStart = event.target.selectionStart ?? event.target.value.length;
      const cursorEnd = event.target.selectionEnd ?? cursorStart;
      state.customerSearch = event.target.value;
      state.customerPage = 1;
      render();
      const nextInput = $("#customer-search");
      if (nextInput) {
        nextInput.focus();
        nextInput.setSelectionRange(cursorStart, cursorEnd);
      }
    });
    const statusFilter = $("#status-filter"); if (statusFilter) statusFilter.addEventListener("change", event => { state.customerStatus = event.target.value; state.customerPage = 1; render(); });
    const typeFilter = $("#type-filter"); if (typeFilter) typeFilter.addEventListener("change", event => { state.customerType = event.target.value; state.customerPage = 1; render(); });
    $$('[data-customer-page]').forEach(el => el.addEventListener("click", () => { state.customerPage = Number(el.dataset.customerPage); render(); }));
    const clearFilters = $("#clear-filters"); if (clearFilters) clearFilters.addEventListener("click", () => { state.customerSearch = ""; state.customerStatus = "全部状态"; state.customerType = "全部类型"; state.customerPage = 1; render(); });
    const createCustomerOpen = $("#customer-create-open"); if (createCustomerOpen) createCustomerOpen.addEventListener("click", openCustomerModal);
    $$('[data-toggle-intermediary]').forEach(el => el.addEventListener("click", event => { event.stopPropagation(); toggleIntermediary(el.dataset.toggleIntermediary); }));
    $$('[data-edit-customer-info]').forEach(el => el.addEventListener("click", event => { event.stopPropagation(); openNumberEdit(el.dataset.editCustomerInfo); }));
    $$('[data-edit-sub-customer]').forEach(el => el.addEventListener("click", event => { event.stopPropagation(); openSubCustomerEdit(el.dataset.editSubCustomer); }));
    const customerModalForm = $("#customer-modal-form"); if (customerModalForm) customerModalForm.addEventListener("submit", submitCustomerModal);
    $$('[name="customerKind"]').forEach(el => el.addEventListener("change", event => updateCustomerModalDraft({ customerKind: event.target.value, generateClientNo: true, clientNo: state.customerModal?.draft.clientNo || nextAvailableClientNo() })));
    // ---- Broker Combobox: fully surgical, never calls render() during interaction ----
    const brokerSearchInput = $("#modal-broker-search");
    if (brokerSearchInput) {

      // Helper: build and inject dropdown into DOM, then wire up mousedown handlers
      function syncBrokerDropdown() {
        if (!state.customerModal) return;
        const draft = state.customerModal.draft;
        const combobox = document.querySelector(".broker-combobox");
        if (!combobox) return;
        let existing = combobox.querySelector(".broker-dropdown");
        if (!draft.parentDropdownOpen) {
          if (existing) existing.remove();
          return;
        }
        const html = renderBrokerDropdown(draft);
        if (existing) {
          existing.outerHTML = html;
        } else {
          combobox.insertAdjacentHTML("beforeend", html);
        }
        // Re-query after DOM mutation (outerHTML replaces the node)
        combobox.querySelectorAll("[data-broker-id]").forEach(optEl => {
          optEl.addEventListener("mousedown", (ev) => {
            ev.preventDefault();
            const broker = state.customers.find(c => c.id === optEl.dataset.brokerId);
            if (broker) selectBroker(broker);
          });
        });
      }

      // Helper: highlight refresh without touching input or re-render
      function refreshHighlight(idx) {
        document.querySelectorAll(".broker-dropdown .broker-option").forEach((el, i) => {
          el.classList.toggle("highlighted", i === idx);
        });
      }

      // Helper: select a broker, update state & input display, close dropdown
      function selectBroker(broker) {
        if (!state.customerModal) return;
        const label = `${broker.name} (${customerNo(broker)})`;
        state.customerModal.draft.parentId = broker.id;
        state.customerModal.draft.parentSearchText = label;
        state.customerModal.draft.parentDropdownOpen = false;
        state.customerModal.draft.parentHighlightIndex = 0;
        // Update the input value in place
        const inp = $("#modal-broker-search");
        if (inp) inp.value = label;
        // Swap search icon → clear button without full render
        const wrap = document.querySelector(".broker-search-input-wrap");
        if (wrap) {
          const icon = wrap.querySelector(".broker-search-icon");
          if (icon) {
            icon.outerHTML = `<button type="button" id="modal-broker-clear" class="broker-clear-btn" title="清除已选">×</button>`;
            const clearBtn = wrap.querySelector("#modal-broker-clear");
            if (clearBtn) clearBtn.addEventListener("click", onClearBroker);
          }
        }
        // Remove dropdown
        const dropdown = document.querySelector(".broker-dropdown");
        if (dropdown) dropdown.remove();
      }

      // Handler: clear broker selection
      function onClearBroker(e) {
        e.preventDefault();
        if (!state.customerModal) return;
        state.customerModal.draft.parentId = "";
        state.customerModal.draft.parentSearchText = "";
        state.customerModal.draft.parentDropdownOpen = true;
        state.customerModal.draft.parentHighlightIndex = 0;
        const inp = $("#modal-broker-search");
        if (inp) { inp.value = ""; inp.focus(); }
        // Swap clear button → search icon
        const wrap = document.querySelector(".broker-search-input-wrap");
        if (wrap) {
          const btn = wrap.querySelector(".broker-clear-btn");
          if (btn) btn.outerHTML = `<span class="broker-search-icon">⌕</span>`;
        }
        syncBrokerDropdown();
      }

      brokerSearchInput.addEventListener("focus", () => {
        if (!state.customerModal) return;
        if (state.customerModal.draft.parentId) return; // already selected, don't re-open
        state.customerModal.draft.parentDropdownOpen = true;
        state.customerModal.draft.parentHighlightIndex = 0;
        syncBrokerDropdown();
      });

      brokerSearchInput.addEventListener("input", (e) => {
        if (!state.customerModal) return;
        const val = e.target.value;
        state.customerModal.draft.parentSearchText = val;
        state.customerModal.draft.parentId = "";
        state.customerModal.draft.parentDropdownOpen = true;
        state.customerModal.draft.parentHighlightIndex = 0;
        syncBrokerDropdown();
      });

      brokerSearchInput.addEventListener("keydown", (e) => {
        const draft = state.customerModal?.draft;
        if (!draft) return;
        const matching = getMatchingBrokers(state, draft.parentSearchText || "");

        if (e.key === "ArrowDown") {
          e.preventDefault();
          if (!draft.parentDropdownOpen) {
            draft.parentDropdownOpen = true;
            draft.parentHighlightIndex = 0;
            syncBrokerDropdown();
          } else if (matching.length > 0) {
            draft.parentHighlightIndex = (draft.parentHighlightIndex + 1) % matching.length;
            refreshHighlight(draft.parentHighlightIndex);
          }
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          if (draft.parentDropdownOpen && matching.length > 0) {
            draft.parentHighlightIndex = (draft.parentHighlightIndex - 1 + matching.length) % matching.length;
            refreshHighlight(draft.parentHighlightIndex);
          }
        } else if (e.key === "Enter") {
          if (draft.parentDropdownOpen && matching.length > 0) {
            e.preventDefault();
            const selected = matching[draft.parentHighlightIndex || 0];
            if (selected) selectBroker(selected);
          }
        } else if (e.key === "Escape") {
          draft.parentDropdownOpen = false;
          const dropdown = document.querySelector(".broker-dropdown");
          if (dropdown) dropdown.remove();
        }
      });

      // Close dropdown when clicking outside
      document.addEventListener("click", (e) => {
        if (!state.customerModal?.draft) return;
        const combobox = document.querySelector(".broker-combobox");
        if (combobox && !combobox.contains(e.target)) {
          state.customerModal.draft.parentDropdownOpen = false;
          const dropdown = document.querySelector(".broker-dropdown");
          if (dropdown) dropdown.remove();
        }
      }, { capture: false });
    }

    const brokerClearBtn = $("#modal-broker-clear");
    if (brokerClearBtn) {
      brokerClearBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (!state.customerModal) return;
        state.customerModal.draft.parentId = "";
        state.customerModal.draft.parentSearchText = "";
        state.customerModal.draft.parentDropdownOpen = true;
        state.customerModal.draft.parentHighlightIndex = 0;
        const inp = $("#modal-broker-search");
        if (inp) { inp.value = ""; inp.focus(); }
        const wrap = document.querySelector(".broker-search-input-wrap");
        if (wrap) {
          const btn = wrap.querySelector(".broker-clear-btn");
          if (btn) btn.outerHTML = `<span class="broker-search-icon">⌕</span>`;
        }
        const dropdown = document.querySelector(".broker-dropdown");
        if (dropdown) dropdown.remove();
        // Re-sync dropdown
        state.customerModal.draft.parentDropdownOpen = true;
        const combobox = document.querySelector(".broker-combobox");
        if (combobox) {
          const html = (function() {
            const d = state.customerModal.draft;
            const matching = getMatchingBrokers(state, d.parentSearchText || "");
            if (!matching.length) return `<div class="broker-dropdown shadow-float"><div class="broker-dropdown-empty">未找到匹配的中介（可输入中介名称或编号搜索）</div></div>`;
            return `<div class="broker-dropdown shadow-float" id="broker-dropdown-menu">${matching.map((b, idx) => {
              const isHighlighted = idx === (d.parentHighlightIndex || 0);
              const isSelected = b.id === d.parentId;
              return `<div class="broker-option ${isHighlighted ? "highlighted" : ""} ${isSelected ? "selected" : ""}" data-broker-id="${b.id}" data-broker-index="${idx}"><div class="broker-option-header"><strong>${escapeHtml(b.name)}</strong><span class="broker-code">${customerNo(b)}</span></div><div class="broker-option-meta">地区: ${escapeHtml(b.region)} · 交易员: ${escapeHtml(b.agent)}</div></div>`;
            }).join("")}</div>`;
          })();
          combobox.insertAdjacentHTML("beforeend", html);
          combobox.querySelectorAll("[data-broker-id]").forEach(el => {
            el.addEventListener("mousedown", (ev) => {
              ev.preventDefault();
              const broker = state.customers.find(c => c.id === el.dataset.brokerId);
              if (broker) {
                const label = `${broker.name} (${customerNo(broker)})`;
                state.customerModal.draft.parentId = broker.id;
                state.customerModal.draft.parentSearchText = label;
                state.customerModal.draft.parentDropdownOpen = false;
                updateCustomerModalDraft({});
              }
            });
          });
        }
        setTimeout(() => $("#modal-broker-search")?.focus(), 0);
      });
    }

    $$('[data-broker-id]').forEach(el => el.addEventListener("mousedown", (e) => {
      e.preventDefault();
      const brokerId = el.dataset.brokerId;
      const broker = state.customers.find(c => c.id === brokerId);
      if (broker) {
        updateCustomerModalDraft({
          parentId: broker.id,
          parentSearchText: `${broker.name} (${customerNo(broker)})`,
          parentDropdownOpen: false,
          parentHighlightIndex: 0
        });
      }
    }));
    $$('[name="subType"]').forEach(el => el.addEventListener("change", event => {
      updateCustomerModalDraft({ subType: event.target.value });
    }));
    const modalGenerateNumber = $("#modal-generate-number"); if (modalGenerateNumber) modalGenerateNumber.addEventListener("change", event => updateCustomerModalDraft({ generateClientNo: event.target.checked, clientNo: event.target.checked ? state.customerModal?.draft.clientNo || nextAvailableClientNo() : state.customerModal?.draft.clientNo || nextAvailableClientNo() }));
    const customerModalBackdrop = $("#customer-modal-root .review-launch-backdrop"); if (customerModalBackdrop) customerModalBackdrop.addEventListener("click", event => { if (event.target === event.currentTarget) closeCustomerMasterModal(); });
    const customerModalClose = $("#customer-modal-close"); if (customerModalClose) customerModalClose.addEventListener("click", closeCustomerMasterModal);
    const customerModalCancel = $("#customer-modal-cancel"); if (customerModalCancel) customerModalCancel.addEventListener("click", closeCustomerMasterModal);
    const numberEditForm = $("#number-edit-form"); if (numberEditForm) numberEditForm.addEventListener("submit", submitNumberEdit);
    const numberModalClose = $("#number-modal-close"); if (numberModalClose) numberModalClose.addEventListener("click", closeCustomerMasterModal);
    const numberModalCancel = $("#number-modal-cancel"); if (numberModalCancel) numberModalCancel.addEventListener("click", closeCustomerMasterModal);
    const form = $("#create-form-step"); if (form) form.addEventListener("submit", handleCreateStep);
    const createBack = $("#create-back"); if (createBack) createBack.addEventListener("click", () => { state.createStep = Math.max(1, state.createStep - 1); render(); });
    const createSubmit = $("#create-submit"); if (createSubmit) createSubmit.addEventListener("click", createDraftCustomer);
    const ledgerAction = $("#ledger-action"); if (ledgerAction) ledgerAction.addEventListener("click", () => { state.view = "flow"; render(); toast("已打开主案例", "请在流程沙盘中完成对应步骤"); });
    const trackSubmit = $("#track-submit"); if (trackSubmit) trackSubmit.addEventListener("click", () => { $("#tracking-result").innerHTML = renderTrackingResult(); });
    const quotaSubmit = $("#quota-submit"); if (quotaSubmit) quotaSubmit.addEventListener("click", () => toast("库存预约已提交", "Q-2026-0713 已进入运营确认队列"));
    $$('.quota-confirm').forEach(el => el.addEventListener("click", () => { el.textContent = "已确认"; el.disabled = true; toast("库存已确认", "预约结果已同步给 交易员"); }));
    $$('.match-candidate').forEach(el => el.addEventListener("click", () => { $$('.match-candidate').forEach(candidate => candidate.classList.remove("selected")); el.classList.add("selected"); }));
    const receiptSubmit = $("#receipt-submit"); if (receiptSubmit) receiptSubmit.addEventListener("click", () => toast("凭证已提交", "TRX-982701 已进入运营凭证匹配队列"));
    const commissionConfirm = $("#commission-confirm"); if (commissionConfirm) commissionConfirm.addEventListener("click", () => { state.commissionConfirmed = true; render(); toast("佣金已确认", "CM-2026-0318 已进入财务结算"); });
    const quickUploadCustomer = $("#quick-upload-customer");
    if (quickUploadCustomer) {
      const syncQuickCustomerDropdown = () => {
        const upload = state.quickMaterialUpload;
        const combobox = $(".quick-customer-combobox");
        if (!combobox) return;
        const existing = $(".quick-customer-dropdown", combobox);
        if (!upload.customerDropdownOpen) {
          if (existing) existing.remove();
          return;
        }
        const matches = getMatchingUploadCustomers(upload.customerNo);
        if (upload.customerHighlightIndex >= matches.length) upload.customerHighlightIndex = 0;
        const html = renderQuickCustomerDropdown(matches, upload.customerHighlightIndex);
        if (existing) existing.outerHTML = html;
        else combobox.insertAdjacentHTML("beforeend", html);
        $$("[data-quick-customer-pick]", combobox).forEach(option => {
          option.addEventListener("mousedown", event => {
            event.preventDefault();
            const customer = getUploadCustomerByKey(option.dataset.quickCustomerPick);
            if (!customer) return;
            state.quickMaterialUpload.customerNo = uploadCustomerLabel(customer);
            state.quickMaterialUpload.customerDropdownOpen = false;
            state.quickMaterialUpload.customerHighlightIndex = 0;
            render();
          });
        });
      };
      const refreshQuickCustomerHighlight = () => {
        const dropdown = $(".quick-customer-dropdown");
        const options = $$(".quick-customer-dropdown .quick-customer-option");
        options.forEach((option, index) => {
          const highlighted = index === state.quickMaterialUpload.customerHighlightIndex;
          option.classList.toggle("highlighted", highlighted);
          if (!highlighted || !dropdown) return;
          if (index === 0) dropdown.scrollTop = 0;
          else if (index === options.length - 1) dropdown.scrollTop = dropdown.scrollHeight;
          else option.scrollIntoView({ block: "nearest" });
        });
      };
      quickUploadCustomer.addEventListener("focus", () => {
        state.quickMaterialUpload.customerDropdownOpen = true;
        state.quickMaterialUpload.customerHighlightIndex = 0;
        syncQuickCustomerDropdown();
      });
      quickUploadCustomer.addEventListener("input", event => {
        state.quickMaterialUpload.customerNo = event.target.value;
        state.quickMaterialUpload.customerDropdownOpen = true;
        state.quickMaterialUpload.customerHighlightIndex = 0;
        syncQuickCustomerDropdown();
      });
      quickUploadCustomer.addEventListener("keydown", event => {
        const matches = getMatchingUploadCustomers(state.quickMaterialUpload.customerNo);
        if (event.key === "ArrowDown") {
          event.preventDefault();
          state.quickMaterialUpload.customerDropdownOpen = true;
          state.quickMaterialUpload.customerHighlightIndex = matches.length ? (state.quickMaterialUpload.customerHighlightIndex + 1) % matches.length : 0;
          syncQuickCustomerDropdown();
          refreshQuickCustomerHighlight();
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          state.quickMaterialUpload.customerDropdownOpen = true;
          state.quickMaterialUpload.customerHighlightIndex = matches.length ? (state.quickMaterialUpload.customerHighlightIndex - 1 + matches.length) % matches.length : 0;
          syncQuickCustomerDropdown();
          refreshQuickCustomerHighlight();
        } else if (event.key === "Enter") {
          if (!state.quickMaterialUpload.customerDropdownOpen || !matches.length) return;
          event.preventDefault();
          const customer = matches[state.quickMaterialUpload.customerHighlightIndex || 0];
          if (!customer) return;
          state.quickMaterialUpload.customerNo = uploadCustomerLabel(customer);
          state.quickMaterialUpload.customerDropdownOpen = false;
          state.quickMaterialUpload.customerHighlightIndex = 0;
          render();
        } else if (event.key === "Escape") {
          state.quickMaterialUpload.customerDropdownOpen = false;
          syncQuickCustomerDropdown();
        }
      });
      document.addEventListener("click", event => {
        const combobox = $(".quick-customer-combobox");
        if (!combobox || combobox.contains(event.target)) return;
        state.quickMaterialUpload.customerDropdownOpen = false;
        $(".quick-customer-dropdown", combobox)?.remove();
      });
    }
    const quickSubclientName = $("#quick-subclient-name"); if (quickSubclientName) quickSubclientName.addEventListener("input", event => { state.quickMaterialUpload.newSubName = event.target.value; render(); $("#quick-subclient-name")?.focus(); });
    $$('[data-quick-demo-code]').forEach(el => el.addEventListener("click", () => {
      state.quickMaterialUpload.customerNo = el.dataset.quickDemoCode;
      if (el.dataset.quickDemoCode === "20002") Object.assign(state.quickMaterialUpload, { archiveTarget: "sub", subMode: "new", newSubName: "新加坡海峡创新基金 Ltd" });
      render();
      toast("已载入测试编号", el.dataset.quickDemoCode);
    }));
    const quickUploadFiles = $("#quick-upload-files"); if (quickUploadFiles) quickUploadFiles.addEventListener("change", event => addQuickUploadFiles(event.target.files));
    const quickDropzone = $("#quick-dropzone"); if (quickDropzone) {
      ["dragenter", "dragover"].forEach(type => quickDropzone.addEventListener(type, event => { event.preventDefault(); quickDropzone.classList.add("dragging"); }));
      ["dragleave", "drop"].forEach(type => quickDropzone.addEventListener(type, event => { event.preventDefault(); quickDropzone.classList.remove("dragging"); }));
      quickDropzone.addEventListener("drop", event => addQuickUploadFiles(event.dataTransfer.files));
    }
    const quickSubmitNote = $("#quick-submit-note"); if (quickSubmitNote) quickSubmitNote.addEventListener("input", event => { state.quickMaterialUpload.submitNote = event.target.value; });
    const quickKycScenario = $("#quick-kyc-scenario"); if (quickKycScenario) quickKycScenario.addEventListener("change", event => {
      const scenario = state.kycConfig.scenarios.find(item => item.id === Number(event.target.value)) || state.kycConfig.scenarios[0];
      state.quickMaterialUpload.kycScenarioId = scenario?.id || 0;
      state.quickMaterialUpload.kycChannelIndex = 0;
      state.quickMaterialUpload.businessType = scenario?.name || "";
      render();
    });
    $$('[data-quick-channel]').forEach(el => el.addEventListener("click", () => {
      state.quickMaterialUpload.kycChannelIndex = Number(el.dataset.quickChannel) || 0;
      render();
    }));
    const quickSubmitBusinessType = $("#quick-submit-business-type"); if (quickSubmitBusinessType) quickSubmitBusinessType.addEventListener("change", event => { state.quickMaterialUpload.businessType = event.target.value; });
    const quickSubmitCustomerName = $("#quick-submit-customer-name"); if (quickSubmitCustomerName) quickSubmitCustomerName.addEventListener("input", event => { state.quickMaterialUpload.customerName = event.target.value; });
    $$('[name="quickDestination"]').forEach(el => el.addEventListener("change", event => { state.quickMaterialUpload.destination = event.target.value; render(); }));
    $$('[name="quickArchiveTarget"]').forEach(el => el.addEventListener("change", event => { state.quickMaterialUpload.archiveTarget = event.target.value; render(); }));
    $$('[name="quickSubMode"]').forEach(el => el.addEventListener("change", event => { state.quickMaterialUpload.archiveTarget = "sub"; state.quickMaterialUpload.subMode = event.target.value; render(); }));
    $$('[data-quick-file-remove]').forEach(el => el.addEventListener("click", () => { removeQuickUploadFile(Number(el.dataset.quickFileRemove)); }));
    $$('[data-quick-file-category]').forEach(el => el.addEventListener("change", event => {
      const file = state.quickMaterialUpload.files[Number(el.dataset.quickFileCategory)];
      if (file) file.mappedCategory = event.target.value;
    }));
    const quickUploadClear = $("#quick-upload-clear"); if (quickUploadClear) quickUploadClear.addEventListener("click", () => { state.quickMaterialUpload = initialQuickMaterialUpload(); render(); });
    const quickUploadSubmit = $("#quick-upload-submit"); if (quickUploadSubmit) quickUploadSubmit.addEventListener("click", submitQuickMaterialUpload);
    $$('[data-material-order]').forEach(el => el.addEventListener("click", () => { if (el.dataset.orderAction === "detail") openMaterialOrderDetail(el.dataset.materialOrder); else continueMaterialOrder(el.dataset.materialOrder); }));
    const orderSearch = $("#material-order-search"); if (orderSearch) orderSearch.addEventListener("input", () => filterMaterialOrders());
    const orderFilter = $("#material-order-filter"); if (orderFilter) orderFilter.addEventListener("change", () => filterMaterialOrders());
    const materialBackList = $("#material-back-list"); if (materialBackList) materialBackList.addEventListener("click", () => { syncMaterialOrderDraft(); state.materialFlow.mode = "list"; render(); });
    $$('[data-material-goto]').forEach(el => el.addEventListener("click", () => { state.materialFlow.step = Number(el.dataset.materialGoto); render(); }));
    const materialAuthorized = $("#material-authorized"); if (materialAuthorized) materialAuthorized.addEventListener("change", event => { state.materialFlow.authorized = event.target.checked; render(); });
    $$('[data-material-prev]').forEach(el => el.addEventListener("click", () => { state.materialFlow.step = Math.max(1, state.materialFlow.step - 1); syncMaterialOrderDraft(); render(); }));
    $$('[data-material-next]').forEach(el => el.addEventListener("click", () => { saveMaterialFields(); state.materialFlow.step = Math.min(5, state.materialFlow.step + 1); syncMaterialOrderDraft(); render(); }));
    $$('.material-item-input').forEach(el => el.addEventListener("change", handleMaterialFiles));
    const materialDemoFiles = $("#material-demo-files"); if (materialDemoFiles) materialDemoFiles.addEventListener("click", loadDemoMaterialFiles);
    $$('[data-material-remove]').forEach(el => el.addEventListener("click", () => { const item = state.materialFlow.files[Number(el.dataset.materialRemove)]; Object.assign(item, { name: "", size: 0, type: "", url: "", ocrState: "未上传" }); state.materialFlow.ocrComplete = false; render(); }));
    const supplementDropzone = $("#supplement-dropzone");
    if (supplementDropzone) {
      const supplementInput = $("#supplement-file-input");
      supplementDropzone.addEventListener("click", event => { if (event.target !== supplementInput) supplementInput.click(); });
      supplementDropzone.addEventListener("dragover", event => { event.preventDefault(); supplementDropzone.classList.add("dragover"); });
      supplementDropzone.addEventListener("dragleave", () => supplementDropzone.classList.remove("dragover"));
      supplementDropzone.addEventListener("drop", event => { event.preventDefault(); supplementDropzone.classList.remove("dragover"); addSupplementFiles(event.dataTransfer.files); });
      supplementInput.addEventListener("change", event => { addSupplementFiles(event.target.files); event.target.value = ""; });
    }
    $$('[data-supplement-match]').forEach(el => el.addEventListener("change", () => { state.materialFlow.supplementUploads[Number(el.dataset.supplementMatch)].itemKey = el.value; render(); }));
    $$('[data-supplement-remove]').forEach(el => el.addEventListener("click", () => { const removed = state.materialFlow.supplementUploads.splice(Number(el.dataset.supplementRemove), 1)[0]; if (removed?.url?.startsWith("blob:")) URL.revokeObjectURL(removed.url); render(); }));
    const supplementSubmit = $("#supplement-submit"); if (supplementSubmit) supplementSubmit.addEventListener("click", submitSupplement);
    $$('input[name="generationPath"]').forEach(el => el.addEventListener("change", () => { state.materialFlow.generationPath = el.value; render(); }));
    const uploadContinue = $("#material-upload-continue"); if (uploadContinue) uploadContinue.addEventListener("click", () => { if (state.materialFlow.generationPath === "ocr") runMaterialOcr(); else { state.materialFlow.step = state.materialFlow.generationPath === "none" ? 5 : 4; render(); } });
    $$('[data-material-field]').forEach(el => el.addEventListener("input", () => { state.materialFlow.form[el.dataset.materialField] = el.value; state.materialFlow.editedFields.add(el.dataset.materialField); }));
    $$('[data-material-choice]').forEach(el => el.addEventListener("change", () => { const key = el.dataset.materialChoice; if (el.type === "checkbox") { const values = new Set(state.materialFlow.form[key] || []); el.checked ? values.add(el.value) : values.delete(el.value); state.materialFlow.form[key] = [...values]; } else state.materialFlow.form[key] = el.value; state.materialFlow.editedFields.add(key); render(); }));
    const materialConfirmed = $("#material-confirmed"); if (materialConfirmed) materialConfirmed.addEventListener("change", event => { state.materialFlow.confirmed = event.target.checked; render(); });
    const generatePdf = $("#material-generate-pdf"); if (generatePdf) generatePdf.addEventListener("click", generateApplicationPdf);
    const submitMaterialOps = $("#material-submit-ops"); if (submitMaterialOps) submitMaterialOps.addEventListener("click", submitMaterialToOps);
    const signedPdf = $("#signed-pdf-input"); if (signedPdf) signedPdf.addEventListener("change", event => attachSignedPdf(event.target.files[0]));
    $$('[data-pdf-preview]').forEach(el => el.addEventListener("click", () => openPdfPreview(el.dataset.pdfPreview, el.dataset.pdfName)));
    $$('[data-schedule-template]').forEach(el => el.addEventListener("click", () => selectScheduleTemplate(el.dataset.scheduleTemplate)));
    $$('[data-schedule-load-draft]').forEach(el => el.addEventListener("click", () => editScheduleDraft(el.dataset.scheduleLoadDraft)));
    $$('[data-va-account]').forEach(el => el.addEventListener("click", () => selectVaAccount(el.dataset.vaAccount)));
    $$('[data-schedule-field]').forEach(el => el.addEventListener(el.tagName === "SELECT" ? "change" : "input", event => updateScheduleFormField(event.target.dataset.scheduleField, event.target.value)));
    const scheduleStartBlank = $("#schedule-start-blank"); if (scheduleStartBlank) scheduleStartBlank.addEventListener("click", startBlankSchedule);
    const scheduleOcrImage = $("#schedule-ocr-image"); if (scheduleOcrImage) scheduleOcrImage.addEventListener("change", simulateScheduleImageOcr);
    $$('[data-schedule-template-field]').forEach(el => el.addEventListener("input", event => updateScheduleTemplateDraft(event.target.dataset.scheduleTemplateField, event.target.value)));
    const scheduleTemplateForm = $("#schedule-template-form"); if (scheduleTemplateForm) scheduleTemplateForm.addEventListener("submit", createScheduleTemplate);
    const scheduleOpenTemplateModal = $("#schedule-open-template-modal"); if (scheduleOpenTemplateModal) scheduleOpenTemplateModal.addEventListener("click", openScheduleTemplateModal);
    const scheduleSaveDraft = $("#schedule-save-draft"); if (scheduleSaveDraft) scheduleSaveDraft.addEventListener("click", () => saveScheduleOrder("草稿"));
    const scheduleSubmitOps = $("#schedule-submit-ops"); if (scheduleSubmitOps) scheduleSubmitOps.addEventListener("click", () => saveScheduleOrder("待运营处理"));
    $$('[data-schedule-edit]').forEach(el => el.addEventListener("click", () => editScheduleDraft(el.dataset.scheduleEdit)));
    $$('[data-schedule-preview]').forEach(el => el.addEventListener("click", () => previewScheduleOrder(el.dataset.schedulePreview)));
    $$('[data-schedule-status]').forEach(el => el.addEventListener("click", () => updateScheduleOrderStatus(el.dataset.scheduleStatus, el.dataset.nextStatus)));
  }

  function selectScheduleTemplate(templateId) {
    const template = state.scheduleTemplates.find(item => item.id === templateId);
    if (!template) return;
    state.selectedScheduleTemplateId = template.id;
    state.scheduleForm = initialScheduleForm(template);
    state.scheduleForm.started = true;
    render();
  }

  function updateScheduleFormField(key, value) {
    state.scheduleForm.started = true;
    if (key === "customerId") {
      const customer = state.customers.find(item => item.id === value);
      state.scheduleForm.customerId = value;
      state.scheduleForm.customerName = customer?.name || "";
      state.scheduleForm.customerQuery = customer ? `${customer.name} ${customer.id}` : value;
    } else if (key === "customerQuery") {
      state.scheduleForm.customerQuery = value;
      const accounts = scheduleMatchedVaAccounts({ ...state.scheduleForm, customerQuery: value });
      if (!accounts.some(account => account.id === state.scheduleForm.selectedVaAccountId)) {
        state.scheduleForm.selectedVaAccountId = "";
        Object.assign(state.scheduleForm, { virtualAccountNumber: "", iban: "", currency: "" });
      }
    } else {
      state.scheduleForm[key] = value;
      if (key === "rawScheduleText") Object.assign(state.scheduleForm, parseScheduleText(value));
    }
    const preview = $(".schedule-preview");
    if (preview) preview.textContent = schedulePreview(state.scheduleForm);
  }

  function startBlankSchedule() {
    state.scheduleForm = { ...initialScheduleForm(null), priority: "普通", started: true };
    state.scheduleForm.orderTitle = "";
    state.scheduleForm.rawScheduleText = "";
    render();
  }

  function scheduleMatchedVaAccounts(form = state.scheduleForm) {
    const query = String(form.customerQuery || form.customerId || form.customerName || "").trim().toLowerCase();
    if (!query) return [];
    return initialVaAccounts().filter(account => `${account.customerId} ${account.customerName}`.toLowerCase().includes(query));
  }

  function scheduleSelectedVaAccount() {
    return initialVaAccounts().find(account => account.id === state.scheduleForm.selectedVaAccountId) || null;
  }

  function selectVaAccount(accountId) {
    const account = initialVaAccounts().find(item => item.id === accountId);
    if (!account) return;
    Object.assign(state.scheduleForm, {
      selectedVaAccountId: account.id,
      started: true,
      customerId: account.customerId,
      customerName: account.customerName,
      customerQuery: `${account.customerName} ${account.customerId}`,
      virtualAccountNumber: account.virtualAccountNumber,
      iban: account.iban,
      currency: account.currency
    });
    render();
  }

  function simulateScheduleImageOcr(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = `收款人地址： RM C21, 2&3/F BLK 5 LONGYU, VIBE CENTRO 9 MUK NING STREET TO KWA WAN KLN
账户名称： Wu Aili
收款银行名称： 花旗银行
收款人开户国家 / 地区： Hong Kong
账户号码： 390 9613 2574
Swift Code/BIC 代码： CITIHKAX
金额： 100,000usd
出款账户： SGB Wu Aili`;
    state.scheduleForm.rawScheduleText = text;
    state.scheduleForm.started = true;
    Object.assign(state.scheduleForm, parseScheduleText(text));
    render();
    toast("图片识别完成", `${file.name} 的排单内容已写入文本框`);
  }

  function bindKycConfigEvents() {
    const cfg = state.kycConfig;
    const search = $("#kyc-engine-search");
    if (search) search.addEventListener("input", event => { cfg.searchQuery = event.target.value; render(); $("#kyc-engine-search")?.focus(); });
    const save = $("#kyc-config-save");
    if (save) save.addEventListener("click", () => { cfg.lastSavedAt = kycNowLabel(); render(); toast("合规规则配置已保存并发布", `版本时间 ${cfg.lastSavedAt}`); });
    const addScenario = $("#kyc-engine-add-scenario");
    if (addScenario) addScenario.addEventListener("click", () => {
      const nextCode = String(Math.max(12, ...cfg.scenarios.map(item => Number(item.code) || 0)) + 1);
      state.kycModal = { mode: "scenario-new", draft: { code: nextCode, name: "", process: "" }, error: "" };
      render();
    });
    const editScenario = $("#kyc-engine-edit-scenario");
    if (editScenario) editScenario.addEventListener("click", () => {
      const scenario = currentKycScenario();
      if (!scenario) return;
      state.kycModal = { mode: "scenario-edit", scenarioId: scenario.id, draft: { code: scenario.code, name: scenario.name, process: scenario.processDescription || "" }, error: "" };
      render();
    });
    const deleteScenario = $("#kyc-engine-delete-scenario");
    if (deleteScenario) deleteScenario.addEventListener("click", () => {
      const scenario = currentKycScenario();
      if (!scenario) return;
      showConfirm("删除该业务模式？", `#${scenario.code} ${scenario.name} 下的所有渠道与材料配置将一并删除，删除后不可恢复。`, "删除说明", "业务调整，停用该模式", "确认删除", () => {
        cfg.scenarios = cfg.scenarios.filter(item => item.id !== scenario.id);
        cfg.selectedScenarioId = cfg.scenarios[0]?.id || null;
        cfg.activeChannelIndex = 0;
        render();
        toast("业务模式已删除", `#${scenario.code} ${scenario.name}`);
      });
    });
    $$("[data-kyc-scenario]").forEach(el => el.addEventListener("click", () => {
      cfg.selectedScenarioId = Number(el.dataset.kycScenario);
      cfg.activeChannelIndex = 0;
      render();
    }));
    $$("[data-kyc-channel-tab]").forEach(el => el.addEventListener("click", () => {
      cfg.activeChannelIndex = Number(el.dataset.kycChannelTab) || 0;
      render();
    }));
    $$("[data-kyc-scenario-name]").forEach(el => el.addEventListener("input", event => {
      const scenario = cfg.scenarios.find(item => item.id === Number(el.dataset.kycScenarioName));
      if (scenario) scenario.name = event.target.value;
    }));
    $$("[data-kyc-scenario-process]").forEach(el => el.addEventListener("input", event => {
      const scenario = cfg.scenarios.find(item => item.id === Number(el.dataset.kycScenarioProcess));
      if (scenario) applyKycCombinedProcessText(scenario, currentKycEngineChannel(), event.target.value);
    }));
    const addChannel = $("#kyc-engine-add-channel");
    if (addChannel) addChannel.addEventListener("click", () => {
      if (!currentKycScenario()) return;
      state.kycModal = { mode: "channel-new", draft: { name: "", theme: "blue", sectionTitle: "" }, error: "" };
      render();
    });
    const editChannel = $("#kyc-engine-edit-channel");
    if (editChannel) editChannel.addEventListener("click", () => {
      const channel = currentKycEngineChannel();
      if (!channel) return;
      state.kycModal = { mode: "channel-edit", channelIndex: cfg.activeChannelIndex || 0, draft: { name: channel.name, theme: channel.theme || "blue" }, error: "" };
      render();
    });
    const deleteChannel = $("#kyc-engine-delete-channel");
    if (deleteChannel) deleteChannel.addEventListener("click", () => {
      const scenario = currentKycScenario();
      const channel = currentKycEngineChannel();
      if (!scenario || !channel) return;
      showConfirm("删除该渠道？", `${scenario.name} 下的「${channel.name}」渠道及其全部材料模块将被删除，删除后不可恢复。`, "删除说明", "渠道停用", "确认删除", () => {
        scenario.channels.splice(cfg.activeChannelIndex || 0, 1);
        cfg.activeChannelIndex = 0;
        render();
        toast("渠道已删除", `${scenario.name} · ${channel.name}`);
      });
    });
    const addSection = $("#kyc-engine-add-section");
    if (addSection) addSection.addEventListener("click", () => {
      const channel = currentKycEngineChannel();
      if (!channel) return;
      channel.sections.push({ title: `${channel.name} 新材料模块`, items: [] });
      render();
    });
    $$("[data-kyc-delete-section]").forEach(el => el.addEventListener("click", () => {
      const channel = currentKycEngineChannel();
      const sectionIndex = Number(el.dataset.kycDeleteSection);
      const section = channel?.sections[sectionIndex];
      if (!section) return;
      showConfirm("删除该材料模块？", `模块「${section.title}」及其 ${section.items.length} 个材料项将被删除，删除后不可恢复。`, "删除说明", "模块不再需要", "确认删除", () => {
        channel.sections.splice(sectionIndex, 1);
        render();
        toast("材料模块已删除", section.title);
      });
    }));
    const kycModalForm = $("#kyc-modal-form");
    if (kycModalForm) {
      const closeKycModal = () => { state.kycModal = null; render(); };
      $("#kyc-modal-close")?.addEventListener("click", closeKycModal);
      $("#kyc-modal-cancel")?.addEventListener("click", closeKycModal);
      $(".kyc-modal-dialog")?.closest(".review-launch-backdrop")?.addEventListener("click", event => { if (event.target === event.currentTarget) closeKycModal(); });
      kycModalForm.addEventListener("submit", event => {
        event.preventDefault();
        const modal = state.kycModal;
        const form = event.currentTarget;
        if (!modal) return;
        if (modal.mode.startsWith("scenario")) {
          const code = form.querySelector('[name="code"]').value.trim();
          const name = form.querySelector('[name="name"]').value.trim();
          const process = form.querySelector('[name="process"]').value.trim();
          if (!code || !name) { modal.error = "序号和业务类型名称为必填项。"; render(); return; }
          if (cfg.scenarios.some(item => item.code === code && item.id !== modal.scenarioId)) { modal.error = `序号 #${code} 已被其他业务模式使用。`; render(); return; }
          if (modal.mode === "scenario-new") {
            const id = Date.now();
            cfg.scenarios.push({ id, code, name, processDescription: process, channels: [] });
            cfg.selectedScenarioId = id;
            cfg.activeChannelIndex = 0;
            state.kycModal = null;
            render();
            toast("业务模式已创建", `#${code} ${name} · 可继续绑定渠道`);
          } else {
            const scenario = cfg.scenarios.find(item => item.id === modal.scenarioId);
            if (scenario) Object.assign(scenario, { code, name, processDescription: process });
            state.kycModal = null;
            render();
            toast("业务模式已更新", `#${code} ${name}`);
          }
          return;
        }
        const name = form.querySelector('[name="channelName"]').value.trim();
        const theme = form.querySelector('[name="theme"]').value;
        const scenario = currentKycScenario();
        if (!scenario) return;
        if (!name) { modal.error = "渠道名称为必填项。"; render(); return; }
        if (scenario.channels.some((ch, index) => ch.name === name && !(modal.mode === "channel-edit" && index === modal.channelIndex))) { modal.error = `当前业务模式下已存在渠道「${name}」。`; render(); return; }
        if (modal.mode === "channel-new") {
          const sectionTitle = form.querySelector('[name="sectionTitle"]')?.value.trim() || `${name} 基础收集材料`;
          scenario.channels.push({ id: `ch_${Date.now()}`, name, theme, restrictions: [], sections: [{ title: sectionTitle, items: [] }] });
          cfg.activeChannelIndex = scenario.channels.length - 1;
          state.kycModal = null;
          render();
          toast("渠道已绑定", `${scenario.name} · ${name}`);
        } else {
          const channel = scenario.channels[modal.channelIndex];
          if (channel) Object.assign(channel, { name, theme });
          state.kycModal = null;
          render();
          toast("渠道信息已更新", name);
        }
      });
    }
    $$("[data-kyc-section-title]").forEach(el => el.addEventListener("input", event => {
      const channel = currentKycEngineChannel();
      const section = channel?.sections[Number(el.dataset.kycSectionTitle)];
      if (section) section.title = event.target.value;
    }));
    $$("[data-kyc-add-section-item]").forEach(el => el.addEventListener("click", () => {
      const channel = currentKycEngineChannel();
      const section = channel?.sections[Number(el.dataset.kycAddSectionItem)];
      if (!section) return;
      section.items.push(kycEngineItem("新材料 / 字段项", "补充说明与要求..."));
      render();
    }));
    $$("[data-kyc-item-name], [data-kyc-item-sub], [data-kyc-item-type], [data-kyc-item-validity]").forEach(el => {
      const eventName = el.tagName === "SELECT" ? "change" : "input";
      el.addEventListener(eventName, event => updateKycEngineItemField(el, event.target.value));
    });
    $$("[data-kyc-item-required]").forEach(el => el.addEventListener("change", event => updateKycEngineItemField(el, event.target.checked)));
    $$("[data-kyc-delete-section-item]").forEach(el => el.addEventListener("click", () => {
      const [sectionIndex, itemIndex] = el.dataset.kycDeleteSectionItem.split(":").map(Number);
      const channel = currentKycEngineChannel();
      const section = channel?.sections[sectionIndex];
      if (!section) return;
      section.items.splice(itemIndex, 1);
      render();
    }));
  }

  function updateKycEngineItemField(el, value) {
    const packed = el.dataset.kycItemName || el.dataset.kycItemSub || el.dataset.kycItemType || el.dataset.kycItemValidity || el.dataset.kycItemRequired;
    const [sectionIndex, itemIndex] = String(packed || "").split(":").map(Number);
    const item = currentKycEngineChannel()?.sections?.[sectionIndex]?.items?.[itemIndex];
    if (!item) return;
    if (el.dataset.kycItemName) item.name = value;
    else if (el.dataset.kycItemSub) item.subRequirement = value;
    else if (el.dataset.kycItemType) item.type = value;
    else if (el.dataset.kycItemValidity) item.validity = value;
    else if (el.dataset.kycItemRequired) item.required = Boolean(value);
  }

  function parseScheduleText(text = "") {
    const valueAfter = label => {
      const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const match = String(text).match(new RegExp(`${escaped}\\s*[:：]\\s*(.+)`, "i"));
      return match?.[1]?.trim() || "";
    };
    const amount = valueAfter("金额");
    const currencyMatch = amount.match(/\b(USD|HKD|CNY|USDT)\b/i) || amount.match(/(usd|hkd|cny|usdt)/i);
    return {
      beneficiaryAddress: valueAfter("收款人地址"),
      accountName: valueAfter("账户名称"),
      bankName: valueAfter("收款银行名称"),
      countryRegion: valueAfter("收款人开户国家 / 地区") || valueAfter("收款人开户国家/地区"),
      accountNumber: valueAfter("账户号码"),
      swiftCode: valueAfter("Swift Code/BIC 代码") || valueAfter("Swift Code") || valueAfter("BIC 代码"),
      amount,
      payoutAccount: valueAfter("出款账户"),
      currency: state.scheduleForm.currency || currencyMatch?.[1]?.toUpperCase() || ""
    };
  }

  function updateScheduleTemplateDraft(key, value) {
    if (key === "name" || key === "description") state.scheduleTemplateDraft[key] = value;
    else state.scheduleTemplateDraft.fields[key] = value;
  }

  function createScheduleTemplate(event) {
    event.preventDefault();
    const draft = state.scheduleTemplateDraft;
    const name = String(draft.name || "").trim();
    if (!name) return toast("请填写模板名称", "模板保存前需要命名");
    const template = {
      id: `TPL-SCH-${String(state.scheduleTemplates.length + 1).padStart(3, "0")}-${Date.now().toString().slice(-3)}`,
      name,
      description: String(draft.description || "").trim() || "自定义排单模板",
      fields: Object.fromEntries(scheduleFields.map(([key]) => [key, draft.fields?.[key] || ""])),
      updated: "刚刚"
    };
    state.scheduleTemplates.unshift(template);
    state.selectedScheduleTemplateId = "";
    state.scheduleTemplateDraft = { name: "", description: "", fields: initialScheduleForm(null) };
    closeScheduleTemplateModal();
    render();
    toast("模板已保存", `${template.name} 可用于后续排单`);
  }

  function openScheduleTemplateModal() {
    const root = $("#material-order-modal-root");
    root.innerHTML = renderScheduleTemplateModal();
    $("#schedule-template-close").addEventListener("click", closeScheduleTemplateModal);
    $("#schedule-template-cancel").addEventListener("click", closeScheduleTemplateModal);
    $(".review-launch-backdrop").addEventListener("click", event => { if (event.target === event.currentTarget) closeScheduleTemplateModal(); });
    $$('[data-schedule-template-field]', root).forEach(el => el.addEventListener("input", event => updateScheduleTemplateDraft(event.target.dataset.scheduleTemplateField, event.target.value)));
    $("#schedule-template-form").addEventListener("submit", createScheduleTemplate);
    document.body.classList.add("modal-open");
    $('[data-schedule-template-field="name"]', root)?.focus();
  }

  function closeScheduleTemplateModal() {
    const root = $("#material-order-modal-root");
    if (root) root.innerHTML = "";
    document.body.classList.remove("modal-open");
  }

  function currentSchedulePayload(status) {
    const customer = state.customers.find(item => item.id === state.scheduleForm.customerId);
    const account = scheduleSelectedVaAccount();
    return {
      id: status === "草稿" ? `SCH-DRAFT-${Date.now().toString().slice(-5)}` : `SCH-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${String(state.scheduleOrders.filter(item => item.status !== "草稿").length + 1).padStart(3, "0")}`,
      templateId: "",
      templateName: account ? `${account.label} · ${account.currency}` : "客户粘贴排单",
      customerName: customer?.name || state.scheduleForm.customerName || "未选择客户",
      customerId: customer?.id || state.scheduleForm.customerId || "",
      priority: state.scheduleForm.priority || "普通",
      expectedPayoutDate: state.scheduleForm.expectedPayoutDate || "",
      status,
      submittedAt: status === "草稿" ? "" : "刚刚",
      updated: "刚刚",
      createdBy: roles.agent.name,
      fields: {
        ...Object.fromEntries(scheduleFields.map(([key]) => [key, state.scheduleForm[key] || ""])),
        rawScheduleText: state.scheduleForm.rawScheduleText || "",
        selectedVaAccountId: state.scheduleForm.selectedVaAccountId || "",
        customerQuery: state.scheduleForm.customerQuery || "",
        started: true
      }
    };
  }

  function saveScheduleOrder(status) {
    saveScheduleFields();
    const required = ["orderTitle", "rawScheduleText", "virtualAccountNumber", "iban", "currency"];
    const missing = required.filter(key => !String(state.scheduleForm[key] || "").trim());
    if (status !== "草稿" && missing.length) return toast("请补齐必填内容", "提交运营前需要单号、客户排单内容和 VA Account");
    const payload = currentSchedulePayload(status);
    state.scheduleOrders.unshift(payload);
    if (status !== "草稿") {
      const scheduleCustomer = state.customers.find(item => (payload.customerId && item.id === payload.customerId) || (payload.customerName && item.name === payload.customerName));
      if (scheduleCustomer && scheduleCustomer.status === "审核通过") {
        setCustomerStatus(scheduleCustomer, "已排单", `${roles[state.role].label} ${roles[state.role].name}`, `排单 ${payload.id} 已提交审核`);
        scheduleCustomer.timeline.unshift({ title: "排单已提交", detail: `${payload.id} · ${payload.templateName || "客户排单"}`, role: `${roles[state.role].label} ${roles[state.role].name}`, time: "刚刚" });
        persistCustomers();
      }
    }
    state.view = status === "草稿" ? "schedulingOrders" : "schedulingOrders";
    render();
    toast(status === "草稿" ? "草稿已保存" : "排单已提交运营", `${payload.id} · ${payload.templateName}`);
  }

  function saveScheduleFields() {
    $$('[data-schedule-field]').forEach(el => updateScheduleFormField(el.dataset.scheduleField, el.value));
  }

  function editScheduleDraft(orderId) {
    const order = state.scheduleOrders.find(item => item.id === orderId);
    if (!order || order.status !== "草稿") return;
    state.selectedScheduleTemplateId = order.templateId;
    state.scheduleForm = {
      templateId: order.templateId,
      templateName: order.templateName,
      draftId: order.id,
      started: true,
      customerName: order.customerName,
      customerId: order.customerId,
      customerQuery: order.fields.customerQuery || `${order.customerName} ${order.customerId}`.trim(),
      selectedVaAccountId: order.fields.selectedVaAccountId || "",
      priority: order.priority,
      expectedPayoutDate: order.expectedPayoutDate,
      ...order.fields
    };
    state.view = "schedulingGenerate";
    render();
  }

  function previewScheduleOrder(orderId) {
    const order = state.scheduleOrders.find(item => item.id === orderId);
    if (!order) return;
    showConfirm(`${order.id} 排单文案`, `${order.customerName} · ${order.templateName} · ${order.status}`, "文案预览", schedulePreview(order.fields), "关闭", () => {});
  }

  function updateScheduleOrderStatus(orderId, nextStatus) {
    const order = state.scheduleOrders.find(item => item.id === orderId);
    if (!order || order.status === "草稿") return;
    order.status = nextStatus;
    order.updated = "刚刚";
    render();
    toast("排单状态已更新", `${order.id} 已标记为${nextStatus}`);
  }

  function openMaterialReviewModal() {
    const root = $("#material-order-modal-root");
    const customers = state.customers;
    root.innerHTML = `<div class="review-launch-backdrop"><section class="review-launch-dialog" role="dialog" aria-modal="true" aria-labelledby="review-launch-title"><header><div><span>NEW REVIEW</span><h2 id="review-launch-title">选择客户并发起审核</h2><p>客户来自客户管理。已有进行中工单时将继续原工单，不重复创建。</p></div><button class="icon-button" id="review-launch-close" aria-label="关闭" type="button">×</button></header><label class="search-control launch-search">⌕<input id="review-customer-search" placeholder="搜索客户名称或编号" /></label><div class="review-customer-list">${customers.map(customer => { const existing = state.materialOrders.find(order => order.customerId === customer.id && !/审核通过|已终止/.test(order.status)); return `<article data-launch-search="${escapeHtml(`${customer.name} ${customer.id}`)}"><div class="cell-primary"><span class="avatar ${customer.type === "企业" ? "company" : ""}">${customerInitials(customer)}</span><span><strong>${customer.name}</strong><small>${customer.id} · ${customer.type === "企业" ? "企业 KYB" : "个人 KYC"} · ${customer.status}</small></span></div><div><span>${existing ? "已有进行中工单" : "可发起审核"}</span><small>${existing ? `${existing.id} · ${existing.stage}` : "将创建新的材料审核草稿"}</small></div><button class="btn ${existing ? "" : "btn-primary"}" type="button" ${existing ? `data-continue-order="${existing.id}"` : `data-launch-customer="${customer.id}"`}>${existing ? "继续现有工单" : "选择并发起"} →</button></article>`; }).join("")}</div></section></div>`;
    $("#review-launch-close").addEventListener("click", closeMaterialReviewModal);
    $(".review-launch-backdrop").addEventListener("click", event => { if (event.target === event.currentTarget) closeMaterialReviewModal(); });
    $("#review-customer-search").addEventListener("input", event => { const keyword = event.target.value.trim().toLowerCase(); $$('[data-launch-search]').forEach(row => row.hidden = !row.dataset.launchSearch.toLowerCase().includes(keyword)); });
    $$('[data-launch-customer]').forEach(button => button.addEventListener("click", () => createMaterialOrder(button.dataset.launchCustomer)));
    $$('[data-continue-order]').forEach(button => button.addEventListener("click", () => { closeMaterialReviewModal(); continueMaterialOrder(button.dataset.continueOrder); }));
    document.body.classList.add("modal-open");
  }

  function closeMaterialReviewModal() { const root = $("#material-order-modal-root"); if (root) root.innerHTML = ""; document.body.classList.remove("modal-open"); }

  function createMaterialOrder(customerId) {
    const suffix = String(Date.now()).slice(-4);
    const order = { id: `APP-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${suffix}`, customerId, status: "材料未完成", stage: "开始申报", step: 1, completeness: "0 / 0", updated: "刚刚", owner: "杨澜", note: "审核工单已创建，等待确认客户授权并上传材料。", history: ["刚刚 · 交易员 发起审核"] };
    state.materialOrders.unshift(order);
    closeMaterialReviewModal();
    startMaterialFlow(customerId, order.id);
    toast("审核工单已创建", `${order.id} 已进入材料准备`);
  }

  function continueMaterialOrder(orderId) {
    const order = state.materialOrders.find(item => item.id === orderId);
    if (!order) return;
    if (/补件|驳回/.test(order.status)) {
      state.materialFlow = { ...initialMaterialFlow(), mode: "supplement", orderId, customerId: order.customerId, supplementUploads: [] };
      render();
      return;
    }
    startMaterialFlow(order.customerId, order.id, order.step || 1);
  }

  function openMaterialOrderDetail(orderId) { state.materialFlow = { ...initialMaterialFlow(), mode: "detail", orderId }; render(); }

  function filterMaterialOrders() {
    const keyword = ($("#material-order-search")?.value || "").trim().toLowerCase();
    const status = $("#material-order-filter")?.value || "全部状态";
    $$('.material-order-row').forEach(row => { const matchesText = row.dataset.orderSearch.toLowerCase().includes(keyword); const matchesStatus = status === "全部状态" || row.dataset.orderSearch.includes(status); row.hidden = !(matchesText && matchesStatus); });
  }

  function addQuickUploadFiles(fileList) {
    const allowed = ["application/pdf", "image/jpeg", "image/png", "image/webp", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    const incoming = [...fileList].filter(file => allowed.includes(file.type) || /\.(pdf|jpe?g|png|webp|docx?)$/i.test(file.name));
    const rejected = fileList.length - incoming.length;
    state.quickMaterialUpload.files.push(...incoming.map(file => ({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: file.name,
      size: file.size,
      type: file.type || "application/octet-stream",
      url: URL.createObjectURL(file),
      addedAt: "刚刚"
    })));
    render();
    if (incoming.length) toast("材料已加入", `本批次新增 ${incoming.length} 个文件`);
    if (rejected) toast("部分文件未加入", "仅支持图片、PDF 和 Word 文件");
  }

  function removeQuickUploadFile(index) {
    const [file] = state.quickMaterialUpload.files.splice(index, 1);
    if (file?.url?.startsWith("blob:")) URL.revokeObjectURL(file.url);
    render();
  }

  function detectQuickMaterialType(name) {
    const lower = name.toLowerCase();
    if (/水单|receipt|swift|回单/.test(lower)) return "水单";
    if (/流水|statement|bank/.test(lower)) return "银行流水";
    if (/address|地址/.test(lower)) return "地址证明";
    if (/passport|id|身份|护照/.test(lower)) return "身份证明";
    if (/voucher|proof|凭证/.test(lower)) return "凭证";
    return "未分类";
  }

  function submitQuickMaterialUpload() {
    const upload = state.quickMaterialUpload;
    const customer = resolveUploadCustomer(upload.customerNo);
    if (!customer || !upload.files.length) return;
    const complianceDestination = isQuickComplianceDestination(upload.destination);
    const destinationLabel = quickDestinationLabel(upload.destination);
    const submitNote = String(upload.submitNote || "").trim();
    const selectedKycScenario = state.kycConfig.scenarios.find(item => item.id === Number(upload.kycScenarioId)) || state.kycConfig.scenarios[0] || null;
    const selectedKycChannel = selectedKycScenario?.channels?.[Number(upload.kycChannelIndex) || 0] || null;
    const submittedBusinessType = selectedKycScenario?.name || (quickBusinessTypes.includes(upload.businessType) ? upload.businessType : quickBusinessTypes[0]);
    const submittedCustomerName = String(upload.customerName || upload.customerChineseName || upload.customerEnglishName || "").trim();
    const submittedConfigDetail = [`业务类型：${submittedBusinessType}`, selectedKycChannel && `渠道：${selectedKycChannel.name}`, submittedCustomerName && `客户姓名：${submittedCustomerName}`].filter(Boolean).join(" · ");
    const targetCustomer = customer.uploadTarget || customer;
    targetCustomer.documents = targetCustomer.documents || [];
    targetCustomer.timeline = targetCustomer.timeline || [];
    const intermediary = customerKind(customer) === "中介";
    let archiveSubject = customer.name;
    let archiveLineage = `${customerKind(customer)} · ${customerNo(customer)}`;
    if (intermediary && upload.archiveTarget === "sub") {
      if (upload.subMode === "new") {
        const clientNo = nextAvailableClientNo();
        const subName = upload.newSubName.trim() || `下级客户 ${clientNo}`;
        customer.subCustomers = customer.subCustomers || [];
        if (!customer.subCustomers.some(item => item.clientNo === clientNo || item.name === subName)) {
          customer.subCustomers.push({ id: `${customer.id}-SUB-${Date.now().toString(36).toUpperCase()}`, name: subName, clientNo, status: "未准入", region: customer.region, type: "个人", updated: "刚刚同步" });
        }
        archiveSubject = subName;
        archiveLineage = `中介 ${customerNo(customer)} · 新建下级客户 ${clientNo}`;
      } else {
        const selectedSub = (customer.subCustomers || []).find(item => item.clientNo) || (customer.subCustomers || [])[0];
        archiveSubject = selectedSub?.name || customer.name;
        archiveLineage = selectedSub ? `中介 ${customerNo(customer)} · 已有下级客户 ${selectedSub.clientNo || "待分配编号"}` : `中介 ${customerNo(customer)} · 下级客户`;
      }
    } else if (intermediary) {
      archiveLineage = `中介 ${customerNo(customer)} · 自身主档案库`;
    }
    const materialRows = upload.files.map(file => ({
      name: file.name,
      meta: `${file.name} · ${formatFileSize(file.size)} · 刚刚上传`,
      category: file.mappedCategory || detectQuickMaterialType(file.name),
      state: complianceDestination ? "待合规审核" : "已归档",
      tone: complianceDestination ? "amber" : "teal",
      url: file.url,
      opsDecision: complianceDestination ? "待审核" : "已归档",
      complianceDecision: "待审核",
      versions: [{ version: "v1", name: file.name, time: "刚刚" }]
    }));

    targetCustomer.documents = [
      ...materialRows.map(item => ({ name: item.category, meta: item.meta, state: item.state, tone: item.tone, url: item.url, uploadedAt: todayIsoDate(), flow: complianceDestination ? "compliance" : "library", flowLabel: complianceDestination ? destinationLabel.replace("提交到合规", "已提交合规") : "仅存材料库" })),
      ...targetCustomer.documents
    ];
    targetCustomer.updated = "刚刚";
    targetCustomer.timeline.unshift({
      title: complianceDestination ? destinationLabel : "材料保存到客户材料库",
      detail: `${archiveSubject} · ${materialRows.length} 个文件 · ${materialRows.map(item => item.category).join("、")} · ${submittedConfigDetail}${submitNote ? ` · 说明：${submitNote}` : ""}`,
      role: `交易员 ${roles.agent.name}`,
      time: "刚刚"
    });

    if (complianceDestination) {
      const applicationId = `UPL-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${uploadCodeForCustomer(customer)}`;
      const masterCustomer = state.customers.find(item => item.id === customer.id);
      if (masterCustomer && masterCustomer !== targetCustomer) {
        setCustomerStatus(masterCustomer, "材料审核中", `交易员 ${roles.agent.name}`, "提交 KYC 材料，等待合规审核");
        masterCustomer.owner = "合规 Tina";
      }
      setCustomerStatus(targetCustomer, "材料审核中", `交易员 ${roles.agent.name}`, "提交 KYC 材料，等待合规审核");
      targetCustomer.owner = "合规 Tina";
      targetCustomer.materialSubmission = {
        applicationId,
        generationPath: "quick-upload",
        reviewType: upload.destination === "complianceU" ? "U相关" : "找换",
        businessType: submittedBusinessType,
        channel: selectedKycChannel?.name || "",
        customerName: submittedCustomerName,
        note: submitNote,
        submittedAt: "刚刚",
        items: materialRows,
        applicationPdf: null,
        signedPdf: null
      };
      const rejectedCase = state.cases.find(item => item.customerId === customer.id && item.status === "合规驳回");
      const casePayload = {
        customerId: customer.id,
        customer: customer.name,
        type: customer.type === "企业" ? "企业 KYB" : "个人 KYC",
        auditType: rejectedCase ? "驳回" : "新提交",
        status: "待合规审核",
        source: rejectedCase ? "驳回重提" : destinationLabel,
        agent: customer.agent,
        owner: "Tina Lau",
        entered: "刚刚",
        submittedAt: "刚刚",
        sla: "剩余 4h",
        risk: customer.risk,
        completeness: `${materialRows.length} / ${materialRows.length}`,
        previous: "交易员 上传材料",
        next: "合规查看材料后作出结论",
        note: [submittedConfigDetail, submitNote || (upload.destination === "complianceU" ? "销售通过材料上传模块提交 U 相关合规审核。" : "销售通过材料上传模块提交找换合规审核。")].filter(Boolean).join("；"),
        bankRef: "未提交",
        result: "待合规结论"
      };
      if (rejectedCase) {
        Object.assign(rejectedCase, casePayload);
        delete rejectedCase.reviewedAt;
        delete rejectedCase.finalizedAt;
      } else {
        state.cases.unshift({ id: `CMP-${applicationId.slice(-8)}-${Date.now().toString().slice(-4)}`, ...casePayload });
      }
    }

    const message = complianceDestination ? `已${destinationLabel}` : "已保存到客户材料库";
    persistCustomers();
    toast(message, `${archiveLineage} · ${materialRows.length} 个文件`);
    state.quickMaterialUpload = initialQuickMaterialUpload();
    state.customerSearch = customer.clientNo || customer.name;
    state.customerStatus = "全部状态";
    state.view = "customers";
    render();
  }

  function syncMaterialOrderDraft() {
    const flow = state.materialFlow;
    const order = state.materialOrders.find(item => item.id === flow.orderId);
    if (!order || flow.mode !== "work" || order.status === "待客户补件") return;
    const uploaded = flow.files.filter(item => item.name).length;
    order.step = flow.step;
    order.status = flow.submitted ? "待运营审核" : "材料未完成";
    order.stage = flow.submitted ? "运营审核" : ["开始申报", "客户与业务", "上传材料", "编辑申请表", "确认与 PDF"][flow.step - 1];
    order.completeness = `${uploaded} / ${flow.files.length}`;
    order.updated = "刚刚";
  }

  function startMaterialFlow(customerId, orderId = null, resumeStep = 1) {
    const customer = state.customers.find(item => item.id === customerId);
    if (!customer) return;
    const order = state.materialOrders.find(item => item.id === orderId);
    const previousVersions = state.materialFlow.customerId === customerId ? state.materialFlow.pdfVersions : [];
    const materialItems = materialCategories(customer).map((category, index, list) => ({ category, required: index < list.length - 1, description: materialDescription(category), name: "", size: 0, type: "", url: "", versions: [], ocrState: "未上传", opsDecision: "待审核", complianceDecision: "待审核" }));
    if (order && resumeStep >= 3) {
      const uploadedCount = Math.max(1, Number(order.completeness.split("/")[0]) || 0);
      materialItems.slice(0, uploadedCount).forEach((item, index) => Object.assign(item, { name: `saved_${item.category.replaceAll(" / ", "_")}.pdf`, size: 86000 + index * 12000, type: "application/pdf", url: "assets/trustpass-stage1-template.pdf", versions: [{ version: "v1", name: `saved_${index + 1}.pdf`, time: order.updated }], ocrState: "等待识别" }));
    }
    state.materialFlow = {
      ...initialMaterialFlow(), mode: "work", customerId, orderId, step: resumeStep, authorized: resumeStep > 1, pdfVersions: previousVersions,
      applicationId: order?.id || `APP-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${customer.id.slice(-3)}`,
      files: materialItems,
      form: seedMaterialForm(customer)
    };
    render();
  }

  function seedMaterialForm(customer) {
    const corporate = customer.type === "企业";
    return corporate ? {
      legalName: customer.name, englishName: customer.enName, registrationRegion: customer.region,
      registrationNo: customer.idMasked, incorporationDate: customer.dob, email: customer.email,
      registeredAddress: "18 Harbour Road, Hong Kong", businessAddress: "与注册地址一致",
      fundSource: "企业经营收入及股东投入", uboSummary: "董事 2 名，最终受益人 1 名",
      businessType: customer.business, expectedVolume: "HKD 1,500,000", businessPurpose: "跨境资金结算服务",
      sourceOfWealth: ["Investment", "Others"], servicePurpose: ["Own Funds", "Business"], destination: "Hong Kong", annualAmount: "500k-2m", perTxAmount: "150k-500k"
    } : {
      legalName: customer.name, englishName: customer.enName, birthDate: customer.dob,
      nationality: customer.region, gender: "Male", occupation: "客户经理", idType: "香港身份证", idNo: customer.idMasked, idExpiry: "2031-08-16",
      phone: customer.phone, email: customer.email, address: "香港湾仔港湾道 18 号 1208 室",
      fundSource: "受雇收入及个人储蓄", businessType: customer.business,
      expectedVolume: "HKD 800,000", businessPurpose: "跨境资金结算服务",
      sourceOfWealth: ["Wages", "Investment"], servicePurpose: ["Own Funds"], destination: "Hong Kong", annualAmount: "500k-2m", perTxAmount: "150k-500k"
    };
  }

  function saveMaterialFields() {
    $$('[data-material-field]').forEach(el => { state.materialFlow.form[el.dataset.materialField] = el.value; });
  }

  function handleMaterialFiles(event) {
    const index = Number(event.target.dataset.materialItem);
    const current = state.materialFlow.files[index];
    const allowed = ["application/pdf", "image/jpeg", "image/png"];
    const file = event.target.files[0];
    if (!file || !(allowed.includes(file.type) || /\.(pdf|jpe?g|png)$/i.test(file.name))) return toast("文件格式不支持", "仅支持 JPG、JPEG、PNG 和 PDF");
    if (current.url?.startsWith("blob:")) URL.revokeObjectURL(current.url);
    const version = `v${current.versions.length + 1}`;
    Object.assign(current, { name: file.name, size: file.size, type: file.type || "application/octet-stream", url: URL.createObjectURL(file), versions: [...current.versions, { version, name: file.name, time: "刚刚" }], ocrState: "等待识别", opsDecision: "待审核", complianceDecision: "待审核" });
    state.materialFlow.ocrComplete = false;
    render();
    toast("材料已上传", `${current.category} 已保存为 ${version}`);
  }

  function loadDemoMaterialFiles() {
    state.materialFlow.files.forEach((item, index) => { if (!item.name) Object.assign(item, { name: `sample_${item.category.replaceAll(" / ", "_")}.pdf`, size: 82000 + index * 17000, type: "application/pdf", url: "assets/trustpass-stage1-template.pdf", versions: [{ version: "v1", name: `sample_${index + 1}.pdf`, time: "刚刚" }], ocrState: "等待识别" }); });
    state.materialFlow.ocrComplete = false;
    render();
    toast("演示材料已载入", `已补齐 ${state.materialFlow.files.length} 个材料项`);
  }

  function guessMaterialCategory(name, customer, index) {
    const lower = name.toLowerCase();
    if (/address|住址|地址/.test(lower)) return "地址证明";
    if (/ubo|director|董事|受益/.test(lower)) return "董事与 UBO 名单";
    if (/source|fund|statement|资金|流水/.test(lower)) return "资金来源材料";
    if (/br|register|company|公司|注册/.test(lower)) return "公司注册文件";
    return materialCategories(customer)[Math.min(index, materialCategories(customer).length - 2)];
  }

  function runMaterialOcr() {
    const flow = state.materialFlow;
    if (!flow.files.some(file => file.name)) return;
    flow.files = flow.files.map((file, index) => ({ ...file, ocrState: file.name ? (index === 1 ? "需人工确认" : "已提取") : "未上传" }));
    flow.ocrComplete = true;
    flow.step = 4;
    render();
    toast("OCR 已完成", "申请表已生成，请核对低置信度字段");
  }

  function submitMaterialToOps() {
    const flow = state.materialFlow;
    if (flow.submitted || !flow.confirmed || !flow.files.some(file => file.name) || (flow.generationPath !== "none" && !flow.signedPdf)) return;
    const customer = state.customers.find(item => item.id === flow.customerId);
    flow.submitted = true;
    const materialOrder = state.materialOrders.find(item => item.id === flow.orderId);
    if (materialOrder) Object.assign(materialOrder, { status: "待运营审核", stage: "运营审核", step: 5, completeness: `${flow.files.filter(file => file.name).length} / ${flow.files.length}`, updated: "刚刚", note: "材料与申请表已提交运营审核。", history: [`刚刚 · 提交运营审核`, ...materialOrder.history] });
    customer.materialSubmission = { applicationId: flow.applicationId, generationPath: flow.generationPath, items: flow.files.filter(file => file.name).map(file => ({ ...file })), applicationPdf: flow.pdfVersions.at(-1) || null, signedPdf: flow.signedPdf, submittedAt: "刚刚" };
    setCustomerStatus(customer, "材料审核中", `交易员 ${roles.agent.name}`, "提交材料申报，进入审核流程");
    customer.updated = "刚刚";
    customer.owner = "运营 陈文静";
    const submissionLabel = flow.generationPath === "none" ? "仅材料送审" : `签署申请表 ${flow.pdfVersions.at(-1).version}`;
    customer.timeline.unshift({ title: "提交材料申报", detail: `${flow.applicationId} · ${submissionLabel}`, role: `交易员 ${roles.agent.name}`, time: "刚刚" });
    const existing = state.cases.find(item => item.customerId === customer.id && item.status === "待运营审核");
    const count = customer.materialSubmission.items.length;
    const note = flow.generationPath === "none" ? `${flow.applicationId} 未生成申请表，直接审核材料` : `${flow.applicationId} 已附未签署版与客户签署版申请表`;
    let reviewCase = existing;
    if (existing) Object.assign(existing, { source: "交易员 材料申报", entered: "刚刚", sla: "剩余 4h", owner: "陈文静", completeness: `${count} / ${count}`, previous: "交易员 提交材料", next: "逐项审核材料与申请表", note, result: "待处理" });
    else {
      reviewCase = { id: `OPS-${flow.applicationId.slice(-6)}`, customerId: customer.id, customer: customer.name, type: customer.type === "企业" ? "企业 KYB" : "个人 KYC", status: "待运营审核", source: "交易员 材料申报", agent: customer.agent, owner: "陈文静", entered: "刚刚", sla: "剩余 4h", risk: customer.risk, completeness: `${count} / ${count}`, previous: "交易员 提交材料", next: "逐项审核材料与申请表", note, bankRef: "未提交", result: "待处理" };
      state.cases.unshift(reviewCase);
    }
    if (reviewCase) state.caseReviewDrafts[reviewCase.id] = createCaseReviewDraft(reviewCase, customer);
    persistCustomers();
    render();
    toast("已提交运营审核", `${flow.applicationId} 已进入运营处理队列`);
  }

  async function generateApplicationPdf() {
    const flow = state.materialFlow;
    const customer = state.customers.find(item => item.id === flow.customerId);
    if (!customer || !flow.confirmed || !flow.files.some(file => file.name)) return;
    saveMaterialFields();
    const version = `v${flow.pdfVersions.length + 1}`;
    const generatedAt = new Date().toLocaleString("zh-CN", { hour12: false });
    const safeName = customer.name.replace(/[^\w\u3400-\u9fff-]/g, "_");
    const filename = `${flow.applicationId}_${safeName}_${version}.pdf`;
    const templateUrl = "assets/trustpass-stage1-template.pdf";

    // Give immediate visual feedback. file:// pages cannot fetch adjacent binary files,
    // so the original template remains a reliable preview/download fallback.
    openPdfPreview(templateUrl, filename);
    if (!window.PDFLib) return toast("PDF 组件未加载", "请确认 assets/pdf-lib.min.js 文件存在");

    let templateBytes;
    try {
      templateBytes = await loadApplicationTemplate(templateUrl);
    } catch (_) {
      toast("无法读取 PDF 模板", "已打开原始模板预览，请检查 assets 文件夹是否完整");
      return;
    }
    const pdfDoc = await PDFLib.PDFDocument.load(templateBytes);
    const form = pdfDoc.getForm();
    form.getFields().forEach(field => { try { if (field.constructor.name === "PDFTextField") field.setText(""); if (field.constructor.name === "PDFCheckBox") field.uncheck(); } catch (_) {} });
    const value = key => String(flow.form[key] || "");
    const safeText = (name, text) => { try { form.getTextField(name).setText(text); } catch (_) {} };
    const safeCheck = (name, checked) => { try { const field = form.getCheckBox(name); checked ? field.check() : field.uncheck(); } catch (_) {} };
    safeText("fill_8", value("englishName"));
    safeText("fill_7", value("idNo"));
    const birth = value("birthDate").split("-"); safeText("Text2", birth[0] || ""); safeText("Text3", birth[1] || ""); safeText("Text4", birth[2] || "");
    const phone = value("phone").trim();
    const phoneMatch = phone.match(/^(\+?\d{1,4})[\s·.-]*(.*)$/);
    if (phoneMatch) { safeText("Text5", phoneMatch[1]); safeText("Text6", phoneMatch[2]); }
    else safeText("Text6", phone);
    safeCheck("Check Box1", !/^F/i.test(value("gender"))); safeCheck("Check Box3", /^F/i.test(value("gender")));
    safeCheck("Check Box2", /身份|ID/i.test(value("idType"))); safeCheck("Check Box5", /护照|passport/i.test(value("idType"))); safeCheck("Check Box4", /EEP|通行证/i.test(value("idType")));
    const selected = key => flow.form[key] || [];
    const wealthMap = { Wages: "Check Box7", Rental: "Check Box8", Loan: "Check Box9", Sale: "Check Box10", Others: "Check Box11", Investment: "Check Box12", Insurance: "Check Box13", Family: "Check Box14" };
    const purposeMap = { "Own Funds": "Check Box15", Bills: "Check Box16", Investment: "Check Box17", Family: "Check Box18", Business: "Check Box19", Others: "Check Box20" };
    const destinationMap = { "Hong Kong": "Check Box21", "Mainland China": "Check Box22", "North America": "Check Box23", "South East Asia": "Check Box24", "EU/UK": "Check Box25", Oceanica: "Check Box26" };
    const annualMap = { "0-50k": "050000", "50k-230k": "50000230000", "230k-500k": "230000500000", "500k-2m": "5000002000000", "2m-40m": "200000040000000", "40m+": "toggle_6_2" };
    const perTxMap = { "0-20k": "020000", "20k-100k": "20000100000", "100k-150k": "100000150000", "150k-500k": "150000500000", "500k-22m": "50000022000000", "22m+": "toggle_12_2" };
    Object.entries(wealthMap).forEach(([choice, field]) => safeCheck(field, selected("sourceOfWealth").includes(choice)));
    Object.entries(purposeMap).forEach(([choice, field]) => safeCheck(field, selected("servicePurpose").includes(choice)));
    Object.entries(destinationMap).forEach(([choice, field]) => safeCheck(field, value("destination") === choice));
    Object.entries(annualMap).forEach(([choice, field]) => safeCheck(field, value("annualAmount") === choice));
    Object.entries(perTxMap).forEach(([choice, field]) => safeCheck(field, value("perTxAmount") === choice));
    await overlayTemplateText(pdfDoc, form, "fill_9", value("legalName"));
    await overlayTemplateText(pdfDoc, form, "fill_10", value("nationality") || customer.region);
    await overlayTemplateText(pdfDoc, form, "Text7", value("address") || value("registeredAddress"));
    await overlayTemplateText(pdfDoc, form, "fill_6", value("occupation") || (customer.type === "企业" ? "企业客户" : "客户"));
    await overlayTemplateText(pdfDoc, form, "fill_11", value("nationality") || customer.region);
    await overlayTemplateText(pdfDoc, form, "undefined_4", value("fundSource"));
    await overlayTemplateText(pdfDoc, form, "Text21", [value("businessPurpose"), value("email") ? `Email: ${value("email")}` : "", value("idExpiry") ? `ID expiry: ${value("idExpiry")}` : ""].filter(Boolean).join(" · "));
    form.flatten();
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const item = { version, generatedAt, size: blob.size, url: URL.createObjectURL(blob), filename };
    flow.pdfVersions.push(item);
    flow.signedPdf = null;
    flow.submitted = false;
    render();
    requestAnimationFrame(() => openPdfPreview(item.url, item.filename));
    toast("申请表 PDF 已生成", `${item.filename} 可预览和下载`);
  }

  async function loadApplicationTemplate(templateUrl) {
    if (window.location.protocol !== "file:") {
      try {
        const response = await fetch(templateUrl);
        if (response.ok) return await response.arrayBuffer();
      } catch (_) {}
    }
    if (!window.TP_PDF_CHUNKS?.length || !window.DecompressionStream) throw new Error("Embedded PDF template unavailable");
    const base64 = window.TP_PDF_CHUNKS.join("");
    const binary = atob(base64);
    const compressed = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) compressed[index] = binary.charCodeAt(index);
    const stream = new Blob([compressed]).stream().pipeThrough(new DecompressionStream("gzip"));
    return await new Response(stream).arrayBuffer();
  }

  async function overlayTemplateText(pdfDoc, form, fieldName, text) {
    if (!text) return;
    try {
      const field = form.getTextField(fieldName);
      const widget = field.acroField.getWidgets()[0];
      const rect = widget.getRectangle();
      const pageRef = widget.P();
      const page = pdfDoc.getPages().find(candidate => candidate.ref === pageRef) || pdfDoc.getPages()[0];
      const scale = 3;
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(12, Math.round(rect.width * scale)); canvas.height = Math.max(12, Math.round(rect.height * scale));
      const ctx = canvas.getContext("2d"); ctx.scale(scale, scale); ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, rect.width, rect.height); ctx.fillStyle = "#111"; ctx.font = `${Math.min(11, rect.height * .55)}px PingFang SC, Microsoft YaHei, sans-serif`; ctx.textBaseline = "middle"; ctx.fillText(text, 4, rect.height / 2, rect.width - 8);
      const image = await pdfDoc.embedPng(canvas.toDataURL("image/png"));
      field.setText(""); page.drawImage(image, { x: rect.x, y: rect.y, width: rect.width, height: rect.height });
    } catch (_) {}
  }

  function attachSignedPdf(file) {
    const flow = state.materialFlow;
    const latest = flow.pdfVersions.at(-1);
    if (!latest) return;
    if (file && !/pdf/i.test(file.type) && !/\.pdf$/i.test(file.name)) return toast("签署版格式不支持", "请上传 PDF 文件");
    flow.signedPdf = { name: file.name, size: file.size, url: URL.createObjectURL(file), uploadedAt: "刚刚" };
    render(); toast("签署版已回传", flow.signedPdf.name);
  }

  function openPdfPreview(url, filename = "申请表.pdf") {
    if (!url) return;
    const root = $("#pdf-modal-root");
    root.innerHTML = `<div class="pdf-modal-backdrop"><section class="pdf-modal" role="dialog" aria-modal="true" aria-labelledby="pdf-modal-title"><header><div><span>PDF PREVIEW</span><h2 id="pdf-modal-title">${escapeHtml(filename)}</h2></div><div class="case-actions"><a class="btn btn-primary" href="${url}" download="${escapeHtml(filename)}">下载 PDF</a><button class="btn" id="pdf-modal-close" type="button">关闭</button></div></header><iframe title="${escapeHtml(filename)} PDF 预览" src="${url}"></iframe></section></div>`;
    $("#pdf-modal-close").addEventListener("click", closePdfModal);
    $(".pdf-modal-backdrop").addEventListener("click", event => { if (event.target === event.currentTarget) closePdfModal(); });
    document.body.classList.add("modal-open");
  }

  function closePdfModal() {
    const root = $("#pdf-modal-root");
    if (root) root.innerHTML = "";
    document.body.classList.remove("modal-open");
  }

  function drawApplicationPdfPage(ctx, canvas, customer, flow) {
    const ink = "#17312d";
    const muted = "#667975";
    const line = "#dbe4e1";
    const teal = "#ff7a00";
    const paper = "#fbfaf6";
    ctx.fillStyle = paper;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = ink;
    ctx.fillRect(0, 0, canvas.width, 150);
    ctx.fillStyle = "#f7fbf9";
    ctx.font = "700 38px -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif";
    ctx.fillText("Bitvast Workbench", 76, 70);
    ctx.font = "500 22px -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif";
    ctx.fillStyle = "#b9cbc6";
    ctx.fillText(customer.type === "企业" ? "企业客户业务准入申请表" : "个人客户业务准入申请表", 76, 112);
    ctx.textAlign = "right";
    ctx.fillStyle = "#f7fbf9";
    ctx.font = "700 24px -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif";
    ctx.fillText(flow.applicationId, 1164, 72);
    ctx.font = "500 18px -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif";
    ctx.fillStyle = "#b9cbc6";
    ctx.fillText(`版本 v${flow.pdfVersions.length + 1}`, 1164, 108);
    ctx.textAlign = "left";

    let y = 210;
    const section = title => {
      ctx.fillStyle = teal;
      ctx.font = "700 25px -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif";
      ctx.fillText(title, 76, y);
      ctx.strokeStyle = line;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(76, y + 18); ctx.lineTo(1164, y + 18); ctx.stroke();
      y += 54;
    };
    const row = (label, value, x = 76, width = 520) => {
      ctx.fillStyle = muted;
      ctx.font = "500 17px -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif";
      ctx.fillText(label, x, y);
      ctx.fillStyle = ink;
      ctx.font = "600 20px -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif";
      const lines = wrapCanvasText(ctx, String(value || "-"), width, 2);
      lines.forEach((text, index) => ctx.fillText(text, x, y + 30 + index * 27));
    };

    section("申请信息");
    row("申请编号", flow.applicationId); row("生成时间", new Date().toLocaleString("zh-CN", { hour12: false }), 650);
    y += 88; row("所属 交易员", `${customer.agent} · A-018`); row("业务类型", flow.form.businessType || customer.business, 650);
    y += 102;

    section("客户基本资料");
    const visibleFields = Object.entries(flow.form).filter(([key, value]) => value && !["businessPurpose", "fundSource", "uboSummary"].includes(key)).slice(0, 10);
    for (let index = 0; index < visibleFields.length; index += 2) {
      const left = visibleFields[index];
      const right = visibleFields[index + 1];
      row(materialFieldLabel(left[0]), left[1]);
      if (right) row(materialFieldLabel(right[0]), right[1], 650);
      y += 88;
    }

    section("业务说明与资金来源");
    row("业务说明", flow.form.businessPurpose || "-", 76, 1050); y += 82;
    row("资金来源", flow.form.fundSource || "-", 76, 1050); y += 102;

    section("已提交材料目录");
    flow.files.slice(0, 6).forEach((file, index) => {
      ctx.fillStyle = index % 2 ? "#f1f5f3" : "#f8faf8";
      ctx.fillRect(76, y - 25, 1088, 50);
      ctx.fillStyle = ink;
      ctx.font = "600 18px -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif";
      ctx.fillText(`${index + 1}. ${file.category}`, 92, y + 6);
      ctx.fillStyle = muted;
      ctx.font = "500 17px -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(`${file.name} · ${file.ocrState}`, 1148, y + 6);
      ctx.textAlign = "left";
      y += 54;
    });
    y += 28;

    section("OCR 与人工确认");
    ctx.fillStyle = ink;
    ctx.font = "500 18px -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif";
    const notice = `本申请表由材料 OCR 结果预填，并由 交易员 人工核对。共 ${flow.editedFields.size} 个字段经人工修改；OCR 建议不代表最终审核结论。`;
    wrapCanvasText(ctx, notice, 1060, 3).forEach((text, index) => ctx.fillText(text, 76, y + index * 30));
    y += 112;
    ctx.strokeStyle = line; ctx.strokeRect(76, y, 1088, 92);
    ctx.fillStyle = ink; ctx.font = "700 19px -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif";
    ctx.fillText("交易员 确认声明", 96, y + 34);
    ctx.fillStyle = muted; ctx.font = "500 17px -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif";
    ctx.fillText("本人已核对客户资料、材料目录和低置信度字段，并确认提交内容准确。", 96, y + 67);

    ctx.fillStyle = "#edf3f1";
    ctx.fillRect(0, 1688, canvas.width, 66);
    ctx.fillStyle = muted;
    ctx.font = "500 15px -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif";
    ctx.fillText("演示环境生成，不作为正式合规、开户或银行申请文件。", 76, 1728);
    ctx.textAlign = "right";
    ctx.fillText(`Bitvast Workbench · ${flow.applicationId}`, 1164, 1728);
    ctx.textAlign = "left";
  }

  function wrapCanvasText(ctx, value, maxWidth, maxLines) {
    const chars = [...String(value)];
    const lines = [];
    let current = "";
    for (const char of chars) {
      const candidate = current + char;
      if (ctx.measureText(candidate).width > maxWidth && current) { lines.push(current); current = char; }
      else current = candidate;
      if (lines.length === maxLines - 1) break;
    }
    if (current && lines.length < maxLines) lines.push(current);
    return lines;
  }

  function buildPdfFromJpeg(jpegBytes, imageWidth, imageHeight) {
    const encoder = new TextEncoder();
    const ascii = value => encoder.encode(value);
    const content = "q\n595.28 0 0 841.89 0 0 cm\n/Im0 Do\nQ\n";
    const objects = [null,
      ascii("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n"),
      ascii("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n"),
      ascii("3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im0 5 0 R >> >> /Contents 4 0 R >>\nendobj\n"),
      ascii(`4 0 obj\n<< /Length ${content.length} >>\nstream\n${content}endstream\nendobj\n`),
      concatBytes([ascii(`5 0 obj\n<< /Type /XObject /Subtype /Image /Width ${imageWidth} /Height ${imageHeight} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`), jpegBytes, ascii("\nendstream\nendobj\n")])
    ];
    const parts = [ascii("%PDF-1.4\n%TP-Operations\n")];
    const offsets = [0];
    let length = parts[0].length;
    for (let index = 1; index <= 5; index += 1) { offsets[index] = length; parts.push(objects[index]); length += objects[index].length; }
    const xrefOffset = length;
    const xref = `xref\n0 6\n0000000000 65535 f \n${offsets.slice(1).map(offset => `${String(offset).padStart(10, "0")} 00000 n \n`).join("")}trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
    parts.push(ascii(xref));
    return concatBytes(parts);
  }

  function concatBytes(parts) {
    const total = parts.reduce((sum, part) => sum + part.length, 0);
    const output = new Uint8Array(total);
    let offset = 0;
    parts.forEach(part => { output.set(part, offset); offset += part.length; });
    return output;
  }

  function handleCaseAction(action, id) {
    const item = state.cases.find(entry => entry.id === id);
    if (!item) return;
    const customer = state.customers.find(entry => entry.id === item.customerId);
    const reviewDraft = customer ? ensureCaseReviewDraft(item, customer) : null;
    const transitions = {
      supplement: ["待客户补件", "发起补件", "已生成补件通知并退回 交易员"],
      received: ["待运营审核", "确认收到补件", "补件版本已加入材料清单"],
      compliance: ["待合规审核", "提交合规", "案件已分配给合规官"],
      "bank-submit": ["银行审核中", "提交银行", "银行提交信息和资料快照已保存"],
      "bank-pass": ["审核通过", "录入银行通过", "银行审核结果已保存"],
      "bank-reject": ["已终止", "录入银行拒绝", "本次业务因银行拒绝终止"],
      trade: ["交易中", "创建关联交易", "案件、库存预约和凭证已关联"]
    };
    if (action === "followup" || action === "notify" || action === "progress") {
      const label = action === "followup" ? "补件跟进已保存" : action === "notify" ? "交易员 通知已记录" : "交易进度已更新";
      toast(label, `${item.id} 的操作记录已更新`);
      return;
    }
    if (action === "supplement" && reviewDraft) {
      if (!reviewDraft.materials.some(material => material.decision === "待补件") && !(reviewDraft.selectedSupplementIds || []).length) return toast("缺少补件项", "至少选择 1 个材料项或补件项后再标记待补充材料");
      persistCaseReviewToCustomer(item, customer, reviewDraft);
      applyCaseTransition(item, "待客户补件", "发起补件", reviewDraft.supplementReason || reviewDraft.notificationText, null, reviewDraft);
      return;
    }
    if (action === "compliance" && reviewDraft) {
      if ((reviewDraft.selectedSupplementIds || []).length) return toast("缺件项仍未清空", "请先取消缺件勾选，或改为标记待补充材料");
      if (reviewDraft.materials.some(material => material.decision === "待补件")) return toast("仍有待补件材料", "全部材料通过后才可提交至合规");
      if (reviewDraft.materials.some(material => material.decision === "待审核")) return toast("还有待审核材料", "请先为每个材料项给出审核结论");
      persistCaseReviewToCustomer(item, customer, reviewDraft);
      applyCaseTransition(item, "待合规审核", "提交合规", reviewDraft.internalNote || reviewDraft.followupAction || "运营已完成审核，提交合规复核", null, reviewDraft);
      return;
    }
    if (action === "cancel") {
      showConfirm("确认业务取消？", "取消后案件进入已终止，原业务记录不能直接恢复。", "取消原因", "客户取消本次业务", "确认取消", () => applyCaseTransition(item, "已终止", "业务取消", "客户取消本次业务", "业务取消"));
      return;
    }
    const transition = transitions[action];
    if (!transition) return;
    const execute = () => applyCaseTransition(item, transition[0], transition[1], transition[2], action === "bank-reject" ? "银行拒绝" : null);
    if (["supplement", "bank-reject"].includes(action)) {
      showConfirm(`${transition[1]}？`, "此操作会改变案件状态并写入操作记录。", "处理说明", transition[2], "确认提交", execute);
    } else execute();
  }

  function persistCaseReviewToCustomer(item, customer, draft) {
    const materials = listCaseMaterials(customer);
    const submission = customer.materialSubmission;
    if (submission) {
      draft.materials.forEach((materialDraft, index) => {
        if (index < submission.items.length) {
          submission.items[index].opsDecision = materialDraft.decision === "待补件" ? "退回" : materialDraft.decision;
          submission.items[index].opsNote = materialDraft.note;
        }
      });
      if (submission.applicationPdf) submission.applicationPdf.opsDecision = draft.overallDecision === "提交合规" ? "通过" : "待审核";
      if (submission.signedPdf) submission.signedPdf.opsDecision = draft.overallDecision === "提交合规" ? "通过" : "待审核";
    } else {
      customer.documents = materials.map((material, index) => ({
        name: material.category,
        meta: material.name || material.meta || "已上传材料",
        state: draft.materials[index].decision === "通过" ? "已通过" : draft.materials[index].decision === "待补件" ? "需补件" : "待复核",
        tone: draft.materials[index].decision === "通过" ? "teal" : draft.materials[index].decision === "待补件" ? "red" : "amber",
        flow: "compliance",
        flowLabel: "已提交合规"
      }));
    }
    customer.updated = "刚刚";
    persistCustomers();
  }

  function applyCaseTransition(item, nextStatus, event, detail, terminationType = null, reviewDraft = null) {
    const previousStatus = item.status;
    const customer = state.customers.find(c => c.id === item.customerId);
    item.status = nextStatus;
    item.previous = event;
    item.entered = "刚刚";
    item.sla = nextStatus === "已终止" ? "已关闭" : "刚进入当前状态";
    item.owner = nextStatus === "待合规审核" ? "Tina Lau" : nextStatus === "待客户补件" || nextStatus === "合规驳回" ? item.agent : "陈文静";
    item.result = detail;
    if (nextStatus === "待合规审核") {
      item.completeness = "9 / 9";
      item.submittedAt = "刚刚";
      item.note = previousStatus === "合规驳回" ? "交易员已处理合规驳回项并重新提交，等待合规复核。" : reviewDraft?.internalNote || "运营已确认材料完整，规则建议仅供合规人工复核参考。";
      item.auditType = previousStatus === "合规驳回" ? "驳回" : "新提交";
      delete item.reviewedAt;
      delete item.finalizedAt;
    }
    if (nextStatus === "合规驳回") {
      item.source = "合规退回";
      item.next = "交易员处理驳回材料并重新提交";
      item.auditType = item.auditType || "新提交";
    }
    if (nextStatus === "待客户补件" && reviewDraft) item.note = reviewDraft.notificationText;
    if (terminationType) {
      item.terminationType = terminationType;
      item.terminationReason = detail;
      item.next = "无后续操作";
    } else {
      const nextByStatus = { "待运营审核": "重新审核补件材料", "待合规审核": "合规人工复核", "待提交银行": "填写银行提交信息", "银行审核中": "录入银行审核结果", "审核通过": "创建或关联交易", "交易中": "更新交易进度" };
      item.next = nextByStatus[nextStatus] || item.next;
    }
    const order = state.materialOrders.find(entry => entry.customerId === item.customerId);
    if (order && nextStatus === "待客户补件") {
      order.status = "待客户补件";
      order.stage = "补件处理中";
      order.updated = "刚刚";
      order.note = reviewDraft?.notificationText || detail;
      order.history.unshift("刚刚 · 运营发起补件");
    }
    if (order && nextStatus === "待合规审核") {
      order.status = "待合规审核";
      order.stage = "已提交合规";
      order.updated = "刚刚";
      order.note = item.note;
      order.history.unshift("刚刚 · 提交合规复核");
    }
    if (order && nextStatus === "合规驳回") {
      order.status = "待客户补件";
      order.stage = "合规驳回待处理";
      order.updated = "刚刚";
      order.note = detail;
      order.history.unshift("刚刚 · 合规驳回，等待交易员重新提交");
    }
    if (customer) {
      const mappedStatus = customerStatusFromCase(nextStatus);
      if (mappedStatus && !(mappedStatus === "审核通过" && ["已排单", "交易中", "已成交"].includes(customer.status))) {
        setCustomerStatus(customer, mappedStatus, `${roles[state.role].label} ${roles[state.role].name}`, event);
      }
      customer.updated = "刚刚";
      customer.owner = item.owner;
      customer.timeline.unshift({ title: event, detail, role: `${roles[state.role].label} ${roles[state.role].name}`, time: "刚刚" });
      persistCustomers();
    }
    if (previousStatus === "待合规审核" && ["待提交银行", "合规驳回"].includes(nextStatus)) {
      item.reviewedAt = "刚刚";
      if (nextStatus === "待提交银行") item.finalizedAt = "刚刚";
      else delete item.finalizedAt;
      state.complianceReviewingCase = null;
      state.complianceQueueTab = "processed";
    }
    if (opsStatuses.includes(nextStatus)) state.caseStatus = nextStatus;
    state.selectedCase = item.id;
    render();
    toast(event, `${item.id}：${previousStatus} → ${nextStatus}`);
  }

  function handleCreateStep(event) {
    event.preventDefault();
    if (state.createStep === 1) {
      const form = event.currentTarget;
      state.draftCustomer = {
        ...state.draftCustomer,
        type: form.querySelector('[name="clientType"]:checked').value,
        name: form.querySelector('[name="name"]').value.trim(),
        enName: form.querySelector('[name="enName"]').value.trim(),
        region: form.querySelector('[name="region"]').value,
        agent: form.querySelector('[name="agent"]').value.split(" · ")[0]
      };
    } else {
      state.draftCustomer = {
        ...state.draftCustomer,
        business: event.currentTarget.querySelector('[name="business"]').value,
        relation: event.currentTarget.querySelector('[name="relation"]').value
      };
    }
    state.createStep += 1;
    render();
  }

  function createDraftCustomer() {
    const draft = state.draftCustomer;
    const id = `C-2026-${String(720 + state.customers.length).padStart(4, "0")}`;
    const customer = {
      id, name: draft.name, enName: draft.enName, type: draft.type, region: draft.region, agent: draft.agent,
      status: "未准入", risk: "待评估", updated: "刚刚", owner: `交易员 ${draft.agent}`, dob: "待 OCR 提取", idMasked: "待生成",
      phone: "待填写", email: "待填写", source: draft.relation, business: draft.business,
      documents: [
        { name: draft.type === "企业" ? "公司注册文件" : "身份证明", meta: "demo_identity.pdf · 演示材料", state: "待识别", tone: "blue" },
        { name: "银行流水", meta: "demo_statement.pdf · 演示材料", state: "待检查", tone: "amber" }
      ],
      timeline: [{ title: "建立客户草稿", detail: `${draft.type}客户资料已保存`, role: `交易员 ${draft.agent}`, time: "刚刚" }]
    };
    state.customers.unshift(customer);
    state.createStep = 1;
    state.draftCustomer = { type: "个人", name: "", enName: "", region: "中国香港", agent: "杨澜", business: "SINO", relation: "新客户" };
    state.customerSearch = customer.name;
    state.customerStatus = "全部状态";
    state.customerType = "全部类型";
    state.customerPage = 1;
    state.view = "customers";
    persistCustomers();
    render();
    toast("客户草稿已建立", `${customer.name} 已加入客户列表`);
  }

  function openCustomerModal() {
    state.customerModal = { draft: initialCustomerModalDraft(), error: "" };
    state.numberEdit = null;
    render();
    setTimeout(() => $("#modal-client-name")?.focus(), 0);
  }

  function updateCustomerModalDraft(patch) {
    if (!state.customerModal) return;
    const form = $("#customer-modal-form");
    const current = form ? {
      clientNo: form.querySelector('[name="clientNo"]')?.value.trim() ?? state.customerModal.draft.clientNo,
      name: form.querySelector('[name="name"]')?.value.trim() ?? state.customerModal.draft.name,
      phone: form.querySelector('[name="phone"]')?.value.trim() ?? state.customerModal.draft.phone,
      followTrader: form.querySelector('[name="followTrader"]')?.value.trim() ?? state.customerModal.draft.followTrader,
      region: form.querySelector('[name="region"]')?.value || "",
      agent: form.querySelector('[name="agent"]')?.value ?? state.customerModal.draft.agent,
      subType: form.querySelector('[name="subType"]')?.value ?? state.customerModal.draft.subType,
      remark: form.querySelector('[name="remark"]')?.value ?? state.customerModal.draft.remark
    } : {};
    state.customerModal = { draft: { ...state.customerModal.draft, ...current, ...patch }, error: "" };
    render();
  }

  function closeCustomerMasterModal() {
    state.customerModal = null;
    state.numberEdit = null;
    const root = $("#customer-modal-root");
    if (root) root.innerHTML = "";
    if (!$("#pdf-modal-root")?.innerHTML && !$("#material-order-modal-root")?.innerHTML) document.body.classList.remove("modal-open");
  }

  function toggleIntermediary(customerId) {
    const expanded = new Set(state.expandedIntermediaries);
    if (expanded.has(customerId)) expanded.delete(customerId);
    else expanded.add(customerId);
    state.expandedIntermediaries = [...expanded];
    render();
  }

  function findSubCustomerByRef(ref) {
    if (!ref || !ref.includes("::")) return null;
    const [parentId, encodedChildKey] = ref.split("::");
    const parent = state.customers.find(c => c.id === parentId);
    const childKey = decodeURIComponent(encodedChildKey || "");
    const child = (parent?.subCustomers || []).find((item, index) => (item.id || item.clientNo || item.name || String(index)) === childKey);
    return parent && child ? { parent, child, childKey } : null;
  }

  function submitCustomerModal(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const currentDraft = state.customerModal?.draft || {};
    const draft = {
      ...currentDraft,
      clientNo: form.querySelector('[name="clientNo"]')?.value.trim() || "",
      name: form.querySelector('[name="name"]').value.trim(),
      customerKind: form.querySelector('[name="customerKind"]:checked').value,
      region: form.querySelector('[name="region"]').value,
      agent: form.querySelector('[name="agent"]').value,
      followTrader: form.querySelector('[name="followTrader"]')?.value.trim() || "",
      phone: form.querySelector('[name="phone"]').value.trim(),
      remark: form.querySelector('[name="remark"]').value.trim(),
      subType: form.querySelector('[name="subType"]')?.value || currentDraft.subType || "",
      generateClientNo: form.querySelector('[name="generateClientNo"]') ? form.querySelector('[name="generateClientNo"]').checked : true
    };
    if (draft.customerKind === "中介下级客户" && !draft.parentId) {
      state.customerModal = { draft, error: "首先请选择所属中介（支持输入编号或中介名称搜索选择）。" };
      render();
      setTimeout(() => $("#modal-broker-search")?.focus(), 0);
      return;
    }
    const needsNumber = draft.customerKind !== "中介下级客户" || draft.generateClientNo;
    if (!draft.name) {
      state.customerModal = { draft, error: "请输入客户名称。" };
      render();
      return;
    }
    if (needsNumber && !isValidClientNo(draft.clientNo)) {
      state.customerModal = { draft, error: "客户编号必须是 20001-29999 之间的五位数字。" };
      render();
      return;
    }
    if (needsNumber && !isClientNoAvailable(draft.clientNo)) {
      state.customerModal = { draft, error: `客户编号 ${draft.clientNo} 已被占用，请换一个编号。` };
      render();
      return;
    }
    const systemType = draft.customerKind === "中介" ? "企业" : "个人";
    const displayNo = needsNumber ? draft.clientNo : "";
    const systemId = displayNo ? `CUST-${displayNo}` : `SUB-${Date.now().toString(36).toUpperCase()}`;
    const customer = {
      id: systemId,
      clientNo: displayNo,
      name: draft.name,
      enName: draft.name,
      type: systemType,
      customerKind: draft.customerKind,
      region: draft.region,
      agent: draft.agent,
      followTrader: draft.followTrader,
      status: "未准入",
      risk: "待评估",
      updated: "刚刚",
      owner: draft.agent ? `交易员 ${draft.agent}` : "待分配",
      dob: "待填写",
      idMasked: "待生成",
      phone: draft.phone || "待填写",
      email: "待填写",
      source: draft.remark || "新建客户",
      business: "SINO",
      documents: [],
      subCustomers: draft.customerKind === "中介" ? [] : [],
      timeline: [{ title: "新建客户", detail: `${draft.customerKind}客户 ${displayNo || "无编号"} 已创建${draft.remark ? `，备注：${draft.remark}` : ""}`, role: draft.agent ? `交易员 ${draft.agent}` : "待分配", time: "刚刚" }]
    };
    if (draft.customerKind !== "中介下级客户") {
      state.customers.unshift(customer);
    }
    if (draft.customerKind === "中介") {
      state.expandedIntermediaries = [customer.id, ...state.expandedIntermediaries];
    } else if (draft.customerKind === "中介下级客户" && draft.parentId) {
      const parentBroker = state.customers.find(c => c.id === draft.parentId);
      if (parentBroker) {
        parentBroker.subCustomers = parentBroker.subCustomers || [];
        parentBroker.subCustomers.unshift({
          id: systemId,
          name: draft.name,
          clientNo: displayNo,
          status: "未准入",
          type: draft.subType || "",
          region: draft.region || parentBroker.region,
          agent: draft.agent,
          followTrader: draft.followTrader,
          phone: draft.phone || "待填写",
          source: draft.remark || "新建客户",
          updated: "刚刚同步"
        });
        if (!state.expandedIntermediaries.includes(parentBroker.id)) {
          state.expandedIntermediaries.unshift(parentBroker.id);
        }
      }
    }
    state.customerModal = null;
    state.customerSearch = displayNo || draft.name;
    state.customerStatus = "全部状态";
    state.customerType = "全部类型";
    state.customerPage = 1;
    persistCustomers();
    render();
    toast("客户已新建", `${displayNo || "无编号"} · ${draft.name}`);
  }

  function openNumberEdit(customerId) {
    const customer = state.customers.find(item => item.id === customerId);
    if (!customer) return;
    state.numberEdit = {
      mode: "customer",
      customerId,
      clientNo: customer.clientNo || nextAvailableClientNo(),
      name: customer.name || "",
      customerKind: customerKind(customer),
      region: customer.region || "中国香港",
      agent: customer.agent || "杨澜",
      phone: customer.phone || "",
      followTrader: customer.followTrader || "",
      remark: customer.source || "",
      error: ""
    };
    state.customerModal = null;
    render();
    setTimeout(() => $("#number-edit-input")?.focus(), 0);
  }

  function openSubCustomerEdit(ref) {
    const found = findSubCustomerByRef(ref);
    if (!found) return;
    const { parent, child, childKey } = found;
    state.numberEdit = {
      mode: "sub",
      ref,
      parentId: parent.id,
      childKey,
      parentName: parent.name,
      clientNo: child.clientNo || "",
      name: child.name || "",
      customerKind: "中介下级客户",
      subType: child.type || "",
      region: child.region || parent.region || "中国香港",
      agent: child.agent || parent.agent || "杨澜",
      phone: child.phone || "",
      followTrader: child.followTrader || "",
      remark: child.source || "",
      error: ""
    };
    state.customerModal = null;
    render();
    setTimeout(() => $("#number-edit-input")?.focus(), 0);
  }

  function submitNumberEdit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const value = form.querySelector('[name="clientNo"]').value.trim();
    const customer = state.customers.find(item => item.id === state.numberEdit?.customerId);
    const subTarget = state.numberEdit?.mode === "sub" ? findSubCustomerByRef(state.numberEdit.ref) : null;
    if (!customer && !subTarget) return;
    const draft = {
      ...state.numberEdit,
      clientNo: value,
      name: form.querySelector('[name="name"]').value.trim(),
      region: form.querySelector('[name="region"]').value,
      agent: form.querySelector('[name="agent"]').value,
      phone: form.querySelector('[name="phone"]').value.trim(),
      followTrader: form.querySelector('[name="followTrader"]').value.trim(),
      remark: form.querySelector('[name="remark"]').value.trim(),
      subType: form.querySelector('[name="subType"]')?.value || state.numberEdit.subType || ""
    };
    const requiresNumber = state.numberEdit.mode !== "sub";
    if ((requiresNumber || value) && !isValidClientNo(value)) {
      state.numberEdit = { ...draft, error: "客户编号必须是 20001-29999 之间的五位数字。" };
      render();
      return;
    }
    if (value && !isClientNoAvailable(value, customer?.id || "", state.numberEdit.childKey)) {
      state.numberEdit = { ...draft, error: `客户编号 ${value} 已被占用，请换一个编号。` };
      render();
      toast("编号已被占用", `${value} 已存在，不能保存`);
      return;
    }
    if (!draft.name) {
      state.numberEdit = { ...draft, error: "请输入客户名称。" };
      render();
      return;
    }
    let toastName = draft.name;
    if (state.numberEdit.mode === "sub") {
      const found = findSubCustomerByRef(state.numberEdit.ref);
      if (!found) return;
      const previous = found.child.clientNo || "无编号";
      Object.assign(found.child, {
        clientNo: value,
        name: draft.name,
        type: draft.subType,
        region: draft.region || found.parent.region,
        agent: draft.agent,
        followTrader: draft.followTrader,
        phone: draft.phone || "待填写",
        source: draft.remark || found.child.source || "客户信息维护",
        updated: "刚刚同步"
      });
      found.parent.updated = "刚刚";
      found.parent.timeline = found.parent.timeline || [];
      found.parent.timeline.unshift({ title: "编辑下级客户信息", detail: `${draft.name}：编号 ${previous} 改为 ${value || "无编号"}`, role: `交易员 ${roles.agent.name}`, time: "刚刚" });
    } else {
      const previous = customer.clientNo || customer.id;
      Object.assign(customer, {
        clientNo: value,
        name: draft.name,
        enName: customer.enName || draft.name,
        region: draft.region,
        agent: draft.agent,
        followTrader: draft.followTrader,
        phone: draft.phone || "待填写",
        source: draft.remark || customer.source || "客户信息维护",
        updated: "刚刚"
      });
      if (!customer.owner || /^交易员|待分配/.test(customer.owner)) customer.owner = `交易员 ${draft.agent}`;
      customer.updated = "刚刚";
      customer.timeline.unshift({ title: "编辑客户信息", detail: `编号 ${previous} 改为 ${value}，客户主档信息已更新`, role: `交易员 ${roles.agent.name}`, time: "刚刚" });
    }
    state.numberEdit = null;
    state.customerSearch = draft.name;
    state.customerPage = 1;
    persistCustomers();
    render();
    toast("客户信息已更新", `${toastName} · ${value || "无编号"}`);
  }

  function handleFlowAction() {
    if (state.flowIndex >= flowActions.length) return;
    const action = flowActions[state.flowIndex];
    if (state.role !== action.role) {
      state.role = action.role;
      $("#role-select").value = action.role;
      render();
      toast("已切换处理人视角", `现在由${roles[action.role].label}执行“${action.label}”`);
      return;
    }
    if (/KYC|合规|流水/.test(action.title)) {
      showConfirm("确认审核通过？", "系统只记录审核结论和依据，最终判断仍由授权人员负责。", "审核意见", "资料、账户和风险依据已核对，可继续交易。", "确认通过", advanceFlow);
      return;
    }
    if (/现金|外币出款|银行转账|发送 USDT|发送USDT/.test(action.title) && action.role === "ops") {
      showConfirm("确认执行当前付款？", "请确认金额、收款人、地址或信物已经完成复核。", "复核备注", "金额、对象和凭证已完成 Double Check。", "确认执行", advanceFlow);
      return;
    }
    advanceFlow();
  }

  function advanceFlow() {
    const action = flowActions[state.flowIndex];
    const customer = mainCustomer();
    setCustomerStatus(customer, /完成/.test(action.status) ? "已成交" : "交易中", `${roles[state.role].label} ${roles[state.role].name}`, action.event);
    customer.updated = "刚刚";
    customer.owner = state.flowIndex + 1 < flowActions.length ? `${roles[flowActions[state.flowIndex + 1].role].label} ${roles[flowActions[state.flowIndex + 1].role].name}` : "交易员 杨澜";
    if (state.flowIndex === 0) {
      customer.documents = customer.documents.map((doc, index) => ({ ...doc, state: index === 1 ? "低置信度" : "已识别", tone: index === 1 ? "amber" : "teal" }));
    }
    if (state.flowIndex === 2) {
      customer.documents[1] = { name: "地址证明", meta: "address_proof_v2.pdf · 2 页", state: "已通过", tone: "teal" };
    }
    customer.timeline.unshift({ title: action.event, detail: action.detail, role: `${roles[state.role].label} ${roles[state.role].name}`, time: "刚刚" });
    state.flowIndex += 1;
    persistCustomers();
    render();
    toast(action.event, state.flowIndex < flowActions.length ? `下一步由${roles[flowActions[state.flowIndex].role].label}处理` : "完整业务闭环已完成");
  }

  function openCustomer(id) {
    const customer = state.customers.find(c => c.id === id);
    if (!customer) return;
    state.drawerCustomer = id;
    state.drawerTab = "overview";
    state.drawerApplication = null;
    renderDrawer();
    const drawer = $("#detail-drawer");
    const backdrop = $("#drawer-backdrop");
    backdrop.hidden = false;
    requestAnimationFrame(() => { drawer.classList.add("open"); backdrop.classList.add("visible"); });
    drawer.setAttribute("aria-hidden", "false");
    setTimeout(() => $(".drawer-close", drawer)?.focus(), 240);
  }

  function openSubCustomer(ref) {
    const subCustomer = resolveDrawerCustomer(ref);
    if (!subCustomer) return;
    state.drawerCustomer = ref;
    state.drawerTab = "overview";
    state.drawerApplication = null;
    renderDrawer();
    const drawer = $("#detail-drawer");
    const backdrop = $("#drawer-backdrop");
    backdrop.hidden = false;
    requestAnimationFrame(() => { drawer.classList.add("open"); backdrop.classList.add("visible"); });
    drawer.setAttribute("aria-hidden", "false");
    setTimeout(() => $(".drawer-close", drawer)?.focus(), 240);
  }

  function closeDrawer() {
    const drawer = $("#detail-drawer");
    const backdrop = $("#drawer-backdrop");
    if (!drawer || !drawer.classList.contains("open")) return;
    drawer.classList.remove("open"); backdrop.classList.remove("visible"); drawer.setAttribute("aria-hidden", "true");
    setTimeout(() => { backdrop.hidden = true; state.drawerCustomer = null; }, 180);
  }

  function resolveDrawerCustomer(ref) {
    if (!ref) return null;
    if (!ref.includes("::")) return state.customers.find(c => c.id === ref) || null;
    const [parentId, encodedChildKey] = ref.split("::");
    const parent = state.customers.find(c => c.id === parentId);
    const childKey = decodeURIComponent(encodedChildKey || "");
    const child = (parent?.subCustomers || []).find((item, index) => (item.id || item.clientNo || item.name || String(index)) === childKey);
    if (!parent || !child) return null;
    return {
      id: child.id || `${parent.id}-SUB-${childKey}`,
      clientNo: child.clientNo || "",
      name: child.name,
      enName: child.enName || child.name,
      type: child.type || "个人",
      customerKind: "中介下级客户",
      region: child.region || parent.region,
      agent: child.agent || parent.agent,
      status: child.status || "未准入",
      risk: child.risk || "待评估",
      updated: child.updated || parent.updated || "刚刚同步",
      owner: child.owner || parent.owner,
      dob: child.dob || "待填写",
      idMasked: child.idMasked || "待生成",
      phone: child.phone || "待填写",
      email: child.email || "待填写",
      source: child.source || `上级中介 ${parent.name}`,
      business: child.business || parent.business,
      documents: child.documents || [],
      timeline: child.timeline || [{ title: "下级客户建档", detail: `归属中介 ${parent.name}`, role: parent.owner || "系统", time: child.updated || "刚刚同步" }],
      parentBroker: parent,
      subType: child.type || ""
    };
  }

  function renderDrawer() {
    const customer = resolveDrawerCustomer(state.drawerCustomer);
    if (!customer) return;
    const tabs = [["overview", "概览"], ["documents", "材料"], ["applications", "申请"], ["funding", "交易与凭证"], ["timeline", "时间线"]];
    const eyebrow = customerKind(customer) === "中介" ? "INTERMEDIARY CUSTOMER" : customerKind(customer) === "中介下级客户" ? "INTERMEDIARY SUB CUSTOMER" : "DIRECT CUSTOMER";
    $("#detail-drawer").innerHTML = `<div class="drawer-head"><div><p class="eyebrow">${eyebrow}</p><h2>${escapeHtml(customer.name)} <span class="status status-${statusTone(customer.status)}">${escapeHtml(customer.status)}</span></h2><p>${escapeHtml(customerNo(customer))} · ${escapeHtml(customer.enName)}</p></div><button class="drawer-close" aria-label="关闭客户详情" type="button">×</button></div><div class="drawer-tabs">${tabs.map(([key, label]) => `<button class="drawer-tab ${state.drawerTab === key ? "active" : ""}" data-drawer-tab="${key}">${label}</button>`).join("")}</div><div class="drawer-body">${renderDrawerBody(customer)}</div>`;
    $(".drawer-close").addEventListener("click", closeDrawer);
    $$('[data-drawer-tab]').forEach(tab => tab.addEventListener("click", () => { state.drawerTab = tab.dataset.drawerTab; state.drawerApplication = null; renderDrawer(); }));
    $$('[data-drawer-app]', $("#detail-drawer")).forEach(button => button.addEventListener("click", () => {
      const records = customerApplications(customer);
      const expandedId = state.drawerApplication === null ? records[0]?.id : state.drawerApplication;
      state.drawerApplication = expandedId === button.dataset.drawerApp ? "" : button.dataset.drawerApp;
      renderDrawer();
    }));
    $$('[data-pdf-preview]', $("#detail-drawer")).forEach(el => el.addEventListener("click", () => openPdfPreview(el.dataset.pdfPreview, el.dataset.pdfName)));
    $$('[data-mark-status]', $("#detail-drawer")).forEach(button => button.addEventListener("click", () => {
      const target = state.customers.find(item => item.id === customer.id);
      if (!target || !tradeMarkableStatuses.includes(target.status)) return;
      const nextStatus = button.dataset.markStatus;
      const operator = `${roles[state.role].label} ${roles[state.role].name}`;
      showConfirm(`标记为「${nextStatus}」？`, `${target.name} 将由 ${operator} 手动标记为「${nextStatus}」，操作人和操作时间会写入状态变更记录。`, "操作备注", nextStatus === "交易中" ? "客户已开始交易" : "客户交易已完成", "确认标记", note => {
        if (!setCustomerStatus(target, nextStatus, operator, note)) return;
        target.timeline.unshift({ title: `标记${nextStatus}`, detail: note || `状态由内部人员手动标记为「${nextStatus}」`, role: operator, time: "刚刚" });
        persistCustomers();
        render();
        renderDrawer();
        toast("客户状态已更新", `${target.name} → ${nextStatus} · 操作人 ${operator}`);
      });
    }));
  }

  function renderDrawerStatusSection(c) {
    const customer = state.customers.find(item => item.id === c.id);
    if (!customer) return "";
    const canMark = tradeMarkableStatuses.includes(customer.status);
    const log = customer.statusLog || [];
    return `<section class="drawer-status-section">
      <h3>状态管理</h3>
      ${canMark
        ? `<p class="drawer-status-hint">合规审核已通过。内部工作人员可手动标记交易状态，操作人和操作时间会自动记录。</p>
          <div class="case-actions drawer-status-actions">
            <button class="btn btn-sm ${customer.status === "交易中" ? "" : "btn-primary"}" type="button" data-mark-status="交易中" ${customer.status === "交易中" ? "disabled" : ""}>标记为交易中</button>
            <button class="btn btn-sm ${customer.status === "已成交" ? "" : "btn-primary"}" type="button" data-mark-status="已成交" ${customer.status === "已成交" ? "disabled" : ""}>标记为已成交</button>
          </div>`
        : `<p class="drawer-status-hint">当前状态「${escapeHtml(customer.status)}」。合规审核通过后，才可手动标记「交易中」或「已成交」。</p>`}
      <h3>状态变更记录</h3>
      ${log.length
        ? `<div class="timeline">${log.map(entry => `<div class="timeline-item"><strong>${escapeHtml(entry.from)} → ${escapeHtml(entry.to)}</strong>${entry.note ? `<p>${escapeHtml(entry.note)}</p>` : ""}<time>操作人 ${escapeHtml(entry.operator)} · 操作时间 ${escapeHtml(entry.time)}</time></div>`).join("")}</div>`
        : `<p class="drawer-status-empty">暂无状态变更记录。</p>`}
    </section>`;
  }

  function renderDrawerBody(c) {
    const parentFields = c.parentBroker ? `${detailField("上级中介", `${escapeHtml(c.parentBroker.name)} · ${escapeHtml(customerNo(c.parentBroker))}`)}${detailField("下级类型", c.subType ? escapeHtml(c.subType) : "待完善")}` : "";
    if (state.drawerTab === "overview") return `<div class="detail-grid">${detailField("客户编号", escapeHtml(customerNo(c)))}${detailField("客户类型", escapeHtml(customerKind(c)))}${parentFields}${detailField("风险等级", `${escapeHtml(c.risk)}风险`)}${detailField("地区", escapeHtml(c.region))}${detailField("所属 交易员", escapeHtml(c.agent))}</div>${c.parentBroker ? "" : renderDrawerStatusSection(c)}`;
    if (state.drawerTab === "documents") return `<h3>材料清单</h3><div class="document-list">${c.documents.length ? c.documents.map(doc => `<div class="document-row"><span class="doc-icon">PDF</span><div><strong>${escapeHtml(doc.name)}${doc.flowLabel ? `<em class="doc-flow-tag ${doc.flow === "compliance" ? "compliance" : "library"}">${escapeHtml(doc.flowLabel)}</em>` : ""}</strong><small>${escapeHtml(doc.meta)}</small><small class="document-upload-time">上传时间：${escapeHtml(documentUploadTime(doc, c))}</small></div><span class="status status-${statusTone(doc.state)}">${escapeHtml(doc.state)}</span>${doc.url ? `<div class="document-actions"><button class="btn btn-sm" type="button" data-pdf-preview="${doc.url}" data-pdf-name="${escapeHtml(doc.name)}">预览</button><a class="btn btn-sm" href="${doc.url}" download="${escapeHtml(doc.name)}">下载</a></div>` : ""}</div>`).join("") : `<div class="empty-inline">暂无材料，后续上传后会同步到客户档案。</div>`}</div>`;
    if (state.drawerTab === "timeline") return `<h3>完整业务时间线</h3><div class="timeline">${c.timeline.map(timelineItem).join("")}</div>`;
    if (state.drawerTab === "funding") {
      const dispatchRecords = state.payoutOrders.filter(order => order.customerId === c.id);
      return `<h3>交易与凭证</h3><div class="detail-grid" style="margin-top:14px">${detailField("预约库存", c.id === "C-2026-0718" && state.flowIndex >= 8 ? "20,000 USDT / HKD 156,400" : "暂无")}${detailField("库存状态", c.id === "C-2026-0718" && state.flowIndex >= 9 ? "已锁定" : "待申请")}${detailField("凭证状态", c.id === "C-2026-0718" && state.flowIndex >= 11 ? "已匹配" : "待上传")}</div>
      <h3 style="margin-top:22px">出款记录与水单</h3>
      ${dispatchRecords.length ? `<div class="document-list">${dispatchRecords.map(order => `<div class="document-row"><span class="doc-icon">单</span><div><strong>${order.id}</strong><small>${escapeHtml(order.orderTitle || "")} · ${escapeHtml(`${order.currency} ${order.amount}`)} · ${escapeHtml(order.channel)} 通道</small>${order.receipt ? `<small class="document-upload-time">水单：${escapeHtml(order.receipt.fileName || "手工登记")}${order.receipt.reference ? ` · ${escapeHtml(order.receipt.reference)}` : ""} · ${escapeHtml(`${order.receipt.uploadedBy || ""} ${order.receipt.uploadedAt || ""}`)}</small>` : `<small class="document-upload-time">${order.status === "已出款" ? "水单待补" : "出款完成后归档水单"}</small>`}</div><span class="status status-${statusTone(order.status)}">${order.status}</span>${order.receipt?.fileUrl ? `<div class="document-actions"><button class="btn btn-sm" type="button" data-pdf-preview="${order.receipt.fileUrl}" data-pdf-name="${escapeHtml(order.receipt.fileName || order.id)}">预览水单</button><a class="btn btn-sm" href="${order.receipt.fileUrl}" download="${escapeHtml(order.receipt.fileName || order.id)}">下载</a></div>` : ""}</div>`).join("")}</div>` : `<div class="empty-inline" style="margin-top:12px">暂无出款记录。排单出款完成后，水单会自动同步到这里。</div>`}`;
    }
    return renderDrawerApplications(c);
  }

  function applicationTimeWeight(time = "") {
    const clock = time.match(/(\d{1,2}):(\d{2})/);
    const minutes = clock ? Number(clock[1]) * 60 + Number(clock[2]) : 0;
    if (time.includes("刚刚")) return 4000000;
    if (time.includes("今天")) return 3000000 + minutes;
    if (time.includes("昨天")) return 2000000 + minutes;
    const date = time.match(/(\d{1,2})-(\d{1,2})/);
    if (date) return (Number(date[1]) * 100 + Number(date[2])) * 1440 + minutes;
    return 0;
  }

  function applicationCaseIcon(type = "") {
    if (type.includes("KYB")) return "KYB";
    if (type.includes("KYC")) return "KYC";
    if (type.includes("补件")) return "补件";
    if (type.includes("追加")) return "追加";
    if (type.includes("交易")) return "交易";
    return "案件";
  }

  function customerApplications(c) {
    const accessType = c.type === "企业" ? "企业 KYB 准入" : "个人 KYC 准入";
    const orders = state.materialOrders.filter(order => order.customerId === c.id).map(order => ({
      kind: "准入申请", icon: "APP", id: order.id, type: accessType, status: order.status,
      source: `交易员 ${order.owner} 提交`, agent: order.owner, owner: order.owner, time: order.updated,
      stage: order.stage, completeness: order.completeness, note: order.note, history: order.history || [],
      withMaterials: true
    }));
    const cases = state.cases.filter(item => item.customerId === c.id).map(item => ({
      kind: "审核案件", icon: applicationCaseIcon(item.type), id: item.id, type: item.type, status: item.status,
      source: item.source, agent: item.agent, owner: item.owner, time: item.entered,
      sla: item.sla, completeness: item.completeness, note: item.note,
      bankRef: item.bankRef, result: item.result, history: [],
      withMaterials: /KYC|KYB|补件/.test(item.type)
    }));
    return [...orders, ...cases].sort((a, b) => applicationTimeWeight(b.time) - applicationTimeWeight(a.time));
  }

  function applicationMaterials(c) {
    const items = c.materialSubmission?.items;
    if (items?.length) return items.map(item => ({ name: item.category, meta: item.name, state: item.opsDecision || "待审核" }));
    return (c.documents || []).map(doc => ({ name: doc.name, meta: doc.meta, state: doc.state }));
  }

  function renderApplicationDetail(c, record) {
    const fields = [
      ["提交来源", record.source],
      ["所属 交易员", record.agent],
      ["当前处理人", record.owner],
      record.stage ? ["办理阶段", record.stage] : null,
      record.sla ? ["时效 SLA", record.sla] : null,
      record.completeness ? ["材料完整度", record.completeness] : null,
      record.bankRef && record.bankRef !== "未提交" ? ["银行参考号", record.bankRef] : null,
      record.result ? ["当前结论", record.result] : null
    ].filter(Boolean);
    const materials = record.withMaterials ? applicationMaterials(c) : [];
    return `<div class="application-detail">
      <div class="detail-grid">${fields.map(([label, value]) => detailField(escapeHtml(label), escapeHtml(value))).join("")}</div>
      ${record.note ? `<p class="application-note">处理备注：${escapeHtml(record.note)}</p>` : ""}
      ${record.withMaterials ? `<h4>已提交材料</h4>${materials.length
        ? `<div class="application-materials">${materials.map(item => `<div class="application-material-row"><div><strong>${escapeHtml(item.name)}</strong>${item.meta ? `<small>${escapeHtml(item.meta)}</small>` : ""}</div><span class="status status-${statusTone(item.state)}">${escapeHtml(item.state)}</span></div>`).join("")}</div>`
        : `<div class="empty-inline">该申请暂未关联材料。</div>`}` : ""}
      ${record.history.length ? `<h4>办理记录</h4><ul class="application-history">${record.history.map(entry => `<li>${escapeHtml(entry)}</li>`).join("")}</ul>` : ""}
    </div>`;
  }

  function renderDrawerApplications(c) {
    const records = customerApplications(c);
    if (!records.length) return `<h3>业务申请</h3><div class="empty-inline" style="margin-top:14px">暂无业务申请记录。交易员 在业务准入提交后，会自动同步到这里。</div>`;
    const expandedId = state.drawerApplication === null ? records[0].id : state.drawerApplication;
    return `<h3>业务申请</h3><p class="drawer-section-hint">共 ${records.length} 条记录，来自 交易员 在业务准入提交的申请及后续审核案件。点击记录查看已提交材料与办理进度。</p><div class="application-list">${records.map(record => {
      const open = record.id === expandedId;
      return `<article class="application-card ${open ? "open" : ""}">
        <button class="application-summary" type="button" data-drawer-app="${escapeHtml(record.id)}" aria-expanded="${open}">
          <span class="doc-icon">${escapeHtml(record.icon)}</span>
          <div><strong>${escapeHtml(record.type)}</strong><small>${escapeHtml(record.id)} · ${escapeHtml(record.kind)} · ${escapeHtml(record.time)}</small></div>
          <span class="status status-${statusTone(record.status)}">${escapeHtml(record.status)}</span>
          <i class="application-caret">${open ? "▾" : "▸"}</i>
        </button>
        ${open ? renderApplicationDetail(c, record) : ""}
      </article>`;
    }).join("")}</div>`;
  }

  function detailField(label, value) { return `<div class="detail-field"><span>${label}</span><strong>${value}</strong></div>`; }

  function showConfirm(title, message, fieldLabel, defaultValue, confirmLabel, onConfirm) {
    const root = $("#confirm-root");
    root.innerHTML = `<div class="confirm-backdrop"><div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-title"><h2 id="confirm-title">${title}</h2><p>${message}</p><div class="field"><label for="confirm-note">${fieldLabel}</label><textarea id="confirm-note">${defaultValue}</textarea></div><div class="confirm-actions"><button class="btn" id="confirm-cancel">取消</button><button class="btn btn-primary" id="confirm-accept">${confirmLabel}</button></div></div></div>`;
    $("#confirm-cancel").addEventListener("click", () => root.innerHTML = "");
    $("#confirm-accept").addEventListener("click", () => { const note = $("#confirm-note")?.value.trim() || ""; root.innerHTML = ""; onConfirm(note); });
    $("#confirm-note").focus();
  }

  function confirmReset() { showConfirm("重置全部演示数据？", "角色、客户状态和完整流程将恢复到初始状态。", "确认说明", "重新开始业务演示", "确认重置", resetAll); }
  function resetAll() { localStorage.removeItem(customerStorageKey); const templates = initialScheduleTemplates(); state = { role: "agent", view: "dashboard", customers: initialCustomers(), cases: initialCases(), caseReviewDrafts: {}, flowIndex: 0, caseStatus: "待运营审核", selectedCase: "OPS-260718", commissionConfirmed: false, materialFlow: initialMaterialFlow(), quickMaterialUpload: initialQuickMaterialUpload(), kycConfig: initialKycConfig(), materialOrders: initialMaterialOrders(), scheduleTemplates: templates, scheduleOrders: initialScheduleOrders(templates), scheduleNavOpen: true, businessAccessNavOpen: true, payoutOrders: [], dispatchModal: null, dispatchSearch: "", dispatchViewOrder: null, payoutReceiptModal: null, auditTab: "pending", payoutOpsTab: "queue", quote: initialQuoteState(), selectedScheduleTemplateId: "", scheduleForm: initialScheduleForm(null), scheduleTemplateDraft: { name: "", description: "", fields: initialScheduleForm(null) }, customerSearch: "", customerStatus: "全部状态", customerType: "全部类型", customerPage: 1, expandedIntermediaries: ["C-2026-0694"], customerModal: null, numberEdit: null, drawerCustomer: null, drawerTab: "overview", drawerApplication: null, complianceQueueTab: "pending", complianceQueueSearch: "", complianceQueueType: "全部审核类型", complianceQueueStatus: "全部状态", complianceQueueConclusion: "全部", complianceReviewingCase: null, complianceConclusionDraft: { decision: "", note: "" }, createStep: 1, draftCustomer: { type: "个人", name: "", enName: "", region: "中国香港", agent: "杨澜", business: "SINO", relation: "新客户" }, mobileNav: false }; state.caseReviewDrafts = initialCaseReviewDrafts(state.cases, state.customers); state.payoutOrders = initialPayoutOrders(state.customers); $("#role-select").value = state.role; render(); toast("演示数据已重置", "可以重新开始业务演示"); }
  function resetFlowOnly() { const replacement = initialCustomers()[0]; const index = state.customers.findIndex(c => c.id === replacement.id); state.customers[index] = replacement; state.flowIndex = 0; persistCustomers(); render(); toast("主流程已重置", "其他演示客户保持不变"); }

  function toast(title, message) {
    const region = $("#toast-region");
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = `<i>✓</i><div><strong>${escapeHtml(title)}</strong><span>${escapeHtml(message)}</span></div>`;
    region.append(el);
    setTimeout(() => el.remove(), 3600);
  }

  setup();
})();
