"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { plusJakartaSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useSectionReveal, createFadeInVariants, DURATION_HEADING } from "@/lib/motion";
import { MaskedHeading } from "@/components/ui/MaskedText";
import { Atmosphere } from "@/components/ui/Atmosphere";

const TIMELINE_OPTIONS = [
  "ASAP",
  "1–3 months",
  "3–6 months",
  "Just exploring",
] as const;

const HEAR_OPTIONS = [
  "Referral",
  "Google search",
  "Social media",
  "Blog or article",
  "Event or conference",
  "Worked with us before",
  "Other",
] as const;

function buildWhatsAppMessage(data: {
  firstName: string;
  lastName: string;
  workEmail: string;
  jobTitle: string;
  company: string;
  projectDescription: string;
  timeline: string;
  hearAboutUs: string;
}): string {
  const fullName = `${data.firstName.trim()} ${data.lastName.trim()}`.trim();
  const email = data.workEmail.trim();
  const jobTitle = data.jobTitle.trim() || "Not specified";
  const company = data.company.trim() || "Not specified";
  const description = data.projectDescription.trim();
  const timeline = data.timeline.trim() || "Not specified";
  const source = data.hearAboutUs.trim() || "Not specified";

  return [
    "Hello BEETLE,",
    "",
    "We received a new project inquiry from the website.",
    "",
    "*CONTACT DETAILS*",
    "",
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Job Title: ${jobTitle}`,
    `Company: ${company}`,
    "",
    "*PROJECT DETAILS*",
    "",
    "Project Description:",
    description,
    "",
    "Timeline:",
    timeline,
    "",
    "How they heard about us:",
    source,
    "",
    "Submitted via:",
    "BEETLE website",
  ].join("\n");
}

export function ContactSection() {
  const { ref, controls, shouldReduceMotion } = useSectionReveal("contact");
  const fadeInVariants = createFadeInVariants(shouldReduceMotion);

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    workEmail: "",
    jobTitle: "",
    company: "",
    projectDescription: "",
    timeline: "",
    hearAboutUs: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const handleTimelineSelect = (option: string) => {
    setFormData((prev) => ({
      ...prev,
      timeline: prev.timeline === option ? "" : option,
    }));
    if (errorMessage) setErrorMessage("");
  };

  const handleHearSelect = (option: string) => {
    setFormData((prev) => ({
      ...prev,
      hearAboutUs: prev.hearAboutUs === option ? "" : option,
    }));
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Form field validation
    const firstName = formData.firstName.trim();
    const lastName = formData.lastName.trim();
    const workEmail = formData.workEmail.trim();
    const projectDescription = formData.projectDescription.trim();

    if (!firstName || !lastName || !workEmail || !projectDescription) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(workEmail)) {
      setErrorMessage("Please enter a valid work email address.");
      return;
    }

    const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918884619856";
    const cleanedNumber = rawNumber.replace(/[^0-9]/g, "");

    if (!cleanedNumber || cleanedNumber.length < 7) {
      setErrorMessage("WhatsApp contact number is not configured.");
      return;
    }

    const message = buildWhatsAppMessage(formData);
    const targetUrl = `https://wa.me/${cleanedNumber}?text=${encodeURIComponent(message)}`;

    setWhatsappUrl(targetUrl);
    setSubmitted(true);

    try {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    } catch {
      // Fallback link remains accessible in UI
    }
  };

  return (
    <section
      ref={ref}
      aria-label="Get In Touch"
      className={cn(
        "relative w-full overflow-hidden bg-[#010403] text-white selection:bg-emerald-500/25 selection:text-emerald-100 pt-10 sm:pt-14 md:pt-16 pb-24 sm:pb-32 md:pb-40",
        plusJakartaSans.className
      )}
    >
      {/* ── Level 3 Atmosphere: Radiant Brand Moment echoing the hero emission ── */}
      <Atmosphere level="brand-moment" position="bottom" />

      <div className="relative mx-auto max-w-[880px] px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <div id="contact" className="text-center mb-10 sm:mb-14 scroll-mt-28 md:scroll-mt-32">
          <motion.span
            initial="hidden"
            animate={controls}
            custom={0}
            variants={fadeInVariants}
            className="inline-block text-[11px] sm:text-xs font-mono font-medium tracking-[0.25em] text-emerald-400 uppercase mb-3 sm:mb-4 select-none"
          >
            GET IN TOUCH
          </motion.span>
          <MaskedHeading
            as="h2"
            lines={["Let's build something worth seeing."]}
            controls={controls}
            delay={0.08}
            duration={DURATION_HEADING}
            className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white"
          />
        </div>

        {/* ── Contact Form ── */}
        <motion.form
          onSubmit={handleSubmit}
          initial="hidden"
          animate={controls}
          custom={0.2}
          variants={fadeInVariants}
          className="space-y-4 sm:space-y-4.5"
        >
          {/* Row 1: First Name & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="sr-only">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 text-sm sm:text-base text-white placeholder:text-white/35 transition-all duration-200 focus:border-emerald-400/70 focus:bg-white/[0.04] focus:outline-none focus:ring-1 focus:ring-emerald-400/40"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="sr-only">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 text-sm sm:text-base text-white placeholder:text-white/35 transition-all duration-200 focus:border-emerald-400/70 focus:bg-white/[0.04] focus:outline-none focus:ring-1 focus:ring-emerald-400/40"
              />
            </div>
          </div>

          {/* Row 2: Work Email & Job Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="workEmail" className="sr-only">
                Work Email
              </label>
              <input
                id="workEmail"
                name="workEmail"
                type="email"
                required
                value={formData.workEmail}
                onChange={handleInputChange}
                placeholder="Work Email"
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 text-sm sm:text-base text-white placeholder:text-white/35 transition-all duration-200 focus:border-emerald-400/70 focus:bg-white/[0.04] focus:outline-none focus:ring-1 focus:ring-emerald-400/40"
              />
            </div>
            <div>
              <label htmlFor="jobTitle" className="sr-only">
                Job Title
              </label>
              <input
                id="jobTitle"
                name="jobTitle"
                type="text"
                value={formData.jobTitle}
                onChange={handleInputChange}
                placeholder="Job Title"
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 text-sm sm:text-base text-white placeholder:text-white/35 transition-all duration-200 focus:border-emerald-400/70 focus:bg-white/[0.04] focus:outline-none focus:ring-1 focus:ring-emerald-400/40"
              />
            </div>
          </div>

          {/* Row 3: Company */}
          <div>
            <label htmlFor="company" className="sr-only">
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Company"
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 text-sm sm:text-base text-white placeholder:text-white/35 transition-all duration-200 focus:border-emerald-400/70 focus:bg-white/[0.04] focus:outline-none focus:ring-1 focus:ring-emerald-400/40"
            />
          </div>

          {/* Row 4: Project Description */}
          <div className="relative">
            <label htmlFor="projectDescription" className="sr-only">
              Tell us about your project
            </label>
            <textarea
              id="projectDescription"
              name="projectDescription"
              rows={4}
              required
              maxLength={500}
              value={formData.projectDescription}
              onChange={handleInputChange}
              placeholder="Tell us about your project..."
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 pb-8 text-sm sm:text-base text-white placeholder:text-white/35 transition-all duration-200 focus:border-emerald-400/70 focus:bg-white/[0.04] focus:outline-none focus:ring-1 focus:ring-emerald-400/40 resize-none"
            />
            <span className="absolute bottom-3 right-4 text-[11px] font-mono text-white/30 pointer-events-none select-none">
              {formData.projectDescription.length}/500
            </span>
          </div>

          {/* ── Selection Block: Timeline ── */}
          <div className="pt-3 sm:pt-4">
            <span className="block text-[11px] sm:text-xs font-mono font-medium tracking-[0.16em] uppercase text-white/50 mb-3">
              TIMELINE
            </span>
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {TIMELINE_OPTIONS.map((option) => {
                const isSelected = formData.timeline === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleTimelineSelect(option)}
                    className={cn(
                      "flex items-center gap-2 rounded-full border px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-150",
                      isSelected
                        ? "border-emerald-400/80 bg-emerald-950/60 text-emerald-300 shadow-[0_0_12px_rgba(112,204,77,0.22)]"
                        : "border-white/[0.08] bg-white/[0.02] text-white/70 hover:border-white/20 hover:text-white"
                    )}
                  >
                    <span
                      className={cn(
                        "h-3.5 w-3.5 rounded-full border flex items-center justify-center transition-colors",
                        isSelected
                          ? "border-emerald-400 bg-emerald-400 text-black"
                          : "border-white/30 bg-transparent"
                      )}
                    >
                      {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                    </span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Selection Block: How Did You Hear About Us? ── */}
          <div className="pt-2 sm:pt-3">
            <span className="block text-[11px] sm:text-xs font-mono font-medium tracking-[0.16em] uppercase text-white/50 mb-3">
              HOW DID YOU HEAR ABOUT US?
            </span>
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {HEAR_OPTIONS.map((option) => {
                const isSelected = formData.hearAboutUs === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleHearSelect(option)}
                    className={cn(
                      "flex items-center gap-2 rounded-full border px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-150",
                      isSelected
                        ? "border-emerald-400/80 bg-emerald-950/60 text-emerald-300 shadow-[0_0_12px_rgba(112,204,77,0.22)]"
                        : "border-white/[0.08] bg-white/[0.02] text-white/70 hover:border-white/20 hover:text-white"
                    )}
                  >
                    <span
                      className={cn(
                        "h-3.5 w-3.5 rounded-full border flex items-center justify-center transition-colors",
                        isSelected
                          ? "border-emerald-400 bg-emerald-400 text-black"
                          : "border-white/30 bg-transparent"
                      )}
                    >
                      {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                    </span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Submit Row ── */}
          <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4">
            <AnimatePresence mode="wait">
              {errorMessage && (
                <motion.span
                  key="error"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs sm:text-sm font-mono text-amber-400 sm:mr-auto"
                >
                  {errorMessage}
                </motion.span>
              )}
              {submitted && !errorMessage && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono text-emerald-400 sm:mr-auto"
                >
                  <div className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 stroke-[2.5]" />
                    <span>Your message is ready in WhatsApp.</span>
                  </div>
                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-emerald-300 transition-colors"
                    >
                      Click here if it didn&apos;t open
                    </a>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#010403] font-semibold text-sm sm:text-base px-8 py-3.5 transition-all duration-200 shadow-[0_0_20px_rgba(0,220,130,0.22)] hover:shadow-[0_0_28px_rgba(0,220,130,0.4)] active:scale-[0.98] hover:scale-[1.01] cursor-pointer"
            >
              Submit
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
