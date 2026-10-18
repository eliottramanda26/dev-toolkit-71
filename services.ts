interface ToolConfig {
  name: string;
  version: string;
  enabled: boolean;
}

export class DevToolkitService {
  private registry: Map<string, ToolConfig> = new Map();

  constructor(initialTools: ToolConfig[]) {
    initialTools.forEach(tool => this.registry.set(tool.name, tool));
  }

  public getTool(name: string): ToolConfig | undefined {
    return this.registry.get(name);
  }

  public listEnabledTools(): ToolConfig[] {
    return Array.from(this.registry.values()).filter(t => t.enabled);
  }

  public registerTool(tool: ToolConfig): void {
    this.registry.set(tool.name, tool);
  }

  public clearRegistry(): void {
    this.registry.clear();
  }
}