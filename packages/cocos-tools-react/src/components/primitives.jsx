import { Component } from 'react';

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }

    static getDerivedStateFromError(error) {
        return { error };
    }

    render() {
        if (this.state.error) {
            return (
                <div className="error-panel">
                    <strong>该工具加载失败</strong>
                    <p>{String(this.state.error)}</p>
                    <button className="btn" onClick={() => this.setState({ error: null })}>
                        重试
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

export function Skeleton() {
    return (
        <div className="skeleton">
            <div className="line" />
            <div className="line w-60" />
            <div className="line w-40" />
        </div>
    );
}

export function StatusBar({ text = '就绪' }) {
    return (
        <footer className="statusbar">
            <span className="ok">●</span>
            <span>{text}</span>
            <span style={{ marginLeft: 'auto' }}>Cocos Toolbox v1.0.0</span>
        </footer>
    );
}