import { useState } from "react";
import { BadgeCheck, ExternalLink, RotateCw } from "lucide-react";

const certifications = [
  {
    title: "AWS Certified Cloud Practitioner",
    code: "CLF-C02",
    issuer: "Amazon Web Services Training and Certification",
    date: "2026",
    description:
      "Validates cloud fluency and foundational AWS knowledge — covering core services, security, architecture, pricing, and support models.",
    badgeImg: "https://images.credly.com/size/680x680/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png",
    verifyUrl: "https://www.credly.com/badges/00f953ad-d30d-4607-adad-b81c9e2a92df/public_url",
  },
];

const CertCard = ({ cert }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-56 h-64" style={{ perspective: "1000px" }}>
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl bg-card border border-orange-400/30 flex flex-col items-center justify-center gap-3 shadow-md"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={cert.badgeImg}
            alt={`${cert.title} badge`}
            className="w-44 h-44 object-contain"
          />
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
          >
            View on Credly <ExternalLink className="h-3 w-3" />
          </a>
          {/* Flip trigger */}
          <button
            onClick={() => setFlipped(true)}
            className="absolute top-2 right-2 p-1.5 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            aria-label="Show details"
          >
            <RotateCw className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl bg-card border border-orange-400/30 flex flex-col items-center justify-center gap-3 p-6 shadow-md text-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <p className="text-xs font-mono text-muted-foreground">{cert.code}</p>
          <h3 className="font-semibold text-sm leading-snug">{cert.title}</h3>
          <p className="text-xs text-muted-foreground">{cert.issuer}</p>
          <p className="text-xs text-muted-foreground">{cert.date}</p>
          <span className="flex items-center gap-1 text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
            <BadgeCheck className="h-3.5 w-3.5" />
            Verified
          </span>
          {/* Flip back */}
          <button
            onClick={() => setFlipped(false)}
            className="absolute top-2 right-2 p-1.5 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            aria-label="Show badge"
          >
            <RotateCw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          My <span className="text-primary">Certifications</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Industry-recognized credentials that complement my academic and hands-on experience.
        </p>

        <div className="flex justify-center">
          {certifications.map((cert, index) => (
            <CertCard key={index} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );
};
