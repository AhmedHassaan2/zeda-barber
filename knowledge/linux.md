# Linux Administration Knowledge Document

## Purpose

Linux is the dominant operating system for servers, containers, cloud infrastructure, and embedded systems. Proficiency in Linux administration — file system management, process control, networking, security hardening, and automation — is essential for deploying, debugging, and maintaining production applications. This document covers the practical knowledge needed for day-to-day server operations.

## Core Concepts

### File System Hierarchy

- `/etc/` — System configuration files
- `/var/` — Variable data (logs, caches, spools)
- `/tmp/` — Temporary files (cleared on reboot)
- `/home/` — User home directories
- `/opt/` — Optional/third-party software
- `/proc/` — Virtual filesystem for process and kernel information
- `/usr/` — User programs and libraries (read-only in modern systems)

### Permissions

Linux uses a permission model: `owner / group / others` with `read (r) / write (w) / execute (x)` bits. `chmod`, `chown`, and `chgrp` modify permissions. Special bits: `setuid` (run as file owner), `setgid` (run as file group), `sticky bit` (only owner can delete in directory).

### Process Management

Processes have states: running, sleeping, stopped, zombie. `ps`, `top`/`htop`, `kill`, `nice`, `nohup` manage processes. Signals: `SIGTERM` (graceful), `SIGKILL` (force), `SIGHUP` (reload config for many daemons).

### systemd

systemd manages services (units). `systemctl start|stop|restart|status|enable|disable` controls services. `journalctl` queries systemd logs. Service files live in `/etc/systemd/system/`.

### Package Management

- **Debian/Ubuntu:** `apt`, `.deb` packages
- **RHEL/CentOS/Fedora:** `dnf`/`yum`, `.rpm` packages
- **Alpine:** `apk`, `.apk` packages (used in Docker images)

### Networking

`ip`, `ss`, `netstat`, `curl`, `wget`, `iptables`/`nftables`, `ssh` are essential tools. `ss -tlnp` shows listening TCP ports. DNS resolution uses `/etc/resolv.conf` and systemd-resolved.

## Best Practices

1. **Use SSH keys, disable password authentication** — Generate Ed25519 keys (`ssh-keygen -t ed25519`). Disable `PasswordAuthentication no` in `/etc/ssh/sshd_config`. Use fail2ban for brute-force protection.

2. **Never run as root for daily tasks** — Use a regular user with `sudo` for administrative tasks. Create separate service accounts for running daemons.

3. **Use `systemctl` for service management** — Never use `service` or `/etc/init.d/` scripts on modern systems. systemd handles dependencies, logging, and restart policies.

4. **Set up log rotation** — Configure `/etc/logrotate.conf` and application-specific configs in `/etc/logrotate.d/`. Prevent disk exhaustion from unbounded log files.

5. **Use `tmux` or `screen` for long-running processes** — SSH sessions can disconnect. tmux persists sessions across disconnections and allows multiple windows.

6. **Monitor disk usage proactively** — Set alerts for `/var/log`, `/tmp`, and data directories. Use `df -h` for disk space and `du -sh /path` for directory sizes.

7. **Keep systems updated** — Run `apt update && apt upgrade` or `dnf update` regularly. Subscribe to security mailing lists for critical patches.

8. **Use `journalctl -u service-name -f` for real-time logs** — systemd's journal provides structured, searchable logs with timestamps. Use `--since "1 hour ago"` for time-range queries.

## Anti-Patterns

1. **Disabling SELinux/AppArmor "to fix things"** — These are mandatory access control systems. Instead of disabling them, write proper policies. Disabling them removes a critical security layer.

2. **Editing files with `echo >>` in scripts** — Use `sed`, `awk`, or configuration management tools (Ansible, Puppet) for idempotent file modifications.

3. **Running services as root** — Each service should run as its own user with minimal privileges. A compromised service running as root owns the entire system.

4. **Ignoring firewall rules** — Configure `ufw`, `firewalld`, or `nftables` to allow only necessary ports. Default-deny inbound is essential for security.

5. **Using `kill -9` as first resort** — `SIGKILL` doesn't allow graceful shutdown. Always try `SIGTERM` (kill without flag, or `kill -15`) first. Use `kill -9` only when processes refuse to terminate.

6. **Not setting timezone on servers** — Use `timedatectl set-timezone UTC` on all servers. UTC prevents confusion in logs across time zones.

7. **Running `chmod 777`** — This gives everyone full access. Use the minimum permissions needed: `755` for directories, `644` for files, `600` for secrets.

## Common Mistakes

1. **Forgetting to escape special characters in shell** — Use single quotes for literal strings, double quotes for variable interpolation. Characters like `!`, `$`, `*` need escaping.

2. **Not using `systemctl enable` after install** — Services won't start on boot without `enable`. `start` only starts now; `enable` ensures auto-start.

3. **Ignoring swap configuration** — Without swap, the OOM killer activates prematurely. Set `vm.swappiness=10` for servers to prefer RAM before swapping.

4. **Using `ifconfig` instead of `ip`** — `ifconfig` is deprecated. Use `ip addr`, `ip link`, `ip route` for modern network configuration.

5. **Not using `nohup` or `disown` for background processes** — Processes started in a terminal are killed when the session ends. Use `nohup command &` or `disown` to prevent this.

6. **Editing `/etc/resolv.conf` directly** — On systemd-based systems, this file is managed by systemd-resolved. Edit `/etc/systemd/resolved.conf` instead.

7. **Not checking `dmesg` for hardware errors** — `dmesg` shows kernel messages including hardware failures, OOM events, and driver issues. Check it when diagnosing unexpected crashes.

## Decision Guidelines

- **Use systemd timers over cron** — Timers provide better logging, dependency management, and missed-run handling. Cron is simpler for one-off recurring tasks.
- **Use Alpine for containers, Debian/Ubuntu for servers** — Alpine's minimal footprint is ideal for containers. Debian/Ubuntu has better package availability for servers.
- **Use `rsync` over `scp` for file transfers** — rsync handles resume, compression, permissions, and is significantly faster for large or repeated transfers.
- **Use `ufw` for simple firewalls, `nftables` for complex rules** — ufw is beginner-friendly; nftables provides advanced filtering with better performance.

## References

- Linux man pages: `man command` (e.g., `man ssh`)
- The Linux Command Line (book): https://linuxcommand.org
- Linux Journey: https://linuxjourney.com
- ArchWiki (comprehensive): https://wiki.archlinux.org
- DigitalOcean Community Tutorials: https://www.digitalocean.com/community/tutorials

## Practical Notes

- `alias ll='ls -alF'` creates a useful directory listing alias. Add to `~/.bashrc`.
- `history | grep command` searches command history. `!!` repeats the last command.
- `ssh-copy-id user@host` copies SSH keys to remote servers for passwordless login.
- `crontab -e` edits the current user's cron jobs. Use `0 2 * * * /path/script.sh` for daily 2 AM execution.
- `htop` provides a better `top` with mouse support, color, and tree view.
- `curl -o /dev/null -s -w "%{http_code} %{time_total}s" url` shows HTTP status and response time.
- For Docker containers based on Alpine, use `apk add --no-cache package` to avoid caching package lists.
