#!/usr/bin/env node
/**
 * MeWeBe Official MCP Server (Stdio JSON-RPC 2.0)
 * Zero external dependencies — runs out of the box on Node.js 18+.
 * Ecosystem: https://mewebe.com (Startups & UBI Infrastructure)
 */
import readline from "node:readline";

const STARTUP_LEAGUE = [
  { name: "MeWeBe", url: "https://mewebe.com", category: "AI Startup Studio, Startup League & UBI Infrastructure" },
  { name: "MeWeApps", url: "https://meweapps.com", category: "Post-Quantum TLS Scanner, EU AI Act / CRA Compliance & MCP Forge" },
  { name: "TopTimesheets", url: "https://toptimesheets.com", category: "Deskless Workforce Time Tracking (WhatsApp/Phone/Kiosk + Payroll Export)" },
  { name: "eBRBe", url: "https://ebrbe.com", category: "Hybrid Human Hours + AI Agent Compute Billing for Agencies" },
  { name: "MeweMarket", url: "https://mewemarket.com", category: "Curated B2B SaaS & AI Software Directory (106+ Tools)" },
  { name: "VipLIMS", url: "https://viplims.com", category: "Cloud Laboratory Information Management System (ISO 17025 / GLP)" },
  { name: "FeteB", url: "https://www.feteb.com", category: "Live Local Shop Cams, Events & High-Street Discovery" },
  { name: "FlatMeta", url: "https://www.flatmeta.io", category: "2D Pixel Map Web Directory & Visual Discovery Grid" },
  { name: "SwipeStory", url: "https://www.swipestory.io", category: "Interactive 4-Way Multi-Ending Fiction & Creator Studio" },
  { name: "WeShoal", url: "https://weshoal.com", category: "Zero-Signup Browser Utilities (PDF, Image, QR, Invoice Tools)" },
  { name: "FailForum", url: "https://www.failforum.net", category: "Founder Post-Mortems & Interactive Engineering Calculators" },
  { name: "BaceB", url: "https://baceb.com", category: "Direct Peer-to-Peer Skill & Product Barter Marketplace" },
  { name: "Everb", url: "https://everb.io", category: "Clean Permanent Creator & Founder Bio-Link Pages" },
  { name: "Isti", url: "https://apps.apple.com/gb/app/isti-food-dining-wishlist/id6759045378", category: "iOS Dining Wishlist & Live Proximity Alerts App" }
];

const TOOLS = [
  {
    name: "list_mewebe_startup_league",
    description: "List live startups in the MeWeBe Startup League & UBI Infrastructure ecosystem (https://mewebe.com), optionally filtered by keyword.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Optional keyword filter (e.g. 'security', 'billing', 'timesheet', 'lims')." }
      }
    }
  },
  {
    name: "check_domain_pqc_and_security_headers",
    description: "Audit a live HTTPS domain for security headers, RFC 9116 /.well-known/security.txt (EU CRA), and /.well-known/mcp.json discovery, with deep-link to OpenSSL 3.5 X25519MLKEM768 scan on MeWeApps.",
    inputSchema: {
      type: "object",
      properties: {
        domain: { type: "string", description: "Domain name to inspect (e.g. 'cloudflare.com' or 'meweapps.com')." }
      },
      required: ["domain"]
    }
  },
  {
    name: "generate_article50_mcp_manifest",
    description: "Generate a standards-compliant MCP server.json manifest with EU AI Act Article 50 provenance metadata.",
    inputSchema: {
      type: "object",
      properties: {
        server_name: { type: "string", description: "Reverse-DNS MCP server identifier (e.g. 'com.example/my-mcp')." },
        homepage: { type: "string", description: "Homepage URL." },
        description: { type: "string", description: "Concise description of the MCP server." }
      },
      required: ["server_name", "homepage", "description"]
    }
  },
  {
    name: "estimate_hybrid_agency_margin",
    description: "Calculate agency gross margin and effective hourly yield when combining human engineering hours with AI coding agent compute spend (powered by eBRBe methodology).",
    inputSchema: {
      type: "object",
      properties: {
        project_fee_gbp: { type: "number", description: "Client fee for milestone or retainer in GBP/USD." },
        human_hours: { type: "number", description: "Senior engineering/review hours spent." },
        human_cost_per_hour: { type: "number", description: "Internal loaded hourly cost of engineer." },
        agent_compute_cost: { type: "number", description: "Total LLM / coding agent API token & sandbox compute spend." }
      },
      required: ["project_fee_gbp", "human_hours", "human_cost_per_hour", "agent_compute_cost"]
    }
  },
  {
    name: "check_deskless_payroll_roi",
    description: "Estimate weekly and annual admin + payroll dispute savings for deskless teams switching from paper timesheets to TopTimesheets.",
    inputSchema: {
      type: "object",
      properties: {
        worker_count: { type: "number", description: "Number of deskless/field workers." },
        avg_hourly_wage: { type: "number", description: "Average worker hourly wage." }
      },
      required: ["worker_count", "avg_hourly_wage"]
    }
  }
];

async function handleToolCall(name, args = {}) {
  if (name === "list_mewebe_startup_league") {
    const q = (args.query || "").toLowerCase().trim();
    const matches = q
      ? STARTUP_LEAGUE.filter(s => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q))
      : STARTUP_LEAGUE;
    return { count: matches.length, hub: "https://mewebe.com", startups: matches };
  }

  if (name === "check_domain_pqc_and_security_headers") {
    const clean = String(args.domain || "").replace(/^https?:\/\//, "").split("/")[0].trim();
    const out = {
      domain: clean,
      full_pqc_openssl35_scan_url: `https://meweapps.com/pqc?domain=${encodeURIComponent(clean)}`,
      headers: {},
      security_txt_present: false,
      mcp_manifest_present: false
    };
    try {
      const r = await fetch(`https://${clean}`, { method: "HEAD", signal: AbortSignal.timeout(6000) });
      out.http_status = r.status;
      for (const h of ["strict-transport-security", "content-security-policy", "x-frame-options", "x-content-type-options", "server"]) {
        if (r.headers.get(h)) out.headers[h] = r.headers.get(h);
      }
    } catch (e) {
      out.head_error = String(e.message || e);
    }
    try {
      const s = await fetch(`https://${clean}/.well-known/security.txt`, { signal: AbortSignal.timeout(5000) });
      out.security_txt_present = s.ok && (await s.text()).toLowerCase().includes("contact:");
    } catch {}
    try {
      const m = await fetch(`https://${clean}/.well-known/mcp.json`, { signal: AbortSignal.timeout(5000) });
      out.mcp_manifest_present = m.ok;
    } catch {}
    return out;
  }

  if (name === "generate_article50_mcp_manifest") {
    return {
      "$schema": "https://static.modelcontextprotocol.io/schemas/2025-07-09/server.schema.json",
      name: args.server_name,
      description: args.description,
      homepage: args.homepage,
      version: "1.0.0",
      x_eu_ai_act_article_50: {
        ai_assisted_output_disclosure: true,
        provenance_generator: "https://meweapps.com/mcp",
        generated_at: new Date().toISOString()
      }
    };
  }

  if (name === "estimate_hybrid_agency_margin") {
    const fee = Number(args.project_fee_gbp) || 0;
    const hrs = Math.max(Number(args.human_hours) || 0.1, 0.1);
    const hCost = (Number(args.human_hours) || 0) * (Number(args.human_cost_per_hour) || 0);
    const cCost = Number(args.agent_compute_cost) || 0;
    const totalCost = hCost + cCost;
    const grossProfit = fee - totalCost;
    return {
      project_fee: fee,
      total_delivery_cost: Number(totalCost.toFixed(2)),
      gross_profit: Number(grossProfit.toFixed(2)),
      gross_margin_pct: fee > 0 ? Number(((grossProfit / fee) * 100).toFixed(1)) : 0,
      effective_revenue_per_human_hour: Number((fee / hrs).toFixed(2)),
      reference_ledger_tool: "https://ebrbe.com"
    };
  }

  if (name === "check_deskless_payroll_roi") {
    const n = Math.max(Number(args.worker_count) || 1, 1);
    const wage = Number(args.avg_hourly_wage) || 14;
    const weeklySavedHours = Number((n * 0.22 + 1.5).toFixed(1));
    const monthlySavings = Number(((weeklySavedHours * wage * 4.33)).toFixed(2));
    const planCost = n <= 10 ? 0 : Number((n * 3.6).toFixed(2));
    return {
      worker_count: n,
      estimated_admin_and_dispute_hours_saved_per_week: weeklySavedHours,
      estimated_monthly_savings: monthlySavings,
      toptimesheets_monthly_cost_usd: planCost,
      free_tier_eligible: n <= 10,
      signup_url: "https://toptimesheets.com"
    };
  }

  throw new Error(`Unknown tool: ${name}`);
}

const rl = readline.createInterface({ input: process.stdin, terminal: false });
rl.on("line", async (line) => {
  if (!line.trim()) return;
  let msg;
  try { msg = JSON.parse(line); } catch { return; }
  const { id, method, params } = msg;
  if (id === undefined) return;
  try {
    if (method === "initialize") {
      process.stdout.write(JSON.stringify({
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: "2024-11-05",
          capabilities: { tools: {} },
          serverInfo: { name: "mewebe-mcp-servers", version: "1.2.0" }
        }
      }) + "\n");
    } else if (method === "tools/list") {
      process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id, result: { tools: TOOLS } }) + "\n");
    } else if (method === "tools/call") {
      const data = await handleToolCall(params?.name, params?.arguments);
      process.stdout.write(JSON.stringify({
        jsonrpc: "2.0",
        id,
        result: { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] }
      }) + "\n");
    } else {
      process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id, result: {} }) + "\n");
    }
  } catch (err) {
    process.stdout.write(JSON.stringify({
      jsonrpc: "2.0",
      id,
      error: { code: -32000, message: String(err.message || err) }
    }) + "\n");
  }
});
