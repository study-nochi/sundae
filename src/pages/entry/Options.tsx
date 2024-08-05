import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";

interface OptionsProps {
  optionType: string;
}

export default function Options({ optionType }: OptionsProps) {
  const [items, setItems] = useState<
    {
      name: string;
      imagePath: string;
    }[]
  >([]);

  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        console.log(response);
        setItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [optionType]);

  // TODO: replace `null` with ToppingOption when available
  const ItemComponent = optionType === "scoops" ? ScoopOption : null;
  const optionItems = items.map(
    (item) =>
      ItemComponent && (
        <ItemComponent
          key={item.name}
          name={item.name}
          imagePath={item.imagePath}
        />
      )
  );

  return optionItems;
}
