# 刷新 DNS 缓存

某些场景下，比如修改 hosts 文件或修改了域名的 DNS 记录，可能需要刷新 DNS 缓存。以下是不同操作系统中刷新 DNS 缓存的命令。

::: info hosts 文件位置
- macOS：hosts 文件位于 `/etc/hosts`
- Windows：hosts 文件位于 `C:\Windows\System32\drivers\etc\hosts`
:::

## macOS

```sh
# 刷新 DNS 缓存
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

## Windows

```sh
# 刷新 DNS 缓存
ipconfig /flushdns
```
