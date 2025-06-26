@SETLOCAL
@IF NOT DEFINED NODE_PATH (
  @SET "NODE_PATH=C:\Users\19427\Desktop\wxy2\node_modules\.pnpm\eslint@9.9.1_jiti@1.21.6\node_modules\eslint\bin\node_modules;C:\Users\19427\Desktop\wxy2\node_modules\.pnpm\eslint@9.9.1_jiti@1.21.6\node_modules\eslint\node_modules;C:\Users\19427\Desktop\wxy2\node_modules\.pnpm\eslint@9.9.1_jiti@1.21.6\node_modules;C:\Users\19427\Desktop\wxy2\node_modules\.pnpm\node_modules"
) ELSE (
  @SET "NODE_PATH=C:\Users\19427\Desktop\wxy2\node_modules\.pnpm\eslint@9.9.1_jiti@1.21.6\node_modules\eslint\bin\node_modules;C:\Users\19427\Desktop\wxy2\node_modules\.pnpm\eslint@9.9.1_jiti@1.21.6\node_modules\eslint\node_modules;C:\Users\19427\Desktop\wxy2\node_modules\.pnpm\eslint@9.9.1_jiti@1.21.6\node_modules;C:\Users\19427\Desktop\wxy2\node_modules\.pnpm\node_modules;%NODE_PATH%"
)
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\eslint\bin\eslint.js" %*
) ELSE (
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\eslint\bin\eslint.js" %*
)
