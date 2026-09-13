## 2025-05-18 - Accessible Category Filter Toggle Groups
**Learning:** Category filter controls and standalone search inputs lack accessible labels and state indicators for screen reader users when represented purely as visually stylized buttons/inputs without `aria-pressed` or `aria-label` attributes.
**Action:** Always add `aria-label` to input fields, group filter buttons within `role="group"` with an `aria-label`, and use `aria-pressed` to communicate the active selection state dynamically.
