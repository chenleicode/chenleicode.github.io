# Powershell 7

PowerShell 是一种跨平台的任务自动化解决方案，由命令行 shell、脚本语言和配置管理框架组成。

在 Windows 10，Windows 11，内置的版本是 Powershell 5，如果想要 Powershell 的最新功能，比如自动补全功能，可以尝试 Powershell 7

## 安装 Powershell 7

- 在 Windows 上使用 winget 安装：

  ```sh
  winget search Microsoft.PowerShell
  winget install --id Microsoft.Powershell --source winget
  ```

- 更多版本的 Powershell 请移步到 [Github Powershell Releases](https://github.com/PowerShell/PowerShell/releases) 下载
- 更多安装方式请查看：[安装 Powershell 7](https://learn.microsoft.com/zh-cn/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.4)

## 更改 Windows Terminal 的默认终端

在 Windows 10，Windows 11，没有内置 Windows Terminal，如果想要使用，请移步到 [GitHub Terminal Releases](https://github.com/microsoft/terminal/releases) 安装

![操作1](/windows-terminal-default-to-powershell7-1.png)

![操作2](/windows-terminal-default-to-powershell7-2.png)

## 更改 VS Code 的默认终端

1. 使用管理员权限打开 VS Code
2. 在 settings.json 写入下面内容

  ```json
  "terminal.integrated.defaultProfile.windows": "PowerShell"
  ```

## 最后

此时就可以快乐地使用自动补全功能了，使用 tab 键可以切换补全内容

![示例](/auto-complete.png)


