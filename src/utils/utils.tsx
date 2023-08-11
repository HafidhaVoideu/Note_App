const TAGS_COLORS = [
  "#3CCF4E",
  "#e40b69",
  "#df6d03",
  "#2ed4c6",
  "#0d96e0",
  "#97ad0a",
  "#aa5aff",
  "#52069f",
];

import { Note, Tag } from "../context/appContext";

//

export function generateRandomColor(labelId: string, tags: Tag[]) {
  const tagNames = tags.map((tag) => tag.id);
  const tagColors = tagNames.map((id, index) => {
    return { id, color: TAGS_COLORS[index % TAGS_COLORS.length] };
  });

  const mapColor = tagColors.find((tag) => tag.id === labelId);
  return mapColor?.color;
}

export function sortByDate(type: string, notes: Note[]) {
  const sortedNotes = notes
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
  if (type === "ascn") return sortedNotes.reverse();
  else return sortedNotes;
}

export function sortByArabic(type: string, notes: Note[]) {
  //   const { notes } = useAppContext();

  const arabicNotes = notes
    .filter((note) => note.lang === "AR")
    .sort((a, b) => {
      const nameA = a.title.toUpperCase();
      const nameB = b.title.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });

  if (arabicNotes.length!) {
    if (type === "ascn") return arabicNotes;
    else return arabicNotes.reverse();
  } else return [];
}

export function sortByAlphabets(type: string, notes: Note[]) {
  //   const { notes } = useAppContext();

  const latinNotes = notes
    .filter((note) => note.lang === "FR" || note.lang === "EN")
    .sort((a, b) => {
      const nameA = a.title.toUpperCase(); // ignore upper and lowercase
      const nameB = b.title.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    })
    .reverse();

  const sortedNotes = sortByArabic("desc", notes)?.concat(latinNotes);

  if (type === "ascn") return sortedNotes;
  else return sortedNotes?.reverse();
}
