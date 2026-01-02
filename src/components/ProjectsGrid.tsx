import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectDetails from "./ProjectDetails";

const projects = [
  {
    name: "SolarVest Energy",
    industry: "Renewable Energy",
    stage: "Series A",
    raised: "$2.4M",
    valuation: "$18M",
    growth: "+165%",
    investors: 42,
    description: "Community solar projects delivering 30% cost savings to subscribers",
    yearEstablished: 2020,
    team: [
      { name: "Dr. Sarah Chen", role: "CEO & Founder" },
      { name: "Michael Roberts", role: "CTO" },
      { name: "Jennifer Martinez", role: "CFO" }
    ],
    comments: [
      { author: "Green Energy Capital", text: "Strong regulatory approval track record. Government incentives secured in 3 states. Key success factor: Clear compliance and partnership documentation.", date: "2024-02-01" },
      { author: "Climate Solutions Fund", text: "10MW already operational with 2-year payback. Lesson: Demonstrate proven technology with real metrics.", date: "2024-01-28" }
    ]
  },
  {
    name: "AgriGrow Solutions",
    industry: "Agriculture",
    stage: "Growth",
    raised: "$3.8M",
    valuation: "$22M",
    growth: "+140%",
    investors: 38,
    description: "Precision agriculture platform increasing crop yields by 45% through IoT and AI",
    yearEstablished: 2018,
    team: [
      { name: "Robert Thompson", role: "Founder & CEO" },
      { name: "Dr. Maria Garcia", role: "Chief Agronomist" },
      { name: "Kevin Park", role: "VP Technology" }
    ],
    comments: [
      { author: "AgriTech Ventures", text: "Deployed on 75,000 acres with 40%+ ROI for farmers. Success tip: Show measurable farmer ROI and adoption rates.", date: "2024-02-03" },
      { author: "Food Security Fund", text: "85% customer retention rate and strong subscription model. Key: Predictable recurring revenue is attractive to investors.", date: "2024-01-30" }
    ]
  },
  {
    name: "PetroTech Analytics",
    industry: "Oil & Gas",
    stage: "Series B",
    raised: "$5.1M",
    valuation: "$35M",
    growth: "+125%",
    investors: 29,
    description: "AI-powered predictive maintenance reducing downtime by 60% for oil & gas operations",
    yearEstablished: 2019,
    team: [
      { name: "James Morrison", role: "CEO" },
      { name: "Dr. Ahmed Hassan", role: "Chief Data Officer" },
      { name: "Lisa Wang", role: "VP Operations" }
    ],
    comments: [
      { author: "Energy Innovation Capital", text: "Contracts with 3 major oil companies saving $2M+ annually per site. Winning formula: Enterprise contracts with measurable cost savings.", date: "2024-02-05" },
      { author: "Industrial Tech Ventures", text: "Strong IP portfolio with safety improvements. Critical: Patent protection and proven safety records matter.", date: "2024-02-01" }
    ]
  },
  {
    name: "MediConnect Health",
    industry: "Health",
    stage: "Seed",
    raised: "$950K",
    valuation: "$8M",
    growth: "+195%",
    investors: 26,
    description: "Telemedicine platform connecting rural communities to specialized healthcare",
    yearEstablished: 2021,
    team: [
      { name: "Dr. Emily Martinez", role: "Founder & CEO" },
      { name: "Raj Patel", role: "CTO" },
      { name: "Susan Chen", role: "Chief Medical Officer" }
    ],
    comments: [
      { author: "HealthTech Ventures", text: "HIPAA compliant, insurance reimbursement approved, serving 50,000+ patients. Must-have: Regulatory compliance from day one.", date: "2024-02-04" },
      { author: "Impact Healthcare Fund", text: "95% patient satisfaction with hospital partnerships in 12 states. Success driver: Strong partnerships and clinical outcomes data.", date: "2024-01-31" }
    ]
  },
  {
    name: "PayFlow Global",
    industry: "FinTech",
    stage: "Series A",
    raised: "$4.3M",
    valuation: "$28M",
    growth: "+175%",
    investors: 45,
    description: "Cross-border payment infrastructure reducing transaction costs by 70%",
    yearEstablished: 2020,
    team: [
      { name: "David Okonkwo", role: "CEO" },
      { name: "Priya Sharma", role: "Chief Product Officer" },
      { name: "Tom Bradley", role: "CFO" }
    ],
    comments: [
      { author: "Global Finance Partners", text: "Processing $15M monthly across 8 countries with banking licenses secured. Essential: Proper licensing and compliance frameworks.", date: "2024-02-06" },
      { author: "FinTech Innovators", text: "65% gross margin with fraud rate under 0.1%. What investors want: Strong unit economics and proven security.", date: "2024-01-30" }
    ]
  }
];

const ProjectsGrid = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleProjectClick = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setDetailsOpen(true);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <div className="inline-block px-4 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary font-semibold text-sm mb-4">
            Priority Sectors
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Featured Investment Opportunities
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-2">
            We focus exclusively on high-impact sectors: Agriculture, Renewable Energy, Oil & Gas, FinTech, and Health
          </p>
        </div>

        <div className="bg-accent/5 border border-accent/20 rounded-xl p-6 mb-12 max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-accent rounded-full"></span>
            What Makes These Ventures Stand Out? (Learn from successful listings)
          </h3>
          <ul className="grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span><strong>Proven metrics:</strong> Real traction with measurable ROI and customer data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span><strong>Regulatory compliance:</strong> Licenses, certifications, and approvals in place</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span><strong>Strong partnerships:</strong> Enterprise contracts and strategic alliances</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span><strong>Expert team:</strong> Industry experience with proven track records</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span><strong>Clear financials:</strong> Transparent unit economics and path to profitability</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span><strong>IP protection:</strong> Patents, proprietary technology, or competitive moats</span>
            </li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              {...project} 
              onClick={() => handleProjectClick(project)}
            />
          ))}
        </div>
      </div>

      <ProjectDetails 
        project={selectedProject}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </section>
  );
};

export default ProjectsGrid;
