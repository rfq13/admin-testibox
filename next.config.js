const path = require("path");
const { version } = require("./package.json");

const whitelistDomains = [
  { key: "images.unsplash.com", value: "https://images.unsplash.com" },
  { key: "testibox", value: "https://testibox.com" },
  { key: "testibox", value: "https://*.testibox.com" },
  { key: "testibox", value: "http://localhost:9083" },
];

const getDomain = (values) => {
  return whitelistDomains
    .filter((row) => {
      return values.includes(row.key);
    })
    .map((row) => row.value)
    .join(" ");
};
const withDevSrc = process.env.NODE_ENV === "development";

const ContentSecurityPolicy = `
  default-src 'self';
  img-src 'self' data: blob: ${getDomain(["testibox"])};
  font-src 'self' ${getDomain(["testibox"])};
  frame-src 'self' ${getDomain(["testibox"])};
  media-src 'self' data: blob: ${getDomain(["testibox"])};
  script-src 'self' 'unsafe-inline' 'unsafe-eval' ${getDomain(["testibox"])};
  connect-src 'self' ${getDomain([
    "testibox",
    "default-src 'self' http://localhost:3220",
  ])} ${withDevSrc ? "http://localhost:3220" : ""};
`;

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains;",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // {
  //   key: "Content-Security-Policy",
  //   value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  // },
  {
    key: "Referrer-Policy",
    value: "no-referrer",
  },
];

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles", "custom")],
  },
  publicRuntimeConfig: {
    version,
  },
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "v1.tailwindcss.com"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
