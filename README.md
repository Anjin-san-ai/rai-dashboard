# RAI Dashboard - Responsible AI Dashboard Component

A standalone, static React dashboard component for Responsible AI monitoring that can be embedded in any React application.

## Features

- **RAI Score Monitoring**: Track overall Responsible AI compliance scores
- **ESG Compliance**: Environmental, Social, and Governance metrics
- **Cost Analysis**: Monitor AI inference costs and optimization
- **Guardrails Management**: Configure and monitor AI guardrails
- **Policy Dashboard**: Manage internal and regulatory policies
- **Performance Metrics**: System performance and reliability monitoring

## Installation

```bash
npm install rai-dashboard
# or
yarn add rai-dashboard
```

## Quick Start

```tsx
import { RAIDashboard } from 'rai-dashboard';
import 'rai-dashboard/style.css';

function App() {
  return <RAIDashboard />;
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialSection` | `DashboardSection` | `'overview'` | Initial section to display |
| `onSectionChange` | `(section: DashboardSection) => void` | - | Callback when section changes |
| `className` | `string` | `''` | Custom class name for the root element |
| `showSidebar` | `boolean` | `true` | Whether to show the sidebar |

## Available Sections

- `overview` - Main dashboard with RAI Score, ESG, and Cost metrics
- `guardrails-section` - Guardrails management
- `dashboard` - Live monitoring dashboard
- `policies` - Policy management
- `sustainability-cost` - Sustainability and cost analysis
- `performance-reliability` - Performance metrics

## Individual Components

You can also import individual components for custom layouts:

```tsx
import {
  RAIScoreChart,
  ESGChart,
  CostAnalysisChart,
  GuardrailsEffectivenessChart,
  Card,
  PageLayout
} from 'rai-dashboard';
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Build Output

After running `npm run build`, the following files are generated in the `dist/` folder:

- `rai-dashboard.js` - ES module bundle
- `rai-dashboard.umd.cjs` - UMD bundle (for browser script tags)
- `style.css` - Compiled styles
- `index.d.ts` - TypeScript definitions

## Using in Another React App

### As an NPM Package

1. Build the package: `npm run build`
2. In your target project: `npm install /path/to/rai-static`
3. Import and use:

```tsx
import { RAIDashboard } from 'rai-dashboard';
import 'rai-dashboard/style.css';

function App() {
  return (
    <div className="h-screen">
      <RAIDashboard 
        initialSection="overview"
        onSectionChange={(section) => console.log('Section:', section)}
      />
    </div>
  );
}
```

### Via Script Tags (UMD)

```html
<link rel="stylesheet" href="path/to/rai-dashboard/dist/style.css">
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="path/to/rai-dashboard/dist/rai-dashboard.umd.cjs"></script>

<script>
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(React.createElement(RAIDashboard.RAIDashboard));
</script>
```

## License

MIT
