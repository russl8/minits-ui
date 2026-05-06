export default function Footer() {
  return (
    <footer className="px-6 py-4">
      <div className="flex items-center justify-center">
        <span className="text-muted text-sm">
          language + interpreter created by {" "}
          <a
            href="https://github.com/russl8"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-blue-300 transition-colors"
          >
            @russl8
          </a>
          {" "}•
          <a
            href="https://github.com/russl8/MiniTS"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-blue-300 transition-colors ml-1"
          >
            github repo link
          </a>
        </span>
      </div>
    </footer>
  );
}
