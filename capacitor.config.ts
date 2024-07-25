import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'artsofte-test',
  webDir: 'docs/browser',
  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;
