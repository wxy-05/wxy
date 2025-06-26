import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bsrxgpdoktpglbutvupr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzcnhncGRva3RwZ2xidXR2dXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNTE0MzIsImV4cCI6MjA2NTgyNzQzMn0.MXmassFYJrUGuY7WWdvOehv6lJDDeQjW46VpIOPOxzE';

// 创建 Supabase 客户端
export const supabase = createClient(supabaseUrl, supabaseKey);

// 基础连接测试
export const testConnection = async () => {
    try {
        console.log('开始测试 Supabase 连接...');
        console.log('使用的配置:', { supabaseUrl });

        // 测试基本连接
        const { data, error } = await supabase
            .from('productstwo')
            .select('*')
            .limit(1);

        if (error) {
            console.error('连接错误:', error);
            throw new Error(`数据库连接失败: ${error.message}`);
        }

        if (data) {
            console.log('连接成功! 获取到数据:', data);
            return true;
        } else {
            console.log('连接成功，但没有数据');
            return true;
        }
    } catch (err) {
        console.error('连接测试失败:', err);
        throw err;
    }
};

// 测试产品搜索
export const testProductSearch = async (query) => {
    try {
        console.log('开始搜索产品，关键词:', query);
        const { data, error } = await supabase
            .from('productstwo')
            .select('*')
            .or(`sku.ilike.%${query}%,name.ilike.%${query}%`)
            .limit(1);

        if (error) {
            console.error('搜索错误:', error);
            throw new Error(`搜索失败: ${error.message}`);
        }

        console.log('搜索结果:', data);
        return data;
    } catch (err) {
        console.error('搜索测试失败:', err);
        throw err;
    }
}; 