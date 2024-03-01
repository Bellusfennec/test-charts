/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { characterService } from "../services/characterService";
import { CharacterChart } from "../components/ui/CharactersChart";
import { ChartData, ObjectData } from "../types";
import { Button } from "../components/common/buttons/Button";
import { DataPickerField } from "../components/common/fileds/DataPickerField";
import { useForm } from "../hooks/useForm";
import { RadioField } from "../components/common/fileds/RadioField";
import style from "./style.module.scss";

export function App() {
  const { form, setForm, handlerChange } = useForm({ initial: { startDate: "", endDate: "", allDate: "yes" } });
  const [characterList, setCharacterList] = useState<any[]>([]);
  const [, setError] = useState();
  const notDate = characterList.filter((f) => f.dateOfBirth === null);
  const withDate = characterList.filter((f) => f.dateOfBirth);
  const startDateFiltered = form.startDate
    ? withDate.filter(
        (item) => +new Date(formatDateField(item.dateOfBirth)).getTime() >= +new Date(form.startDate).getTime()
      )
    : withDate;
  const endDateFiltered = form.endDate
    ? startDateFiltered.filter(
        (item) => +new Date(formatDateField(item.dateOfBirth)).getTime() <= +new Date(form.endDate).getTime()
      )
    : startDateFiltered;
  const toggleDate = form.allDate === "yes" ? [...endDateFiltered, ...notDate] : endDateFiltered;
  const characterChartList: ChartData[] = useMemo(() => get(toggleDate), [toggleDate]);

  console.log({ form, characterList, startDateFiltered, endDateFiltered, characterChartList, notDate, withDate });

  function get(data: any[]) {
    const objectList = countByKey({ data, key: "house" });
    return transformForChart({ object: objectList, notFound: "Без факультета" });
  }

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
      .then((response) => {
        setCharacterList(response);
        setRangeDate(response);
      })
      .catch((error) => setError(error));
  };

  useEffect(() => {
    getCharacterList();
  }, []);

  function setRangeDate(data: any) {
    if (data.length > 0) {
      const sortedData = [...data]
        .filter((f: any) => f.dateOfBirth)
        .sort((a: any, b: any) => {
          const aa = +new Date(formatDateField(a.dateOfBirth)).getTime();
          const bb = +new Date(formatDateField(b.dateOfBirth)).getTime();
          return aa - bb;
        });
      const startDate = formatDateField(sortedData[0].dateOfBirth);
      const endDate = formatDateField(sortedData.at(-1).dateOfBirth);
      setForm((state) => ({ ...state, startDate, endDate }));
    }
  }

  function formatDateField(date: any) {
    const numbers = date.split("-");
    return `${numbers[2]}-${numbers[1]}-${numbers[0]}`;
  }

  return (
    <div className={style.container}>
      <h1>Информация по вселенной Гарри Поттера</h1>
      <h2></h2>
      <p>Поиск по датам рождения:</p>
      <div className={style.row}>
        <DataPickerField onChange={handlerChange} name="startDate" value={form.startDate} />
        <DataPickerField onChange={handlerChange} name="endDate" value={form.endDate} />
        <Button disabled>Поиск</Button>
      </div>
      <p>Без даты рождения включительно?</p>
      <div className={style.row}>
        <RadioField
          type="radio"
          value="yes"
          onChange={handlerChange}
          name="allDate"
          label="Да"
          checked={form.allDate === "yes" ? true : false}
        />
        <RadioField
          type="radio"
          value="no"
          onChange={handlerChange}
          name="allDate"
          label="Нет"
          checked={form.allDate === "no" ? true : false}
        />
      </div>
      <CharacterChart data={characterChartList} />
      <p>Общее количество: {toggleDate.length}</p>
    </div>
  );
}
