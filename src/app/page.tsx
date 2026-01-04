import Link from "next/link";

const routes = [
  { path: "/react-hook-form", name: "react-hook-form" },
  { path: "/combobox", name: "Combobox 组合框" },
  { path: "/select-box", name: "Select Box 下拉搜索选择框" },
  { path: "/accordion", name: "Accordion 手风琴" },
  { path: "/alert-dialog", name: "Alert Dialog 警告对话框" },
  { path: "/alert", name: "Alert 警告" },
  { path: "/aspect-ratio", name: "Aspect Ratio 宽高比" },
  { path: "/avatar", name: "Avatar 头像" },
  { path: "/badge", name: "Badge 标签" },
  { path: "/breadcrumb", name: "Breadcrumb 面包屑" },
  { path: "/button-group", name: "Button Group 按钮组" },
  { path: "/button", name: "Button 按钮" },
  { path: "/calendar", name: "Calendar 日历" },
  { path: "/card", name: "Card 卡片" },
  { path: "/carousel", name: "Carousel 轮播" },
  { path: "/checkbox", name: "Checkbox 复选框" },
  { path: "/collapsible", name: "Collapsible 可折叠" },
  { path: "/command", name: "Command 命令" },
  { path: "/context-menu", name: "Context Menu 右键菜单" },
  { path: "/date-picker", name: "Date Picker 日期选择器" },
  { path: "/dialog", name: "Dialog 对话框" },
  { path: "/drawer", name: "Drawer 抽屉" },
  { path: "/dropdown-menu", name: "Dropdown Menu 下拉菜单" },
  { path: "/empty", name: "Empty 空状态" },
  { path: "/hover-card", name: "Hover Card 悬停卡片" },
  { path: "/input-group", name: "Input Group 输入框组" },
  { path: "/input-otp", name: "Input OTP OTP输入" },
  { path: "/input", name: "Input 输入框" },
  { path: "/item", name: "Item 项目" },
  { path: "/kbd", name: "KBD 键盘按键" },
  { path: "/label", name: "Label 标签" },
  { path: "/menubar", name: "Menubar 菜单栏" },
  { path: "/native-select", name: "Native Select 原生选择器" },
  { path: "/navigation-menu", name: "Navigation Menu 导航菜单" },
  { path: "/pagination", name: "Pagination 分页" },
  { path: "/popover", name: "Popover 弹出框" },
  { path: "/progress", name: "Progress 进度条" },
  { path: "/radio-group", name: "Radio Group 单选组" },
  { path: "/resizable", name: "Resizable 可调整大小" },
  { path: "/scroll-area", name: "Scroll Area 滚动区域" },
  { path: "/select", name: "Select 选择器" },
  { path: "/separator", name: "Separator 分隔符" },
  { path: "/sheet", name: "Sheet 工作表" },
  { path: "/skeleton", name: "Skeleton 骨架屏" },
  { path: "/slider", name: "Slider 滑块" },
  { path: "/sonner", name: "Sonner 通知提示" },
  { path: "/spinner", name: "Spinner 加载动画" },
  { path: "/switch", name: "Switch 开关" },
  { path: "/table", name: "Table 表格" },
  { path: "/tabs", name: "Tabs 选项卡" },
  { path: "/textarea", name: "Textarea 文本域" },
  { path: "/toggle-group", name: "Toggle Group 切换组" },
  { path: "/toggle", name: "Toggle 切换" },
  { path: "/tooltip", name: "Tooltip 工具提示" },
  { path: "/typography", name: "Typography 排版" },
];

export default function Home() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">shadcn/ui 组件库示例</h1>
          <p className="text-muted-foreground text-lg">
            基于 Next.js 和 shadcn/ui 的组件演示项目
          </p>
        </div>

        <div className="border rounded-lg p-6 bg-card">
          <h2 className="text-2xl font-semibold mb-6">组件目录</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className="flex items-center gap-2 p-3 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <span className="text-sm font-medium">{route.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>共 {routes.length} 个组件示例</p>
        </div>
      </div>
    </div>
  );
}
