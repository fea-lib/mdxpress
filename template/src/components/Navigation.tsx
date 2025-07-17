import { Link, useLocation } from "react-router-dom";

interface Document {
  slug: string;
  title: string;
  path: string;
}

interface NavigationProps {
  documents: Document[];
}

export function Navigation({ documents }: NavigationProps) {
  const location = useLocation();

  return (
    <nav className="navigation">
      <h1>
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          Interactive Docs
        </Link>
      </h1>
      <ul>
        {documents.map((doc) => (
          <li key={doc.slug}>
            <Link
              to={`/docs/${doc.slug}`}
              className={
                location.pathname === `/docs/${doc.slug}` ? "active" : ""
              }
            >
              {doc.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
