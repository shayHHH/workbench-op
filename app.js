(() => {
  "use strict";

  const roles = {
    agent: { label: "初级交易员", name: "杨澜", title: "Junior Trader · JT-018", initials: "YL" },
    ops: { label: "高级交易员", name: "陈文静", title: "Senior Trader · ST-07", initials: "CJ" },
    payout: { label: "出款员", name: "何嘉敏", title: "Payout Clerk · PO-03", initials: "PO" },
    compliance: { label: "合规官", name: "Tina Lau", title: "合规官 · CO-02", initials: "TL" },
    manager: { label: "运营经理", name: "陆景然", title: "Operations Manager · OM-01", initials: "OM" },
    finance: { label: "财务", name: "许嘉怡", title: "Finance · FN-05", initials: "FN" },
    wallet: { label: "钱包运营", name: "梁子豪", title: "Wallet Ops · WO-02", initials: "WO" },
    admin: { label: "Admin", name: "Peter Wong", title: "System Administrator", initials: "PW" }
  };

  const navByRole = {
    agent: [
      ["dashboard", "工作台", "⌂", 5], ["customers", "客户管理", "♙"], ["tradeOrders", "交易订单", "▤"],
      ["quoteCenter", "报价管理", "₿"], ["businessAccess", "业务准入", "⇪"]
    ],
    ops: [
      ["dashboard", "工作台", "⌂", 6], ["customers", "客户管理", "♙"], ["tradeOrders", "交易订单", "▤"],
      ["quoteCenter", "报价管理", "₿"], ["businessAccess", "业务准入", "⇪"], ["exceptionCenter", "异常处理", "▲"]
    ],
    wallet: [
      ["dashboard", "工作台", "⌂"], ["tradeOrders", "交易订单", "▤"], ["walletRecords", "哈希与凭证", "◈"]
    ],
    payout: [
      ["dashboard", "工作台", "⌂", 5], ["cases", "出款任务", "▦", 5], ["receipts", "凭证匹配", "▧", 2], ["payoutRecords", "出款记录", "◷"]
    ],
    compliance: [
      ["dashboard", "工作台", "⌂", 4], ["cases", "审核队列", "▦", 3], ["kycConfig", "KYC list 配置", "≡"], ["audit", "审计日志", "◌"]
    ],
    manager: [
      ["dashboard", "工作台", "⌂", 6], ["customers", "客户管理", "♙"], ["tradeOrders", "交易订单总览", "▤"],
      ["department", "部门管理", "▥"], ["fundOps", "资金管理", "◈"], ["dailyRecon", "每日对账", "☰"], ["profitBoard", "盈利来源", "◉"], ["exceptionMonitor", "异常监控", "▲"]
    ],
    finance: [
      ["dashboard", "工作台", "⌂", 4], ["tradeOrders", "交易订单", "▤"], ["ledger", "账务流水", "☰"],
      ["inventory", "库存管理", "◈"], ["dailyRecon", "每日对账", "▦"], ["profitBoard", "盈利来源", "◉"], ["commissions", "费率与佣金", "◇"]
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
      lifecyclePaused: { reason: "风险原因暂停：资金来源说明不足", by: "运营经理 陆景然", time: "2026-08-22 10:15" },
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
      lifecycleDormant: true,
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

  const opsStatuses = ["待运营审核", "待客户补件", "合规驳回", "待提交银行", "银行审核中", "审核通过", "已过期", "已暂停", "交易中", "已终止"];

  const initialCases = () => [
    { id: "OPS-260718", customerId: "C-2026-0718", customer: "陈嘉宁", type: "个人 KYC", businessType: "港币/美元/外币私户打款买U", status: "待运营审核", source: "交易员 提交", agent: "杨澜", owner: "陈文静", entered: "今天 09:42", sla: "剩余 1h 36m", risk: "低", completeness: "8 / 9", previous: "交易员 完成材料提交", next: "审核材料并决定补件或提交合规", note: "地址证明第二页签发机构信息不清晰。", bankRef: "未提交", result: "待处理" },
    { id: "OPS-260694", customerId: "C-2026-0694", customer: "Northstar Trading Limited", type: "企业 KYB", businessType: "公户人民币买私户美金/港币/外币", status: "待客户补件", source: "合规退回", agent: "杨澜", owner: "杨澜", entered: "今天 08:46", sla: "剩余 5h 14m", risk: "中", completeness: "7 / 9", previous: "合规发起补件", next: "跟进 UBO 名单签署页", note: "缺少 UBO 名单最后一页签署。", bankRef: "未提交", result: "等待客户" },
    { id: "OPS-260711", customerId: "C-2026-0711", customer: "赵明远", type: "个人 KYC", businessType: "卖U换私户人民币转账", status: "合规驳回", source: "合规退回", agent: "杨澜", owner: "陈文静", entered: "昨天 16:28", sla: "已等待 17h", risk: "高", completeness: "9 / 9", previous: "合规驳回", next: "通知 交易员 补充资金来源说明", note: "资金来源说明不足以解释近期大额入账。", bankRef: "未提交", result: "合规驳回" },
    { id: "OPS-260677", customerId: "C-2026-0677", customer: "Aurora Capital Pte. Ltd.", type: "企业 KYB", businessType: "公户人民币买公户美金/港币/外币", status: "待提交银行", source: "合规通过", agent: "陈浩", owner: "陈文静", entered: "今天 09:05", sla: "剩余 3h 55m", risk: "中", completeness: "12 / 12", previous: "合规审核通过", next: "填写银行提交信息", note: "材料快照已生成，可提交银行。", bankRef: "待生成", result: "合规通过" },
    { id: "OPS-260681", customerId: "C-2026-0588", customer: "林雅雯", type: "个人 KYC", businessType: "U换现金", status: "银行审核中", source: "运营送审", agent: "周辰", owner: "陈文静", entered: "昨天 11:20", sla: "已等待 22h", risk: "低", completeness: "9 / 9", previous: "已提交 HSBC APP", next: "录入银行审核结果", note: "银行批次 B-0710-03。", bankRef: "BK-20260710-018", result: "等待银行" },
    { id: "OPS-260644", customerId: "C-2026-0588", customer: "林雅雯", type: "追加业务", status: "审核通过", source: "银行回传", agent: "周辰", owner: "陈文静", entered: "07-09 15:06", sla: "已通过", risk: "低", completeness: "9 / 9", previous: "银行审核通过", next: "创建或关联交易", note: "银行结果已验证。", bankRef: "BK-20260709-041", result: "通过" },
    { id: "OPS-260633", customerId: "C-2026-0677", customer: "Aurora Capital Pte. Ltd.", type: "企业交易", status: "交易中", source: "运营建单", agent: "陈浩", owner: "陈文静", entered: "07-08 16:40", sla: "T+1", risk: "中", completeness: "12 / 12", previous: "已关联额度和水单", next: "更新交易进度", note: "HKD 702,000 等值交易处理中。", bankRef: "BK-20260708-019", result: "执行中" },
    { id: "OPS-260601", customerId: "C-2026-0694", customer: "Northstar Trading Limited", type: "企业 KYB", businessType: "公户人民币买私户美金/港币/外币", status: "已终止", source: "银行结果", agent: "杨澜", owner: "陈文静", entered: "07-06 14:12", sla: "已关闭", risk: "中", completeness: "9 / 9", previous: "银行审核拒绝", next: "无后续操作", note: "银行未接受本次申请，需新建业务后方可重提。", bankRef: "BK-20260705-008", result: "银行拒绝", terminationType: "银行拒绝", terminationReason: "银行内部准入标准未满足" },
    { id: "CMP-260702", customerId: "C-2026-0718", customer: "陈嘉宁", type: "个人 KYC", businessType: "港币/美元/外币私户打款买U", status: "待合规审核", source: "运营提交", agent: "杨澜", owner: "Tina Lau", entered: "今天 10:08", sla: "剩余 3h 52m", risk: "低", completeness: "9 / 9", previous: "运营材料审核通过", next: "合规人工复核", note: "规则建议低风险，地址证明异常已由运营确认。", bankRef: "未提交", result: "待合规结论" },
    { id: "OPS-260731", customerId: "C-2026-0588", customer: "林雅雯", type: "个人 KYC", businessType: "U换现金", status: "待运营审核", source: "交易员 新申报", agent: "周辰", owner: "陈文静", entered: "今天 10:42", sla: "剩余 3h 18m", risk: "低", completeness: "7 / 8", previous: "交易员 提交材料", next: "核对银行月结单与地址证明", note: "申请表已签署，银行月结单文件名与材料项不一致。", bankRef: "未提交", result: "待处理" },
    { id: "OPS-260728", customerId: "C-2026-0718", customer: "陈嘉宁", type: "地址证明补件", status: "待客户补件", source: "合规退回", agent: "杨澜", owner: "陈文静", entered: "今天 09:26", sla: "剩余 1d 6h", risk: "低", completeness: "7 / 8", previous: "合规发起补件", next: "等待 交易员 上传地址证明第二页", note: "当前地址证明缺少签发机构信息页。", bankRef: "未提交", result: "等待客户材料" },
    { id: "OPS-260724", customerId: "C-2026-0694", customer: "Northstar Trading Limited", type: "企业 KYB", businessType: "公户人民币买私户美金/港币/外币", status: "合规驳回", source: "合规退回", agent: "杨澜", owner: "陈文静", entered: "昨天 18:05", sla: "已等待 16h", risk: "高", completeness: "11 / 12", previous: "合规驳回", next: "补充 UBO 资金来源证明", note: "最终受益人资金来源说明缺少支持文件。", bankRef: "未提交", result: "合规驳回" },
    { id: "OPS-260719", customerId: "C-2026-0711", customer: "赵明远", type: "个人 KYC", businessType: "卖U换私户人民币转账", status: "待提交银行", source: "合规通过", agent: "杨澜", owner: "陈文静", entered: "今天 08:54", sla: "剩余 4h 06m", risk: "中", completeness: "8 / 8", previous: "合规审核通过", next: "填写银行批次与外部参考号", note: "材料快照已锁定，等待选择提交银行。", bankRef: "待生成", result: "合规通过" },
    { id: "OPS-260714", customerId: "C-2026-0677", customer: "Aurora Capital Pte. Ltd.", type: "企业 KYB", businessType: "公户人民币买公户美金/港币/外币", status: "银行审核中", source: "运营送审", agent: "陈浩", owner: "陈文静", entered: "昨天 15:40", sla: "已等待 19h", risk: "中", completeness: "12 / 12", previous: "已提交 BOC Online", next: "跟进银行补充问题", note: "银行要求确认董事授权书签署日期。", bankRef: "BK-20260712-027", result: "等待银行" },
    { id: "OPS-260705", customerId: "C-2026-0718", customer: "陈嘉宁", type: "个人追加业务", status: "审核通过", source: "银行回传", agent: "杨澜", owner: "陈文静", entered: "07-11 17:22", sla: "已通过", risk: "低", completeness: "8 / 8", previous: "银行审核通过", next: "创建额度预约或关联交易", note: "HSBC APP 已返回通过结果。", bankRef: "BK-20260711-052", result: "通过" },
    { id: "OPS-260698", customerId: "C-2026-0588", customer: "林雅雯", type: "个人交易", status: "交易中", source: "运营建单", agent: "周辰", owner: "陈文静", entered: "07-10 13:18", sla: "T+1", risk: "低", completeness: "8 / 8", previous: "已关联额度和水单", next: "等待银行执行结果", note: "USD 62,000 等值交易正在执行。", bankRef: "BK-20260710-061", result: "执行中" },
    { id: "OPS-260650", customerId: "C-2026-0588", customer: "林雅雯", type: "个人 KYC", businessType: "U换现金", status: "已过期", source: "系统提示", agent: "周辰", owner: "周辰", entered: "08-20 09:00", sla: "需重新提交", risk: "低", completeness: "8 / 8", previous: "审核通过（2025-08）", next: "重新提交材料后进入待审核", note: "KYC 有效期届满、材料失效，需要重新提交材料。", bankRef: "已归档", result: "已过期" },
    { id: "OPS-260655", customerId: "C-2026-0677", customer: "Aurora Capital Pte. Ltd.", type: "企业 KYB", businessType: "公户人民币买公户美金/港币/外币", status: "已暂停", source: "风控限制", agent: "陈浩", owner: "Tina Lau", entered: "08-21 15:30", sla: "解除后恢复", risk: "中", completeness: "12 / 12", previous: "审核通过", next: "解除暂停且材料仍有效后恢复审核通过", note: "风控临时限制该业务准入；解除暂停且材料仍有效即可恢复。", bankRef: "已归档", result: "已暂停" },
    { id: "OPS-260690", customerId: "C-2026-0711", customer: "赵明远", type: "个人 KYC", businessType: "卖U换私户人民币转账", status: "已终止", source: "业务取消", agent: "杨澜", owner: "陈文静", entered: "07-09 11:35", sla: "已关闭", risk: "中", completeness: "8 / 8", previous: "交易员 申请取消", next: "无后续操作", note: "客户调整业务计划，主动取消本次申请。", bankRef: "未提交", result: "业务取消", terminationType: "业务取消", terminationReason: "客户主动取消本次准入申请" }
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
    customerChineseName: "",
    customerEnglishName: "",
    submitNote: "",
    useLibrary: false,
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
    { id: "APP-20260713-718", customerId: "C-2026-0718", businessType: "港币/美元/外币私户打款买U", status: "草稿", stage: "上传材料", step: 3, completeness: "4 / 8", updated: "今天 09:12", owner: "杨澜", note: "已保存客户资料，仍有 4 个材料项未上传。", history: ["今天 09:12 · 保存材料草稿", "今天 08:55 · 发起审核"] },
    { id: "APP-20260712-694", customerId: "C-2026-0694", businessType: "公户人民币买私户美金/港币/外币", status: "待补件", stage: "补件处理中", step: 3, completeness: "6 / 7", updated: "今天 08:46", owner: "杨澜", note: "合规要求补充 UBO 名单最后一页签署版。", history: ["今天 08:46 · 合规发起补件", "昨天 17:30 · 提交合规审核"] },
    { id: "APP-20260711-711", customerId: "C-2026-0711", businessType: "卖U换私户人民币转账", status: "待审核", stage: "合规审核", step: 4, completeness: "8 / 8", updated: "昨天 15:04", owner: "杨澜", note: "材料已直接提交合规审核，等待合规处理。", history: ["昨天 15:04 · 提交合规审核"] },
    { id: "APP-20260708-588", customerId: "C-2026-0588", businessType: "U换现金", status: "审核通过", stage: "已完成", step: 5, completeness: "8 / 8", updated: "07-10 17:22", owner: "周辰", note: "银行审核通过，可继续额度预约与交易。", history: ["07-10 17:22 · 银行审核通过", "07-09 11:08 · 合规审核通过"] },
    { id: "APP-20260703-614", customerId: "C-2026-0614", businessType: "公户人民币买私户美金/港币/外币", status: "审核拒绝", stage: "合规结论", step: 4, completeness: "6 / 8", updated: "07-03 18:18", owner: "陈浩", note: "合规明确拒绝本次业务准入：UBO 资金来源不充分。", history: ["07-03 18:18 · 合规审核驳回", "07-02 10:40 · 提交合规审核"] },
    { id: "APP-20260626-628", customerId: "C-2026-0628", businessType: "U换转账", status: "已过期", stage: "有效期管理", step: 5, completeness: "8 / 8", updated: "08-20 09:00", owner: "周辰", note: "该业务准入曾审核通过，KYC 有效期已过期，需重新提交材料。", history: ["08-20 09:00 · 系统标记 KYC 过期", "06-26 15:12 · 合规审核通过"] },
    { id: "APP-20260636-636", customerId: "C-2026-0636", businessType: "港币/美元/外币私户打款买U", status: "已暂停", stage: "风控暂停", step: 5, completeness: "10 / 10", updated: "08-15 11:30", owner: "杨澜", note: "风控人工暂停该业务准入，解除暂停且材料仍有效后恢复审核通过。", history: ["08-15 11:30 · 风控人工暂停", "07-05 12:08 · 合规审核通过"] },
    { id: "APP-20260701-599", customerId: "C-2026-0599", businessType: "法币换法币", status: "已取消", stage: "已作废", step: 2, completeness: "3 / 9", updated: "07-01 15:27", owner: "周辰", note: "客户主动取消本次申请，工单已作废；可重新发起新申请。", history: ["07-01 15:27 · 交易员取消申请", "06-30 14:02 · 保存材料草稿"] }
  ];

  const initialDepartmentMembers = () => [
    { id: "EMP-018", name: "杨澜", role: "初级交易员", group: "交易组", initials: "YL", todayDone: 12, pending: 3, dueToday: 1, overdue: 0, focus: "交易订单、付款登记", lastActive: "今天 15:42" },
    { id: "EMP-007", name: "陈文静", role: "高级交易员", group: "运营组", initials: "CJ", todayDone: 9, pending: 5, dueToday: 2, overdue: 1, focus: "收款确认、异常处理", lastActive: "今天 15:18" },
    { id: "EMP-002", name: "Tina Lau", role: "合规官", group: "合规组", initials: "TL", todayDone: 7, pending: 6, dueToday: 3, overdue: 1, focus: "KYC审核、出款审核", lastActive: "今天 14:55" },
    { id: "EMP-026", name: "Amy", role: "合规官", group: "合规组", initials: "AM", todayDone: 10, pending: 2, dueToday: 0, overdue: 0, focus: "KYC审核", lastActive: "今天 16:04" },
    { id: "EMP-003", name: "何嘉敏", role: "出款员", group: "出款组", initials: "PO", todayDone: 8, pending: 4, dueToday: 1, overdue: 0, focus: "出款执行、回单上传", lastActive: "今天 15:31" },
    { id: "EMP-005", name: "许嘉怡", role: "财务", group: "财务组", initials: "FN", todayDone: 6, pending: 4, dueToday: 1, overdue: 0, focus: "账务流水、每日对账", lastActive: "今天 15:06" },
    { id: "EMP-021", name: "周辰", role: "初级交易员", group: "交易组", initials: "ZC", todayDone: 8, pending: 6, dueToday: 2, overdue: 1, focus: "客户补件、排单发起", lastActive: "今天 14:37" }
  ];

  const initialDepartmentLeaves = () => [
    { id: "LV-260824-001", employeeId: "EMP-002", type: "年假", start: "2026-08-26", end: "2026-08-27", part: "全天", startTime: "09:00", endTime: "18:00", note: "OA 已通过，KYC 队列需提前交接。", source: "手工登记", registeredBy: "陆景然", registeredAt: "2026-08-24 09:20" },
    { id: "LV-260824-002", employeeId: "EMP-003", type: "外出", start: "2026-08-25", end: "2026-08-25", part: "下午", startTime: "13:00", endTime: "18:00", note: "银行柜台处理资料，16:30 后可线上处理。", source: "手工登记", registeredBy: "陆景然", registeredAt: "2026-08-24 10:05" },
    { id: "LV-260824-003", employeeId: "EMP-007", type: "培训", start: "2026-08-28", end: "2026-08-28", part: "上午", startTime: "09:00", endTime: "12:00", note: "新通道规则培训。", source: "手工登记", registeredBy: "陆景然", registeredAt: "2026-08-24 10:32" },
    { id: "LV-260824-004", employeeId: "EMP-021", type: "病假", start: "2026-08-29", end: "2026-08-29", part: "全天", startTime: "09:00", endTime: "18:00", note: "周末值班调整，排单草稿交由杨澜跟进。", source: "手工登记", registeredBy: "陆景然", registeredAt: "2026-08-24 11:18" }
  ];

  const initialLeaveDraft = () => ({
    employeeId: "EMP-002",
    type: "年假",
    start: "2026-08-26",
    end: "2026-08-26",
    part: "全天",
    startTime: "09:00",
    endTime: "18:00",
    note: "",
    handoff: true
  });

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
    tradeOrders: [],
    payments: [],
    treasury: [],
    ledger: [],
    ledgerSeq: 120,
    recon: null,
    orderView: null,
    orderModal: null,
    fundingModal: null,
    paymentModal: null,
    orderSearch: "",
    orderStatusFilter: "全部状态",
    paymentTab: "pending",
    exceptionTab: "all",
    inventoryTab: "overview",
    ledgerBizFilter: "全部类型",
    ledgerQuery: "",
    exceptionResolvedCount: 3,
    departmentMembers: initialDepartmentMembers(),
    departmentLeaves: initialDepartmentLeaves(),
    departmentTab: "calendar",
    departmentWeekOffset: 0,
    leaveDraft: initialLeaveDraft(),
    leavePanelOpen: false,
    selectedLeaveId: null,
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
  seedTradeCore(state);

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
  const statusTone = (status = "") => {
    if (/^待(客户付款|收款确认)$/.test(status)) return "warning";
    if (/完成|批准|确认|通过|锁定|已使用|成交|已出款/.test(status)) return "success";
    if (/拒绝|高风险|退回|异常|终止|取消|驳回/.test(status)) return "danger";
    if (/补件|等待|草稿|识别|检查|待排单|待出款|过期|暂停/.test(status)) return "warning";
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
    /* KYC 通过的瞬间，该客户所有待KYC订单自动推进到待客户入款（表4：本单业务准入审核通过） */
    if (tradeMarkableStatuses.includes(nextStatus)) {
      (state?.tradeOrders || []).filter(order => order.customerId === customer.id && order.status === "待KYC").forEach(order => {
        order.status = "待客户入款";
        order.updated = "刚刚";
        order.timeline?.unshift({ title: "KYC 审核通过", detail: `客户准入审核通过，订单进入待客户入款（入款登记人：${fundingOwnerLabel(order, "inflow")}）`, role: "系统", time: "刚刚" });
      });
    }
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
    if (["customerPayments", "paymentReview"].includes(state.view)) state.view = "tradeOrders";
    if (state.role === "agent" && (isScheduleChildView(state.view) || ["scheduleCenter"].includes(state.view))) state.view = "tradeOrders";
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
      tradeOrders: renderTradeOrders, customerPayments: renderTradeOrders, paymentReview: renderTradeOrders,
      exceptionCenter: renderExceptionCenter, exceptionMonitor: renderExceptionMonitor, payoutRecords: renderPayoutRecords,
      walletRecords: renderWalletRecords, ledger: renderLedgerCenter, inventory: renderInventoryCenter, dailyRecon: renderDailyRecon, fundOps: renderFundOps, profitBoard: renderProfitBoard,
      department: renderDepartmentManagement, commissions: renderCommissions, config: renderConfig, kycConfig: renderKycConfig, audit: renderAudit, tracking: renderTracking
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
    return navByRole[role].some(item => navItemHasView(item, view)) || (["agent", "ops"].includes(role) && view === "create") || (["agent", "ops"].includes(role) && isQuoteChildView(view)) || (role === "agent" && isScheduleChildView(view)) || (role === "ops" && view === "schedulingOps") || (role === "payout" && view === "tradeOrders") || (role === "wallet" && ["tradeOrders", "walletRecords"].includes(view));
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
    if (state.role === "payout" && view === "receipts") { const unmatched = state.payments.filter(item => item.voucherName && !item.matched && item.status !== "金额不符").length + state.payoutOrders.filter(item => item.receipt && !item.receipt.matched).length; return unmatched; }
    if (state.role === "ops" && view === "scheduleReviewCenter") return state.payoutOrders.filter(item => item.status === "出款审核中").length;
    if (["ops", "manager"].includes(state.role) && ["exceptionCenter", "exceptionMonitor"].includes(view)) return exceptionOrders().length;
    if (state.role === "agent" && view === "scheduleCenter") return dispatchPendingOrders().length;
    if (state.role === "agent" && view === "tradeOrders") return state.tradeOrders.filter(order => ["待KYC", "待客户入款", "待出款排单"].includes(order.status)).length;
    if (state.role === "finance" && view === "dailyRecon") return state.recon?.status === "有差异" ? state.recon.diffs.length : 0;
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
      agent: { eyebrow: "JUNIOR TRADER", title: "初级交易员工作台", subtitle: "以交易订单为主线：创建订单、跟进 KYC、客户入款与出款排单。", metrics: [["进行中订单", String(state.tradeOrders.filter(order => !["已完成", "已取消"].includes(order.status)).length), "订单主线"], ["待客户入款", String(state.tradeOrders.filter(order => order.status === "待客户入款").length), "等待入款登记"], ["待出款排单", String(dispatchPendingOrders().length), "入款已确认"], ["排单进行中", String(state.payoutOrders.filter(item => item.status !== "已出款").length), "含审核与待出款"]] },
      ops: { eyebrow: "SENIOR TRADER", title: "高级交易员工作台", subtitle: "复核付款、出款排单与异常，推进订单主线。", metrics: [["待付款审核", String(state.payments.filter(item => item.status === "待确认").length), "客户付款登记"], ["待出款审核", String(state.payoutOrders.filter(item => item.status === "出款审核中").length), "交易员已排单"], ["异常订单", String(exceptionOrders().length), "待异常处理"], ["待客户补件", String(state.cases.filter(item => item.status === "待客户补件").length), "需跟进"]] },
      payout: { eyebrow: "PAYOUT CLERK", title: "出款员工作台", subtitle: "处理出款队列和凭证匹配，保持付款材料完整归档。", metrics: [["待出款", String(state.payoutOrders.filter(item => item.status === "待出款").length), "审核已通过"], ["待核凭证", "2", "1 项金额不符"], ["已出款", String(state.payoutOrders.filter(item => item.status === "已出款").length), "回单已归档"], ["今日完成", "9", "已归档"]] },
      compliance: { eyebrow: "COMPLIANCE", title: "合规官工作台", subtitle: "只处理已提交合规的案件，自动化结果仅作为判断依据。", metrics: [["待合规审核", String(state.cases.filter(item => item.status === "待合规审核").length), "全部要求人工结论"], ["即将超时", "1", "剩余 3 小时"], ["今日已通过", "5", "均已人工确认"], ["今日已驳回", "2", "已返回处理"]] },
      manager: { eyebrow: "OPERATIONS MANAGER", title: "运营经理工作台", subtitle: "交易总览、资金管理、每日对账、盈利来源与异常监控。", metrics: [["全部订单", String(state.tradeOrders.length), "交易订单总览"], ["进行中订单", String(state.tradeOrders.filter(order => !["已完成", "已取消"].includes(order.status)).length), "含异常"], ["异常订单", String(exceptionOrders().length), "异常监控"], ["对账状态", state.recon?.status || "未开始", `对账日期 ${state.recon?.date || ""}`]] },
      wallet: { eyebrow: "WALLET OPS", title: "钱包运营工作台", subtitle: "收 U 地址、地址 KYA、链上入款到账与链上出款登记。", metrics: [["待链上入款登记", String(state.tradeOrders.filter(order => order.status === "待客户入款" && fundingKind(order, "inflow") === "chain").length), "查链上到账"], ["待地址 KYA", String(state.tradeOrders.filter(order => fundingKind(order, "outflow") === "chain" && ["待客户入款", "待出款排单"].includes(order.status) && order.walletOps?.kya !== "通过").length), "白名单校验"], ["待链上出款", String(state.tradeOrders.filter(order => order.status === "待出款" && fundingKind(order, "outflow") === "chain").length), "审核已通过"], ["USDT 钱包可用", `${fmtMoney(treasuryAccount("wallet-USDT")?.available || 0)}`, "热钱包余额"]] },
      finance: { eyebrow: "FINANCE", title: "财务工作台", subtitle: "账务流水、库存管理、每日对账与盈利来源。", metrics: [["账务流水", String(state.ledger.length), "全部记录"], ["库存预警", String(inventoryWarnings().length), "低库存/仓位风险"], ["对账状态", state.recon?.status || "未开始", `对账日期 ${state.recon?.date || ""}`], ["本月佣金", "HKD 42,180", "已确认"]] },
      admin: { eyebrow: "ADMINISTRATION", title: "系统总览", subtitle: "查看规则、权限和审计记录。", metrics: [["活跃用户", "26", "6 个角色组"], ["进行中案件", "38", "跨 4 个阶段"], ["规则版本", "v1.8", "07-08 生效"], ["审计事件", "1,284", "过去 30 天"]] }
    };
    const d = dashboards[state.role];
    const actionByRole = {
      agent: `<button class="btn" data-view="customers">查看客户</button><button class="btn btn-primary" data-view="materialsUpload">上传材料</button>`,
      ops: `<button class="btn" data-view="customers">查看客户</button><button class="btn btn-primary" data-view="scheduleReviewCenter">出款审核</button>`,
      payout: `<button class="btn btn-primary" data-view="cases">处理队列</button>`,
      wallet: `<button class="btn btn-primary" data-view="tradeOrders">钱包任务</button><button class="btn" data-view="walletRecords">哈希与凭证</button>`,
      compliance: `<button class="btn btn-primary" data-view="cases">进入审核队列</button>`,
      manager: `<button class="btn btn-primary" data-view="customers">查看客户管理</button>`,
      finance: `<button class="btn" data-view="customers">查看客户</button><button class="btn btn-primary" data-view="commissions">费率与佣金</button>`,
      admin: `<button class="btn btn-primary" data-view="config">查看系统规则</button>`
    };
    const actions = actionByRole[state.role] || "";
    return `<div class="page">${pageHeader(d.eyebrow, d.title, d.subtitle, actions)}${roleContext()}
      <section class="metric-strip" aria-label="关键指标">${d.metrics.map((m, i) => metric(m[0], m[1], m[2], ["◌", "!", "◇", "✓"][i])).join("")}</section>
      <div class="dashboard-grid">
        <section class="section"><div class="section-header"><div><h2>新的待处理请求</h2><p>从这里直接进入详情完成分配、确认或驳回</p></div><button class="link-button" data-view="${["admin", "compliance", "payout"].includes(state.role) ? navByRole[state.role][1][0] : "tradeOrders"}">查看全部 →</button></div>${renderRequestWidget()}</section>
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

  function pendingRequests() {
    const role = state.role;
    const rows = [];
    const push = (icon, title, type, status, time, attrs, action) => rows.push({ icon, title, type, status, time, attrs, action });
    const orderReq = (order, type, action) => push("单", `${order.customerName} · ${order.id}`, type, order.status, order.updated, `data-order-open="${order.id}"`, action);
    if (role === "agent") {
      state.tradeOrders.filter(order => order.paymentRejected || order.dispatchRejected || order.exception).slice(0, 2).forEach(order => orderReq(order, `交易订单 · ${orderFlags(order)[0]?.label || "需要处理"}`, "去处理"));
      state.tradeOrders.filter(order => order.status === "待出款排单").slice(0, 2).forEach(order => orderReq(order, "交易订单 · 入款已确认，待发起出款排单", "去排单"));
      state.tradeOrders.filter(order => order.status === "待KYC").slice(0, 2).forEach(order => orderReq(order, "交易订单 · 等待本单业务准入通过", "传材料"));
      state.materialOrders.filter(order => /补件|驳回/.test(order.status)).slice(0, 1).forEach(order => { const customer = state.customers.find(item => item.id === order.customerId); push("补", `${customer?.name || order.customerId} · ${order.id}`, "业务准入 · 处理补件", order.status, order.updated, `data-view="documents"`, "去补件"); });
    }
    if (role === "ops") {
      state.payments.filter(item => item.status === "待确认").slice(0, 3).forEach(item => push("款", `${item.customerName} · ${item.id}`, `客户付款 · ${moneyPair(item.currency, item.amount)} 待收款确认`, "待确认", item.submittedAt, `data-order-open="${item.orderId}"`, "去确认"));
      state.payoutOrders.filter(item => item.status === "出款审核中" && item.orderId).slice(0, 2).forEach(item => push("排", `${item.customerName} · ${item.id}`, `出款排单 · ${item.currency} ${item.amount} 待审核`, "出款审核中", item.submittedAt || item.updated, `data-order-open="${item.orderId}"`, "去审核"));
      exceptionOrders().slice(0, 2).forEach(order => orderReq(order, `附加异常 · ${order.exception.reason}`, "去处理"));
    }
    if (role === "payout") {
      state.payoutOrders.filter(item => item.status === "待出款").slice(0, 4).forEach(item => push("付", `${item.customerName} · ${item.id}`, `出款任务 · ${item.currency} ${item.amount} · ${item.channel} 通道`, "待出款", item.reviewedAt || item.updated, item.orderId ? `data-order-open="${item.orderId}"` : `data-view="cases"`, "去出款"));
    }
    if (role === "compliance") {
      state.cases.filter(item => item.status === "待合规审核").slice(0, 4).forEach(item => { const customer = state.customers.find(entry => entry.id === item.customerId); push("审", `${item.customer} · ${item.id}`, `合规审核 · ${item.type} · ${item.risk}风险`, "待合规审核", complianceSubmittedAt(item, customer), `data-compliance-open-review="${item.id}"`, "去审核"); });
    }
    if (role === "manager") {
      exceptionOrders().slice(0, 2).forEach(order => orderReq(order, `附加异常 · ${order.exception.reason}`, "查看"));
      state.tradeOrders.filter(order => !["已完成", "已取消"].includes(order.status) && !order.exception).slice(0, 2).forEach(order => orderReq(order, `交易订单 · ${orderStatusHint(order)}`, "查看"));
    }
    if (role === "finance") {
      state.payments.filter(item => item.status === "待确认").slice(0, 3).forEach(item => push("款", `${item.customerName} · ${item.id}`, `客户付款 · ${moneyPair(item.currency, item.amount)} 待确认到账`, "待确认", item.submittedAt, `data-order-open="${item.orderId}"`, "去确认"));
      state.tradeOrders.filter(order => order.paymentRejected).slice(0, 2).forEach(order => orderReq(order, "付款驳回记录 · 等待重新登记", "查看"));
    }
    if (role === "admin") {
      push("权", "权限变更 · Peter", "为新人员分配角色", "待确认", "今天", `data-view="config"`, "去处理");
      push("审", "异常下载", "同一用户 30 分钟内下载 12 份文件", "需检查", "剩余 1h", `data-view="audit"`, "去检查");
    }
    return rows.slice(0, 5);
  }

  function renderRequestWidget() {
    const rows = pendingRequests();
    if (!rows.length) return `<div class="empty-inline" style="margin:16px">暂无待处理请求，新提交的请求会出现在这里。</div>`;
    return `<div class="request-list">${rows.map(row => `<div class="request-row"><span class="task-icon">${row.icon}</span><div class="request-main"><strong>${escapeHtml(row.title)}</strong><span>${escapeHtml(row.type)} · 提交 ${escapeHtml(row.time || "刚刚")}</span></div><span class="status status-${statusTone(row.status)}">${escapeHtml(row.status)}</span><button class="btn btn-sm btn-primary" type="button" ${row.attrs}>${escapeHtml(row.action)} →</button></div>`).join("")}</div>`;
  }

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
    const statuses = ["全部状态", ...customerLifecycleStatuses];
    const filtered = state.customers.filter(customer => {
      const query = state.customerSearch.toLowerCase();
      const subCustomerText = (customer.subCustomers || []).map(item => `${item.name}${item.clientNo || ""}`).join("");
      return (!query || `${customer.name}${customer.enName}${customer.id}${customerNo(customer)}${customer.agent}${subCustomerText}`.toLowerCase().includes(query)) &&
        (state.customerStatus === "全部状态" || customerLifecycle(customer).label === state.customerStatus) &&
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

  /* 客户生命周期（表1）：新客户 → 活跃 ⇄ 沉睡 → 暂停合作。
     由订单行为派生（有订单即活跃），人工暂停 / 演示沉睡用标记字段覆盖；准入状态只在客户详情按业务类型查看。 */
  function customerLifecycle(c) {
    if (c.lifecyclePaused) return { label: "暂停合作", tone: "neutral" };
    const orders = state.tradeOrders.filter(order => order.customerId === c.id && order.status !== "已取消");
    if (orders.some(order => order.status !== "已完成")) return { label: "活跃", tone: "success" };
    if (c.lifecycleDormant) return { label: "沉睡", tone: "warning" };
    if (orders.length) return { label: "活跃", tone: "success" };
    return { label: "新客户", tone: "info" };
  }
  const customerLifecycleStatuses = ["新客户", "活跃", "沉睡", "暂停合作"];

  function customerRow(c) {
    const isIntermediary = customerKind(c) === "中介";
    const expanded = state.expandedIntermediaries.includes(c.id);
    return `<tr tabindex="0" data-open-customer="${c.id}"><td><div class="cell-primary">${isIntermediary ? `<button class="row-expander ${expanded ? "expanded" : ""}" type="button" data-toggle-intermediary="${c.id}" aria-label="${expanded ? "收起" : "展开"}${escapeHtml(c.name)}下级客户"></button>` : `<span class="row-expander-placeholder"></span>`}<span class="avatar ${isIntermediary ? "company" : ""}">${customerInitials(c)}</span><span><strong>${escapeHtml(c.name)}</strong><small>${customerNo(c)}</small></span></div></td><td>${customerKind(c)}<div class="muted">${escapeHtml(c.region || "未填写地区")}</div></td><td>${(lc => `<span class="status status-${lc.tone}">${lc.label}</span>`)(customerLifecycle(c))}</td><td><span class="risk ${riskClass(c.risk)}">${c.risk}风险</span></td><td>${c.owner}</td><td class="muted">${c.updated}</td><td><button class="btn btn-sm" type="button" data-edit-customer-info="${c.id}">编辑信息</button></td></tr>`;
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
      const targetKind = edit.targetCustomerKind || editKind;
      const canAttachBroker = edit.mode !== "sub" && editKind === "直客";
      const brokerOptions = state.customers
        .filter(customer => customer.id !== edit.customerId && customerKind(customer) === "中介")
        .map(customer => `<option value="${escapeHtml(customer.id)}" ${edit.parentId === customer.id ? "selected" : ""}>${escapeHtml(customer.name)} (${escapeHtml(customerNo(customer))})</option>`)
        .join("");
      const typeSummary = canAttachBroker
        ? `<div class="field full"><label>STEP 01 客户类型</label><div class="type-options customer-kind-options"><label class="type-option"><input type="radio" name="customerEditKind" value="直客" ${targetKind === "直客" ? "checked" : ""} /><strong>直客</strong><span>客户本人直接交易</span></label><label class="type-option"><input type="radio" name="customerEditKind" value="中介" ${targetKind === "中介" ? "checked" : ""} /><strong>中介</strong><span>可挂载下级客户</span></label><label class="type-option"><input type="radio" name="customerEditKind" value="中介下级客户" ${targetKind === "中介下级客户" ? "checked" : ""} /><strong>中介下级客户</strong><span>归属于指定中介</span></label></div></div>`
        : `<div class="field full customer-kind-summary"><label>STEP 01 客户类型</label><div><strong>${escapeHtml(editKind)}</strong><span>${editKind === "中介下级客户" ? `归属于 ${escapeHtml(edit.parentName || source.parent?.name || "指定中介")}` : editKind === "中介" ? "可挂载下级客户" : "客户本人直接交易"}</span></div></div>`;
      const brokerAttachField = canAttachBroker && targetKind === "中介下级客户"
        ? `<div class="field full"><label for="customer-edit-parent-broker">所属中介 <span>*</span></label><select id="customer-edit-parent-broker" name="parentId" required><option value="">选择要挂载的中介</option>${brokerOptions}</select><span class="field-hint">保存后该客户会从直客列表移动到所选中介的下级客户中，原编号和客户资料会保留。</span></div>`
        : "";
      const subTypeField = edit.mode === "sub" || targetKind === "中介下级客户" ? `<div class="field"><label for="customer-edit-sub-type">下级主体类型（可选）</label><select id="customer-edit-sub-type" name="subType"><option value="" ${!edit.subType ? "selected" : ""}>不定义</option><option value="个人" ${edit.subType === "个人" ? "selected" : ""}>个人 individual</option><option value="企业" ${edit.subType === "企业" ? "selected" : ""}>企业 operation</option></select></div>` : "";
      root.innerHTML = source.child ? `<div class="review-launch-backdrop"><section class="customer-number-dialog" role="dialog" aria-modal="true" aria-labelledby="number-modal-title">
        <header><div><span>CLIENT PROFILE</span><h2 id="number-modal-title">编辑客户信息</h2><p>${escapeHtml(edit.name)} · ${escapeHtml(editKind)} · 当前编号 ${escapeHtml(edit.clientNo || "无编号")}</p></div><button class="icon-button" id="number-modal-close" aria-label="关闭" type="button">×</button></header>
        <form id="number-edit-form" class="customer-modal-form">
          <div class="field-grid customer-create-grid">
            ${typeSummary}
            ${brokerAttachField}
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
    const rows = [...submission.items, ...pdfRows].map((item, index) => `<article class="review-material-row"><div><span class="doc-icon">PDF</span><span><strong>${item.category}</strong><small>${escapeHtml(item.name || item.filename)}${item.versions?.length ? ` · ${item.versions.at(-1).version}` : ""}</small></span></div><span class="status status-${statusTone(item[decisionKey] || "待审核")}">${item[decisionKey] || "待审核"}</span><div class="case-actions"><button class="btn btn-sm" type="button" data-pdf-preview="${item.url || "assets/trustpass-stage1-template.pdf"}" data-pdf-name="${escapeHtml(item.name || item.filename || item.category)}">预览</button>${item.url ? `<a class="btn btn-sm" href="${item.url}" download="${escapeHtml(item.name || item.filename)}">下载</a>` : ""}${index < submission.items.length ? `<button class="btn btn-sm btn-primary" data-review-material="${index}" data-review-role="${role}" data-review-decision="通过">通过</button>` : ""}</div></article>`).join("");
    const pathLabel = submission.generationPath === "none" ? "仅材料送审" : submission.generationPath === "ocr" ? "OCR 生成" : submission.generationPath === "quick-upload" ? "快速上传" : "手工填写生成";
    return `<div class="submission-review-head"><div><span>申报编号</span><strong>${submission.applicationId}</strong></div><div><span>申请表路径</span><strong>${pathLabel}</strong></div><div><span>提交时间</span><strong>${submission.submittedAt}</strong></div></div><div class="review-material-list">${rows}</div>`;
  }

  /* 种子案件没有 materialSubmission 时，用客户档案材料兜底，保证合规官始终能看到交易员提交的材料与字段 */
  function complianceFallbackSubmission(item, customer) {
    const docs = (customer?.documents || []).filter(doc => !/水单|回单/.test(doc.name));
    if (!docs.length) return null;
    return {
      applicationId: item.id,
      businessType: item.businessType || "",
      customerName: customer?.name || item.customer,
      note: item.note || "",
      submittedAt: item.submittedAt || item.entered,
      items: docs.map(doc => ({ category: doc.name, name: doc.meta, url: doc.url, opsDecision: doc.state || "已提交", versions: [] }))
    };
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
      ${state.complianceQueueTab === "processed"
        ? `<div class="data-table-wrap compliance-table-wrap"><table class="data-table compliance-table">${renderProcessedComplianceTable(processed)}</table></div>`
        : renderPendingComplianceCards(pending)}
      <div class="pagination-bar compliance-pagination"><span>共 ${activeRows.length} 条</span><div><button class="btn btn-sm" disabled>‹</button><button class="btn btn-sm btn-primary">1</button><button class="btn btn-sm" disabled>›</button></div><span>10 条/页</span></div>
    </div>`;
  }

  function renderComplianceReviewPage(item) {
    const customer = state.customers.find(c => c.id === item.customerId);
    const submission = customer?.materialSubmission || complianceFallbackSubmission(item, customer);
    const activity = activityGroups((customer?.timeline || []).slice(0, 6));
    return `<div class="page compliance-review-page"><button class="compliance-back-link" type="button" id="compliance-review-back">← 返回审核队列</button>
      <div class="compliance-review-grid">
      <section class="case-workspace compliance-review-workspace"><header class="case-workspace-head"><div><p class="eyebrow">${escapeHtml(complianceCustomerNo(item, customer))}</p><h2>${escapeHtml(item.customer)} <span class="status status-info">${escapeHtml(complianceAuditType(item))}</span></h2><p>${escapeHtml(item.type)} · 提交时间 ${escapeHtml(complianceSubmittedAt(item, customer))}</p></div><span class="risk ${riskClass(item.risk)}">${item.risk}风险</span></header>${submission ? renderComplianceSubmissionReview(item, submission, customer) : `<div class="notice-preview"><span>自动化建议 · 不是最终结论</span><p>未命中制裁名单；材料完整性已由上一环节确认，仍需合规官人工给出最终结论。</p></div>`}${renderComplianceConclusionSection(item, submission)}</section>
      <aside class="section compliance-review-aside">
        <div class="section-header"><div><h2>工单属性</h2><p>案件与客户关键信息</p></div></div>
        <div class="order-attr-table compliance-attr-table">
          ${orderAttrRow("▦", "工单编号", `<strong>${escapeHtml(item.id)}</strong>`)}
          ${orderAttrRow("♙", "客户", customer ? `<button class="link-button" type="button" data-open-customer="${customer.id}">${escapeHtml(`${item.customer}（${complianceCustomerNo(item, customer)}）`)}</button>` : escapeHtml(item.customer))}
          ${orderAttrRow("≡", "审核类型", `${escapeHtml(item.type)} · ${escapeHtml(complianceAuditType(item))}`)}
          ${orderAttrRow("▲", "风险等级", `${escapeHtml(item.risk)}风险`)}
          ${orderAttrRow("◇", "材料完整度", escapeHtml(item.completeness || "—"))}
          ${orderAttrRow("◉", "当前处理人", escapeHtml(item.owner || "—"))}
          ${orderAttrRow("◷", "提交时间", escapeHtml(complianceSubmittedAt(item, customer)))}
        </div>
        ${item.note ? `<div class="order-panel-note">上一环节说明：${escapeHtml(item.note)}</div>` : ""}
        <div class="section-header compliance-activity-header"><div><h2>活动</h2><p>客户档案最近动态</p></div></div>
        ${activity.length ? activity.map(group => `<div class="activity-group"><h4>${escapeHtml(group.key)}</h4>${group.items.map(entry => `<div class="activity-item"><i></i><div><strong>${escapeHtml(entry.title)}</strong><p>${escapeHtml(entry.detail)}</p><time>${escapeHtml(entry.role)} · ${escapeHtml(entry.time)}</time></div></div>`).join("")}</div>`).join("") : `<div class="empty-inline">暂无活动记录</div>`}
      </aside>
      </div></div>`;
  }

  function renderComplianceConclusionSection(item, submission = null) {
    const draft = state.complianceConclusionDraft || { decision: "", note: "" };
    const rejectItems = draft.rejectItems || [];
    const materialOptions = (submission?.items || []).map(entry => entry.category);
    const rejectSelected = draft.decision === "reject";
    const passSelected = draft.decision === "pass";
    const terminateSelected = draft.decision === "terminate";
    const needNote = rejectSelected || terminateSelected;
    const hint = !draft.decision ? "请先选择审核结论"
      : rejectSelected ? (draft.note.trim() ? "提交后案件退回交易员，补充后重新提交" : "驳回必须填写审核说明")
      : terminateSelected ? (draft.note.trim() ? "提交后本次准入终止，需重新发起新申请" : "终止必须填写审核说明")
      : "提交后客户准入通过，待KYC订单自动进入待客户入款";
    return `<footer class="compliance-review-actions compliance-conclusion">
      <div class="conclusion-title"><h3>审核结论</h3><p>选择结论并填写审核说明；说明会写入案件记录，驳回时为必填。</p></div>
      <div class="conclusion-options">
        <label class="conclusion-option ${passSelected ? "selected pass" : ""}"><input type="radio" name="compliance-conclusion" value="pass" ${passSelected ? "checked" : ""} /><span><strong>审核通过</strong><small>客户准入通过，待KYC订单自动推进</small></span></label>
        <label class="conclusion-option ${rejectSelected ? "selected reject" : ""}"><input type="radio" name="compliance-conclusion" value="reject" ${rejectSelected ? "checked" : ""} /><span><strong>驳回</strong><small>退回交易员，补充材料后重新提交</small></span></label>
        <label class="conclusion-option ${terminateSelected ? "selected terminate" : ""}"><input type="radio" name="compliance-conclusion" value="terminate" ${terminateSelected ? "checked" : ""} /><span><strong>终止</strong><small>明确拒绝本次业务准入，需重新发起新申请</small></span></label>
      </div>
      ${draft.decision === "reject" && materialOptions.length ? `<div class="conclusion-materials"><div class="conclusion-materials-head"><strong>选择需要退回的材料项</strong><span>可多选；勾选的材料会标记为「需补件」，交易员补充后重新提交</span></div>
      <div class="ms-select ${draft.rejectOpen ? "open" : ""}" id="conclusion-material-select">
        <div class="ms-control" id="conclusion-material-toggle" role="button" tabindex="0" aria-expanded="${!!draft.rejectOpen}">
          ${rejectItems.length ? rejectItems.map(category => `<span class="ms-tag">${escapeHtml(category)}<button type="button" data-conclusion-material-remove="${escapeHtml(category)}" aria-label="移除 ${escapeHtml(category)}">×</button></span>`).join("") : `<span class="ms-placeholder">点击选择材料项…</span>`}
          <i class="ms-caret" aria-hidden="true">⌄</i>
        </div>
        ${draft.rejectOpen ? `<div class="ms-menu">${materialOptions.map(category => `<button type="button" class="ms-option ${rejectItems.includes(category) ? "checked" : ""}" data-conclusion-material="${escapeHtml(category)}"><i class="ms-check" aria-hidden="true">${rejectItems.includes(category) ? "✓" : ""}</i><span>${escapeHtml(category)}</span></button>`).join("")}</div>` : ""}
      </div></div>` : ""}
      <label class="field conclusion-note"><span>审核说明${needNote ? ` <em class="conclusion-required">* ${terminateSelected ? "终止" : "驳回"}时必填</em>` : "（选填）"}</span><textarea id="compliance-conclusion-note" rows="3" placeholder="${rejectSelected ? "请填写驳回原因，例如缺少的材料或不一致的信息" : terminateSelected ? "请填写终止原因，例如命中风控规则或客户不符合准入条件" : "补充审核依据或备注，会写入案件记录"}">${escapeHtml(draft.note)}</textarea></label>
      <div class="conclusion-submit"><span class="field-hint" id="compliance-conclusion-hint">${hint}</span><button class="btn btn-primary" type="button" id="compliance-conclusion-submit" data-case-id="${item.id}" ${!draft.decision || (needNote && !draft.note.trim()) ? "disabled" : ""}>提交审核结论</button></div>
    </footer>`;
  }

  function submitComplianceConclusion(id) {
    const item = state.cases.find(entry => entry.id === id);
    if (!item || item.status !== "待合规审核") return;
    const { decision, note } = state.complianceConclusionDraft;
    const trimmed = (note || "").trim();
    if (!decision) return toast("请选择审核结论", "先选择「审核通过」「驳回」或「终止」再提交");
    if (["reject", "terminate"].includes(decision) && !trimmed) {
      toast(decision === "terminate" ? "终止需要填写说明" : "驳回需要填写说明", "请在审核说明中填写原因");
      $("#compliance-conclusion-note")?.focus();
      return;
    }
    const draftRejectItems = [...new Set(state.complianceConclusionDraft.rejectItems || [])];
    state.complianceConclusionDraft = { decision: "", note: "" };
    const customer = state.customers.find(entry => entry.id === item.customerId);
    const syncMaterialOrder = (status, stage, note, historyLabel) => {
      const materialOrder = state.materialOrders.find(order => order.customerId === item.customerId && ["待审核", "待补件"].includes(order.status));
      if (!materialOrder) return;
      Object.assign(materialOrder, { status, stage, updated: "刚刚", note });
      materialOrder.history.unshift(`刚刚 · ${historyLabel}`);
    };
    if (decision === "reject") {
      const rejectItems = draftRejectItems;
      item.note = rejectItems.length ? `${trimmed}（退回材料：${rejectItems.join("、")}）` : trimmed;
      if (customer && rejectItems.length) {
        (customer.materialSubmission?.items || []).forEach(entry => { if (rejectItems.includes(entry.category)) { entry.complianceDecision = "退回"; entry.opsDecision = "退回"; } });
        customer.documents = customer.documents || [];
        rejectItems.forEach(category => {
          const doc = customer.documents.find(entry => entry.name === category);
          if (doc) Object.assign(doc, { state: "需补件", tone: "red" });
          else customer.documents.unshift({ name: category, meta: "合规要求补件", state: "需补件", tone: "red" });
        });
      }
      syncMaterialOrder("待补件", "补件处理中", `合规驳回：${item.note}`, "合规审核驳回，等待交易员补充后重新提交");
      applyCaseTransition(item, "合规驳回", "合规审核驳回", item.note);
      return;
    }
    if (decision === "terminate") {
      item.note = trimmed;
      if (customer) customer.kycTerminated = { reason: trimmed, by: roles.compliance.name, time: nowDateTime() };
      syncMaterialOrder("审核拒绝", "合规结论", `合规终止本次准入：${trimmed}`, "合规审核终止，需重新发起新申请");
      applyCaseTransition(item, "已终止", "合规审核终止", trimmed, "合规终止");
      return;
    }
    if (customer) customer.kycTerminated = null;
    syncMaterialOrder("审核通过", "已完成", trimmed || "合规审核通过。", "合规审核通过");
    applyCaseTransition(item, "待提交银行", "合规审核通过", trimmed || "客户准入审核通过");
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
    return ["待提交银行", "合规驳回", "已终止"].includes(item.status) && /合规/.test(`${item.source} ${item.previous} ${item.result}`);
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
    if (item.status === "已终止" && /合规/.test(`${item.previous} ${item.result}`)) return "审核终止";
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

  function renderPendingComplianceCards(rows) {
    if (!rows.length) return `<div class="empty-state"><div><i>▦</i><h2>暂无待处理审核工单</h2><p>交易员或运营提交合规后，工单会以请求卡出现在这里。</p></div></div>`;
    return `<div class="request-card-list">${rows.map(item => {
      const customer = state.customers.find(c => c.id === item.customerId);
      return `<article class="request-card"><div class="request-card-main"><div class="request-card-title"><strong>${escapeHtml(item.customer)}</strong><span class="audit-type-badge">${escapeHtml(complianceAuditType(item))}</span><span class="status status-warning">待审核</span></div><span class="request-card-sub">${escapeHtml(complianceCustomerNo(item, customer))} · ${escapeHtml(item.type)} · ${escapeHtml(item.risk)}风险 · 提交 ${escapeHtml(complianceSubmittedAt(item, customer))}</span></div><div class="case-actions"><button class="btn btn-sm btn-primary" type="button" data-compliance-open-review="${item.id}">前往审核 →</button><button class="btn btn-sm" type="button" data-open-customer="${item.customerId}">客户详情</button></div></article>`;
    }).join("")}</div>`;
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
    const fileSummary = validFiles ? `${validFiles} 个文件已就绪` : "等待选择文件";
    const selectedScenario = state.kycConfig.scenarios.find(item => item.id === Number(upload.kycScenarioId)) || state.kycConfig.scenarios[0] || null;
    const channelIndex = Math.min(Number(upload.kycChannelIndex) || 0, Math.max((selectedScenario?.channels?.length || 1) - 1, 0));
    const selectedChannel = selectedScenario?.channels?.[channelIndex] || null;
    const hasQuickDraft = validFiles || upload.customerNo || upload.submitNote || upload.customerName || upload.customerChineseName || upload.customerEnglishName || upload.useLibrary || Number(upload.kycScenarioId) !== 1 || Number(upload.kycChannelIndex) !== 0;
    return `<div class="page material-upload-page material-upload-workbench">
      <div class="material-upload-workspace">
        <main class="quick-upload-main">
          <div class="material-upload-titlebar">
            <div><p class="eyebrow">BUSINESS ACCESS</p><h1>准入材料与合规单据上传</h1><p>按五步完成：选择客户 → 业务类型 → 渠道 → 客户信息 → 上传材料，右侧同步校验 KYC 清单。</p></div>
            <span class="status status-success">合规通道状态：双向通畅</span>
          </div>

          <div class="mu-steps">
            <section class="mu-step">
              <div class="mu-step-head"><i>1</i><h2>选择客户</h2><small>输入客户编号或名称，从下拉列表中选择</small>
                <span class="mu-step-aside">${customer ? `<span class="status status-${statusTone(customer.status)}">${escapeHtml(customer.status)}</span><button class="link-button" type="button" data-open-customer="${customer.id}">查看客户 →</button>` : upload.customerNo ? `<span class="status status-danger">未匹配到记录</span>` : `<button class="link-button" type="button" id="mu-create-customer">＋ 新建客户</button>`}</span>
              </div>
              <div class="mu-step-body">
                <div class="quick-customer-combobox mu-customer-field"><input id="quick-upload-customer" value="${escapeHtml(upload.customerNo)}" placeholder="输入客户编号如 20001 或公司名" autocomplete="off" aria-autocomplete="list" aria-expanded="${upload.customerDropdownOpen}" />${upload.customerDropdownOpen ? renderQuickCustomerDropdown(matchingCustomers, upload.customerHighlightIndex) : ""}</div>
              </div>
            </section>

            <section class="mu-step">
              <div class="mu-step-head"><i>2</i><h2>选择业务类型</h2><small>决定适用的 KYC 规则与材料清单</small></div>
              <div class="mu-step-body">
                <select id="quick-kyc-scenario" class="mu-select">${state.kycConfig.scenarios.map(item => `<option value="${item.id}" ${selectedScenario?.id === item.id ? "selected" : ""}>#${escapeHtml(item.code)} · ${escapeHtml(item.name)}</option>`).join("")}</select>
              </div>
            </section>

            <section class="mu-step">
              <div class="mu-step-head"><i>3</i><h2>选择渠道</h2><small>该业务类型绑定 ${selectedScenario?.channels?.length || 0} 个渠道</small></div>
              <div class="mu-step-body">
                <div class="quick-channel-options">${selectedScenario?.channels?.length ? selectedScenario.channels.map((channel, index) => `<button type="button" class="quick-channel-chip ${index === channelIndex ? "active" : ""}" data-quick-channel="${index}">${escapeHtml(channel.name)}</button>`).join("") : `<span class="quick-channel-empty">该业务类型暂无绑定渠道</span>`}</div>
              </div>
            </section>

            <section class="mu-step">
              <div class="mu-step-head"><i>4</i><h2>客户信息与业务说明</h2><small>选填，用于合规审核参考</small></div>
              <div class="mu-step-body">
                <div class="mu-field-grid">
                  <label class="field"><span>客户中文姓名</span><input id="quick-submit-cn-name" value="${escapeHtml(upload.customerChineseName || "")}" placeholder="例如 郑凯文" /></label>
                  <label class="field"><span>客户英文姓名</span><input id="quick-submit-en-name" value="${escapeHtml(upload.customerEnglishName || "")}" placeholder="例如 KAIVEN CHENG" /></label>
                  <label class="field"><span>业务说明 / 风险备注</span><input id="quick-submit-note" value="${escapeHtml(upload.submitNote || "")}" placeholder="填写本次材料说明或合规关注事项" /></label>
                </div>
              </div>
            </section>

            <section class="mu-step">
              <div class="mu-step-head"><i>5</i><h2>上传材料</h2><small>支持图片、PDF 和 Word，可拖拽</small>
                <span class="mu-step-aside"><strong class="quick-file-count">${fileSummary}</strong></span>
              </div>
              <div class="mu-step-body">
                <label class="quick-dropzone" id="quick-dropzone">
                  <input id="quick-upload-files" type="file" multiple accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx,image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
                  <span aria-hidden="true">⇧</span>
                  <strong>把文件拖拽到这里，或点击选择文件</strong>
                  <small>文件仅用于本地演示，不会上传服务器</small>
                </label>
                ${renderQuickMaterialLibrary(customer, upload)}
                ${upload.files.length ? `<div class="quick-file-list">${upload.files.map((file, index) => renderQuickUploadFile(file, index, selectedChannel)).join("")}</div>` : ""}
              </div>
            </section>
          </div>
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
    if (!scenario) return `<section class="quick-assistant-empty"><strong>KYC 规则与清单</strong><p>暂无可用业务类型配置。</p></section>`;
    const items = quickKycFlatItems(channel);
    const restrictions = channel?.restrictions || [];
    const itemReady = item => (upload.files || []).some(file => {
      const selectedCategory = file.mappedCategory || "";
      const detected = detectQuickMaterialType([file.name, file.category, file.libraryMeta].filter(Boolean).join(" "));
      return selectedCategory === item.name || Boolean(detected && (item.name.includes(detected) || item.subRequirement?.includes(detected)));
    });
    const readyCount = Math.min(items.filter(itemReady).length, items.length);
    const lines = quickProcessLines(scenario.processDescription);
    const keyLines = lines.slice(0, 3);
    const restLines = lines.slice(3);
    return `<section class="quick-assistant-panel">
      <header><div><span>KYC 规则与清单</span><strong>${escapeHtml(scenario.name)}</strong></div><em>#${escapeHtml(scenario.code)} · ${channel ? escapeHtml(channel.name) : "未绑定"} 渠道</em></header>
      <div class="quick-assistant-scroll">
        <article class="quick-rule-card flow"><div><strong>业务审核要点</strong><span>规范</span></div><ol>${keyLines.map(line => `<li>${escapeHtml(line)}</li>`).join("") || `<li>暂无流程说明。</li>`}</ol>${restLines.length ? `<details class="quick-flow-more"><summary>展开完整流程（共 ${lines.length} 步）</summary><ol start="4">${restLines.map(line => `<li>${escapeHtml(line)}</li>`).join("")}</ol></details>` : ""}</article>
        ${restrictions.length ? `<article class="quick-rule-card danger"><div><strong>${escapeHtml(channel.name)} 渠道限制提醒</strong><span>严格拦截</span></div>${restrictions.map(rule => `<p>${escapeHtml(rule.content)}</p>`).join("")}</article>` : ""}
        <article class="quick-rule-list"><header><strong>材料完整度动态核验</strong><span class="${items.length && readyCount >= items.length ? "quick-progress-done" : ""}">${readyCount}/${items.length}</span></header>
        <div class="quick-check-progress"><i style="width:${items.length ? Math.round(readyCount / items.length * 100) : 0}%"></i></div>
        <div>${items.map((item, index) => renderQuickAssistantRequirement(item, index, itemReady(item))).join("") || `<div class="material-empty-inline">当前渠道暂无材料要求</div>`}</div></article>
      </div>
    </section>`;
  }

  function renderQuickAssistantRequirement(item, index, ready = false) {
    const typeLabel = item.type === "bank_account" ? "字段" : item.type === "text" ? "文本" : "文件";
    return `<div class="quick-rule-item slim ${ready ? "ready" : ""}"><i class="quick-check-dot" aria-hidden="true">${ready ? "✓" : ""}</i><div class="quick-rule-item-body"><div><strong>${index + 1}. ${escapeHtml(item.name)}</strong><em class="${item.required ? "" : "optional"}">${ready ? "已就绪" : item.required ? "必须" : "选填"}</em></div><p>${escapeHtml(item.subRequirement || "按渠道要求提交清晰完整资料。")}</p><small>${typeLabel}${item.validity && item.validity !== "none" ? ` · ${item.validity === "1m" ? "1个月内有效" : "3个月内有效"}` : ""}</small></div></div>`;
  }

  function quickKycFlatItems(channel) {
    return (channel?.sections || []).flatMap(section => section.items || []);
  }

  const quickLibraryPreviewFallback = "assets/trustpass-stage1-template.pdf";

  function quickMaterialLibraryItems(customer) {
    if (!customer) return [];
    const target = customer.uploadTarget || customer;
    return (target.documents || []).map((doc, index) => {
      const name = doc.name || doc.category || doc.fileName || `历史材料 ${index + 1}`;
      const meta = doc.meta || doc.flowLabel || doc.category || "客户材料库";
      return {
        libraryKey: `${target.id || customer.id}-${index}-${name}`,
        name,
        meta,
        state: doc.state || doc.opsDecision || "已归档",
        tone: doc.tone || "teal",
        url: doc.url || doc.fileUrl || doc.versions?.[0]?.url || quickLibraryPreviewFallback,
        uploadedAt: doc.uploadedAt || doc.versions?.[0]?.time || "历史归档",
        mappedCategory: doc.category || name
      };
    });
  }

  function renderQuickMaterialLibrary(customer, upload) {
    const libraryItems = quickMaterialLibraryItems(customer);
    const addedKeys = new Set((upload.files || []).filter(file => file.source === "library").map(file => file.libraryKey));
    const selectedCount = addedKeys.size;
    const panelHint = customer ? (selectedCount ? `已复用 ${selectedCount} 份，可在下方调整关联材料项。` : `从 ${customer.name} 的历史材料中复用，加入后可预览、删除并关联当前 KYC 材料项。`) : "先选择客户后可查看材料库。";
    return `<section class="quick-library-panel ${upload.useLibrary ? "open" : ""}">
      <button class="quick-library-toggle" type="button" data-quick-library-toggle aria-expanded="${upload.useLibrary}" ${customer ? "" : "disabled"}>
        <span><i aria-hidden="true">▦</i><b><strong>客户材料库</strong><small>${escapeHtml(panelHint)}</small></b></span>
        <em>${customer ? `${selectedCount ? `已选 ${selectedCount} · ` : ""}${libraryItems.length} 份可选` : "未选择客户"}</em>
        <strong class="quick-library-toggle-action">${upload.useLibrary ? "收起材料库" : "从材料库添加"}</strong>
      </button>
      ${upload.useLibrary ? `<div class="quick-library-list">
        ${customer ? (libraryItems.length ? libraryItems.map(item => `<article class="quick-library-row">
          <span class="doc-icon">${escapeHtml((item.name.split(".").pop() || "DOC").slice(0, 4).toUpperCase())}</span>
          <div><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.meta)} · 上传时间：${escapeHtml(item.uploadedAt)}</small></div>
          <span class="status status-${escapeHtml(item.tone)}">${escapeHtml(item.state)}</span>
          <button class="btn btn-sm" type="button" data-quick-library-add="${escapeHtml(item.libraryKey)}" ${addedKeys.has(item.libraryKey) ? "disabled" : ""}>${addedKeys.has(item.libraryKey) ? "已添加" : "添加"}</button>
        </article>`).join("") : `<div class="material-empty-inline">该客户材料库暂无可复用材料。</div>`) : `<div class="material-empty-inline">请选择客户后再从材料库添加。</div>`}
      </div>` : ""}
    </section>`;
  }

  function quickLibraryFileFromItem(item) {
    return {
      id: `LIB-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      source: "library",
      libraryKey: item.libraryKey,
      name: item.name,
      size: 0,
      type: "客户材料库",
      url: item.url || quickLibraryPreviewFallback,
      addedAt: "刚刚",
      libraryMeta: item.meta,
      libraryState: item.state,
      uploadedAt: item.uploadedAt,
      mappedCategory: item.mappedCategory || ""
    };
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
      return `<div class="quick-customer-hit compact ${intermediary ? "intermediary" : ""}">
        <div class="cell-primary"><span class="avatar ${intermediary ? "company" : ""}">${customerInitials(customer)}</span><span class="quick-hit-line"><strong>${escapeHtml(customer.name)}</strong><em class="quick-no-chip">${customerNo(customer)}</em><small>${customerKind(customer)} · ${customer.agent}</small></span></div>
        <div class="quick-match-meta"><span class="status status-${statusTone(customer.status)}">${customer.status}</span><button class="link-button" type="button" data-open-customer="${customer.id}">查看 →</button></div>
      </div>`;
    }
    if (upload.customerNo) return `<div class="quick-customer-empty compact error"><strong>未匹配到记录</strong><span>· 请检查客户编号或名称</span></div>`;
    return `<div class="quick-customer-empty compact"><strong>等待客户匹配</strong><span>· 输入编号或名称后自动匹配</span></div>`;
  }


  function renderQuickUploadFile(file, index, channel = null) {
    const ext = file.name.split(".").pop()?.toUpperCase() || (file.source === "library" ? "LIB" : "FILE");
    const detected = detectQuickMaterialType([file.name, file.libraryMeta].filter(Boolean).join(" "));
    const sourceLabel = file.source === "library" ? "材料库" : "本地上传";
    const meta = file.source === "library" ? `${escapeHtml(file.libraryMeta || "客户材料库")} · 上传时间：${escapeHtml(file.uploadedAt || "历史归档")} · ${detected}` : `${formatFileSize(file.size)} · ${escapeHtml(file.type || "已知文件格式")} · ${detected}`;
    return `<article class="quick-file-row ${file.source === "library" ? "from-library" : ""}"><span class="doc-icon">${ext.slice(0, 4)}</span><div><strong>${escapeHtml(file.name)}</strong><small>${meta}</small><em class="quick-file-source ${file.source === "library" ? "library" : ""}">${sourceLabel}</em></div>${file.url ? `<button class="btn btn-sm quick-file-preview" type="button" data-pdf-preview="${file.url}" data-pdf-name="${escapeHtml(file.name)}">预览</button>` : `<span></span>`}<select data-quick-file-category="${index}" aria-label="关联材料类型">${quickMaterialCategoryOptions(channel, file.mappedCategory || "")}</select><button class="icon-button" type="button" data-quick-file-remove="${index}" aria-label="移除文件">×</button></article>`;
  }

  function renderMaterialCustomerPicker() {
    const orders = state.materialOrders;
    const draftCount = orders.filter(order => order.status === "草稿").length;
    const supplementCount = orders.filter(order => order.status === "待补件").length;
    const reviewCount = orders.filter(order => order.status === "待审核").length;
    return `<div class="page">${pageHeader("REVIEW WORK ORDERS", "材料与补件", "管理已经发起的客户审核工单、材料草稿和指定补件。")}
      <div class="material-picker-summary four"><div><strong>${orders.length}</strong><span>进行中与历史工单</span></div><div><strong>${draftCount}</strong><span>草稿待提交</span></div><div><strong>${supplementCount}</strong><span>待处理补件</span></div><div><strong>${reviewCount}</strong><span>待合规审核</span></div></div>
      <div class="toolbar"><label class="search-control">⌕<input id="material-order-search" placeholder="搜索工单号、客户名称或编号" /></label><select class="select-control" id="material-order-filter"><option>全部状态</option><option>草稿</option><option>待审核</option><option>待补件</option><option>审核拒绝</option><option>审核通过</option><option>已过期</option><option>已暂停</option><option>已取消</option></select><span class="toolbar-count">${orders.length} 个工单</span></div>
      <div class="material-order-table"><div class="material-order-head"><span>客户</span><span>当前状态</span><span>材料完整度</span><span>最后更新</span><span>操作</span></div>${orders.map(order => materialOrderRow(order)).join("")}</div></div>`;
  }

  const materialStatusFlow = {
    "草稿": { desc: "草稿已保存，还未提交审核", action: "继续提交", type: "continue" },
    "待审核": { desc: "材料已提交，等待合规官审核", action: "查看详情", type: "detail" },
    "待补件": { desc: "合规要求补充/修改材料，需重新上传", action: "处理补件", type: "continue", cancellable: true },
    "审核拒绝": { desc: "合规明确拒绝该业务准入", action: "重新提交", type: "continue" },
    "审核通过": { desc: "合规审核已通过", action: "查看详情", type: "detail" },
    "已过期": { desc: "曾经通过，有效期过期，需重新提交", action: "重新提交", type: "continue" },
    "已暂停": { desc: "风控或人工暂停该业务准入", action: "查看详情", type: "detail" },
    "已取消": { desc: "申请已取消或作废", action: "重新提交", type: "continue" }
  };

  function cancelMaterialOrder(orderId) {
    const order = state.materialOrders.find(item => item.id === orderId);
    if (!order || order.status !== "待补件") return;
    showConfirm(`取消工单 ${order.id}？`, "长时间未补件或客户放弃时可取消申请；取消后进入已取消，可重新发起新申请。", "取消原因", "客户放弃本次申请", "确认取消", note => {
      order.status = "已取消";
      order.stage = "已作废";
      order.updated = "刚刚";
      order.note = note || "交易员手动取消申请。";
      order.history.unshift("刚刚 · 交易员取消申请");
      render();
      toast("工单已取消", `${order.id} 已作废，可重新发起申请`);
    });
  }

  function materialOrderRow(order) {
    const customer = state.customers.find(item => item.id === order.customerId);
    if (!customer) return "";
    const flow = materialStatusFlow[order.status] || { desc: order.stage, action: "查看详情", type: "detail" };
    const action = flow.action;
    const actionType = flow.type;
    const displayClientNo = customer.clientNo || "无编号";
    return `<article class="material-order-row" data-order-search="${escapeHtml(`${order.id} ${customer.name} ${displayClientNo} ${customer.id} ${order.status}`)}"><div class="cell-primary"><span class="avatar ${customer.type === "企业" ? "company" : ""}">${customerInitials(customer)}</span><span><strong>${customer.name}</strong><small>${escapeHtml(displayClientNo)} · ${customer.type === "企业" ? "企业 KYB" : "个人 KYC"}</small></span></div><div><span class="status status-${statusTone(order.status)}">${order.status}</span><small>${escapeHtml(flow.desc)}</small></div><div><strong>${order.completeness}</strong><small>当前有效材料</small></div><div><strong>${order.updated}</strong><small>最后更新</small></div><div class="material-order-actions">${(() => {
      const restart = action === "重新提交";
      const primaryBtn = `<button class="material-action-link ${actionType === "continue" ? "primary" : ""}" type="button" data-material-order="${order.id}" data-order-action="${actionType}">${restart ? `<i class="mal-icon" aria-hidden="true">⟳</i>` : ""}${action}${restart ? "" : `<i class="mal-chevron" aria-hidden="true">›</i>`}</button>`;
      const secondaryBtn = flow.cancellable
        ? `<button class="material-action-link secondary" type="button" data-material-cancel="${order.id}">取消</button>`
        : restart ? `<button class="material-action-link secondary" type="button" data-material-record="${order.id}">记录</button>` : "";
      return `${primaryBtn}${secondaryBtn ? `<i class="material-action-divider" aria-hidden="true"></i>${secondaryBtn}` : ""}`;
    })()}</div></article>`;
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
          <footer class="supplement-submit"><span class="field-hint">${!uploads.length ? "请先上传至少 1 份补件文件" : allMatched ? "提交后工单返回合规复核" : "还有文件未选择匹配材料项"}</span><button class="btn btn-primary" type="button" id="supplement-submit" ${allMatched ? "" : "disabled"}>提交补件材料</button></footer>
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
    order.status = "待审核";
    order.stage = "补件复核";
    order.updated = "刚刚";
    order.note = `交易员已补交 ${categories.join("、")}，重新进入合规审核。`;
    order.history.unshift("刚刚 · 交易员提交补件材料");
    flow.mode = "list";
    flow.supplementUploads = [];
    const relatedCase = supplementRelatedCase(order);
    if (relatedCase) {
      applyCaseTransition(relatedCase, "待合规审核", "补件已提交", detail);
      return;
    }
    customer.timeline.unshift({ title: "补件已提交", detail, role: `交易员 ${customer.agent}`, time: "刚刚" });
    persistCustomers();
    render();
    toast("补件材料已提交", `${order.id} 已返回合规复核`);
  }

  function renderMaterialWorkspace() {
    const flow = state.materialFlow;
    const customer = state.customers.find(item => item.id === flow.customerId);
    if (!customer) { flow.mode = "list"; return renderMaterialCustomerPicker(); }
    const rejectCase = state.cases.find(item => item.customerId === customer.id && ["合规驳回", "待客户补件"].includes(item.status));
    const rejectDocs = customer.documents.filter(doc => doc.state === "需补件").map(doc => doc.name);
    const rejected = customer.status === "合规驳回" || rejectCase || rejectDocs.length;
    return `<div class="page material-page">${pageHeader("APPLICATION WORKSPACE", `${customer.name} · 发起申报`, `${flow.applicationId} · ${customer.type === "企业" ? "企业 KYB" : "个人 KYC"} · 草稿自动保存在当前浏览器`, `<button class="btn" id="material-back-list">← 返回客户列表</button>`)}
      ${rejected ? `<section class="supplement-reject-card material-reject-card"><header><span class="status status-${statusTone(rejectCase?.status || "合规驳回")}">${escapeHtml(rejectCase?.status || "合规驳回")}</span><strong>驳回说明</strong><small>${escapeHtml(rejectCase?.source || "合规退回")} · ${escapeHtml(rejectCase?.entered || customer.updated || "")}</small></header><p>${escapeHtml(rejectCase?.note || "材料被退回，请根据驳回意见补充后重新提交。")}</p>${rejectDocs.length ? `<div class="supplement-target-row"><span>需重新提交材料项</span>${rejectDocs.map(name => `<em>${escapeHtml(name)}</em>`).join("")}</div>` : ""}</section>` : ""}
      <div class="material-work-layout"><main class="material-work-main">${renderMaterialStep(customer, flow)}</main><aside class="material-work-aside">${renderMaterialAside(customer, flow)}</aside></div></div>`;
  }

  function renderMaterialStep(customer, flow) {
    if (flow.step === 1) return `<section class="material-stage"><div class="stage-kicker">STEP 01</div><h2>开始一项客户申报</h2><p>本流程将根据客户类型生成材料要求，材料上传完成后直接提交合规审核。</p><div class="material-intro-grid"><div><span>客户</span><strong>${customer.name}</strong><small>${customer.id}</small></div><div><span>申报类型</span><strong>${customer.type === "企业" ? "企业 KYB" : "个人 KYC"}</strong><small>根据客户主档自动选择</small></div><div><span>处理责任</span><strong>交易员 ${customer.agent}</strong><small>提交后转交合规</small></div></div><label class="material-consent"><input id="material-authorized" type="checkbox" ${flow.authorized ? "checked" : ""} /><span><strong>我已获得客户授权</strong><small>确认可为该客户提交材料，并允许系统生成申请表。</small></span></label>${materialStageFooter(1, !flow.authorized)}</section>`;
    if (flow.step === 2) return `<section class="material-stage"><div class="stage-kicker">STEP 02</div><h2>客户与业务</h2><p>客户主档只作为预填依据，本次申报会形成独立申请版本。</p><div class="field-grid"><label class="field"><span>客户类型</span><input value="${customer.type === "企业" ? "企业 KYB" : "个人 KYC"}" disabled /></label><label class="field"><span>所属 交易员</span><input value="${customer.agent} · A-018" disabled /></label><label class="field"><span>交易类型</span><select data-material-field="businessType">${state.kycConfig.scenarios.map(scenario => `<option ${flow.form.businessType === scenario.name ? "selected" : ""}>${escapeHtml(scenario.name)}</option>`).join("")}</select></label><label class="field"><span>预计月度业务量</span><input data-material-field="expectedVolume" value="${escapeHtml(flow.form.expectedVolume || "HKD 800,000")}" /></label><label class="field full"><span>业务说明</span><textarea data-material-field="businessPurpose">${escapeHtml(flow.form.businessPurpose || "客户申请跨境资金结算服务")}</textarea></label></div>${materialStageFooter(2)}</section>`;
    if (flow.step === 3) return renderMaterialUploadStep(customer, flow);
    return renderMaterialConfirmStep(customer, flow);
  }

  function materialStageFooter(step, disabled = false) {
    return `<footer class="material-stage-footer"><button class="btn" type="button" data-material-prev ${step === 1 ? "disabled" : ""}>← 上一步</button><button class="btn btn-primary" type="button" data-material-next ${disabled ? "disabled" : ""}>继续 →</button></footer>`;
  }

  function renderMaterialUploadStep(customer, flow) {
    const uploaded = flow.files.filter(item => item.name).length;
    const items = flow.files.map((item, index) => `<article class="material-item ${item.name ? "uploaded" : ""}"><div class="material-item-copy"><span class="doc-icon">${item.name ? (item.type.includes("pdf") ? "PDF" : "IMG") : String(index + 1).padStart(2, "0")}</span><div><strong>${item.category}${item.required ? " *" : ""}</strong><small>${item.description}</small>${item.name ? `<p>${escapeHtml(item.name)} · ${formatFileSize(item.size)}</p>` : ""}</div></div><div class="material-item-actions">${item.url ? `<a class="btn btn-sm" href="${item.url}" target="_blank" rel="noopener">预览</a>` : ""}<label class="btn btn-sm btn-primary">${item.name ? "替换" : "上传"}<input class="material-item-input" data-material-item="${index}" type="file" accept=".jpg,.jpeg,.png,.pdf" /></label>${item.name ? `<button class="icon-button" data-material-remove="${index}" type="button" aria-label="移除">×</button>` : ""}</div></article>`).join("");
    return `<section class="material-stage"><div class="stage-kicker">STEP 03</div><h2>按材料项上传客户文件</h2><p>每份文件绑定明确材料项，合规会按相同目录预览、下载和审核。支持 JPG、PNG、PDF。</p><div class="material-demo-row"><span>已上传 ${uploaded} / ${flow.files.length} 项</span><button class="link-button" id="material-demo-files" type="button">载入完整演示材料</button></div><div class="material-item-list">${items}</div><footer class="material-stage-footer"><button class="btn" type="button" data-material-prev>← 上一步</button><button class="btn btn-primary" id="material-upload-continue" type="button" ${uploaded ? "" : "disabled"}>进入提交确认 →</button></footer></section>`;
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
    return `<section class="material-stage"><div class="stage-kicker">STEP 04</div><h2>确认材料并提交合规</h2><p>本流程不生成申请表，合规将直接按材料目录审核；如被驳回，驳回说明会返回本工作台。</p><div class="confirm-summary"><section><h3>申报信息</h3><div><span>客户</span><strong>${escapeHtml(customer.name)}</strong></div><div><span>申报类型</span><strong>${customer.type === "企业" ? "企业 KYB" : "个人 KYC"}</strong></div><div><span>交易类型</span><strong>${escapeHtml(flow.form.businessType || "—")}</strong></div><div><span>预计月度业务量</span><strong>${escapeHtml(flow.form.expectedVolume || "未登记")}</strong></div></section><section><h3>材料目录</h3>${flow.files.filter(file => file.name).map(file => `<div><span>${file.category}</span><strong>${escapeHtml(file.name)}</strong></div>`).join("")}</section></div><label class="material-consent"><input id="material-confirmed" type="checkbox" ${flow.confirmed ? "checked" : ""} /><span><strong>我已核对资料、业务选项与材料目录</strong><small>确认后材料将直接提交合规审核。</small></span></label><div class="pdf-action-bar"><button class="btn" type="button" data-material-prev>← 返回修改</button><button class="btn btn-primary" id="material-submit-ops" ${flow.confirmed && !flow.submitted ? "" : "disabled"}>${flow.submitted ? "已提交合规审核" : "提交合规审核"}</button></div></section>`;
  }

  function renderPdfResult(customer, flow, latest) {
    return `<div class="pdf-result"><header><div><span class="status status-success">未签署申请表已生成</span><h3>${latest.filename}</h3><p>TP 原始模板 · ${latest.version} · ${latest.generatedAt} · ${(latest.size / 1024).toFixed(0)} KB</p></div><div class="case-actions"><button class="btn" type="button" data-pdf-preview="${latest.url}" data-pdf-name="${escapeHtml(latest.filename)}">弹窗预览</button><a class="btn btn-primary" href="${latest.url}" download="${latest.filename}">下载交客户签名</a></div></header><section class="signature-return"><div><h3>回传客户签署版</h3><p>签署版将作为独立材料项留档，运营与合规均可查看。</p></div>${flow.signedPdf ? `<span class="status status-success">${escapeHtml(flow.signedPdf.name)} 已回传</span>` : ""}<label class="btn btn-primary">${flow.signedPdf ? "替换签署版" : "上传签署版"}<input id="signed-pdf-input" type="file" accept="application/pdf,.pdf" /></label></section><footer><div><strong>版本记录</strong><span>${flow.pdfVersions.map(item => `${item.version} · ${item.generatedAt}`).join("　")}</span></div><button class="btn btn-primary" id="material-submit-ops" ${flow.submitted || !flow.signedPdf ? "disabled" : ""}>${flow.submitted ? "已提交运营" : "提交运营审核"} →</button></footer></div>`;
  }

  function renderMaterialAside(customer, flow) {
    const required = materialCategories(customer).slice(0, customer.type === "企业" ? 4 : 3);
    return `<section class="section material-aside-panel"><div class="section-header"><div><h2>申报概览</h2><p>${flow.applicationId}</p></div><span class="status status-${flow.submitted ? "success" : "warning"}">${flow.submitted ? "待合规审核" : "草稿"}</span></div><div class="material-aside-body"><div class="aside-progress"><span>流程进度</span><strong>${Math.round(((flow.step - 1) / 3) * 100)}%</strong><div class="progress-track"><i style="width:${Math.round(((flow.step - 1) / 3) * 100)}%"></i></div></div><h3>必要材料</h3>${required.map(category => { const hit = flow.files.find(file => file.category === category && file.name); return `<div class="required-doc"><i>${hit ? "✓" : ""}</i><span><strong>${category}</strong><small>${hit ? hit.name : "尚未上传"}</small></span></div>`; }).join("")}<h3>审核说明</h3><p class="aside-note">材料提交后直接进入合规审核，不再生成申请表；如被合规驳回，驳回说明会显示在本工作台顶部。</p></div></section>`;
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

  function dispatchTemplateText(order, channel, vaAccount) {
    if (!order) return "";
    const customer = state.customers.find(item => item.id === order.customerId);
    return composeDispatchText({
      channel,
      orderTitle: `補單:${order.clientNo} ${order.tradeType}`,
      rawText: "（在此粘贴客户提供的收款账户资料，或直接编辑）",
      amount: order.buyAmount,
      currency: order.buyCurrency,
      payoutAccount: channel === "SGB" && customer ? `${(customer.enName || customer.name).toUpperCase()} SGB VA` : "pobo cq開-開",
      vaAccount
    });
  }

  function copyToClipboard(value, label = "内容") {
    const done = () => toast("已复制", `${label} 已复制到剪贴板`);
    const fallback = () => {
      const holder = document.createElement("textarea");
      holder.value = value;
      document.body.appendChild(holder);
      holder.select();
      try { document.execCommand("copy"); done(); } catch { toast("复制失败", "请手动选中后复制"); }
      holder.remove();
    };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(value).then(done).catch(fallback);
    else fallback();
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

  function dispatchPendingOrders() { return state.tradeOrders.filter(order => order.status === "待出款排单"); }

  function dispatchRows() {
    const pending = dispatchPendingOrders().map(order => ({ key: `pending-${order.id}`, order, dispatch: null, status: "待排单" }));
    const inFlight = state.payoutOrders.map(dispatch => ({ key: dispatch.id, order: dispatch.orderId ? findOrder(dispatch.orderId) : null, dispatch, status: dispatch.status }));
    const rank = { "待排单": 0, "出款审核中": 1, "待出款": 2, "已出款": 3 };
    return [...pending, ...inFlight].sort((a, b) => (rank[a.status] ?? 9) - (rank[b.status] ?? 9));
  }

  function dispatchStatusHint(row) {
    if (row.status === "待排单") return "收款已确认 · 等待发起排单";
    if (row.status === "出款审核中") return `已提交 ${row.dispatch?.submittedAt || ""} · 等待高级交易员审核`;
    if (row.status === "待出款") return `审核通过 ${row.dispatch?.reviewedAt || ""} · 等待出款员出款`;
    if (row.status === "已出款") return `${row.dispatch?.paidAt || ""} 出款完成`;
    return "";
  }

  function dispatchRowAction(row) {
    if (row.status === "待排单") return `<button class="payout-action blue" type="button" data-dispatch-open="${row.order.id}">发起排单</button><small>粘贴收款资料生成文案</small>`;
    const viewId = row.dispatch?.id || "";
    if (row.status === "出款审核中") return `<button class="btn btn-sm" type="button" data-dispatch-view="${viewId}">查看排单</button><small>等待高级交易员审核</small>`;
    if (row.status === "待出款") return `<button class="btn btn-sm" type="button" data-dispatch-view="${viewId}">查看排单</button><small>等待出款员出款</small>`;
    return `<button class="btn btn-sm" type="button" data-dispatch-view="${viewId}">查看排单</button><small>已出款 · ${escapeHtml(row.dispatch?.paidAt || "")}</small>`;
  }

  function renderPayoutDispatchCenter() {
    if (state.role !== "agent") return `<div class="page">${pageHeader("SCHEDULE CENTER", "排单中心", "当前角色不能处理排单。")}<div class="empty-state"><div><i>锁</i><h2>无处理权限</h2><p>请切换至初级交易员视角查看待排单订单。</p></div></div></div>`;
    const rows = dispatchRows();
    const keyword = String(state.dispatchSearch || "").trim().toLowerCase();
    const filtered = keyword ? rows.filter(row => `${row.order?.id || ""} ${row.dispatch?.id || ""} ${row.order?.customerName || row.dispatch?.customerName || ""} ${row.order?.clientNo || row.dispatch?.clientNo || ""} ${row.order?.tradeType || ""}`.toLowerCase().includes(keyword)) : rows;
    const count = status => rows.filter(row => row.status === status).length;
    return `<div class="page payout-workbench">
      ${pageHeader("SCHEDULE CENTER", "排单中心", "订单收款确认后自动进入待排单队列；完成排单进入出款审核，高级交易员通过后转为待出款。", `<button class="btn btn-primary" id="dispatch-new" type="button">＋ 新增排单</button>`)}
      ${payoutMetricGrid([
        payoutMetric("待排单订单", String(count("待排单")), "笔", "", "当前队列", "收款确认后自动进入"),
        payoutMetric("出款审核中", String(count("出款审核中")), "笔", "blue", "已完成排单", "等待高级交易员复核"),
        payoutMetric("待出款", String(count("待出款")), "笔", "orange", "审核已通过", "等待出款员执行打款"),
        payoutMetric("已出款", String(count("已出款")), "笔", "green", "流程完成", "水单归档后订单完成")
      ])}
      <section class="payout-queue-card">
        <header class="payout-queue-head"><div><i class="payout-head-icon blue">≣</i><div><h2>排单队列（订单维度）</h2><p>每一行对应一笔交易订单，排单、审核与出款都挂在订单编号下。</p></div></div><label class="payout-search"><input id="dispatch-search" placeholder="搜索订单号 / 客户 / 类型..." value="${escapeHtml(state.dispatchSearch || "")}" /></label></header>
        <div class="payout-grid payout-grid-dispatch payout-grid-head"><span>订单编号</span><span>客户</span><span>交易类型</span><span>应付出款金额</span><span>排单状态</span><span>排单处理</span></div>
        ${filtered.length ? filtered.map(row => {
          const order = row.order;
          const dispatch = row.dispatch;
          const customerName = order?.customerName || dispatch?.customerName || "";
          const clientNo = order?.clientNo || dispatch?.clientNo || "";
          const amountText = order ? moneyPair(order.buyCurrency, order.buyAmount) : dispatch ? `${dispatch.currency} ${dispatch.amount}` : "—";
          return `<article class="payout-grid payout-grid-dispatch payout-row">
          <div class="payout-primary">${order ? `<button class="link-button mono order-link" type="button" data-order-open="${order.id}">${order.id}</button>` : `<strong class="mono">${dispatch?.id || "—"}</strong>`}<small>${dispatch ? `排单 ${dispatch.id}` : "尚未排单"}</small></div>
          <div><strong>${escapeHtml(customerName)}</strong><small>${escapeHtml(clientNo)} · ${escapeHtml(order?.personName || dispatch?.personName || "")}</small></div>
          <div><strong>${escapeHtml(order?.tradeType || dispatch?.orderTitle || "—")}</strong>${order ? `<small>卖出 ${moneyPair(order.sellCurrency, order.sellAmount)}</small>` : ""}</div>
          <div class="payout-amount"><strong>${escapeHtml(amountText)}</strong>${dispatch ? `<small>${escapeHtml(dispatch.channel)} 通道</small>` : `<small>渠道待排单确定</small>`}</div>
          <div><span class="status status-${statusTone(row.status)}">${row.status}</span><small>${escapeHtml(dispatchStatusHint(row))}</small></div>
          <div class="payout-action-cell">${dispatchRowAction(row)}</div>
        </article>`; }).join("") : `<div class="empty-state dispatch-empty"><div><i>≣</i><h2>暂无排单队列</h2><p>${keyword ? "没有匹配的订单，试试其他关键词。" : "订单收款确认后会自动出现在这里。"}</p></div></div>`}
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
          <div class="payout-primary"><strong class="mono">${order.id}</strong>${order.orderId ? `<button class="link-button" type="button" data-order-open="${order.orderId}">订单 ${order.orderId} →</button>` : ""}<small>${escapeHtml(order.orderTitle || "")} · ${escapeHtml(order.submittedAt || "")}</small></div>
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
      <section class="payout-queue-card">
        <header class="payout-queue-head"><div><i class="payout-head-icon green">▣</i><div><h2>审核通过待出款：外部系统出款与标记回传</h2><p>提取账户要素，完成网银打款后标记已出款并上传水单；已完成的记录在「出款记录」查看。</p></div></div></header>
        <div class="payout-grid payout-grid-operations payout-grid-head"><span>排单 / 订单</span><span>出款金额 / 客户</span><span>收款账户</span><span>审核员意见</span><span>执行打款</span></div>
        ${queue.length ? queue.map(order => `<article class="payout-grid payout-grid-operations payout-row">
          <div class="payout-primary"><strong class="mono">${order.id}</strong>${order.orderId ? `<button class="link-button" type="button" data-order-open="${order.orderId}">订单 ${order.orderId} →</button>` : ""}<span class="payout-route ${order.channel === "SGB" ? "sgb" : "sino"}">通道：${escapeHtml(order.channel)}</span><small>${escapeHtml(order.orderTitle || "")}${order.expectedDate ? ` · 期望出款 ${escapeHtml(order.expectedDate)}` : ""}</small></div>
          <div class="payout-amount"><strong class="payout-green-text">${escapeHtml(`${order.currency} ${order.amount}`)}</strong><small>${escapeHtml(order.customerName)} · ${escapeHtml(order.clientNo)}</small></div>
          <div><strong>${escapeHtml(order.payee)}</strong><small>${escapeHtml(order.payeeBank || "見排单文案")}</small><button class="link-button" type="button" data-dispatch-view="${order.id}">查看排单文案 →</button></div>
          <div><span class="payout-check large">出款审核通过</span><small class="payout-note">审核员：${escapeHtml(order.reviewedBy || "")} · ${escapeHtml(order.reviewedAt || "")}</small></div>
          <div class="payout-action-cell"><button class="payout-action green" type="button" data-dispatch-paid="${order.id}">标记已出款</button><small>提交水单后订单完成</small></div>
        </article>`).join("") : `<div class="empty-state dispatch-empty"><div><i>▣</i><h2>暂无待出款排单</h2><p>高级交易员审核通过后会出现在这里。</p></div></div>`}
      </section>
    </div>`;
  }

  function renderDispatchModal() {
    const root = $("#dispatch-modal-root");
    if (!root) return;
    if (!state.dispatchModal) {
      if (state.dispatchReviewModal) { renderDispatchReviewModal(root); return; }
      if (state.fundingModal) { renderFundingModal(root); return; }
      if (state.paymentModal) { renderPaymentModal(root); return; }
      if (state.orderModal) { renderOrderModal(root); return; }
      if (state.payoutReceiptModal) { renderPayoutReceiptModal(root); return; }
      if (state.dispatchViewOrder) { renderDispatchViewModal(root); return; }
      const hadModal = root.innerHTML.trim();
      root.innerHTML = "";
      if (hadModal && !$("#customer-modal-root")?.innerHTML && !$("#pdf-modal-root")?.innerHTML && !$("#material-order-modal-root")?.innerHTML) document.body.classList.remove("modal-open");
      return;
    }
    const modal = state.dispatchModal;
    const candidates = dispatchPendingOrders();
    const selectedOrder = findOrder(modal.orderId);
    const selected = selectedOrder ? state.customers.find(customer => customer.id === selectedOrder.customerId) : null;
    const vaAccounts = dispatchVaAccountsForCustomer(selected);
    root.innerHTML = `<div class="review-launch-backdrop" id="dispatch-backdrop"><section class="schedule-template-dialog dispatch-dialog" role="dialog" aria-modal="true" aria-labelledby="dispatch-modal-title">
      <header><div><span>NEW DISPATCH</span><h2 id="dispatch-modal-title">新增排单</h2><p>直接在左侧粘贴或编辑排单文案，提交后按此文案进入排单审核；右侧是该客户的 VA 账户，可快速复制。</p></div><button class="icon-button" id="dispatch-modal-close" aria-label="关闭" type="button">×</button></header>
      <form class="schedule-template-editor" id="dispatch-form">
        <div class="dispatch-topbar">
          <label class="field dispatch-order-field"><span>交易订单（仅显示待排单订单）</span><select id="dispatch-order">${candidates.length ? candidates.map(order => `<option value="${order.id}" ${order.id === modal.orderId ? "selected" : ""}>${escapeHtml(`${order.id} · ${order.customerName} · 应付 ${moneyPair(order.buyCurrency, order.buyAmount)}`)}</option>`).join("") : `<option value="">暂无待排单订单</option>`}</select></label>
          <div class="dispatch-topbar-right"><span class="dispatch-field-label">出款通道</span><div class="quick-channel-options">${["SINO", "SGB"].map(channel => `<button type="button" class="quick-channel-chip ${modal.fields.channel === channel ? "active" : ""}" data-dispatch-channel="${channel}">${channel}</button>`).join("")}</div><button class="btn btn-sm" type="button" id="dispatch-regenerate" title="按当前订单与通道重新生成文案模板">重新生成模板</button></div>
        </div>
        <div class="dispatch-modal-layout dispatch-simple-layout">
          <div class="dispatch-form-column">
            <label class="field full"><span>排单文案（可整段粘贴客户资料后编辑，提交即按此文案送审）</span><textarea class="schedule-raw-text dispatch-final-text" data-dispatch-field="text" placeholder="粘贴或编辑排单文案…">${escapeHtml(modal.fields.text)}</textarea></label>
            ${modal.error ? `<div class="form-error">${escapeHtml(modal.error)}</div>` : ""}
          </div>
          <aside class="dispatch-preview-column dispatch-va-aside">
            <div class="section-header"><div><h2>客户 VA 账户</h2><p>${selected ? `按客户「${escapeHtml(selected.name)}」查询内部数据库` : "选择订单后自动查询"}</p></div></div>
            ${vaAccounts.length ? `<div class="dispatch-va-list">${vaAccounts.map(account => `<div class="dispatch-va-card ${account.id === modal.vaAccountId ? "active" : ""}" data-dispatch-va="${account.id}"><div class="dispatch-va-head"><strong>${escapeHtml(`${account.label} · ${account.currency}`)}</strong><button class="btn btn-sm" type="button" data-copy-text="${escapeHtml(`Virtual Account Number：${account.virtualAccountNumber}\nIBAN：${account.iban}\nCurrency：${account.currency}\nBank：${account.bank}`)}" data-copy-label="VA 账户信息">复制全部</button></div><div class="dispatch-va-row"><span>VA Number</span><code>${escapeHtml(account.virtualAccountNumber)}</code><button class="icon-button dispatch-copy-btn" type="button" title="复制 VA Number" data-copy-text="${escapeHtml(account.virtualAccountNumber)}" data-copy-label="VA Number">⧉</button></div><div class="dispatch-va-row"><span>IBAN</span><code>${escapeHtml(account.iban)}</code><button class="icon-button dispatch-copy-btn" type="button" title="复制 IBAN" data-copy-text="${escapeHtml(account.iban)}" data-copy-label="IBAN">⧉</button></div><small>${escapeHtml(account.bank)}${modal.fields.channel === "SGB" ? (account.id === modal.vaAccountId ? " · SGB 渠道将使用此账户" : " · 点击选用") : ""}</small></div>`).join("")}</div>` : `<div class="schedule-empty-block"><strong>该客户暂无 VA 账户</strong><span>SGB 渠道排单需要先在内部登记 VA 账户；SINO 渠道不受影响。</span></div>`}
            ${selectedOrder ? `<div class="dispatch-customer-brief"><span class="payout-check">收款已确认</span><small>${escapeHtml(`${selectedOrder.id} · ${selectedOrder.customerName}（${selectedOrder.clientNo}） · 应付 ${moneyPair(selectedOrder.buyCurrency, selectedOrder.buyAmount)}`)}</small></div>` : ""}
          </aside>
        </div>
        <footer><button class="btn" type="button" id="dispatch-cancel">取消</button><button class="btn btn-primary" type="submit" ${selectedOrder ? "" : "disabled"}>提交排单</button></footer>
      </form>
    </section></div>`;
    document.body.classList.add("modal-open");
    bindDispatchModalEvents();
  }

  function dispatchModalCustomer() {
    const order = findOrder(state.dispatchModal?.orderId);
    return order ? state.customers.find(customer => customer.id === order.customerId) : null;
  }

  function dispatchModalDraft(selectedVa) {
    const modal = state.dispatchModal;
    return { channel: modal.fields.channel, orderTitle: modal.fields.orderTitle, rawText: modal.fields.rawText, amount: modal.fields.amount, currency: modal.fields.currency, payoutAccount: modal.fields.payoutAccount, vaAccount: selectedVa ?? dispatchVaAccountsForCustomer(dispatchModalCustomer()).find(account => account.id === modal.vaAccountId) ?? null };
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
          <pre class="schedule-preview dispatch-view-text">${escapeHtml(order.finalText || composeDispatchText(order))}</pre>
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
        await navigator.clipboard.writeText(order.finalText || composeDispatchText(order));
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
    const regenerate = () => {
      const modal = state.dispatchModal;
      if (!modal) return;
      const order = findOrder(modal.orderId);
      const customer = dispatchModalCustomer();
      const matched = dispatchVaAccountsForCustomer(customer);
      modal.vaAccountId = matched.find(account => account.id === modal.vaAccountId)?.id || matched[0]?.id || "";
      modal.fields.text = dispatchTemplateText(order, modal.fields.channel, matched.find(account => account.id === modal.vaAccountId) || null);
      modal.error = "";
      renderDispatchModal();
    };
    $("#dispatch-order")?.addEventListener("change", event => { state.dispatchModal.orderId = event.target.value; state.dispatchModal.vaAccountId = ""; regenerate(); });
    $$('[data-dispatch-channel]').forEach(el => el.addEventListener("click", () => { state.dispatchModal.fields.channel = el.dataset.dispatchChannel; regenerate(); }));
    $("#dispatch-regenerate")?.addEventListener("click", regenerate);
    $$('[data-dispatch-va]').forEach(el => el.addEventListener("click", event => {
      if (event.target.closest("[data-copy-text]")) return;
      syncDispatchFields();
      state.dispatchModal.vaAccountId = el.dataset.dispatchVa;
      renderDispatchModal();
    }));
    $$('[data-copy-text]').forEach(el => el.addEventListener("click", event => { event.stopPropagation(); copyToClipboard(el.dataset.copyText, el.dataset.copyLabel || "内容"); }));
    $$('[data-dispatch-field]').forEach(el => el.addEventListener("input", () => { if (state.dispatchModal) state.dispatchModal.fields[el.dataset.dispatchField] = el.value; }));
  }

  function syncDispatchFields() {
    if (!state.dispatchModal) return;
    $$('[data-dispatch-field]').forEach(el => { state.dispatchModal.fields[el.dataset.dispatchField] = el.value; });
  }

  function openDispatchModal(orderId) {
    const candidates = dispatchPendingOrders();
    const chosen = candidates.find(order => order.id === orderId) || candidates[0] || null;
    const customer = chosen ? state.customers.find(item => item.id === chosen.customerId) : null;
    const channel = customer?.business === "SGB" ? "SGB" : "SINO";
    const matched = dispatchVaAccountsForCustomer(customer);
    state.dispatchModal = {
      orderId: chosen?.id || "",
      vaAccountId: matched[0]?.id || "",
      fields: { channel, text: dispatchTemplateText(chosen, channel, matched[0] || null) },
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
    const tradeOrder = findOrder(modal.orderId);
    if (!tradeOrder || tradeOrder.status !== "待出款排单") { modal.error = "请选择一笔处于待出款排单状态的订单"; renderDispatchModal(); return; }
    const customer = state.customers.find(item => item.id === tradeOrder.customerId) || { id: tradeOrder.customerId, name: tradeOrder.customerName, enName: tradeOrder.personName, clientNo: tradeOrder.clientNo };
    const text = String(modal.fields.text || "").trim();
    if (!text) { modal.error = "请粘贴或编辑排单文案"; renderDispatchModal(); return; }
    if (/（在此粘贴客户提供的收款账户资料，或直接编辑）/.test(text)) { modal.error = "文案中还保留着占位提示，请替换为客户提供的收款账户资料"; renderDispatchModal(); return; }
    const vaAccount = modal.fields.channel === "SGB" ? initialVaAccounts().find(account => account.id === modal.vaAccountId) || dispatchVaAccountsForCustomer(customer)[0] || null : null;
    if (modal.fields.channel === "SGB" && !vaAccount) { modal.error = "该客户没有已登记的 VA 账户，无法走 SGB 渠道；可切换 SINO 渠道后提交"; renderDispatchModal(); return; }
    const parsed = parseDispatchRaw(text);
    const orderTitle = (text.split("\n").map(line => line.trim()).find(line => line && !/^\*/.test(line)) || `補單:${tradeOrder.clientNo}`).slice(0, 42);
    const amountValue = tradeOrder.buyAmount;
    const payoutAccount = modal.fields.channel === "SGB" ? `${(customer.enName || customer.name).toUpperCase()} SGB VA` : "pobo cq開-開";
    const id = nextDispatchId();
    state.payoutOrders.unshift({
      id, orderId: tradeOrder.id, customerId: customer.id, clientNo: customer.clientNo || "无编号", customerName: customer.name,
      personName: customer.enName || customer.name, complianceStatus: "合规审核通过", status: "出款审核中",
      amount: amountValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      currency: tradeOrder.buyCurrency, channel: modal.fields.channel,
      orderTitle, rawText: text, finalText: text,
      payoutAccount, vaAccount,
      payee: parsed.payee || customer.enName || customer.name,
      payeeBank: [parsed.bankName, parsed.accountNumber].filter(Boolean).join(" · ") || "見排单文案",
      expectedDate: "", note: "",
      submittedBy: roles.agent.name, submittedAt: dispatchNowLabel(), updated: "刚刚"
    });
    tradeOrder.dispatchId = id;
    tradeOrder.status = "出款审核中";
    tradeOrder.dispatchRejected = null;
    orderLog(tradeOrder, "排单已提交", `${id} · ${orderTitle} · ${tradeOrder.buyCurrency} ${amountValue.toLocaleString("en-US")} 进入排单审核`);
    if (customer.status === "审核通过") setCustomerStatus(customer, "已排单", `初级交易员 ${roles.agent.name}`, `排单 ${id} 已提交出款审核`);
    if (customer.timeline) {
      customer.timeline.unshift({ title: "排单已提交", detail: `${id} · ${orderTitle} · ${tradeOrder.buyCurrency} ${amountValue.toLocaleString("en-US")}`, role: `初级交易员 ${roles.agent.name}`, time: "刚刚" });
      persistCustomers();
    }
    state.dispatchModal = null;
    render();
    toast("排单已提交", `${id} · 订单 ${tradeOrder.id} 进入出款审核中`);
  }

  function openDispatchReviewModal(orderId) {
    const order = findOrder(orderId);
    if (!order || !orderDispatch(order)) { toast("暂无排单可审", "该订单尚未关联出款排单"); return; }
    state.dispatchReviewModal = { orderId };
    renderDispatchModal();
  }

  function renderDispatchReviewModal(root) {
    const modal = state.dispatchReviewModal;
    const order = findOrder(modal.orderId);
    const dispatch = order ? orderDispatch(order) : null;
    if (!order || !dispatch) { state.dispatchReviewModal = null; root.innerHTML = ""; document.body.classList.remove("modal-open"); return; }
    root.innerHTML = `<div class="review-launch-backdrop" id="dispatch-review-backdrop"><section class="schedule-template-dialog payout-receipt-dialog" role="dialog" aria-modal="true" aria-labelledby="dispatch-review-title">
      <header><div><span>DISPATCH REVIEW</span><h2 id="dispatch-review-title">排单审核</h2><p>${escapeHtml(`${dispatch.id} · ${order.customerName}（${order.clientNo}）· ${order.id}`)}</p></div><button class="icon-button" id="dispatch-review-close" aria-label="关闭" type="button">×</button></header>
      <div class="schedule-template-editor">
        <div class="funding-modal-brief"><span>应付出款</span><strong>${moneyPair(order.buyCurrency, order.buyAmount)}</strong><small>${escapeHtml(`${dispatch.channel || "—"} 通道 · ${dispatch.submittedBy || ""} · ${dispatch.submittedAt || ""} 提交`)}</small></div>
        <div class="dispatch-review-copy"><span>排单文案</span><pre class="schedule-preview dispatch-review-text">${escapeHtml(dispatch.finalText || composeDispatchText(dispatch))}</pre></div>
        <footer><button class="btn" type="button" id="dispatch-review-cancel">取消</button><button class="btn kyc-danger-btn" type="button" id="dispatch-review-reject">驳回重排</button><button class="btn btn-primary" type="button" id="dispatch-review-approve">审核通过</button></footer>
      </div></section></div>`;
    document.body.classList.add("modal-open");
    const close = () => { state.dispatchReviewModal = null; renderDispatchModal(); };
    $("#dispatch-review-close")?.addEventListener("click", close);
    $("#dispatch-review-cancel")?.addEventListener("click", close);
    $("#dispatch-review-backdrop")?.addEventListener("click", event => { if (event.target === event.currentTarget) close(); });
    $("#dispatch-review-approve")?.addEventListener("click", () => { state.dispatchReviewModal = null; approveDispatchOrder(dispatch.id); });
    $("#dispatch-review-reject")?.addEventListener("click", () => { state.dispatchReviewModal = null; renderDispatchModal(); returnDispatchOrder(dispatch.id); });
  }

  function approveDispatchOrder(orderId) {
    const order = state.payoutOrders.find(item => item.id === orderId);
    if (!order || order.status !== "出款审核中") return;
    order.status = "待出款";
    order.reviewedBy = roles.ops.name;
    order.reviewedAt = dispatchNowLabel();
    order.updated = "刚刚";
    const tradeOrder = order.orderId ? findOrder(order.orderId) : null;
    if (tradeOrder) {
      tradeOrder.status = "待出款执行";
      orderLog(tradeOrder, "排单审核通过", `${order.id} 进入待出款执行（执行人：${fundingOwnerLabel(tradeOrder, "outflow")}）`);
    }
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
    showConfirm(`驳回排单 ${order.id}？`, `${order.customerName} · ${order.currency} ${order.amount}。驳回后订单回到待出款排单，初级交易员重新提交排单后再次进入审核。`, "驳回原因", "收款账户要素需修改", "确认驳回", note => {
      state.payoutOrders = state.payoutOrders.filter(item => item.id !== orderId);
      const tradeOrder = order.orderId ? findOrder(order.orderId) : null;
      if (tradeOrder) {
        tradeOrder.status = "待出款排单";
        tradeOrder.dispatchId = "";
        tradeOrder.dispatchRejected = { reason: note || "需重新排单", by: roles.ops.name, time: "刚刚" };
        orderLog(tradeOrder, "排单被驳回", `${order.id} · ${note || "需重新排单"}，等待初级交易员重新提交排单`);
      }
      const customer = state.customers.find(item => item.id === order.customerId);
      if (customer && customer.status === "已排单") {
        setCustomerStatus(customer, "审核通过", `高级交易员 ${roles.ops.name}`, note || `排单 ${order.id} 被退回`);
        customer.timeline = customer.timeline || [];
        customer.timeline.unshift({ title: "排单被退回", detail: `${order.id} · ${note || "需重新排单"}`, role: `高级交易员 ${roles.ops.name}`, time: "刚刚" });
        persistCustomers();
      }
      render();
      toast("排单已驳回", `${order.id} 回到待出款排单，等待初级交易员重新提交`);
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
    const tradeOrder = order.orderId ? findOrder(order.orderId) : null;
    if (tradeOrder && tradeOrder.status !== "已完成") completeTradeOrder(tradeOrder, order);
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
    $$('[data-dispatch-start-review]').forEach(el => el.addEventListener("click", event => { event.stopPropagation(); openDispatchReviewModal(el.dataset.dispatchStartReview); }));
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

  function bindDepartmentEvents() {
    $$('[data-department-tab]').forEach(el => el.addEventListener("click", () => {
      state.departmentTab = el.dataset.departmentTab;
      state.selectedLeaveId = null;
      render();
    }));
    $("#department-prev-week")?.addEventListener("click", () => { state.departmentWeekOffset = (state.departmentWeekOffset || 0) - 1; render(); });
    $("#department-next-week")?.addEventListener("click", () => { state.departmentWeekOffset = (state.departmentWeekOffset || 0) + 1; render(); });
    $("#department-today-week")?.addEventListener("click", () => { state.departmentWeekOffset = 0; render(); });
    $("#leave-open")?.addEventListener("click", () => {
      state.leaveDraft = state.leaveDraft || initialLeaveDraft();
      state.leavePanelOpen = true;
      render();
    });
    $$('[data-leave-quick]').forEach(el => el.addEventListener("click", () => {
      state.leaveDraft = { ...initialLeaveDraft(), employeeId: el.dataset.leaveQuick, start: el.dataset.leaveDate, end: el.dataset.leaveDate };
      state.leavePanelOpen = true;
      render();
    }));
    $$('[data-leave-select]').forEach(el => el.addEventListener("click", () => {
      state.selectedLeaveId = el.dataset.leaveSelect;
      render();
    }));
    const leaveDetailClose = $("#leave-detail-close"); if (leaveDetailClose) leaveDetailClose.addEventListener("click", () => { state.selectedLeaveId = null; render(); });
    const leaveDetailBackdrop = $("#leave-detail-backdrop"); if (leaveDetailBackdrop) leaveDetailBackdrop.addEventListener("click", () => { state.selectedLeaveId = null; render(); });
    $("#leave-panel-close")?.addEventListener("click", () => { state.leavePanelOpen = false; render(); });
    $("#leave-cancel")?.addEventListener("click", () => { state.leavePanelOpen = false; render(); });
    $("#leave-panel-backdrop")?.addEventListener("click", event => {
      if (event.target === event.currentTarget) {
        state.leavePanelOpen = false;
        render();
      }
    });
    $$('[data-leave-field]').forEach(el => el.addEventListener(el.tagName === "SELECT" ? "change" : "input", event => {
      const field = event.target.dataset.leaveField;
      state.leaveDraft = { ...(state.leaveDraft || initialLeaveDraft()), [field]: event.target.value };
      if (event.target.dataset.leaveField === "start" && state.leaveDraft.end < state.leaveDraft.start) state.leaveDraft.end = state.leaveDraft.start;
      if (field === "part") Object.assign(state.leaveDraft, leaveTimeDefaults(state.leaveDraft.part));
      if (field !== "note") render();
    }));
    $("#leave-handoff")?.addEventListener("change", event => {
      state.leaveDraft = { ...(state.leaveDraft || initialLeaveDraft()), handoff: event.target.checked };
    });
    $("#leave-form")?.addEventListener("submit", event => {
      event.preventDefault();
      const draft = state.leaveDraft || initialLeaveDraft();
      const employee = state.departmentMembers.find(member => member.id === draft.employeeId);
      state.departmentLeaves.unshift({
        id: `LV-${Date.now()}`,
        employeeId: draft.employeeId,
        type: draft.type,
        start: draft.start,
        end: draft.end < draft.start ? draft.start : draft.end,
        part: draft.part,
        startTime: draft.startTime,
        endTime: draft.endTime,
        note: draft.note,
        source: "手工登记",
        registeredBy: roles.manager.name,
        registeredAt: nowDateTime()
      });
      state.departmentTab = "calendar";
      state.leavePanelOpen = false;
      state.leaveDraft = initialLeaveDraft();
      render();
      toast("不可用时间已登记", `${employee?.name || "员工"} · ${draft.type} · ${draft.start}`);
    });
    $$('[data-handoff-toast]').forEach(el => el.addEventListener("click", () => {
      const member = state.departmentMembers.find(item => item.id === el.dataset.handoffToast);
      const target = member ? recommendedHandoff(member) : null;
      toast("交接已标记", `${member?.name || "员工"} 的待办已建议交给 ${target?.name || "接手人"}`);
    }));
  }

  /* ===================== 交易订单主线：数据与动作 ===================== */

  function parseMoney(value) { return Number(String(value ?? "").replace(/[,，\s]/g, "")) || 0; }
  function fmtMoney(value) { const n = Number(value) || 0; return n.toLocaleString("en-US", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 }); }
  function moneyPair(currency, amount) { return `${currency} ${fmtMoney(amount)}`; }

  const tradeTypes = ["现金换U", "U换现金", "转账换U", "U换转账", "法币换法币"];
  const customTradeTypeKey = "bitvast-custom-trade-types";
  const loadCustomTradeTypes = () => { try { const parsed = JSON.parse(localStorage.getItem(customTradeTypeKey) || "[]"); return Array.isArray(parsed) ? parsed.filter(item => typeof item === "string" && item.trim()) : []; } catch { return []; } };
  const customTradeTypes = loadCustomTradeTypes();
  const allTradeTypes = () => [...tradeTypes, ...customTradeTypes.filter(type => !tradeTypes.includes(type))];
  function saveCustomTradeType(name) {
    const trimmed = String(name || "").trim();
    if (!trimmed || tradeTypes.includes(trimmed) || customTradeTypes.includes(trimmed)) return trimmed;
    customTradeTypes.push(trimmed);
    try { localStorage.setItem(customTradeTypeKey, JSON.stringify(customTradeTypes)); } catch { /* 本地存储不可用时仅保留在内存 */ }
    return trimmed;
  }
  /* 订单主线 7 态（表4）：待KYC → 待客户入款 → 待出款排单 → 出款审核中 → 待出款执行 → 已完成 / 已取消。
     创建订单时按客户实际 KYC 状态决定入口（已通过则直接待客户入款）；
     入款由财务/钱包运营登记即确认；出款执行登记即完成。排单/付款子记录仍使用自己的状态字符串。 */
  const orderStatuses = ["待KYC", "待客户入款", "待出款排单", "出款审核中", "待出款执行", "已完成", "已取消"];
  const orderStatusLabel = status => status;
  /* ---------- 资金动作：订单里的两个节点 ---------- */
  /* 交易类型决定资金形态与责任人：法币入款→财务、USDT 入款→钱包运营、法币出款→出款员、USDT 出款→钱包运营 */
  function fundingKind(order, side) {
    const currency = side === "inflow" ? order.sellCurrency : order.buyCurrency;
    if (currency === "USDT") return "chain";
    if (side === "inflow" && order.payMethod === "现金") return "cash";
    if (side === "outflow" && /现金/.test(order.tradeType || "")) return "cash";
    return "bank";
  }
  function fundingOwnerRole(order, side) {
    const kind = fundingKind(order, side);
    if (kind === "chain") return "wallet";
    return side === "inflow" ? "finance" : "payout";
  }
  function fundingOwnerLabel(order, side) { return roles[fundingOwnerRole(order, side)].label; }
  const fundingKindLabel = { bank: "银行入账", chain: "链上转账", cash: "现金交收" };

  function fundingState(order, side) {
    const status = order.status;
    const mark = side === "inflow" ? order.inflowMark : order.outflowMark;
    const kind = fundingKind(order, side);
    const owner = fundingOwnerRole(order, side);
    let state = "待发起";
    if (side === "inflow") {
      if (status === "待KYC") state = "待发起";
      else if (status === "待客户入款") state = "待到账确认";
      else if (status === "已取消") state = mark ? "已到账" : "待发起";
      else state = "已到账";
      if (order.paymentRejected && status === "待客户入款") state = "异常";
      if (order.exception && order.exception.reason === "金额不符") state = "异常";
    } else {
      if (status === "待出款排单") state = "待排单";
      else if (status === "出款审核中") state = "待审核";
      else if (status === "待出款执行") state = "待执行";
      else if (status === "已完成") state = mark ? "已归档" : "待发起";
      else state = "待发起";
      if (order.dispatchRejected && status === "待出款排单") state = "异常";
    }
    return { kind, kindLabel: fundingKindLabel[kind], owner, ownerLabel: roles[owner].label, state, mark: mark || null };
  }

  /* 订单主流程从交易登记开始；报价是订单前置动作，只在概览「报价信息」里展示。
     KYC 拆成「材料 / 审核」两个节点：材料由初级交易员负责，审核由合规负责。 */
  const orderStages = ["交易登记", "KYC材料", "KYC审核", "客户入款", "入款确认", "出款排单", "排单审核", "出款执行", "完成"];
  const orderStageIndex = { "待KYC": 1, "待客户入款": 3, "待出款排单": 5, "出款审核中": 6, "待出款执行": 7, "已完成": 9 };
  function orderStageCurrent(order) {
    let current = orderStageIndex[order.status] ?? 1;
    if (order.status === "待KYC") {
      const label = orderKyc(order).label;
      current = label === "KYC已通过" ? 3 : label === "合规审核中" ? 2 : 1;
    }
    return current;
  }

  /* 每个节点的责任角色 / 本阶段动作 / 下一步。资金四节点的文案随交易类型（法币 / 链上 / 现金）变化。 */
  function orderStageMeta(order, index) {
    const inflow = fundingKind(order, "inflow");
    const outflow = fundingKind(order, "outflow");
    const inflowDesc = { chain: "客户转入 USDT", cash: "客户交付现金", bank: "客户银行转账" }[inflow];
    const confirmDesc = { chain: "钱包运营确认链上到账", cash: "现场清点确认现金", bank: "财务确认银行入账" }[inflow];
    const dispatchDesc = { chain: "确认客户收 U 地址", cash: "安排线下现金交收", bank: "发起银行转账排单" }[outflow];
    const execDesc = { chain: "钱包运营打 U", cash: "线下交付现金", bank: "出款员银行转账" }[outflow];
    return [
      { role: roles.agent.label, desc: "创建订单、关联报价并确认交易要素", next: "进入 KYC 环节" },
      { role: roles.agent.label, desc: "收集并上传客户 KYC 材料", next: "提交合规审核" },
      { role: roles.compliance.label, desc: "审核 KYC 材料，不通过退回补充", next: "通过后通知客户入款" },
      { role: `客户 · ${roles.agent.label}跟进`, desc: inflowDesc, next: "登记后等待入款确认" },
      { role: fundingOwnerLabel(order, "inflow"), desc: confirmDesc, next: "确认到账后进入出款排单" },
      { role: roles.agent.label, desc: dispatchDesc, next: "提交排单审核" },
      { role: roles.ops.label, desc: "审核排单要素与通道额度", next: "通过后进入出款执行" },
      { role: fundingOwnerLabel(order, "outflow"), desc: execDesc, next: "回单归档后订单完成" },
      { role: `${roles.agent.label} / ${roles.ops.label}`, desc: "核对回单与收益，确认订单闭环", next: "订单归档" }
    ][index];
  }
  const tradeTypePresets = { "现金换U": ["HKD", "USDT", "7.8200"], "U换现金": ["USDT", "HKD", "7.8000"], "转账换U": ["USD", "USDT", "1.0020"], "U换转账": ["USDT", "USD", "0.9980"], "法币换法币": ["HKD", "USD", "7.8000"] };
  const recentQuoteBook = [
    { id: "Q-20260824-01", pair: "HKD/USDT", rate: "7.8200", costRate: "7.7900", source: "快速报价", time: "今天 09:05" },
    { id: "Q-20260824-02", pair: "USDT/HKD", rate: "7.8000", costRate: "7.8300", source: "快速报价", time: "今天 09:05" },
    { id: "Q-20260824-03", pair: "USD/USDT", rate: "1.0020", costRate: "0.9990", source: "快速报价", time: "今天 09:10" },
    { id: "Q-20260824-04", pair: "USDT/USD", rate: "0.9980", costRate: "1.0010", source: "快速报价", time: "今天 09:10" },
    { id: "Q-20260823-11", pair: "USDT/USD", rate: "0.9976", costRate: "1.0006", source: "往期报价", time: "昨天 16:20" },
    { id: "Q-20260824-05", pair: "HKD/USD", rate: "7.8000", costRate: "7.7650", source: "批量报价", time: "今天 08:30" },
    { id: "Q-20260824-06", pair: "USD/HKD", rate: "7.8100", costRate: "7.8400", source: "批量报价", time: "今天 08:30" },
    { id: "Q-20260824-07", pair: "CNY/USDT", rate: "7.2350", costRate: "7.2100", source: "快速报价", time: "今天 09:15" },
    { id: "Q-20260824-08", pair: "EUR/USD", rate: "1.0840", costRate: "1.0812", source: "快速报价", time: "今天 08:45" }
  ];
  function quotedRatesForPair(sellCurrency, buyCurrency) { return recentQuoteBook.filter(quote => quote.pair === `${sellCurrency}/${buyCurrency}`); }
  function customerComplianceReady(customer) { return !!customer && tradeMarkableStatuses.includes(customer.status); }

  function customerNeedsSupplement(customer) {
    if (!customer) return false;
    if ((customer.documents || []).some(doc => /需补件|需重传/.test(doc.state || ""))) return true;
    return state.cases.some(item => item.customerId === customer.id && item.status === "待客户补件");
  }

  /* 订单 KYC 徽标（表3）：待KYC → 合规审核中 → KYC已通过 / KYC被驳回（可重提） / KYC被终止（终态） */
  function kycStatusInfo(customer) {
    if (!customer) return { label: "客户未建档", tone: "neutral", ready: false };
    if (customer.kycTerminated) return { label: "KYC被终止", tone: "danger", ready: false };
    if (customerComplianceReady(customer)) return { label: "KYC已通过", tone: "success", ready: true };
    if (customerNeedsSupplement(customer)) return { label: "KYC被驳回", tone: "warning", ready: false };
    if (customer.status === "合规驳回") return { label: "KYC被驳回", tone: "warning", ready: false };
    if (customer.status === "材料审核中") return { label: "合规审核中", tone: "info", ready: false };
    return { label: "待KYC", tone: "neutral", ready: false };
  }

  function orderKyc(order) { return kycStatusInfo(state.customers.find(item => item.id === order.customerId)); }

  function orderFlags(order) {
    const flags = [];
    if (order.exception) flags.push({ label: `${order.exception.kind} · ${order.exception.reason}`, tone: "danger" });
    if (order.paymentRejected) flags.push({ label: "付款被驳回", tone: "danger" });
    if (order.dispatchRejected) flags.push({ label: "出款审核驳回", tone: "danger" });
    /* KYC 状态不进第一行徽标：列表第二行与详情面板已展示，避免与主状态胶囊挤在一起 */
    return flags;
  }

  function orderFlagBadges(order) {
    return orderFlags(order).map(flag => `<span class="status status-${flag.tone} order-flag-pill">${escapeHtml(flag.label)}</span>`).join("");
  }

  function seedTradeCore(target) {
    target.treasury = [
      { key: "cash-HKD", group: "现金库存", name: "现金库存 · HKD", currency: "HKD", available: 1256400, frozen: 0, opening: 1100000, floor: 500000 },
      { key: "cash-USD", group: "现金库存", name: "现金库存 · USD", currency: "USD", available: 342000, frozen: 0, opening: 380000, floor: 400000 },
      { key: "cash-CNY", group: "现金库存", name: "现金库存 · CNY", currency: "CNY", available: 508000, frozen: 0, opening: 508000, floor: 200000 },
      { key: "cash-EUR", group: "现金库存", name: "现金库存 · EUR", currency: "EUR", available: 96000, frozen: 0, opening: 90000, floor: 50000 },
      { key: "bank-SGB-USD", group: "银行账户", name: "SGB 银行账户 · USD", currency: "USD", available: 1825000, frozen: 25000, opening: 2050000, floor: 800000 },
      { key: "bank-SGB-HKD", group: "银行账户", name: "SGB 银行账户 · HKD", currency: "HKD", available: 903000, frozen: 0, opening: 240000, floor: 300000 },
      { key: "bank-SINO-USD", group: "银行账户", name: "SINO 清算账户 · USD", currency: "USD", available: 685000, frozen: 235000, opening: 900000, floor: 800000 },
      { key: "va-USD", group: "VA 账户", name: "SGB VA 归集账户 · USD", currency: "USD", available: 660000, frozen: 0, opening: 610000, floor: 200000 },
      { key: "wallet-USDT", group: "USDT 钱包", name: "USDT 热钱包 · TRC20", currency: "USDT", available: 486000, frozen: 0, opening: 200000, floor: 100000 }
    ];
    const cust = id => target.customers.find(item => item.id === id) || {};
    const base = (id, customerId, tradeType, sellCurrency, sellAmount, buyCurrency, buyAmount, rate, payMethod, status, handler, extra = {}) => {
      const customer = cust(customerId);
      return { id, customerId, clientNo: customer.clientNo || "无编号", customerName: customer.name || customerId, personName: customer.enName || customer.name || "", tradeType, sellCurrency, sellAmount, buyCurrency, buyAmount, rate, payMethod, quote: null, paymentIds: [], dispatchId: "", receiptRef: "", freeze: null, profit: null, status, handler, exception: null, createdAt: extra.createdAt || "今天", updated: extra.updated || "今天", timeline: [], ...extra };
    };
    const q = (dealRate, costRate, fee, quotedAt) => ({ id: `Q-${quotedAt.replaceAll("-", "")}`, dealRate, costRate, fee, quotedAt, by: "杨澜", source: "快速报价" });
    target.tradeOrders = [
      base("TO-20260824-101", "C-2026-0607", "U换现金", "USDT", 5000, "HKD", 39000, "7.8000", "USDT 转入", "待客户入款", "杨澜", { createdAt: "今天 09:02", updated: "今天 09:02", timeline: [
        { title: "KYC 校验通过", detail: "建单时客户 郑凯文 已准入（审核通过），订单直接进入待客户入款", role: "系统", time: "今天 09:02" },
        { title: "订单创建", detail: "U换现金 · 卖出 USDT 5,000 买入 HKD 39,000 · 创建人 杨澜", role: "初级交易员 杨澜", time: "今天 09:02" }] }),
      base("TO-20260824-102", "C-2026-0636", "转账换U", "USD", 30000, "USDT", 29940, "1.0020", "银行转账", "待客户入款", "杨澜", { quote: q("1.0020", "0.9990", "USD 30", "2026-08-24"), createdAt: "今天 08:40", updated: "今天 08:55", timeline: [
        { title: "关联报价", detail: "Q-20260824 · 成交价 1.0020 · 成本价 0.9990 · 手续费 USD 30", role: "初级交易员 杨澜", time: "今天 08:55" },
        { title: "KYC 校验通过", detail: "建单时客户 Mosaic Ventures 已准入（审核通过），订单直接进入待客户入款", role: "系统", time: "今天 08:40" },
        { title: "订单创建", detail: "转账换U · 卖出 USD 30,000 买入 USDT 29,940 · 创建人 杨澜", role: "初级交易员 杨澜", time: "今天 08:40" }] }),
      base("TO-20260823-103", "C-2026-0607", "现金换U", "HKD", 156400, "USDT", 20000, "7.8200", "现金", "待客户入款", "杨澜", { quote: q("7.8200", "7.7900", "HKD 300", "2026-08-23"), walletOps: { payoutAddress: "TWb5Yd8Nc2Kf7Rq3Hm9Ls1Xz6Gv4Tu0Pe", kya: "待核查" }, createdAt: "昨天 15:10", updated: "昨天 16:05", timeline: [
        { title: "通知客户付款", detail: "等待客户交付 HKD 156,400 现金", role: "初级交易员 杨澜", time: "昨天 16:05" },
        { title: "关联报价", detail: "Q-20260823 · 汇率 7.8200 · 手续费 HKD 300", role: "初级交易员 杨澜", time: "昨天 15:40" },
        { title: "KYC 校验通过", detail: "建单时客户 郑凯文 已准入（审核通过），订单直接进入待客户入款", role: "系统", time: "昨天 15:10" },
        { title: "订单创建", detail: "现金换U · 卖出 HKD 156,400 买入 USDT 20,000 · 创建人 杨澜", role: "初级交易员 杨澜", time: "昨天 15:10" }] }),
      base("TO-20260823-104", "C-2026-0636", "转账换U", "USD", 50000, "USDT", 49900, "1.0020", "银行转账", "待客户入款", "陈文静", { quote: q("1.0020", "0.9990", "USD 50", "2026-08-23"), paymentIds: ["PAY-2026-201"], createdAt: "昨天 14:20", updated: "昨天 16:40", timeline: [
        { title: "客户付款已登记", detail: "PAY-2026-201 · USD 50,000 银行转账（CHATS 汇入），等待财务确认入款", role: "初级交易员 杨澜", time: "昨天 16:40" },
        { title: "关联报价", detail: "Q-20260823 · 成交价 1.0020 · 成本价 0.9990 · 手续费 USD 50", role: "初级交易员 杨澜", time: "昨天 14:25" },
        { title: "KYC 校验通过", detail: "建单时客户 Mosaic Ventures 已准入（审核通过），订单直接进入待客户入款", role: "系统", time: "昨天 14:20" },
        { title: "订单创建", detail: "转账换U · 卖出 USD 50,000 买入 USDT 49,900 · 创建人 杨澜", role: "初级交易员 杨澜", time: "昨天 14:20" }] }),
      base("TO-20260819-105", "C-2026-0588", "U换转账", "USDT", 150300, "USD", 150000, "0.9980", "USDT 转入", "出款审核中", "陈文静", { quote: q("0.9980", "1.0010", "USD 150", "2026-08-19"), paymentIds: ["PAY-2026-202"], dispatchId: "SCH-20260819-001",
        walletOps: { depositAddress: "TXk7Rm2Qd9Vb4Nc8Hs1Lp6Wz3Ye5Gu0Tf", depositBy: "梁子豪", depositAt: "08-19 09:40", kya: "通过", kyaBy: "梁子豪", kyaAt: "08-19 10:05" },
        inflowMark: { by: "梁子豪", at: "08-19 11:02", chain: "TRC20", hash: "9f2c7a1e5b34d806fa71c2e93b5d4087ac16e2f9d3b7c8514a0e6d9f2b3c7a15", confirms: "24", voucher: "trx-20260819.png" }, freeze: { accountKey: "bank-SINO-USD", accountName: "SINO 清算账户 · USD", currency: "USD", amount: 150000, state: "已冻结" }, createdAt: "08-19 09:30", updated: "今天 10:18", timeline: [
        { title: "排单已提交", detail: "SCH-20260819-001 · USD 150,000 · SINO 通道，进入排单审核", role: "初级交易员 杨澜", time: "今天 10:18" },
        { title: "入款已确认", detail: "PAY-2026-202 · 150,300 USDT 到账，冻结 USD 150,000，进入待出款排单", role: "高级交易员 陈文静", time: "08-19 11:05" },
        { title: "链上入款已到账", detail: "TRC20 · 24 次确认 · 凭证 trx-20260819.png · 由钱包运营标记", role: "钱包运营 梁子豪", time: "08-19 11:02" },
        { title: "客户地址 KYA 通过", detail: "TXk7Rm…Gu0Tf · 白名单校验通过", role: "钱包运营 梁子豪", time: "08-19 10:05" },
        { title: "提供公司收 U 地址", detail: "TXk7Rm2Qd9Vb4Nc8Hs1Lp6Wz3Ye5Gu0Tf · 由钱包运营登记", role: "钱包运营 梁子豪", time: "08-19 09:40" },
        { title: "KYC 审核通过", detail: "客户 林雅雯 准入审核通过，订单进入待客户入款", role: "合规官 Tina Lau", time: "08-19 09:35" },
        { title: "关联报价", detail: "Q-20260819 · 成交价 0.9980 · 成本价 1.0010 · 手续费 USD 150", role: "初级交易员 杨澜", time: "08-19 09:32" },
        { title: "订单创建", detail: "U换转账 · 卖出 USDT 150,300 买入 USD 150,000 · 创建人 杨澜", role: "初级交易员 杨澜", time: "08-19 09:30" }] }),
      base("TO-20260818-106", "C-2026-0677", "法币换法币", "HKD", 663000, "USD", 85000, "7.8000", "银行转账", "待出款执行", "陈文静", { quote: q("7.8000", "7.7650", "HKD 500", "2026-08-18"), paymentIds: ["PAY-2026-203"], dispatchId: "SCH-20260818-004", freeze: { accountKey: "bank-SINO-USD", accountName: "SINO 清算账户 · USD", currency: "USD", amount: 85000, state: "已冻结" }, createdAt: "08-18 10:12", updated: "昨天 17:30", timeline: [
        { title: "排单审核通过", detail: "SCH-20260818-004 转入待出款执行（执行人：出款员 何嘉敏）", role: "高级交易员 陈文静", time: "昨天 17:30" },
        { title: "排单已提交", detail: "SCH-20260818-004 · USD 85,000 · SINO 通道，进入排单审核", role: "交易员 陈浩", time: "08-18 15:00" },
        { title: "入款已确认", detail: "PAY-2026-203 · HKD 663,000 到账，冻结 USD 85,000，进入待出款排单", role: "高级交易员 陈文静", time: "08-18 14:20" },
        { title: "客户付款已登记", detail: "PAY-2026-203 · HKD 663,000 银行转账（CHATS），等待财务确认入款", role: "交易员 陈浩", time: "08-18 13:05" },
        { title: "KYC 校验通过", detail: "建单时客户 Aurora Capital 已准入（审核通过），订单直接进入待客户入款", role: "系统", time: "08-18 10:12" },
        { title: "关联报价", detail: "Q-20260818 · 成交价 7.8000 · 成本价 7.7650 · 手续费 HKD 500", role: "交易员 陈浩", time: "08-18 10:15" },
        { title: "订单创建", detail: "法币换法币 · 卖出 HKD 663,000 买入 USD 85,000 · 创建人 陈浩", role: "交易员 陈浩", time: "08-18 10:12" }] }),
      base("TO-20260817-107", "C-2026-0628", "U换转账", "USDT", 220440, "USD", 220000, "0.9980", "USDT 转入", "已完成", "何嘉敏", { quote: q("0.9980", "1.0020", "USD 220", "2026-08-17"), paymentIds: ["PAY-2026-204"], dispatchId: "SCH-20260817-002", receiptRef: "SGB-回单-20260818.pdf",
        walletOps: { depositAddress: "TZp9Wc3Kd6Nb2Vq8Hm1Ls4Xy7Gt5Ru0Ef", depositBy: "梁子豪", depositAt: "08-17 10:20" },
        inflowMark: { by: "梁子豪", at: "08-17 13:40", chain: "TRC20", hash: "6a4e9c02b7d158f3e0c74b295ad86031fc52e9b7d403a1685cf29d7e04b3a1c6", confirms: "32", voucher: "trx-20260817.png" },
        outflowMark: { by: "何嘉敏", at: "08-18 10:26", account: "SGB 银行账户 · USD", time: "08-18 10:26", voucher: "SGB-回单-20260818.pdf", archived: true }, freeze: { accountKey: "bank-SGB-USD", accountName: "SGB 银行账户 · USD", currency: "USD", amount: 220000, state: "已消耗" }, profit: { spread: 880, fee: 220, channelCost: 110, commission: 770, net: 220, currency: "USD" }, createdAt: "08-17 10:05", updated: "08-18 10:26", timeline: [
        { title: "订单完成", detail: "凭证核对一致，净收益 USD 220，订单闭环", role: "出款员 何嘉敏", time: "08-18 10:32" },
        { title: "凭证匹配成功", detail: "SCH-20260817-002 出款水单 SGB-回单-20260818.pdf 与银行流水匹配一致", role: "出款员 何嘉敏", time: "08-18 10:30" },
        { title: "银行出款已完成", detail: "SGB 银行账户 · USD 220,000 已出款，回单已归档 · 由出款员执行", role: "出款员 何嘉敏", time: "08-18 10:26" },
        { title: "排单审核通过", detail: "SCH-20260817-002 转入待出款执行（执行人：出款员 何嘉敏）", role: "高级交易员 陈文静", time: "08-17 16:10" },
        { title: "排单已提交", detail: "SCH-20260817-002 · USD 220,000 · SGB 通道，进入排单审核", role: "交易员 周辰", time: "08-17 15:30" },
        { title: "入款已确认", detail: "PAY-2026-204 · 220,440 USDT 到账，冻结 USD 220,000，进入待出款排单", role: "高级交易员 陈文静", time: "08-17 13:40" },
        { title: "链上入款已到账", detail: "TRC20 · 32 次确认 · 凭证 trx-20260817.png · 由钱包运营标记", role: "钱包运营 梁子豪", time: "08-17 13:20" },
        { title: "提供公司收 U 地址", detail: "TZp9Wc3Kd6Nb2Vq8Hm1Ls4Xy7Gt5Ru0Ef · 由钱包运营登记", role: "钱包运营 梁子豪", time: "08-17 10:20" },
        { title: "KYC 审核通过", detail: "客户 李婉晴 准入审核通过，订单进入待客户入款", role: "合规官 Tina Lau", time: "08-17 10:15" },
        { title: "关联报价", detail: "Q-20260817 · 成交价 0.9980 · 成本价 1.0020 · 手续费 USD 220", role: "交易员 周辰", time: "08-17 10:08" },
        { title: "订单创建", detail: "U换转账 · 卖出 USDT 220,440 买入 USD 220,000 · 创建人 周辰", role: "交易员 周辰", time: "08-17 10:05" }] }),
      base("TO-20260823-108", "C-2026-0694", "转账换U", "USD", 50000, "USDT", 49900, "1.0020", "银行转账", "待客户入款", "陈文静", { quote: q("1.0020", "0.9990", "USD 50", "2026-08-23"), paymentIds: ["PAY-2026-205"], exception: { kind: "业务异常", reason: "金额不符", detail: "客户实付 USD 48,000，与应收 USD 50,000 不符", prevStatus: "待客户入款", escalated: false, since: "昨天 18:12" }, createdAt: "昨天 11:30", updated: "昨天 18:12", timeline: [
        { title: "标记异常", detail: "付款金额不符：实付 USD 48,000 / 应收 USD 50,000，等待处理", role: "高级交易员 陈文静", time: "昨天 18:12" },
        { title: "客户付款已登记", detail: "PAY-2026-205 · USD 48,000 银行转账，等待财务确认入款", role: "初级交易员 杨澜", time: "昨天 15:50" },
        { title: "KYC 校验通过", detail: "建单时客户 Northstar Trading 已准入，订单直接进入待客户入款", role: "系统", time: "昨天 11:30" },
        { title: "关联报价", detail: "Q-20260823 · 成交价 1.0020 · 成本价 0.9990 · 手续费 USD 50", role: "初级交易员 杨澜", time: "昨天 11:32" },
        { title: "订单创建", detail: "转账换U · 卖出 USD 50,000 买入 USDT 49,900 · 创建人 杨澜", role: "初级交易员 杨澜", time: "昨天 11:30" }] }),
      base("TO-20260822-109", "C-2026-0614", "转账换U", "USD", 120000, "USDT", 119760, "1.0020", "银行转账", "待KYC", "Tina Lau", { exception: { kind: "合规异常", reason: "高风险客户", detail: "客户合规驳回记录未闭环，命中可疑交易规则，待合规复核", prevStatus: "待KYC", escalated: true, since: "08-22 15:40" }, createdAt: "08-22 14:05", updated: "08-22 15:40", timeline: [
        { title: "升级合规", detail: "命中高风险规则，已转合规复核，主线停留在待KYC", role: "高级交易员 陈文静", time: "08-22 15:40" },
        { title: "合规提示", detail: "客户当前状态「合规驳回」，本单进入待KYC；准入审核通过后自动进入待客户入款", role: "系统", time: "08-22 14:05" },
        { title: "订单创建", detail: "转账换U · 卖出 USD 120,000 买入 USDT 119,760 · 创建人 陈浩", role: "交易员 陈浩", time: "08-22 14:05" }] }),
      base("TO-20260824-110", "C-2026-0607", "U换转账", "USDT", 25060, "USD", 25000, "0.9976", "USDT 转入", "待出款排单", "杨澜", { quote: q("0.9976", "1.0006", "USD 25", "2026-08-24"), paymentIds: ["PAY-2026-206"],
        walletOps: { depositAddress: "TQm4Rf7Xb2Vd9Kc1Ns6Hp3Lw8Zy5Ge0Ur", depositBy: "梁子豪", depositAt: "今天 09:14" },
        inflowMark: { by: "梁子豪", at: "今天 09:26", chain: "TRC20", hash: "3d8b1f60ac52e7194b0d6c83fa27e5b19d4c0a76e8f3b512c9a7d04e6b18f2c3", confirms: "20", voucher: "trx-20260824.png" }, freeze: { accountKey: "bank-SGB-USD", accountName: "SGB 银行账户 · USD", currency: "USD", amount: 25000, state: "已冻结" }, createdAt: "今天 09:12", updated: "今天 09:26", timeline: [
        { title: "入款已确认", detail: "PAY-2026-206 · 25,060 USDT 到账，冻结 USD 25,000，进入待出款排单", role: "高级交易员 陈文静", time: "今天 09:26" },
        { title: "链上入款已到账", detail: "TRC20 · 20 次确认 · 凭证 trx-20260824.png · 由钱包运营标记", role: "钱包运营 梁子豪", time: "今天 09:24" },
        { title: "提供公司收 U 地址", detail: "TQm4Rf7Xb2Vd9Kc1Ns6Hp3Lw8Zy5Ge0Ur · 由钱包运营登记", role: "钱包运营 梁子豪", time: "今天 09:14" },
        { title: "KYC 校验通过", detail: "建单时客户 郑凯文 已准入（审核通过），订单直接进入待客户入款", role: "系统", time: "今天 09:12" },
        { title: "关联报价", detail: "Q-20260824 · 成交价 0.9976 · 成本价 1.0006 · 手续费 USD 25", role: "初级交易员 杨澜", time: "今天 09:13" },
        { title: "订单创建", detail: "U换转账 · 卖出 USDT 25,060 买入 USD 25,000 · 创建人 杨澜", role: "初级交易员 杨澜", time: "今天 09:12" }] }),
      base("TO-20260821-111", "C-2026-0628", "现金换U", "HKD", 78000, "USDT", 10000, "7.8000", "现金", "已取消", "杨澜", { createdAt: "08-21 10:40", updated: "08-21 15:02", timeline: [
        { title: "订单取消", detail: "客户主动取消，未发生资金动作，订单作废", role: "初级交易员 杨澜", time: "08-21 15:02" },
        { title: "KYC 校验通过", detail: "建单时客户 李婉晴 已准入，订单直接进入待客户入款", role: "系统", time: "08-21 10:40" },
        { title: "订单创建", detail: "现金换U · 卖出 HKD 78,000 买入 USDT 10,000 · 创建人 杨澜", role: "初级交易员 杨澜", time: "08-21 10:40" }] })
    ];
    target.payments = [
      { id: "PAY-2026-201", orderId: "TO-20260823-104", customerId: "C-2026-0636", customerName: "Mosaic Ventures Pte. Ltd.", method: "银行转账", currency: "USD", amount: 50000, account: "SGB 银行账户 · 0729-88", voucherName: "mosaic-transfer-0823.pdf", status: "待确认", submittedBy: "杨澜", submittedAt: "昨天 16:40", confirmedBy: "", confirmedAt: "", note: "CHATS 汇入", matched: false },
      { id: "PAY-2026-202", orderId: "TO-20260819-105", customerId: "C-2026-0588", customerName: "林雅雯", method: "USDT 转入", currency: "USDT", amount: 150300, account: "USDT 热钱包 · TRC20", voucherName: "trx-hash-20260819.png", status: "已到账", submittedBy: "杨澜", submittedAt: "08-19 10:20", confirmedBy: "陈文静", confirmedAt: "08-19 11:02", note: "链上 20 次确认", matched: true },
      { id: "PAY-2026-203", orderId: "TO-20260818-106", customerId: "C-2026-0677", customerName: "Aurora Capital Pte. Ltd.", method: "银行转账", currency: "HKD", amount: 663000, account: "SGB 银行账户 · HKD", voucherName: "aurora-chats-0818.pdf", status: "已到账", submittedBy: "陈浩", submittedAt: "08-18 13:05", confirmedBy: "陈文静", confirmedAt: "08-18 14:20", note: "", matched: true },
      { id: "PAY-2026-204", orderId: "TO-20260817-107", customerId: "C-2026-0628", customerName: "李婉晴", method: "USDT 转入", currency: "USDT", amount: 220440, account: "USDT 热钱包 · TRC20", voucherName: "trx-hash-20260817.png", status: "已到账", submittedBy: "周辰", submittedAt: "08-17 12:10", confirmedBy: "陈文静", confirmedAt: "08-17 13:40", note: "", matched: true },
      { id: "PAY-2026-205", orderId: "TO-20260823-108", customerId: "C-2026-0694", customerName: "Northstar Trading Limited", method: "银行转账", currency: "USD", amount: 48000, account: "SGB 银行账户 · 0729-88", voucherName: "northstar-transfer-0823.pdf", status: "金额不符", submittedBy: "杨澜", submittedAt: "昨天 15:50", confirmedBy: "陈文静", confirmedAt: "昨天 18:12", note: "实付与应收差 USD 2,000", matched: false },
      { id: "PAY-2026-206", orderId: "TO-20260824-110", customerId: "C-2026-0607", customerName: "郑凯文", method: "USDT 转入", currency: "USDT", amount: 25060, account: "USDT 热钱包 · TRC20", voucherName: "trx-hash-20260824.png", status: "已到账", submittedBy: "杨澜", submittedAt: "今天 09:20", confirmedBy: "陈文静", confirmedAt: "今天 09:26", note: "", matched: true }
    ];
    target.ledger = [
      { id: "LG-000114", orderId: "TO-20260824-110", customerName: "郑凯文", bizType: "冻结", direction: "冻结", currency: "USD", amount: 25000, account: "SGB 银行账户 · USD", before: 1850000, after: 1825000, status: "已入账", operator: "陈文静", time: "今天 09:26", note: "收款确认后冻结应付资金" },
      { id: "LG-000113", orderId: "TO-20260824-110", customerName: "郑凯文", bizType: "收款", direction: "入账", currency: "USDT", amount: 25060, account: "USDT 热钱包 · TRC20", before: 460940, after: 486000, status: "已入账", operator: "陈文静", time: "今天 09:26", note: "PAY-2026-206 客户付款到账" },
      { id: "LG-000112", orderId: "", customerName: "", bizType: "调仓", direction: "出账", currency: "HKD", amount: 300000, account: "现金库存 · HKD", before: 1556400, after: 1256400, status: "已入账", operator: "陆景然", time: "08-21 11:30", note: "现金调拨至 SGB 银行账户" },
      { id: "LG-000111", orderId: "", customerName: "", bizType: "补仓", direction: "入账", currency: "USD", amount: 500000, account: "SGB 银行账户 · USD", before: 1350000, after: 1850000, status: "已入账", operator: "陆景然", time: "08-20 10:05", note: "同业买入美元补仓" },
      { id: "LG-000110", orderId: "TO-20260819-105", customerName: "林雅雯", bizType: "冻结", direction: "冻结", currency: "USD", amount: 150000, account: "SINO 清算账户 · USD", before: 835000, after: 685000, status: "已入账", operator: "陈文静", time: "08-19 11:02", note: "收款确认后冻结应付资金" },
      { id: "LG-000109", orderId: "TO-20260819-105", customerName: "林雅雯", bizType: "收款", direction: "入账", currency: "USDT", amount: 150300, account: "USDT 热钱包 · TRC20", before: 310640, after: 460940, status: "已入账", operator: "陈文静", time: "08-19 11:02", note: "PAY-2026-202 客户付款到账" },
      { id: "LG-000108", orderId: "TO-20260818-106", customerName: "Aurora Capital Pte. Ltd.", bizType: "冻结", direction: "冻结", currency: "USD", amount: 85000, account: "SINO 清算账户 · USD", before: 920000, after: 835000, status: "已入账", operator: "陈文静", time: "08-18 14:20", note: "收款确认后冻结应付资金" },
      { id: "LG-000107", orderId: "TO-20260818-106", customerName: "Aurora Capital Pte. Ltd.", bizType: "收款", direction: "入账", currency: "HKD", amount: 663000, account: "SGB 银行账户 · HKD", before: 240000, after: 903000, status: "已入账", operator: "陈文静", time: "08-18 14:20", note: "PAY-2026-203 客户付款到账" },
      { id: "LG-000106", orderId: "TO-20260817-107", customerName: "李婉晴", bizType: "佣金", direction: "出账", currency: "USD", amount: 770, account: "客户应付", before: 0, after: 0, status: "已入账", operator: "系统", time: "08-18 10:26", note: "交易员佣金 0.35%" },
      { id: "LG-000105", orderId: "TO-20260817-107", customerName: "李婉晴", bizType: "汇差", direction: "入账", currency: "USD", amount: 880, account: "汇差收益", before: 0, after: 0, status: "已入账", operator: "系统", time: "08-18 10:26", note: "成交价 0.9980 / 成本价 1.0020" },
      { id: "LG-000104", orderId: "TO-20260817-107", customerName: "李婉晴", bizType: "手续费", direction: "入账", currency: "USD", amount: 220, account: "手续费收益", before: 0, after: 0, status: "已入账", operator: "系统", time: "08-18 10:26", note: "固定手续费" },
      { id: "LG-000103", orderId: "TO-20260817-107", customerName: "李婉晴", bizType: "消耗", direction: "出账", currency: "USD", amount: 220000, account: "SGB 银行账户 · USD", before: 220000, after: 0, status: "已入账", operator: "何嘉敏", time: "08-18 10:26", note: "出款执行，冻结转消耗（冻结余额口径）" },
      { id: "LG-000102", orderId: "TO-20260817-107", customerName: "李婉晴", bizType: "冻结", direction: "冻结", currency: "USD", amount: 220000, account: "SGB 银行账户 · USD", before: 1570000, after: 1350000, status: "已入账", operator: "陈文静", time: "08-17 13:40", note: "收款确认后冻结应付资金" },
      { id: "LG-000101", orderId: "TO-20260817-107", customerName: "李婉晴", bizType: "收款", direction: "入账", currency: "USDT", amount: 220440, account: "USDT 热钱包 · TRC20", before: 90200, after: 310640, status: "已入账", operator: "陈文静", time: "08-17 13:40", note: "PAY-2026-204 客户付款到账" }
    ];
    target.recon = { status: "未开始", date: "2026-08-24", startedAt: "", confirmedAt: "", lockedAt: "", diffs: [] };
    const linkDispatch = (schId, orderId) => { const dispatch = target.payoutOrders.find(item => item.id === schId); if (dispatch) dispatch.orderId = orderId; };
    linkDispatch("SCH-20260819-001", "TO-20260819-105");
    linkDispatch("SCH-20260818-004", "TO-20260818-106");
    linkDispatch("SCH-20260817-002", "TO-20260817-107");
  }

  function findOrder(orderId) { return state.tradeOrders.find(item => item.id === orderId) || null; }
  function orderLog(order, title, detail) {
    order.timeline = order.timeline || [];
    order.timeline.unshift({ title, detail, role: `${roles[state.role].label} ${roles[state.role].name}`, time: "刚刚" });
    order.updated = "刚刚";
  }
  function treasuryAccount(key) { return state.treasury.find(item => item.key === key) || null; }

  function postLedger({ orderId = "", customerName = "", bizType, direction, currency, amount, accountKey = "", accountLabel = "", note = "", status = "已入账" }) {
    const account = accountKey ? treasuryAccount(accountKey) : null;
    let before = 0, after = 0;
    if (account) {
      if (direction === "入账") { before = account.available; account.available += amount; after = account.available; }
      else if (direction === "出账") { before = account.available; account.available -= amount; after = account.available; }
      else if (direction === "冻结") { before = account.available; account.available -= amount; account.frozen += amount; after = account.available; }
      else if (direction === "解冻") { before = account.available; account.frozen -= amount; account.available += amount; after = account.available; }
      else if (direction === "消耗") { before = account.frozen; account.frozen -= amount; after = account.frozen; }
    }
    state.ledgerSeq += 1;
    state.ledger.unshift({ id: `LG-${String(state.ledgerSeq).padStart(6, "0")}`, orderId, customerName, bizType, direction: direction === "消耗" ? "出账" : direction, currency, amount, account: account ? account.name : accountLabel || "内部账户", before, after, status, operator: roles[state.role].name, time: "刚刚", note });
  }

  function paymentInflowAccountKey(payment) {
    if (payment.method === "USDT 转入") return "wallet-USDT";
    if (payment.method === "现金") return treasuryAccount(`cash-${payment.currency}`) ? `cash-${payment.currency}` : "cash-HKD";
    if (payment.method === "VA 入账") return "va-USD";
    if (payment.currency === "HKD") return "bank-SGB-HKD";
    return "bank-SGB-USD";
  }
  function payoutAccountKeyFor(order) {
    if (order.buyCurrency === "USDT") return "wallet-USDT";
    if (order.tradeType === "U换现金") return treasuryAccount(`cash-${order.buyCurrency}`) ? `cash-${order.buyCurrency}` : "cash-HKD";
    if (order.buyCurrency === "HKD") return "bank-SGB-HKD";
    return "bank-SGB-USD";
  }

  function freezeOrderFunds(order) {
    const key = payoutAccountKeyFor(order);
    const account = treasuryAccount(key);
    if (!account) return;
    postLedger({ orderId: order.id, customerName: order.customerName, bizType: "冻结", direction: "冻结", currency: order.buyCurrency, amount: order.buyAmount, accountKey: key, note: "收款确认后冻结应付资金" });
    order.freeze = { accountKey: key, accountName: account.name, currency: order.buyCurrency, amount: order.buyAmount, state: "已冻结" };
  }
  function releaseOrderFunds(order, note) {
    if (!order.freeze || order.freeze.state !== "已冻结") return;
    postLedger({ orderId: order.id, customerName: order.customerName, bizType: "释放", direction: "解冻", currency: order.freeze.currency, amount: order.freeze.amount, accountKey: order.freeze.accountKey, note: note || "订单取消，释放冻结资金" });
    order.freeze.state = "已释放";
  }
  function consumeOrderFunds(order) {
    if (!order.freeze || order.freeze.state !== "已冻结") return;
    postLedger({ orderId: order.id, customerName: order.customerName, bizType: "消耗", direction: "消耗", currency: order.freeze.currency, amount: order.freeze.amount, accountKey: order.freeze.accountKey, note: "出款执行，冻结转消耗（冻结余额口径）" });
    order.freeze.state = "已消耗";
  }

  function computeOrderProfit(order) {
    const baseAmount = order.buyCurrency === "USDT" ? order.sellAmount : order.buyAmount;
    const currency = order.buyCurrency === "USDT" ? order.sellCurrency : order.buyCurrency;
    const spread = Math.round(baseAmount * 0.004);
    const fee = Math.round(baseAmount * 0.001);
    const channelCost = Math.round(baseAmount * 0.0005);
    const commission = Math.round(baseAmount * 0.0035);
    return { spread, fee, channelCost, commission, net: spread + fee - channelCost - commission, currency };
  }

  function completeTradeOrder(order, dispatchOrder) {
    consumeOrderFunds(order);
    order.profit = order.profit || computeOrderProfit(order);
    const currency = order.profit.currency;
    postLedger({ orderId: order.id, customerName: order.customerName, bizType: "出款", direction: "出账", currency: order.buyCurrency, amount: 0, accountKey: "", accountLabel: order.freeze?.accountName || "出款账户", note: `排单 ${dispatchOrder?.id || order.dispatchId} 出款执行完成（金额已在消耗流水记账）` });
    postLedger({ orderId: order.id, customerName: order.customerName, bizType: "手续费", direction: "入账", currency, amount: order.profit.fee, accountLabel: "手续费收益", note: "订单手续费确认" });
    postLedger({ orderId: order.id, customerName: order.customerName, bizType: "汇差", direction: "入账", currency, amount: order.profit.spread, accountLabel: "汇差收益", note: order.quote ? `成交价 ${order.quote.dealRate} / 成本价 ${order.quote.costRate}` : "汇差收益确认" });
    postLedger({ orderId: order.id, customerName: order.customerName, bizType: "佣金", direction: "出账", currency, amount: order.profit.commission, accountLabel: "客户应付", note: "交易员佣金 0.35%" });
    order.receiptRef = dispatchOrder?.receipt?.fileName || order.receiptRef || "";
    order.status = "已完成";
    orderLog(order, "订单完成", `出款已执行、凭证已归档，预计净收益 ${moneyPair(currency, order.profit.net)}，订单闭环`);
  }

  function setOrderException(order, kind, reason, detail) {
    order.exception = { kind, reason, detail, prevStatus: order.status, escalated: false, since: "刚刚" };
    orderLog(order, "标记异常", `${kind} · ${reason}：${detail}（主线状态保持「${order.status}」）`);
  }

  /* ---------- 订单 / 付款动作 ---------- */

  function refreshOrderModalQuote(modal, keepSelection = false) {
    const quotes = quotedRatesForPair(modal.sellCurrency, modal.buyCurrency);
    if (keepSelection && quotes.some(quote => quote.id === modal.quoteId)) { modal.rate = quotes.find(quote => quote.id === modal.quoteId).rate; return; }
    modal.quoteId = quotes[0]?.id || "";
    if (modal.quoteId) modal.rate = quotes[0].rate;
  }

  function syncOrderModalFields() {
    if (!state.orderModal) return;
    $$('[data-order-field]').forEach(el => { state.orderModal[el.dataset.orderField] = el.value; });
  }

  function openOrderModal() {
    const modal = { customerId: state.customers[0]?.id || "", tradeType: "转账换U", customTradeType: "", sellCurrency: "USD", buyCurrency: "USDT", sellAmount: "", buyAmount: "", rate: "1.0020", quoteId: "", payMethod: "银行转账", remark: "", error: "" };
    refreshOrderModalQuote(modal);
    state.orderModal = modal;
    renderDispatchModal();
  }

  function submitOrderModal() {
    const modal = state.orderModal;
    if (!modal) return;
    syncOrderModalFields();
    const customer = state.customers.find(item => item.id === modal.customerId);
    if (!customer) { modal.error = "请选择客户"; renderDispatchModal(); return; }
    const tradeType = (modal.tradeType || "").trim();
    if (!tradeType) { modal.error = "请选择或输入交易类型"; renderDispatchModal(); return; }
    const sellAmount = parseMoney(modal.sellAmount);
    if (!sellAmount) { modal.error = "请填写客户卖出金额"; renderDispatchModal(); return; }
    const buyAmount = parseMoney(modal.buyAmount);
    if (!buyAmount) { modal.error = "请填写客户买入金额（两侧金额均需手动填写）"; renderDispatchModal(); return; }
    const bookQuote = modal.quoteId ? recentQuoteBook.find(quote => quote.id === modal.quoteId) : null;
    const id = `TO-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${String(state.tradeOrders.length + 101)}`;
    const compliancePending = !customerComplianceReady(customer);
    const order = { id, customerId: customer.id, clientNo: customer.clientNo || "无编号", customerName: customer.name, personName: customer.enName || customer.name, tradeType, sellCurrency: modal.sellCurrency, sellAmount, buyCurrency: modal.buyCurrency, buyAmount, rate: modal.rate, payMethod: modal.payMethod,
      remark: (modal.remark || "").trim(),
      quote: bookQuote ? { id: bookQuote.id, dealRate: bookQuote.rate, costRate: bookQuote.costRate, source: bookQuote.source, pair: bookQuote.pair, confirmedAt: "刚刚", fee: `${modal.sellCurrency} ${fmtMoney(Math.round(sellAmount * 0.001))}`, quotedAt: bookQuote.time, by: roles.agent.name } : null,
      paymentIds: [], dispatchId: "", receiptRef: "", freeze: null, profit: null,
      status: compliancePending ? "待KYC" : "待客户入款", handler: roles.agent.name, exception: null, createdAt: "刚刚", updated: "刚刚",
      timeline: [
        ...(bookQuote ? [{ title: "关联报价", detail: `${bookQuote.id} · 成交价 ${bookQuote.rate} · 成本价 ${bookQuote.costRate}（${bookQuote.source} ${bookQuote.time}）`, role: `初级交易员 ${roles.agent.name}`, time: "刚刚" }] : []),
        ...(compliancePending ? [{ title: "合规提示", detail: `客户当前状态「${customer.status}」，本单进入待KYC；准入审核通过后自动进入待客户入款`, role: "系统", time: "刚刚" }] : [{ title: "KYC 校验通过", detail: `建单时客户已准入（${customer.status}），订单直接进入待客户入款`, role: "系统", time: "刚刚" }]),
        { title: "订单创建", detail: `${tradeType} · 卖出 ${moneyPair(modal.sellCurrency, sellAmount)} 买入 ${moneyPair(modal.buyCurrency, buyAmount)} · 创建人 ${roles.agent.name}`, role: `初级交易员 ${roles.agent.name}`, time: "刚刚" }
      ] };
    state.tradeOrders.unshift(order);
    if (customer.lifecycleDormant) { customer.lifecycleDormant = false; customer.timeline?.unshift({ title: "客户唤醒", detail: "沉睡客户创建新订单，回到活跃", role: "系统", time: "刚刚" }); }
    state.orderModal = null;
    state.orderView = id;
    render();
    toast("订单已创建", `${id} · ${tradeType} · ${compliancePending ? "进入待KYC" : "KYC已通过，进入待客户入款"}${bookQuote ? "" : " · 未关联报价"}`);
  }

  function orderAttachQuote(orderId) {
    const order = findOrder(orderId);
    if (!order || order.quote || ["已完成", "已取消"].includes(order.status)) return;
    const rate = Number(order.rate) || 1;
    const costRate = (rate * (order.buyCurrency === "USDT" ? 0.997 : 0.9955)).toFixed(4);
    order.quote = { id: `Q-${Date.now().toString().slice(-6)}`, dealRate: order.rate, costRate, source: "手动关联", pair: `${order.sellCurrency}/${order.buyCurrency}`, confirmedAt: "刚刚", fee: `${order.sellCurrency} ${fmtMoney(Math.round(order.sellAmount * 0.001))}`, quotedAt: "刚刚", by: roles.agent.name };
    orderLog(order, "关联报价", `成交价 ${order.quote.dealRate} · 成本价 ${order.quote.costRate} · 手续费 ${order.quote.fee}`);
    render();
    toast("报价已关联", `${order.id} 报价信息已补充`);
  }

  function openPaymentModal(orderId) {
    const candidates = state.tradeOrders.filter(order => order.status === "待客户入款");
    const chosen = candidates.find(order => order.id === orderId) || candidates[0] || null;
    state.paymentModal = { orderId: chosen?.id || "", method: chosen?.payMethod || "银行转账", currency: chosen?.sellCurrency || "USD", amount: chosen ? String(chosen.sellAmount) : "", paidAt: dispatchNowLabel(), account: "", voucherName: "", note: "", error: "" };
    renderDispatchModal();
  }

  function submitPaymentModal() {
    const modal = state.paymentModal;
    if (!modal) return;
    $$('[data-payment-field]').forEach(el => { modal[el.dataset.paymentField] = el.value; });
    const order = findOrder(modal.orderId);
    if (!order || order.status !== "待客户入款") { modal.error = "请选择处于待客户入款阶段的订单"; renderDispatchModal(); return; }
    const amount = parseMoney(modal.amount);
    if (!amount) { modal.error = "请填写付款金额"; renderDispatchModal(); return; }
    const id = `PAY-2026-${String(state.payments.length + 201)}`;
    state.payments.unshift({ id, orderId: order.id, customerId: order.customerId, customerName: order.customerName, method: modal.method, currency: modal.currency, amount, paidAt: modal.paidAt || dispatchNowLabel(), account: modal.account || "待补充", voucherName: modal.voucherName || "", status: "待确认", submittedBy: roles.agent.name, submittedAt: dispatchNowLabel(), confirmedBy: "", confirmedAt: "", note: modal.note || "", matched: false });
    order.paymentIds.push(id);
    order.paymentRejected = null;
    orderLog(order, "客户付款已登记", `${id} · ${moneyPair(modal.currency, amount)}（${modal.method} · 付款时间 ${modal.paidAt || "刚刚"}），等待收款确认`);
    state.paymentModal = null;
    render();
    toast("付款已登记", `${id} 等待高级交易员付款审核`);
  }

  function reviewPayment(paymentId, decision) {
    const payment = state.payments.find(item => item.id === paymentId);
    if (!payment || !["待确认", "待补凭证"].includes(payment.status)) return;
    const order = findOrder(payment.orderId);
    const reviewer = roles[state.role]?.name || roles.ops.name;
    if (decision === "confirm") {
      const orderCustomer = order ? state.customers.find(item => item.id === order.customerId) : null;
      if (orderCustomer && !customerComplianceReady(orderCustomer)) { toast("客户 KYC 未通过", `${orderCustomer.name} 当前「${kycStatusInfo(orderCustomer).label}」，KYC 通过后才能确认到账`); return; }
      payment.status = "已到账";
      payment.confirmedBy = reviewer;
      payment.confirmedAt = dispatchNowLabel();
      postLedger({ orderId: payment.orderId, customerName: payment.customerName, bizType: "收款", direction: "入账", currency: payment.currency, amount: payment.amount, accountKey: paymentInflowAccountKey(payment), note: `${payment.id} 客户付款到账` });
      if (order) {
        freezeOrderFunds(order);
        order.status = "待出款排单";
        order.handler = roles.agent.name;
        order.paymentRejected = null;
        orderLog(order, "入款已确认", `${payment.id} · ${moneyPair(payment.currency, payment.amount)} 到账，冻结 ${moneyPair(order.buyCurrency, order.buyAmount)}，进入待出款排单`);
      }
      render();
      toast("入款已确认到账", `${payment.id} · 订单进入待出款排单`);
      return;
    }
    if (decision === "supplement") {
      showConfirm(`要求补充凭证 ${payment.id}？`, `${payment.customerName} · ${moneyPair(payment.currency, payment.amount)}。交易员补充凭证后重新进入待确认。`, "补充要求", "凭证不清晰，请重新上传水单原件", "发送要求", note => {
        payment.status = "待补凭证";
        payment.note = note;
        if (order) orderLog(order, "要求补充凭证", `${payment.id} · ${note || "凭证需补充"}`);
        render();
        toast("已要求补充凭证", `${payment.id} 等待交易员补充`);
      });
      return;
    }
    showConfirm(`驳回付款记录 ${payment.id}？`, `${payment.customerName} · 实付 ${moneyPair(payment.currency, payment.amount)}${order ? ` · 应收 ${moneyPair(order.sellCurrency, order.sellAmount)}` : ""}。驳回后订单回到待客户付款，交易员需重新登记。`, "驳回原因（必填）", order && payment.amount !== order.sellAmount ? `实付与应收 ${moneyPair(order.sellCurrency, order.sellAmount)} 不符` : "付款信息与订单不符", "确认驳回", note => {
      payment.status = "已驳回";
      payment.confirmedBy = reviewer;
      payment.confirmedAt = dispatchNowLabel();
      payment.note = note;
      if (order) {
        order.status = "待客户入款";
        order.paymentRejected = { reason: note || "付款记录被驳回", by: reviewer, time: "刚刚" };
        orderLog(order, "付款被驳回", `${payment.id} · ${note || "付款记录被驳回"}，订单回到待客户入款`);
      }
      render();
      toast("付款记录已驳回", `${payment.id} · 订单回到待客户入款`);
    });
  }

  function supplementPaymentVoucher(paymentId) {
    const payment = state.payments.find(item => item.id === paymentId);
    if (!payment || payment.status !== "待补凭证") return;
    showConfirm(`补充凭证 ${payment.id}`, `${payment.customerName} · ${moneyPair(payment.currency, payment.amount)}。登记新凭证文件名后重新进入待确认。`, "凭证文件名", payment.voucherName ? `${payment.voucherName.replace(/\.[^.]+$/, "")}_v2.pdf` : "payment-voucher.pdf", "提交补充凭证", note => {
      payment.voucherName = note || payment.voucherName || "补充凭证.pdf";
      payment.status = "待确认";
      const order = findOrder(payment.orderId);
      if (order) orderLog(order, "凭证已补充", `${payment.id} · ${payment.voucherName}，重新进入待收款确认`);
      render();
      toast("凭证已补充", `${payment.id} 重新进入待确认`);
    });
  }

  function resolveOrderException(orderId, action) {
    const order = findOrder(orderId);
    if (!order || !order.exception) return;
    if (action === "restore") {
      showConfirm(`解除订单 ${order.id} 的异常？`, `异常解除后订单继续按主线状态「${order.status}」推进。`, "处理说明", "客户已补足差额，恢复处理", "确认解除", note => {
        order.exception = null;
        state.exceptionResolvedCount += 1;
        orderLog(order, "异常已解除", note || "异常处理完成，订单继续推进");
        render();
        toast("异常已解除", `${order.id} 继续按「${order.status}」推进`);
      });
      return;
    }
    if (action === "cancel") {
      showConfirm(`取消订单 ${order.id}？`, "订单将标记已取消，已冻结资金将释放并生成冲正流水。", "取消原因", order.exception?.detail || "异常无法恢复，取消订单", "确认取消", note => {
        releaseOrderFunds(order, "异常订单取消，释放冻结资金");
        const paid = state.payments.find(item => order.paymentIds.includes(item.id) && ["已到账", "金额不符"].includes(item.status));
        if (paid) postLedger({ orderId: order.id, customerName: order.customerName, bizType: "冲正", direction: "出账", currency: paid.currency, amount: paid.amount, accountKey: paymentInflowAccountKey(paid), note: `${paid.id} 退回客户付款（冲正）`, status: "已冲正" });
        order.status = "已取消";
        order.exception = null;
        state.exceptionResolvedCount += 1;
        orderLog(order, "订单取消", note || "异常订单已取消");
        render();
        toast("订单已取消", `${order.id} 冻结资金已释放`);
      });
      return;
    }
    order.exception.escalated = true;
    orderLog(order, "升级合规", "异常升级至合规复核，等待合规结论");
    render();
    toast("已升级合规", `${order.id} 转合规复核`);
  }

  function markVoucherMatched(kind, refId) {
    if (kind === "payment") {
      const payment = state.payments.find(item => item.id === refId);
      if (!payment || payment.matched) return;
      payment.matched = true;
      const order = findOrder(payment.orderId);
      if (order) orderLog(order, "凭证匹配成功", `${payment.id} 付款凭证与银行/链上记录匹配一致`);
      render();
      toast("凭证已匹配", `${payment.id} 已与银行/链上记录匹配`);
      return;
    }
    const dispatch = state.payoutOrders.find(item => item.id === refId);
    if (!dispatch?.receipt || dispatch.receipt.matched) return;
    dispatch.receipt.matched = true;
    const order = findOrder(dispatch.orderId);
    if (order) orderLog(order, "凭证匹配成功", `${dispatch.id} 出款水单与银行流水匹配一致`);
    render();
    toast("凭证已匹配", `${dispatch.id} 出款水单已与银行流水匹配`);
  }

  /* ---------- 库存 / 对账动作 ---------- */

  function submitTreasuryAdjust() {
    const accountKey = $("#treasury-account")?.value;
    const type = $("#treasury-type")?.value;
    const amount = parseMoney($("#treasury-amount")?.value);
    const note = $("#treasury-note")?.value?.trim() || "";
    const account = treasuryAccount(accountKey);
    if (!account || !amount) return toast("请完善调整信息", "选择账户并填写有效金额");
    const direction = type === "调仓转出" ? "出账" : "入账";
    if (direction === "出账" && account.available < amount) return toast("可用余额不足", `${account.name} 可用 ${fmtMoney(account.available)}`);
    postLedger({ bizType: type === "人工修正" ? "修正" : type.startsWith("调仓") ? "调仓" : "补仓", direction, currency: account.currency, amount, accountKey, note: note || `${type}（库存调整）` });
    render();
    toast("库存调整已记录", `${account.name} ${direction === "入账" ? "+" : "-"}${fmtMoney(amount)} ${account.currency}`);
  }

  function buildReconDiffs() {
    const diffs = [];
    state.payments.filter(item => item.status === "金额不符").forEach(item => diffs.push({ type: "金额不符", ref: `${item.id} / ${item.orderId}`, detail: `客户实付 ${moneyPair(item.currency, item.amount)} 与订单应收不符`, status: "待处理" }));
    state.payoutOrders.filter(item => item.status === "已出款" && !item.receipt).forEach(item => diffs.push({ type: "出款记录缺水单", ref: item.id, detail: "出款已执行但未归档水单", status: "待处理" }));
    state.payments.filter(item => item.status === "已到账" && !item.matched).forEach(item => diffs.push({ type: "到账未匹配", ref: `${item.id} / ${item.orderId}`, detail: "付款已确认到账，凭证尚未完成匹配", status: "待处理" }));
    diffs.push({ type: "银行到账未匹配订单", ref: "SGB 流水 IN-8842", detail: "银行入账 USD 12,500 未找到对应订单", status: "待处理" });
    diffs.push({ type: "库存不一致", ref: "现金库存 · HKD", detail: "现金盘点与系统余额差 HKD -400", status: "待处理" });
    return diffs;
  }

  function reconAction(action) {
    const recon = state.recon;
    if (action === "start" && ["未开始", "对账中"].includes(recon.status)) {
      recon.diffs = buildReconDiffs();
      recon.status = recon.diffs.length ? "有差异" : "已确认";
      recon.startedAt = dispatchNowLabel();
      render();
      toast("对账完成", recon.diffs.length ? `发现 ${recon.diffs.length} 项差异` : "各维度余额一致");
      return;
    }
    if (action === "confirm" && recon.status === "有差异") {
      recon.diffs.forEach(diff => { diff.status = "已确认"; });
      recon.status = "已确认";
      recon.confirmedAt = dispatchNowLabel();
      render();
      toast("差异已确认", "差异已登记处理责任人，可执行锁账");
      return;
    }
    if (action === "lock" && recon.status === "已确认") {
      recon.status = "已锁账";
      recon.lockedAt = dispatchNowLabel();
      render();
      toast("已锁账", `${recon.date} 日终账务已锁定`);
    }
  }

  /* ---------- 交易订单页面 ---------- */

  function orderStatusPill(status) { return `<span class="status status-${statusTone(status)}">${orderStatusLabel(status)}</span>`; }
  function orderPayments(order) { return state.payments.filter(item => order.paymentIds.includes(item.id)); }
  function orderDispatch(order) { return state.payoutOrders.find(item => item.id === order.dispatchId) || null; }

  function renderTradeOrders() {
    if (!["agent", "ops", "finance", "manager", "payout", "wallet"].includes(state.role)) return `<div class="page">${pageHeader("TRADE ORDERS", "交易订单", "当前角色不能查看交易订单。")}<div class="empty-state"><div><i>锁</i><h2>无查看权限</h2></div></div></div>`;
    const detail = state.orderView ? findOrder(state.orderView) : null;
    const todoDefs = orderTodoDefs[state.role] || orderTodoDefs.manager;
    const activeTodo = todoDefs.some(([label]) => label === state.orderTodo) ? state.orderTodo : todoDefs[0][0];
    const todoPredicate = todoDefs.find(([label]) => label === activeTodo)[1];
    const rows = state.tradeOrders.filter(order => {
      const keyword = String(state.orderSearch || "").trim().toLowerCase();
      if (keyword && !`${order.id} ${order.customerName} ${order.clientNo} ${order.tradeType}`.toLowerCase().includes(keyword)) return false;
      if (state.orderStatusFilter !== "全部状态" && order.status !== state.orderStatusFilter) return false;
      return todoPredicate(order);
    });
    const count = status => state.tradeOrders.filter(order => order.status === status).length;
    const active = state.tradeOrders.filter(order => !["已完成", "已取消"].includes(order.status)).length;
    const titles = { agent: "交易订单", ops: "交易订单", finance: "交易订单", manager: "交易订单总览", payout: "交易订单", wallet: "钱包任务" };
    const subtitles = { agent: "订单主线：待KYC → 待客户入款 → 待出款排单 → 出款审核 → 出款执行 → 完成，报价作为前置信息随单留档。", ops: "复核出款排单与异常处理；风险事件可退回或终止。", finance: "法币入款登记即确认，订单直接进入待出款排单。", manager: "全量订单总览，跟踪状态分布与异常。", payout: "排单审核通过后执行银行出款并登记，登记即完成。", wallet: "收 U 地址、地址 KYA、链上入款与出款登记都在订单里完成。" };
    return `<div class="page">${pageHeader("TRADE ORDERS", titles[state.role], subtitles[state.role], state.role === "agent" ? `<button class="btn btn-primary" id="order-new" type="button">＋ 新建订单</button>` : "")}
      <section class="metric-strip">${metric("进行中订单", String(active), "未完成/未取消", "◌")}${metric("待KYC", String(count("待KYC")), "等待业务准入", "◍")}${metric("待客户入款", String(count("待客户入款")), "等待入款登记", "!")}${metric("资金执行阶段", String(count("待出款排单") + count("出款审核中") + count("待出款执行")), "排单 / 审核 / 执行", "◇")}${metric("附加异常", String(exceptionOrders().length), "不打断主线状态", "▲")}</section>
      <div class="order-todo-tabs">${todoDefs.map(([label, predicate]) => `<button type="button" class="${label === activeTodo ? "active" : ""}" data-order-todo="${escapeHtml(label)}">${escapeHtml(label)}<em>${state.tradeOrders.filter(predicate).length}</em></button>`).join("")}</div>
      <div class="toolbar"><label class="search-control">⌕<input id="order-search" placeholder="搜索客户 / 类型 / 订单号" value="${escapeHtml(state.orderSearch)}" /></label><select class="select-control" id="order-status-filter"><option>全部状态</option>${orderStatuses.map(status => `<option value="${status}" ${state.orderStatusFilter === status ? "selected" : ""}>${orderStatusLabel(status)}</option>`).join("")}</select><span class="toolbar-count">${rows.length} 笔订单 · 点击任意行在右侧展开详情</span></div>
      ${rows.length ? `<div class="data-table-wrap"><table class="data-table order-table"><thead><tr><th>订单编号</th><th>客户主体</th><th>KYC 状态</th><th>类型</th><th>交易对 / 金额</th><th>执行汇率</th><th>当前状态</th><th class="order-table-action">操作</th></tr></thead><tbody>
      ${rows.map(order => {
        const kyc = orderKyc(order);
        const cta = orderCardCta(order);
        const flags = orderFlags(order);
        return `<tr class="order-table-row ${state.orderView === order.id ? "selected" : ""}" data-order-open="${order.id}">
          <td><strong class="mono order-table-id">${order.id}</strong><div class="muted-small">创建 ${escapeHtml(order.createdAt)}</div></td>
          <td><div class="order-table-customer"><strong>${escapeHtml(order.customerName)}</strong><small>ID: ${escapeHtml(order.clientNo)}</small></div></td>
          <td><em class="order-kyc-inline ${kyc.tone}">${kyc.label}</em></td>
          <td><span class="trade-type-tag">${escapeHtml(order.tradeType)}</span></td>
          <td><div class="trade-pair-cell"><b>${moneyPair(order.sellCurrency, order.sellAmount)}</b><i aria-hidden="true">→</i><b class="buy">${moneyPair(order.buyCurrency, order.buyAmount)}</b></div><div class="muted-small">${escapeHtml(order.payMethod)} · ${escapeHtml(order.handler)} · ${escapeHtml(order.updated)}</div></td>
          <td class="mono order-table-rate">${escapeHtml(order.rate)}</td>
          <td>${orderStatusPill(order.status)}${flags.length ? `<div class="order-table-flags">${orderFlagBadges(order)}</div>` : ""}</td>
          <td class="order-table-action"><button class="btn btn-sm ${cta === "查看" ? "" : "btn-primary"}" type="button"${cta === "开始审核" ? ` data-dispatch-start-review="${order.id}"` : ""}>${cta} →</button></td>
        </tr>`; }).join("")}
      </tbody></table></div>` : `<div class="empty-state"><div><i>▤</i><h2>没有匹配的订单</h2><p>调整筛选条件，或创建新订单。</p></div></div>`}
            ${detail ? renderOrderPanel(detail) : ""}</div>`;
  }

  /* 行按钮文案按「业务推进状态 × 角色」矩阵（表5）；点击一律打开详情，动作在详情底部完成 */
  function orderCardCta(order) {
    const role = state.role;
    if (role === "agent") {
      if (order.status === "待KYC") return "材料上传";
      if (order.status === "待出款排单") return "出款排单";
    }
    if (role === "ops") {
      if (order.status === "出款审核中") return "开始审核";
      if (order.exception) return "处理异常";
    }
    if (role === "finance" && order.status === "待客户入款" && fundingKind(order, "inflow") !== "chain") return "登记入款";
    if (role === "wallet") {
      if (order.status === "待客户入款" && fundingKind(order, "inflow") === "chain") return order.walletOps?.depositAddress ? "登记入款" : "提供收U地址";
      if (order.status === "待出款排单" && fundingKind(order, "outflow") === "chain" && order.walletOps?.kya !== "通过") return "地址KYA登记";
      if (order.status === "待出款执行" && fundingKind(order, "outflow") === "chain") return "登记链上转账";
    }
    if (role === "payout" && order.status === "待出款执行" && fundingKind(order, "outflow") !== "chain") return "出款登记";
    return "查看";
  }

  const orderTodoDefs = {
    agent: [
      ["我的交易", () => true],
      ["待 KYC", order => order.status === "待KYC"],
      ["待客户入款", order => order.status === "待客户入款"],
      ["待出款排单", order => order.status === "待出款排单"],
      ["被退回", order => !!(order.paymentRejected || order.dispatchRejected)]
    ],
    ops: [
      ["待审核", order => order.status === "出款审核中"],
      ["已审核", order => ["待出款执行", "已完成"].includes(order.status) || !!order.dispatchRejected]
    ],
    finance: [
      ["待法币入款登记", order => order.status === "待客户入款" && fundingKind(order, "inflow") !== "chain"],
      ["已登记", order => ["待出款排单", "出款审核中", "待出款执行", "已完成"].includes(order.status)],
      ["全部订单", () => true]
    ],
    wallet: [
      ["待链上入款登记", order => order.status === "待客户入款" && fundingKind(order, "inflow") === "chain"],
      ["待地址 KYA", order => fundingKind(order, "outflow") === "chain" && ["待客户入款", "待出款排单"].includes(order.status) && order.walletOps?.kya !== "通过"],
      ["待链上出款", order => order.status === "待出款执行" && fundingKind(order, "outflow") === "chain"],
      ["已处理", order => order.status === "已完成" && (fundingKind(order, "inflow") === "chain" || fundingKind(order, "outflow") === "chain")]
    ],
    payout: [
      ["待银行出款", order => order.status === "待出款执行" && fundingKind(order, "outflow") !== "chain"],
      ["已完成", order => order.status === "已完成"],
      ["全部订单", () => true]
    ],
    manager: [
      ["全部订单", () => true],
      ["进行中", order => !["已完成", "已取消"].includes(order.status)],
      ["附加异常", order => !!order.exception],
      ["已完成", order => order.status === "已完成"]
    ]
  };

  function orderStatusHint(order) {
    const inflowOwner = fundingOwnerLabel(order, "inflow");
    const outflowOwner = fundingOwnerLabel(order, "outflow");
    const map = {
      "待KYC": "等待本单业务准入通过；准入审核通过后自动进入待客户入款",
      "待客户入款": `可以交易，等待客户 ${fundingKind(order, "inflow") === "chain" ? "转 U" : order.payMethod === "现金" ? "交现金" : "TT 付款"}；${inflowOwner}登记入款后进入待出款排单`,
      "待出款排单": "客户入款已确认、资金已冻结，等待交易员发起出款排单",
      "出款审核中": "出款排单已提交，等待高级交易员审核",
      "待出款执行": `排单已通过，等待${outflowOwner}执行出款`,
      "已完成": "订单已完成闭环",
      "已取消": "订单已终止，重新交易需创建新订单"
    };
    return map[order.status] || "当前状态由对应角色推进。";
  }

  function actionBlock(tone, text, buttons = []) {
    return `<div class="action-block ${tone}"><p>${text}</p>${buttons.length ? `<div class="action-block-buttons">${buttons.join("")}</div>` : ""}</div>`;
  }

  function orderActionBlock(order) {
    const role = state.role;
    const kyc = orderKyc(order);
    const dispatch = orderDispatch(order);
    const inKind = fundingKind(order, "inflow");
    const outKind = fundingKind(order, "outflow");
    const primary = (label, attrs, extra = "") => `<button class="btn btn-sm btn-primary" type="button" ${attrs} ${extra}>${label}</button>`;
    const secondary = (label, attrs) => `<button class="btn btn-sm" type="button" ${attrs}>${label}</button>`;
    const blocks = [];
    if (role === "ops" && order.exception) blocks.push(actionBlock("danger", `附加异常：${escapeHtml(order.exception.reason)}。解除或取消后主线继续推进。`, [secondary("解除异常", `data-exception-restore="${order.id}"`), secondary("取消订单", `data-exception-cancel="${order.id}"`), ...(order.exception.escalated ? [] : [secondary("升级合规", `data-exception-escalate="${order.id}"`)])]));
    if (role === "agent") {
      if (order.status === "待KYC") blocks.push(actionBlock("warning", `等待本单业务准入通过（当前「${kyc.label}」）。上传材料并提交合规审核，通过后订单自动进入待客户入款。`, [primary("前往材料上传", `data-view="materialsUpload"`), secondary("同步 KYC 结果", `data-order-kyc-sync="${order.id}"`), secondary("取消订单", `data-order-cancel="${order.id}"`)]));
      if (order.status === "待客户入款") blocks.push(actionBlock("info", `等待客户${inKind === "chain" ? "转入 USDT" : inKind === "cash" ? "交付现金" : "银行转账"} ${moneyPair(order.sellCurrency, order.sellAmount)}；到账后由${fundingOwnerLabel(order, "inflow")}登记入款并直接推进。`, [secondary("取消订单", `data-order-cancel="${order.id}"`)]));
      if (order.status === "待出款排单") blocks.push(actionBlock("mint", "入款已确认、资金已冻结，可发起出款排单。", [primary("发起出款排单", `data-dispatch-open="${order.id}"`), secondary("取消订单", `data-order-cancel="${order.id}"`)]));
    }
    if (order.status === "待客户入款" && role === fundingOwnerRole(order, "inflow")) {
      blocks.push(actionBlock("warning", `客户入款待你登记（${fundingKindLabel[inKind]}），登记即确认，订单进入待出款排单。`, [primary(inKind === "chain" ? "标记链上入款到账" : inKind === "cash" ? "确认现金交收" : "登记法币入账", `data-inflow-confirm="${order.id}"`)]));
    }
    if (order.status === "待出款执行" && role === fundingOwnerRole(order, "outflow")) {
      blocks.push(actionBlock("mint", outKind === "chain"
        ? `排单审核已通过，可向客户地址转出 ${moneyPair(order.buyCurrency, order.buyAmount)}，并登记交易哈希。`
        : `排单审核已通过，可执行${outKind === "cash" ? "现金交付" : "银行出款"}并归档凭证，登记后订单完成。`,
        [primary(outKind === "chain" ? "登记链上转账" : outKind === "cash" ? "登记现金交付" : "出款登记", `data-outflow-execute="${order.id}"`), secondary("执行异常退回", `data-outflow-return="${order.id}"`), ...(dispatch ? [secondary("查看排单文案", `data-dispatch-view="${dispatch.id}"`)] : [])]));
    }
    if (role === "ops" && order.status === "待出款执行") blocks.push(actionBlock("info", "执行前如出现风险事件，可终止本单并作废排单。", [secondary("风险终止", `data-order-riskstop="${order.id}"`)]));
    if (!blocks.length) blocks.push(actionBlock("info", escapeHtml(orderStatusHint(order))));
    return blocks.join("");
  }

  function renderOrderStageBar(order) {
    if (order.status === "已取消") return `<div class="order-stage-cancelled"><span class="status status-danger">已取消</span><span>订单已取消，未走完主线流程；历史操作见「活动」。</span></div>`;
    const current = orderStageCurrent(order);
    const ratio = Math.min(1, Math.max(0, current / (orderStages.length - 1)));
    return `<div class="order-stage-bar" style="--order-progress:${ratio.toFixed(4)}">${orderStages.map((stage, index) => {
      const meta = orderStageMeta(order, index);
      const stateLabel = index < current ? "已完成" : index === current ? "进行中" : "待开始";
      return `<div class="order-stage ${index < current ? "done" : ""}${index === current ? " active" : ""}"><i>${index < current ? "\u2713" : index + 1}</i><span>${stage}</span><div class="order-stage-tip" role="tooltip"><strong>${stage} · ${stateLabel}</strong><p><b>责任角色</b>${escapeHtml(meta.role)}</p><p><b>本阶段</b>${escapeHtml(meta.desc)}</p><p><b>完成后</b>${escapeHtml(meta.next)}</p></div></div>`;
    }).join("")}</div>`;
  }

  function orderAttrRow(icon, label, value, cls = "") { return `<div class="order-attr-row${cls ? ` ${cls}` : ""}"><span class="order-attr-label"><i>${icon}</i>${label}</span><div class="order-attr-value">${value}</div></div>`; }

  /* 两列属性网格：条目为 [icon, label, value, span?]，span 为 true 时整行占满。
     末尾补齐占位格，避免网格线在空缺处露出背景色。 */
  function orderAttrGrid(items) {
    let half = 0;
    const cells = items.filter(Boolean).map(([icon, label, value, span]) => {
      if (span) { half = 0; return orderAttrRow(icon, label, value, "attr-span"); }
      half = (half + 1) % 2;
      return orderAttrRow(icon, label, value);
    }).join("");
    return `<div class="order-attr-table is-grid">${cells}${half === 1 ? `<div class="order-attr-row attr-filler"></div>` : ""}</div>`;
  }

  function orderRecordRow({ id, statusHtml = "", headline = "", meta = "", body = "", footer = "" }) {
    return `<div class="order-confirm-row"><div class="order-confirm-head"><strong>${id}</strong>${statusHtml}</div>${headline ? `<div class="order-confirm-headline">${headline}</div>` : ""}${meta ? `<small>${meta}</small>` : ""}${body}${footer}</div>`;
  }

  function orderSection(title, content, meta = "") {
    return `<section class="order-section"><div class="order-section-head"><h3>${title}</h3>${meta ? `<span class="order-section-meta">${meta}</span>` : ""}</div>${content}</section>`;
  }

  function fileRow(name, meta, actions = "") {
    const ext = String(name || "").split(".").pop();
    const badge = ext && ext !== name ? ext.toUpperCase().slice(0, 4) : "DOC";
    return `<div class="file-row"><span class="doc-icon">${escapeHtml(badge)}</span><div><strong>${escapeHtml(name || "未命名文件")}</strong><small>${escapeHtml(meta || "")}</small></div>${actions}</div>`;
  }

  function activityGroups(timeline) {
    const groups = [];
    (timeline || []).forEach(item => {
      const time = String(item.time || "");
      const key = /刚刚|今天/.test(time) ? "今天" : /昨天/.test(time) ? "昨天" : (time.match(/\d{4}-\d{2}-\d{2}|\d{2}-\d{2}/) || [time || "更早"])[0];
      let group = groups.find(entry => entry.key === key);
      if (!group) { group = { key, items: [] }; groups.push(group); }
      group.items.push(item);
    });
    return groups;
  }

  function renderOrderActivity(order) {
    const groups = activityGroups(order.timeline);
    if (!groups.length) return `<div class="empty-inline">暂无活动记录</div>`;
    return groups.map(group => `<div class="activity-group"><h4>${escapeHtml(group.key)}</h4>${group.items.map(item => `<div class="activity-item"><i></i><div><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.detail)}</p><time>${escapeHtml(item.role)} · ${escapeHtml(item.time)}</time></div></div>`).join("")}</div>`).join("");
  }

  /* ---------- 资金动作卡片 ---------- */
  function fundingStateTone(state) {
    if (["已到账", "已执行", "已归档"].includes(state)) return "success";
    if (state === "异常") return "danger";
    if (["待到账确认", "待审核", "待执行", "待客户操作", "待排单"].includes(state)) return "warning";
    return "neutral";
  }

  function fundingFields(order, side, info) {
    const mark = info.mark || {};
    const wallet = order.walletOps || {};
    const amount = side === "inflow" ? moneyPair(order.sellCurrency, order.sellAmount) : moneyPair(order.buyCurrency, order.buyAmount);
    /* 客户入款只保留四格：应收数量 / 收款方式（线下、链上、电汇） / 收款凭证 / 收款状态（已收款、未收款） */
    if (side === "inflow") {
      const methodLabel = mark.method || ({ chain: "链上收款", cash: "线下", bank: "电汇" }[info.kind] || info.kindLabel);
      const voucherCell = info.kind === "cash"
        ? (() => { const text = [mark.place, mark.token].filter(Boolean).join(" · "); return text ? escapeHtml(text) : "待登记"; })()
        : mark.voucher
          ? `<button class="link-button voucher-view-link" type="button" data-pdf-preview="${escapeHtml(mark.voucherUrl || "assets/trustpass-stage1-template.pdf")}" data-pdf-name="${escapeHtml(mark.voucher)}" title="点击预览收款凭证">${escapeHtml(mark.voucher)}</button>`
          : mark.hash ? `<span class="mono">${escapeHtml(mark.hash.slice(0, 14))}…</span>` : "待登记";
      const stateLabel = info.state === "异常" ? "异常" : info.state === "已到账" ? "已收款" : "未收款";
      const stateTone = info.state === "异常" ? "danger" : info.state === "已到账" ? "success" : "warning";
      return orderAttrGrid([
        ["◇", "应收数量", `<strong>${amount}</strong>`],
        ["◈", "收款方式", escapeHtml(methodLabel)],
        ["▧", "收款凭证", voucherCell],
        ["◌", "收款状态", `<span class="status status-${stateTone}">${stateLabel}</span>`]
      ]);
    }
    if (info.kind === "bank") return orderAttrGrid([
      ["◇", "应付金额", `<strong>${amount}</strong>`],
      ["◫", "出款账户", escapeHtml(mark.account || "待出款员登记"), true],
      ["◷", "出款时间", escapeHtml(mark.time || "—")],
      ["▧", "水单 / MT103", mark.voucher ? escapeHtml(mark.voucher) : "未上传"]
    ]);
    if (info.kind === "chain") return orderAttrGrid([
      ["◇", "应付数量", `<strong>${amount}</strong>`],
      ["◈", "链 / 网络", escapeHtml(mark.chain || "TRC20")],
      ["◫", "客户收 U 地址", escapeHtml(wallet.payoutAddress || "待客户提供"), true],
      ["✓", "地址 KYA", `<span class="status status-${wallet.kya === "通过" ? "success" : wallet.kya === "不通过" ? "danger" : "warning"}">${escapeHtml(wallet.kya || "待核查")}</span>`],
      ["≣", "交易哈希", mark.hash ? `<span class="mono order-hash">${escapeHtml(mark.hash)}</span>` : "—", true],
      ["◌", "区块确认数", mark.confirms ? `${escapeHtml(String(mark.confirms))} 次确认` : "—"],
      ["▧", "链上截图", mark.voucher ? escapeHtml(mark.voucher) : "未上传"]
    ]);
    return orderAttrGrid([
      ["◇", "应付现金", `<strong>${amount}</strong>`],
      ["◫", "交收地点", escapeHtml(mark.place || "待登记"), true],
      ["◍", "交收人", escapeHtml(mark.handler || "待登记")],
      ["≣", "信物编号", escapeHtml(mark.token || "—")],
      ["◷", "确认时间", escapeHtml(mark.time || "—")]
    ]);
  }

  function fundingActions(order, side, info) {
    const role = state.role;
    const btn = (label, attrs, primary = true) => `<button class="btn btn-sm ${primary ? "btn-primary" : ""}" type="button" ${attrs}>${label}</button>`;
    const buttons = [];
    if (side === "inflow") {
      if (info.kind === "chain" && role === "wallet" && !order.walletOps?.depositAddress) buttons.push(btn("提供公司收 U 地址", `data-wallet-deposit="${order.id}"`));
      if (info.state === "待到账确认" && role === info.owner) buttons.push(btn(info.kind === "chain" ? "标记链上入款到账" : info.kind === "cash" ? "确认现金交收" : "确认法币入账", `data-inflow-confirm="${order.id}"`));
      if (info.state === "待到账确认" && role === info.owner) buttons.push(btn("入款异常", `data-inflow-reject="${order.id}"`, false));
    } else {
      if (info.kind === "chain" && role === "wallet" && order.walletOps?.kya !== "通过" && ["待客户入款", "待出款排单", "待出款执行"].includes(order.status)) buttons.push(btn("登记客户地址并 KYA", `data-wallet-kya="${order.id}"`));
      if (info.state === "待执行" && role === info.owner) buttons.push(btn(info.kind === "chain" ? "登记链上转账" : info.kind === "cash" ? "登记现金交付" : "执行银行出款", `data-outflow-execute="${order.id}"`));
    }
    return buttons.length ? `<div class="case-actions funding-actions">${buttons.join("")}</div>` : "";
  }

  function renderFundingCard(order, side) {
    const info = fundingState(order, side);
    const title = side === "inflow" ? "客户入款" : "平台出款";
    const done = ["已到账", "已执行", "已归档"].includes(info.state);
    return `<section class="funding-card ${done ? "is-done" : ""} ${info.state === "异常" ? "is-error" : ""}">
      <header class="funding-card-head">
        <div><span class="funding-card-title">${title}</span><em class="funding-kind ${info.kind}">${info.kindLabel}</em></div>
        <span class="status status-${fundingStateTone(info.state)}">${info.state}</span>
      </header>
      <p class="funding-owner">责任人：<strong>${escapeHtml(info.ownerLabel)}</strong>${info.mark?.by ? ` · 已由 ${escapeHtml(info.mark.by)} 于 ${escapeHtml(info.mark.at || "")} 标记` : ""}</p>
      ${fundingFields(order, side, info)}
      ${fundingActions(order, side, info)}
    </section>`;
  }

  /* ---------- 资金动作：执行 ---------- */
  function actorLabel() { return `${roles[state.role].label} ${roles[state.role].name}`; }

  /* 表4 新增路径：交易员在 待KYC/待客户入款/待出款排单 可取消；审核与执行阶段可风险终止；执行前异常退回重排 */
  function cancelTradeOrder(orderId, riskStop = false) {
    const order = findOrder(orderId);
    if (!order) return;
    const cancellable = riskStop ? ["出款审核中", "待出款执行"] : ["待KYC", "待客户入款", "待出款排单"];
    if (!cancellable.includes(order.status)) return;
    showConfirm(riskStop ? `风险终止订单 ${order.id}？` : `取消订单 ${order.id}？`,
      `${order.customerName} · ${moneyPair(order.sellCurrency, order.sellAmount)} → ${moneyPair(order.buyCurrency, order.buyAmount)}。${order.freeze ? "已冻结资金将释放；" : ""}取消后重新交易需创建新订单。`,
      riskStop ? "终止原因" : "取消原因", riskStop ? "风险事件，终止出款" : "客户暂缓交易", riskStop ? "确认终止" : "确认取消", note => {
      releaseOrderFunds(order, riskStop ? "风险终止，释放冻结资金" : "订单取消，释放冻结资金");
      if (order.dispatchId) {
        const dispatch = state.payoutOrders.find(item => item.id === order.dispatchId);
        if (dispatch && !["已出款"].includes(dispatch.status)) { dispatch.status = "已作废"; dispatch.updated = "刚刚"; }
      }
      order.status = "已取消";
      order.exception = null;
      orderLog(order, riskStop ? "风险终止" : "订单取消", note || (riskStop ? "风险终止 / 排单作废" : "交易员取消订单"));
      render();
      toast(riskStop ? "订单已风险终止" : "订单已取消", `${order.id} 已关闭${order.freeze ? "，冻结资金已释放" : ""}`);
    });
  }

  function returnOutflowExecution(orderId) {
    const order = findOrder(orderId);
    if (!order || order.status !== "待出款执行") return;
    showConfirm(`执行异常退回 ${order.id}？`, "执行前发现账户错误、地址 KYA 失败或通道不可用时，订单退回待出款排单重新准备。", "异常原因", "收款账户信息有误", "确认退回", note => {
      const dispatch = order.dispatchId ? state.payoutOrders.find(item => item.id === order.dispatchId) : null;
      if (dispatch) { state.payoutOrders = state.payoutOrders.filter(item => item.id !== dispatch.id); }
      order.dispatchId = "";
      order.status = "待出款排单";
      order.dispatchRejected = { reason: note || "执行异常，需重新排单", by: actorLabel(), time: "刚刚" };
      orderLog(order, "执行异常退回", `${note || "账户错误 / KYA 失败 / 通道不可用"}，订单回到待出款排单`);
      render();
      toast("已退回待出款排单", `${order.id} 需重新发起排单`);
    });
  }

  function syncOrderKyc(orderId) {
    const order = findOrder(orderId);
    if (!order || order.status !== "待KYC") return;
    const customer = state.customers.find(item => item.id === order.customerId);
    if (!customerComplianceReady(customer)) { toast("KYC 仍未通过", `${customer?.name || order.customerName} 当前「${kycStatusInfo(customer).label}」，请先在业务准入完成审核`); return; }
    order.status = "待客户入款";
    orderLog(order, "KYC 审核通过", `客户 KYC 已通过，进入待客户入款（入款登记人：${fundingOwnerLabel(order, "inflow")}）`);
    render();
    toast("KYC 已通过", `${order.id} 进入待客户入款`);
  }

  function walletSetDepositAddress(orderId) {
    const order = findOrder(orderId);
    if (!order) return;
    showConfirm(`提供公司收 U 地址 · ${order.id}`, `${order.customerName} · 应收 ${moneyPair(order.sellCurrency, order.sellAmount)}。地址将同步给交易员转交客户。`, "收 U 地址（TRC20）", "TXYZab8Kd3Np9QsRvW2mHc7Lf5Ug1Ye4Tz", "确认提供", value => {
      order.walletOps = { ...(order.walletOps || {}), depositAddress: value.trim(), depositBy: roles.wallet.name, depositAt: dispatchNowLabel() };
      orderLog(order, "提供公司收 U 地址", `${value.trim()} · 由钱包运营登记`);
      render();
      toast("收 U 地址已提供", `${order.id} 可通知客户转入`);
    });
  }

  function walletKyaAddress(orderId) {
    const order = findOrder(orderId);
    if (!order) return;
    showConfirm(`登记客户收 U 地址并做 KYA · ${order.id}`, `${order.customerName} · 应付 ${moneyPair(order.buyCurrency, order.buyAmount)}。KYA 通过后才能执行链上出款。`, "客户收 U 地址", order.walletOps?.payoutAddress || "TQm4Rf7Xb2Vd9Kc1Ns6Hp3Lw8Zy5Ge0Ur", "KYA 通过", value => {
      order.walletOps = { ...(order.walletOps || {}), payoutAddress: value.trim(), kya: "通过", kyaBy: roles.wallet.name, kyaAt: dispatchNowLabel() };
      orderLog(order, "客户地址 KYA 通过", `${value.trim()} · 白名单校验通过，建议先做小额测试`);
      render();
      toast("地址 KYA 已通过", `${order.id} 可执行链上出款`);
    });
  }

  function openFundingModal(orderId, side) {
    const order = findOrder(orderId);
    if (!order) return;
    const info = fundingState(order, side);
    if (state.role !== info.owner) { toast("无操作权限", `该动作由${info.ownerLabel}执行`); return; }
    const amount = side === "inflow" ? String(order.sellAmount) : String(order.buyAmount);
    state.fundingModal = { orderId, side, kind: info.kind, amount, account: "", time: dispatchNowLabel(), voucher: "", chain: "TRC20", hash: "", confirms: "20", place: "", handler: "", token: "", method: info.kind === "chain" ? "链上收款" : "电汇转账", note: "", error: "" };
    renderDispatchModal();
  }

  function submitFundingModal() {
    const modal = state.fundingModal;
    if (!modal) return;
    $$('[data-funding-field]').forEach(el => { modal[el.dataset.fundingField] = el.value; });
    const order = findOrder(modal.orderId);
    if (!order) { state.fundingModal = null; render(); return; }
    if (modal.kind === "chain" && !modal.hash.trim()) { modal.error = "请填写 Transaction Hash"; renderDispatchModal(); return; }
    if (modal.kind === "bank" && modal.side === "outflow" && !modal.account.trim()) { modal.error = "请填写出款账户"; renderDispatchModal(); return; }
    if (modal.kind === "cash" && !modal.place.trim()) { modal.error = "请填写交收地点"; renderDispatchModal(); return; }
    const mark = { by: roles[state.role].name, at: dispatchNowLabel(), account: modal.account.trim(), time: modal.time, voucher: modal.voucher, voucherUrl: modal.voucherUrl || "", chain: modal.chain, hash: modal.hash.trim(), confirms: modal.confirms, place: modal.place.trim(), handler: modal.handler.trim(), token: modal.token.trim(), method: modal.method || "", note: (modal.note || "").trim() };
    const inflowAmountLabel = modal.side === "inflow" ? moneyPair(findOrder(modal.orderId)?.sellCurrency || "", modal.amount) : "";
    const detail = (modal.kind === "chain" ? (modal.side === "inflow" ? `链上收款 · 实际到账 ${inflowAmountLabel} · 哈希 ${mark.hash.slice(0, 16)}…` : `链上哈希 ${mark.hash}（${mark.chain} · ${mark.confirms} 次确认）`)
      : modal.kind === "cash" ? `现金交收 ${mark.place}${mark.handler ? ` · 交收人 ${mark.handler}` : ""}${mark.token ? ` · 信物 ${mark.token}` : ""}`
      : modal.side === "inflow" ? `实收 ${inflowAmountLabel} · ${mark.method || "电汇转账"}${mark.voucher ? ` · 凭证 ${mark.voucher}` : ""}`
      : `账户 ${mark.account}${mark.voucher ? ` · 凭证 ${mark.voucher}` : ""}`) + (modal.side === "inflow" && mark.note ? ` · 说明：${mark.note}` : "");
    state.fundingModal = null;
    if (modal.side === "inflow") {
      order.inflowMark = mark;
      orderLog(order, modal.kind === "chain" ? "链上入款已到账" : modal.kind === "cash" ? "现金交收已确认" : "法币入款已到账", `${detail} · 由${actorLabel()}标记`);
      const pending = orderPayments(order).find(item => ["待确认", "待补凭证"].includes(item.status));
      if (pending) { reviewPayment(pending.id, "confirm"); return; }
      const customer = state.customers.find(item => item.id === order.customerId);
      if (customer && !customerComplianceReady(customer)) { toast("客户 KYC 未通过", "KYC 通过后才能确认到账"); render(); return; }
      freezeOrderFunds(order);
      order.status = "待出款排单";
      order.handler = roles.agent.name;
      orderLog(order, "入款登记确认", `冻结 ${moneyPair(order.buyCurrency, order.buyAmount)}，进入待出款排单`);
      render();
      toast("入款已登记确认", `${order.id} 进入待出款排单`);
      return;
    }
    order.outflowMark = { ...mark, archived: true };
    const dispatch = orderDispatch(order);
    if (dispatch && dispatch.status === "待出款") {
      dispatch.status = "已出款";
      dispatch.paidBy = roles[state.role].name;
      dispatch.paidAt = dispatchNowLabel();
      dispatch.updated = "刚刚";
      dispatch.receipt = { fileName: mark.voucher || (mark.hash ? `${mark.hash.slice(0, 12)}…` : "手工登记"), fileUrl: "", reference: mark.hash || mark.account, note: detail, uploadedBy: roles[state.role].name, uploadedAt: dispatchNowLabel(), matched: false };
    }
    completeTradeOrder(order, dispatch);
    orderLog(order, modal.kind === "chain" ? "链上出款已完成" : modal.kind === "cash" ? "现金出款已交付" : "银行出款已完成", `${detail} · 由${actorLabel()}执行并归档`);
    render();
    toast(modal.kind === "chain" ? "链上转账已登记" : "出款已执行", `${order.id} 凭证已归档，订单完成`);
  }

  function rejectOrderInflow(orderId) {
    const order = findOrder(orderId);
    if (!order) return;
    showConfirm(`标记入款异常 · ${order.id}`, `${order.customerName} · 应收 ${moneyPair(order.sellCurrency, order.sellAmount)}。订单将转入异常处理，主线暂停。`, "异常说明", "实际到账金额与应收不符", "确认标记", note => {
      setOrderException(order, "业务异常", "金额不符", note || "入款金额与应收不符");
      render();
      toast("已标记入款异常", `${order.id} 转入异常处理`);
    });
  }

  function renderOrderPanelBody(order) {
    let tab = state.orderPanelTab || "payment";
    if (!["payment", "payout", "execution", "activity"].includes(tab)) tab = "payment";
    const role = state.role;
    const payments = orderPayments(order);
    const dispatch = orderDispatch(order);
    const customer = state.customers.find(item => item.id === order.customerId);
    const kyc = orderKyc(order);
    const active = !["已完成", "已取消"].includes(order.status);
    const pendingPayments = payments.filter(item => ["待确认", "待补凭证"].includes(item.status));
    const confirmedPayment = payments.find(item => item.status === "已到账");
    const multiPending = payments.filter(item => item.status === "待确认").length > 1;
    if (tab === "activity") return `<div class="order-panel-block">${orderSection("活动", renderOrderActivity(order), `${(order.timeline || []).length} 条记录`)}</div>`;
    if (tab === "payment") {
      return `<div class="order-panel-block">
      ${!kyc.ready && active ? `<div class="form-warning">⚠ 当前客户 KYC 未通过（${kyc.label}），可继续创建订单和登记交易意向，但不能确认到账。${kyc.label === "需补件" ? "请先在业务准入完成补件。" : ""}</div>` : ""}
      ${order.exception ? `<div class="form-error">附加异常：${order.exception.kind} · ${escapeHtml(order.exception.reason)} — ${escapeHtml(order.exception.detail)}${order.exception.escalated ? "（已升级合规）" : ""}</div>` : ""}
      ${order.paymentRejected ? `<div class="form-error">付款被驳回：${escapeHtml(order.paymentRejected.reason)}（${escapeHtml(order.paymentRejected.by)} · ${escapeHtml(order.paymentRejected.time)}），请重新登记付款。</div>` : ""}
      ${orderSection("资金动作", `<div class="funding-grid funding-grid-single">${renderFundingCard(order, "inflow")}</div>`, "客户入款")}
      </div>`;
    }
    if (tab === "payout") {
      const sgb = treasuryAccount("bank-SGB-USD");
      const sino = treasuryAccount("bank-SINO-USD");
      const profit = order.profit;
      return `<div class="order-panel-block">
        ${orderSection("出款排单", `
        ${order.dispatchRejected ? `<div class="form-error">出款审核驳回：${escapeHtml(order.dispatchRejected.reason)}（${escapeHtml(order.dispatchRejected.by)} · ${escapeHtml(order.dispatchRejected.time)}），请重新发起排单。</div>` : ""}
        ${dispatch ? `<div class="dispatch-inline-head"><strong class="mono">${dispatch.id}</strong><span class="trade-type-tag">${escapeHtml(dispatch.channel)} 通道</span><small>${escapeHtml(`${dispatch.submittedBy || ""} · ${dispatch.submittedAt || ""} 提交`)}</small></div>
        <pre class="schedule-preview dispatch-inline-text">${escapeHtml(dispatch.finalText || composeDispatchText(dispatch))}</pre>` : order.status === "待出款排单" ? `<div class="order-channel-strip"><div><span>SGB 通道可用</span><strong>${sgb ? `USD ${fmtMoney(sgb.available)}` : "—"}</strong></div><div><span>SINO 通道可用</span><strong>${sino ? `USD ${fmtMoney(sino.available)}` : "—"}</strong></div><div><span>应付出款</span><strong>${moneyPair(order.buyCurrency, order.buyAmount)}</strong></div></div>${role === "agent" ? "" : `<div class="empty-inline">等待交易员在订单内发起排单。</div>`}` : `<div class="empty-inline">收款确认后进入排单环节。</div>`}
        `)}
        ${orderSection("出款审核", `
        ${dispatch && order.status === "出款审核中" ? orderRecordRow({
          id: dispatch.id,
          statusHtml: `<span class="status status-info">出款审核中</span>`,
          headline: `${dispatch.currency} ${dispatch.amount}`,
          meta: `${escapeHtml(dispatch.channel)} 通道 · 收款 ${escapeHtml(dispatch.payee)}`,
          footer: role === "ops"
            ? `<div class="case-actions"><button class="btn btn-sm btn-primary" type="button" data-dispatch-approve="${dispatch.id}">审核通过</button><button class="btn btn-sm" type="button" data-dispatch-return="${dispatch.id}">驳回</button></div>`
            : `<span class="muted-small">等待高级交易员给出 审核通过 / 驳回 结论</span>`
        }) : dispatch?.reviewedAt ? `<div class="order-panel-note"><span class="payout-check">审核通过</span> ${escapeHtml(`${dispatch.reviewedBy || ""} · ${dispatch.reviewedAt || ""}`)}</div>` : `<div class="empty-inline">排单提交后进入出款审核。</div>`}`)}
        ${orderSection("库存影响", order.freeze ? orderAttrGrid([
          ["◈", "冻结账户", escapeHtml(order.freeze.accountName), true],
          ["◇", "冻结金额", moneyPair(order.freeze.currency, order.freeze.amount)],
          ["◌", "冻结状态", `<span class="status status-${statusTone(order.freeze.state === "已冻结" ? "等待" : order.freeze.state)}">${order.freeze.state}</span>`]
        ]) : `<div class="empty-inline">收款确认后自动冻结应付资金。</div>`)}
      </div>`;
    }
    if (tab === "execution") {
      const profit = order.profit;
      return `<div class="order-panel-block">
        ${orderSection("资金动作", `<div class="funding-grid funding-grid-single">${renderFundingCard(order, "outflow")}</div>`, "平台出款")}
        ${orderSection("出款执行", `
        ${dispatch && order.status === "待出款执行" ? orderRecordRow({
          id: dispatch.id,
          statusHtml: `<span class="status status-warning">待出款</span>`,
          headline: `${dispatch.currency} ${dispatch.amount}`,
          meta: `收款 ${escapeHtml(dispatch.payee)} · ${escapeHtml(dispatch.payeeBank || "")}`,
          footer: role === "payout" ? "" : `<span class="muted-small">等待出款员执行</span>`
        }) : dispatch?.receipt ? fileRow(dispatch.receipt.fileName || "手工登记回单", `出款回单${dispatch.receipt.reference ? ` · ${dispatch.receipt.reference}` : ""} · ${dispatch.paidBy || ""} · ${dispatch.paidAt || ""}`, `<span class="status status-${dispatch.receipt.matched ? "success" : "warning"}">${dispatch.receipt.matched ? "已匹配" : "待匹配"}</span>`) : `<div class="empty-inline">出款审核通过后由出款员执行。</div>`}`)}
        ${profit ? orderSection("佣金与收益", `<div class="order-profit">
          <div class="order-profit-rows">
            <div><span>汇差收益</span><b>${moneyPair(profit.currency, profit.spread)}</b></div>
            <div><span>手续费</span><b>${moneyPair(profit.currency, profit.fee)}</b></div>
            <div class="is-cost"><span>渠道成本</span><b>− ${moneyPair(profit.currency, profit.channelCost)}</b></div>
            <div class="is-cost"><span>交易员佣金</span><b>− ${moneyPair(profit.currency, profit.commission)}</b></div>
          </div>
          <div class="order-profit-net"><span>净收益</span><strong>${moneyPair(profit.currency, profit.net)}</strong></div>
        </div>`) : ""}
      </div>`;
    }
    return "";
  }

  function renderOrderPanel(order) {
    const customer = state.customers.find(item => item.id === order.customerId);
    const kyc = orderKyc(order);
    let tab = state.orderPanelTab || "payment";
    if (!["payment", "payout", "execution", "activity"].includes(tab)) tab = "payment";
    const tabs = [["payment", "收款"], ["payout", "出款排单"], ["execution", "出款"], ["activity", "活动"]];
    return `<div class="order-panel-backdrop" id="order-panel-backdrop"></div>
    <aside class="order-panel" role="dialog" aria-label="订单详情">
      <header class="order-panel-head">
        <div class="order-panel-topline"><span class="eyebrow">TRADE ORDER · ${escapeHtml(order.tradeType)} · ${order.id}</span><div class="order-panel-icons"><button class="icon-button" type="button" title="关注订单">☆</button><button class="icon-button" type="button" title="更多操作">⋯</button><button class="icon-button" id="order-back" type="button" aria-label="关闭订单详情">×</button></div></div>
        <div class="order-panel-title"><h2>${customer ? `<button class="order-title-link" type="button" data-open-customer="${customer.id}">${escapeHtml(`${order.customerName}（${order.clientNo}）`)}</button>` : escapeHtml(`${order.customerName}（${order.clientNo}）`)}</h2>${orderStatusPill(order.status)}${orderFlagBadges(order)}</div>
        <p class="order-panel-hint"><span>${escapeHtml(orderStatusHint(order))}</span><time>创建 ${escapeHtml(order.createdAt)}</time></p>
        <div class="order-trade-hero">
          <div class="order-trade-row">
            <div class="order-trade-cell"><span>客户类型</span><strong>${customer ? escapeHtml(customerKind(customer)) : "—"}</strong></div>
            <div class="order-trade-cell"><span>KYC 状态</span><span class="status status-${kyc.tone}">${kyc.label}</span></div>
            <div class="order-trade-rate"><span>执行汇率</span><b class="mono">${escapeHtml(order.rate)}</b><em>${escapeHtml(order.payMethod)}</em></div>
          </div>
          <div class="order-trade-legs">
            <div class="order-trade-leg"><span>客户卖出</span><strong>${moneyPair(order.sellCurrency, order.sellAmount)}</strong></div>
            <i aria-hidden="true">→</i>
            <div class="order-trade-leg"><span>客户买入</span><strong>${moneyPair(order.buyCurrency, order.buyAmount)}</strong></div>
          </div>
          <div class="order-trade-remark"><span>备注说明</span>${order.remark ? `<p>${escapeHtml(order.remark)}</p>` : `<p class="order-trade-remark-empty">创建订单时未填写说明</p>`}</div>
        </div>
        ${renderOrderStageBar(order)}
      </header>
      <div class="order-panel-scroll">
        <div class="order-panel-tabs">${tabs.map(([key, label]) => `<button type="button" class="${tab === key ? "active" : ""}" data-order-panel-tab="${key}">${label}</button>`).join("")}</div>
        ${renderOrderPanelBody(order)}
      </div>
      <footer class="order-panel-actions">${orderActionBlock(order)}</footer>
    </aside>`;
  }

  /* ---------- 客户付款 / 付款审核 ---------- */

  /* ---------- 异常处理 / 异常监控 ---------- */

  function exceptionOrders() { return state.tradeOrders.filter(order => order.exception && order.status !== "已取消"); }

  function renderExceptionCenter() {
    if (state.role !== "ops") return `<div class="page">${pageHeader("EXCEPTIONS", "异常处理", "当前角色不能处理异常。")}<div class="empty-state"><div><i>锁</i><h2>无处理权限</h2><p>请切换至高级交易员处理异常订单。</p></div></div></div>`;
    const rows = exceptionOrders();
    const biz = rows.filter(order => order.exception?.kind === "业务异常");
    const comp = rows.filter(order => order.exception?.kind === "合规异常");
    return `<div class="page">${pageHeader("EXCEPTIONS", "异常处理", "业务异常（金额不符、出款失败、排单退回、库存不足）与合规异常（高风险客户、可疑交易、制裁/PEP 命中）在此处理。")}
      <section class="metric-strip">${metric("异常订单", String(rows.length), "待处理", "▲")}${metric("业务异常", String(biz.length), "金额/排单/库存", "!")}${metric("合规异常", String(comp.length), "高风险/可疑", "◌")}${metric("已解决（累计）", String(state.exceptionResolvedCount), "恢复或取消", "✓")}</section>
      ${rows.length ? `<div class="data-table-wrap"><table class="data-table"><thead><tr><th>订单</th><th>异常类型</th><th>原因与说明</th><th>涉及金额</th><th>发生时间</th><th>合规升级</th><th>处理</th></tr></thead><tbody>
      ${rows.map(order => `<tr><td><button class="link-button" type="button" data-order-open="${order.id}">${order.id}</button><div class="muted-small">${escapeHtml(order.customerName)}</div></td><td><span class="status status-${order.exception.kind === "合规异常" ? "danger" : "warning"}">${order.exception.kind}</span></td><td><strong>${escapeHtml(order.exception.reason)}</strong><div class="muted-small">${escapeHtml(order.exception.detail)}</div></td><td>${moneyPair(order.sellCurrency, order.sellAmount)}</td><td class="muted">${escapeHtml(order.exception.since)}</td><td>${order.exception.escalated ? `<span class="status status-info">已升级合规</span>` : `<span class="muted">未升级</span>`}</td><td><div class="case-actions"><button class="btn btn-sm btn-primary" type="button" data-exception-restore="${order.id}">恢复订单</button><button class="btn btn-sm" type="button" data-exception-cancel="${order.id}">取消订单</button>${order.exception.escalated ? "" : `<button class="btn btn-sm" type="button" data-exception-escalate="${order.id}">升级合规</button>`}</div></td></tr>`).join("")}
      </tbody></table></div>` : `<div class="empty-state"><div><i>✓</i><h2>暂无异常订单</h2><p>付款金额不符、可疑交易等会自动进入这里。</p></div></div>`}
    </div>`;
  }

  function renderExceptionMonitor() {
    if (state.role !== "manager") return `<div class="page">${pageHeader("EXCEPTION MONITOR", "异常监控", "当前角色不能查看异常监控。")}<div class="empty-state"><div><i>锁</i><h2>无查看权限</h2></div></div></div>`;
    const rows = exceptionOrders();
    const amountAtRisk = rows.reduce((sum, order) => sum + (order.sellCurrency === "USD" ? order.sellAmount : Math.round(order.sellAmount / 7.8)), 0);
    return `<div class="page">${pageHeader("EXCEPTION MONITOR", "异常监控", "汇总业务异常与合规异常，跟踪金额风险、升级与解决进度。")}
      <section class="metric-strip">${metric("异常订单数", String(rows.length), "当前未解决", "▲")}${metric("金额风险", `$ ${fmtMoney(amountAtRisk)}`, "折算 USD", "!")}${metric("待升级合规", String(rows.filter(order => !order.exception?.escalated && order.exception?.kind === "合规异常").length), "需合规复核", "◌")}${metric("已解决（累计）", String(state.exceptionResolvedCount), "恢复或取消", "✓")}</section>
      ${rows.length ? `<div class="data-table-wrap"><table class="data-table"><thead><tr><th>订单</th><th>客户</th><th>异常类型</th><th>原因</th><th>金额</th><th>发生时间</th><th>当前处理</th></tr></thead><tbody>
      ${rows.map(order => `<tr><td><button class="link-button" type="button" data-order-open="${order.id}">${order.id}</button></td><td>${escapeHtml(order.customerName)}</td><td><span class="status status-${order.exception.kind === "合规异常" ? "danger" : "warning"}">${order.exception.kind}</span></td><td>${escapeHtml(order.exception.reason)}</td><td>${moneyPair(order.sellCurrency, order.sellAmount)}</td><td class="muted">${escapeHtml(order.exception.since)}</td><td>${order.exception.escalated ? "合规复核中" : "高级交易员处理中"}</td></tr>`).join("")}
      </tbody></table></div>` : `<div class="empty-state"><div><i>✓</i><h2>暂无异常</h2></div></div>`}
    </div>`;
  }

  /* ---------- 出款记录 / 凭证匹配 ---------- */

  function renderPayoutRecords() {
    const paid = state.payoutOrders.filter(item => item.status === "已出款");
    return `<div class="page">${pageHeader("PAYOUT RECORDS", "出款记录", "已完成打款并归档水单的排单，全部可通过订单编号追溯。")}
      <div class="data-table-wrap"><table class="data-table"><thead><tr><th>排单编号</th><th>关联订单</th><th>客户</th><th>出款金额</th><th>通道</th><th>出款人 / 时间</th><th>水单</th><th>操作</th></tr></thead><tbody>
      ${paid.length ? paid.map(item => `<tr><td><strong class="mono">${item.id}</strong></td><td>${item.orderId ? `<button class="link-button" type="button" data-order-open="${item.orderId}">${item.orderId}</button>` : "—"}</td><td>${escapeHtml(item.customerName)}</td><td>${escapeHtml(`${item.currency} ${item.amount}`)}</td><td>${escapeHtml(item.channel)}</td><td class="muted">${escapeHtml(`${item.paidBy || ""} · ${item.paidAt || ""}`)}</td><td>${item.receipt ? `${escapeHtml(item.receipt.fileName || "手工登记")}${item.receipt.matched ? ` <span class="status status-success">已匹配</span>` : ` <span class="status status-warning">待匹配</span>`}` : "—"}</td><td><button class="btn btn-sm" type="button" data-dispatch-view="${item.id}">查看文案</button></td></tr>`).join("") : `<tr><td colspan="8"><div class="empty-inline">暂无出款记录</div></td></tr>`}
      </tbody></table></div></div>`;
  }

  function renderReceiptMatching() {
    const paymentRows = state.payments.filter(item => item.voucherName).map(item => ({ kind: "payment", id: item.id, name: item.voucherName, type: "付款凭证", orderId: item.orderId, customer: item.customerName, amount: moneyPair(item.currency, item.amount), target: item.method === "USDT 转入" ? "链上记录" : "银行流水", state: item.status === "金额不符" ? "异常" : item.matched ? "已匹配" : item.status === "待确认" ? "待审核" : "待匹配" }));
    const receiptRows = state.payoutOrders.filter(item => item.receipt).map(item => ({ kind: "receipt", id: item.id, name: item.receipt.fileName || "手工登记", type: "出款凭证", orderId: item.orderId || "", customer: item.customerName, amount: `${item.currency} ${item.amount}`, target: "银行流水", state: item.receipt.matched ? "已匹配" : "待匹配" }));
    const rows = [...paymentRows, ...receiptRows];
    const pendingCount = rows.filter(row => row.state === "待匹配").length;
    return `<div class="page">${pageHeader("PAYMENT MATCHING", "凭证匹配", "把付款凭证 / 出款水单与订单、银行流水、链上记录匹配；匹配结果写入订单时间线。")}
      <section class="metric-strip">${metric("全部凭证", String(rows.length), "付款 + 出款", "▧")}${metric("待匹配", String(pendingCount), "需核对", "◷")}${metric("已匹配", String(rows.filter(row => row.state === "已匹配").length), "已写入订单时间线", "✓")}${metric("异常", String(rows.filter(row => row.state === "异常").length), "金额不符等", "!")}</section>
      <div class="data-table-wrap"><table class="data-table"><thead><tr><th>凭证</th><th>类型</th><th>关联订单</th><th>客户</th><th>金额</th><th>匹配目标</th><th>状态</th><th>匹配处理</th></tr></thead><tbody>
      ${rows.map(row => `<tr><td><strong>${escapeHtml(row.name)}</strong><div class="muted-small">${row.id}</div></td><td>${row.type}</td><td>${row.orderId ? `<button class="link-button" type="button" data-order-open="${row.orderId}">${row.orderId}</button>` : "—"}</td><td>${escapeHtml(row.customer)}</td><td>${escapeHtml(row.amount)}</td><td>${row.target}</td><td><span class="status status-${statusTone(row.state === "待匹配" ? "等待" : row.state)}">${row.state}</span></td><td>${row.state === "待匹配" ? `<button class="btn btn-sm btn-primary" type="button" data-voucher-match="${row.kind}:${row.id}">标记匹配</button>` : "—"}</td></tr>`).join("")}
      </tbody></table></div></div>`;
  }

  /* ---------- 账务流水 / 库存 / 对账 / 资金管理 / 盈利 ---------- */

  const ledgerBizTypes = ["全部类型", "收款", "出款", "冻结", "释放", "消耗", "手续费", "汇差", "佣金", "补仓", "调仓", "修正", "冲正"];

  function renderWalletRecords() {
    if (state.role !== "wallet") return `<div class="page">${pageHeader("WALLET RECORDS", "哈希与凭证", "当前角色不能查看钱包记录。")}<div class="empty-state"><div><i>锁</i><h2>无查看权限</h2></div></div></div>`;
    const rows = state.tradeOrders.filter(order => order.walletOps || (order.inflowMark?.hash) || (order.outflowMark?.hash));
    return `<div class="page">${pageHeader("WALLET RECORDS", "哈希与凭证", "钱包运营登记的收 U 地址、地址 KYA 结果与链上出入款哈希，全部按订单编号归档。")}
      <section class="metric-strip">${metric("已提供收 U 地址", String(state.tradeOrders.filter(order => order.walletOps?.depositAddress).length), "公司收款地址", "◈")}${metric("已 KYA 地址", String(state.tradeOrders.filter(order => order.walletOps?.kya === "通过").length), "白名单通过", "✓")}${metric("链上入款哈希", String(state.tradeOrders.filter(order => order.inflowMark?.hash).length), "已归档", "≣")}${metric("链上出款哈希", String(state.tradeOrders.filter(order => order.outflowMark?.hash).length), "已归档", "◌")}</section>
      <div class="data-table-wrap"><table class="data-table"><thead><tr><th>订单</th><th>客户</th><th>方向</th><th>地址</th><th>KYA</th><th>交易哈希</th><th>确认数 / 时间</th></tr></thead><tbody>
      ${rows.length ? rows.flatMap(order => {
        const wallet = order.walletOps || {};
        const list = [];
        if (fundingKind(order, "inflow") === "chain") list.push(["客户入 U", wallet.depositAddress || "待提供", "—", order.inflowMark?.hash || "", order.inflowMark]);
        if (fundingKind(order, "outflow") === "chain") list.push(["平台出 U", wallet.payoutAddress || "待登记", wallet.kya || "待核查", order.outflowMark?.hash || "", order.outflowMark]);
        return list.map(([dir, addr, kya, hash, mark]) => `<tr><td><button class="link-button" type="button" data-order-open="${order.id}">${order.id}</button></td><td>${escapeHtml(order.customerName)}</td><td>${dir}</td><td class="mono order-hash">${escapeHtml(addr)}</td><td>${kya === "—" ? "—" : `<span class="status status-${kya === "通过" ? "success" : kya === "不通过" ? "danger" : "warning"}">${escapeHtml(kya)}</span>`}</td><td class="mono order-hash">${hash ? escapeHtml(hash) : "—"}</td><td class="muted">${escapeHtml(mark ? `${mark.confirms || "—"} 次 · ${mark.at || ""}` : "—")}</td></tr>`);
      }).join("") : `<tr><td colspan="7"><div class="empty-inline">暂无钱包登记记录</div></td></tr>`}
      </tbody></table></div></div>`;
  }

  function renderLedgerCenter() {
    if (!["finance", "manager"].includes(state.role)) return `<div class="page">${pageHeader("LEDGER", "账务流水", "当前角色不能查看账务流水。")}<div class="empty-state"><div><i>锁</i><h2>无查看权限</h2></div></div></div>`;
    const rows = state.ledger.filter(entry => {
      const keyword = String(state.ledgerQuery || "").trim().toLowerCase();
      if (keyword && !`${entry.id} ${entry.orderId} ${entry.customerName} ${entry.account}`.toLowerCase().includes(keyword)) return false;
      if (state.ledgerBizFilter !== "全部类型" && entry.bizType !== state.ledgerBizFilter) return false;
      return true;
    });
    return `<div class="page">${pageHeader("LEDGER", "账务流水", "每一个影响资金的动作都会生成流水：收款、出款、冻结、释放、消耗、手续费、汇差、佣金、补仓、冲正。")}
      <div class="toolbar"><label class="search-control">⌕<input id="ledger-search" placeholder="搜索流水号 / 订单号 / 客户 / 账户" value="${escapeHtml(state.ledgerQuery)}" /></label><select class="select-control" id="ledger-biz-filter">${ledgerBizTypes.map(type => `<option ${state.ledgerBizFilter === type ? "selected" : ""}>${type}</option>`).join("")}</select><span class="toolbar-count">${rows.length} 条流水</span></div>
      <div class="data-table-wrap"><table class="data-table ledger-table"><thead><tr><th>流水号</th><th>关联订单</th><th>业务类型</th><th>方向</th><th>金额</th><th>账户</th><th>前余额 → 后余额</th><th>状态</th><th>操作人 / 时间</th></tr></thead><tbody>
      ${rows.length ? rows.map(entry => `<tr><td><strong>${entry.id}</strong></td><td>${entry.orderId ? `<button class="link-button" type="button" data-order-open="${entry.orderId}">${entry.orderId}</button>` : "—"}</td><td>${entry.bizType}</td><td><span class="ledger-dir ${entry.direction === "入账" || entry.direction === "解冻" ? "in" : entry.direction === "冻结" ? "hold" : "out"}">${entry.direction}</span></td><td><strong>${moneyPair(entry.currency, entry.amount)}</strong></td><td>${escapeHtml(entry.account)}<div class="muted-small">${escapeHtml(entry.note)}</div></td><td class="mono muted">${fmtMoney(entry.before)} → ${fmtMoney(entry.after)}</td><td><span class="status status-${statusTone(entry.status)}">${entry.status}</span></td><td class="muted">${escapeHtml(`${entry.operator} · ${entry.time}`)}</td></tr>`).join("") : `<tr><td colspan="9"><div class="empty-inline">没有匹配的流水</div></td></tr>`}
      </tbody></table></div></div>`;
  }

  function currencyPositions() {
    const byCurrency = {};
    state.treasury.forEach(account => {
      byCurrency[account.currency] = byCurrency[account.currency] || { currency: account.currency, total: 0, opening: 0, frozen: 0 };
      byCurrency[account.currency].total += account.available + account.frozen;
      byCurrency[account.currency].opening += account.opening;
      byCurrency[account.currency].frozen += account.frozen;
    });
    return Object.values(byCurrency).map(pos => ({ ...pos, delta: pos.total - pos.opening }));
  }

  function inventoryWarnings() {
    const warnings = [];
    state.treasury.forEach(account => {
      if (account.available < account.floor) warnings.push({ level: "红色", type: "低库存", target: account.name, detail: `可用 ${moneyPair(account.currency, account.available)} 低于阈值 ${moneyPair(account.currency, account.floor)}，建议补仓` });
      if (account.frozen > 0 && account.frozen > account.available * 0.4) warnings.push({ level: "黄色", type: "冻结占比高", target: account.name, detail: `冻结 ${moneyPair(account.currency, account.frozen)}，占可用余额 ${(account.frozen / Math.max(account.available, 1) * 100).toFixed(0)}%` });
    });
    currencyPositions().forEach(pos => {
      if (Math.abs(pos.delta) > pos.opening * 0.5 && pos.opening > 0) warnings.push({ level: "黄色", type: "长短仓风险", target: `${pos.currency} 头寸`, detail: `${pos.delta > 0 ? "Long" : "Short"} ${moneyPair(pos.currency, Math.abs(pos.delta))}，偏离开市基准超 50%` });
    });
    return warnings;
  }

  function renderInventoryCenter() {
    if (!["finance", "manager"].includes(state.role)) return `<div class="page">${pageHeader("INVENTORY", "库存管理", "当前角色不能查看库存。")}<div class="empty-state"><div><i>锁</i><h2>无查看权限</h2></div></div></div>`;
    const tab = state.inventoryTab;
    const groups = [...new Set(state.treasury.map(account => account.group))];
    const flowTypes = ["冻结", "释放", "消耗", "补仓", "调仓", "修正"];
    const flows = state.ledger.filter(entry => flowTypes.includes(entry.bizType));
    const warnings = inventoryWarnings();
    const positions = currencyPositions();
    const todayChange = key => state.ledger.filter(entry => /今天|刚刚/.test(entry.time) && entry.account === treasuryAccount(key)?.name).length;
    const body = tab === "flow" ? `<div class="data-table-wrap"><table class="data-table"><thead><tr><th>流水号</th><th>类型</th><th>方向</th><th>金额</th><th>账户</th><th>关联订单</th><th>操作人 / 时间</th></tr></thead><tbody>${flows.map(entry => `<tr><td><strong>${entry.id}</strong></td><td>${entry.bizType}</td><td>${entry.direction}</td><td>${moneyPair(entry.currency, entry.amount)}</td><td>${escapeHtml(entry.account)}</td><td>${entry.orderId ? `<button class="link-button" type="button" data-order-open="${entry.orderId}">${entry.orderId}</button>` : "—"}</td><td class="muted">${escapeHtml(`${entry.operator} · ${entry.time}`)}</td></tr>`).join("")}</tbody></table></div>`
      : tab === "alerts" ? (warnings.length ? `<div class="data-table-wrap"><table class="data-table"><thead><tr><th>级别</th><th>预警类型</th><th>对象</th><th>说明</th></tr></thead><tbody>${warnings.map(warning => `<tr><td><span class="status status-${warning.level === "红色" ? "danger" : "warning"}">${warning.level}</span></td><td>${warning.type}</td><td>${escapeHtml(warning.target)}</td><td>${escapeHtml(warning.detail)}</td></tr>`).join("")}</tbody></table></div>` : `<div class="empty-state"><div><i>✓</i><h2>暂无库存预警</h2></div></div>`)
      : tab === "adjust" ? `<section class="section"><div class="section-header"><div><h2>库存调整</h2><p>补仓、调仓、人工修正（高级权限 · 演示）——全部生成账务流水</p></div></div>
        <div class="field-grid"><label class="field"><span>账户</span><select id="treasury-account">${state.treasury.map(account => `<option value="${account.key}">${escapeHtml(account.name)} · 可用 ${fmtMoney(account.available)}</option>`).join("")}</select></label>
        <label class="field"><span>调整类型</span><select id="treasury-type"><option>补仓</option><option>调仓转入</option><option>调仓转出</option><option>人工修正</option></select></label>
        <label class="field"><span>金额</span><input id="treasury-amount" inputmode="decimal" placeholder="例如 200000" /></label>
        <label class="field"><span>说明</span><input id="treasury-note" placeholder="来源 / 去向 / 修正原因" /></label></div>
        <div class="form-actions"><span class="field-hint">调整立即更新余额并写入账务流水与库存流水。</span><button class="btn btn-primary" type="button" id="treasury-adjust-submit">提交调整</button></div></section>`
      : `${groups.map(group => `<section class="section inventory-group"><div class="section-header"><div><h2>${group}</h2><p>可用 / 冻结 / 今日动账</p></div></div><div class="inventory-cards">${state.treasury.filter(account => account.group === group).map(account => `<article class="inventory-card ${account.available < account.floor ? "low" : ""}"><header><strong>${escapeHtml(account.name)}</strong>${account.available < account.floor ? `<span class="status status-danger">低库存</span>` : `<span class="status status-success">可用</span>`}</header><div class="inventory-num"><span>可用余额</span><strong>${moneyPair(account.currency, account.available)}</strong></div><div class="inventory-sub"><span>冻结 ${fmtMoney(account.frozen)}</span><span>今日动账 ${todayChange(account.key)} 笔</span></div></article>`).join("")}</div></section>`).join("")}
      <section class="section"><div class="section-header"><div><h2>Long / Short Position</h2><p>相对开市基准的头寸偏离</p></div></div><div class="position-chips">${positions.map(pos => `<span class="position-chip ${pos.delta >= 0 ? "long" : "short"}"><strong>${pos.currency}</strong>${pos.delta >= 0 ? "Long" : "Short"} ${fmtMoney(Math.abs(pos.delta))}<small>冻结 ${fmtMoney(pos.frozen)}</small></span>`).join("")}</div></section>`;
    return `<div class="page">${pageHeader("INVENTORY", "库存管理", "现金、银行、VA、USDT 钱包的真实库存看板：订单收款确认冻结，出款完成消耗，取消释放。")}
      <div class="compliance-tabs" role="tablist">${[["overview", "库存总览"], ["flow", "库存流水"], ["alerts", `库存预警${warnings.length ? `（${warnings.length}）` : ""}`], ["adjust", "库存调整"]].map(([key, label]) => `<button type="button" class="${tab === key ? "active" : ""}" data-inventory-tab="${key}">${label}</button>`).join("")}</div>
      ${body}</div>`;
  }

  function reconSummary() {
    const map = {};
    const add = (currency, field, value) => { map[currency] = map[currency] || { currency, expectedIn: 0, actualIn: 0, expectedOut: 0, actualOut: 0 }; map[currency][field] += value; };
    state.tradeOrders.filter(order => order.status === "待客户入款").forEach(order => add(order.sellCurrency, "expectedIn", order.sellAmount));
    state.payments.filter(item => item.status === "已到账" && /今天|刚刚/.test(item.confirmedAt)).forEach(item => { add(item.currency, "actualIn", item.amount); add(item.currency, "expectedIn", item.amount); });
    state.payoutOrders.filter(item => item.status === "待出款").forEach(item => add(item.currency, "expectedOut", parseMoney(item.amount)));
    state.payoutOrders.filter(item => item.status === "已出款" && /今天|刚刚/.test(item.paidAt || "")).forEach(item => { add(item.currency, "actualOut", parseMoney(item.amount)); add(item.currency, "expectedOut", parseMoney(item.amount)); });
    return Object.values(map);
  }

  function renderDailyRecon() {
    if (!["finance", "manager"].includes(state.role)) return `<div class="page">${pageHeader("DAILY RECON", "每日对账", "当前角色不能执行对账。")}<div class="empty-state"><div><i>锁</i><h2>无操作权限</h2></div></div></div>`;
    const recon = state.recon;
    const summary = reconSummary();
    const stepFlow = ["未开始", "对账中", "有差异", "已确认", "已锁账"];
    return `<div class="page">${pageHeader("DAILY RECON", "每日对账", `日终核对系统订单、客户付款、出款凭证、银行账户、VA、钱包、库存与账务流水。对账日期 ${recon.date}。`,
      recon.status === "未开始" ? `<button class="btn btn-primary" id="recon-start" type="button">开始对账</button>` : recon.status === "有差异" ? `<button class="btn btn-primary" id="recon-confirm" type="button">确认差异</button>` : recon.status === "已确认" ? `<button class="btn btn-primary" id="recon-lock" type="button">确认锁账</button>` : "")}
      <div class="recon-steps">${stepFlow.map(step => `<span class="recon-step ${stepFlow.indexOf(step) <= stepFlow.indexOf(recon.status) ? "done" : ""} ${step === recon.status ? "current" : ""}">${step}</span>`).join("<i>→</i>")}</div>
      <section class="section"><div class="section-header"><div><h2>今日应收 / 实收 · 应付 / 实付</h2><p>按币种汇总（含今日确认与执行）</p></div><span class="status status-${statusTone(recon.status === "有差异" ? "异常" : recon.status === "已锁账" ? "完成" : "等待")}">${recon.status}${recon.lockedAt ? ` · ${recon.lockedAt}` : ""}</span></div>
        <div class="data-table-wrap" style="border:0"><table class="data-table"><thead><tr><th>币种</th><th>今日应收</th><th>今日实收</th><th>今日应付</th><th>今日实付</th><th>核对</th></tr></thead><tbody>${summary.length ? summary.map(row => `<tr><td><strong>${row.currency}</strong></td><td>${fmtMoney(row.expectedIn)}</td><td>${fmtMoney(row.actualIn)}</td><td>${fmtMoney(row.expectedOut)}</td><td>${fmtMoney(row.actualOut)}</td><td>${row.expectedIn === row.actualIn && row.expectedOut === row.actualOut ? `<span class="status status-success">一致</span>` : `<span class="status status-warning">待确认</span>`}</td></tr>`).join("") : `<tr><td colspan="6"><div class="empty-inline">今日暂无资金动作</div></td></tr>`}</tbody></table></div></section>
      <section class="section"><div class="section-header"><div><h2>余额核对</h2><p>系统余额 vs 银行回单 / 链上余额 / 现金盘点</p></div></div>
        <div class="recon-balance-grid">${["现金库存", "银行账户", "VA 账户", "USDT 钱包"].map(group => { const total = state.treasury.filter(account => account.group === group).reduce((sum, account) => sum + account.available + account.frozen, 0); const diff = group === "现金库存" ? -400 : 0; return `<article class="recon-balance-card"><span>${group}</span><strong>${fmtMoney(total)}</strong><small>外部口径 ${fmtMoney(total + diff)}${diff ? ` · 差 ${fmtMoney(diff)}` : " · 一致"}</small>${diff ? `<span class="status status-warning">有差异</span>` : `<span class="status status-success">一致</span>`}</article>`; }).join("")}</div></section>
      <section class="section"><div class="section-header"><div><h2>差异列表</h2><p>${recon.status === "未开始" ? "点击右上角开始对账后生成" : `共 ${recon.diffs.length} 项`}</p></div></div>
        ${recon.diffs.length ? `<div class="data-table-wrap" style="border:0"><table class="data-table"><thead><tr><th>差异类型</th><th>关联</th><th>说明</th><th>状态</th></tr></thead><tbody>${recon.diffs.map(diff => `<tr><td><span class="status status-warning">${diff.type}</span></td><td>${escapeHtml(diff.ref)}</td><td>${escapeHtml(diff.detail)}</td><td><span class="status status-${diff.status === "已确认" ? "success" : "warning"}">${diff.status}</span></td></tr>`).join("")}</tbody></table></div>` : `<div class="empty-inline">${recon.status === "未开始" ? "尚未开始对账。" : "无差异。"}</div>`}</section>
    </div>`;
  }

  function renderFundOps() {
    if (state.role !== "manager") return `<div class="page">${pageHeader("FUND OPS", "资金管理", "当前角色不能查看资金管理看板。")}<div class="empty-state"><div><i>锁</i><h2>无查看权限</h2></div></div></div>`;
    const activeOrders = state.tradeOrders.filter(order => ["待客户入款", "待出款排单", "出款审核中", "待出款执行"].includes(order.status));
    const frozenTotal = state.treasury.reduce((sum, account) => sum + (account.currency === "USD" ? account.frozen : Math.round(account.frozen / 7.8)), 0);
    const positions = currencyPositions();
    const rebalance = state.ledger.filter(entry => ["补仓", "调仓", "修正"].includes(entry.bizType)).slice(0, 4);
    const doneToday = state.tradeOrders.filter(order => order.status === "已完成" && /今天|刚刚/.test(order.updated));
    const netToday = doneToday.reduce((sum, order) => sum + (order.profit?.net || 0), 0);
    const lowAccounts = state.treasury.filter(account => account.available < account.floor);
    const stage = (step, title, status, body) => `<section class="fundops-stage"><header><i>${step}</i><div><h2>${title}</h2><span class="status status-${statusTone(status)}">${status}</span></div></header>${body}</section>`;
    return `<div class="page">${pageHeader("FUND OPS", "资金管理", "后台资金管理五阶段：每日开市 → 交易进行中 → 补仓/调仓 → 每日平仓 → 报表与合规。")}
      <div class="fundops-board">
        ${stage(1, "每日开市", "已完成", `<ul class="fundops-list"><li>基准汇率：USD/CNH 7.235 · USD/HKD 7.820</li><li>期初库存：${positions.map(pos => `${pos.currency} ${fmtMoney(pos.opening)}`).join(" · ")}</li><li>风险阈值与可交易额度已下发</li></ul>`)}
        ${stage(2, "交易进行中", "实时", `<ul class="fundops-list"><li>进行中订单 <strong>${activeOrders.length}</strong> 笔</li><li>冻结资金合计 <strong>$ ${fmtMoney(frozenTotal)}</strong>（折算 USD）</li><li>头寸：${positions.filter(pos => pos.delta !== 0).map(pos => `${pos.currency} ${pos.delta > 0 ? "Long" : "Short"} ${fmtMoney(Math.abs(pos.delta))}`).join(" · ") || "均衡"}</li></ul>`)}
        ${stage(3, "补仓 / 调仓", lowAccounts.length ? "需关注" : "正常", `<ul class="fundops-list">${rebalance.map(entry => `<li>${entry.time} · ${entry.bizType} ${moneyPair(entry.currency, entry.amount)} → ${escapeHtml(entry.account)}</li>`).join("")}${lowAccounts.length ? lowAccounts.map(account => `<li class="fundops-warn">建议补仓：${escapeHtml(account.name)}（可用低于阈值）</li>`).join("") : "<li>暂无补仓建议</li>"}</ul>`)}
        ${stage(4, "每日平仓", "进行中", `<ul class="fundops-list"><li>今日完成订单 <strong>${doneToday.length}</strong> 笔</li><li>今日净收益 <strong>$ ${fmtMoney(netToday)}</strong></li><li>风险敞口：USD Short ${fmtMoney(Math.abs(positions.find(pos => pos.currency === "USD")?.delta || 0))}（待平）</li></ul>`)}
        ${stage(5, "报表与合规", state.recon?.status === "已锁账" ? "已锁账" : "待日终", `<ul class="fundops-list"><li>日报 / 交易报表 / 库存报表 / 盈亏报表</li><li>对账状态：${state.recon?.status || "未开始"}${state.recon?.lockedAt ? ` · ${state.recon.lockedAt}` : ""}</li><li>记录保存至少 5 年 · 按要求提交监管报告</li></ul><div class="case-actions"><button class="btn btn-sm" type="button" data-view="dailyRecon">前往每日对账</button><button class="btn btn-sm" type="button" data-view="profitBoard">盈利来源</button></div>`)}
      </div></div>`;
  }

  function departmentAnchorDate() {
    const base = new Date("2026-08-24T00:00:00");
    base.setDate(base.getDate() + (state.departmentWeekOffset || 0) * 7);
    const day = base.getDay() || 7;
    base.setDate(base.getDate() - day + 1);
    return base;
  }

  function departmentWeekDays() {
    const start = departmentAnchorDate();
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      return { iso: isoDate(date), label: `${date.getMonth() + 1}/${date.getDate()}`, week: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"][index] };
    });
  }

  function leaveCoversDay(leave, iso) {
    return leave.start <= iso && leave.end >= iso;
  }

  function memberLeaves(memberId) {
    return state.departmentLeaves.filter(leave => leave.employeeId === memberId);
  }

  function leaveTimeDefaults(part = "全天") {
    if (part === "上午") return { startTime: "09:00", endTime: "12:00" };
    if (part === "下午") return { startTime: "13:00", endTime: "18:00" };
    if (part === "自定义时段") return { startTime: "10:00", endTime: "16:00" };
    return { startTime: "09:00", endTime: "18:00" };
  }

  function leaveTimeLabel(leave) {
    if (leave.part === "全天") return "全天";
    const startTime = leave.startTime || leaveTimeDefaults(leave.part).startTime;
    const endTime = leave.endTime || leaveTimeDefaults(leave.part).endTime;
    return `${startTime}-${endTime}`;
  }

  function leaveFullLabel(leave) {
    const dates = `${leave.start}${leave.end !== leave.start ? ` 至 ${leave.end}` : ""}`;
    return `${dates} · ${leave.part === "全天" ? "全天" : `${leave.part} ${leaveTimeLabel(leave)}`}`;
  }

  function leaveTooltip(member, leave) {
    return `${member?.name || "员工"} · ${leave.type}\n${leaveFullLabel(leave)}\n来源：${leave.source || "手工登记"}${leave.note ? `\n备注：${leave.note}` : ""}`;
  }

  function memberStatus(member, day = "2026-08-24") {
    const leave = memberLeaves(member.id).find(item => leaveCoversDay(item, day));
    if (!leave) return { label: "在岗", tone: "success", leave: null };
    const short = leave.part === "全天" ? leave.type : `${leave.part}${leave.type}`;
    return { label: short, tone: leave.type === "病假" ? "danger" : "warning", leave };
  }

  function leaveTone(type = "") {
    if (type === "病假") return "sick";
    if (type === "事假") return "personal";
    if (type === "调休") return "rest";
    if (type === "外出") return "field";
    if (type === "培训") return "training";
    return "annual";
  }

  function recommendedHandoff(member) {
    const candidates = state.departmentMembers
      .filter(item => item.id !== member.id && item.role === member.role && memberStatus(item).label === "在岗")
      .sort((a, b) => a.pending - b.pending);
    return candidates[0] || state.departmentMembers.filter(item => item.id !== member.id && memberStatus(item).label === "在岗").sort((a, b) => a.pending - b.pending)[0];
  }

  function renderDepartmentManagement() {
    if (state.role !== "manager") return `<div class="page">${pageHeader("TEAM OPS", "部门管理", "当前角色不能查看部门管理。")}<div class="empty-state"><div><i>锁</i><h2>无查看权限</h2></div></div></div>`;
    const tab = state.departmentTab || "calendar";
    const members = state.departmentMembers;
    const unavailableToday = members.filter(member => memberStatus(member).label !== "在岗").length;
    const pending = members.reduce((sum, member) => sum + member.pending, 0);
    const done = members.reduce((sum, member) => sum + member.todayDone, 0);
    const handoff = members.filter(member => memberLeaves(member.id).some(leave => leave.end >= "2026-08-24")).reduce((sum, member) => sum + member.pending, 0);
    const body = tab === "overview" ? renderDepartmentOverview()
      : tab === "handoff" ? renderDepartmentHandoff()
      : renderDepartmentCalendar();
    return `<div class="page department-page">${pageHeader("TEAM AVAILABILITY", "部门管理", "手工登记员工不可用时间，结合任务数量提前安排交接。", `<button class="btn btn-primary" type="button" id="leave-open">＋ 请假记录</button>`)}
      <div class="department-metrics">
        ${payoutMetric("今日在岗", String(members.length - unavailableToday), "人", "green", "", "可继续分配任务")}
        ${payoutMetric("今日不可用", String(unavailableToday), "人", unavailableToday ? "orange" : "green", "", "请假 / 外出 / 培训")}
        ${payoutMetric("今日已处理", String(done), "项", "blue", "", "跨交易、合规、出款")}
        ${payoutMetric("待交接任务", String(handoff), "项", handoff ? "red" : "green", "", "请假员工名下待办")}
      </div>
      <div class="compliance-tabs department-tabs" role="tablist">
        ${[["overview", "员工概览"], ["calendar", "出勤日历"], ["handoff", "任务交接"]].map(([key, label]) => `<button type="button" class="${tab === key ? "active" : ""}" data-department-tab="${key}">${label}</button>`).join("")}
      </div>
      ${body}
      ${state.leavePanelOpen ? renderLeavePanel() : ""}
      ${state.selectedLeaveId ? renderLeaveDetailPanel() : ""}
    </div>`;
  }

  function renderLeaveDetailPanel() {
    const leave = state.departmentLeaves.find(item => item.id === state.selectedLeaveId);
    if (!leave) return "";
    const member = state.departmentMembers.find(item => item.id === leave.employeeId);
    const target = member ? recommendedHandoff(member) : null;
    const status = member ? memberStatus(member) : null;
    const activity = activityGroups([
      ...(target ? [{ title: "建议接手人", detail: `系统按同岗位、在岗且待办最少推荐 ${target.name}（${target.role} · 当前待办 ${target.pending}）接手 ${member?.name || "员工"} 名下任务`, role: "系统建议", time: "今天" }] : []),
      { title: "请假已登记", detail: `${leave.type} · ${leaveFullLabel(leave)}（${leave.source || "手工登记"}）`, role: leave.registeredBy || "运营经理", time: leave.registeredAt || "—" }
    ]);
    return `<div class="order-panel-backdrop" id="leave-detail-backdrop"></div>
    <aside class="order-panel leave-detail-panel" role="dialog" aria-label="请假记录详情">
      <header class="order-panel-head">
        <div class="order-panel-topline"><span class="eyebrow">LEAVE RECORD · ${escapeHtml(leave.id)}</span><div class="order-panel-icons"><button class="icon-button" type="button" title="关注">☆</button><button class="icon-button" type="button" title="更多操作">⋯</button><button class="icon-button" id="leave-detail-close" type="button" aria-label="关闭请假详情">×</button></div></div>
        <div class="order-panel-title"><h2>${escapeHtml(member?.name || "未知员工")} · ${escapeHtml(leave.type)}</h2><span class="status status-${leave.type === "病假" ? "danger" : "warning"}">${escapeHtml(leave.part === "全天" ? "全天不可用" : `${leave.part}不可用`)}</span>${status && status.label !== "在岗" ? `<span class="status status-neutral">今日 ${escapeHtml(status.label)}</span>` : ""}</div>
        <p class="order-panel-hint">请假记录只作为内部调度参考；确认交接后请在任务交接页标记。</p>
      </header>
      <div class="order-panel-scroll">
        <div class="order-attr-table order-panel-attrs">
          ${orderAttrRow("◉", "员工", member ? escapeHtml(`${member.name} · ${member.role}（${member.group}）`) : "—")}
          ${orderAttrRow("◷", "时间段", escapeHtml(leaveFullLabel(leave)))}
          ${orderAttrRow("≡", "来源", `<span class="status ${/Lark|同步/.test(leave.source || "") ? "status-success" : "status-neutral"}">${escapeHtml(leave.source || "手工登记")}</span>`)}
          ${orderAttrRow("✎", "登记人 / 时间", escapeHtml(`${leave.registeredBy || "—"} · ${leave.registeredAt || "—"}`))}
        </div>
        ${leave.note ? `<div class="order-panel-note">备注：${escapeHtml(leave.note)}</div>` : ""}
        <div class="order-panel-block"><h3>影响任务</h3>
          <div class="order-attr-table">
            ${orderAttrRow("▤", "待处理任务", member ? `<strong>${member.pending}</strong> 项` : "—")}
            ${orderAttrRow("!", "今日到期 / 超时", member ? `${member.dueToday} 项 · 超时 ${member.overdue} 项` : "—")}
            ${orderAttrRow("◇", "主要任务", member ? escapeHtml(member.focus) : "—")}
            ${orderAttrRow("♙", "建议接手人", target ? `<strong>${escapeHtml(target.name)}</strong> · ${escapeHtml(target.role)} · 当前待办 ${target.pending}` : "待安排")}
          </div>
          ${member ? actionBlock(target ? "mint" : "warning", target ? `${escapeHtml(target.name)} 同岗位在岗且待办最少，可接手 ${escapeHtml(member.name)} 名下 ${member.pending} 项任务。` : `暂无同岗位在岗人选，请在任务交接页手动安排接手人。`, [`<button class="btn btn-sm btn-primary" type="button" data-handoff-toast="${member.id}">标记交接</button>`, `<button class="btn btn-sm" type="button" data-department-tab="handoff">前往任务交接</button>`]) : ""}
        <h3>交接活动</h3>
        ${activity.map(group => `<div class="activity-group"><h4>${escapeHtml(group.key)}</h4>${group.items.map(entry => `<div class="activity-item"><i></i><div><strong>${escapeHtml(entry.title)}</strong><p>${escapeHtml(entry.detail)}</p><time>${escapeHtml(entry.role)} · ${escapeHtml(entry.time)}</time></div></div>`).join("")}</div>`).join("")}
        </div>
      </div>
    </aside>`;
  }

  function renderDepartmentOverview() {
    const rows = state.departmentMembers.map(member => {
      const status = memberStatus(member);
      const recommended = recommendedHandoff(member);
      return `<tr><td><div class="department-person"><span>${member.initials}</span><div><strong>${member.name}</strong><small>${member.id} · ${member.group}</small></div></div></td><td>${member.role}</td><td><span class="status status-${status.tone}">${status.label}</span></td><td><strong>${member.todayDone}</strong></td><td>${member.pending}</td><td>${member.dueToday}</td><td>${member.overdue ? `<span class="status status-danger">${member.overdue}</span>` : "0"}</td><td>${member.focus}</td><td>${status.leave ? `<button class="link-button" type="button" data-department-tab="handoff">${recommended ? `建议 ${recommended.name} 接手` : "待安排"}</button>` : `<span class="muted">${member.lastActive}</span>`}</td></tr>`;
    }).join("");
    return `<section class="section"><div class="section-header"><div><h2>员工任务产能</h2><p>今日统计来自 demo 任务池，用于运营调度观察。</p></div><span class="status status-info">${state.departmentMembers.length} 名员工</span></div>
      <div class="data-table-wrap" style="border:0;border-radius:0"><table class="data-table department-table"><thead><tr><th>员工</th><th>岗位</th><th>今日状态</th><th>已处理</th><th>待处理</th><th>今日到期</th><th>超时</th><th>主要任务</th><th>调度建议</th></tr></thead><tbody>${rows}</tbody></table></div></section>`;
  }

  function renderDepartmentCalendar() {
    const days = departmentWeekDays();
    const groups = [...new Set(state.departmentMembers.map(member => member.group))];
    const start = days[0].iso;
    const end = days.at(-1).iso;
    return `<div class="department-calendar-layout">
      <section class="section department-calendar-section"><div class="section-header"><div><h2>团队不可用日历</h2><p>${start} 至 ${end}，横向查看一周人力可用性。</p></div><div class="case-actions"><button class="btn btn-sm" type="button" id="department-prev-week">‹ 上一周</button><button class="btn btn-sm" type="button" id="department-today-week">本周</button><button class="btn btn-sm" type="button" id="department-next-week">下一周 ›</button></div></div>
        <div class="team-schedule">
          <div class="schedule-head schedule-person-head">员工 / 日期</div>
          ${days.map(day => `<div class="schedule-head ${day.iso === todayIsoDate() ? "today" : ""}"><strong>${day.week}${day.iso === todayIsoDate() ? `<em>今天</em>` : ""}</strong><span>${day.label}</span></div>`).join("")}
          ${groups.map(group => {
            const members = state.departmentMembers.filter(member => member.group === group);
            return `<div class="schedule-group-row">${group}<span>${members.length} 人</span></div>${members.map(member => renderDepartmentCalendarRow(member, days)).join("")}`;
          }).join("")}
        </div></section>
      <aside class="section department-side-panel"><div class="section-header"><div><h2>本周交接提醒</h2><p>请假记录只作为内部调度参考。</p></div></div>${renderLeaveImpactList(days)}</aside>
    </div>`;
  }

  function renderDepartmentCalendarRow(member, days) {
    return `<div class="schedule-person"><div class="department-person"><span>${member.initials}</span><div><strong>${member.name}</strong><small>${member.role} · 待办 ${member.pending}</small></div></div></div>${days.map(day => {
      const leaves = memberLeaves(member.id).filter(leave => leaveCoversDay(leave, day.iso));
      if (!leaves.length) return `<button class="schedule-cell available ${day.iso === todayIsoDate() ? "today" : ""}" type="button" data-leave-quick="${member.id}" data-leave-date="${day.iso}">在岗</button>`;
      return `<div class="schedule-cell ${day.iso === todayIsoDate() ? "today" : ""}">${leaves.map(leave => `<button class="leave-chip ${leaveTone(leave.type)}" type="button" data-leave-select="${leave.id}" title="${escapeHtml(leaveTooltip(member, leave))}"><strong>${leave.type}</strong><span>${leaveTimeLabel(leave)}</span></button>`).join("")}</div>`;
    }).join("")}`;
  }

  function renderLeaveImpactList(days) {
    const start = days[0].iso;
    const end = days.at(-1).iso;
    const leaves = state.departmentLeaves.filter(leave => leave.end >= start && leave.start <= end);
    if (!leaves.length) return `<div class="empty-inline">本周暂无不可用登记。</div>`;
    return `<div class="handoff-list">${leaves.map(leave => {
      const member = state.departmentMembers.find(item => item.id === leave.employeeId);
      const target = member ? recommendedHandoff(member) : null;
      return `<article class="handoff-card"><header><span class="leave-dot ${leaveTone(leave.type)}"></span><div><strong>${member?.name || "未知员工"} · ${leave.type}</strong><small>${escapeHtml(leaveFullLabel(leave))}</small></div></header><p>${escapeHtml(leave.note || "未填写备注")}</p><footer><span>待交接 ${member?.pending || 0} 项</span><b>${target ? `建议 ${target.name}` : "待安排接手人"}</b></footer></article>`;
    }).join("")}</div>`;
  }

  function renderDepartmentHandoff() {
    const rows = state.departmentMembers.filter(member => memberLeaves(member.id).some(leave => leave.end >= "2026-08-24")).map(member => {
      const leaves = memberLeaves(member.id).filter(leave => leave.end >= "2026-08-24");
      const target = recommendedHandoff(member);
      return `<tr><td><div class="department-person"><span>${member.initials}</span><div><strong>${member.name}</strong><small>${member.role} · ${member.group}</small></div></div></td><td>${leaves.map(leave => `${leave.type} ${leaveFullLabel(leave)}`).join("<br>")}</td><td><strong>${member.pending}</strong><div class="muted">今日到期 ${member.dueToday} · 超时 ${member.overdue}</div></td><td>${target ? `<strong>${target.name}</strong><div class="muted">${target.role} · 当前待办 ${target.pending}</div>` : "待安排"}</td><td><button class="btn btn-sm" type="button" data-handoff-toast="${member.id}">标记交接</button></td></tr>`;
    }).join("");
    return `<section class="section"><div class="section-header"><div><h2>任务交接建议</h2><p>按同岗位、当前待办较少、在岗优先生成建议。</p></div></div>
      <div class="data-table-wrap" style="border:0;border-radius:0"><table class="data-table department-table"><thead><tr><th>请假员工</th><th>不可用时间</th><th>影响任务</th><th>建议接手人</th><th>操作</th></tr></thead><tbody>${rows || `<tr><td colspan="5"><div class="empty-inline">暂无需要交接的任务。</div></td></tr>`}</tbody></table></div></section>`;
  }

  function renderLeavePanel() {
    const draft = state.leaveDraft || initialLeaveDraft();
    const selectedMember = state.departmentMembers.find(member => member.id === draft.employeeId) || state.departmentMembers[0];
    const target = recommendedHandoff(selectedMember);
    const timeControl = draft.part === "全天" ? `<div class="leave-time-static"><strong>全天</strong><span>默认覆盖 09:00-18:00</span></div>` : `<div class="field-grid two leave-time-grid"><label class="field"><span>开始时间</span><input type="time" data-leave-field="startTime" value="${escapeHtml(draft.startTime || leaveTimeDefaults(draft.part).startTime)}" /></label><label class="field"><span>结束时间</span><input type="time" data-leave-field="endTime" value="${escapeHtml(draft.endTime || leaveTimeDefaults(draft.part).endTime)}" /></label></div>`;
    return `<div class="leave-panel-backdrop" id="leave-panel-backdrop"><aside class="leave-panel" role="dialog" aria-modal="true" aria-labelledby="leave-panel-title">
      <header><div><span>MANUAL ENTRY</span><h2 id="leave-panel-title">登记不可用时间</h2><p>正式审批仍以第三方 OA 为准，这里只服务内部排班与交接。</p></div><button class="icon-button" type="button" id="leave-panel-close" aria-label="关闭">×</button></header>
      <form id="leave-form" class="leave-form">
        <label class="field"><span>员工</span><select data-leave-field="employeeId">${state.departmentMembers.map(member => `<option value="${member.id}" ${draft.employeeId === member.id ? "selected" : ""}>${member.name} · ${member.role}</option>`).join("")}</select></label>
        <div class="field-grid two"><label class="field"><span>类型</span><select data-leave-field="type">${["年假", "病假", "事假", "调休", "外出", "培训", "其他"].map(type => `<option ${draft.type === type ? "selected" : ""}>${type}</option>`).join("")}</select></label><label class="field"><span>时间段</span><select data-leave-field="part">${["全天", "上午", "下午", "自定义时段"].map(part => `<option ${draft.part === part ? "selected" : ""}>${part}</option>`).join("")}</select></label></div>
        ${timeControl}
        <div class="field-grid two"><label class="field"><span>开始日期</span><input type="date" data-leave-field="start" value="${draft.start}" /></label><label class="field"><span>结束日期</span><input type="date" data-leave-field="end" value="${draft.end}" /></label></div>
        <label class="field"><span>备注</span><textarea data-leave-field="note" placeholder="例如：OA 已通过，KYC 队列需提前交接。">${escapeHtml(draft.note)}</textarea></label>
        <label class="checkbox-line"><input type="checkbox" id="leave-handoff" ${draft.handoff ? "checked" : ""} />需要任务交接提醒</label>
        <div class="leave-impact"><strong>影响预估</strong><p>${selectedMember.name} 当前待处理 ${selectedMember.pending} 项，今日到期 ${selectedMember.dueToday} 项${selectedMember.overdue ? `，超时 ${selectedMember.overdue} 项` : ""}。</p><span>${target ? `建议接手人：${target.name}（当前待办 ${target.pending}）` : "暂无可推荐接手人"}</span></div>
        <div class="form-actions"><button class="btn" type="button" id="leave-cancel">取消</button><button class="btn btn-primary" type="submit">保存登记</button></div>
      </form>
    </aside></div>`;
  }

  function renderProfitBoard() {
    if (!["finance", "manager"].includes(state.role)) return `<div class="page">${pageHeader("PROFIT", "盈利来源", "当前角色不能查看盈利看板。")}<div class="empty-state"><div><i>锁</i><h2>无查看权限</h2></div></div></div>`;
    const completed = state.tradeOrders.filter(order => order.status === "已完成" && order.profit);
    const todayOrders = completed.filter(order => /今天|刚刚/.test(order.updated));
    const sum = (list, field) => list.reduce((total, order) => total + (order.profit?.[field] || 0), 0);
    const monthBase = { spread: 128400, fee: 30800, corporate: 45200, remittance: 18600, commission: 41200, channel: 9800, trades: 86 };
    const monthSpread = monthBase.spread + sum(completed, "spread");
    const monthFee = monthBase.fee + sum(completed, "fee");
    const monthNet = monthSpread + monthFee + monthBase.corporate + monthBase.remittance - monthBase.commission - sum(completed, "commission") - monthBase.channel - sum(completed, "channelCost");
    const monthTrades = monthBase.trades + completed.length;
    const todayNet = sum(todayOrders, "net");
    const splitBy = (label, keyOf) => {
      const map = {};
      completed.forEach(order => { const key = keyOf(order); map[key] = map[key] || { key, count: 0, net: 0 }; map[key].count += 1; map[key].net += order.profit.net; });
      const rows = Object.values(map).sort((a, b) => b.net - a.net);
      return `<section class="section profit-split"><div class="section-header"><div><h2>${label}</h2><p>基于已完成订单</p></div></div>${rows.length ? `<table class="data-table"><thead><tr><th>${label.replace("按", "")}</th><th>笔数</th><th>净收益</th></tr></thead><tbody>${rows.map(row => `<tr><td>${escapeHtml(row.key)}</td><td>${row.count}</td><td><strong>$ ${fmtMoney(row.net)}</strong></td></tr>`).join("")}</tbody></table>` : `<div class="empty-inline">暂无已完成订单</div>`}</section>`;
    };
    return `<div class="page">${pageHeader("PROFIT SOURCES", "盈利来源", "汇差收入、手续费、企业换汇与汇款业务收入，扣除佣金与渠道成本后的净收益（金额折算 USD，演示口径）。")}
      <section class="metric-strip">${metric("今日总收益", `$ ${fmtMoney(todayNet)}`, `${todayOrders.length} 笔完成订单`, "◉")}${metric("本月总收益", `$ ${fmtMoney(monthNet)}`, "含种子历史数据", "✓")}${metric("汇差收入（月）", `$ ${fmtMoney(monthSpread)}`, "买卖价差", "◇")}${metric("手续费收入（月）", `$ ${fmtMoney(monthFee)}`, "固定+比例", "◌")}${metric("交易笔数（月）", String(monthTrades), `平均单笔 $ ${fmtMoney(Math.round(monthNet / Math.max(monthTrades, 1)))}`, "!")}</section>
      <section class="section"><div class="section-header"><div><h2>收益构成（本月）</h2><p>净收益 = 汇差 + 手续费 + 企业换汇 + 汇款 − 佣金 − 渠道成本</p></div></div>
        <div class="profit-compose">${[["汇差收入", monthSpread, "in"], ["手续费收入", monthFee, "in"], ["企业换汇业务", monthBase.corporate, "in"], ["汇款业务", monthBase.remittance, "in"], ["佣金成本", -(monthBase.commission + sum(completed, "commission")), "out"], ["渠道成本", -(monthBase.channel + sum(completed, "channelCost")), "out"], ["净收益", monthNet, "net"]].map(([label, value, tone]) => `<article class="profit-compose-card ${tone}"><span>${label}</span><strong>${value < 0 ? "-" : ""}$ ${fmtMoney(Math.abs(value))}</strong></article>`).join("")}</div></section>
      <div class="profit-split-grid">${splitBy("按交易类型", order => order.tradeType)}${splitBy("按币种", order => order.profit.currency)}${splitBy("按交易员", order => order.handler === roles.payout.name ? (order.timeline.at(-1)?.role?.replace(/^初级交易员 /, "") || "杨澜") : order.handler)}${splitBy("按客户", order => order.customerName)}</div>
    </div>`;
  }

  /* ---------- 订单 / 付款弹窗 ---------- */

  function bindCombobox({ input, menu, items, renderItem, onPick, allowCreate = false, onCreate = null, createLabel = query => `＋ 创建并保存「${query}」` }) {
    if (!input || !menu) return;
    let highlight = 0;
    let current = [];
    const close = () => { menu.hidden = true; };
    const creatable = query => allowCreate && query && !current.some(item => item.exact);
    function placeMenu() {
      menu.classList.remove("up");
      menu.style.maxHeight = "";
      const container = input.closest(".schedule-template-editor") || input.closest("form");
      const anchor = input.getBoundingClientRect();
      const containerRect = container ? container.getBoundingClientRect() : { top: 0, bottom: window.innerHeight };
      const footer = container ? container.querySelector(":scope > footer") : null;
      const limitBottom = Math.min(footer ? footer.getBoundingClientRect().top : containerRect.bottom, window.innerHeight);
      const limitTop = Math.max(containerRect.top, 0);
      const spaceBelow = limitBottom - anchor.bottom - 8;
      const spaceAbove = anchor.top - limitTop - 8;
      const natural = Math.min(menu.scrollHeight, 216);
      if (natural > spaceBelow && spaceAbove > spaceBelow) {
        menu.classList.add("up");
        menu.style.maxHeight = `${Math.max(Math.min(natural, spaceAbove), 96)}px`;
        return;
      }
      menu.style.maxHeight = `${Math.max(Math.min(natural, spaceBelow), 96)}px`;
    }

    function buildMenu(query) {
      current = items(query);
      const rows = current.map((item, index) => `<button type="button" class="combobox-option ${index === highlight ? "active" : ""}" data-combo-index="${index}">${renderItem(item)}</button>`);
      if (creatable(query)) rows.push(`<button type="button" class="combobox-option combobox-create ${highlight === current.length ? "active" : ""}" data-combo-index="${current.length}">${escapeHtml(createLabel(query))}</button>`);
      menu.innerHTML = rows.length ? rows.join("") : `<div class="combobox-empty">无匹配结果</div>`;
      menu.hidden = false;
      placeMenu();
      $$("[data-combo-index]", menu).forEach(el => el.addEventListener("mousedown", event => { event.preventDefault(); pick(Number(el.dataset.comboIndex), input.value.trim()); }));
    }
    function pick(index, query) {
      close();
      if (index >= current.length) { onCreate?.(query); return; }
      if (current[index]) onPick(current[index]);
    }
    input.addEventListener("focus", () => { highlight = 0; buildMenu(input.value.trim()); input.select(); });
    input.addEventListener("input", () => { highlight = 0; buildMenu(input.value.trim()); });
    input.addEventListener("blur", () => setTimeout(close, 140));
    input.addEventListener("keydown", event => {
      const query = input.value.trim();
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        if (menu.hidden) { highlight = 0; buildMenu(query); return; }
        const total = current.length + (creatable(query) ? 1 : 0);
        if (!total) return;
        highlight = (highlight + (event.key === "ArrowDown" ? 1 : total - 1)) % total;
        buildMenu(query);
        $(".combobox-option.active", menu)?.scrollIntoView({ block: "nearest" });
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        if (!menu.hidden) pick(highlight, query);
        return;
      }
      if (event.key === "Escape") close();
    });
  }

  function renderOrderModal(root) {
    const modal = state.orderModal;
    const currencies = ["USD", "HKD", "CNY", "EUR", "USDT"];
    const selectedCustomer = state.customers.find(customer => customer.id === modal.customerId);
    const complianceReady = customerComplianceReady(selectedCustomer);
    const quotes = quotedRatesForPair(modal.sellCurrency, modal.buyCurrency);
    const selectedQuote = quotes.find(quote => quote.id === modal.quoteId) || null;
    const kyc = kycStatusInfo(selectedCustomer);
    const sellPreview = parseMoney(modal.sellAmount);
    const ratePreview = Number(modal.rate) || 0;
    const buyPreview = parseMoney(modal.buyAmount);
    root.innerHTML = `<div class="review-launch-backdrop" id="order-modal-backdrop"><section class="schedule-template-dialog order-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="order-modal-title">
      <header><div><span>NEW ORDER</span><h2 id="order-modal-title">新建交易订单</h2><p>订单是业务主线：创建后依次经过报价、客户付款、收款确认、排单与出款。</p></div><button class="icon-button" id="order-modal-close" aria-label="关闭" type="button">×</button></header>
      <form class="schedule-template-editor order-modal-form" id="order-modal-form">
        <section class="order-form-section">
          <h3 class="order-form-legend"><i>1</i>客户</h3>
          <label class="field order-combobox-field"><div class="order-combobox order-client-box" id="order-customer-combo"><input id="order-customer-input" autocomplete="off" placeholder="搜索客户编号或名称…" value="${escapeHtml(selectedCustomer ? `${selectedCustomer.clientNo || "无编号"} · ${selectedCustomer.name}` : "")}" />${selectedCustomer ? `<span class="order-client-chip"><em>拼音</em>${escapeHtml((selectedCustomer.enName || selectedCustomer.name).toUpperCase())}</span>` : ""}<div class="combobox-menu" hidden></div></div><span class="field-hint">支持编号或名称模糊匹配，↑↓ 选择，Enter 确认</span></label>
          ${selectedCustomer && !complianceReady ? `<p class="order-inline-warning"><i aria-hidden="true">ⓘ</i><span>该客户 <strong>KYC 未通过</strong>，可继续创建订单并登记交易意向，<strong>但不能确认到账</strong>。${kyc.label === "需补件" ? "请在业务准入完成补件。" : kyc.label === "未提交 KYC" ? "可先在业务准入发起 KYC 材料提交。" : ""}</span></p>` : ""}
        </section>

        <section class="order-form-section">
          <h3 class="order-form-legend"><i>2</i>交易内容</h3>
          <div class="order-field-row">
            <label class="field order-combobox-field"><span>交易类型</span><div class="order-combobox" id="order-type-combo"><input id="order-type-input" autocomplete="off" placeholder="选择或输入新类型" value="${escapeHtml(modal.tradeType || "")}" /><div class="combobox-menu" hidden></div></div><span class="field-hint">输入未有的类型可创建并保存</span></label>
            <label class="field"><span>客户付款方式</span><select data-order-field="payMethod">${["现金", "FPS", "CHATS", "银行转账", "VA 入账", "USDT 转入"].map(method => `<option ${modal.payMethod === method ? "selected" : ""}>${method}</option>`).join("")}</select></label>
          </div>
          <div class="order-exchange">
            <div class="order-exchange-side">
              <span class="order-exchange-label">客户卖出 · 我方应收</span>
              <div class="order-money">
                <select id="order-sell-currency" class="order-money-cur" data-order-field="sellCurrency">${currencies.map(code => `<option ${modal.sellCurrency === code ? "selected" : ""}>${code}</option>`).join("")}</select>
                <input class="order-money-amount" data-order-field="sellAmount" inputmode="decimal" value="${escapeHtml(modal.sellAmount)}" placeholder="0.00" />
              </div>
            </div>
            <i class="order-exchange-arrow" aria-hidden="true">→</i>
            <div class="order-exchange-side">
              <span class="order-exchange-label">客户买入 · 我方应付</span>
              <div class="order-money">
                <select id="order-buy-currency" class="order-money-cur" data-order-field="buyCurrency">${currencies.map(code => `<option ${modal.buyCurrency === code ? "selected" : ""}>${code}</option>`).join("")}</select>
                <input class="order-money-amount" data-order-field="buyAmount" inputmode="decimal" value="${escapeHtml(modal.buyAmount)}" placeholder="0.00" />
              </div>
            </div>
            <p class="order-exchange-note">两侧金额均由交易员手动填写，系统不自动换算；执行汇率仅作留档与核算依据。</p>
          </div>
        </section>

        <section class="order-form-section">
          <h3 class="order-form-legend"><i>3</i>执行汇率</h3>
          <label class="field order-combobox-field"><div class="order-combobox" id="order-rate-combo"><input id="order-rate-input" inputmode="decimal" autocomplete="off" placeholder="例如 7.8200 / 1.0020" value="${escapeHtml(modal.rate)}" /><div class="combobox-menu" hidden></div></div><span class="field-hint" id="order-rate-hint">${selectedQuote ? `已关联报价 <b class="order-quote-chip">${escapeHtml(selectedQuote.id)}</b> · 成本价 ${escapeHtml(selectedQuote.costRate)} <span class="order-quote-src">[${escapeHtml(selectedQuote.source)} ${escapeHtml(selectedQuote.time)}]</span>` : quotes.length ? `该币种对有 ${quotes.length} 条已报价，点击输入框选择；直接输入数值则创建为草稿。` : "该币种对暂无报价记录，直接输入汇率数值，订单创建为草稿。"}</span></label>
        </section>

        <section class="order-form-section">
          <h3 class="order-form-legend"><i>4</i>补充说明<em class="order-legend-optional">选填</em></h3>
          <label class="field"><textarea class="order-remark" data-order-field="remark" placeholder="本单的特殊约定、分成与交收安排、风控关注点、后续跟进事项等，可多行填写">${escapeHtml(modal.remark || "")}</textarea></label>
        </section>

        <div class="order-summary" id="order-summary">${sellPreview && buyPreview
          ? `<span>本单概要</span><strong>${escapeHtml(moneyPair(modal.sellCurrency, sellPreview))} → ${escapeHtml(moneyPair(modal.buyCurrency, buyPreview))}</strong><small>汇率 ${escapeHtml(modal.rate || "未填写")}${selectedQuote ? ` · 报价 ${selectedQuote.id}` : " · 手动汇率"}</small>`
          : `<span>本单概要</span><small>填写买卖双边金额后预览成交口径</small>`}</div>
        ${modal.error ? `<div class="form-error">${escapeHtml(modal.error)}</div>` : ""}
        <footer><button class="btn" type="button" id="order-modal-cancel">取消</button><button class="btn btn-primary" type="submit" ${selectedCustomer ? "" : "disabled"}>${selectedQuote ? "创建订单（已关联报价）" : "创建订单草稿"}</button></footer>
      </form></section></div>`;
    document.body.classList.add("modal-open");
    const close = () => { state.orderModal = null; renderDispatchModal(); };
    $("#order-modal-close")?.addEventListener("click", close);
    $("#order-modal-cancel")?.addEventListener("click", close);
    $("#order-modal-backdrop")?.addEventListener("click", event => { if (event.target === event.currentTarget) close(); });
    $("#order-modal-form")?.addEventListener("submit", event => { event.preventDefault(); submitOrderModal(); });
    ["#order-sell-currency", "#order-buy-currency"].forEach(id => $(id)?.addEventListener("change", () => {
      syncOrderModalFields();
      refreshOrderModalQuote(state.orderModal);
      renderDispatchModal();
    }));
    bindCombobox({
      input: $("#order-customer-input"),
      menu: $("#order-customer-combo .combobox-menu"),
      items: query => {
        const selected = state.customers.find(customer => customer.id === state.orderModal.customerId);
        const display = selected ? `${selected.clientNo || "无编号"} · ${selected.name}` : "";
        const keyword = (query === display ? "" : query).toLowerCase();
        const matches = keyword
          ? state.customers.filter(customer => `${customer.clientNo || ""} ${customer.name} ${customer.enName || ""} ${customer.id}`.toLowerCase().includes(keyword))
          : state.customers;
        return matches.map(customer => ({ customer }));
      },
      renderItem: ({ customer }) => {
        const kyc = kycStatusInfo(customer);
        return `<strong>${escapeHtml(`${customer.clientNo || "无编号"} · ${customer.name}`)}</strong><small><em class="order-kyc-inline ${kyc.tone}">${kyc.label}</em> · ${escapeHtml(customer.enName || customer.name)}</small>`;
      },
      onPick: ({ customer }) => {
        syncOrderModalFields();
        state.orderModal.customerId = customer.id;
        renderDispatchModal();
      }
    });
    bindCombobox({
      input: $("#order-type-input"),
      menu: $("#order-type-combo .combobox-menu"),
      allowCreate: true,
      items: query => {
        const keyword = (query === state.orderModal.tradeType ? "" : query).toLowerCase();
        return allTradeTypes()
          .filter(type => !keyword || type.toLowerCase().includes(keyword))
          .map(type => ({ type, exact: type === query }));
      },
      renderItem: ({ type }) => `<strong>${escapeHtml(type)}</strong>${tradeTypePresets[type] ? `<small>默认 ${tradeTypePresets[type][0]} → ${tradeTypePresets[type][1]} · 参考汇率 ${tradeTypePresets[type][2]}</small>` : `<small>自定义类型</small>`}`,
      onPick: ({ type }) => {
        syncOrderModalFields();
        state.orderModal.tradeType = type;
        const preset = tradeTypePresets[type];
        if (preset) {
          state.orderModal.sellCurrency = preset[0];
          state.orderModal.buyCurrency = preset[1];
          state.orderModal.rate = preset[2];
          refreshOrderModalQuote(state.orderModal);
        }
        renderDispatchModal();
      },
      onCreate: query => {
        const created = saveCustomTradeType(query);
        if (!created) return;
        syncOrderModalFields();
        state.orderModal.tradeType = created;
        renderDispatchModal();
        toast("交易类型已保存", `「${created}」已加入交易类型列表，可直接选用`);
      }
    });
    const rateInput = $("#order-rate-input");
    bindCombobox({
      input: rateInput,
      menu: $("#order-rate-combo .combobox-menu"),
      items: () => quotedRatesForPair(state.orderModal.sellCurrency, state.orderModal.buyCurrency).map(quote => ({ quote })),
      renderItem: ({ quote }) => `<strong>${escapeHtml(quote.rate)}</strong><small>${escapeHtml(`${quote.id} · ${quote.source} ${quote.time} · 成本价 ${quote.costRate}`)}</small>`,
      onPick: ({ quote }) => {
        syncOrderModalFields();
        state.orderModal.quoteId = quote.id;
        state.orderModal.rate = quote.rate;
        renderDispatchModal();
      }
    });
    $$('[data-order-field]').forEach(el => el.addEventListener(el.tagName === "SELECT" ? "change" : "input", () => {
      state.orderModal[el.dataset.orderField] = el.value;
      refreshOrderSummary();
    }));
    rateInput?.addEventListener("input", () => {
      const modalState = state.orderModal;
      modalState.rate = rateInput.value.trim();
      const quote = modalState.quoteId ? recentQuoteBook.find(item => item.id === modalState.quoteId) : null;
      if (!quote || quote.rate !== modalState.rate) modalState.quoteId = "";
      const hint = $("#order-rate-hint");
      if (hint && !modalState.quoteId) hint.textContent = "手动输入汇率，订单将创建为草稿；点击输入框可改选已报价。";
      const submit = $("#order-modal-form footer button[type='submit']");
      if (submit) submit.textContent = modalState.quoteId ? "创建订单（已关联报价）" : "创建订单草稿";
      refreshOrderSummary();
    });
  }

  function refreshOrderSummary() {
    const box = $("#order-summary");
    const modal = state.orderModal;
    if (!box || !modal) return;
    const sell = parseMoney(modal.sellAmount);
    const buy = parseMoney(modal.buyAmount);
    const quote = modal.quoteId ? recentQuoteBook.find(item => item.id === modal.quoteId) : null;
    box.innerHTML = sell && buy
      ? `<span>本单概要</span><strong>${escapeHtml(moneyPair(modal.sellCurrency, sell))} → ${escapeHtml(moneyPair(modal.buyCurrency, buy))}</strong><small>汇率 ${escapeHtml(modal.rate || "未填写")}${quote ? ` · 报价 ${quote.id}` : " · 手动汇率"}</small>`
      : `<span>本单概要</span><small>填写买卖双边金额后预览成交口径</small>`;
  }

  function renderFundingModal(root) {
    const modal = state.fundingModal;
    const order = findOrder(modal.orderId);
    if (!order) { state.fundingModal = null; renderDispatchModal(); return; }
    const inflow = modal.side === "inflow";
    const titles = { bank: inflow ? "确认法币入账" : "执行银行出款", chain: inflow ? "标记链上入款到账" : "登记链上转账", cash: inflow ? "确认现金交收" : "登记现金交付" };
    const amount = inflow ? moneyPair(order.sellCurrency, order.sellAmount) : moneyPair(order.buyCurrency, order.buyAmount);
    const voucherZone = `
        <div class="field full"><span>收款凭证</span>
          <div class="funding-dropzone ${modal.voucher ? "has-file" : ""}" id="funding-voucher-zone" tabindex="0" role="button" aria-label="上传收款凭证">
            ${modal.voucher ? `<strong>${escapeHtml(modal.voucher)}</strong><small>点击重新选择，或拖拽 / 粘贴替换</small>` : `<strong>拖拽收款凭证到这里，或点击选择文件</strong><small>也可以直接 Ctrl / ⌘ + V 粘贴截图</small>`}
          </div>
          <input type="file" id="funding-voucher-input" accept="image/*,.pdf" hidden />
        </div>`;
    const noteField = `
        <label class="field full"><span>说明</span><textarea data-funding-field="note" rows="2" placeholder="补充说明，例如分笔到账、金额与应收差异原因（可选）">${escapeHtml(modal.note || "")}</textarea></label>`;
    const fields = modal.kind === "bank" ? (inflow ? `
        <label class="field"><span>实际收款金额</span><input data-funding-field="amount" value="${escapeHtml(modal.amount)}" inputmode="decimal" /></label>
        <label class="field"><span>收款方式</span><select data-funding-field="method">${["电汇转账", "现金"].map(method => `<option ${modal.method === method ? "selected" : ""}>${method}</option>`).join("")}</select></label>
        ${voucherZone}
        ${noteField}` : `
        <label class="field"><span>出款金额</span><input data-funding-field="amount" value="${escapeHtml(modal.amount)}" inputmode="decimal" /></label>
        <label class="field"><span>出款账户 *</span><input data-funding-field="account" value="${escapeHtml(modal.account)}" placeholder="例如 SGB 银行账户 · 0729-88" /></label>
        <label class="field"><span>出款时间</span><input data-funding-field="time" value="${escapeHtml(modal.time)}" /></label>
        <label class="field"><span>水单 / MT103</span><input data-funding-field="voucher" value="${escapeHtml(modal.voucher)}" placeholder="例如 SGB-回单-20260824.pdf" /></label>`)
      : modal.kind === "chain" ? (inflow ? `
        <label class="field"><span>收款方式</span><input value="链上收款" disabled /></label>
        <label class="field"><span>实际到账金额</span><input data-funding-field="amount" value="${escapeHtml(modal.amount)}" inputmode="decimal" /></label>
        <label class="field full"><span>Transaction Hash *</span><input class="mono" data-funding-field="hash" value="${escapeHtml(modal.hash)}" placeholder="例如 9f2c7a1e5b34d806fa71c2e93b5d4087ac16e2f9d3b7c8514a0e6d9f2b3c7a15" /></label>
        ${noteField}` : `
        <label class="field"><span>转账数量</span><input data-funding-field="amount" value="${escapeHtml(modal.amount)}" inputmode="decimal" /></label>
        <label class="field"><span>链 / 网络</span><select data-funding-field="chain">${["TRC20", "ERC20", "BEP20"].map(chain => `<option ${modal.chain === chain ? "selected" : ""}>${chain}</option>`).join("")}</select></label>
        <label class="field full"><span>交易哈希 *</span><input class="mono" data-funding-field="hash" value="${escapeHtml(modal.hash)}" placeholder="例如 9f2c7a1e5b34d806fa71c2e93b5d4087ac16e2f9d3b7c8514a0e6d9f2b3c7a15" /></label>
        <label class="field"><span>区块确认数</span><input data-funding-field="confirms" value="${escapeHtml(modal.confirms)}" inputmode="numeric" /></label>
        <label class="field"><span>链上截图</span><input data-funding-field="voucher" value="${escapeHtml(modal.voucher)}" placeholder="例如 trx-20260824.png" /></label>`)
      : `
        <label class="field"><span>${inflow ? "验收金额" : "交付金额"}</span><input data-funding-field="amount" value="${escapeHtml(modal.amount)}" inputmode="decimal" /></label>
        <label class="field"><span>交收地点 *</span><input data-funding-field="place" value="${escapeHtml(modal.place)}" placeholder="例如 Kingcoin 旺角店" /></label>
        <label class="field"><span>交收人</span><input data-funding-field="handler" value="${escapeHtml(modal.handler)}" placeholder="现场交收同事" /></label>
        <label class="field"><span>信物编号</span><input data-funding-field="token" value="${escapeHtml(modal.token)}" placeholder="唯一信物编号" /></label>
        <label class="field"><span>确认时间</span><input data-funding-field="time" value="${escapeHtml(modal.time)}" /></label>`;
    root.innerHTML = `<div class="review-launch-backdrop" id="funding-modal-backdrop"><section class="schedule-template-dialog payout-receipt-dialog" role="dialog" aria-modal="true" aria-labelledby="funding-modal-title">
      <header><div><span>${inflow ? "CUSTOMER INFLOW" : "PLATFORM OUTFLOW"}</span><h2 id="funding-modal-title">${titles[modal.kind]}</h2><p>${escapeHtml(order.id)} · ${escapeHtml(order.customerName)} · ${escapeHtml(order.tradeType)}｜标记人：${escapeHtml(actorLabel())}</p></div><button class="icon-button" id="funding-modal-close" aria-label="关闭" type="button">×</button></header>
      <form class="schedule-template-editor" id="funding-modal-form">
        <div class="funding-modal-brief"><span>${inflow ? "客户应付我方" : "我方应付客户"}</span><strong>${amount}</strong><small>${fundingKindLabel[modal.kind]} · 责任人 ${escapeHtml(roles[fundingOwnerRole(order, modal.side)].label)}</small></div>
        <div class="field-grid">${fields}</div>
        ${modal.error ? `<div class="form-error">${escapeHtml(modal.error)}</div>` : ""}
        <footer><button class="btn" type="button" id="funding-modal-cancel">取消</button><button class="btn btn-primary" type="submit">${inflow ? "确认到账" : "确认已出款"}</button></footer>
      </form></section></div>`;
    document.body.classList.add("modal-open");
    const close = () => { state.fundingModal = null; renderDispatchModal(); };
    $("#funding-modal-close")?.addEventListener("click", close);
    $("#funding-modal-cancel")?.addEventListener("click", close);
    $("#funding-modal-backdrop")?.addEventListener("click", event => { if (event.target === event.currentTarget) close(); });
    $("#funding-modal-form")?.addEventListener("submit", event => { event.preventDefault(); submitFundingModal(); });
    const voucherZoneEl = $("#funding-voucher-zone");
    const voucherInput = $("#funding-voucher-input");
    if (voucherZoneEl && voucherInput) {
      const setVoucher = (name, file = null) => {
        $$('[data-funding-field]').forEach(el => { modal[el.dataset.fundingField] = el.value; });
        modal.voucher = name;
        modal.voucherUrl = file ? URL.createObjectURL(file) : "";
        renderDispatchModal();
      };
      voucherZoneEl.addEventListener("click", () => voucherInput.click());
      voucherZoneEl.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); voucherInput.click(); } });
      voucherInput.addEventListener("change", () => { if (voucherInput.files[0]) setVoucher(voucherInput.files[0].name, voucherInput.files[0]); });
      voucherZoneEl.addEventListener("dragover", event => { event.preventDefault(); voucherZoneEl.classList.add("dragover"); });
      voucherZoneEl.addEventListener("dragleave", () => voucherZoneEl.classList.remove("dragover"));
      voucherZoneEl.addEventListener("drop", event => {
        event.preventDefault();
        voucherZoneEl.classList.remove("dragover");
        const file = event.dataTransfer?.files?.[0];
        if (file) setVoucher(file.name, file);
      });
      $("#funding-modal-form")?.addEventListener("paste", event => {
        const file = [...(event.clipboardData?.files || [])][0];
        if (!file) return;
        event.preventDefault();
        setVoucher(file.name && file.name !== "image.png" ? file.name : `粘贴截图-${Date.now().toString().slice(-6)}.png`, file);
        toast("凭证已粘贴", "收款凭证已加入本次登记");
      });
    }
  }

  function renderPaymentModal(root) {
    const modal = state.paymentModal;
    const candidates = state.tradeOrders.filter(order => order.status === "待客户入款");
    const selected = findOrder(modal.orderId);
    root.innerHTML = `<div class="review-launch-backdrop" id="payment-modal-backdrop"><section class="schedule-template-dialog payout-receipt-dialog" role="dialog" aria-modal="true" aria-labelledby="payment-modal-title">
      <header><div><span>REGISTER PAYMENT</span><h2 id="payment-modal-title">登记客户付款</h2><p>记录客户实际付款方式、金额与到账账户，提交后由高级交易员付款审核确认到账。</p></div><button class="icon-button" id="payment-modal-close" aria-label="关闭" type="button">×</button></header>
      <form class="schedule-template-editor" id="payment-modal-form">
        <div class="field-grid">
          <label class="field full"><span>关联交易订单</span><select id="payment-order-select">${candidates.length ? candidates.map(order => `<option value="${order.id}" ${order.id === modal.orderId ? "selected" : ""}>${escapeHtml(`${order.id} · ${order.customerName} · 应收 ${moneyPair(order.sellCurrency, order.sellAmount)}`)}</option>`).join("") : `<option value="">暂无待付款订单</option>`}</select></label>
          <label class="field"><span>付款方式</span><select data-payment-field="method">${["现金", "FPS", "CHATS", "银行转账", "VA 入账", "USDT 转入"].map(method => `<option ${modal.method === method ? "selected" : ""}>${method}</option>`).join("")}</select></label>
          <label class="field"><span>付款币种</span><select data-payment-field="currency">${["USD", "HKD", "CNY", "EUR", "USDT"].map(code => `<option ${modal.currency === code ? "selected" : ""}>${code}</option>`).join("")}</select></label>
          <label class="field"><span>付款金额</span><input data-payment-field="amount" inputmode="decimal" value="${escapeHtml(modal.amount)}" placeholder="客户实付金额" /></label>
          <label class="field"><span>付款时间</span><input data-payment-field="paidAt" value="${escapeHtml(modal.paidAt || "")}" placeholder="例如 今天 14:30" /></label>
          <label class="field"><span>到账账户 / VA / 钱包</span><input data-payment-field="account" value="${escapeHtml(modal.account)}" placeholder="例如 SGB 银行账户 · 0729-88" /></label>
          <label class="field"><span>付款凭证</span><label class="btn">${modal.voucherName ? "更换文件" : "选择凭证文件"}<input id="payment-voucher-file" type="file" accept="image/*,application/pdf,.pdf" style="position:absolute;width:1px;height:1px;opacity:0" /></label><span class="field-hint">${modal.voucherName ? `已选择：${escapeHtml(modal.voucherName)}` : "水单截图 / 转账回执 / 链上哈希截图"}</span></label>
          <label class="field"><span>备注</span><input data-payment-field="note" value="${escapeHtml(modal.note)}" placeholder="付款说明（可选）" /></label>
        </div>
        ${selected ? `<div class="schedule-empty-block"><strong>订单应收：${moneyPair(selected.sellCurrency, selected.sellAmount)}（${selected.tradeType}）</strong><span>确认到账后订单将进入待排单并冻结应付 ${moneyPair(selected.buyCurrency, selected.buyAmount)}。</span></div>` : ""}
        ${modal.error ? `<div class="form-error">${escapeHtml(modal.error)}</div>` : ""}
        <footer><button class="btn" type="button" id="payment-modal-cancel">取消</button><button class="btn btn-primary" type="submit" ${candidates.length ? "" : "disabled"}>提交付款记录</button></footer>
      </form></section></div>`;
    document.body.classList.add("modal-open");
    const close = () => { state.paymentModal = null; renderDispatchModal(); };
    $("#payment-modal-close")?.addEventListener("click", close);
    $("#payment-modal-cancel")?.addEventListener("click", close);
    $("#payment-modal-backdrop")?.addEventListener("click", event => { if (event.target === event.currentTarget) close(); });
    $("#payment-modal-form")?.addEventListener("submit", event => { event.preventDefault(); submitPaymentModal(); });
    $("#payment-order-select")?.addEventListener("change", event => {
      $$('[data-payment-field]').forEach(el => { state.paymentModal[el.dataset.paymentField] = el.value; });
      state.paymentModal.orderId = event.target.value;
      const order = findOrder(event.target.value);
      if (order) { state.paymentModal.currency = order.sellCurrency; state.paymentModal.amount = String(order.sellAmount); state.paymentModal.method = order.payMethod; }
      renderDispatchModal();
    });
    $("#payment-voucher-file")?.addEventListener("change", event => {
      const file = event.target.files?.[0];
      if (!file || !state.paymentModal) return;
      $$('[data-payment-field]').forEach(el => { state.paymentModal[el.dataset.paymentField] = el.value; });
      state.paymentModal.voucherName = file.name;
      renderDispatchModal();
    });
    $$('[data-payment-field]').forEach(el => el.addEventListener(el.tagName === "SELECT" ? "change" : "input", () => { if (state.paymentModal) state.paymentModal[el.dataset.paymentField] = el.value; }));
  }

  function bindTradeEvents() {
    const orderNew = $("#order-new"); if (orderNew) orderNew.addEventListener("click", openOrderModal);
    const paymentNew = $("#payment-new"); if (paymentNew) paymentNew.addEventListener("click", () => openPaymentModal(""));
    const orderBack = $("#order-back"); if (orderBack) orderBack.addEventListener("click", () => { state.orderView = null; render(); });
    const orderPanelBackdrop = $("#order-panel-backdrop"); if (orderPanelBackdrop) orderPanelBackdrop.addEventListener("click", () => { state.orderView = null; render(); });
    $$('[data-order-panel-tab]').forEach(el => el.addEventListener("click", () => { state.orderPanelTab = el.dataset.orderPanelTab; render(); }));
    $$('[data-order-open]').forEach(el => el.addEventListener("click", () => { state.orderView = el.dataset.orderOpen; state.orderPanelTab = "payment"; state.view = "tradeOrders"; if (!roleHasView(state.role, "tradeOrders")) state.view = state.view; render(); }));
    $$('[data-order-kyc-sync]').forEach(el => el.addEventListener("click", () => syncOrderKyc(el.dataset.orderKycSync)));
    $$('[data-order-cancel]').forEach(el => el.addEventListener("click", () => cancelTradeOrder(el.dataset.orderCancel)));
    $$('[data-order-riskstop]').forEach(el => el.addEventListener("click", () => cancelTradeOrder(el.dataset.orderRiskstop, true)));
    $$('[data-outflow-return]').forEach(el => el.addEventListener("click", () => returnOutflowExecution(el.dataset.outflowReturn)));
    $$('[data-wallet-deposit]').forEach(el => el.addEventListener("click", () => walletSetDepositAddress(el.dataset.walletDeposit)));
    $$('[data-wallet-kya]').forEach(el => el.addEventListener("click", () => walletKyaAddress(el.dataset.walletKya)));
    $$('[data-inflow-confirm]').forEach(el => el.addEventListener("click", () => openFundingModal(el.dataset.inflowConfirm, "inflow")));
    $$('[data-inflow-reject]').forEach(el => el.addEventListener("click", () => rejectOrderInflow(el.dataset.inflowReject)));
    $$('[data-outflow-execute]').forEach(el => el.addEventListener("click", () => openFundingModal(el.dataset.outflowExecute, "outflow")));
    $$('[data-order-quote]').forEach(el => el.addEventListener("click", () => orderAttachQuote(el.dataset.orderQuote)));
    $$('[data-order-pay]').forEach(el => el.addEventListener("click", () => openPaymentModal(el.dataset.orderPay)));
    $$('[data-payment-confirm]').forEach(el => el.addEventListener("click", () => reviewPayment(el.dataset.paymentConfirm, "confirm")));
    $$('[data-payment-reject]').forEach(el => el.addEventListener("click", () => reviewPayment(el.dataset.paymentReject, "reject")));
    $$('[data-payment-supplement]').forEach(el => el.addEventListener("click", () => reviewPayment(el.dataset.paymentSupplement, "supplement")));
    $$('[data-payment-voucher]').forEach(el => el.addEventListener("click", () => supplementPaymentVoucher(el.dataset.paymentVoucher)));
    $$('[data-order-todo]').forEach(el => el.addEventListener("click", () => { state.orderTodo = el.dataset.orderTodo; render(); }));
    $$('[data-payment-tab]').forEach(el => el.addEventListener("click", () => { state.paymentTab = el.dataset.paymentTab; render(); }));
    $$('[data-exception-restore]').forEach(el => el.addEventListener("click", () => resolveOrderException(el.dataset.exceptionRestore, "restore")));
    $$('[data-exception-cancel]').forEach(el => el.addEventListener("click", () => resolveOrderException(el.dataset.exceptionCancel, "cancel")));
    $$('[data-exception-escalate]').forEach(el => el.addEventListener("click", () => resolveOrderException(el.dataset.exceptionEscalate, "escalate")));
    $$('[data-voucher-match]').forEach(el => el.addEventListener("click", () => { const [kind, ...rest] = el.dataset.voucherMatch.split(":"); markVoucherMatched(kind, rest.join(":")); }));
    $$('[data-inventory-tab]').forEach(el => el.addEventListener("click", () => { state.inventoryTab = el.dataset.inventoryTab; render(); }));
    const treasurySubmit = $("#treasury-adjust-submit"); if (treasurySubmit) treasurySubmit.addEventListener("click", submitTreasuryAdjust);
    const reconStart = $("#recon-start"); if (reconStart) reconStart.addEventListener("click", () => reconAction("start"));
    const reconConfirm = $("#recon-confirm"); if (reconConfirm) reconConfirm.addEventListener("click", () => reconAction("confirm"));
    const reconLock = $("#recon-lock"); if (reconLock) reconLock.addEventListener("click", () => reconAction("lock"));
    const bindSearch = (id, field) => {
      const input = $(id);
      if (!input) return;
      input.addEventListener("input", event => {
        const cursorStart = event.target.selectionStart ?? event.target.value.length;
        state[field] = event.target.value;
        render();
        const next = $(id);
        if (next) { next.focus(); next.setSelectionRange(cursorStart, cursorStart); }
      });
    };
    bindSearch("#order-search", "orderSearch");
    bindSearch("#ledger-search", "ledgerQuery");
    const orderStatusFilter = $("#order-status-filter"); if (orderStatusFilter) orderStatusFilter.addEventListener("change", event => { state.orderStatusFilter = event.target.value; render(); });
    const ledgerBizFilter = $("#ledger-biz-filter"); if (ledgerBizFilter) ledgerBizFilter.addEventListener("change", event => { state.ledgerBizFilter = event.target.value; render(); });
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
    if (state.role === "payout") return renderReceiptMatching();
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
    bindTradeEvents();
    bindDepartmentEvents();
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
    $$('[data-compliance-open-review]').forEach(el => el.addEventListener("click", () => { state.complianceReviewingCase = el.dataset.complianceOpenReview; state.selectedCase = el.dataset.complianceOpenReview; state.complianceConclusionDraft = { decision: "", note: "" }; if (state.role === "compliance") state.view = "cases"; render(); }));
    const complianceReviewBack = $("#compliance-review-back");
    if (complianceReviewBack) complianceReviewBack.addEventListener("click", () => { state.complianceReviewingCase = null; state.complianceConclusionDraft = { decision: "", note: "" }; render(); });
    $$('[name="compliance-conclusion"]').forEach(el => el.addEventListener("change", () => { state.complianceConclusionDraft.decision = el.value; render(); }));
    const materialToggle = $("#conclusion-material-toggle");
    if (materialToggle) {
      const toggleOpen = () => { const draft = state.complianceConclusionDraft; draft.rejectOpen = !draft.rejectOpen; render(); };
      materialToggle.addEventListener("click", event => { if (event.target.closest("[data-conclusion-material-remove]")) return; toggleOpen(); });
      materialToggle.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); toggleOpen(); } });
    }
    $$('[data-conclusion-material]').forEach(el => el.addEventListener("click", () => {
      const draft = state.complianceConclusionDraft;
      draft.rejectItems = draft.rejectItems || [];
      const category = el.dataset.conclusionMaterial;
      draft.rejectItems = draft.rejectItems.includes(category) ? draft.rejectItems.filter(entry => entry !== category) : [...draft.rejectItems, category];
      draft.rejectOpen = true;
      render();
    }));
    $$('[data-conclusion-material-remove]').forEach(el => el.addEventListener("click", event => {
      event.stopPropagation();
      const draft = state.complianceConclusionDraft;
      draft.rejectItems = (draft.rejectItems || []).filter(entry => entry !== el.dataset.conclusionMaterialRemove);
      render();
    }));
    if (state.complianceConclusionDraft?.rejectOpen && $("#conclusion-material-select")) {
      setTimeout(() => document.addEventListener("click", event => {
        if (event.target.closest("#conclusion-material-select")) return;
        if (!state.complianceConclusionDraft?.rejectOpen) return;
        state.complianceConclusionDraft.rejectOpen = false;
        render();
      }, { once: true }), 0);
    }
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
    const muCreateCustomer = $("#mu-create-customer"); if (muCreateCustomer) muCreateCustomer.addEventListener("click", openCustomerModal);
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
    $$('[name="customerEditKind"]').forEach(el => el.addEventListener("change", event => updateNumberEditDraft({ targetCustomerKind: event.target.value })));
    const customerEditParentBroker = $("#customer-edit-parent-broker");
    if (customerEditParentBroker) customerEditParentBroker.addEventListener("change", event => updateNumberEditDraft({ parentId: event.target.value }));
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
            clearQuickLibrarySelections();
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
        if (state.quickMaterialUpload.customerNo !== event.target.value) clearQuickLibrarySelections();
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
          clearQuickLibrarySelections();
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
      clearQuickLibrarySelections();
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
    const quickLibraryToggle = $("[data-quick-library-toggle]"); if (quickLibraryToggle) quickLibraryToggle.addEventListener("click", () => { state.quickMaterialUpload.useLibrary = !state.quickMaterialUpload.useLibrary; render(); });
    $$('[data-quick-library-add]').forEach(el => el.addEventListener("click", () => addQuickLibraryMaterial(el.dataset.quickLibraryAdd)));
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
    const quickSubmitCnName = $("#quick-submit-cn-name"); if (quickSubmitCnName) quickSubmitCnName.addEventListener("input", event => { state.quickMaterialUpload.customerChineseName = event.target.value; });
    const quickSubmitEnName = $("#quick-submit-en-name"); if (quickSubmitEnName) quickSubmitEnName.addEventListener("input", event => { state.quickMaterialUpload.customerEnglishName = event.target.value; });
    $$('[name="quickDestination"]').forEach(el => el.addEventListener("change", event => { state.quickMaterialUpload.destination = event.target.value; render(); }));
    $$('[data-quick-file-remove]').forEach(el => el.addEventListener("click", () => { removeQuickUploadFile(Number(el.dataset.quickFileRemove)); }));
    $$('[data-quick-file-category]').forEach(el => el.addEventListener("change", event => {
      const file = state.quickMaterialUpload.files[Number(el.dataset.quickFileCategory)];
      if (file) file.mappedCategory = event.target.value;
    }));
    const quickUploadClear = $("#quick-upload-clear"); if (quickUploadClear) quickUploadClear.addEventListener("click", () => { state.quickMaterialUpload = initialQuickMaterialUpload(); render(); });
    const quickUploadSubmit = $("#quick-upload-submit"); if (quickUploadSubmit) quickUploadSubmit.addEventListener("click", submitQuickMaterialUpload);
    $$('[data-material-order]').forEach(el => el.addEventListener("click", () => { if (el.dataset.orderAction === "detail") openMaterialOrderDetail(el.dataset.materialOrder); else continueMaterialOrder(el.dataset.materialOrder); }));
    $$('[data-material-cancel]').forEach(el => el.addEventListener("click", () => cancelMaterialOrder(el.dataset.materialCancel)));
    $$('[data-material-record]').forEach(el => el.addEventListener("click", () => openMaterialOrderDetail(el.dataset.materialRecord)));
    const orderSearch = $("#material-order-search"); if (orderSearch) orderSearch.addEventListener("input", () => filterMaterialOrders());
    const orderFilter = $("#material-order-filter"); if (orderFilter) orderFilter.addEventListener("change", () => filterMaterialOrders());
    const materialBackList = $("#material-back-list"); if (materialBackList) materialBackList.addEventListener("click", () => { syncMaterialOrderDraft(); state.materialFlow.mode = "list"; render(); });
    const materialAuthorized = $("#material-authorized"); if (materialAuthorized) materialAuthorized.addEventListener("change", event => { state.materialFlow.authorized = event.target.checked; render(); });
    $$('[data-material-prev]').forEach(el => el.addEventListener("click", () => { state.materialFlow.step = Math.max(1, state.materialFlow.step - 1); syncMaterialOrderDraft(); render(); }));
    $$('[data-material-next]').forEach(el => el.addEventListener("click", () => { saveMaterialFields(); state.materialFlow.step = Math.min(4, state.materialFlow.step + 1); syncMaterialOrderDraft(); render(); }));
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
    const uploadContinue = $("#material-upload-continue"); if (uploadContinue) uploadContinue.addEventListener("click", () => { state.materialFlow.step = 4; syncMaterialOrderDraft(); render(); });
    $$('[data-material-field]').forEach(el => el.addEventListener("input", () => { state.materialFlow.form[el.dataset.materialField] = el.value; state.materialFlow.editedFields.add(el.dataset.materialField); }));
    $$('[data-material-choice]').forEach(el => el.addEventListener("change", () => { const key = el.dataset.materialChoice; if (el.type === "checkbox") { const values = new Set(state.materialFlow.form[key] || []); el.checked ? values.add(el.value) : values.delete(el.value); state.materialFlow.form[key] = [...values]; } else state.materialFlow.form[key] = el.value; state.materialFlow.editedFields.add(key); render(); }));
    const materialConfirmed = $("#material-confirmed"); if (materialConfirmed) materialConfirmed.addEventListener("change", event => { state.materialFlow.confirmed = event.target.checked; render(); });
    const submitMaterialOps = $("#material-submit-ops"); if (submitMaterialOps) submitMaterialOps.addEventListener("click", submitMaterialToOps);
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
    root.innerHTML = `<div class="review-launch-backdrop"><section class="review-launch-dialog" role="dialog" aria-modal="true" aria-labelledby="review-launch-title"><header><div><span>NEW REVIEW</span><h2 id="review-launch-title">选择客户并发起审核</h2><p>客户来自客户管理。已有进行中工单时将继续原工单，不重复创建。</p></div><button class="icon-button" id="review-launch-close" aria-label="关闭" type="button">×</button></header><label class="search-control launch-search">⌕<input id="review-customer-search" placeholder="搜索客户名称或编号" /></label><div class="review-customer-list">${customers.map(customer => { const existing = state.materialOrders.find(order => order.customerId === customer.id && !/审核通过|审核拒绝|已过期|已暂停|已取消/.test(order.status)); return `<article data-launch-search="${escapeHtml(`${customer.name} ${customer.id}`)}"><div class="cell-primary"><span class="avatar ${customer.type === "企业" ? "company" : ""}">${customerInitials(customer)}</span><span><strong>${customer.name}</strong><small>${customer.id} · ${customer.type === "企业" ? "企业 KYB" : "个人 KYC"} · ${customer.status}</small></span></div><div><span>${existing ? "已有进行中工单" : "可发起审核"}</span><small>${existing ? `${existing.id} · ${existing.stage}` : "将创建新的材料审核草稿"}</small></div><button class="btn ${existing ? "" : "btn-primary"}" type="button" ${existing ? `data-continue-order="${existing.id}"` : `data-launch-customer="${customer.id}"`}>${existing ? "继续现有工单" : "选择并发起"} →</button></article>`; }).join("")}</div></section></div>`;
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
    const order = { id: `APP-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${suffix}`, customerId, status: "草稿", stage: "开始申报", step: 1, completeness: "0 / 0", updated: "刚刚", owner: "杨澜", note: "审核工单已创建，等待确认客户授权并上传材料。", history: ["刚刚 · 交易员 发起审核"] };
    state.materialOrders.unshift(order);
    closeMaterialReviewModal();
    startMaterialFlow(customerId, order.id);
    toast("审核工单已创建", `${order.id} 已进入材料准备`);
  }

  function continueMaterialOrder(orderId) {
    const order = state.materialOrders.find(item => item.id === orderId);
    if (!order) return;
    if (["审核拒绝", "已过期", "已取消"].includes(order.status)) {
      order.status = "草稿";
      order.stage = "上传材料";
      order.updated = "刚刚";
      order.history.unshift("刚刚 · 重新发起提交");
      startMaterialFlow(order.customerId, order.id, 3);
      return;
    }
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

  function clearQuickLibrarySelections() {
    state.quickMaterialUpload.files = state.quickMaterialUpload.files.filter(file => file.source !== "library");
  }

  function addQuickLibraryMaterial(libraryKey) {
    const upload = state.quickMaterialUpload;
    const customer = resolveUploadCustomer(upload.customerNo);
    const item = quickMaterialLibraryItems(customer).find(entry => entry.libraryKey === libraryKey);
    if (!item) return;
    if (upload.files.some(file => file.source === "library" && file.libraryKey === libraryKey)) return;
    upload.files.push(quickLibraryFileFromItem(item));
    render();
    toast("已添加材料库材料", item.name);
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
    const submittedCustomerName = [upload.customerChineseName, upload.customerEnglishName].map(value => String(value || "").trim()).filter(Boolean).join(" / ") || String(upload.customerName || "").trim();
    const submittedConfigDetail = [`业务类型：${submittedBusinessType}`, selectedKycChannel && `渠道：${selectedKycChannel.name}`, submittedCustomerName && `客户姓名：${submittedCustomerName}`].filter(Boolean).join(" · ");
    const targetCustomer = customer.uploadTarget || customer;
    targetCustomer.documents = targetCustomer.documents || [];
    targetCustomer.timeline = targetCustomer.timeline || [];
    const intermediary = customerKind(customer) === "中介";
    const archiveSubject = customer.name;
    const archiveLineage = intermediary ? `中介 ${customerNo(customer)} · 主档案库` : `${customerKind(customer)} · ${customerNo(customer)}`;
    const materialRows = upload.files.map(file => {
      const reused = file.source === "library";
      return {
        name: file.name,
        source: reused ? "library" : "upload",
        meta: reused ? `${file.libraryMeta || file.name} · 复用材料库` : `${file.name} · ${formatFileSize(file.size)} · 刚刚上传`,
        category: file.mappedCategory || detectQuickMaterialType([file.name, file.libraryMeta].filter(Boolean).join(" ")),
        state: complianceDestination ? "待合规审核" : "已归档",
        tone: complianceDestination ? "amber" : "teal",
        url: file.url,
        opsDecision: complianceDestination ? "待审核" : "已归档",
        complianceDecision: "待审核",
        versions: [{ version: "v1", name: file.name, time: reused ? (file.uploadedAt || "历史归档") : "刚刚" }]
      };
    });
    const archiveRows = materialRows.filter(item => item.source !== "library");
    const uploadedCount = archiveRows.length;
    const reusedCount = materialRows.length - uploadedCount;

    targetCustomer.documents = [
      ...archiveRows.map(item => ({ name: item.category, meta: item.meta, state: item.state, tone: item.tone, url: item.url, uploadedAt: todayIsoDate(), flow: complianceDestination ? "compliance" : "library", flowLabel: complianceDestination ? destinationLabel.replace("提交到合规", "已提交合规") : "仅存材料库" })),
      ...targetCustomer.documents
    ];
    targetCustomer.updated = "刚刚";
    targetCustomer.timeline.unshift({
      title: complianceDestination ? destinationLabel : "材料保存到客户材料库",
      detail: `${archiveSubject} · ${materialRows.length} 个文件${uploadedCount ? ` · 新上传 ${uploadedCount} 个` : ""}${reusedCount ? ` · 复用材料库 ${reusedCount} 个` : ""} · ${materialRows.map(item => item.category).join("、")} · ${submittedConfigDetail}${submitNote ? ` · 说明：${submitNote}` : ""}`,
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
      targetCustomer.kycTerminated = null;
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
        businessType: submittedBusinessType,
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

    const message = complianceDestination ? `已${destinationLabel}` : uploadedCount ? "已保存到客户材料库" : "已选择材料库材料";
    persistCustomers();
    toast(message, `${customer.name} · ${archiveLineage} · ${materialRows.length} 个文件，可在客户管理查看归档`);
    state.quickMaterialUpload = initialQuickMaterialUpload();
    render();
  }

  function syncMaterialOrderDraft() {
    const flow = state.materialFlow;
    const order = state.materialOrders.find(item => item.id === flow.orderId);
    if (!order || flow.mode !== "work" || /补件/.test(order.status)) return;
    const uploaded = flow.files.filter(item => item.name).length;
    order.step = flow.step;
    if (flow.form.businessType) order.businessType = flow.form.businessType;
    order.status = flow.submitted ? "待审核" : "草稿";
    order.stage = flow.submitted ? "合规审核" : ["开始申报", "客户与业务", "上传材料", "确认提交"][flow.step - 1];
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
      ...initialMaterialFlow(), mode: "work", customerId, orderId, step: Math.min(4, resumeStep), authorized: resumeStep > 1, pdfVersions: previousVersions,
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
      businessType: "公户人民币买私户美金/港币/外币", expectedVolume: "HKD 1,500,000", businessPurpose: "跨境资金结算服务",
      sourceOfWealth: ["Investment", "Others"], servicePurpose: ["Own Funds", "Business"], destination: "Hong Kong", annualAmount: "500k-2m", perTxAmount: "150k-500k"
    } : {
      legalName: customer.name, englishName: customer.enName, birthDate: customer.dob,
      nationality: customer.region, gender: "Male", occupation: "客户经理", idType: "香港身份证", idNo: customer.idMasked, idExpiry: "2031-08-16",
      phone: customer.phone, email: customer.email, address: "香港湾仔港湾道 18 号 1208 室",
      fundSource: "受雇收入及个人储蓄", businessType: "港币/美元/外币私户打款买U",
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
    if (flow.submitted || !flow.confirmed || !flow.files.some(file => file.name)) return;
    const customer = state.customers.find(item => item.id === flow.customerId);
    flow.submitted = true;
    const materialOrder = state.materialOrders.find(item => item.id === flow.orderId);
    if (materialOrder) Object.assign(materialOrder, { status: "待合规审核", stage: "合规审核", step: 4, businessType: flow.form.businessType || materialOrder.businessType, completeness: `${flow.files.filter(file => file.name).length} / ${flow.files.length}`, updated: "刚刚", note: "材料已直接提交合规审核。", history: [`刚刚 · 提交合规审核`, ...materialOrder.history] });
    customer.materialSubmission = { applicationId: flow.applicationId, generationPath: "none", businessType: flow.form.businessType || "", items: flow.files.filter(file => file.name).map(file => ({ ...file })), applicationPdf: null, signedPdf: null, submittedAt: "刚刚" };
    customer.kycTerminated = null;
    setCustomerStatus(customer, "材料审核中", `交易员 ${roles.agent.name}`, "提交材料申报，进入合规审核");
    customer.updated = "刚刚";
    customer.owner = `合规 ${roles.compliance.name}`;
    customer.timeline.unshift({ title: "提交合规审核", detail: `${flow.applicationId} · 材料直接送审`, role: `交易员 ${roles.agent.name}`, time: "刚刚" });
    const existing = state.cases.find(item => item.customerId === customer.id && item.status === "待合规审核");
    const count = customer.materialSubmission.items.length;
    const note = `${flow.applicationId} 材料直接提交合规审核，未生成申请表`;
    let reviewCase = existing;
    if (existing) Object.assign(existing, { source: "交易员 材料申报", businessType: flow.form.businessType || existing.businessType, entered: "刚刚", sla: "剩余 4h", owner: roles.compliance.name, completeness: `${count} / ${count}`, previous: "交易员 提交材料", next: "合规人工复核", note, result: "待合规结论" });
    else {
      reviewCase = { id: `CMP-${flow.applicationId.slice(-6)}`, customerId: customer.id, customer: customer.name, type: customer.type === "企业" ? "企业 KYB" : "个人 KYC", businessType: flow.form.businessType || "", status: "待合规审核", source: "交易员 材料申报", agent: customer.agent, owner: roles.compliance.name, entered: "刚刚", sla: "剩余 4h", risk: customer.risk, completeness: `${count} / ${count}`, previous: "交易员 提交材料", next: "合规人工复核", note, bankRef: "未提交", result: "待合规结论" };
      state.cases.unshift(reviewCase);
    }
    if (reviewCase) state.caseReviewDrafts[reviewCase.id] = createCaseReviewDraft(reviewCase, customer);
    persistCustomers();
    render();
    toast("已提交合规审核", `${flow.applicationId} 已进入合规审核队列`);
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
    root.innerHTML = `<div class="pdf-modal-backdrop"><section class="pdf-modal" role="dialog" aria-modal="true" aria-labelledby="pdf-modal-title"><header><div><span>FILE PREVIEW</span><h2 id="pdf-modal-title">${escapeHtml(filename)}</h2></div><div class="case-actions"><a class="btn btn-primary" href="${url}" download="${escapeHtml(filename)}">下载文件</a><button class="btn" id="pdf-modal-close" type="button">关闭</button></div></header><iframe title="${escapeHtml(filename)} 文件预览" src="${url}"></iframe></section></div>`;
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
      order.status = "待补件";
      order.stage = "补件处理中";
      order.updated = "刚刚";
      order.note = reviewDraft?.notificationText || detail;
      order.history.unshift("刚刚 · 运营发起补件");
    }
    if (order && nextStatus === "待合规审核") {
      order.status = "待审核";
      order.stage = "已提交合规";
      order.updated = "刚刚";
      order.note = item.note;
      order.history.unshift("刚刚 · 提交合规复核");
    }
    if (order && nextStatus === "合规驳回") {
      order.status = "待补件";
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

  function updateNumberEditDraft(patch) {
    if (!state.numberEdit) return;
    const form = $("#number-edit-form");
    const current = form ? {
      clientNo: form.querySelector('[name="clientNo"]')?.value.trim() ?? state.numberEdit.clientNo,
      name: form.querySelector('[name="name"]')?.value.trim() ?? state.numberEdit.name,
      region: form.querySelector('[name="region"]')?.value || "",
      agent: form.querySelector('[name="agent"]')?.value ?? state.numberEdit.agent,
      phone: form.querySelector('[name="phone"]')?.value.trim() ?? state.numberEdit.phone,
      followTrader: form.querySelector('[name="followTrader"]')?.value.trim() ?? state.numberEdit.followTrader,
      remark: form.querySelector('[name="remark"]')?.value ?? state.numberEdit.remark,
      subType: form.querySelector('[name="subType"]')?.value ?? state.numberEdit.subType,
      targetCustomerKind: form.querySelector('[name="customerEditKind"]:checked')?.value || state.numberEdit.targetCustomerKind || state.numberEdit.customerKind,
      parentId: form.querySelector('[name="parentId"]')?.value || state.numberEdit.parentId || ""
    } : {};
    state.numberEdit = { ...state.numberEdit, ...current, ...patch, error: "" };
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
    /* 新建后清空筛选：客户管理必须展示全部客户，新客户已排在列表首位 */
    state.customerSearch = "";
    state.customerStatus = "全部状态";
    state.customerType = "全部类型";
    state.customerPage = 1;
    /* 从材料上传页发起新建时，保持停留在当前页面，并把新客户直接选入第一步 */
    const fromMaterialUpload = state.view === "materialsUpload";
    if (fromMaterialUpload) {
      state.quickMaterialUpload.customerNo = displayNo ? `${draft.name} (${displayNo})` : draft.name;
      state.quickMaterialUpload.customerDropdownOpen = false;
      state.quickMaterialUpload.customerHighlightIndex = 0;
    }
    persistCustomers();
    render();
    toast("客户已新建", fromMaterialUpload
      ? `${displayNo || "无编号"} · ${draft.name}，已在客户管理建档并选入本次上传`
      : `${displayNo || "无编号"} · ${draft.name}`);
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
      targetCustomerKind: customerKind(customer),
      parentId: "",
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
      targetCustomerKind: form.querySelector('[name="customerEditKind"]:checked')?.value || state.numberEdit.targetCustomerKind || state.numberEdit.customerKind,
      parentId: form.querySelector('[name="parentId"]')?.value || state.numberEdit.parentId || "",
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
    const convertingDirectToBroker = state.numberEdit.mode !== "sub" && state.numberEdit.customerKind === "直客" && draft.targetCustomerKind === "中介";
    if (convertingDirectToBroker) {
      const previous = customer.clientNo || customer.id;
      Object.assign(customer, {
        clientNo: value,
        name: draft.name,
        enName: customer.enName || draft.name,
        customerKind: "中介",
        type: "企业",
        region: draft.region,
        agent: draft.agent,
        followTrader: draft.followTrader,
        phone: draft.phone || "待填写",
        source: draft.remark || customer.source || "客户信息维护",
        owner: draft.agent ? `交易员 ${draft.agent}` : customer.owner,
        updated: "刚刚",
        subCustomers: customer.subCustomers || []
      });
      customer.timeline = customer.timeline || [];
      customer.timeline.unshift({ title: "转为中介客户", detail: `编号 ${previous} 保留为 ${value}，该客户现在可挂载中介下级客户`, role: `交易员 ${roles.agent.name}`, time: "刚刚" });
      if (!state.expandedIntermediaries.includes(customer.id)) state.expandedIntermediaries.unshift(customer.id);
      state.numberEdit = null;
      state.customerSearch = draft.name;
      state.customerStatus = "全部状态";
      state.customerType = "全部类型";
      state.customerPage = 1;
      persistCustomers();
      render();
      toast("客户已转为中介", `${draft.name} 现在可挂载下级客户`);
      return;
    }
    const convertingDirectToSub = state.numberEdit.mode !== "sub" && state.numberEdit.customerKind === "直客" && draft.targetCustomerKind === "中介下级客户";
    if (convertingDirectToSub && !draft.parentId) {
      state.numberEdit = { ...draft, error: "请选择所属中介。" };
      render();
      return;
    }
    if (convertingDirectToSub) {
      const parentBroker = state.customers.find(item => item.id === draft.parentId && customerKind(item) === "中介");
      const customerIndex = state.customers.findIndex(item => item.id === state.numberEdit.customerId);
      const existingCustomer = state.customers[customerIndex];
      if (!parentBroker || !existingCustomer || customerIndex < 0) {
        state.numberEdit = { ...draft, error: "未找到可挂载的中介，请重新选择。" };
        render();
        return;
      }
      const previous = existingCustomer.clientNo || existingCustomer.id;
      const convertedChild = {
        ...existingCustomer,
        clientNo: value,
        name: draft.name,
        customerKind: "中介下级客户",
        type: draft.subType || existingCustomer.type || "",
        region: draft.region || parentBroker.region,
        agent: draft.agent,
        followTrader: draft.followTrader,
        phone: draft.phone || "待填写",
        source: draft.remark || existingCustomer.source || `挂载至中介 ${parentBroker.name}`,
        owner: draft.agent ? `交易员 ${draft.agent}` : existingCustomer.owner,
        updated: "刚刚同步",
        parentBroker: { id: parentBroker.id, name: parentBroker.name, clientNo: parentBroker.clientNo },
        timeline: [
          { title: "转为中介下级客户", detail: `${draft.name} 已挂载至 ${parentBroker.name}，编号 ${previous} 保留为 ${value || "无编号"}`, role: `交易员 ${roles.agent.name}`, time: "刚刚" },
          ...(existingCustomer.timeline || [])
        ]
      };
      delete convertedChild.subCustomers;
      state.customers.splice(customerIndex, 1);
      parentBroker.subCustomers = parentBroker.subCustomers || [];
      parentBroker.subCustomers.unshift(convertedChild);
      parentBroker.updated = "刚刚";
      parentBroker.timeline = parentBroker.timeline || [];
      parentBroker.timeline.unshift({ title: "新增中介下级客户", detail: `${draft.name} 已从直客转为 ${parentBroker.name} 的下级客户`, role: `交易员 ${roles.agent.name}`, time: "刚刚" });
      if (!state.expandedIntermediaries.includes(parentBroker.id)) state.expandedIntermediaries.unshift(parentBroker.id);
      state.numberEdit = null;
      state.customerSearch = draft.name;
      state.customerStatus = "全部状态";
      state.customerType = "全部类型";
      state.customerPage = 1;
      persistCustomers();
      render();
      toast("已添加所属中介", `${draft.name} 已挂载至 ${parentBroker.name}`);
      return;
    }
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
    $("#detail-drawer").innerHTML = `<div class="drawer-head"><div><p class="eyebrow">${eyebrow}</p><h2>${escapeHtml(customer.name)} ${(lc => `<span class="status status-${lc.tone}">${lc.label}</span>`)(customerLifecycle(customer))}</h2><p>${escapeHtml(customerNo(customer))} · ${escapeHtml(customer.enName)}</p></div><button class="drawer-close" aria-label="关闭客户详情" type="button">×</button></div><div class="drawer-tabs">${tabs.map(([key, label]) => `<button class="drawer-tab ${state.drawerTab === key ? "active" : ""}" data-drawer-tab="${key}">${label}</button>`).join("")}</div><div class="drawer-body">${renderDrawerBody(customer)}</div>`;
    $(".drawer-close").addEventListener("click", closeDrawer);
    $$('[data-drawer-tab]').forEach(tab => tab.addEventListener("click", () => { state.drawerTab = tab.dataset.drawerTab; state.drawerApplication = null; renderDrawer(); }));
    $$('[data-drawer-app]', $("#detail-drawer")).forEach(button => button.addEventListener("click", () => {
      const records = customerApplications(customer);
      const expandedId = state.drawerApplication === null ? records[0]?.id : state.drawerApplication;
      state.drawerApplication = expandedId === button.dataset.drawerApp ? "" : button.dataset.drawerApp;
      renderDrawer();
    }));
    $$('[data-pdf-preview]', $("#detail-drawer")).forEach(el => el.addEventListener("click", () => openPdfPreview(el.dataset.pdfPreview, el.dataset.pdfName)));
    $$('[data-lifecycle-pause]', $("#detail-drawer")).forEach(button => button.addEventListener("click", () => {
      const target = state.customers.find(item => item.id === button.dataset.lifecyclePause);
      if (!target) return;
      showConfirm(`暂停与 ${target.name} 的合作？`, "人工标记暂停维护：客户明确不合作、风险原因或长期失联。暂停后列表状态显示「暂停合作」。", "暂停原因", "风险原因暂停", "确认暂停", note => {
        target.lifecyclePaused = { reason: note || "人工暂停维护", by: `${roles[state.role].label} ${roles[state.role].name}`, time: nowDateTime() };
        target.timeline?.unshift({ title: "暂停合作", detail: note || "人工标记暂停维护", role: `${roles[state.role].label} ${roles[state.role].name}`, time: "刚刚" });
        persistCustomers(); render(); renderDrawer();
        toast("已暂停合作", `${target.name} 状态更新为暂停合作`);
      });
    }));
    $$('[data-lifecycle-resume]', $("#detail-drawer")).forEach(button => button.addEventListener("click", () => {
      const target = state.customers.find(item => item.id === button.dataset.lifecycleResume);
      if (!target) return;
      showConfirm(`恢复与 ${target.name} 的合作？`, "人工恢复维护、风险解除或客户重新确认合作后，状态回到活跃 / 新客户。", "恢复说明", "风险解除，恢复维护", "确认恢复", note => {
        target.lifecyclePaused = null;
        target.lifecycleDormant = false;
        target.timeline?.unshift({ title: "恢复合作", detail: note || "人工恢复维护", role: `${roles[state.role].label} ${roles[state.role].name}`, time: "刚刚" });
        persistCustomers(); render(); renderDrawer();
        toast("已恢复合作", `${target.name} 重新进入维护`);
      });
    }));
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
    const lifecycle = customerLifecycle(customer);
    var lifecycleBlock = `<div class="drawer-lifecycle-row"><span>合作生命周期</span><span class="status status-${lifecycle.tone}">${lifecycle.label}</span>${customer.lifecyclePaused ? `<small>${escapeHtml(customer.lifecyclePaused.reason || "人工暂停维护")} · ${escapeHtml(customer.lifecyclePaused.by || "")} ${escapeHtml(customer.lifecyclePaused.time || "")}</small>` : ""}<span class="drawer-lifecycle-actions">${customer.lifecyclePaused
      ? `<button class="btn btn-sm" type="button" data-lifecycle-resume="${customer.id}">恢复合作</button>`
      : `<button class="btn btn-sm" type="button" data-lifecycle-pause="${customer.id}">暂停合作</button>`}</span></div>`;
    const log = customer.statusLog || [];
    return `<section class="drawer-status-section">
      <h3>状态管理</h3>
      ${lifecycleBlock}
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

  /* 准入状态（表2）：草稿 → 待审核 → 审核通过 / 待补件 / 审核拒绝；通过后可能 已过期 / 已暂停；补件超时可 已取消 */
  function applicationStatusDisplay(status = "") {
    if (/已过期/.test(status)) return { label: "已过期", tone: "warning" };
    if (/已暂停/.test(status)) return { label: "已暂停", tone: "neutral" };
    if (/终止|取消/.test(status)) return { label: "已取消", tone: "neutral" };
    if (/拒绝|驳回/.test(status)) return { label: "审核拒绝", tone: "danger" };
    if (/补件/.test(status)) return { label: "待补件", tone: "warning" };
    if (/通过|已排单|交易中|已成交|已批准|银行/.test(status)) return { label: "审核通过", tone: "success" };
    if (/草稿|未完成/.test(status)) return { label: "草稿", tone: "neutral" };
    return { label: "待审核", tone: "info" };
  }

  function customerApplications(c) {
    const accessType = c.type === "企业" ? "企业 KYB 准入" : "个人 KYC 准入";
    const orders = state.materialOrders.filter(order => order.customerId === c.id).map(order => ({
      kind: "准入申请", icon: "APP", id: order.id, type: order.businessType || accessType, status: order.status,
      source: `交易员 ${order.owner} 提交`, agent: order.owner, owner: order.owner, time: order.updated,
      stage: order.stage, completeness: order.completeness, note: order.note, history: order.history || [],
      withMaterials: true
    }));
    const cases = state.cases.filter(item => item.customerId === c.id).map(item => ({
      kind: "审核案件", icon: applicationCaseIcon(item.type), id: item.id, type: item.businessType || item.type, status: item.status,
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
    const bundleItems = c.type === "企业"
      ? ["BR / 企业注册证书", "CI / 公司注册证书", "NAR1 / 周年申报表", "董事及签署人身份证明", "25% 以上股权股东身份证明", "股东架构图", "公户最近一个月月结单", "Onboarding Form + Board Resolution"]
      : ["身份证明文件", "三个月有效地址证明", "近三个月银行流水", "手持证件自拍照", "签署 KYC 表格"];
    return (c.documents || []).flatMap(doc => {
      if (!/文件包|\.zip/.test(`${doc.name}${doc.meta || ""}`)) return [{ name: doc.name, meta: doc.meta, state: doc.state }];
      return bundleItems.map(name => ({ name, meta: `来自 ${doc.name}`, state: doc.state }));
    });
  }

  function renderApplicationDetail(c, record) {
    const materials = record.withMaterials ? applicationMaterials(c) : [];
    const display = applicationStatusDisplay(record.status);
    const materialCount = materials.length || Number(String(record.completeness || "").split("/").pop()?.trim()) || 0;
    const fields = [
      ["提交人", record.agent ? `交易员 ${record.agent}` : "—"],
      ["审核人", record.owner || "—"],
      ["审核通过时间", display.label === "审核通过" ? (record.time || "—") : "—"],
      ["材料数量", materialCount ? `${materialCount} 项` : "—"]
    ];
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
      const display = applicationStatusDisplay(record.status);
      return `<article class="application-card ${open ? "open" : ""}">
        <button class="application-summary" type="button" data-drawer-app="${escapeHtml(record.id)}" aria-expanded="${open}">
          <span class="doc-icon">${escapeHtml(record.icon)}</span>
          <div><strong>${escapeHtml(record.type)}</strong><small>${escapeHtml(record.id)} · ${escapeHtml(record.kind)} · ${escapeHtml(record.time)}</small></div>
          <span class="status status-${display.tone}">${display.label}</span>
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
  function resetAll() { localStorage.removeItem(customerStorageKey); const templates = initialScheduleTemplates(); state = { role: "agent", view: "dashboard", customers: initialCustomers(), cases: initialCases(), caseReviewDrafts: {}, flowIndex: 0, caseStatus: "待运营审核", selectedCase: "OPS-260718", commissionConfirmed: false, materialFlow: initialMaterialFlow(), quickMaterialUpload: initialQuickMaterialUpload(), kycConfig: initialKycConfig(), materialOrders: initialMaterialOrders(), scheduleTemplates: templates, scheduleOrders: initialScheduleOrders(templates), scheduleNavOpen: true, businessAccessNavOpen: true, payoutOrders: [], dispatchModal: null, dispatchSearch: "", dispatchViewOrder: null, payoutReceiptModal: null, auditTab: "pending", payoutOpsTab: "queue", quote: initialQuoteState(), selectedScheduleTemplateId: "", scheduleForm: initialScheduleForm(null), scheduleTemplateDraft: { name: "", description: "", fields: initialScheduleForm(null) }, customerSearch: "", customerStatus: "全部状态", customerType: "全部类型", customerPage: 1, expandedIntermediaries: ["C-2026-0694"], customerModal: null, numberEdit: null, drawerCustomer: null, drawerTab: "overview", drawerApplication: null, complianceQueueTab: "pending", complianceQueueSearch: "", complianceQueueType: "全部审核类型", complianceQueueStatus: "全部状态", complianceQueueConclusion: "全部", complianceReviewingCase: null, complianceConclusionDraft: { decision: "", note: "" }, createStep: 1, draftCustomer: { type: "个人", name: "", enName: "", region: "中国香港", agent: "杨澜", business: "SINO", relation: "新客户" }, mobileNav: false }; state.caseReviewDrafts = initialCaseReviewDrafts(state.cases, state.customers); state.payoutOrders = initialPayoutOrders(state.customers); Object.assign(state, { tradeOrders: [], payments: [], treasury: [], ledger: [], ledgerSeq: 120, recon: null, orderView: null, orderModal: null, paymentModal: null, orderSearch: "", orderStatusFilter: "全部状态", paymentTab: "pending", exceptionTab: "all", inventoryTab: "overview", ledgerBizFilter: "全部类型", ledgerQuery: "", exceptionResolvedCount: 3, departmentMembers: initialDepartmentMembers(), departmentLeaves: initialDepartmentLeaves(), departmentTab: "calendar", departmentWeekOffset: 0, leaveDraft: initialLeaveDraft(), leavePanelOpen: false, selectedLeaveId: null }); seedTradeCore(state); $("#role-select").value = state.role; render(); toast("演示数据已重置", "可以重新开始业务演示"); }
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
