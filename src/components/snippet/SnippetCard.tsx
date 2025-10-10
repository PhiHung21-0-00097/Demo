import Prism from "prismjs";
import "prismjs/themes/prism-dark.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SnippetCard = ({ snippet }: any) => {
  const pathname = usePathname();
  const isProfilePage = pathname.startsWith("/profile");

  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    const className =
      "p-2 rounded-lg w-full border border-gray-700 hover:border-indigo-400 transition-colors duration-200 bg-gray-900";

    if (isProfilePage) {
      return (
        <Link href={`/snippets/${snippet._id}`} className={className}>
          {children}
        </Link>
      );
    }

    return <div className={className}>{children}</div>;
  };
  return (
    <CardWrapper>
      {/* Header */}
      <div className="terminal-header bg-zinc-700 text-white p-2 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-red-500 text-5xl leading-[0px] -mt-2">•</span>
          <span className="text-yellow-500 text-5xl leading-[0px] -mt-2 ml-1">
            •
          </span>
          <span className="text-green-500 text-5xl leading-[0px] -mt-2 ml-1">
            •
          </span>
          <span className="ml-4 capitalize text-sm">{snippet.language}</span>
        </div>
        <span className="text-xs text-gray-400">
          {new Date(snippet.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Description */}
      {snippet.description && (
        <p className="px-4 pt-2 text-gray-300 text-sm line-clamp-2">
          {snippet.description}
        </p>
      )}

      {/* Code */}
      <div
        className="pl-4 pt-2 max-h-[200px] overflow-auto hide-scrollbar"
        id="output"
      >
        <pre className="language-javascript wrap-code lg:min-h-[200px]">
          <code
            className={`language-${snippet.language.toLowerCase()}`}
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(
                snippet.code,
                Prism.languages[snippet.language.toLowerCase()] ||
                  Prism.languages.javascript,
                snippet.language.toLowerCase()
              ),
            }}
          />
        </pre>
      </div>

      {/* Tags */}
      {snippet.tags?.length > 0 && (
        <div className="px-4 pt-2 pb-2 flex flex-wrap gap-2">
          {snippet.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </CardWrapper>
  );
};
