# MeWeBe MCP Servers (`@mewebe/mcp-servers`)

Official [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server suite for the **[MeWeBe Startup Studio & UBI Infrastructure](https://mewebe.com)** ecosystem — connecting AI coding agents (Claude Desktop, Claude Code, Cursor, Windsurf, Google Antigravity, Cline) directly to live MeWeBe portfolio APIs, Post-Quantum TLS compliance scanners, SaaS directories, and hybrid AI-compute agency billing tools.

- **Ecosystem Hub & Startup League:** [https://mewebe.com](https://mewebe.com)
- **Live MCP Discovery Manifests:**
  - `https://meweapps.com/.well-known/mcp.json` (`com.meweapps/pqc-deeptech-suite`)
  - `https://ebrbe.com/.well-known/mcp.json` (`com.ebrbe/agency-compute-ledger`)
- **Interactive Web Tools:** [https://meweapps.com/mcp](https://meweapps.com/mcp) · [https://meweapps.com/pqc](https://meweapps.com/pqc)

---

## Included Tools

| Tool Name | Target Service | What It Does |
| :--- | :--- | :--- |
| `list_mewebe_startup_league` | [mewebe.com](https://mewebe.com) | Fetches the live MeWeBe Startup League roster (13+ live software startups across SaaS, security, dining, LIMS, and creator tools) with categories and URLs. |
| `check_domain_pqc_and_security_headers` | [meweapps.com](https://meweapps.com/pqc) | Audits a live HTTPS domain for TLS version, HTTP security headers, RFC 9116 `/.well-known/security.txt` (EU Cyber Resilience Act), and `/.well-known/mcp.json` readiness. |
| `generate_article50_mcp_manifest` | [meweapps.com](https://meweapps.com/mcp) | Generates a standards-compliant `server.json` + EU AI Act Article 50 transparency metadata block for any MCP tool server. |
| `estimate_hybrid_agency_margin` | [ebrbe.com](https://ebrbe.com) | Calculates effective gross margin and blended hourly recovery when combining senior engineering hours with autonomous LLM/agent compute spend. |
| `check_deskless_payroll_roi` | [toptimesheets.com](https://toptimesheets.com) | Estimates weekly admin & payroll dispute savings for UK/global deskless construction, care, cleaning, and hospitality teams switching from paper/WhatsApp notes. |
| `search_mewemarket_catalog` | [mewemarket.com](https://mewemarket.com) | Queries curated SaaS & AI tools across the MeweMarket directory (`106+` indexed software tools). |

---

## Quickstart (Zero-Dependency Node.js 18+ / Stdio MCP)

Clone and run directly with Node.js 18+ (no build step required):

```bash
git clone https://github.com/MeWeBecom/mewebe-mcp-servers.git
node mewebe-mcp-servers/index.mjs
```

### Claude Desktop / Cursor / Windsurf / Antigravity Config

Add to your `claude_desktop_config.json` or `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "mewebe": {
      "command": "node",
      "args": ["/path/to/mewebe-mcp-servers/index.mjs"]
    }
  }
}
```

### Python (`uv` / `pip`) Usage

```bash
python mewebe-mcp-servers/mewebe_mcp/server.py
```

---

## About MeWeBe — Startups & UBI Infrastructure

**[MeWeBe](https://mewebe.com)** (*Me. We. Be. — where we all contribute, we all benefit, and we all succeed together*) is a London-based AI Startup Studio and Universal Basic Income (UBI) infrastructure ecosystem:

1. **Founder-First AI MVP Studio:** Building real, revenue-generating software startups with early-stage founders (3–7% equity MVPs and funded builds).
2. **The MeWeBe Startup League:** 13+ live startups growing in public — including [MeWeApps](https://meweapps.com), [TopTimesheets](https://toptimesheets.com), [eBRBe](https://ebrbe.com), [MeweMarket](https://mewemarket.com), [VipLIMS](https://viplims.com), [FeteB](https://www.feteb.com), [FlatMeta](https://www.flatmeta.io), [SwipeStory](https://www.swipestory.io), [WeShoal](https://weshoal.com), [FailForum](https://www.failforum.net), [BaceB](https://baceb.com), [Everb](https://everb.io), and [Isti](https://apps.apple.com/gb/app/isti-food-dining-wishlist/id6759045378).
3. **Shared UBI Infrastructure:** Turning shared startup studio equity and ecosystem growth into transparent, community-aligned upside at [https://mewebe.com](https://mewebe.com).

## License

MIT © MeWeBe Limited ([https://mewebe.com](https://mewebe.com))
