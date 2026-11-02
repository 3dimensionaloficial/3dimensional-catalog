import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error in Catalog:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0b0c16] text-slate-100 flex items-center justify-center p-6">
          <div className="glass-card max-w-md w-full p-8 rounded-3xl border border-rose-500/30 text-center space-y-4 shadow-[0_0_40px_rgba(244,63,94,0.15)]">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <h2 className="text-xl font-bold font-heading text-white">
              Vitrine em Atualização
            </h2>

            <p className="text-xs text-slate-400 leading-relaxed">
              O catálogo está sincronizando os produtos mais recentes da loja. Clique no botão abaixo para recarregar a visualização.
            </p>

            <button
              onClick={this.handleReload}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-fuchsia-400 text-slate-900 font-bold text-xs hover:brightness-110 cursor-pointer shadow-md flex items-center justify-center gap-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Atualizar Catálogo</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
