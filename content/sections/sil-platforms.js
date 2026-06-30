SECTION_CONTENT['sil-platforms'] = { default: `
# SIL & Hardware Platforms

## SIL Levels

**Safety Integrity Level (SIL)** defines the required risk reduction for a safety function. Defined in IEC 61508 (functional safety of electrical/electronic systems).

| Level | Risk reduction | Example applications |
|---|---|---|
| **SIL 0** | No safety requirement | Consumer electronics |
| **SIL 1** | 10x to 100x risk reduction | Industrial process control |
| **SIL 2** | 100x to 1000x risk reduction | Railway signaling, medical devices |
| **SIL 3** | 1000x to 10000x risk reduction | Emergency shutdown systems |
| **SIL 4** | 10000x+ risk reduction | Nuclear reactor protection |

For automotive, the equivalent standard is **ISO 26262** with ASIL levels (A-D).

---

## Development Boards

**For prototyping and early development:**

| Board | SoC | Use case |
|---|---|---|
| **Raspberry Pi 5** | BCM2712 (ARM A76) | Linux prototyping, easy software dev |
| **BeagleBone Black** | AM335x | Industrial Linux, PRU real-time |
| **NXP i.MX8 EVK** | i.MX8M (ARM A53+M4) | Automotive, industrial, HMI |
| **Rockchip RK3588 EVK** | RK3588 (ARM A76+A55) | Edge AI, compute-intensive |
| **STM32H7 Nucleo** | STM32H743 (Cortex-M7) | Real-time MCU development |
| **SAMA5D3 Xplained** | SAMA5D3 (ARM A5) | Linux + RTOS coexistence |

---

## Validation Boards

Between development boards and production hardware — typically closer to the final design.

**Characteristics:**
- Production SoC on engineering-spec PCB
- Full peripheral set (production connectors)
- Hardware debug interfaces still accessible (JTAG, UART debug)
- May not be in final enclosure

AI use cases for validation boards:
- Generating test scripts for functional validation
- Writing bring-up checklists
- Analyzing test results and identifying failures

---

## Production Hardware

**Final hardware considerations:**

\`\`\`
AI prompt: "Review this production hardware checklist for an embedded
Linux system going into IEC 62443 industrial deployment:
[checklist]
What's missing? What common mistakes do embedded teams make at this stage?"
\`\`\`

Key differences from development:
- Debug interfaces removed or locked (security)
- Secure boot enabled
- Read-only rootfs
- Hardware watchdog configured
- Production certificates and keys provisioned

---

## Board Bring-up

Systematic board bring-up process with AI assistance:

### Phase 1: Power verification
\`\`\`
Before booting, verify all power rails:
- 3.3V rail stable?
- 1.8V rail stable?
- 1.1V/1.0V core stable?
- Proper sequencing (PMIC startup)?

AI prompt: "Here are my scope captures of power rails during startup.
The SoC is not booting. Identify which rail looks wrong and what it indicates."
\`\`\`

### Phase 2: Serial console
\`\`\`
Connect UART before any other debug.
Expected: U-Boot banner within 5 seconds of power-on.
If nothing: check UART TX/RX not swapped, correct baud rate (115200 typical).

AI prompt: "I see garbage characters on the serial console.
What causes this and how do I fix it?"
\`\`\`

### Phase 3: Boot to kernel
\`\`\`
Signs of progress:
- U-Boot environment prints
- Kernel decompressing
- DMA and memory init
- Device tree probing

AI prompt: "Board hangs after 'Starting kernel...'
Here's the boot log. What's the likely cause?"
\`\`\`

---

## Power Sequencing

Getting power rail sequencing wrong is a common board bring-up failure.

**Common sequencing requirements:**
\`\`\`
Core voltage (VDD_CORE) must be stable before:
  → I/O voltage (VDD_IO) enables
    → Peripheral voltages enable
      → Reset deasserted
        → Clock provided
\`\`\`

**AI prompt:**
\`\`\`
"Review this power sequencing diagram for our i.MX8M board.
The PMIC is the BD71847AMWV. Are there any violations of the i.MX8M
power requirements in our sequencing?"

[paste timing diagram or PMIC configuration]
\`\`\`

---

## Boot Flows

Understanding the full boot chain helps debug boot failures:

\`\`\`
ROM Bootloader (in SoC)
    ↓ loads from eMMC/SD/NAND
Secondary Program Loader (SPL)
    ↓ initializes DDR, loads U-Boot
U-Boot
    ↓ loads kernel + DTB + initrd
Linux Kernel
    ↓ mounts rootfs
Init system (systemd / BusyBox init)
    ↓ starts services
Application
\`\`\`

**Boot failure diagnosis by phase:**
- No output at all → power sequencing or UART config
- ROM output only → SPL not found or not loading
- U-Boot hangs → DDR init failure
- Kernel hang → device driver or rootfs issue
- Init hang → service dependency or missing library
` };
