import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow accessing dev server from LAN (for Turbopack/HMR assets).
  // Add your device/IP here if it changes.
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "10.221.62.85",
    "192.168.1.2",
  ],
};

export default nextConfig;
