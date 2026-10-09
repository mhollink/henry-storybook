import DOMPurify from "dompurify";
import { marked } from "marked";

interface MarkdownContentProps {
  markdown: string;
}

export function MarkdownContent({ markdown }: MarkdownContentProps) {
  const html = DOMPurify.sanitize(marked.parse(markdown, { async: false }));

  return (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: Markdown HTML is sanitized with DOMPurify before rendering.
    <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
