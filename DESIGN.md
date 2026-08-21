---
name: Bitvast Workbench
description: 交易执行、客户准入、地址校验、资金运营与合规审批的一体化工作台
colors:
  ink-950: "oklch(24% 0.018 175)"
  ink-600: "oklch(49% 0.013 175)"
  ink-200: "oklch(86% 0.008 175)"
  ink-100: "oklch(93% 0.006 175)"
  paper: "oklch(98.2% 0.006 92)"
  surface: "oklch(99.3% 0.004 92)"
  surface-muted: "oklch(96.5% 0.007 100)"
  orange-primary: "oklch(58% 0.183 51)"
  orange-hover: "oklch(66% 0.196 53)"
  orange-soft: "oklch(93.5% 0.055 66)"
  amber-warning: "oklch(53% 0.11 72)"
  amber-soft: "oklch(94% 0.045 82)"
  red-danger: "oklch(48% 0.15 27)"
  red-soft: "oklch(94% 0.035 25)"
  blue-info: "oklch(45% 0.105 245)"
  blue-soft: "oklch(94% 0.028 245)"
typography:
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Microsoft YaHei, system-ui, sans-serif"
    fontSize: "26px"
    fontWeight: 700
    lineHeight: 1.18
    letterSpacing: "-0.035em"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Microsoft YaHei, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Microsoft YaHei, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Microsoft YaHei, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 650
    lineHeight: 1.4
rounded:
  sm: "7px"
  md: "11px"
  lg: "16px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "34px"
components:
  button-primary:
    backgroundColor: "{colors.orange-primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: "0 14px"
    height: "38px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-950}"
    rounded: "{rounded.sm}"
    padding: "0 14px"
    height: "38px"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-950}"
    rounded: "{rounded.sm}"
    padding: "8px 10px"
    height: "40px"
  status-success:
    backgroundColor: "{colors.orange-soft}"
    textColor: "{colors.orange-primary}"
    rounded: "{rounded.pill}"
    padding: "3px 8px"
---

# Design System: Bitvast Workbench

## Overview

**Creative North Star: "安静的运营控制台"**

Bitvast Workbench 是供 Agent / Sales、Operations Staff 和 Compliance Officer 在日间办公室持续使用的高密度产品界面。页面首先回答当前交易状态、责任人和下一步动作，再渐进披露客户资料、地址校验、收付款凭证、规则依据和历史事件。

系统拒绝传统银行后台的老旧表格堆叠、狭窄字号、颜色繁杂和层级混乱。可预测的导航、固定字号和清晰状态是信任的来源；装饰不参与业务表达。

**Key Characteristics:**
- 暖色纸张背景与深墨侧栏构成稳定框架
- Bitvast 橙色只标记主操作、选择和进度
- 数据表格紧凑，表单和详情保持充足留白
- 150–240ms 状态动效，减少动画偏好下近乎即时
- 桌面侧栏在 820px 以下转为可收起导航

## Colors

暖灰中性色覆盖绝大部分界面，带橙色倾向的深墨色提供稳定文字与侧栏，Bitvast 橙色作为唯一业务强调色。警告、危险和信息色只出现在明确状态中。

**The One Voice Rule.** `orange-primary` 在单屏中只用于主操作、当前选择和关键进度。它的稀少就是层级。

**The Semantic Pair Rule.** 每个语义深色都必须与对应浅色背景配对，并且始终附带文字；禁止只用颜色表达风险。

## Typography

全系统使用平台系统无衬线字体栈，在中文和英文办公环境中保持原生、快速和清楚。页面标题为 26px，区块标题为 18px，正文为 14px，表格与控件标签使用 10–12px。

正文说明限制在约 70 个字符宽度。表格可以更宽，但禁止通过缩小字号塞入更多列。

**The Operational Clarity Rule.** 标题负责定位，标签负责解释，数字负责比较。禁止使用展示字体、渐变文字或无业务意义的超大数字。

## Elevation

界面以色调分层和 1px 细边界表达结构。静态区块没有阴影；只有抽屉、确认层和 Toast 使用 `0 22px 60px` 的柔和悬浮阴影。

**The Flat-by-Default Rule.** 只有暂时离开文档流的元素才获得阴影。如果一张静态卡片看起来悬浮，它就过度设计了。

## Components

### Buttons

- **Shape:** 稳定轻圆角（7px），标准高度 38px，小尺寸 32px。
- **Primary:** Bitvast 橙色底与暖白文字，只给当前页面的首要动作。
- **Secondary:** 暖白底、细中性边界，用于查看、返回和次要动作。
- **Focus:** 3px 半透明橙色焦点环，键盘操作始终可见。

### Status chips

- **Style:** 文字、5px 圆点和浅色背景共同表达状态。
- **Shape:** 完全胶囊形，只用于状态和风险，不作为普通装饰标签。

### Cards / Containers

- **Corner Style:** 主要容器 11px，内部紧凑容器 7px。
- **Background:** 主要内容使用 `surface`，次级处理区使用 `surface-muted`。
- **Border:** 1px `ink-100`，禁止彩色粗侧边线和嵌套卡片。

### Inputs / Fields

- **Style:** 40px 最小高度、7px 圆角、1px 中性边界。
- **Focus:** 边界切换为橙色并显示焦点环。
- **Error:** 使用危险色说明和文字原因，不通过晃动或只变红提示。

### Navigation

- 深墨侧栏宽 232px，当前项使用低对比橙色底。
- 顶栏高 68px，承载搜索、角色视角和当前用户。
- 820px 以下隐藏侧栏并显示菜单按钮；主内容保持完整键盘可达。

### Workflow stepper

- 已完成步骤使用实心橙色和勾号，当前步骤使用橙色描边与外环，未来步骤保持中性。
- 高层步骤与实际动作分离，允许补件和角色切换等多个动作落在同一业务阶段。

## Do's and Don'ts

### Do:
- **Do** 优先展示当前责任、截止时间和下一步动作。
- **Do** 让客户主档、审批、地址、库存、凭证、交易和佣金共用一条可追溯时间线。
- **Do** 使用 7px / 11px 两级圆角和 8px 基础间距节奏。
- **Do** 让颜色、文字和形状共同表达状态，并满足 WCAG 2.1 AA。

### Don't:
- **Don't** 采用“老旧表格堆叠、狭窄字号、颜色繁杂和层级混乱”的传统银行后台观感。
- **Don't** 使用装饰性金融图形、夸张渐变、玻璃拟态或缺乏业务意义的动画。
- **Don't** 把所有信息包装成相同卡片，禁止嵌套卡片和大于 1px 的彩色侧边线。
- **Don't** 使用纯黑或纯白，所有中性色必须带轻微品牌色温。
- **Don't** 让 OCR 或规则建议看起来像已经替代人工决定。
