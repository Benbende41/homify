export const PUTER_WORKER_URL = import.meta.env.VITE_PUTER_WORKER_URL || ''

// Storage Paths
export const STORAGE_PATHS = {
    ROOT: 'homify',
    SOURCES: 'homify/sources',
    RENDERS: 'homify/renders'
} as const

// Timing Constants (in milliseconds)
export const SHARE_STATUS_RESET_DELAY_MS = 1500
export const PROGRESS_INCREMENT = 15
export const REDIRECT_DELAY_MS = 600
export const PROGRESS_INTERVAL_MS = 100
export const PROGRESS_STEP = 5

// UI Constants
export const GRID_OVERLAY_SIZE = '60px 60px'
export const GRID_COLOR = '#3B82F6'

// HTTP Status Codes
export const UNAUTHORIZED_STATUSES = [401, 403]

// Image Dimensions
export const IMAGE_RENDER_DIMENSION = 1024

export const HOMIFY_RENDER_PROMPT = `
任务：将输入的2D楼层平面图转换为**逼真的、顶部视角的3D建筑渲染图**。

严格要求（不得违反）：
1）**删除所有文本**：不渲染任何字母、数字、标签、尺寸或注释。楼层必须在文本原本位置连续。
2）**几何形状必须匹配**：墙壁、房间、门和窗户必须遵循平面图中的精确线条和位置。不得移动或调整大小。
3）**仅顶部视角**：正交顶部视角。无透视倾斜。
4）**干净、逼真的输出**：清晰的边缘、平衡的照明和真实的材质。无素描/手绘风格。
5）**无额外内容**：不添加平面图中未明确指示的房间、家具或物体。

结构与细节：
- **墙壁**：精确从平面图线条中延伸。一致的墙高和厚度。
- **门**：将门的摆动弧线转换为打开的门，与平面图对齐。
- **窗户**：将细小的周界线转换为真实的玻璃窗。

家具与房间映射（仅在图标/固定装置明确显示时）：
- 床图标 → 真实的床，带有被子和枕头。
- 沙发图标 → 现代的L型沙发或沙发。
- 餐桌图标 → 带有椅子的餐桌。
- 厨房图标 → 带有水槽和炉灶的台面。
- 卫生间图标 → 坐便器、洗手盆和浴缸/淋浴。
- 办公室/书房图标 → 书桌、椅子和最少的书架。
- 阳台/露台/阳台图标 → 户外座椅或简单家具（保持最少）。
- 实用/洗衣图标 → 洗衣机/烘干机和最少的橱柜。

风格与照明：
- 照明：明亮、中性的日光。高清晰度和平衡的对比度。
- 材质：真实的木地板/瓷砖地板、干净的墙面、微妙的阴影。
- 完成：专业建筑可视化；无文字、无水印、无logo。
`.trim()
