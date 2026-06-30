SECTION_CONTENT['embedded-handbook'] = { default: `
# Embedded Linux Handbook

## dmesg Analysis

\`dmesg\` is your first stop for hardware and kernel debugging.

**AI prompt template:**
\`\`\`
Analyze this dmesg output. Identify:
1. Any errors or warnings
2. Failed device initializations
3. The likely root cause of any issues
4. Suggested fixes

[paste dmesg output]
\`\`\`

**Common patterns to watch for:**
\`\`\`
# Probe failure — driver found device but initialization failed
[    2.341] my_driver: probe of 1-0048 failed with error -5

# DMA allocation failure — memory fragmentation or misconfiguration
[   15.234] DMA: Failed to allocate 1048576 bytes

# IRQ request failure — IRQ already in use or invalid
[    1.892] my_drv: Failed to request IRQ 42: -16

# Timeout — hardware not responding
[    3.001] i2c i2c-1: timeout waiting for bus ready
\`\`\`

---

## journalctl Analysis

For systemd-based systems, \`journalctl\` is the main log aggregator.

\`\`\`bash
# Last boot messages
journalctl -b

# This boot, priority error and above
journalctl -b -p err

# Follow a specific service
journalctl -fu my-service

# Since a specific time
journalctl --since "2025-06-30 10:00" --until "2025-06-30 11:00"

# Export for AI analysis
journalctl -b --no-pager > boot_log.txt
\`\`\`

**AI prompt:**
\`\`\`
My service crashes on startup. Here's the journalctl output.
What's the error and how do I fix it?

[paste journalctl output]
\`\`\`

---

## Kernel Logs

Beyond dmesg, kernel logging at runtime:

\`\`\`bash
# Adjust kernel log level (0=emergency, 7=debug)
echo 7 > /proc/sys/kernel/printk

# Enable dynamic debugging for a specific module
echo "module my_module +p" > /sys/kernel/debug/dynamic_debug/control

# Enable all debug for a file
echo "file drivers/my/driver.c +p" > /sys/kernel/debug/dynamic_debug/control

# Read kernel ring buffer continuously
cat /proc/kmsg
\`\`\`

---

## Crash Dumps

When the kernel crashes (oops, panic), the output contains a stack trace.

**Kernel oops example:**
\`\`\`
BUG: kernel NULL pointer dereference at virtual address 00000000
CPU: 0 PID: 1234 Comm: my_process
[<80012345>] my_function+0x24/0x48
[<80023456>] caller_function+0x12/0x30
\`\`\`

**AI analysis prompt:**
\`\`\`
Analyze this kernel oops. What caused the null pointer dereference,
which function triggered it, and what should I check in the driver code?

[paste full oops output]
\`\`\`

**Decode the stack trace with addr2line:**
\`\`\`bash
arm-linux-gnueabihf-addr2line -e vmlinux 80012345
# → drivers/my_driver.c:142
\`\`\`

---

## Stack Traces

Reading stack traces is a critical skill:

\`\`\`
Call Trace:
 [<ffffffff81234567>] ? schedule+0x1d/0x30
 [<ffffffff81345678>] wait_for_completion+0x45/0x80
 [<ffffffffa0012345>] my_driver_ioctl+0x123/0x200 [my_module]
 [<ffffffff81456789>] do_vfs_ioctl+0x1a2/0x5c0
\`\`\`

Read bottom-up: the bottom frame called the one above. `?` means the frame might be unreliable.

---

## Memory Leaks

Detecting memory leaks in embedded:

\`\`\`bash
# Check kernel slab allocations
cat /proc/slabinfo | sort -k3 -n -r | head -20

# kmemleak (kernel memory leak detector)
mount -t debugfs none /sys/kernel/debug
echo clear > /sys/kernel/debug/kmemleak
# ... run the suspected leaking code ...
echo scan > /sys/kernel/debug/kmemleak
cat /sys/kernel/debug/kmemleak
\`\`\`

**AI prompt:**
\`\`\`
My embedded system's available memory decreases by ~2MB every hour.
Here's the /proc/meminfo over 4 hours and the slabinfo output.
What's leaking and how do I find the source?

[paste data]
\`\`\`

---

## Driver Probe Failures

The most common class of embedded Linux issues.

**Debugging checklist:**
1. Is the device tree node correct? Check compatible string matches driver
2. Is the module loaded? `lsmod | grep my_driver`
3. Is the device detected? `ls /sys/bus/i2c/devices/`
4. Does probe see the device? Add printks or use dynamic debug
5. What error code does probe return? (-ENODEV, -EPROBE_DEFER, -EIO)

\`\`\`
-EPROBE_DEFER: dependency not ready yet — will be retried automatically
-ENODEV: device not found or wrong type
-EIO: I/O error communicating with device
-ENOMEM: out of memory
-EINVAL: invalid argument (usually config mistake)
\`\`\`

---

## Build System Issues

### Yocto

\`\`\`bash
# Check which recipe provides a package
bitbake-layers show-recipes | grep mypackage

# Why is a recipe failing?
bitbake -e my-recipe | grep "^DEPENDS"
bitbake my-recipe -v 2>&1 | tail -50

# Clean and rebuild
bitbake -c cleansstate my-recipe
bitbake my-recipe
\`\`\`

**AI prompt:**
\`\`\`
My Yocto build is failing with this error. I'm on Kirkstone targeting
arm64. Here's the bitbake output. What's causing it?

[paste bitbake error]
\`\`\`

### Buildroot

\`\`\`bash
# Check package config
make my-package-show-info

# Rebuild one package
make my-package-dirclean && make my-package

# Show dependency graph
make my-package-graph-depends
\`\`\`
` };
