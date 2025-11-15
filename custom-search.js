/**
 * 自定义搜索功能 - 为xiaozhong1906博客工具页面添加搜索功能
 * Author: xiaozhong1906
 * Date: 2025-11-15
 */

// 等待页面加载完成后初始化搜索功能
document.addEventListener('DOMContentLoaded', function() {
    console.log('xiaozhong1906博客工具页面 - 搜索功能初始化');
    
    // 获取搜索框和所有卡片元素
    const searchInput = document.querySelector('.search-input');
    const cards = document.querySelectorAll('.custom-card');
    
    if (!searchInput || cards.length === 0) {
        console.log('搜索功能初始化失败：缺少必要元素');
        return;
    }
    
    // 搜索功能实现
    function performSearch(searchText) {
        const normalizedSearchText = searchText.toLowerCase().trim();
        
        cards.forEach((card, index) => {
            const titleElement = card.querySelector('.card-header');
            const descElement = card.querySelector('.card-content p');
            
            if (!titleElement || !descElement) {
                return; // 跳过结构不完整的卡片
            }
            
            const title = titleElement.textContent.toLowerCase();
            const description = descElement.textContent.toLowerCase();
            
            // 检查搜索词是否匹配标题或描述
            if (normalizedSearchText === '' || 
                title.includes(normalizedSearchText) || 
                description.includes(normalizedSearchText)) {
                
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease-in-out';
            } else {
                card.style.display = 'none';
            }
        });
        
        // 显示搜索结果统计
        updateSearchResults(normalizedSearchText);
    }
    
    // 更新搜索结果提示
    function updateSearchResults(searchText) {
        let resultText = '';
        const visibleCards = document.querySelectorAll('.custom-card[style*="display: block"], .custom-card:not([style*="display: none"])');
        
        if (searchText.trim() === '') {
            resultText = `显示所有 ${cards.length} 个工具`;
        } else {
            const count = visibleCards.length;
            resultText = `找到 ${count} 个匹配的工具`;
        }
        
        // 更新或创建结果提示元素
        let resultDisplay = document.querySelector('.search-result');
        if (!resultDisplay) {
            resultDisplay = document.createElement('div');
            resultDisplay.className = 'search-result';
            searchInput.parentNode.appendChild(resultDisplay);
        }
        resultDisplay.textContent = resultText;
    }
    
    // 绑定搜索框输入事件
    searchInput.addEventListener('input', function(e) {
        performSearch(e.target.value);
    });
    
    // 绑定回车键事件
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            performSearch(e.target.value);
        }
    });
    
    // 绑定清空搜索功能 (ESC键)
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchInput.value = '';
            performSearch('');
            searchInput.focus();
        }
    });
    
    // 初始化：显示所有工具
    updateSearchResults('');
    
    console.log(`搜索功能初始化完成，共 ${cards.length} 个工具`);
});

// 添加淡入动画样式（如果页面中还没有的话）
const style = document.createElement('style');
style.textContent = `
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.search-result {
    margin-top: 10px;
    text-align: center;
    color: #666;
    font-size: 0.9em;
    font-weight: 500;
}
`;
document.head.appendChild(style);
