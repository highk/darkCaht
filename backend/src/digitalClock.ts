import * as moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

moment().day

const set = ["▓", "█", "▓", "█", "▓"];
const set2 = ["▓", "▓", "▓", "▓", "█"];
const times = [
  ["███", "█▓█", "█▓█", "█▓█", "███"],
  ["▓▓█", "▓▓█", "▓▓█", "▓▓█", "▓▓█"],
  ["███", "▓▓█", "███", "█▓▓", "███"],
  ["███", "▓▓█", "███", "▓▓█", "███"],
  ["█▓█", "█▓█", "███", "▓▓█", "▓▓█"],
  ["███", "█▓▓", "███", "▓▓█", "███"],
  ["███", "█▓▓", "███", "█▓█", "███"],
  ["███", "▓▓█", "▓▓█", "▓▓█", "▓▓█"],
  ["███", "█▓█", "███", "█▓█", "███"],
  ["███", "█▓█", "███", "▓▓█", "▓▓█"],
];
const week = ["일", "월", "화", "수", "목", "금", "토"];
const timeMsg = "현재 시간은 ";


const parseInts = (value: any) => Number.parseInt(String(value)); 

export default function (time: moment.Moment) {


  const year = time.year();
  const month = time.month();
  const date = time.date();
  const hour = time.hour();
  const minute = time.minute()
  const second = time.second()
  const millis = time.millisecond();
  const yoil = week[time.day()];
  const milf = parseInts(millis / 100);
  const mils = parseInts(millis / 10) % 10;



  let hourf, hours, minf, mins, secf, secs;
    if (hour > 9) {
    hourf = parseInts (hour / 10);
    hours = hour % 10;
  } else {
    hourf = 0;
    hours = hour;
  }

    if (minute > 9) {
    minf = parseInts (minute / 10);
    mins = minute % 10;
  } else {
    minf = 0;
    mins = minute;
  }

  if (second > 9) {
    secf = parseInts (second / 10);
    secs = second % 10;
  } else {
    secf = 0;
    secs = second;
  }


  let text = `${year}년 ${month}월 ${date}일 ${yoil}요일 ${hour}시 ${minute}분 ${second}.${millis}초 입니다.<br/>`;
  let clock = ``;
  for (let i = 0; i < 5; i++) {
    clock+=`${times[hourf][i]} ${times[hours][i]} ${set[i]} ${times[minf][i]} ${times[mins][i]}<br/>`;
  }

  clock += `<br/>`;

  for (let i = 0; i < 5; i++) {
    clock += `${times[secf][i]} ${times[secs][i]} ${set2[i]} ${times[milf][i]} ${times[mils][i]}<br/>`;
  }

  return timeMsg + text + "\n 디지털시계 : <br>"+clock;
  // return "";
}

// export default function (time: any) {
//   let day = time.day();
//   let hour = time.hours();
//   let minute = time.minutes();
//   let second = time.seconds();
//   let millis = time.milliseconds();
//   let milf = Number(millis / 100);
//   let mils = Number(millis / 10) % 10;
//   let hourf, hours, minf, mins, secs, secf; // 선언
//   let clock = "",
//     text = "",
//     res = ""; // 초기화
//   let yoil = week[day];

//   if (hour > 9) {
//     hourf = Number(hour / 10);
//     hours = hour % 10;
//   } else {
//     hourf = 0;
//     hours = hour;
//   }

//   if (minute > 9) {
//     minf = Number(minute / 10);
//     mins = minute % 10;
//   } else {
//     minf = 0;
//     mins = minute;
//   }

//   if (second > 9) {
//     secf = Number(second / 10);
//     secs = second % 10;
//   } else {
//     secf = 0;
//     secs = second;
//   }

//   text = `${time.year}년 ${
//     time.month + 1
//   }월 ${time.date}일 ${yoil}요일 ${hour}시 ${minute}분 ${second}.${millis}초 입니다.<br>`;
//   for (let i = 0; i < 5; i++) {
//     clock = `${clock}${times[hourf][i]} ${times[hours][i]} ${set[i]} ${times[minf][i]} ${times[mins][i]} <br>`;
//   }
//   clock += `<br>`;
//   for (let i = 0; i < 5; i++) {
//     clock = `${clock}${times[secf][i]} ${times[secs][i]} ${set1[i]} ${times[milf][i]} ${times[mils][i]} <br>`;
//   }
//   res = timeMsg + text + "\n 디지털시계 : <br>" + clock;
//   return res;
// }
