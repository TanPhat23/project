import { Atom } from "lucide-react";
const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative animate-spin">
        <Atom className="text-blue-500"/>
      </div>
      <p className="text-sm text-muted-foreground">ChatGPT is thinking...</p>
    </div>
  );
};

export default Loader;
