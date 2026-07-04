import { COLORS, projectSummary } from '../data';

export default function DocsPanel({ docs, onUpload, uploadMsg, fileRef }) {
  return (
    <div className="docs-grid">
      <div className="upload-card">
        <div className="upload-icon">📤</div>
        <div className="upload-title">Upload Company Documents</div>
        <div className="upload-copy">PDF, DOCX, TXT — AI will chunk and embed for RAG retrieval</div>
        <button onClick={() => fileRef.current.click()} className="primary-button">
          Choose File
        </button>
        <input ref={fileRef} type="file" accept=".pdf,.docx,.txt" className="file-input" onChange={onUpload} />
        {uploadMsg && <div className="upload-status">{uploadMsg}</div>}
      </div>
      <div className="panel-card docs-list-card">
        <div className="panel-title">Indexed Documents ({docs.length})</div>
        {docs.map((doc, i) => (
          <div key={doc.name + i} className="doc-row">
            <div className="doc-icon">📄</div>
            <div className="doc-details">
              <div className="doc-name">{doc.name}</div>
              <div className="doc-meta">{doc.size} · {doc.chunks > 0 ? `${doc.chunks} chunks` : 'Processing...'}</div>
            </div>
            <span className={doc.status === 'indexed' ? 'doc-badge success' : 'doc-badge processing'}>
              {doc.status === 'indexed' ? '✓ Indexed' : '⟳ Processing'}
            </span>
          </div>
        ))}
      </div>
      <div className="info-card">
        <strong>RAG Pipeline:</strong> Uploaded documents → chunked into segments → embedded via OpenAI → stored in Pinecone vector DB → retrieved on each customer query → passed as context to GPT-4.1 for accurate responses.
      </div>
      <div className="info-card overview-card">
        <div className="overview-title">InsightFlow AI Overview</div>
        <p>{projectSummary.description}</p>
        <div className="overview-list">
          {projectSummary.highlights.map((item) => (
            <div key={item} className="overview-item">• {item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
