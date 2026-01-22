import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectDetails from "./ProjectDetails";

const projects = [
  {
    name: "Circular Economy — Plastic Recycling & Waste-to-Value Plant",
    sector: "Recycling / Sustainability",
    stage: "Expansion & Quality Enhancement",
    capitalRequired: "USD 11M",
    highlights: ["Verified feedstock", "Strong off-takers", "High-margin model"],
    impact: ["CO₂ reduction", "Job creation", "Pollution reduction"],
    description: "A scalable circular-economy platform converting plastic waste into high-value recycled outputs, supported by verified feedstock and contracted off-takers. Capital will fund capacity expansion and quality upgrades to capture a USD 150 million annual market while delivering strong margins.",
    kpi: "USD 150M annual market opportunity",
    detailedImpact: "The project generates measurable environmental benefits through emissions reduction, pollution control, and job creation.",
    team: [
      { name: "Operations Lead", role: "Plant Management" },
      { name: "Supply Chain Director", role: "Feedstock Coordination" },
      { name: "Sustainability Officer", role: "Impact Measurement" }
    ],
    comments: [
      { author: "Impact Investor Group", text: "Strong ESG credentials with verified environmental metrics. The circular economy model addresses critical waste management needs while generating attractive returns.", date: "2024-03-15" }
    ]
  },
  {
    name: "Pharmaceutical Manufacturing Expansion",
    sector: "Healthcare / Manufacturing",
    stage: "Scaling",
    capitalRequired: "USD 12M",
    highlights: ["Regulatory approvals", "Strong demand", "Reduced execution risk"],
    impact: ["Improved medicine access", "Reduced imports", "Supply-chain resilience"],
    description: "An established pharmaceutical manufacturer expanding production to meet rising domestic and regional demand. Regulatory approvals are in place, significantly reducing execution risk.",
    kpi: "Regulatory approvals secured",
    detailedImpact: "The investment strengthens healthcare access, lowers import dependence, and supports supply-chain resilience.",
    team: [
      { name: "Manufacturing Director", role: "Production Operations" },
      { name: "Regulatory Affairs Lead", role: "Compliance & Approvals" },
      { name: "Quality Assurance Manager", role: "Product Quality" }
    ],
    comments: [
      { author: "Healthcare Ventures", text: "With regulatory approvals already in place, this represents a lower-risk scaling opportunity in a high-demand sector.", date: "2024-03-10" }
    ]
  },
  {
    name: "Woman-Led Fintech Scaling Across Africa",
    sector: "Fintech / Inclusion",
    stage: "Growth",
    capitalRequired: "USD 12.5M",
    highlights: ["Strong traction", "API integrations", "Woman-led leadership"],
    impact: ["SME empowerment", "Digitalisation", "Financial inclusion"],
    description: "A fast-growing, woman-led fintech platform delivering digital financial solutions to SMEs across Africa. Strong commercial traction and deep API integrations underpin its scalability.",
    kpi: "Pan-African SME reach",
    detailedImpact: "Funding will accelerate market expansion, SME empowerment, and financial inclusion across the continent.",
    team: [
      { name: "Founder & CEO", role: "Strategic Leadership" },
      { name: "Chief Technology Officer", role: "Platform Development" },
      { name: "Head of Partnerships", role: "API Integrations" }
    ],
    comments: [
      { author: "Africa Growth Fund", text: "Exceptional team with proven commercial traction. The API-first approach enables rapid scaling across multiple markets.", date: "2024-03-08" }
    ]
  },
  {
    name: "LNG Upstream & Midstream Expansion Project",
    sector: "Natural Gas / LNG",
    stage: "Brownfield Expansion",
    capitalRequired: "USD 220M",
    highlights: ["Proven reserves", "Midstream upgrade opportunity", "Lower development risk"],
    impact: ["Energy security", "Reduced emissions", "Transition fuel strategy"],
    description: "A brownfield LNG expansion leveraging proven reserves and targeted midstream upgrades. The project offers lower development risk and near-term scalability.",
    kpi: "Proven gas reserves",
    detailedImpact: "Enhances energy security while supporting a lower-emissions transition fuel strategy.",
    team: [
      { name: "Project Director", role: "Development Oversight" },
      { name: "Reservoir Engineer", role: "Technical Operations" },
      { name: "Commercial Lead", role: "Off-take Agreements" }
    ],
    comments: [
      { author: "Energy Capital Partners", text: "Brownfield expansion significantly de-risks the project. Strong fundamentals with proven reserves and existing infrastructure.", date: "2024-03-12" }
    ]
  },
  {
    name: "Small-Scale LNG Development (500 TPD)",
    sector: "Natural Gas / LNG",
    stage: "Development",
    capitalRequired: "USD 85M",
    highlights: ["Guaranteed off-takers", "IRR 27.95%", "NPV USD 21M"],
    impact: ["Energy security", "Reduced emissions", "Gas penetration"],
    description: "A 500 TPD small-scale LNG development forming Phase I of a larger 2,000 TPD LNG platform, designed to supply captive power plants serving commercial and industrial users.",
    kpi: "+NPV USD 21M | IRR 27.95%",
    detailedImpact: "Phase I capital will fund gas liquefaction, logistics, and on-site regasification, underpinned by guaranteed power and LNG off-take agreements. The project delivers strong economics while expanding gas penetration and reducing emissions relative to diesel and heavy fuel oil.",
    team: [
      { name: "Technical Director", role: "LNG Operations" },
      { name: "Finance Lead", role: "Project Economics" },
      { name: "Operations Manager", role: "Logistics & Delivery" }
    ],
    comments: [
      { author: "Infrastructure Fund", text: "Compelling project economics with guaranteed off-take. Phase I sets the foundation for significant scale-up.", date: "2024-03-14" }
    ]
  },
  {
    name: "Utility-Scale Coal-Fired Power Plant (350 MW)",
    sector: "Power Generation / Utility",
    stage: "Opportunity Development",
    capitalRequired: "USD 250M",
    highlights: ["Target IRR 25-32%", "USD 0.04-0.06/kWh tariff", "Annual revenue USD 100-150M"],
    impact: ["Grid stability", "Power deficit reduction", "Infrastructure development"],
    description: "An opportunity to acquire, relocate, and upgrade a 350 MW utility-scale coal-fired power plant from Chile to Nigeria. Originally built by Enel (Italy) in 2012 and decommissioned in 2022 due to EU regulatory changes—not technical obsolescence.",
    kpi: "Target IRR 25-32% | Revenue USD 100-150M/year",
    detailedImpact: "The plant has significant remaining useful life and incorporates advanced exhaust filtration technology. Strategically located near grid evacuation infrastructure, coal reserves, and water supply, addressing Nigeria's structural power deficit.",
    team: [
      { name: "Project Lead", role: "Acquisition & Relocation" },
      { name: "Engineering Director", role: "Plant Upgrade" },
      { name: "Grid Integration Specialist", role: "Power Evacuation" }
    ],
    comments: [
      { author: "Power Infrastructure Fund", text: "Unique opportunity to address critical power infrastructure needs. The plant's proven technology and strategic location offer attractive economics.", date: "2024-03-16" }
    ]
  },
  {
    name: "Investor–Investee Digital Exchange Platform",
    sector: "Fintech / Investment Infrastructure",
    stage: "Start-up / Development",
    capitalRequired: "USD 200K",
    highlights: ["IRR ~65%", "Payback <2 years", "Founder co-investment 10-15%"],
    impact: ["Financial inclusion for SMEs", "Job creation", "Sustainable development"],
    description: "A proprietary digital platform designed to bridge the gap between African SMEs and global capital providers. With strong projected returns (IRR ~65%, payback within two years) and founder co-investment.",
    kpi: "Payback +2 years | IRR 65%",
    detailedImpact: "The platform addresses a critical market inefficiency in African deal origination. It supports SME financing, job creation, and sustainable development alignment.",
    team: [
      { name: "Founder & CEO", role: "Vision & Strategy" },
      { name: "Product Lead", role: "Platform Development" },
      { name: "Business Development", role: "Market Expansion" }
    ],
    comments: [
      { author: "Sarnia Capital", text: "This proprietary technology build addresses a major market gap in African deal origination with compelling unit economics.", date: "2024-03-18" }
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
            Investment Pipeline
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Featured Investment Opportunities
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-2">
            High-impact projects across Energy, Infrastructure, Healthcare, Fintech, and Sustainability sectors
          </p>
        </div>

        <div className="bg-gradient-to-r from-accent/5 via-primary/5 to-accent/5 border border-accent/20 rounded-xl p-6 mb-12 max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-accent rounded-full"></span>
            Why These Opportunities Stand Out
          </h3>
          <ul className="grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span><strong>De-risked execution:</strong> Regulatory approvals, proven technology, verified assets</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span><strong>Strong off-takers:</strong> Guaranteed contracts and committed buyers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span><strong>Attractive returns:</strong> Target IRRs ranging from 25% to 65%</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span><strong>Measurable impact:</strong> ESG-aligned with clear environmental and social benefits</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span><strong>Scalable models:</strong> Phase-based growth with proven market demand</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span><strong>Strategic sectors:</strong> Critical infrastructure addressing real market gaps</span>
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
