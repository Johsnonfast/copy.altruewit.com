# Altruewit 网站部署指南

## 📋 当前状态
✅ 代码已准备就绪（本地Git仓库初始化完成）
✅ RFQ表单优化完成（显示友好提示）
✅ 本地测试通过

## 🚀 快速部署步骤（10-15分钟）

### 步骤1: 登录GitHub CLI（如未登录）
```bash
# 在终端运行（需要交互式登录）
gh auth login
```
选择：
- GitHub.com
- HTTPS
- 登录方式（浏览器或token）

### 步骤2: 创建GitHub仓库并推送代码
```bash
# 方法A: 使用GitHub CLI自动创建（推荐）
gh repo create altruewit --public --source=. --remote=origin --push

# 方法B: 手动创建（如果方法A失败）
# 1. 访问 https://github.com/new
# 2. 仓库名: altruewit
# 3. 选择"Public"
# 4. 不要初始化README/.gitignore
# 5. 创建后运行:
git remote add origin https://github.com/你的用户名/altruewit.git
git branch -M main
git push -u origin main
```

### 步骤3: 创建Vercel账户并部署
1. **访问** [vercel.com](https://vercel.com)
2. **登录** 使用GitHub账户
3. **导入项目**:
   - 点击"New Project"
   - 选择 `altruewit` 仓库
   - 点击"Import"
4. **配置设置**:
   - Framework Preset: 选择"Other"
   - Build Command: 留空
   - Output Directory: `.`
   - 点击"Deploy"
5. **等待部署完成** (1-2分钟)

### 步骤4: 验证部署
访问临时域名: `https://altruewit.vercel.app`

**测试页面:**
- 首页: https://altruewit.vercel.app/
- 产品页: https://altruewit.vercel.app/products/
- OEM定制: https://altruewit.vercel.app/oem-customization/
- 联系我们: https://altruewit.vercel.app/contact/

## ⚡ 一键部署脚本
创建文件 `deploy.sh`:
```bash
#!/bin/bash

echo "=== Altruewit 部署脚本 ==="

# 检查GitHub CLI登录状态
if ! gh auth status &>/dev/null; then
    echo "请先登录GitHub CLI:"
    echo "运行: gh auth login"
    exit 1
fi

# 创建GitHub仓库
echo "创建GitHub仓库..."
gh repo create altruewit --public --source=. --remote=origin --push

echo "✅ 代码已推送到GitHub"
echo ""
echo "=== 下一步 ==="
echo "1. 访问 https://vercel.com"
echo "2. 使用GitHub登录"
echo "3. 导入 'altruewit' 仓库"
echo "4. 点击'Deploy'"
echo ""
echo "临时域名: https://altruewit.vercel.app"
```

运行脚本:
```bash
chmod +x deploy.sh
./deploy.sh
```

## 🔧 故障排除

### GitHub CLI登录问题
```bash
# 检查登录状态
gh auth status

# 登出重新登录
gh auth logout
gh auth login
```

### 推送代码失败
```bash
# 检查远程配置
git remote -v

# 强制推送（谨慎使用）
git push -f origin main
```

### Vercel部署失败
1. 检查Vercel Dashboard → Deployments → Logs
2. 确认GitHub仓库权限
3. 尝试重新部署

## 📞 联系信息
如需协助，请提供:
1. GitHub用户名: _________
2. 遇到的错误信息: _________

## 🎯 部署完成标志
- [ ] GitHub仓库创建成功
- [ ] 代码推送到GitHub
- [ ] Vercel项目部署完成
- [ ] 临时域名可访问
- [ ] 所有页面加载正常