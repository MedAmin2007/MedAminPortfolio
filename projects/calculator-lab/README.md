# Inside a Calculator: 10 + 9

An interactive, no-dependency lab that shows how a calculator computes **10 + 9**, from the keypress to the lit display. It has three tabs:

1. **Binary adder:** step-by-step ripple-carry addition of 1010 + 1001, with an animated full-adder logic circuit (XOR, AND, OR gates) and a truth table.
2. **Keypad → display lab:** keypad matrix scan, key encoder, a tiny CPU (PC, IR, control unit, registers, flags) running a 4-instruction program, an 8-bit ALU, binary → BCD with *Double Dabble*, and a 7-segment decoder. You can change both numbers (0–99).
3. **Hardware schematic:** a block diagram with power, clock, keypad, encoder, CPU internals, buses and display, with animated current flowing through the active wires.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page shell, tabs, and the markup template for each app |
| `styles.css` | Site styles plus per-app styles, scoped with `.a1`, `.a2`, `.a3` |
| `script.js` | The three apps (each in its own Shadow DOM) and the tab logic |
| `README.md` | This file |

## Run it

No build step and no server needed. Keep the three files in the same folder and open `index.html` in a modern browser (Chrome, Edge, Firefox, Safari). It works offline.

## Controls

- **Play / Pause, Previous, Next, step slider:** move through the animation.
- **← / →:** step in the active tab (or switch tabs when a tab button has focus).
- **Space:** play/pause in tab 1.
- **Theme button:** dark/light in tabs 1 and 2.
- A link ending in `#t2` or `#t3` opens that tab directly.

## Design notes

- Each app is isolated in a Shadow DOM so duplicate IDs and class names do not clash. All three share one stylesheet (`styles.css`), loaded into every shadow root.
- Everything is computed from the inputs (carries, sums, BCD digits), not hardcoded.
- Animations respect `prefers-reduced-motion`.

## Limits

This is an educational model at the digital-logic and block-diagram level. It is not a transistor-accurate simulation of a real calculator chip.
