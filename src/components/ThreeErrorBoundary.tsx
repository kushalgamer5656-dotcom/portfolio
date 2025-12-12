import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ThreeErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("3D Scene Error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white p-4 text-center border-l border-white/10">
                    <div className="text-4xl mb-4">⚠️</div>
                    <h3 className="font-bold text-xl mb-2">3D Experience Unavailable</h3>
                    <p className="text-gray-400 text-sm max-w-xs mx-auto mb-4">
                        Your browser or device is having trouble with the 3D scene.
                    </p>
                    <pre className="text-xs text-red-400 bg-black/50 p-2 rounded overflow-auto max-w-full max-h-32 text-left">
                        {this.state.error?.message || "Unknown error"}
                    </pre>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ThreeErrorBoundary;
