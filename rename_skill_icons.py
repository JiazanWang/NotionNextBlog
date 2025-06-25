#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
技能图标文件重命名脚本
将包含特殊字符和中文的文件名改为标准的哈希风格命名
"""

import os
import shutil

def rename_skill_icons():
    # 定义文件夹路径
    heo_path = "public/images/heo"
    
    # 检查文件夹是否存在
    if not os.path.exists(heo_path):
        print(f"错误: 文件夹 {heo_path} 不存在")
        return
    
    # 定义重命名映射关系
    rename_mapping = {
        # AI工具类
        "icon-chatgpt.webp": "202401a8f9e6b4d5c7a8e3f2b1c9d0e8f7g5h4.webp",
        "Claude.webp": "202402b9f0e7c5d6a8f4e2b3c0d1e9f8g6h5.webp",
        "Grok.webp": "202403c0f1e8d6a7f5e3b4c2d0e1f9g7h6.webp",
        "即梦图标.webp": "202404d1f2e9a8f6e4b5c3d1e0f8g8h7.webp",
        "Midjourney.webp": "202405e2f3a9f7e5b6c4d2e1f0g9h8.webp",
        "notion.webp": "202406f4a0f8e6b7c5d3e2f1g0h9.webp",
        
        # 编程语言类 (Python文件保持不变)
        "swiftui-10011.webp": "202407f5a1e9b8c6d4e3f2g1h0.webp",
        "C-jinjin.webp": "202408f6a2b9c7d5e4f3g2h1.webp",
        "C++.webp": "202409f7a3c0d6e5f4g3h2.webp",
        "JavaScript代码.webp": "202410f8a4c1d7e6f5g4h3.webp",
        "html5.webp": "202411f9a5c2d8e7f6g5h4.webp",
        
        # 开发工具类
        "css3.webp": "202412f0a6c3d9e8f7g6h5.webp",
        "vscode.webp": "202413f1a7c4e0f8g7h6.webp",
        "git-1.webp": "202414f2a8c5e1f9g8h7.webp",
        "github.webp": "202415f3a9c6e2g0h8.webp",
        
        # 操作系统类
        "macos.webp": "202416f4a0c7e3g1h9.webp",
        "windows.webp": "202417f5a1c8e4g2h0.webp",
        
        # 生产力工具类
        "obsidian.webp": "202418f6a2c9e5g3h1.webp",
        "zotero.webp": "202419f7a3e6g4h2.webp",
        "flomo.webp": "202420f8a4e7g5h3.webp",
        "COROS-Logo白-copy.webp": "202421f9a5e8g6h4.webp"
    }
    
    # 执行重命名操作
    renamed_count = 0
    failed_count = 0
    
    print("开始重命名技能图标文件...")
    print("=" * 60)
    
    for old_name, new_name in rename_mapping.items():
        old_path = os.path.join(heo_path, old_name)
        new_path = os.path.join(heo_path, new_name)
        
        try:
            if os.path.exists(old_path):
                # 检查新文件名是否已存在
                if os.path.exists(new_path):
                    print(f"⚠️  跳过: {new_name} 已存在")
                    continue
                
                # 执行重命名
                os.rename(old_path, new_path)
                print(f"✅ 成功: {old_name} → {new_name}")
                renamed_count += 1
            else:
                print(f"❌ 文件不存在: {old_name}")
                failed_count += 1
                
        except Exception as e:
            print(f"❌ 重命名失败: {old_name} → {e}")
            failed_count += 1
    
    # 输出总结
    print("=" * 60)
    print(f"重命名操作完成!")
    print(f"成功重命名: {renamed_count} 个文件")
    print(f"失败/跳过: {failed_count} 个文件")
    
    # 检查Python文件是否存在（应该保持不变）
    python_file = os.path.join(heo_path, "20235c0731cd4c0c95fc136a8db961fdf963071502.webp")
    if os.path.exists(python_file):
        print(f"✅ Python图标文件正常存在（无需重命名）")
    else:
        print(f"⚠️  Python图标文件未找到")

def main():
    print("技能图标文件重命名工具")
    print("此脚本将重命名 public/images/heo/ 文件夹中的技能图标文件")
    print("将包含中文和特殊字符的文件名改为标准的哈希风格命名")
    print()
    
    # 确认操作
    confirm = input("是否继续执行重命名操作? (y/N): ").strip().lower()
    if confirm in ['y', 'yes', '是', '确定']:
        rename_skill_icons()
    else:
        print("操作已取消")

if __name__ == "__main__":
    main() 