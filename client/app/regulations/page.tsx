import LandingPageNavbar from "../components/LandingPageNavbar";
import { provisions } from "../data/provisions.js";

interface ProvisionCardProps {
  provision: {
    title: string;
    description: string;
  };
}

function ProvisionsCard({ provision }: ProvisionCardProps) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-200 p-6 rounded-lg shadow-lg hover:shadow-xl hover:ring-4 ring-black/40 transition-all">
      <h3 className="text-xl font-semibold text-purple-800">{provision.title}</h3>
      <p className="mt-2 text-gray-600">{provision.description}</p>
    </div>
  );
}

function Regulations() {
  return (
    <main className="min-h-screen w-screen flex flex-col items-center bg-gradient-to-br from-violet-950 via-violet-700 to-violet-950 text-white">
      <LandingPageNavbar />

      <div className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-medium text-center my-8 mb-14 uppercase">Important Provisions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {provisions.map((provision, index) => (
            <ProvisionsCard key={index} provision={provision} />
          ))}
        </div>
      </div>

      <footer className="text-white py-8 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 Cyber Laws India. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

export default Regulations;
