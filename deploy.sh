#!/bin/bash

# Altruewit Deployment Script
# 一键部署到GitHub和Vercel

set -e  # Exit on error

echo "========================================"
echo "   Altruewit 网站部署脚本"
echo "========================================"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored messages
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check required tools
check_requirements() {
    print_info "检查系统依赖..."
    
    # Check git
    if ! command -v git &> /dev/null; then
        print_error "Git未安装，请先安装Git"
        exit 1
    fi
    print_success "Git已安装"
    
    # Check GitHub CLI
    if ! command -v gh &> /dev/null; then
        print_warning "GitHub CLI未安装，将使用手动方法"
        USE_GH_CLI=false
    else
        print_success "GitHub CLI已安装"
        USE_GH_CLI=true
    fi
    
    # Check if in git repository
    if [ ! -d ".git" ]; then
        print_error "当前目录不是Git仓库"
        exit 1
    fi
    print_success "在Git仓库中"
}

# Check GitHub CLI authentication
check_github_auth() {
    if [ "$USE_GH_CLI" = true ]; then
        print_info "检查GitHub CLI登录状态..."
        if gh auth status &>/dev/null; then
            print_success "GitHub CLI已登录"
            return 0
        else
            print_warning "GitHub CLI未登录"
            echo ""
            echo "请选择登录方式:"
            echo "1. 浏览器登录（推荐）"
            echo "2. Token登录"
            echo "3. 跳过，使用手动方法"
            echo ""
            read -p "请选择 (1/2/3): " auth_choice
            
            case $auth_choice in
                1)
                    print_info "正在打开浏览器登录..."
                    gh auth login --web
                    ;;
                2)
                    print_info "请访问 https://github.com/settings/tokens 创建token"
                    print_info "需要权限: repo, workflow"
                    read -p "请输入GitHub Token: " github_token
                    echo "$github_token" | gh auth login --with-token
                    ;;
                3)
                    USE_GH_CLI=false
                    print_info "将使用手动部署方法"
                    ;;
                *)
                    print_error "无效选择，使用手动方法"
                    USE_GH_CLI=false
                    ;;
            esac
        fi
    fi
}

# Create GitHub repository
create_github_repo() {
    print_info "创建GitHub仓库..."
    
    if [ "$USE_GH_CLI" = true ]; then
        # Try to create repo with GitHub CLI
        print_info "使用GitHub CLI创建仓库..."
        if gh repo create altruewit --public --source=. --remote=origin --push 2>/dev/null; then
            print_success "GitHub仓库创建成功并已推送代码"
            return 0
        else
            print_warning "GitHub CLI创建失败，使用手动方法"
            USE_GH_CLI=false
        fi
    fi
    
    # Manual method
    if [ "$USE_GH_CLI" = false ]; then
        print_info "请手动创建GitHub仓库:"
        echo ""
        echo "1. 访问 https://github.com/new"
        echo "2. 仓库名: altruewit"
        echo "3. 选择 'Public'"
        echo "4. 不要初始化README/.gitignore"
        echo "5. 创建仓库"
        echo ""
        read -p "仓库创建完成后按Enter继续..." -n 1
        
        # Get GitHub username
        read -p "请输入您的GitHub用户名: " github_username
        if [ -z "$github_username" ]; then
            print_error "需要GitHub用户名"
            exit 1
        fi
        
        # Set remote and push
        print_info "配置远程仓库并推送代码..."
        git remote remove origin 2>/dev/null || true
        git remote add origin "https://github.com/$github_username/altruewit.git"
        git branch -M main
        
        print_info "推送代码到GitHub..."
        if git push -u origin main; then
            print_success "代码推送成功"
        else
            print_error "推送失败，请检查网络或权限"
            exit 1
        fi
    fi
}

# Deploy to Vercel
deploy_to_vercel() {
    echo ""
    print_info "=== Vercel 部署 ==="
    echo ""
    print_info "请按以下步骤部署到Vercel:"
    echo ""
    echo "1. 访问 ${BLUE}https://vercel.com${NC}"
    echo "2. 点击 'Sign Up' 或 'Log In'"
    echo "3. 使用GitHub账户登录"
    echo "4. 点击 'New Project'"
    echo "5. 从列表中选择 'altruewit' 仓库"
    echo "6. 点击 'Import'"
    echo "7. 配置设置:"
    echo "   - Framework Preset: 选择 'Other'"
    echo "   - Build Command: 留空"
    echo "   - Output Directory: ."
    echo "8. 点击 'Deploy'"
    echo ""
    print_info "部署完成后，您将获得临时域名:"
    print_success "https://altruewit.vercel.app"
    echo ""
}

# Verify deployment
verify_deployment() {
    echo ""
    print_info "=== 验证部署 ==="
    echo ""
    print_info "请测试以下页面:"
    echo ""
    echo "1. 首页: ${BLUE}https://altruewit.vercel.app/${NC}"
    echo "2. 产品页: ${BLUE}https://altruewit.vercel.app/products/${NC}"
    echo "3. OEM定制: ${BLUE}https://altruewit.vercel.app/oem-customization/${NC}"
    echo "4. 联系我们: ${BLUE}https://altruewit.vercel.app/contact/${NC}"
    echo ""
    print_info "注意: RFQ表单显示友好提示（功能即将上线）"
    print_info "如需立即联系，请使用: summer@altruewit.com"
    echo ""
}

# Main execution
main() {
    echo ""
    print_info "开始部署流程..."
    echo ""
    
    # Step 1: Check requirements
    check_requirements
    
    # Step 2: Check GitHub auth
    check_github_auth
    
    # Step 3: Create GitHub repo
    create_github_repo
    
    # Step 4: Deploy to Vercel
    deploy_to_vercel
    
    # Step 5: Verify
    verify_deployment
    
    echo ""
    print_success "部署指南完成！"
    print_info "请按照上述步骤完成Vercel部署。"
    echo ""
    print_info "如需进一步协助，请提供:"
    echo "1. GitHub用户名"
    echo "2. 遇到的错误信息"
    echo ""
}

# Run main function
main "$@"