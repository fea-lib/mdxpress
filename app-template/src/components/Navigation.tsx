import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

interface Document {
  slug: string;
  title: string;
  path: string;
}

interface NavigationProps {
  documents: Document[];
}

interface TreeNode {
  name: string;
  slug?: string;
  title?: string;
  children: TreeNode[];
  isExpanded?: boolean;
}

// Read docs configuration
async function getDocsConfig() {
  try {
    // Import the config file dynamically
    const response = await fetch('/docs.config.json');
    const config = await response.json();
    return {
      docsDir: config.docsDir || "docs",
      title: config.title || "Documentation", 
      description: config.description || ""
    };
  } catch {
    return { 
      docsDir: "docs",
      title: "Documentation",
      description: ""
    };
  }
}

function buildDocumentTree(documents: Document[]): TreeNode {
  const root: TreeNode = { name: "root", children: [] };

  documents.forEach((doc) => {
    const parts = doc.slug.split("/").filter(Boolean);
    let currentNode = root;

    // Build the tree structure
    parts.forEach((part, index) => {
      let existingChild = currentNode.children.find(
        (child) => child.name === part
      );

      if (!existingChild) {
        const isLeaf = index === parts.length - 1;
        existingChild = {
          name: part,
          slug: isLeaf ? doc.slug : undefined, // Only leaf nodes have slugs
          title: isLeaf ? doc.title : part.replace(/-/g, " "),
          children: [],
          isExpanded: false,
        };
        currentNode.children.push(existingChild);
      }

      currentNode = existingChild;
    });
  });

  return root;
}

function TreeNodeComponent({
  node,
  depth = 0,
}: {
  node: TreeNode;
  depth?: number;
}) {
  const [isExpanded, setIsExpanded] = useState(depth === 0 || depth === 1);
  const location = useLocation();
  const hasChildren = node.children.length > 0;
  const isActive = node.slug && location.pathname === `/docs/${node.slug}`;

  const toggleExpanded = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <li className="tree-node">
      <div className={`tree-node-content ${isActive ? "active" : ""}`}>
        {hasChildren ? (
          // Directory node - make the whole thing clickable to toggle
          <button
            className="tree-folder-toggle"
            onClick={toggleExpanded}
            aria-label={isExpanded ? "Collapse" : "Expand"}
            aria-expanded={isExpanded}
          >
            <span className="tree-toggle-icon"></span>
            <span className="tree-folder-icon"></span>
            <span className="tree-folder-name">{node.title || node.name}</span>
          </button>
        ) : (
          // Document node - regular link
          <Link to={`/docs/${node.slug}`} className="tree-link">
            <span className="tree-file-icon"></span>
            {node.title || node.name}
          </Link>
        )}
      </div>

      {hasChildren && isExpanded && (
        <ul className="tree-children">
          {node.children.map((child, index) => (
            <TreeNodeComponent
              key={`${child.name}-${index}`}
              node={child}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export function Navigation({ documents }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [config, setConfig] = useState({ docsDir: "docs", title: "Documentation", description: "" });
  const tree = buildDocumentTree(documents);

  // Load configuration
  useEffect(() => {
    getDocsConfig().then(setConfig);
  }, []);

  // Close mobile menu when clicking outside or on a link
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.querySelector(".navigation");
      const toggle = document.querySelector(".mobile-menu-toggle");

      if (
        isMobileMenuOpen &&
        nav &&
        !nav.contains(event.target as Node) &&
        !toggle?.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when route changes
  const location = useLocation();
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      {/* Floating burger menu button (mobile only) */}
      <button
        className="mobile-menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        {isMobileMenuOpen ? "✕" : "☰"}
      </button>

      {/* Mobile backdrop */}
      {isMobileMenuOpen && (
        <div
          className={`mobile-backdrop ${isMobileMenuOpen ? "visible" : ""}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <nav className={`navigation ${isMobileMenuOpen ? "mobile-open" : ""}`}>
        <div className="navigation-header">
          <h1>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              {config.docsDir}
            </Link>
          </h1>
          <ThemeToggle />
        </div>

        <div className="nav-content">
          <ul className="tree-root">
            {tree.children.map((child, index) => (
              <TreeNodeComponent
                key={`${child.name}-${index}`}
                node={child}
                depth={0}
              />
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
