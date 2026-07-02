SECTION_CONTENT['embedded-ai'] = { default: `
# Embedded Engineering AI

## AI for Embedded Linux Development

AI dramatically accelerates embedded Linux development — an area notorious for obscure bugs, sparse documentation, and long debug cycles.

---

## Embedded Linux

**AI use cases:**
- Parse and explain kernel boot logs
- Generate device tree configurations
- Debug kernel oops and panics
- Write shell scripts for system configuration
- Explain BSP differences between SoCs

\`\`\`
"Here's my dmesg output after kernel boot. The system hangs after
mounting rootfs. What's causing it and how do I fix it?

[dmesg output]"
\`\`\`

---

## Firmware Development

**AI for firmware:**
- Generate register-level code from datasheet descriptions
- Write interrupt service routines (ISRs)
- Debug timing issues in firmware
- Generate FreeRTOS task implementations
- Review firmware for buffer overflows and memory issues

\`\`\`
"I'm implementing an I2C driver for the AS5048A magnetic encoder on
STM32H7. Write the HAL-based initialization and read function that
returns the 14-bit angle value. Handle the two-byte read protocol."
\`\`\`

---

## Device Drivers

**Linux kernel driver development:**

\`\`\`
"Write a Linux platform driver skeleton for a custom UART-based sensor.
Include:
- platform_driver struct
- probe() and remove() functions
- Character device interface (open, read, write)
- Device tree compatible string: 'company,sensor-uart-v1'
Use kernel 6.x API conventions."
\`\`\`

AI can generate complete driver skeletons in seconds — previously a 2-hour task from scratch.

**Debugging driver issues:**
\`\`\`
"My driver probe() function is failing with -ENODEV. Here's the driver
code and the device tree node. What could cause this?"
\`\`\`

---

## Board Bring-up

The most time-consuming phase of hardware development. AI accelerates:

- **Schematic review:** "Check this schematic for common power sequencing mistakes"
- **Power rail debugging:** Parse voltage rail measurements against expected states
- **Boot failure analysis:** Explain why the board is not booting from the serial output
- **Hardware/software interface:** Generate register init sequences from datasheet

---

## BSP Development

Board Support Package (BSP) work with AI:

\`\`\`
"Create a Yocto recipe (.bb file) for our custom Qt5 application.
The app is in a git repo, built with qmake, needs qt5-base.
Target: arm64 running Kirkstone."
\`\`\`

\`\`\`
"Generate the device tree overlay to enable SPI1 on the RK3588
with our custom 16-bit ADC at CS0, 10MHz, SPI mode 0."
\`\`\`

---

## Power Management

\`\`\`
"Explain the Linux power management domain hierarchy and help me
implement system suspend/resume for our i.MX8 platform.
We need to keep USB host alive during suspend."
\`\`\`

---

## Protocol Development

AI is excellent at protocol work:

\`\`\`
"Write a CAN bus frame parser for our proprietary sensor protocol.
The protocol:
- Byte 0: message type (0x01=temp, 0x02=pressure, 0x03=status)
- Bytes 1-2: 16-bit big-endian value
- Byte 3: sequence number
- Byte 4: CRC8

Parse into a struct, validate CRC, return parsed values."
\`\`\`

---

## System Integration

End-to-end integration debugging:

\`\`\`
"My embedded Linux system hangs under high CPU load. Here are:
- top output showing CPU usage
- /proc/interrupts
- kernel config for relevant drivers
What should I check for IRQ affinity and softirq issues?"
\`\`\`

---

## Root Cause Analysis

The highest-value use case for AI in embedded:

\`\`\`
"The system reboots unexpectedly. No watchdog trigger. No OOM.
Here are the last 200 lines before reboot from the serial console.
What caused the reboot and where should I look in the kernel?"
\`\`\`

AI can identify patterns in crash logs that would take hours of manual analysis.

**Best practice:** Capture all serial output at all times during development. When something fails, paste the last 500 lines to Claude.
` };
