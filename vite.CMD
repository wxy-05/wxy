@SETLOCAL
@IF NOT DEFINED NODE_PATH (
  @SET "NODE_PATH=C:\Users\19427\Desktop\wxy2\node_modules\.pnpm\vite@5.4.3_@types+node@22.10.5\node_modules\vite\bin\node_modules;C:\Users\19427\Desktop\wxy2\node_modules\.pnpm\vite@5.4.3_@types+node@22.10.5\node_modules\vite\node_modules;C:\Users\19427\Desktop\wxy2\node_modules\.pnpm\vite@5.4.3_@types+node@22.10.5\node_modules;C:\Users\19427\Desktop\wxy2\node_modules\.pnpm\node_modules"
) ELSE (
  @SET "NODE_PATH=C:\Users\19427\Desktop\wxy2\node_modules\.pnpm\vite@5.4.3_@types+node@22.10.5\node_modules\vite\bin\node_modules;C:\Users\19427\Desktop\wxy2\node_modules\.pnpm\vite@5.4.3_@types+node@22.10.5\node_modules\vite\node_modules;C:\Users\19427\Desktop\wxy2\node_modules\.pnpm\vite@5.4.3_@types+node@22.10.5\node_modules;C:\Users\19427\Desktop\wxy2\node_modules\.pnpm\node_modules;%NODE_PATH%"
)
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\vite\bin\vite.js" %*
) ELSE (
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\vite\bin\vite.js" %*
)
