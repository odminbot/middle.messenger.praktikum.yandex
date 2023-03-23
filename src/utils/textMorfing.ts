export function timeDateMessage(messageTime:string):string {
  
  const date = new Date(messageTime);
  let time = date.toLocaleTimeString();
  let anotherWeekDay = false;
  
  const dateNow = new Date();
  const resultDate = dateNow.getTime() - date.getTime();
  const dayWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const dayWeekNow = dayWeek[dateNow.getDay()]
  const dayWeekMessage = dayWeek[date.getDay()];

  if (dayWeekMessage !== dayWeekNow) { anotherWeekDay = true; }

  if(anotherWeekDay)  { time = dayWeekMessage;   }
  if(resultDate > 519599000) { time = date.toLocaleDateString();  }

  return time;
}

export default timeDateMessage;
