interface ArticleEditorPageProps {
  params: {
    slug: string;
  };
}

export default function ArticleEditorPage({ params }: ArticleEditorPageProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-slate-900">Edição de matéria (mock)</h1>
      <p className="text-sm text-slate-600">
        Esta é uma rota placeholder para edição do artigo <span className="font-semibold">#{params.slug}</span>. A implementação completa será adicionada em etapas futuras.
      </p>
    </div>
  );
}

