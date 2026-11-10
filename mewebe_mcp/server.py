#!/usr/bin/env python3
"""Zero-dependency Python 3 Stdio MCP Server for MeWeBe (https://mewebe.com)."""
import json
import sys
import urllib.request

STARTUP_LEAGUE = [
    {"name": "MeWeBe", "url": "https://mewebe.com", "category": "AI Startup Studio, Startup League & UBI Infrastructure"},
    {"name": "MeWeApps", "url": "https://meweapps.com", "category": "Post-Quantum TLS Scanner, EU AI Act / CRA Compliance & MCP Forge"},
    {"name": "TopTimesheets", "url": "https://toptimesheets.com", "category": "Deskless Workforce Time Tracking & Payroll Export"},
    {"name": "eBRBe", "url": "https://ebrbe.com", "category": "Hybrid Human Hours + AI Agent Compute Billing"},
    {"name": "MeweMarket", "url": "https://mewemarket.com", "category": "Curated B2B SaaS & AI Software Directory (106+ Tools)"},
    {"name": "VipLIMS", "url": "https://viplims.com", "category": "Cloud Laboratory Information Management System"},
    {"name": "FeteB", "url": "https://www.feteb.com", "category": "Live Local Shop Cams, Events & High-Street Discovery"},
    {"name": "FlatMeta", "url": "https://www.flatmeta.io", "category": "2D Pixel Map Web Directory & Visual Discovery Grid"},
    {"name": "SwipeStory", "url": "https://www.swipestory.io", "category": "Interactive 4-Way Multi-Ending Fiction & Creator Studio"},
    {"name": "WeShoal", "url": "https://weshoal.com", "category": "Zero-Signup Browser Utilities (PDF, Image, QR, Invoice Tools)"},
    {"name": "FailForum", "url": "https://www.failforum.net", "category": "Founder Post-Mortems & Interactive Engineering Calculators"},
    {"name": "BaceB", "url": "https://baceb.com", "category": "Direct Peer-to-Peer Skill & Product Barter Marketplace"},
    {"name": "Everb", "url": "https://everb.io", "category": "Clean Permanent Creator & Founder Bio-Link Pages"},
    {"name": "Isti", "url": "https://apps.apple.com/gb/app/isti-food-dining-wishlist/id6759045378", "category": "iOS Dining Wishlist & Live Proximity Alerts App"},
]

TOOLS = [
    {
        "name": "list_mewebe_startup_league",
        "description": "List live startups in the MeWeBe Startup League & UBI Infrastructure ecosystem (https://mewebe.com).",
        "inputSchema": {"type": "object", "properties": {"query": {"type": "string"}}},
    },
    {
        "name": "check_domain_pqc_and_security_headers",
        "description": "Audit a live HTTPS domain for security headers, security.txt, and mcp.json discovery.",
        "inputSchema": {"type": "object", "properties": {"domain": {"type": "string"}}, "required": ["domain"]},
    },
]


def call_tool(name: str, args: dict):
    if name == "list_mewebe_startup_league":
        q = str(args.get("query", "")).lower().strip()
        items = [s for s in STARTUP_LEAGUE if not q or q in s["name"].lower() or q in s["category"].lower()]
        return {"count": len(items), "hub": "https://mewebe.com", "startups": items}
    if name == "check_domain_pqc_and_security_headers":
        dom = str(args.get("domain", "")).replace("https://", "").replace("http://", "").split("/")[0].strip()
        out = {"domain": dom, "full_pqc_openssl35_scan_url": f"https://meweapps.com/pqc?domain={dom}"}
        try:
            req = urllib.request.Request(f"https://{dom}", method="HEAD", headers={"User-Agent": "MeWeBe-MCP/1.2"})
            with urllib.request.urlopen(req, timeout=6) as r:
                out["http_status"] = r.status
                out["strict_transport_security"] = bool(r.headers.get("Strict-Transport-Security"))
        except Exception as exc:
            out["error"] = str(exc)
        return out
    raise ValueError(f"Unknown tool: {name}")


def main():
    for raw in sys.stdin:
        line = raw.strip()
        if not line:
            continue
        msg = json.loads(line)
        mid = msg.get("id")
        if mid is None:
            continue
        method = msg.get("method")
        if method == "initialize":
            res = {"protocolVersion": "2024-11-05", "capabilities": {"tools": {}}, "serverInfo": {"name": "mewebe-mcp-py", "version": "1.2.0"}}
        elif method == "tools/list":
            res = {"tools": TOOLS}
        elif method == "tools/call":
            p = msg.get("params") or {}
            data = call_tool(p.get("name", ""), p.get("arguments") or {})
            res = {"content": [{"type": "text", "text": json.dumps(data, indent=2)}]}
        else:
            res = {}
        sys.stdout.write(json.dumps({"jsonrpc": "2.0", "id": mid, "result": res}) + "\n")
        sys.stdout.flush()


if __name__ == "__main__":
    main()
