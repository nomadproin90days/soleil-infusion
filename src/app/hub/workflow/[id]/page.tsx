import fs from "fs";
import path from "path";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Activity } from "lucide-react";

// This is a Server Component by default in Next.js 13+ App Router
export default async function WorkflowPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const filePath = path.join(process.cwd(), "report", `${id}.md`);
  
  if (!fs.existsSync(filePath)) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Workflow Not Found</h1>
          <Link href="/hub" className="text-[#004a99] hover:underline">Back to Hub</Link>
        </div>
      </div>
    );
  }

  const content = fs.readFileSync(filePath, "utf8");
  
  // Simple markdown-to-UI parser for this specific structure
  const lines = content.split("\n");
  const title = lines[0].replace("# ", "");
  
  const sections: { title: string; body: string[] }[] = [];
  let currentSection: { title: string; body: string[] } | null = null;

  lines.slice(1).forEach(line => {
    if (line.startsWith("## ")) {
      if (currentSection) sections.push(currentSection);
      currentSection = { title: line.replace("## ", ""), body: [] };
    } else if (currentSection && line.trim() !== "") {
      currentSection.body.push(line);
    }
  });
  if (currentSection) sections.push(currentSection);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] font-sans pb-32">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-black/5">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/hub" className="flex items-center gap-2 text-sm text-[#646464] hover:text-[#111111] transition-colors">
            <ArrowLeft size={16} />
            <span>Back to Resource Hub</span>
          </Link>
          <div className="text-xs font-mono uppercase tracking-widest text-[#999999]">Workflow Specification</div>
        </div>
      </nav>

      <main className="pt-32 px-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 rounded-2xl bg-[#004a99] flex items-center justify-center text-white">
            <Activity size={24} />
          </div>
          <h1 className="text-4xl font-light tracking-tight">{title}</h1>
        </div>

        <div className="space-y-8">
          {sections.map((section, i) => (
            <div key={i} className="bg-white rounded-[2rem] border border-black/5 shadow-sm p-8 md:p-12">
              <h2 className="text-sm font-mono uppercase tracking-widest text-[#999999] mb-6">{section.title}</h2>
              <div className="space-y-4 font-light text-[#444444] leading-relaxed">
                {section.body.map((line, j) => {
                  if (line.startsWith("- ")) {
                    return (
                      <div key={j} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-green-500 mt-1 flex-shrink-0" />
                        <span>{line.replace("- ", "")}</span>
                      </div>
                    );
                  }
                  if (line.startsWith("**")) {
                    return <p key={j} className="font-medium text-[#111111] mt-6 first:mt-0">{line.replace(/\*\*/g, "")}</p>;
                  }
                  return <p key={j}>{line}</p>;
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-12 bg-[#111111] rounded-[3rem] text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#004a99]/20 to-transparent pointer-events-none" />
          <h3 className="text-3xl font-light mb-4 relative z-10 text-balance">This workflow is built for <span className="text-[#A6C7E7] italic">scale</span>.</h3>
          <p className="text-[#646464] max-w-md relative z-10 leading-relaxed font-light">
            Every step is automated to ensure your staff can focus on patient care while the system handles the coordination.
          </p>
        </div>
      </main>
    </div>
  );
}
