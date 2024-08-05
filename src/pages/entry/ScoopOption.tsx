interface ScoopOptionProps {
  name: string;
  imagePath: string;
}

export default function ScoopOption({ imagePath, name }: ScoopOptionProps) {
  return (
    <div>
      <img src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`} />
    </div>
  );
}
