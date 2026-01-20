export type RenderMode = 'auto' | 'children';
export type ComponentMode = 'default' | 'custom';

export interface DemoConfig {
  // Component mode (default vs custom)
  componentMode: ComponentMode;

  // Render mode
  renderMode: RenderMode;

  // Simulation
  simulateSlowSubmission: boolean;
  simulateEndpointError: boolean;

  // Debug
  showDebugMode: boolean;
}
