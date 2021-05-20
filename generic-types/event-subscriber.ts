export interface EventSubscriber {
    depressedKeys?: Record<string, (event: KeyboardEvent) => void>;
    depressedMouseButtons?: Record<string, (event: MouseEvent) => void>;
    destroy(): void|Promise<void>;
}
