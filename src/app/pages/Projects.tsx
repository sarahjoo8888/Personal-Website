import { motion, AnimatePresence } from "motion/react";
import { Github, ExternalLink, ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";
import { useState } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  github: string | null;
  live: string | null;
  borderColor: string;
}

function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length);
  const next = () => setCurrent((i) => (i + 1) % images.length);

  return (
    <div className="relative overflow-hidden bg-gray-100 flex items-center justify-center" style={{ height: "320px" }}>
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`${title} - ${current + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="h-full w-auto object-contain"
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-[var(--pastel-purple)] hover:bg-[var(--pastel-purple)] hover:text-white transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-[var(--pastel-purple)] hover:bg-[var(--pastel-purple)] hover:text-white transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                backgroundColor: i === current ? "var(--pastel-purple)" : "rgba(255,255,255,0.6)",
                transform: i === current ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const projects: Project[] = [
    {
      id: 1,
      title: "Bleacher Rentals Driver App",
      description:
        "A sleek and intuitive mobile app for drivers to view their routes, with real-time updates and seamless navigation.",
      images: [
        "/driverAppProject/tripsView.jpg",
        "/driverAppProject/completedTrip.jpg",
        "/driverAppProject/calendar.jpg",
        "/driverAppProject/driverProfile.jpg",
        "/driverAppProject/incompleteAccess.jpg",
      ],
      tags: ["React Native", "TypeScript", "Expo", "Firebase"],
      github: null,
      live: null,
      borderColor: "var(--pastel-purple)",
    },
    {
      id: 2,
      title: "Ruby Period App Tracker",
      description:
        "A user-friendly mobile app that helps users track their menstrual cycles, symptoms, and overall health with personalized insights and reminders.",
      images: [
        "/rubyPeriodApp/Cycle.png",
        "/rubyPeriodApp/Insights.png",
        "/rubyPeriodApp/Prelim_Qs.png",
        "/rubyPeriodApp/Symptom_Logging.png",
        "/rubyPeriodApp/Explore_Recommendations.png",
        "/rubyPeriodApp/Dietary_Details.png",
      ],
      tags: ["Kotlin", "Jetpack Compose", "Firebase"],
      github: null,
      live: null,
      borderColor: "var(--pastel-purple)",
    },
    {
      id: 3,
      title: "Nutripet App",
      description:
        "An HCI-centered Figma mockup that simplifies personalized pet care through pet preference tracking and AI-powered guidance.",
      images: [
        "/nutripetProject/chat_home.png",
        "/nutripetProject/chat_home_general.png",
        "/nutripetProject/chat_history.png",
        "/nutripetProject/chat_keyb.png",
        "/nutripetProject/chat_ans.png",
        "/nutripetProject/chat_ans_save.png",
        "/nutripetProject/pref_home.png",
        "/nutripetProject/pref_add_prod.png",
        "/nutripetProject/pref_edit_pref.png",
      ],
      tags: ["Figma"],
      github: null,
      live: "https://www.youtube.com/watch?v=SKvA93tAdKg",
      borderColor: "var(--pastel-purple)",
    },
  ];

  return (
    <div className="min-h-screen py-6 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Lightbulb className="w-8 h-8" style={{ color: "var(--pastel-purple)" }} />
            <h1
              className="font-[family-name:var(--font-family-display)] gradient-heading"
              style={{ fontSize: "3rem", fontWeight: 700 }}
            >
              Projects
            </h1>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-card rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all border border-border"
              style={{ borderTop: `4px solid ${project.borderColor}` }}
            >
              <ImageCarousel images={project.images} title={project.title} />

              <div className="p-6">
                <h2 className="mb-3" style={{ fontSize: "1.5rem", fontWeight: 600, lineHeight: 1.3 }}>
                  {project.title}
                </h2>

                <p
                  className="text-[var(--foreground)]/70 mb-4"
                  style={{ fontSize: "0.9375rem", lineHeight: 1.6, fontWeight: 400 }}
                >
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        backgroundColor: `${project.borderColor}20`,
                        color: project.borderColor,
                        fontWeight: 500,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {(project.github || project.live) && (
                  <div className="flex gap-3">
                    {project.github && (
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all hover:scale-105"
                        style={{ borderColor: project.borderColor, color: project.borderColor, fontWeight: 500 }}
                      >
                        <Github size={18} />
                        GitHub
                      </a>
                    )}

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white transition-all hover:scale-105"
                        style={{ backgroundColor: project.borderColor, fontWeight: 500 }}
                      >
                        <ExternalLink size={18} />
                        {project.live.includes("youtube.com") || project.live.includes("youtu.be")
                          ? "Watch Demo"
                          : "Live Demo"}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}