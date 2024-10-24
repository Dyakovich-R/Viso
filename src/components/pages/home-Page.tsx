import { Input } from '@/components/ui/input';

interface HomePageProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div>
      <Input
        className="w-[500px] mb-3"
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search for a recipe..."
      />
    </div>
  );
};

export default HomePage;
