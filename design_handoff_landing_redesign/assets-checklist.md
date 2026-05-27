# Assets to copy into /public/assets/

## New files required (copy from the JVA Design System project)

### /public/assets/logo/
| Filename | Source | Usage |
|---|---|---|
| `jva-logo-primary-reverse-transparent.png` | `assets/logo/jva-logo-primary-reverse-transparent.png` | Navbar + footer logo (replaces broken SVG) |
| `jva-logo-primary-transparent.png` | `assets/logo/jva-logo-primary-transparent.png` | Light-surface logo (future use) |
| `jva-orb-cutout.png` | `assets/logo/jva-orb-cutout.png` | Integration sphere orb (replaces broken SVG) |

### /public/assets/tools-logo/
The existing files in production are already correct for `.light.svg` variants.
No changes needed — the integration chips use `.light.svg` (white fill) on the dark chip background.

## Files to REMOVE (or leave — they won't be referenced anymore)
- `/public/assets/logo/jva-logo-primary-reverse-svg.svg` — broken mask, no longer referenced
- `/public/assets/logo/jva-logo-primary-svg.svg` — broken mask
- `/public/assets/logo/jva-orb-svg.svg` — broken mask

## Notes
- The `.png.png` double-extension files in production are the old wordmark variants — they are no longer referenced after this update.
- If you need to re-export brand assets, ask Jan for a flat PNG export (not SVG with embedded raster).
