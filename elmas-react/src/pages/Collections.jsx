import { useState } from "react";
import { Link } from "react-router-dom";
import { collectionProducts } from "../data/collections.js";
import { useSearch } from "../context/SearchContext.jsx";
import { useDocumentTitle, formatRs } from "../hooks.js";
import "../styles/pg-collections.css";

const FILTERS = [
  { label: "All Pieces", value: "all" },
  { label: "Rings", value: "Ring" },
  { label: "Necklaces", value: "Necklace" },
  { label: "Luxury Sets", value: "SET" },
  { label: "Earrings", value: "Ear ring" },
  { label: "Bracelets", value: "Bracelet" },
];

export default function Collections() {
  useDocumentTitle("Our Collections | ELMAS Jewellery");
  const { query } = useSearch();
  const [category, setCategory] = useState("all");
  const [preview, setPreview] = useState(null);

  const term = query.toLowerCase().trim();
  const visible = collectionProducts.filter(
    (p) =>
      (category === "all" || p.type.includes(category)) &&
      p.type.toLowerCase().includes(term)
  );

  return (
    <div className="pg-collections">
      <div className="page-title-section">
        <h1>Our Collections</h1>
        <p className="text-muted small text-uppercase tracking-wider">
          Meticulously curated high-end masterpieces
        </p>
      </div>

      <div className="filter-buttons">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={`filter-btn ${category === f.value ? "active" : ""}`}
            onClick={() => setCategory(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div id="container">
        {visible.map((p) => (
          <div className="item" key={p.id}>
            <img src={p.image} alt={p.title} loading="lazy" onClick={() => setPreview(p)} />
            <p>{p.title}</p>
            <span className="item-subtitle">{p.subtitle}</span>
            <div className="item-price-tag">{formatRs(p.price)}</div>
            <Link
              to={`/estimator?id=${encodeURIComponent(p.id)}&name=${encodeURIComponent(p.estimatorName)}&price=${p.price}`}
              className="btn-select-item"
            >
              Select &amp; Estimate
            </Link>
          </div>
        ))}
      </div>

      {preview && (
        <div
          className="elmas-modal"
          style={{ display: "flex" }}
          onClick={(e) => e.target === e.currentTarget && setPreview(null)}
        >
          <div className="elmas-modal-content">
            <span className="close" onClick={() => setPreview(null)}>&times;</span>
            <img src={preview.image} alt={preview.title} />
            <p>{preview.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}
