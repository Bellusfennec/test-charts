import { useEffect, useState } from "react";
import { characterService } from "../services/characterService";
import { CharacterChart } from "../components/ui/CharactersChart";
import { ChartData, ObjectData } from "../types";

export function App() {
  const [characterList, setCharacterList] = useState<any[]>([]);
  const [, setError] = useState();
  const objectList = countByKey({ data: characterList, key: "house" });
  const characterChartList: ChartData[] = transformForChart({ object: objectList, notFound: "Без факультета" });

  function countByKey({ data, key }: { data: any[]; key: string }) {
    return data.reduce((acc, el) => {
      if (acc[el[key]]) acc[el[key]] += 1;
      else acc[el[key]] = 1;
      return acc;
    }, {});
  }

  function transformForChart({ object, notFound = "Нет данных" }: { object: ObjectData; notFound?: string }) {
    let data: ChartData[] = [];
    for (const key in object) {
      if (key === "") data = [...data, { name: notFound, value: object[key] }];
      else data = [...data, { name: key, value: object[key] }];
    }
    return data;
  }

  const getCharacterList = () => {
    characterService
      .getAll()
      .then((response) => setCharacterList(response))
      .catch((error) => setError(error));
  };

  useEffect(() => {
    getCharacterList();
  }, []);

  return (
    <>
      <h1>Информация по вселенной Гарри Поттера</h1>
      <CharacterChart data={characterChartList} />
    </>
  );
}
