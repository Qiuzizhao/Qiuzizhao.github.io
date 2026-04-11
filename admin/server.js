const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const app = express();
const PORT = 3000;

// 解析 JSON 格式的请求体
app.use(express.json());
// 提供后台静态文件服务
app.use(express.static('public'));
// 将 images 文件夹挂载，以便在后台直接预览图片
app.use('/images', express.static(path.join(__dirname, '../images')));

const dataJsPath = path.join(__dirname, '../js/data.js');

// 1. 读取 data.js 接口
app.get('/api/data', (req, res) => {
    try {
        if (!fs.existsSync(dataJsPath)) {
            return res.json({ projects: [], travels: [] });
        }
        const content = fs.readFileSync(dataJsPath, 'utf-8');
        
        // 使用 vm 沙箱执行 data.js 内容，安全地提取 siteData 对象
        const context = { window: {} };
        vm.createContext(context);
        vm.runInContext(content, context);
        
        res.json(context.window.siteData || { projects: [], travels: [] });
    } catch (err) {
        res.status(500).json({ error: '读取数据失败：' + err.message });
    }
});

// 2. 保存 data.js 接口
app.post('/api/data', (req, res) => {
    try {
        const newData = req.body;
        // 将 JSON 数据格式化为带缩进的字符串
        const jsonString = JSON.stringify(newData, null, 2);
        
        // 拼接成合法的 JS 文件内容
        const fileContent = `// data.js - 存放个人主页的数据，方便修改而不必触碰 HTML 结构\n\nconst siteData = ${jsonString};\n\n// 确保可以在全局访问数据\nwindow.siteData = siteData;\n`;
        
        fs.writeFileSync(dataJsPath, fileContent, 'utf-8');
        res.json({ success: true, message: '保存成功！' });
    } catch (err) {
        res.status(500).json({ error: '保存数据失败：' + err.message });
    }
});

// 3. 图片上传配置 (使用 multer)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // 根据传入的 folder 参数决定存到 projects 还是 travels 目录下
        const folderName = req.body.folder || 'projects';
        const destPath = path.join(__dirname, `../images/${folderName}`);
        
        // 确保文件夹存在
        if (!fs.existsSync(destPath)) {
            fs.mkdirSync(destPath, { recursive: true });
        }
        cb(null, destPath);
    },
    filename: (req, file, cb) => {
        const folderName = req.body.folder || 'projects';
        // 去除复数 's' 得到前缀，如 'projects' -> 'project', 'travels' -> 'travel'
        const prefix = folderName.endsWith('s') ? folderName.slice(0, -1) : folderName;
        // 获取前端传过来的条目 ID，如果没有则回退为时间戳
        const itemId = req.body.id || Date.now();
        // 拼接成类似 project-1.jpg 的格式
        // 为了防止多次上传同名文件导致浏览器缓存不更新，可以在后面加个小时间戳后缀
        cb(null, `${prefix}-${itemId}-${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage });

// 图片上传接口
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: '没有接收到文件' });
    }
    const folderName = req.body.folder || 'projects';
    
    // 返回相对路径，以便直接保存在 data.js 中供主页调用
    const relativePath = `images/${folderName}/${req.file.filename}`;
    res.json({ success: true, url: relativePath });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`后台管理工具已启动！`);
    console.log(`请在浏览器中访问: http://localhost:${PORT}`);
    console.log(`=========================================`);
});