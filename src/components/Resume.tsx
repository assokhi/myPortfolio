export function Resume() {
  return (
    <section className="font-nav flex h-dvh w-full flex-col">
      <iframe src="/assets/resume.pdf" title="Resume" className="w-full flex-1" />
      <a
        href="/assets/resume.pdf"
        target="_blank"
        rel="noreferrer"
        className="py-2 text-center text-sm text-slate-600 underline dark:text-night-300"
      >
        Having trouble viewing? Open resume in a new tab
      </a>
    </section>
  );
}
