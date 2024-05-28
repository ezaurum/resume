import profile from "@/assets/profile.json"
import resumePDF from "@/assets/resume.pdf"

function LinkSection() {
  return (
    <section className="flex gap-2">
      <a
        className="p-2 rounded bg-amber-500 text-green-100"
        target="_blank"
        href={profile.linkedin}
        rel="noreferrer"
      >
        LinkedIn
      </a>
      <a
        className="p-2 rounded bg-amber-500 text-green-100"
        target="_blank"
        href={profile.github}
        rel="noreferrer"
      >
        GitHub
      </a>
      <a
        className="p-2 rounded bg-amber-500 text-green-100"
        target="_blank"
        href={profile.blog}
        rel="noreferrer"
      >
        Blog
      </a>
      <a
        className="p-2 rounded bg-amber-500 text-green-100"
        target="_blank"
        href={resumePDF}
        rel="noreferrer"
      >
        Download Resume
      </a>
    </section>
  )
}

export default LinkSection
